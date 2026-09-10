import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AuthenticationExperience from '@/components/AuthenticationExperience'
import { getAuthenticationRecord } from '@/lib/authentication'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, pageSchema } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = { params: { serial: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const record = await getAuthenticationRecord(params.serial)
  if (!record) {
    return {
      title: { absolute: 'Authentication Record | Shamim Forever' },
      robots: { index: false, follow: false },
    }
  }

  const title = `${record.productName ?? 'Shamim Forever Creation'} — ${record.serial} | Authentication Record`
  const description = `Public authentication record for ${record.serial}, including the current registry status and available provenance fields.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: absoluteUrl(`/authenticate/${record.serial}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/authenticate/${record.serial}`),
      type: 'website',
      siteName: 'Shamim Forever',
    },
    robots: { index: true, follow: true },
  }
}

export default async function AuthenticationRecordPage({ params }: Props) {
  const record = await getAuthenticationRecord(params.serial)
  if (!record) {
    notFound()
    return null
  }

  const path = `/authenticate/${record.serial}`
  const title = `${record.productName ?? 'Shamim Forever Creation'} — ${record.serial} | Authentication Record`
  const description = `Public authentication record for ${record.serial}, including the current registry status and available provenance fields.`
  const schemas = [
    pageSchema({
      path,
      name: title,
      description,
      image: '/logo-sf.png',
      mainEntity: { '@id': `${absoluteUrl(path)}#authentication-record` },
    }),
    breadcrumbSchema(path, record.serial, [{ name: 'Authenticate', path: '/authenticate' }]),
  ]

  return (
    <SeoJsonLd schemas={schemas}>
      <AuthenticationExperience initialSerial={record.serial} />
    </SeoJsonLd>
  )
}