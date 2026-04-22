// app/services-skm-physiotherapy/relaxation/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relaxation & Stress Relief Physiotherapy Noida | SKM Physiotherapy",
  description:
    "Therapeutic relaxation physiotherapy at SKM in Noida & Greater Noida. Stress relief massages, myofascial release, breathing therapy & relaxation techniques for stress-related muscle tension, burnout and chronic fatigue. Book a session today.",
  keywords: [
    "relaxation physiotherapy Noida", "stress relief therapy Greater Noida",
    "therapeutic massage physiotherapy", "myofascial release Noida", "relaxation massage near me",
    "stress muscle tension treatment", "burnout physiotherapy", "chronic fatigue physio",
    "relaxation therapy clinic Noida", "breathing therapy physiotherapy",
    "tension headache relaxation", "deep tissue relaxation Noida",
  ].join(", "),
  openGraph: {
    title: "Relaxation & Stress Relief Physiotherapy | SKM Noida",
    description: "Therapeutic relaxation physio in Noida & Greater Noida. Stress-related muscle tension, burnout & fatigue. Myofascial release, breathing therapy & more.",
    url: "https://skmphysiotherapy.com/services-skm-physiotherapy/relaxation",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-relaxation.jpg", width: 1200, height: 630, alt: "Relaxation Physiotherapy at SKM Physiotherapy Noida" }],
    locale: "en_IN", type: "website",
  },
  twitter: { card: "summary_large_image", title: "Relaxation Physiotherapy | SKM Noida", description: "Stress relief, myofascial release & breathing therapy in Noida & Greater Noida.", images: ["https://skmphysiotherapy.com/og-relaxation.jpg"], creator: "@skmphysio" },
  alternates: { canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy/relaxation" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      name: "Relaxation Physiotherapy",
      description: "Therapeutic relaxation sessions including myofascial release, breathing therapy and guided relaxation for stress-related muscle tension, burnout and chronic fatigue.",
      provider: { "@type": "MedicalOrganization", name: "SKM Physiotherapy & Rehabilitation Centre", url: "https://skmphysiotherapy.com" },
      areaServed: ["Noida", "Greater Noida"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skmphysiotherapy.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://skmphysiotherapy.com/services-skm-physiotherapy" },
        { "@type": "ListItem", position: 3, name: "Relaxation Therapy", item: "https://skmphysiotherapy.com/services-skm-physiotherapy/relaxation" },
      ],
    },
  ],
};

export default function RelaxationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {children}
    </>
  );
}
