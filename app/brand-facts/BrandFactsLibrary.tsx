'use client'

    import { useMemo, useState } from 'react'
    import Link from 'next/link'

    type FactEntry = {
    category: string
    term: string
    description: string
    status: string
    href?: string
    }

    const statusClass: Record<string, string> = {
    OFFICIAL: 'border-[#c9a054]/35 bg-[#c9a054]/[0.06] text-[#c9a054]',
    VERIFIED: 'border-emerald-500/25 bg-emerald-500/[0.04] text-emerald-300/80',
    DEVELOPING: 'border-sky-400/25 bg-sky-400/[0.04] text-sky-200/80',
    CONCEPT: 'border-violet-400/25 bg-violet-400/[0.04] text-violet-200/80',
    }

    export default function BrandFactsLibrary({ entries }: { entries: FactEntry[] }) {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    const categories = ['All', ...Array.from(new Set(entries.map(entry => entry.category)))]
    const filtered = useMemo(() => {
      const normalized = query.trim().toLowerCase()
      return entries.filter(entry => {
        const matchesCategory = category === 'All' || entry.category === category
        const matchesQuery = !normalized || [entry.category, entry.term, entry.description, entry.status].join(' ').toLowerCase().includes(normalized)
        return matchesCategory && matchesQuery
      })
    }, [category, entries, query])

    return <div>
      <div className="grid gap-4 border border-[#1b1b1b] bg-[#080808] p-4 md:grid-cols-[1fr_auto] md:items-center">
        <label className="flex items-center gap-4 border-b border-[#252525] px-2 py-3 md:border-b-0 md:border-r md:pr-6" htmlFor="brand-facts-search"><span className="text-[#c9a054]">⌕</span><input id="brand-facts-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search brand facts, standards, or systems" className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-700" /></label>
        <div className="flex flex-wrap gap-2">{categories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} className={'border px-3 py-2 text-[8px] uppercase tracking-[0.2em] transition-colors ' + (category === item ? 'border-[#c9a054] text-[#c9a054]' : 'border-[#252525] text-zinc-600 hover:border-[#c9a054]/60 hover:text-zinc-300')}>{item}</button>)}</div>
      </div>
      <div className="mt-5 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-zinc-700"><span>{filtered.length} reference points</span><span>Brand Facts · Live index</span></div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{filtered.map(entry => <article key={entry.category + entry.term} className="border border-[#1b1b1b] bg-[#070707] p-6 transition-colors hover:border-[#c9a054]/35"><div className="flex items-start justify-between gap-5"><p className="text-[9px] uppercase tracking-[0.28em] text-[#c9a054]">{entry.category}</p><span className={'shrink-0 border px-2 py-1 text-[8px] uppercase tracking-[0.18em] ' + statusClass[entry.status]}>{entry.status}</span></div><h3 className="mt-7 text-xl font-light text-zinc-100">{entry.term}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{entry.description}</p>{entry.href && <Link href={entry.href} className="mt-5 inline-block text-[9px] uppercase tracking-[0.25em] text-[#c9a054] transition-colors hover:text-zinc-200">Read the related destination →</Link>}</article>)}</div>
      {!filtered.length && <div className="border border-dashed border-[#252525] p-10 text-center text-sm text-zinc-600">No reference point matches that search. Try a broader House term.</div>}
    </div>
    }
    