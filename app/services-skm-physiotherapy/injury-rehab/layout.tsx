// app/services-skm-physiotherapy/injury-rehab/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Injury Rehabilitation Physiotherapy Noida, Greater Noida & Gurugram | SKM",
  description:
    "Comprehensive injury rehabilitation at SKM Physiotherapy across Noida, Greater Noida & Gurugram. Post-surgery rehab, fracture recovery, ligament repair, rotator cuff & joint replacement rehabilitation. Evidence-based protocols for faster, complete recovery.",
  keywords: [
    "injury rehabilitation Noida", "injury rehab physiotherapy Greater Noida",
    "post surgery rehabilitation", "fracture recovery physiotherapy", "ligament repair rehab",
    "rotator cuff rehabilitation Noida", "joint replacement rehab", "injury recovery clinic",
    "physiotherapy after surgery Noida", "injury rehab near me", "orthopedic rehab Noida",
  ].join(", "),
  openGraph: {
    title: "Injury Rehabilitation Physiotherapy | SKM Physiotherapy Noida",
    description: "Complete injury rehab across Noida, Greater Noida & Gurugram. Post-surgery, fractures, ligament repair, rotator cuff & joint replacement. Evidence-based, personalized protocols.",
    url: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/injury-rehab",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-injury-rehab.jpg", width: 1200, height: 630, alt: "Injury Rehabilitation at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Injury Rehab | SKM Physiotherapy Noida", description: "Post-surgery, fractures, ligament & joint replacement rehab. Evidence-based physio in Noida.", images: ["https://www.skmphysiotherapy.com/og-injury-rehab.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/injury-rehab" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Injury Rehabilitation Physiotherapy",
      description: "Comprehensive injury rehabilitation including post-surgical recovery, fracture rehabilitation, ligament repair and joint replacement physiotherapy.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Post-Surgical Recovery" },
        { "@type": "MedicalCondition", name: "Bone Fracture" },
        { "@type": "MedicalCondition", name: "Ligament Injury" },
        { "@type": "MedicalCondition", name: "Rotator Cuff Tear" },
        { "@type": "MedicalCondition", name: "Joint Replacement" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://www.skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Injury Rehabilitation", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/injury-rehab" },
      ],
    },
  ],
};

export default function InjuryRehabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
