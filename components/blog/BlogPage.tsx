'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Plus, X, ChevronDown, ChevronRight, XCircle,
    ArrowUp, Sparkles, CheckCircle, AlertCircle, SlidersHorizontal
} from 'lucide-react';
import { BlogPost, FilterState, Pagination, ModalState } from './types';
import { CATEGORIES, BRANCHES } from './constants';
import { staggerContainer } from './animations';
import { Modal } from './Modal';
import { ReadModalContent } from './ReadModalContent';
import { BlogFormModal } from './BlogFormModal';
import { BlogCard } from './BlogCard';
import { FeaturedCard } from './FeaturedCard';
import { Pagination as PaginationComponent } from './Pagination';
import { TagInput } from './TagInput';
import {
    useGetBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} from '@/redux/api/blogApi';

export function BlogPage() {
    const [pagination, setPagination] = useState<Pagination>({
        page: 1, limit: 6, total: 0, totalPages: 1, hasNext: false, hasPrev: false
    });
    const [filters, setFilters] = useState<FilterState>({
        branch: 'all', category: 'all', tags: [], search: '', sortBy: 'latest'
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [modal, setModal] = useState<ModalState>({ type: null, isOpen: false });
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const { data: blogResponse, isLoading: loading } = useGetBlogsQuery({
        page: pagination.page, limit: pagination.limit, search: debouncedSearch,
        category: filters.category, branch: filters.branch, sortBy: filters.sortBy,
        tag: filters.tags.join(',')
    }) as any;

    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();
    const formLoading = isCreating || isUpdating;

    const headerRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();
    const headerControls = useAnimation();
    const showScrollTop = !useInView(headerRef, { margin: '-100px' });

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        headerControls.start({ y: scrollY.get() > 50 ? -100 : 0, transition: { duration: 0.2 } });
    }, [scrollY, headerControls]);

    useEffect(() => {
        if (blogResponse) {
            setPagination(prev => ({
                ...prev, total: blogResponse.pagination.total, totalPages: blogResponse.pagination.pages,
                hasNext: blogResponse.pagination.hasNext, hasPrev: blogResponse.pagination.hasPrev
            }));
        }
    }, [blogResponse]);

    const handleFilterChange = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLimitChange = (limit: number) => {
        setPagination(prev => ({ ...prev, limit, page: 1 }));
    };

    const openReadModal = (post: BlogPost) => setModal({ type: 'read', data: post, isOpen: true });
    const openSubmitModal = () => setModal({ type: 'submit', isOpen: true });
    const openEditModal = (post: BlogPost) => setModal({ type: 'edit', data: post, isOpen: true });

    const handleDelete = async (post: BlogPost) => {
        if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
        try {
            await deleteBlog(post._id).unwrap();
            showNotification('success', 'Article deleted successfully');
        } catch {
            showNotification('error', 'Failed to delete article');
        }
    };

    const handleSubmitForm = async (data: any) => {
        try {
            const payload = { ...data, date: data.date || new Date().toISOString() };
            if (modal.type === 'submit') {
                await createBlog(payload).unwrap();
                showNotification('success', 'Article submitted successfully!');
            } else if (modal.type === 'edit' && modal.data) {
                await updateBlog({ id: modal.data._id, body: payload }).unwrap();
                showNotification('success', 'Article updated successfully!');
            }
            setModal({ type: null, isOpen: false });
        } catch {
            showNotification('error', modal.type === 'submit' ? 'Failed to submit article' : 'Failed to update article');
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const posts = (blogResponse?.data as unknown as BlogPost[]) || [];
    const featuredPosts = posts.filter(p => p.featured).slice(0, 2);
    const regularPosts = posts.filter(p => !p.featured);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 backdrop-blur-sm ${notification.type === 'success'
                            ? 'bg-emerald-50/95 text-emerald-800 border border-emerald-200'
                            : 'bg-red-50/95 text-red-800 border border-red-200'
                            }`}
                    >
                        {notification.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                        <span className="font-medium text-sm sm:text-base truncate">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.header ref={headerRef} animate={headerControls} className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                                HealthBlog
                            </span>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="relative py-10 sm:py-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Expert Health & Wellness Insights
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                            Your Guide to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
                                Better Health
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                            Evidence-based articles from certified physiotherapists and wellness experts across India.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Responsive Filter & Search Bar */}
            <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3 sm:py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
                        {/* Filters Group */}
                        <div className="flex flex-wrap items-center gap-3 w-full lg:flex-1">
                            <div className="relative flex-1 min-w-[130px]">
                                <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)} className="w-full h-10 pl-3 pr-10 rounded-lg text-black border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white">
                                    <option value="all">All Categories</option>
                                    {CATEGORIES.map(cat => (<option key={cat.slug} value={cat.slug}>{cat.icon} {cat.name}</option>))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <div className="relative flex-1 min-w-[130px]">
                                <select value={filters.branch} onChange={(e) => handleFilterChange('branch', e.target.value)} className="w-full h-10 pl-3 pr-10 rounded-lg text-black border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white">
                                    {BRANCHES.map(branch => (<option key={branch.id} value={branch.id}>{branch.name}</option>))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <div className="relative flex-1 min-w-[130px]">
                                <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value as any)} className="w-full h-10 pl-3 pr-10 rounded-lg text-black border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white">
                                    <option value="latest">↓ Latest</option>
                                    <option value="popular">↓ Most Viewed</option>
                                    <option value="comments">↓ Most Discussed</option>
                                    <option value="featured">↓ Featured</option>
                                </select>
                                <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <div className="flex-1 min-w-[150px] text-black">
                                <TagInput value={filters.tags} onChange={(tags) => handleFilterChange('tags', tags)} placeholder="Filter by tags..." />
                            </div>
                        </div>

                        {/* Search & Actions Group */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search articles, topics, tags..." className="w-full h-10 pl-10 pr-10 rounded-xl border border-gray-200 text-black text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all" />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full min-h-[28px] min-w-[28px] flex items-center justify-center">
                                        <X className="w-4 h-4 text-gray-400" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={openSubmitModal} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 h-10 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-emerald-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline">Share Your Story</span>
                                    <span className="sm:hidden">Submit</span>
                                </button>
                                <select value={pagination.limit} onChange={(e) => handleLimitChange(Number(e.target.value))} className="h-10 px-3 rounded-lg text-black border border-gray-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white">
                                    {[6, 9, 12].map(n => (<option key={n} value={n}>{n}/page</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 sm:space-y-12">
                    {/* Featured Section */}
                    {filters.branch === 'all' && filters.category === 'all' && !filters.tags.length && !debouncedSearch && pagination.page === 1 && featuredPosts.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured <span className="text-indigo-600">Articles</span></h2>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 shrink-0">
                                    View All <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {featuredPosts.map(post => (<FeaturedCard key={post._id} post={post} onRead={openReadModal} />))}
                            </div>
                        </section>
                    )}

                    {/* Regular Articles Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Latest <span className="text-emerald-600">Articles</span>
                                <span className="text-sm font-normal text-gray-500 ml-2">({pagination.total} found)</span>
                            </h2>
                            {(filters.branch !== 'all' || filters.category !== 'all' || filters.tags.length > 0 || debouncedSearch) && (
                                <button onClick={() => { setFilters({ branch: 'all', category: 'all', tags: [], search: '', sortBy: 'latest' }); setSearchQuery(''); setDebouncedSearch(''); }} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 shrink-0">
                                    <XCircle className="w-4 h-4" /> Clear filters
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {[...Array(pagination.limit)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 animate-pulse">
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-3 sm:mb-4" />
                                        <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-2 sm:mb-3" />
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-3 sm:mb-4" />
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
                                            <div className="space-y-2">
                                                <div className="h-3 bg-gray-200 rounded w-20 sm:w-24" />
                                                <div className="h-3 bg-gray-200 rounded w-12 sm:w-16" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : regularPosts.length === 0 ? (
                            <div className="text-center py-12 sm:py-16">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                                <p className="text-gray-600 mb-6 px-4">Try adjusting your filters or search terms.</p>
                                <button onClick={() => { setFilters({ branch: 'all', category: 'all', tags: [], search: '', sortBy: 'latest' }); setSearchQuery(''); }} className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base">
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {regularPosts.map(post => (
                                    <BlogCard key={post._id} post={post} onRead={openReadModal} onEdit={openEditModal} onDelete={handleDelete} showActions={true} />
                                ))}
                            </motion.div>
                        )}

                        {!loading && regularPosts.length > 0 && (
                            <div className="mt-8 sm:mt-10 overflow-x-auto">
                                <PaginationComponent pagination={pagination} onPageChange={handlePageChange} />
                            </div>
                        )}
                    </section>
                </motion.div>
            </main>

            {/* Modals */}
            <Modal isOpen={modal.isOpen && modal.type === 'read'} onClose={() => setModal({ type: null, isOpen: false })} title="Article" size="xl">
                {modal.data && <ReadModalContent post={modal.data} />}
            </Modal>

            <Modal isOpen={modal.isOpen && (modal.type === 'submit' || modal.type === 'edit')} onClose={() => setModal({ type: null, isOpen: false })} title={modal.type === 'submit' ? 'Submit New Article' : 'Edit Article'} size="lg">
                <BlogFormModal mode={modal.type as 'submit' | 'edit'} initialData={modal.data || null} onSubmit={handleSubmitForm} onClose={() => setModal({ type: null, isOpen: false })} isLoading={formLoading} />
            </Modal>


        </div>
    );
}