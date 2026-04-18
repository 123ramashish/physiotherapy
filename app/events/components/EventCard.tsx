'use client';
// app/events/components/EventCard.tsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, Tag, Phone, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventItem } from '@/lib/events/types';
import { formatDate, formatTime } from '@/lib/utils';
import { getOptimizedUrl } from '@/lib/imagekit';

const getDaysUntil = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    return Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getCategoryInfo = (category: string) => {
    const categories: Record<string, { name: string; icon: string; color: string }> = {
        'health-camp': { name: 'Health Camp', icon: '🏥', color: '#10b981' },
        'workshop': { name: 'Workshop', icon: '🛠️', color: '#3b82f6' },
        'webinar': { name: 'Webinar', icon: '💻', color: '#8b5cf6' },
        'conference': { name: 'Conference', icon: '🎤', color: '#f59e0b' },
        'community': { name: 'Community', icon: '🤝', color: '#ec4899' },
        'screening': { name: 'Screening', icon: '🔍', color: '#6366f1' },
    };
    return categories[category] ?? { name: 'Event', icon: '📅', color: '#6366f1' };
};

const formatShortDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
    });

interface EventCardProps {
    event: EventItem;
    onOpen: (event: EventItem) => void;
    onRegister: (event: EventItem) => void;
    viewMode: 'grid' | 'list';
}

// ✅ Scrollable media gallery component
function MediaGallery({ event, category }: { event: EventItem; category: ReturnType<typeof getCategoryInfo> }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const mediaItems = [
        ...(event.featuredImage ? [{ url: event.featuredImage, type: 'image' as const, thumbnail: undefined as string | undefined }] : []),
        ...(event.gallery ?? []),
    ];

    if (mediaItems.length === 0) {
        return (
            <div
                className="h-48 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${category.color}15, ${category.color}05)` }}
            >
                <span className="text-4xl">{category.icon}</span>
            </div>
        );
    }

    const scroll = (dir: 'prev' | 'next') => {
        const el = scrollRef.current;
        if (!el) return;
        const newIndex = dir === 'next'
            ? Math.min(currentIndex + 1, mediaItems.length - 1)
            : Math.max(currentIndex - 1, 0);
        setCurrentIndex(newIndex);
        el.scrollTo({ left: newIndex * el.clientWidth, behavior: 'smooth' });
    };

    const statusLabel = (() => {
        if (event.status === 'past') return { label: 'Completed', cls: 'bg-gray-800/90 text-gray-200' };
        if (event.status === 'ongoing') return { label: 'Live Now', cls: 'bg-emerald-500 text-white' };
        if (event.status === 'cancelled') return { label: 'Cancelled', cls: 'bg-red-500 text-white' };
        return { label: 'Upcoming', cls: 'bg-indigo-500 text-white' };
    })();

    return (
        <div className="relative h-48 overflow-hidden group/gallery">
            {/* Scrollable track */}
            <div
                ref={scrollRef}
                className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {mediaItems.map((item, idx) => (
                    <div key={idx} className="flex-none w-full h-full snap-center relative">
                        {item.type === 'video' ? (
                            <>
                                <img
                                    src={item.thumbnail ?? 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=60'}
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <PlayCircle className="w-12 h-12 text-white opacity-90" />
                                </div>
                            </>
                        ) : (
                            <img
                                src={getOptimizedUrl(item.url, { w: 400, h: 250, f: 'auto' })}
                                alt={event.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Category badge */}
            <span
                className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                style={{ background: category.color }}
            >
                {category.icon} {category.name}
            </span>

            {/* Status badge */}
            <span className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusLabel.cls}`}>
                {statusLabel.label}
            </span>

            {/* Navigation arrows (only if multiple media) */}
            {mediaItems.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); scroll('prev'); }}
                        disabled={currentIndex === 0}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Previous media"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); scroll('next'); }}
                        disabled={currentIndex === mediaItems.length - 1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Next media"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {mediaItems.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(i);
                                    scrollRef.current?.scrollTo({ left: i * (scrollRef.current?.clientWidth ?? 0), behavior: 'smooth' });
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                aria-label={`Go to media ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function EventCard({ event, onOpen, onRegister, viewMode }: EventCardProps) {
    const category = getCategoryInfo(event.category);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: '-50px' });
    const daysUntil = getDaysUntil(event.startDate);

    const statusBadge = (() => {
        if (event.status === 'past') return { label: 'Completed', color: 'bg-gray-100 text-gray-600' };
        if (event.status === 'ongoing') return { label: 'Live Now', color: 'bg-emerald-100 text-emerald-700' };
        if (event.status === 'cancelled') return { label: 'Cancelled', color: 'bg-red-100 text-red-700' };
        if (event.status === 'full') return { label: 'Full', color: 'bg-orange-100 text-orange-700' };
        if (daysUntil <= 3 && daysUntil >= 0) return { label: `In ${daysUntil}d`, color: 'bg-amber-100 text-amber-700' };
        return { label: `In ${daysUntil}d`, color: 'bg-indigo-100 text-indigo-700' };
    })();

    const imageUrl = event.featuredImage
        ? getOptimizedUrl(event.featuredImage, { w: 400, h: 250, f: 'auto' })
        : null;

    // ─── LIST VIEW ───────────────────────────────────────────────
    if (viewMode === 'list') {
        return (
            <motion.article
                ref={cardRef}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35 }}
                whileHover={{ x: 4 }}
                className="group bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
            >
                <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    {imageUrl && (
                        <div className="sm:w-44 h-36 sm:h-auto relative overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none shrink-0">
                            <img
                                src={imageUrl}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <span
                                className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white"
                                style={{ background: category.color }}
                            >
                                {category.icon}
                            </span>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-4 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            {!imageUrl && (
                                <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                    style={{ background: `${category.color}18`, color: category.color }}
                                >
                                    {category.icon}
                                    <span className="hidden xs:inline">{category.name}</span>
                                </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                                {statusBadge.label}
                            </span>
                        </div>

                        <h3
                            className="text-base sm:text-lg font-bold text-gray-900 mb-1 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1"
                            onClick={() => onOpen(event)}
                        >
                            {event.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{event.description}</p>

                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatShortDate(event.startDate)}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="truncate max-w-[120px]">{event.location}</span>
                            </span>
                            {event.contactPhone && (
                                <span className="flex items-center gap-1">
                                    <Phone className="w-3.5 h-3.5" />
                                    {event.contactPhone}
                                </span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${event.price === 'free' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                                }`}>
                                {event.price === 'free' ? 'FREE' : event.priceAmount}
                            </span>
                        </div>

                        {event.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {event.tags.slice(0, 4).map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                        <Tag className="w-3 h-3" />{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {event.eventUrl && (
                            <a
                                href={event.eventUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-3"
                            >
                                View Event Page <ExternalLink className="w-3 h-3" />
                            </a>
                        )}

                        <div className="flex items-center justify-between gap-2">
                            {event.capacity && (
                                <span className="text-xs text-gray-500">
                                    {event.registered}/{event.capacity} registered
                                </span>
                            )}
                            {event.status === 'upcoming' && (
                                <button
                                    onClick={() => onRegister(event)}
                                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all"
                                >
                                    Register
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.article>
        );
    }

    // ─── GRID VIEW ───────────────────────────────────────────────
    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -4 }}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
            {/* ✅ Scrollable media gallery */}
            <MediaGallery event={event} category={category} />

            <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Date + Time + Location badge */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-50 rounded-xl">
                    <div className="text-center shrink-0">
                        <span className="block text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
                            {new Date(event.startDate).toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                        <span className="block text-2xl font-bold text-gray-900 leading-none">
                            {new Date(event.startDate).getDate()}
                        </span>
                    </div>
                    <div className="w-px h-10 bg-indigo-200 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {formatTime(event.startTime)} – {formatTime(event.endTime)}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {event.location}
                        </p>
                    </div>
                </div>

                {/* Title */}
                <h3
                    className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => onOpen(event)}
                >
                    {event.title}
                </h3>

                {event.contactPhone && (
                    <p className="text-xs text-indigo-600 font-medium flex items-center gap-1 mb-2">
                        <Phone className="w-3 h-3" />
                        {event.contactPhone}
                    </p>
                )}

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{event.description}</p>

                {/* Tags */}
                {event.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {event.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                <Tag className="w-3 h-3" />{tag}
                            </span>
                        ))}
                    </div>
                )}

                {event.eventUrl && (
                    <a
                        href={event.eventUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-4"
                    >
                        View Event Page <ExternalLink className="w-3 h-3" />
                    </a>
                )}

                {/* Price + Register */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${event.price === 'free' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                            }`}>
                            {event.price === 'free' ? 'FREE' : event.priceAmount}
                        </span>
                        {event.capacity && (
                            <span className="text-xs text-gray-500">
                                {event.registered}/{event.capacity}
                            </span>
                        )}
                    </div>
                    {event.status === 'upcoming' && (
                        <button
                            onClick={() => onRegister(event)}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all active:scale-95"
                        >
                            Register
                        </button>
                    )}
                    {event.status === 'full' && (
                        <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold">
                            Full
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}