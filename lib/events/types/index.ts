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

export type EventCategory = 'health-camp' | 'workshop' | 'webinar' | 'conference' | 'community' | 'screening';

export const EVENT_CATEGORIES = [
    { id: 'all', name: 'All Events', icon: '📅', color: '#6366f1' },
    { id: 'health-camp', name: 'Health Camps', icon: '🏥', color: '#10b981' },
    { id: 'workshop', name: 'Workshops', icon: '🛠️', color: '#3b82f6' },
    { id: 'webinar', name: 'Webinars', icon: '💻', color: '#8b5cf6' },
    { id: 'conference', name: 'Conferences', icon: '🎤', color: '#f59e0b' },
    { id: 'community', name: 'Community Events', icon: '🤝', color: '#ec4899' },
    { id: 'screening', name: 'Free Screenings', icon: '🔍', color: '#6366f1' },
] as const;

export const LOCATIONS = ['All Locations', 'Greater Noida', 'Noida', 'Delhi', 'Gurgaon', 'Online'];

export const DATE_RANGES = [
    { id: 'all', name: 'All Time' },
    { id: 'today', name: 'Today' },
    { id: 'this-week', name: 'This Week' },
    { id: 'this-month', name: 'This Month' },
    { id: 'next-month', name: 'Next Month' },
];

export interface FilterState {
    category: string;
    location: string;
    dateRange: string;
    price: string;
    status: string;
    search: string;
    sortBy: string;
    viewMode: 'grid' | 'list' | 'calendar';
}

export interface ModalState {
    type: 'create' | 'edit' | 'detail' | 'register' | 'share' | null;
    data?: EventItem | null;
    isOpen: boolean;
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
    contactPhone?: string;
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
    _id?: string;
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