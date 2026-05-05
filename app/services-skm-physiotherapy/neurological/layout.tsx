// app/services-skm-physiotherapy/neurological/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neurological Physiotherapy in Noida, Greater Noida & Gurugram | SKM",
  description:
    "Expert neurological physiotherapy at SKM across Noida, Greater Noida & Gurugram. Rehabilitation for stroke, Parkinson's disease, multiple sclerosis, cerebral palsy & spinal cord injury. Bobath, PNF & FES certified therapists. Restore function & independence.",
  keywords: [
    "neurological physiotherapy Noida", "stroke rehabilitation Noida", "neuro physiotherapy Greater Noida",
    "Parkinson physiotherapy", "cerebral palsy physiotherapy Noida", "spinal cord injury rehab",
    "multiple sclerosis physiotherapy", "neuro rehab near me", "Bobath physiotherapy Noida",
    "PNF therapy Noida", "post-stroke physiotherapy", "neurological rehab clinic",
  ].join(", "),
  openGraph: {
    title: "Neurological Physiotherapy & Stroke Rehab | SKM Noida",
    description: "Expert neuro physio for stroke, Parkinson's, MS, cerebral palsy & spinal cord injury across Noida, Greater Noida & Gurugram. Bobath & PNF certified therapists.",
    url: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/neurological",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-neurological.jpg", width: 1200, height: 630, alt: "Neurological Physiotherapy at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Neuro Physiotherapy | SKM Noida", description: "Stroke, Parkinson's, MS, cerebral palsy & spinal cord rehab. Bobath & PNF certified in Noida.", images: ["https://www.skmphysiotherapy.com/og-neurological.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/neurological" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Neurological Physiotherapy",
      description: "Specialist neurological rehabilitation using Bobath NDT, PNF and FES for stroke, Parkinson's disease, MS, cerebral palsy and spinal cord injuries.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Stroke" },
        { "@type": "MedicalCondition", name: "Parkinson's Disease" },
        { "@type": "MedicalCondition", name: "Multiple Sclerosis" },
        { "@type": "MedicalCondition", name: "Cerebral Palsy" },
        { "@type": "MedicalCondition", name: "Spinal Cord Injury" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://www.skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Neurological Physiotherapy", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/neurological" },
      ],
    },
  ],
};

export default function NeurologicalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
