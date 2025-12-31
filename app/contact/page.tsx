'use client';
import React, { useState, useEffect } from 'react';
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
  ArrowRight
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors:any = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s()]/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev:any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      console.log('=== FORM SUBMISSION ===');
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Phone:', formData.phone);
      console.log('Preferred Date:', formData.date || 'Not specified');
      console.log('Service:', formData.service || 'Not specified');
      console.log('Message:', formData.message);
      console.log('Submitted at:', new Date().toLocaleString());
      console.log('=====================');
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
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
        }, 3000);
      }, 1500);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      detail: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'info@skmphysiotherapy.com',
      link: 'mailto:info@skmphysiotherapy.com',
      color: 'from-red-400 to-pink-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: MapPin,
      title: 'Location',
      detail: '123 Health Street, Medical City',
      link: 'https://maps.google.com',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      title: 'Hours',
      detail: 'Mon-Sat: 9AM - 8PM',
      link: null,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      handle: '@skmphysiotherapy',
      link: 'https://facebook.com',
      color: 'hover:bg-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@skmphysio',
      link: 'https://instagram.com',
      color: 'hover:bg-pink-600',
      iconColor: 'text-pink-600'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: 'SKM Physiotherapy',
      link: 'https://youtube.com',
      color: 'hover:bg-red-600',
      iconColor: 'text-red-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      handle: '@skmphysio',
      link: 'https://twitter.com',
      color: 'hover:bg-blue-400',
      iconColor: 'text-blue-400'
    }
  ];

  return (
    <>
      <div style={{ display: 'none' }}>
        <h1>Contact SKM Physiotherapy - Book Your Appointment Today</h1>
        <meta name="description" content="Get in touch with SKM Physiotherapy. Book appointments, ask questions, or visit our clinic. Available on phone, email, and social media. Open Mon-Sat 9AM-8PM." />
        <meta name="keywords" content="contact physiotherapy, book appointment, physical therapy contact, clinic location, physiotherapy hours" />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg mb-6 animate-bounce">
              <Sparkles className="text-red-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">We're Here to Help</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Get in <span className="relative inline-block">
                <span className="text-red-600">Touch</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M1 8C50 3 150 3 199 8" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className={`group ${info.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <info.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                  {info.link ? (
                    <a 
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-red-600 transition-colors text-sm block"
                    >
                      {info.detail}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm">{info.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

                  <div className="relative">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                    <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
                        <div className="bg-green-100 rounded-full p-6 mb-4 animate-bounce">
                          <CheckCircle2 className="text-green-600" size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600 text-center">Your message has been sent successfully. We'll be in touch soon.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                errors.name ? 'border-red-300' : 'border-gray-200'
                              } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300`}
                              placeholder="John Doe"
                            />
                          </div>
                          {errors.name && <p className="text-red-600 text-xs mt-1 ml-1">{errors.name}</p>}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                  errors.email ? 'border-red-300' : 'border-gray-200'
                                } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300`}
                                placeholder="john@example.com"
                              />
                            </div>
                            {errors.email && <p className="text-red-600 text-xs mt-1 ml-1">{errors.email}</p>}
                          </div>

                          <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                  errors.phone ? 'border-red-300' : 'border-gray-200'
                                } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300`}
                                placeholder="(555) 123-4567"
                              />
                            </div>
                            {errors.phone && <p className="text-red-600 text-xs mt-1 ml-1">{errors.phone}</p>}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Preferred Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                              <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Service Type
                            </label>
                            <select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 appearance-none bg-white"
                            >
                              <option value="">Select a service</option>
                              <option value="sports-injury">Sports Injury</option>
                              <option value="manual-therapy">Manual Therapy</option>
                              <option value="rehabilitation">Rehabilitation</option>
                              <option value="chronic-pain">Chronic Pain</option>
                              <option value="orthopedic">Orthopedic Care</option>
                              <option value="pediatric">Pediatric PT</option>
                            </select>
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Message *
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={5}
                              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${
                                errors.message ? 'border-red-300' : 'border-gray-200'
                              } focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 resize-none`}
                              placeholder="Tell us about your needs..."
                            ></textarea>
                          </div>
                          {errors.message && <p className="text-red-600 text-xs mt-1 ml-1">{errors.message}</p>}
                        </div>

                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send size={20} />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect With Us</h2>
                  <p className="text-gray-600 mb-6">Follow us on social media for updates and health tips</p>
                  
                  <div className="space-y-4">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-transparent ${social.color} hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                      >
                        <div className={`flex items-center justify-center w-12 h-12 ${social.iconColor} group-hover:text-white bg-gray-50 group-hover:bg-white/20 rounded-xl transition-all duration-300`}>
                          <social.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">{social.name}</h3>
                          <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">{social.handle}</p>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Visit Our Clinic</h2>
                  <p className="text-gray-600 mb-6">Find us at our convenient location</p>
                  
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative text-center">
                      <MapPin className="mx-auto text-gray-600 mb-2 group-hover:scale-110 transition-transform" size={48} />
                      <p className="text-gray-700 font-semibold">Click to view map</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2">Our Address</h3>
                    <p className="text-gray-600 text-sm">123 Health Street, Medical City, MC 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't hesitate to reach out. Our friendly team is ready to assist you with any inquiries about our services, appointments, or general health questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <Phone size={20} />
                Call Now
              </a>
              <a 
                href="mailto:info@skmphysiotherapy.com"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl border-2 border-gray-200"
              >
                <Mail size={20} />
                Email Us
              </a>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default ContactPage;