// app/services-skm-physiotherapy/sciatica/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sciatica Treatment in Noida & Greater Noida | SKM Physiotherapy",
  description:
    "Effective sciatica pain treatment without surgery at SKM Physiotherapy in Noida & Greater Noida. Expert physiotherapy for sciatic nerve pain, leg numbness, buttock pain & radiating back pain. Certified therapists. Book free consultation.",
  keywords: [
    "sciatica treatment Noida", "sciatica physiotherapy Greater Noida", "sciatic nerve pain treatment",
    "sciatica pain relief Noida", "leg numbness treatment", "radiating back pain physiotherapy",
    "sciatica without surgery", "sciatica specialist near me", "sciatica nerve pain clinic",
    "piriformis syndrome treatment", "sciatica home visit Noida",
  ].join(", "),
  openGraph: {
    title: "Sciatica Treatment Without Surgery | SKM Physiotherapy Noida",
    description: "Expert non-surgical sciatica treatment in Noida & Greater Noida. Sciatic nerve pain, leg numbness & radiating pain relief. Book free consultation.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/sciatica",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-sciatica.jpg", width: 1200, height: 630, alt: "Sciatica Treatment at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Sciatica Treatment | SKM Physiotherapy Noida", description: "Non-surgical sciatica & sciatic nerve pain relief in Noida & Greater Noida.", images: ["https://skmphysiotherapy.com/og-sciatica.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/sciatica" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Sciatica Physiotherapy Treatment",
      description: "Non-surgical physiotherapy treatment for sciatica, sciatic nerve pain, leg numbness, buttock pain and radiating back pain.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Sciatica" },
        { "@type": "MedicalCondition", name: "Sciatic Nerve Compression" },
        { "@type": "MedicalCondition", name: "Piriformis Syndrome" },
        { "@type": "MedicalCondition", name: "Lumbar Radiculopathy" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Sciatica Treatment", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/sciatica" },
      ],
    },
  ],
};

export default function SciaticaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
