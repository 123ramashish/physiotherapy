// app/branches-skm-physiotherapy/gurugram-dlf-phase2/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SKM Physiotherapy DLF Phase 2 — Gurugram | Paediatric & Women's Physiotherapy",
  description:
    "SKM Physiotherapy DLF Phase 2, Gurugram — Expert women's health, paediatric physiotherapy, hijama therapy, dry needling, sports injuries & neuro-rehab near Cyber Hub. Call 7982799149.",
  keywords: [
    'physiotherapy DLF phase 2 gurugram',
    'paediatric physiotherapy gurugram',
    "women's health physiotherapy gurugram",
    'SKM physiotherapy DLF',
    'hijama DLF gurugram',
    'dry needling cyber hub gurugram',
    'sports physio DLF gurugram',
    'physiotherapy near cyber hub gurugram',
  ],
  alternates: {
    canonical: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-dlf-phase2',
  },
  openGraph: {
    title: "SKM Physiotherapy DLF Phase 2 — Paediatric & Women's Physiotherapy",
    description:
      "Women's health, paediatric physiotherapy, hijama & dry needling near Cyber Hub, DLF Phase 2, Gurugram. Call 7982799149.",
    url: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-dlf-phase2',
    siteName: 'SKM Physiotherapy & Rehabilitation Centre',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SKM Physiotherapy DLF Phase 2 Gurugram',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SKM Physiotherapy DLF Phase 2 — Paediatric & Women's Physio",
    description: "Women's health, paediatric physio, hijama & sports rehab near Cyber Hub. Call 7982799149.",
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80'],
  },
  robots: { index: true, follow: true },
};

const jsonLdMedicalBusiness = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  '@id': 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-dlf-phase2',
  name: 'SKM Physiotherapy & Rehabilitation Centre — DLF Phase 2, Gurugram',
  url: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-dlf-phase2',
  telephone: '+917982799149',
  email: 'dlf@skmphysio.in',
  image: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  ],
  description:
    "SKM Physiotherapy DLF Phase 2 Gurugram — Women's health, paediatric physiotherapy, hijama, dry needling, sports injuries & neuro-rehab near Cyber Hub.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '78, Cyber Hub Road, DLF Phase 2',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122002',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 28.4950, longitude: 77.0900 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:30', closes: '20:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '10:00', closes: '13:00' },
  ],
  hasMap: 'https://maps.google.com/?q=SKM+Physiotherapy+DLF+Phase+2+Gurugram',
  priceRange: '₹₹',
  medicalSpecialty: "Physiotherapy, Paediatric Physiotherapy, Women's Health, Rehabilitation",
  paymentAccepted: 'Cash, UPI, Insurance, Credit Card, Corporate Tie-Ups',
  currenciesAccepted: 'INR',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '185', bestRating: '5' },
  employee: [
    { '@type': 'Physician', name: 'Dr. Priya Verma', jobTitle: "Branch Head — Women's & Paediatric Specialist", description: "Women's Health, Paediatric Physiotherapy, Hijama Therapy, Post-Natal Rehab" },
    { '@type': 'Physician', name: 'Dr. Arun Bhatia', jobTitle: 'Physiotherapist — Sports & Ortho', description: 'Sports Medicine, Orthopaedic Rehab, Dry Needling' },
  ],
  availableService: [
    'Dry Needling','Cupping & Hijama','Back Pain Treatment','Neck Pain Therapy',
    'Knee Pain Rehabilitation','Arthritis Management','Heel Pain',"Bell's Palsy",
    'Sciatica Pain','Sports Injuries','Post COVID Rehab','Frozen Shoulder',
    'Paralysis (Stroke) Rehab','Paediatric Physiotherapy','Soreness & Relaxation',
  ].map(name => ({ '@type': 'MedicalTherapy', name })),
  parentOrganization: { '@type': 'MedicalOrganization', name: 'SKM Physiotherapy & Rehabilitation Centre', url: 'https://www.skmphysio.in' },
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skmphysio.in' },
    { '@type': 'ListItem', position: 2, name: 'Branches', item: 'https://www.skmphysio.in/branches' },
    { '@type': 'ListItem', position: 3, name: 'DLF Phase 2, Gurugram', item: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-dlf-phase2' },
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where is SKM Physiotherapy DLF Phase 2 located?', acceptedAnswer: { '@type': 'Answer', text: '78, Cyber Hub Road, DLF Phase 2, Gurugram, Haryana — 122002. Near Cyber Hub, opposite Galleria Market, 3 min from MG Road Metro.' } },
    { '@type': 'Question', name: 'What are the timings of DLF Phase 2 branch?', acceptedAnswer: { '@type': 'Answer', text: 'Weekdays: 8:30 AM – 8:30 PM. Saturday: 9:00 AM – 6:00 PM. Sunday: 10:00 AM – 1:00 PM.' } },
    { '@type': 'Question', name: "Is paediatric and women's physiotherapy available here?", acceptedAnswer: { '@type': 'Answer', text: "Yes! Dr. Priya Verma specialises in women's health physiotherapy, post-natal rehab, paediatric physiotherapy, and hijama therapy." } },
    { '@type': 'Question', name: 'How do I book at DLF Phase 2?', acceptedAnswer: { '@type': 'Answer', text: 'Call or WhatsApp: 7982799149. Email: dlf@skmphysio.in. Corporate tie-ups also available.' } },
  ],
};

export default function DlfPhase2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMedicalBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <main>{children}</main>
    </>
  );
}