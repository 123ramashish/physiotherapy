// app/services-skm-physiotherapy/bells-palsy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bell's Palsy Physiotherapy Treatment Noida | SKM Physiotherapy",
  description:
    "Expert physiotherapy for Bell's palsy at SKM in Noida & Greater Noida. Facial nerve rehabilitation, neuromuscular re-education, electrical stimulation & mirror therapy for facial paralysis. Faster recovery with certified neurophysiotherapists. Book today.",
  keywords: [
    "Bell's palsy physiotherapy Noida", "facial palsy treatment", "facial nerve rehabilitation",
    "Bell's palsy treatment Greater Noida", "facial paralysis physiotherapy",
    "neuromuscular re-education", "mirror therapy Bell's palsy", "electrical stimulation facial palsy",
    "Bell's palsy recovery", "facial physiotherapy Noida", "neuro physiotherapy face",
  ].join(", "),
  openGraph: {
    title: "Bell's Palsy Physiotherapy | Facial Nerve Rehab | SKM Noida",
    description: "Expert facial nerve rehabilitation for Bell's palsy in Noida & Greater Noida. Neuromuscular re-education, e-stim & mirror therapy. Faster recovery guaranteed.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/bells-palsy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-bells-palsy.jpg", width: 1200, height: 630, alt: "Bell's Palsy Treatment at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Bell's Palsy Treatment | SKM Physiotherapy Noida", description: "Facial nerve rehab, neuromuscular re-education & faster Bell's palsy recovery in Noida.", images: ["https://skmphysiotherapy.com/og-bells-palsy.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/bells-palsy" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Bell's Palsy Physiotherapy Treatment",
      description: "Specialist facial nerve rehabilitation for Bell's palsy using neuromuscular re-education, electrical stimulation and mirror therapy techniques.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Bell's Palsy" },
        { "@type": "MedicalCondition", name: "Facial Nerve Palsy" },
        { "@type": "MedicalCondition", name: "Facial Paralysis" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Bell's Palsy Treatment", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/bells-palsy" },
      ],
    },
  ],
};

export default function BellsPalsyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
