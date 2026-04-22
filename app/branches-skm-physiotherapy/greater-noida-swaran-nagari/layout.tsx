// app/branches-skm-physiotherapy/greater-noida-swaran-nagari/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy Clinic in Swaran Nagari, Greater Noida | SKM Physiotherapy",
  description:
    "SKM Physiotherapy clinic in Swaran Nagari, Greater Noida. Expert treatment for back pain, knee pain, sports injuries, cupping therapy & neurological rehab. Open Mon–Sun 10 AM–10 PM. D-Block, D-3, Near Krishna Hospital. Call +91 79827 99147.",
  keywords: [
    "physiotherapy Swaran Nagari", "physiotherapy Greater Noida",
    "physio clinic near Swaran Nagari", "SKM physiotherapy Greater Noida",
    "physiotherapist Greater Noida", "back pain treatment Swaran Nagari",
    "knee pain Greater Noida", "physiotherapy near Krishna Hospital Greater Noida",
    "best physiotherapy Greater Noida", "physio clinic D Block Greater Noida",
    "physiotherapy centre Greater Noida",
  ].join(", "),
  openGraph: {
    title: "SKM Physiotherapy - Swaran Nagari, Greater Noida | Open 7 Days",
    description: "Expert physiotherapy in Swaran Nagari, Greater Noida. Back pain, knee pain, sports rehab, cupping & neuro physio. D-3, D-Block, near Krishna Hospital. Open 10AM–10PM.",
    url: "https://skmphysiotherapy.com/branches-skm-physiotherapy/greater-noida-swaran-nagari",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-greater-noida.jpg",
        width: 1200, height: 630,
        alt: "SKM Physiotherapy Swaran Nagari Greater Noida Branch",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKM Physiotherapy | Swaran Nagari, Greater Noida",
    description: "Expert physio in Greater Noida. Back pain, sports injuries, cupping & more. Open 10AM–10PM, Mon–Sun.",
    images: ["https://skmphysiotherapy.com/og-greater-noida.jpg"],
    creator: "@skmphysio",
  },
  alternates: { canonical: "https://skmphysiotherapy.com/branches-skm-physiotherapy/greater-noida-swaran-nagari" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const localBusinessData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://skmphysiotherapy.com/branches/greater-noida-swaran-nagari",
      name: "SKM Physiotherapy & Rehabilitation Centre — Swaran Nagari",
      description: "Expert physiotherapy clinic in Swaran Nagari, Greater Noida, offering back pain treatment, knee pain physiotherapy, cupping therapy, sports injury rehab and neurological rehabilitation.",
      url: "https://skmphysiotherapy.com/branches-skm-physiotherapy/greater-noida-swaran-nagari",
      telephone: "+917982799147",
      priceRange: "₹₹",
      image: "https://skmphysiotherapy.com/og-greater-noida.jpg",
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
          opens: "10:00", closes: "22:00",
        },
      ],
      hasMap: "https://maps.app.goo.gl/Us4jVhy8foKxxawE7",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "500", bestRating: "5" },
      sameAs: ["https://www.google.com/maps?cid=skmphysio-noida"],
      medicalSpecialty: ["Physiotherapy", "Rehabilitation"],
      parentOrganization: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Branches", item: "https://skmphysiotherapy.com/branches-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Swaran Nagari, Greater Noida", item: "https://skmphysiotherapy.com/branches-skm-physiotherapy/greater-noida-swaran-nagari" },
      ],
    },
  ],
};

export default function GreaterNoidaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }} />
      {children}
    </>
  );
}
