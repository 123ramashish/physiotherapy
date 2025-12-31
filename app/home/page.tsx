'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Activity, Heart, Users, Award } from 'lucide-react';

const PhysiotherapyHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>SKM Physiotherapy - Expert Physiotherapy & Chiropractic Care</h1>
        <meta name="description" content="Professional physiotherapy and chiropractic clinic offering personalized treatment plans for optimal recovery and wellbeing. Book your appointment today." />
        <meta name="keywords" content="physiotherapy, chiropractic, physical therapy, rehabilitation, pain management, sports injury" />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/" className="text-xl sm:text-2xl font-bold">
                  <span className="text-gray-900">skm</span>
                  <span className="text-red-600">physiotherapy</span>
                  <span className="text-gray-900">.com</span>
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors">Home</a>
                <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors">About</a>
                <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors">Services</a>
                <a href="#therapist" className="text-gray-700 hover:text-red-600 transition-colors">Therapist</a>
                <a href="#gallery" className="text-gray-700 hover:text-red-600 transition-colors">Gallery</a>
              </div>

              {/* Social Icons & CTA */}
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
                <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium">
                  Book Appointment
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 hover:text-red-600"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-4 py-4 space-y-3">
                <a href="#home" className="block text-gray-700 hover:text-red-600">Home</a>
                <a href="#about" className="block text-gray-700 hover:text-red-600">About</a>
                <a href="#services" className="block text-gray-700 hover:text-red-600">Services</a>
                <a href="#therapist" className="block text-gray-700 hover:text-red-600">Therapist</a>
                <a href="#gallery" className="block text-gray-700 hover:text-red-600">Gallery</a>
                <button className="w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium">
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <main className="pt-20 sm:pt-24">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="inline-block">
                  <span className="text-red-600 text-sm sm:text-base font-semibold tracking-wide uppercase animate-pulse">
                    Welcome To
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Physiotherapy &<br />
                  <span className="text-red-600">Chiropractor Clinic</span>
                </h1>
                
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  Expert care for your recovery and wellbeing. We provide personalized treatment plans using the latest techniques in physiotherapy and chiropractic care to help you achieve optimal health.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-medium flex items-center justify-center hover:shadow-lg hover:scale-105">
                    View Intro
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300 font-medium hover:shadow-lg hover:scale-105">
                    Know More
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-red-600">500+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Patients Treated</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-red-600">15+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-red-600">98%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Card */}
              <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300 rounded-3xl opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-300 rounded-3xl opacity-30 animate-pulse delay-150"></div>
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-3xl p-6 sm:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  {/* Inner Card */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 sm:p-12 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Icon */}
                    <div className="relative mb-6 animate-bounce">
                      <div className="bg-white rounded-full p-6 shadow-lg">
                        <Activity className="text-red-600" size={48} />
                      </div>
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                      Professional Physiotherapist
                    </h3>
                    
                    {/* Features */}
                    <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                      <div className="bg-white/50 rounded-lg p-3 text-center hover:bg-white transition-colors">
                        <Heart className="mx-auto mb-2 text-red-600" size={24} />
                        <div className="text-xs font-medium text-gray-700">Caring</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3 text-center hover:bg-white transition-colors">
                        <Users className="mx-auto mb-2 text-red-600" size={24} />
                        <div className="text-xs font-medium text-gray-700">Expert Team</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3 text-center hover:bg-white transition-colors">
                        <Award className="mx-auto mb-2 text-red-600" size={24} />
                        <div className="text-xs font-medium text-gray-700">Certified</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3 text-center hover:bg-white transition-colors">
                        <Activity className="mx-auto mb-2 text-red-600" size={24} />
                        <div className="text-xs font-medium text-gray-700">Advanced Tech</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Activity, title: 'Expert Care', desc: 'Professional treatment' },
                  { icon: Heart, title: 'Personalized Plans', desc: 'Tailored to you' },
                  { icon: Users, title: 'Experienced Team', desc: 'Qualified therapists' },
                  { icon: Award, title: 'Proven Results', desc: 'High success rate' }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className={`text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                      <feature.icon className="text-red-600" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 hover:scale-110 z-40 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default PhysiotherapyHome;