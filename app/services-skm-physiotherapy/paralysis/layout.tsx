// app/services-skm-physiotherapy/paralysis/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paralysis Rehabilitation Physiotherapy Noida | SKM Physiotherapy",
  description:
    "Specialized physiotherapy for paralysis rehabilitation at SKM in Noida & Greater Noida. Expert neuro rehab for hemiplegia, paraplegia, stroke-induced paralysis & spinal cord injury. Bobath NDT & PNF techniques. Regain movement and independence.",
  keywords: [
    "paralysis rehabilitation Noida", "hemiplegia physiotherapy", "paraplegia rehab Greater Noida",
    "stroke paralysis treatment Noida", "spinal cord injury rehab", "paralysis physiotherapy near me",
    "Bobath NDT paralysis", "PNF paralysis therapy", "movement restoration physiotherapy",
    "paralysis recovery Noida", "neuro rehab paralysis",
  ].join(", "),
  openGraph: {
    title: "Paralysis Rehabilitation | SKM Physiotherapy Noida",
    description: "Expert paralysis rehab in Noida & Greater Noida. Hemiplegia, paraplegia, stroke & spinal cord injury. Bobath NDT & PNF certified therapists.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/paralysis",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-paralysis.jpg", width: 1200, height: 630, alt: "Paralysis Rehabilitation at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Paralysis Rehab | SKM Physiotherapy Noida", description: "Hemiplegia, paraplegia & stroke paralysis rehab. Bobath & PNF certified in Noida.", images: ["https://skmphysiotherapy.com/og-paralysis.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/paralysis" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Paralysis Rehabilitation Physiotherapy",
      description: "Specialized neuro rehabilitation for hemiplegia, paraplegia, stroke-induced paralysis and spinal cord injury using Bobath NDT and PNF techniques.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Hemiplegia" },
        { "@type": "MedicalCondition", name: "Paraplegia" },
        { "@type": "MedicalCondition", name: "Stroke" },
        { "@type": "MedicalCondition", name: "Spinal Cord Injury" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Paralysis Rehabilitation", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/paralysis" },
      ],
    },
  ],
};

export default function ParalysisLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
