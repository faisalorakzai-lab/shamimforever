import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, pageSchema, organizationRef } from '@/lib/seo'

const path = '/gallery'
const title = 'Heritage Gallery | Sapphire Blue Levant & Provenance Vault'
const socialTitle = `${title} | Shamim Forever`
const description = 'Explore the Shamim Forever Heritage Gallery, including Sapphire Blue Levant from Lahore Maison — a limited 2023 fragrance edition of 300 pieces with a cinematic 3D product film.'
const image = '/products/sapphire-blue-levant/levant-bottle.png'

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
    { name: 'Sapphire Blue Levant', image: '/products/sapphire-blue-levant/levant-bottle.png', video: '/products/sapphire-blue-levant/heritage-3d.mp4', sku: 'SF-002', category: 'Fragrance', origin: 'Lahore Maison', year: '2023', edition: 'Limited · 300 pieces' },
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
      '@type': 'Product',
      '@id': absoluteUrl(path) + '#sapphire-blue-levant',
      name: 'Sapphire Blue Levant',
      sku: 'SF-002',
      category: 'Fragrance',
      description: 'Sapphire Blue Levant, a limited 2023 fragrance from Lahore Maison, catalogued as 300 pieces in the Shamim Forever Heritage Gallery.',
      image: absoluteUrl('/products/sapphire-blue-levant/levant-bottle.png'),
      brand: { '@type': 'Brand', name: 'Shamim Forever' },
      manufacturer: organizationRef(),
      productionDate: '2023',
      material: 'Fragrance',
      video: { '@id': absoluteUrl(path) + '#sapphire-blue-levant-video' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Origin', value: 'Lahore Maison' },
        { '@type': 'PropertyValue', name: 'Edition', value: 'Limited · 300 pieces' },
      ],
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
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': absoluteUrl(path) + '#sapphire-blue-levant-video',
      name: 'Sapphire Blue Levant 3D Product Film',
      description: 'Autoplaying cinematic 3D product film for Sapphire Blue Levant, the limited SF-002 fragrance from Lahore Maison.',
      thumbnailUrl: absoluteUrl('/products/sapphire-blue-levant/levant-bottle.png'),
      contentUrl: absoluteUrl('/products/sapphire-blue-levant/heritage-3d.mp4'),
      embedUrl: absoluteUrl('/products/sapphire-blue-levant/heritage-3d.mp4'),
      duration: 'PT6.29S',
      uploadDate: '2026-09-10',
    },
    breadcrumbSchema(path, 'Gallery'),
]

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}