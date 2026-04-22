"use client";

import { useState } from "react";
import Reveal from "../../components/Reveal";

const categories = [
    { label: "Getting Started", icon: "🚀", color: "from-green-500 to-emerald-500", bg: "bg-green-50", accent: "text-green-700", border: "border-green-200" },
    { label: "Treatments", icon: "🩺", color: "from-blue-500 to-cyan-500", bg: "bg-blue-50", accent: "text-blue-700", border: "border-blue-200" },
    { label: "Appointments", icon: "📅", color: "from-indigo-500 to-violet-500", bg: "bg-indigo-50", accent: "text-indigo-700", border: "border-indigo-200" },
    { label: "Costs & Insurance", icon: "💳", color: "from-teal-500 to-green-600", bg: "bg-teal-50", accent: "text-teal-700", border: "border-teal-200" },
    { label: "Recovery & Results", icon: "📈", color: "from-sky-500 to-blue-600", bg: "bg-sky-50", accent: "text-sky-700", border: "border-sky-200" },
];

const faqs: Record<string, { q: string; a: string }[]> = {
    "Getting Started": [
        {
            q: "Do I need a doctor's referral to visit SKM Physiotherapy?",
            a: "No referral needed. You can book directly with us. However, if you have recent imaging (X-rays, MRI scans) or a surgical report, please bring these — they help our therapists design a faster, more accurate recovery plan from session one.",
        },
        {
            q: "What happens during my first appointment?",
            a: "Your first session is a comprehensive assessment lasting 45–60 minutes. Your therapist will take a full history, understand your goals, conduct a physical evaluation, and explain exactly what's going on and why. You'll leave with a clear, personalized treatment plan — not just a vague list of exercises.",
        },
        {
            q: "How do I know which SKM branch to visit?",
            a: "Choose your nearest branch for most conditions. If you have a highly specialised need (e.g., neuro rehab, sports performance, paediatrics), we'll match you with the branch that has the specific certified specialist for your condition.",
        },
        {
            q: "Can I request a specific therapist?",
            a: "Absolutely. You can request a specific therapist by name when booking. One of our core beliefs is continuity of care — you should see the same therapist every visit. We honour this unless there's an unavoidable scheduling conflict.",
        },
    ],
    "Treatments": [
        {
            q: "What conditions does SKM Physiotherapy treat?",
            a: "We treat a wide spectrum: back and neck pain, sports injuries, post-surgical rehabilitation, stroke and neuro conditions, arthritis, pediatric conditions, shoulder and knee injuries, pelvic health, balance disorders, cardiopulmonary conditions, and work-related injuries. If you're unsure, call us — we'll tell you honestly if we can help.",
        },
        {
            q: "What physiotherapy modalities do you use at SKM?",
            a: "Our therapists use manual therapy, dry needling, shockwave therapy, ultrasound-guided assessment, electrical stimulation (TENS/FES), hydrotherapy, Bobath and PNF techniques, Maitland mobilisation, McKenzie method, exercise prescription, and postural re-education — selecting the best combination for each patient.",
        },
        {
            q: "Is physiotherapy painful?",
            a: "Good physiotherapy should be within tolerable discomfort — never sharp or alarming pain. Some manual therapy and dry needling may cause temporary soreness, similar to post-exercise muscle ache. Your therapist will always check in and adjust intensity based on your feedback. Communication is key, and your comfort matters.",
        },
        {
            q: "Do you offer home visit physiotherapy?",
            a: "Yes. Home visits are available for patients who are bed-bound, post-surgical, or unable to travel. SKM was literally founded on home visits — it's in our DNA. Contact your nearest branch to check therapist availability in your area.",
        },
    ],
    "Appointments": [
        {
            q: "How can I book an appointment at SKM?",
            a: "You can book via our website, the SKM patient app, WhatsApp, or by calling your nearest branch directly. Online booking is available 24/7. For urgent cases, call us — we try to accommodate same-day or next-day appointments whenever possible.",
        },
        {
            q: "How long does each session last?",
            a: "Initial assessments: 45–60 minutes. Follow-up treatment sessions: typically 30–45 minutes. Complex conditions (neuro rehab, post-surgical) may have 60-minute follow-up slots. You'll never feel rushed at SKM.",
        },
        {
            q: "What is your cancellation policy?",
            a: "We ask for at least 24 hours' notice for cancellations or rescheduling. This allows us to offer your slot to patients on the waiting list. Late cancellations may incur a partial fee. We understand emergencies happen — just call us.",
        },
        {
            q: "Do you offer tele-physiotherapy / online sessions?",
            a: "Yes. We offer video consultations for assessments, exercise reviews, follow-up sessions, and patients in remote areas. Tele-physio is not appropriate for all conditions (hands-on therapy requires in-person attendance), but our team will guide you on what's suitable for your case.",
        },
    ],
    "Costs & Insurance": [
        {
            q: "How much does physiotherapy at SKM cost?",
            a: "Session fees vary by branch, session type, and therapist level. Initial assessments range from ₹800–₹1,500. Follow-up sessions from ₹600–₹1,200. We provide transparent pricing upfront — no hidden charges. Package options are available for extended treatment courses.",
        },
        {
            q: "Does SKM accept health insurance?",
            a: "Yes, SKM is empanelled with major insurers including Star Health, ICICI Lombard, HDFC ERGO, and several TPA-managed corporate health plans. Bring your insurance card and we'll verify coverage before your first session. Direct billing is available for most empanelled plans.",
        },
        {
            q: "Do you offer any concessions or packages?",
            a: "Yes. We offer multi-session packages (typically 8 or 12 sessions) at a reduced per-session rate. Senior citizen discounts are available at all branches. For community outreach programs, select services are offered free or subsidised — ask our front desk about current initiatives.",
        },
        {
            q: "Can I pay by EMI or in instalments?",
            a: "For package purchases, we offer instalment payment plans through select credit card networks and via select EMI apps. Ask at reception or when booking online. We never want cost to be a barrier to your recovery.",
        },
    ],
    "Recovery & Results": [
        {
            q: "How many sessions will I need?",
            a: "It depends entirely on your condition, severity, chronicity, and how consistently you do your home exercises. Acute injuries may resolve in 4–8 sessions. Chronic conditions and post-surgical rehab typically require 12–24+ sessions. Your therapist will give you a realistic timeline after the initial assessment.",
        },
        {
            q: "What is SKM's recovery success rate?",
            a: "Based on post-treatment surveys across all branches, 92% of our patients achieve their stated recovery goals. For sports injuries, return-to-sport rates are consistently above the national average. We track outcomes honestly — and share them transparently.",
        },
        {
            q: "Will my physiotherapist communicate with my doctor?",
            a: "Absolutely. Co-ordinated care is a cornerstone of SKM's approach. With your consent, we will send structured reports to your treating physician, orthopaedic surgeon, or neurologist after key assessments and at regular progress intervals. Many of our hospital partners have SKM therapists integrated into their care pathways.",
        },
        {
            q: "What can I do at home to make physiotherapy more effective?",
            a: "Consistency with your home exercise program is the single biggest factor in recovery speed. Your therapist will design a short daily routine (typically 10–20 minutes) and show you precisely how to do each exercise. The SKM patient app lets you track sessions and watch video demonstrations of your home program.",
        },
    ],
};

function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <Reveal delay={index * 50}>
            <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? "border-green-300 bg-green-50/40 shadow-md" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
            >
                <button
                    className="w-full flex items-start justify-between gap-4 p-6 text-left"
                    onClick={() => setOpen(!open)}
                >
                    <span className="font-extrabold text-gray-900 text-base leading-snug">{item.q}</span>
                    <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-green-500 text-white rotate-45" : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
                        </svg>
                    </span>
                </button>
                <div
                    className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
                >
                    <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
            </div>
        </Reveal>
    );
}

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("Getting Started");
    const [searchQuery, setSearchQuery] = useState("");

    const allFaqs = Object.values(faqs).flat();
    const searchResults = searchQuery.length > 2
        ? allFaqs.filter(f =>
            f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : null;

    const displayedFaqs = searchResults ?? faqs[activeCategory] ?? [];

    return (
        <main className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}>

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-teal-50 pt-28 pb-24 px-6">
                <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-indigo-100 opacity-30 blur-3xl" />
                <div className="absolute -bottom-20 left-0 w-80 h-80 rounded-full bg-green-100 opacity-25 blur-3xl" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <Reveal delay={0}>
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-8">
                            ❓ Frequently Asked Questions
                        </span>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter mb-6">
                            Got{" "}
                            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                                Questions?
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
                            We have answers. And if you can&apos;t find what you&apos;re looking for, our team is one message away.
                        </p>
                    </Reveal>

                    {/* Search */}
                    <Reveal delay={300} direction="scale">
                        <div className="relative max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="Search any question..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-50 text-base transition-all duration-300 shadow-sm"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FAQ body */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">

                    {/* Category tabs — hidden if searching */}
                    {!searchQuery && (
                        <Reveal>
                            <div className="flex flex-wrap justify-center gap-3 mb-14">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.label}
                                        onClick={() => setActiveCategory(cat.label)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeCategory === cat.label
                                            ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                                            : "bg-white border-2 border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
                                            }`}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </Reveal>
                    )}

                    {/* Search result label */}
                    {searchResults && (
                        <Reveal>
                            <div className="mb-8 flex items-center justify-between">
                                <p className="text-gray-500 text-sm font-medium">
                                    {searchResults.length > 0
                                        ? `Found ${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${searchQuery}"`
                                        : `No results for "${searchQuery}"`}
                                </p>
                                <button onClick={() => setSearchQuery("")} className="text-xs font-bold text-green-600 hover:text-green-700">
                                    Clear search ×
                                </button>
                            </div>
                        </Reveal>
                    )}

                    {/* FAQ items */}
                    <div className="space-y-4">
                        {displayedFaqs.length > 0 ? (
                            displayedFaqs.map((item, i) => (
                                <FAQItem key={`${activeCategory}-${i}`} item={item} index={i} />
                            ))
                        ) : (
                            <Reveal>
                                <div className="text-center py-16">
                                    <span className="text-6xl block mb-4">🔍</span>
                                    <p className="text-gray-500 text-lg font-medium">No FAQs match your search.</p>
                                    <p className="text-gray-400 text-sm mt-2">Try different keywords or contact us directly.</p>
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* Category overview pills */}
                    {!searchQuery && (
                        <Reveal delay={200}>
                            <div className="mt-12 pt-10 border-t border-gray-100">
                                <p className="text-center text-gray-400 text-sm font-medium mb-6">Browse other topics</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {categories.filter(c => c.label !== activeCategory).map((cat) => (
                                        <button
                                            key={cat.label}
                                            onClick={() => setActiveCategory(cat.label)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${cat.bg} ${cat.accent} text-sm font-semibold hover:scale-105 transition-all duration-200 border ${cat.border}`}
                                        >
                                            {cat.icon} {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Contact block */}
            <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                Still Have Questions?
                            </h2>
                            <p className="text-gray-500 text-lg">
                                Our team responds within 2 hours during clinic hours.
                            </p>
                        </div>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            { icon: "📞", title: "Call Us", sub: "Mon–Sat, 8am–8pm", cta: "+91 98765 43210", href: "tel:+919876543210", color: "from-green-500 to-emerald-500" },
                            { icon: "💬", title: "WhatsApp", sub: "Fastest response", cta: "Message us now", href: "https://wa.me/919876543210", color: "from-blue-500 to-indigo-500" },
                            { icon: "📧", title: "Email", sub: "Detailed queries welcome", cta: "hello@skmphysio.com", href: "mailto:hello@skmphysio.com", color: "from-indigo-500 to-teal-500" },
                        ].map((c, i) => (
                            <Reveal key={i} delay={i * 80} direction="up">
                                <a
                                    href={c.href}
                                    className="block bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        {c.icon}
                                    </div>
                                    <h3 className="font-extrabold text-gray-900 text-lg mb-1">{c.title}</h3>
                                    <p className="text-gray-400 text-xs mb-3">{c.sub}</p>
                                    <p className="font-bold text-sm text-blue-600">{c.cta}</p>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>


        </main>
    );
}