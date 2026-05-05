import type { Metadata } from 'next';
import { BlogPage } from '@/components/blog';

export const metadata: Metadata = {
  title: "Physiotherapy Blog | Expert Tips, Guides & Health Advice | SKM",
  description:
    "Read expert physiotherapy articles, back pain guides, exercise tips, injury prevention advice, and wellness insights from SKM's certified physiotherapists in Noida & Greater Noida.",

  keywords: [
    "physiotherapy blog",
    "physiotherapy tips",
    "back pain exercises",
    "physiotherapy advice India",
    "sports injury prevention tips",
    "cupping therapy guide",
    "dry needling information",
    "physiotherapy health articles",
    "SKM physiotherapy blog",
    "neck pain relief tips",
    "knee pain exercises",
    "physiotherapy home exercises",
  ].join(", "),

  openGraph: {
    title: "Physiotherapy Blog | Expert Guides & Health Tips | SKM",
    description: "Expert articles on back pain, sports injuries, cupping therapy, ergonomics, and recovery from SKM's certified physiotherapists.",
    url: "https://www.skmphysiotherapy.com/blog-physiotherapy",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    images: [{ url: "https://www.skmphysiotherapy.com/og-blog.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Physiotherapy Blog | SKM Expert Health Tips",
    description: "Back pain guides, injury prevention, cupping & dry needling explained by certified physios.",
    images: ["https://www.skmphysiotherapy.com/og-blog.jpg"],
    creator: "@skmphysio",
  },

  alternates: {
    canonical: "https://www.skmphysiotherapy.com/blog-physiotherapy",
    languages: { "en-IN": "https://www.skmphysiotherapy.com/blog-physiotherapy" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function Blog() {
  return <BlogPage />;
}