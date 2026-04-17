// lib/imagekit.ts
import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
    throw new Error('Please add ImageKit credentials to .env.local');
}

export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

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
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const finalFolder = branchId ? `/${folder}/${branchId}` : `/${folder}`;

    const uploadParams = {
        file: fileBuffer,
        fileName: `${uuidv4()}-${file.name}`,
        folder: finalFolder,
        useUniqueFileName: true,
        tags: file.type.startsWith('image/') ? ['event', 'image'] : ['event', 'video'],
        customCoordinates: file.type.startsWith('image/') ? '0,0,100,100' : undefined,
    };

    try {
        const response = await imagekit.upload(uploadParams);

        return {
            fileId: response.fileId,
            url: response.url,
            thumbnail: response.thumbnailUrl,
            type: file.type.startsWith('image/') ? 'image' : 'video',
            name: response.name,
            size: response.size,
            fileType: response.fileType,
        };
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw new Error('Failed to upload media');
    }
}

export async function deleteMedia(fileId: string): Promise<boolean> {
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