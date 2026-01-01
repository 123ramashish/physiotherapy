'use client';
import React, { useState, useEffect } from 'react';
import { Activity, Heart, Shield, Award, Phone, MapPin, Clock, ChevronRight, Star, Check } from 'lucide-react';

const PhysiotherapyIntro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 12);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    'BACK PAIN',
    'NECK PAIN',
    'KNEE PAIN',
    'ARTHRITIS',
    'HEEL PAIN',
    'BELL\'S PALSY',
    'SCIATICA PAIN',
    'SPORTS INJURIES',
    'SORENESS RELAXATION',
    'POST COVID REHAB',
    'FROZEN SHOULDER',
    'DRY NEEDLING',
    'CUPPING & HIJAMA',
    'PARALYSIS'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-full">
                <Activity className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                SKMI PHYSIOTHERAPY &
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
                REHABILITATION CENTRE
              </h2>
            </div>
          </div>
          <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
            JAI HO DOLPHIN
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Side - Services */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-red-200/50 transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 p-2 rounded-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span>Our Services</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {services.slice(0, 7).map((service, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-500 ${
                      activeService === idx
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transform scale-105'
                        : 'bg-red-50 text-gray-700 hover:bg-red-100'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                      activeService === idx ? 'bg-white' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-sm">{service}</span>
                    {activeService === idx && (
                      <Check className="w-5 h-5 ml-auto animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - More Services */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-teal-200/50 transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span>Specialized Care</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {services.slice(7).map((service, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-500 ${
                      activeService === idx + 7
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-105'
                        : 'bg-teal-50 text-gray-700 hover:bg-teal-100'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                      activeService === idx + 7 ? 'bg-white' : 'bg-teal-500'
                    }`}></div>
                    <span className="font-medium text-sm">{service}</span>
                    {activeService === idx + 7 && (
                      <Check className="w-5 h-5 ml-auto animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Home Visits Banner */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-red-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">
                HOME VISITS AVAILABLE
              </h2>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">24/7 Service Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Info Section */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Doctor Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden group hover:shadow-teal-200/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-2xl transform group-hover:rotate-12 transition-transform duration-500">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                    Dr. Shravan Kumar
                  </h3>
                  <p className="text-gray-600 font-medium">B.P.T., C.D.C.T., M.C.T. (Sharda Hospital)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors duration-300">
                  <Star className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700 font-medium">Certified Professional Physiotherapist</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors duration-300">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700 font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors duration-300">
                  <Heart className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700 font-medium">1000+ Happy Patients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6 flex items-center space-x-3">
                <Phone className="w-8 h-8 animate-bounce" />
                <span>Contact Us</span>
              </h3>

              <div className="space-y-4 mb-6">
                <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-2">
                    <Phone className="w-6 h-6" />
                    <span className="text-sm font-medium opacity-90">Call Now</span>
                  </div>
                  <a href="tel:7982799147" className="text-3xl font-bold block hover:text-yellow-300 transition-colors">
                    7982799147
                  </a>
                </div>

                <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium opacity-90 mb-1">Visit Us</p>
                      <p className="font-semibold leading-relaxed">
                        B-5, Beta 1, Near Jagat Farm, Greater Noida, G.B. Nagar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-red-600 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 group">
                <span>Book Appointment Now</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { icon: Activity, label: 'Advanced Equipment', color: 'from-red-500 to-pink-500' },
            { icon: Shield, label: 'Safe Treatment', color: 'from-teal-500 to-teal-600' },
            { icon: Heart, label: 'Caring Staff', color: 'from-pink-500 to-red-500' },
            { icon: Award, label: 'Certified Care', color: 'from-teal-600 to-teal-700' }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 text-sm">{feature.label}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhysiotherapyIntro;