// app/news-and-events-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy News & Events | Free Health Camps | SKM Physiotherapy",
  description:
    "Stay updated with SKM Physiotherapy news, upcoming health camps, wellness workshops, and community events in Noida & Greater Noida. Free back pain screening, ergonomics workshops, sports injury webinars & more.",

  keywords: [
    "physiotherapy health camp Noida",
    "free physiotherapy camp",
    "SKM physiotherapy events",
    "physiotherapy workshop Noida",
    "health and wellness event",
    "back pain screening camp",
    "ergonomics workshop",
    "sports injury webinar",
    "physiotherapy news",
    "physiotherapy seminar Noida",
    "community health event Greater Noida",
  ].join(", "),

  openGraph: {
    title: "Physiotherapy Events & Health Camps | SKM Physiotherapy",
    description: "Join free health camps, ergonomics workshops, and wellness events. Serving Noida & Greater Noida. Get expert tips from certified physiotherapists.",
    url: "https://skmphysiotherapy.com/news-and-events-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-events.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Events and Health Camps",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Health Camps & Events | SKM Physiotherapy",
    description: "Free back pain screening, workshops & webinars in Noida & Greater Noida. Stay updated with our latest events.",
    images: ["https://skmphysiotherapy.com/og-events.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://skmphysiotherapy.com/news-and-events-skm-physiotherapy",
    languages: { "en-IN": "https://skmphysiotherapy.com/news-and-events-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const eventsStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "SKM Physiotherapy Health Camp & Wellness Events",
  description: "Free health camps, ergonomics workshops, and sports injury webinars organised by SKM Physiotherapy for the community in Noida and Greater Noida.",
  organizer: {
    "@type": "MedicalOrganization",
    name: "SKM Physiotherapy & Rehabilitation Centre",
    url: "https://skmphysiotherapy.com",
  },
  location: {
    "@type": "Place",
    name: "SKM Physiotherapy Clinics",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida & Greater Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
    { "@type": "ListItem", position: 2, name: "News & Events", item: "https://skmphysiotherapy.com/news-and-events-skm-physiotherapy" },
  ],
};

export default function NewsEventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
