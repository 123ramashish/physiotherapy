'use client';
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Menu, X, Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const PhysiotherapyWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { title: 'Sports Injury', desc: 'Specialized treatment for athletic injuries and performance enhancement' },
    { title: 'Manual Therapy', desc: 'Hands-on techniques for pain relief and improved mobility' },
    { title: 'Rehabilitation', desc: 'Comprehensive recovery programs for post-surgery and injuries' },
    { title: 'Chronic Pain', desc: 'Long-term pain management and relief strategies' },
    { title: 'Orthopedic Care', desc: 'Treatment for musculoskeletal conditions and disorders' },
    { title: 'Pediatric PT', desc: 'Specialized care for children and developmental needs' }
  ];

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5000+', label: 'Happy Patients' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', text: 'Excellent care and professional service. My back pain is completely gone!', rating: 5 },
    { name: 'Michael Chen', text: 'The physiotherapists here are incredibly knowledgeable and caring.', rating: 5 },
    { name: 'Emma Williams', text: 'Highly recommend! They helped me recover from my sports injury quickly.', rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      {/* SEO Meta Tags would be in Next.js Head component */}
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800 animate-fade-in">
              skm<span className="text-rose-700">physiotherapy</span>.com
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Services', 'Therapist', 'Gallery'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-rose-700 transition-colors duration-300 font-medium"
                  onClick={() => setActiveSection(item.toLowerCase())}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Facebook className="w-5 h-5 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-700 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-700 hover:text-pink-600 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-700 hover:text-red-600 cursor-pointer transition-colors" />
              <button className="ml-4 bg-gradient-to-r from-rose-700 to-rose-900 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              {['Home', 'About', 'Services', 'Therapist', 'Gallery'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-700 hover:text-rose-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="mt-4 w-full bg-gradient-to-r from-rose-700 to-rose-900 text-white px-6 py-2 rounded-full">
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md text-gray-700 font-medium">
                Welcome To
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Physiotherapy &<br />
                <span className="text-rose-700">Chiropractor Clinic</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Expert care for your recovery and wellbeing. We provide personalized treatment plans using the latest techniques in physiotherapy and chiropractic care to help you achieve optimal health.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-rose-700 to-rose-900 text-white px-8 py-3 rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center">
                  View Intro <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="bg-gradient-to-r from-amber-300 to-amber-400 text-gray-800 px-8 py-3 rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Know More
                </button>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-400 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-gradient-to-br from-amber-200 to-amber-300 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-square bg-gray-300 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍⚕️</div>
                    <p className="text-gray-700 font-medium">Professional Physiotherapist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold text-rose-700 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive physiotherapy and chiropractic services tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-rose-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-rose-200 to-amber-200 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏥</div>
                  <p className="text-gray-700 font-medium text-xl">Modern Facility</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Why Choose Our <span className="text-rose-700">Clinic?</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                With over 15 years of experience, our team of certified physiotherapists and chiropractors provide evidence-based treatment in a comfortable, modern facility.
              </p>
              <ul className="space-y-4">
                {['Certified & Experienced Staff', 'State-of-the-art Equipment', 'Personalized Treatment Plans', 'Flexible Appointment Scheduling'].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-rose-700 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Patient Testimonials</h2>
            <p className="text-gray-600">What our patients say about us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-700 to-rose-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-rose-100 mb-8">Book your appointment today and start your journey to better health</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6" />
                  <span>info@skmphysiotherapy.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6" />
                  <span>123 Health Street, Medical District</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6" />
                  <span>Mon-Fri: 8AM-8PM, Sat: 9AM-5PM</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Book Appointment</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"></textarea>
                <button onClick={() => alert('Appointment request submitted!')} className="w-full bg-gradient-to-r from-rose-700 to-rose-900 text-white py-3 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 SKM Physiotherapy. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-6">
            <Facebook className="w-6 h-6 hover:text-rose-400 cursor-pointer transition-colors" />
            <Twitter className="w-6 h-6 hover:text-rose-400 cursor-pointer transition-colors" />
            <Instagram className="w-6 h-6 hover:text-rose-400 cursor-pointer transition-colors" />
            <Youtube className="w-6 h-6 hover:text-rose-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PhysiotherapyWebsite;