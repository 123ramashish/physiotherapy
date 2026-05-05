// app/services-skm-physiotherapy/back-pain/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Back Pain Treatment in Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Expert non-surgical back pain treatment at SKM Physiotherapy across Delhi NCR. Specialized physiotherapy for lower back pain, lumbar disc bulge, spondylosis & sciatica. Certified therapists in Noida, Greater Noida & Gurugram. Book your consultation.",
  keywords: [
    "back pain treatment Noida", "lower back pain physiotherapy", "back pain clinic Greater Noida",
    "back pain treatment Gurugram", "back pain physiotherapy Delhi NCR",
    "lumbar pain treatment", "spondylosis physiotherapy", "disc bulge treatment Noida",
    "non-surgical back pain relief", "back pain specialist near me", "physiotherapy for back pain",
    "chronic back pain Noida", "acute back pain treatment Gurugram",
  ].join(", "),
  openGraph: {
    title: "Back Pain Treatment Without Surgery | SKM Physiotherapy — Noida & Gurugram",
    description: "Non-surgical back pain relief across Delhi NCR — Noida, Greater Noida & Gurugram. Specialized physio for lower back pain, sciatica, disc bulge & spondylosis.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/back-pain",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-back-pain.jpg", width: 1200, height: 630, alt: "Back Pain Treatment at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Back Pain Treatment | SKM Physiotherapy Noida", description: "Non-surgical back pain relief. Expert physio for sciatica, disc bulge & chronic back pain in Noida.", images: ["https://skmphysiotherapy.com/og-back-pain.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/back-pain" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Back Pain Physiotherapy Treatment",
      description: "Expert non-surgical physiotherapy treatment for lower back pain, lumbar disc herniation, spondylosis, and sciatica at SKM Physiotherapy.",
      relevantCondition: [
        { "@type": "MedicalCondition", name: "Lower Back Pain" },
        { "@type": "MedicalCondition", name: "Lumbar Disc Herniation" },
        { "@type": "MedicalCondition", name: "Sciatica" },
        { "@type": "MedicalCondition", name: "Lumbar Spondylosis" },
      ],
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Back Pain Treatment", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/back-pain" },
      ],
    },
  ],
};

export default function BackPainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
