// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Providers } from "@/components/Providers";
import Script from "next/script";
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
    "SKM Physiotherapy Clinic provides expert physiotherapy treatment and rehabilitation across Delhi NCR. Home visit physiotherapy, corporate office wellness programs, and clinic-based care in Noida, Greater Noida & Gurugram. Book your consultation today.",

  // ─── Keywords (for legacy search engines) ───
  keywords: [
    "SKM Physiotherapy",
    "physiotherapy clinic Delhi NCR",
    "best physiotherapist near me",
    "physiotherapy clinic Noida",
    "physiotherapy clinic Gurugram",
    "physiotherapy clinic Greater Noida",
    "home visit physiotherapy",
    "home service physiotherapy",
    "physiotherapy at home Delhi NCR",
    "doorstep physiotherapy Noida",
    "home physiotherapist Gurugram",
    "corporate office physiotherapy",
    "corporate physiotherapy Gurugram",
    "corporate physiotherapy Noida",
    "workplace wellness physiotherapy",
    "office physiotherapy Delhi NCR",
    "sports injury rehabilitation",
    "cupping therapy Hijama",
    "dry needling specialist",
    "post-surgery rehabilitation",
    "back pain treatment Noida",
    "knee pain physiotherapy Gurugram",
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
      areaServed: ["Delhi", "Gurugram", "Gurgaon", "Noida", "Greater Noida", "Faridabad", "National Capital Region"],
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
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Visit Physiotherapy", description: "Professional physiotherapy at your home in Noida, Greater Noida & Gurugram" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Office Physiotherapy", description: "On-site workplace wellness, ergonomics & employee physiotherapy programs" } },
        ],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches-skm-physiotherapy/noida-sector-134",
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
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/skmphysiotherapy",
        "https://www.instagram.com/skmphysiotherapy",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches-skm-physiotherapy/greater-noida-swaran-nagari",
      name: "SKM Physiotherapy - Swaran Nagari, Greater Noida",
      address: {
        "@type": "PostalAddress",
        streetAddress: "D-3, D-Block, Swaran Nagari",
        addressLocality: "Greater Noida",
        addressRegion: "UP",
        postalCode: "201310",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches-skm-physiotherapy/gurugram-sector-14",
      name: "SKM Physiotherapy - Sector 14, Gurugram",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123, MG Road, Sector 14",
        addressLocality: "Gurugram",
        addressRegion: "HR",
        postalCode: "122001",
        addressCountry: "IN",
      },
      telephone: "+917982799147",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://skmphysiotherapy.com/branches-skm-physiotherapy/gurugram-dlf-phase2",
      name: "SKM Physiotherapy - DLF Phase 2, Gurugram",
      address: {
        "@type": "PostalAddress",
        streetAddress: "78, Cyber Hub Road, DLF Phase 2",
        addressLocality: "Gurugram",
        addressRegion: "HR",
        postalCode: "122002",
        addressCountry: "IN",
      },
      telephone: "+917982799149",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "20:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
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
      {/* Google Ads Global Tag */}
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=AW-664004213"
      strategy="afterInteractive"
    />

    <Script id="google-ads">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-664004213');
      `}
    </Script>

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
        {/* <link rel="manifest" href="/site.webmanifest" /> */}

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