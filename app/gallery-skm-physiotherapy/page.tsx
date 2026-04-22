'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Plus, Search, Filter, Camera, Video, Award,
    ShieldCheck, Activity, MessageSquare, Star,
    Grid3X3, Loader2, X, ChevronLeft, ChevronRight,
    MapPin, Trash2,
    Grid3x3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/components/blog/Modal';
import GalleryForm from './GalleryForm';
import GalleryItem from './GalleryItem';
import { getGalleryItems, createGalleryItem, deleteGalleryItem } from '@/lib/gallery/service';
import { BRANCHES } from '@/components/blog/constants';

const CATEGORIES = [
    { id: 'all', label: 'All Media', icon: Grid3x3, color: 'bg-indigo-500' },
    { id: 'certificate', label: 'Certificates', icon: ShieldCheck, color: 'bg-emerald-500' },
    { id: 'award', label: 'Awards', icon: Award, color: 'bg-sky-500' },
    { id: 'event', label: 'Events', icon: Camera, color: 'bg-indigo-500' },
    { id: 'treatment', label: 'Treatments', icon: Activity, color: 'bg-emerald-500' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, color: 'bg-sky-500' },
    { id: 'review', label: 'Reviews', icon: Star, color: 'bg-indigo-500' },
];

export default function GalleryPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');
    const [branch, setBranch] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getGalleryItems({ category, branch, page, limit: 16 });
            setItems(result.items);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Failed to fetch gallery:', error);
            showNotification('error', 'Failed to load gallery items');
        } finally {
            setLoading(false);
        }
    }, [category, branch, page]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleUpload = async (formData: FormData) => {
        const result = await createGalleryItem(formData);
        if (result.success) {
            showNotification('success', 'Media uploaded successfully!');
            setIsUploadModalOpen(false);
            fetchItems();
        } else {
            showNotification('error', result.error || 'Failed to upload');
        }
        return result;
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const result = await deleteGalleryItem(id);
            if (result.success) {
                showNotification('success', 'Item deleted');
                fetchItems();
            } else {
                showNotification('error', result.error || 'Failed to delete');
            }
        } catch (error) {
            showNotification('error', 'An error occurred');
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const nextItem = () => {
        const idx = items.findIndex(i => i._id === selectedItem._id);
        setSelectedItem(items[(idx + 1) % items.length]);
    };

    const prevItem = () => {
        const idx = items.findIndex(i => i._id === selectedItem._id);
        setSelectedItem(items[(idx - 1 + items.length) % items.length]);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Hero */}
            <section className="relative pt-24 pb-12 overflow-hidden bg-white border-b border-gray-100">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-indigo-50/50 to-transparent pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4"
                            >
                                <Camera size={14} />
                                Visual Journey
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-gray-900 mb-4"
                            >
                                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-sky-600 to-indigo-600">Gallery</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-gray-600"
                            >
                                Explore our certificates, awards, events, and successful treatments through our curated media collection.
                            </motion.p>
                        </div>

                        {/* <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsUploadModalOpen(true)}
                            className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all"
                        >
                            <Plus size={20} />
                            Upload Media
                        </motion.button> */}
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setCategory(cat.id); setPage(1); }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${category === cat.id
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                                        }`}
                                >
                                    <cat.icon size={16} />
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <select
                                    value={branch}
                                    onChange={(e) => { setBranch(e.target.value); setPage(1); }}
                                    className="pl-10 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold focus:border-indigo-500 outline-none appearance-none"
                                >
                                    {BRANCHES.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading && items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">Loading your memories...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="text-gray-300" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No media found</h3>
                        <p className="text-gray-500 mb-6">Start your visual journey by uploading your first photo or video.</p>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="text-indigo-600 font-bold hover:underline"
                        >
                            Upload something now
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence mode='popLayout'>
                                {items.map((item) => (
                                    <GalleryItem
                                        key={item._id}
                                        item={item}
                                        onClick={setSelectedItem}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-12">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="p-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50"
                                >
                                    <ChevronLeft />
                                </button>
                                <span className="font-bold text-gray-700">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                    className="p-2 rounded-xl bg-white border border-gray-200 disabled:opacity-50"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Modals */}
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                title="Add New Media"
                size="md"
            >
                <GalleryForm
                    onSubmit={handleUpload}
                    onSuccess={() => {
                        showNotification('success', 'Media uploaded!');
                        setIsUploadModalOpen(false);
                        fetchItems();
                    }}
                />
            </Modal>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all hover:scale-110"
                            onClick={(e) => { e.stopPropagation(); prevItem(); }}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all hover:scale-110"
                            onClick={(e) => { e.stopPropagation(); nextItem(); }}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <div
                            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="w-full max-h-[70vh] flex justify-center bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
                                {selectedItem.type === 'video' ? (
                                    <video
                                        src={selectedItem.url}
                                        controls
                                        autoPlay
                                        className="max-w-full max-h-full"
                                    />
                                ) : (
                                    <img
                                        src={selectedItem.url}
                                        alt={selectedItem.title}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                )}
                            </div>

                            <div className="mt-8 text-center max-w-2xl">
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{selectedItem.title}</h2>
                                <div className="flex items-center justify-center gap-3">
                                    <span className="bg-emerald-500 px-3 py-1 rounded-full text-white text-sm font-bold uppercase">{selectedItem.category}</span>
                                    <span className="flex items-center gap-1 text-white/60">
                                        <MapPin size={16} />
                                        {selectedItem.branch}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className={`fixed bottom-8 left-1/2 z-[110] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${notification.type === 'success'
                                ? 'bg-emerald-600 text-white border-emerald-400'
                                : 'bg-red-600 text-white border-red-400'
                            }`}
                    >
                        {notification.type === 'success' ? <Star size={20} /> : <X size={20} />}
                        <span className="font-bold">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}