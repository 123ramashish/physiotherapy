// app/services-skm-physiotherapy/frozen-shoulder/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frozen Shoulder Treatment in Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Expert physiotherapy for frozen shoulder (adhesive capsulitis) at SKM across Noida, Greater Noida & Gurugram. Regain full shoulder mobility without surgery. Manual therapy, mobilisation & exercise programs. Certified therapists. Book free consultation.",
  keywords: [
    "frozen shoulder treatment Noida", "adhesive capsulitis physiotherapy", "frozen shoulder clinic Greater Noida",
    "shoulder pain treatment Noida", "shoulder stiffness physiotherapy", "shoulder mobility treatment",
    "shoulder physiotherapy near me", "frozen shoulder recovery", "shoulder joint pain relief",
    "non-surgical frozen shoulder", "shoulder specialist Noida",
    "frozen-shoulder Gurugram",
  ].join(", "),
  openGraph: {
    title: "Frozen Shoulder Treatment | SKM Physiotherapy Noida",
    description: "Regain full shoulder mobility without surgery. Expert physiotherapy for frozen shoulder & adhesive capsulitis across Noida, Greater Noida & Gurugram.",
    url: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/frozen-shoulder",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-frozen-shoulder.jpg", width: 1200, height: 630, alt: "Frozen Shoulder Treatment at SKM Physiotherapy" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Frozen Shoulder Treatment | SKM Physiotherapy Noida", description: "Regain full shoulder mobility without surgery. Expert physio across Noida, Greater Noida & Gurugram.", images: ["https://www.skmphysiotherapy.com/og-frozen-shoulder.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/frozen-shoulder" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Frozen Shoulder Physiotherapy Treatment",
      description: "Expert physiotherapy for frozen shoulder (adhesive capsulitis) using manual therapy, joint mobilisation and progressive exercise programs.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Frozen Shoulder" },
        { "@type": "MedicalCondition", name: "Adhesive Capsulitis" },
        { "@type": "MedicalCondition", name: "Shoulder Impingement" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://www.skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Frozen Shoulder Treatment", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/frozen-shoulder" },
      ],
    },
  ],
};

export default function FrozenShoulderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
