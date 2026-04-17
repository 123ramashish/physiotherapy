// lib/events/service.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { getEventsCollection, getRegistrationsCollection, getBranchesCollection, ObjectId } from '@/model/dbconnection';
import { uploadMedia, deleteMedia } from '@/lib/imagekit';
import { EventItem, MediaItem, EventRegistration } from './types';
import { slugify, sendEmailNotification, generateQRCode } from '@/lib/utils';
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
    limit?: number;
    page?: number;
}): Promise<{ events: EventItem[]; total: number; page: number; totalPages: number }> => {
    const collection = await getEventsCollection();
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
        query.startDate = { $gte: startDate.toISOString().split('T')[0], $lte: endDate.toISOString().split('T')[0] };
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
        collection
            .find(query)
            .sort({ featured: -1, startDate: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray(),
        collection.countDocuments(query),
    ]);

    // Update event statuses based on current date
    const now = new Date();
    for (const event of events) {
        const eventDate = new Date(event.startDate);
        if (event.status !== 'cancelled') {
            if (event.capacity && event.registered >= event.capacity) {
                await collection.updateOne(
                    { _id: event._id },
                    { $set: { status: 'full' } }
                );
                event.status = 'full';
            } else if (eventDate < now) {
                await collection.updateOne(
                    { _id: event._id },
                    { $set: { status: 'past' } }
                );
                event.status = 'past';
            } else if (eventDate.toDateString() === now.toDateString()) {
                await collection.updateOne(
                    { _id: event._id },
                    { $set: { status: 'ongoing' } }
                );
                event.status = 'ongoing';
            }
        }
    }

    return {
        events: events.map((e: any) => ({ ...e, _id: e._id.toString() })) as EventItem[],
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
});

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
    const collection = await getEventsCollection();
    const event = await collection.findOne({ slug });
    if (!event) return null;
    return { ...event, _id: event._id.toString() } as EventItem;
}

export async function getUpcomingEventsByBranch(branchId: string, limit: number = 5): Promise<EventItem[]> {
    const collection = await getEventsCollection();
    const today = new Date().toISOString().split('T')[0];

    const events = await collection
        .find({
            branchId,
            startDate: { $gte: today },
            status: { $in: ['upcoming', 'ongoing'] }
        })
        .sort({ startDate: 1, startTime: 1 })
        .limit(limit)
        .toArray();

    return events.map(e => ({ ...e, _id: e._id.toString() })) as EventItem[];
}

export async function createEvent(formData: FormData): Promise<{ success: boolean; error?: string; event?: EventItem }> {
    try {
        const collection = await getEventsCollection();

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

        const slug = slugify(title);
        const existing = await collection.findOne({ slug });
        const uniqueSlug = existing ? `${slug}-${Date.now()}` : slug;

        // Handle featured image
        let featuredImage: string | undefined;
        let featuredImageId: string | undefined;
        const featuredImageFile = formData.get('featuredImage') as File;
        if (featuredImageFile && featuredImageFile.size > 0) {
            const uploadResult = await uploadMedia(featuredImageFile, 'events/featured');
            featuredImage = uploadResult.url;
            featuredImageId = uploadResult.fileId;
        }

        // Handle gallery
        const galleryFiles = formData.getAll('gallery') as File[];
        const gallery: MediaItem[] = [];
        for (const file of galleryFiles) {
            if (file && file.size > 0) {
                const uploadResult = await uploadMedia(file, 'events/gallery');
                gallery.push({
                    url: uploadResult.url,
                    fileId: uploadResult.fileId,
                    type: uploadResult.type,
                    thumbnail: uploadResult.thumbnail,
                    alt: file.name,
                });
            }
        }

        const tagsInput = formData.get('tags') as string;
        const tags = tagsInput?.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) || [];

        const registrationFieldsInput = formData.get('registrationFields') as string;
        const registrationFields = registrationFieldsInput ? JSON.parse(registrationFieldsInput) : undefined;

        const newEvent: any = {
            title,
            slug: uniqueSlug,
            description,
            fullDescription: formData.get('fullDescription') as string || description,
            startDate,
            endDate: formData.get('endDate') as string || undefined,
            startTime,
            endTime: formData.get('endTime') as string,
            location,
            branchId: formData.get('branchId') as string || undefined,
            venue,
            venueDetails: formData.get('venueDetails') as string || undefined,
            category,
            capacity: formData.get('capacity') ? parseInt(formData.get('capacity') as string) : undefined,
            registered: 0,
            waitingList: 0,
            price: formData.get('price') as 'free' | 'paid',
            priceAmount: formData.get('priceAmount') as string || undefined,
            currency: 'INR',
            speaker: formData.get('speaker') as string || undefined,
            speakerTitle: formData.get('speakerTitle') as string || undefined,
            speakerBio: formData.get('speakerBio') as string || undefined,
            registrationUrl: formData.get('registrationUrl') as string || undefined,
            eventUrl: formData.get('eventUrl') as string || undefined,
            featuredImage,
            featuredImageId,
            gallery: gallery.length > 0 ? gallery : undefined,
            tags,
            status: 'upcoming',
            featured: formData.get('featured') === 'true',
            requirements: formData.get('requirements')?.toString().split('\n').filter(Boolean) || undefined,
            whatToBring: formData.get('whatToBring')?.toString().split('\n').filter(Boolean) || undefined,
            faq: formData.get('faq') ? JSON.parse(formData.get('faq') as string) : undefined,
            registrationFields,
            attendees: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const result = await collection.insertOne(newEvent);

        revalidatePath('/events');
        revalidatePath(`/events/${uniqueSlug}`);
        revalidateTag('events');

        return {
            success: true,
            event: { ...newEvent, _id: result.insertedId.toString() }
        };
    } catch (error) {
        console.error('Create event error:', error);
        return { success: false, error: 'Failed to create event' };
    }
}

export async function registerForEvent(
    eventId: string,
    registrationData: {
        name: string;
        email: string;
        phone: string;
        branch?: string;
        additionalInfo?: Record<string, any>;
    }
): Promise<{ success: boolean; error?: string; registration?: EventRegistration }> {
    try {
        const eventsCollection = await getEventsCollection();
        const registrationsCollection = await getRegistrationsCollection();

        const event = await eventsCollection.findOne({ _id: new ObjectId(eventId) });
        if (!event) {
            return { success: false, error: 'Event not found' };
        }

        // Check capacity
        if (event.capacity && event.registered >= event.capacity) {
            // Add to waiting list
            await eventsCollection.updateOne(
                { _id: new ObjectId(eventId) },
                { $inc: { waitingList: 1 } }
            );
            return { success: false, error: 'Event is full. You have been added to waiting list.' };
        }

        // Check for duplicate registration
        const existingRegistration = await registrationsCollection.findOne({
            eventId,
            email: registrationData.email
        });

        if (existingRegistration) {
            return { success: false, error: 'You are already registered for this event' };
        }

        // Generate QR code
        const qrCode = await generateQRCode(`${eventId}-${registrationData.email}-${Date.now()}`);

        const registration: EventRegistration = {
            eventId,
            eventSlug: event.slug,
            ...registrationData,
            registeredAt: new Date().toISOString(),
            status: 'confirmed',
            qrCode,
        };

        await registrationsCollection.insertOne(registration);

        // Increment registered count
        await eventsCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $inc: { registered: 1 } }
        );

        // Send confirmation email
        await sendEmailNotification({
            to: registrationData.email,
            template: 'event-registration',
            data: {
                eventName: event.title,
                eventDate: event.startDate,
                eventTime: event.startTime,
                location: event.location,
                venue: event.venue,
                qrCode,
                registrationId: registration._id?.toString(),
            }
        });

        revalidatePath(`/events/${event.slug}`);
        revalidateTag('events');

        return { success: true, registration };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Failed to register for event' };
    }
}