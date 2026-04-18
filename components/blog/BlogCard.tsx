'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, MessageSquare, Edit, Trash2, Sparkles, MapPin } from 'lucide-react';
import { BlogPost } from './types';
import { formatDate, getCategoryInfo, getBranchInfo, getInitials } from './utils';
import { fadeInUp } from './animations';

interface BlogCardProps {
    post: BlogPost;
    onRead: (post: BlogPost) => void;
    onEdit?: (post: BlogPost) => void;
    onDelete?: (post: BlogPost) => void;
    showActions?: boolean;
}

export function BlogCard({
    post,
    onRead,
    onEdit,
    onDelete,
    showActions = false
}: BlogCardProps) {
    const category = getCategoryInfo(post.category);
    const branch = getBranchInfo(post.branch);
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
            <div
                className="h-1.5"
                style={{ background: `linear-gradient(90deg, ${category.color}, #6366f1)` }}
            />

            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                                background: `${category.color}15`,
                                color: category.color
                            }}
                        >
                            <span className="text-xs">{category.icon}</span>
                            <span className="hidden sm:inline">{category.name}</span>
                        </span>
                        {post.featured && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                                <Sparkles className="w-3 h-3" />
                                <span className="hidden sm:inline">Featured</span>
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {branch.city}
                    </span>
                </div>

                <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => onRead(post)}
                >
                    {post.title}
                </h3>
                <p
                    className="text-gray-600 text-sm line-clamp-2 mb-4 cursor-pointer"
                    onClick={() => onRead(post)}
                >
                    {post.excerpt}
                </p>

                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                                #{tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="px-2 py-0.5 text-gray-400 text-xs">
                                +{post.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${category.color}, #6366f1)` }}
                        >
                            {getInitials(post.author)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.readTime} • {formatDate(post.date)}</p>
                        </div>
                    </div>

                    {/* <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments}
                        </span>
                    </div> */}
                </div>

                {/* {showActions && onEdit && onDelete && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => onEdit(post)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(post)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                )} */}
            </div>
        </motion.article>
    );
}