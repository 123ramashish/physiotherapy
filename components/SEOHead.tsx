'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noIndex?: boolean;
  noFollow?: boolean;
}

export default function SEOHead({
  title = "Health & Wellness Insights | Expert Physiotherapy Blog",
  description = "Evidence-based articles on sports therapy, chiropractic care, pain management & rehabilitation from certified specialists across 6 branches.",
  canonical,
  image = "/og-default.jpg",
  article,
  noIndex = false,
  noFollow = false
}: SEOProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Generate canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://healthblog.com';
  const canonicalUrl = canonical || `${baseUrl}${pathname}${searchParams?.toString() ? `?${searchParams}` : ''}`;
  
  // Structured data generators
  const generateBlogSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Health & Wellness Insights",
    "description": description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "HealthBlog Network",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 600,
        "height": 60
      },
      "sameAs": [
        "https://facebook.com/healthblog",
        "https://twitter.com/healthblog",
        "https://linkedin.com/company/healthblog"
      ]
    },
    "blogPost": [],
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": ["CreativeWork", "Product"],
      "name": "HealthBlog Network",
      "productID": "healthblog:wellness-insights"
    }
  });

  const generateArticleSchema = (post: any) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": [
      `${baseUrl}/og/${post.id}.jpg`
    ],
    "datePublished": post.date,
    "dateModified": post.updatedAt || post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole,
      "affiliation": {
        "@type": "MedicalOrganization",
        "name": `HealthBlog - ${post.branch}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": post.branchCity
        }
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "HealthBlog Network",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 600,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug || post.id}`
    },
    "articleSection": post.category,
    "keywords": post.tags?.join(", "),
    "wordCount": post.wordCount || 800,
    "timeRequired": post.readTime,
    "inLanguage": "en-IN"
  });

  const generateBreadcrumbSchema = (items: {name: string, item: string}[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  });

  const generateLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "HealthBlog Wellness Network",
    "image": `${baseUrl}/logo.png`,
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": "+91-11-4567-8900",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Wellness Avenue",
      "addressLocality": "New Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6139,
      "longitude": 77.2090
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "department": [
      { "@type": "Physiotherapy", "name": "Sports Therapy" },
      { "@type": "Chiropractic", "name": "Chiropractic Care" },
      { "@type": "PainManagement", "name": "Pain Management" }
    ],
    "areaServed": ["IN-DL", "IN-MH", "IN-KA", "IN-TG", "IN-TN"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Wellness Services",
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Consultation", "url": `${baseUrl}/book` },
        { "@type": "OfferCatalog", "name": "Treatment Plans", "url": `${baseUrl}/treatments` }
      ]
    }
  });

  // Meta robots directive
  const robots = [
    noIndex && 'noindex',
    noFollow && 'nofollow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1'
  ].filter(Boolean).join(', ');

  return (
    <Head>
      {/* ===== Primary Meta Tags ===== */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robots} />
      
      {/* ===== Hreflang for Multi-region (India focus) ===== */}
      <link rel="alternate" hrefLang="en-in" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* ===== Open Graph / Facebook ===== */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title.replace(' | HealthBlog', '')} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="HealthBlog wellness insights preview" />
      <meta property="og:site_name" content="HealthBlog Network" />
      <meta property="og:locale" content="en_IN" />
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {article?.tags?.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* ===== Twitter Card ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@healthblog_in" />
      <meta name="twitter:creator" content={article?.author ? `@${article.author.toLowerCase().replace(/\s+/g, '_')}` : "@healthblog_in"} />
      <meta name="twitter:title" content={title.replace(' | HealthBlog', '')} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      
      {/* ===== Additional SEO Meta Tags ===== */}
      <meta name="theme-color" content="#0d1f2d" />
      <meta name="msapplication-TileColor" content="#0d1f2d" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* ===== Preconnect to Critical Origins ===== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href={baseUrl} />
      
      {/* ===== DNS Prefetch for Analytics/CDN ===== */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://cdn.healthblog.com" />
      
      {/* ===== Structured Data (JSON-LD) ===== */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogSchema()) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }} 
      />
      {article && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleSchema(article)) }} 
        />
      )}
      
      {/* ===== Breadcrumb Schema (dynamic) ===== */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          generateBreadcrumbSchema([
            { name: "Home", item: baseUrl },
            { name: "Blog", item: `${baseUrl}/blog` },
            ...(pathname !== '/blog' ? [{ name: "Articles", item: canonicalUrl }] : [])
          ])
        ) }} 
      />
      
      {/* ===== FAQ Schema for Homepage ===== */}
      {pathname === '/blog' && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What conditions do your physiotherapists treat?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our certified physiotherapists treat sports injuries, chronic pain, post-surgical rehabilitation, posture-related issues, and workplace ergonomics across all branches."
                }
              },
              {
                "@type": "Question", 
                "name": "How do I book a consultation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can book a consultation online through our booking portal, call our central helpline, or visit any of our 6 branch locations across India."
                }
              }
            ]
          })}} 
        />
      )}
    </Head>
  );
}