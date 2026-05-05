// app/services-skm-physiotherapy/post-covid/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post-COVID Rehabilitation Physiotherapy Noida | SKM Physiotherapy",
  description:
    "Expert post-COVID rehabilitation at SKM across Noida, Greater Noida & Gurugram. Recovery from long COVID symptoms: breathlessness, fatigue, brain fog, muscle weakness & joint pain. Cardiopulmonary & neuro physio specialists. Restore your health fully.",
  keywords: [
    "post COVID physiotherapy Noida", "long COVID rehabilitation", "COVID recovery physiotherapy",
    "post COVID breathlessness treatment", "COVID fatigue physiotherapy", "long COVID Noida",
    "COVID muscle weakness treatment", "cardiopulmonary physiotherapy", "post COVID rehab near me",
    "COVID joint pain treatment", "long haul COVID physiotherapy",
  ].join(", "),
  openGraph: {
    title: "Post-COVID Rehabilitation | SKM Physiotherapy Noida",
    description: "Recover fully from long COVID — breathlessness, fatigue, brain fog, muscle weakness & joint pain. Expert cardiopulmonary & neuro physio in Noida.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/post-covid",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-post-covid.jpg", width: 1200, height: 630, alt: "Post-COVID Rehabilitation at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Post-COVID Rehab | SKM Physiotherapy Noida", description: "Long COVID recovery: breathlessness, fatigue, muscle weakness & joint pain in Noida.", images: ["https://skmphysiotherapy.com/og-post-covid.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/post-covid" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Post-COVID Rehabilitation Physiotherapy",
      description: "Comprehensive post-COVID recovery physiotherapy for long COVID symptoms including breathlessness, fatigue, muscle weakness, joint pain and brain fog.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Long COVID" },
        { "@type": "MedicalCondition", name: "Post-COVID Fatigue Syndrome" },
        { "@type": "MedicalCondition", name: "Post-COVID Breathlessness" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Post-COVID Rehabilitation", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/post-covid" },
      ],
    },
  ],
};

export default function PostCovidLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
