// lib/imagekit.ts
import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';

const hasCredentials = !!(process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT);

export const imagekit = hasCredentials
    ? new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
    })
    : null;

export interface UploadResult {
    fileId: string;
    url: string;
    thumbnail?: string;
    type: 'image' | 'video';
    name: string;
    size: number;
    fileType: string;
}

export async function uploadMedia(
    file: File,
    folder: string = 'events',
    branchId?: string
): Promise<UploadResult> {
    if (!imagekit) {
        throw new Error('ImageKit credentials missing. Please add them to .env.local');
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const finalFolder = branchId ? `/${folder}/${branchId}` : `/${folder}`;

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uploadParams = {
        file: buffer,
        fileName: `${uuidv4()}-${cleanFileName}`,
        folder: finalFolder,
        useUniqueFileName: true,
        tags: file.type.startsWith('image/') ? ['event', 'image'] : ['event', 'video'],
        customCoordinates: file.type.startsWith('image/') ? '0,0,100,100' : undefined,
    };

    try {
        const response: any = await imagekit.upload(uploadParams);

        return {
            fileId: response.fileId,
            url: response.url,
            thumbnail: response.thumbnailUrl,
            type: file.type.startsWith('video/') ? 'video' : 'image',
            name: response.name,
            size: response.size,
            fileType: response.fileType,
        };
    } catch (error: any) {
        console.error('ImageKit upload error detail:', {
            message: error.message,
            stack: error.stack,
            help: error.help,
        });
        throw new Error(`ImageKit upload failed: ${error.message || 'Unknown error'}`);
    }
}

export async function deleteMedia(fileId: string): Promise<boolean> {
    if (!imagekit) return false;
    try {
        await imagekit.deleteFile(fileId);
        return true;
    } catch (error) {
        console.error('ImageKit delete error:', error);
        return false;
    }
}

export function getOptimizedUrl(url: string, transformations?: Record<string, any>): string {
    if (!transformations) return url;

    const params = new URLSearchParams();
    Object.entries(transformations).forEach(([key, value]) => {
        params.append(key, String(value));
    });

    return `${url}?${params.toString()}`;
}