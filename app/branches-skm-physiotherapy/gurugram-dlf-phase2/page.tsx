'use client';
// app/branches-skm-physiotherapy/gurugram-dlf-phase2/page.tsx
// SKM Physiotherapy — DLF Phase 2, Gurugram
// Accent: Indigo (#6366f1)

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Phone, Mail, Clock, CheckCircle2, ChevronRight,
  ChevronDown, Shield, Home, Calendar, ArrowRight,
  MessageCircle, Camera, Building2, Navigation, CreditCard,
  Languages, BadgeCheck, ExternalLink, X, Baby, Heart, Syringe
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ACC = '#6366f1';
const ACC_LIGHT = '#e0e7ff';
const ACC_MID = '#818cf8';
const RGB = '99,102,241';

const BRANCH = {
  name: 'SKM Physiotherapy — DLF Phase 2',
  location: 'DLF Phase 2, Gurugram',
  tagline: "Women's health, paediatrics & advanced therapy near Cyber Hub",
  address: '78, Cyber Hub Road, DLF Phase 2',
  city: 'Gurugram, Haryana — 122002',
  phone: '7982799149',
  whatsapp: '917982799149',
  email: 'dlf@skmphysio.in',
  established: '2020',
  timings: { weekdays: '8:30 AM – 8:30 PM', saturday: '9:00 AM – 6:00 PM', sunday: '10:00 AM – 1:00 PM' },
  landmarks: ['Near Cyber Hub DLF Phase 2', 'Opposite Galleria Market', '3 min from MG Road Metro'],
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2!2d77.0900!3d28.4950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18948a3fa6ab%3A0x1b4c4ba5deb1c9c3!2sCyber%20Hub%2C%20DLF%20Cyber%20City%20Phase%202%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1620000000002',
  mapLink: 'https://maps.google.com/?q=Cyber+Hub+DLF+Phase+2+Gurugram',
  stats: [{ n: '15+', l: 'Services' }, { n: '2', l: 'Doctors' }, { n: '2020', l: 'Est.' }, { n: '4.9★', l: 'Rating' }, { n: '900+', l: 'Patients' }],
  services: [
    'Dry Needling', 'Cupping & Hijama', 'Back Pain Treatment', 'Neck Pain Therapy',
    'Knee Pain Rehabilitation', 'Arthritis Management', 'Heel Pain', "Bell's Palsy",
    'Sciatica Pain', 'Sports Injuries', 'Post COVID Rehab', 'Frozen Shoulder',
    'Paralysis (Stroke) Rehab', 'Paediatric Physiotherapy', 'Soreness & Relaxation',
  ],
  doctors: [
    {
      name: 'Dr. Priya Verma',
      designation: "Branch Head — Women's & Paediatric Specialist",
      experience: '8+ Years',
      qualifications: ['BPT', 'MPT — Paediatrics', 'Certified Hijama Practitioner', "Women's Health Physiotherapy"],
      specializations: ["Women's Health Physiotherapy", 'Paediatric Physiotherapy', 'Hijama Therapy', 'Post-Natal Rehab'],
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80',
      regNo: 'HR-PT-2016-0098',
      languages: ['Hindi', 'English', 'Haryanvi'],
    },
    {
      name: 'Dr. Arun Bhatia',
      designation: 'Physiotherapist — Sports & Ortho',
      experience: '5+ Years',
      qualifications: ['BPT', 'Diploma in Sports Medicine'],
      specializations: ['Sports Medicine', 'Orthopaedic Rehab', 'Dry Needling'],
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80',
      regNo: 'HR-PT-2019-0347',
      languages: ['Hindi', 'English'],
    },
  ],
  clinicPhotos: [
    { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', caption: 'State-of-the-Art Clinic' },
    { url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80', caption: 'Paediatric Therapy Room' },
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', caption: 'Modern Reception' },
    { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', caption: 'Exercise & Rehab Zone' },
  ],
  amenities: ['Basement Parking', 'Wheelchair Accessible', 'AC Waiting & Treatment Rooms', 'Paediatric Play Area', 'Private Treatment Bays', 'Exercise Zone', 'Online & Walk-In Booking', 'Home Visit Service', 'Insurance TPA Desk'],
  payment: ['Cash', 'UPI / PhonePe / GPay', 'Insurance (TPA)', 'Debit / Credit Card', 'Corporate Tie-Ups'],
  faqs: [
    { q: 'Where is the DLF Phase 2 branch located?', a: '78, Cyber Hub Road, DLF Phase 2, Gurugram, Haryana — 122002. Near Cyber Hub, Opposite Galleria Market, 3 min from MG Road Metro.' },
    { q: 'What are the timings?', a: 'Weekdays: 8:30 AM – 8:30 PM | Saturday: 9:00 AM – 6:00 PM | Sunday: 10:00 AM – 1:00 PM.' },
    { q: "Is paediatric and women's physiotherapy available?", a: "Yes! Dr. Priya Verma specialises in women's health physiotherapy, post-natal rehab, paediatric physiotherapy, and hijama therapy. A dedicated paediatric play area is available." },
    { q: 'Are corporate tie-ups available from DLF?', a: 'Yes, we have special corporate wellness packages for companies near Cyber Hub and DLF Phase 2. Email dlf@skmphysio.in for details.' },
    { q: 'Do you offer home visits from DLF?', a: 'Yes. Call 7982799149 to schedule a home visit from our DLF Phase 2 team.' },
    { q: 'What payment methods are accepted?', a: 'Cash, UPI (PhonePe / GPay), Insurance (TPA), Debit/Credit Card, and Corporate Tie-Ups.' },
  ],
  otherBranches: [
    { name: 'Main Centre', location: 'Sector 14, Gurugram', phone: '7982799147', href: '/branches-skm-physiotherapy/gurugram-sector-14', color: '#059669' },
    { name: 'South Extension', location: 'Sector 45, Gurugram', phone: '7982799148', href: '/branches-skm-physiotherapy/gurugram-sector-45', color: '#3b82f6' },
  ],
};

export default function DlfPhase2Page() {
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
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .bp3 { font-family:'Sora',sans-serif; background:#fff; }
        .bp3-display { font-family:'Playfair Display',serif; }
        .bp3 .rv { opacity:0; transform:translateY(28px); transition:opacity 0.55s ease,transform 0.55s ease; }
        .bp3 .rv.in { opacity:1; transform:translateY(0); }
        .bp3 .doc-card { border-radius:22px; border:1px solid #e2e8f0; overflow:hidden; background:#fff; transition:transform 0.3s,box-shadow 0.3s; }
        .bp3 .doc-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(${RGB},0.18); }
        .bp3 .spill { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border-radius:50px; background:${ACC_LIGHT}; color:${ACC}; font-size:0.81rem; font-weight:600; border:1px solid ${ACC}33; transition:all 0.2s; cursor:default; }
        .bp3 .spill:hover { background:${ACC}; color:#fff; transform:scale(1.03); }
        .bp3 .faq-btn { width:100%; text-align:left; background:none; border:none; padding:18px 20px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-family:'Sora',sans-serif; font-weight:700; font-size:0.95rem; color:#0f172a; }
        .bp3 .faq-btn:hover { background:${ACC_LIGHT}; }
        .bp3 .photo-wrap { border-radius:14px; overflow:hidden; cursor:pointer; position:relative; aspect-ratio:4/3; }
        .bp3 .photo-wrap img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
        .bp3 .photo-wrap:hover img { transform:scale(1.07); }
        .bp3 .photo-wrap .pov { position:absolute; inset:0; background:rgba(0,0,0,0); transition:background 0.3s; display:flex; align-items:center; justify-content:center; }
        .bp3 .photo-wrap:hover .pov { background:rgba(0,0,0,0.32); }
        .bp3 .photo-wrap .pov svg { opacity:0; color:#fff; transition:opacity 0.3s; }
        .bp3 .photo-wrap:hover .pov svg { opacity:1; }
        .bp3 .qcard { background:#fff; border-radius:14px; padding:17px 19px; border:1px solid #e2e8f0; display:flex; gap:13px; align-items:flex-start; box-shadow:0 2px 10px rgba(0,0,0,0.04); transition:transform 0.25s,box-shadow 0.25s; }
        .bp3 .qcard:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(${RGB},0.12); }
        .bp3 .ob-card { background:#fff; border-radius:14px; padding:18px 20px; border:2px solid #e2e8f0; cursor:pointer; transition:all 0.25s; }
        .bp3 .sdiv { height:3px; width:70px; background:linear-gradient(90deg,${ACC},${ACC_MID}); border-radius:2px; margin:10px 0 22px; }
        .bp3 .spec-badge { display:inline-flex; align-items:center; gap:5px; background:#eef2ff; color:#4338ca; padding:5px 12px; border-radius:20px; font-size:0.73rem; font-weight:700; border:1px solid #c7d2fe; }
      `}</style>

      <div className="bp3">

        {/* Breadcrumb */}
        <nav style={{ background:'#eef2ff', borderBottom:'1px solid #c7d2fe', padding:'11px 24px' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:6, alignItems:'center', fontSize:'0.8rem', flexWrap:'wrap' }}>
            {[['Home','/'],['Branches','/branches-skm-physiotherapy'],['DLF Phase 2, Gurugram',null]].map(([l,h],i,a)=>(
              <React.Fragment key={i}>
                {h ? <a href={h as string} style={{ color:ACC, fontWeight:700, textDecoration:'none' }}>{l}</a>
                   : <span style={{ color:'#64748b', fontWeight:500 }}>{l}</span>}
                {i<a.length-1 && <ChevronRight size={12} color="#94a3b8"/>}
              </React.Fragment>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section style={{ background:`linear-gradient(135deg,#eef2ff 0%,#fff 60%)`, padding:'4rem 1.5rem 3rem', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-100, right:-100, width:380, height:380, background:`rgba(${RGB},0.06)`, borderRadius:'50%' }}/>
          <div style={{ position:'absolute', bottom:-80, left:'30%', width:260, height:260, background:`rgba(${RGB},0.04)`, borderRadius:'50%' }}/>
          <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'3rem', alignItems:'center', position:'relative', zIndex:1 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:ACC_LIGHT, border:`1px solid ${ACC}44`, borderRadius:50, padding:'6px 16px', marginBottom:'1.25rem' }}>
                <Baby size={14} color={ACC}/><span style={{ fontSize:'0.72rem', fontWeight:700, color:ACC, textTransform:'uppercase', letterSpacing:'0.07em' }}>Paediatrics & Women's Health · Est. {BRANCH.established}</span>
              </div>
              <h1 className="bp3-display" style={{ fontSize:'clamp(2rem,4.5vw,3.2rem)', fontWeight:900, color:'#0f172a', lineHeight:1.15, marginBottom:'0.5rem' }}>
                SKM Physiotherapy<br/><span style={{ color:ACC }}>DLF Phase 2</span>
              </h1>
              <p style={{ fontSize:'1rem', fontWeight:500, color:'#64748b', marginBottom:'1.25rem' }}>{BRANCH.tagline}</p>
              <div style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:'0.75rem' }}>
                <MapPin size={16} color={ACC} style={{ marginTop:3, flexShrink:0 }}/>
                <div><p style={{ color:'#374151', fontWeight:600, fontSize:'0.92rem' }}>{BRANCH.address}</p><p style={{ color:'#94a3b8', fontSize:'0.82rem' }}>{BRANCH.city}</p></div>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:'1.5rem' }}>
                {BRANCH.landmarks.map((l,i)=><span key={i} style={{ background:'#f1f5f9', color:'#475569', fontSize:'0.73rem', fontWeight:500, padding:'4px 10px', borderRadius:20, border:'1px solid #e2e8f0' }}>📍 {l}</span>)}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:'1.75rem' }}>
                <span className="spec-badge"><Baby size={12}/> Paediatric Physio</span>
                <span className="spec-badge"><Heart size={12}/> Women's Health</span>
                <span className="spec-badge"><Syringe size={12}/> Hijama & Dry Needling</span>
              </div>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button onClick={()=>router.push('/contact-skm-physiotherapy')} style={{ background:`linear-gradient(135deg,${ACC},${ACC_MID})`, color:'#fff', border:'none', borderRadius:50, padding:'12px 24px', fontWeight:700, fontSize:'0.88rem', cursor:'pointer', fontFamily:"'Sora',sans-serif", boxShadow:`0 6px 20px rgba(${RGB},0.4)`, display:'flex', alignItems:'center', gap:8 }}>
                  <Calendar size={14}/> Book Appointment
                </button>
                <a href={`https://wa.me/${BRANCH.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ background:'#25D366', color:'#fff', borderRadius:50, padding:'12px 20px', fontWeight:700, fontSize:'0.88rem', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                  <MessageCircle size={14}/> WhatsApp
                </a>
                <a href={`tel:${BRANCH.phone}`} style={{ background:'#fff', color:ACC, border:`2px solid ${ACC}`, borderRadius:50, padding:'10px 18px', fontWeight:700, fontSize:'0.88rem', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                  <Phone size={14}/> {BRANCH.phone}
                </a>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                { icon:<Clock size={18} color={ACC}/>, label:'Weekdays', val:BRANCH.timings.weekdays },
                { icon:<Clock size={18} color='#f59e0b'/>, label:'Saturday', val:BRANCH.timings.saturday },
                { icon:<Clock size={18} color='#94a3b8'/>, label:'Sunday', val:BRANCH.timings.sunday },
                { icon:<Mail size={18} color={ACC}/>, label:'Email', val:BRANCH.email },
                { icon:<CreditCard size={18} color={ACC}/>, label:'Payment', val:'Cash · UPI · Insurance · Card · Corporate' },
              ].map((item,i)=>(
                <div className="qcard" key={i}>
                  <div style={{ width:38, height:38, borderRadius:10, background:ACC_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.icon}</div>
                  <div><p style={{ fontSize:'0.67rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>{item.label}</p><p style={{ fontSize:'0.86rem', fontWeight:600, color:'#1e293b', marginTop:2 }}>{item.val}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <div style={{ background:`linear-gradient(135deg,${ACC},${ACC_MID})`, padding:'1.25rem 1.5rem' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(100px,1fr))', gap:8, textAlign:'center' }}>
            {BRANCH.stats.map((s,i)=>(
              <div key={i}><div style={{ fontSize:'1.45rem', fontWeight:800, color:'#fff', lineHeight:1 }}>{s.n}</div><div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.82)', marginTop:3, fontWeight:500, textTransform:'uppercase', letterSpacing:'0.05em' }}>{s.l}</div></div>
            ))}
          </div>
        </div>

        {/* Doctors */}
        <section ref={ref('doc')} className={`rv ${vis('doc')?'in':''}`} style={{ padding:'4.5rem 1.5rem' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <p style={{ fontSize:'0.75rem', fontWeight:700, color:ACC, textTransform:'uppercase', letterSpacing:'0.08em' }}>Meet The Team</p>
            <h2 className="bp3-display" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'#0f172a', marginTop:4 }}>Our Expert Doctors</h2>
            <div className="sdiv"/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:24 }}>
              {BRANCH.doctors.map((d,i)=>(
                <div className="doc-card" key={i}>
                  <div style={{ position:'relative', height:270, overflow:'hidden' }}>
                    <img src={d.photo} alt={d.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}/>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(transparent 50%,rgba(0,0,0,0.72))' }}/>
                    <div style={{ position:'absolute', top:12, right:12, background:ACC, color:'#fff', borderRadius:20, padding:'4px 12px', fontSize:'0.72rem', fontWeight:700 }}>{d.experience}</div>
                    <div style={{ position:'absolute', bottom:14, left:16 }}>
                      <h3 style={{ color:'#fff', fontWeight:800, fontSize:'1.05rem', lineHeight:1.2, marginBottom:2 }}>{d.name}</h3>
                      <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'0.77rem' }}>{d.designation}</p>
                    </div>
                  </div>
                  <div style={{ padding:'1.25rem 1.5rem' }}>
                    <p style={{ fontSize:'0.67rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Qualifications</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
                      {d.qualifications.map((q,qi)=><span key={qi} style={{ background:ACC_LIGHT, color:ACC, fontSize:'0.7rem', fontWeight:600, padding:'3px 10px', borderRadius:20, border:`1px solid ${ACC}33` }}>{q}</span>)}
                    </div>
                    <p style={{ fontSize:'0.67rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>Specializations</p>
                    {d.specializations.map((s,si)=>(
                      <div key={si} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                        <CheckCircle2 size={13} color={ACC}/><span style={{ fontSize:'0.82rem', color:'#374151', fontWeight:500 }}>{s}</span>
                      </div>
                    ))}
                    <div style={{ display:'flex', gap:12, flexWrap:'wrap', paddingTop:10, borderTop:'1px solid #f1f5f9', marginTop:12 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:5 }}><Languages size={12} color="#94a3b8"/><span style={{ fontSize:'0.72rem', color:'#64748b' }}>{d.languages.join(', ')}</span></div>
                      <div style={{ display:'flex', alignItems:'center', gap:5 }}><BadgeCheck size={12} color="#94a3b8"/><span style={{ fontSize:'0.72rem', color:'#64748b' }}>{d.regNo}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section ref={ref('svc')} className={`rv ${vis('svc')?'in':''}`} style={{ background:'#f8fafc', padding:'4.5rem 1.5rem', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <p style={{ fontSize:'0.75rem', fontWeight:700, color:ACC, textTransform:'uppercase', letterSpacing:'0.08em' }}>What We Treat</p>
            <h2 className="bp3-display" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'#0f172a', marginTop:4 }}>Services at DLF Phase 2</h2>
            <div className="sdiv"/>
            <p style={{ color:'#64748b', fontSize:'0.88rem', marginBottom:'1.75rem', maxWidth:540 }}>{BRANCH.services.length} services available — including our signature paediatric & women's health programmes.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {BRANCH.services.map((s,i)=><span className="spill" key={i}><CheckCircle2 size={13}/>{s}</span>)}
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:'2rem' }}>
              <button onClick={()=>router.push('/services-skm-physiotherapy')} style={{ background:ACC, color:'#fff', border:'none', borderRadius:50, padding:'11px 22px', fontWeight:700, fontSize:'0.86rem', cursor:'pointer', fontFamily:"'Sora',sans-serif", display:'flex', alignItems:'center', gap:6 }}>View All Services <ArrowRight size={13}/></button>
              <button onClick={()=>router.push('/contact-skm-physiotherapy')} style={{ background:'#fff', color:ACC, border:`2px solid ${ACC}`, borderRadius:50, padding:'9px 22px', fontWeight:700, fontSize:'0.86rem', cursor:'pointer', fontFamily:"'Sora',sans-serif" }}>Book a Service</button>
            </div>
          </div>
        </section>

        {/* Photos */}
        <section ref={ref('ph')} className={`rv ${vis('ph')?'in':''}`} style={{ padding:'4.5rem 1.5rem' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <p style={{ fontSize:'0.75rem', fontWeight:700, color:ACC, textTransform:'uppercase', letterSpacing:'0.08em' }}>Inside Our Clinic</p>
            <h2 className="bp3-display" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'#0f172a', marginTop:4 }}>Clinic Gallery</h2>
            <div className="sdiv"/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
              {BRANCH.clinicPhotos.map((p,i)=>(
                <div className="photo-wrap" key={i} onClick={()=>setLightbox(p.url)}>
                  <img src={p.url} alt={p.caption} loading="lazy"/>
                  <div className="pov"><Camera size={28}/></div>
                  <div style={{ position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.58)', color:'#fff', fontSize:'0.7rem', padding:'3px 10px', borderRadius:20, fontWeight:500 }}>{p.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section ref={ref('am')} className={`rv ${vis('am')?'in':''}`} style={{ background:ACC_LIGHT, padding:'4rem 1.5rem', borderTop:`1px solid ${ACC}22` }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <p style={{ fontSize:'0.75rem', fontWeight:700, color:ACC, textTransform:'uppercase', letterSpacing:'0.08em' }}>Facilities</p>
            <h2 className="bp3-display" style={{ fontSize:'clamp(1.4rem,2.5vw,2rem)', fontWeight:900, color:'#0f172a', marginTop:4 }}>Amenities & Facilities</h2>
            <div className="sdiv"/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:12 }}>
              {BRANCH.amenities.map((a,i)=>(
                <div key={i} style={{ background:'#fff', borderRadius:12, padding:'13px 16px', display:'flex', alignItems:'center', gap:10, border:`1px solid ${ACC}33`, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                  <Shield size={15} color={ACC} style={{ flexShrink:0 }}/><span style={{ fontSize:'0.83rem', fontWeight:600, color:'#374151' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map */}
        <section style={{ padding:'4.5rem 1.5rem' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <p style={{ fontSize:'0.75rem', fontWeight:700, color:ACC, textTransform:'uppercase', letterSpacing:'0.08em' }}>Find Us</p>
            <h2 className="bp3-display" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'#0f172a', marginTop:4 }}>Location & Directions</h2>
            <div className="sdiv"/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24, alignItems:'start' }}>
              <div style={{ borderRadius:18, overflow:'hidden', boxShadow:`0 8px 32px rgba(${RGB},0.12)`, border:`2px solid ${ACC}33` }}>
                <iframe src={BRANCH.mapEmbed} width="100%" height="340" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" title="SKM Physiotherapy DLF Phase 2 Map"/>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[
                  { icon:<MapPin size={17} color={ACC}/>, label:'Address', val:`${BRANCH.address}, ${BRANCH.city}` },
                  { icon:<Phone size={17} color={ACC}/>, label:'Phone / WhatsApp', val:BRANCH.phone },
                  { icon:<Mail size={17} color={ACC}/>, label:'Email', val:BRANCH.email },
                  { icon:<Navigation size={17} color={ACC}/>, label:'Landmarks', val:BRANCH.landmarks.join(' · ') },
                ].map((item,i)=>(
                  <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'13px 16px', display:'flex', gap:12, alignItems:'flex-start', border:'1px solid #e2e8f0' }}>
                    <div style={{ width:34, height:34, borderRadius:8, background:ACC_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.icon}</div>
                    <div><p style={{ fontSize:'0.66rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:2 }}>{item.label}</p><p style={{ fontSize:'0.86rem', fontWeight:600, color:'#1e293b', lineHeight:1.5 }}>{item.val}</p></div>
                  </div>
                ))}
                <a href={BRANCH.mapLink} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:ACC, color:'#fff', borderRadius:12, padding:13, fontWeight:700, fontSize:'0.88rem', textDecoration:'none', boxShadow:`0 6px 20px rgba(${RGB},0.35)` }}>
                  <Navigation size={15}/> Get Directions <ExternalLink size={13}/>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section ref={ref('faq')} className={`rv ${vis('faq')?'in':''}`} style={{ background:'#f8fafc', padding:'4.5rem 1.5rem', borderTop:'1px solid #e2e8f0' }}>
          <div style={{ maxWidth:860, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
              <p style={{ fontSize:'0.75rem', fontWeight:700, color:ACC, textTransform:'uppercase', letterSpacing:'0.08em' }}>Got Questions?</p>
              <h2 className="bp3-display" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'#0f172a', marginTop:4 }}>Frequently Asked Questions</h2>
              <div className="sdiv" style={{ margin:'10px auto 0' }}/>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {BRANCH.faqs.map((f,i)=>(
                <div key={i} style={{ border:`1px solid ${openFaq===i?ACC+'66':'#e2e8f0'}`, borderRadius:14, overflow:'hidden', boxShadow:openFaq===i?`0 4px 16px rgba(${RGB},0.1)`:'none', transition:'all 0.2s' }}>
                  <button className="faq-btn" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                    <span>{f.q}</span>
                    <ChevronDown size={17} color={ACC} style={{ transform:openFaq===i?'rotate(180deg)':'rotate(0deg)', transition:'transform 0.3s', flexShrink:0 }}/>
                  </button>
                  <div style={{ padding:openFaq===i?'0 20px 18px':'0 20px', fontSize:'0.86rem', color:'#475569', lineHeight:1.75, maxHeight:openFaq===i?300:0, overflow:'hidden', transition:'max-height 0.35s ease,padding 0.3s' }}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Branches */}
        <section style={{ padding:'3.5rem 1.5rem' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <h2 className="bp3-display" style={{ fontSize:'1.6rem', fontWeight:900, color:'#0f172a', marginBottom:4 }}>Other SKM Branches</h2>
            <div className="sdiv"/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14 }}>
              {BRANCH.otherBranches.map((b,i)=>(
                <div key={i} className="ob-card" onClick={()=>router.push(b.href)}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=b.color;(e.currentTarget as HTMLDivElement).style.boxShadow=`0 6px 20px ${b.color}33`;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='#e2e8f0';(e.currentTarget as HTMLDivElement).style.boxShadow='none';}}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                    <div style={{ width:34, height:34, borderRadius:10, background:b.color+'22', display:'flex', alignItems:'center', justifyContent:'center' }}><Building2 size={16} color={b.color}/></div>
                    <span style={{ fontSize:'0.7rem', fontWeight:700, color:b.color, textTransform:'uppercase', letterSpacing:'0.05em' }}>{b.location}</span>
                  </div>
                  <h3 style={{ fontSize:'0.9rem', fontWeight:700, color:'#0f172a', marginBottom:5 }}>{b.name}</h3>
                  <p style={{ fontSize:'0.77rem', color:'#64748b', marginBottom:8 }}><Phone size={11} style={{ display:'inline', marginRight:4 }}/>{b.phone}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:4, color:b.color, fontSize:'0.78rem', fontWeight:700 }}>Visit Branch <ChevronRight size={12}/></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:'0 1.5rem 4.5rem' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', background:`linear-gradient(135deg,${ACC},${ACC_MID})`, borderRadius:24, padding:'3.5rem 2.5rem', textAlign:'center', position:'relative', overflow:'hidden', boxShadow:`0 24px 60px rgba(${RGB},0.35)` }}>
            <div style={{ position:'absolute', top:-50, right:-50, width:200, height:200, background:'rgba(255,255,255,0.08)', borderRadius:'50%' }}/>
            <div style={{ position:'absolute', bottom:-40, left:-40, width:160, height:160, background:'rgba(255,255,255,0.06)', borderRadius:'50%' }}/>
            <div style={{ position:'relative', zIndex:1 }}>
              <Home size={38} color="rgba(255,255,255,0.9)" style={{ marginBottom:'1rem' }}/>
              <h2 className="bp3-display" style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:900, color:'#fff', marginBottom:'0.75rem' }}>Book Your Appointment at DLF Phase 2</h2>
              <p style={{ color:'rgba(255,255,255,0.88)', fontSize:'0.93rem', marginBottom:'2rem', maxWidth:520, margin:'0 auto 2rem', lineHeight:1.7 }}>Expert paediatric, women's health & advanced physiotherapy — same-day slots available.</p>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <button onClick={()=>router.push('/contact-skm-physiotherapy')} style={{ background:'#fff', color:ACC, border:'none', borderRadius:50, padding:'14px 28px', fontWeight:700, fontSize:'0.93rem', cursor:'pointer', fontFamily:"'Sora',sans-serif", boxShadow:'0 6px 20px rgba(0,0,0,0.15)', display:'flex', alignItems:'center', gap:8 }}>
                  <Calendar size={15}/> Book Appointment
                </button>
                <a href={`tel:${BRANCH.phone}`} style={{ background:'rgba(255,255,255,0.15)', color:'#fff', border:'2px solid rgba(255,255,255,0.5)', borderRadius:50, padding:'12px 24px', fontWeight:700, fontSize:'0.93rem', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                  <Phone size={15}/> {BRANCH.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {lightbox && (
        <div onClick={()=>setLightbox(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <button onClick={()=>setLightbox(null)} style={{ position:'absolute', top:20, right:20, background:'rgba(255,255,255,0.15)', border:'none', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff' }}><X size={20}/></button>
          <img src={lightbox} alt="Clinic" onClick={e=>e.stopPropagation()} style={{ maxWidth:'90vw', maxHeight:'85vh', borderRadius:12, objectFit:'contain' }}/>
        </div>
      )}
    </>
  );
}