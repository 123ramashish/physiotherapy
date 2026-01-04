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
  Sparkles,
  Clock,
  Home,
  Award,
  Shield,
  Calendar,
  Phone,
  Star,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const ServicesPage = () => {
  const [visibleCards, setVisibleCards] = useState<any>([]);
  const cardRefs = useRef<any>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observers = cardRefs.current.map((ref: any, index: any) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev: any) => [...new Set([...prev, index])]);
              observer.unobserve(ref);
            }
          });
        },
        { 
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      observer.observe(ref);
      return observer;
    }).filter(Boolean);

    return () => observers.forEach((observer: IntersectionObserver) => observer.disconnect());
  }, []);

  const services = [
    {
      icon: Activity,
      title: 'Sports Injury Rehabilitation',
      description: 'Specialized treatment for athletic injuries, performance enhancement, and quick return to sports',
      color: 'from-red-50 to-orange-50',
      iconBg: 'bg-gradient-to-br from-red-100 to-orange-100',
      iconColor: 'text-red-600',
      features: ['Quick recovery protocols', 'Performance optimization', 'Injury prevention strategies', 'Sport-specific training'],
      duration: '45-60 min sessions',
      popular: true
    },
    {
      icon: Heart,
      title: 'Manual Therapy',
      description: 'Advanced hands-on techniques for pain relief, improved mobility, and tissue healing',
      color: 'from-pink-50 to-rose-50',
      iconBg: 'bg-gradient-to-br from-pink-100 to-rose-100',
      iconColor: 'text-pink-600',
      features: ['Pain management techniques', 'Joint mobilization', 'Soft tissue manipulation', 'Myofascial release'],
      duration: '30-45 min sessions',
      popular: false
    },
    {
      icon: Target,
      title: 'Post-Surgical Rehabilitation',
      description: 'Comprehensive recovery programs for post-surgery healing and functional restoration',
      color: 'from-purple-50 to-violet-50',
      iconBg: 'bg-gradient-to-br from-purple-100 to-violet-100',
      iconColor: 'text-purple-600',
      features: ['Post-surgery care plans', 'Scar tissue management', 'Strength & mobility restoration', 'Functional training'],
      duration: '60 min sessions',
      popular: true
    },
    {
      icon: Zap,
      title: 'Chronic Pain Management',
      description: 'Holistic approach to managing long-term pain and improving quality of life',
      color: 'from-amber-50 to-orange-50',
      iconBg: 'bg-gradient-to-br from-amber-100 to-orange-100',
      iconColor: 'text-amber-600',
      features: ['Pain neuroscience education', 'Lifestyle modification coaching', 'Exercise therapy', 'Mind-body techniques'],
      duration: 'Custom plans',
      popular: false
    },
    {
      icon: Users,
      title: 'Orthopedic Physical Therapy',
      description: 'Expert treatment for musculoskeletal conditions, joint disorders, and movement dysfunctions',
      color: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      iconColor: 'text-blue-600',
      features: ['Joint preservation techniques', 'Osteoarthritis management', 'Postural correction', 'Movement analysis'],
      duration: '45-60 min sessions',
      popular: true
    },
    {
      icon: Baby,
      title: 'Pediatric Physiotherapy',
      description: 'Specialized care for children with developmental delays and physical challenges',
      color: 'from-emerald-50 to-green-50',
      iconBg: 'bg-gradient-to-br from-emerald-100 to-green-100',
      iconColor: 'text-emerald-600',
      features: ['Developmental assessment', 'Play-based therapy', 'Family education & support', 'School integration'],
      duration: '30-45 min sessions',
      popular: false
    }
  ];

  const handleBookAppointment = () => {
    router.push('/contact?service=consultation');
  };

  const handleServiceClick = (serviceTitle: string) => {
    router.push(`/contact?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <>
      {/* SEO Structured Data */}
      <Head>
        <title>Physiotherapy Services | Sports Injury, Manual Therapy & Rehabilitation</title>
        <meta name="description" content="Expert physiotherapy services including sports injury rehabilitation, manual therapy, post-surgical rehab, chronic pain management, orthopedic care, and pediatric therapy. Book your appointment today." />
        <meta name="keywords" content="sports injury rehabilitation, manual therapy, physiotherapy services, chronic pain management, orthopedic physical therapy, pediatric physiotherapy, post-surgical rehab" />
        <meta property="og:title" content="Comprehensive Physiotherapy Services | Expert Care" />
        <meta property="og:description" content="Discover our specialized physiotherapy services tailored to your recovery needs. From sports injuries to chronic pain management." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourclinic.com/services" />
      </Head>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Physiotherapy & Chiropractic Clinic",
            "description": "Comprehensive physiotherapy and chiropractic services",
            "medicalSpecialty": "Physiotherapy, Chiropractic",
            "offers": services.map(service => ({
              "@type": "Service",
              "name": service.title,
              "description": service.description
            })),
            "areaServed": {
              "@type": "City",
              "name": "Your City"
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-rose-50/30">
        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden" aria-label="Our Services Introduction">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-red-200/40 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-200/40 rounded-full mix-blend-multiply blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-pink-200/40 rounded-full mix-blend-multiply blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg mb-6 sm:mb-8 animate-bounce-sm" role="note">
              <Sparkles className="text-red-600 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800">Premium Healthcare Services</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Expert <span className="text-red-600 relative inline-block">
                Physiotherapy
                <svg className="absolute -bottom-2 left-0 w-full h-2" aria-hidden="true">
                  <path d="M0 2Q100 6 200 2" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span> Services
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Comprehensive, evidence-based physiotherapy and chiropractic services tailored to your individual recovery goals and lifestyle needs.
            </p>

            {/* Stats Bar */}
            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
              {[
                { number: '6+', label: 'Specialized Services', icon: Award },
                { number: '5000+', label: 'Patients Treated', icon: Users },
                { number: '15+', label: 'Years Experience', icon: Calendar },
                { number: '98%', label: 'Patient Satisfaction', icon: Star },
                { number: '24/7', label: 'Support', icon: Shield }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  role="region"
                  aria-label={`${stat.number} ${stat.label}`}
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mx-auto mb-2" aria-hidden="true" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24" aria-label="Our Services">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Our <span className="text-red-600">Specialized</span> Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                Each service is tailored to meet specific patient needs with evidence-based approaches
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <article
                  key={index}
                  ref={(el: any) => (cardRefs.current[index] = el)}
                  className={`group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 
                    ${visibleCards.includes(index) || hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    ${activeService === index ? 'ring-2 ring-red-500/30' : ''}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleServiceClick(service.title)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${service.title}`}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Card Content */}
                  <div className="relative p-5 sm:p-6 md:p-8">
                    {/* Icon & Duration */}
                    <div className="mb-5 sm:mb-6 relative flex items-start justify-between">
                      <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${service.iconBg} rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-500`}>
                        <service.icon className={`${service.iconColor} w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10`} aria-hidden="true" />
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                        <Clock className="inline w-3 h-3 mr-1" />
                        {service.duration}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                          <CheckCircle2 className="text-red-500 flex-shrink-0 mt-0.5 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-4 rounded-xl font-medium group-hover:from-red-600 group-hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.title);
                      }}
                      aria-label={`Book ${service.title} service`}
                    >
                      <span>Book Service</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-red-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white/80 backdrop-blur-sm" aria-label="Why Choose Us">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Why Choose <span className="text-red-600">Our Clinic</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                We combine expertise, technology, and compassion for optimal patient outcomes
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {[
                { 
                  icon: Target, 
                  title: 'Personalized Treatment Plans', 
                  desc: 'Customized recovery programs based on individual assessment and goals',
                  color: 'from-red-100 to-pink-100'
                },
                { 
                  icon: Award, 
                  title: 'Certified Experts', 
                  desc: 'All therapists are licensed professionals with specialized training',
                  color: 'from-blue-100 to-cyan-100'
                },
                { 
                  icon: Zap, 
                  title: 'Advanced Technology', 
                  desc: 'Latest equipment and evidence-based treatment modalities',
                  color: 'from-amber-100 to-orange-100'
                },
                { 
                  icon: Heart, 
                  title: 'Holistic Approach', 
                  desc: 'Comprehensive care addressing physical, emotional, and lifestyle factors',
                  color: 'from-emerald-100 to-green-100'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-5 sm:p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100"
                  role="article"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${item.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-gray-800 w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Home Visits Banner */}
        <section 
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          aria-label="Home Visits Service"
        >
          <div className="bg-gradient-to-r from-pink-500 via-rose-600 to-red-500 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full -mr-20 -mt-20 sm:-mr-32 sm:-mt-32"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full -ml-16 -mb-16 sm:-ml-24 sm:-mb-24"></div>

            <div className="relative z-10 text-center">
              <Home className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 animate-bounce-sm" aria-hidden="true" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                CONVENIENT HOME VISITS AVAILABLE
              </h2>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-5 sm:px-6 py-2.5 sm:py-3 rounded-full mb-6 sm:mb-8">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="text-sm sm:text-base font-semibold">Flexible Scheduling • 24/7 Emergency Service</span>
              </div>
              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                Receive expert physiotherapy care in the comfort of your home. Perfect for post-surgical patients, elderly clients, and those with mobility challenges.
              </p>
              <button
                onClick={handleBookAppointment}
                className="bg-white text-red-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                aria-label="Book Home Visit Service"
              >
                <Phone className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Schedule Home Visit
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20" aria-label="Call to Action">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

              <div className="relative text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Start Your Journey to Recovery Today
                </h2>
                <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Take the first step towards pain-free living. Our expert team is ready to create a personalized treatment plan for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleBookAppointment}
                    className="bg-white text-red-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                    aria-label="Book Appointment Now"
                  >
                    Book Your First Appointment
                  </button>
                  <button
                    onClick={() => router.push('/contact')}
                    className="bg-transparent border-2 border-white text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Contact Us for Consultation"
                  >
                    Free Consultation
                  </button>
                </div>
                <p className="text-white/70 text-xs sm:text-sm mt-6">
                  <Calendar className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Same-day appointments available • Insurance accepted
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Snapshot */}
        <section className="py-12 sm:py-16 bg-gray-50" aria-label="Patient Testimonials">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mx-auto mb-4" aria-hidden="true" />
              <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-700 italic mb-6">
                "The personalized care and expertise at this clinic transformed my recovery journey. I'm back to my active lifestyle!"
              </blockquote>
              <div className="text-gray-600 text-sm sm:text-base">
                <span className="font-semibold">Sarah M.</span> • Sports Injury Patient • 5-star review
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes bounce-sm {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-sm {
          animation: bounce-sm 2s infinite;
        }
      `}</style>
    </>
  );
};

export default ServicesPage;