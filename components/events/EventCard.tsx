'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, Tag } from 'lucide-react';
import { EventItem } from '../types';
import { formatDate, formatTime, getDaysUntil, getCategoryInfo } from '../lib/utils';
import { getOptimizedUrl } from '../lib/imagekit';

interface EventCardProps {
    event: EventItem;
    onOpen: (event: EventItem) => void;
    onRegister: (event: EventItem) => void;
    viewMode: 'grid' | 'list';
}

export default function EventCard({ event, onOpen, onRegister, viewMode }: EventCardProps) {
    const category = getCategoryInfo(event.category);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: '-50px' });
    const daysUntil = getDaysUntil(event.startDate);

    const getStatusBadge = () => {
        if (event.status === 'past') return { label: 'Completed', color: 'bg-gray-100 text-gray-600' };
        if (event.status === 'ongoing') return { label: 'Live Now', color: 'bg-emerald-100 text-emerald-700' };
        if (event.status === 'cancelled') return { label: 'Cancelled', color: 'bg-red-100 text-red-700' };
        if (daysUntil <= 3) return { label: `In ${daysUntil}d`, color: 'bg-amber-100 text-amber-700' };
        return { label: `In ${daysUntil}d`, color: 'bg-indigo-100 text-indigo-700' };
    };

    const statusBadge = getStatusBadge();
    const imageUrl = event.featuredImage
        ? getOptimizedUrl(event.featuredImage, { w: 400, h: 250, f: 'auto' })
        : null;

    if (viewMode === 'list') {
        return (
            <motion.article
                ref={cardRef}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                whileHover={{ x: 4 }}
                className="group bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
            >
                <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    {imageUrl && (
                        <div className="sm:w-48 h-32 sm:h-auto relative overflow-hidden rounded-l-xl">
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
                    <div className={`flex-1 p-4 ${imageUrl ? 'sm:p-5' : ''}`}>
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            {!imageUrl && (
                                <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                    style={{ background: `${category.color}15`, color: category.color }}
                                >
                                    <span>{category.icon}</span>
                                    <span className="hidden sm:inline">{category.name}</span>
                                </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                                {statusBadge.label}
                            </span>
                        </div>

                        <h3
                            className="text-lg font-bold text-gray-900 mb-1 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1"
                            onClick={() => onOpen(event)}
                        >
                            {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{event.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatShortDate(event.startDate)} • {formatTime(event.startTime)}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${event.price === 'free' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                                }`}>
                                {event.price === 'free' ? 'FREE' : event.priceAmount}
                            </span>
                        </div>

                        {/* Tags */}
                        {event.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {event.tags.slice(0, 4).map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* External URL */}
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

                        <div className="flex items-center justify-between">
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

    // Grid view
    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
        >
            {/* Image */}
            {imageUrl ? (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span
                        className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                        style={{ background: category.color }}
                    >
                        {category.icon} {category.name}
                    </span>
                    <span className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${event.status === 'past' ? 'bg-gray-800/90 text-gray-200' :
                            event.status === 'ongoing' ? 'bg-emerald-500 text-white' :
                                event.status === 'cancelled' ? 'bg-red-500 text-white' :
                                    'bg-indigo-500 text-white'
                        }`}>
                        {statusBadge.label}
                    </span>
                </div>
            ) : (
                <div
                    className="h-48 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${category.color}15, ${category.color}05)` }}
                >
                    <span className="text-4xl">{category.icon}</span>
                </div>
            )}

            <div className="p-5">
                {/* Date Badge */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-50 rounded-xl">
                    <div className="text-center">
                        <span className="block text-xs font-semibold text-indigo-600 uppercase">
                            {new Date(event.startDate).toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                        <span className="block text-2xl font-bold text-gray-900">
                            {new Date(event.startDate).getDate()}
                        </span>
                    </div>
                    <div className="h-10 w-px bg-indigo-200" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                        </p>
                    </div>
                </div>

                {/* Title & Description */}
                <h3
                    className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => onOpen(event)}
                >
                    {event.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{event.description}</p>

                {/* Tags */}
                {event.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {event.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* External URL */}
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

                {/* Price & Registration */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
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
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all"
                        >
                            Register
                        </button>
                    )}
                </div>
            </div>
        </motion.article>
    );
}