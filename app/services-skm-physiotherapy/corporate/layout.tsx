// app/services-skm-physiotherapy/corporate/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Office Physiotherapy & Workplace Wellness — Noida, Gurugram & Delhi NCR | SKM",
  description:
    "On-site corporate office physiotherapy for companies across Noida, Greater Noida & Gurugram. Ergonomics assessments, RSI prevention, posture correction, desk pain workshops & employee wellness programs. Serving IT parks, DLF Cyber City, and leading corporates. Get a quote today.",
  keywords: [
    "corporate office physiotherapy", "corporate physiotherapy Gurugram", "corporate physiotherapy Noida",
    "workplace wellness physiotherapy Delhi NCR", "office physiotherapy Gurugram",
    "ergonomics assessment Gurugram", "ergonomics assessment Noida", "RSI prevention program",
    "physiotherapy at office", "on-site corporate physiotherapy", "employee wellness physiotherapy",
    "desk pain physiotherapy", "posture correction workplace", "corporate health program Gurugram",
    "IT company physiotherapy Gurugram", "DLF Cyber City corporate physiotherapy",
    "corporate physio near me", "office wellness program Delhi NCR",
    "physiotherapy for corporate employees", "workplace injury prevention",
  ].join(", "),
  openGraph: {
    title: "Corporate Office Physiotherapy & Workplace Wellness | SKM — Noida & Gurugram",
    description: "On-site ergonomics, RSI prevention, posture correction & employee wellness programs for companies across Noida, Greater Noida & Gurugram. Serving IT parks & leading corporates.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/corporate",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-corporate.jpg", width: 1200, height: 630, alt: "Corporate Office Physiotherapy and Workplace Wellness by SKM — Noida and Gurugram" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Corporate Office Physiotherapy | SKM — Noida & Gurugram", description: "On-site ergonomics, RSI prevention & employee wellness for companies in Noida, Greater Noida & Gurugram.", images: ["https://skmphysiotherapy.com/og-corporate.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/corporate" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Corporate Physiotherapy & Workplace Wellness",
      description: "On-site and online corporate physiotherapy services including ergonomics assessment, RSI prevention, posture correction and employee wellness programs.",
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida", "Gurugram", "Gurgaon", "Delhi NCR"],
      serviceType: "Corporate Wellness",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Corporate Physiotherapy", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/corporate" },
      ],
    },
  ],
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
