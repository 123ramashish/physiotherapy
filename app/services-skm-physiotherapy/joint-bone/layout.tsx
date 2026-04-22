// app/services-skm-physiotherapy/joint-bone/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joint & Bone Pain Physiotherapy Noida & Greater Noida | SKM",
  description:
    "Expert physiotherapy for joint and bone pain at SKM in Noida & Greater Noida. Treatment for hip pain, shoulder pain, elbow pain, wrist pain, osteoporosis & joint stiffness. Manual therapy & mobilisation techniques. Non-surgical relief. Book free consultation.",
  keywords: [
    "joint pain physiotherapy Noida", "bone pain treatment Greater Noida",
    "hip pain physiotherapy", "shoulder pain treatment Noida", "elbow pain physiotherapy",
    "wrist pain treatment", "osteoporosis physiotherapy", "joint stiffness treatment",
    "joint mobilisation therapy", "non-surgical joint pain relief", "bone physiotherapy Noida",
    "joint pain clinic near me",
  ].join(", "),
  openGraph: {
    title: "Joint & Bone Pain Physiotherapy | SKM Physiotherapy Noida",
    description: "Non-surgical joint and bone pain relief in Noida & Greater Noida. Hip, shoulder, elbow, wrist pain & osteoporosis treatment. Expert manual therapy.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/joint-bone",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-joint-bone.jpg", width: 1200, height: 630, alt: "Joint and Bone Pain Physiotherapy at SKM Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Joint & Bone Pain Relief | SKM Physiotherapy Noida", description: "Hip, shoulder, elbow & wrist pain. Osteoporosis. Non-surgical physio in Noida.", images: ["https://skmphysiotherapy.com/og-joint-bone.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/joint-bone" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Joint and Bone Pain Physiotherapy",
      description: "Expert physiotherapy for hip pain, shoulder pain, elbow pain, wrist pain, osteoporosis and general joint stiffness using manual therapy and mobilisation.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Hip Pain" },
        { "@type": "MedicalCondition", name: "Shoulder Pain" },
        { "@type": "MedicalCondition", name: "Elbow Pain" },
        { "@type": "MedicalCondition", name: "Wrist Pain" },
        { "@type": "MedicalCondition", name: "Osteoporosis" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Joint & Bone Pain", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/joint-bone" },
      ],
    },
  ],
};

export default function JointBoneLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
