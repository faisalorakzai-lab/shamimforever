import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef } from '@/lib/seo'
import { getWhitepaper, whitepapers, whitepaperUrl } from '@/lib/whitepapers'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return whitepapers.map((paper) => ({ slug: paper.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const paper = getWhitepaper(params.slug)
  if (!paper) return { title: 'White Paper Not Found | Shamim Forever' }
  return {
    title: `${paper.title} | Shamim Forever Research`,
    description: paper.abstract,
    keywords: [...paper.keywords],
    alternates: { canonical: whitepaperUrl(paper.slug) },
    openGraph: { title: paper.title, description: paper.abstract, url: whitepaperUrl(paper.slug), type: 'article', siteName: 'Shamim Forever', images: [metadataImage(paper.coverImage, paper.title)] },
    twitter: { card: 'summary_large_image', title: paper.title, description: paper.abstract, images: [paper.coverImage] },
    robots: { index: true, follow: true },
  }
}

export default function WhitepaperDetailPage({ params }: Props) {
  const paper = getWhitepaper(params.slug)
  if (!paper) notFound()
  const url = whitepaperUrl(paper.slug)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      '@id': `${url}#scholarly-article`,
      headline: paper.title,
      name: paper.title,
      description: paper.abstract,
      url,
      image: absoluteUrl(paper.coverImage),
      author: { '@type': 'Organization', name: paper.author, '@id': `${absoluteUrl('/')}#organization` },
      publisher: organizationRef(),
      datePublished: paper.datePublished,
      version: paper.version,
      keywords: paper.keywords.join(', '),
      isPartOf: { '@type': 'CollectionPage', name: 'Shamim Forever White Paper Library', url: absoluteUrl('/whitepapers') },
      encoding: { '@type': 'MediaObject', contentUrl: absoluteUrl(paper.pdfPath), fileFormat: 'application/pdf', contentSize: '1.9 MB' },
      about: paper.keywords.map((keyword) => ({ '@type': 'Thing', name: keyword })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      '@id': `${url}#document`,
      name: paper.title,
      encodingFormat: 'application/pdf',
      contentUrl: absoluteUrl(paper.pdfPath),
      numberOfPages: paper.pages,
      datePublished: paper.datePublished,
      author: { '@type': 'Organization', name: paper.author },
    },
    breadcrumbSchema(`/whitepapers/${paper.slug}`, paper.shortTitle, [{ name: 'White Papers', path: '/whitepapers' }]),
  ]

  return (
    <SeoJsonLd schemas={schemas}>
      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <section className="relative overflow-hidden border-b border-[#1b1814] px-5 pb-16 pt-36 md:px-12 md:pb-24 md:pt-48 lg:px-20">
          <div className="pointer-events-none absolute right-[-15rem] top-12 h-[35rem] w-[35rem] rounded-full bg-[#8d7348]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <Link href="/whitepapers" className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">← White Paper Library</Link>
            <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="sf-kicker">{paper.eyebrow}</p>
                <h1 className="sf-display mt-6 max-w-5xl text-5xl md:text-7xl">{paper.shortTitle}</h1>
                <p className="mt-7 max-w-3xl font-serif text-2xl font-light leading-tight text-zinc-300 md:text-3xl">Built from love. Forged into legacy.</p>
              </div>
              <div className="border-l border-[#c9a054] pl-6 md:pl-9">
                <p className="text-sm leading-7 text-zinc-500">{paper.abstract}</p>
                <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#292218] pt-5 text-[8px] uppercase tracking-[0.2em] text-zinc-700">
                  <span>Author <b className="mt-2 block font-normal text-zinc-400">{paper.author}</b></span>
                  <span>Published <b className="mt-2 block font-normal text-zinc-400">{paper.datePublished}</b></span>
                  <span>Version <b className="mt-2 block font-normal text-zinc-400">{paper.version}</b></span>
                  <span>Identifier <b className="mt-2 block font-normal text-zinc-400">{paper.doi}</b></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <p className="sf-kicker">TABLE OF CONTENTS</p>
              <ol className="mt-6 space-y-3">
                {paper.contents.map((item, index) => <li key={item} className="flex gap-3 text-xs leading-5 text-zinc-600"><span className="text-[#c9a054]">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
              </ol>
            </aside>
            <div className="min-w-0">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="sf-kicker">READ ONLINE</p>
                  <p className="mt-3 text-xs text-zinc-600">{paper.pages} pages · {paper.readingTime} estimated reading · PDF publication</p>
                </div>
                <a href={paper.pdfPath} download className="luxury-btn">Download PDF ↗</a>
              </div>
              <div className="overflow-hidden border border-[#292218] bg-[#111] shadow-2xl">
                <iframe title={paper.title} src={`${paper.pdfPath}#view=FitH`} className="h-[72vh] min-h-[640px] w-full md:h-[92vh]" />
              </div>
              <div className="mt-10 border-l border-[#c9a054] pl-6">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Editorial note</p>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-zinc-500">This publication includes strategic, illustrative, proposed, and conceptual language. It is an institutional brand and research document, not legal, financial, tax, investment, or securities advice.</p>
              </div>
              <div className="mt-12 flex flex-wrap gap-5 border-t border-[#1b1814] pt-8">
                {paper.keywords.map((keyword) => <span key={keyword} className="text-[8px] uppercase tracking-[0.22em] text-zinc-700">{keyword}</span>)}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SeoJsonLd>
  )
}