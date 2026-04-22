'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Video, CheckCircle } from 'lucide-react';
import { BRANCHES } from '@/components/blog/constants';

const CATEGORIES = [
    { id: 'certificate', name: 'Certificate' },
    { id: 'award', name: 'Award' },
    { id: 'event', name: 'Event' },
    { id: 'treatment', name: 'Treatment' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'review', name: 'Review' },
];

interface GalleryFormProps {
    onSubmit: (formData: FormData) => Promise<any>;
    onSuccess: () => void;
}

export default function GalleryForm({ onSubmit, onSuccess }: GalleryFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [preview, setPreview] = useState<{ url: string; type: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview({ url, type: file.type.startsWith('video/') ? 'video' : 'image' });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await onSubmit(formData);
            if (result.success) {
                onSuccess();
            } else {
                setError(result.error || 'Failed to upload');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                    name="title"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g. Annual Health Camp 2024"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                        name="category"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Branch *</label>
                    <select
                        name="branch"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                        {BRANCHES.filter(b => b.id !== 'all').map(branch => (
                            <option key={branch.id} value={branch.id}>{branch.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">File (Max 2GB) *</label>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                        preview ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-400'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        name="file"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                    />
                    
                    {preview ? (
                        <div className="relative inline-block">
                            {preview.type === 'video' ? (
                                <div className="flex flex-col items-center gap-2">
                                    <Video className="w-12 h-12 text-emerald-600" />
                                    <span className="text-sm font-medium text-emerald-700">Video selected</span>
                                </div>
                            ) : (
                                <img src={preview.url} alt="Preview" className="max-h-40 rounded-lg shadow-md" />
                            )}
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setPreview(null); if(fileInputRef.current) fileInputRef.current.value=''; }}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex justify-center gap-2">
                                <ImageIcon className="text-gray-400" size={32} />
                                <Video className="text-gray-400" size={32} />
                            </div>
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-emerald-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">Images or Videos up to 2GB</p>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {submitting ? (
                    <><Loader2 className="animate-spin" size={20} /> Uploading Media...</>
                ) : (
                    <><Upload size={20} /> Upload to Gallery</>
                )}
            </button>
        </form>
    );
}