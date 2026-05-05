// app/services-skm-physiotherapy/pain-management/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chronic Pain Management Physiotherapy Noida | SKM Physiotherapy",
  description:
    "Expert chronic pain management at SKM Physiotherapy across Noida, Greater Noida & Gurugram. Holistic physiotherapy approach for fibromyalgia, chronic pain syndrome, persistent musculoskeletal pain & CRPS. Evidence-based pain science education & hands-on therapy.",
  keywords: [
    "chronic pain management Noida", "pain management physiotherapy", "fibromyalgia treatment Noida",
    "chronic pain syndrome physiotherapy", "pain clinic Greater Noida", "persistent pain treatment",
    "pain science physiotherapy", "CRPS physiotherapy", "pain management specialist near me",
    "musculoskeletal pain management", "chronic pain relief Noida",
  ].join(", "),
  openGraph: {
    title: "Chronic Pain Management Physiotherapy | SKM Noida",
    description: "Holistic chronic pain management across Noida, Greater Noida & Gurugram. Fibromyalgia, pain syndrome & CRPS. Pain science education + hands-on therapy. Book free consultation.",
    url: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/pain-management",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-pain-management.jpg", width: 1200, height: 630, alt: "Chronic Pain Management at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Pain Management Physiotherapy | SKM Noida", description: "Chronic pain, fibromyalgia & CRPS management. Evidence-based pain science in Noida.", images: ["https://www.skmphysiotherapy.com/og-pain-management.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/pain-management" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Chronic Pain Management Physiotherapy",
      description: "Holistic evidence-based physiotherapy for chronic pain syndrome, fibromyalgia, CRPS and persistent musculoskeletal pain using pain science education and manual therapy.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Chronic Pain Syndrome" },
        { "@type": "MedicalCondition", name: "Fibromyalgia" },
        { "@type": "MedicalCondition", name: "Complex Regional Pain Syndrome" },
        { "@type": "MedicalCondition", name: "Persistent Musculoskeletal Pain" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://www.skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Pain Management", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/pain-management" },
      ],
    },
  ],
};

export default function PainManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
