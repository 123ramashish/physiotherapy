// app/OurPartners-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners | Hospital & Corporate Wellness Partners | SKM Physiotherapy",
  description:
    "SKM Physiotherapy partners with leading hospitals, sports organizations, corporates, and research institutions including Apollo, Fortis, Max, AIIMS, Infosys, and more. Explore our partnership ecosystem and become a partner.",

  keywords: [
    "SKM physiotherapy partners",
    "physiotherapy hospital partnership",
    "corporate physiotherapy partnership",
    "physiotherapy referral program",
    "physiotherapy research collaboration",
    "Apollo hospitals physiotherapy",
    "corporate wellness physiotherapy",
    "physiotherapy white label",
    "sports club physiotherapy partner",
    "SKM partner hospitals",
  ].join(", "),

  openGraph: {
    title: "SKM Physiotherapy Partner Ecosystem | Hospitals, Sports & Corporates",
    description: "Partnering with Apollo, Fortis, Max, AIIMS, Infosys & more. Hospital referrals, corporate wellness, sports club physio & research collaborations.",
    url: "https://www.skmphysiotherapy.com/OurPartners-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-partners.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Partners - Hospitals, Sports, Corporate & Research",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SKM Physiotherapy Partners | Hospitals, Corporates & Research",
    description: "Trusted by Apollo, Fortis, Max, AIIMS, Infosys & more. Learn about our partnership programs.",
    images: ["https://www.skmphysiotherapy.com/og-partners.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/OurPartners-skm-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/OurPartners-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
    { "@type": "ListItem", position: 2, name: "Our Partners", item: "https://www.skmphysiotherapy.com/OurPartners-skm-physiotherapy" },
  ],
};

export default function OurPartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
