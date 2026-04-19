// app/services/layout.tsx
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  children: React.ReactNode;
};

// ─── SEO: Dynamic Metadata with ResolvingMetadata ───
export async function generateMetadata(
  { }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousOG = (await parent).openGraph;

  return {
    title: "Physiotherapy Services | Cupping, Dry Needling, Sports Rehab | SKM",
    description:
      "15+ expert physiotherapy treatments: cupping therapy (Hijama), dry needling, taping, back/knee pain relief, sports injury rehab & post-COVID recovery. 4 NCR branches. Book 24/7.",
    
    keywords: [
      // Core Services
      "physiotherapy services",
      "cupping therapy",
      "hijama therapy",
      "dry needling",
      "taping therapy",
      "kinesiology taping",
      "trigger point therapy",
      
      // Pain Conditions
      "back pain treatment",
      "neck pain relief",
      "knee pain therapy",
      "sciatica treatment",
      "frozen shoulder treatment",
      "heel pain treatment",
      "plantar fasciitis",
      
      // Specialized Care
      "sports injury rehabilitation",
      "post stroke rehabilitation",
      "bell's palsy therapy",
      "arthritis management",
      "post covid rehabilitation",
      
      // Location + Brand
      "physiotherapy Delhi",
      "physiotherapy Gurgaon",
      "physiotherapy Noida",
      "physiotherapy Faridabad",
      "SKM physiotherapy",
      "best physiotherapist near me",
    ],

    // ─── Open Graph (Facebook/LinkedIn) ───
    openGraph: {
      title: "Advanced Physiotherapy Services | SKM Rehabilitation Centre",
      description:
        "Expert care for pain relief & recovery: cupping, dry needling, sports rehab & more. 4 branches across NCR. AI-powered booking available 24/7.",
      url: "https://skmphysiotherapy.com/services",
      siteName: "SKM Physiotherapy & Rehabilitation Centre",
      images: [
        {
          url: "https://skmphysiotherapy.com/og-services.jpg",
          width: 1200,
          height: 630,
          alt: "SKM Physiotherapy Services - Expert Treatment for Pain Relief",
          type: "image/jpeg",
        },
      ],
      locale: "en_IN",
      type: "website",
    },

    // ─── Twitter Card ───
    twitter: {
      card: "summary_large_image",
      title: "Pain Relief Without Surgery | SKM Physiotherapy Services",
      description:
        "15+ treatments: cupping, dry needling, taping, sports rehab. Expert therapists across Delhi, Gurgaon, Noida & Faridabad. Book your free consultation today.",
      images: ["https://skmphysiotherapy.com/og-services.jpg"],
      creator: "@skmphysio",
    },

    // ─── Canonical & Alternates ───
    alternates: {
      canonical: "https://skmphysiotherapy.com/services",
      languages: {
        "en-IN": "https://skmphysiotherapy.com/services",
      },
    },

    // ─── Robots ───
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ─── Verification ───
    verification: {
      google: "your-google-site-verification-code",
    },
  };
}

// ─── Structured Data: Service Collection (JSON-LD) ───
const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SKM Physiotherapy Services",
  description: "Comprehensive physiotherapy and rehabilitation treatments for pain relief, injury recovery, and long-term wellness.",
  url: "https://skmphysiotherapy.com/services",
  numberOfItems: 15,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "MedicalTherapy",
        name: "Cupping Therapy (Hijama)",
        description: "Ancient healing technique for deep tissue relief, improved circulation, and toxin removal.",
        provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre" },
        areaServed: ["Delhi", "Gurgaon", "Noida", "Faridabad"],
        availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://skmphysiotherapy.com/services#book" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "MedicalTherapy",
        name: "Dry Needling",
        description: "Trigger-point therapy to release muscle knots and restore pain-free movement.",
        provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "MedicalTherapy",
        name: "Back Pain Treatment",
        description: "Spinal decompression and mobilisation therapy for acute and chronic back pain relief.",
        relevantCondition: { "@type": "MedicalCondition", name: "Lower Back Pain" },
      },
    },
    // Add remaining services similarly...
  ],
};

// ─── Breadcrumb Structured Data ───
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://skmphysiotherapy.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://skmphysiotherapy.com/services",
    },
  ],
};

export default function ServicesLayout({ children }: Props) {
  return (
    <>
      {/* ─── JSON-LD Structured Data ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* ─── Preconnect for Performance ─── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* ─── Page Content ─── */}
      {children}

      {/* ─── Lazy Load Critical Schema for FAQ (if used on page) ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is cupping therapy and is it safe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cupping therapy (Hijama) is an ancient healing technique that uses suction to improve blood flow, reduce inflammation, and promote healing. At SKM, our certified therapists use sterile, medical-grade cups. It's safe for most people when performed by trained professionals.",
                },
              },
              {
                "@type": "Question",
                name: "How many sessions do I need for back pain relief?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most patients experience noticeable relief in 3-6 sessions. However, treatment plans are personalized based on your condition severity, medical history, and recovery goals. Your therapist will create a custom plan during your initial assessment.",
                },
              },
              {
                "@type": "Question",
                name: "Do you accept insurance or offer packages?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We provide detailed invoices that you can submit to your insurance provider. We also offer discounted multi-session packages for ongoing treatments. Contact us to learn about current offers.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}