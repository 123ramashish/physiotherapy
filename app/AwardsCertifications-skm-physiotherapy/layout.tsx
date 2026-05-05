// app/AwardsCertifications-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards & Certifications | SKM Physiotherapy - NABH Accredited, ISO Certified",
  description:
    "SKM Physiotherapy is NABH accredited, ISO 9001:2015 certified, and holder of multiple national healthcare excellence awards. Our therapists carry internationally recognised clinical certifications including McKenzie, Maitland, Bobath NDT, and Dry Needling.",

  keywords: [
    "NABH accredited physiotherapy",
    "ISO certified physiotherapy clinic",
    "best physiotherapy awards India",
    "McKenzie certified physiotherapist",
    "Bobath NDT certified",
    "dry needling certification India",
    "physiotherapy excellence award",
    "accredited physiotherapy clinic Noida",
    "certified physiotherapy centre",
    "SKM physiotherapy awards",
    "physiotherapy certifications India",
    "Maitland manual therapy certified",
  ].join(", "),

  openGraph: {
    title: "NABH Accredited & Award-Winning Physiotherapy | SKM",
    description:
      "Internationally certified physiotherapy with NABH accreditation, ISO 9001:2015, McKenzie, Bobath NDT, dry needling & more. See why SKM is trusted as one of India's best physiotherapy clinics.",
    url: "https://www.skmphysiotherapy.com/AwardsCertifications-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-awards.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Awards and Certifications - NABH, ISO & More",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NABH Accredited Physiotherapy | SKM Awards & Certifications",
    description: "ISO certified. NABH accredited. Multiple national healthcare awards. Internationally certified therapists.",
    images: ["https://www.skmphysiotherapy.com/og-awards.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/AwardsCertifications-skm-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/AwardsCertifications-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const awardsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://www.skmphysiotherapy.com/#organization",
      name: "SKM Physiotherapy & Rehabilitation Centre",
      url: "https://www.skmphysiotherapy.com",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "ISO 9001:2015 Certification",
          credentialCategory: "Quality Management",
          recognizedBy: { "@type": "Organization", name: "Bureau Veritas" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "NABH Accreditation",
          credentialCategory: "Healthcare Accreditation",
          recognizedBy: {
            "@type": "Organization",
            name: "National Accreditation Board for Hospitals & Healthcare Providers",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Awards & Certifications", item: "https://www.skmphysiotherapy.com/AwardsCertifications-skm-physiotherapy" },
      ],
    },
  ],
};

export default function AwardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(awardsStructuredData) }}
      />
      {children}
    </>
  );
}
