import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, pageSchema, organizationRef } from '@/lib/seo'

const path = '/gallery'
const title = 'Digital Heritage Gallery — Provenance Vault | Shamim Forever'
const description = 'Explore Shamim Forever’s Digital Heritage Vault, a living gallery of catalogued fragrance, jewelry, and couture creations with immutable NFT provenance records.'
const image = '/og-heirloom.jpg'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage(image, 'Shamim Forever Digital Heritage Gallery')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const galleryPieces = [
  { name: 'Oud Noir Eternal', image: '/founder-1.png' },
  { name: 'Sovereign Amethyst', image: '/founder-2.png' },
  { name: 'Eternal Empress', image: '/founder-3.png' },
  { name: 'Amethyst Veil', image: '/founder-4.png' },
  { name: 'Amber Archive', image: '/founder-5.png' },
]

const schemas = [
  pageSchema({ type: 'CollectionPage', path, name: 'The Digital Heritage Vault', description, image }),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#pieces`,
    name: 'Shamim Forever Digital Heritage Gallery',
    numberOfItems: galleryPieces.length,
    itemListElement: galleryPieces.map((piece, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: piece.name,
        image: absoluteUrl(piece.image),
        creator: organizationRef(),
      },
    })),
  },
  breadcrumbSchema(path, 'Gallery'),
]

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}