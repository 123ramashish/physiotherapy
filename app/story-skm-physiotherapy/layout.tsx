// app/story-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SKM Physiotherapy Story | Founding Journey & Mission",
  description:
    "The complete story of SKM Physiotherapy — from a passionate physiotherapy graduate making home visits on a bicycle in 2021 to a multi-branch rehabilitation network in Noida & Greater Noida.",

  keywords: [
    "SKM physiotherapy founding story",
    "about SKM physiotherapy",
    "SKM vision and mission",
    "physiotherapy history Noida",
    "physiotherapy founder",
    "SKM physiotherapy background",
  ].join(", "),

  openGraph: {
    title: "The SKM Physiotherapy Story | Our Founding Journey",
    description: "From a bicycle and a dream to a trusted physiotherapy network. Read SKM's founding story and mission.",
    url: "https://skmphysiotherapy.com/story-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-story.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SKM Physiotherapy | Our Story",
    description: "The inspiring founding story of SKM Physiotherapy.",
    images: ["https://skmphysiotherapy.com/og-story.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://skmphysiotherapy.com/story-skm-physiotherapy",
  },

  robots: { index: false, follow: true },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
    { "@type": "ListItem", position: 2, name: "Our Story", item: "https://skmphysiotherapy.com/story-skm-physiotherapy" },
  ],
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
