import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const siteUrl = 'https://www.shamimforever.com'
const title = 'Shamim Forever Boutiques & Global Headquarters | Paris La Défense'
const description = "Explore Shamim Forever's global presence, including its Global Headquarters in Puteaux, Paris La Défense, France, and the House's long-term international vision."

export const metadata: Metadata = {
  title, description,
  keywords: ['Shamim Forever boutiques', 'Shamim Forever Global Headquarters', 'luxury boutiques Paris La Défense', 'Puteaux luxury house', 'private luxury experiences', 'Shamim Forever Paris', 'global luxury presence'],
  alternates: { canonical: '/boutiques' },
  openGraph: { title, description, url: '/boutiques', siteName: 'Shamim Forever', type: 'website', images: [{ url: siteUrl + '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }] },
  twitter: { card: 'summary_large_image', title, description, images: [siteUrl + '/logo-sf.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

const boutiquesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': siteUrl + '/boutiques#webpage', url: siteUrl + '/boutiques', name: title, description, isPartOf: { '@id': siteUrl + '/#website' }, about: { '@id': siteUrl + '/#organization' }, mainEntity: { '@id': siteUrl + '/boutiques#headquarters' }, breadcrumb: { '@id': siteUrl + '/boutiques#breadcrumb' }, inLanguage: 'en' },
    { '@type': 'BreadcrumbList', '@id': siteUrl + '/boutiques#breadcrumb', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' }, { '@type': 'ListItem', position: 2, name: 'Boutiques & Global Presence', item: siteUrl + '/boutiques' }] },
    { '@type': 'Place', '@id': siteUrl + '/boutiques#headquarters', name: 'Shamim Forever Global Headquarters', description: 'The verified administrative and strategic headquarters of Shamim Forever in Puteaux, within the Paris La Défense region of France.', url: siteUrl + '/boutiques', address: { '@type': 'PostalAddress', streetAddress: '77 Esplanade du Général de Gaulle', postalCode: '92800', addressLocality: 'Puteaux', addressRegion: 'Hauts-de-Seine', addressCountry: 'FR' }, containedInPlace: { '@type': 'AdministrativeArea', name: 'Paris La Défense' }, parentOrganization: { '@id': siteUrl + '/#organization' } },
  ],
}

export default function BoutiquesLayout({ children }: { children: ReactNode }) {
  return (<> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(boutiquesJsonLd) }} /> {children} </>)
}
