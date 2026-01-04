'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  Twitter,
  Sparkles,
  ArrowRight,
  Star,
  Shield,
  Heart,
  Award,
  Map,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Add structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "SKM Physiotherapy",
      "description": "Professional physiotherapy services with experienced certified practitioners",
      "url": "https://skmphysiotherapy.com",
      "telephone": "+1-555-123-4567",
      "email": "info@skmphysiotherapy.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Health Street",
        "addressLocality": "Medical City",
        "addressCountry": "US"
      },
      "openingHours": [
        "Mo-Sa 09:00-20:00"
      ],
      "priceRange": "$$",
      "image": "https://skmphysiotherapy.com/og-image.jpg"
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[-\s()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = value;
    
    if (value.length > 3 && value.length <= 6) {
      formattedValue = `(${value.slice(0,3)}) ${value.slice(3)}`;
    } else if (value.length > 6) {
      formattedValue = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
    }
    
    setFormData(prev => ({
      ...prev,
      phone: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // In a real application, replace this with your API endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('=== FORM SUBMISSION ===');
          console.log('Name:', formData.name);
          console.log('Email:', formData.email);
          console.log('Phone:', formData.phone);
          console.log('Preferred Date:', formData.date || 'Not specified');
          console.log('Service:', formData.service || 'Not specified');
          console.log('Message:', formData.message);
          console.log('Submitted at:', new Date().toISOString());
          console.log('=====================');

          // Track conversion in analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'contact_form_submit', {
              event_category: 'Contact',
              event_label: 'Contact Form Submission'
            });
          }

          setIsSubmitted(true);
          
          // Reset form
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              date: '',
              service: '',
              message: ''
            });
            setIsSubmitted(false);
            
            // Scroll to success message
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 5000);
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      detail: '+1 (555) 123-4567',
      subtitle: 'Call us directly',
      link: 'tel:+15551234567',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'info@skmphysiotherapy.com',
      subtitle: 'We reply within 24 hours',
      link: 'mailto:info@skmphysiotherapy.com',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      action: 'Send Email'
    },
    {
      icon: MapPin,
      title: 'Visit Clinic',
      detail: '123 Health Street, Medical City',
      subtitle: 'Get directions',
      link: 'https://maps.google.com/?q=123+Health+Street+Medical+City',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      action: 'View Map'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      detail: 'Mon-Sat: 9AM - 8PM',
      subtitle: 'Sunday: Emergency Only',
      link: null,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
      action: 'Book Appointment'
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      handle: '@skmphysiotherapy',
      link: 'https://facebook.com/skmphysiotherapy',
      color: 'hover:bg-blue-600',
      iconColor: 'text-blue-600',
      followers: '2.5K'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@skmphysio',
      link: 'https://instagram.com/skmphysio',
      color: 'hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-orange-500',
      iconColor: 'text-pink-600',
      followers: '3.1K'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: 'SKM Physiotherapy',
      link: 'https://youtube.com/c/skmphysiotherapy',
      color: 'hover:bg-red-600',
      iconColor: 'text-red-600',
      followers: '1.8K'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      handle: '@skmphysio',
      link: 'https://twitter.com/skmphysio',
      color: 'hover:bg-blue-400',
      iconColor: 'text-blue-400',
      followers: '1.2K'
    }
  ];

  const services = [
    'Sports Injury Rehabilitation',
    'Manual Therapy',
    'Chronic Pain Management',
    'Post-Surgical Rehabilitation',
    'Pediatric Physiotherapy',
    'Geriatric Care',
    'Neurological Rehabilitation',
    'Women\'s Health Physiotherapy'
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Contact SKM Physiotherapy | Book Appointment | Expert Physiotherapy Care</title>
        <meta name="description" content="Contact SKM Physiotherapy for expert physiotherapy services. Book appointments online, call us at (555) 123-4567, or visit our clinic. Dr. Shravan Kumar, B.P.T., with 15+ years experience." />
        <meta name="keywords" content="physiotherapy contact, book physio appointment, physical therapy consultation, sports injury treatment, pain management specialist, rehabilitation center contact" />
        <meta property="og:title" content="Contact SKM Physiotherapy | Expert Physiotherapy Services" />
        <meta property="og:description" content="Get in touch with certified physiotherapist Dr. Shravan Kumar. Book your appointment today for personalized care." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skmphysiotherapy.com/contact" />
        <link rel="canonical" href="https://skmphysiotherapy.com/contact" />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://skmphysiotherapy.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://skmphysiotherapy.com/contact"
              }
            ]
          })}
        </script>
      </head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-50">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-80 h-80 md:w-96 md:h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 -right-20 w-80 h-80 md:w-96 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-20 left-1/3 w-80 h-80 md:w-96 md:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <a href="/" className="hover:text-red-600 transition-colors">Home</a>
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} />
                  <span className="ml-2 font-medium text-gray-900">Contact</span>
                </li>
              </ol>
            </nav>

            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg mb-4 md:mb-6 animate-bounce">
                <Sparkles className="text-red-600 w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-semibold text-gray-700">We&apos;re Here to Help You Heal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Contact <span className="text-red-600">SKM Physiotherapy</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Reach out to our team of certified physiotherapists for personalized care. 
                Book your appointment today and take the first step towards recovery.
              </p>

              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                <a 
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-3 md:px-6 md:py-3.5 rounded-full font-bold hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                  aria-label="Call us at (555) 123-4567"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  Call Now: (555) 123-4567
                </a>
                <a 
                  href="#appointment-form"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-3 md:px-6 md:py-3.5 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200 text-sm md:text-base"
                  aria-label="Book appointment online"
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  Book Online
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className={`group ${info.bgColor} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${info.color} rounded-xl md:rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <info.icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 truncate">{info.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-1 truncate">{info.subtitle}</p>
                      {info.link ? (
                        <a 
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs md:text-sm text-gray-900 hover:text-red-600 transition-colors font-medium truncate block"
                        >
                          {info.detail}
                          <ExternalLink className="inline-block ml-1 w-3 h-3" />
                        </a>
                      ) : (
                        <p className="text-xs md:text-sm text-gray-900 font-medium truncate">{info.detail}</p>
                      )}
                      {info.action && (
                        <button className="mt-2 text-xs text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center gap-1">
                          {info.action}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Form */}
              <div 
                ref={formRef}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                id="appointment-form"
              >
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-gray-100">
                  <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

                  <div className="relative">
                    <div className="mb-6 md:mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Book Your Appointment
                      </h2>
                      <p className="text-gray-600">
                        Fill out the form below and we&apos;ll get back to you within 24 hours.
                      </p>
                    </div>

                    {errors.submit && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-red-600 text-sm">{errors.submit}</p>
                      </div>
                    )}

                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8 md:py-12 animate-fadeIn">
                        <div className="bg-green-50 rounded-full p-4 md:p-6 mb-4 md:mb-6 animate-bounce">
                          <CheckCircle2 className="text-green-600 w-12 h-12 md:w-16 md:h-16" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
                          Appointment Request Received!
                        </h3>
                        <p className="text-gray-600 text-center max-w-md">
                          Thank you for contacting SKM Physiotherapy. We&apos;ve received your message and will contact you within 24 hours to confirm your appointment.
                        </p>
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600">
                            Confirmation ID: <span className="font-mono font-bold">SKM-{Date.now().toString().slice(-8)}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div className="group">
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors w-5 h-5" />
                            <input
                              id="name"
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-base`}
                              placeholder="Enter your full name"
                              aria-required="true"
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? "name-error" : undefined}
                            />
                          </div>
                          {errors.name && (
                            <p id="name-error" className="text-red-600 text-xs mt-2 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email & Phone Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="group">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors w-5 h-5" />
                              <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-base`}
                                placeholder="your.email@example.com"
                                aria-required="true"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                              />
                            </div>
                            {errors.email && (
                              <p id="email-error" className="text-red-600 text-xs mt-2 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div className="group">
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors w-5 h-5" />
                              <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-base`}
                                placeholder="(555) 123-4567"
                                maxLength={14}
                                aria-required="true"
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? "phone-error" : undefined}
                              />
                            </div>
                            {errors.phone && (
                              <p id="phone-error" className="text-red-600 text-xs mt-2 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Date & Service Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="group">
                            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                              Preferred Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors w-5 h-5" />
                              <input
                                id="date"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-base bg-white"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                              Service Needed
                            </label>
                            <div className="relative">
                              <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-base appearance-none bg-white cursor-pointer"
                              >
                                <option value="">Select a service</option>
                                <option value="sports-injury">Sports Injury</option>
                                <option value="manual-therapy">Manual Therapy</option>
                                <option value="rehabilitation">Rehabilitation</option>
                                <option value="chronic-pain">Chronic Pain Management</option>
                                <option value="orthopedic">Orthopedic Care</option>
                                <option value="pediatric">Pediatric Physiotherapy</option>
                                <option value="neurological">Neurological Rehab</option>
                                <option value="post-surgical">Post-Surgical Rehab</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Message Field */}
                        <div className="group">
                          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Message *
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors w-5 h-5" />
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-base resize-none`}
                              placeholder="Please describe your condition, symptoms, or any specific concerns..."
                              aria-required="true"
                              aria-invalid={!!errors.message}
                              aria-describedby={errors.message ? "message-error" : undefined}
                            ></textarea>
                          </div>
                          {errors.message && (
                            <p id="message-error" className="text-red-600 text-xs mt-2 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.message}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-base md:text-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing Your Request...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Book Your Appointment
                            </>
                          )}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          By submitting this form, you agree to our Privacy Policy and Terms of Service.
                          We respect your privacy and will never share your information.
                        </p>
                      </form>
                    )}
                  </div>
                </div>

                {/* Services Offered */}
                <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Services We Offer</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {/* Doctor Profile */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 relative overflow-hidden border border-gray-100">
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full -mr-8 -mt-8 opacity-10"></div>
                  
                  <div className="relative">
                    <div className="flex items-start gap-4 md:gap-6 mb-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Award className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                          Dr. Shravan Kumar
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mb-2">
                          B.P.T., C.D.C.T., M.C.T. (Sharda Hospital)
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm">
                          Certified Professional Physiotherapist with 15+ years of experience
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                        <Star className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        <span className="text-sm md:text-base text-gray-700 font-medium">15+ Years Clinical Experience</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                        <Shield className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        <span className="text-sm md:text-base text-gray-700 font-medium">Certified in Multiple Specializations</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                        <Heart className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        <span className="text-sm md:text-base text-gray-700 font-medium">1000+ Successfully Treated Patients</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Sports Medicine', 'Orthopedic Rehab', 'Manual Therapy', 'Pain Management'].map((spec, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Connect With Us</h2>
                  <p className="text-gray-600 mb-6">Follow us for health tips, updates, and success stories</p>
                  
                  <div className="space-y-3 md:space-y-4">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={`group flex items-center justify-between p-3 md:p-4 rounded-xl border-2 border-gray-100 hover:border-transparent ${social.color} hover:text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 ${social.iconColor} group-hover:text-white bg-gray-50 group-hover:bg-white/20 rounded-xl transition-all duration-300`}>
                            <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors text-sm md:text-base">
                              {social.name}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 group-hover:text-white/80 transition-colors">
                              {social.handle}
                            </p>
                            {social.followers && (
                              <p className="text-xs text-gray-400 group-hover:text-white/60 mt-1">
                                {social.followers} followers
                              </p>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Location Map */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Visit Our Clinic</h2>
                  <p className="text-gray-600 mb-4">State-of-the-art facility with modern equipment</p>
                  
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl md:rounded-2xl overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <MapPin className="mx-auto text-gray-400 mb-3 w-8 h-8 md:w-12 md:h-12" />
                        <p className="text-gray-600 font-medium">Interactive Map View</p>
                        <p className="text-gray-500 text-sm mt-1">Click to open in Google Maps</p>
                      </div>
                    </div>
                    <a 
                      href="https://maps.google.com/?q=123+Health+Street+Medical+City"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="absolute inset-0"
                      aria-label="Open location in Google Maps"
                    ></a>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Map className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">Our Address</h3>
                        <p className="text-gray-600 text-sm">123 Health Street, Medical City, MC 12345</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">Parking Information</h3>
                        <p className="text-gray-600 text-sm">Free parking available in front of the clinic</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Find answers to common questions about appointments and services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "How soon can I get an appointment?",
                  a: "We typically offer same-day or next-day appointments for urgent cases. Regular appointments are available within 24-48 hours."
                },
                {
                  q: "Do you accept insurance?",
                  a: "Yes, we accept most major insurance providers. Please contact our office to verify your coverage before your appointment."
                },
                {
                  q: "What should I bring to my first appointment?",
                  a: "Please bring your ID, insurance card, referral (if applicable), and any relevant medical reports or imaging results."
                },
                {
                  q: "How long is each session?",
                  a: "Initial evaluations are 60 minutes. Follow-up sessions typically last 45 minutes. Treatment duration may vary based on your needs."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a 
                href="/faq"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                View All FAQs
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl md:rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-pink-200 rounded-full -ml-16 -mb-16 opacity-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Start Your Recovery Journey?
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Take the first step towards pain-free living. Our team of experts is ready to help you achieve your health goals.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="tel:+15551234567"
                    className="inline-flex items-center gap-3 bg-red-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl text-base md:text-lg"
                    aria-label="Call us now at (555) 123-4567"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now: (555) 123-4567
                  </a>
                  <a 
                    href="#appointment-form"
                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl border border-gray-200 text-base md:text-lg"
                    aria-label="Book an appointment online"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Online Appointment
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  Emergency? Call our 24/7 emergency line: <strong>+1 (555) 987-6543</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">SKM Physiotherapy</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Professional physiotherapy services committed to helping you achieve optimal health and mobility.
              </p>
              
              <div className="flex justify-center space-x-6 mb-6">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`p-2 rounded-full ${social.iconColor.replace('text-', 'bg-')} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              <div className="text-gray-400 text-sm">
                <p>© {currentYear} SKM Physiotherapy. All rights reserved.</p>
                <p className="mt-2">
                  <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a> • 
                  <a href="/terms" className="hover:text-white transition-colors ml-2">Terms of Service</a> • 
                  <a href="/sitemap" className="hover:text-white transition-colors ml-2">Sitemap</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }

        /* Selection color */
        ::selection {
          background-color: rgba(220, 38, 38, 0.2);
          color: #111827;
        }

        /* Focus styles for accessibility */
        *:focus-visible {
          outline: 3px solid rgba(220, 38, 38, 0.4);
          outline-offset: 2px;
        }

        /* Smooth transitions */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default ContactPage;