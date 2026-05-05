// app/services-skm-physiotherapy/sports-injuries/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports Injury Rehabilitation in Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Expert sports injury physiotherapy at SKM across Noida, Greater Noida & Gurugram. Treatment for ACL tears, muscle strains, ligament sprains, tennis elbow, ankle sprains & post-surgery sports rehab. Certified sports physiotherapists. Get back to peak performance.",
  keywords: [
    "sports injury physiotherapy Noida", "sports injury rehab Greater Noida", "ACL tear treatment Noida",
    "muscle strain physiotherapy", "ligament sprain treatment", "tennis elbow Noida",
    "ankle sprain physiotherapy", "sports injury specialist", "athletic injury rehab",
    "sports physio near me", "sports injury clinic Noida", "post sports surgery rehab",
    "sports-injuries Gurugram",
  ].join(", "),
  openGraph: {
    title: "Sports Injury Rehabilitation | SKM Physiotherapy Noida",
    description: "Get back to peak performance. Expert sports physio for ACL, muscle tears, sprains, tennis elbow & more across Noida, Greater Noida & Gurugram.",
    url: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/sports-injuries",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-sports-injury.jpg", width: 1200, height: 630, alt: "Sports Injury Rehabilitation at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Sports Injury Rehab | SKM Physiotherapy Noida", description: "ACL, muscle tears, sprains, tennis elbow & more. Expert sports physio in Noida.", images: ["https://www.skmphysiotherapy.com/og-sports-injury.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/sports-injuries" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Sports Injury Rehabilitation",
      description: "Comprehensive sports injury rehabilitation for ACL tears, muscle strains, ligament sprains, tennis elbow, ankle sprains and post-surgical sports recovery.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "ACL Injury" },
        { "@type": "MedicalCondition", name: "Muscle Strain" },
        { "@type": "MedicalCondition", name: "Ligament Sprain" },
        { "@type": "MedicalCondition", name: "Tennis Elbow" },
        { "@type": "MedicalCondition", name: "Ankle Sprain" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://www.skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Sports Injury Rehabilitation", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/sports-injuries" },
      ],
    },
  ],
};

export default function SportsInjuriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
