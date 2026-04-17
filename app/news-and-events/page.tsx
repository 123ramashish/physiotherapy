'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useInView, useAnimation } from 'framer-motion';
import {
    Calendar, Clock, MapPin, Users, ArrowRight, Search, Filter, ChevronDown,
    ChevronUp, X, CheckCircle, AlertCircle, Loader2, TrendingUp, Eye,
    Bookmark, Share2, Mail, Twitter, Facebook, Linkedin, Copy, Check,
    ArrowUp, Newspaper, Award, Building2, Heart, Stethoscope, Activity,
    Dumbbell, Brain, Sparkles, ExternalLink, Tag, SlidersHorizontal,
    ChevronLeft, ChevronRight, Phone, Globe, Download, Camera
} from 'lucide-react';
import Script from 'next/script';

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedDate: string;
    modifiedDate?: string;
    category: 'health-tips' | 'research' | 'award' | 'announcement' | 'patient-story';
    location: string;
    author: string;
    authorTitle: string;
    featuredImage?: string;
    readTime: string;
    tags: string[];
    views: number;
    featured: boolean;
}

interface EventItem {
    id: string;
    title: string;
    slug: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    location: string;
    venue: string;
    category: 'health-camp' | 'workshop' | 'webinar' | 'conference' | 'community';
    capacity?: number;
    registered?: number;
    price: 'free' | 'paid';
    priceAmount?: string;
    speaker?: string;
    speakerTitle?: string;
    registrationUrl?: string;
    featuredImage?: string;
    tags: string[];
    status: 'upcoming' | 'ongoing' | 'past';
    featured: boolean;
}

interface FilterState {
    type: 'all' | 'news' | 'events';
    category: string;
    location: string;
    search: string;
    sortBy: 'newest' | 'oldest' | 'popular';
    eventStatus: 'all' | 'upcoming' | 'ongoing' | 'past';
}

interface ModalState {
    type: 'news-detail' | 'event-detail' | 'share' | 'register' | null;
    data?: NewsItem | EventItem | null;
    isOpen: boolean;
}

// ─────────────────────────────────────────────
//  Constants & Mock Data
// ─────────────────────────────────────────────

const NEWS_CATEGORIES = [
    { id: 'all', name: 'All News', icon: '📰', color: '#6366f1' },
    { id: 'health-tips', name: 'Health Tips', icon: '💡', color: '#10b981' },
    { id: 'research', name: 'Research & Innovation', icon: '🔬', color: '#3b82f6' },
    { id: 'award', name: 'Awards', icon: '🏆', color: '#f59e0b' },
    { id: 'announcement', name: 'Announcements', icon: '📢', color: '#8b5cf6' },
    { id: 'patient-story', name: 'Patient Stories', icon: '❤️', color: '#ec4899' },
] as const;

const EVENT_CATEGORIES = [
    { id: 'all', name: 'All Events', icon: '📅', color: '#6366f1' },
    { id: 'health-camp', name: 'Health Camps', icon: '🏥', color: '#10b981' },
    { id: 'workshop', name: 'Workshops', icon: '🛠️', color: '#3b82f6' },
    { id: 'webinar', name: 'Webinars', icon: '💻', color: '#8b5cf6' },
    { id: 'conference', name: 'Conferences', icon: '🎤', color: '#f59e0b' },
    { id: 'community', name: 'Community Events', icon: '🤝', color: '#ec4899' },
] as const;

const LOCATIONS = ['All Locations', 'Greater Noida', 'Noida', 'Delhi', 'Gurgaon', 'Online'];

const MOCK_NEWS: NewsItem[] = [
    {
        id: 'n1',
        title: '5 Essential Exercises to Prevent Back Pain During Monsoon Season',
        slug: 'back-pain-exercises-monsoon',
        excerpt: 'Monsoon season brings increased humidity and joint stiffness. Learn 5 evidence-based exercises to keep your back healthy and pain-free during the rainy months.',
        content: `<h2>Why Monsoon Affects Your Back</h2><p>During monsoon season, increased humidity and barometric pressure changes can cause:</p><ul><li>Joint stiffness and reduced flexibility</li><li>Muscle tension and spasms</li><li>Increased inflammation in existing conditions</li><li>Poor posture due to cold weather</li></ul><h2>Exercise 1: Cat-Cow Stretch</h2><p><strong>How to do it:</strong> Start on all fours. Inhale, arch your back and lift your head (Cow). Exhale, round your spine and tuck your chin (Cat). Repeat 10-15 times slowly.</p><p><strong>Benefits:</strong> Improves spinal flexibility, reduces stiffness, warms up back muscles.</p><h2>Exercise 2: Child's Pose</h2><p><strong>How to do it:</strong> Kneel on floor, sit back on heels, stretch arms forward, rest forehead on mat. Hold 30 seconds.</p><p><strong>Benefits:</strong> Gently stretches lower back, relieves tension, promotes relaxation.</p><h2>Exercise 3: Pelvic Tilts</h2><p><strong>How to do it:</strong> Lie on back, knees bent. Tighten abs, flatten lower back against floor. Hold 5 seconds, release. Repeat 15 times.</p><p><strong>Benefits:</strong> Strengthens core, stabilizes pelvis, reduces lower back strain.</p><h2>Exercise 4: Bridge Pose</h2><p><strong>How to do it:</strong> Lie on back, knees bent, feet flat. Lift hips toward ceiling, squeeze glutes. Hold 5 seconds, lower slowly. Repeat 12 times.</p><p><strong>Benefits:</strong> Strengthens glutes and hamstrings, supports lower back, improves posture.</p><h2>Exercise 5: Knee-to-Chest Stretch</h2><p><strong>How to do it:</strong> Lie on back. Pull one knee to chest, hold 20 seconds. Switch legs. Repeat 3 times each side.</p><p><strong>Benefits:</strong> Stretches lower back muscles, relieves tension, improves flexibility.</p><h2>Monsoon Back Care Tips</h2><ul><li>Stay warm - use warm compresses on stiff areas</li><li>Avoid sitting in damp conditions</li><li>Take short walking breaks every hour</li><li>Stay hydrated despite cooler weather</li><li>Wear supportive footwear in wet conditions</li></ul><p><strong>When to See a Physiotherapist:</strong> If pain persists beyond 2 weeks, radiates down legs, or is accompanied by numbness/tingling, consult a professional immediately.</p>`,
        publishedDate: '2024-07-15T10:00:00.000Z',
        category: 'health-tips',
        location: 'Greater Noida',
        author: 'Dr. Shravan Kumar',
        authorTitle: 'Lead Physiotherapist',
        readTime: '6 min',
        tags: ['back pain', 'monsoon care', 'exercises', 'prevention', 'stretching'],
        views: 3842,
        featured: true,
    },
    {
        id: 'n2',
        title: 'SKM Physiotherapy Launches AI-Powered Gait Analysis System',
        slug: 'ai-gait-analysis-launch',
        excerpt: 'Revolutionary AI technology now available at our Beta 1 clinic for precise biomechanical assessment, helping patients recover faster from sports injuries and neurological conditions.',
        content: `<h2>Next-Generation Movement Analysis</h2><p>SKM Physiotherapy is proud to announce the installation of an AI-powered gait analysis system at our Beta 1, Greater Noida clinic. This state-of-the-art technology represents a significant leap forward in movement assessment and rehabilitation planning.</p><h2>How It Works</h2><p>The system uses multiple high-speed cameras and machine learning algorithms to:</p><ul><li>Capture 3D movement patterns in real-time</li><li>Identify biomechanical abnormalities invisible to the naked eye</li><li>Generate detailed reports with quantified metrics</li><li>Track progress over time with comparative analysis</li></ul><h2>Who Benefits?</h2><ul><li><strong>Athletes:</strong> Optimize performance, prevent injuries</li><li><strong>Post-Surgery Patients:</strong> Monitor recovery, ensure proper movement patterns</li><li><strong>Neurological Patients:</strong> Assess gait deviations, track rehabilitation progress</li><li><strong>Chronic Pain Sufferers:</strong> Identify compensatory movements causing pain</li></ul><h2>Clinical Evidence</h2><p>Studies show AI-assisted gait analysis improves diagnosis accuracy by 40% and reduces rehabilitation time by an average of 3 weeks compared to traditional assessment methods.</p><p><strong>Book Your Assessment:</strong> Call +91 79827 99147 or visit our Beta 1 clinic. Limited slots available during launch period.</p>`,
        publishedDate: '2024-06-20T09:00:00.000Z',
        category: 'research',
        location: 'Greater Noida',
        author: 'Media Team',
        authorTitle: 'SKM Physiotherapy',
        readTime: '5 min',
        tags: ['AI technology', 'gait analysis', 'sports injury', 'rehabilitation', 'innovation'],
        views: 5217,
        featured: true,
    },
    {
        id: 'n3',
        title: "From Paralysis to Marathon: Ramesh's Incredible Recovery Journey",
        slug: 'paralysis-to-marathon-patient-story',
        excerpt: 'After a stroke left him partially paralyzed, Ramesh worked with SKM Physiotherapy for 18 months. Today, he completes half-marathons. His inspiring story of determination and expert care.',
        content: `<h2>The Day Everything Changed</h2><p>Ramesh Verma, a 52-year-old school teacher from Noida, never imagined his life would change so dramatically. One morning in January 2022, he woke up with weakness in his right side and slurred speech. Within hours, he was diagnosed with an ischemic stroke.</p><h2>The Beginning of Recovery</h2><p>After initial hospital treatment, Ramesh was referred to SKM Physiotherapy's neuro-rehabilitation program. "I couldn't stand without support. My right hand was completely useless. I felt hopeless," Ramesh recalls.</p><h2>The Rehabilitation Journey</h2><p>Under the guidance of Dr. Shravan Kumar, Ramesh began an intensive rehabilitation program:</p><ul><li><strong>Months 1-3:</strong> Bed mobility, sitting balance, assisted standing</li><li><strong>Months 4-6:</strong> Walking with support, basic hand function exercises</li><li><strong>Months 7-12:</strong> Independent walking, grip strengthening, fine motor skills</li><li><strong>Months 13-18:</strong> Endurance training, sports-specific exercises</li></ul><h2>The Breakthrough</h2><p>"The turning point was around month 8. I took my first 10 independent steps. My family cried with joy. That moment gave me everything I needed to keep going," says Ramesh.</p><h2>Today: Beyond Expectations</h2><p>Eighteen months post-stroke, Ramesh:</p><ul><li>Walks independently for 5+ km daily</li><li>Has regained 85% hand function</li><li>Completed his first 5K run</li><li>Recently finished a half-marathon in 2 hours 15 minutes</li><li>Returned to teaching part-time</li></ul><h2>Advice to Others</h2><p>"If you're going through stroke recovery, don't lose hope. The brain is incredibly adaptable. With the right guidance and your determination, you can achieve things you never thought possible. Trust the process, trust your physiotherapist, and never give up."</p><p><em>— Ramesh Verma, Stroke Survivor & Marathon Runner</em></p>`,
        publishedDate: '2024-05-10T11:00:00.000Z',
        category: 'patient-story',
        location: 'Noida',
        author: 'Communications Team',
        authorTitle: 'SKM Physiotherapy',
        readTime: '8 min',
        tags: ['stroke recovery', 'patient story', 'inspiration', 'neuro-rehabilitation', 'marathon'],
        views: 8934,
        featured: false,
    },
];

const MOCK_EVENTS: EventItem[] = [
    {
        id: 'e1',
        title: 'Free Health Screening Camp: Back Pain & Posture Assessment',
        slug: 'free-back-pain-screening-camp',
        description: 'Join our free health screening camp for comprehensive back pain assessment, posture analysis, and personalized exercise recommendations. No registration required—walk in for expert evaluation.',
        startDate: '2024-08-15',
        endDate: '2024-08-15',
        startTime: '09:00',
        endTime: '17:00',
        location: 'Greater Noida',
        venue: 'SKM Physiotherapy, B-5 Beta 1, Near Jagat Farm, Greater Noida',
        category: 'health-camp',
        capacity: 100,
        registered: 67,
        price: 'free',
        speaker: 'Dr. Shravan Kumar',
        speakerTitle: 'Lead Physiotherapist, B.P.T.',
        tags: ['free camp', 'back pain', 'posture', 'screening', 'Greater Noida'],
        status: 'upcoming',
        featured: true,
    },
    {
        id: 'e2',
        title: 'Workshop: Ergonomics for IT Professionals – Prevent Desk-Related Injuries',
        slug: 'ergonomics-workshop-it-professionals',
        description: 'A hands-on workshop designed for IT professionals to learn proper desk setup, posture correction techniques, and quick exercises to prevent repetitive strain injuries. Includes ergonomic assessment kit.',
        startDate: '2024-08-22',
        endDate: '2024-08-22',
        startTime: '10:00',
        endTime: '13:00',
        location: 'Noida',
        venue: 'Community Hall, Sector 62, Noida',
        category: 'workshop',
        capacity: 50,
        registered: 38,
        price: 'paid',
        priceAmount: '₹499',
        speaker: 'Elena Rodriguez',
        speakerTitle: 'Certified Ergonomics Specialist',
        registrationUrl: 'https://forms.skmphysiotherapy.com/ergonomics-workshop',
        tags: ['ergonomics', 'IT professionals', 'desk injuries', 'posture', 'workshop'],
        status: 'upcoming',
        featured: true,
    },
    {
        id: 'e3',
        title: 'Webinar: Sports Injury Prevention for Weekend Warriors',
        slug: 'sports-injury-prevention-webinar',
        description: 'Live online session covering warm-up techniques, proper form for common exercises, recovery strategies, and when to seek professional help. Q&A session included.',
        startDate: '2024-08-18',
        endDate: '2024-08-18',
        startTime: '19:00',
        endTime: '20:30',
        location: 'Online',
        venue: 'Zoom Webinar (Link provided after registration)',
        category: 'webinar',
        price: 'free',
        speaker: 'Dr. Kapil',
        speakerTitle: 'Sports Physiotherapy Specialist, M.P.T.',
        registrationUrl: 'https://forms.skmphysiotherapy.com/sports-webinar',
        tags: ['sports injury', 'prevention', 'webinar', 'online', 'weekend warriors'],
        status: 'upcoming',
        featured: false,
    },
    {
        id: 'e4',
        title: 'Annual Physiotherapy Conference: Innovations in Rehabilitation 2024',
        slug: 'annual-physio-conference-2024',
        description: 'Two-day conference featuring leading experts discussing latest advances in physiotherapy, robotic rehabilitation, tele-rehabilitation, and evidence-based practice. CME credits available.',
        startDate: '2024-09-14',
        endDate: '2024-09-15',
        startTime: '09:00',
        endTime: '18:00',
        location: 'Delhi',
        venue: 'India Habitat Centre, Lodhi Road, New Delhi',
        category: 'conference',
        capacity: 300,
        registered: 187,
        price: 'paid',
        priceAmount: '₹2,999 (Students: ₹1,499)',
        speaker: 'Multiple Speakers',
        speakerTitle: 'National & International Experts',
        registrationUrl: 'https://conference.skmphysiotherapy.com/2024',
        tags: ['conference', 'physiotherapy', 'innovation', 'CME', 'Delhi'],
        status: 'upcoming',
        featured: false,
    },
    {
        id: 'e5',
        title: 'Community Yoga & Wellness Morning',
        slug: 'community-yoga-wellness-morning',
        description: 'Start your Sunday with free community yoga, breathing exercises, and wellness talks. All fitness levels welcome. Mats provided. Bring water and comfortable clothing.',
        startDate: '2024-08-25',
        endDate: '2024-08-25',
        startTime: '06:30',
        endTime: '08:30',
        location: 'Greater Noida',
        venue: 'Pari Chowk Park, Greater Noida',
        category: 'community',
        capacity: 200,
        registered: 145,
        price: 'free',
        tags: ['yoga', 'community', 'wellness', 'free event', 'Sunday morning'],
        status: 'upcoming',
        featured: false,
    },
];

// ─────────────────────────────────────────────
//  Utility Functions
// ─────────────────────────────────────────────

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const formatShortDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
};

const getDaysUntil = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    return Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getNewsCategoryInfo = (id: string) => {
    return NEWS_CATEGORIES.find(c => c.id === id) || NEWS_CATEGORIES[0];
};

const getEventCategoryInfo = (id: string) => {
    return EVENT_CATEGORIES.find(c => c.id === id) || EVENT_CATEGORIES[0];
};

// ─────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

// ─────────────────────────────────────────────
//  Modal Component
// ─────────────────────────────────────────────

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

function Modal({ isOpen, onClose, title, children, size = 'lg' }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        aria-hidden="true"
                    />
                    <motion.div
                        ref={modalRef}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div
                            className={`pointer-events-auto w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <h2 id="modal-title" className="text-xl font-bold text-gray-900">{title}</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close modal">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5">{children}</div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─────────────────────────────────────────────
//  News Card Component
// ─────────────────────────────────────────────

interface NewsCardProps {
    item: NewsItem;
    onOpen: (item: NewsItem) => void;
}

function NewsCard({ item, onOpen }: NewsCardProps) {
    const category = getNewsCategoryInfo(item.category);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: '-50px' });

    return (
        <motion.article
            ref={cardRef}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{ y: -4 }}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
        >
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${category.color}, #6366f1)` }} />

            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: `${category.color}15`, color: category.color }}
                    >
                        <span className="text-xs">{category.icon}</span>
                        <span className="hidden sm:inline">{category.name}</span>
                    </span>
                    {item.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            <Sparkles className="w-3 h-3" />
                            <span className="hidden sm:inline">Featured</span>
                        </span>
                    )}
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                    </span>
                </div>

                <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => onOpen(item)}
                >
                    {item.title}
                </h3>
                <p
                    className="text-gray-600 text-sm line-clamp-2 mb-4 cursor-pointer"
                    onClick={() => onOpen(item)}
                >
                    {item.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatShortDate(item.publishedDate)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.readTime}
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        {item.views.toLocaleString()}
                    </span>
                </div>

                {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.article>
    );
}

// ─────────────────────────────────────────────
//  Event Card Component
// ─────────────────────────────────────────────

interface EventCardProps {
    item: EventItem;
    onOpen: (item: EventItem) => void;
    onRegister: (item: EventItem) => void;
}

function EventCard({ item, onOpen, onRegister }: EventCardProps) {
    const category = getEventCategoryInfo(item.category);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: '-50px' });
    const daysUntil = getDaysUntil(item.startDate);

    const getStatusBadge = () => {
        if (item.status === 'past') return { label: 'Completed', color: 'bg-gray-100 text-gray-600' };
        if (item.status === 'ongoing') return { label: 'Live Now', color: 'bg-emerald-100 text-emerald-700' };
        if (daysUntil <= 3) return { label: `In ${daysUntil} days`, color: 'bg-red-100 text-red-700' };
        return { label: `In ${daysUntil} days`, color: 'bg-indigo-100 text-indigo-700' };
    };

    const statusBadge = getStatusBadge();

    return (
        <motion.article
            ref={cardRef}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={{ y: -4 }}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
        >
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${category.color}, #6366f1)` }} />

            <div className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: `${category.color}15`, color: category.color }}
                    >
                        <span className="text-xs">{category.icon}</span>
                        <span className="hidden sm:inline">{category.name}</span>
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                        {statusBadge.label}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => onOpen(item)}
                >
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span>{formatDate(item.startDate)}{item.endDate !== item.startDate && ` - ${formatDate(item.endDate)}`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span>{formatTime(item.startTime)} - {formatTime(item.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span className="line-clamp-1">{item.venue}</span>
                    </div>
                    {item.speaker && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                            <span>{item.speaker}</span>
                        </div>
                    )}
                </div>

                {/* Price & Capacity */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.price === 'free' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                            {item.price === 'free' ? 'FREE' : item.priceAmount}
                        </span>
                        {item.capacity && (
                            <span className="text-xs text-gray-500">
                                {item.registered}/{item.capacity} registered
                            </span>
                        )}
                    </div>
                    {item.status === 'upcoming' && (
                        <button
                            onClick={() => onRegister(item)}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all"
                        >
                            {item.registrationUrl ? 'Register' : 'RSVP'}
                        </button>
                    )}
                </div>

                {/* Tags */}
                {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.article>
    );
}

// ─────────────────────────────────────────────
//  News Detail Modal Content
// ─────────────────────────────────────────────

interface NewsDetailProps {
    item: NewsItem;
    onShare: () => void;
}

function NewsDetailContent({ item, onShare }: NewsDetailProps) {
    const category = getNewsCategoryInfo(item.category);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`https://skmphysiotherapy.com/news/${item.slug}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <article className="prose prose-lg max-w-none">
            <header className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                        style={{ background: `${category.color}15`, color: category.color }}
                    >
                        <span>{category.icon}</span>
                        {category.name}
                    </span>
                    {item.featured && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                            <Sparkles className="w-3 h-3" />
                            Featured
                        </span>
                    )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">{item.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.publishedDate)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {item.readTime} read
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: `linear-gradient(135deg, ${category.color}, #6366f1)` }}
                    >
                        {item.author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{item.author}</p>
                        <p className="text-sm text-gray-500">{item.authorTitle}</p>
                    </div>
                </div>
            </header>

            <div className="text-gray-700 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: item.content }} />

            {item.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-3">Related Topics:</p>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    {item.views.toLocaleString()} views
                </span>
                <div className="flex items-center gap-2">
                    <button onClick={onShare} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share">
                        <Share2 className="w-5 h-5 text-gray-500" />
                    </button>
                    <button onClick={handleCopy} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Copy link">
                        {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-gray-500" />}
                    </button>
                </div>
            </div>
        </article>
    );
}

// ─────────────────────────────────────────────
//  Event Detail Modal Content
// ─────────────────────────────────────────────

interface EventDetailProps {
    item: EventItem;
    onRegister: () => void;
}

function EventDetailContent({ item, onRegister }: EventDetailProps) {
    const category = getEventCategoryInfo(item.category);
    const daysUntil = getDaysUntil(item.startDate);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                        style={{ background: `${category.color}15`, color: category.color }}
                    >
                        <span>{category.icon}</span>
                        {category.name}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'past' ? 'bg-gray-100 text-gray-600' :
                            item.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-indigo-100 text-indigo-700'
                        }`}>
                        {item.status === 'past' ? 'Completed' : item.status === 'ongoing' ? 'Live Now' : `Starts in ${daysUntil} days`}
                    </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{item.title}</h1>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Date</p>
                        <p className="text-sm text-gray-600">
                            {formatDate(item.startDate)}
                            {item.endDate !== item.startDate && ` - ${formatDate(item.endDate)}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Time</p>
                        <p className="text-sm text-gray-600">
                            {formatTime(item.startTime)} - {formatTime(item.endTime)}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl sm:col-span-2">
                    <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Venue</p>
                        <p className="text-sm text-gray-600">{item.venue}</p>
                    </div>
                </div>
                {item.speaker && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl sm:col-span-2">
                        <Users className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Speaker</p>
                            <p className="text-sm text-gray-600">{item.speaker} {item.speakerTitle && `• ${item.speakerTitle}`}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Event</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Price & Registration */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div>
                    <p className="text-sm font-medium text-indigo-900">Registration Fee</p>
                    <p className={`text-2xl font-bold ${item.price === 'free' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                        {item.price === 'free' ? 'FREE' : item.priceAmount}
                    </p>
                </div>
                {item.status === 'upcoming' && (
                    <button
                        onClick={onRegister}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all flex items-center gap-2"
                    >
                        <ArrowRight className="w-5 h-5" />
                        {item.registrationUrl ? 'Register Now' : 'RSVP Now'}
                    </button>
                )}
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
//  Share Modal Content
// ─────────────────────────────────────────────

function ShareContent({ url, title }: { url: string; title: string }) {
    const [copied, setCopied] = useState(false);

    const shareLinks = [
        { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=skmphysio`, color: 'hover:bg-sky-500' },
        { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: 'hover:bg-blue-600' },
        { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: 'hover:bg-blue-700' },
        { name: 'WhatsApp', icon: Phone, url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, color: 'hover:bg-green-600' },
    ];

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Share this {url.includes('/news/') ? 'article' : 'event'}:</p>
                <div className="flex flex-wrap gap-3">
                    {shareLinks.map((share) => (
                        <a
                            key={share.name}
                            href={share.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium transition-colors ${share.color} hover:text-white`}
                        >
                            <share.icon className="w-4 h-4" />
                            {share.name}
                        </a>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Or copy the link:</p>
                <div className="flex gap-2">
                    <input type="text" value={url} readOnly className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
                    <button onClick={handleCopy} className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
//  Registration Modal Content
// ─────────────────────────────────────────────

function RegisterContent({ item, onClose }: { item: EventItem; onClose: () => void }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitting(false);
        setSubmitted(true);
        setTimeout(onClose, 2000);
    };

    if (submitted) {
        return (
            <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600">You're registered for "{item.title}". Check your email for confirmation.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-sm font-medium text-indigo-900">{item.title}</p>
                <p className="text-xs text-indigo-700 mt-1">{formatDate(item.startDate)} • {item.location}</p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="Enter your full name"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="your.email@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="+91 98765 43210"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                    value={form.message}
                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                    placeholder="Any questions or special requirements..."
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {submitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</>
                ) : (
                    <><CheckCircle className="w-5 h-5" /> Confirm Registration</>
                )}
            </button>
        </form>
    );
}

// ─────────────────────────────────────────────
//  Main News & Events Page Component
// ─────────────────────────────────────────────

export default function NewsEventsPage() {
    // State
    const [news] = useState<NewsItem[]>(MOCK_NEWS);
    const [events] = useState<EventItem[]>(MOCK_EVENTS);
    const [filters, setFilters] = useState<FilterState>({
        type: 'all',
        category: 'all',
        location: 'All Locations',
        search: '',
        sortBy: 'newest',
        eventStatus: 'all',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [modal, setModal] = useState<ModalState>({ type: null, isOpen: false });
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Refs
    const headerRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();
    const headerControls = useAnimation();
    const showScrollTop = useInView(headerRef, { margin: '-100px' });

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Header scroll effect
    useEffect(() => {
        headerControls.start({
            y: scrollY.get() > 50 ? -100 : 0,
            transition: { duration: 0.2 },
        });
    }, [scrollY, headerControls]);

    // Filter news
    const filteredNews = useMemo(() => {
        let result = [...news];
        if (filters.category !== 'all') result = result.filter(n => n.category === filters.category);
        if (filters.location !== 'All Locations') result = result.filter(n => n.location === filters.location);
        if (debouncedSearch) {
            const q = debouncedSearch.toLowerCase();
            result = result.filter(n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.tags.some(t => t.toLowerCase().includes(q)));
        }
        switch (filters.sortBy) {
            case 'oldest': result.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()); break;
            case 'popular': result.sort((a, b) => b.views - a.views); break;
            default: result.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        }
        return result;
    }, [news, filters.category, filters.location, debouncedSearch, filters.sortBy]);

    // Filter events
    const filteredEvents = useMemo(() => {
        let result = [...events];
        if (filters.category !== 'all') result = result.filter(e => e.category === filters.category);
        if (filters.location !== 'All Locations') result = result.filter(e => e.location === filters.location);
        if (filters.eventStatus !== 'all') result = result.filter(e => e.status === filters.eventStatus);
        if (debouncedSearch) {
            const q = debouncedSearch.toLowerCase();
            result = result.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.tags.some(t => t.toLowerCase().includes(q)));
        }
        switch (filters.sortBy) {
            case 'oldest': result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()); break;
            case 'popular': result.sort((a, b) => (b.registered || 0) - (a.registered || 0)); break;
            default: result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        }
        return result;
    }, [events, filters.category, filters.location, filters.eventStatus, debouncedSearch, filters.sortBy]);

    // Handlers
    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const openNewsDetail = (item: NewsItem) => setModal({ type: 'news-detail', item, isOpen: true });
    const openEventDetail = (item: EventItem) => setModal({ type: 'event-detail', item, isOpen: true });
    const openRegister = (item: EventItem) => setModal({ type: 'register', item, isOpen: true });
    const openShare = (item: NewsItem | EventItem) => {
        const slug = 'slug' in item ? item.slug : item.slug;
        const type = 'excerpt' in item ? 'news' : 'events';
        setModal({ type: 'share', data: { ...item, shareUrl: `https://skmphysiotherapy.com/${type}/${slug}` }, isOpen: true });
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const featuredNews = news.filter(n => n.featured).slice(0, 2);
    const featuredEvents = events.filter(e => e.featured).slice(0, 2);
    const upcomingEvents = events.filter(e => e.status === 'upcoming').sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).slice(0, 4);

    return (
        <div className="min-h-screen bg-white">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className={`fixed top-4 left-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                    >
                        {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-medium">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.header ref={headerRef} animate={headerControls} className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
                                <Newspaper className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">News & Events</span>
                        </div>
                        <div className="flex-1 max-w-xl mx-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleFilterChange('search', debouncedSearch)}
                                    placeholder="Search news & events..."
                                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
                                        <X className="w-4 h-4 text-gray-400" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <a href="mailto:events@skmphysiotherapy.com" className="hidden sm:flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all">
                                <Mail className="w-4 h-4" />
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero */}
            <section className="relative py-12 sm:py-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Stay Updated with SKM Physiotherapy
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            News, Health Camps &{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
                                Community Events
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Discover expert health tips, join free wellness workshops, and be part of our growing community dedicated to better health.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#events" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                                <Calendar className="w-5 h-5" />
                                Upcoming Events
                            </a>
                            <a href="#news" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                                <Newspaper className="w-5 h-5" />
                                Latest News
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Type Toggle */}
                        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                            {(['all', 'news', 'events'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => handleFilterChange('type', type)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors ${filters.type === type ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {type === 'all' ? 'All' : type === 'news' ? 'News' : 'Events'}
                                </button>
                            ))}
                        </div>

                        {/* Category */}
                        <div className="relative">
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                            >
                                {(filters.type === 'events' ? EVENT_CATEGORIES : NEWS_CATEGORIES).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Location */}
                        <div className="relative">
                            <select
                                value={filters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                            >
                                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Event Status */}
                        {filters.type === 'events' && (
                            <div className="relative">
                                <select
                                    value={filters.eventStatus}
                                    onChange={(e) => handleFilterChange('eventStatus', e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                                >
                                    <option value="all">All Events</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Live Now</option>
                                    <option value="past">Past</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        )}

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                            >
                                <option value="newest">↓ Newest</option>
                                <option value="oldest">↓ Oldest</option>
                                <option value="popular">↓ Most Popular</option>
                            </select>
                            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Clear */}
                        {(filters.category !== 'all' || filters.location !== 'All Locations' || filters.eventStatus !== 'all' || debouncedSearch) && (
                            <button
                                onClick={() => setFilters({ type: filters.type, category: 'all', location: 'All Locations', search: '', sortBy: 'newest', eventStatus: 'all' })}
                                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                            >
                                <X className="w-4 h-4" />
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-16">

                    {/* Featured Events Section */}
                    {(filters.type === 'all' || filters.type === 'events') && featuredEvents.length > 0 && filters.category === 'all' && filters.location === 'All Locations' && (
                        <section id="events">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Upcoming <span className="text-indigo-600">Events</span>
                                </h2>
                                <button onClick={() => handleFilterChange('type', 'events')} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                    View All
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {featuredEvents.map(event => (
                                    <EventCard key={event.id} item={event} onOpen={openEventDetail} onRegister={openRegister} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Featured News Section */}
                    {(filters.type === 'all' || filters.type === 'news') && featuredNews.length > 0 && filters.category === 'all' && filters.location === 'All Locations' && (
                        <section id="news">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Featured <span className="text-emerald-600">News</span>
                                </h2>
                                <button onClick={() => handleFilterChange('type', 'news')} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                    View All
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {featuredNews.map(item => (
                                    <NewsCard key={item.id} item={item} onOpen={openNewsDetail} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Events Grid */}
                    {(filters.type === 'all' || filters.type === 'events') && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {filters.type === 'events' ? 'All Events' : 'Events'}
                                    <span className="text-sm font-normal text-gray-500 ml-2">({filteredEvents.length} found)</span>
                                </h2>
                            </div>
                            {filteredEvents.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                                    <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new events.</p>
                                </div>
                            ) : (
                                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
                                    <AnimatePresence mode="popLayout">
                                        {filteredEvents.map(item => (
                                            <EventCard key={item.id} item={item} onOpen={openEventDetail} onRegister={openRegister} />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </section>
                    )}

                    {/* News Grid */}
                    {(filters.type === 'all' || filters.type === 'news') && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {filters.type === 'news' ? 'All News' : 'Latest News'}
                                    <span className="text-sm font-normal text-gray-500 ml-2">({filteredNews.length} found)</span>
                                </h2>
                            </div>
                            {filteredNews.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Newspaper className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No news articles found</h3>
                                    <p className="text-gray-600 mb-6">Try adjusting your filters or check back for new updates.</p>
                                </div>
                            ) : (
                                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
                                    <AnimatePresence mode="popLayout">
                                        {filteredNews.map(item => (
                                            <NewsCard key={item.id} item={item} onOpen={openNewsDetail} />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </section>
                    )}

                    {/* Newsletter CTA */}
                    <section className="relative py-12 px-6 sm:px-12 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full" />
                        </div>
                        <div className="relative text-center max-w-2xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Never Miss an Update</h2>
                            <p className="text-white/80 mb-8">Subscribe to receive news, health tips, and event invitations directly to your inbox.</p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/30 outline-none"
                                />
                                <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-white/60 text-sm mt-4">No spam • Unsubscribe anytime</p>
                        </div>
                    </section>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
                                    <Newspaper className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">SKM News & Events</span>
                            </div>
                            <p className="text-gray-600 text-sm">Stay connected with SKM Physiotherapy for the latest health insights, community events, and wellness initiatives.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Our Services</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Book Appointment</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
                            <div className="space-y-3 text-sm">
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-4 h-4 text-indigo-600" />
                                    <a href="mailto:events@skmphysiotherapy.com" className="hover:text-indigo-600">events@skmphysiotherapy.com</a>
                                </p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-4 h-4 text-indigo-600" />
                                    <a href="tel:+917982799147" className="hover:text-indigo-600">+91 79827 99147</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} SKM Physiotherapy. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <Modal isOpen={modal.isOpen && modal.type === 'news-detail'} onClose={() => setModal({ type: null, isOpen: false })} title="News Article" size="xl">
                {modal.data && 'excerpt' in modal.data && <NewsDetailContent item={modal.data} onShare={() => setModal({ type: 'share', data: { ...modal.data, shareUrl: `https://skmphysiotherapy.com/news/${modal.data.slug}` }, isOpen: true })} />}
            </Modal>

            <Modal isOpen={modal.isOpen && modal.type === 'event-detail'} onClose={() => setModal({ type: null, isOpen: false })} title="Event Details" size="lg">
                {modal.data && 'startDate' in modal.data && <EventDetailContent item={modal.data} onRegister={() => setModal({ type: 'register', data: modal.data, isOpen: true })} />}
            </Modal>

            <Modal isOpen={modal.isOpen && modal.type === 'share'} onClose={() => setModal({ type: null, isOpen: false })} title="Share" size="md">
                {modal.data && 'shareUrl' in modal.data && <ShareContent url={modal.data.shareUrl as string} title={modal.data.title} />}
            </Modal>

            <Modal isOpen={modal.isOpen && modal.type === 'register'} onClose={() => setModal({ type: null, isOpen: false })} title="Register for Event" size="md">
                {modal.data && 'startDate' in modal.data && <RegisterContent item={modal.data} onClose={() => setModal({ type: null, isOpen: false })} />}
            </Modal>

            {/* Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}