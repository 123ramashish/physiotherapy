'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Home, Heart, Activity, Clock, Shield, Award,
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
    sessionCount: number;
    improvement: string;
}

// ─────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    'https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=1200&q=80',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80',
];

const PROCESS_STEPS: ProcessStep[] = [
    {
        number: 1,
        titleEn: 'Booking',
        titleHi: 'बुकिंग',
        descriptionEn: 'Schedule a visit at your preferred time through our website or phone.',
        descriptionHi: 'हमारी वेबसाइट या फोन के माध्यम से अपने पसंदीदा समय पर विजिट शेड्यूल करें।',
        icon: <Calendar className="w-6 h-6" />,
        duration: '5 mins',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
    },
    {
        number: 2,
        titleEn: 'Therapist Arrival',
        titleHi: 'थेरेपिस्ट का आगमन',
        descriptionEn: 'Our expert therapist arrives at your doorstep with all necessary equipment.',
        descriptionHi: 'हमारे विशेषज्ञ थेरेपिस्ट सभी आवश्यक उपकरणों के साथ आपके घर पहुंचेंगे।',
        icon: <Home className="w-6 h-6" />,
        duration: 'On-time',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80'
    },
    {
        number: 3,
        titleEn: 'Home Assessment',
        titleHi: 'घर पर मूल्यांकन',
        descriptionEn: 'Clinical evaluation of your condition and home environment for safety.',
        descriptionHi: 'आपकी स्थिति और सुरक्षा के लिए घरेलू वातावरण का नैदानिक मूल्यांकन।',
        icon: <Activity className="w-6 h-6" />,
        duration: '15 mins',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80'
    },
    {
        number: 4,
        titleEn: 'Therapy Session',
        titleHi: 'थेरेपी सत्र',
        descriptionEn: '1-on-1 personalized physiotherapy session in the comfort of your home.',
        descriptionHi: 'आपके घर के आराम में 1-पर-1 व्यक्तिगत फिजियोथेरेपी सत्र।',
        icon: <Heart className="w-6 h-6" />,
        duration: '45-60 mins',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80'
    },
    {
        number: 5,
        titleEn: 'Follow-up Plan',
        titleHi: 'फॉलो-अप योजना',
        descriptionEn: 'Prescribing home exercises and scheduling your next recovery session.',
        descriptionHi: 'घर के व्यायाम बताना और आपके अगले रिकवरी सत्र को शेड्यूल करना।',
        icon: <CheckCircle className="w-6 h-6" />,
        duration: '10 mins',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80'
    }
];

const BENEFITS: Benefit[] = [
    {
        title: 'Complete Comfort',
        description: 'No more traveling in pain. Receive expert care in your own familiar environment.',
        icon: <Home className="w-5 h-5" />,
        color: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.75)',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80'
    },
    {
        title: 'Safety & Convenience',
        description: 'Ideal for post-surgical patients, elderly, or those with severe mobility restrictions.',
        icon: <Shield className="w-5 h-5" />,
        color: '#10b981',
        accentLight: 'rgba(16,185,129,0.75)',
        image: 'https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=700&q=80'
    },
    {
        title: 'Family Involvement',
        description: 'Easy for family members to observe and learn how to assist with home exercises.',
        icon: <Users className="w-5 h-5" />,
        color: '#8b5cf6',
        accentLight: 'rgba(139,92,246,0.75)',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80'
    },
    {
        title: 'Flexible Timing',
        description: 'Schedule sessions around your life, avoiding the rush of clinical waiting rooms.',
        icon: <Clock className="w-5 h-5" />,
        color: '#f59e0b',
        accentLight: 'rgba(245,158,11,0.75)',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80'
    },
    {
        title: 'Faster Recovery',
        description: 'Consistent care at home leads to better adherence and more effective long-term results.',
        icon: <Activity className="w-5 h-5" />,
        color: '#ec4899',
        accentLight: 'rgba(236,72,153,0.75)',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80'
    },
    {
        title: 'Home Ergonomics',
        description: 'Therapist can assess your actual bed, chair, and floor setup for real-life adjustments.',
        icon: <Award className="w-5 h-5" />,
        color: '#059669',
        accentLight: 'rgba(5,150,105,0.75)',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80'
    }
];

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Madan Lal',
        age: 78,
        condition: 'Post-Hip Replacement',
        feedback: 'The home visits from SKM were a blessing. I couldn\'t go to the clinic after my surgery, and the therapist helped me take my first steps right in my living room.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        sessionCount: 15,
        improvement: 'Walking independently'
    }
];

const STATS = [
    { number: '500+', label: 'Homes Visited', icon: <Home className="w-6 h-6" /> },
    { number: '2,500+', label: 'Sessions Completed', icon: <Activity className="w-6 h-6" /> },
    { number: '96%', label: 'Safety Rate', icon: <Shield className="w-6 h-6" /> },
    { number: '4.9★', label: 'User Rating', icon: <Star className="w-6 h-6" /> }
];

const CONDITIONS = [
    { en: 'Post-Surgical Rehab', hi: 'सर्जरी के बाद रिकवरी' },
    { en: 'Geriatric (Elderly) Care', hi: 'बुजुर्गों की देखभाल' },
    { en: 'Neurological Recovery', hi: 'न्यूरोलॉजिकल रिकवरी' },
    { en: 'Severe Back Pain', hi: 'गंभीर कमर दर्द' },
    { en: 'Mobility Limitations', hi: 'गतिशीलता की सीमाएं' },
    { en: 'Stroke Rehabilitation', hi: 'लकवा रिकवरी' }
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

export default function HomeVisitPage() {
    const router = useRouter();
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [heroBgIndex, setHeroBgIndex] = useState(0);

    useEffect(() => {
        const i = setInterval(() => setHeroBgIndex(p => (p + 1) % HERO_IMAGES.length), 4000);
        return () => clearInterval(i);
    }, []);

    const testimonialsRef = useRef<HTMLDivElement>(null);
    const scrollTestimonials = (d: 'left' | 'right') =>
        testimonialsRef.current?.scrollBy({ left: d === 'left' ? -400 : 400, behavior: 'smooth' });

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
            {/* Breadcrumb */}
            <nav className="bg-white border-b border-blue-100 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        {[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services-skm-physiotherapy' }, { label: 'Home Visit', href: null }]
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
                                <Home className="w-4 h-4" /> Elite Home Care Service
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                                Physiotherapy at Your Doorstep
                                <span className="text-blue-200 block mt-2">Expert Care, Comfort of Home</span>
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100 mb-7 leading-relaxed">
                                Professional clinical physiotherapy delivered in the safety and comfort of your home. Ideal for post-surgical recovery, elderly patients, and those with severe pain.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100">
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Certified Home Therapists</span></div>
                                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /><span>Clinical Equipment Included</span></div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
                            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                                        <Home size={28} />
                                    </div>
                                    <div>
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">500+</p>
                                        <p className="text-sm text-gray-500">Homes Served in Gurugram</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">2.5k+</p><p className="text-xs text-gray-500">Sessions</p></div>
                                    <div className="text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">96%</p><p className="text-xs text-gray-500">Safety</p></div>
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

            {/* Why Home Visits? */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5">Clinical Care, Home Comfort</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                                <p><strong className="text-gray-900">Home Visit Physiotherapy</strong> is specifically designed for patients who find it difficult or painful to travel to a clinic. This includes those recovering from major surgeries (TKR, THR), stroke survivors, or the elderly.</p>
                                <p>Our program ensures you don't miss out on <strong className="text-gray-900">Clinical Grade Treatment</strong>. We bring portable modalities like Ultrasound and TENS directly to you, along with specialized manual therapy skills.</p>
                                <p>Beyond therapy, our specialists perform a safety audit of your home environment, advising on fall prevention and ergonomic adjustments to support your recovery 24/7.</p>
                            </div>
                            <div className="mt-7 space-y-2.5">
                                {['Portable Clinical Modalities (IFT/US)', 'Manual Therapy & Assisted Stretching', 'Home Safety & Fall Prevention Audit', 'Caregiver Training & Guidance'].map((item, index) => (
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
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" alt="Home visit"
                                className="rounded-2xl shadow-lg w-full h-48 sm:h-64 object-cover" />
                            <img src="https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=400&q=80" alt="Therapy session"
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">The Home Advantage</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Specialized benefits for a stress-free recovery journey</p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {BENEFITS.map((benefit, index) => (
                            <BenefitCard key={index} benefit={benefit} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process */}
            <section className="py-14 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Home-Visit Process</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Systematic clinical care from booking to recovery</p>
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
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Heartwarming Recoveries</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Hear from patients who recovered in the warmth of their home</p>
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
                </div>
            </section>

            {/* Conditions Often Treated at Home */}
            <section className="py-14 sm:py-16 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Ideal for Home Visit</h2>
                        <p className="text-gray-500 text-sm sm:text-base">हम जो स्थितियां Treat करते हैं</p>
                        <p className="text-gray-600 text-base sm:text-lg mt-2">Specialized care for various conditions where travel is restricted</p>
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
                            { q: 'Is home visit as effective as clinic visits?', a: 'Yes. For most conditions, our portable equipment and hands-on skills allow us to deliver the same clinical standard. In fact, home visits can be more effective for those who find travel painful or stressful.' },
                            { q: 'Do I need to provide any equipment?', a: 'No. Our therapists bring all essential tools, including portable therapy machines and clinical supplies. We only need a comfortable space like a bed or a firm mat on the floor.' },
                            { q: 'How do I book a home session?', a: 'You can book through our website or call us directly. We will perform a brief over-the-phone screening to assign the right specialist for your specific condition.' },
                            { q: 'Which areas do you cover?', a: 'We provide home visit services across all major sectors of Gurugram. Please contact us to confirm availability in your specific location.' },
                            { q: 'Are your home therapists certified?', a: 'Absolutely. All our home visit sessions are performed by the same licensed, specialized physiotherapists who work in our clinics.' }
                        ].map((faq, index) => <FAQItem key={index} question={faq.q} answer={faq.a} />)}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Expert Care at Your Door</h2>
                    <p className="text-blue-50 mb-8 text-lg opacity-90">Skip the commute and focus on your recovery. Book your clinical home-visit assessment today.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact-skm-physiotherapy" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg">
                            Schedule Home Visit <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="tel:+917982799147" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 transition-all flex items-center justify-center gap-2 border border-blue-400">
                            <Phone className="w-5 h-5" /> Call to Book Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
