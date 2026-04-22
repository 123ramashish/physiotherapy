"use client";

import { useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";

/* ─── Data ─── */
const awards = [
    {
        year: "2024",
        title: "Best Physiotherapy Clinic — India",
        org: "Healthcare Excellence Awards",
        icon: "🏆",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-50",
        border: "border-amber-200",
        accent: "text-amber-700",
        desc: "Recognized for outstanding patient outcomes, innovative rehabilitation protocols, and contribution to community health.",
    },
    {
        year: "2023",
        title: "Top Employer in Allied Health",
        org: "Great Places to Work India",
        icon: "🌟",
        gradient: "from-green-500 to-emerald-600",
        bg: "bg-green-50",
        border: "border-green-200",
        accent: "text-green-700",
        desc: "Ranked in the top 10 healthcare employers in India for employee satisfaction, culture, and professional growth.",
    },
    {
        year: "2023",
        title: "Excellence in Sports Rehabilitation",
        org: "Indian Sports Medicine Association",
        icon: "🏅",
        gradient: "from-blue-500 to-cyan-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        accent: "text-blue-700",
        desc: "Awarded for pioneering athlete rehabilitation programs that have aided national-level sports professionals.",
    },
    {
        year: "2022",
        title: "Innovation in Neuro Rehabilitation",
        org: "Neuro Rehab Society of India",
        icon: "🧠",
        gradient: "from-indigo-500 to-violet-600",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        accent: "text-indigo-700",
        desc: "Recognized for the development of a hybrid technology-assisted neuro rehab program improving stroke recovery rates.",
    },
    {
        year: "2021",
        title: "Patient Choice Award",
        org: "Practo Health Awards",
        icon: "❤️",
        gradient: "from-rose-500 to-pink-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
        accent: "text-rose-700",
        desc: "Voted Best Physiotherapy Chain by over 10,000 patients across the Practo platform for three consecutive years.",
    },
    {
        year: "2020",
        title: "Excellence in Telehealth",
        org: "Digital Health Forum India",
        icon: "📱",
        gradient: "from-teal-500 to-green-600",
        bg: "bg-teal-50",
        border: "border-teal-200",
        accent: "text-teal-700",
        desc: "Pioneered remote physiotherapy services during COVID-19, earning recognition for access and quality of virtual care.",
    },
];

const certifications = [
    {
        title: "ISO 9001:2015 Certified",
        body: "Bureau Veritas",
        icon: "🛡️",
        valid: "Valid till 2026",
        gradient: "from-green-500 to-emerald-600",
        category: "Quality",
    },
    {
        title: "NABH Accredited",
        body: "National Accreditation Board for Hospitals",
        icon: "🏥",
        valid: "Accredited 2022",
        gradient: "from-blue-500 to-sky-600",
        category: "Healthcare",
    },
    {
        title: "McKenzie Institute Certified",
        body: "McKenzie Institute International",
        icon: "🔬",
        valid: "Ongoing",
        gradient: "from-indigo-500 to-blue-600",
        category: "Clinical",
    },
    {
        title: "Maitland Manual Therapy",
        body: "IFOMPT Affiliated",
        icon: "🤲",
        valid: "Ongoing",
        gradient: "from-teal-500 to-green-600",
        category: "Clinical",
    },
    {
        title: "Dry Needling Certification",
        body: "INDN — India",
        icon: "💉",
        valid: "Recertified 2024",
        gradient: "from-sky-500 to-blue-600",
        category: "Clinical",
    },
    {
        title: "Bobath NDT Certified",
        body: "IBITA International",
        icon: "🧬",
        valid: "Ongoing",
        gradient: "from-violet-500 to-indigo-600",
        category: "Neuro",
    },
    {
        title: "PNF Stretching Certified",
        body: "IPNFA International",
        icon: "💪",
        valid: "Recertified 2023",
        gradient: "from-green-600 to-teal-500",
        category: "Sports",
    },
    {
        title: "Certified Mulligan Practitioner",
        body: "Mulligan Concept Teachers Association",
        icon: "🔧",
        valid: "Ongoing",
        gradient: "from-blue-600 to-indigo-600",
        category: "Clinical",
    },
    {
        title: "Health & Safety Excellence",
        body: "NSC India Safety Council",
        icon: "⚕️",
        valid: "Annually Renewed",
        gradient: "from-green-500 to-lime-500",
        category: "Quality",
    },
];

const memberships = [
    { name: "Indian Association of Physiotherapists (IAP)", icon: "🏛️" },
    { name: "Indian Physiotherapy Association — Maharashtra Chapter", icon: "🤝" },
    { name: "World Physiotherapy (formerly WCPT)", icon: "🌍" },
    { name: "Sports Physical Therapy Section (SPTS)", icon: "⚽" },
    { name: "International Federation of Orthopaedic Manipulative Physical Therapists", icon: "🦴" },
];

const categories = ["All", "Quality", "Healthcare", "Clinical", "Neuro", "Sports"];

/* ─── Components ─── */
function AwardCard({ a, i }: { a: typeof awards[0]; i: number }) {
    const [flipped, setFlipped] = useState(false);
    return (
        <AnimatedSection delay={i * 80} direction="up">
            <div
                className="cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => setFlipped(!flipped)}
            >
                <div
                    style={{
                        position: "relative",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
                        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        height: "280px",
                    }}
                >
                    {/* Front */}
                    <div
                        className={`absolute inset-0 rounded-3xl border-2 ${a.border} ${a.bg} p-7 shadow-sm`}
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${a.gradient} shadow-lg mb-4`}>
                            <span className="text-2xl">{a.icon}</span>
                        </div>
                        <span className={`text-xs font-bold ${a.accent} block mb-1`}>{a.year}</span>
                        <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-2">{a.title}</h3>
                        <p className="text-gray-500 text-sm">{a.org}</p>
                        <p className={`text-xs font-semibold ${a.accent} mt-4`}>Tap to learn more →</p>
                    </div>
                    {/* Back */}
                    <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${a.gradient} p-7 flex flex-col justify-center`}
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        <span className="text-4xl mb-4">{a.icon}</span>
                        <p className="text-white/90 text-sm leading-relaxed">{a.desc}</p>
                        <p className="text-white font-bold mt-4 text-sm">— {a.org}, {a.year}</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

export default function AwardsCertificationsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = activeCategory === "All"
        ? certifications
        : certifications.filter((c) => c.category === activeCategory);

    return (
        <main className="bg-white min-h-screen font-sans">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-green-50 pt-24 pb-20 px-6">
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-200 opacity-25 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-green-200 opacity-25 blur-3xl" />
                {/* Floating decorative badges */}
                <div className="absolute top-20 right-10 md:right-32 w-14 h-14 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center text-2xl animate-bounce" style={{ animationDuration: "3s" }}>🏆</div>
                <div className="absolute bottom-20 left-10 md:left-32 w-14 h-14 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-2xl animate-bounce" style={{ animationDuration: "4s" }}>🛡️</div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <AnimatedSection delay={0}>
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700 mb-6">
                            🏆 Recognized Excellence Since 2012
                        </span>
                    </AnimatedSection>
                    <AnimatedSection delay={100}>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                            Awards &{" "}
                            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                                Certifications
                            </span>
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Our commitment to clinical excellence, patient safety, and continuous learning is validated by leading healthcare organizations across India and globally.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Timeline badges */}
            <section className="py-6 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 overflow-x-auto">
                <div className="flex items-center gap-6 justify-center max-w-5xl mx-auto min-w-max px-2">
                    {["2021", "2022", "2023", "2024", "2025", "2026"].map((y, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white/60" />
                            <span className="text-white/80 text-sm font-semibold">{y}</span>
                            {i < 7 && <div className="w-12 h-px bg-white/30" />}
                        </div>
                    ))}
                </div>
            </section>

            {/* Awards */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
                                Industry Recognition
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                Our <span className="text-amber-500">Awards</span>
                            </h2>
                            <p className="text-gray-400 mt-3 text-sm">Tap any card to read the story behind the award</p>
                        </div>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {awards.map((a, i) => (
                            <AwardCard key={i} a={a} i={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-10">
                            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                                Professional Standards
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                Our <span className="text-green-600">Certifications</span>
                            </h2>
                        </div>
                    </AnimatedSection>

                    {/* Filter tabs */}
                    <AnimatedSection delay={100}>
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setActiveCategory(c)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === c
                                        ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-md scale-105"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((c, i) => (
                            <AnimatedSection key={`${activeCategory}-${i}`} delay={i * 60} direction="up">
                                <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                    <div className={`h-2 bg-gradient-to-r ${c.gradient}`} />
                                    <div className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-xl shadow-md flex-shrink-0`}>
                                                {c.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{c.category}</p>
                                                <h3 className="font-extrabold text-gray-900 text-base leading-tight mb-1">{c.title}</h3>
                                                <p className="text-gray-500 text-sm">{c.body}</p>
                                                <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                                                    ✓ {c.valid}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Memberships */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                                Global Affiliations
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                Professional <span className="text-blue-600">Memberships</span>
                            </h2>
                        </div>
                    </AnimatedSection>

                    <div className="space-y-4">
                        {memberships.map((m, i) => (
                            <AnimatedSection key={i} delay={i * 80} direction="left">
                                <div className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 group">
                                    <span className="text-3xl">{m.icon}</span>
                                    <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{m.name}</p>
                                    <div className="ml-auto flex-shrink-0">
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-medium">Member</span>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust badges row */}
            <section className="py-14 px-6 bg-gradient-to-br from-indigo-50 to-blue-50">
                <AnimatedSection>
                    <div className="max-w-4xl mx-auto text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900">Trusted By Thousands</h2>
                        <p className="text-gray-500 mt-2">Every credential reflects our unwavering promise to patient safety and clinical excellence.</p>
                    </div>
                </AnimatedSection>
                <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { icon: "🛡️", label: "NABH Accredited" },
                        { icon: "✅", label: "ISO 9001:2015" },
                        { icon: "🌍", label: "World Physiotherapy" },
                        { icon: "⭐", label: "Top Rated Clinics" },
                    ].map((b, i) => (
                        <AnimatedSection key={i} delay={i * 80}>
                            <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-4xl">{b.icon}</span>
                                <span className="text-sm font-bold text-gray-700">{b.label}</span>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>


        </main>
    );
}