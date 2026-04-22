'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Wind, Heart, Activity, Clock, Shield, Award,
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
    'https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=1200&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80',
];

const PROCESS_STEPS: ProcessStep[] = [
    {
        number: 1,
        titleEn: 'Pulmonary Assessment',
        titleHi: 'फेफड़ों का मूल्यांकन',
        descriptionEn: 'Checking lung capacity, oxygen saturation, and respiratory muscle strength.',
        descriptionHi: 'फेफड़ों की क्षमता, ऑक्सीजन संतृप्ति और श्वसन मांसपेशियों की ताकत की जाँच करना।',
        icon: <Wind className="w-6 h-6" />,
        duration: '30 mins',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
    },
    {
        number: 2,
        titleEn: 'Breathing Exercises',
        titleHi: 'सांस लेने के व्यायाम',
        descriptionEn: 'Diaphragmatic and pursed-lip breathing to optimize oxygen intake.',
        descriptionHi: 'ऑक्सीजन के सेवन को अनुकूलित करने के लिए डायाफ्रामिक और पर्स्ड-लिप ब्रीदिंग।',
        icon: <Activity className="w-6 h-6" />,
        duration: '20 mins',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80'
    },
    {
        number: 3,
        titleEn: 'Energy Management',
        titleHi: 'ऊर्जा प्रबंधन',
        descriptionEn: 'Techniques to manage chronic fatigue and "pacing" for daily activities.',
        descriptionHi: 'दैनिक गतिविधियों के लिए पुरानी थकान और "पेसिंग" के प्रबंधन की तकनीक।',
        icon: <Heart className="w-6 h-6" />,
        duration: '15 mins',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80'
    },
    {
        number: 4,
        titleEn: 'Graded Loading',
        titleHi: 'ग्रेडेड लोडिंग',
        descriptionEn: 'Low-intensity progressive exercise to rebuild endurance safely.',
        descriptionHi: 'सहनशक्ति को सुरक्षित रूप से पुनर्निर्माण के लिए कम तीव्रता वाला प्रगतिशील व्यायाम।',
        icon: <Award className="w-6 h-6" />,
        duration: '25 mins',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80'
    },
    {
        number: 5,
        titleEn: 'Progress Monitoring',
        titleHi: 'प्रगति की निगरानी',
        descriptionEn: 'Re-evaluating vital signs and functional capacity every week.',
        descriptionHi: 'हर हफ्ते महत्वपूर्ण संकेतों और कार्यात्मक क्षमता का पुनर्मूल्यांकन।',
        icon: <CheckCircle className="w-6 h-6" />,
        duration: '10 mins',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80'
    }
];

const BENEFITS: Benefit[] = [
    {
        title: 'Better Oxygenation',
        description: 'Improves the efficiency of your lungs and respiratory muscles for easier breathing.',
        icon: <Wind className="w-5 h-5" />,
        color: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.75)',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80'
    },
    {
        title: 'Overcome Fatigue',
        description: 'Systematic approach to beat "Long-COVID" exhaustion and regain your energy levels.',
        icon: <Activity className="w-5 h-5" />,
        color: '#10b981',
        accentLight: 'rgba(16,185,129,0.75)',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80'
    },
    {
        title: 'Heart Health',
        description: 'Monitored cardiovascular loading to ensure your heart recovers safely post-infection.',
        icon: <Heart className="w-5 h-5" />,
        color: '#ef4444',
        accentLight: 'rgba(239,68,68,0.75)',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80'
    },
    {
        title: 'Joint Relief',
        description: 'Addresses the widespread muscle and joint aches often associated with post-viral syndromes.',
        icon: <Shield className="w-5 h-5" />,
        color: '#8b5cf6',
        accentLight: 'rgba(139,92,246,0.75)',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80'
    },
    {
        title: 'Mental Clarity',
        description: 'Deep breathing and guided relaxation help clear "brain fog" and reduce post-illness anxiety.',
        icon: <Award className="w-5 h-5" />,
        color: '#f59e0b',
        accentLight: 'rgba(245,158,11,0.75)',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80'
    },
    {
        title: 'Safe Return to Work',
        description: 'Provides you with the confidence and physical stamina to return to your professional life.',
        icon: <CheckCircle className="w-5 h-5" />,
        color: '#059669',
        accentLight: 'rgba(5,150,105,0.75)',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80'
    }
];

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Sunil Verma',
        age: 45,
        condition: 'Post-COVID Breathlessness',
        feedback: 'I couldn\'t walk even 2 minutes after my COVID recovery. The pulmonary rehab at SKM helped me get my lung capacity back. I am now walking 30 minutes comfortably.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        sessionCount: 20,
        improvement: 'Full respiratory recovery'
    }
];

const BEFORE_AFTER: BeforeAfter[] = [
    {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
        condition: '6-Minute Walk Test',
        sessions: 12,
        improvement: 'Distance increased by 40%',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
];

const STATS = [
    { number: '1,200+', label: 'Recovered Patients', icon: <Wind className="w-6 h-6" /> },
    { number: '6,000+', label: 'Rehab Sessions', icon: <Activity className="w-6 h-6" /> },
    { number: '93%', label: 'Lung Capacity gain', icon: <Award className="w-6 h-6" /> },
    { number: '4.9★', label: 'Patient Rating', icon: <Star className="w-6 h-6" /> }
];

const CONDITIONS = [
    { en: 'Shortness of Breath', hi: 'सांस फूलना' },
    { en: 'Chronic Fatigue', hi: 'पुरानी थकान' },
    { en: 'Brain Fog', hi: 'मानसिक अस्पष्टता' },
    { en: 'Muscle Weakness', hi: 'मांसपेशियों की कमजोरी' },
    { en: 'Chest Tightness', hi: 'छाती में जकड़न' },
    { en: 'Post-Viral Aches', hi: 'वायरल के बाद का दर्द' }
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

function BenefitCard({ benefit }: { benefit: Benefit }) {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="relative group rounded-2xl overflow-hidden shadow-lg"
            style={{ minHeight: '260px' }}
        >
            <img
                src={benefit.image}
                alt={benefit.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/52 transition-opacity duration-300 group-hover:bg-black/38" />
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to top, ${benefit.accentLight} 0%, transparent 60%)`
                }}
            />
            <div className="relative z-10 flex flex-col justify-end h-full p-5 sm:p-6 min-h-[260px]">
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

export default function PostCovidRehabPage() {
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
                        {[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services-skm-physiotherapy' }, { label: 'Post-COVID Rehab', href: null }]
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/70 to-blue-900/75" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium mb-5 border border-white/30">
                                <Wind className="w-4 h-4" /> Specialist Pulmonary Care
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                                Post-COVID Rehabilitation
                                <span className="text-blue-200 block mt-2">Breathe Easy, Live Strong</span>
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 mb-7 leading-relaxed">
                                Specialized programs for breathlessness, chronic fatigue, and physical recovery after COVID-19. Restore your lung capacity and stamina with expert-led clinical protocols.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100">
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Pulmonary Specialists</span></div>
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Fatigue Management</span></div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
                            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                                        <Wind size={28} />
                                    </div>
                                    <div>
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">1,200+</p>
                                        <p className="text-sm text-gray-500">Recovered Successfully</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">93%</p><p className="text-xs text-gray-500">Lung gain</p></div>
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">6k+</p><p className="text-xs text-gray-500">Sessions</p></div>
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

            {/* What is Post-COVID Rehab */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5">Science-Led Viral Recovery</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                                <p><strong className="text-gray-900">Post-Viral Rehabilitation</strong> is essential for those struggling with long-term effects of COVID-19. We focus on "Respiratory Efficiency"—retraining your breathing muscles to take in more oxygen with less effort.</p>
                                <p>Our program addresses <strong className="text-gray-900">Long-COVID syndrome</strong>, which can manifest as fatigue, brain fog, and muscle weakness. We use graded exercise therapy (GET) to safely rebuild your heart and lung endurance without triggering a relapse.</p>
                                <p>We don't just focus on the lungs; we treat the widespread muscle aches and stiffness that often follow a severe viral infection, ensuring a 360° recovery.</p>
                            </div>
                            <div className="mt-7 space-y-2.5">
                                {['Advanced Pulmonary Function Assessment', 'Diaphragmatic & Costal Breathing Drills', 'Graded Aerobic Stamina Building', 'Myofascial Release for Post-Viral Stiffness'].map((item, index) => (
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
                            <img src="https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=400&q=80" alt="Lung assessment"
                                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover" />
                            <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80" alt="Breathing therapy"
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Reclaim Your Stamina</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Specialized benefits for a complete post-viral recovery</p>
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Milestones in Recovery</h2>
                        <p className="text-gray-600 text-base sm:text-lg">See the functional capacity gains of our rehab patients</p>
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Systematic Approach</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Step-by-step path to viral recovery and wellness</p>
                    </motion.div>

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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Rehab Success Stories</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Hear from patients who reclaimed their life after COVID</p>
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Post-Viral Issues We Treat</h2>
                        <p className="text-gray-500 text-sm sm:text-base">हम जो स्थितियां Treat करते हैं</p>
                        <p className="text-gray-600 text-base sm:text-lg mt-2">Specialized therapy for various long-COVID and viral fatigue issues</p>
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
                            { q: 'Why do I still feel breathless after testing negative?', a: 'COVID-19 can cause inflammation in the lung tissues and weaken the breathing muscles. Even after the virus is gone, the muscles need retraining to restore normal breathing efficiency.' },
                            { q: 'Is it safe to start exercising if I have fatigue?', a: 'Yes, but it must be "Graded Exercise." Pushing too hard too soon can cause a relapse. We use vital sign monitoring to ensure your loading is safe and productive.' },
                            { q: 'What is Brain Fog?', a: 'It is a common post-COVID symptom involving difficulty focusing and memory issues. Improved oxygenation and specific neurological exercises often help clear this over time.' },
                            { q: 'How many sessions will I need?', a: 'Most patients see significant improvement in 8-12 sessions of guided pulmonary rehab, but some may need a longer maintenance phase to fully regain their pre-COVID fitness.' },
                            { q: 'Can you help with post-COVID muscle aches?', a: 'Yes. Viral infections can leave the body with chronic myofascial tightness. We use manual therapy and stretching to resolve these widespread aches.' }
                        ].map((faq, index) => <FAQItem key={index} question={faq.q} answer={faq.a} />)}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Breathe Freely Again</h2>
                    <p className="text-blue-50 mb-8 text-lg opacity-90">Don't let Long-COVID hold you back. Book your pulmonary assessment today and start your journey to full recovery.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact-skm-physiotherapy" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                            Book Rehab Assessment <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="tel:+917982799147" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 transition-colors border border-blue-400">
                            <Phone className="w-5 h-5" /> Call Rehab Specialist
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
