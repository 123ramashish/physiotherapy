'use client'
import { ArrowRight, Star, Quote } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

export default function TestimonialsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    { 
      name: 'Priya Sharma', 
      city: 'Mumbai',
      treatment: 'Back Pain Treatment',
      text: 'Excellent care and professional service. My chronic back pain is completely gone after 6 weeks of therapy!', 
      rating: 5,
      image: '👩‍⚕️'
    },
    { 
      name: 'Rajesh Patel', 
      city: 'Delhi',
      treatment: 'Sports Injury Recovery',
      text: 'The physiotherapists are incredibly knowledgeable. Recovered from my cricket injury faster than expected.', 
      rating: 5,
      image: '🏏'
    },
    { 
      name: 'Ananya Gupta', 
      city: 'Bangalore',
      treatment: 'Post-Surgery Rehabilitation',
      text: 'Highly recommend! They helped me recover from knee surgery and get back to my daily yoga practice.', 
      rating: 5,
      image: '🧘‍♀️'
    },
    { 
      name: 'Vikram Singh', 
      city: 'Chennai',
      treatment: 'Neck & Shoulder Pain',
      text: 'Outstanding personalized program. The ergonomic advice completely changed my work-from-home setup.', 
      rating: 5,
      image: '💼'
    },
    { 
      name: 'Meera Reddy', 
      city: 'Hyderabad',
      treatment: 'Arthritis Management',
      text: 'The staff is amazing! Their holistic approach to arthritis management has improved my quality of life significantly.', 
      rating: 5,
      image: '🌟'
    },
    { 
      name: 'Arjun Kumar', 
      city: 'Pune',
      treatment: 'Carpal Tunnel Syndrome',
      text: 'Professional care with excellent results. My wrist pain has reduced by 90% after just 8 sessions.', 
      rating: 5,
      image: '👨‍💻'
    }
  ];

  // Smooth testimonial transition
  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentTestimonial) return;
    
    setIsTransitioning(true);
    setCurrentTestimonial(index);
    
    // Reset auto-slider
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
    }
    
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextTestimonial = () => {
    goToTestimonial((currentTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    goToTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
  };

  // Testimonial auto slider
  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Patient Testimonials | Our Physiotherapy Clinic</title>
        <meta 
          name="description" 
          content="Read genuine patient testimonials and success stories from our physiotherapy clinic. See how our patients recovered from back pain, sports injuries, and more." 
        />
        <meta 
          name="keywords" 
          content="physiotherapy testimonials, patient reviews, back pain recovery, sports injury rehabilitation, Indian patient experiences" 
        />
        <meta property="og:title" content="Patient Testimonials | Our Physiotherapy Clinic" />
        <meta property="og:description" content="Real success stories from our patients across India" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Our Physiotherapy Clinic",
            "medicalSpecialty": "Physiotherapy",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": testimonials.length.toString(),
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": testimonials.map(testimonial => ({
              "@type": "Review",
              "author": testimonial.name,
              "reviewBody": testimonial.text,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating.toString(),
                "bestRating": "5"
              }
            }))
          })}
        </script>
      </Head>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
        aria-label="Patient Testimonials"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-rose-50 rounded-full mb-4">
              <Quote className="w-6 h-6 text-rose-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Patient Success Stories
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from our patients across India. Discover how we've helped people regain their mobility and live pain-free lives.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <span className="ml-1 text-lg font-semibold text-gray-900">5.0</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{testimonials.length}+ Verified Reviews</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-amber-50 p-6 md:p-8 lg:p-12 shadow-2xl shadow-rose-100/50 border border-rose-100">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-64 h-64 bg-rose-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-300 rounded-full blur-3xl"></div>
              </div>
              
              {/* Testimonial content */}
              <div className="relative">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Patient Avatar & Info - Left Column */}
                  <div className="lg:col-span-4 text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-4xl md:text-5xl flex items-center justify-center bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl mb-4 shadow-lg">
                        {testimonials[currentTestimonial].image}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                        {testimonials[currentTestimonial].name}
                      </h3>
                      <p className="text-rose-600 font-medium mb-2">
                        {testimonials[currentTestimonial].city}
                      </p>
                      <p className="text-sm md:text-base text-gray-500 mb-4">
                        Treated for: {testimonials[currentTestimonial].treatment}
                      </p>
                      <div className="flex items-center justify-center lg:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 md:w-6 md:h-6 text-amber-400 fill-current" 
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium text-gray-700">5.0</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial Text - Right Column */}
                  <div className="lg:col-span-8">
                    <div className="relative h-48 md:h-40 lg:h-48">
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                            index === currentTestimonial
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 translate-x-8'
                          }`}
                          aria-hidden={index !== currentTestimonial}
                        >
                          <div className="relative">
                            <Quote className="absolute -top-6 -left-2 w-12 h-12 md:w-16 md:h-16 text-rose-200/50" />
                            <blockquote className="pl-4 md:pl-8">
                              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed md:leading-relaxed">
                                "{testimonial.text}"
                              </p>
                            </blockquote>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-8 md:mt-12">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>Testimonial {currentTestimonial + 1} of {testimonials.length}</span>
                        <span>100% Satisfied Patients</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Navigation dots - Mobile Optimized */}
                <div className="flex justify-center mt-8 lg:mt-12 space-x-2 md:space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                        index === currentTestimonial
                          ? 'bg-gradient-to-r from-rose-600 to-amber-600 w-8 md:w-10 h-3'
                          : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Navigation arrows - Enhanced */}
              <button
                onClick={prevTestimonial}
                className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label="Previous testimonial"
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 rotate-180" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
            </div>
            
            {/* Trust Indicators */}
            {/* <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                <div className="text-2xl md:text-3xl font-bold text-rose-600 mb-2">500+</div>
                <div className="text-gray-700">Patients Treated</div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                <div className="text-2xl md:text-3xl font-bold text-rose-600 mb-2">98%</div>
                <div className="text-gray-700">Recovery Rate</div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                <div className="text-2xl md:text-3xl font-bold text-rose-600 mb-2">4.9/5</div>
                <div className="text-gray-700">Average Rating</div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                <div className="text-2xl md:text-3xl font-bold text-rose-600 mb-2">15+</div>
                <div className="text-gray-700">Cities Served</div>
              </div>
            </div> */}
            
            {/* Micro Testimonials Grid - Mobile Horizontal Scroll */}
            {/* <div className="mt-12 md:mt-16">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
                More Happy Patients
              </h3>
              <div className="flex overflow-x-auto pb-4 space-x-4 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-4 md:space-x-0 scrollbar-hide">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`flex-shrink-0 w-64 md:w-auto md:flex-shrink md:flex-1 p-4 rounded-xl border transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-rose-50 border-rose-200 shadow-md'
                        : 'bg-white border-gray-200 hover:border-rose-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{testimonial.image}</div>
                      <div className="text-left">
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                          ))}
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500">{testimonial.city}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}