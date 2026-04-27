// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Providers } from "@/components/Providers";

// ─── Font Optimization ───
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevents FOIT
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// ─── SEO: Comprehensive Metadata ───
export const metadata: Metadata = {
  // ─── Core Metadata ───
  title: {
    default: "SKM Physiotherapy Clinic | Expert Physiotherapy & Wellness Center in Delhi NCR",
    template: "%s | SKM Physiotherapy", // Auto-appends brand to page titles
  },
  description:
    "SKM Physiotherapy Clinic provides expert physiotherapy treatment  and rehabilitation across Delhi NCR. Book your free consultation today.",

  // ─── Keywords (for legacy search engines) ───
  keywords: [
    "SKM Physiotherapy",
    "physiotherapy clinic Delhi",
    "best physiotherapist near me",
    "sports injury rehabilitation",
    "cupping therapy Hijama",
    "dry needling specialist",
    "post-surgery rehabilitation",
  ].join(", "),

  // ─── Authors & Publisher ───
  authors: [{ name: "SKM Physiotherapy Team", url: "https://skmphysiotherapy.com" }],
  creator: "SKM Physiotherapy & Rehabilitation Centre",
  publisher: "SKM Physiotherapy",

  // ─── Open Graph (Facebook/LinkedIn) ───
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://skmphysiotherapy.com",
    siteName: "SKM Physiotherapy & Rehabilitation Centre",
    title: "SKM Physiotherapy | Expert Physiotherapy & Wellness Center in Delhi NCR",
    description:
      "Expert physiotherapy for back pain, sports injuries, cupping therapy, dry needling & more. 4 branches across NCR. AI-powered booking 24/7.",
    images: [
      {
        url: "https://skmphysiotherapy.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SKM Physiotherapy Clinic - Expert Therapists Helping Patients Recover",
        type: "image/jpeg",
      },
    ],
  },

  // ─── Twitter Card ───
  twitter: {
    card: "summary_large_image",
    title: "Pain Relief Without Surgery | SKM Physiotherapy",
    description: "Advanced physiotherapy: cupping, dry needling, sports rehab. Book 24/7 across Delhi NCR.",
    images: ["https://skmphysiotherapy.com/og-image.jpg"],
    creator: "@skmphysio",
  },

  // ─── Canonical URLs & Hreflang ───
  alternates: {
    canonical: "https://skmphysiotherapy.com",
    languages: {
      "en-IN": "https://skmphysiotherapy.com",
      "hi-IN": "https://skmphysiotherapy.com/hi", // If you add Hindi version
    },
  },

  // ─── Robots.txt Configuration ───
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1, // Allow Google to show full meta description
      "max-image-preview": "large", // Show large images in search results
      "max-video-preview": -1,
    },
  },

  // ─── Verification Tokens ───
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },

  // ─── Category & App Links ───
  category: "health",
  appLinks: {
    ios: {
      url: "skmphysio://home",
      app_store_id: "123456789",
    },
    android: {
      url: "skmphysio://home",
      package: "com.skmphysio.app",
    },
  },
};

// ─── Viewport Configuration (Mobile Optimization) ───
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true, // Accessibility: allow zoom
};

// ─── Global Structured Data (JSON-LD) ───
const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://skmphysiotherapy.com/#organization",
      name: "SKM Physiotherapy & Rehabilitation Centre",
      description: "Expert physiotherapy and rehabilitation services offering cupping therapy, dry needling, sports injury rehab, and personalized recovery programs across Delhi NCR.",
      url: "https://skmphysiotherapy.com",
      telephone: "+91-98110-XXXXX",
      email: "info@skmphysiotherapy.com",
      priceRange: "₹₹",
      medicalSpecialty: ["Physiotherapy", "SportsMedicine", "Rehabilitation"],
      areaServed: ["Delhi", "Gurgaon", "Noida", "Faridabad", "National Capital Region"],
      logo: {
        "@type": "ImageObject",
        url: "https://skmphysiotherapy.com/logo.png",
        width: "512",
        height: "512",
      },
      image: "https://skmphysiotherapy.com/og-image.jpg",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Physiotherapy Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Cupping Therapy (Hijama)" } },
          { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Dry Needling" } },
          { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Back Pain Treatment" } },
          { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Sports Injury Rehabilitation" } },
          { "@type": "Offer", itemOffered: { "@type": "MedicalTherapy", name: "Post-Surgery Rehabilitation" } },
        ],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/#location",
      name: "SKM Physiotherapy - Main Centre",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123, Main Road, Rohini",
        addressLocality: "Delhi",
        addressRegion: "DL",
        postalCode: "110085",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "28.7041",
        longitude: "77.1025",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/skmphysiotherapy",
        "https://www.instagram.com/skmphysiotherapy",
        "https://wa.me/9198110XXXXX",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://skmphysiotherapy.com/#website",
      url: "https://skmphysiotherapy.com",
      name: "SKM Physiotherapy & Rehabilitation Centre",
      publisher: { "@id": "https://skmphysiotherapy.com/#organization" },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://skmphysiotherapy.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ─── Root Layout Component ───
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning // Prevents hydration mismatch with theme providers
    >
      <head>
        {/* ─── Structured Data ─── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />

        {/* ─── Preconnect for Performance ─── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* ─── Favicon & App Icons ─── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ─── Analytics (Google Analytics 4) ─── */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* ─── Microsoft Clarity (Session Recording) ─── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
            `,
          }}
        />
      </head>

      <body
        className={`min-h-screen flex flex-col bg-white text-gray-900 antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        {/* ─── Skip to Content Link (Accessibility) ─── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>

        {/* ─── Header ─── */}
        <Header />

        {/* ─── Main Content ─── */}
        <main id="main-content" className="flex-1">
          <Providers>{children}</Providers>
        </main>

        {/* ─── Footer ─── */}
        <Footer />


      </body>
    </html>
  );
}