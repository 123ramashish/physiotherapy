// app/testimonials/components/TestimonialForm.tsx
'use client';

import { useState, useRef } from 'react';
import { X, Star, Upload, CheckCircle, MapPin, User, MessageSquare, Send } from 'lucide-react';

type Props = {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void> | void;
  branches: string[];
  treatments: string[];
};

export default function TestimonialForm({ onClose, onSubmit, branches, treatments }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: branches[0] || '',
    treatment: treatments[0] || '',
    rating: 5,
    text: '',
    avatar: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRating = (rating: number) => setFormData(prev => ({ ...prev, rating }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simple preview - in production, upload to CDN
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setStep(3); // Success
    } catch (err) {
      console.error('Submission failed', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Multi-step form navigation
  if (step === 3) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-emerald-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
          <p className="text-slate-600 text-sm mb-6">
            Your review has been submitted and is pending verification. We appreciate you sharing your experience!
          </p>
          <button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Share Your Experience</h2>
            <p className="text-xs text-slate-500">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors" aria-label="Close form">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo (Optional)</label>
                <div className="flex items-center gap-4">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-teal-200" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                      <User className="text-slate-400" size={24} />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 text-sm text-teal-600 font-medium hover:text-teal-700"
                  >
                    <Upload size={14} /> {formData.avatar ? 'Change' : 'Upload'}
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                    aria-label="Upload profile photo"
                  />
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="Priya Sharma"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email (for verification)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="priya@example.com"
                  />
                </div>
              </div>

              {/* Branch & Treatment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Branch Visited *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select
                      required
                      value={formData.branch}
                      onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                    >
                      {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Treatment Received *</label>
                  <select
                    required
                    value={formData.treatment}
                    onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                  >
                    {treatments.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      className="p-1 hover:scale-110 transition-transform focus:outline-none"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star 
                        size={28} 
                        className={star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} 
                      />
                    </button>
                  ))}
                  <span className="text-sm text-slate-500 ml-2">{formData.rating} / 5</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Continue to Review →
              </button>
            </>
          )}

          {/* Step 2: Review Text */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Experience *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea
                    required
                    rows={5}
                    value={formData.text}
                    onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                    placeholder="Share how SKM helped you recover... (min. 50 characters)"
                    minLength={50}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{formData.text.length}/500 characters</p>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input type="checkbox" required className="mt-1 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <span>
                  I confirm this review is based on my genuine experience. I agree to SKM Physiotherapy displaying my review publicly.
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || formData.text.length < 50}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send size={16} /> Submit Review
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}