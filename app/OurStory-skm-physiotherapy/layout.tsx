// app/OurStory-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | From One Bicycle to Multi-Branch | SKM Physiotherapy",
  description:
    "The inspiring journey of SKM Physiotherapy — from a single graduate delivering home visits on a bicycle in 2021, to a trusted multi-branch physiotherapy network with 20,000+ patients healed. Read the founding story and mission of SKM.",

  keywords: [
    "SKM physiotherapy story",
    "physiotherapy clinic history",
    "SKM founder story",
    "physiotherapy startup India",
    "physiotherapy mission Noida",
    "about SKM physiotherapy",
    "physiotherapy journey India",
    "physiotherapy clinic founding story",
    "SKM physiotherapy background",
  ].join(", "),

  openGraph: {
    title: "Our Story | From Bicycle to Multi-Branch | SKM Physiotherapy",
    description: "One graduate, one bicycle, zero clinic. How SKM Physiotherapy grew from home visits to a trusted multi-branch network healing 20,000+ patients.",
    url: "https://skmphysiotherapy.com/OurStory-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-story.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy - Our Story, Journey from Home Visits to Multi-Branch",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The SKM Physiotherapy Story | From Bicycle to Branches",
    description: "From home visits on a bicycle to a multi-branch network. The inspiring founding story of SKM Physiotherapy.",
    images: ["https://skmphysiotherapy.com/og-story.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://skmphysiotherapy.com/OurStory-skm-physiotherapy",
    languages: { "en-IN": "https://skmphysiotherapy.com/OurStory-skm-physiotherapy" },
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
    { "@type": "ListItem", position: 2, name: "Our Story", item: "https://skmphysiotherapy.com/OurStory-skm-physiotherapy" },
  ],
};

export default function OurStoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
