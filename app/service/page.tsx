'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Heart, 
  Users, 
  Zap, 
  Target, 
  Baby,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const ServicesPage = () => {
  const [visibleCards, setVisibleCards] = useState<any>([]);
  const cardRefs = useRef<any>([]);

  useEffect(() => {
    const observers:any = cardRefs.current.map((ref:any, index:any) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev:any) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer: IntersectionObserver) => observer.disconnect());
  }, []);

  const services = [
    {
      icon: Activity,
      title: 'Sports Injury',
      description: 'Specialized treatment for athletic injuries and performance enhancement',
      color: 'from-red-50 to-pink-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      features: ['Quick recovery', 'Performance optimization', 'Prevention strategies']
    },
    {
      icon: Heart,
      title: 'Manual Therapy',
      description: 'Hands-on techniques for pain relief and improved mobility',
      color: 'from-pink-50 to-rose-50',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      features: ['Pain management', 'Mobility restoration', 'Soft tissue work']
    },
    {
      icon: Target,
      title: 'Rehabilitation',
      description: 'Comprehensive recovery programs for post-surgery and injuries',
      color: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      features: ['Post-surgery care', 'Injury recovery', 'Strength building']
    },
    {
      icon: Zap,
      title: 'Chronic Pain',
      description: 'Long-term pain management and relief strategies',
      color: 'from-orange-50 to-red-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      features: ['Pain reduction', 'Lifestyle coaching', 'Holistic approach']
    },
    {
      icon: Users,
      title: 'Orthopedic Care',
      description: 'Treatment for musculoskeletal conditions and disorders',
      color: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      features: ['Joint care', 'Bone health', 'Movement therapy']
    },
    {
      icon: Baby,
      title: 'Pediatric PT',
      description: 'Specialized care for children and developmental needs',
      color: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      features: ['Child development', 'Family support', 'Play-based therapy']
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>Physiotherapy Services - Comprehensive Care Solutions</h1>
        <meta name="description" content="Expert physiotherapy services including sports injury treatment, manual therapy, rehabilitation, chronic pain management, orthopedic care, and pediatric physical therapy." />
        <meta name="keywords" content="sports injury, manual therapy, rehabilitation, chronic pain, orthopedic care, pediatric physiotherapy, physical therapy services" />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 animate-bounce">
              <Sparkles className="text-red-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">Premium Healthcare Services</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our <span className="text-red-600 relative">
                Services
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C50 2.5 150 2.5 199 5.5" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive physiotherapy and chiropractic services tailored to your needs
            </p>

            {/* Stats Bar */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { number: '6+', label: 'Specializations' },
                { number: '500+', label: 'Patients Treated' },
                { number: '15+', label: 'Years Experience' },
                { number: '98%', label: 'Success Rate' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-red-600">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  ref={(el:any) => (cardRefs.current[index] = el)}
                  className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden ${
                    visibleCards.includes(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Card Content */}
                  <div className="relative p-6 sm:p-8">
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${service.iconBg} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <service.icon className={`${service.iconColor}`} size={32} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <CheckCircle2 className="text-white" size={14} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium group-hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3">
                      Learn More
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Decorative Corner Element */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our <span className="text-red-600">Services</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience exceptional care with our comprehensive approach to physiotherapy
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: 'Personalized Care', desc: 'Tailored treatment plans' },
                { icon: Users, title: 'Expert Team', desc: 'Certified professionals' },
                { icon: Zap, title: 'Advanced Tech', desc: 'Latest equipment' },
                { icon: Heart, title: 'Patient First', desc: 'Your wellbeing matters' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="text-red-600" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Start Your Recovery?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Book an appointment today and take the first step towards better health
                </p>
                <button className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
                  Book Appointment Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;