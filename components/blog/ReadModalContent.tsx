'use client';
import React from 'react';
import { Eye, MessageSquare, Bookmark, Share2, Heart, Clock, MapPin, Sparkles } from 'lucide-react';
import { BlogPost } from './types';
import { formatDate, getCategoryInfo, getBranchInfo, getInitials } from './utils';

interface ReadModalContentProps {
    post: BlogPost;
}

export function ReadModalContent({ post }: ReadModalContentProps) {
    const category = getCategoryInfo(post.category);
    const branch = getBranchInfo(post.branch);

    return (
        <article className="prose prose-lg max-w-none">
            <header className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                            background: `${category.color}15`,
                            color: category.color
                        }}
                    >
                        <span>{category.icon}</span>
                        {category.name}
                    </span>
                    {post.featured && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                            <Sparkles className="w-3 h-3" />
                            Featured
                        </span>
                    )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ background: `linear-gradient(135deg, ${category.color}, #6366f1)` }}
                        >
                            {getInitials(post.author)}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{post.author}</p>
                            <p className="text-xs">{post.authorRole}</p>
                        </div>
                    </div>
                    <span>•</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {branch.city}
                    </span>
                </div>
            </header>

            <div
                className="text-gray-700 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-3">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments} comments
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Bookmark">
                        <Bookmark className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share">
                        <Share2 className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Like">
                        <Heart className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>
        </article>
    );
}