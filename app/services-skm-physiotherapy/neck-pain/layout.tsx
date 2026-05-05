// app/services-skm-physiotherapy/neck-pain/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neck Pain Treatment in Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Expert physiotherapy for neck pain at SKM across Noida, Greater Noida & Gurugram. Treatment for cervical spondylosis, stiff neck, cervical disc pain, whiplash & posture-related neck pain. Certified therapists. Book your consultation today.",
  keywords: [
    "neck pain treatment Noida", "cervical spondylosis physiotherapy", "neck pain clinic Greater Noida",
    "neck pain treatment Gurugram", "cervical pain physiotherapy Gurugram", "stiff neck treatment",
    "whiplash treatment Noida", "neck pain specialist near me", "posture neck pain relief",
    "cervical disc pain treatment", "physiotherapy for neck pain", "neck pain clinic Gurugram",
    "neck pain physiotherapy Delhi NCR",
  ].join(", "),
  openGraph: {
    title: "Neck Pain & Cervical Spondylosis Treatment | SKM Physiotherapy — Noida & Gurugram",
    description: "Expert physiotherapy for neck pain, cervical spondylosis, whiplash & disc pain across Noida, Greater Noida & Gurugram. Non-surgical, personalized treatment.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/neck-pain",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-neck-pain.jpg", width: 1200, height: 630, alt: "Neck Pain Treatment at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Neck Pain Treatment | SKM Physiotherapy Noida", description: "Expert physio for cervical spondylosis, stiff neck, disc pain & whiplash in Noida.", images: ["https://skmphysiotherapy.com/og-neck-pain.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/neck-pain" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Neck Pain Physiotherapy Treatment",
      description: "Expert physiotherapy for cervical spondylosis, cervical disc pain, stiff neck, whiplash injuries and posture-related neck pain.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Cervical Spondylosis" },
        { "@type": "MedicalCondition", name: "Cervical Disc Herniation" },
        { "@type": "MedicalCondition", name: "Whiplash Injury" },
        { "@type": "MedicalCondition", name: "Neck Pain" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Neck Pain Treatment", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/neck-pain" },
      ],
    },
  ],
};

export default function NeckPainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
