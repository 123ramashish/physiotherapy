// app/testimonials/page.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import { 
  Search, Filter, Star, MapPin, User, Image as ImageIcon, 
  Send, X, CheckCircle, ChevronDown, ChevronUp, Sparkles 
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const TestimonialForm = dynamic(() => import('@/components/testimonials/TestimonialForm'), { 
  loading: () => <div className="p-8 text-center text-slate-500">Loading form...</div>,
  ssr: false 
});

// ─── Types ───
type Testimonial = {
  id: string;
  name: string;
  branch: string;
  city: string;
  treatment: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  avatar?: string;
  helpful: number;
};

type FilterState = {
  branch: string;
  treatment: string;
  rating: number;
  search: string;
};

// ─── Mock Data (Replace with API/CMS) ───
const BRANCHES = ['All', 'SKM Main Centre (Delhi)', 'SKM Gurgaon', 'SKM Noida', 'SKM Faridabad'];
const TREATMENTS = ['All', 'Back Pain', 'Sports Injury', 'Cupping Therapy', 'Dry Needling', 'Knee Pain', 'Post-Surgery', 'Neuro Rehab'];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    branch: 'SKM Main Centre (Delhi)',
    city: 'Delhi',
    treatment: 'Back Pain Treatment',
    rating: 5,
    text: "After 3 years of chronic lower back pain, SKM's therapy gave me my life back in just 6 weeks. The dry needling combined with personalised exercises was truly transformational!",
    date: '2025-03-15',
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=5',
    helpful: 42
  },
  {
    id: '2',
    name: 'Rajesh Patel',
    branch: 'SKM Gurgaon',
    city: 'Gurgaon',
    treatment: 'Sports Injury Rehab',
    rating: 5,
    text: "Suffered a ligament tear during cricket. SKM's sports rehab got me back on the field in 10 weeks — faster than the surgeon predicted. Their AI-based progress tracking was incredibly motivating.",
    date: '2025-03-10',
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=12',
    helpful: 38
  },
  {
    id: '3',
    name: 'Ananya Gupta',
    branch: 'SKM Noida',
    city: 'Noida',
    treatment: 'Cupping Therapy (Hijama)',
    rating: 5,
    text: "Reluctant at first, but the cupping sessions completely resolved my shoulder stiffness. The therapist explained every step and I felt results after just the second session. Highly professional!",
    date: '2025-03-08',
    verified: true,
    avatar: 'https://i.pravatar.cc/150?img=9',
    helpful: 31
  },
  // Add more testimonials...
];

// ─── Summary Stats Component ───
function SummaryStats({ testimonials }: { testimonials: Testimonial[] }) {
  const avgRating = useMemo(() => {
    const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
    return (total / testimonials.length).toFixed(1);
  }, [testimonials]);

  const stats = [
    { label: 'Verified Reviews', value: testimonials.length.toLocaleString(), icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Average Rating', value: `⭐ ${avgRating}/5`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Branches', value: '4 NCR Locations', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Recovery Rate', value: '98%', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className={`${stat.bg} rounded-2xl p-4 border border-slate-100`}>
          <div className="flex items-center gap-2 mb-2">
            <stat.icon size={18} className={stat.color} />
            <span className="text-xs font-medium text-slate-500">{stat.label}</span>
          </div>
          <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Filter Bar Component ───
function FilterBar({ 
  filters, 
  setFilters, 
  onSearch 
}: { 
  filters: FilterState; 
  setFilters: (f: FilterState) => void;
  onSearch: (q: string) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 mb-8">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="search"
          placeholder="Search reviews by name, treatment, or keyword..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, search: e.target.value });
            onSearch(e.target.value);
          }}
          aria-label="Search testimonials"
        />
      </div>

      {/* Filter Toggle (Mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center gap-2 text-sm font-medium text-slate-600 mb-4"
        aria-expanded={showFilters}
      >
        <Filter size={16} /> Filters {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Filter Options */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Branch Filter */}
          <select
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
            aria-label="Filter by branch"
          >
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          {/* Treatment Filter */}
          <select
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            value={filters.treatment}
            onChange={(e) => setFilters({ ...filters, treatment: e.target.value })}
            aria-label="Filter by treatment"
          >
            {TREATMENTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          {/* Rating Filter */}
          <select
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
            aria-label="Filter by rating"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐+ (4+)</option>
            <option value={3}>⭐⭐⭐+ (3+)</option>
          </select>
        </div>

        {/* Active Filters */}
        {(filters.branch !== 'All' || filters.treatment !== 'All' || filters.rating > 0) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {filters.branch !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                {filters.branch}
                <button onClick={() => setFilters({ ...filters, branch: 'All' })} aria-label="Remove branch filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.treatment !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                {filters.treatment}
                <button onClick={() => setFilters({ ...filters, treatment: 'All' })} aria-label="Remove treatment filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.rating > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                {filters.rating}+ ⭐
                <button onClick={() => setFilters({ ...filters, rating: 0 })} aria-label="Remove rating filter">
                  <X size={12} />
                </button>
              </span>
            )}
            <button 
              onClick={() => setFilters({ branch: 'All', treatment: 'All', rating: 0, search: '' })}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Testimonial Card Component ───
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-100 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="relative">
          {testimonial.avatar ? (
            <img 
              src={testimonial.avatar} 
              alt={`${testimonial.name}'s profile`}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white font-bold">
              {testimonial.name.charAt(0)}
            </div>
          )}
          {testimonial.verified && (
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5" title="Verified Patient">
              <CheckCircle size={12} />
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900 truncate">{testimonial.name}</h3>
            {testimonial.verified && (
              <span className="text-[10px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">Verified</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <MapPin size={12} />
            <span>{testimonial.city}</span>
            <span>•</span>
            <span>{testimonial.branch.split('(')[0].trim()}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} 
            />
          ))}
        </div>
      </div>

      {/* Treatment Badge */}
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full mb-3">
        <Sparkles size={10} />
        {testimonial.treatment}
      </div>

      {/* Review Text */}
      <blockquote className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4 group-hover:line-clamp-none transition-all">
        {testimonial.text}
      </blockquote>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
        <time dateTime={testimonial.date}>
          {new Date(testimonial.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
        </time>
        <button className="flex items-center gap-1 hover:text-teal-600 transition-colors" aria-label="Mark as helpful">
          <Star size={12} /> {testimonial.helpful} found helpful
        </button>
      </div>
    </article>
  );
}

// ─── Main Page Component ───
export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [filters, setFilters] = useState<FilterState>({ branch: 'All', treatment: 'All', rating: 0, search: '' });
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');

  // Filter & Search Logic
  const filteredTestimonials = useMemo(() => {
    let result = [...testimonials];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) ||
        t.treatment.toLowerCase().includes(q) ||
        t.text.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q)
      );
    }

    // Branch Filter
    if (filters.branch !== 'All') {
      result = result.filter(t => t.branch === filters.branch);
    }

    // Treatment Filter
    if (filters.treatment !== 'All') {
      result = result.filter(t => t.treatment.includes(filters.treatment));
    }

    // Rating Filter
    if (filters.rating > 0) {
      result = result.filter(t => t.rating >= filters.rating);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [testimonials, filters, sortBy]);

  // Debounced Search (optional enhancement)
  const handleSearch = useCallback((query: string) => {
    // Could add debounce here with setTimeout
  }, []);

  // Handle Form Submission
  const handleSubmitTestimonial = async (data: Partial<Testimonial>) => {
    // TODO: Replace with actual API call / server action
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: data.name || 'Anonymous',
      branch: data.branch || 'SKM Main Centre (Delhi)',
      city: data.city || 'Delhi',
      treatment: data.treatment || 'General Consultation',
      rating: data.rating || 5,
      text: data.text || '',
      date: new Date().toISOString().split('T')[0],
      verified: false, // Pending verification
      avatar: data.avatar,
      helpful: 0
    };
    
    setTestimonials(prev => [newTestimonial, ...prev]);
    setShowForm(false);
    
    // Show success toast (implement with your toast library)
    alert('Thank you! Your review is pending verification and will appear soon.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <CheckCircle size={12} /> 5,000+ Verified Reviews
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Real Stories, Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Recovery</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
            Discover how patients across Delhi NCR achieved pain-free living with expert physiotherapy at SKM.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-teal-200"
            >
              <Send size={16} /> Share Your Story
            </button>
            <a 
              href="#reviews"
              className="inline-flex items-center gap-2 border-2 border-teal-200 text-teal-700 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
            >
              Browse Reviews
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12" id="reviews">
        {/* Summary Stats */}
        <SummaryStats testimonials={testimonials} />

        {/* Filters & Search */}
        <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />

        {/* Sort & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-slate-500 text-sm">
            Showing <span className="font-semibold text-slate-900">{filteredTestimonials.length}</span> of {testimonials.length} reviews
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="newest">Newest First</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Testimonials Grid */}
        {filteredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTestimonials.map(t => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No reviews found</h3>
            <p className="text-slate-500 text-sm mb-4">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => setFilters({ branch: 'All', treatment: 'All', rating: 0, search: '' })}
              className="text-teal-600 font-medium text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More (if paginating) */}
        {filteredTestimonials.length >= 9 && (
          <div className="text-center mt-10">
            <button className="px-6 py-3 bg-white border-2 border-teal-200 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors">
              Load More Reviews
            </button>
          </div>
        )}
      </main>

      {/* Testimonial Submission Modal */}
      {showForm && (
        <TestimonialForm 
          onClose={() => setShowForm(false)} 
          onSubmit={handleSubmitTestimonial}
          branches={BRANCHES.filter(b => b !== 'All')}
          treatments={TREATMENTS.filter(t => t !== 'All')}
        />
      )}

      {/* Floating CTA (Mobile) */}
      <div className="fixed bottom-6 left-4 right-4 md:hidden z-40">
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-teal-200/50"
        >
          <Send size={16} /> Share Your Experience
        </button>
      </div>
    </div>
  );
}