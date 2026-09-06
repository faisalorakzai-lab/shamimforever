import type { Metadata } from 'next'
    import SeoJsonLd from '@/components/SeoJsonLd'
    import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
    import { CONCIERGE_FAQS } from './content'

    const path = '/concierge'
    const title = 'Luxury Concierge & Private Client Services'
    const socialTitle = title + ' | Shamim Forever'
    const description = "Contact Shamim Forever's private luxury concierge for bespoke commissions, boutique appointments, product inquiries, authentication support, and exclusive client services."
    const image = '/og-boutiques.jpg'
    const headquartersId = absoluteUrl(path) + '#headquarters'

    export const metadata: Metadata = {
    title,
    description,
    keywords: ['Shamim Forever Concierge', 'private luxury concierge', 'private client services', 'bespoke luxury consultation', 'luxury appointment booking', 'Paris La Défense luxury house', 'Shamim Forever private access'],
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: socialTitle, description, url: absoluteUrl(path), type: 'website', siteName: 'Shamim Forever', images: [metadataImage(image, 'Shamim Forever Private Luxury Concierge')] },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    }

    const schemas = [
    pageSchema({ type: 'ContactPage', path, name: 'Private Luxury Concierge', description, image, mainEntity: { '@id': absoluteUrl(path) + '#service' } }),
    { '@context': 'https://schema.org', '@type': 'Service', '@id': absoluteUrl(path) + '#service', name: 'Private Luxury Concierge', serviceType: 'Private client services, consultation, appointment coordination, and bespoke inquiries', description, provider: organizationRef(), areaServed: { '@type': 'Place', name: 'Worldwide' }, availableChannel: [{ '@type': 'ServiceChannel', serviceUrl: absoluteUrl(path), name: 'Private consultation booking' }, { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/923119447572', name: 'WhatsApp Concierge' }, { '@type': 'ServiceChannel', serviceUrl: 'mailto:concierge@shamimforever.com', name: 'Concierge email' }], url: absoluteUrl(path) },
    { '@context': 'https://schema.org', '@type': 'ContactPoint', '@id': absoluteUrl(path) + '#contact-point', contactType: 'customer service', telephone: '+92 311 9447572', email: 'concierge@shamimforever.com', availableLanguage: ['English', 'Urdu'], areaServed: 'Worldwide', url: absoluteUrl(path), parentOrganization: organizationRef() },
    { '@context': 'https://schema.org', '@type': 'Place', '@id': headquartersId, name: 'Shamim Forever Global Headquarters', address: { '@type': 'PostalAddress', streetAddress: '77 Esplanade du Général de Gaulle', postalCode: '92800', addressLocality: 'Puteaux', addressRegion: 'Hauts-de-Seine', addressCountry: 'FR' }, containedInPlace: { '@type': 'AdministrativeArea', name: 'Paris La Défense' }, parentOrganization: organizationRef() },
    { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': absoluteUrl(path) + '#faq', mainEntity: CONCIERGE_FAQS.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    breadcrumbSchema(path, 'Concierge'),
    ]

    export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
    return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
    }
    