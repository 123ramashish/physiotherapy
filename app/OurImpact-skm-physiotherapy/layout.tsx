// app/OurImpact-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact | 20,000+ Patients Healed | SKM Physiotherapy",
  description:
    "Discover the real-world impact of SKM Physiotherapy. 20,000+ patients treated, 99% recovery rate, 50,000+ sessions delivered. Read inspiring patient recovery stories for stroke, ACL, back pain, and more.",

  keywords: [
    "physiotherapy success stories",
    "physiotherapy patient outcomes",
    "SKM physiotherapy impact",
    "stroke rehabilitation success",
    "ACL recovery story",
    "back pain treatment results",
    "physiotherapy recovery rate",
    "community physiotherapy program",
    "physiotherapy results India",
    "patient recovery statistics",
  ].join(", "),

  openGraph: {
    title: "20,000+ Lives Transformed | SKM Physiotherapy Impact",
    description: "99% recovery rate. 20,000+ patients treated. Real stories from stroke survivors, athletes, and chronic pain sufferers who found their lives again at SKM.",
    url: "https://www.skmphysiotherapy.com/OurImpact-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-impact.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Patient Impact - 20,000+ Patients Treated",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "20,000+ Patients Healed | SKM Physiotherapy Impact",
    description: "99% recovery rate. Real stories of stroke, ACL, and chronic pain recovery. See SKM's impact on lives.",
    images: ["https://www.skmphysiotherapy.com/og-impact.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/OurImpact-skm-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/OurImpact-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const impactStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://www.skmphysiotherapy.com/#organization",
      name: "SKM Physiotherapy & Rehabilitation Centre",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "5247",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Our Impact", item: "https://www.skmphysiotherapy.com/OurImpact-skm-physiotherapy" },
      ],
    },
  ],
};

export default function OurImpactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(impactStructuredData) }}
      />
      {children}
    </>
  );
}
