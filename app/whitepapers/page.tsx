import type { Metadata } from 'next'
import Link from 'next/link'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
import { whitepapers } from '@/lib/whitepapers'

const path = '/whitepapers'
const title = 'White Paper Library | Shamim Forever Research'
const description = 'Read Shamim Forever white papers on sovereign luxury, brand architecture, provenance, authentication, digital identity, heritage, and the future of luxury systems.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Shamim Forever white papers', 'luxury research', 'sovereign systems', 'digital luxury architecture', 'provenance research', 'luxury authentication'],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: { title, description, url: absoluteUrl(path), type: 'website', siteName: 'Shamim Forever', images: [metadataImage('/og-faisal-orakzai.jpg', 'Shamim Forever White Paper Library')] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-faisal-orakzai.jpg'] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({ type: 'CollectionPage', path, name: title, description, image: '/og-faisal-orakzai.jpg', mainEntity: { '@id': `${absoluteUrl(path)}#library` } }),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#library`,
    name: 'Shamim Forever White Paper Library',
    itemListElement: whitepapers.map((paper, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: paper.title,
      url: absoluteUrl(`/whitepapers/${paper.slug}`),
    })),
  },
  { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${absoluteUrl(path)}#publisher`, name: 'Shamim Forever', parentOrganization: organizationRef() },
  breadcrumbSchema(path, 'White Papers'),
]

export default function WhitepapersPage() {
  return (
    <SeoJsonLd schemas={schemas}>
      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <section className="relative overflow-hidden border-b border-[#1b1814] px-5 pb-24 pt-36 md:px-12 md:pb-32 md:pt-48 lg:px-20">
          <div className="pointer-events-none absolute right-[-12rem] top-12 h-[35rem] w-[35rem] rounded-full bg-[#8d7348]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <p className="sf-kicker">SHAMIM FOREVER RESEARCH</p>
            <h1 className="sf-display mt-7 max-w-5xl text-6xl md:text-[8rem]">White <span className="text-[#c9a054]">papers.</span></h1>
            <p className="mt-9 max-w-2xl font-serif text-2xl font-light leading-tight text-zinc-300 md:text-4xl">Ideas deserve more than headlines.</p>
            <p className="mt-7 max-w-2xl text-sm leading-8 text-zinc-500 md:text-base">Long-form research for systems that require deeper thought: luxury, authenticity, provenance, technology, heritage, and institutional architecture.</p>
          </div>
        </section>
        <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="sf-kicker">THE LIBRARY</p>
                <h2 className="sf-heading mt-3 text-4xl md:text-6xl">Research publications.</h2>
              </div>
              <Link href="/guides" className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Return to Guides →</Link>
            </div>
            <div className="space-y-px border-y border-[#1b1814] bg-[#1b1814]">
              {whitepapers.map((paper, index) => (
                <article key={paper.slug} className="grid gap-8 bg-[#080808] p-7 md:grid-cols-[100px_1fr_190px] md:items-start md:p-10">
                  <div>
                    <p className="text-[9px] tracking-[0.35em] text-[#c9a054]">WP · {String(index + 1).padStart(2, '0')}</p>
                    <p className="mt-4 text-[8px] uppercase tracking-[0.25em] text-zinc-700">{paper.documentType}</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.35em] text-[#c9a054]">{paper.category}</p>
                    <h2 className="mt-4 max-w-3xl font-serif text-3xl font-light leading-tight text-zinc-200 md:text-5xl">{paper.title}</h2>
                    <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-500">{paper.abstract}</p>
                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[8px] uppercase tracking-[0.22em] text-zinc-700">
                      <span>{paper.author}</span><span>{paper.version}</span><span>{paper.pages} pages</span><span>{paper.readingTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 md:pt-8">
                    <Link href={`/whitepapers/${paper.slug}`} className="luxury-btn">Read online →</Link>
                    <a href={paper.pdfPath} download className="luxury-btn">View PDF ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SeoJsonLd>
  )
}