// app/events-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Physiotherapy Events & Camps | SKM Physiotherapy Noida",
  description:
    "Browse and register for upcoming SKM Physiotherapy events, free health camps, and community wellness programs in Noida & Greater Noida. Expert-led workshops on back pain, ergonomics, and sports injury prevention.",

  keywords: [
    "physiotherapy events Noida",
    "physiotherapy camp Greater Noida",
    "free health camp",
    "SKM events",
    "wellness event Noida",
    "health camp registration",
    "physiotherapy awareness camp",
    "pain management workshop Noida",
    "sports injury prevention event",
  ].join(", "),

  openGraph: {
    title: "Physiotherapy Events & Health Camps | SKM Physiotherapy Noida",
    description: "Register for upcoming free health camps, ergonomics workshops, and sports injury prevention events. Expert sessions by SKM physiotherapists.",
    url: "https://www.skmphysiotherapy.com/events-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-events.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Events - Health Camps and Workshops",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Events & Health Camps | SKM Physiotherapy",
    description: "Upcoming physiotherapy events, free health camps and wellness workshops in Noida & Greater Noida.",
    images: ["https://www.skmphysiotherapy.com/og-events.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/events-skm-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/events-skm-physiotherapy" },
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
    { "@type": "ListItem", position: 2, name: "News & Events", item: "https://www.skmphysiotherapy.com/news-and-events-skm-physiotherapy" },
    { "@type": "ListItem", position: 3, name: "Events", item: "https://www.skmphysiotherapy.com/events-skm-physiotherapy" },
  ],
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
