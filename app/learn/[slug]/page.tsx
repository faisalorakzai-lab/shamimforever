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
  const categoryEntries = LEARN_ARTICLES.filter((article) => article.category === entry.category)
  const related = categoryEntries.filter((article) => article.slug !== entry.slug).slice(0, 3)
  const categoryId = entry.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

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
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-36 md:px-12 md:pt-48 lg:grid-cols-[190px_1fr_180px]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <Link href="/learn" className="text-[8px] uppercase tracking-[0.35em] text-zinc-600 transition-colors hover:text-[#c9a054]">← All Learn</Link>
            <p className="mt-12 text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">{entry.category}</p>
            <nav className="mt-5 space-y-3 border-l border-[#242018] pl-4">
              {categoryEntries.map((article) => (
                <Link key={article.slug} href={article.href ?? `/learn/${article.slug}`} className={`block text-[10px] leading-5 transition-colors ${article.slug === entry.slug ? "text-[#c9a054]" : "text-zinc-700 hover:text-zinc-300"}`}>
                  {article.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="mb-10 flex flex-wrap items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-zinc-700">
            <Link href="/learn" className="hover:text-[#c9a054]">Learn</Link>
            <span>/</span>
            <a href={`/learn#${categoryId}`} className="hover:text-[#c9a054]">{entry.category}</a>
          </div>
          <div className="max-w-4xl">
            <p className="mb-6 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Field note · {entry.category}</p>
            <h1 className="font-serif text-5xl font-light leading-[0.98] tracking-[0.04em] text-zinc-100 md:text-8xl">{entry.title}</h1>
            <p className="mt-10 max-w-3xl text-lg font-light leading-9 text-zinc-400 md:text-xl">{entry.summary}</p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-[#242018] bg-[#242018] sm:grid-cols-3">
            {[
              ["Read", "A considered guide"],
              ["Chapter", entry.category],
              ["House view", "Intention over noise"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#080808] p-5">
                <p className="text-[8px] uppercase tracking-[0.35em] text-[#c9a054]">{label}</p>
                <p className="mt-3 text-xs leading-5 text-zinc-500">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 space-y-14 border-t border-[#171717] pt-12 text-sm font-light leading-8 text-zinc-500 md:text-base">
            <section id="definition" className="scroll-mt-24">
              <p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">01 · The idea</p>
              <h2 className="mb-5 font-serif text-3xl font-light text-zinc-200 md:text-4xl">A working definition</h2>
              <p>{entry.summary}</p>
            </section>
            <section id="why-it-matters" className="scroll-mt-24">
              <p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">02 · Why it matters</p>
              <h2 className="mb-5 font-serif text-3xl font-light text-zinc-200 md:text-4xl">Beyond the object</h2>
              <p>Luxury becomes lasting when the object, the maker, and the owner remain connected. The detail matters because it gives the creation a point of view; the record matters because it gives that point of view continuity.</p>
              <p className="mt-6">For Shamim Forever, this is not a decorative layer. It shapes how a creation is designed, presented, verified, cared for, and remembered.</p>
            </section>
            <section id="house-view" className="scroll-mt-24">
              <p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">03 · The House view</p>
              <h2 className="mb-5 font-serif text-3xl font-light text-zinc-200 md:text-4xl">Intention over noise</h2>
              <p>The Shamim Forever standard is a long horizon: choose materials with care, make the experience feel personal, preserve provenance, and leave room for the creation to gather meaning over time.</p>
              <div className="mt-8 border-l border-[#c9a054] pl-6 text-zinc-400">
                <p>“The best details do not ask for attention. They reward it.”</p>
              </div>
            </section>
            <section id="carry-forward" className="scroll-mt-24">
              <p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">04 · Carry forward</p>
              <h2 className="mb-5 font-serif text-3xl font-light text-zinc-200 md:text-4xl">Questions worth keeping</h2>
              <ul className="space-y-4 border-y border-[#171717] py-6 text-zinc-500">
                <li className="flex gap-4"><span className="text-[#c9a054]">◆</span><span>What part of this creation should remain true across time?</span></li>
                <li className="flex gap-4"><span className="text-[#c9a054]">◆</span><span>Which details make the experience feel distinctly yours?</span></li>
                <li className="flex gap-4"><span className="text-[#c9a054]">◆</span><span>How should its story be cared for and carried forward?</span></li>
              </ul>
            </section>
          </div>

          {related.length > 0 && (
            <section className="mt-20 border-t border-[#171717] pt-10">
              <p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Continue in {entry.category}</p>
              <div className="mt-6 grid gap-px border border-[#171717] bg-[#171717] sm:grid-cols-3">
                {related.map((article) => (
                  <Link key={article.slug} href={article.href ?? `/learn/${article.slug}`} className="group bg-[#080808] p-5 transition-colors hover:bg-[#0d0d0d]">
                    <h2 className="font-serif text-xl font-light leading-tight text-zinc-300 group-hover:text-[#c9a054]">{article.title}</h2>
                    <p className="mt-4 text-xs leading-6 text-zinc-600">{article.summary}</p>
                    <span className="mt-5 inline-block text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">Read →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28 border-l border-[#242018] pl-5">
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">On this page</p>
            <nav className="mt-5 space-y-4">
              {[["definition", "The idea"], ["why-it-matters", "Why it matters"], ["house-view", "The House view"], ["carry-forward", "Carry forward"]].map(([id, label]) => (
                <a key={id} href={`#${id}`} className="block text-[10px] text-zinc-700 transition-colors hover:text-zinc-300">{label}</a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </main>
  )
}