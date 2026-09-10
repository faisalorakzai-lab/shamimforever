import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/authenticate'
const title = 'Authenticate Your Shamim Forever Creation | Digital Provenance & Sovereign Registry'
const description = 'Verify a Shamim Forever Sovereign Serial against the public registry record and review the creation’s provenance signals with clear limits on holder and blockchain data.'
const image = '/logo-sf.png'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage(image, 'Shamim Forever authentication and digital provenance')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    path,
    name: title,
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#authentication-service` },
  }),
  {
    ...organizationRef(),
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo-sf.png'),
  },
  breadcrumbSchema(path, 'Authenticate'),
]

export default function AuthenticateLayout({ children }: { children: ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}