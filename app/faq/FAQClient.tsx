'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { allFaqItems, faqCategories, suggestedSearches, type FAQCategory, type FAQItem } from './content'

type NumberedItem = FAQItem & { number: number; category: FAQCategory }

const numberedItems: NumberedItem[] = faqCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category, number: allFaqItems.indexOf(item) + 1 })),
)

function matchesQuery(item: NumberedItem, query: string) {
  if (!query.trim()) return true
  const haystack = `${item.question} ${item.answer} ${item.category.title}`.toLowerCase()
  return haystack.includes(query.trim().toLowerCase())
}

export default function FAQClient() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredByCategory = useMemo(() => {
    return faqCategories
      .map((category) => ({
        ...category,
        items: category.items
          .map((item) => numberedItems.find((numbered) => numbered.question === item.question)!)
          .filter((item) => matchesQuery(item, query)),
      }))
      .filter((category) => activeCategory === 'all' || category.id === activeCategory)
      .filter((category) => category.items.length > 0)
  }, [activeCategory, query])

  const resultCount = filteredByCategory.reduce((count, category) => count + category.items.length, 0)

  function chooseSearch(value: string) {
    setQuery(value)
    setActiveCategory('all')
    window.setTimeout(() => document.getElementById('answers')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="grid gap-12 border-b border-[#24201a] pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="sf-kicker mb-6">Knowledge · Support · Trust</p>
          <h1 className="max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-[0.04em] text-[#f3efe7] md:text-8xl">
            Frequently<br />Asked Questions
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-500 md:text-lg">
            Answers, without compromise. Discover the standards, services and private pathways that define Shamim Forever — a Sovereign Luxury House built from love and forged into legacy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:concierge@shamimforever.com" className="luxury-btn">Contact Concierge <span aria-hidden="true">↗</span></a>
            <Link href="/our-story" className="inline-flex items-center px-4 py-3 text-[9px] uppercase tracking-[0.35em] text-zinc-500 transition-colors hover:text-[#c9a054]">Discover the House <span className="ml-2" aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <aside className="border-l border-[#24201a] pl-6 lg:pl-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a054]">Private Access</p>
          <p className="mt-5 font-serif text-3xl font-light leading-tight text-zinc-300">Clarity is part of service.</p>
          <p className="mt-5 text-sm leading-7 text-zinc-600">Search the House’s answers or choose a subject below. For matters requiring personal attention, our Concierge remains available.</p>
          <div className="mt-7 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-zinc-700"><span className="h-px w-10 bg-[#c9a054]" /> {allFaqItems.length} answers across {faqCategories.length} subjects</div>
        </aside>
      </header>

      <section aria-labelledby="faq-search" className="py-14">
        <div className="border border-[#332b1e] bg-[#0a0908] p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="sf-kicker">Find an answer</p>
              <h2 id="faq-search" className="mt-3 font-serif text-3xl font-light text-zinc-200">How may we assist you?</h2>
            </div>
            {query && <button type="button" onClick={() => setQuery('')} className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 transition-colors hover:text-[#c9a054]">Clear search</button>}
          </div>
          <label className="mt-7 flex items-center gap-4 border-b border-[#c9a054] py-3">
            <span aria-hidden="true" className="text-xl text-[#c9a054]">⌕</span>
            <span className="sr-only">Search questions</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setActiveCategory('all') }} placeholder="Search orders, authenticity, bespoke services, delivery..." className="w-full bg-transparent text-sm tracking-wide text-zinc-200 outline-none placeholder:text-zinc-700" />
          </label>
          <div className="mt-6 flex flex-wrap gap-2">
            {suggestedSearches.map((suggestion) => <button key={suggestion} type="button" onClick={() => chooseSearch(suggestion)} className="border border-[#211e19] px-3 py-2 text-left text-[10px] leading-4 tracking-wide text-zinc-600 transition-colors hover:border-[#594a2e] hover:text-[#c9a054]">{suggestion}</button>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-topics" className="border-b border-[#24201a] pb-14">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div><p className="sf-kicker">The knowledge of the House</p><h2 id="faq-topics" className="mt-3 font-serif text-3xl font-light text-zinc-200">Explore by subject</h2></div>
          <p className="hidden text-right text-[10px] uppercase tracking-[0.25em] text-zinc-700 md:block">Direct answers<br />Private standards</p>
        </div>
        <div className="grid gap-px border border-[#211e19] bg-[#211e19] sm:grid-cols-2 lg:grid-cols-3">
          <button type="button" onClick={() => { setActiveCategory('all'); setQuery('') }} className={`min-h-32 bg-[#080808] p-5 text-left transition-colors hover:bg-[#0e0c09] ${activeCategory === 'all' ? 'ring-1 ring-inset ring-[#c9a054]' : ''}`}>
            <span className="text-[10px] tracking-[0.3em] text-[#806535]">ALL</span><span className="mt-4 block font-serif text-2xl font-light text-zinc-300">Every answer</span><span className="mt-2 block text-xs leading-5 text-zinc-700">Browse the complete client knowledge hub.</span>
          </button>
          {faqCategories.map((category) => <button key={category.id} type="button" onClick={() => { setActiveCategory(category.id); setQuery(''); document.getElementById('answers')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className={`min-h-32 bg-[#080808] p-5 text-left transition-colors hover:bg-[#0e0c09] ${activeCategory === category.id ? 'ring-1 ring-inset ring-[#c9a054]' : ''}`}><span className="text-[10px] tracking-[0.3em] text-[#806535]">{category.number}</span><span className="mt-4 block font-serif text-2xl font-light text-zinc-300">{category.title}</span><span className="mt-2 block text-xs leading-5 text-zinc-700">{category.description}</span></button>)}
        </div>
      </section>

      <section id="answers" aria-labelledby="faq-answers" className="scroll-mt-8 py-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#24201a] pb-5">
          <div><p className="sf-kicker">The answers</p><h2 id="faq-answers" className="mt-3 font-serif text-4xl font-light text-zinc-200">{query ? 'Search results' : activeCategory === 'all' ? 'Frequently asked' : faqCategories.find((category) => category.id === activeCategory)?.title}</h2></div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">{resultCount} {resultCount === 1 ? 'answer' : 'answers'}{query ? ` for “${query}”` : ''}</p>
        </div>
        {resultCount === 0 ? <div className="border border-dashed border-[#332b1e] px-6 py-16 text-center"><p className="font-serif text-2xl font-light text-zinc-300">No answer found.</p><p className="mt-3 text-sm text-zinc-600">Try a broader search, or contact Concierge for personal assistance.</p><a className="mt-7 inline-flex text-[9px] uppercase tracking-[0.35em] text-[#c9a054]" href="mailto:concierge@shamimforever.com">Contact Concierge ↗</a></div> : <div className="space-y-12">{filteredByCategory.map((category) => <div key={category.id} id={category.id} className="scroll-mt-8"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[10px] tracking-[0.35em] text-[#806535]">{category.number}</p><h3 className="mt-2 font-serif text-3xl font-light text-zinc-200">{category.title}</h3></div><span className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">{category.items.length} answers</span></div><div className="space-y-2">{category.items.map((item) => <details key={item.question} className="group border border-[#1d1b18] bg-[#080808] transition-colors open:border-[#594a2e]"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-sm leading-6 text-zinc-300 marker:hidden md:px-6"><span><span className="mr-3 text-[10px] tracking-[0.2em] text-[#806535]">{String(item.number).padStart(2, '0')}</span>{item.question}</span><span aria-hidden="true" className="shrink-0 text-xl font-light text-[#c9a054] transition-transform group-open:rotate-45">+</span></summary><div className="border-t border-[#1d1b18] px-5 pb-6 pt-4 md:px-6"><p className="max-w-3xl text-sm leading-8 text-zinc-500">{item.answer}</p></div></details>)}</div></div>)}</div>}
      </section>

      <section className="grid gap-10 border-t border-[#24201a] py-14 md:grid-cols-[1fr_auto] md:items-end">
        <div><p className="sf-kicker">Still seeking an answer?</p><h2 className="mt-4 max-w-xl font-serif text-4xl font-light leading-tight text-zinc-200">Some questions require more than a standard response.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">Our Concierge can provide personal assistance for private appointments, bespoke commissions, collections, delivery and client services.</p></div>
        <a href="mailto:concierge@shamimforever.com" className="luxury-btn whitespace-nowrap">Private Concierge ↗</a>
      </section>

      <nav aria-label="Continue learning" className="border-t border-[#24201a] py-10">
        <p className="sf-kicker mb-5">Continue with the House</p>
        <div className="flex flex-wrap gap-x-7 gap-y-4 text-[10px] uppercase tracking-[0.25em] text-zinc-600">{[
          ['/learn/the-house', 'The House'], ['/shop', 'Collections'], ['/bespoke', 'Bespoke'], ['/learn/authenticity', 'Authenticity'], ['/concierge', 'Concierge'], ['/boutiques', 'Boutiques'], ['/delivery', 'Private Delivery'], ['/care', 'Care'], ['/guides', 'Guides'], ['/whitepapers', 'White Papers'], ['/glossary', 'Glossary'], ['/learn/sovereign-infrastructure', 'Sovereign Infrastructure'],
        ].map(([href, label]) => <Link key={href} href={href} className="transition-colors hover:text-[#c9a054]">{label} <span aria-hidden="true">↗</span></Link>)}</div>
      </nav>
    </div>
  )
}
