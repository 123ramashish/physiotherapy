'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useInView, useAnimation } from 'framer-motion';
import {
  Search, Filter, Tag, Calendar, Clock, Eye, MessageSquare, ChevronLeft,
  ChevronRight, X, Plus, Edit, Trash2, Send, Sparkles, Loader2, CheckCircle,
  AlertCircle, ArrowUp, Bookmark, Share2, Heart, TrendingUp, MapPin, User,
  ChevronDown, ChevronUp, Globe, SlidersHorizontal, XCircle, Check
} from 'lucide-react';

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  branch: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  views: number;
  comments: number;
  featured: boolean;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface FilterState {
  branch: string;
  category: string;
  tags: string[];
  search: string;
  sortBy: 'latest' | 'popular' | 'comments' | 'featured';
}

interface ModalState {
  type: 'read' | 'submit' | 'edit' | null;
  data?: BlogPost | null;
  isOpen: boolean;
}

interface FormState {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  branch: string;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published';
}

interface FormErrors {
  [key: string]: string;
}

// ─────────────────────────────────────────────
//  Constants & Mock Data (Replace with API)
// ─────────────────────────────────────────────

const CATEGORIES = [
  { slug: 'sports-therapy', name: 'Sports Therapy', icon: '⚡', color: '#10b981' },
  { slug: 'chiropractic', name: 'Chiropractic', icon: '🦴', color: '#3b82f6' },
  { slug: 'pain-management', name: 'Pain Management', icon: '💊', color: '#6366f1' },
  { slug: 'rehabilitation', name: 'Rehabilitation', icon: '🏃', color: '#0ea5e9' },
  { slug: 'wellness', name: 'Wellness', icon: '🌿', color: '#059669' },
  { slug: 'ergonomics', name: 'Ergonomics', icon: '💺', color: '#4f46e5' },
  { slug: 'treatment-methods', name: 'Treatment', icon: '⚕', color: '#1d4ed8' },
] as const;

const BRANCHES = [
  { id: 'all', name: 'All Branches', city: '' },
  { id: 'delhi', name: 'Delhi HQ', city: 'New Delhi' },
  { id: 'mumbai', name: 'Mumbai Centre', city: 'Mumbai' },
  { id: 'bengaluru', name: 'Bengaluru Hub', city: 'Bengaluru' },
  { id: 'hyderabad', name: 'Hyderabad', city: 'Hyderabad' },
  { id: 'chennai', name: 'Chennai', city: 'Chennai' },
] as const;

const TAG_SUGGESTIONS = [
  'back pain', 'knee pain', 'sports injury', 'rehabilitation', 'posture',
  'stretching', 'strength training', 'pain relief', 'recovery', 'wellness',
  'ergonomics', 'desk exercises', 'neck pain', 'sciatica', 'arthritis',
  'frozen shoulder', 'physical therapy', 'manual therapy', 'dry needling',
  'cupping', 'hijama', 'post-surgery', 'stroke recovery', 'bell palsy'
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Complete Guide to Preventing Sports Injuries',
    excerpt: 'Essential techniques and exercises to prevent common sports injuries and maintain peak physical performance.',
    content: `<h2>Understanding Sports Injuries</h2><p>Sports injuries can happen to anyone, from weekend warriors to professional athletes. Understanding the common types and how to prevent them is crucial for maintaining an active lifestyle.</p><h3>Common Sports Injuries</h3><ul><li><strong>Sprains and Strains:</strong> Overstretching or tearing of ligaments and muscles</li><li><strong>Fractures:</strong> Broken bones from impact or overuse</li><li><strong>Dislocations:</strong> When bones are forced out of their normal positions</li><li><strong>Tendonitis:</strong> Inflammation of tendons from repetitive motion</li></ul><h3>Prevention Strategies</h3><p>1. <strong>Proper Warm-up:</strong> Always spend 10-15 minutes warming up before intense activity. Dynamic stretches prepare your muscles and joints for movement.</p><p>2. <strong>Strength Training:</strong> Building muscle strength around joints provides better support and reduces injury risk. Focus on core stability, leg strength, and balanced muscle development.</p><p>3. <strong>Proper Technique:</strong> Learn and maintain correct form for your sport. Work with a coach or physiotherapist to ensure you're moving safely.</p><p>4. <strong>Rest and Recovery:</strong> Allow adequate time between intense sessions. Overtraining is a leading cause of injuries.</p><p>5. <strong>Proper Equipment:</strong> Use sport-appropriate footwear, protective gear, and well-maintained equipment.</p><h3>When to Seek Help</h3><p>If you experience persistent pain, swelling, limited range of motion, or instability in a joint, consult a physiotherapist promptly. Early intervention can prevent minor issues from becoming major problems.</p>`,
    category: 'sports-therapy',
    branch: 'delhi',
    author: 'Dr. Sarah Johnson',
    authorRole: 'Senior Physiotherapist',
    date: '2024-03-15T10:00:00.000Z',
    readTime: '8 min',
    views: 4201,
    comments: 24,
    featured: true,
    tags: ['prevention', 'sports', 'exercises', 'warm-up', 'strength training'],
    status: 'published',
    createdAt: '2024-03-15T09:00:00.000Z',
    updatedAt: '2024-03-15T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'Chiropractic Care for Chronic Back Pain',
    excerpt: 'Modern chiropractic techniques that provide lasting relief from chronic back pain without invasive procedures.',
    content: `<h2>The Science of Chiropractic Care</h2><p>Chiropractic care focuses on the relationship between the spine and nervous system. When spinal joints become misaligned (subluxated), they can interfere with nerve function and cause pain, stiffness, and reduced mobility.</p><h3>How Chiropractic Helps Back Pain</h3><p>1. <strong>Spinal Adjustments:</strong> Gentle, precise movements restore proper joint alignment and motion, reducing nerve irritation.</p><p>2. <strong>Soft Tissue Therapy:</strong> Techniques like massage and trigger point therapy release muscle tension that contributes to pain.</p><p>3. <strong>Rehabilitative Exercises:</strong> Customized exercises strengthen supporting muscles and improve posture for long-term relief.</p><p>4. <strong>Lifestyle Guidance:</strong> Advice on ergonomics, sleeping positions, and daily habits that support spinal health.</p><h3>What to Expect</h3><p>Your first visit includes a thorough assessment: medical history, physical examination, and possibly imaging. Your chiropractor will then create a personalized treatment plan with clear goals and timelines.</p><p>Most patients experience improvement within 2-4 weeks of consistent care. Maintenance visits help prevent recurrence and support overall wellness.</p>`,
    category: 'chiropractic',
    branch: 'mumbai',
    author: 'Dr. Michael Chen',
    authorRole: 'Chief Chiropractor',
    date: '2024-03-12T10:00:00.000Z',
    readTime: '6 min',
    views: 3850,
    comments: 18,
    featured: true,
    tags: ['back pain', 'chiropractic', 'relief', 'spine', 'adjustment'],
    status: 'published',
    createdAt: '2024-03-12T09:00:00.000Z',
    updatedAt: '2024-03-12T09:00:00.000Z',
  },
  {
    id: 3,
    title: '5 Desk Exercises for Better Posture',
    excerpt: 'Simple, effective exercises you can do at your desk to improve posture, reduce back pain, and prevent long-term spinal issues.',
    content: `<h2>Why Posture Matters</h2><p>Poor posture from prolonged sitting can lead to chronic pain, reduced lung capacity, digestive issues, and decreased confidence. The good news: small, consistent changes make a big difference.</p><h3>Exercise 1: Chin Tucks</h3><p><strong>How:</strong> Sit tall, gently draw your chin straight back (like making a double chin). Hold 3 seconds, release. Repeat 10x.</p><p><strong>Benefits:</strong> Strengthens deep neck flexors, reduces forward head posture, alleviates neck tension.</p><h3>Exercise 2: Shoulder Blade Squeezes</h3><p><strong>How:</strong> Sit or stand tall. Squeeze shoulder blades together, hold 5 seconds, release. Repeat 15x.</p><p><strong>Benefits:</strong> Counters rounded shoulders, strengthens upper back, improves breathing.</p><h3>Exercise 3: Seated Cat-Cow</h3><p><strong>How:</strong> Sit on edge of chair. Inhale, arch back, look up (cow). Exhale, round spine, tuck chin (cat). Repeat 10x.</p><p><strong>Benefits:</strong> Mobilizes spine, reduces stiffness, improves flexibility.</p><h3>Exercise 4: Hip Flexor Stretch</h3><p><strong>How:</strong> Stand, step one foot back into lunge. Tuck pelvis, gently push hips forward. Hold 30s each side.</p><p><strong>Benefits:</strong> Releases tight hip flexors from sitting, reduces lower back strain.</p><h3>Exercise 5: Thoracic Extension</h3><p><strong>How:</strong> Clasp hands behind head. Gently arch upper back over chair back. Hold 15s, repeat 3x.</p><p><strong>Benefits:</strong> Opens chest, counters hunching, improves breathing.</p><p><strong>Pro Tip:</strong> Set hourly reminders to do one exercise. Consistency beats intensity!</p>`,
    category: 'ergonomics',
    branch: 'bengaluru',
    author: 'Elena Rodriguez',
    authorRole: 'Ergonomics Specialist',
    date: '2024-03-10T10:00:00.000Z',
    readTime: '5 min',
    views: 2980,
    comments: 12,
    featured: false,
    tags: ['posture', 'office', 'desk', 'exercises', 'stretching'],
    status: 'published',
    createdAt: '2024-03-10T09:00:00.000Z',
    updatedAt: '2024-03-10T09:00:00.000Z',
  },
  // Add more mock posts as needed...
];

// ─────────────────────────────────────────────
//  Utility Functions
// ─────────────────────────────────────────────

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

const getCategoryColor = (slug: string): string => {
  const cat = CATEGORIES.find(c => c.slug === slug);
  return cat?.color || '#6366f1';
};

const getCategoryInfo = (slug: string) => {
  return CATEGORIES.find(c => c.slug === slug) || { name: slug, icon: '📄', color: '#6366f1' };
};

const getBranchInfo = (id: string) => {
  return BRANCHES.find(b => b.id === id) || { name: id, city: '' };
};

// ─────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

// ─────────────────────────────────────────────
//  Tag Input Component with Suggestions
// ─────────────────────────────────────────────

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  maxTags?: number;
}

function TagInput({
  value,
  onChange,
  suggestions = TAG_SUGGESTIONS,
  placeholder = 'Add tags...',
  maxTags = 10
}: TagInputProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = useMemo(() => {
    if (!input.trim()) return [];
    return suggestions
      .filter(tag =>
        tag.toLowerCase().includes(input.toLowerCase()) &&
        !value.includes(tag)
      )
      .slice(0, 5);
  }, [input, suggestions, value]);

  const addTag = (tag: string) => {
    const normalized = tag.trim().toLowerCase();
    if (normalized && !value.includes(normalized) && value.length < maxTags) {
      onChange([...value, normalized]);
      setInput('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap gap-2 p-3 min-h-[48px] bg-white border-2 border-gray-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
        {value.map(tag => (
          <motion.span
            key={tag}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
          >
            <Tag className="w-3 h-3" />
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 hover:text-indigo-900 transition-colors"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={value.length >= maxTags ? 'Max tags reached' : placeholder}
          disabled={value.length >= maxTags}
          className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
          aria-label="Add tags"
        />
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            {filteredSuggestions.map(suggestion => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-gray-400" />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {value.length >= maxTags && (
        <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Maximum {maxTags} tags allowed
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Modal Component (Reusable)
// ─────────────────────────────────────────────

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
  showClose = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap (basic)
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className={`pointer-events-auto w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                  {title}
                </h2>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
//  Read More Modal Content
// ─────────────────────────────────────────────

interface ReadModalContentProps {
  post: BlogPost;
}

function ReadModalContent({ post }: ReadModalContentProps) {
  const category = getCategoryInfo(post.category);
  const branch = getBranchInfo(post.branch);

  return (
    <article className="prose prose-lg max-w-none">
      {/* Article Header */}
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

      {/* Article Content */}
      <div
        className="text-gray-700 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
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

      {/* Actions */}
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

// ─────────────────────────────────────────────
//  Submit/Edit Blog Form Modal
// ─────────────────────────────────────────────

interface BlogFormModalProps {
  mode: 'submit' | 'edit';
  initialData?: BlogPost | null;
  onSubmit: (data: FormState) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

function BlogFormModal({
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
      // Mock AI generation - replace with actual API call
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
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

      {/* Excerpt */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700">
            Excerpt <span className="text-red-500">*</span>
          </label>
          <button
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
          </button>
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

      {/* Content */}
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

      {/* Category & Branch */}
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

      {/* Tags */}
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

      {/* Options */}
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => handleChange('featured', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-700">Mark as Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="draft"
            checked={form.status === 'draft'}
            onChange={() => handleChange('status', 'draft')}
            className="w-4 h-4 text-indigo-600"
          />
          <span className="text-sm text-gray-700">Save as Draft</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="published"
            checked={form.status === 'published'}
            onChange={() => handleChange('status', 'published')}
            className="w-4 h-4 text-indigo-600"
          />
          <span className="text-sm text-gray-700">Publish Now</span>
        </label>
      </div>

      {/* Actions */}
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

// ─────────────────────────────────────────────
//  Blog Card Component
// ─────────────────────────────────────────────

interface BlogCardProps {
  post: BlogPost;
  onRead: (post: BlogPost) => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (post: BlogPost) => void;
  showActions?: boolean;
}

function BlogCard({
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
      {/* Category Bar */}
      <div
        className="h-1.5"
        style={{ background: `linear-gradient(90deg, ${category.color}, #6366f1)` }}
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
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

        {/* Title & Excerpt */}
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

        {/* Tags */}
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

        {/* Footer */}
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

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {post.comments}
            </span>
          </div>
        </div>

        {/* Actions (for admin) */}
        {showActions && onEdit && onDelete && (
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
        )}
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
//  Featured Card Component
// ─────────────────────────────────────────────

function FeaturedCard({ post, onRead }: { post: BlogPost; onRead: (p: BlogPost) => void }) {
  const category = getCategoryInfo(post.category);
  const branch = getBranchInfo(post.branch);

  return (
    <motion.article
      variants={scaleIn}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-300"
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${category.color}20, #6366f120)`
        }}
      />

      <div className="relative p-6 sm:p-8">
        {/* Badge */}
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

        {/* Content */}
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

        {/* Author & Meta */}
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

        {/* CTA */}
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

// ─────────────────────────────────────────────
//  Pagination Component
// ─────────────────────────────────────────────

interface PaginationProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  // Generate page numbers to show
  const pages = useMemo(() => {
    const result: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) result.push(i);
    } else {
      if (page <= 3) {
        for (let i = 1; i <= maxVisible; i++) result.push(i);
        result.push('...');
        result.push(totalPages);
      } else if (page >= totalPages - 2) {
        result.push(1);
        result.push('...');
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) result.push(i);
      } else {
        result.push(1);
        result.push('...');
        for (let i = page - 1; i <= page + 1; i++) result.push(i);
        result.push('...');
        result.push(totalPages);
      }
    }
    return result;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 mt-10" aria-label="Pagination">
      <button
        onClick={() => hasPrev && onPageChange(page - 1)}
        disabled={!hasPrev}
        className="p-2 sm:p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {pages.map((p, i) => (
        <React.Fragment key={i}>
          {p === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(p as number)}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${page === p
                  ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
              aria-current={page === p ? 'page' : undefined}
            >
              {p}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => hasNext && onPageChange(page + 1)}
        disabled={!hasNext}
        className="p-2 sm:p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </nav>
  );
}

// ─────────────────────────────────────────────
//  Main Blog Page Component
// ─────────────────────────────────────────────

export default function BlogPage() {
  // State
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1, limit: 6, total: MOCK_POSTS.length, totalPages: 1, hasNext: false, hasPrev: false
  });
  const [filters, setFilters] = useState<FilterState>({
    branch: 'all',
    category: 'all',
    tags: [],
    search: '',
    sortBy: 'latest'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [modal, setModal] = useState<ModalState>({ type: null, isOpen: false });
  const [formLoading, setFormLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Refs
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const headerControls = useAnimation();
  const showScrollTop = useInView(headerRef, { margin: '-100px' });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Header scroll effect
  useEffect(() => {
    headerControls.start({
      y: scrollY.get() > 50 ? -100 : 0,
      transition: { duration: 0.2 }
    });
  }, [scrollY, headerControls]);

  // Load posts (simulated API call)
  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));

      let filtered = [...MOCK_POSTS];

      // Apply filters
      if (filters.branch !== 'all') {
        filtered = filtered.filter(p => p.branch === filters.branch);
      }
      if (filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      if (filters.tags.length > 0) {
        filtered = filtered.filter(p =>
          filters.tags.some(tag => p.tags.includes(tag))
        );
      }
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'popular':
          filtered.sort((a, b) => b.views - a.views);
          break;
        case 'comments':
          filtered.sort((a, b) => b.comments - a.comments);
          break;
        case 'featured':
          filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
          break;
        default:
          filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }

      // Pagination
      const total = filtered.length;
      const totalPages = Math.ceil(total / filters.limit);
      const start = (filters.limit) * (pagination.page - 1);
      const paginated = filtered.slice(start, start + pagination.limit);

      setPosts(paginated);
      setPagination(prev => ({
        ...prev,
        total,
        totalPages,
        hasNext: pagination.page < totalPages,
        hasPrev: pagination.page > 1
      }));
    } catch (error) {
      console.error('Failed to load posts:', error);
      showNotification('error', 'Failed to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch, pagination.page, pagination.limit]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Handlers
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

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

  const openReadModal = (post: BlogPost) => {
    setModal({ type: 'read', data: post, isOpen: true });
  };

  const openSubmitModal = () => {
    setModal({ type: 'submit', isOpen: true });
  };

  const openEditModal = (post: BlogPost) => {
    setModal({ type: 'edit', data: post, isOpen: true });
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setPosts(prev => prev.filter(p => p.id !== post.id));
      showNotification('success', 'Article deleted successfully');
    } catch (error) {
      showNotification('error', 'Failed to delete article');
    }
  };

  const handleSubmitForm = async (data: FormState) => {
    setFormLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const newPost: BlogPost = {
        id: modal.data?.id || Date.now(),
        ...data,
        date: new Date().toISOString(),
        readTime: `${Math.max(3, Math.ceil(data.content.split(' ').length / 200))} min`,
        views: modal.data?.views || 0,
        comments: modal.data?.comments || 0,
        createdAt: modal.data?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (modal.type === 'submit') {
        setPosts(prev => [newPost, ...prev]);
        showNotification('success', 'Article submitted successfully!');
      } else {
        setPosts(prev => prev.map(p => p.id === newPost.id ? newPost : p));
        showNotification('success', 'Article updated successfully!');
      }

      setModal({ type: null, isOpen: false });
    } catch (error) {
      showNotification('error', modal.type === 'submit' ? 'Failed to submit article' : 'Failed to update article');
    } finally {
      setFormLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derived data
  const featuredPosts = posts.filter(p => p.featured).slice(0, 2);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-4 left-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 ${notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
              }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        ref={headerRef}
        animate={headerControls}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">HealthBlog</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search articles, topics, tags..."
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={openSubmitModal}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-indigo-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                Write
              </button>
              <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Expert Health & Wellness Insights
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Guide to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
                Better Health
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Evidence-based articles from certified physiotherapists and wellness experts across India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={openSubmitModal}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Share Your Story
              </button>
              <a
                href="#articles"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Explore Articles
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Branch Filter */}
            <div className="relative">
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
              >
                {BRANCHES.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
              >
                <option value="latest">↓ Latest</option>
                <option value="popular">↓ Most Viewed</option>
                <option value="comments">↓ Most Discussed</option>
                <option value="featured">↓ Featured</option>
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Tags Filter */}
            <div className="flex-1 min-w-[200px]">
              <TagInput
                value={filters.tags}
                onChange={(tags) => handleFilterChange('tags', tags)}
                placeholder="Filter by tags..."
              />
            </div>

            {/* Limit & Search */}
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={pagination.limit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
              >
                {[6, 9, 12].map(n => (
                  <option key={n} value={n}>{n}/page</option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Featured Section */}
          {filters.branch === 'all' && filters.category === 'all' && !filters.tags.length && !debouncedSearch && pagination.page === 1 && featuredPosts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured <span className="text-indigo-600">Articles</span>
                </h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.map(post => (
                  <FeaturedCard key={post.id} post={post} onRead={openReadModal} />
                ))}
              </div>
            </section>
          )}

          {/* Articles Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Latest <span className="text-emerald-600">Articles</span>
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({pagination.total} found)
                </span>
              </h2>
              {(filters.branch !== 'all' || filters.category !== 'all' || filters.tags.length > 0 || debouncedSearch) && (
                <button
                  onClick={() => {
                    setFilters({ branch: 'all', category: 'all', tags: [], search: '', sortBy: 'latest' });
                    setSearchQuery('');
                    setDebouncedSearch('');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              // Loading Skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(pagination.limit)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-24" />
                        <div className="h-3 bg-gray-200 rounded w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : regularPosts.length === 0 ? (
              // Empty State
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {
                    setFilters({ branch: 'all', category: 'all', tags: [], search: '', sortBy: 'latest' });
                    setSearchQuery('');
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              // Articles Grid
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
              >
                <AnimatePresence mode="popLayout">
                  {regularPosts.map(post => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onRead={openReadModal}
                      onEdit={openEditModal}
                      onDelete={handleDelete}
                      showActions={true}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {!loading && regularPosts.length > 0 && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">HealthBlog</span>
              </div>
              <p className="text-gray-600 text-sm">
                Expert health and wellness insights from certified professionals across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Our Experts</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Book Consultation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Subscribe</h4>
              <p className="text-sm text-gray-600 mb-4">Get weekly health tips in your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} HealthBlog. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={modal.isOpen && modal.type === 'read'}
        onClose={() => setModal({ type: null, isOpen: false })}
        title="Article"
        size="xl"
      >
        {modal.data && <ReadModalContent post={modal.data} />}
      </Modal>

      <Modal
        isOpen={modal.isOpen && (modal.type === 'submit' || modal.type === 'edit')}
        onClose={() => setModal({ type: null, isOpen: false })}
        title={modal.type === 'submit' ? 'Submit New Article' : 'Edit Article'}
        size="lg"
      >
        <BlogFormModal
          mode={modal.type as 'submit' | 'edit'}
          initialData={modal.data || null}
          onSubmit={handleSubmitForm}
          onClose={() => setModal({ type: null, isOpen: false })}
          isLoading={formLoading}
        />
      </Modal>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}