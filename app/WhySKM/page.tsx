"use client";

import { useState } from "react";
import Reveal from "../../components/Reveal";

const differentiators = [
    {
        icon: "🏥",
        title: "Evidence-Based Protocols",
        subtitle: "Science, not guesswork",
        desc: "Every treatment plan at SKM is grounded in peer-reviewed clinical research. We continuously update our protocols with the latest physiotherapy science — no outdated techniques, no shortcuts.",
        gradient: "from-green-500 to-emerald-500",
        bg: "bg-green-50",
        border: "border-green-200",
        accent: "text-green-700",
        stats: ["250+ protocols", "Updated quarterly"],
    },
    {
        icon: "🎯",
        title: "Hyper-Personalized Care",
        subtitle: "Your body. Your plan.",
        desc: "No two bodies are identical. Our therapists conduct deep biomechanical assessments before creating individualized rehabilitation plans — not cookie-cutter exercises, but precision programs built around you.",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50",
        border: "border-blue-200",
        accent: "text-blue-700",
        stats: ["100% custom plans", "Reassessed weekly"],
    },
    {
        icon: "🧠",
        title: "Multi-Specialty Expertise",
        subtitle: "All conditions. One roof.",
        desc: "From sports injuries to stroke recovery, pediatric conditions to post-surgical rehab — SKM therapists hold certifications across 12 specializations. Whatever your condition, we have the right expert.",
        gradient: "from-indigo-500 to-violet-500",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        accent: "text-indigo-700",
        stats: ["12 specializations", "30+ certified therapists"],
    },
    {
        icon: "📱",
        title: "Tech-Augmented Recovery",
        subtitle: "Modern tools, human touch",
        desc: "We pair the warmth of hands-on therapy with cutting-edge technology: shockwave therapy, real-time gait analysis, ultrasound-guided assessment, and a patient app for tracking daily progress.",
        gradient: "from-teal-500 to-green-600",
        bg: "bg-teal-50",
        border: "border-teal-200",
        accent: "text-teal-700",
        stats: ["8 advanced modalities", "Patient app included"],
    },
    {
        icon: "🤝",
        title: "Continuity of Care",
        subtitle: "Same therapist. Every session.",
        desc: "Unlike crowded hospitals where you see a different face every visit, at SKM your assigned therapist knows your history, your goals, and your personality. Continuity builds trust — and trust accelerates recovery.",
        gradient: "from-sky-500 to-blue-600",
        bg: "bg-sky-50",
        border: "border-sky-200",
        accent: "text-sky-700",
        stats: ["1 dedicated therapist", "Full history tracking"],
    },
    {
        icon: "🌿",
        title: "Holistic Wellness Approach",
        subtitle: "Beyond the injury",
        desc: "We integrate nutrition guidance, ergonomic advice, mental wellness support, and lifestyle coaching into our rehab programs. Because lasting recovery isn't just physical — it's complete.",
        gradient: "from-green-600 to-teal-500",
        bg: "bg-green-50",
        border: "border-green-200",
        accent: "text-green-800",
        stats: ["Whole-person rehab", "Lifestyle integration"],
    },
];

const comparison = [
    { feature: "Personalized treatment plans", skm: true, others: false },
    { feature: "Dedicated same therapist every visit", skm: true, others: false },
    { feature: "Evidence-updated quarterly", skm: true, others: false },
    { feature: "Advanced tech modalities (shockwave, ultrasound)", skm: true, others: "Partial" },
    { feature: "Home visit option", skm: true, others: false },
    { feature: "Multi-specialty under one roof", skm: true, others: "Partial" },
    { feature: "Digital progress tracking app", skm: true, others: false },
    { feature: "Post-discharge follow-up program", skm: true, others: false },
];

const specializations = [
    { name: "Sports Rehabilitation", icon: "⚽", color: "bg-green-100 text-green-700" },
    { name: "Neuro Rehabilitation", icon: "🧠", color: "bg-blue-100 text-blue-700" },
    { name: "Orthopaedic Physiotherapy", icon: "🦴", color: "bg-indigo-100 text-indigo-700" },
    { name: "Pediatric Physiotherapy", icon: "👶", color: "bg-teal-100 text-teal-700" },
    { name: "Geriatric Care", icon: "👴", color: "bg-sky-100 text-sky-700" },
    { name: "Post-Surgical Rehab", icon: "🏥", color: "bg-green-100 text-green-800" },
    { name: "Cardio-Pulmonary Therapy", icon: "❤️", color: "bg-blue-100 text-blue-800" },
    { name: "Women's Health Physio", icon: "🌸", color: "bg-indigo-100 text-indigo-800" },
    { name: "Workplace Ergonomics", icon: "💼", color: "bg-teal-100 text-teal-800" },
    { name: "Pain Management", icon: "🎯", color: "bg-sky-100 text-sky-800" },
    { name: "Balance & Vestibular", icon: "⚖️", color: "bg-green-100 text-green-700" },
    { name: "Dry Needling & Cupping", icon: "💉", color: "bg-blue-100 text-blue-700" },
];

const testimonialSlice = [
    { name: "Arjun K.", condition: "ACL Tear", quote: "I was told 9 months recovery. SKM got me back in 6. Game-changer.", rating: 5 },
    { name: "Sunita M.", condition: "Post Stroke", quote: "My left hand works again. I can write my grandchild's name. That's everything.", rating: 5 },
    { name: "Rahul D.", condition: "Chronic Back Pain", quote: "3 years of pain, 8 weeks at SKM. I wish I found them sooner.", rating: 5 },
];

function Stars({ n }: { n: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: n }).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
            ))}
        </div>
    );
}

export default function WhySKMPage() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <main className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-28 pb-24 px-6">
                <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-blue-100 opacity-30 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-100 opacity-30 blur-3xl" />

                <div className="relative max-w-5xl mx-auto text-center">
                    <Reveal delay={0}>
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-8">
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            The SKM Difference
                        </span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter mb-6">
                            Why{" "}
                            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-green-500 bg-clip-text text-transparent">
                                SKM?
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={220}>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                            There are clinics, and then there is SKM. Here&apos;s what sets us apart from every other physiotherapy option in the city.
                        </p>
                    </Reveal>
                    <Reveal delay={340}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/our-story" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all duration-300">
                                Our Story
                            </a>
                            <a href="/faq" className="px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold text-lg hover:border-blue-400 hover:text-blue-600 transition-all duration-300">
                                Read FAQs →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Differentiators grid */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-5">6 Reasons</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                What Makes Us <span className="text-indigo-600">Different</span>
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {differentiators.map((d, i) => (
                            <Reveal key={i} delay={i * 70} direction="up">
                                <div
                                    className={`h-full rounded-3xl border-2 ${d.border} bg-white p-8 shadow-sm cursor-pointer transition-all duration-500 group`}
                                    style={{
                                        transform: hoveredCard === i ? "translateY(-8px) scale(1.01)" : "none",
                                        boxShadow: hoveredCard === i ? "0 24px 48px -12px rgba(0,0,0,0.12)" : "",
                                    }}
                                    onMouseEnter={() => setHoveredCard(i)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${d.gradient} items-center justify-center text-2xl mb-5 shadow-md`}>
                                        {d.icon}
                                    </div>
                                    <p className={`text-xs font-black uppercase tracking-widest ${d.accent} mb-1`}>{d.subtitle}</p>
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{d.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{d.desc}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {d.stats.map((s, j) => (
                                            <span key={j} className={`px-3 py-1 rounded-full ${d.bg} ${d.accent} text-xs font-bold`}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison table */}
            <section className="py-24 px-6 bg-gradient-to-b from-indigo-50 to-white">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-5">Honest Comparison</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                SKM vs. <span className="text-gray-400">The Rest</span>
                            </h2>
                        </div>
                    </Reveal>

                    <Reveal delay={100} direction="scale">
                        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
                            {/* Table header */}
                            <div className="grid grid-cols-3 bg-gradient-to-r from-green-600 to-indigo-700 text-white">
                                <div className="p-5 font-bold text-sm md:text-base">Feature</div>
                                <div className="p-5 font-black text-center text-sm md:text-base border-x border-white/20">⭐ SKM</div>
                                <div className="p-5 font-bold text-center text-sm md:text-base text-white/70">Others</div>
                            </div>
                            {comparison.map((row, i) => (
                                <div
                                    key={i}
                                    className={`grid grid-cols-3 border-b border-gray-100 last:border-0 transition-colors hover:bg-blue-50/30 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                                >
                                    <div className="p-4 md:p-5 text-gray-700 text-sm font-medium">{row.feature}</div>
                                    <div className="p-4 md:p-5 flex justify-center items-center border-x border-gray-100">
                                        {row.skm === true && (
                                            <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4 md:p-5 flex justify-center items-center">
                                        {row.others === false && (
                                            <span className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                        )}
                                        {row.others === "Partial" && (
                                            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">Partial</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Specializations */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                12 Areas of <span className="text-green-600">Expertise</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="flex flex-wrap justify-center gap-3">
                        {specializations.map((s, i) => (
                            <Reveal key={i} delay={i * 40} direction="fade">
                                <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl ${s.color} font-semibold text-sm hover:scale-105 transition-transform duration-200 cursor-default`}>
                                    <span className="text-lg">{s.icon}</span>
                                    {s.name}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mini testimonials */}
            <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
                            Don&apos;t Just Take Our Word For It
                        </h2>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonialSlice.map((t, i) => (
                            <Reveal key={i} delay={i * 100} direction="up">
                                <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <Stars n={t.rating} />
                                    <blockquote className="text-gray-700 mt-4 mb-5 font-medium leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-black text-sm">
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                            <p className="text-gray-400 text-xs">{t.condition}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-green-600">
                <div className="max-w-3xl mx-auto text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Experience the SKM Difference
                        </h2>
                        <p className="text-white/80 text-xl mb-10">
                            Book your first consultation and see why thousands chose SKM for their recovery.
                        </p>
                        <a href="/book" className="inline-block px-10 py-4 rounded-2xl bg-white text-blue-700 font-black text-lg shadow-2xl hover:scale-105 transition-all duration-300">
                            Book a Free Consultation →
                        </a>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}