// app/work-with-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy Jobs | Careers at SKM Physiotherapy Noida",
  description:
    "Join SKM Physiotherapy's growing team. Open roles for physiotherapists, sports rehab specialists, neuro rehabilitation therapists, and operations managers. Competitive pay, CPD budget, and a purpose-driven culture. Apply now.",

  keywords: [
    "physiotherapy jobs Noida",
    "physiotherapist vacancy",
    "sports physiotherapy jobs India",
    "neuro physiotherapy jobs",
    "physiotherapy career India",
    "SKM physiotherapy jobs",
    "physiotherapy clinic hiring",
    "physiotherapist recruitment",
    "join SKM physiotherapy",
    "physiotherapy career Noida",
    "physiotherapy team jobs",
  ].join(", "),

  openGraph: {
    title: "Physiotherapy Careers | Join SKM Physiotherapy Team",
    description: "6 open roles for physiotherapists & specialists. Competitive pay, CPD budget, flexible working, and a culture that genuinely cares. Apply today.",
    url: "https://www.skmphysiotherapy.com/work-with-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "Physiotherapy Careers at SKM - Join Our Expert Team",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Physio Jobs | SKM Physiotherapy Careers",
    description: "Senior physio, sports rehab, neuro rehab & more. 4.9★ Glassdoor. Apply now.",
    images: ["https://www.skmphysiotherapy.com/og-careers.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/work-with-skm-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/work-with-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const jobPostingData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JobPosting",
      title: "Senior Physiotherapist",
      description: "Lead patient assessments, develop personalised rehab plans, and mentor junior therapists across our Noida and Greater Noida branches.",
      hiringOrganization: {
        "@type": "Organization",
        name: "SKM Physiotherapy & Rehabilitation Centre",
        sameAs: "https://www.skmphysiotherapy.com",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
      },
      employmentType: "FULL_TIME",
      datePosted: "2026-01-01",
      validThrough: "2026-12-31",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Work With Us", item: "https://www.skmphysiotherapy.com/work-with-skm-physiotherapy" },
      ],
    },
  ],
};

export default function WorkWithLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingData) }} />
      {children}
    </>
  );
}
