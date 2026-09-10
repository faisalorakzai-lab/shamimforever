import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, pageSchema, organizationRef } from '@/lib/seo'

const path = '/gallery'
const title = 'Digital Heritage Gallery — Provenance Vault'
const socialTitle = `${title} | Shamim Forever`
const description = 'Explore Shamim Forever’s Digital Heritage Vault, including Shamim Bloom — The Sovereign Grace, a Karachi Atelier fragrance archive with a cinematic 3D heritage film and documented first-edition identity.'
const image = '/products/shamims-bloom/bloom-hero.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: socialTitle,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage(image, 'Shamim Forever Digital Heritage Gallery')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const galleryPieces = [
    { name: 'Shamim Bloom — The Sovereign Grace', image: '/products/shamims-bloom/bloom-hero.png', video: '/products/shamims-bloom/heritage-3d.mp4', sku: 'SF-001', category: 'Fragrance', origin: 'Karachi Atelier', year: '2023', edition: 'First Edition · 150 pieces' },
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
  {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': absoluteUrl(path) + '#shamim-bloom',
      name: 'Shamim Bloom',
      alternateName: 'The Sovereign Grace',
      sku: 'SF-001',
      category: 'Fragrance',
      description: 'Shamim Bloom — The Sovereign Grace, a Karachi Atelier fragrance archive from 2023.',
      image: absoluteUrl('/products/shamims-bloom/bloom-hero.png'),
      brand: { '@type': 'Brand', name: 'Shamim Forever' },
      video: { '@id': absoluteUrl(path) + '#shamim-bloom-video' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': absoluteUrl(path) + '#shamim-bloom-video',
      name: 'Shamim Bloom 3D Heritage Film',
      description: 'A cinematic 3D product film for Shamim Bloom — The Sovereign Grace.',
      thumbnailUrl: absoluteUrl('/products/shamims-bloom/bloom-hero.png'),
      contentUrl: absoluteUrl('/products/shamims-bloom/heritage-3d.mp4'),
      embedUrl: absoluteUrl('/products/shamims-bloom/heritage-3d.mp4'),
      duration: 'PT6.33S',
      uploadDate: '2026-09-10',
    },
    breadcrumbSchema(path, 'Gallery'),
]

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}