// app/branches-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SKM Physiotherapy Branches | Clinics in Noida, Greater Noida & Gurugram",
  description:
    "Find your nearest SKM Physiotherapy clinic. 4 branches across Delhi NCR — Swaran Nagari (Greater Noida), Sector 134 (Noida), Sector 14 (Gurugram) & DLF Phase 2 (Gurugram). Expert physiotherapy for back pain, sports injuries, cupping therapy, home visits & corporate wellness.",

  keywords: [
    "physiotherapy clinic Noida",
    "physiotherapy clinic Greater Noida",
    "physiotherapy clinic Gurugram",
    "SKM physiotherapy branches",
    "physiotherapy near me Noida",
    "physiotherapy near Swaran Nagari",
    "physiotherapy Sector 134 Noida",
    "physiotherapy Sector 14 Gurugram",
    "physiotherapy DLF Phase 2 Gurugram",
    "physio clinic near me",
    "physiotherapy center Gurugram",
    "best physiotherapy clinic near me",
    "physiotherapy Greater Noida location",
    "physiotherapy clinic Delhi NCR",
  ].join(", "),

  openGraph: {
    title: "SKM Physiotherapy Clinic Locations | Noida, Greater Noida & Gurugram",
    description:
      "4 expert physiotherapy clinics across Delhi NCR — Noida, Greater Noida & Gurugram. Home visit & corporate office physiotherapy also available. Book your appointment today.",
    url: "https://skmphysiotherapy.com/branches-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-branches.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Clinic Locations in Noida, Greater Noida and Gurugram",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Find Your Nearest SKM Physiotherapy Clinic — Noida, Greater Noida & Gurugram",
    description: "4 branches across Delhi NCR. Home visits & corporate wellness also available. Expert care for all conditions.",
    images: ["https://skmphysiotherapy.com/og-branches.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://skmphysiotherapy.com/branches-skm-physiotherapy",
    languages: { "en-IN": "https://skmphysiotherapy.com/branches-skm-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const branchesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches/greater-noida-swaran-nagari",
      name: "SKM Physiotherapy - Swaran Nagari, Greater Noida",
      description: "Expert physiotherapy clinic in Swaran Nagari, Greater Noida offering back pain treatment, cupping therapy, sports rehabilitation and more.",
      url: "https://skmphysiotherapy.com/branches-skm-physiotherapy/greater-noida-swaran-nagari",
      telephone: "+917982799147",
      priceRange: "₹₹",
      image: "https://skmphysiotherapy.com/og-branches.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "D-Block, D-3, Near Krishna Hospital, Swarn Nagari",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201310",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: "28.5672", longitude: "77.4253" },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
      hasMap: "https://maps.app.goo.gl/Us4jVhy8foKxxawE7",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "500",
        bestRating: "5",
      },
      sameAs: [
        "https://www.facebook.com/skmphysiotherapy",
        "https://www.instagram.com/skmphysiotherapy",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches/noida-sector-134",
      name: "SKM Physiotherapy - Sector 134, Noida",
      description: "Expert physiotherapy clinic in Sector 134, Noida. Specialized treatments for back pain, knee pain, sports injuries, cupping therapy and neurological conditions.",
      url: "https://skmphysiotherapy.com/branches-skm-physiotherapy/noida-sector-134",
      telephone: "+919718434818",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "B-45, Sector 134",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201304",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches-skm-physiotherapy/gurugram-sector-14",
      name: "SKM Physiotherapy - Sector 14, Gurugram",
      description: "SKM Physiotherapy Main Centre in Sector 14, Gurugram. Expert cupping, hijama, dry needling, back pain, sports injuries & neuro rehab near MG Road.",
      url: "https://skmphysiotherapy.com/branches-skm-physiotherapy/gurugram-sector-14",
      telephone: "+917982799147",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123, MG Road, Sector 14",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122001",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "21:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "18:00" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches-skm-physiotherapy/gurugram-dlf-phase2",
      name: "SKM Physiotherapy - DLF Phase 2, Gurugram",
      description: "SKM Physiotherapy DLF Phase 2 Gurugram — women's health, paediatric physiotherapy, hijama & dry needling near Cyber Hub.",
      url: "https://skmphysiotherapy.com/branches-skm-physiotherapy/gurugram-dlf-phase2",
      telephone: "+917982799149",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "78, Cyber Hub Road, DLF Phase 2",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122002",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:30", closes: "20:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "18:00" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Branches", item: "https://skmphysiotherapy.com/branches-skm-physiotherapy" },
      ],
    },
  ],
};

export default function BranchesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(branchesStructuredData) }}
      />
      {children}
    </>
  );
}
