import type { Metadata } from 'next'
import Link from 'next/link'
import SeoJsonLd from '@/components/SeoJsonLd'
import GuidesLibrary from '@/components/GuidesLibrary'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
import { knowledgeUniverses, learningPaths } from '@/lib/guides-content'

const path = '/guides'
const title = 'Luxury Guides, Craftsmanship, Authenticity & Innovation | Shamim Forever'
const description = 'Explore Shamim Forever Guides, a global knowledge library covering luxury, craftsmanship, authenticity, heritage, technology, provenance, innovation, and the systems behind lasting value.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'luxury guides',
    'luxury craftsmanship',
    'luxury authenticity',
    'luxury innovation',
    'heritage and provenance',
    'digital authentication',
    'luxury technology',
    'sovereign luxury',
    'Shamim Forever Guides',
  ],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage('/og-faisal-orakzai.jpg', 'Shamim Forever Knowledge Library')],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-faisal-orakzai.jpg'],
  },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    type: 'CollectionPage',
    path,
    name: 'Shamim Forever Guides',
    description,
    image: '/og-faisal-orakzai.jpg',
    mainEntity: { '@id': `${absoluteUrl(path)}#library` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#library`,
    name: 'Shamim Forever Knowledge Library',
    description,
    numberOfItems: knowledgeUniverses.length,
    itemListElement: knowledgeUniverses.map((universe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: universe.title,
      description: universe.description,
      url: absoluteUrl(`/guides#${universe.slug}`),
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#learning-paths`,
    name: 'Shamim Forever learning paths',
    itemListElement: learningPaths.map((learningPath, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: learningPath.title,
      description: learningPath.description,
      url: absoluteUrl(learningPath.href),
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl(path)}#publisher`,
    name: 'Shamim Forever',
    url: absoluteUrl('/'),
    parentOrganization: organizationRef(),
    knowsAbout: ['Luxury', 'Craftsmanship', 'Authenticity', 'Heritage', 'Innovation', 'Provenance'],
  },
  breadcrumbSchema(path, 'Guides'),
]

export default function GuidesPage() {
  return (
    <SeoJsonLd schemas={schemas}>
      <main className="min-h-screen overflow-hidden bg-[#050505] text-zinc-200">
        <section className="relative border-b border-[#1b1814] px-5 pb-24 pt-36 md:px-12 md:pb-32 md:pt-48 lg:px-20">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(200,169,107,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,107,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="pointer-events-none absolute right-[-14rem] top-20 h-[36rem] w-[36rem] rounded-full bg-[#8d7348]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div>
                <p className="sf-kicker">SHAMIM FOREVER KNOWLEDGE LIBRARY</p>
                <h1 className="sf-display mt-7 max-w-5xl text-6xl md:text-[8.3rem]">
                  Guides<span className="block text-[#c9a054]">that endure.</span>
                </h1>
                <p className="mt-8 max-w-2xl font-serif text-2xl font-light leading-tight text-zinc-300 md:text-4xl">Understanding the architecture of lasting value.</p>
                <p className="mt-9 max-w-2xl text-sm font-light leading-8 tracking-wide text-zinc-400 md:text-base">
                  Shamim Forever Guides is an open global library exploring the intellectual, cultural, technical, and human foundations of luxury.
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-600">
                  Luxury should not only be experienced. It should also be understood.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="#universes" className="luxury-btn bg-[#c9a054] text-[#090806] hover:bg-[#e4c98f]">Explore guides →</a>
                  <Link href="/whitepapers" className="luxury-btn">White paper library →</Link>
                </div>
              </div>
              <div className="relative lg:pb-2">
                <div className="absolute -right-8 -top-12 font-serif text-[11rem] font-light leading-none text-[#c9a054]/10">∞</div>
                <div className="relative border border-[#3a3022] bg-[#080807]/90 p-7 backdrop-blur-sm md:p-10">
                  <p className="sf-kicker">KNOWLEDGE BEFORE CONSUMPTION</p>
                  <p className="mt-9 max-w-md font-serif text-3xl font-light leading-tight text-zinc-200 md:text-4xl">The visible object is only the final surface.</p>
                  <p className="mt-7 text-sm leading-7 text-zinc-500">Behind it may be years of technical knowledge, generations of craftsmanship, complex material choices, provenance records, authentication systems, and careful preservation.</p>
                  <div className="mt-8 border-t border-[#292218] pt-6">
                    <p className="font-mono text-xs leading-7 text-[#d5b477]">Meaning → Craft → Identity<br />Provenance → Trust → Continuity</p>
                    <p className="mt-5 text-[8px] uppercase tracking-[0.25em] text-zinc-700">A conceptual House framework</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-3">
              {[
                ['01', 'For the curious', 'A public intellectual library for deeper understanding.'],
                ['02', 'For the collector', 'Knowledge for choosing, authenticating, preserving, and caring.'],
                ['03', 'For the creator', 'The systems, materials, and decisions behind meaningful work.'],
              ].map(([number, heading, text]) => (
                <div key={number} className="bg-[#080808] p-6 md:p-8">
                  <p className="text-[9px] tracking-[0.4em] text-[#c9a054]">{number}</p>
                  <h2 className="mt-8 font-serif text-2xl font-light text-zinc-200">{heading}</h2>
                  <p className="mt-3 text-xs leading-6 text-zinc-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#1b1814] px-5 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div>
                <p className="sf-kicker">FEATURED GUIDE</p>
                <p className="mt-6 text-[9px] uppercase tracking-[0.3em] text-zinc-700">A point of view from the House</p>
              </div>
              <div className="border-l border-[#c9a054] pl-6 md:pl-10">
                <h2 className="sf-heading text-4xl md:text-6xl">What is sovereign luxury?</h2>
                <p className="mt-7 max-w-3xl text-sm leading-8 text-zinc-500 md:text-base">Luxury has traditionally been associated with rarity, craftsmanship, and exceptional quality. Sovereign Luxury introduces another dimension: the ability to preserve identity, standards, knowledge, and long-term vision without becoming entirely dependent upon temporary trends.</p>
                <Link href="/learn/luxury#sovereign-luxury-philosophy" className="mt-8 inline-flex text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Read the featured guide →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <GuidesLibrary />
          </div>
        </section>

        <section className="border-t border-[#1b1814] px-5 py-20 md:px-12 md:py-28 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-end">
            <div>
              <p className="sf-kicker">CONTINUE YOUR RESEARCH</p>
              <h2 className="sf-heading mt-4 text-4xl md:text-6xl">Ideas deserve more than headlines.</h2>
            </div>
            <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2">
              <Link href="/whitepapers" className="group bg-[#080808] p-7 transition-colors hover:bg-[#0d0c0a]">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">White papers</p>
                <p className="mt-5 font-serif text-3xl font-light text-zinc-200 group-hover:text-[#c9a054]">Long-form research and institutional publications.</p>
                <span className="mt-8 inline-flex text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Explore research →</span>
              </Link>
              <Link href="/glossary" className="group bg-[#080808] p-7 transition-colors hover:bg-[#0d0c0a]">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Glossary</p>
                <p className="mt-5 font-serif text-3xl font-light text-zinc-200 group-hover:text-[#c9a054]">The language behind the House.</p>
                <span className="mt-8 inline-flex text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Explore definitions →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SeoJsonLd>
  )
}