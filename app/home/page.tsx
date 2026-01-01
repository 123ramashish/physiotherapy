'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Activity, Heart, Users, Award } from 'lucide-react';

const PhysiotherapyHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>SKM Physiotherapy - Expert Physiotherapy & Chiropractic Care</title>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-red-100/20 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-full transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-300 ${
                scrolled ? 'text-xl' : 'text-2xl'
              }`}>
                skm physiotherapy
                <span className="text-red-600">.com</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {['Home', 'About', 'Services', 'Therapist', 'Gallery'].map((item, idx) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-5 py-2.5 text-gray-700 font-medium group overflow-hidden rounded-xl transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                  {/* Background color on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-xl"></span>
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl"></span>
                  {/* Bottom line */}
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </a>
              ))}
            </nav>

            {/* Social Icons & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {[
                  { icon: '📱', label: 'Phone' },
                  { icon: '📧', label: 'Email' },
                  { icon: '📍', label: 'Location' }
                ].map((social, idx) => (
                  <button
                    key={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg group"
                    aria-label={social.label}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </button>
                ))}
              </div>
              
              <button className="relative px-6 py-2.5 font-semibold text-white overflow-hidden group rounded-full">
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center space-x-2 z-10">
                  <span>Book Appointment</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 rounded-full ring-2 ring-red-500 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Menu className="w-6 h-6" />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                  <X className="w-6 h-6" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-all duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-full">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-800">Menu</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-100 text-gray-700 hover:text-red-600 transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Menu Items */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {['Home', 'About', 'Services', 'Therapist', 'Gallery'].map((item, idx) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 transform hover:translate-x-2"
                  style={{ 
                    animation: isMenuOpen ? `slideInRight 0.3s ease-out ${idx * 0.1}s both` : 'none'
                  }}
                >
                  <span className="font-medium text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                    {item}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </nav>
            
            {/* Menu Footer */}
            <div className="p-6 border-t border-gray-100 space-y-4 bg-gradient-to-br from-white to-red-50">
              <div className="flex items-center justify-center space-x-3">
                {[
                  { icon: '📱', label: 'Phone' },
                  { icon: '📧', label: 'Email' },
                  { icon: '📍', label: 'Location' }
                ].map((social, idx) => (
                  <button
                    key={social.label}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-red-100 hover:to-red-200 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </button>
                ))}
              </div>
              <button 
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Book Appointment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                Welcome To
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                Physiotherapy &<br />
                <span className="text-red-600">Chiropractor</span> Clinic
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Expert care for your recovery and wellbeing. We provide personalized treatment plans using the latest techniques in physiotherapy and chiropractic care to help you achieve optimal health.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span>View Intro</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-full font-semibold border-2 border-gray-200 transition-all duration-300 hover:border-red-600 hover:text-red-600">
                  Know More
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: '500+', label: 'Patients Treated' },
                  { number: '15+', label: 'Years Experience' },
                  { number: '98%', label: 'Success Rate' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-red-600">{stat.number}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Card */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                {/* Inner Card */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 20px)'
                    }}></div>
                  </div>
                  
                  {/* Icon */}
                  <div className="relative bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <Activity className="w-8 h-8 text-red-600" />
                  </div>
                  
                  {/* Text */}
                  <h3 className="relative text-white text-2xl font-bold mb-8">
                    Professional<br />Physiotherapist
                  </h3>
                  
                  {/* Features */}
                  <div className="relative grid grid-cols-2 gap-4">
                    {[
                      { icon: Heart, label: 'Caring' },
                      { icon: Users, label: 'Expert Team' },
                      { icon: Award, label: 'Certified' },
                      { icon: Activity, label: 'Advanced Tech' }
                    ].map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3 hover:bg-white/30 transition-all duration-300">
                          <Icon className="w-5 h-5 text-white" />
                          <span className="text-white text-sm font-medium">{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Activity, title: 'Expert Care', desc: 'Professional treatment' },
              { icon: Heart, title: 'Personalized Plans', desc: 'Tailored to you' },
              { icon: Users, title: 'Experienced Team', desc: 'Qualified therapists' },
              { icon: Award, title: 'Proven Results', desc: 'High success rate' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="text-center p-6 rounded-2xl hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 group-hover:bg-red-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-110 z-50 group">
        <Activity className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
      </button>
    </>
  );
};

export default PhysiotherapyHome;