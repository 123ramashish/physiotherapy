'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useInView, useAnimation } from 'framer-motion';
import {
    Calendar, Clock, Download, Share2, Mail, Twitter, Facebook, Linkedin,
    ChevronDown, ChevronUp, Search, Filter, Tag, ArrowUp, X, CheckCircle,
    AlertCircle, Loader2, ExternalLink, Newspaper, Award, Building2,
    Users, Heart, TrendingUp, MapPin, Phone, Globe, FileText, Bookmark,
    Copy, Check, ChevronLeft, ChevronRight, SlidersHorizontal
} from 'lucide-react';
import Script from 'next/script';

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────

interface PressRelease {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedDate: string;
    modifiedDate?: string;
    category: 'announcement' | 'award' | 'expansion' | 'research' | 'community' | 'partnership';
    location: string;
    author: string;
    authorTitle: string;
    featuredImage?: string;
    attachments?: Array<{ name: string; url: string; size: string }>;
    relatedLinks?: Array<{ title: string; url: string }>;
    tags: string[];
    views: number;
    downloads: number;
    featured: boolean;
    readTime?: string;
}

interface FilterState {
    category: string;
    year: string;
    location: string;
    search: string;
    sortBy: 'newest' | 'oldest' | 'popular';
}

interface ModalState {
    type: 'detail' | 'share' | null;
    data?: PressRelease | null;
    isOpen: boolean;
}

// ─────────────────────────────────────────────
//  Mock Data (Replace with CMS/API)
// ─────────────────────────────────────────────

const CATEGORIES = [
    { id: 'all', name: 'All News', icon: '📰', color: '#6366f1' },
    { id: 'announcement', name: 'Announcements', icon: '📢', color: '#10b981' },
    { id: 'award', name: 'Awards & Recognition', icon: '🏆', color: '#f59e0b' },
    { id: 'expansion', name: 'Clinic Expansions', icon: '🏥', color: '#3b82f6' },
    { id: 'research', name: 'Research & Innovation', icon: '🔬', color: '#8b5cf6' },
    { id: 'community', name: 'Community Initiatives', icon: '🤝', color: '#059669' },
    { id: 'partnership', name: 'Partnerships', icon: '🤝', color: '#ec4899' },
] as const;

const YEARS = ['2024', '2023', '2022', '2021'];
const LOCATIONS = ['All Locations', 'Greater Noida', 'Noida', 'Delhi', 'Gurgaon', 'National'];

const PRESS_RELEASES: PressRelease[] = [
    {
        id: '1',
        title: 'SKM Physiotherapy Launches Advanced Neuro-Rehabilitation Centre in Greater Noida',
        slug: 'neuro-rehab-centre-launch-greater-noida',
        excerpt: 'SKM Physiotherapy announces the opening of a state-of-the-art neuro-rehabilitation centre in Beta 1, Greater Noida, featuring cutting-edge technology for stroke recovery and neurological conditions.',
        content: `<h2>Revolutionary Care for Neurological Recovery</h2><p><strong>Greater Noida, Uttar Pradesh – March 15, 2024</strong> – SKM Physiotherapy & Rehabilitation Centre today announced the grand opening of its specialized Neuro-Rehabilitation Centre at the Beta 1 clinic, marking a significant milestone in advanced neurological care for the NCR region.</p><h3>State-of-the-Art Facilities</h3><p>The new centre spans 2,500 sq. ft. and is equipped with:</p><ul><li><strong>Robotic Gait Training Systems:</strong> For precise, repetitive movement therapy to retrain walking patterns post-stroke</li><li><strong>Virtual Reality Rehabilitation:</strong> Immersive environments to improve balance, coordination & cognitive function</li><li><strong>EMG Biofeedback Technology:</strong> Real-time muscle activity monitoring for targeted recovery</li><li><strong>Hydrotherapy Pool:</strong> Warm water therapy for low-impact strength building</li></ul><h3>Expert Team</h3><p>The centre is led by Dr. Shravan Kumar (B.P.T., Certified Neuro-Rehab Specialist) with a dedicated team of 5 physiotherapists trained in advanced neurological techniques including Bobath, PNF, and Constraint-Induced Movement Therapy.</p><blockquote>"Neurological recovery requires patience, precision, and personalized care. Our new centre combines evidence-based protocols with compassionate support to help patients regain independence and quality of life."</blockquote><p><em>— Dr. Shravan Kumar, Founder & Lead Physiotherapist</em></p><h3>Conditions Treated</h3><p>The centre specializes in rehabilitation for: Stroke recovery, Parkinson's disease, Multiple Sclerosis, Spinal cord injuries, Traumatic brain injury, Bell's Palsy, and Post-surgical neurological recovery.</p><h3>Community Impact</h3><p>SKM Physiotherapy will offer monthly free screening camps for neurological conditions and has partnered with local hospitals for seamless referral pathways.</p><p><strong>About SKM Physiotherapy:</strong> Founded in 2018, SKM Physiotherapy operates clinics across Noida, Greater Noida, Delhi & Gurgaon, providing evidence-based care for pain management, sports injuries, and neurological rehabilitation.</p>`,
        publishedDate: '2024-03-15T09:00:00.000Z',
        modifiedDate: '2024-03-15T09:00:00.000Z',
        category: 'expansion',
        location: 'Greater Noida',
        author: 'Dr. Shravan Kumar',
        authorTitle: 'Founder & Lead Physiotherapist',
        featuredImage: 'https://www.skmphysiotherapy.com/images/neuro-centre-launch.jpg',
        attachments: [
            { name: 'Press Release PDF', url: '/press/neuro-centre-launch.pdf', size: '245 KB' },
            { name: 'High-Res Images', url: '/press/neuro-centre-images.zip', size: '12.4 MB' },
        ],
        relatedLinks: [
            { title: 'Neuro-Rehabilitation Services', url: '/services-skm-physiotherapy/neuro-rehab' },
            { title: 'Book a Consultation', url: '/contact-skm-physiotherapy' },
        ],
        tags: ['neuro-rehabilitation', 'stroke recovery', 'Greater Noida', 'clinic expansion', 'robotic therapy'],
        views: 2847,
        downloads: 156,
        featured: true,
    },
    {
        id: '2',
        title: 'Dr. Shravan Kumar Receives "Excellence in Physiotherapy" Award at National Healthcare Summit 2024',
        slug: 'excellence-award-national-summit-2024',
        excerpt: 'SKM Physiotherapy founder Dr. Shravan Kumar honored with prestigious national award for contributions to evidence-based physiotherapy practice and community health initiatives.',
        content: `<h2>National Recognition for Clinical Excellence</h2><p><strong>New Delhi – February 28, 2024</strong> – Dr. Shravan Kumar, Founder of SKM Physiotherapy & Rehabilitation Centre, was conferred the "Excellence in Physiotherapy Practice" award at the National Healthcare Summit 2024, organized by the Indian Medical Association.</p><h3>Award Criteria</h3><p>The award recognizes practitioners who demonstrate:</p><ul><li>Clinical excellence through evidence-based protocols</li><li>Innovation in treatment methodologies</li><li>Commitment to continuing education & research</li><li>Meaningful community health impact</li></ul><h3>Dr. Kumar's Contributions</h3><p>Since founding SKM Physiotherapy in 2018, Dr. Kumar has:</p><ul><li>Treated over 3,000 patients across NCR with documented outcome improvements</li><li>Published 5 peer-reviewed articles on pain management techniques</li><li>Conducted 50+ free community health camps reaching 2,000+ residents</li><li>Mentored 15+ junior physiotherapists through structured training programs</li></ul><blockquote>"This recognition belongs to our entire team and the patients who trust us with their recovery journey. Our mission has always been to make expert physiotherapy accessible, affordable, and outcome-focused."</blockquote><p><em>— Dr. Shravan Kumar</em></p><h3>What's Next</h3><p>SKM Physiotherapy will use this momentum to launch a research initiative on "Tele-Rehabilitation Efficacy in Rural Uttar Pradesh" in partnership with AIIMS Delhi.</p>`,
        publishedDate: '2024-02-28T10:30:00.000Z',
        category: 'award',
        location: 'National',
        author: 'Media Team, SKM Physiotherapy',
        authorTitle: 'Communications',
        tags: ['award', 'Dr. Shravan Kumar', 'national recognition', 'healthcare summit', 'excellence'],
        views: 4521,
        downloads: 289,
        featured: true,
    },
    {
        id: '3',
        title: 'SKM Physiotherapy Partners with Delhi Sports Authority for Athlete Wellness Program',
        slug: 'delhi-sports-authority-partnership',
        excerpt: 'Strategic partnership brings specialized sports physiotherapy services to 500+ registered athletes across Delhi NCR, focusing on injury prevention and performance optimization.',
        content: `<h2>Empowering Athletes Through Expert Care</h2><p><strong>Noida, Uttar Pradesh – January 20, 2024</strong> – SKM Physiotherapy announced a strategic partnership with the Delhi Sports Authority (DSA) to provide comprehensive physiotherapy support to registered athletes across the National Capital Region.</p><h3>Program Highlights</h3><p>The "Athlete Wellness Initiative" includes:</p><ul><li><strong>Pre-Season Screening:</strong> Biomechanical assessments to identify injury risks</li><li><strong>Personalized Prevention Plans:</strong> Custom exercises for sport-specific demands</li><li><strong>Rapid Response Injury Care:</strong> Priority appointments for acute sports injuries</li><li><strong>Performance Optimization:</strong> Mobility, strength & recovery protocols</li><li><strong>Educational Workshops:</strong> Monthly sessions on nutrition, sleep & mental wellness</li></ul><h3>Expertise in Sports Medicine</h3><p>The program is led by Dr. Kapil (M.P.T. Sports Medicine) and includes specialists in: Running biomechanics, Contact sport injury management, Overuse injury prevention, Return-to-play protocols, and Concussion management.</p><blockquote>"Athletes push their bodies to the limit. Our role is to ensure they can do so safely, recover effectively from setbacks, and perform at their peak through science-backed care."</blockquote><p><em>— Dr. Kapil, Sports Physiotherapy Lead</em></p><h3>Access & Eligibility</h3><p>The program is available to all DSA-registered athletes. Non-registered athletes can access services at standard rates. Contact skmphysiotherapy@gmail.com for enrollment details.</p>`,
        publishedDate: '2024-01-20T11:00:00.000Z',
        category: 'partnership',
        location: 'Delhi',
        author: 'SKM Physiotherapy Media Team',
        authorTitle: 'Communications',
        tags: ['sports physiotherapy', 'partnership', 'Delhi Sports Authority', 'athlete wellness', 'injury prevention'],
        views: 1893,
        downloads: 94,
        featured: false,
    },
    // Add more press releases as needed...
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

const getCategoryInfo = (id: string) => {
    return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
};

const generatePressReleaseSchema = (release: PressRelease): any => ({
    '@context': 'https://schema.org',
    '@type': 'PressRelease',
    headline: release.title,
    datePublished: release.publishedDate,
    dateModified: release.modifiedDate || release.publishedDate,
    author: {
        '@type': 'Organization',
        name: 'SKM Physiotherapy & Rehabilitation Centre',
        url: 'https://www.skmphysiotherapy.com',
    },
    publisher: {
        '@type': 'Organization',
        name: 'SKM Physiotherapy',
        url: 'https://www.skmphysiotherapy.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://www.skmphysiotherapy.com/logo-schema.jpg',
            width: 600,
            height: 60,
        },
    },
    description: release.excerpt,
    image: release.featuredImage ? {
        '@type': 'ImageObject',
        url: release.featuredImage,
        width: 1200,
        height: 630,
    } : undefined,
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.skmphysiotherapy.com/press-releases/${release.slug}`,
    },
    about: {
        '@type': 'MedicalBusiness',
        name: 'SKM Physiotherapy',
        url: 'https://www.skmphysiotherapy.com',
    },
    keywords: release.tags.join(', '),
    locationCreated: release.location,
});

// ─────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────

const fadeInUp: any = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const modalVariants: any = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const backdropVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
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
//  Press Release Card Component
// ─────────────────────────────────────────────

interface PressCardProps {
    release: PressRelease;
    onOpen: (release: PressRelease) => void;
}

function PressCard({ release, onOpen }: PressCardProps) {
    const category = getCategoryInfo(release.category);
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
            {/* Category Bar */}
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
                    {release.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                            <Award className="w-3 h-3" />
                            <span className="hidden sm:inline">Featured</span>
                        </span>
                    )}
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {release.location}
                    </span>
                </div>

                {/* Title & Excerpt */}
                <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => onOpen(release)}
                >
                    {release.title}
                </h3>
                <p
                    className="text-gray-600 text-sm line-clamp-2 mb-4 cursor-pointer"
                    onClick={() => onOpen(release)}
                >
                    {release.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatShortDate(release.publishedDate)}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {release.readTime || '3 min read'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {release.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {release.downloads}
                        </span>
                    </div>
                </div>

                {/* Tags */}
                {release.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {release.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                #{tag}
                            </span>
                        ))}
                        {release.tags.length > 3 && (
                            <span className="px-2 py-0.5 text-gray-400 text-xs">+{release.tags.length - 3} more</span>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    );
}

// ─────────────────────────────────────────────
//  Press Release Detail Modal Content
// ─────────────────────────────────────────────

interface DetailContentProps {
    release: PressRelease;
    onShare: () => void;
}

function DetailContent({ release, onShare }: DetailContentProps) {
    const category = getCategoryInfo(release.category);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href + `#${release.slug}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <article className="prose prose-lg max-w-none">
            {/* Structured Data for this release */}
            <Script
                id={`schema-press-${release.id}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePressReleaseSchema(release)) }}
            />

            {/* Header */}
            <header className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                        style={{ background: `${category.color}15`, color: category.color }}
                    >
                        <span>{category.icon}</span>
                        {category.name}
                    </span>
                    {release.featured && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                            <Award className="w-3 h-3" />
                            Featured
                        </span>
                    )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">{release.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Published: {formatDate(release.publishedDate)}
                    </span>
                    {release.modifiedDate && release.modifiedDate !== release.publishedDate && (
                        <>
                            <span>•</span>
                            <span>Updated: {formatDate(release.modifiedDate)}</span>
                        </>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {release.location}
                    </span>
                </div>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: `linear-gradient(135deg, ${category.color}, #6366f1)` }}
                    >
                        {release.author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{release.author}</p>
                        <p className="text-sm text-gray-500">{release.authorTitle}</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="text-gray-700 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: release.content }} />

            {/* Tags */}
            {release.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-3">Related Topics:</p>
                    <div className="flex flex-wrap gap-2">
                        {release.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Attachments */}
            {release.attachments && release.attachments.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-3">Media Resources:</p>
                    <div className="space-y-2">
                        {release.attachments.map((file, i) => (
                            <a
                                key={i}
                                href={file.url}
                                download
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-indigo-600" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                                        <p className="text-xs text-gray-500">{file.size}</p>
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Links */}
            {release.relatedLinks && release.relatedLinks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-3">Learn More:</p>
                    <div className="space-y-2">
                        {release.relatedLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {link.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {release.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {release.downloads} downloads
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onShare} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share">
                        <Share2 className="w-5 h-5 text-gray-500" />
                    </button>
                    <button onClick={handleCopy} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Copy link">
                        {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-gray-500" />}
                    </button>
                    <a
                        href={`mailto:media@skmphysiotherapy.com?subject=Media Inquiry: ${encodeURIComponent(release.title)}`}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Contact media team"
                    >
                        <Mail className="w-5 h-5 text-gray-500" />
                    </a>
                </div>
            </div>
        </article>
    );
}

// ─────────────────────────────────────────────
//  Share Modal Content
// ─────────────────────────────────────────────

function ShareContent({ release }: { release: PressRelease }) {
    const url = `https://www.skmphysiotherapy.com/press-releases/${release.slug}`;
    const [copied, setCopied] = useState(false);

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(release.title)}&url=${encodeURIComponent(url)}&via=skmphysio`,
            color: 'hover:bg-sky-500',
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'hover:bg-blue-600',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: 'hover:bg-blue-700',
        },
        {
            name: 'Email',
            icon: Mail,
            url: `mailto:?subject=${encodeURIComponent(release.title)}&body=${encodeURIComponent(release.excerpt + '\n\n' + url)}`,
            color: 'hover:bg-gray-600',
        },
    ];

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Share this press release:</p>
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
                    <input
                        type="text"
                        value={url}
                        readOnly
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm"
                    />
                    <button
                        onClick={handleCopy}
                        className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-emerald-800">
                    <strong>Media Contact:</strong> For high-res images, executive interviews, or additional information, contact{' '}
                    <a href="mailto:media@skmphysiotherapy.com" className="text-emerald-700 hover:underline">
                        media@skmphysiotherapy.com
                    </a>{' '}
                    or call +91 79827 99147.
                </p>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
//  Main Press Releases Page Component
// ─────────────────────────────────────────────

export default function PressReleasesPage() {
    // State
    const [releases, setReleases] = useState<PressRelease[]>(PRESS_RELEASES);
    const [filters, setFilters] = useState<FilterState>({
        category: 'all',
        year: '',
        location: 'All Locations',
        search: '',
        sortBy: 'newest',
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

    // Filter releases
    const filteredReleases = useMemo(() => {
        let result = [...releases];

        // Category filter
        if (filters.category !== 'all') {
            result = result.filter((r) => r.category === filters.category);
        }

        // Year filter
        if (filters.year) {
            result = result.filter((r) => new Date(r.publishedDate).getFullYear().toString() === filters.year);
        }

        // Location filter
        if (filters.location !== 'All Locations') {
            result = result.filter((r) => r.location === filters.location);
        }

        // Search filter
        if (debouncedSearch) {
            const q = debouncedSearch.toLowerCase();
            result = result.filter(
                (r) =>
                    r.title.toLowerCase().includes(q) ||
                    r.excerpt.toLowerCase().includes(q) ||
                    r.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        // Sorting
        switch (filters.sortBy) {
            case 'oldest':
                result.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
                break;
            case 'popular':
                result.sort((a, b) => b.views - a.views);
                break;
            case 'newest':
            default:
                result.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        }

        return result;
    }, [releases, filters, debouncedSearch]);

    // Handlers
    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const openDetailModal = (release: PressRelease) => {
        setModal({ type: 'detail', data: release, isOpen: true });
        // Track view
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'press_release_view', {
                event_category: 'Engagement',
                event_label: release.slug,
                value: 1,
            });
        }
    };

    const openShareModal = (release: PressRelease) => {
        setModal({ type: 'share', data: release, isOpen: true });
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Derived data
    const featuredReleases = filteredReleases.filter((r) => r.featured).slice(0, 2);
    const regularReleases = filteredReleases.filter((r) => !r.featured);

    return (
        <div className="min-h-screen bg-white">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className={`fixed top-4 left-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 ${notification.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                    >
                        {notification.type === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.header
                ref={headerRef}
                animate={headerControls}
                className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
                                <Newspaper className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">SKM Press</span>
                        </div>

                        {/* Search */}
                        <div className="flex-1 max-w-xl mx-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleFilterChange('search', debouncedSearch)}
                                    placeholder="Search press releases..."
                                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                                    >
                                        <X className="w-4 h-4 text-gray-400" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <a
                                href="mailto:media@skmphysiotherapy.com"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                            >
                                <Mail className="w-4 h-4" />
                                Media Contact
                            </a>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="relative py-12 sm:py-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-6">
                            <Newspaper className="w-4 h-4" />
                            Official Press Releases
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            News &{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
                                Announcements
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Stay informed about SKM Physiotherapy's achievements, expansions, research contributions, and community health initiatives.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="mailto:media@skmphysiotherapy.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Mail className="w-5 h-5" />
                                Contact Media Team
                            </a>
                            <a
                                href="#releases"
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                            >
                                Browse Releases
                                <ChevronDown className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filters Bar */}
            <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category */}
                        <div className="relative">
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.icon} {cat.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Year */}
                        <div className="relative">
                            <select
                                value={filters.year}
                                onChange={(e) => handleFilterChange('year', e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                            >
                                <option value="">All Years</option>
                                {YEARS.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
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
                                {LOCATIONS.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                            >
                                <option value="newest">↓ Newest First</option>
                                <option value="oldest">↓ Oldest First</option>
                                <option value="popular">↓ Most Viewed</option>
                            </select>
                            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Clear Filters */}
                        {(filters.category !== 'all' || filters.year || filters.location !== 'All Locations' || debouncedSearch) && (
                            <button
                                onClick={() =>
                                    setFilters({ category: 'all', year: '', location: 'All Locations', search: '', sortBy: 'newest' })
                                }
                                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                            >
                                <X className="w-4 h-4" />
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main id="releases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
                    {/* Featured Section */}
                    {filters.category === 'all' && !filters.year && filters.location === 'All Locations' && !debouncedSearch && featuredReleases.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Featured <span className="text-indigo-600">Announcements</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {featuredReleases.map((release) => (
                                    <PressCard key={release.id} release={release} onOpen={openDetailModal} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Releases Grid */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                All Press Releases
                                <span className="text-sm font-normal text-gray-500 ml-2">({filteredReleases.length} found)</span>
                            </h2>
                        </div>

                        {filteredReleases.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No press releases found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
                                <button
                                    onClick={() =>
                                        setFilters({ category: 'all', year: '', location: 'All Locations', search: '', sortBy: 'newest' })
                                    }
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
                                <AnimatePresence mode="popLayout">
                                    {regularReleases.map((release) => (
                                        <PressCard key={release.id} release={release} onOpen={openDetailModal} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
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
                                <span className="text-xl font-bold text-gray-900">SKM Press</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Official newsroom for SKM Physiotherapy & Rehabilitation Centre. For media inquiries, contact our communications team.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Media Resources</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>
                                    <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Press Kit (PDF)
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Company Factsheet
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Leadership Bios
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        Brand Guidelines
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Media Contact</h4>
                            <div className="space-y-3 text-sm">
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-4 h-4 text-indigo-600" />
                                    <a href="mailto:media@skmphysiotherapy.com" className="hover:text-indigo-600">
                                        media@skmphysiotherapy.com
                                    </a>
                                </p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-4 h-4 text-indigo-600" />
                                    <a href="tel:+917982799147" className="hover:text-indigo-600">
                                        +91 79827 99147
                                    </a>
                                </p>
                                <p className="text-gray-500">Response within 24 business hours</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} SKM Physiotherapy. All press releases are © SKM Physiotherapy & Rehabilitation Centre.
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <Modal
                isOpen={modal.isOpen && modal.type === 'detail'}
                onClose={() => setModal({ type: null, isOpen: false })}
                title="Press Release"
                size="xl"
            >
                {modal.data && <DetailContent release={modal.data} onShare={() => setModal({ type: 'share', data: modal.data, isOpen: true })} />}
            </Modal>

            <Modal isOpen={modal.isOpen && modal.type === 'share'} onClose={() => setModal({ type: null, isOpen: false })} title="Share Press Release" size="md">
                {modal.data && <ShareContent release={modal.data} />}
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