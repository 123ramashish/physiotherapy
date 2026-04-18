'use client';
// app/events/components/CalendarView.tsx
import React from 'react';
import { EventItem } from '@/lib/events/types';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

interface CalendarViewProps {
    events: EventItem[];
    onOpenDetail: (event: EventItem) => void;
}

export default function CalendarView({ events, onOpenDetail }: CalendarViewProps) {
    // Group events by date
    const groupedEvents = events.reduce((acc, event) => {
        const date = event.startDate;
        if (!acc[date]) acc[date] = [];
        acc[date].push(event);
        return acc;
    }, {} as Record<string, EventItem[]>);

    const sortedDates = Object.keys(groupedEvents).sort();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-xl font-bold text-gray-900">Event Calendar</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 disabled:opacity-30" disabled>
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium text-gray-900 px-4">Current View</span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 disabled:opacity-30" disabled>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-6">
                {sortedDates.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No events scheduled for this period.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {sortedDates.map(date => (
                            <div key={date} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-100 last:before:hidden">
                                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-indigo-50 border-2 border-indigo-600 flex items-center justify-center z-10" />
                                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">
                                    {formatDate(date)}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {groupedEvents[date].map(event => (
                                        <div
                                            key={event._id}
                                            onClick={() => onOpenDetail(event)}
                                            className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer bg-gray-50 group"
                                        >
                                            <p className="text-xs font-semibold text-indigo-600 mb-1">
                                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                            </p>
                                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                {event.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{event.venue}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
