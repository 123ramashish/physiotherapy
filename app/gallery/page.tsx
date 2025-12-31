'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight,
  Grid3x3,
  Camera,
  Award,
  Users,
  Heart,
  Activity,
  Filter,
  Sparkles
} from 'lucide-react';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState<any>([]);
  const itemRefs = useRef<any>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref:any, index:any) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev:any) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer: IntersectionObserver) => observer.disconnect());
  }, [selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Photos', icon: Grid3x3 },
    { id: 'facility', label: 'Facility', icon: Camera },
    { id: 'treatment', label: 'Treatment', icon: Activity },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'events', label: 'Events', icon: Award }
  ];

  const galleryItems = [
    { id: 1, category: 'facility', title: 'Modern Treatment Room', color: 'from-blue-400 to-blue-600' },
    { id: 2, category: 'treatment', title: 'Physical Therapy Session', color: 'from-red-400 to-pink-600' },
    { id: 3, category: 'team', title: 'Expert Physiotherapist', color: 'from-purple-400 to-purple-600' },
    { id: 4, category: 'facility', title: 'Advanced Equipment', color: 'from-green-400 to-emerald-600' },
    { id: 5, category: 'treatment', title: 'Manual Therapy', color: 'from-orange-400 to-red-600' },
    { id: 6, category: 'events', title: 'Health Workshop', color: 'from-yellow-400 to-orange-600' },
    { id: 7, category: 'facility', title: 'Reception Area', color: 'from-indigo-400 to-blue-600' },
    { id: 8, category: 'treatment', title: 'Rehabilitation Exercise', color: 'from-pink-400 to-rose-600' },
    { id: 9, category: 'team', title: 'Medical Staff', color: 'from-teal-400 to-cyan-600' },
    { id: 10, category: 'facility', title: 'Waiting Lounge', color: 'from-violet-400 to-purple-600' },
    { id: 11, category: 'events', title: 'Community Event', color: 'from-amber-400 to-yellow-600' },
    { id: 12, category: 'treatment', title: 'Sports Injury Care', color: 'from-red-400 to-orange-600' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleImageClick = (item:any) => {
    setSelectedImage(item);
  };

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const previousIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[previousIndex]);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>Physiotherapy Clinic Gallery - Facility Photos & Treatment Sessions</h1>
        <meta name="description" content="Explore our modern physiotherapy clinic through our gallery. View our state-of-the-art facilities, treatment rooms, expert team, and community events." />
        <meta name="keywords" content="physiotherapy clinic gallery, treatment facility photos, physical therapy center, medical equipment, healthcare facility" />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg mb-6 animate-bounce">
              <Camera className="text-red-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">Visual Journey</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Our <span className="relative inline-block">
                <span className="text-red-600">Gallery</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M1 8C50 3 150 3 199 8" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our state-of-the-art facility, meet our expert team, and witness the quality care we provide
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
              {[
                { icon: Camera, value: '200+', label: 'Photos' },
                { icon: Award, value: '5 Star', label: 'Rated' },
                { icon: Users, value: '50+', label: 'Staff' },
                { icon: Heart, value: '500+', label: 'Patients' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-red-100 p-2 rounded-lg">
                    <stat.icon className="text-red-600" size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="text-gray-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setVisibleItems([]);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow hover:shadow-md'
                  }`}
                >
                  <category.icon size={18} />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <Camera className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-500 text-lg">No images in this category yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    ref={(el:any) => (itemRefs.current[index] = el)}
                    className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 ${
                      visibleItems.includes(index)
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${(index % 12) * 50}ms` }}
                    onClick={() => handleImageClick(item)}
                  >
                    {/* Gradient Background as Placeholder */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-500 group-hover:scale-110`}></div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl">
                          <ZoomIn className="text-red-600" size={28} />
                        </div>
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-semibold text-sm sm:text-base">{item.title}</h3>
                      <p className="text-white/80 text-xs mt-1 capitalize">{item.category}</p>
                    </div>

                    {/* Corner Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Sparkles className="inline mr-1" size={12} />
                      New
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>

              <div className="relative">
                <Camera className="mx-auto text-white/80 mb-4" size={48} />
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Visit Our Facility
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Experience our world-class facility in person. Book a tour today and see why we're the trusted choice for physiotherapy care.
                </p>
                <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-xl">
                  Schedule a Tour
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
            className="absolute left-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${selectedImage.color}`}>
              {/* Placeholder gradient */}
            </div>
            
            {/* Image Info */}
            <div className="mt-6 text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/70 capitalize">{selectedImage.category}</p>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium">
            {filteredItems.findIndex(item => item.id === selectedImage.id) + 1} / {filteredItems.length}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default GalleryPage;