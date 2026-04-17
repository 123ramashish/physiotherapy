// app/testimonials/layout.tsx
import type { Metadata, ResolvingMetadata } from "next";

type Props = { children: React.ReactNode };

export async function generateMetadata(
  { }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Patient Testimonials & Reviews | SKM Physiotherapy",
    description:
      "Read genuine success stories from 5000+ patients across Delhi, Gurgaon, Noida & Faridabad. Real reviews for back pain, sports injury, cupping therapy & more.",
    
    keywords: [
      "physiotherapy reviews",
      "patient testimonials Delhi",
      "SKM physiotherapy ratings",
      "back pain treatment reviews",
      "cupping therapy testimonials",
      "sports injury recovery stories",
      "physiotherapist near me reviews",
    ],

    openGraph: {
      title: "Real Patient Success Stories | SKM Physiotherapy",
      description: "5000+ verified reviews. 98% recovery rate. See why patients trust SKM across 4 NCR branches.",
      url: "https://skmphysiotherapy.com/testimonials",
      images: [{ url: "https://skmphysiotherapy.com/og-testimonials.jpg", width: 1200, height: 630 }],
    },

    twitter: {
      card: "summary_large_image",
      title: "⭐ 4.9/5 Rating | Patient Reviews | SKM Physiotherapy",
      description: "Real stories of pain relief & recovery. Verified reviews from Delhi NCR patients.",
    },

    alternates: {
      canonical: "https://skmphysiotherapy.com/testimonials",
      languages: { "en-IN": "https://skmphysiotherapy.com/testimonials" },
    },

    robots: { index: true, follow: true },
  };
}

// Structured Data: AggregateRating + Reviews
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "name": "SKM Physiotherapy & Rehabilitation Centre",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "5247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Priya Sharma" },
          "reviewBody": "Excellent care! My chronic back pain is completely gone after 6 weeks.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" }
        }
        // More reviews dynamically injected via page
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skmphysiotherapy.com" },
        { "@type": "ListItem", "position": 2, "name": "Testimonials", "item": "https://skmphysiotherapy.com/testimonials" }
      ]
    }
  ]
};

export default function TestimonialsLayout({ children }: Props) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}