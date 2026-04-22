// app/branches/gurugram-sector-14/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SKM Physiotherapy Main Centre — Sector 14, Gurugram | Best Physiotherapist',
  description:
    'SKM Physiotherapy & Rehabilitation Centre in Sector 14, Gurugram. Expert treatment for back pain, knee pain, sports injuries, dry needling, cupping & hijama. Book appointment: 7982799147.',
  keywords: [
    'physiotherapy sector 14 gurugram',
    'best physiotherapist gurugram',
    'dry needling gurugram',
    'back pain treatment gurugram',
    'SKM physiotherapy main centre',
    'hijama therapy gurugram',
    'cupping therapy gurugram',
    'sports injury rehab gurugram',
  ],
  alternates: {
    canonical: 'https://www.skmphysio.in/branches/gurugram-sector-14',
  },
  openGraph: {
    title: 'SKM Physiotherapy Main Centre — Sector 14, Gurugram',
    description:
      'Expert physiotherapy for back pain, knee pain, sports injuries, dry needling & hijama at our Main Centre in Sector 14, Gurugram. Call 7982799147.',
    url: 'https://www.skmphysio.in/branches/gurugram-sector-14',
    siteName: 'SKM Physiotherapy & Rehabilitation Centre',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SKM Physiotherapy Main Centre Sector 14 Gurugram',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKM Physiotherapy Main Centre — Sector 14, Gurugram',
    description: 'Expert physiotherapy for back pain, knee pain & sports injuries. Call 7982799147.',
    images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80'],
  },
  robots: { index: true, follow: true },
};

const jsonLdMedicalBusiness = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  '@id': 'https://www.skmphysio.in/branches/gurugram-sector-14',
  name: 'SKM Physiotherapy & Rehabilitation Centre — Sector 14, Gurugram',
  url: 'https://www.skmphysio.in/branches/gurugram-sector-14',
  telephone: '+917982799147',
  email: 'sector14@skmphysio.in',
  image: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
  ],
  description:
    'SKM Physiotherapy Main Centre in Sector 14, Gurugram offering cupping, hijama, dry needling, back pain, neck pain, knee pain, sports injuries, sciatica, frozen shoulder & paralysis rehab.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123, MG Road, Sector 14',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122001',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 28.4595, longitude: 77.0266 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '10:00', closes: '14:00' },
  ],
  hasMap: 'https://maps.google.com/?q=SKM+Physiotherapy+Sector+14+Gurugram',
  priceRange: '₹₹',
  medicalSpecialty: 'Physiotherapy, Rehabilitation',
  paymentAccepted: 'Cash, UPI, Insurance, Credit Card',
  currenciesAccepted: 'INR',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '230', bestRating: '5' },
  employee: [
    { '@type': 'Physician', name: 'Dr. Sachin Kumar Malik', jobTitle: 'Chief Physiotherapist & Director', description: 'Orthopaedic Physiotherapy, Sports Rehabilitation, Dry Needling, Hijama Therapy' },
    { '@type': 'Physician', name: 'Dr. Meena Sharma', jobTitle: 'Senior Physiotherapist', description: 'Manual Therapy, Post-Surgical Rehab, Paediatric Physiotherapy' },
  ],
  availableService: [
    'Cupping & Hijama','Dry Needling','Back Pain Treatment','Neck Pain Therapy','Knee Pain Rehabilitation',
    'Arthritis Management','Heel Pain','Bell\'s Palsy','Sciatica Pain','Sports Injuries','Post COVID Rehab',
    'Frozen Shoulder','Paralysis (Stroke) Rehab','Soreness & Relaxation',
  ].map(name => ({ '@type': 'MedicalTherapy', name })),
  parentOrganization: { '@type': 'MedicalOrganization', name: 'SKM Physiotherapy & Rehabilitation Centre', url: 'https://www.skmphysio.in' },
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skmphysio.in' },
    { '@type': 'ListItem', position: 2, name: 'Branches', item: 'https://www.skmphysio.in/branches' },
    { '@type': 'ListItem', position: 3, name: 'Sector 14, Gurugram', item: 'https://www.skmphysio.in/branches/gurugram-sector-14' },
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where is SKM Physiotherapy Main Centre located?', acceptedAnswer: { '@type': 'Answer', text: '123, MG Road, Sector 14, Gurugram, Haryana — 122001. Near MG Road Metro Station, Opposite Sector 14 Market, 2 min from IFFCO Chowk.' } },
    { '@type': 'Question', name: 'What are the timings of SKM Physiotherapy Sector 14?', acceptedAnswer: { '@type': 'Answer', text: 'Weekdays: 8:00 AM – 9:00 PM. Saturday: 9:00 AM – 6:00 PM. Sunday: 10:00 AM – 2:00 PM.' } },
    { '@type': 'Question', name: 'What services are available at Sector 14 branch?', acceptedAnswer: { '@type': 'Answer', text: 'Cupping & Hijama, Dry Needling, Back Pain, Neck Pain, Knee Pain, Arthritis, Heel Pain, Bell\'s Palsy, Sciatica, Sports Injuries, Post COVID Rehab, Frozen Shoulder, Paralysis Rehab, Soreness & Relaxation.' } },
    { '@type': 'Question', name: 'How do I book an appointment at Sector 14?', acceptedAnswer: { '@type': 'Answer', text: 'Call or WhatsApp: 7982799147. Email: sector14@skmphysio.in. Walk-ins also welcome.' } },
  ],
};

export default function Sector14Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMedicalBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <main>{children}</main>
    </>
  );
}