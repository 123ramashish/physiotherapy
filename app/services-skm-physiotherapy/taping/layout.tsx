// app/services-skm-physiotherapy/taping/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kinesiology Taping Therapy Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Expert kinesiology taping (K-Tape) and sports taping at SKM across Noida, Greater Noida & Gurugram. Support injured joints & muscles, reduce swelling, improve performance & speed up recovery. Used for back pain, sports injuries, knee & shoulder conditions.",
  keywords: [
    "kinesiology taping Noida", "K-tape physiotherapy", "sports taping Greater Noida",
    "taping therapy near me", "Kinesio tape back pain", "KT tape sports injury",
    "taping for knee pain Noida", "taping for shoulder pain", "muscle taping physiotherapy",
    "joint support taping", "RockTape Noida", "strapping physiotherapy",
  ].join(", "),
  openGraph: {
    title: "Kinesiology Taping (K-Tape) | SKM Physiotherapy Noida",
    description: "Expert kinesiology & sports taping across Noida, Greater Noida & Gurugram. Reduce swelling, support injuries & improve performance. Used for back, knee, shoulder & sports conditions.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/taping",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-taping.jpg", width: 1200, height: 630, alt: "Kinesiology Taping Therapy at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Kinesiology Taping | SKM Physiotherapy Noida", description: "K-Tape & sports taping for back pain, knee, shoulder & sports injuries in Noida.", images: ["https://skmphysiotherapy.com/og-taping.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/taping" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Kinesiology Taping Therapy",
      description: "Expert kinesiology (K-Tape) and sports taping to support injured muscles and joints, reduce swelling, and improve athletic performance.",
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Taping Therapy", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/taping" },
      ],
    },
  ],
};

export default function TapingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
