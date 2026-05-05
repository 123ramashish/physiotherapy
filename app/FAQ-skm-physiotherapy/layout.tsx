// app/FAQ-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy FAQs | Common Questions Answered | SKM Physiotherapy",
  description:
    "Got questions about physiotherapy? SKM answers the most common questions: Do you need a referral? How many sessions for back pain? Does insurance cover it? What treatments are available? What does physiotherapy cost in Noida?",

  keywords: [
    "physiotherapy FAQ",
    "physiotherapy questions answered",
    "how many physio sessions for back pain",
    "physiotherapy cost Noida",
    "physiotherapy insurance",
    "do I need referral for physiotherapy",
    "physiotherapy first visit",
    "physiotherapy appointment booking",
    "cupping therapy FAQ",
    "dry needling questions",
    "home visit physiotherapy FAQ",
  ].join(", "),

  openGraph: {
    title: "Physiotherapy FAQs | SKM Physiotherapy Answers",
    description: "Answers to 20+ common questions about physiotherapy: referrals, session counts, insurance, costs, treatments and more.",
    url: "https://www.skmphysiotherapy.com/FAQ-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-faq.jpg",
        width: 1200,
        height: 630,
        alt: "Physiotherapy FAQ - SKM Physiotherapy Answers Your Questions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Physiotherapy FAQs | SKM Physiotherapy",
    description: "All your physiotherapy questions answered. Costs, sessions, insurance, booking & more.",
    images: ["https://www.skmphysiotherapy.com/og-faq.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/FAQ-skm-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/FAQ-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need a doctor's referral to visit SKM Physiotherapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No referral needed. You can book directly with us. If you have recent imaging (X-rays, MRI scans) or a surgical report, please bring these — they help our therapists design a faster, more accurate recovery plan.",
      },
    },
    {
      "@type": "Question",
      name: "How many physiotherapy sessions do I need for back pain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most patients experience noticeable relief in 3-6 sessions. However, treatment plans are personalized based on your condition severity, medical history, and recovery goals. Your therapist will create a custom plan during your initial assessment.",
      },
    },
    {
      "@type": "Question",
      name: "How much does physiotherapy cost at SKM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Session fees vary by branch and session type. Initial assessments range from ₹800–₹1,500. Follow-up sessions from ₹600–₹1,200. We provide transparent pricing upfront. Package options are available for extended treatment courses.",
      },
    },
    {
      "@type": "Question",
      name: "Does SKM Physiotherapy accept health insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SKM is empanelled with major insurers including Star Health, ICICI Lombard, HDFC ERGO, and several TPA-managed corporate health plans. Bring your insurance card and we'll verify coverage before your first session.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer home visit physiotherapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Home visits are available for patients who are bed-bound, post-surgical, or unable to travel. Contact your nearest branch (Noida or Greater Noida) to check therapist availability in your area.",
      },
    },
    {
      "@type": "Question",
      name: "What is cupping therapy (Hijama) and is it safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cupping therapy (Hijama) is an ancient healing technique that uses suction to improve blood flow, reduce inflammation, and promote healing. At SKM, our certified therapists use sterile, medical-grade cups. It's safe for most people when performed by trained professionals.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book an appointment at SKM Physiotherapy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book via our website, WhatsApp, or by calling your nearest branch directly. Online booking is available 24/7. Call +91 79827 99147 (Greater Noida) or +91 97184 34818 (Sector 134, Noida).",
      },
    },
  ],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.skmphysiotherapy.com/FAQ-skm-physiotherapy" },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
