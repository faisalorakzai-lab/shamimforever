import type { Metadata } from "next"
import Link from "next/link"
import { LEARN_CATEGORIES, LEARN_ENTRIES } from "@/lib/learn-content"

export const metadata: Metadata = {
  title: "Learn",
  description: "Explore the ideas, craftsmanship, technology, heritage, and private services behind Shamim Forever.",
}

const categoryId = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export default function LearnPage() {
  const featured = LEARN_ENTRIES.filter((entry) => !entry.href).slice(0, 6)

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200">
      <section className="border-b border-[#171717] px-5 pb-20 pt-36 md:px-12 lg:px-20 md:pt-48">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="mb-6 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The Shamim Forever Library · 01</p>
              <h1 className="max-w-4xl font-serif text-6xl font-light leading-[0.9] tracking-[0.06em] text-zinc-100 md:text-9xl">Learn</h1>
              <p className="mt-10 max-w-2xl text-sm font-light leading-8 tracking-wide text-zinc-500 md:text-base">
                A living documentation of the House: its story, people, craft, fragrance, identity, technology, and the ideas that make luxury last.
              </p>
            </div>
            <div className="border-l border-[#292218] pl-6 lg:mb-2">
              <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">A way into the House</p>
              <p className="mt-4 font-serif text-2xl font-light leading-snug text-zinc-300">Read slowly. Return often. The details are where the identity lives.</p>
              <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-zinc-700">16 chapters · 100+ entries</p>
            </div>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden border border-[#171717] bg-[#171717] sm:grid-cols-3">
            {[
              ["01", "Understand", "The House, its language, and its point of view."],
              ["02", "Go deeper", "Craft, fragrance, provenance, and digital identity."],
              ["03", "Carry forward", "Glossary, care, access, and legacy."],
            ].map(([number, title, text]) => (
              <div key={number} className="bg-[#080808] p-6 md:p-7">
                <p className="text-[9px] tracking-[0.4em] text-[#c9a054]">{number}</p>
                <h2 className="mt-8 font-serif text-2xl font-light text-zinc-200">{title}</h2>
                <p className="mt-3 text-xs leading-6 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-12 lg:px-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-5 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">On this library</p>
            <nav className="grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
              {LEARN_CATEGORIES.map((category, index) => (
                <a key={category} href={`#${categoryId(category)}`} className="text-[10px] leading-5 text-zinc-600 transition-colors hover:text-[#c9a054]">
                  <span className="mr-2 text-[8px] text-zinc-800">{String(index + 1).padStart(2, "0")}</span>{category}
                </a>
              ))}
            </nav>
          </aside>
          <div className="min-w-0">
            <div className="mb-20 border-b border-[#171717] pb-8">
              <p className="mb-3 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Begin here</p>
              <div className="grid gap-px overflow-hidden border border-[#171717] bg-[#171717] md:grid-cols-2 lg:grid-cols-3">
                {featured.map((entry) => (
                  <Link key={entry.slug} href={`/learn/${entry.slug}`} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0d0d]">
                    <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-700">Featured reading</p>
                    <h2 className="mt-8 font-serif text-2xl font-light leading-tight text-zinc-200 transition-colors group-hover:text-[#c9a054]">{entry.title}</h2>
                    <p className="mt-4 text-xs leading-6 text-zinc-600">{entry.summary}</p>
                    <span className="mt-7 inline-flex text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">Read article →</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-20">
              {LEARN_CATEGORIES.map((category) => {
                const entries = LEARN_ENTRIES.filter((entry) => entry.category === category)
                return (
                  <section key={category} id={categoryId(category)} className="scroll-mt-24">
                    <div className="mb-8 flex items-end justify-between gap-6 border-b border-[#171717] pb-5">
                      <div>
                        <p className="mb-3 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Learn / {String(LEARN_CATEGORIES.indexOf(category) + 1).padStart(2, "0")}</p>
                        <h2 className="font-serif text-3xl font-light tracking-wide text-zinc-100 md:text-4xl">{category}</h2>
                      </div>
                      <span className="hidden text-[8px] uppercase tracking-[0.3em] text-zinc-700 md:block">{entries.length} entries</span>
                    </div>
                    <div className="divide-y divide-[#171717] border-y border-[#171717]">
                      {entries.map((entry, index) => {
                        const href = entry.href ?? `/learn/${entry.slug}`
                        return (
                          <Link key={entry.slug} href={href} className="group grid gap-4 py-6 transition-colors hover:bg-[#080808] md:grid-cols-[44px_1fr_1.15fr_auto] md:items-center md:px-5">
                            <span className="text-[9px] tracking-[0.3em] text-zinc-800">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="font-serif text-xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{entry.title}</h3>
                            <p className="text-xs leading-6 text-zinc-600">{entry.summary}</p>
                            <span className="text-[8px] uppercase tracking-[0.25em] text-[#c9a054]">Open →</span>
                          </Link>
                        )
                      })}
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}