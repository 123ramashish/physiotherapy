'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Phone, Mail, Clock, CheckCircle2, Star, ChevronRight,
  ChevronDown, Award, Shield, Home, Calendar, ArrowRight,
  MessageCircle, Camera, Building2, Navigation, CreditCard,
  Languages, BadgeCheck, ExternalLink, X, Stethoscope, Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ── Static Data ───────────────────────────────────────────────
const ACC = '#3b82f6'; // Blue for Noida branches
const ACC_LIGHT = '#eff6ff';
const ACC_MID = '#60a5fa';
const RGB = '59,130,246';

const BRANCH = {
  name: 'SKM Physiotherapy — Greater Noida',
  location: 'Swaran Nagari, Greater Noida',
  tagline: 'Expert clinical care serving Greater Noida residents',
  address: 'D-Block, D-3, Near Krishna Hospital, Swarn Nagari',
  city: 'Greater Noida, Uttar Pradesh — 201315',
  phone: '7982799147',
  whatsapp: '917982799147',
  email: 'noida@skmphysio.in',
  established: '2020',
  timings: { weekdays: '9:00 AM – 8:00 PM', saturday: '9:00 AM – 7:00 PM', sunday: '10:00 AM – 2:00 PM' },
  landmarks: ['Near Krishna Hospital', 'Swaran Nagari D-Block', '5 min from Pari Chowk'],
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.3574263498254!2d77.5141583!3d28.4594919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19408e0000bb%3A0xa1f24ee6dfbdc38b!2sSwarn%20Nagari%2C%20Greater%20Noida!5e0!3m2!1sen!2sin!4v1620000000000',
  mapLink: 'https://maps.app.goo.gl/Us4jVhy8foKxxawE7',
  stats: [{ n: '14+', l: 'Services' }, { n: '2', l: 'Doctors' }, { n: '2020', l: 'Est.' }, { n: '4.9★', l: 'Rating' }, { n: '500+', l: 'Patients' }],
  services: [
    'Cupping & Hijama', 'Dry Needling', 'Back Pain Treatment', 'Neck Pain Therapy',
    'Knee Pain Rehabilitation', 'Arthritis Management', 'Heel Pain', "Bell's Palsy",
    'Sciatica Pain', 'Sports Injuries', 'Post COVID Rehab', 'Frozen Shoulder',
    'Paralysis (Stroke) Rehab', 'Soreness & Relaxation',
  ],
  doctors: [
    {
      name: 'Dr. Sachin Kumar Malik',
      designation: 'Chief Physiotherapist & Director',
      experience: '12+ Years',
      qualifications: ['BPT', 'MPT — Orthopaedics', 'Certified Dry Needling Practitioner'],
      specializations: ['Orthopaedic Physiotherapy', 'Sports Rehabilitation', 'Dry Needling', 'Hijama Therapy'],
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80',
      regNo: 'HR-PT-2012-0047',
      languages: ['Hindi', 'English', 'Punjabi'],
    },
    {
      name: 'Dr. Anjali Verma',
      designation: 'Senior Physiotherapist',
      experience: '6+ Years',
      qualifications: ['BPT', 'MPT — Neurological'],
      specializations: ['Neuro-Rehab', 'Post-Stroke Therapy', 'Women\'s Health'],
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80',
      regNo: 'UP-PT-2018-0512',
      languages: ['Hindi', 'English'],
    },
  ],
  clinicPhotos: [
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', caption: 'Modern Reception' },
    { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', caption: 'Therapy Room' },
    { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', caption: 'Equipped Gym' },
  ],
  amenities: ['Private Consultations', 'Home Visit Service', 'Digital Patient Records', 'Latest Electrotherapy', 'Waiting Area', 'Air Conditioned'],
  payment: ['Cash', 'UPI', 'Debit / Credit Card'],
  faqs: [
    { q: 'Where is the Swaran Nagari branch located?', a: 'D-Block, D-3, Near Krishna Hospital, Swarn Nagari, Greater Noida, UP 201315. Landmarks: Near Pari Chowk.' },
    { q: 'What are the clinic timings?', a: 'Weekdays: 9:00 AM – 8:00 PM | Saturday: 9:00 AM – 7:00 PM | Sunday: 10:00 AM – 2:00 PM.' },
    { q: 'Do you offer home visits in Greater Noida?', a: 'Yes! Our Greater Noida team provides professional home-visit physiotherapy services.' },
  ],
  otherBranches: [
    { name: 'Sector 134', location: 'Sector 134, Noida', phone: '9876543210', href: '/branches/noida-sector-134', color: '#10b981' },
    { name: 'Gurugram Main', location: 'Sector 14, Gurugram', phone: '7982799147', href: '/branches/gurugram-sector-14', color: '#059669' },
  ],
};

// ── Page Component ────────────────────────────────────────────
export default function SwaranNagariPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    Object.entries(refs.current).forEach(([k, el]) => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(p => new Set([...p, k])); o.unobserve(el); } }, { threshold: 0.08, rootMargin: '60px' });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const ref = (k: string) => (el: any) => { refs.current[k] = el; };
  const vis = (k: string) => visible.has(k);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@700;800&display=swap');
        .bp1 { font-family: 'DM Sans', sans-serif; background: #fff; }
        .bp1-display { font-family: 'Cormorant Garamond', serif; }
        .bp1 .rv { opacity:0; transform:translateY(30px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .bp1 .rv.in { opacity:1; transform:translateY(0); }
        .bp1 .doc-card { border-radius:20px; border:1px solid #e2e8f0; overflow:hidden; background:#fff; transition:transform 0.3s,box-shadow 0.3s; }
        .bp1 .doc-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(${RGB},0.18); }
        .bp1 .spill { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border-radius:50px; background:${ACC_LIGHT}; color:${ACC}; font-size:0.81rem; font-weight:600; border:1px solid ${ACC}33; transition:all 0.2s; cursor:default; }
        .bp1 .spill:hover { background:${ACC}; color:#fff; transform:scale(1.03); }
        .bp1 .faq-btn { width:100%; text-align:left; background:none; border:none; padding:18px 20px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-family:'DM Sans',sans-serif; font-weight:700; font-size:0.95rem; color:#0f172a; }
        .bp1 .faq-btn:hover { background:${ACC_LIGHT}; }
        .bp1 .photo-wrap { border-radius:14px; overflow:hidden; cursor:pointer; position:relative; aspect-ratio:4/3; }
        .bp1 .photo-wrap img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
        .bp1 .photo-wrap:hover img { transform:scale(1.07); }
        .bp1 .photo-wrap .pov { position:absolute; inset:0; background:rgba(0,0,0,0); transition:background 0.3s; display:flex; align-items:center; justify-content:center; }
        .bp1 .photo-wrap:hover .pov { background:rgba(0,0,0,0.32); }
        .bp1 .photo-wrap .pov svg { opacity:0; color:#fff; transition:opacity 0.3s; }
        .bp1 .photo-wrap:hover .pov svg { opacity:1; }
        .bp1 .qcard { background:#fff; border-radius:14px; padding:18px 20px; border:1px solid #e2e8f0; display:flex; gap:14px; align-items:flex-start; box-shadow:0 2px 10px rgba(0,0,0,0.04); transition:transform 0.25s,box-shadow 0.25s; }
        .bp1 .qcard:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(${RGB},0.12); }
        .bp1 .ob-card { background:#fff; border-radius:14px; padding:18px 20px; border:2px solid #e2e8f0; cursor:pointer; transition:all 0.25s; }
        .bp1 .sdiv { height:3px; width:70px; background:linear-gradient(90deg,${ACC},${ACC_MID}); border-radius:2px; margin:10px 0 22px; }
      `}</style>

      <div className="bp1">

        {/* Breadcrumb */}
        <nav style={{ background: ACC_LIGHT, borderBottom: `1px solid ${ACC}22`, padding: '11px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.8rem', flexWrap: 'wrap' }}>
            {[['Home', '/'], ['Branches', '/branches'], ['Swaran Nagari, Greater Noida', null]].map(([l, h], i, a) => (
              <React.Fragment key={i}>
                {h ? <a href={h as string} style={{ color: ACC, fontWeight: 700, textDecoration: 'none' }}>{l}</a>
                  : <span style={{ color: '#64748b', fontWeight: 500 }}>{l}</span>}
                {i < a.length - 1 && <ChevronRight size={12} color="#94a3b8" />}
              </React.Fragment>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section style={{ background: `linear-gradient(135deg, rgba(${RGB},0.05) 0%, #fff 60%)`, padding: '4rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 340, height: 340, background: `rgba(${RGB},0.06)`, borderRadius: '50%' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ACC_LIGHT, border: `1px solid ${ACC}44`, borderRadius: 50, padding: '6px 16px', marginBottom: '1.25rem' }}>
                <Building2 size={14} color={ACC} /><span style={{ fontSize: '0.72rem', fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Greater Noida · Est. {BRANCH.established}</span>
              </div>
              <h1 className="bp1-display" style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                SKM Physiotherapy<br /><span style={{ color: ACC }}>Greater Noida</span>
              </h1>
              <p style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b', marginBottom: '1.25rem' }}>{BRANCH.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '0.75rem' }}>
                <MapPin size={16} color={ACC} style={{ marginTop: 3, flexShrink: 0 }} />
                <div><p style={{ color: '#374151', fontWeight: 600, fontSize: '0.92rem' }}>{BRANCH.address}</p><p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{BRANCH.city}</p></div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '2rem' }}>
                {BRANCH.landmarks.map((l, i) => <span key={i} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.73rem', fontWeight: 500, padding: '4px 10px', borderRadius: 20, border: '1px solid #e2e8f0' }}>📍 {l}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => router.push('/contact')} style={{ background: `linear-gradient(135deg,${ACC},${ACC_MID})`, color: '#fff', border: 'none', borderRadius: 50, padding: '12px 24px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: `0 6px 20px rgba(${RGB},0.4)`, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Calendar size={14} /> Book Appointment
                </button>
                <a href={`tel:${BRANCH.phone}`} style={{ background: '#fff', color: ACC, border: `2px solid ${ACC}`, borderRadius: 50, padding: '10px 18px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={14} /> {BRANCH.phone}
                </a>
              </div>
            </div>

            {/* Quick Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <Clock size={18} color={ACC} />, label: 'Weekdays', val: BRANCH.timings.weekdays },
                { icon: <Clock size={18} color={ACC_MID} />, label: 'Saturday', val: BRANCH.timings.saturday },
                { icon: <Mail size={18} color={ACC} />, label: 'Email', val: BRANCH.email },
                { icon: <CreditCard size={18} color={ACC} />, label: 'Payment', val: 'Cash · UPI · Card' },
              ].map((item, i) => (
                <div className="qcard" key={i}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: ACC_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <div><p style={{ fontSize: '0.67rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</p><p style={{ fontSize: '0.86rem', fontWeight: 600, color: '#1e293b', marginTop: 2 }}>{item.val}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <div style={{ background: `linear-gradient(135deg,${ACC},${ACC_MID})`, padding: '1.25rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))', gap: 8, textAlign: 'center' }}>
            {BRANCH.stats.map((s, i) => (
              <div key={i}><div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.n}</div><div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.82)', marginTop: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div></div>
            ))}
          </div>
        </div>

        {/* Doctors */}
        <section ref={ref('doc')} className={`rv ${vis('doc') ? 'in' : ''}`} style={{ padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Meet The Team</p>
            <h2 className="bp1-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>Our Expert Doctors</h2>
            <div className="sdiv" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 24 }}>
              {BRANCH.doctors.map((d, i) => (
                <div className="doc-card" key={i}>
                  <div style={{ position: 'relative', height: 270, overflow: 'hidden' }}>
                    <img src={d.photo} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%,rgba(0,0,0,0.72))' }} />
                    <div style={{ position: 'absolute', top: 12, right: 12, background: ACC, color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700 }}>{d.experience}</div>
                    <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
                      <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2, marginBottom: 2 }}>{d.name}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.77rem' }}>{d.designation}</p>
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem 1.5rem' }}>
                    <p style={{ fontSize: '0.67rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Qualifications</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                      {d.qualifications.map((q, qi) => <span key={qi} style={{ background: ACC_LIGHT, color: ACC, fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20, border: `1px solid ${ACC}33` }}>{q}</span>)}
                    </div>
                    <p style={{ fontSize: '0.67rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Specializations</p>
                    {d.specializations.map((s, si) => (
                      <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <CheckCircle2 size={13} color={ACC} /><span style={{ fontSize: '0.82rem', color: '#374151', fontWeight: 500 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section ref={ref('svc')} className={`rv ${vis('svc') ? 'in' : ''}`} style={{ background: '#f8fafc', padding: '4.5rem 1.5rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '0.08em' }}>What We Treat</p>
            <h2 className="bp1-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>Services at Greater Noida</h2>
            <div className="sdiv" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {BRANCH.services.map((s, i) => <span className="spill" key={i}><CheckCircle2 size={13} />{s}</span>)}
            </div>
          </div>
        </section>

        {/* Map */}
        <section style={{ padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: ACC, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Find Us</p>
            <h2 className="bp1-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>Location & Directions</h2>
            <div className="sdiv" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, alignItems: 'start' }}>
              <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: `0 8px 32px rgba(${RGB},0.12)`, border: `2px solid ${ACC}33` }}>
                <iframe src={BRANCH.mapEmbed} width="100%" height="340" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" title="SKM Physiotherapy Greater Noida Map" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <MapPin size={17} color={ACC} />, label: 'Address', val: `${BRANCH.address}, ${BRANCH.city}` },
                  { icon: <Phone size={17} color={ACC} />, label: 'Phone / WhatsApp', val: BRANCH.phone },
                  { icon: <Mail size={17} color={ACC} />, label: 'Email', val: BRANCH.email },
                  { icon: <Navigation size={17} color={ACC} />, label: 'Landmarks', val: BRANCH.landmarks.join(' · ') },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: '13px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: ACC_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div><p style={{ fontSize: '0.66rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{item.label}</p><p style={{ fontSize: '0.86rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{item.val}</p></div>
                  </div>
                ))}
                <a href={BRANCH.mapLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: ACC, color: '#fff', borderRadius: 12, padding: 13, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', boxShadow: `0 6px 20px rgba(${RGB},0.35)` }}>
                  <Navigation size={15} /> Get Directions <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>


      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><X size={20} /></button>
          <img src={lightbox} alt="Clinic" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 12, objectFit: 'contain' }} />
        </div>
      )}
    </>
  );
}