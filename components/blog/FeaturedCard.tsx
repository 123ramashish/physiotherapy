'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Eye, ChevronRight } from 'lucide-react';
import { BlogPost } from './types';
import { getCategoryInfo, getBranchInfo, getInitials } from './utils';
import { scaleIn } from './animations';

interface FeaturedCardProps {
    post: BlogPost;
    onRead: (post: BlogPost) => void;
}

export function FeaturedCard({ post, onRead }: FeaturedCardProps) {
    const category = getCategoryInfo(post.category);
    const branch = getBranchInfo(post.branch);

    return (
        <motion.article
            variants={scaleIn}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-300"
        >
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    background: `linear-gradient(135deg, ${category.color}20, #6366f120)`
                }}
            />

            <div className="relative p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
                        style={{
                            background: `${category.color}20`,
                            color: category.color
                        }}
                    >
                        <span>{category.icon}</span>
                        {category.name}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                        <Sparkles className="w-4 h-4" />
                        Featured
                    </span>
                </div>

                <h2
                    className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => onRead(post)}
                >
                    {post.title}
                </h2>
                <p
                    className="text-gray-600 mb-6 line-clamp-3 cursor-pointer"
                    onClick={() => onRead(post)}
                >
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ background: `linear-gradient(135deg, ${category.color}, #6366f1)` }}
                        >
                            {getInitials(post.author)}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{post.author}</p>
                            <p className="text-sm text-gray-500">{post.authorRole} • {branch.city}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views.toLocaleString()}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => onRead(post)}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all"
                >
                    Read Article
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </motion.article>
    );
}