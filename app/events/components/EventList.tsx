'use client';
// app/events/components/EventList.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItem } from '@/lib/events/types';
import EventCard from './EventCard';
import CalendarView from './CalendarView';

interface EventListProps {
    events: EventItem[];
    viewMode: 'grid' | 'list' | 'calendar' | string;
    onOpenDetail: (event: EventItem) => void;
    onRegister: (event: EventItem) => void;
    onEdit: (event: EventItem) => void;
    onDelete: (id: string) => void;
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function EventList({
    events,
    viewMode,
    onOpenDetail,
    onRegister,
    onEdit,
    onDelete,
}: EventListProps) {
    if (viewMode === 'calendar') {
        return <CalendarView events={events} onOpenDetail={onOpenDetail} />;
    }

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={
                viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
                    : 'flex flex-col gap-4'
            }
        >
            <AnimatePresence mode="popLayout">
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onOpen={onOpenDetail}
                        onRegister={onRegister}
                        viewMode={viewMode === 'list' ? 'list' : 'grid'}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}