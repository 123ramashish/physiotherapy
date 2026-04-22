// app/services-skm-physiotherapy/home-visit/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Visit Physiotherapy in Noida & Greater Noida | SKM Physiotherapy",
  description:
    "Professional home visit physiotherapy at SKM in Noida & Greater Noida. Expert therapists come to you for post-surgery rehab, stroke recovery, elderly care & bed-ridden patients. Fully equipped, same clinic quality at home. Book a home visit today.",
  keywords: [
    "home visit physiotherapy Noida", "physiotherapy at home Greater Noida",
    "home physiotherapist near me", "physio home visit Noida", "doorstep physiotherapy",
    "post surgery home physio", "elderly physiotherapy at home", "stroke physio home visit",
    "bed ridden patient physiotherapy", "home physiotherapy service Noida",
    "physiotherapist home visit Greater Noida",
  ].join(", "),
  openGraph: {
    title: "Home Visit Physiotherapy | SKM Physiotherapy Noida",
    description: "Expert physiotherapists come to you in Noida & Greater Noida. Post-surgery rehab, stroke, elderly & bed-ridden care at home. Same clinic quality — zero travel.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/home-visit",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-home-visit.jpg", width: 1200, height: 630, alt: "Home Visit Physiotherapy in Noida by SKM Physiotherapy" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Home Visit Physiotherapy | SKM Noida", description: "Professional physio at your doorstep in Noida & Greater Noida. Post-surgery, stroke & elderly care.", images: ["https://skmphysiotherapy.com/og-home-visit.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/home-visit" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Home Visit Physiotherapy",
      description: "Professional home-based physiotherapy service for post-surgical patients, stroke survivors, elderly patients and bed-ridden individuals in Noida and Greater Noida.",
      provider: {
        "@type": "MedicalOrganization",
        name: "SKM Physiotherapy & Rehabilitation Centre",
        url: "https://skmphysiotherapy.com",
        availableService: {
          "@type": "Service",
          serviceType: "Home Visit",
          areaServed: ["Noida", "Greater Noida"],
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Home Visit Physiotherapy", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/home-visit" },
      ],
    },
  ],
};

export default function HomeVisitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
