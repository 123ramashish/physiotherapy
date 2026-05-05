// app/services-skm-physiotherapy/knee-pain/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knee Pain Treatment in Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Expert physiotherapy for knee pain at SKM across Noida, Greater Noida & Gurugram. Treatment for osteoarthritis, ACL injury, runner's knee, meniscus tear, patellar pain & post-knee surgery rehab. Non-surgical, personalized care. Book your consultation.",
  keywords: [
    "knee pain treatment Noida", "knee physiotherapy Greater Noida", "knee pain treatment Gurugram",
    "knee osteoarthritis treatment", "ACL injury rehab Noida", "runner knee physiotherapy",
    "meniscus tear treatment", "patellar pain physiotherapy", "knee replacement rehab",
    "knee pain specialist near me", "non-surgical knee pain relief", "knee pain clinic Gurugram",
    "knee physiotherapy Delhi NCR",
  ].join(", "),
  openGraph: {
    title: "Knee Pain Treatment Without Surgery | SKM Physiotherapy — Noida & Gurugram",
    description: "Expert non-surgical knee pain treatment across Noida, Greater Noida & Gurugram. Osteoarthritis, ACL, runner's knee, meniscus tear & post-surgery rehab.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/knee-pain",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-knee-pain.jpg", width: 1200, height: 630, alt: "Knee Pain Treatment at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Knee Pain Treatment | SKM Physiotherapy Noida", description: "Non-surgical knee pain relief for osteoarthritis, ACL, runner's knee & more.", images: ["https://skmphysiotherapy.com/og-knee-pain.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/knee-pain" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Knee Pain Physiotherapy Treatment",
      description: "Non-surgical physiotherapy for knee osteoarthritis, ACL injuries, runner's knee, meniscus tears and post-knee replacement rehabilitation.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Knee Osteoarthritis" },
        { "@type": "MedicalCondition", name: "ACL Injury" },
        { "@type": "MedicalCondition", name: "Patellofemoral Pain Syndrome" },
        { "@type": "MedicalCondition", name: "Meniscus Tear" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Knee Pain Treatment", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/knee-pain" },
      ],
    },
  ],
};

export default function KneePainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
