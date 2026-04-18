import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGallery extends Document {
    url: string;
    fileId: string;
    type: 'image' | 'video';
    branch: string;
    category: 'certificate' | 'award' | 'event' | 'treatment' | 'feedback' | 'review';
    title: string;
    thumbnail?: string;
    createdAt: Date;
    updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>({
    url: { type: String, required: true },
    fileId: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    branch: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['certificate', 'award', 'event', 'treatment', 'feedback', 'review'], 
        required: true 
    },
    title: { type: String, required: true, trim: true },
    thumbnail: { type: String }
}, {
    timestamps: true
});

export const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);