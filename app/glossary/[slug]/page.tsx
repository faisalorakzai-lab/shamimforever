import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef } from '@/lib/seo'
import { glossaryTerms, getGlossaryTerm } from '@/lib/glossary-content'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return glossaryTerms.map((entry) => ({ slug: entry.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getGlossaryTerm(params.slug)
  if (!entry) return { title: 'Glossary Term Not Found | Shamim Forever' }
  const title = `What Does ${entry.term} Mean? | Shamim Forever Glossary`
  return {
    title,
    description: entry.shortDefinition,
    keywords: [entry.term, `${entry.term} definition`, 'Shamim Forever Glossary', entry.category],
    alternates: { canonical: absoluteUrl(`/glossary/${entry.slug}`) },
    openGraph: {
      title,
      description: entry.shortDefinition,
      url: absoluteUrl(`/glossary/${entry.slug}`),
      type: 'article',
      siteName: 'Shamim Forever',
      images: [metadataImage('/og-faisal-orakzai.jpg', `${entry.term} — The Sovereign Lexicon`)],
    },
    twitter: { card: 'summary_large_image', title, description: entry.shortDefinition, images: ['/og-faisal-orakzai.jpg'] },
    robots: { index: true, follow: true },
  }
}

export default function GlossaryTermPage({ params }: Props) {
  const entry = getGlossaryTerm(params.slug)
  if (!entry) notFound()
  const url = absoluteUrl(`/glossary/${entry.slug}`)
  const relatedEntries = entry.relatedSlugs.map((slug) => getGlossaryTerm(slug)).filter(Boolean)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      '@id': `${url}#term`,
      name: entry.term,
      description: entry.shortDefinition,
      url,
      termCode: entry.slug,
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'The Sovereign Lexicon', url: absoluteUrl('/glossary') },
      subjectOf: { '@type': 'Article', '@id': `${url}#article`, url, headline: `What Does ${entry.term} Mean?`, author: organizationRef(), publisher: organizationRef(), dateModified: entry.lastReviewed },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: `What Does ${entry.term} Mean?`,
      description: entry.definition,
      url,
      author: organizationRef(),
      publisher: organizationRef(),
      dateModified: entry.lastReviewed,
      about: { '@id': `${url}#term` },
      isPartOf: { '@type': 'CollectionPage', name: 'The Sovereign Lexicon', url: absoluteUrl('/glossary') },
    },
    breadcrumbSchema(`/glossary/${entry.slug}`, entry.term, [{ name: 'The Sovereign Lexicon', path: '/glossary' }]),
  ]

  return (
    <SeoJsonLd schemas={schemas}>
      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <section className="relative overflow-hidden border-b border-[#1b1814] px-5 pb-20 pt-36 md:px-12 md:pb-28 md:pt-48 lg:px-20">
          <div className="pointer-events-none absolute right-[-13rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[#8d7348]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <Link href="/glossary" className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">← The Sovereign Lexicon</Link>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="sf-kicker">{entry.category}</p>
                <h1 className="sf-display mt-7 text-6xl md:text-[9rem]">{entry.term}<span className="text-[#c9a054]">.</span></h1>
                <p className="mt-6 font-mono text-xs tracking-[0.2em] text-zinc-700">/{entry.slug}</p>
              </div>
              <div className="border-l border-[#c9a054] pl-6 md:pl-9">
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">Pronunciation</p>
                <p className="mt-3 font-serif text-2xl font-light text-[#c9a054]">{entry.pronunciation}</p>
                <p className="mt-7 text-sm leading-7 text-zinc-400">{entry.shortDefinition}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[250px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <p className="sf-kicker">ENTRY RECORD</p>
              <div className="mt-6 space-y-5 border-y border-[#1b1814] py-6 text-[9px] uppercase tracking-[0.2em] text-zinc-700">
                <p>Category <span className="mt-2 block font-normal text-zinc-400">{entry.category}</span></p>
                <p>Last reviewed <span className="mt-2 block font-normal text-zinc-400">{entry.lastReviewed}</span></p>
                <p>Reference <span className="mt-2 block font-normal text-zinc-400">SF-LX-{entry.slug.toUpperCase()}</span></p>
              </div>
              <Link href="/glossary" className="mt-7 inline-flex text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">All terms →</Link>
            </aside>

            <article className="min-w-0 max-w-4xl">
              <section className="border-b border-[#1b1814] pb-12">
                <p className="sf-kicker">QUICK DEFINITION</p>
                <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-zinc-200 md:text-5xl">{entry.shortDefinition}</h2>
              </section>
              <section className="border-b border-[#1b1814] py-12">
                <p className="sf-kicker">DETAILED DEFINITION</p>
                <p className="mt-6 text-base leading-8 text-zinc-400">{entry.definition}</p>
              </section>
              <section className="grid gap-10 border-b border-[#1b1814] py-12 md:grid-cols-2">
                <div><p className="sf-kicker">IN THE CONTEXT OF THE HOUSE</p><p className="mt-5 text-sm leading-8 text-zinc-500">{entry.houseContext}</p></div>
                <div><p className="sf-kicker">WHY IT MATTERS</p><p className="mt-5 text-sm leading-8 text-zinc-500">{entry.whyItMatters}</p></div>
              </section>
              <section className="border-b border-[#1b1814] py-12">
                <p className="sf-kicker">RELATED CONCEPTS</p>
                <div className="mt-6 flex flex-wrap gap-3">{relatedEntries.map((related) => related && <Link key={related.slug} href={`/glossary/${related.slug}`} className="border border-[#292218] px-4 py-3 text-[9px] uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:border-[#c9a054] hover:text-[#c9a054]">{related.term}</Link>)}</div>
              </section>
              <section className="border-b border-[#1b1814] py-12">
                <p className="sf-kicker">COMMON MISUNDERSTANDING</p>
                <p className="mt-6 border-l border-[#c9a054] pl-6 text-sm leading-8 text-zinc-500">{entry.misunderstandings}</p>
              </section>
              <section className="py-12">
                <p className="sf-kicker">GUIDES & RESOURCES</p>
                <div className="mt-7 grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2">{entry.resources.map((resource) => <Link key={resource.href} href={resource.href} className="group bg-[#080808] p-6 text-xs text-zinc-500 transition-colors hover:bg-[#0d0c0a] hover:text-[#c9a054]">{resource.label}<span className="mt-4 block text-[9px] uppercase tracking-[0.25em] text-[#c9a054]">Explore →</span></Link>)}</div>
              </section>
            </article>
          </div>
        </section>

        <section className="border-t border-[#1b1814] px-5 py-20 md:px-12 md:py-28 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div><p className="sf-kicker">CONTINUE YOUR RESEARCH</p><h2 className="sf-heading mt-4 text-4xl md:text-6xl">The meaning continues.</h2></div>
            <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2"><Link href="/guides" className="group bg-[#080808] p-7 text-sm text-zinc-500 hover:bg-[#0d0c0a] hover:text-[#c9a054]">Guides<span className="mt-5 block text-[9px] uppercase tracking-[0.25em] text-[#c9a054]">Practical explanations →</span></Link><Link href="/whitepapers" className="group bg-[#080808] p-7 text-sm text-zinc-500 hover:bg-[#0d0c0a] hover:text-[#c9a054]">White Papers<span className="mt-5 block text-[9px] uppercase tracking-[0.25em] text-[#c9a054]">Deeper research →</span></Link></div>
          </div>
        </section>
      </main>
    </SeoJsonLd>
  )
}