// app/services-skm-physiotherapy/wellness/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness & Preventive Physiotherapy Noida | SKM Physiotherapy",
  description:
    "Proactive wellness and preventive physiotherapy at SKM across Noida, Greater Noida & Gurugram. Posture analysis, movement screening, injury prevention programs, lifestyle coaching, ergonomics advice & fitness physiotherapy. Stay pain-free & perform at your best.",
  keywords: [
    "wellness physiotherapy Noida", "preventive physiotherapy Greater Noida",
    "posture analysis Noida", "movement screening physiotherapy", "injury prevention program",
    "lifestyle coaching physiotherapy", "ergonomics physiotherapy", "fitness physiotherapy Noida",
    "wellness program near me", "preventive health physiotherapy", "health and wellness Noida",
    "functional movement assessment",
  ].join(", "),
  openGraph: {
    title: "Wellness & Preventive Physiotherapy | SKM Physiotherapy Noida",
    description: "Stay pain-free with proactive wellness physio across Noida, Greater Noida & Gurugram. Posture analysis, injury prevention, ergonomics & lifestyle coaching.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/wellness",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-wellness.jpg", width: 1200, height: 630, alt: "Wellness Physiotherapy at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Wellness Physiotherapy | SKM Noida", description: "Posture analysis, injury prevention & ergonomics coaching across Noida, Greater Noida & Gurugram.", images: ["https://skmphysiotherapy.com/og-wellness.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/wellness" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Wellness & Preventive Physiotherapy",
      description: "Proactive wellness physiotherapy including posture analysis, functional movement screening, injury prevention programs, ergonomics advice and lifestyle coaching.",
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
      serviceType: "Preventive Healthcare",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Wellness Physiotherapy", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/wellness" },
      ],
    },
  ],
};

export default function WellnessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
