import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Physiotherapy Services in Noida & Greater Noida | SKM Physiotherapy",
  description:
    "Explore all physiotherapy services at SKM: back pain, knee pain, sports injury rehab, cupping therapy (Hijama), dry needling, taping, neurological rehab & more. 2 branches in Noida & Greater Noida. Open Mon–Sun 10 AM–10 PM.",

  keywords: [
    "physiotherapy services Noida",
    "physiotherapy treatments Greater Noida",
    "back pain treatment",
    "knee pain physiotherapy",
    "sports injury rehab",
    "cupping therapy",
    "dry needling Noida",
    "neurological physiotherapy",
    "all physiotherapy services",
    "SKM physiotherapy services",
  ].join(", "),

  openGraph: {
    title: "All Physiotherapy Services | SKM Physiotherapy Noida",
    description: "15+ expert physiotherapy services in Noida & Greater Noida. Back pain, knee pain, cupping, dry needling, sports rehab & more.",
    url: "https://skmphysiotherapy.com/physiotherapy-services",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://skmphysiotherapy.com/og-services.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Physiotherapy Services | SKM Physiotherapy Noida",
    description: "15+ treatments in Noida & Greater Noida. Book Mon–Sun 10AM–10PM.",
    images: ["https://skmphysiotherapy.com/og-services.jpg"],
  },

  alternates: {
    canonical: "https://skmphysiotherapy.com/services-skm-physiotherapy",
  },

  robots: { index: true, follow: true },
};

// Redirect to main services page
export default function PhysiotherapyServicesPage() {
  redirect('/services-skm-physiotherapy');
}
