'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Stethoscope, Heart, Activity, Clock, Shield, Award,
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
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
];

const PROCESS_STEPS: ProcessStep[] = [
    {
        number: 1,
        titleEn: 'Joint Assessment',
        titleHi: 'जोड़ का मूल्यांकन',
        descriptionEn: 'Checking range of motion, swelling, and specific joint restrictions.',
        descriptionHi: 'गति की सीमा, सूजन और विशिष्ट जोड़ों के प्रतिबंधों की जाँच करना।',
        icon: <Activity className="w-6 h-6" />,
        duration: '20 mins',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
    },
    {
        number: 2,
        titleEn: 'Pain Modulation',
        titleHi: 'दर्द नियंत्रण',
        descriptionEn: 'Using Laser or Ultrasound to reduce acute inflammation.',
        descriptionHi: 'तीव्र सूजन को कम करने के लिए लेजर या अल्ट्रासाउंड का उपयोग करना।',
        icon: <Shield className="w-6 h-6" />,
        duration: '15 mins',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80'
    },
    {
        number: 3,
        titleEn: 'Mobilization',
        titleHi: 'मोबिलाइजेशन',
        descriptionEn: 'Gentle manual techniques to improve joint lubrication.',
        descriptionHi: 'जोड़ों के चिकनाई में सुधार के लिए कोमल मैनुअल तकनीकें।',
        icon: <Heart className="w-6 h-6" />,
        duration: '20 mins',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80'
    },
    {
        number: 4,
        titleEn: 'Loading Exercises',
        titleHi: 'लोडिंग व्यायाम',
        descriptionEn: 'Progressive strengthening to support affected joints.',
        descriptionHi: 'प्रभावित जोड़ों को सहारा देने के लिए प्रगतिशील सुदृढ़ीकरण।',
        icon: <Activity className="w-6 h-6" />,
        duration: '20 mins',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80'
    },
    {
        number: 5,
        titleEn: 'Lifestyle Guide',
        titleHi: 'जीवनशैली गाइड',
        descriptionEn: 'Advice on activity modification and joint protection.',
        descriptionHi: 'गतिविधि संशोधन और संयुक्त सुरक्षा पर सलाह।',
        icon: <CheckCircle className="w-6 h-6" />,
        duration: '10 mins',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80'
    }
];

const BENEFITS: Benefit[] = [
    {
        title: 'Reduced Stiffness',
        description: 'Significantly decreases the "morning stiffness" characteristic of arthritis.',
        icon: <Activity className="w-5 h-5" />,
        color: '#10b981',
        accentLight: 'rgba(16,185,129,0.75)',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80'
    },
    {
        title: 'Joint Protection',
        description: 'Strengthens surrounding muscles to take the load off the worn joint surfaces.',
        icon: <Shield className="w-5 h-5" />,
        color: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.75)',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80'
    },
    {
        title: 'Pain Control',
        description: 'Advanced clinical modalities to manage chronic inflammation without overuse of drugs.',
        icon: <Heart className="w-5 h-5" />,
        color: '#8b5cf6',
        accentLight: 'rgba(139,92,246,0.75)',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80'
    },
    {
        title: 'Improved Mobility',
        description: 'Helps you stay active and independent by restoring functional movement patterns.',
        icon: <Award className="w-5 h-5" />,
        color: '#f59e0b',
        accentLight: 'rgba(245,158,11,0.75)',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80'
    },
    {
        title: 'Prevention',
        description: 'Early intervention can slow down the progression of degenerative joint disease.',
        icon: <Shield className="w-5 h-5" />,
        color: '#ec4899',
        accentLight: 'rgba(236,72,153,0.75)',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80'
    },
    {
        title: 'Expert Guidance',
        description: 'Provides you with the correct "Activity-to-Rest" ratio for your specific condition.',
        icon: <CheckCircle className="w-5 h-5" />,
        color: '#059669',
        accentLight: 'rgba(5,150,105,0.75)',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80'
    }
];

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Vimla Devi',
        age: 62,
        condition: 'Knee Osteoarthritis',
        feedback: 'I thought knee pain was just part of getting old. The exercise program at SKM has made me so much more mobile. I can now walk to the park every day.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=400&q=80',
        sessionCount: 15,
        improvement: 'Significant mobility gain'
    }
];

const BEFORE_AFTER: BeforeAfter[] = [
    {
        id: 1,
        beforeImage: 'https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
        condition: 'Rheumatoid Hand Deformity',
        sessions: 10,
        improvement: 'Better grip & reduced pain'
    }
];

const STATS = [
    { number: '2,200+', label: 'Arthritis Patients', icon: <Users className="w-6 h-6" /> },
    { number: '8,500+', label: 'Sessions Completed', icon: <Activity className="w-6 h-6" /> },
    { number: '91%', label: 'Comfort Rate', icon: <Award className="w-6 h-6" /> },
    { number: '4.8★', label: 'Patient Rating', icon: <Star className="w-6 h-6" /> }
];

const CONDITIONS = [
    { en: 'Osteoarthritis', hi: 'ऑस्टियोआर्थराइटिस' },
    { en: 'Rheumatoid Arthritis', hi: 'रुमेटोइड अर्थराइटिस' },
    { en: 'Ankylosing Spondylitis', hi: 'एंकिलॉजिंग स्पॉन्डिलाइटिस' },
    { en: 'Gouty Arthritis', hi: 'गाउटी अर्थराइटिस' },
    { en: 'Juvenile Arthritis', hi: 'जुवेनाइल अर्थराइटिस' },
    { en: 'Psoriatic Arthritis', hi: 'सोरियाटिक अर्थराइटिस' }
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

export default function ArthritisPage() {
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
                        {[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services-skm-physiotherapy' }, { label: 'Arthritis Care', href: null }]
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-900/70 to-emerald-900/75" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium mb-5 border border-white/30">
                                <Stethoscope className="w-4 h-4" /> Holistic Arthritis Management
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                                Arthritis Care & Rehab
                                <span className="text-emerald-200 block mt-2">गठिया - Move with Confidence</span>
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 mb-7 leading-relaxed">
                                Reduce inflammation, improve joint mobility, and enhance your quality of life. 
                                Our evidence-based protocols help you stay active and drug-free.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100">
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Joint Protection Training</span></div>
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Anti-Inflammatory Modalities</span></div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
                            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                                        <Stethoscope className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">2,200+</p>
                                        <p className="text-sm text-gray-500">Patients Living Better</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">91%</p><p className="text-xs text-gray-500">Comfort</p></div>
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">8.5k+</p><p className="text-xs text-gray-500">Sessions</p></div>
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">4.8★</p><p className="text-xs text-gray-500">Rating</p></div>
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
            <section className="py-10 sm:py-12 bg-gradient-to-r from-emerald-600 to-blue-700">
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

            {/* What is Arthritis Treatment */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5">Science-Based Arthritis Rehab</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                                <p><strong className="text-gray-900">Arthritis Management</strong> focuses on the preservation of joint surfaces and the optimization of surrounding muscle support. At SKM Physiotherapy, we tackle both the pain and the underlying mechanical strain.</p>
                                <p>Whether you have <strong className="text-gray-900">Osteoarthritis (OA)</strong> or <strong className="text-gray-900">Rheumatoid Arthritis (RA)</strong>, our protocols are designed to keep the joint "lubricated" through specific movements while building the strength needed to offload the joint during daily tasks.</p>
                                <p>We use advanced clinical modalities like Laser therapy and specialized manual mobilization to break the cycle of pain and stiffness.</p>
                            </div>
                            <div className="mt-7 space-y-2.5">
                                {['Diagnostic Joint Biomechanics Analysis', 'Gentle Manual Joint Mobilization', 'Clinical Pain Modulation (Laser/IFT)', 'Personalized Loading & Strength Protocol'].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=400&q=80" alt="Joint assessment"
                                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover" />
                            <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80" alt="Arthritis therapy"
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Living Better with Arthritis</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Targeted benefits to restore your freedom of movement</p>
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Patient Progress</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Real functional gains from our arthritis rehabilitation program</p>
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">The Recovery Pathway</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Step-by-step clinical approach to joint health</p>
                    </motion.div>

                    <div className="lg:hidden flex flex-col items-center gap-0">
                        {PROCESS_STEPS.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="w-full sm:w-4/5 md:w-2/3"><ProcessStepCard step={step} index={index} /></div>
                                {index < PROCESS_STEPS.length - 1 && (
                                    <div className="flex flex-col items-center py-2">
                                        <div className="w-0.5 h-3 bg-blue-200" />
                                        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
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
                                        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Arthritis Success Stories</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Hear from patients who regained their independence at SKM</p>
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
            <section className="py-14 sm:py-16 bg-gradient-to-b from-emerald-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Joint Conditions We Treat</h2>
                        <p className="text-gray-500 text-sm sm:text-base">हम जो स्थितियां Treat करते हैं</p>
                        <p className="text-gray-600 text-base sm:text-lg mt-2">Specialized therapy for various degenerative and inflammatory issues</p>
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
                            { q: 'Is exercise safe if I have arthritis pain?', a: 'Yes, provided it is the correct type of exercise. We focus on "low-impact" loading that strengthens muscles without stressing the joint. In fact, targeted movement is the best treatment for arthritis.' },
                            { q: 'How can physiotherapy help RA?', a: 'For Rheumatoid Arthritis, we focus on managing inflammation during flare-ups and maintaining joint range and hand function during remission phases.' },
                            { q: 'Do you use heat or ice therapy?', a: 'Typically, moist heat is used for OA to relax stiff joints, while ice might be used for acute RA flares. Our therapists will recommend the best home-care protocol for you.' },
                            { q: 'Can physiotherapy delay surgery?', a: 'Absolutely. By improving joint mechanics and muscle strength, many patients are able to delay or even eliminate the need for joint replacement surgeries.' },
                            { q: 'What is Laser therapy for joints?', a: 'It is a non-invasive treatment that uses specific wavelengths of light to stimulate cellular repair and reduce deep-seated joint inflammation.' }
                        ].map((faq, index) => <FAQItem key={index} question={faq.q} answer={faq.a} />)}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Take Control of Your Joint Health</h2>
                    <p className="text-emerald-50 mb-8 text-lg opacity-90">Don't let arthritis limit your life. Book your assessment today and start moving freely again.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact-skm-physiotherapy" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                            Book Arthritis Assessment <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="tel:+917982799147" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-400 transition-colors border border-purple-400">
                            <Phone className="w-5 h-5" /> Call Joint Specialist
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
