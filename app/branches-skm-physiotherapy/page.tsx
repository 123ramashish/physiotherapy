'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    MapPin, Phone, Clock, ChevronRight, 
    Sparkles, Building2, Navigation, Award, 
    ArrowRight, Star, Users, Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ── Data ──────────────────────────────────────────────────────
const BRANCHES = [
  {
    id: 'gurugram-14',
    name: 'Sector 14, Gurugram',
    fullName: 'SKM Physiotherapy — Main Centre',
    address: '123, MG Road, Sector 14, Gurugram, Haryana',
    phone: '7982799147',
    timings: '9:00 AM – 8:00 PM',
    href: '/branches-skm-physiotherapy/gurugram-sector-14',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    color: 'from-emerald-500 to-teal-600',
    stats: { patients: '4,500+', rating: '4.9★' }
  },
  {
    id: 'noida-swaran',
    name: 'Swaran Nagari, Greater Noida',
    fullName: 'SKM Physiotherapy — Greater Noida',
    address: 'D-Block, D-3, Near Krishna Hospital, Swarn Nagari, Greater Noida, UP',
    phone: '7982799147',
    timings: '9:00 AM – 8:00 PM',
    href: '/branches-skm-physiotherapy/greater-noida-swaran-nagari',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    color: 'from-blue-500 to-indigo-600',
    stats: { patients: '1,200+', rating: '4.9★' }
  },
  {
    id: 'noida-134',
    name: 'Sector 134, Noida',
    fullName: 'SKM Physiotherapy — Noida Sector 134',
    address: 'B-45, Sector 134, Noida, UP 201303',
    phone: '9876543210',
    timings: '8:00 AM – 8:00 PM',
    href: '/branches-skm-physiotherapy/noida-sector-134',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    color: 'from-teal-500 to-emerald-600',
    stats: { patients: '800+', rating: '4.8★' }
  },
  {
    id: 'gurugram-45',
    name: 'Sector 45, Gurugram',
    fullName: 'SKM Physiotherapy — South Extension',
    address: 'Plot 45, Sector 45, Gurugram, Haryana',
    phone: '7982799148',
    timings: '9:00 AM – 8:00 PM',
    href: '/branches-skm-physiotherapy/gurugram-sector-45',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
    color: 'from-cyan-500 to-blue-600',
    stats: { patients: '1,500+', rating: '4.8★' }
  }
];

// ──────────────────────────────────────────────────────────────
export default function BranchesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Header */}
      <section className="bg-white pt-12 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
                <MapPin size={14} /> Our Network
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                Clinic <span className="text-blue-600">Locations</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find the nearest SKM Physiotherapy centre. We are currently serving residents across Gurugram, Noida, and Greater Noida with premium clinical care.
            </p>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {BRANCHES.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row"
            >
              {/* Image Side */}
              <div className="relative w-full sm:w-48 lg:w-64 h-48 sm:h-auto overflow-hidden">
                <img src={branch.img} alt={branch.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r ${branch.color} opacity-20`} />
              </div>

              {/* Content Side */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Clinic Branch
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                            <Star size={14} className="fill-current" /> {branch.stats.rating}
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {branch.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mb-4">{branch.fullName}</p>
                    
                    <div className="space-y-2.5 mb-8">
                        <div className="flex items-start gap-2.5 text-sm text-gray-600 leading-snug">
                            <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                            <span>{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-gray-600">
                            <Phone size={16} className="text-blue-500 shrink-0" />
                            <span>{branch.phone}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-gray-600">
                            <Clock size={16} className="text-blue-500 shrink-0" />
                            <span>{branch.timings}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link 
                        href={branch.href}
                        className="flex-1 py-3 bg-blue-600 text-white text-center rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                        Branch Details <ChevronRight size={16} />
                    </Link>
                    <a 
                        href={`tel:${branch.phone}`}
                        className="p-3 border-2 border-gray-200 text-gray-400 rounded-xl hover:text-blue-600 hover:border-blue-600 transition-all"
                        aria-label="Call Branch"
                    >
                        <Phone size={18} />
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Network Benefits */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-blue-600 rounded-[32px] p-8 lg:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Standardized Care Across Our Network</h2>
                    <p className="text-blue-100 text-lg mb-10">All SKM branches follow the same clinical protocols, hygiene standards, and expert-led recovery processes to ensure your health is always in safe hands.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { i: <Shield size={20} />, t: 'Uniform Protocols', d: 'Consistent treatment across all centers.' },
                            { i: <Users size={20} />, t: 'Expert Staff', d: 'Shared pool of specialized therapists.' },
                            { i: <Building2 size={20} />, t: 'Modern Facilities', d: 'Equipped with latest medical tech.' },
                            { i: <Award size={20} />, t: 'Certified Quality', d: 'Trusted clinical excellence since 2012.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                                    {item.i}
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">{item.t}</h4>
                                    <p className="text-blue-100/70 text-sm leading-tight">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="https://images.unsplash.com/photo-1581056344408-02600c2c5029?w=800&q=80" alt="SKM Network" className="rounded-3xl shadow-2xl" />
                </div>
            </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Find a Branch Nearby?</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto text-lg">We are expanding rapidly. In the meantime, you can book a home-visit session and receive expert care at your doorstep.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services-skm-physiotherapy/home-visit" className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                Learn About Home Visit <ArrowRight size={18} />
            </Link>
            <Link href="/contact-skm-physiotherapy" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200">
                Inquire Now
            </Link>
        </div>
      </section>
    </div>
  );
}
