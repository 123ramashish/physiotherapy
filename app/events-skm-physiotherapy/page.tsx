'use client';
// app/events/page.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Search, Filter, Plus, Loader2, AlertCircle, ArrowUp, CheckCircle2
} from 'lucide-react';
import Script from 'next/script';

import Modal from './components/Modal';
import EventCard from './components/EventCard';
import EventForm from './components/EventForm';
import EventFilters from './components/EventFilters';
import EventList from './components/EventList';
import ShareModal from './components/ShareModal';
import RegisterModal from './components/RegisterModal';
import EventDetailModal from './components/EventDetailModal';

import { EventItem, FilterState, ModalState } from '../../lib/events/types';
import {
    useGetEventsQuery,
    useDeleteEventMutation,
} from '@/redux/api/eventApi';
import { createEvent, updateEvent } from '@/lib/events/service';

export default function EventsPage() {
    const [filters, setFilters] = useState<FilterState>({
        category: 'all',
        location: 'All Locations',
        dateRange: 'all',
        price: 'all',
        status: 'upcoming',
        search: '',
        sortBy: 'date-asc',
        viewMode: 'grid',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [modal, setModal] = useState<ModalState>({ type: null, isOpen: false });
    const [notification, setNotification] = useState<{
        type: 'success' | 'error'; message: string;
    } | null>(null);
    const [paginationState, setPaginationState] = useState({ page: 1 });
    const [showScrollTop, setShowScrollTop] = useState(false);

    // RTK Query
    const { data: eventsResponse, isLoading: loading, refetch } = useGetEventsQuery({
        ...filters,
        search: debouncedSearch,
        page: paginationState.page,
        limit: 12,
    });
    const [deleteEventMutation] = useDeleteEventMutation();

    const events = eventsResponse?.events ?? [];
    const pagination = {
        page: eventsResponse?.page ?? 1,
        totalPages: eventsResponse?.totalPages ?? 1,
        total: eventsResponse?.total ?? 0,
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Scroll listener (SSR-safe)
    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showNotification = useCallback((type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    }, []);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPaginationState({ page: 1 });
    };

    const handleCreateEvent = async (formData: FormData) => {
        try {
            const result = await createEvent(formData);
            if (result.success) {
                showNotification('success', 'Event created successfully!');
                setModal({ type: null, isOpen: false });
                refetch();
            } else {
                showNotification('error', result.error ?? 'Failed to create event');
                throw new Error(result.error);
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'Failed to create event';
            showNotification('error', msg);
            throw error;
        }
    };

    const handleUpdateEvent = async (id: string, formData: FormData) => {
        try {
            const result = await updateEvent(id, formData);
            if (result.success) {
                showNotification('success', 'Event updated successfully!');
                setModal({ type: null, isOpen: false });
                refetch();
            } else {
                showNotification('error', result.error ?? 'Failed to update event');
                throw new Error(result.error);
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'Failed to update event';
            showNotification('error', msg);
            throw error;
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            const result = await deleteEventMutation(id).unwrap();
            if (result.success) {
                showNotification('success', 'Event deleted successfully!');
                refetch();
            } else {
                showNotification('error', result.error ?? 'Failed to delete event');
            }
        } catch (error: unknown) {
            const errData = error as { data?: { error?: string } };
            showNotification('error', errData?.data?.error ?? 'Failed to delete event');
        }
    };

    // ✅ Fixed: opens RegisterModal instead of directly calling API
    const handleRegisterClick = (event: EventItem) => {
        setModal({ type: 'register', data: event, isOpen: true });
    };

    const upcomingCount = events.filter(e => e.status === 'upcoming').length;

    return (
        <div className="min-h-screen bg-white">
            <Script
                id="events-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        itemListElement: events.map((event, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            item: {
                                '@type': 'Event',
                                name: event.title,
                                url: `https://www.skmphysiotherapy.com/events/${event.slug}`,
                            },
                        })),
                    }),
                }}
            />

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className={`fixed top-4 left-1/2 z-[60] px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[280px] max-w-[90vw] ${notification.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                    >
                        {notification.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                        <span className="font-medium text-sm">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-3">
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">Events</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search events..."
                                    className="w-full pl-10 pr-9 py-2 text-black rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full"
                                    >
                                        <Filter className="w-3.5 h-3.5 text-gray-400" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* <button
                            onClick={() => setModal({ type: 'create', isOpen: true })}
                            className="shrink-0 inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-indigo-700 transition-all text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Create Event</span>
                        </button> */}
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-10 sm:py-14 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                            Health Camps, Workshops &{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
                                Wellness Events
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600">
                            Discover free health screenings, expert-led workshops, and community events.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <EventFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onViewModeChange={(mode) => handleFilterChange('viewMode', mode)}
                totalResults={pagination.total}
                upcomingCount={upcomingCount}
            />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
                        <span className="ml-3 text-gray-600">Loading events...</span>
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-16">
                        <Calendar className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or create a new event.</p>
                        <button
                            onClick={() => setModal({ type: 'create', isOpen: true })}
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Create First Event
                        </button>
                    </div>
                ) : (
                    <EventList
                        events={events}
                        viewMode={filters.viewMode}
                        onOpenDetail={(event) => setModal({ type: 'detail', data: event, isOpen: true })}
                        onRegister={handleRegisterClick}
                        onEdit={(event) => setModal({ type: 'edit', data: event, isOpen: true })}
                        onDelete={handleDeleteEvent}
                    />
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-10">
                        <button
                            onClick={() => setPaginationState(prev => ({ page: Math.max(1, prev.page - 1) }))}
                            disabled={pagination.page === 1}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page <span className="font-semibold text-gray-900">{pagination.page}</span> of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => setPaginationState(prev => ({ page: Math.min(pagination.totalPages, prev.page + 1) }))}
                            disabled={pagination.page === pagination.totalPages}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>

            {/* Modals */}
            <Modal
                isOpen={modal.isOpen && modal.type === 'detail'}
                onClose={() => setModal({ type: null, isOpen: false })}
                title="Event Details"
                size="xl"
            >
                {modal.data && (
                    <EventDetailModal
                        event={modal.data}
                        onRegister={() => setModal({ type: 'register', data: modal.data, isOpen: true })}
                        onShare={() => setModal({ type: 'share', data: modal.data, isOpen: true })}
                    />
                )}
            </Modal>

            <Modal
                isOpen={modal.isOpen && (modal.type === 'create' || modal.type === 'edit')}
                onClose={() => setModal({ type: null, isOpen: false })}
                title={modal.type === 'edit' ? 'Edit Event' : 'Create New Event'}
                size="xl"
            >
                <EventForm
                    initialData={modal.data ?? undefined}
                    onSubmit={async (formData) => {
                        if (modal.type === 'edit' && modal.data?._id) {
                            await handleUpdateEvent(modal.data._id, formData);
                        } else {
                            await handleCreateEvent(formData);
                        }
                    }}
                    onCancel={() => setModal({ type: null, isOpen: false })}
                    isEditing={modal.type === 'edit'}
                />
            </Modal>

            <Modal
                isOpen={modal.isOpen && modal.type === 'register'}
                onClose={() => setModal({ type: null, isOpen: false })}
                title="Register for Event"
                size="md"
            >
                {modal.data && (
                    <RegisterModal
                        event={modal.data}
                        onClose={() => setModal({ type: null, isOpen: false })}
                        onRegistered={() => {
                            showNotification('success', 'Registration successful! Check your email.');
                            setModal({ type: null, isOpen: false });
                            refetch();
                        }}
                    />
                )}
            </Modal>

            <Modal
                isOpen={modal.isOpen && modal.type === 'share'}
                onClose={() => setModal({ type: null, isOpen: false })}
                title="Share Event"
                size="md"
            >
                {modal.data && (
                    <ShareModal
                        url={`https://www.skmphysiotherapy.com/events/${modal.data.slug}`}
                        title={modal.data.title}
                    />
                )}
            </Modal>

            {/* ✅ SSR-safe scroll to top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-6 right-4 sm:right-6 p-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}