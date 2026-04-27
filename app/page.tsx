'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from 'framer-motion';
import {
  Stethoscope, Droplets, Heart, Activity, Brain, Shield,
  Users, Star, ArrowRight, ChevronRight, Phone, Calendar,
  MapPin, Clock, Award, Quote, CheckCircle,
  Sparkles, TrendingUp, MessageCircle, Navigation,
  ChevronLeft, ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────

interface ServiceCard {
  titleEn: string;
  titleHi: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  href: string;
  color: string;
  gradient: string;
}

interface Testimonial {
  name: string;
  condition: string;
  feedback: string;
  rating: number;
  image: string;
}

interface Branch {
  name: string;
  nameHi: string;
  location: string;
  address: string;
  phone: string;
  href: string;
  mapLink: string;
  timing: string;
}

// ─────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────

const SERVICES: ServiceCard[] = [
  {
    titleEn: 'Cupping & Hijama',
    titleHi: 'कपिंग और हिजामा',
    description: 'Ancient therapy for natural healing,  and detoxification with modern medical expertise.',
    icon: <Droplets className="w-7 h-7" />,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    href: '/services-skm-physiotherapy/cupping-hijama',
    color: '#059669',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    titleEn: 'Back Pain Treatment',
    titleHi: 'पीठ दर्द उपचार',
    description: 'Comprehensive non-surgical solutions for acute and chronic back pain with expert physiotherapy.',
    icon: <Activity className="w-7 h-7" />,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    href: '/services-skm-physiotherapy/back-pain',
    color: '#2563eb',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    titleEn: 'Arthritis Management',
    titleHi: 'गठिया प्रबंधन',
    description: 'Holistic arthritis care reducing inflammation, improving mobility, and enhancing quality of life.',
    icon: <Shield className="w-7 h-7" />,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
    href: '/services-skm-physiotherapy/arthritis',
    color: '#7c3aed',
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    titleEn: "Bell's Palsy Treatment",
    titleHi: 'बेल्स पाल्सी उपचार',
    description: 'Specialized neurological rehabilitation for facial paralysis recovery with compassionate expert care.',
    icon: <Brain className="w-7 h-7" />,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80',
    href: '/services-skm-physiotherapy/bells-palsy',
    color: '#d97706',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    condition: 'Back Pain',
    feedback: 'After 6 sessions, my chronic back pain reduced by 80%. I can now work without constant discomfort. The team is incredibly professional.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Priya Sharma',
    condition: 'Cupping Therapy',
    feedback: 'The combination of dry and wet cupping has improved my energy levels significantly. I feel like a new person after each session.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Suresh Patel',
    condition: 'Arthritis',
    feedback: 'I can now walk without support and climb stairs comfortably. The team at SKM is very caring and attentive to every need.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    name: 'Meena Gupta',
    condition: "Bell's Palsy",
    feedback: 'Within 8 sessions my facial movement started improving. The therapists tracked my progress with great dedication and care.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

const BRANCHES: Branch[] = [
  {
    name: 'Swaran Nagari, Greater Noida',
    nameHi: 'स्वर्ण नगरी, ग्रेटर नोएडा',
    location: 'Greater Noida, UP',
    address: 'D-Block, D-3, Near Krishna Hospital, Swarn Nagari, Greater Noida',
    phone: '+91 79827 99147',
    href: '/branches-skm-physiotherapy/greater-noida-swaran-nagari',
    mapLink: 'https://maps.app.goo.gl/Us4jVhy8foKxxawE7',
    timing: 'Mon – Sun: 10 AM – 10 PM',
  },
  {
    name: 'Sector 134, Noida',
    nameHi: 'सेक्टर 134, नोएडा',
    location: 'Noida, UP',
    address: 'B-45, Sector 134, Noida, Uttar Pradesh',
    phone: '+91 97184 34818',
    href: '/branches-skm-physiotherapy/noida-sector-135',
    mapLink: 'https://maps.google.com/?q=Sector+134+Noida',
    timing: 'Mon – Sun: 10 AM – 10 PM',
  },
];

const STATS = [
  { number: '20,000+', label: 'Patients Treated', labelHi: 'मरीज़ ठीक हुए', icon: <Users className="w-6 h-6" /> },
  { number: '5', label: 'Years Experience', labelHi: 'वर्षों का अनुभव', icon: <Award className="w-6 h-6" /> },
  { number: '98%', label: 'Success Rate', labelHi: 'सफलता दर', icon: <TrendingUp className="w-6 h-6" /> },
  { number: '5.0★', label: 'Patient Rating', labelHi: 'मरीज़ रेटिंग', icon: <Star className="w-6 h-6" /> },
];

// ─────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInLeft: any = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInRight: any = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};
// ─────────────────────────────────────────────
//  Animated Counter
// ─────────────────────────────────────────────

function AnimatedStat({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center overflow-hidden hover:bg-white/20 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/20 flex items-center justify-center text-white">
          {stat.icon}
        </div>
        <p className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.number}</p>
        <p className="text-blue-100 text-sm font-medium">{stat.label}</p>
        <p className="text-blue-200/70 text-xs mt-0.5">{stat.labelHi}</p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Service Card
// ─────────────────────────────────────────────

function ServiceCardComponent({ service, index }: { service: ServiceCard; index: number }) {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 border border-gray-100/80 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.titleEn}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Icon Badge */}
        <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${service.gradient}`}>
          {service.icon}
        </div>

        {/* Bilingual Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-lg font-extrabold text-white leading-tight">{service.titleEn}</h3>
          <p className="text-sm text-white/70 font-medium mt-0.5" style={{ fontFamily: 'serif' }}>
            {service.titleHi}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{service.description}</p>

        {/* CTA */}
        <button
          onClick={() => router.push(service.href)}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:shadow-lg hover:opacity-90 bg-gradient-to-r ${service.gradient}`}
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Testimonial Card
// ─────────────────────────────────────────────

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <motion.div
      animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.45, scale: 0.96, y: 8 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 min-w-[290px] sm:min-w-[380px] max-w-sm flex-shrink-0"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100"
        />
        <div>
          <h4 className="font-bold text-gray-900 text-base">{testimonial.name}</h4>
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">{testimonial.condition}</p>
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </div>
      <Quote className="w-7 h-7 text-blue-100 mb-2" />
      <p className="text-gray-600 leading-relaxed text-sm italic">"{testimonial.feedback}"</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Branch Card
// ─────────────────────────────────────────────

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeInUp}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-blue-50 hover:shadow-2xl hover:border-blue-200 transition-all duration-400"
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-gray-900 leading-tight">{branch.name}</h3>
            <p className="text-sm text-gray-400 mt-0.5" style={{ fontFamily: 'serif' }}>{branch.nameHi}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <span>{branch.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>{branch.timing}</span>
          </div>
          <a
            href={`tel:${branch.phone}`}
            className="flex items-center gap-3 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            {branch.phone}
          </a>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={`tel:${branch.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a
            href={branch.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Navigation className="w-4 h-4" /> Directions
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Section Header
// ─────────────────────────────────────────────

function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInUp}
      className="text-center max-w-3xl mx-auto mb-14"
    >
      <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100 mb-4">
        {badge}
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{title}</h2>
      <p className="text-gray-500 text-base sm:text-lg leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  Main Page Component
// ─────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Parallax hero ref
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&q=85',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&q=85',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1800&q=85',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1800&q=85',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════ */}
      {/* HERO — Parallax Background Image                   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* ── Parallax background image layer ── */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: heroParallax }}
        >
          {HERO_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentHeroImage ? 1 : 0,
                scale: index === currentHeroImage ? 1 : 1.04,
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
                style={{ minHeight: '110vh', objectPosition: 'center top' }}
              />
            </motion.div>
          ))}

          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/75 to-gray-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </motion.div>

        {/* ── Decorative floating orbs ── */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* ── Hero Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200 font-medium">Expert Physiotherapy Care Since 2018</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.08] mb-6"
              >
                Your Journey to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  Pain‑Free Living
                </span>{' '}
                Starts Here
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-xl"
              >
                Advanced physiotherapy services with certified experts. Specialized treatment for
                back pain, sports injuries, neurological conditions across Noida, Greater Noida & Delhi NCR.
              </motion.p>



              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex flex-wrap gap-8"
              >
                {STATS.slice(0, 3).map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl sm:text-3xl font-black text-white">{stat.number}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — floating card on image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col gap-4 items-end"
            >
              {/* Floating badge cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 w-64"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Certified Experts</p>
                    <p className="text-gray-400 text-xs">5 Years Experience</p>
                  </div>
                </div>
                <div className="h-1 bg-white/10 rounded-full">
                  <div className="h-1 bg-emerald-400 rounded-full w-4/5" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 w-64"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">5.0 Rating</p>
                    <p className="text-gray-400 text-xs">20,000+ Happy Patients</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 w-64"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-400/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Personalised Care</p>
                    <p className="text-gray-400 text-xs">Tailored treatment plans</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Image indicator dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroImage(i)}
              className={`rounded-full transition-all duration-400 ${i === currentHeroImage ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* STATS BAND                                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {STATS.map((stat, i) => (
              <AnimatedStat key={i} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SERVICES                                           */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Specialisations"
            title={<>Expert Treatment for <span className="text-blue-600">Every Condition</span></>}
            subtitle="Comprehensive physiotherapy services designed to help you recover, heal, and thrive — combining modern science with proven traditional methods."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SERVICES.map((service, index) => (
              <ServiceCardComponent key={service.href} service={service} index={index} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => router.push('/services-skm-physiotherapy')}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              View All Services <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* WHY CHOOSE US                                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100 mb-4">
                Why Choose SKM
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                Trusted by Thousands of Patients <span className="text-blue-600">Across NCR</span>
              </h2>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-5"
              >
                {[
                  { icon: <Stethoscope className="w-5 h-5" />, title: 'Expert Physiotherapists', desc: 'Certified professionals with 15+ years of specialised clinical experience.', color: 'bg-blue-100 text-blue-600' },
                  { icon: <Shield className="w-5 h-5" />, title: 'Evidence‑Based Treatment', desc: 'Modern techniques backed by the latest medical research and proven methods.', color: 'bg-emerald-100 text-emerald-600' },
                  { icon: <Heart className="w-5 h-5" />, title: 'Personalised Care Plans', desc: 'Customised treatment tailored specifically to your condition and goals.', color: 'bg-rose-100 text-rose-600' },
                  { icon: <Users className="w-5 h-5" />, title: '10,000+ Patients Healed', desc: 'Trusted by a growing community of patients across multiple NCR locations.', color: 'bg-violet-100 text-violet-600' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Mosaic images */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80" alt="Treatment" className="rounded-2xl shadow-md w-full h-52 object-cover" />
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80" alt="Equipment" className="rounded-2xl shadow-md w-full h-52 object-cover mt-8" />
                <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&q=80" alt="Recovery" className="rounded-2xl shadow-md w-full h-52 object-cover" />
                <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500&q=80" alt="Exercise" className="rounded-2xl shadow-md w-full h-52 object-cover mt-8" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">ISO Certified Clinic</p>
                  <p className="text-gray-500 text-xs">Highest Standards of Care</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* NEWS & EVENTS                                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Stay Updated"
            title={<>Latest <span className="text-blue-600">News & Events</span></>}
            subtitle="Join our free health camps, workshops, and community events for better wellness in your neighbourhood."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Free Back Pain Screening Camp', date: 'Aug 15, 2024', location: 'Greater Noida', type: 'Health Camp', gradient: 'from-emerald-500 to-teal-600' },
              { title: 'Ergonomics Workshop for IT Professionals', date: 'Aug 22, 2024', location: 'Noida', type: 'Workshop', gradient: 'from-blue-500 to-indigo-600' },
              { title: 'Sports Injury Prevention Webinar', date: 'Aug 28, 2024', location: 'Online', type: 'Webinar', gradient: 'from-violet-500 to-purple-700' },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${event.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${event.gradient}`}>
                      {event.type}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900 mb-3 leading-snug">{event.title}</h3>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location}</span>
                  </div>
                  <button
                    onClick={() => router.push('/events-skm-physiotherapy')}
                    className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => router.push('/news-events')}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              View All Events <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* TESTIMONIALS                                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Patient Stories"
            title={<>What Our <span className="text-blue-600">Patients Say</span></>}
            subtitle="Real stories from real people who reclaimed their quality of life with SKM Physiotherapy."
          />

          <div className="relative">
            <button
              onClick={() => testimonialsRef.current?.scrollBy({ left: -420, behavior: 'smooth' })}
              className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={testimonialsRef}
              className="flex gap-5 overflow-x-auto px-8 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} isActive={i === activeTestimonial} />
              ))}
            </div>

            <button
              onClick={() => testimonialsRef.current?.scrollBy({ left: 420, behavior: 'smooth' })}
              className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* BRANCHES — Only 2                                  */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gray-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Locations"
            title={<>Visit Our <span className="text-blue-600">Clinics</span></>}
            subtitle="Conveniently located in Greater Noida and Noida to serve you better."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRANCHES.map((branch, index) => (
              <BranchCard key={branch.name} branch={branch} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => router.push('/branches-skm-physiotherapy')}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              <Navigation className="w-5 h-5" /> Explore All Branches
            </button>
          </motion.div>
        </div>
      </section>








    </div>
  );
}