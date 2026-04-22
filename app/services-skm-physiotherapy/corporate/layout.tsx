// app/services-skm-physiotherapy/corporate/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Physiotherapy & Workplace Wellness Noida | SKM",
  description:
    "On-site and online corporate physiotherapy for companies in Noida & Greater Noida. Ergonomics assessments, RSI prevention, posture correction, desk pain workshops & employee wellness programs. Trusted by leading corporates. Get a quote today.",
  keywords: [
    "corporate physiotherapy Noida", "workplace wellness physiotherapy", "ergonomics assessment Noida",
    "RSI prevention program", "office physiotherapy Greater Noida", "employee wellness physiotherapy",
    "desk pain physiotherapy", "posture correction workplace", "corporate health program Noida",
    "on-site physiotherapy", "corporate physio near me", "IT company physiotherapy",
  ].join(", "),
  openGraph: {
    title: "Corporate Physiotherapy & Workplace Wellness | SKM Noida",
    description: "On-site ergonomics, RSI prevention, posture correction & employee wellness programs for companies in Noida & Greater Noida. Trusted by leading corporates.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/corporate",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-corporate.jpg", width: 1200, height: 630, alt: "Corporate Physiotherapy and Workplace Wellness by SKM Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Corporate Physiotherapy | SKM Noida", description: "On-site ergonomics, RSI prevention & employee wellness in Noida & Greater Noida.", images: ["https://skmphysiotherapy.com/og-corporate.jpg"], creator: "@skmphysio" },
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
      areaServed: ["Noida", "Greater Noida", "Delhi NCR"],
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
