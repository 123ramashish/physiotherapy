// app/sports-injury-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports Injury Physiotherapy in Noida & Greater Noida | SKM",
  description:
    "Expert sports injury physiotherapy at SKM. Treatment for muscle tears, ligament sprains, ACL injuries, tennis elbow, runner's knee & post-surgery rehab. Certified sports physiotherapists in Noida & Greater Noida. Get back to peak performance faster.",

  keywords: [
    "sports injury physiotherapy Noida",
    "sports physiotherapy Greater Noida",
    "sports injury treatment near me",
    "ACL injury rehabilitation Noida",
    "muscle tear treatment",
    "ligament sprain physiotherapy",
    "tennis elbow treatment Noida",
    "runner knee physiotherapy",
    "post sports surgery rehab",
    "athletic injury recovery",
    "sports rehab Delhi NCR",
    "best sports physiotherapist Noida",
    "cricket injury treatment",
    "football injury physiotherapy",
  ].join(", "),

  openGraph: {
    title: "Sports Injury Rehabilitation | SKM Physiotherapy Noida",
    description:
      "Get back to peak performance with expert sports injury physio. ACL, muscle tears, ligament sprains, tennis elbow & more. Specialized sports rehab in Noida & Greater Noida.",
    url: "https://www.skmphysiotherapy.com/sports-injury-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-sports-injury.jpg",
        width: 1200,
        height: 630,
        alt: "Sports Injury Physiotherapy at SKM - Expert Rehabilitation",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sports Injury Physiotherapy | SKM Physiotherapy Noida",
    description: "ACL rehab, muscle tears, ligament injuries & more. Expert sports physio in Noida & Greater Noida. Book today.",
    images: ["https://www.skmphysiotherapy.com/og-sports-injury.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/sports-injury-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/sports-injury-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const sportsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Sports Injury Physiotherapy",
      description: "Comprehensive sports injury rehabilitation including treatment for ACL tears, muscle strains, ligament sprains, tennis elbow, runner's knee and post-surgical recovery.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "ACL Injury" },
        { "@type": "MedicalCondition", name: "Muscle Tear" },
        { "@type": "MedicalCondition", name: "Ligament Sprain" },
        { "@type": "MedicalCondition", name: "Tennis Elbow" },
        { "@type": "MedicalCondition", name: "Runner's Knee" },
      ],
      provider: {
        "@type": "MedicalOrganization",
        name: "SKM Physiotherapy & Rehabilitation Centre",
        url: "https://www.skmphysiotherapy.com",
      },
      areaServed: ["Noida", "Greater Noida", "Delhi NCR"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Sports Injury Physiotherapy", item: "https://www.skmphysiotherapy.com/sports-injury-physiotherapy" },
      ],
    },
  ],
};

export default function SportsInjuryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsStructuredData) }}
      />
      {children}
    </>
  );
}
