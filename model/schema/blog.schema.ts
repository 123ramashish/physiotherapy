import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    branch: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    views: number;
    comments: number;
    featured: boolean;
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}

export interface IBlogDocument extends IBlog, Document {
    _id: any;
}

const BlogSchema: Schema = new Schema<IBlogDocument>(
    {
        title: { type: String, required: true, trim: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        branch: { type: String, required: true },
        author: { type: String, required: true },
        authorRole: { type: String, required: true },
        date: { type: String },
        readTime: { type: String },
        views: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        featured: { type: Boolean, default: false },
        tags: [{ type: String, trim: true }],
        status: { 
            type: String, 
            enum: ['draft', 'published', 'archived'], 
            default: 'draft' 
        }
    },
    { timestamps: true }
);

// Prevent model overwrite during hot reloading
export default mongoose.models.Blog || mongoose.model<IBlogDocument>('Blog', BlogSchema);
