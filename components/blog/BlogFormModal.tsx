'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Send, AlertCircle } from 'lucide-react';
import { BlogPost, FormState, FormErrors } from './types';
import { CATEGORIES, BRANCHES } from './constants';
import { TagInput } from './TagInput';

interface BlogFormModalProps {
    mode: 'submit' | 'edit';
    initialData?: BlogPost | null;
    onSubmit: (data: FormState) => Promise<void>;
    onClose: () => void;
    isLoading?: boolean;
}

export function BlogFormModal({
    mode,
    initialData,
    onSubmit,
    onClose,
    isLoading = false
}: BlogFormModalProps) {
    const [form, setForm] = useState<FormState>({
        title: initialData?.title || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        category: initialData?.category || CATEGORIES[0].slug,
        branch: initialData?.branch || BRANCHES[1].id,
        author: initialData?.author || 'Dr. SKM',
        authorRole: initialData?.authorRole || 'Senior Physiotherapist',
        tags: initialData?.tags || [],
        featured: initialData?.featured || false,
        status: initialData?.status || 'draft',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [aiGenerating, setAiGenerating] = useState(false);

    const handleChange = (field: keyof FormState, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!form.title.trim() || form.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        }
        if (!form.author.trim()) {
            newErrors.author = 'Author is required';
        }
        if (!form.authorRole.trim()) {
            newErrors.authorRole = 'Author role is required';
        }
        if (!form.excerpt.trim() || form.excerpt.length < 20) {
            newErrors.excerpt = 'Excerpt must be at least 20 characters';
        }
        if (!form.content.trim() || form.content.length < 100) {
            newErrors.content = 'Content must be at least 100 characters';
        }
        if (!form.category) {
            newErrors.category = 'Please select a category';
        }
        if (!form.branch) {
            newErrors.branch = 'Please select a branch';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await onSubmit(form);
    };

    const generateWithAI = async () => {
        if (!form.title) return;
        setAiGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1200));
            const mockExcerpt = `Discover expert insights on ${form.title.toLowerCase()} with practical, evidence-based guidance from our certified specialists.`;
            const mockContent = `<h2>Introduction</h2><p>${mockExcerpt}</p><h2>Key Points</h2><ul><li>Understanding the fundamentals</li><li>Practical application strategies</li><li>Common mistakes to avoid</li><li>When to seek professional help</li></ul><h2>Conclusion</h2><p>Remember, consistency is key. Small, regular efforts lead to significant long-term improvements in your health and wellness journey.</p>`;
            setForm(prev => ({
                ...prev,
                excerpt: mockExcerpt,
                content: mockContent
            }));
        } catch (error) {
            console.error('AI generation failed:', error);
        } finally {
            setAiGenerating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
                        } focus:ring-4 focus:ring-indigo-100 outline-none transition-all`}
                    placeholder="Enter a compelling title..."
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.title}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Author <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.author}
                        onChange={(e) => handleChange('author', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.author ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
                            } focus:ring-4 focus:ring-indigo-100 outline-none transition-all`}
                        placeholder="Author name..."
                    />
                    {errors.author && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.author}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Author Role <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.authorRole}
                        onChange={(e) => handleChange('authorRole', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.authorRole ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
                            } focus:ring-4 focus:ring-indigo-100 outline-none transition-all`}
                        placeholder="Author role (e.g. Physiotherapist)..."
                    />
                    {errors.authorRole && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.authorRole}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Excerpt <span className="text-red-500">*</span>
                    </label>
                    {/* <button
                        type="button"
                        onClick={generateWithAI}
                        disabled={aiGenerating || !form.title}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {aiGenerating ? (
                            <><Loader2 className="w-3 h-3 animate-spin" /> Generating...</>
                        ) : (
                            <><Sparkles className="w-3 h-3" /> AI Generate</>
                        )}
                    </button> */}
                </div>
                <textarea
                    value={form.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.excerpt ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
                        } focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none`}
                    placeholder="Write a short compelling summary (20-500 characters)..."
                />
                <p className="mt-1 text-xs text-gray-500">
                    {form.excerpt.length}/500 characters
                </p>
                {errors.excerpt && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.excerpt}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={form.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows={10}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.content ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
                        } focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none font-mono text-sm`}
                    placeholder="Write your article content (supports basic HTML)..."
                />
                <p className="mt-1 text-xs text-gray-500">
                    Tip: Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt; for formatting
                </p>
                {errors.content && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.content}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={form.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.category ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
                            } focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white appearance-none`}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat.slug} value={cat.slug}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Branch <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={form.branch}
                        onChange={(e) => handleChange('branch', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.branch ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-500'
                            } focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white appearance-none`}
                    >
                        {BRANCHES.filter(b => b.id !== 'all').map(branch => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name} ({branch.city})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                </label>
                <TagInput
                    value={form.tags}
                    onChange={(tags) => handleChange('tags', tags)}
                    placeholder="Add relevant tags..."
                />
            </div>



            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> {mode === 'submit' ? 'Submitting...' : 'Updating...'}</>
                    ) : (
                        <><Send className="w-5 h-5" /> {mode === 'submit' ? 'Submit Article' : 'Update Article'}</>
                    )}
                </button>
            </div>
        </form>
    );
}