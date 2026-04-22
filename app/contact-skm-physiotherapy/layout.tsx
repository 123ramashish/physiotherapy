// app/contact-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

// ─── SEO Metadata ───
export const metadata: Metadata = {
  title: "Contact SKM Physiotherapy | Book Appointment in Noida & Greater Noida",
  description:
    "Contact SKM Physiotherapy to book your appointment at our Noida or Greater Noida branch. Call +91 79827 99147, WhatsApp, or fill our online form. Expert physiotherapists available Mon–Sun 10 AM–10 PM.",

  keywords: [
    "contact SKM physiotherapy",
    "physiotherapy appointment booking Noida",
    "book physiotherapist Greater Noida",
    "physiotherapy clinic near me",
    "SKM physiotherapy phone number",
    "physiotherapy consultation Noida",
    "book back pain treatment",
    "physiotherapy appointment online",
    "best physiotherapy clinic Noida",
    "physiotherapy center Greater Noida",
  ].join(", "),

  openGraph: {
    title: "Book Your Physiotherapy Appointment | SKM Physiotherapy",
    description:
      "Book a physiotherapy consultation at SKM. 2 branches in Noida & Greater Noida. Expert care for back pain, sports injuries, cupping therapy & more. Call or WhatsApp +91 79827 99147.",
    url: "https://skmphysiotherapy.com/contact-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact SKM Physiotherapy - Book Your Appointment Today",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Book Physiotherapy Appointment | SKM Physiotherapy",
    description:
      "2 branches in Noida & Greater Noida. Mon–Sun 10AM–10PM. Call or WhatsApp to book your slot today.",
    images: ["https://skmphysiotherapy.com/og-contact.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://skmphysiotherapy.com/contact-skm-physiotherapy",
    languages: {
      "en-IN": "https://skmphysiotherapy.com/contact-skm-physiotherapy",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// ─── Structured Data (JSON-LD) ───
const contactStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://skmphysiotherapy.com/#organization",
      name: "SKM Physiotherapy & Rehabilitation Centre",
      url: "https://skmphysiotherapy.com",
      telephone: "+917982799147",
      email: "skmphysiotherapy@gmail.com",
      openingHours: "Mo-Su 10:00-22:00",
      areaServed: ["Noida", "Greater Noida", "Delhi NCR"],
      hasMap: "https://maps.app.goo.gl/Us4jVhy8foKxxawE7",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+917982799147",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
          contactOption: "TollFree",
        },
        {
          "@type": "ContactPoint",
          telephone: "+919718434818",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches/greater-noida",
      name: "SKM Physiotherapy - Swaran Nagari, Greater Noida",
      address: {
        "@type": "PostalAddress",
        streetAddress: "D-Block, D-3, Near Krishna Hospital, Swarn Nagari",
        addressLocality: "Greater Noida",
        addressRegion: "UP",
        postalCode: "201310",
        addressCountry: "IN",
      },
      telephone: "+917982799147",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: "28.5672",
        longitude: "77.4253",
      },
      hasMap: "https://maps.app.goo.gl/Us4jVhy8foKxxawE7",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches/noida-sector-134",
      name: "SKM Physiotherapy - Sector 134, Noida",
      address: {
        "@type": "PostalAddress",
        streetAddress: "B-45, Sector 134",
        addressLocality: "Noida",
        addressRegion: "UP",
        postalCode: "201304",
        addressCountry: "IN",
      },
      telephone: "+919718434818",
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
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://skmphysiotherapy.com/contact-skm-physiotherapy" },
      ],
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      {children}
    </>
  );
}
