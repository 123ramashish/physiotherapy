// app/branches-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SKM Physiotherapy Branches | Clinics in Noida & Greater Noida",
  description:
    "Find your nearest SKM Physiotherapy clinic. Branches in Swaran Nagari (Greater Noida) and Sector 134 (Noida). Open Mon–Sun 10 AM–10 PM. Expert physiotherapy for back pain, sports injuries, cupping therapy & more.",

  keywords: [
    "physiotherapy clinic Noida",
    "physiotherapy clinic Greater Noida",
    "SKM physiotherapy branches",
    "physiotherapy near me Noida",
    "physiotherapy near Swaran Nagari",
    "physiotherapy Sector 134 Noida",
    "physio clinic near me",
    "physiotherapy center Noida",
    "best physiotherapy clinic near me",
    "physiotherapy Greater Noida location",
  ].join(", "),

  openGraph: {
    title: "SKM Physiotherapy Clinic Locations | Noida & Greater Noida",
    description:
      "2 expert physiotherapy clinics in NCR. Swaran Nagari, Greater Noida & Sector 134, Noida. Open 7 days a week. Book your appointment today.",
    url: "https://skmphysiotherapy.com/branches-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-branches.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Clinic Locations in Noida and Greater Noida",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Find Your Nearest SKM Physiotherapy Clinic",
    description: "2 branches in Noida & Greater Noida. Open Mon–Sun 10AM–10PM. Expert care for all conditions.",
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
