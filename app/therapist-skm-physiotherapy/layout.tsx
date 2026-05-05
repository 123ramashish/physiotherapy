// app/therapist-skm-physiotherapy/layout.tsx
import type { Metadata } from "next";

// ─── SEO Metadata ───
export const metadata: Metadata = {
  title: "Expert Physiotherapists in Noida & Greater Noida | SKM Physiotherapy Team",
  description:
    "Meet SKM Physiotherapy's certified expert therapists in Noida and Greater Noida. Licensed physiotherapists specializing in back pain, sports injuries, cupping therapy, dry needling & neurological rehabilitation. 5+ years experience, 20,000+ patients treated.",

  keywords: [
    "physiotherapist Noida",
    "physiotherapist Greater Noida",
    "best physiotherapist near me",
    "certified physiotherapist Delhi NCR",
    "sports injury physiotherapist",
    "back pain specialist Noida",
    "cupping therapy specialist",
    "dry needling expert",
    "neurological physiotherapist",
    "SKM physiotherapy team",
    "expert therapist Noida",
    "licensed physiotherapist",
  ].join(", "),

  openGraph: {
    title: "Meet Our Expert Physiotherapy Team | SKM Physiotherapy",
    description:
      "Licensed physiotherapists with 5+ years experience. Specialized in sports rehab, pain management, cupping therapy & neurological conditions. Serving Noida & Greater Noida.",
    url: "https://www.skmphysiotherapy.com/therapist-skm-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-therapists.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Expert Therapists Team",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Expert Physiotherapists | SKM Physiotherapy Team",
    description:
      "Certified therapists for back pain, sports injuries, cupping & more. Serving Noida & Greater Noida.",
    images: ["https://www.skmphysiotherapy.com/og-therapists.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/therapist-skm-physiotherapy",
    languages: {
      "en-IN": "https://www.skmphysiotherapy.com/therapist-skm-physiotherapy",
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
    },
  },
};

// ─── Structured Data ───
const therapistStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://www.skmphysiotherapy.com/#organization",
      name: "SKM Physiotherapy & Rehabilitation Centre",
      url: "https://www.skmphysiotherapy.com",
      medicalSpecialty: ["Physiotherapy", "SportsMedicine", "Rehabilitation", "Neurology"],
      employee: [
        {
          "@type": "Person",
          jobTitle: "Senior Physiotherapist",
          worksFor: { "@type": "MedicalOrganization", name: "SKM Physiotherapy" },
          knowsAbout: ["Back Pain Treatment", "Cupping Therapy", "Dry Needling", "Sports Rehabilitation"],
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Our Therapists", item: "https://www.skmphysiotherapy.com/therapist-skm-physiotherapy" },
      ],
    },
  ],
};

export default function TherapistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(therapistStructuredData) }}
      />
      {children}
    </>
  );
}
