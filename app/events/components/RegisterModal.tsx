'use client';
// app/events/components/RegisterModal.tsx
import React, { useState } from 'react';
import { EventItem } from '@/lib/events/types';
import { Loader2, CheckCircle, AlertCircle, User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import { motion } from 'framer-motion'
interface RegisterModalProps {
    event: EventItem;
    onClose: () => void;
    onRegistered: () => void;
}

interface FormState {
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
}

interface FieldError {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export default function RegisterModal({ event, onClose, onRegistered }: RegisterModalProps) {
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
    });
    const [fieldErrors, setFieldErrors] = useState<FieldError>({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const updateField = (key: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
        // Clear field error on change
        if (fieldErrors[key as keyof FieldError]) {
            setFieldErrors(prev => ({ ...prev, [key]: undefined }));
        }
    };

    const validate = (): boolean => {
        const errors: FieldError = {};
        if (!form.name.trim()) errors.name = 'Full name is required';
        if (!form.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errors.email = 'Enter a valid email address';
        }
        if (!form.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone)) {
            errors.phone = 'Enter a valid phone number';
        }
        if (!form.address.trim()) errors.address = 'Address / location is required';
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        if (!validate()) return;

        setSubmitting(true);
        try {
            const response = await fetch(`/api/events/${event._id}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    address: form.address.trim(),
                    message: form.message.trim(),
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => onRegistered(), 2200);
            } else {
                setApiError(result.error ?? 'Registration failed. Please try again.');
            }
        } catch {
            setApiError('Network error. Please check your connection and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-10 px-4">
                <motion.div>
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re Registered!</h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                    Successfully registered for <span className="font-semibold text-gray-900">&ldquo;{event.title}&rdquo;</span>.
                    A confirmation will be sent to your email.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Event summary */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-xl border border-indigo-100">
                <p className="text-sm font-semibold text-indigo-900 line-clamp-1">{event.title}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="text-xs text-indigo-700 flex items-center gap-1">
                        📅 {formatDate(event.startDate)}
                    </span>
                    <span className="text-xs text-indigo-700 flex items-center gap-1">
                        🕐 {formatTime(event.startTime)}
                    </span>
                    <span className="text-xs text-indigo-700 flex items-center gap-1">
                        📍 {event.location}
                    </span>
                    {event.price === 'free' && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">FREE</span>
                    )}
                </div>
            </div>

            {/* API Error */}
            {apiError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{apiError}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder="Enter your full name"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all text-sm ${fieldErrors.name
                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                                }`}
                        />
                    </div>
                    {fieldErrors.name && (
                        <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>
                    )}
                </div>

                {/* Email + Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                placeholder="your@email.com"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all text-sm ${fieldErrors.email
                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                                    }`}
                            />
                        </div>
                        {fieldErrors.email && (
                            <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                placeholder="+91 98765 43210"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all text-sm ${fieldErrors.phone
                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                                    }`}
                            />
                        </div>
                        {fieldErrors.phone && (
                            <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Address / Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            placeholder="e.g. Sector 62, Noida, UP"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all text-sm ${fieldErrors.address
                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                                }`}
                        />
                    </div>
                    {fieldErrors.address && (
                        <p className="text-xs text-red-600 mt-1">{fieldErrors.address}</p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Message / Special Requirements
                        <span className="text-gray-400 font-normal ml-1">(optional)</span>
                    </label>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        <textarea
                            value={form.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            rows={3}
                            placeholder="Any questions or special requirements..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none text-sm"
                        />
                    </div>
                </div>

                {/* Capacity info */}
                {event.capacity && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        {event.capacity - event.registered > 0
                            ? `${event.capacity - event.registered} spots remaining out of ${event.capacity}`
                            : 'Event is at full capacity'}
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                        {submitting ? (
                            <><Loader2 className="w-4 h-4 animate-spin" />Registering...</>
                        ) : (
                            'Confirm Registration'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}