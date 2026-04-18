"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../../components/Reveal";

const partnerCategories = [
    {
        label: "Hospital & Healthcare Networks",
        icon: "🏥",
        color: "from-green-500 to-emerald-500",
        accent: "text-green-700",
        bg: "bg-green-50",
        border: "border-green-200",
        partners: [
            { name: "Apollo Hospitals", desc: "Post-surgical rehabilitation referrals and co-managed orthopaedic recovery programs.", abbr: "AH" },
            { name: "Fortis Healthcare", desc: "Integrated neuro-rehab protocol for stroke and TBI patients across partner wards.", abbr: "FH" },
            { name: "Max Super Speciality", desc: "Joint replacement rehab programs with SKM therapists embedded in the care pathway.", abbr: "MS" },
            { name: "Manipal Hospitals", desc: "Corporate physiotherapy wellness programs and employee health partnerships.", abbr: "MH" },
        ],
    },
    {
        label: "Sports & Athletic Organizations",
        icon: "⚽",
        color: "from-blue-500 to-cyan-500",
        accent: "text-blue-700",
        bg: "bg-blue-50",
        border: "border-blue-200",
        partners: [
            { name: "Delhi FC Academy", desc: "Official physiotherapy partner for youth and senior football squads.", abbr: "DF" },
            { name: "National Athletics Trust", desc: "Injury prevention and peak performance protocols for track & field athletes.", abbr: "NA" },
            { name: "ProGym India", desc: "In-house physiotherapy services for premium gym members across 25 locations.", abbr: "PG" },
            { name: "SportsPlex Network", desc: "On-site physiotherapy clinics within 12 multi-sport facilities.", abbr: "SP" },
        ],
    },
    {
        label: "Corporate Wellness Partners",
        icon: "💼",
        color: "from-indigo-500 to-violet-500",
        accent: "text-indigo-700",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        partners: [
            { name: "Infosys Wellness", desc: "On-site physiotherapy and ergonomics program for 10,000+ tech employees.", abbr: "IW" },
            { name: "HCL Technologies", desc: "Workplace health screening, posture correction, and RSI prevention workshops.", abbr: "HC" },
            { name: "Deloitte India", desc: "Executive wellness program including physiotherapy consultations and stress recovery.", abbr: "DE" },
            { name: "Tata Consultancy", desc: "Digital physiotherapy program enabling remote TCS employees to access SKM care.", abbr: "TC" },
        ],
    },
    {
        label: "Research & Academic Institutions",
        icon: "🔬",
        color: "from-teal-500 to-green-600",
        accent: "text-teal-700",
        bg: "bg-teal-50",
        border: "border-teal-200",
        partners: [
            { name: "AIIMS Physiotherapy Dept.", desc: "Joint clinical research on neuro-rehabilitation outcomes and protocol development.", abbr: "AI" },
            { name: "Jamia Hamdard University", desc: "Academic internship and research collaboration with physiotherapy faculty.", abbr: "JH" },
            { name: "SRM Medical College", desc: "Clinical training grounds for postgraduate physiotherapy students.", abbr: "SR" },
            { name: "Indian PT Research Society", desc: "Co-authorship on evidence-based physiotherapy publications and symposiums.", abbr: "IP" },
        ],
    },
];

const partnerLogos = [
    "Apollo", "Fortis", "Max", "Manipal", "AIIMS", "Infosys", "HCL", "Delhi FC",
    "Tata", "Deloitte", "SRM", "IPTRS", "ProGym", "SportsPlex", "NAT", "Hamdard",
];

/* Infinite marquee */
function Marquee({ items, speed = 35 }: { items: string[]; speed?: number }) {
    const doubled = [...items, ...items];
    return (
        <div className="overflow-hidden relative py-4">
            <div
                className="flex gap-6 whitespace-nowrap"
                style={{
                    animation: `marquee ${speed}s linear infinite`,
                    width: "max-content",
                }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={i}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200"
                    >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-black text-xs">
                            {item.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-gray-700 font-semibold text-sm">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* Stat with animated count */
function StatBox({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let c = 0;
                const step = value / 60;
                const t = setInterval(() => {
                    c += step;
                    if (c >= value) { setCount(value); clearInterval(t); }
                    else setCount(Math.floor(c));
                }, 20);
                obs.disconnect();
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [value]);
    return (
        <Reveal delay={delay}>
            <div ref={ref} className="bg-white rounded-3xl p-8 text-center shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                <p className="text-5xl font-black bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">{count}{suffix}</p>
                <p className="text-gray-500 font-medium mt-2 text-sm">{label}</p>
            </div>
        </Reveal>
    );
}

export default function OurPartnersPage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <main className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-green-50 pt-28 pb-24 px-6">
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-100 opacity-30 blur-3xl" />
                <div className="absolute -bottom-20 left-10 w-80 h-80 rounded-full bg-blue-100 opacity-25 blur-3xl" />

                <div className="relative max-w-5xl mx-auto">
                    <div className="text-center">
                        <Reveal delay={0}>
                            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold mb-8">
                                🤝 Trusted Partnerships
                            </span>
                        </Reveal>
                        <Reveal delay={100}>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter mb-6">
                                Our <span className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-600 bg-clip-text text-transparent">Partners</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                                SKM Physiotherapy collaborates with leading hospitals, sports organisations, corporates, and research institutions to deliver care that transforms lives — at scale.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Marquee strip */}
            <section className="py-6 bg-gray-50 border-y border-gray-100 overflow-hidden">
                <Marquee items={partnerLogos} speed={40} />
            </section>

            {/* Stats */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
                    <StatBox value={40} suffix="+" label="Active Partners" delay={0} />
                    <StatBox value={12} suffix="+" label="Hospital Networks" delay={80} />
                    <StatBox value={15} suffix="+" label="Corporate Clients" delay={160} />
                    <StatBox value={6} suffix="+" label="Research Partners" delay={240} />
                </div>
            </section>

            {/* Partner category tabs */}
            <section className="py-20 px-6 bg-gradient-to-b from-white to-green-50">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Partnership <span className="text-green-600">Ecosystem</span>
                            </h2>
                        </div>
                    </Reveal>

                    {/* Tabs */}
                    <Reveal delay={100}>
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {partnerCategories.map((cat, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === i
                                        ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span className="hidden sm:inline">{cat.label.split(" ")[0]}</span>
                                    <span className="sm:hidden">{cat.icon}</span>
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    {/* Partner cards */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {partnerCategories[activeTab].partners.map((p, i) => (
                            <Reveal key={`${activeTab}-${i}`} delay={i * 80} direction="up">
                                <div className={`h-full rounded-3xl border-2 ${partnerCategories[activeTab].border} bg-white p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partnerCategories[activeTab].color} flex items-center justify-center text-white font-black text-base shadow-md`}>
                                            {p.abbr}
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-900">{p.name}</h3>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                                    <div className="mt-5">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${partnerCategories[activeTab].bg} ${partnerCategories[activeTab].accent}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                            Active Partnership
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Category description */}
                    <Reveal delay={200}>
                        <div className={`mt-10 p-8 rounded-3xl bg-gradient-to-r ${partnerCategories[activeTab].color} text-white`}>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">{partnerCategories[activeTab].icon}</span>
                                <h3 className="text-xl font-black">{partnerCategories[activeTab].label}</h3>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                                Our {partnerCategories[activeTab].label.toLowerCase()} partnerships are built on shared values of patient-first care, clinical excellence, and measurable health outcomes. Every collaboration is structured to improve access to quality physiotherapy for more people.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Partnership benefits */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                                Become a <span className="text-blue-600">Partner</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-xl mx-auto">
                                If you&apos;re a hospital, sports club, or organization looking to bring best-in-class physiotherapy to your community, let&apos;s talk.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: "📋", title: "White-Label Integration", desc: "Our therapists work under your brand within your facility — seamless for patients and staff.", color: "from-green-500 to-emerald-500" },
                            { icon: "🔗", title: "Referral Partnership", desc: "Two-way referral programs that ensure your patients and ours get the best specialist care available.", color: "from-blue-500 to-indigo-500" },
                            { icon: "📊", title: "Research Collaboration", desc: "Co-author studies, share outcome data, and contribute to advancing the field of evidence-based physiotherapy.", color: "from-indigo-500 to-violet-500" },
                        ].map((b, i) => (
                            <Reveal key={i} delay={i * 90} direction="up">
                                <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg`}>
                                        {b.icon}
                                    </div>
                                    <h3 className="font-extrabold text-gray-900 text-lg mb-3">{b.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={200} direction="scale">
                        <div className="text-center">
                            <a href="mailto:partners@skmphysio.com" className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 text-white font-black text-lg shadow-xl hover:scale-105 transition-all duration-300">
                                Partner With SKM →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
        </main>
    );
}