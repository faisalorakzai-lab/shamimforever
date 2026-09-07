import type { Metadata } from 'next'
    import SeoJsonLd from '@/components/SeoJsonLd'
    import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
    import LuxuryPage from '@/components/learn/LuxuryPage'

    const path = '/learn/luxury'
    const title = 'Luxury | The Complete Philosophy of Sovereign Luxury | Shamim Forever'
    const description = 'Explore the philosophy of luxury through craftsmanship, rarity, time, culture, authenticity, bespoke creation, privacy and sovereign identity with Shamim Forever.'

    export const metadata: Metadata = {
    title,
    description,
    keywords: ['Luxury', 'What is luxury', 'Sovereign luxury', 'Luxury craftsmanship', 'Bespoke luxury', 'Private luxury', 'Modern luxury', 'Luxury philosophy', 'Authentic luxury', 'Luxury heritage'],
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title, description, url: absoluteUrl(path), type: 'article', siteName: 'Shamim Forever', images: [metadataImage('/og-faisal-orakzai.jpg', 'The Luxury philosophy of Shamim Forever')] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-faisal-orakzai.jpg'] },
    robots: { index: true, follow: true },
    }

    const schemas = [
    { ...pageSchema({ type: 'Article', path, name: title, description, image: '/og-faisal-orakzai.jpg', mainEntity: { '@id': absoluteUrl(path) + '#luxury' } }), '@id': absoluteUrl(path) + '#luxury', headline: title, author: organizationRef(), publisher: organizationRef(), inLanguage: 'en' },
    { '@context': 'https://schema.org', '@type': 'DefinedTermSet', '@id': absoluteUrl(path) + '#luxury', name: 'Sovereign Luxury Knowledge System', url: absoluteUrl(path), description, publisher: organizationRef(), hasDefinedTerm: ['Craftsmanship', 'Rarity', 'Bespoke Luxury', 'Private Luxury', 'Authenticity', 'Sustainable Luxury', 'Sovereign Luxury'] },
    breadcrumbSchema(path, 'Luxury', [{ name: 'Learn', path: '/learn' }]),
    ]

    export default function LuxuryRoute() { return <SeoJsonLd schemas={schemas}><LuxuryPage /></SeoJsonLd> }
    