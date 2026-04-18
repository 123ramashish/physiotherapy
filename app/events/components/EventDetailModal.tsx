'use client';

import React from 'react';
import { EventItem } from '@/lib/events/types';
import { Calendar, Clock, MapPin, Users, Share2, ArrowRight, Tag, Info, CheckCircle2 } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import { getOptimizedUrl } from '@/lib/imagekit';

interface EventDetailModalProps {
    event: EventItem;
    onRegister: () => void;
    onShare: () => void;
}

const getCategoryInfo = (category: string) => {
    const categories: Record<string, { name: string; icon: string; color: string }> = {
        'health-camp': { name: 'Health Camp', icon: '🏥', color: '#10b981' },
        'workshop': { name: 'Workshop', icon: '🛠️', color: '#3b82f6' },
        'webinar': { name: 'Webinar', icon: '💻', color: '#8b5cf6' },
        'conference': { name: 'Conference', icon: '🎤', color: '#f59e0b' },
        'community': { name: 'Community', icon: '🤝', color: '#ec4899' },
        'screening': { name: 'Screening', icon: '🔍', color: '#6366f1' },
    };
    return categories[category] || { name: 'Event', icon: '📅', color: '#6366f1' };
};

export default function EventDetailModal({ event, onRegister, onShare }: EventDetailModalProps) {
    const category = getCategoryInfo(event.category);
    const imageUrl = event.featuredImage
        ? getOptimizedUrl(event.featuredImage, { w: 800, h: 400, f: 'auto' })
        : null;

    return (
        <div className="space-y-6">
            {/* Hero Image */}
            {imageUrl && (
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
                                {category.icon} {category.name}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border border-white/30 ${
                                event.status === 'past' ? 'bg-gray-500/50 text-white' : 'bg-emerald-500/50 text-white'
                            }`}>
                                {event.status.toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                            {event.title}
                        </h2>
                    </div>
                </div>
            )}

            {!imageUrl && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                            {category.icon} {category.name}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                        {event.title}
                    </h2>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Event Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {formatDate(event.startDate)}
                                    {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</p>
                                <p className="text-sm font-medium text-gray-900">
                                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
                            <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Venue</p>
                                <p className="text-sm font-medium text-gray-900">{event.venue}</p>
                                {event.venueDetails && <p className="text-xs text-gray-500 mt-1">{event.venueDetails}</p>}
                            </div>
                        </div>
                        {event.speaker && (
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
                                <Users className="w-5 h-5 text-indigo-600 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Speaker</p>
                                    <p className="text-sm font-medium text-gray-900">{event.speaker}</p>
                                    {event.speakerTitle && <p className="text-xs text-gray-500 mt-0.5">{event.speakerTitle}</p>}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Info className="w-5 h-5 text-indigo-600" />
                            About This Event
                        </h3>
                        <div
                            className="text-gray-600 leading-relaxed prose prose-indigo max-w-none"
                            dangerouslySetInnerHTML={{ __html: event.fullDescription || event.description }}
                        />
                    </div>

                    {/* Requirements & What to Bring */}
                    {(event.requirements?.length || 0) > 0 || (event.whatToBring?.length || 0) > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {event.requirements && event.requirements.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Requirements</h3>
                                    <ul className="space-y-2">
                                        {event.requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {event.whatToBring && event.whatToBring.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">What to Bring</h3>
                                    <ul className="space-y-2">
                                        {event.whatToBring.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                    {/* Price & RSVP Card */}
                    <div className="p-6 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 sticky top-4">
                        <div className="mb-6">
                            <p className="text-indigo-100 text-sm mb-1">Registration Fee</p>
                            <p className="text-3xl font-bold">
                                {event.price === 'free' ? 'FREE' : event.priceAmount}
                            </p>
                        </div>

                        {event.capacity && (
                            <div className="mb-6 space-y-2">
                                <div className="flex justify-between text-xs text-indigo-100">
                                    <span>Availability</span>
                                    <span>{event.registered} / {event.capacity} registered</span>
                                </div>
                                <div className="h-1.5 bg-indigo-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-400 rounded-full"
                                        style={{ width: `${Math.min(100, (event.registered / event.capacity) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {event.status === 'upcoming' && (
                                <button
                                    onClick={onRegister}
                                    className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    Register Now
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                onClick={onShare}
                                className="w-full py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-400 transition-colors border border-indigo-400 flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5" />
                                Share Event
                            </button>
                        </div>

                        {event.status === 'full' && (
                            <p className="mt-4 text-center text-sm text-indigo-200 bg-indigo-800/40 py-2 rounded-lg">
                                Event is currently full
                            </p>
                        )}
                    </div>

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-indigo-600" />
                                Related Tags
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
