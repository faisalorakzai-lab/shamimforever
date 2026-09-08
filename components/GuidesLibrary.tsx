'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { knowledgeUniverses, learningPaths } from '@/lib/guides-content'

const filters = ['All', 'Guide', 'Research', 'Framework', 'Essay'] as const

export default function GuidesLibrary() {
  const [query, setQuery] = useState('')
  const [format, setFormat] = useState<(typeof filters)[number]>('All')

  const visibleUniverses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return knowledgeUniverses.filter((universe) => {
      const matchesFormat = format === 'All' || universe.formats.includes(format)
      const searchable = [universe.title, universe.strapline, universe.description, ...universe.topics].join(' ').toLowerCase()
      return matchesFormat && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [format, query])

  return (
    <div className="space-y-24">
      <section id="universes" className="scroll-mt-24">
        <div className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="sf-kicker">THE KNOWLEDGE ARCHITECTURE</p>
            <h2 className="sf-heading mt-3 text-4xl md:text-6xl">Ten knowledge universes.</h2>
          </div>
          <p className="max-w-sm text-xs leading-6 text-zinc-500">A living library for collectors, creators, researchers, technologists, and anyone who believes meaningful things deserve deeper understanding.</p>
        </div>

        <div className="border-y border-[#292218] py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex min-w-0 items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-[#c9a054] lg:max-w-md lg:flex-1">
              <span className="shrink-0">Search the library</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Guides, concepts, research..."
                aria-label="Search the Shamim Forever knowledge library"
                className="min-w-0 flex-1 border-b border-[#3c3223] bg-transparent px-1 py-2 text-xs font-normal normal-case tracking-normal text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-[#c9a054]"
              />
            </label>
            <div className="flex flex-wrap gap-2" aria-label="Filter the library by format">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFormat(item)}
                  className={`border px-3 py-2 text-[8px] uppercase tracking-[0.28em] transition-colors ${format === item ? 'border-[#c9a054] bg-[#c9a054] text-[#080706]' : 'border-[#292218] text-zinc-600 hover:border-[#c9a054] hover:text-[#c9a054]'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-2">
          {visibleUniverses.map((universe) => (
            <article id={universe.slug} key={universe.slug} className="group bg-[#080808] p-7 transition-colors hover:bg-[#0d0c0a] md:p-9">
              <div className="flex items-start justify-between gap-5">
                <span className="text-[9px] tracking-[0.3em] text-[#c9a054]">{universe.number}</span>
                <span className="text-[8px] uppercase tracking-[0.28em] text-zinc-700">{universe.formats.join(' · ')}</span>
              </div>
              <h3 className="mt-12 font-serif text-3xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054] md:text-4xl">{universe.title}</h3>
              <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#c9a054]">{universe.strapline}</p>
              <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500">{universe.description}</p>
              <div className="mt-7 border-t border-[#1b1814] pt-5">
                <p className="mb-3 text-[8px] uppercase tracking-[0.35em] text-zinc-700">Explore topics</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {universe.topics.map((topic) => <span key={topic} className="text-xs text-zinc-600">{topic}</span>)}
                </div>
              </div>
              <Link href={universe.href} className="mt-8 inline-flex text-[9px] uppercase tracking-[0.3em] text-[#c9a054] transition-colors hover:text-zinc-200">
                Enter this universe <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
          ))}
        </div>
        {visibleUniverses.length === 0 && (
          <div className="border border-[#292218] bg-[#080808] px-6 py-16 text-center">
            <p className="sf-kicker">NO MATCHING ENTRIES</p>
            <p className="mt-4 font-serif text-3xl font-light text-zinc-300">Try another concept.</p>
            <button type="button" onClick={() => { setQuery(''); setFormat('All') }} className="mt-7 text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Reset the library →</button>
          </div>
        )}
      </section>

      <section id="paths" className="scroll-mt-24">
        <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="sf-kicker">LEARNING PATHS</p>
            <h2 className="sf-heading mt-3 text-4xl md:text-6xl">Choose your depth.</h2>
          </div>
          <p className="max-w-sm text-xs leading-6 text-zinc-600">Ethereum-style routes through the library, designed to turn curiosity into a sustained practice of understanding.</p>
        </div>
        <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] lg:grid-cols-5">
          {learningPaths.map((path) => (
            <Link key={path.number} href={path.href} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0c0a] md:p-7">
              <p className="text-[8px] tracking-[0.35em] text-[#c9a054]">{path.number}</p>
              <h3 className="mt-10 font-serif text-3xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{path.title}</h3>
              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-zinc-600">{path.subtitle}</p>
              <p className="mt-6 text-xs leading-6 text-zinc-500">{path.description}</p>
              <div className="mt-6 border-t border-[#1b1814] pt-4">
                <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-700">{path.time} estimated reading</p>
                <p className="mt-3 text-[10px] leading-5 text-zinc-600">{path.topics.join(' · ')}</p>
              </div>
              <span className="mt-7 inline-flex text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Begin path →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}