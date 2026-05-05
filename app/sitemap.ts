import { MetadataRoute } from "next";

const BASE_URL = "https://www.skmphysiotherapy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ─── Home ───
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ─── High-Priority Service Pages ───
    {
      url: `${BASE_URL}/services-skm-physiotherapy/home-visit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/corporate`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/back-pain`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/knee-pain`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/neck-pain`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/sports-injuries`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/cupping-hijama`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/dry-needling`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ─── All Services ───
    {
      url: `${BASE_URL}/services-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/sciatica`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/frozen-shoulder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/arthritis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/neurological`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/paralysis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/heel-pain`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/bells-palsy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/post-covid`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/pain-management`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/injury-rehab`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/joint-bone`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/taping`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/specialized-therapies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/wellness`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/services-skm-physiotherapy/relaxation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    // ─── Branch / Location Pages ───
    {
      url: `${BASE_URL}/branches-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/branches-skm-physiotherapy/gurugram-sector-14`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/branches-skm-physiotherapy/gurugram-dlf-phase2`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/branches-skm-physiotherapy/gurugram-sector-45`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/branches-skm-physiotherapy/noida-sector-134`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/branches-skm-physiotherapy/greater-noida-swaran-nagari`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ─── About / Trust Pages ───
    {
      url: `${BASE_URL}/Why-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/therapist-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/testimonials-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/AwardsCertifications-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/OurImpact-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/OurStory-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ─── Contact & Engagement ───
    {
      url: `${BASE_URL}/contact-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/FAQ-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    // ─── Content / Blog ───
    {
      url: `${BASE_URL}/blog-physiotherapy`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/news-and-events-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/events-skm-physiotherapy`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/sports-injury-physiotherapy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/back-pain-treatment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
