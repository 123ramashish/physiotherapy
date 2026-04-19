// lib/events/service.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { connectDB } from '@/model/dbconnection';
import { Event } from '@/model/schema/event.schema';
import { uploadMedia, deleteMedia } from '@/lib/imagekit';
import { EventItem, MediaItem, EventRegistration } from './types';
import { slugify, generateQRCode } from '@/lib/utils';
import { sendEmailNotification } from '@/lib/mail';
import { cache } from 'react';

// Cache wrapper for getEvents
export const getEvents = cache(async (filters?: {
    category?: string;
    location?: string;
    branchId?: string;
    dateRange?: string;
    price?: string;
    status?: string;
    search?: string;
    sortBy?: string;
    limit?: number;
    page?: number;
}): Promise<{ events: EventItem[]; total: number; page: number; totalPages: number }> => {
    await connectDB();
    const query: Record<string, any> = {};

    // Apply filters
    if (filters?.category && filters.category !== 'all') {
        query.category = filters.category;
    }
    if (filters?.location && filters.location !== 'All Locations') {
        query.location = filters.location;
    }
    if (filters?.branchId) {
        query.branchId = filters.branchId;
    }
    if (filters?.price && filters.price !== 'all') {
        query.price = filters.price;
    }
    if (filters?.status && filters.status !== 'all') {
        query.status = filters.status;
    }
    if (filters?.search) {
        query.$or = [
            { title: { $regex: filters.search, $options: 'i' } },
            { description: { $regex: filters.search, $options: 'i' } },
            { tags: { $in: [new RegExp(filters.search, 'i')] } },
            { location: { $regex: filters.search, $options: 'i' } },
        ];
    }

    // Date range filtering
    if (filters?.dateRange && filters.dateRange !== 'all') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let startDate: Date, endDate: Date;

        switch (filters.dateRange) {
            case 'today':
                startDate = today;
                endDate = new Date(today);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'this-week':
                startDate = today;
                endDate = new Date(today);
                endDate.setDate(today.getDate() + 7);
                break;
            case 'this-month':
                startDate = today;
                endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 'next-month':
                startDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
                break;
            default:
                startDate = today;
                endDate = new Date('9999-12-31');
        }
        query.startDate = { $gte: startDate, $lte: endDate };
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const skip = (page - 1) * limit;

    let sort: any = { featured: -1, startDate: 1, createdAt: -1 };
    if (filters?.sortBy) {
        switch (filters.sortBy) {
            case 'newest':
                sort = { createdAt: -1 };
                break;
            case 'oldest':
                sort = { createdAt: 1 };
                break;
            case 'date-asc':
                sort = { startDate: 1 };
                break;
            case 'date-desc':
                sort = { startDate: -1 };
                break;
            case 'title-asc':
                sort = { title: 1 };
                break;
            case 'title-desc':
                sort = { title: -1 };
                break;
        }
    }

    const [events, total] = await Promise.all([
        Event.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Event.countDocuments(query),
    ]);

    // Update event statuses based on current date
    const now = new Date();
    const updatedEvents = events as any[];
    for (const event of updatedEvents) {
        const eventDate = new Date(event.startDate);
        if (event.status !== 'cancelled') {
            if (event.capacity && event.registered >= event.capacity) {
                if (event.status !== 'full') {
                    await Event.updateOne({ _id: event._id }, { $set: { status: 'full' } });
                    event.status = 'full';
                }
            } else if (eventDate < now) {
                if (event.status !== 'past') {
                    await Event.updateOne({ _id: event._id }, { $set: { status: 'past' } });
                    event.status = 'past';
                }
            }
        }
    }

    return {
        events: updatedEvents.map((e: any) => ({ ...e, _id: e._id.toString() })) as EventItem[],
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
});

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();
    if (!event) return null;
    return { ...event, _id: (event as any)._id.toString() } as unknown as EventItem;
}

export async function createEvent(formData: FormData): Promise<{ success: boolean; error?: string; event?: EventItem }> {
    try {
        await connectDB();

        // Validate required fields
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const startDate = formData.get('startDate') as string;
        const startTime = formData.get('startTime') as string;
        const location = formData.get('location') as string;
        const venue = formData.get('venue') as string;

        if (!title || !description || !category || !startDate || !startTime || !location || !venue) {
            return { success: false, error: 'Required fields are missing' };
        }

        const slug = formData.get('slug') as string || slugify(title);
        const existing = await Event.findOne({ slug });
        const uniqueSlug = existing ? `${slug}-${Date.now()}` : slug;

        // Handle featured image
        let featuredImage: string | undefined;
        let featuredImageId: string | undefined;
        const featuredImageFile = formData.get('featuredImage');
        if (featuredImageFile instanceof File && featuredImageFile.size > 0) {
            try {
                const uploadResult = await uploadMedia(featuredImageFile, 'events/featured');
                featuredImage = uploadResult.url;
                featuredImageId = uploadResult.fileId;
            } catch (e) {
                console.warn('Image upload failed, continuing without image:', e);
            }
        }

        // Handle gallery
        const galleryFiles = formData.getAll('gallery');
        const gallery: MediaItem[] = [];
        for (const file of galleryFiles) {
            if (file instanceof File && file.size > 0) {
                try {
                    const uploadResult = await uploadMedia(file, 'events/gallery');
                    gallery.push({
                        url: uploadResult.url,
                        fileId: uploadResult.fileId,
                        type: uploadResult.type,
                        thumbnail: uploadResult.thumbnail,
                        alt: file.name,
                    });
                } catch (e) {
                    console.warn('Gallery item upload failed:', e);
                }
            }
        }

        const tagsInput = formData.get('tags') as string;
        const tags = tagsInput?.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) || [];

        const faqInput = formData.get('faq') as string;
        let faq = undefined;
        if (faqInput) {
            try { faq = JSON.parse(faqInput); } catch (e) {}
        }

        const newEventData: any = {
            title,
            slug: uniqueSlug,
            description,
            fullDescription: formData.get('fullDescription') as string || description,
            startDate: new Date(startDate),
            endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : undefined,
            startTime,
            endTime: formData.get('endTime') as string,
            location,
            branchId: formData.get('branchId') as string || undefined,
            venue,
            venueDetails: formData.get('venueDetails') as string || undefined,
            category,
            capacity: formData.get('capacity') ? parseInt(formData.get('capacity') as string) : undefined,
            registered: 0,
            price: formData.get('price') as 'free' | 'paid',
            priceAmount: formData.get('priceAmount') as string || undefined,
            currency: 'INR',
            contactPhone: formData.get('contactPhone') as string || undefined,
            speaker: formData.get('speaker') as string || undefined,
            speakerTitle: formData.get('speakerTitle') as string || undefined,
            speakerBio: formData.get('speakerBio') as string || undefined,
            registrationUrl: formData.get('registrationUrl') as string || undefined,
            eventUrl: formData.get('eventUrl') as string || undefined,
            featuredImage,
            featuredImageId,
            gallery: gallery.length > 0 ? gallery : undefined,
            tags,
            status: formData.get('status') as any || 'upcoming',
            featured: formData.get('featured') === 'true',
            requirements: formData.get('requirements')?.toString().split('\n').filter(Boolean) || [],
            whatToBring: formData.get('whatToBring')?.toString().split('\n').filter(Boolean) || [],
            faq,
        };

        const event = await Event.create(newEventData);

        revalidatePath('/events');
        // @ts-ignore
        revalidateTag('events');

        return {
            success: true,
            event: { ...event.toObject(), _id: event._id.toString() } as unknown as EventItem
        };
    } catch (error: any) {
        console.error('Create event error:', error);
        return { success: false, error: error.message || 'Failed to create event' };
    }
}

export async function updateEvent(id: string, formData: FormData): Promise<{ success: boolean; error?: string; event?: EventItem }> {
    try {
        await connectDB();
        const existing = await Event.findById(id);
        if (!existing) return { success: false, error: 'Event not found' };

        const updateData: any = {
            updatedAt: new Date(),
        };

        const title = formData.get('title') as string;
        if (title) {
            updateData.title = title;
            updateData.slug = slugify(title);
        }

        const fields = ['description', 'fullDescription', 'startTime', 'endTime', 'location', 'venue', 'venueDetails', 'category', 'price', 'priceAmount', 'contactPhone', 'speaker', 'speakerTitle', 'speakerBio', 'registrationUrl', 'eventUrl', 'status'];
        fields.forEach(field => {
            const val = formData.get(field);
            if (val !== null) updateData[field] = val;
        });

        if (formData.get('startDate')) updateData.startDate = new Date(formData.get('startDate') as string);
        if (formData.get('endDate')) updateData.endDate = new Date(formData.get('endDate') as string);
        if (formData.get('capacity')) updateData.capacity = parseInt(formData.get('capacity') as string);
        if (formData.get('featured')) updateData.featured = formData.get('featured') === 'true';

        const tagsInput = formData.get('tags') as string;
        if (tagsInput !== null) {
            updateData.tags = tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
        }

        const faqInput = formData.get('faq') as string;
        if (faqInput) {
            try { updateData.faq = JSON.parse(faqInput); } catch (e) {}
        }

        // Handle featured image
        const featuredImageFile = formData.get('featuredImage');
        if (featuredImageFile instanceof File && featuredImageFile.size > 0) {
            if (existing.featuredImageId) {
                await deleteMedia(existing.featuredImageId);
            }
            const uploadResult = await uploadMedia(featuredImageFile, 'events/featured');
            updateData.featuredImage = uploadResult.url;
            updateData.featuredImageId = uploadResult.fileId;
        }

        const event = await Event.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();

        revalidatePath('/events');
        // @ts-ignore
        revalidateTag('events');

        return { success: true, event: { ...(event as any), _id: id } as unknown as EventItem };
    } catch (error: any) {
        console.error('Update event error:', error);
        return { success: false, error: error.message || 'Failed to update event' };
    }
}

export async function deleteEvent(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        await connectDB();
        const existing = await Event.findById(id);
        if (!existing) return { success: false, error: 'Event not found' };

        if (existing.featuredImageId) {
            await deleteMedia(existing.featuredImageId);
        }

        if (existing.gallery) {
            for (const item of existing.gallery) {
                if ((item as any).fileId) await deleteMedia((item as any).fileId);
            }
        }

        await Event.findByIdAndDelete(id);

        revalidatePath('/events');
        // @ts-ignore
        revalidateTag('events');

        return { success: true };
    } catch (error) {
        console.error('Delete event error:', error);
        return { success: false, error: 'Failed to delete event' };
    }
}

export async function incrementRegistration(id: string): Promise<{ success: boolean; registered?: number; error?: string }> {
    try {
        await connectDB();
        const event = await Event.findByIdAndUpdate(
            id,
            { $inc: { registered: 1 } },
            { new: true }
        ).lean();

        if (!event) return { success: false, error: 'Event not found' };

        revalidatePath('/events');
        // @ts-ignore
        revalidateTag('events');

        return { success: true, registered: event.registered };
    } catch (error) {
        console.error('Increment registration error:', error);
        return { success: false, error: 'Failed to update registration count' };
    }
}