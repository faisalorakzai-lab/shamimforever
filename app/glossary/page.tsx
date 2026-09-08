import type { Metadata } from 'next'
import Link from 'next/link'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
import { glossaryTerms } from '@/lib/guides-content'

const path = '/glossary'
const title = 'The Shamim Forever Glossary | Luxury, Provenance & Craft'
const description = 'Definitions for the language behind Shamim Forever: authenticity, provenance, sovereign luxury, atelier, heritage, stewardship, and more.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['luxury glossary', 'provenance definition', 'authenticity definition', 'sovereign luxury definition', 'atelier definition'],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: { title, description, url: absoluteUrl(path), type: 'website', siteName: 'Shamim Forever', images: [metadataImage('/og-faisal-orakzai.jpg', 'The Shamim Forever Glossary')] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({ type: 'CollectionPage', path, name: title, description, image: '/og-faisal-orakzai.jpg', mainEntity: { '@id': `${absoluteUrl(path)}#terms` } }),
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${absoluteUrl(path)}#terms`,
    name: 'The Shamim Forever Glossary',
    publisher: organizationRef(),
    hasDefinedTerm: glossaryTerms.map((item) => ({ '@type': 'DefinedTerm', name: item.term, description: item.definition, inDefinedTermSet: absoluteUrl(path) })),
  },
  breadcrumbSchema(path, 'Glossary'),
]

export default function GlossaryPage() {
  return (
    <SeoJsonLd schemas={schemas}>
      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <section className="border-b border-[#1b1814] px-5 pb-20 pt-36 md:px-12 md:pb-28 md:pt-48 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <p className="sf-kicker">THE LANGUAGE OF THE HOUSE</p>
            <h1 className="sf-display mt-7 max-w-5xl text-6xl md:text-[8rem]">Glossary<span className="text-[#c9a054]">.</span></h1>
            <p className="mt-9 max-w-2xl font-serif text-2xl font-light leading-tight text-zinc-300 md:text-4xl">Definitions for ideas that deserve precision.</p>
            <p className="mt-7 max-w-2xl text-sm leading-8 text-zinc-500">A living reference for the concepts that shape Shamim Forever: identity, craftsmanship, provenance, memory, and lasting value.</p>
          </div>
        </section>
        <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-5xl">
            <div className="divide-y divide-[#1b1814] border-y border-[#1b1814]">
              {glossaryTerms.map((item, index) => (
                <article key={item.term} className="grid gap-5 py-8 md:grid-cols-[72px_0.7fr_1.3fr] md:items-start">
                  <span className="text-[9px] tracking-[0.3em] text-[#c9a054]">{String(index + 1).padStart(2, '0')}</span>
                  <h2 className="font-serif text-3xl font-light text-zinc-200">{item.term}</h2>
                  <p className="text-sm leading-7 text-zinc-500">{item.definition}</p>
                </article>
              ))}
            </div>
            <div className="mt-14 flex flex-wrap gap-5">
              <Link href="/guides" className="luxury-btn">Explore Guides →</Link>
              <Link href="/whitepapers" className="luxury-btn">Read White Papers →</Link>
            </div>
          </div>
        </section>
      </main>
    </SeoJsonLd>
  )
}