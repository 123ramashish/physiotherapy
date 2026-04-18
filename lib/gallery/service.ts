// lib/gallery/service.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { connectDB } from '@/model/dbconnection';
import { Gallery } from '@/model/schema/gallery.schema';
import { uploadMedia, deleteMedia } from '@/lib/imagekit';
import { cache } from 'react';

export const getGalleryItems = cache(async (filters?: {
    category?: string;
    branch?: string;
    limit?: number;
    page?: number;
}) => {
    await connectDB();
    const query: any = {};

    if (filters?.category && filters.category !== 'all') {
        query.category = filters.category;
    }
    if (filters?.branch && filters.branch !== 'all') {
        query.branch = filters.branch;
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        Gallery.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Gallery.countDocuments(query)
    ]);

    return {
        items: items.map((item: any) => ({ ...item, _id: item._id.toString() })),
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
});

export async function createGalleryItem(formData: FormData) {
    try {
        await connectDB();

        const file = formData.get('file') as File;
        const branch = formData.get('branch') as string;
        const category = formData.get('category') as any;
        const title = formData.get('title') as string;

        if (!file || !branch || !category || !title) {
            return { success: false, error: 'Missing required fields' };
        }

        const uploadResult = await uploadMedia(file, 'gallery');

        const newItem = await Gallery.create({
            url: uploadResult.url,
            fileId: uploadResult.fileId,
            type: uploadResult.type,
            thumbnail: uploadResult.thumbnail,
            branch,
            category,
            title
        });

        revalidatePath('/gallery');
        
        return { 
            success: true, 
            item: { ...newItem.toObject(), _id: newItem._id.toString() } 
        };
    } catch (error: any) {
        console.error('Create gallery item error:', error);
        return { success: false, error: error.message || 'Failed to upload gallery item' };
    }
}

export async function deleteGalleryItem(id: string) {
    try {
        await connectDB();
        const item = await Gallery.findById(id);
        if (!item) return { success: false, error: 'Item not found' };

        await deleteMedia(item.fileId);
        await Gallery.findByIdAndDelete(id);

        revalidatePath('/gallery');
        return { success: true };
    } catch (error: any) {
        console.error('Delete gallery item error:', error);
        return { success: false, error: error.message || 'Failed to delete gallery item' };
    }
}