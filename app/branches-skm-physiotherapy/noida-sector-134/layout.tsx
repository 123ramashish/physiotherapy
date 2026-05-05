// app/branches-skm-physiotherapy/noida-sector-134/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy Clinic in Sector 134, Noida | SKM Physiotherapy",
  description:
    "SKM Physiotherapy clinic in Sector 134, Noida. Expert treatment for back pain, knee pain, sports injuries, cupping therapy (Hijama), dry needling & neurological rehab. Open Mon–Sun 10 AM–10 PM. B-45, Sector 134. Call +91 97184 34818.",
  keywords: [
    "physiotherapy Sector 134 Noida", "physiotherapy clinic Noida",
    "physio near Sector 134", "SKM physiotherapy Noida",
    "physiotherapist Sector 134 Noida", "back pain treatment Sector 134",
    "knee pain Noida Sector 134", "cupping therapy Noida Sector 134",
    "best physiotherapy Noida", "physio clinic B-45 Sector 134",
    "physiotherapy centre Noida Sector 134",
  ].join(", "),
  openGraph: {
    title: "SKM Physiotherapy - Sector 134, Noida | Open 7 Days",
    description: "Expert physiotherapy in Sector 134, Noida. Back pain, knee pain, sports rehab, cupping & neuro physio. B-45, Sector 134. Open Mon–Sun 10AM–10PM. Call +91 97184 34818.",
    url: "https://www.skmphysiotherapy.com/branches-skm-physiotherapy/noida-sector-134",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-noida-sector-134.jpg",
        width: 1200, height: 630,
        alt: "SKM Physiotherapy Sector 134 Noida Branch",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKM Physiotherapy | Sector 134, Noida",
    description: "Expert physio in Sector 134, Noida. Back pain, sports injuries, cupping & more. Open 10AM–10PM, Mon–Sun.",
    images: ["https://www.skmphysiotherapy.com/og-noida-sector-134.jpg"],
    creator: "@skmphysio",
  },
  alternates: { canonical: "https://www.skmphysiotherapy.com/branches-skm-physiotherapy/noida-sector-134" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://www.skmphysiotherapy.com/branches/noida-sector-134",
      name: "SKM Physiotherapy & Rehabilitation Centre — Sector 134, Noida",
      description: "Expert physiotherapy clinic in Sector 134, Noida offering back pain treatment, knee pain physiotherapy, cupping therapy (Hijama), dry needling, sports injury rehab and neurological rehabilitation.",
      url: "https://www.skmphysiotherapy.com/branches-skm-physiotherapy/noida-sector-134",
      telephone: "+919718434818",
      priceRange: "₹₹",
      image: "https://www.skmphysiotherapy.com/og-noida-sector-134.jpg",
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
          opens: "10:00", closes: "22:00",
        },
      ],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "400", bestRating: "5" },
      medicalSpecialty: ["Physiotherapy", "Rehabilitation"],
      parentOrganization: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://www.skmphysiotherapy.com" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Branches", item: "https://www.skmphysiotherapy.com/branches-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Sector 134, Noida", item: "https://www.skmphysiotherapy.com/branches-skm-physiotherapy/noida-sector-134" },
      ],
    },
  ],
};

export default function NoidaSector134Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }} />
      {children}
    </>
  );
}
