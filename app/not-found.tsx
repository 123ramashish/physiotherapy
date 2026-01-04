'use client';
import React, { useState, useEffect } from 'react';
import { Activity, Home, Search, Phone, ArrowLeft, Heart, AlertCircle } from 'lucide-react';

const PageNotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-1/4 right-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Activity className="absolute top-20 left-10 w-12 h-12 text-rose-300 animate-bounce opacity-40" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-40 right-32 w-10 h-10 text-pink-300 animate-bounce opacity-40" style={{ animationDelay: '0.5s' }} />
        <Activity className="absolute bottom-32 left-1/4 w-8 h-8 text-amber-300 animate-bounce opacity-40" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-48 right-20 w-14 h-14 text-rose-300 animate-bounce opacity-40" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className={`relative z-10 text-center max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-full transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Activity className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              SKM PHYSIOTHERAPY
            </h1>
          </div>
        </div>

        {/* 404 Number */}
        <div className="relative mb-8">
          <h2 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent leading-none animate-pulse">
            404
          </h2>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="w-24 h-24 md:w-32 md:h-32 text-rose-300 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Error Message */}
        <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h3>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have taken a break. Just like your body needs rest, sometimes pages do too! 
            Let's get you back on track to better health.
          </p>
        </div>

        {/* Error Card */}
        <div className={`bg-white rounded-3xl shadow-2xl p-8 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-start space-x-4 text-left">
            <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-3 rounded-2xl flex-shrink-0 animate-bounce">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">What happened?</h4>
              <p className="text-gray-600 leading-relaxed">
                The page you requested doesn't exist or may have been moved. This could be due to a typo in the URL or the page has been removed.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="/"
            className="group relative px-8 py-4 font-semibold text-white overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative flex items-center justify-center space-x-3 z-10">
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 font-semibold text-gray-800 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white w-full sm:w-auto"
          >
            <span className="relative flex items-center justify-center space-x-3 z-10 group-hover:text-amber-600 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Go Back</span>
            </span>
          </button>

          <a
            href="/services"
            className="group relative px-8 py-4 font-semibold text-white overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-rose-500 to-pink-500 w-full sm:w-auto"
          >
            <span className="relative flex items-center justify-center space-x-3 z-10">
              <Search className="w-5 h-5" />
              <span>Our Services</span>
            </span>
          </a>
        </div>

        {/* Quick Links */}
        <div className={`bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h4 className="text-2xl font-bold text-gray-800 mb-6">Quick Links</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Home, label: 'Home', link: '/' },
              { icon: Activity, label: 'Services', link: '/services' },
              { icon: Heart, label: 'About Us', link: '/about' },
              { icon: Phone, label: 'Contact', link: '/contact' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.link}
                  className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-rose-50 hover:to-pink-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 group-hover:from-rose-500 group-hover:to-pink-500 p-3 rounded-xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-rose-600 transition-colors duration-300 text-sm">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className={`mt-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Phone className="w-5 h-5 animate-bounce" />
            <span className="font-semibold">Need Help? Call:</span>
            <a href="tel:7982799147" className="font-bold text-lg hover:text-yellow-300 transition-colors">
              7982799147
            </a>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
        <a
          href="/"
          className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-110"
        >
          <Home className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </a>
        <a
          href="tel:7982799147"
          className="group bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;