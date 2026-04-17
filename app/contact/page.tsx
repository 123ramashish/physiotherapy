// app/contact/page.tsx - Client Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useAnimation, useInView, type Variants } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Facebook,
  Instagram,
  Youtube,
  Sparkles,
  ArrowRight,
  Star,
  Shield,
  Heart,
  Award,
  Navigation,
  ChevronDown,
  AlertCircle,
  Loader2,
  Building2,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { CONTACT_BRANCHES, type ContactApiResponse, type ContactSubmissionInput } from '@/lib/contact';

// Types
interface FormData {
  name: string;
  email: string;
  phone: string;
  branch: string;
  service: string;
  serviceOther: string;
  message: string;
  preferredDate: string;
}

interface FormErrors {
  [key: string]: string;
}

// Branches data - matches header/footer
const BRANCHES = CONTACT_BRANCHES;

// Services data - bilingual, grouped
const SERVICE_GROUPS = [
  {
    label: 'Specialized Therapies / विशेष चिकित्सा',
    icon: '🎯',
    services: [
      { id: 'cupping', name: 'Cupping & Hijama / कपिंग व हिजामा' },
      { id: 'dry-needling', name: 'Dry Needling / ड्राई निडलिंग' },
      { id: 'taping', name: 'Taping / टेपिंग' },
    ]
  },
  {
    label: 'Pain Management / दर्द प्रबंधन',
    icon: '🩺',
    services: [
      { id: 'back-pain', name: 'Back Pain / कमर दर्द' },
      { id: 'neck-pain', name: 'Neck Pain / गर्दन दर्द' },
      { id: 'knee-pain', name: 'Knee Pain / घुटनों का दर्द' },
      { id: 'sciatica', name: 'Sciatica / साइटिका' },
    ]
  },
  {
    label: 'Joint & Bone / जोड़ और हड्डी',
    icon: '🦴',
    services: [
      { id: 'arthritis', name: 'Arthritis / गठिया' },
      { id: 'frozen-shoulder', name: 'Frozen Shoulder / कंधे की जकड़न' },
    ]
  },
  {
    label: 'Neurological / न्यूरोलॉजिकल',
    icon: '🧠',
    services: [
      { id: 'bells-palsy', name: "Bell's Palsy / चेहरे का लकवा" },
      { id: 'paralysis', name: 'Paralysis / लकवा' },
    ]
  },
  {
    label: 'Injury & Rehab / चोट और पुनर्वास',
    icon: '🏥',
    services: [
      { id: 'sports-injury', name: 'Sports Injuries / खेल चोटें' },
      { id: 'post-covid', name: 'Post COVID Rehab / पोस्ट कोविड रिहैब' },
    ]
  },
  {
    label: 'Wellness / कल्याण',
    icon: '🧘',
    services: [
      { id: 'relaxation', name: 'Relaxation Therapy / आराम थेरेपी' },
    ]
  },
];

const OTHER_OPTION = { id: 'other', name: 'Other / अन्य (Please specify below)' };

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    branch: '',
    service: '',
    serviceOther: '',
    message: '',
    preferredDate: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showServiceOther, setShowServiceOther] = useState(false);

  // Scroll animations
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (heroInView) controls.start('visible');
  }, [heroInView, controls]);

  // Phone formatting for India
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 10);
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 10) return `${numbers.slice(0, 5)} ${numbers.slice(5)}`;
    return numbers;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhone(value) }));
    } else if (name === 'service') {
      const isOther = value === 'other';
      setShowServiceOther(isOther);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        serviceOther: isOther ? prev.serviceOther : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (min 2 characters)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim() || formData.phone.replace(/\s/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.branch) {
      newErrors.branch = 'Please select your nearest branch';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (formData.service === 'other' && !formData.serviceOther.trim()) {
      newErrors.serviceOther = 'Please specify your service requirement';
    }

    if (!formData.message.trim() || formData.message.trim().length < 20) {
      newErrors.message = 'Please describe your concern (min 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload: ContactSubmissionInput = {
        ...formData,
        service: formData.service === 'other' ? formData.serviceOther : formData.service,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as ContactApiResponse;

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'contact_form_submit', {
            event_category: 'Contact',
            event_label: formData.branch,
            value: 1
          });
        }
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '', email: '', phone: '', branch: '', service: '',
            serviceOther: '', message: '', preferredDate: ''
          });
          setShowServiceOther(false);
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrors({
          submit: result.success ? 'Failed to submit. Please try again or call us directly.' : result.error
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Flatten services for dropdown with "Other" option
  const allServices = [
    ...SERVICE_GROUPS.flatMap(group => group.services),
    OTHER_OPTION
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="relative pb-16 sm:pb-20 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-40 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
            animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-20 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 border border-emerald-100"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="text-emerald-600 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm font-semibold text-gray-700">
                🤖 AI-Assisted Booking Available 24/7
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
            >
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">SKM Physiotherapy</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Reach out to our certified physiotherapists for personalized care.
              Book your appointment at your nearest branch and start your recovery journey today.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <motion.a
                href="tel:+917982799147"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-full font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Call: </span>+91 79827 99147
              </motion.a>

              <motion.a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                Book Online
              </motion.a>

              <motion.a
                href="https://wa.me/917982799147"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-full font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Contact Cards */}
      <motion.section
        ref={infoRef}
        initial="hidden"
        animate={infoInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-8 sm:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Phone, title: 'Call Us', detail: '+91 79827 99147', subtitle: 'Mon-Sun: 10AM-10PM', link: 'tel:+917982799147', color: 'from-emerald-500 to-emerald-600', bg: 'from-emerald-50 to-emerald-100/50' },
              { icon: Mail, title: 'Email', detail: 'skmphysiotherapy@gmail.com', subtitle: 'Reply within 24 hours', link: 'mailto:skmphysiotherapy@gmail.com', color: 'from-blue-500 to-blue-600', bg: 'from-blue-50 to-blue-100/50' },
              { icon: MapPin, title: 'Visit Clinic', detail: '2 Branches in Noida', subtitle: 'Free parking available', link: '#branches', color: 'from-indigo-500 to-indigo-600', bg: 'from-indigo-50 to-indigo-100/50' },
              { icon: Clock, title: 'Working Hours', detail: 'Mon-Sun: 10AM-10PM', subtitle: 'Emergency slots available', link: null, color: 'from-violet-500 to-violet-600', bg: 'from-violet-50 to-violet-100/50' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className={`group bg-gradient-to-br ${item.bg} rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`flex-shrink-0 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${item.color} rounded-xl shadow-md`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <item.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-1">{item.subtitle}</p>
                    {item.link ? (
                      <a href={item.link} className="text-sm text-gray-900 font-medium hover:text-emerald-600 transition-colors truncate block">
                        {item.detail}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-900 font-medium">{item.detail}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              id="contact-form"
              className="order-2 lg:order-1"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 relative overflow-hidden border border-gray-100">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

                <div className="relative">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Book Your Appointment
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form and we'll contact you within 24 hours to confirm.
                    </p>
                  </div>


                  <form onSubmit={handleSubmit} className="space-y-5 text-black">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} focus:ring-4 focus:ring-emerald-100 outline-none transition-all`}
                          placeholder="Enter your full name"
                          aria-invalid={!!errors.name}
                        />
                      </div>
                      {errors.name && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} focus:ring-4 focus:ring-emerald-100 outline-none transition-all`}
                            placeholder="your.email@example.com"
                            aria-invalid={!!errors.email}
                          />
                        </div>
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} focus:ring-4 focus:ring-emerald-100 outline-none transition-all`}
                            placeholder="98765 43210"
                            maxLength={12}
                            aria-invalid={!!errors.phone}
                          />
                        </div>
                        {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Branch Selection */}
                    <div>
                      <label htmlFor="branch" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nearest Branch / नजदीकी शाखा *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.branch ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} focus:ring-4 focus:ring-emerald-100 outline-none transition-all appearance-none bg-white`}
                          aria-invalid={!!errors.branch}
                        >
                          <option value="">Select your nearest branch</option>
                          {BRANCHES.map(branch => (
                            <option key={branch.id} value={branch.id} disabled={branch.comingSoon}>
                              {branch.name} {branch.comingSoon && '(Coming Soon)'}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      </div>
                      {errors.branch && <p className="text-red-600 text-xs mt-1">{errors.branch}</p>}
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Required / सेवा *
                      </label>
                      <div className="relative">
                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.service ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} focus:ring-4 focus:ring-emerald-100 outline-none transition-all appearance-none bg-white`}
                          aria-invalid={!!errors.service}
                        >
                          <option value="">Select a service</option>
                          {SERVICE_GROUPS.map(group => (
                            <optgroup key={group.label} label={group.label}>
                              {group.services.map(svc => (
                                <option key={svc.id} value={svc.id}>{svc.name}</option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="other">{OTHER_OPTION.name}</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      </div>
                      {errors.service && <p className="text-red-600 text-xs mt-1">{errors.service}</p>}

                      {/* Other Service Input */}
                      <AnimatePresence>
                        {showServiceOther && (
                          <motion.input
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            type="text"
                            name="serviceOther"
                            value={formData.serviceOther}
                            onChange={handleChange}
                            placeholder="Please specify your service requirement..."
                            className={`mt-3 w-full px-4 py-3 rounded-xl border-2 ${errors.serviceOther ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} focus:ring-4 focus:ring-emerald-100 outline-none transition-all`}
                          />
                        )}
                      </AnimatePresence>
                      {errors.serviceOther && <p className="text-red-600 text-xs mt-1">{errors.serviceOther}</p>}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Date (Optional)
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Message / आपका संदेश *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} focus:ring-4 focus:ring-emerald-100 outline-none transition-all resize-none`}
                          placeholder="Please describe your condition, symptoms, or any specific concerns..."
                          aria-invalid={!!errors.message}
                        />
                      </div>
                      {errors.message && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Request / अनुरोध भेजें
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting, you agree to our Privacy Policy. Your data is secure and never shared.
                    </p>
                  </form>
                  {/* Submit Status Messages */}
                  <AnimatePresence mode="wait">
                    {submitStatus === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3"
                      >
                        <CheckCircle2 className="text-emerald-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-emerald-800 font-medium">Appointment Request Received!</p>
                          <p className="text-emerald-700 text-sm mt-1">
                            Thank you! We'll contact you at {formData.phone || 'your number'} within 24 hours.
                            <br />
                            <span className="font-mono text-xs mt-1 block">Ref: SKM-{Date.now().toString().slice(-6)}</span>
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && errors.submit && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                      >
                        <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{errors.submit}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </motion.div>

            {/* Right Column - Info */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">



              {/* Branches */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100"
                id="branches"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Branches / हमारी शाखाएँ</h3>

                <div className="space-y-4">
                  {BRANCHES.map((branch, idx) => (
                    <motion.div
                      key={branch.id}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                      className={`p-4 rounded-xl border-2 transition-all ${branch.comingSoon ? 'border-gray-200 bg-gray-50 opacity-70' : 'border-emerald-100 hover:border-emerald-300 hover:shadow-md'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{branch.name}</h4>
                          {branch.comingSoon ? (
                            <span className="text-xs text-amber-600 font-medium">Coming Soon / जल्द आ रहा है</span>
                          ) : (
                            <>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{branch.address}</p>
                              {branch.phone && <p className="text-xs text-gray-600 mt-1 font-medium">{branch.phone}</p>}
                            </>
                          )}
                        </div>
                        {!branch.comingSoon && branch.map && (
                          <a
                            href={branch.map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            aria-label="Open in Maps"
                          >
                            <Navigation className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
                <p className="text-gray-600 text-sm mb-6">Follow for health tips & success stories</p>

                <div className="space-y-3">
                  {[
                    { icon: Facebook, name: 'Facebook', handle: '@skmphysiotherapy', link: 'https://facebook.com', color: 'hover:bg-blue-600', iconColor: 'text-blue-600' },
                    { icon: Instagram, name: 'Instagram', handle: '@skmphysio', link: 'https://instagram.com', color: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600', iconColor: 'text-pink-600' },
                    { icon: Youtube, name: 'YouTube', handle: 'SKM Physiotherapy', link: 'https://youtube.com', color: 'hover:bg-red-600', iconColor: 'text-red-600' },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 ${social.color} hover:border-transparent hover:text-white transition-all duration-300`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 ${social.iconColor} group-hover:text-white bg-gray-50 group-hover:bg-white/20 rounded-xl transition-all`}>
                          <social.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-white transition-colors text-sm">{social.name}</h4>
                          <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">{social.handle}</p>
                        </div>
                      </div>
                      <ArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {[
              { q: "How soon can I get an appointment?", a: "We offer same-day slots for urgent cases. Regular appointments are confirmed within 24 hours." },
              { q: "Do you accept insurance?", a: "Yes, we accept most major providers. Please verify your coverage before your visit." },
              { q: "What should I bring?", a: "Bring ID, insurance card, referral (if any), and relevant medical reports." },
              { q: "How long is each session?", a: "Initial evaluations: 60 mins. Follow-ups: 45 mins. Duration varies by treatment plan." },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
