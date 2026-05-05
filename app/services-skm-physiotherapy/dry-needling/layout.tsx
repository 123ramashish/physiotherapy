// app/services-skm-physiotherapy/dry-needling/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dry Needling Treatment in Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Certified dry needling therapy at SKM Physiotherapy across Noida, Greater Noida & Gurugram. Trigger point release for muscle knots, chronic pain, tension headaches & sports injuries. INDN-certified therapists. Fast, effective pain relief. Book today.",
  keywords: [
    "dry needling Noida", "dry needling Greater Noida", "dry needling near me",
    "trigger point therapy Noida", "muscle knot treatment", "myofascial release Noida",
    "dry needling for back pain", "dry needling for neck pain", "dry needling sports injuries",
    "certified dry needling", "intramuscular stimulation", "IMS therapy Noida",
    "dry-needling Gurugram",
  ].join(", "),
  openGraph: {
    title: "Dry Needling Trigger Point Therapy | SKM Physiotherapy Noida",
    description: "INDN-certified dry needling for muscle knots, chronic pain, headaches & sports injuries. Fast, targeted pain relief across Noida, Greater Noida & Gurugram.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/dry-needling",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-dry-needling.jpg", width: 1200, height: 630, alt: "Dry Needling Therapy at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Dry Needling Therapy | SKM Physiotherapy Noida", description: "Certified trigger point dry needling for muscle knots, chronic pain & sports injuries in Noida.", images: ["https://skmphysiotherapy.com/og-dry-needling.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/dry-needling" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Dry Needling Therapy",
      description: "INDN-certified dry needling for trigger point release, muscle tension, chronic pain, headaches and sports-related muscle injuries.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Myofascial Pain Syndrome" },
        { "@type": "MedicalCondition", name: "Tension Headache" },
        { "@type": "MedicalCondition", name: "Chronic Muscle Pain" },
        { "@type": "MedicalCondition", name: "Sports Muscle Injury" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Dry Needling", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/dry-needling" },
      ],
    },
  ],
};

export default function DryNeedlingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
