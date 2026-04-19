"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";

const featured = {
    name: "Priya Sharma",
    role: "Marathon Runner, Delhi",
    avatar: "PS",
    quote:
        "After my ACL reconstruction, I honestly thought my running days were over. The team at PhysioFirst gave me my life back. Their evidence-based approach and relentless encouragement had me crossing the finish line of the Mumbai Marathon just 11 months post-surgery.",
    rating: 5,
    tag: "ACL Rehabilitation",
    gradient: "from-green-500 to-emerald-600",
};

const testimonials = [
    {
        name: "Rahul Verma",
        role: "Software Engineer, Bengaluru",
        avatar: "RV",
        quote:
            "Years of desk work left me with debilitating lower back pain. PhysioFirst's posture correction program changed everything. Within 6 weeks, I was pain-free and had ergonomic habits that actually stuck.",
        rating: 5,
        tag: "Back Pain",
        color: "border-green-200",
        accent: "text-green-600",
        bg: "bg-green-50",
    },
    {
        name: "Anita Menon",
        role: "Homemaker, Chennai",
        avatar: "AM",
        quote:
            "Post-stroke rehabilitation can feel overwhelming, but my therapist's patience and specialized neuro techniques helped me regain hand function I thought was permanently lost. Truly miraculous professionals.",
        rating: 5,
        tag: "Stroke Recovery",
        color: "border-blue-200",
        accent: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        name: "Karan Mehta",
        role: "Cricket Player, Pune",
        avatar: "KM",
        quote:
            "Shoulder impingement was threatening my cricket career. The sports rehab team designed a progressive program that not only healed my shoulder but made it stronger than before the injury.",
        rating: 5,
        tag: "Sports Injury",
        color: "border-indigo-200",
        accent: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        name: "Suresh Nair",
        role: "Retired Teacher, Kochi",
        avatar: "SN",
        quote:
            "Knee arthritis was making me dependent on everyone. The gentle exercise program and manual therapy have given me independence again. I can climb stairs, walk to the market — the simple joys mean everything.",
        rating: 5,
        tag: "Knee Arthritis",
        color: "border-teal-200",
        accent: "text-teal-600",
        bg: "bg-teal-50",
    },
    {
        name: "Meera Joshi",
        role: "Dance Teacher, Mumbai",
        avatar: "MJ",
        quote:
            "Plantar fasciitis was ending my dance career at 34. PhysioFirst's biomechanical assessment identified the root cause. Eight weeks of targeted therapy and I'm back teaching five classes a week.",
        rating: 5,
        tag: "Foot & Ankle",
        color: "border-sky-200",
        accent: "text-sky-600",
        bg: "bg-sky-50",
    },
    {
        name: "Deepak Gupta",
        role: "Gym Owner, Hyderabad",
        avatar: "DG",
        quote:
            "My rotator cuff tear required surgery, and I was worried about the rehab. The post-op program was perfectly paced. They communicated with my surgeon at every step. Outstanding coordination of care.",
        rating: 5,
        tag: "Post-Surgery Rehab",
        color: "border-green-200",
        accent: "text-green-600",
        bg: "bg-green-50",
    },
];

const videoTestimonials = [
    { name: "Lakshmi Rao", role: "Yoga Instructor", thumb: "LR", tag: "Sciatica Relief", duration: "2:14" },
    { name: "Vikram Singh", role: "Army Officer", thumb: "VS", tag: "Post-fracture Rehab", duration: "3:02" },
    { name: "Nisha Patel", role: "Graphic Designer", thumb: "NP", tag: "Neck & Shoulder Pain", duration: "1:47" },
];

const stats = [
    { val: "98%", label: "Patient Satisfaction" },
    { val: "15K+", label: "Lives Transformed" },
    { val: "4.9★", label: "Average Rating" },
    { val: "50+", label: "Google Reviews" },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
            ))}
        </div>
    );
}

/* Scroll carousel */
function VideoCard({ v, i }: { v: typeof videoTestimonials[0]; i: number }) {
    const [playing, setPlaying] = useState(false);
    const colors = ["from-green-500 to-emerald-600", "from-blue-500 to-cyan-600", "from-indigo-500 to-violet-600"];
    return (
        <AnimatedSection delay={i * 120} direction="up">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => setPlaying(!playing)}>
                <div className={`h-44 bg-gradient-to-br ${colors[i]} flex items-center justify-center relative`}>
                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {playing ? (
                            <div className="w-4 h-4 flex gap-1">
                                <div className="w-1.5 h-full bg-white rounded" />
                                <div className="w-1.5 h-full bg-white rounded" />
                            </div>
                        ) : (
                            <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[16px] border-l-white ml-1" />
                        )}
                    </div>
                    <span className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/30 px-2 py-0.5 rounded-full">{v.duration}</span>
                    <span className="absolute top-3 left-3 text-xs text-white/90 bg-black/30 px-2 py-0.5 rounded-full">{v.tag}</span>
                    <div className="absolute inset-0 flex items-end p-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-sm">
                            {v.thumb}
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white">
                    <p className="font-bold text-gray-900">{v.name}</p>
                    <p className="text-sm text-gray-500">{v.role}</p>
                    <Stars count={5} />
                </div>
            </div>
        </AnimatedSection>
    );
}

export default function TestimonialsPage() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handler = () => setScrollPos(el.scrollLeft);
        el.addEventListener("scroll", handler);
        return () => el.removeEventListener("scroll", handler);
    }, []);

    return (
        <main className="bg-white min-h-screen font-sans">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-20 px-6">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200 opacity-25 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-green-200 opacity-25 blur-3xl" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <AnimatedSection delay={0}>
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 mb-6">
                            💬 Real Stories, Real Recoveries
                        </span>
                    </AnimatedSection>
                    <AnimatedSection delay={100}>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                            Patients Who{" "}
                            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-green-500 bg-clip-text text-transparent">
                                Transformed
                            </span>
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Every recovery journey is unique. Here are the stories of patients who trusted us with their health — and got their lives back.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Stats bar */}
            <section className="py-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s, i) => (
                        <AnimatedSection key={i} delay={i * 80}>
                            <div>
                                <p className="text-4xl font-black text-white">{s.val}</p>
                                <p className="text-blue-200 text-sm mt-1">{s.label}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            {/* Featured testimonial */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection>
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <div className={`bg-gradient-to-r ${featured.gradient} p-10 md:p-14`}>
                                <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-6">
                                    ✨ Featured Story — {featured.tag}
                                </span>
                                <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8">
                                    &ldquo;{featured.quote}&rdquo;
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white font-bold text-lg">
                                        {featured.avatar}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">{featured.name}</p>
                                        <p className="text-white/70 text-sm">{featured.role}</p>
                                        <div className="flex mt-1">
                                            {Array.from({ length: featured.rating }).map((_, i) => (
                                                <span key={i} className="text-amber-300 text-sm">★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Grid testimonials */}
            <section className="py-10 pb-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                More <span className="text-blue-600">Success Stories</span>
                            </h2>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <AnimatedSection key={i} delay={i * 80} direction="up">
                                <div className={`h-full rounded-3xl border-2 ${t.color} bg-white p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col`}>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center ${t.accent} font-bold text-sm`}>
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                            <p className="text-gray-400 text-xs">{t.role}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-block px-3 py-0.5 rounded-full ${t.bg} ${t.accent} text-xs font-semibold mb-4 self-start`}>
                                        {t.tag}
                                    </span>
                                    <blockquote className="text-gray-600 leading-relaxed text-sm flex-1">
                                        &ldquo;{t.quote}&rdquo;
                                    </blockquote>
                                    <div className="mt-5">
                                        <Stars count={t.rating} />
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video testimonials */}
            <section className="py-20 px-6 bg-gradient-to-b from-white to-indigo-50">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
                                Video Stories
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                Watch Their <span className="text-indigo-600">Journeys</span>
                            </h2>
                        </div>
                    </AnimatedSection>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {videoTestimonials.map((v, i) => (
                            <VideoCard key={i} v={v} i={i} />
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}