'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Facebook, Twitter, Instagram, Youtube, Menu, X, Phone, Mail, MapPin, Clock,
  CheckCircle, ArrowRight, Activity, ChevronRight, Sparkles, Target, Shield,
  Users, Award, Star, Calendar, Map, MessageSquare
} from 'lucide-react';
import ServicesPage from './service/page';
import AboutPage from './about/page';
import BlogPage from './blog/page';
import GalleryPage from './gallery/page';
import TherapistsPage from './therapist/page';
import TestimonialsPage from './testimonials/page';
import ContactPage from './contact/page';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [activeNav, setActiveNav] = useState('home');
  const [autoScrollIndex, setAutoScrollIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // ✅ Use refs (not state) for touch so we don't get stuck paused on taps.
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const scrollableContent = [
    {
      heading: 'Expert Physiotherapy Care',
      paragraph:
        'Our certified physiotherapists combine advanced techniques with personalized attention to help you recover faster and achieve optimal mobility.',
    },
    {
      heading: 'Chiropractic Excellence',
      paragraph:
        'Experience relief from chronic pain through our specialized chiropractic treatments designed to align your spine and improve overall wellness.',
    },
    {
      heading: 'Sports Injury Rehabilitation',
      paragraph:
        'Get back in the game with our comprehensive sports injury rehabilitation programs tailored for athletes of all levels.',
    },
    {
      heading: 'Holistic Wellness Approach',
      paragraph:
        'We treat the whole person, not just the symptoms, using a combination of modern medicine and traditional healing techniques.',
    },
  ];

  const stats = [
    { number: 3, suffix: '+', label: 'Years Experience', duration: 2000 },
    { number: 1000, suffix: '+', label: 'Happy Patients', duration: 1500 },
    { number: 98, suffix: '%', label: 'Success Rate', duration: 1800 },
    { number: 24, suffix: '/7', label: 'Support Available', duration: 1000 },
  ];

  const features = [
    { icon: Shield, title: 'Certified Experts', desc: 'Licensed professionals with advanced certifications' },
    { icon: Target, title: 'Personalized Plans', desc: 'Custom treatment plans for each individual' },
    { icon: Users, title: 'Team Approach', desc: 'Collaborative care with multiple specialists' },
    { icon: Award, title: 'Latest Technology', desc: 'State-of-the-art equipment and techniques' },
  ];

  // Auto-scroll headings with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setAutoScrollIndex((prev) => (prev + 1) % scrollableContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, scrollableContent.length]);

  // ✅ Touch swipe for mobile (never gets stuck paused)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
    touchEndX.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    const start = touchStartX.current;
    const end = touchEndX.current;

    // Always reset + unpause
    touchStartX.current = null;
    touchEndX.current = null;

    if (start == null || end == null) {
      setIsPaused(false);
      return;
    }

    const distance = start - end;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setAutoScrollIndex((prev) => (prev + 1) % scrollableContent.length);
    } else if (isRightSwipe) {
      setAutoScrollIndex((prev) => (prev - 1 + scrollableContent.length) % scrollableContent.length);
    }

    setIsPaused(false);
  };

  // Stats animation
  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, index) => {
      const increment = stat.number / (stat.duration / 20);
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(intervals[index]);
        }

        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, 20);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [isVisible]); // stats is static

  // Scroll effects and active nav detection
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 150;
      const sections = ['home', 'services', 'about', 'blog', 'gallery', 'therapists', 'testimonials', 'contact'];

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const { offsetTop, offsetHeight } = section;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveNav(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const offsetTop = section.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    setActiveNav(sectionId);
    setIsMenuOpen(false);
  }; // Scroll effects and active nav detection
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active nav based on scroll position
      const scrollPosition = window.scrollY + 100;

      Object.keys(sectionRefs.current).forEach(key => {
        const section = sectionRefs.current[key];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveNav(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    // { id: 'blog', label: 'Blog' },
    // { id: 'gallery', label: 'Gallery' },
    { id: 'therapists', label: 'Therapists' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  // ✅ Key fix: translate by (100 / N)%, not 100%
  const trackStepPct = 100 / scrollableContent.length;

  return (
    <>
      <head>
        <title>SKM Physiotherapy - Expert Physiotherapy & Chiropractic Care | Sports Injury Rehabilitation</title>
        <meta
          name="description"
          content="SKM Physiotherapy offers expert physiotherapy, chiropractic care, and sports injury rehabilitation. 15+ years experience, 5000+ happy patients, 98% success rate. Book your appointment today."
        />
        <meta
          name="keywords"
          content="physiotherapy, chiropractic care, sports injury rehabilitation, physical therapy, pain relief, wellness, injury recovery, certified physiotherapists"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#e11d48" />

        <meta property="og:title" content="SKM Physiotherapy - Expert Care & Rehabilitation" />
        <meta
          property="og:description"
          content="Certified physiotherapists providing personalized treatment plans. 15+ years experience helping patients recover and achieve optimal mobility."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skmphysiotherapy.com" />
        <meta property="og:image" content="/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SKM Physiotherapy - Expert Care" />
        <meta name="twitter:description" content="Professional physiotherapy and rehabilitation services" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            name: 'SKM Physiotherapy',
            description: 'Expert physiotherapy and chiropractic care services',
            url: 'https://skmphysiotherapy.com',
            telephone: '+1-XXX-XXX-XXXX',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Your Street Address',
              addressLocality: 'Your City',
              addressRegion: 'Your State',
              postalCode: 'XXXXX',
              addressCountry: 'US',
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '5000',
            },
            priceRange: '$',
          })}
        </script>

        <link rel="canonical" href="https://skmphysiotherapy.com" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 overflow-x-hidden">
        {/* Navigation */}
        <nav
          className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-2xl py-3' : 'bg-transparent py-6'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-rose-600 to-amber-500 rounded-full blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-full transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span
                  className={`text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'
                    }`}
                >
                  skm physiotherapy
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-5 py-2.5 font-medium group overflow-hidden rounded-xl transition-all duration-300 ${activeNav === item.id ? 'text-white' : 'text-gray-700 hover:text-white'
                      }`}
                  >
                    <span className="relative z-10 transition-colors duration-300 flex items-center">{item.label}</span>
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-rose-600 to-amber-500 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-xl ${activeNav === item.id ? 'scale-100' : ''
                        }`}
                    />
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="ml-4 bg-gradient-to-r from-rose-700 via-rose-600 to-amber-500 text-white px-6 py-2.5 rounded-full hover:shadow-xl shadow-lg shadow-rose-500/30 transition-all duration-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Now
                </button>
              </div>

              <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden">
                <div className="flex flex-col space-y-2 pt-4 pb-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-5 py-3 font-medium group overflow-hidden rounded-xl transition-all duration-300 text-left ${activeNav === item.id
                        ? 'text-white bg-gradient-to-r from-rose-600 to-amber-500'
                        : 'text-gray-700'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button className="mt-2 w-full bg-gradient-to-r from-rose-700 to-amber-500 text-white px-6 py-3 rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                    Book Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
          itemScope
          itemType="https://schema.org/MedicalBusiness"
        >
          <meta itemProp="name" content="SKM Physiotherapy" />
          <meta itemProp="description" content="Expert physiotherapy and rehabilitation services" />

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center bg-gradient-to-r from-white to-amber-50 px-6 py-3 rounded-full shadow-lg shadow-amber-200/50 border border-amber-100">
                  <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                  <span className="font-semibold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                    Welcome To Excellence
                  </span>
                </div>

                {/* Carousel */}
                <div
                  ref={carouselRef}
                  className="relative min-h-[280px] sm:min-h-[300px] md:min-h-[320px] overflow-hidden touch-pan-y"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  role="region"
                  aria-label="Physiotherapy services carousel showcasing our expert care, chiropractic excellence, sports injury rehabilitation, and holistic wellness approach"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      // ✅ FIX: use step based on N so we move exactly one slide
                      transform: `translateX(-${autoScrollIndex * trackStepPct}%)`,
                      width: `${scrollableContent.length * 100}%`,
                    }}
                  >
                    {scrollableContent.map((content, index) => {
                      const words = content.heading.split(' ');
                      const lastWord = words[words.length - 1];
                      const otherWords = words.slice(0, -1).join(' ');

                      return (
                        <article
                          key={index}
                          className="flex-shrink-0 px-1 sm:px-2"
                          style={{ width: `${100 / scrollableContent.length}%` }}
                          aria-hidden={index !== autoScrollIndex}
                        >
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent block">
                              {otherWords}
                            </span>
                            <span className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-500 bg-clip-text text-transparent block mt-1 sm:mt-2">
                              {lastWord}
                            </span>
                          </h1>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
                            {content.paragraph}
                          </p>
                        </article>
                      );
                    })}
                  </div>

                  {/* Dots */}
                  <nav className="absolute bottom-0 left-0 flex space-x-2 sm:space-x-3 items-center" aria-label="Carousel navigation">
                    {scrollableContent.map((content, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAutoScrollIndex(idx);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 1000);
                        }}
                        className="relative group focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-full"
                        aria-label={`Navigate to ${content.heading}`}
                        aria-current={idx === autoScrollIndex ? 'true' : 'false'}
                        title={content.heading}
                      >
                        <div
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${idx === autoScrollIndex
                            ? 'w-8 sm:w-12 bg-gradient-to-r from-rose-600 to-amber-500'
                            : 'w-1.5 sm:w-2 bg-gray-300 group-hover:bg-gray-400 group-focus:bg-gray-500'
                            }`}
                        >
                          {idx === autoScrollIndex && !isPaused && (
                            <div
                              className="h-full bg-gradient-to-r from-rose-700 to-amber-600 rounded-full"
                              style={{ animation: 'progress 5s linear', transformOrigin: 'left' }}
                              role="progressbar"
                              aria-valuenow={autoScrollIndex + 1}
                              aria-valuemin={1}
                              aria-valuemax={scrollableContent.length}
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </nav>

                  {/* Arrows */}
                  {/* <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-1 sm:px-2">
                    <button
                      onClick={() => {
                        setAutoScrollIndex((prev) => (prev - 1 + scrollableContent.length) % scrollableContent.length);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 1000);
                      }}
                      className="pointer-events-auto bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
                      aria-label="Previous service"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 rotate-180" />
                    </button>
                    <button
                      onClick={() => {
                        setAutoScrollIndex((prev) => (prev + 1) % scrollableContent.length);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 1000);
                      }}
                      className="pointer-events-auto bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
                      aria-label="Next service"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                  </div> */}
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-2 gap-4 pt-8">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-rose-700 to-amber-500 bg-clip-text text-transparent">
                        {animatedStats[index]}
                        {stat.suffix}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => scrollToSection('about')}
                    className="group bg-gradient-to-r from-rose-700 via-rose-600 to-amber-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl shadow-lg shadow-rose-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span className="font-medium">View Intro</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                  <button onClick={() => scrollToSection('about')} className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 text-gray-800 px-8 py-4 rounded-xl hover:shadow-xl border border-amber-200 transform hover:scale-105 transition-all duration-300 font-medium">
                    Know More
                  </button>
                </div>
              </div>

              {/* Right side (unchanged) */}
              <div className="relative h-[500px] lg:h-[600px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-72 sm:w-80 md:w-96 hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-300 rounded-3xl transform rotate-2 blur-sm" />
                  <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden group">
                    <div className="aspect-square bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <div className="text-center relative z-10">
                        <div className="text-7xl sm:text-8xl mb-4 group-hover:scale-110 transition-transform duration-500">👨‍⚕️</div>
                        <p className="text-gray-800 font-bold text-lg sm:text-xl">Professional Team</p>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">Certified Physiotherapists</p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-amber-500/10 group-hover:opacity-0 transition-opacity duration-500" />
                      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-br from-rose-500/20 to-amber-500/20 rounded-full blur-3xl" />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-rose-500/20 to-amber-500/20 rounded-full blur-2xl" />
                  </div>
                </div>

                <div className="absolute left-0 sm:left-4 top-16 sm:top-20 z-10 w-40 sm:w-48 hover:-translate-x-2 hover:rotate-[-8deg] transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-rose-400 rounded-2xl transform -rotate-6 blur-sm" />
                    <div className="relative bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl p-4 sm:p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <div className="aspect-square bg-gradient-to-br from-white to-rose-50 rounded-xl flex items-center justify-center overflow-hidden">
                        <div className="text-center hover:scale-110 transition-transform duration-300">
                          <div className="text-5xl sm:text-6xl mb-2">💆</div>
                          <p className="text-gray-700 font-semibold text-sm sm:text-base">Therapy</p>
                          <p className="text-gray-500 text-xs mt-1">Sessions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 sm:right-4 bottom-16 sm:bottom-20 z-10 w-40 sm:w-48 hover:translate-x-2 hover:rotate-[8deg] transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl transform rotate-6 blur-sm" />
                    <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl p-4 sm:p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <div className="aspect-square bg-gradient-to-br from-white to-amber-50 rounded-xl flex items-center justify-center overflow-hidden">
                        <div className="text-center hover:scale-110 transition-transform duration-300">
                          <div className="text-5xl sm:text-6xl mb-2">🏃</div>
                          <p className="text-gray-700 font-semibold text-sm sm:text-base">Recovery</p>
                          <p className="text-gray-500 text-xs mt-1">Programs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-1/4 w-20 h-20 bg-gradient-to-br from-rose-300/30 to-amber-300/30 rounded-full blur-2xl animate-pulse" />
                <div
                  className="absolute bottom-0 left-1/4 w-24 h-24 bg-gradient-to-br from-amber-300/30 to-rose-300/30 rounded-full blur-2xl animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-20">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white to-amber-50/50 p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-amber-100/50 transition-all duration-300 relative overflow-hidden hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-amber-500/0 to-amber-400/0 group-hover:from-rose-500/5 group-hover:via-amber-500/5 group-hover:to-amber-400/5 transition-all duration-500" />
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <feature.icon className="w-8 h-8 text-rose-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-white via-amber-50/30 to-rose-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-amber-100 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-700 to-amber-500 bg-clip-text text-transparent mb-3">
                    {animatedStats[index]}
                    <span className="text-rose-600">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-600 font-semibold text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Imported Pages */}

        <div ref={el => { sectionRefs.current.services = el; }} id="services">
          <ServicesPage />
        </div>
        <div ref={el => { sectionRefs.current.about = el; }} id="about">
          <AboutPage />
        </div>
        {/* <div ref={el => { sectionRefs.current.blog = el; }} id="blog">
        <BlogPage />
      </div>
      <div ref={el => { sectionRefs.current.gallery = el; }} id="gallery">
        <GalleryPage />
      </div> */}
        <div ref={el => { sectionRefs.current.therapists = el; }} id="therapists">
          <TherapistsPage />
        </div>
        <div ref={el => { sectionRefs.current.testimonials = el; }} id="testimonials">
          <TestimonialsPage />
        </div>
        <div ref={el => { sectionRefs.current.contact = el; }} id="contact">
          <ContactPage />
        </div>
        <button className="fixed bottom-8 right-8 bg-gradient-to-r from-rose-600 to-amber-500 text-white p-4 rounded-full shadow-2xl shadow-rose-500/50 z-40 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <MessageSquare className="w-6 h-6" />
        </button>

        <style jsx>{`
          @keyframes progress {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </>
  );
};

export default Home;
