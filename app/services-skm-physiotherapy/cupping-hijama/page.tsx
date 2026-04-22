'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Droplets, Heart, Activity, Clock, Shield, Award,
    ChevronRight, ChevronLeft, Star, Play, Pause,
    CheckCircle, Users, Calendar, Phone,
    Video, Image as ImageIcon, Quote, ArrowRight, ArrowDown, X
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ─────────────────────────────────────────────
//  Types & Interfaces
// ─────────────────────────────────────────────

interface ProcessStep {
    number: number;
    titleEn: string;
    titleHi: string;
    descriptionEn: string;
    descriptionHi: string;
    icon: React.ReactNode;
    duration: string;
    image: string;
}

interface Benefit {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    image: string;
    accentLight: string;
}

interface Testimonial {
    id: number;
    name: string;
    age: number;
    condition: string;
    feedback: string;
    rating: number;
    image: string;
    videoUrl?: string;
    sessionCount: number;
    improvement: string;
}

interface BeforeAfter {
    id: number;
    beforeImage: string;
    afterImage: string;
    condition: string;
    sessions: number;
    improvement: string;
    videoUrl?: string;
}

// ─────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80',
];

const PROCESS_STEPS: ProcessStep[] = [
    {
        number: 1,
        titleEn: 'Consultation',
        titleHi: 'परामर्श',
        descriptionEn: 'Expert assessment of your condition',
        descriptionHi: 'आपकी स्थिति का विशेषज्ञ मूल्यांकन',
        icon: <Activity className="w-6 h-6" />,
        duration: '15-20 mins',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
    },
    {
        number: 2,
        titleEn: 'Preparation',
        titleHi: 'तैयारी',
        descriptionEn: 'Sterilization & comfort setup',
        descriptionHi: 'कीटाणुशोधन और आराम सेटअप',
        icon: <Shield className="w-6 h-6" />,
        duration: '5-10 mins',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80'
    },
    {
        number: 3,
        titleEn: 'Cupping',
        titleHi: 'कपिंग',
        descriptionEn: 'Suction cups application',
        descriptionHi: 'सक्शन कप अनुप्रयोग',
        icon: <Droplets className="w-6 h-6" />,
        duration: '10-15 mins',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80'
    },
    {
        number: 4,
        titleEn: 'Treatment',
        titleHi: 'उपचार',
        descriptionEn: 'Cupping therapy session',
        descriptionHi: 'कपिंग थेरेपी सत्र',
        icon: <Clock className="w-6 h-6" />,
        duration: '15-20 mins',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80'
    },
    {
        number: 5,
        titleEn: 'Aftercare',
        titleHi: 'बाद की देखभाल',
        descriptionEn: 'Post-treatment guidance',
        descriptionHi: 'उपचार के बाद मार्गदर्शन',
        icon: <Heart className="w-6 h-6" />,
        duration: '10 mins',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80'
    }
];

const BENEFITS: Benefit[] = [
    {
        title: 'Pain Relief',
        description: 'Effective for chronic back pain, neck pain, migraines, and muscle tension. Reduces inflammation and promotes natural healing.',
        icon: <Activity className="w-5 h-5" />,
        color: '#10b981',
        accentLight: 'rgba(16,185,129,0.75)',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80'
    },
    {
        title: 'Improved Circulation',
        description: 'Enhances blood flow to treated areas, delivering oxygen and nutrients while removing toxins and metabolic waste.',
        icon: <Droplets className="w-5 h-5" />,
        color: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.75)',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80'
    },
    {
        title: 'Muscle Relaxation',
        description: 'Releases muscle tension, reduces stiffness, and improves flexibility. Ideal for athletes and desk workers.',
        icon: <Heart className="w-5 h-5" />,
        color: '#8b5cf6',
        accentLight: 'rgba(139,92,246,0.75)',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80'
    },
    {
        title: 'Detoxification',
        description: 'Hijama removes stagnant blood and toxins, boosting immune system and promoting overall wellness.',
        icon: <Shield className="w-5 h-5" />,
        color: '#f59e0b',
        accentLight: 'rgba(245,158,11,0.75)',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80'
    },
    {
        title: 'Stress Reduction',
        description: 'Activates parasympathetic nervous system, reducing stress hormones and promoting deep relaxation.',
        icon: <Award className="w-5 h-5" />,
        color: '#ec4899',
        accentLight: 'rgba(236,72,153,0.75)',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80'
    },
    {
        title: 'Enhanced Recovery',
        description: 'Accelerates healing from sports injuries, surgeries, and chronic conditions through improved tissue regeneration.',
        icon: <CheckCircle className="w-5 h-5" />,
        color: '#059669',
        accentLight: 'rgba(5,150,105,0.75)',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80'
    }
];

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        age: 45,
        condition: 'Chronic Lower Back Pain',
        feedback: 'After 6 sessions of cupping therapy, my chronic back pain reduced by 80%. I can now work without constant discomfort. The team at SKM is very professional and caring.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        sessionCount: 6,
        improvement: '80% pain reduction'
    },
    {
        id: 2,
        name: 'Priya Sharma',
        age: 32,
        condition: 'Migraine & Neck Tension',
        feedback: 'I suffered from severe migraines for years. Cupping therapy at SKM has been life-changing. My migraines reduced from 4 times a week to once a month.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        sessionCount: 8,
        improvement: '75% reduction in migraines'
    },
    {
        id: 3,
        name: 'Mohammed Ali',
        age: 38,
        condition: 'Sports Injury Recovery',
        feedback: "As a football player, I had recurring hamstring injuries. Hijama therapy helped me recover faster and I haven't had an injury in 8 months now.",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        sessionCount: 5,
        improvement: 'Full recovery, no recurrence'
    },
    {
        id: 4,
        name: 'Sunita Verma',
        age: 52,
        condition: 'Fibromyalgia & Fatigue',
        feedback: 'The combination of dry and wet cupping has improved my energy levels significantly. I feel more active and my sleep quality has improved.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        sessionCount: 10,
        improvement: '60% energy increase'
    },
    {
        id: 5,
        name: 'Vikram Singh',
        age: 29,
        condition: 'Shoulder Impingement',
        feedback: "I couldn't lift my arm above shoulder level. After 4 cupping sessions combined with physiotherapy, I have full range of motion back.",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        sessionCount: 4,
        improvement: 'Full mobility restored'
    }
];

const BEFORE_AFTER: BeforeAfter[] = [
    {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
        condition: 'Chronic Neck Pain',
        sessions: 5,
        improvement: '90% pain relief',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 2,
        beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
        condition: 'Lower Back Stiffness',
        sessions: 6,
        improvement: '85% mobility improvement',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4'
    },
    {
        id: 3,
        beforeImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
        condition: 'Shoulder Tension',
        sessions: 4,
        improvement: 'Complete relief'
    },
    {
        id: 4,
        beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
        condition: 'Muscle Recovery',
        sessions: 7,
        improvement: '95% recovery',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
];

const STATS = [
    { number: '2,500+', label: 'Patients Treated', icon: <Users className="w-6 h-6" /> },
    { number: '8,000+', label: 'Sessions Completed', icon: <Activity className="w-6 h-6" /> },
    { number: '96%', label: 'Success Rate', icon: <Award className="w-6 h-6" /> },
    { number: '4.9★', label: 'Patient Rating', icon: <Star className="w-6 h-6" /> }
];

const CONDITIONS = [
    { en: 'Chronic Back Pain', hi: 'पुराना कमर दर्द' },
    { en: 'Neck & Shoulder Tension', hi: 'गर्दन और कंधे का तनाव' },
    { en: 'Migraines & Headaches', hi: 'माइग्रेन और सिरदर्द' },
    { en: 'Sports Injuries', hi: 'खेल की चोटें' },
    { en: 'Fibromyalgia', hi: 'फाइब्रोमायल्जिया' },
    { en: 'Arthritis', hi: 'गठिया' },
    { en: 'Sciatica', hi: 'साइटिका' },
    { en: 'Muscle Stiffness', hi: 'मांसपेशियों में अकड़न' },
    { en: 'Digestive Issues', hi: 'पाचन समस्याएं' },
    { en: 'Respiratory Problems', hi: 'श्वसन समस्याएं' },
    { en: 'Stress & Anxiety', hi: 'तनाव और चिंता' },
    { en: 'Detoxification', hi: 'डिटॉक्सिफिकेशन' }
];

// ─────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// ─────────────────────────────────────────────
//  Components
// ─────────────────────────────────────────────

function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group w-full"
        >
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
                <img
                    src={step.image}
                    alt={step.titleEn}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-3">
                        {step.icon}
                    </div>
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl sm:text-3xl font-bold">{step.number}</span>
                            <span className="text-xs sm:text-sm opacity-80">{step.duration}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-0.5">{step.titleEn}</h3>
                        <h3 className="text-base sm:text-lg opacity-90 mb-2">{step.titleHi}</h3>
                        <p className="text-xs sm:text-sm opacity-80 mb-1">{step.descriptionEn}</p>
                        <p className="text-xs sm:text-sm opacity-70">{step.descriptionHi}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ── BenefitCard: full-bleed background image with colour-tinted overlay ──
function BenefitCard({ benefit }: { benefit: Benefit }) {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="relative group rounded-2xl overflow-hidden shadow-lg"
            style={{ minHeight: '260px' }}
        >
            {/* Photo */}
            <img
                src={benefit.image}
                alt={benefit.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark base so text is always legible */}
            <div className="absolute inset-0 bg-black/52 transition-opacity duration-300 group-hover:bg-black/38" />

            {/* Per-card colour gradient rising from the bottom — unique identity */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top, ${benefit.accentLight} 0%, transparent 60%)`
                }}
            />

            {/* Content sits above overlays */}
            <div className="relative z-10 flex flex-col justify-end h-full p-5 sm:p-6 min-h-[260px]">
                {/* Icon */}
                <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                    style={{
                        background: `${benefit.color}28`,
                        border: `1.5px solid ${benefit.color}55`,
                        color: '#fff'
                    }}
                >
                    {benefit.icon}
                </div>

                <h3 className="font-bold text-white text-base sm:text-lg mb-2 leading-snug drop-shadow-sm">
                    {benefit.title}
                </h3>
                <p className="text-white/82 text-xs sm:text-sm leading-relaxed drop-shadow-sm">
                    {benefit.description}
                </p>

                {/* Animated accent underline */}
                <div
                    className="mt-4 h-0.5 w-10 rounded-full opacity-75 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"
                    style={{ background: benefit.color }}
                />
            </div>
        </motion.div>
    );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleVideo = () => {
        if (!videoRef.current) return;
        if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.55, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-100 min-w-[280px] sm:min-w-[380px] max-w-sm flex-shrink-0"
        >
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.age} yrs • {testimonial.condition}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <Quote className="w-7 h-7 text-blue-200 mb-1" />
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic">"{testimonial.feedback}"</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-gray-500 mb-0.5">Sessions</p>
                    <p className="font-bold text-blue-600 text-sm">{testimonial.sessionCount}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-gray-500 mb-0.5">Improvement</p>
                    <p className="font-bold text-emerald-600 text-xs">{testimonial.improvement}</p>
                </div>
            </div>
            {testimonial.videoUrl && (
                <div className="rounded-xl overflow-hidden bg-gray-900">
                    <video ref={videoRef} src={testimonial.videoUrl} className="w-full max-h-40 object-cover"
                        onEnded={() => setIsPlaying(false)} playsInline />
                    <button onClick={toggleVideo}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm font-medium transition-colors">
                        {isPlaying ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Watch Video Testimonial</>}
                    </button>
                </div>
            )}
        </motion.div>
    );
}

function BeforeAfterCard({ item }: { item: BeforeAfter }) {
    const [showAfter, setShowAfter] = useState(false);
    const [mode, setMode] = useState<'image' | 'video'>('image');
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMode = () => {
        if (mode === 'video') { videoRef.current?.pause(); setMode('image'); }
        else { setMode('video'); }
    };

    return (
        <motion.div whileHover={{ y: -4 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0 w-72 sm:w-80">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {mode === 'image' ? (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={showAfter ? 'after' : 'before'}
                                src={showAfter ? item.afterImage : item.beforeImage}
                                alt={showAfter ? 'After' : 'Before'}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                            />
                        </AnimatePresence>
                        <div className="absolute top-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow ${showAfter ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                {showAfter ? 'After' : 'Before'}
                            </span>
                        </div>
                        <button onClick={() => setShowAfter(!showAfter)}
                            className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg text-xs font-semibold text-gray-900 hover:bg-white transition-colors shadow-lg">
                            {showAfter ? '← Show Before' : 'Show After →'}
                        </button>
                    </>
                ) : (
                    <video ref={videoRef} src={item.videoUrl} controls autoPlay playsInline className="w-full h-full object-cover">
                        Your browser does not support the video tag.
                    </video>
                )}
                {item.videoUrl && (
                    <button onClick={toggleMode}
                        className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur rounded-full text-gray-800 hover:bg-white transition-colors shadow-lg"
                        title={mode === 'image' ? 'Watch video' : 'Show image'}>
                        {mode === 'video' ? <ImageIcon className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    </button>
                )}
            </div>
            <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{item.condition}</h4>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">{item.sessions} sessions</span>
                    <span className="font-bold text-emerald-600">{item.improvement}</span>
                </div>
                {item.videoUrl && (
                    <button onClick={toggleMode}
                        className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium transition-colors">
                        {mode === 'video' ? <ImageIcon className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {mode === 'video' ? 'View Images' : 'Watch Recovery Video'}
                    </button>
                )}
            </div>
        </motion.div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                <span>{question}</span>
                <ChevronRight className={`w-5 h-5 text-blue-500 transition-transform duration-300 flex-shrink-0 ml-2 ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden">
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-gray-600 text-xs sm:text-sm leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─────────────────────────────────────────────
//  Main Page Component
// ─────────────────────────────────────────────

export default function CuppingHijamaPage() {
    const router = useRouter();
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [heroBgIndex, setHeroBgIndex] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setHeroBgIndex(p => (p + 1) % HERO_IMAGES.length), 4000);
        return () => clearInterval(i);
    }, []);

    useEffect(() => {
        const i = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
        return () => clearInterval(i);
    }, []);

    const testimonialsRef = useRef<HTMLDivElement>(null);
    const beforeAfterRef = useRef<HTMLDivElement>(null);

    const scrollTestimonials = (d: 'left' | 'right') =>
        testimonialsRef.current?.scrollBy({ left: d === 'left' ? -400 : 400, behavior: 'smooth' });

    const scrollBeforeAfter = (d: 'left' | 'right') =>
        beforeAfterRef.current?.scrollBy({ left: d === 'left' ? -320 : 320, behavior: 'smooth' });

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
            {/* Breadcrumb */}
            <nav className="bg-white border-b border-blue-100 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        {[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services-skm-physiotherapy' }, { label: 'Cupping & Hijama', href: null }]
                            .map((item, index, array) => (
                                <React.Fragment key={item.label}>
                                    {item.href
                                        ? <a href={item.href} className="font-medium text-blue-600 hover:text-blue-800">{item.label}</a>
                                        : <span className="text-gray-500 font-medium">{item.label}</span>
                                    }
                                    {index < array.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden min-h-[520px] sm:min-h-[600px]">
                <div className="absolute inset-0">
                    <AnimatePresence>
                        <motion.div key={heroBgIndex} className="absolute inset-0"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}>
                            <img src={HERO_IMAGES[heroBgIndex]} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/70 to-indigo-900/75" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium mb-5 border border-white/30">
                                <Droplets className="w-4 h-4" /> Ancient Therapy • Modern Science
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                                Cupping & Hijama Therapy
                                <span className="text-blue-200 block mt-2">for Natural Healing</span>
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 mb-7 leading-relaxed">
                                Experience the ancient art of cupping therapy combined with modern medical expertise.
                                Effective treatment for pain relief, detoxification, and overall wellness.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100">
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Certified Practitioners</span></div>
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Sterile Equipment</span></div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
                            <div className="bg-gray-300 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                                        <Users className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">2,500+</p>
                                        <p className="text-sm text-gray-500">Patients Treated</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">8,000+</p><p className="text-xs text-gray-500">Sessions</p></div>
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">96%</p><p className="text-xs text-gray-500">Success</p></div>
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">4.9★</p><p className="text-xs text-gray-500">Rating</p></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {HERO_IMAGES.map((_, i) => (
                        <button key={i} onClick={() => setHeroBgIndex(i)}
                            className={`rounded-full transition-all duration-300 ${i === heroBgIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`} />
                    ))}
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-10 sm:py-12 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map((stat, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center text-white">
                                <div className="flex justify-center mb-2">{stat.icon}</div>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-0.5">{stat.number}</p>
                                <p className="text-blue-100 text-xs sm:text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What is Cupping */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5">What is Cupping & Hijama Therapy?</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                                <p><strong className="text-gray-900">Cupping Therapy</strong> is an ancient healing practice that uses suction cups to create negative pressure on the skin, promoting blood flow, reducing pain, and accelerating healing.</p>
                                <p><strong className="text-gray-900">Hijama (Wet Cupping)</strong> is a therapeutic procedure that combines cupping with controlled medicinal bleeding to remove toxins and stagnant blood from the body, promoting detoxification and healing.</p>
                                <p>At SKM Physiotherapy, we combine traditional techniques with modern medical knowledge to provide safe, effective, and personalized treatment plans for various conditions.</p>
                            </div>
                            <div className="mt-7 space-y-2.5">
                                {['Dry Cupping — Suction only', 'Wet Cupping (Hijama) — Suction with controlled bleeding', 'Fire Cupping — Traditional heat-based suction', 'Silicone Cupping — Modern, adjustable suction'].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" alt="Cupping cups"
                                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover" />
                            <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&q=80" alt="Hijama therapy"
                                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover mt-6 sm:mt-8" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Benefits — image background cards ── */}
            <section className="py-14 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Why Choose Cupping & Hijama?</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Experience multiple health benefits with this time-tested therapy</p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {BENEFITS.map((benefit, index) => (
                            <BenefitCard key={index} benefit={benefit} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Before/After */}
            <section className="py-14 sm:py-16 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Real Results: Before & After</h2>
                        <p className="text-gray-600 text-base sm:text-lg">See the transformation of our patients through cupping therapy</p>
                    </motion.div>
                    <div className="relative">
                        <button onClick={() => scrollBeforeAfter('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-200">
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <div ref={beforeAfterRef} className="flex gap-5 overflow-x-auto px-8 sm:px-10 scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {BEFORE_AFTER.map((item) => <BeforeAfterCard key={item.id} item={item} />)}
                        </div>
                        <button onClick={() => scrollBeforeAfter('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-200">
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Treatment Process</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Step-by-step guide to your cupping therapy session</p>
                    </motion.div>

                    {/* Mobile / tablet */}
                    <div className="lg:hidden flex flex-col items-center gap-0">
                        {PROCESS_STEPS.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="w-full sm:w-4/5 md:w-2/3"><ProcessStepCard step={step} index={index} /></div>
                                {index < PROCESS_STEPS.length - 1 && (
                                    <div className="flex flex-col items-center py-2">
                                        <div className="w-0.5 h-3 bg-blue-200" />
                                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                                            <ArrowDown className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="w-0.5 h-3 bg-blue-200" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Desktop */}
                    <div className="hidden lg:flex items-stretch gap-0">
                        {PROCESS_STEPS.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex-1 min-w-0"><ProcessStepCard step={step} index={index} /></div>
                                {index < PROCESS_STEPS.length - 1 && (
                                    <div className="flex flex-col items-center justify-center px-1 flex-shrink-0 gap-1 self-center">
                                        <div className="h-0.5 w-3 bg-blue-200" />
                                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="h-0.5 w-3 bg-blue-200" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Patient Success Stories</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Hear from patients who experienced life-changing results</p>
                    </motion.div>
                    <div className="relative">
                        <button onClick={() => scrollTestimonials('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-200">
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <div ref={testimonialsRef} className="flex gap-5 overflow-x-auto px-8 sm:px-10 scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {TESTIMONIALS.map((testimonial, index) => (
                                <TestimonialCard key={testimonial.id} testimonial={testimonial} isActive={index === activeTestimonial} />
                            ))}
                        </div>
                        <button onClick={() => scrollTestimonials('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all border border-gray-200">
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                    <div className="flex justify-center gap-2 mt-6">
                        {TESTIMONIALS.map((_, index) => (
                            <button key={index} onClick={() => setActiveTestimonial(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-blue-600 w-7' : 'bg-gray-300 w-2.5'}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditions Treated */}
            <section className="py-14 sm:py-16 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Conditions We Treat</h2>
                        <p className="text-gray-500 text-sm sm:text-base">हम जो स्थितियां Treat करते हैं</p>
                        <p className="text-gray-600 text-base sm:text-lg mt-2">Cupping therapy is effective for various health conditions</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {CONDITIONS.map((condition, index) => (
                            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }} transition={{ delay: index * 0.04 }}
                                className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-gray-900 font-semibold text-sm sm:text-base">{condition.en}</p>
                                        <p className="text-gray-500 text-xs sm:text-sm">{condition.hi}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
                    </motion.div>
                    <div className="space-y-3 sm:space-y-4">
                        {[
                            { q: 'Is cupping therapy painful?', a: 'Most patients feel a mild pulling or tightness sensation during cupping, but it is generally not painful. The suction is adjusted to your comfort level. Any discomfort usually subsides quickly after the session.' },
                            { q: 'How many sessions do I need?', a: 'The number of sessions varies based on your condition. Acute issues may improve in 3-5 sessions, while chronic conditions may require 8-12 sessions. We create a personalized treatment plan after initial assessment.' },
                            { q: 'Are there any side effects?', a: 'Temporary circular marks may appear where cups were placed, which fade within 3-7 days. Some patients experience mild soreness similar to post-workout muscle fatigue. Serious side effects are rare when performed by trained professionals.' },
                            { q: "Can I do cupping if I'm pregnant?", a: 'Cupping is generally avoided during pregnancy, especially on the abdomen and lower back. Please consult with our specialists who can advise on safe alternatives during pregnancy.' },
                            { q: 'How long does a session last?', a: 'A typical cupping session lasts 30-45 minutes, including consultation, preparation, treatment, and aftercare instructions. Hijama (wet cupping) may take slightly longer at 45-60 minutes.' }
                        ].map((faq, index) => <FAQItem key={index} question={faq.q} answer={faq.a} />)}
                    </div>
                </div>
            </section>
        </div>
    );
}