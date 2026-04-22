"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../../components/Reveal";

function AnimCount({ to, suffix = "", prefix = "", duration = 2000 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let cur = 0;
                const step = to / (duration / 16);
                const t = setInterval(() => {
                    cur += step;
                    if (cur >= to) { setVal(to); clearInterval(t); }
                    else setVal(Math.floor(cur));
                }, 16);
                obs.disconnect();
            }
        }, { threshold: 0.4 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [to, duration]);
    return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

const impactNumbers = [
    { value: 15000, suffix: "+", label: "Patients Treated", icon: "❤️", color: "from-green-500 to-emerald-500", desc: "Lives touched across all SKM branches" },
    { value: 92, suffix: "%", label: "Full Recovery Rate", icon: "🎯", color: "from-blue-500 to-cyan-500", desc: "Patients achieving their recovery goals" },
    { value: 8, suffix: "+", label: "Clinic Branches", icon: "🏥", color: "from-indigo-500 to-violet-500", desc: "Across the region and growing" },
    { value: 50000, suffix: "+", label: "Sessions Delivered", icon: "🙌", color: "from-teal-500 to-green-600", desc: "Hours of dedicated therapeutic care" },
    { value: 35, suffix: "+", label: "Expert Therapists", icon: "👨‍⚕️", color: "from-sky-500 to-blue-600", desc: "Certified specialists across all domains" },
    { value: 15, suffix: "+", label: "Years of Service", icon: "🗓️", color: "from-green-600 to-teal-500", desc: "Continuous care since 2008" },
];

const conditions = [
    { name: "Back & Spine", treated: 3800, icon: "🦴", pct: 82 },
    { name: "Sports Injuries", treated: 2900, icon: "⚽", pct: 96 },
    { name: "Post-Surgical", treated: 2200, icon: "🏥", pct: 88 },
    { name: "Stroke / Neuro", treated: 1800, icon: "🧠", pct: 74 },
    { name: "Pediatric", treated: 1200, icon: "👶", pct: 91 },
    { name: "Arthritis / Joints", treated: 2100, icon: "🤲", pct: 79 },
];

const stories = [
    {
        name: "Sanjay Rawat",
        age: 58,
        condition: "Stroke Recovery",
        duration: "6 months",
        outcome: "Regained full hand function and independent walking",
        quote: "I was told I might never use my right hand again. My daughter found SKM. Today I drive myself to the market.",
        gradient: "from-green-500 to-emerald-500",
        avatar: "SR",
    },
    {
        name: "Priya Nambiar",
        age: 26,
        condition: "ACL Reconstruction",
        duration: "5 months",
        outcome: "Returned to competitive football at national level",
        quote: "SKM didn't just heal my knee. They made it stronger than it ever was before the injury.",
        gradient: "from-blue-500 to-indigo-500",
        avatar: "PN",
    },
    {
        name: "Meena Iyer",
        age: 72,
        condition: "Hip Replacement Rehab",
        duration: "3 months",
        outcome: "Pain-free daily living and stairs independently",
        quote: "I was afraid I'd spend the rest of my life with a walker. Now I dance at my granddaughter's wedding.",
        gradient: "from-indigo-500 to-teal-500",
        avatar: "MI",
    },
];

const communityInitiatives = [
    { icon: "🏫", title: "School Posture Camps", count: "120+ schools", desc: "Free posture assessment and awareness camps for children." },
    { icon: "🌾", title: "Rural Outreach Program", count: "30+ villages", desc: "Bringing physiotherapy to underserved rural communities at no cost." },
    { icon: "🎖️", title: "Veterans Rehabilitation", count: "500+ ex-servicemen", desc: "Dedicated rehab programs for retired military and police personnel." },
    { icon: "💻", title: "Tele-Physio Access", count: "2000+ remote patients", desc: "Online physiotherapy sessions for patients who can't visit in person." },
];

function ProgressBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setTimeout(() => setWidth(pct), 100);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [pct]);
    return (
        <div ref={ref} className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full bg-gradient-to-r ${color}`}
                style={{ width: `${width}%`, transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms` }}
            />
        </div>
    );
}

export default function OurImpactPage() {
    return (
        <main className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 pt-28 pb-24 px-6">
                <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-green-100 opacity-30 blur-3xl" />
                <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-100 opacity-25 blur-3xl" />

                <div className="relative max-w-5xl mx-auto text-center">
                    <Reveal delay={0}>
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-8">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Measuring What Matters
                        </span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter mb-6">
                            Our{" "}
                            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                Impact
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={220}>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Numbers tell part of the story. But behind every stat is a person who stood up straighter, walked further, or returned to the sport they love.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Big numbers */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-14">
                            The Numbers Behind <span className="text-green-600">the Mission</span>
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {impactNumbers.map((n, i) => (
                            <Reveal key={i} delay={i * 70} direction="up">
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 text-center group">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${n.color} flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {n.icon}
                                    </div>
                                    <p className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${n.color} bg-clip-text text-transparent`}>
                                        <AnimCount to={n.value} suffix={n.suffix} />
                                    </p>
                                    <p className="text-gray-900 font-extrabold text-lg mt-1">{n.label}</p>
                                    <p className="text-gray-400 text-xs mt-1">{n.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditions treated */}
            <section className="py-24 px-6 bg-gradient-to-b from-white to-indigo-50">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Recovery Across <span className="text-indigo-600">Every Condition</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="space-y-6">
                        {conditions.map((c, i) => (
                            <Reveal key={i} delay={i * 80} direction="left">
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{c.icon}</span>
                                            <span className="font-extrabold text-gray-900">{c.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-green-600">{c.pct}%</span>
                                            <p className="text-xs text-gray-400">{c.treated.toLocaleString()}+ treated</p>
                                        </div>
                                    </div>
                                    <ProgressBar
                                        pct={c.pct}
                                        color={i % 3 === 0 ? "from-green-400 to-emerald-500" : i % 3 === 1 ? "from-blue-400 to-indigo-500" : "from-indigo-400 to-teal-500"}
                                        delay={i * 80}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Recovery success rate</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Patient impact stories */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-5">Real Recoveries</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Three Stories. <span className="text-blue-600">Life-Changing.</span>
                            </h2>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {stories.map((s, i) => (
                            <Reveal key={i} delay={i * 100} direction="up">
                                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                                    <div className={`bg-gradient-to-br ${s.gradient} p-7`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur flex items-center justify-center text-white font-black">
                                                {s.avatar}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">{s.name}</p>
                                                <p className="text-white/70 text-sm">Age {s.age}</p>
                                            </div>
                                        </div>
                                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-3">{s.condition}</span>
                                        <blockquote className="text-white/90 text-sm leading-relaxed italic">&ldquo;{s.quote}&rdquo;</blockquote>
                                    </div>
                                    <div className="p-6 bg-white flex-1">
                                        <div className="flex gap-4 mb-4">
                                            <div className="flex-1 bg-gray-50 rounded-2xl p-3 text-center">
                                                <p className="text-xs text-gray-400 font-medium">Duration</p>
                                                <p className="text-sm font-black text-gray-900 mt-0.5">{s.duration}</p>
                                            </div>
                                        </div>
                                        <div className="bg-green-50 rounded-2xl p-4">
                                            <p className="text-xs text-green-600 font-black uppercase tracking-wide mb-1">Outcome</p>
                                            <p className="text-gray-700 text-sm font-medium">{s.outcome}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community initiatives */}
            <section className="py-24 px-6 bg-gradient-to-br from-green-50 to-teal-50">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-14">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-bold mb-5">Giving Back</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                Community <span className="text-teal-600">Initiatives</span>
                            </h2>
                            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                                Our impact doesn&apos;t stop at our clinic doors. SKM actively takes physiotherapy to communities that need it most.
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {communityInitiatives.map((c, i) => (
                            <Reveal key={i} delay={i * 80} direction="up">
                                <div className="bg-white rounded-3xl p-8 border border-teal-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-5">
                                    <span className="text-4xl flex-shrink-0">{c.icon}</span>
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <h3 className="font-extrabold text-gray-900">{c.title}</h3>
                                            <span className="px-3 py-0.5 bg-teal-100 text-teal-700 text-xs font-black rounded-full whitespace-nowrap">{c.count}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Satisfaction pulse */}
            <section className="py-20 px-6 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4">Overall Patient Satisfaction</p>
                        <p className="text-8xl md:text-[120px] font-black text-white leading-none">
                            <AnimCount to={98} suffix="%" />
                        </p>
                        <p className="text-white/70 text-xl mt-4 max-w-xl mx-auto">
                            Based on 10,000+ post-treatment patient surveys conducted since 2018.
                        </p>
                    </Reveal>
                </div>
            </section>


        </main>
    );
}