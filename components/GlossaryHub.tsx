'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { glossaryCategories, glossaryTerms } from '@/lib/glossary-content'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const featuredSlugs = ['bespoke', 'authenticity', 'heritage', 'sovereignty']

export default function GlossaryHub() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLetter, setActiveLetter] = useState('All')

  const filteredTerms = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return glossaryTerms.filter((entry) => {
      const matchesCategory = activeCategory === 'All' || entry.category === activeCategory
      const matchesLetter = activeLetter === 'All' || entry.term.charAt(0).toUpperCase() === activeLetter
      const searchable = [entry.term, entry.category, entry.shortDefinition, entry.definition].join(' ').toLowerCase()
      return matchesCategory && matchesLetter && (!needle || searchable.includes(needle))
    })
  }, [activeCategory, activeLetter, query])

  const availableLetters = useMemo(() => new Set(glossaryTerms.map((entry) => entry.term.charAt(0).toUpperCase())), [])
  const featuredTerms = featuredSlugs.map((slug) => glossaryTerms.find((entry) => entry.slug === slug)).filter(Boolean)

  const resetFilters = () => {
    setQuery('')
    setActiveCategory('All')
    setActiveLetter('All')
  }

  return (
    <div className="bg-[#050505] text-zinc-200">
      <section className="relative overflow-hidden border-b border-[#1b1814] px-5 pb-20 pt-36 md:px-12 md:pb-28 md:pt-48 lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(200,169,107,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,107,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute -right-40 top-20 select-none font-serif text-[7rem] font-light leading-none text-[#c9a054]/[0.035] md:text-[12rem]">
          HERITAGE<br />CRAFT<br />IDENTITY
        </div>
        <div className="relative mx-auto max-w-7xl">
          <p className="sf-kicker">THE SHAMIM FOREVER KNOWLEDGE ARCHIVE</p>
          <h1 className="sf-display mt-7 max-w-5xl text-6xl md:text-[8rem]">The Sovereign <span className="text-[#c9a054]">Lexicon.</span></h1>
          <p className="mt-9 max-w-3xl font-serif text-2xl font-light leading-tight text-zinc-300 md:text-4xl">A living reference library for the language of luxury, craftsmanship, heritage, authenticity, private service, innovation, and sovereign infrastructure.</p>
          <p className="mt-7 max-w-2xl text-sm leading-8 text-zinc-500 md:text-base">The Shamim Forever Glossary is a structured knowledge archive created to define the concepts, terminology, and principles that shape the House. This is not simply a dictionary. It is the language through which the House explains its world.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#lexicon" className="luxury-btn bg-[#c9a054] text-[#090806] hover:bg-[#e4c98f]">Explore the Lexicon ↓</a>
            <a href="#search" className="luxury-btn">Search a term</a>
          </div>
          <div className="mt-20 grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-4">
            {[
              ['A–Z', 'A living reference archive'],
              [String(glossaryCategories.length), 'Knowledge categories'],
              [`${glossaryTerms.length}+`, 'Foundational launch terms'],
              ['Evolving', 'Continuously expanded'],
            ].map(([value, label]) => (
              <div key={label} className="bg-[#080808] p-6 md:p-8">
                <p className="font-serif text-3xl font-light text-[#c9a054] md:text-4xl">{value}</p>
                <p className="mt-3 text-[8px] uppercase tracking-[0.25em] text-zinc-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1b1814] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="sf-kicker">THE LANGUAGE OF THE HOUSE</p></div>
          <div className="border-l border-[#c9a054] pl-6 md:pl-10">
            <h2 className="sf-heading text-4xl md:text-6xl">Words are part of the architecture.</h2>
            <p className="mt-7 max-w-3xl text-sm leading-8 text-zinc-500 md:text-base">Every institution develops a language through which it describes its values, systems, products, and relationships. At Shamim Forever, words such as heritage, craft, authenticity, bespoke, identity, continuity, legacy, and sovereignty are not merely decorative language. They represent concepts used throughout the House’s evolving ecosystem.</p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-zinc-600">The Sovereign Lexicon provides a central reference point for understanding those concepts while keeping definitions distinct from the process-led work of Guides and the deeper analysis of White Papers.</p>
          </div>
        </div>
      </section>

      <section id="search" className="scroll-mt-24 px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="sf-kicker">FIND A TERM</p><h2 className="sf-heading mt-3 text-4xl md:text-6xl">Search the Lexicon.</h2></div>
            <p className="max-w-sm text-xs leading-6 text-zinc-600">Search names, definitions, and contextual language across the current launch archive.</p>
          </div>
          <div className="border-y border-[#292218] py-5">
            <label className="flex items-center gap-4">
              <span className="shrink-0 text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">Search</span>
              <input
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setActiveLetter('All') }}
                placeholder="Luxury, craftsmanship, heritage, authenticity..."
                aria-label="Search the Sovereign Lexicon"
                className="luxury-input text-sm placeholder:normal-case placeholder:tracking-normal"
              />
            </label>
          </div>
          <div className="mt-8 overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-1" aria-label="Filter terms alphabetically">
              <button type="button" onClick={() => setActiveLetter('All')} className={`px-3 py-2 text-[9px] uppercase tracking-[0.25em] ${activeLetter === 'All' ? 'text-[#c9a054]' : 'text-zinc-700 hover:text-zinc-300'}`}>All</button>
              {alphabet.map((letter) => (
                <button key={letter} type="button" disabled={!availableLetters.has(letter)} onClick={() => setActiveLetter(letter)} className={`min-w-8 px-2 py-2 text-sm ${activeLetter === letter ? 'text-[#c9a054]' : availableLetters.has(letter) ? 'text-zinc-600 hover:text-zinc-200' : 'cursor-not-allowed text-zinc-900'}`}>{letter}</button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveCategory('All')} className={`border px-3 py-2 text-[8px] uppercase tracking-[0.25em] ${activeCategory === 'All' ? 'border-[#c9a054] bg-[#c9a054] text-[#080706]' : 'border-[#292218] text-zinc-600 hover:border-[#c9a054] hover:text-[#c9a054]'}`}>All categories</button>
            {glossaryCategories.map((category) => (
              <button key={category.slug} type="button" onClick={() => setActiveCategory(category.title)} className={`border px-3 py-2 text-[8px] uppercase tracking-[0.2em] ${activeCategory === category.title ? 'border-[#c9a054] bg-[#c9a054] text-[#080706]' : 'border-[#292218] text-zinc-600 hover:border-[#c9a054] hover:text-[#c9a054]'}`}>{category.title}</button>
            ))}
          </div>
          <div id="lexicon" className="mt-12 scroll-mt-24">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">{filteredTerms.length} entries in view</p>
              {(query || activeCategory !== 'All' || activeLetter !== 'All') && <button type="button" onClick={resetFilters} className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Reset filters ×</button>}
            </div>
            <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2 lg:grid-cols-3">
              {filteredTerms.map((entry) => (
                <Link key={entry.slug} href={`/glossary/${entry.slug}`} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0c0a] md:p-7">
                  <div className="flex items-start justify-between gap-4"><span className="text-[8px] uppercase tracking-[0.25em] text-[#c9a054]">{entry.category}</span><span className="text-[9px] text-zinc-800">{entry.term.charAt(0)}</span></div>
                  <h3 className="mt-8 font-serif text-3xl font-light text-zinc-200 group-hover:text-[#c9a054]">{entry.term}</h3>
                  <p className="mt-4 text-xs leading-6 text-zinc-600">{entry.shortDefinition}</p>
                  <span className="mt-7 inline-flex text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">View full definition →</span>
                </Link>
              ))}
            </div>
            {filteredTerms.length === 0 && <div className="border border-[#292218] px-6 py-16 text-center"><p className="sf-kicker">NO MATCHING TERMS</p><p className="mt-4 font-serif text-3xl font-light text-zinc-300">Try another expression.</p><button type="button" onClick={resetFilters} className="mt-7 text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Reset the Lexicon →</button></div>}
          </div>
        </div>
      </section>

      <section className="border-y border-[#1b1814] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9"><p className="sf-kicker">EXPLORE BY CATEGORY</p><h2 className="sf-heading mt-3 text-4xl md:text-6xl">Twenty fields of meaning.</h2></div>
          <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-2 lg:grid-cols-4">
            {glossaryCategories.map((category, index) => (
              <button key={category.slug} type="button" onClick={() => { setActiveCategory(category.title); setActiveLetter('All'); document.getElementById('lexicon')?.scrollIntoView({ behavior: 'smooth' }) }} className="group bg-[#080808] p-6 text-left transition-colors hover:bg-[#0d0c0a] md:p-7">
                <span className="text-[9px] tracking-[0.3em] text-[#c9a054]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-7 font-serif text-2xl font-light text-zinc-200 group-hover:text-[#c9a054]">{category.title}</h3>
                <p className="mt-3 text-xs leading-6 text-zinc-600">{category.description}</p>
                <span className="mt-6 block text-[8px] uppercase tracking-[0.25em] text-zinc-800 group-hover:text-[#c9a054]">Browse category →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="sf-kicker">FOUNDATIONAL TERMS</p><h2 className="sf-heading mt-3 text-4xl md:text-6xl">Begin with the essential.</h2></div><Link href="#search" className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">View all terms →</Link></div>
          <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-2 lg:grid-cols-4">
            {featuredTerms.map((entry) => entry && <Link key={entry.slug} href={`/glossary/${entry.slug}`} className="group bg-[#080808] p-7 transition-colors hover:bg-[#0d0c0a] md:p-8"><p className="text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">{entry.category}</p><h3 className="mt-8 font-serif text-3xl font-light text-zinc-200 group-hover:text-[#c9a054]">{entry.term}</h3><p className="mt-5 text-xs leading-6 text-zinc-600">{entry.shortDefinition}</p><span className="mt-8 inline-flex text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">Explore →</span></Link>)}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1b1814] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div><p className="sf-kicker">RELATED KNOWLEDGE</p><h2 className="sf-heading mt-4 text-4xl md:text-6xl">Definitions are a beginning.</h2><p className="mt-7 max-w-xl text-sm leading-8 text-zinc-500">The Lexicon defines concepts. Guides explain subjects and processes. White Papers present deeper research, frameworks, and institutional thinking.</p></div>
          <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2">
            {[
              ['Guides', 'Practical explanations and structured learning.', '/guides'],
              ['White Papers', 'Research, frameworks, and institutional thinking.', '/whitepapers'],
              ['Authenticity', 'Understanding trust, provenance, and verification.', '/learn/authenticity'],
              ['Innovation', 'Exploring technology and the future.', '/learn/innovation'],
              ['Sovereign Infrastructure', 'Systems supporting resilience and continuity.', '/learn/sovereign-infrastructure'],
              ['Our Story', 'The memory and direction of the House.', '/our-story'],
            ].map(([label, text, href]) => <Link key={label} href={href} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0c0a]"><p className="text-[9px] uppercase tracking-[0.28em] text-[#c9a054]">{label}</p><p className="mt-4 text-xs leading-6 text-zinc-600 group-hover:text-zinc-400">{text}</p><span className="mt-6 block text-[8px] uppercase tracking-[0.25em] text-zinc-800 group-hover:text-[#c9a054]">Explore →</span></Link>)}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1b1814] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="sf-kicker">KNOWLEDGE GOVERNANCE</p><h2 className="sf-heading mt-4 text-4xl md:text-6xl">An evolving editorial reference.</h2><p className="mt-7 text-sm leading-8 text-zinc-500">Entries may be created, reviewed, expanded, corrected, and updated as knowledge and institutional terminology evolve.</p></div>
          <div className="space-y-4">
            <div className="border-y border-[#1b1814] py-6"><p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Editorial policy</p><p className="mt-4 text-sm leading-7 text-zinc-600">Historical, technical, scientific, legal, and cultural information should be supported by appropriate sources. House-specific context is identified as context, not universal fact.</p></div>
            <div className="border-b border-[#1b1814] pb-6"><p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Update history</p><p className="mt-4 text-sm leading-7 text-zinc-600">Initial launch archive · September 2026. Entries will be reviewed and expanded as the knowledge ecosystem develops.</p></div>
            <div className="border-b border-[#1b1814] pb-6"><p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Editorial notice</p><p className="mt-4 text-sm leading-7 text-zinc-600">Glossary entries are educational and informational. Contextual definitions specific to the Shamim Forever ecosystem should not be interpreted as legal, financial, technical, or professional advice unless explicitly stated.</p></div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#1b1814] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <p className="sf-kicker">FREQUENTLY ASKED QUESTIONS</p>
          <div className="mt-8 divide-y divide-[#1b1814] border-y border-[#1b1814]">
            {[
              ['What is The Sovereign Lexicon?', 'The Sovereign Lexicon is Shamim Forever’s structured reference library for concepts related to luxury, craftsmanship, heritage, authenticity, private service, innovation, and infrastructure.'],
              ['Is the Glossary a dictionary?', 'It functions as a specialised knowledge reference rather than a general dictionary. Definitions include context, relationships, and the way a term is understood within the House.'],
              ['How often is the Glossary updated?', 'Entries may be reviewed and expanded as the knowledge archive develops. Each entry displays its last reviewed date.'],
              ['What is the difference between the Glossary and Guides?', 'The Glossary defines concepts. Guides explain processes and subjects in greater depth.'],
              ['What is the difference between the Glossary and White Papers?', 'Glossary entries provide definitions and context, while White Papers present deeper research, frameworks, and analysis.'],
            ].map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl font-light text-zinc-300 group-open:text-[#c9a054]"><span>{question}</span><span className="text-xl font-sans font-light text-[#c9a054]">+</span></summary><p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-600">{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1b1814] px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="sf-kicker">A LANGUAGE BUILT FOR CONTINUITY</p>
          <h2 className="sf-heading mt-5 text-5xl md:text-7xl">Knowledge becomes more powerful when it is structured, shared, and preserved.</h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-zinc-500">The Sovereign Lexicon is an evolving archive for understanding the language, concepts, and ideas that shape the world of Shamim Forever.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4"><a href="#search" className="luxury-btn bg-[#c9a054] text-[#090806] hover:bg-[#e4c98f]">Explore the Glossary ↓</a><Link href="/guides" className="luxury-btn">View Guides →</Link></div>
        </div>
      </section>
    </div>
  )
}