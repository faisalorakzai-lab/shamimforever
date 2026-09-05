import type { Metadata } from "next"
import Link from "next/link"
import { LEARN_CATEGORIES, LEARN_ENTRIES } from "@/lib/learn-content"

export const metadata: Metadata = {
  title: "Learn",
  description: "Explore the ideas, craftsmanship, technology, heritage, and private services behind Shamim Forever.",
}

const categoryId = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200">
      <section className="border-b border-[#171717] px-5 pb-20 pt-36 md:px-12 lg:px-20 md:pt-48">
        <p className="mb-6 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The Shamim Forever Library</p>
        <h1 className="max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-[0.08em] text-zinc-100 md:text-8xl">
          Learn
        </h1>
        <p className="mt-8 max-w-2xl text-sm font-light leading-8 tracking-wide text-zinc-500 md:text-base">
          A considered guide to the House: its story, people, craft, fragrance, identity, technology, and the ideas that make luxury last.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {LEARN_CATEGORIES.map((category) => (
            <a key={category} href={`#${categoryId(category)}`} className="border border-[#242018] px-3 py-2 text-[8px] uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:border-[#c9a054] hover:text-[#c9a054]">
              {category}
            </a>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-12 lg:px-20 md:py-24">
        <div className="mx-auto max-w-7xl space-y-20">
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
                <div className="grid gap-px overflow-hidden border border-[#171717] bg-[#171717] md:grid-cols-2 lg:grid-cols-3">
                  {entries.map((entry) => {
                    const href = entry.href ?? `/learn/${entry.slug}`
                    return (
                      <Link key={entry.slug} href={href} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0d0d] md:p-7">
                        <p className="mb-8 text-[8px] uppercase tracking-[0.3em] text-zinc-700">Read the guide</p>
                        <h3 className="max-w-xs font-serif text-2xl font-light leading-tight text-zinc-200 transition-colors group-hover:text-[#c9a054]">{entry.title}</h3>
                        <p className="mt-4 text-xs font-light leading-6 text-zinc-600">{entry.summary}</p>
                        <span className="mt-8 inline-flex text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">Explore →</span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}