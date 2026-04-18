import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    fullDescription?: string;
    startDate: Date;
    endDate?: Date;
    startTime: string;
    endTime: string;
    location: string;
    venue: string;
    venueDetails?: string;
    category: 'health-camp' | 'workshop' | 'webinar' | 'conference' | 'community' | 'screening';
    capacity?: number;
    registered: number;
    price: 'free' | 'paid';
    priceAmount?: string;
    currency: string;
    speaker?: string;
    speakerTitle?: string;
    speakerBio?: string;
    registrationUrl?: string;
    featuredImage?: string;
    gallery?: string[];
    tags: string[];
    status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
    featured: boolean;
    requirements?: string[];
    whatToBring?: string[];
    faq?: Array<{ question: string; answer: string }>;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, maxlength: 500 },
    fullDescription: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
    endTime: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
    location: { type: String, required: true, enum: ['Greater Noida', 'Noida', 'Delhi', 'Gurgaon', 'Online'] },
    venue: { type: String, required: true, trim: true },
    venueDetails: { type: String, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['health-camp', 'workshop', 'webinar', 'conference', 'community', 'screening']
    },
    capacity: { type: Number, min: 1 },
    registered: { type: Number, default: 0, min: 0 },
    price: { type: String, required: true, enum: ['free', 'paid'] },
    priceAmount: { type: String },
    currency: { type: String, default: 'INR' },
    contactPhone: { type: String, trim: true },
    speaker: { type: String, trim: true },
    speakerTitle: { type: String, trim: true },
    speakerBio: { type: String },
    registrationUrl: { type: String },
    featuredImage: { type: String },
    featuredImageId: { type: String },
    gallery: [{
        url: { type: String, required: true },
        fileId: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
        thumbnail: { type: String },
        alt: { type: String }
    }],
    tags: [{ type: String, trim: true }],
    status: {
        type: String,
        required: true,
        enum: ['upcoming', 'ongoing', 'past', 'cancelled'],
        default: 'upcoming'
    },
    featured: { type: Boolean, default: false },
    requirements: [{ type: String }],
    whatToBring: [{ type: String }],
    faq: [{
        question: { type: String, required: true },
        answer: { type: String, required: true }
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
EventSchema.index({ status: 1, startDate: 1 });
EventSchema.index({ category: 1, location: 1 });
EventSchema.index({ title: 'text', description: 'text', tags: 'text' });
EventSchema.index({ slug: 1 }, { unique: true });

// Virtual for days until event
EventSchema.virtual('daysUntil').get(function (this: IEvent) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(this.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
});

export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);