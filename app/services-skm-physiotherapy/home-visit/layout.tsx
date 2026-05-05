// app/services-skm-physiotherapy/home-visit/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Visit Physiotherapy in Noida, Greater Noida & Gurugram | SKM Physiotherapy",
  description:
    "Professional home service physiotherapy across Delhi NCR — Noida, Greater Noida & Gurugram. SKM expert therapists come to your home for post-surgery rehab, stroke recovery, elderly & bed-ridden patient care. Same clinic quality at your doorstep. Book a home visit today.",
  keywords: [
    "home visit physiotherapy Noida", "home service physiotherapy", "physiotherapy at home Greater Noida",
    "home visit physiotherapy Gurugram", "home physiotherapist Gurugram", "doorstep physiotherapy Delhi NCR",
    "home physiotherapist near me", "physio home visit Noida", "physiotherapy at home Delhi NCR",
    "home physiotherapy service Gurugram", "post surgery home physio", "elderly physiotherapy at home",
    "stroke physio home visit", "bed ridden patient physiotherapy", "home physiotherapy service Noida",
    "physiotherapist home visit Greater Noida", "home visit physio DLF Gurugram",
    "home physiotherapy Sector 14 Gurugram", "home physio service near me",
  ].join(", "),
  openGraph: {
    title: "Home Visit Physiotherapy | SKM Physiotherapy — Noida, Greater Noida & Gurugram",
    description: "Expert physiotherapists come to your home across Delhi NCR — Noida, Greater Noida & Gurugram. Post-surgery rehab, stroke, elderly & bed-ridden care at home. Same clinic quality, zero travel.",
    url: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/home-visit",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-home-visit.jpg", width: 1200, height: 630, alt: "Home Visit Physiotherapy in Noida and Gurugram by SKM Physiotherapy" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Home Visit Physiotherapy | SKM — Noida, Greater Noida & Gurugram", description: "Professional home service physio across Delhi NCR. Post-surgery, stroke & elderly care at your doorstep.", images: ["https://www.skmphysiotherapy.com/og-home-visit.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/home-visit" },
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
        url: "https://www.skmphysiotherapy.com",
        availableService: {
          "@type": "Service",
          serviceType: "Home Visit Physiotherapy",
          areaServed: ["Noida", "Greater Noida", "Gurugram", "Delhi NCR"],
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Home Visit Physiotherapy", item: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/home-visit" },
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
