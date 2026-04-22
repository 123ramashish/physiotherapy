"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../../components/Reveal";

/* ─── Timeline data ─── */
const milestones = [
    {
        year: "2008",
        era: "The Spark",
        title: "A Graduate With a Dream",
        story:
            "Fresh out of physiotherapy college, most of his batchmates headed straight for hospital jobs and comfortable salaries. He chose a different path — a bicycle, a bag full of therapy tools, and an unshakeable belief that healing should come to the patient, not the other way around. He started visiting patients at their homes across the city, one doorstep at a time.",
        icon: "🎓",
        color: "from-green-500 to-emerald-400",
        badge: "bg-green-100 text-green-700",
        accent: "text-green-600",
        border: "border-green-200",
        bg: "bg-green-50",
        stat: "1 therapist. Infinite determination.",
    },
    {
        year: "2010",
        era: "The Hustle",
        title: "House Calls & Hard Lessons",
        story:
            "For two years, he criss-crossed the city daily — treating post-surgery patients in living rooms, elderly arthritis patients in their bedrooms, and stroke survivors who couldn't leave their beds. He carried equipment on his back, studied late into the night, and built something money couldn't buy: unconditional patient trust. Word spread through families, neighbourhoods, entire apartment complexes.",
        icon: "🚴",
        color: "from-blue-500 to-cyan-400",
        badge: "bg-blue-100 text-blue-700",
        accent: "text-blue-600",
        border: "border-blue-200",
        bg: "bg-blue-50",
        stat: "50+ home patients. Zero clinic. All heart.",
    },
    {
        year: "2012",
        era: "The Leap",
        title: "One Bed. One Room. One Mission.",
        story:
            "With savings scraped together from two years of home visits, he rented a tiny room — barely enough space to swing a resistance band — and placed a single treatment bed in the center. That humble room became the first SKM Physiotherapy clinic. It smelled of liniment and ambition. Some weeks, appointments barely covered the rent. But not one patient left without feeling better.",
        icon: "🛏️",
        color: "from-indigo-500 to-blue-500",
        badge: "bg-indigo-100 text-indigo-700",
        accent: "text-indigo-600",
        border: "border-indigo-200",
        bg: "bg-indigo-50",
        stat: "1 treatment bed. Hundreds of recoveries.",
    },
    {
        year: "2015",
        era: "The Growth",
        title: "When Reputation Outgrows Four Walls",
        story:
            "Word of mouth is the most honest marketing. By 2015, the waiting list was longer than the clinic itself. He hired his first associate therapist, moved to a bigger space, and introduced specialized programs for sports injuries and neurological rehabilitation. SKM was no longer a one-man show — it was becoming a movement.",
        icon: "📈",
        color: "from-teal-500 to-green-500",
        badge: "bg-teal-100 text-teal-700",
        accent: "text-teal-600",
        border: "border-teal-200",
        bg: "bg-teal-50",
        stat: "First team. First specialization programs.",
    },
    {
        year: "2019",
        era: "The Expansion",
        title: "SKM Goes Multi-Branch",
        story:
            "What started with a bicycle route was now a network. SKM Physiotherapy opened its second, then third branches — each one designed with the warmth of the original vision but equipped with modern technology. Ultrasound therapy, electrotherapy units, hydrotherapy pools. The bicycle-riding graduate now led a team of certified specialists. The mission remained identical: every patient, extraordinary care.",
        icon: "🏢",
        color: "from-sky-500 to-blue-600",
        badge: "bg-sky-100 text-sky-700",
        accent: "text-sky-600",
        border: "border-sky-200",
        bg: "bg-sky-50",
        stat: "3 branches. 12 therapists. 1 vision.",
    },
    {
        year: "2024",
        era: "The Legacy",
        title: "From One Bed to a Movement",
        story:
            "Today, SKM Physiotherapy stands as one of the region's most trusted rehabilitation networks — with multiple branches, a team of passionate professionals, and thousands of lives genuinely transformed. But visit any of our clinics and you'll still feel it: that same undivided attention that a graduate once gave in someone's living room. The bicycle is retired. The mission is not.",
        icon: "🌟",
        color: "from-green-600 to-teal-500",
        badge: "bg-green-100 text-green-800",
        accent: "text-green-700",
        border: "border-green-300",
        bg: "bg-gradient-to-br from-green-50 to-teal-50",
        stat: "Multi-branch. Thousands healed. Still growing.",
    },
];

const values = [
    { icon: "💚", title: "Patient First, Always", desc: "Every decision — clinical or operational — starts with one question: Is this best for the patient?" },
    { icon: "🔬", title: "Evidence-Based Care", desc: "Every protocol is rooted in current research. We evolve as science evolves." },
    { icon: "🤝", title: "Compassion Without Compromise", desc: "We treat the person, not just the condition. Empathy is non-negotiable." },
    { icon: "🚀", title: "Innovation with Integrity", desc: "New technologies, new techniques — adopted thoughtfully, applied honestly." },
];

/* ─── Animated number ─── */
function AnimatedNumber({ n, suffix = "" }: { n: number; suffix?: string }) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let cur = 0;
                const inc = n / 70;
                const t = setInterval(() => {
                    cur += inc;
                    if (cur >= n) { setVal(n); clearInterval(t); }
                    else setVal(Math.floor(cur));
                }, 18);
                obs.disconnect();
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [n]);
    return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Parallax hero text ─── */
function ParallaxHero() {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const fn = () => setOffset(window.scrollY * 0.35);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return (
        <div style={{ transform: `translateY(${offset}px)` }} className="transition-none">
            <span className="block text-7xl md:text-[120px] font-black leading-none tracking-tighter text-gray-900">
                SKM
            </span>
            <span className="block text-4xl md:text-6xl font-black leading-none tracking-tight bg-gradient-to-r from-green-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Physiotherapy
            </span>
        </div>
    );
}

export default function OurStoryPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    /* Auto-advance timeline */
    useEffect(() => {
        const t = setInterval(() => {
            setActiveIndex((i) => (i + 1) % milestones.length);
        }, 4500);
        return () => clearInterval(t);
    }, []);

    return (
        <main className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>

            {/* ── Hero ── */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-20">
                {/* bg mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-indigo-50" />
                <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-radial from-blue-100 to-transparent opacity-50 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-green-100 to-transparent opacity-40 blur-3xl" />

                {/* Floating decorative circles */}
                {[
                    { size: "w-4 h-4", pos: "top-32 left-[15%]", color: "bg-green-400", delay: "0s" },
                    { size: "w-3 h-3", pos: "top-48 right-[20%]", color: "bg-blue-400", delay: "0.5s" },
                    { size: "w-5 h-5", pos: "bottom-40 left-[25%]", color: "bg-indigo-400", delay: "1s" },
                    { size: "w-2 h-2", pos: "bottom-32 right-[30%]", color: "bg-green-300", delay: "1.5s" },
                ].map((dot, i) => (
                    <div
                        key={i}
                        className={`absolute ${dot.size} ${dot.pos} ${dot.color} rounded-full opacity-60`}
                        style={{ animation: `pulse 3s ease-in-out ${dot.delay} infinite` }}
                    />
                ))}

                <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Reveal delay={0}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-8 tracking-wide">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Est. 2008 — Our Journey
                            </span>
                        </Reveal>
                        <Reveal delay={100}>
                            <ParallaxHero />
                        </Reveal>
                        <Reveal delay={250}>
                            <p className="mt-8 text-xl text-gray-500 leading-relaxed max-w-lg">
                                From a single graduate with a bicycle and a bag of tools, to a multi-branch physiotherapy network trusted by thousands — this is a story about refusing to take the easy road.
                            </p>
                        </Reveal>
                        <Reveal delay={380}>
                            <div className="flex flex-wrap gap-4 mt-10">
                                <a href="#journey" className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-105 transition-all duration-300">
                                    Read Our Story ↓
                                </a>
                                <a href="/why-skm" className="px-7 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-green-400 hover:text-green-600 transition-all duration-300">
                                    Why SKM?
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    {/* Stats card */}
                    <Reveal delay={200} direction="right">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { n: 15, suffix: "+", label: "Years of Healing", icon: "🗓️", grad: "from-green-500 to-emerald-400" },
                                { n: 5000, suffix: "+", label: "Patients Treated", icon: "❤️", grad: "from-blue-500 to-cyan-500" },
                                { n: 8, suffix: "+", label: "Clinic Branches", icon: "🏥", grad: "from-indigo-500 to-blue-500" },
                                { n: 98, suffix: "%", label: "Satisfaction Rate", icon: "⭐", grad: "from-teal-500 to-green-500" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <span className="text-2xl block mb-2">{s.icon}</span>
                                    <p className={`text-3xl font-black bg-gradient-to-r ${s.grad} bg-clip-text text-transparent`}>
                                        <AnimatedNumber n={s.n} suffix={s.suffix} />
                                    </p>
                                    <p className="text-gray-500 text-sm font-medium mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center pt-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* ── The Journey ── */}
            <section id="journey" className="py-28 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-20">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-5">
                                The Journey
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                                From Bicycle to<br />
                                <span className="bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent">
                                    Branches Citywide
                                </span>
                            </h2>
                            <p className="text-gray-400 mt-5 text-lg max-w-xl mx-auto">
                                Each chapter of this story is built on sweat, service, and an uncompromising love for physiotherapy.
                            </p>
                        </div>
                    </Reveal>

                    {/* Desktop: alternating timeline */}
                    <div className="relative hidden md:block">
                        {/* Center spine */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-300 via-blue-300 to-indigo-400 -translate-x-1/2" />

                        {milestones.map((m, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <Reveal key={i} delay={i * 60} direction={isLeft ? "left" : "right"}>
                                    <div className={`relative flex items-center mb-16 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                                        {/* Card */}
                                        <div className={`w-[45%] ${isLeft ? "mr-auto pr-10" : "ml-auto pl-10"}`}>
                                            <div
                                                className={`rounded-3xl border-2 ${m.border} ${m.bg} p-8 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group`}
                                                onClick={() => setActiveIndex(i)}
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-3xl">{m.icon}</span>
                                                    <div>
                                                        <span className={`text-xs font-black uppercase tracking-widest ${m.accent}`}>{m.era}</span>
                                                        <p className="text-2xl font-black text-gray-900 leading-tight">{m.year}</p>
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{m.title}</h3>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-5">{m.story}</p>
                                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${m.color} text-white text-xs font-bold`}>
                                                    {m.stat}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Center dot */}
                                        <div className="absolute left-1/2 -translate-x-1/2 z-10">
                                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${m.color} shadow-xl flex items-center justify-center text-2xl border-4 border-white`}>
                                                {m.icon}
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    {/* Mobile: stacked cards */}
                    <div className="md:hidden space-y-6">
                        {milestones.map((m, i) => (
                            <Reveal key={i} delay={i * 50}>
                                <div className={`rounded-3xl border-2 ${m.border} ${m.bg} p-7 shadow-sm`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-xl shadow`}>{m.icon}</div>
                                        <div>
                                            <span className={`text-xs font-black uppercase tracking-widest ${m.accent}`}>{m.era}</span>
                                            <p className="text-xl font-black text-gray-900">{m.year}</p>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-3">{m.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{m.story}</p>
                                    <div className={`inline-flex px-3 py-1.5 rounded-full bg-gradient-to-r ${m.color} text-white text-xs font-bold`}>{m.stat}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Founder Quote ── */}
            <section className="py-20 px-6 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal direction="scale">
                        <span className="text-8xl leading-none block mb-6 opacity-30">&ldquo;</span>
                        <blockquote className="text-2xl md:text-4xl font-light text-white leading-relaxed -mt-10">
                            I never wanted to build a clinic. I wanted to build a culture — where every patient is treated like they are the only patient. The beds multiplied. The belief never changed.
                        </blockquote>
                        <div className="mt-10 flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-black text-white">
                                SKM
                            </div>
                            <p className="text-white font-bold text-lg">Founder, SKM Physiotherapy</p>
                            <p className="text-white/60 text-sm">Physiotherapist · Entrepreneur · Visionary</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-5">Our DNA</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                What We Stand For
                            </h2>
                        </div>
                    </Reveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <Reveal key={i} delay={i * 90} direction="up">
                                <div className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center h-full">
                                    <span className="text-5xl block mb-4">{v.icon}</span>
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-3">{v.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-green-50">
                <div className="max-w-3xl mx-auto text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                            Be Part of the Next Chapter
                        </h2>
                        <p className="text-gray-500 text-xl mb-10 leading-relaxed">
                            Whether you&apos;re a patient seeking recovery or a therapist wanting to make a difference — SKM is where your story continues.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/work-with-skm-physiotherapy" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300">
                                Join Our Team
                            </a>
                            <a href="/our-impact" className="px-8 py-4 rounded-2xl border-2 border-indigo-200 text-indigo-700 font-bold text-lg hover:bg-indigo-50 transition-all duration-300">
                                See Our Impact →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
        </main>
    );
}