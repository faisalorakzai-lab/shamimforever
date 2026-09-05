import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLearnEntry, LEARN_ARTICLES } from "@/lib/learn-content"

type LearnArticlePageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return LEARN_ARTICLES.map((entry) => ({ slug: entry.slug }))
}

export function generateMetadata({ params }: LearnArticlePageProps): Metadata {
  const entry = getLearnEntry(params.slug)
  if (!entry) return {}
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `https://www.shamimforever.com/learn/${entry.slug}` },
    openGraph: { title: entry.title, description: entry.summary, type: "article", url: `https://www.shamimforever.com/learn/${entry.slug}` },
  }
}

export default function LearnArticlePage({ params }: LearnArticlePageProps) {
  const entry = getLearnEntry(params.slug)
  if (!entry) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    articleSection: entry.category,
    author: { "@type": "Organization", name: "Shamim Forever" },
    publisher: { "@type": "Organization", name: "Shamim Forever", url: "https://www.shamimforever.com" },
    mainEntityOfPage: `https://www.shamimforever.com/learn/${entry.slug}`,
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-5xl px-5 pb-24 pt-36 md:px-12 md:pt-48">
        <Link href="/learn" className="text-[8px] uppercase tracking-[0.35em] text-zinc-600 transition-colors hover:text-[#c9a054]">← Back to Learn</Link>
        <div className="mt-16 max-w-4xl">
          <p className="mb-6 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">{entry.category}</p>
          <h1 className="font-serif text-5xl font-light leading-[0.98] tracking-[0.04em] text-zinc-100 md:text-8xl">{entry.title}</h1>
          <p className="mt-10 max-w-3xl text-lg font-light leading-9 text-zinc-400 md:text-xl">{entry.summary}</p>
        </div>

        <div className="mt-20 grid gap-12 border-t border-[#171717] pt-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">A note from the House</p>
            <p className="mt-5 text-xs leading-7 text-zinc-600">The Learn library is a living guide to the language and standards of Shamim Forever.</p>
          </div>
          <div className="space-y-8 text-sm font-light leading-8 text-zinc-500 md:text-base">
            <p>{entry.summary}</p>
            <p>At Shamim Forever, this idea is considered through the relationship between object, maker, and owner. The detail matters because it gives the creation a point of view; the record matters because it gives that point of view continuity.</p>
            <p>Whether you are discovering the House for the first time or caring for a creation already in your collection, this guide is an invitation to look closer—and to choose with intention.</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-[#171717] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-700">Continue exploring</p>
            <p className="mt-2 text-sm text-zinc-500">Return to the full Shamim Forever library.</p>
          </div>
          <Link href="/learn" className="inline-flex border border-[#c9a054] px-6 py-4 text-[8px] uppercase tracking-[0.35em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#050505]">Explore Learn</Link>
        </div>
      </article>
    </main>
  )
}