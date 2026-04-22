// app/services-skm-physiotherapy/cupping-hijama/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cupping Therapy (Hijama) in Noida & Greater Noida | SKM Physiotherapy",
  description:
    "Certified cupping therapy (Hijama) at SKM Physiotherapy in Noida & Greater Noida. Wet and dry cupping for deep tissue pain relief, improved circulation, detoxification & muscle recovery. Safe, sterile, expert-administered. Book a session today.",
  keywords: [
    "cupping therapy Noida", "hijama therapy Greater Noida", "cupping therapy near me",
    "wet cupping treatment Noida", "dry cupping physiotherapy", "hijama Noida",
    "cupping for back pain", "cupping for muscle pain", "blood cupping therapy",
    "hijama centre Noida", "cupping therapy certified",
  ].join(", "),
  openGraph: {
    title: "Cupping Therapy (Hijama) | SKM Physiotherapy Noida",
    description: "Certified wet & dry cupping (Hijama) therapy in Noida & Greater Noida. Deep tissue pain relief, improved circulation & detox. Safe, sterile technique.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/cupping-hijama",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-cupping.jpg", width: 1200, height: 630, alt: "Cupping Therapy Hijama at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Cupping Therapy (Hijama) | SKM Physiotherapy Noida", description: "Certified wet & dry cupping in Noida. Deep pain relief, better circulation & muscle recovery.", images: ["https://skmphysiotherapy.com/og-cupping.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/cupping-hijama" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Cupping Therapy (Hijama)",
      description: "Certified wet and dry cupping therapy for deep tissue pain relief, improved blood circulation, muscle recovery and detoxification.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Musculoskeletal Pain" },
        { "@type": "MedicalCondition", name: "Back Pain" },
        { "@type": "MedicalCondition", name: "Muscle Tension" },
        { "@type": "MedicalCondition", name: "Sports Fatigue" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Cupping Therapy (Hijama)", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/cupping-hijama" },
      ],
    },
  ],
};

export default function CuppingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
