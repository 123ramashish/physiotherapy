// app/services-skm-physiotherapy/heel-pain/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heel Pain & Plantar Fasciitis Treatment Noida | SKM Physiotherapy",
  description:
    "Expert physiotherapy for heel pain and plantar fasciitis at SKM across Noida, Greater Noida & Gurugram. Treatment for morning heel pain, plantar fasciitis, Achilles tendonitis & calcaneal spurs. Walk pain-free again. Certified therapists. Book free consultation.",
  keywords: [
    "heel pain treatment Noida", "plantar fasciitis physiotherapy", "heel pain clinic Greater Noida",
    "Achilles tendonitis treatment Noida", "calcaneal spur treatment", "foot pain physiotherapy",
    "plantar fasciitis near me", "morning heel pain treatment", "heel pain specialist",
    "foot physiotherapy Noida", "plantar fasciitis physiotherapy Noida",
  ].join(", "),
  openGraph: {
    title: "Heel Pain & Plantar Fasciitis Treatment | SKM Physiotherapy Noida",
    description: "Walk pain-free again. Expert physio for plantar fasciitis, Achilles tendonitis & calcaneal spurs across Noida, Greater Noida & Gurugram.",
    url: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/heel-pain",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-heel-pain.jpg", width: 1200, height: 630, alt: "Heel Pain Treatment at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Heel Pain Treatment | SKM Physiotherapy Noida", description: "Plantar fasciitis, Achilles tendonitis & calcaneal spur relief across Noida, Greater Noida & Gurugram.", images: ["https://www.skmphysiotherapy.com/og-heel-pain.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/heel-pain" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Heel Pain & Plantar Fasciitis Treatment",
      description: "Physiotherapy for heel pain, plantar fasciitis, Achilles tendonitis and calcaneal spurs using manual therapy and exercise rehabilitation.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Plantar Fasciitis" },
        { "@type": "MedicalCondition", name: "Achilles Tendonitis" },
        { "@type": "MedicalCondition", name: "Calcaneal Spur" },
        { "@type": "MedicalCondition", name: "Heel Pain" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://www.skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Heel Pain Treatment", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/heel-pain" },
      ],
    },
  ],
};

export default function HeelPainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
