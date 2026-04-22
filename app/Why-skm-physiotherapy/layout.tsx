// app/Why-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose SKM Physiotherapy? | Evidence-Based, Personalized Care",
  description:
    "Discover why SKM Physiotherapy is the top choice in Noida & Greater Noida. Evidence-based protocols, dedicated same therapist every visit, 12 specializations, advanced tech, and 98% satisfaction rate. See how we compare to other clinics.",

  keywords: [
    "why choose SKM physiotherapy",
    "best physiotherapy clinic Noida",
    "physiotherapy vs hospital",
    "evidence-based physiotherapy",
    "personalized physiotherapy",
    "dedicated physiotherapist",
    "physiotherapy specializations",
    "advanced physiotherapy technology",
    "SKM vs other physiotherapy",
    "best physiotherapy near me",
    "physiotherapy success rate Noida",
  ].join(", "),

  openGraph: {
    title: "Why SKM Physiotherapy? | The Best Choice in Noida & Greater Noida",
    description: "Evidence-based care, 1 dedicated therapist every visit, 12 specializations, shockwave therapy, and 98% satisfaction. See the SKM difference.",
    url: "https://skmphysiotherapy.com/Why-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-why-skm.jpg",
        width: 1200,
        height: 630,
        alt: "Why Choose SKM Physiotherapy - The Best in Noida",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Why SKM Physiotherapy? | 98% Satisfaction, 12 Specializations",
    description: "Evidence-based protocols, dedicated therapist, advanced tech. See why SKM beats every other physio clinic in Noida.",
    images: ["https://skmphysiotherapy.com/og-why-skm.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://skmphysiotherapy.com/Why-skm-physiotherapy",
    languages: { "en-IN": "https://skmphysiotherapy.com/Why-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
    { "@type": "ListItem", position: 2, name: "Why SKM?", item: "https://skmphysiotherapy.com/Why-skm-physiotherapy" },
  ],
};

export default function WhySKMLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
