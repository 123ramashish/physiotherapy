// lib/events/types/index.ts
export interface Branch {
    id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    timings: {
        open: string;
        close: string;
        weekend?: boolean;
    };
}

export interface MediaItem {
    url: string;
    fileId: string;
    type: 'image' | 'video';
    thumbnail?: string;
    alt?: string;
}

export interface EventItem {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    fullDescription?: string;
    startDate: string;
    endDate?: string;
    startTime: string;
    endTime: string;
    location: string;
    branchId?: string;
    venue: string;
    venueDetails?: string;
    category: 'health-camp' | 'workshop' | 'webinar' | 'conference' | 'community' | 'screening';
    capacity?: number;
    registered: number;
    waitingList: number;
    price: 'free' | 'paid';
    priceAmount?: string;
    currency: string;
    speaker?: string;
    speakerTitle?: string;
    speakerBio?: string;
    registrationUrl?: string;
    eventUrl?: string;
    featuredImage?: string;
    featuredImageId?: string;
    gallery?: MediaItem[];
    tags: string[];
    status: 'upcoming' | 'ongoing' | 'past' | 'cancelled' | 'full';
    featured: boolean;
    requirements?: string[];
    whatToBring?: string[];
    faq?: Array<{ question: string; answer: string }>;
    registrationFields?: Array<{
        label: string;
        type: 'text' | 'email' | 'phone' | 'checkbox';
        required: boolean;
    }>;
    attendees?: Array<{
        name: string;
        email: string;
        phone: string;
        registeredAt: string;
        attended?: boolean;
    }>;
    createdAt: string;
    updatedAt: string;
}

export interface EventRegistration {
    eventId: string;
    eventSlug: string;
    name: string;
    email: string;
    phone: string;
    branch?: string;
    additionalInfo?: Record<string, any>;
    registeredAt: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'attended';
    qrCode?: string;
}