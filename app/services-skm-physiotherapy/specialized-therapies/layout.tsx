// app/services-skm-physiotherapy/specialized-therapies/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Specialized Physiotherapy Treatments Noida | SKM Physiotherapy",
  description:
    "Advanced specialized physiotherapy treatments at SKM in Noida & Greater Noida. Shockwave therapy, ultrasound therapy, TENS, electrical stimulation, hydrotherapy, manual therapy & more. Expert therapists using the latest evidence-based modalities.",
  keywords: [
    "specialized physiotherapy Noida", "shockwave therapy Noida", "ultrasound therapy physiotherapy",
    "TENS physiotherapy", "electrical stimulation therapy", "hydrotherapy Noida",
    "advanced physiotherapy treatment", "physiotherapy modalities", "manual therapy Noida",
    "specialized treatment Greater Noida", "electrotherapy physiotherapy",
    "evidence-based physiotherapy treatments",
  ].join(", "),
  openGraph: {
    title: "Specialized Physiotherapy Treatments | SKM Physiotherapy Noida",
    description: "Advanced physio modalities in Noida & Greater Noida: shockwave, ultrasound, TENS, electrical stimulation, hydrotherapy & manual therapy. Expert evidence-based care.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/specialized-therapies",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-specialized.jpg", width: 1200, height: 630, alt: "Specialized Physiotherapy Treatments at SKM Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Specialized Physiotherapy | SKM Noida", description: "Shockwave, ultrasound, TENS, e-stim & hydrotherapy. Advanced physio in Noida & Greater Noida.", images: ["https://skmphysiotherapy.com/og-specialized.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/specialized-therapies" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Specialized Physiotherapy Treatments",
      description: "Advanced physiotherapy modalities including shockwave therapy, ultrasound therapy, TENS, electrical stimulation, hydrotherapy and Maitland manual therapy.",
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Specialized Therapies", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/specialized-therapies" },
      ],
    },
  ],
};

export default function SpecializedTherapiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
