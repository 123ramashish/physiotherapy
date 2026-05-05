// app/gallery-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy Clinic Gallery | SKM Physiotherapy Noida & Greater Noida",
  description:
    "Explore SKM Physiotherapy's state-of-the-art clinic facilities, treatment rooms, modern equipment and patient success stories. See our Noida & Greater Noida physiotherapy centres.",

  keywords: [
    "physiotherapy clinic photos Noida",
    "SKM physiotherapy gallery",
    "physiotherapy clinic images",
    "physio clinic facility Noida",
    "physiotherapy treatment room",
    "SKM physiotherapy clinic pictures",
    "physiotherapy equipment Noida",
    "modern physiotherapy clinic",
  ].join(", "),

  openGraph: {
    title: "SKM Physiotherapy Clinic Gallery | Modern Facilities in Noida",
    description: "Tour our state-of-the-art physiotherapy clinics in Noida & Greater Noida. Modern equipment, expert therapists, and world-class treatment facilities.",
    url: "https://www.skmphysiotherapy.com/gallery-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-gallery.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Clinic Gallery - Modern Facilities",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Clinic Gallery | SKM Physiotherapy",
    description: "State-of-the-art physiotherapy facilities in Noida & Greater Noida. See our modern clinics and equipment.",
    images: ["https://www.skmphysiotherapy.com/og-gallery.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/gallery-skm-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/gallery-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const galleryStructuredData = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "SKM Physiotherapy Clinic Gallery",
  description: "Photos of SKM Physiotherapy's modern clinic facilities, treatment rooms, and advanced equipment in Noida and Greater Noida.",
  url: "https://www.skmphysiotherapy.com/gallery-skm-physiotherapy",
  author: {
    "@type": "MedicalOrganization",
    name: "SKM Physiotherapy & Rehabilitation Centre",
  },
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
    { "@type": "ListItem", position: 2, name: "Gallery", item: "https://www.skmphysiotherapy.com/gallery-skm-physiotherapy" },
  ],
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  );
}
