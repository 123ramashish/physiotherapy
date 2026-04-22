'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Dumbbell, Wind, ChevronRight, 
    Sparkles, ArrowLeft, Shield, Award, Heart, CheckCircle,
    ArrowRight, Phone, Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ─────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────

const services = [
    {
        icon: Dumbbell,
        title: 'Sports Injuries',
        hindiTitle: 'खेल की चोटें',
        description: 'Elite-level rehabilitation for ligament tears, muscle strains, and performance optimization to get you back in the game.',
        accent: 'from-blue-600 to-indigo-700',
        badge: 'High Performance',
        img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
        href: '/services/sports-injuries',
    },
    {
        icon: Wind,
        title: 'Post-COVID Rehab',
        hindiTitle: 'कोविड के बाद पुनर्वास',
        description: 'Specialized pulmonary and physical recovery programs to overcome breathlessness, fatigue, and muscle weakness.',
        accent: 'from-cyan-500 to-blue-600',
        badge: 'Clinical',
        img: 'https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=600&q=80',
        href: '/services/post-covid',
    },
];

const features = [
    { icon: <Activity className="w-5 h-5" />, title: 'Functional Loading', desc: 'Progressive stress to rebuild tissue strength.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Injury Prevention', desc: 'Identifying biomechanical flaws before relapses.' },
    { icon: <Award className="w-5 h-5" />, title: 'Clearance Testing', desc: 'Objective metrics for a safe return to activity.' },
    { icon: <Heart className="w-5 h-5" />, title: 'Holistic Recovery', desc: 'Focus on cardiovascular and muscular health.' },
];

// ─────────────────────────────────────────────
//  Components
// ─────────────────────────────────────────────

function ServiceCard({ service, index }: { service: any; index: number }) {
    const router = useRouter();
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            onClick={() => router.push(service.href)}
        >
            <div className="relative h-64 overflow-hidden">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                        {service.badge}
                    </span>
                </div>
            </div>

            <div className="p-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-blue-600 font-semibold mb-4">{service.hindiTitle}</p>
                <p className="text-gray-600 leading-relaxed mb-8">{service.description}</p>
                <div className="flex items-center text-blue-600 font-bold group/btn">
                    View Treatment Details 
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                </div>
            </div>
        </motion.article>
    );
}

// ─────────────────────────────────────────────
//  Main Page Component
// ─────────────────────────────────────────────

export default function InjuryRehabCategoryPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.05),transparent_50%)]" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-colors mb-12 group">
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> Back to All Services
                    </Link>

                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm border border-blue-100"
                        >
                            <Sparkles size={14} /> Performance Restoration
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight"
                        >
                            Injury & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Rehabilitation</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12"
                        >
                            Specialized clinical protocols to restore function after trauma or illness. Whether it's a field injury or post-viral recovery, we get you back to peak performance.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
                        {features.map((f, i) => (
                            <div key={i} className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
                                <div className="text-blue-600 mb-2">{f.icon}</div>
                                <h4 className="text-xs font-bold text-gray-900 mb-1">{f.title}</h4>
                                <p className="text-[10px] text-gray-500 leading-tight">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Rehabilitation Pathways</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-blue-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Clinical Excellence in Rehab</h2>
                            <div className="space-y-6">
                                {[
                                    { t: 'Graded Re-Loading', d: 'Safe, objective progression of exercises to ensure tissue heals without risk of further injury.' },
                                    { t: 'Biomechanical Gait Analysis', d: 'Using technology to identify exactly where your movement patterns are failing post-injury.' },
                                    { t: 'Expert Clinical Monitoring', d: 'Constant monitoring of vitals and physical signs during the rehab process for maximum safety.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-1">{item.t}</h4>
                                            <p className="text-blue-100/80 leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=800&q=80" alt="Clinical rehab expertise" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl hidden sm:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-black text-xl leading-none">92%</p>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Return-to-Play Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 tracking-tight">Return to Your Peak Fitness</h2>
                    <p className="text-gray-600 mb-12 text-lg">Our rehabilitation specialists are ready to guide your comeback journey. Book your clinical assessment today.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                            Book Rehab Assessment <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="tel:+917982799147" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" /> Call Rehab Specialist
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
