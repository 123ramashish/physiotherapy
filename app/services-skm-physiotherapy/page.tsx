'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Heart,
  Users,
  Zap,
  Target,
  Baby,
  CheckCircle2,
  Sparkles,
  Clock,
  Home,
  Award,
  Shield,
  Calendar,
  Phone,
  Star,
  ChevronRight,
  MapPin,
  Stethoscope,
  Brain,
  Bone,
  Wind,
  Dumbbell,
  Syringe,
  Waves,
  PersonStanding,
  ArrowRight,
  Building2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

// ─── Branch data ────────────────────────────────────────────────────────────
const branches = [
  {
    id: 1,
    name: 'Branch 1 – Main Centre',
    address: '123 MG Road, Sector 14, Gurugram, Haryana',
    phone: '7982799147',
    timing: 'Mon–Sat: 9 AM – 8 PM',
    mapLink: '#'
  },
  {
    id: 2,
    name: 'Branch 2 – South Extension',
    address: '45 South Ex Road, Sector 45, Gurugram, Haryana',
    phone: '7982799148',
    timing: 'Mon–Sat: 9 AM – 8 PM',
    mapLink: '#'
  },
  {
    id: 3,
    name: 'Branch 3 – DLF Phase',
    address: '78 Cyber Hub, DLF Phase 2, Gurugram, Haryana',
    phone: '7982799149',
    timing: 'Mon–Sat: 9 AM – 8 PM',
    mapLink: '#'
  }
];

// ─── Service image backgrounds (Unsplash free) ──────────────────────────────
const serviceImages = [
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', // cupping
  'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80', // dry needling / acupuncture
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', // back pain
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80', // neck / spine
  'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=600&q=80', // knee pain
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', // arthritis
  'https://images.unsplash.com/photo-1598901865264-4f54e0c2a11c?w=600&q=80', // heel / foot
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', // bell's palsy / neuro
  'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600&q=80', // sciatica / sports
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80', // sports injuries
  'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80', // relaxation
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', // post covid
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&q=80', // frozen shoulder
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80', // paralysis rehab
  'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=600&q=80', // taping
];

// ─── Services from the image ─────────────────────────────────────────────────
const services = [
  {
    icon: Waves,
    title: 'Cupping & Hijama',
    hindiTitle: 'कपिंग व हिजामा',
    description: 'Traditional cupping therapy and Hijama for deep tissue relief, improved blood flow, and detoxification.',
    accent: 'from-emerald-500 to-teal-600',
    badge: 'Traditional',
    img: serviceImages[0],
    href: '/services/cupping-hijama',
  },
  {
    icon: Syringe,
    title: 'Dry Needling',
    hindiTitle: 'ड्राई निडलिंग',
    description: 'Precision dry needling therapy targeting trigger points to relieve chronic muscle pain and tension.',
    accent: 'from-blue-500 to-indigo-600',
    badge: 'Advanced',
    img: serviceImages[1],
    href: '/services/dry-needling',
  },
  {
    icon: Activity,
    title: 'Back Pain',
    hindiTitle: 'कमर दर्द',
    description: 'Comprehensive treatment for acute and chronic back pain using manual therapy and therapeutic exercises.',
    accent: 'from-teal-500 to-cyan-600',
    badge: 'Popular',
    img: serviceImages[2],
    href: '/services/back-pain',
  },
  {
    icon: PersonStanding,
    title: 'Neck Pain',
    hindiTitle: 'गर्दन दर्द',
    description: 'Specialized cervical spine therapy, postural correction, and mobilization for neck pain relief.',
    accent: 'from-indigo-500 to-blue-600',
    badge: 'Popular',
    img: serviceImages[3],
    href: '/services/neck-pain',
  },
  {
    icon: Bone,
    title: 'Knee Pain',
    hindiTitle: 'घुटनों का दर्द',
    description: 'Expert knee rehabilitation including strengthening, bracing, and biomechanical correction programs.',
    accent: 'from-green-500 to-emerald-600',
    badge: 'Popular',
    img: serviceImages[4],
    href: '/services/knee-pain',
  },
  {
    icon: Stethoscope,
    title: 'Arthritis',
    hindiTitle: 'गठिया, बाय',
    description: 'Holistic arthritis management reducing inflammation, improving joint mobility, and enhancing quality of life.',
    accent: 'from-blue-600 to-indigo-700',
    badge: null,
    img: serviceImages[5],
    href: '/services/arthritis',
  },
  {
    icon: Activity,
    title: 'Heel Pain',
    hindiTitle: 'एड़ी का दर्द',
    description: 'Plantar fasciitis and heel spur treatment through targeted therapy, orthotics, and exercise programs.',
    accent: 'from-teal-600 to-green-600',
    badge: null,
    img: serviceImages[6],
    href: '/services/heel-pain',
  },
  {
    icon: Brain,
    title: "Bell's Palsy",
    hindiTitle: 'चेहरे का लकवा',
    description: 'Neuro-rehabilitation for facial palsy including electrical stimulation, massage, and facial exercises.',
    accent: 'from-indigo-600 to-blue-700',
    badge: 'Specialized',
    img: serviceImages[7],
    href: '/services/bells-palsy',
  },
  {
    icon: Zap,
    title: 'Sciatica Pain',
    hindiTitle: 'साइटिका',
    description: 'Sciatica nerve pain relief through decompression, neural mobilization, and core strengthening protocols.',
    accent: 'from-emerald-600 to-teal-700',
    badge: 'Popular',
    img: serviceImages[8],
    href: '/services/sciatica',
  },
  {
    icon: Dumbbell,
    title: 'Sports Injuries',
    hindiTitle: 'खेल कूद की चोटें',
    description: 'Rapid sports injury rehabilitation with performance optimization for a safe return to sport.',
    accent: 'from-blue-500 to-teal-600',
    badge: 'Most Popular',
    img: serviceImages[9],
    href: '/services/sports-injuries',
  },
  {
    icon: Heart,
    title: 'Soreness & Relaxation',
    hindiTitle: 'सूजन की परेशानी',
    description: 'Therapeutic relaxation techniques, soft tissue therapy, and recovery protocols to ease soreness.',
    accent: 'from-green-500 to-indigo-500',
    badge: null,
    img: serviceImages[10],
    href: '/services/relaxation',
  },
  {
    icon: Wind,
    title: 'Post COVID Rehab',
    hindiTitle: 'पोस्ट कोविड रिहैब',
    description: 'Specialised post-COVID rehabilitation for breathlessness, fatigue, and musculoskeletal recovery.',
    accent: 'from-teal-500 to-blue-500',
    badge: 'Specialized',
    img: serviceImages[11],
    href: '/services/post-covid',
  },
  {
    icon: Activity,
    title: 'Taping',
    hindiTitle: 'टेपिंग',
    description: 'Kinesiology taping for joint support, muscle facilitation, and injury prevention.',
    accent: 'from-blue-400 to-indigo-500',
    badge: 'New',
    img: serviceImages[14],
    href: '/services/taping',
  },
  {
    icon: Target,
    title: 'Frozen Shoulder',
    hindiTitle: 'कंधे की जकड़न',
    description: 'Adhesive capsulitis treatment with joint mobilization, stretching, and progressive shoulder rehabilitation.',
    accent: 'from-indigo-500 to-green-500',
    badge: null,
    img: serviceImages[12],
    href: '/services/frozen-shoulder',
  },
  {
    icon: Users,
    title: 'Paralysis (Stroke)',
    hindiTitle: 'लकवा',
    description: 'Comprehensive neuro-rehabilitation for stroke and paralysis recovery, rebuilding strength and independence.',
    accent: 'from-blue-600 to-emerald-600',
    badge: 'Specialized',
    img: serviceImages[13],
    href: '/services/paralysis',
  },
  {
    icon: Building2,
    title: 'Corporate Wellness',
    hindiTitle: 'कॉर्पोरेट वेलनेस',
    description: 'Ergonomic assessments and wellness programs designed for corporate employees to prevent workplace injuries.',
    accent: 'from-blue-700 to-indigo-800',
    badge: 'Corporate',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    href: '/services/corporate-wellness',
  },
];


// ─── Component ────────────────────────────────────────────────────────────────
const ServicesPage = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, index]));
            observer.unobserve(ref);
          }
        },
        { threshold: 0.08, rootMargin: '60px' }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleBook = () => router.push('/contact');

  return (
    <>
      <Head>
        <title>SKM Physiotherapy & Rehabilitation Centre | Services</title>
        <meta name="description" content="SKM Physiotherapy & Rehabilitation Centre offers cupping, dry needling, back pain, sports injuries, paralysis rehab and much more across multiple branches in Gurugram." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');

        * { box-sizing: border-box; }

        body { font-family: 'Outfit', sans-serif; }

        .skm-hero-text { font-family: 'Playfair Display', serif; }

        .card-appear {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .card-appear.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease;
          border: 1px solid #e2e8f0;
          background: #fff;
        }
        .service-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 48px rgba(0,0,0,0.15);
        }
        .service-card .card-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.18;
          transition: opacity 0.4s ease;
        }
        .service-card:hover .card-img {
          opacity: 0.28;
        }
        .service-card .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.97) 55%, rgba(255,255,255,0.7) 100%);
        }
        .service-card:hover .card-overlay {
          background: linear-gradient(135deg, rgba(255,255,255,0.93) 40%, rgba(255,255,255,0.55) 100%);
        }

        .branch-tab {
          transition: all 0.25s ease;
          cursor: pointer;
          border-radius: 12px;
          padding: 10px 20px;
          font-weight: 600;
          font-size: 0.85rem;
          border: 2px solid transparent;
        }
        .branch-tab.active {
          background: linear-gradient(135deg, #059669, #3b82f6);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(59,130,246,0.3);
        }
        .branch-tab:not(.active) {
          background: #f0fdf4;
          color: #047857;
          border-color: #a7f3d0;
        }
        .branch-tab:not(.active):hover {
          background: #dcfce7;
          border-color: #6ee7b7;
        }

        .gradient-text {
          background: linear-gradient(135deg, #059669 0%, #3b82f6 50%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 18px 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          border: 1px solid #e2e8f0;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.11); }

        .hero-bg-pattern {
          background-image: radial-gradient(circle at 20% 20%, rgba(16,185,129,0.07) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(99,102,241,0.07) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 60%);
        }

        .section-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #10b981, #3b82f6, #6366f1, transparent);
          margin: 0 auto;
          width: 120px;
          border-radius: 2px;
        }

        @media (max-width: 640px) {
          .skm-heading { font-size: 2rem !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Outfit', sans-serif" }}>

        {/* ── Hero ── */}
        <section className="hero-bg-pattern" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>

            {/* Pill badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#ecfdf5,#eff6ff)', border: '1px solid #a7f3d0', borderRadius: '50px', padding: '8px 20px', marginBottom: '1.5rem', boxShadow: '0 2px 12px rgba(16,185,129,0.15)' }}>
              <Sparkles size={16} color="#059669" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#047857', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Multi-Branch Physiotherapy Excellence</span>
            </div>

            {/* Clinic Name */}
            <h1 className="skm-hero-text skm-heading" style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: '0.5rem' }}>
              SKM Physiotherapy
            </h1>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.06em' }}>
              <span className="gradient-text">&amp; REHABILITATION CENTRE</span>
            </h2>
            <div className="section-divider" style={{ marginBottom: '1.5rem' }}></div>

            <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Comprehensive physiotherapy and rehabilitation care across <strong>3 branches</strong> in Gurugram. Expert treatment for pain relief, sports injuries, neuro-rehab, and more.
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
              {[
                { n: '14+', l: 'Services Offered', color: '#059669' },
                { n: '3', l: 'Branches', color: '#3b82f6' },
                { n: '1000+', l: 'Patients Treated', color: '#6366f1' },
                { n: '98%', l: 'Satisfaction Rate', color: '#0891b2' },
                { n: '24/7', l: 'Emergency Care', color: '#047857' },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleBook}
                style={{ background: 'linear-gradient(135deg,#059669,#3b82f6)', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 32px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(59,130,246,0.35)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Outfit',sans-serif" }}
              >
                <Phone size={16} /> Book Appointment
              </button>
              <a
                href={`tel:7982799147`}
                style={{ background: '#fff', color: '#059669', border: '2px solid #059669', borderRadius: '50px', padding: '14px 32px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <Phone size={16} /> 7982799147
              </a>
            </div>
          </div>
        </section>

        {/* ── Branch Selector ── */}
        <section style={{ background: '#f0fdf4', borderTop: '1px solid #d1fae5', borderBottom: '1px solid #d1fae5', padding: '2.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Our <span className="gradient-text">Branches</span></h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Select a branch for location &amp; contact details</p>
            </div>

            {/* Branch Tabs */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {branches.map((b, i) => (
                <button
                  key={b.id}
                  className={`branch-tab ${selectedBranch === i ? 'active' : ''}`}
                  onClick={() => setSelectedBranch(i)}
                  style={{ fontFamily: "'Outfit',sans-serif" }}
                >
                  {b.name}
                </button>
              ))}
            </div>

            {/* Branch Detail Card */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #a7f3d0', padding: '1.5rem 2rem', maxWidth: '700px', margin: '0 auto', boxShadow: '0 4px 20px rgba(16,185,129,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem' }}>
              {[
                { icon: <MapPin size={18} color="#059669" />, label: 'Address', value: branches[selectedBranch].address },
                { icon: <Phone size={18} color="#3b82f6" />, label: 'Contact', value: branches[selectedBranch].phone },
                { icon: <Clock size={18} color="#6366f1" />, label: 'Timings', value: branches[selectedBranch].timing },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '2px' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Our <span className="gradient-text">Specialized Services</span>
              </h2>
              <div className="section-divider" style={{ marginBottom: '1rem' }}></div>
              <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Evidence-based physiotherapy treatments in Hindi &amp; English — available at all branches.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {services.map((service, index) => {
                const isVisible = visibleCards.has(index);
                return (
                  <article
                    key={index}
                    ref={(el: any) => (cardRefs.current[index] = el)}
                    className={`service-card card-appear ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${(index % 4) * 80}ms`, minHeight: '300px' }}
                    onClick={() => router.push(service.href)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${service.title}`}
                    onKeyDown={e => e.key === 'Enter' && router.push(service.href)}
                  >
                    {/* BG Image */}
                    <div className="card-img" style={{ backgroundImage: `url(${service.img})` }} />
                    <div className="card-overlay" />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1, padding: '1.5rem' }}>
                      {/* Badge */}
                      {service.badge && (
                        <span style={{ display: 'inline-block', background: `linear-gradient(135deg, ${service.accent.includes('emerald') ? '#059669' : service.accent.includes('indigo') ? '#6366f1' : '#3b82f6'}, ${service.accent.includes('teal') ? '#0d9488' : '#4f46e5'})`, color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                          {service.badge}
                        </span>
                      )}

                      {/* Icon */}
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg, ${service.accent.includes('emerald') || service.accent.includes('teal') || service.accent.includes('green') ? '#d1fae5' : service.accent.includes('indigo') ? '#e0e7ff' : '#dbeafe'}, #fff)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <service.icon size={22} color={service.accent.includes('emerald') || service.accent.includes('teal') || service.accent.includes('green') ? '#059669' : service.accent.includes('indigo') ? '#6366f1' : '#3b82f6'} />
                      </div>

                      {/* Title */}
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '2px', lineHeight: 1.25 }}>{service.title}</h3>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: service.accent.includes('emerald') || service.accent.includes('teal') ? '#059669' : service.accent.includes('indigo') ? '#6366f1' : '#3b82f6', marginBottom: '0.75rem' }}>{service.hindiTitle}</p>

                      {/* Description */}
                      <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.65, marginBottom: '1.25rem' }}>{service.description}</p>

                      {/* Book Button */}
                      <button
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: `2px solid ${service.accent.includes('emerald') || service.accent.includes('teal') || service.accent.includes('green') ? '#059669' : service.accent.includes('indigo') ? '#6366f1' : '#3b82f6'}`, color: service.accent.includes('emerald') || service.accent.includes('teal') || service.accent.includes('green') ? '#059669' : service.accent.includes('indigo') ? '#6366f1' : '#3b82f6', borderRadius: '30px', padding: '8px 18px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", transition: 'all 0.2s ease' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = service.accent.includes('emerald') || service.accent.includes('teal') || service.accent.includes('green') ? '#059669' : service.accent.includes('indigo') ? '#6366f1' : '#3b82f6'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = service.accent.includes('emerald') || service.accent.includes('teal') || service.accent.includes('green') ? '#059669' : service.accent.includes('indigo') ? '#6366f1' : '#3b82f6'; }}
                        onClick={e => { e.stopPropagation(); handleBook(); }}
                      >
                        Book Now <ChevronRight size={14} />
                      </button>
                    </div>

                    {/* Bottom gradient bar */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${service.accent.includes('emerald') ? '#059669' : service.accent.includes('blue') ? '#3b82f6' : '#6366f1'}, ${service.accent.includes('teal') ? '#0d9488' : service.accent.includes('indigo') ? '#6366f1' : '#059669'})` }} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>




      </div>
    </>
  );
};

export default ServicesPage;