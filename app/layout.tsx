// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
    default: "SKM Physiotherapy Clinic | Expert Pain Relief & Rehabilitation",
    template: "%s | SKM Physiotherapy", // Auto-appends brand to page titles
  },
  description:
    "SKM Physiotherapy Clinic provides expert physiotherapy treatment for pain relief, sports injury recovery, and rehabilitation across Delhi NCR. Book your free consultation today.",
  
  // ─── Keywords (for legacy search engines) ───
  keywords: [
    "SKM Physiotherapy",
    "physiotherapy clinic Delhi",
    "best physiotherapist near me",
    "pain relief treatment",
    "sports injury rehabilitation",
    "cupping therapy Hijama",
    "dry needling specialist",
    "back pain treatment",
    "knee pain physiotherapy",
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
    title: "SKM Physiotherapy | Advanced Pain Relief Without Surgery",
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
          {children}
        </main>

        {/* ─── Footer ─── */}
        <Footer />

        {/* ─── WhatsApp Floating Button (Global) ─── */}
        <div className="fixed bottom-6 right-6 z-50" aria-label="Quick contact">
          <a
            href="https://wa.me/9198110XXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label="Chat with us on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.1 1.524 5.82L0 24l6.335-1.498A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.012-1.374l-.36-.214-3.726.88.935-3.627-.234-.373A9.77 9.77 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}