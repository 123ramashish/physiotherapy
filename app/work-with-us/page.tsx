"use client";

import { useState } from "react";
import Reveal from "../../components/Reveal";

const openings = [
    {
        title: "Senior Physiotherapist",
        type: "Full-Time",
        location: "Delhi / NCR",
        exp: "3–6 years",
        gradient: "from-green-500 to-emerald-500",
        bg: "bg-green-50",
        border: "border-green-200",
        accent: "text-green-700",
        badge: "bg-green-100",
        icon: "🩺",
        desc: "Lead patient assessments, develop personalised rehab plans, and mentor junior therapists across our Delhi branches.",
        skills: ["Manual Therapy", "Exercise Prescription", "Patient Assessment", "Case Documentation"],
    },
    {
        title: "Sports Rehabilitation Specialist",
        type: "Full-Time",
        location: "Gurugram",
        exp: "2–5 years",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50",
        border: "border-blue-200",
        accent: "text-blue-700",
        badge: "bg-blue-100",
        icon: "🏃",
        desc: "Design and deliver sports-specific recovery programs for athletes ranging from weekend warriors to national-level competitors.",
        skills: ["Sports Science", "Injury Prevention", "Biomechanics", "Performance Rehab"],
    },
    {
        title: "Neuro-Rehabilitation Therapist",
        type: "Full-Time",
        location: "Mumbai / Delhi",
        exp: "2–4 years",
        gradient: "from-indigo-500 to-violet-500",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        accent: "text-indigo-700",
        badge: "bg-indigo-100",
        icon: "🧠",
        desc: "Support patients recovering from stroke, TBI, and spinal conditions using Bobath, PNF, and FES protocols.",
        skills: ["Bobath NDT", "PNF", "Gait Training", "Functional Electrical Stimulation"],
    },
    {
        title: "Pediatric Physiotherapist",
        type: "Part-Time / Contract",
        location: "Noida",
        exp: "1–3 years",
        gradient: "from-teal-500 to-green-600",
        bg: "bg-teal-50",
        border: "border-teal-200",
        accent: "text-teal-700",
        badge: "bg-teal-100",
        icon: "👶",
        desc: "Deliver therapeutic care for paediatric patients with developmental delays, cerebral palsy, and sensory disorders.",
        skills: ["Pediatric Care", "NDT", "Sensory Integration", "Family Counselling"],
    },
    {
        title: "Clinic Operations Manager",
        type: "Full-Time",
        location: "Bengaluru",
        exp: "4+ years",
        gradient: "from-sky-500 to-blue-600",
        bg: "bg-sky-50",
        border: "border-sky-200",
        accent: "text-sky-700",
        badge: "bg-sky-100",
        icon: "📋",
        desc: "Oversee day-to-day clinic operations, patient scheduling, team coordination, and quality of experience across the branch.",
        skills: ["Operations", "Team Leadership", "CRM", "Quality Assurance"],
    },
    {
        title: "Digital Health & Content Specialist",
        type: "Full-Time",
        location: "Remote",
        exp: "2+ years",
        gradient: "from-green-600 to-teal-500",
        bg: "bg-green-50",
        border: "border-green-200",
        accent: "text-green-800",
        badge: "bg-green-100",
        icon: "💻",
        desc: "Create patient education content, manage our health app, and drive digital engagement across SKM&apos;s platforms.",
        skills: ["Content Strategy", "Health Communication", "SEO", "Video Production"],
    },
];

const perks = [
    { icon: "🚀", title: "Real Career Growth", desc: "Clear promotion paths, leadership tracks, and regular performance reviews that actually mean something.", color: "from-green-500 to-emerald-500" },
    { icon: "📚", title: "Continuous Learning", desc: "Annual CPD budget, access to national conferences, in-house workshops, and paid specialization courses.", color: "from-blue-500 to-indigo-500" },
    { icon: "💚", title: "Wellness First", desc: "Comprehensive health insurance, free physiotherapy for you and family, mental wellness support, and gym membership.", color: "from-indigo-500 to-violet-500" },
    { icon: "⏰", title: "Flexible Working", desc: "Shift choices, hybrid options for eligible roles, generous leave policy, and no-questions parental leave.", color: "from-teal-500 to-green-600" },
    { icon: "💰", title: "Competitive Pay", desc: "Above-market salaries benchmarked quarterly, performance bonuses, and a transparent salary band system.", color: "from-sky-500 to-blue-600" },
    { icon: "🤝", title: "Inclusive Culture", desc: "A team where clinical excellence and human decency both matter — zero tolerance for anything less.", color: "from-green-600 to-teal-500" },
];

const process = [
    { step: "01", title: "Apply Online", desc: "Submit your CV and a 3-sentence cover note telling us why SKM. No lengthy forms.", icon: "📝" },
    { step: "02", title: "Screening Call", desc: "A casual 20-minute chat with our People team to understand your background and goals.", icon: "📞" },
    { step: "03", title: "Clinical Round", desc: "Meet the clinical lead. Brief case discussion and a hands-on practical session (for clinical roles).", icon: "🩺" },
    { step: "04", title: "Culture Fit Chat", desc: "Meet two team members informally. No trick questions — we just want to make sure it feels right.", icon: "☕" },
    { step: "05", title: "Offer & Onboard", desc: "Offer within 48 hours of the final round. Structured 30-day onboarding with a dedicated buddy.", icon: "🎉" },
];

const lifeAtSKM = [
    { quote: "I've learned more in 2 years at SKM than in 5 years before this. The clinical culture is unmatched.", name: "Riya S.", role: "Physiotherapist, Delhi" },
    { quote: "They actually invest in you. My conference trip, my certification, my growth plan — all supported by SKM.", name: "Karan M.", role: "Sports Rehab Specialist" },
    { quote: "The patients here are so grateful. You feel the impact every single day. That's rare.", name: "Ananya P.", role: "Neuro Rehab Therapist" },
];

export default function WorkWithUsPage() {
    const [expandedRole, setExpandedRole] = useState<number | null>(null);
    const [applied, setApplied] = useState<number[]>([]);

    return (
        <main className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-indigo-50 pt-28 pb-24 px-6">
                <div className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full bg-green-100 opacity-30 blur-3xl" />
                <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-100 opacity-25 blur-3xl" />

                <div className="relative max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Reveal delay={0}>
                                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-8">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    We&apos;re Hiring — 6 Open Roles
                                </span>
                            </Reveal>
                            <Reveal delay={100}>
                                <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-none tracking-tight mb-6">
                                    Work With<br />
                                    <span className="bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent">
                                        Purpose.
                                    </span>
                                </h1>
                            </Reveal>
                            <Reveal delay={220}>
                                <p className="text-xl text-gray-500 leading-relaxed mb-8">
                                    Join a team that started from one bicycle and one belief: that every patient deserves extraordinary care. We&apos;re building something rare — and we need exceptional people to build it with us.
                                </p>
                            </Reveal>
                            <Reveal delay={340}>
                                <div className="flex flex-wrap gap-4">
                                    <a href="#openings" className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-200 hover:scale-105 transition-all duration-300">
                                        See Open Roles ↓
                                    </a>
                                    <a href="#life" className="px-7 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-green-400 hover:text-green-600 transition-all duration-300">
                                        Life at SKM
                                    </a>
                                </div>
                            </Reveal>
                        </div>
                        <Reveal delay={200} direction="right">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { n: "6", label: "Open Positions", icon: "💼" },
                                    { n: "35+", label: "Team Members", icon: "👥" },
                                    { n: "4.9★", label: "Glassdoor Rating", icon: "⭐" },
                                    { n: "98%", label: "Would Recommend", icon: "💚" },
                                ].map((s, i) => (
                                    <div key={i} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <span className="text-3xl block mb-2">{s.icon}</span>
                                        <p className="text-3xl font-black text-gray-900">{s.n}</p>
                                        <p className="text-gray-400 text-xs font-medium mt-1">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Perks */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-5">Why Join SKM</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                We Take Care of the <span className="text-green-600">People Who Care</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {perks.map((p, i) => (
                            <Reveal key={i} delay={i * 70} direction="up">
                                <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        {p.icon}
                                    </div>
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">{p.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open roles */}
            <section id="openings" className="py-24 px-6 bg-gradient-to-b from-white to-green-50">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-5">6 Positions Open</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Find Your <span className="text-indigo-600">Role</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="space-y-4">
                        {openings.map((r, i) => (
                            <Reveal key={i} delay={i * 60} direction="left">
                                <div className={`rounded-3xl border-2 ${r.border} bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}>
                                    {/* Collapsed header */}
                                    <div
                                        className="flex items-center gap-5 p-6 cursor-pointer"
                                        onClick={() => setExpandedRole(expandedRole === i ? null : i)}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                                            {r.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                                <h3 className="text-lg font-extrabold text-gray-900">{r.title}</h3>
                                                <span className={`px-3 py-0.5 rounded-full text-xs font-black ${r.badge} ${r.accent}`}>{r.type}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm">📍 {r.location} &nbsp;·&nbsp; 🕐 {r.exp}</p>
                                        </div>
                                        <div className={`transition-transform duration-300 ${expandedRole === i ? "rotate-180" : ""}`}>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Expanded */}
                                    <div
                                        className="overflow-hidden transition-all duration-500"
                                        style={{ maxHeight: expandedRole === i ? "400px" : "0", opacity: expandedRole === i ? 1 : 0 }}
                                    >
                                        <div className="px-6 pb-7 border-t border-gray-100 pt-5">
                                            <p className="text-gray-600 text-sm leading-relaxed mb-5">{r.desc}</p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {r.skills.map((s, j) => (
                                                    <span key={j} className={`px-3 py-1 rounded-full text-xs font-bold ${r.bg} ${r.accent}`}>{s}</span>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => setApplied(prev => prev.includes(i) ? prev : [...prev, i])}
                                                className={`px-8 py-3 rounded-2xl text-white font-bold transition-all duration-300 ${applied.includes(i)
                                                    ? "bg-gray-300 cursor-default"
                                                    : `bg-gradient-to-r ${r.gradient} hover:scale-105 shadow-md`
                                                    }`}
                                            >
                                                {applied.includes(i) ? "✓ Applied!" : "Apply for This Role →"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hiring process */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Our Hiring <span className="text-blue-600">Process</span>
                            </h2>
                            <p className="text-gray-400 mt-3">Transparent. Respectful. No unnecessary hoops.</p>
                        </div>
                    </Reveal>
                    <div className="grid sm:grid-cols-5 gap-4">
                        {process.map((p, i) => (
                            <Reveal key={i} delay={i * 80} direction="up">
                                <div className="text-center flex flex-col items-center">
                                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-blue-100 border-2 border-green-200 flex items-center justify-center mb-3 text-2xl shadow">
                                        {p.icon}
                                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white text-xs font-black flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <h4 className="font-extrabold text-gray-900 text-sm mb-1">{p.title}</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Life at SKM */}
            <section id="life" className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Life at <span className="text-indigo-600">SKM</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {lifeAtSKM.map((l, i) => (
                            <Reveal key={i} delay={i * 90} direction="up">
                                <div className="bg-white rounded-3xl p-8 border border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-4xl text-indigo-300 font-black mb-4 leading-none">&ldquo;</div>
                                    <blockquote className="text-gray-700 leading-relaxed text-sm mb-6 font-medium">{l.quote}</blockquote>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white font-black text-xs">
                                            {l.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-sm">{l.name}</p>
                                            <p className="text-gray-400 text-xs">{l.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Speculative CTA */}
            <section className="py-20 px-6 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-700">
                <div className="max-w-3xl mx-auto text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Don&apos;t See Your Role?
                        </h2>
                        <p className="text-white/80 text-xl mb-10">
                            We hire for attitude and grow for skill. Send us your CV and a note — we&apos;ll reach out when the right role opens.
                        </p>
                        <a href="mailto:careers@skmphysio.com" className="inline-block px-10 py-4 rounded-2xl bg-white text-indigo-700 font-black text-lg shadow-2xl hover:scale-105 transition-all duration-300">
                            📩 Email Us Your CV
                        </a>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}