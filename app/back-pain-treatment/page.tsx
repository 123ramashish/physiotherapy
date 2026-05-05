import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// ─── SEO Metadata ───
export const metadata: Metadata = {
  title: "Back Pain Treatment in Noida & Greater Noida | SKM Physiotherapy",
  description:
    "Get expert back pain treatment at SKM Physiotherapy in Noida & Greater Noida. Non-surgical relief for lower back pain, sciatica, disc herniation & chronic back pain. Certified physiotherapists, 20,000+ patients healed. Book free consultation today.",

  keywords: [
    "back pain treatment Noida",
    "back pain treatment Greater Noida",
    "lower back pain physiotherapy",
    "sciatica treatment Noida",
    "disc herniation treatment",
    "chronic back pain relief",
    "non-surgical back pain treatment",
    "back pain specialist near me",
    "physiotherapy for back pain Delhi NCR",
    "lumbar pain treatment",
    "back pain clinic Noida",
    "best physiotherapy for back pain",
  ].join(", "),

  openGraph: {
    title: "Back Pain Treatment Without Surgery | SKM Physiotherapy Noida",
    description:
      "Expert non-surgical back pain relief in Noida & Greater Noida. Specialized physiotherapy for lower back pain, sciatica, disc bulge & chronic pain. 98% success rate.",
    url: "https://www.skmphysiotherapy.com/back-pain-treatment",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [
      {
        url: "https://www.skmphysiotherapy.com/og-back-pain.jpg",
        width: 1200,
        height: 630,
        alt: "Back Pain Treatment at SKM Physiotherapy - Expert Relief Without Surgery",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Back Pain Treatment | SKM Physiotherapy Noida",
    description: "Non-surgical back pain relief. Expert physio for sciatica, disc pain & chronic back conditions. Book in Noida or Greater Noida.",
    images: ["https://www.skmphysiotherapy.com/og-back-pain.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/services-skm-physiotherapy/back-pain",
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

// Redirect to the detailed service page
export default function BackPainTreatmentPage() {
  redirect('/services-skm-physiotherapy/back-pain');
}
