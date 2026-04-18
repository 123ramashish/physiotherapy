'use client';

import React, { useState } from 'react';
import { EventItem } from '@/lib/events/types';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface RegisterModalProps {
    event: EventItem;
    onClose: () => void;
    onRegistered: () => void;
}

export default function RegisterModal({ event, onClose, onRegistered }: RegisterModalProps) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            // In a real app, this would call a server action
            const response = await fetch('/api/events/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId: event._id,
                    ...form
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => {
                    onRegistered();
                    onClose();
                }, 2000);
            } else {
                setError(result.error || 'Failed to register. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600">You've registered for "{event.title}". Check your email for confirmation.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-sm font-medium text-indigo-900">{event.title}</p>
                <p className="text-xs text-indigo-700 mt-1">{formatDate(event.startDate)} • {event.location}</p>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="Enter your full name"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="your.email@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                        placeholder="+91 98765 43210"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                    value={form.message}
                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                    placeholder="Any questions or special requirements..."
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {submitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</>
                ) : (
                    <>Confirm Registration</>
                )}
            </button>
        </form>
    );
}
