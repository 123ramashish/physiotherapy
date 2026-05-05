// app/press-releases-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Releases | SKM Physiotherapy in the News",
  description:
    "Read the latest press releases and media coverage about SKM Physiotherapy. Stay updated with our milestones, achievements, new clinic openings, and contributions to physiotherapy in India.",

  keywords: [
    "SKM physiotherapy press release",
    "physiotherapy news India",
    "SKM physiotherapy media",
    "physiotherapy clinic news Noida",
    "physiotherapy award news",
    "physiotherapy achievement",
    "SKM media coverage",
  ].join(", "),

  openGraph: {
    title: "Press Releases | SKM Physiotherapy in the Media",
    description: "Latest press releases, news coverage, and announcements from SKM Physiotherapy & Rehabilitation Centre.",
    url: "https://www.skmphysiotherapy.com/press-releases-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-press.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Press Releases",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SKM Physiotherapy Press Releases & Media",
    description: "Latest news and media coverage from SKM Physiotherapy.",
    images: ["https://www.skmphysiotherapy.com/og-press.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/press-releases-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/press-releases-physiotherapy" },
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
    { "@type": "ListItem", position: 2, name: "Press Releases", item: "https://www.skmphysiotherapy.com/press-releases-physiotherapy" },
  ],
};

export default function PressReleasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
