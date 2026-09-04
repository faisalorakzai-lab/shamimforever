import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, pageSchema } from '@/lib/seo'

const path = '/wallet'
const title = 'Your Selections & Secure Checkout'
const socialTitle = `${title} | Shamim Forever`
const description = 'Review selected Shamim Forever creations, complete delivery details, and settle your order securely with USDT, USDC, OKBOND, or MATIC on Polygon network.'
const image = '/og-shop.jpg'

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
    images: [metadataImage(image, 'Shamim Forever secure checkout')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

const schemas = [
  pageSchema({ type: 'CheckoutPage', path, name: 'Secure Checkout — Your Selections', description, image }),
  breadcrumbSchema(path, 'Wallet'),
]

export default function WalletLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}