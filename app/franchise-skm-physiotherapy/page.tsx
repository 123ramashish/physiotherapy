// app/franchise/page.jsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Franchise Opportunity | Physiotherapy & Chiropractic Clinic',
  description:
    'Own a proven physiotherapy and chiropractic clinic franchise. Join our growing network with comprehensive training, marketing support, and a trusted brand behind you.',
  keywords: [
    'physiotherapy franchise',
    'chiropractic franchise',
    'healthcare franchise',
    'clinic franchise opportunity',
    'physiotherapy business opportunity',
  ],
  openGraph: {
    title: 'Franchise Opportunity | Physiotherapy & Chiropractic Clinic',
    description:
      'Own a proven physiotherapy and chiropractic clinic franchise. Join our growing network with comprehensive training, marketing support, and a trusted brand.',
    type: 'website',
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '50+', label: 'Clinics Nationwide' },
  { value: '15+', label: 'Years in Business' },
  { value: '98%', label: 'Franchisee Satisfaction' },
  { value: '₹2Cr+', label: 'Avg. Annual Revenue' },
];

const whyUs = [
  {
    icon: '◈',
    title: 'Proven Business Model',
    description:
      'Step into a system refined over 15+ years across 50+ locations. Our operational playbook covers everything from staffing to patient acquisition.',
  },
  {
    icon: '◉',
    title: 'Comprehensive Training',
    description:
      'A rigorous 8-week onboarding programme plus ongoing clinical and business training ensures you and your team excel from day one.',
  },
  {
    icon: '◆',
    title: 'Marketing & Technology',
    description:
      'Dedicated digital marketing campaigns, a custom clinic management platform, and a trusted brand that patients already seek out.',
  },
  {
    icon: '◇',
    title: 'Ongoing Support',
    description:
      'A dedicated franchise success manager, quarterly performance reviews, and a peer network of fellow franchise owners.',
  },
  {
    icon: '◐',
    title: 'Exclusive Territory',
    description:
      'Protected catchment areas safeguard your investment and let you build a loyal community patient base without internal competition.',
  },
  {
    icon: '◑',
    title: 'Clinical Excellence',
    description:
      'Evidence-based protocols, CPD-accredited courses, and a clinical governance team keep standards high across the entire network.',
  },
];

const investmentTiers = [
  {
    name: 'Starter',
    investment: '₹35–50 L',
    area: '800–1,200 sq ft',
    staff: '4–6',
    features: [
      'Core physiotherapy suite',
      'Chiropractic bay',
      '8-week training programme',
      'Starter marketing pack',
      'CRM & booking software',
    ],
    accent: 'from-rose-500 to-rose-600',
    border: 'border-rose-200',
    badge: null,
  },
  {
    name: 'Standard',
    investment: '₹60–85 L',
    area: '1,200–2,000 sq ft',
    staff: '8–12',
    features: [
      'All Starter inclusions',
      'Hydrotherapy pool',
      'Sports rehab zone',
      'Priority support tier',
      'Regional ad campaigns',
      'Advanced analytics dashboard',
    ],
    accent: 'from-rose-600 to-amber-500',
    border: 'border-rose-400',
    badge: 'Most Popular',
  },
  {
    name: 'Flagship',
    investment: '₹1.0–1.5 Cr',
    area: '2,000–3,500 sq ft',
    staff: '15–25',
    features: [
      'All Standard inclusions',
      'Dedicated gym floor',
      'Corporate wellness wing',
      'White-glove setup service',
      'National PR & media',
      'Revenue guarantee (Year 1)',
    ],
    accent: 'from-amber-500 to-amber-600',
    border: 'border-amber-300',
    badge: null,
  },
];

const process = [
  {
    step: '01',
    title: 'Initial Enquiry',
    description:
      'Submit your expression of interest. Our franchise team will reach out within 48 hours for a no-obligation discovery call.',
  },
  {
    step: '02',
    title: 'Information Pack & NDA',
    description:
      'Receive our detailed franchise prospectus covering financials, territory maps, and case studies from existing franchisees.',
  },
  {
    step: '03',
    title: 'Discovery Day',
    description:
      'Visit our flagship clinic, shadow our clinical team, and meet key support staff — ask every question you have.',
  },
  {
    step: '04',
    title: 'Approval & Agreement',
    description:
      'Our franchise committee reviews your application. Once approved, we finalise territory, investment tier, and sign the franchise agreement.',
  },
  {
    step: '05',
    title: 'Training & Fit-Out',
    description:
      'Eight weeks of hands-on training at our training academy runs in parallel with your clinic fit-out and team recruitment.',
  },
  {
    step: '06',
    title: 'Grand Opening',
    description:
      'Our launch team runs a local marketing blitz for your opening week, and your dedicated success manager stays on-site for the first fortnight.',
  },
];

const testimonials = [
  {
    quote:
      'I opened my first clinic 3 years ago and last year surpassed ₹2.4 Cr in revenue. The support network is unlike anything I have experienced in corporate healthcare.',
    name: 'Priya Menon',
    location: 'Pune, Maharashtra',
    initials: 'PM',
  },
  {
    quote:
      'As a physiotherapist, I wanted to run my own clinic but feared the business side. The franchise model gave me the confidence and tools to succeed on both fronts.',
    name: 'Arjun Sharma',
    location: 'Bengaluru, Karnataka',
    initials: 'AS',
  },
  {
    quote:
      'The protected territory and brand recognition cut our patient acquisition timeline in half. We were profitable by month eight — ahead of every projection.',
    name: 'Deepa Nair',
    location: 'Kochi, Kerala',
    initials: 'DN',
  },
];

const faqs = [
  {
    q: 'Do I need a clinical background to own a franchise?',
    a: 'No. While clinical partners are always welcome, many of our most successful franchisees come from business, finance, or management backgrounds. We help you hire and retain the right clinical team.',
  },
  {
    q: 'How long before my clinic becomes profitable?',
    a: 'Most franchisees reach profitability between months 8 and 14, depending on location, size, and local market conditions. Our Flagship tier includes a Year 1 revenue guarantee.',
  },
  {
    q: 'What does the franchise fee cover?',
    a: 'The initial fee covers territory rights, training, brand licence, the clinic management platform, a starter marketing kit, and full setup support. Ongoing royalties are a flat 6% of net revenue.',
  },
  {
    q: 'Can I own multiple locations?',
    a: 'Absolutely. Many franchisees expand to 2–4 locations within five years. Multi-unit agreements come with reduced fees and preferential territory selection.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-gray-950 text-white"
        aria-labelledby="franchise-hero-heading"
      >
        {/* Background texture layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,rgba(251,113,133,0.18),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_0%_100%,rgba(251,191,36,0.10),transparent)] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-rose-400 mb-6 border border-rose-400/30 rounded-full px-4 py-1.5">
              Franchise Opportunity
            </span>

            <h1
              id="franchise-hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              Build a Clinic{' '}
              <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                That Matters.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10">
              Partner with a nationally trusted physiotherapy and chiropractic
              brand. Proven systems, protected territories, and full lifecycle
              support — so you can focus on what counts: transforming lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#enquire"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl shadow-lg active:translate-y-0"
                aria-label="Enquire about franchising with our clinic"
              >
                Enquire Now
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#process"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Learn about our franchise process"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section
        className="bg-gradient-to-r from-rose-600 to-amber-500 text-white"
        aria-label="Franchise network statistics"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm font-medium uppercase tracking-widest opacity-80 mb-1">
                  {s.label}
                </dt>
                <dd className="text-3xl sm:text-4xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Why Partner With Us ── */}
      <section className="py-20 md:py-28 bg-gray-50" aria-labelledby="why-us-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-500 mb-4 block">
              Why Choose Us
            </span>
            <h2
              id="why-us-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5"
            >
              Everything You Need to{' '}
              <span className="text-rose-600">Succeed</span>
            </h2>
            <p className="text-gray-500 text-lg">
              We have engineered every component of the clinic ownership
              experience — so you inherit a proven formula rather than start
              from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whyUs.map((item, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300 group"
                itemScope
                itemType="https://schema.org/Service"
              >
                <span
                  className="inline-block text-2xl text-rose-500 mb-5 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-3" itemProp="name">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed" itemProp="description">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Tiers ── */}
      <section className="py-20 md:py-28" aria-labelledby="investment-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-500 mb-4 block">
              Investment Tiers
            </span>
            <h2
              id="investment-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5"
            >
              Choose Your <span className="text-rose-600">Scale</span>
            </h2>
            <p className="text-gray-500 text-lg">
              From boutique to flagship, there is an investment level suited to
              your market, ambition, and background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {investmentTiers.map((tier, i) => (
              <article
                key={i}
                className={`relative bg-white rounded-2xl border-2 ${tier.border} overflow-hidden hover:shadow-2xl transition-shadow duration-500`}
                itemScope
                itemType="https://schema.org/Offer"
              >
                {tier.badge && (
                  <div
                    className={`bg-gradient-to-r ${tier.accent} text-white text-xs font-bold tracking-widest uppercase text-center py-2`}
                  >
                    {tier.badge}
                  </div>
                )}
                {/* Header */}
                <div className={`bg-gradient-to-br ${tier.accent} p-7 text-white`}>
                  <h3 className="text-2xl font-bold mb-1" itemProp="name">
                    {tier.name}
                  </h3>
                  <p className="text-3xl font-extrabold mb-4" itemProp="price">
                    {tier.investment}
                  </p>
                  <div className="flex gap-4 text-sm opacity-90">
                    <span>📐 {tier.area}</span>
                    <span>👥 {tier.staff} staff</span>
                  </div>
                </div>
                {/* Features */}
                <ul className="p-7 space-y-3" role="list">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-rose-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="px-7 pb-7">
                  <Link
                    href="#enquire"
                    className={`block w-full text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${tier.accent} hover:opacity-90 transition-opacity duration-200`}
                    aria-label={`Enquire about the ${tier.name} franchise tier`}
                  >
                    Get Started
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            All investment figures are indicative. Final costs depend on location,
            lease rates, and build-out scope.
          </p>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        id="process"
        className="py-20 md:py-28 bg-gray-950 text-white"
        aria-labelledby="process-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-400 mb-4 block">
              The Journey
            </span>
            <h2
              id="process-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5"
            >
              From Enquiry to{' '}
              <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                Grand Opening
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              A transparent, six-step journey designed to set you up for
              long-term success.
            </p>
          </div>

          <div
            className="relative max-w-3xl mx-auto"
            itemScope
            itemType="https://schema.org/HowTo"
          >
            {/* Vertical line — desktop only */}
            <div className="hidden sm:block absolute left-10 top-8 bottom-8 w-px bg-gradient-to-b from-rose-500 via-amber-500 to-transparent" aria-hidden="true" />

            <div className="space-y-10">
              {process.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-6 items-start group"
                  itemScope
                  itemType="https://schema.org/HowToStep"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                    {step.step}
                  </div>
                  <div className="sm:pt-4">
                    <h3
                      className="text-xl font-bold text-white mb-2"
                      itemProp="name"
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed" itemProp="text">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="py-20 md:py-28 bg-rose-50"
        aria-labelledby="testimonials-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-500 mb-4 block">
              Franchisee Stories
            </span>
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            >
              Hear from Our{' '}
              <span className="text-rose-600">Network</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-rose-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                itemScope
                itemType="https://schema.org/Review"
              >
                <p
                  className="text-gray-700 text-base leading-relaxed flex-grow mb-6 italic"
                  itemProp="reviewBody"
                >
                  {t.quote}
                </p>
                <footer
                  className="flex items-center gap-4"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-gray-900 text-sm block" itemProp="name">
                      {t.name}
                    </cite>
                    <span className="text-gray-400 text-xs" itemProp="address">
                      {t.location}
                    </span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-500 mb-4 block">
              FAQs
            </span>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            >
              Common <span className="text-rose-600">Questions</span>
            </h2>
          </div>

          <div
            className="max-w-3xl mx-auto space-y-5"
            itemScope
            itemType="https://schema.org/FAQ-skm-physiotherapyPage"
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-rose-200 transition-colors duration-300"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3
                  className="font-bold text-gray-900 text-base sm:text-lg mb-3"
                  itemProp="name"
                >
                  {faq.q}
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed" itemProp="text">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <section
        id="enquire"
        className="py-20 md:py-28 bg-gray-950"
        aria-labelledby="enquiry-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-400 mb-4 block">
                Get Started
              </span>
              <h2
                id="enquiry-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Request Your{' '}
                <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                  Info Pack
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                No obligation. A member of our franchise team will contact you
                within 48 hours.
              </p>
            </div>

            <form
              className="space-y-5"
              itemScope
              itemType="https://schema.org/ContactPoint"
              action="/api/franchise-enquiry"
              method="POST"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name <span className="text-rose-400" aria-label="required">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors duration-200"
                    placeholder="Rajan"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name <span className="text-rose-400" aria-label="required">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors duration-200"
                    placeholder="Verma"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-rose-400" aria-label="required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors duration-200"
                  placeholder="rajan@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors duration-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                  Target City / State <span className="text-rose-400" aria-label="required">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors duration-200"
                  placeholder="e.g. Gurugram, Haryana"
                />
              </div>

              <div>
                <label htmlFor="tier" className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Tier of Interest
                </label>
                <select
                  id="tier"
                  name="tier"
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors duration-200"
                >
                  <option value="">Select a tier…</option>
                  <option value="starter">Starter (₹35–50 L)</option>
                  <option value="standard">Standard (₹60–85 L)</option>
                  <option value="flagship">Flagship (₹1.0–1.5 Cr)</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Anything else you'd like us to know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors duration-200 resize-none"
                  placeholder="Your background, timeline, any specific questions…"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 text-base"
              >
                Send Enquiry →
              </button>

              <p className="text-center text-gray-500 text-xs">
                By submitting this form you agree to our{' '}
                <Link href="/privacy" className="text-rose-400 hover:underline">
                  Privacy Policy
                </Link>
                . We will never share your details with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-rose-600 to-amber-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
            Ready to Own a Clinic That Changes Lives?
          </h2>
          <p className="text-white/85 text-lg max-w-xl mx-auto mb-8">
            Join a network of passionate clinic owners who combine clinical
            excellence with genuine business success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#enquire"
              className="px-9 py-4 bg-white text-rose-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
              aria-label="Request your franchise information pack"
            >
              Request Info Pack
            </Link>
            <Link
              href="/contact-skm-physiotherapy"
              className="px-9 py-4 border-2 border-white/70 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Contact our team directly"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}