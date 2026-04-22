// app/branches-skm-physiotherapy/gurugram-sector-45/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SKM Physiotherapy South Extension — Sector 45, Gurugram | Neuro & Sports Rehab',
  description:
    'SKM Physiotherapy South Extension in Sector 45, Gurugram. Expert neurological rehabilitation, sports injuries, back pain, knee pain & sciatica treatment. Book appointment: 7982799148.',
  keywords: [
    'physiotherapy sector 45 gurugram',
    'sports injury rehab gurugram south',
    'neuro physiotherapy gurugram',
    'SKM physiotherapy sector 45',
    'back pain sohna road gurugram',
    'knee pain treatment sector 45',
    'sciatica treatment gurugram south',
    'physiotherapy south extension gurugram',
  ],
  alternates: {
    canonical: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-sector-45',
  },
  openGraph: {
    title: 'SKM Physiotherapy South Extension — Sector 45, Gurugram',
    description:
      'Neurological rehabilitation, sports injuries, back pain & knee pain treatment at Sector 45, Gurugram. Call 7982799148.',
    url: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-sector-45',
    siteName: 'SKM Physiotherapy & Rehabilitation Centre',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SKM Physiotherapy South Extension Sector 45 Gurugram',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKM Physiotherapy South Extension — Sector 45, Gurugram',
    description: 'Neuro rehab, sports injuries & pain management. Call 7982799148.',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80'],
  },
  robots: { index: true, follow: true },
};

const jsonLdMedicalBusiness = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  '@id': 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-sector-45',
  name: 'SKM Physiotherapy & Rehabilitation Centre — Sector 45 South Extension, Gurugram',
  url: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-sector-45',
  telephone: '+917982799148',
  email: 'sector45@skmphysio.in',
  image: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  ],
  description:
    'SKM Physiotherapy South Extension in Sector 45, Gurugram. Expert neurological rehabilitation, sports injuries, back pain, knee pain, sciatica, frozen shoulder & post COVID rehab.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '45, Sohna Road, Sector 45',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122003',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 28.4400, longitude: 77.0700 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '17:00' },
  ],
  hasMap: 'https://maps.google.com/?q=SKM+Physiotherapy+Sector+45+Gurugram',
  priceRange: '₹₹',
  medicalSpecialty: 'Physiotherapy, Neurological Rehabilitation, Sports Medicine',
  paymentAccepted: 'Cash, UPI, Credit Card',
  currenciesAccepted: 'INR',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '140', bestRating: '5' },
  employee: [
    { '@type': 'Physician', name: 'Dr. Rajiv Nanda', jobTitle: 'Branch Head & Senior Physiotherapist', description: 'Neurological Rehabilitation, Sports Injuries, Chronic Pain Management' },
  ],
  availableService: [
    'Back Pain Treatment','Neck Pain Therapy','Knee Pain Rehabilitation','Arthritis Management',
    'Sports Injuries','Sciatica Pain','Frozen Shoulder','Post COVID Rehab',
    'Paralysis (Stroke) Rehab','Manual Therapy','Cupping Therapy',
  ].map(name => ({ '@type': 'MedicalTherapy', name })),
  parentOrganization: { '@type': 'MedicalOrganization', name: 'SKM Physiotherapy & Rehabilitation Centre', url: 'https://www.skmphysio.in' },
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skmphysio.in' },
    { '@type': 'ListItem', position: 2, name: 'Branches', item: 'https://www.skmphysio.in/branches' },
    { '@type': 'ListItem', position: 3, name: 'Sector 45, Gurugram', item: 'https://www.skmphysio.in/branches-skm-physiotherapy/gurugram-sector-45' },
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where is SKM Physiotherapy South Extension located?', acceptedAnswer: { '@type': 'Answer', text: '45, Sohna Road, Sector 45, Gurugram, Haryana — 122003. Near Sohna Road Flyover, 5 min from Huda City Centre Metro.' } },
    { '@type': 'Question', name: 'What are the timings of Sector 45 branch?', acceptedAnswer: { '@type': 'Answer', text: 'Weekdays: 9:00 AM – 8:00 PM. Saturday: 9:00 AM – 5:00 PM. Sunday: Closed.' } },
    { '@type': 'Question', name: 'Does the Sector 45 branch offer neurological physiotherapy?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Dr. Rajiv Nanda specialises in neurological rehabilitation including stroke recovery, paralysis, and Bell\'s Palsy treatment.' } },
    { '@type': 'Question', name: 'How do I book at Sector 45?', acceptedAnswer: { '@type': 'Answer', text: 'Call or WhatsApp: 7982799148. Email: sector45@skmphysio.in. Walk-ins welcome.' } },
  ],
};

export default function Sector45Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMedicalBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <main>{children}</main>
    </>
  );
}