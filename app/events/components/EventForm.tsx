'use client';
// app/events/components/EventForm.tsx
import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Upload, X, Image as ImageIcon, Video, Loader2, Plus, Trash2,
    Calendar, Clock, MapPin, Tag as TagIcon, Link as LinkIcon
} from 'lucide-react';
import { EventItem, MediaItem, EventCategory } from '@/lib/events/types';
import { EVENT_CATEGORIES, LOCATIONS } from '@/lib/events/types';
import { uploadMedia } from '@/lib/imagekit';

interface EventFormProps {
    initialData?: EventItem;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
}

export default function EventForm({ initialData, onSubmit, onCancel, isEditing = false }: EventFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [featuredPreview, setFeaturedPreview] = useState<string | null>(initialData?.featuredImage || null);
    const [galleryPreviews, setGalleryPreviews] = useState<MediaItem[]>(initialData?.gallery || []);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const featuredInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const handleFeaturedUpload = async (file: File) => {
        if (!file) return;

        setUploading(true);
        try {
            // For demo: show preview immediately
            const preview = URL.createObjectURL(file);
            setFeaturedPreview(preview);

            // In production: upload to ImageKit here
            // const result = await uploadMedia(file, 'events/featured');
            // setFeaturedPreview(result.url);

        } catch (error) {
            console.error('Upload error:', error);
            setErrors(prev => ({ ...prev, featuredImage: 'Failed to upload image' }));
        } finally {
            setUploading(false);
        }
    };

    const handleGalleryUpload = async (files: FileList | null) => {
        if (!files) return;

        setUploading(true);
        try {
            const newPreviews: MediaItem[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const preview = URL.createObjectURL(file);

                newPreviews.push({
                    url: preview,
                    fileId: `temp-${Date.now()}-${i}`,
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    thumbnail: file.type.startsWith('image/') ? preview : undefined,
                    alt: file.name,
                });
            }

            setGalleryPreviews(prev => [...prev, ...newPreviews]);

            // In production: upload each file to ImageKit
            // for (const file of Array.from(files)) {
            //   const result = await uploadMedia(file, 'events/gallery');
            //   // Add to gallery state
            // }

        } catch (error) {
            console.error('Gallery upload error:', error);
            setErrors(prev => ({ ...prev, gallery: 'Failed to upload media' }));
        } finally {
            setUploading(false);
        }
    };

    const removeGalleryItem = (fileId: string) => {
        setGalleryPreviews(prev => prev.filter(item => item.fileId !== fileId));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Add featured image file if selected
        if (featuredInputRef.current?.files?.[0]) {
            formData.append('featuredImage', featuredInputRef.current.files[0]);
        }

        // Add gallery files
        if (galleryInputRef.current?.files) {
            Array.from(galleryInputRef.current.files).forEach(file => {
                formData.append('gallery', file);
            });
        }

        // Add deleted gallery IDs
        const deletedIds = initialData?.gallery
            ?.filter(g => !galleryPreviews.some(p => p.fileId === g.fileId))
            .map(g => g.fileId) || [];
        deletedIds.forEach(id => formData.append('deletedGallery', id));

        setSubmitting(true);

        try {
            await onSubmit(formData);
        } catch (error) {
            setErrors({ submit: 'Failed to save event. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={initialData?.title}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="Enter event title"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
                    <input
                        type="text"
                        name="slug"
                        defaultValue={initialData?.slug}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="auto-generated-from-title"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate from title</p>
                </div>
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                        name="category"
                        defaultValue={initialData?.category || 'health-camp'}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white"
                    >
                        {EVENT_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                        name="status"
                        defaultValue={initialData?.status || 'upcoming'}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white"
                    >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="past">Past</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="featured"
                            defaultChecked={initialData?.featured}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Featured Event</span>
                    </label>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                <textarea
                    name="description"
                    defaultValue={initialData?.description}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                    placeholder="Brief description for cards and listings..."
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                <textarea
                    name="fullDescription"
                    defaultValue={initialData?.fullDescription}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none font-mono text-sm"
                    placeholder="Supports HTML. Use &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; tags..."
                />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                    <input
                        type="date"
                        name="startDate"
                        defaultValue={initialData?.startDate}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
                    <input
                        type="time"
                        name="startTime"
                        defaultValue={initialData?.startTime || '09:00'}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">End Time *</label>
                    <input
                        type="time"
                        name="endTime"
                        defaultValue={initialData?.endTime || '17:00'}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    />
                </div>
            </div>

            {/* End Date */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date (Optional)</label>
                <input
                    type="date"
                    name="endDate"
                    defaultValue={initialData?.endDate}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank for single-day events</p>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                    <select
                        name="location"
                        defaultValue={initialData?.location || 'Greater Noida'}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white"
                    >
                        {LOCATIONS.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Venue *</label>
                    <input
                        type="text"
                        name="venue"
                        defaultValue={initialData?.venue}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="Full venue address"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Venue Details</label>
                <input
                    type="text"
                    name="venueDetails"
                    defaultValue={initialData?.venueDetails}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="Parking info, floor, accessibility notes..."
                />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price Type *</label>
                    <select
                        name="price"
                        defaultValue={initialData?.price || 'free'}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all bg-white"
                    >
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price Amount</label>
                    <input
                        type="text"
                        name="priceAmount"
                        defaultValue={initialData?.priceAmount}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="₹499"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        defaultValue={initialData?.capacity}
                        min="1"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="Max attendees"
                    />
                </div>
            </div>

            {/* Contact Info */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
                <input
                    type="tel"
                    name="contactPhone"
                    defaultValue={initialData?.contactPhone}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="+91 98765 43210"
                />
            </div>

            {/* Speaker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Speaker Name</label>
                    <input
                        type="text"
                        name="speaker"
                        defaultValue={initialData?.speaker}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="Dr. Shravan Kumar"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Speaker Title</label>
                    <input
                        type="text"
                        name="speakerTitle"
                        defaultValue={initialData?.speakerTitle}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="Lead Physiotherapist, B.P.T."
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Speaker Bio</label>
                <textarea
                    name="speakerBio"
                    defaultValue={initialData?.speakerBio}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                    placeholder="Brief speaker biography..."
                />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        Registration URL
                    </label>
                    <input
                        type="url"
                        name="registrationUrl"
                        defaultValue={initialData?.registrationUrl}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="https://forms.example.com/register"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        External Event URL
                    </label>
                    <input
                        type="url"
                        name="eventUrl"
                        defaultValue={initialData?.eventUrl}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="https://example.com/event-page"
                    />
                </div>
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <TagIcon className="w-4 h-4" />
                    Tags (comma-separated)
                </label>
                <input
                    type="text"
                    name="tags"
                    defaultValue={initialData?.tags?.join(', ')}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="back pain, posture, screening, free camp"
                />
                <p className="text-xs text-gray-500 mt-1">Used for search and filtering</p>
            </div>

            {/* Featured Image */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image</label>
                <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${featuredPreview ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                        }`}
                    onClick={() => featuredInputRef.current?.click()}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                            <p className="text-sm text-gray-600">Uploading...</p>
                        </div>
                    ) : featuredPreview ? (
                        <div className="relative">
                            <img
                                src={featuredPreview}
                                alt="Preview"
                                className="max-h-48 mx-auto rounded-lg object-cover"
                            />
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setFeaturedPreview(null); }}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <p className="text-xs text-gray-500 mt-2">Click to change</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <ImageIcon className="w-10 h-10 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Click to upload featured image</p>
                                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    )}
                    <input
                        ref={featuredInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFeaturedUpload(e.target.files[0])}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Gallery */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gallery (Images/Videos)</label>
                <div
                    className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-gray-300 hover:border-indigo-400"
                    onClick={() => galleryInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                            <Video className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Click to upload gallery media</p>
                            <p className="text-xs text-gray-500">Multiple files, PNG/JPG/MP4 up to 10MB each</p>
                        </div>
                    </div>
                    <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => handleGalleryUpload(e.target.files)}
                        className="hidden"
                    />
                </div>

                {/* Gallery Previews */}
                {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {galleryPreviews.map((item) => (
                            <div key={item.fileId} className="relative group">
                                {item.type === 'video' ? (
                                    <video
                                        src={item.url}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={item.alt}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeGalleryItem(item.fileId)}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                                {item.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                                        <Video className="w-6 h-6 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Requirements & What to Bring */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements (one per line)</label>
                    <textarea
                        name="requirements"
                        defaultValue={initialData?.requirements?.join('\n')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                        placeholder="No prior registration needed&#10;Arrive 15 minutes early&#10;Wear comfortable clothing"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">What to Bring (one per line)</label>
                    <textarea
                        name="whatToBring"
                        defaultValue={initialData?.whatToBring?.join('\n')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                        placeholder="ID proof&#10;Comfortable clothes&#10;Water bottle"
                    />
                </div>
            </div>

            {/* FAQ */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">FAQ (JSON format)</label>
                <textarea
                    name="faq"
                    defaultValue={initialData?.faq ? JSON.stringify(initialData.faq, null, 2) : ''}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none font-mono text-sm"
                    placeholder={`[
  { "question": "Do I need to book?", "answer": "No, walk-in welcome." }
]`}
                />
            </div>

            {/* Errors */}
            {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {errors.submit}
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={submitting}
                    className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting || uploading}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {submitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
                    ) : (
                        <>{isEditing ? 'Update Event' : 'Create Event'}</>
                    )}
                </button>
            </div>
        </form>
    );
}