import { Category, Branch, BlogPost } from './types';

export const CATEGORIES: Category[] = [
    { slug: 'sports-therapy', name: 'Sports Therapy', icon: '⚡', color: '#10b981' },
    { slug: 'chiropractic', name: 'Chiropractic', icon: '🦴', color: '#3b82f6' },
    { slug: 'pain-management', name: 'Pain Management', icon: '💊', color: '#6366f1' },
    { slug: 'rehabilitation', name: 'Rehabilitation', icon: '🏃', color: '#0ea5e9' },
    { slug: 'wellness', name: 'Wellness', icon: '🌿', color: '#059669' },
    { slug: 'ergonomics', name: 'Ergonomics', icon: '💺', color: '#4f46e5' },
    { slug: 'treatment-methods', name: 'Treatment', icon: '⚕️', color: '#1d4ed8' },
];

export const BRANCHES: Branch[] = [
    { id: 'all', name: 'All Branches', city: '' },
    { id: 'Noida-swaran-nagari', name: 'Noida Swaran Nagari', city: 'Noida' },
    { id: 'Noida-sector-134', name: 'Noida Sector 134', city: 'Noida' },

];

export const TAG_SUGGESTIONS = [
    'back pain', 'knee pain', 'sports injury', 'rehabilitation', 'posture',
    'stretching', 'strength training', 'pain relief', 'recovery', 'wellness',
    'ergonomics', 'desk exercises', 'neck pain', 'sciatica', 'arthritis',
    'frozen shoulder', 'physical therapy', 'manual therapy', 'dry needling',
    'cupping', 'hijama', 'post-surgery', 'stroke recovery', 'bell palsy'
];

export const MOCK_POSTS: BlogPost[] = [];