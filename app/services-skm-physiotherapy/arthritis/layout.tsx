// app/services-skm-physiotherapy/arthritis/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arthritis Physiotherapy Treatment in Noida & Greater Noida | SKM",
  description:
    "Expert physiotherapy for arthritis at SKM in Noida & Greater Noida. Non-surgical pain relief and mobility improvement for osteoarthritis, rheumatoid arthritis & gout. Joint care programs to keep you active. Certified therapists. Book free consultation.",
  keywords: [
    "arthritis physiotherapy Noida", "arthritis treatment Greater Noida", "osteoarthritis physiotherapy",
    "rheumatoid arthritis treatment Noida", "joint pain physiotherapy", "arthritis pain relief",
    "arthritis management program", "knee arthritis treatment", "hip arthritis physiotherapy",
    "arthritis specialist Noida", "non-surgical arthritis treatment",
  ].join(", "),
  openGraph: {
    title: "Arthritis Physiotherapy | SKM Physiotherapy Noida",
    description: "Non-surgical arthritis pain relief & mobility improvement in Noida & Greater Noida. Osteoarthritis, rheumatoid arthritis & joint care programs.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/arthritis",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-arthritis.jpg", width: 1200, height: 630, alt: "Arthritis Physiotherapy Treatment at SKM Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Arthritis Treatment | SKM Physiotherapy Noida", description: "Non-surgical arthritis pain relief for osteoarthritis & rheumatoid arthritis in Noida.", images: ["https://skmphysiotherapy.com/og-arthritis.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/arthritis" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Arthritis Physiotherapy Treatment",
      description: "Non-surgical physiotherapy for osteoarthritis, rheumatoid arthritis and gout including joint mobilisation, strengthening exercises and pain management.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Osteoarthritis" },
        { "@type": "MedicalCondition", name: "Rheumatoid Arthritis" },
        { "@type": "MedicalCondition", name: "Gout" },
        { "@type": "MedicalCondition", name: "Joint Pain" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Arthritis Treatment", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/arthritis" },
      ],
    },
  ],
};

export default function ArthritisLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
