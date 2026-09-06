'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const

type LocationStatus = 'headquarters' | 'private-experience' | 'development' | 'future-exploration'

type Location = {
  id: string
  num: string
  city: string
  country: string
  flag: string
  region: string
  title: string
  description: string
  status: LocationStatus
  accent: string
  address?: string[]
  functions?: string[]
}

const STATUS_META: Record<LocationStatus, { label: string; symbol: string; description: string; className: string }> = {
  headquarters: {
    label: 'Headquarters',
    symbol: '●',
    description: 'Official administrative center.',
    className: 'text-[#c9a054] border-[#c9a054]/35',
  },
  'private-experience': {
    label: 'Private Experience',
    symbol: '◇',
    description: 'Available through appointment or invitation.',
    className: 'text-sky-300/70 border-sky-300/20',
  },
  development: {
    label: 'Development',
    symbol: '○',
    description: 'A location under strategic development.',
    className: 'text-amber-300/70 border-amber-300/20',
  },
  'future-exploration': {
    label: 'Future Exploration',
    symbol: '□',
    description: 'A market being considered by the House.',
    className: 'text-zinc-400 border-zinc-700',
  },
}

const LOCATIONS: Location[] = [
  {
    id: 'hq-puteaux',
    num: '01',
    city: 'Puteaux',
    country: 'France',
    flag: '🇫🇷',
    region: 'Paris La Défense',
    title: 'Shamim Forever Global Headquarters',
    description: "The administrative and strategic center of Shamim Forever. From Puteaux, the House coordinates its international vision, brand development, strategic direction, and future global expansion. This is the House's verified headquarters; no other boutique address is announced unless officially confirmed.",
    status: 'headquarters',
    accent: 'from-[#c9a054]/10',
    address: ['Shamim Forever', '77 Esplanade du Général de Gaulle', '92800 Puteaux, Hauts-de-Seine', 'Paris La Défense, France'],
    functions: ['Global Brand Strategy', 'Executive Leadership', 'International Development', 'Strategic Partnerships', 'Brand Governance', 'Digital Infrastructure', 'Future Boutique Planning'],
  },
  {
    id: 'private-experiences',
    num: '02',
    city: 'By appointment',
    country: 'Global',
    flag: '🔒',
    region: 'Private Experience Network',
    title: 'The House, By Appointment',
    description: 'Certain future Shamim Forever experiences may operate through private appointments and concierge coordination. Availability, format, and location are confirmed directly by the House.',
    status: 'private-experience',
    accent: 'from-sky-300/[0.04]',
  },
  {
    id: 'future-network',
    num: '03',
    city: 'International',
    country: 'Global',
    flag: '🌍',
    region: 'Future House Network',
    title: 'A Global Vision',
    description: 'Shamim Forever is exploring a long-term international presence across carefully considered cultural, commercial, and luxury destinations. Future locations will be announced officially by the House.',
    status: 'future-exploration',
    accent: 'from-white/[0.03]',
  },
]

const FILTERS: Array<{ id: 'all' | LocationStatus; label: string }> = [
  { id: 'all', label: 'All Presence' },
  { id: 'headquarters', label: 'Headquarters' },
  { id: 'private-experience', label: 'Private Experience' },
  { id: 'future-exploration', label: 'Future Exploration' },
]

const REGIONS = [
  {
    flag: '🇵🇰',
    title: 'Pakistan',
    kicker: 'A foundational market',
    body: 'Pakistan represents an important part of the broader story and future development of Shamim Forever. The House is exploring long-term opportunities across selected cities; no boutique address is currently announced.',
    cities: 'Karachi · Lahore · Islamabad · Peshawar',
  },
  {
    flag: '🇦🇪 🇸🇦',
    title: 'The Middle East',
    kicker: 'A region of cultural ambition',
    body: 'The Middle East represents an important future market for luxury, hospitality, and private experiences. The House is interested in the long-term potential of destinations including Dubai and Riyadh; no boutique location is currently announced unless officially confirmed.',
    cities: 'Dubai · Riyadh',
  },
  {
    flag: '🇫🇷',
    title: 'Europe',
    kicker: 'The House begins in France',
    body: 'France is home to the Global Headquarters. From Puteaux and the Paris La Défense region, the House will develop its international vision gradually and deliberately according to strategic relevance, cultural alignment, operational readiness, and long-term sustainability.',
    cities: 'Puteaux · Paris La Défense',
  },
  {
    flag: '🇬🇧 🇺🇸',
    title: 'International markets',
    kicker: 'Presence with purpose',
    body: 'Other destinations may be explored as the House develops its international infrastructure. No boutique location is announced unless officially confirmed by Shamim Forever.',
    cities: 'United Kingdom · United States',
  },
]

const EXPERIENCE_FORMATS = [
  ['Boutiques', 'Private spaces designed around collections and the House experience.'],
  ['Ateliers', 'Creative environments dedicated to craftsmanship, bespoke development, and design.'],
  ['Private Salons', 'Appointment-based spaces for individual consultations.'],
  ['Experience Centers', 'Immersive environments connecting luxury, technology, and the world of the House.'],
]

const PRIVATE_VISITS = [
  'Private consultations',
  'Bespoke discussions',
  'Collection previews',
  'Client appointments',
  'Private House experiences',
]

export default function BoutiquesPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | LocationStatus>('all')
  const filtered = activeFilter === 'all' ? LOCATIONS : LOCATIONS.filter(location => location.status === activeFilter)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-zinc-200">
      <section className="relative border-b border-[#0d0d0d] pt-20">
        <div className="relative min-h-[520px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_50%,rgba(201,160,84,0.08),transparent_58%),radial-gradient(ellipse_at_82%_20%,rgba(201,160,84,0.04),transparent_48%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs><pattern id="boutique-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#c9a054" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#boutique-grid)" />
          </svg>
          <div className="relative z-10 flex min-h-[520px] flex-col justify-end px-5 py-16 md:px-12 md:py-24 lg:px-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
              <p className="mb-5 text-[9px] uppercase tracking-[0.6em] text-[#c9a054]">Global Presence</p>
              <h1 className="max-w-4xl font-serif text-5xl font-light leading-[0.92] tracking-[0.06em] text-zinc-100 md:text-7xl lg:text-8xl">
                Boutiques<br /><span className="italic text-zinc-500">&amp; Private Locations</span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm font-light leading-8 text-zinc-500 md:text-base">
                From Paris La Défense to the world. Shamim Forever is building a global luxury presence through private experiences, boutiques, ateliers, and carefully considered locations. Our journey begins at the House's Global Headquarters in Puteaux, within the Paris La Défense region of France.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-[8px] uppercase tracking-[0.35em] text-zinc-600">
                <span className="text-[#c9a054]">01 · Verified Global Headquarters</span>
                <span className="hidden h-px w-8 bg-[#c9a054]/30 sm:block" />
                <span>Global Vision</span>
                <span className="hidden h-px w-8 bg-[#c9a054]/30 sm:block" />
                <span>By Appointment &amp; Concierge</span>
              </div>
            </motion.div>
          </div>
        </div>

        <Link href="/concierge" className="group flex items-center gap-3 border-y border-[#c9a054]/10 bg-[#c9a054]/[0.04] px-5 py-4 transition-colors hover:bg-[#c9a054]/[0.08] md:gap-5 md:px-12 lg:px-20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c9a054]" />
          <span className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Global Headquarters</span>
          <span className="hidden text-xs text-zinc-700 sm:inline">·</span>
          <span className="hidden text-[8px] uppercase tracking-[0.3em] text-zinc-500 sm:inline">Puteaux · Paris La Défense · France</span>
          <span className="ml-auto text-[8px] uppercase tracking-[0.35em] text-[#c9a054] opacity-70 transition-opacity group-hover:opacity-100">Contact the House →</span>
        </Link>

        <div className="flex overflow-x-auto border-t border-[#0d0d0d] scrollbar-none">
          {FILTERS.map((filter, index) => (
            <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`flex-shrink-0 whitespace-nowrap border-b-2 px-5 py-4 text-[9px] uppercase tracking-[0.35em] transition-all md:px-8 md:py-5 ${activeFilter === filter.id ? 'border-[#c9a054] text-[#c9a054]' : 'border-transparent text-zinc-700 hover:text-zinc-400'} ${index < FILTERS.length - 1 ? 'border-r border-r-[#0a0a0a]' : ''}`}>
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="presence-status" className="border-b border-[#0d0d0d]">
        <div className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">01 / Verified center</p>
            <h2 id="presence-status" className="font-serif text-4xl font-light tracking-[0.05em] text-zinc-100 md:text-6xl">The House begins with one center.</h2>
            <p className="mt-6 text-sm font-light leading-8 text-zinc-500">The Global Headquarters represents the House&apos;s administrative and strategic center. Other markets remain clearly labelled according to their real status.</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {filtered.map((location, index) => {
                const status = STATUS_META[location.status]
                return (
                  <motion.article key={location.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: index * 0.06 }} className={`relative mb-4 overflow-hidden border border-[#151515] bg-gradient-to-r ${location.accent} to-transparent p-6 md:p-10`}>
                    <div className="relative z-10 grid gap-8 lg:grid-cols-[72px_1fr_auto] lg:items-start">
                      <span className="hidden font-serif text-4xl font-light text-[#c9a054]/30 lg:block">{location.num}</span>
                      <div>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span className="text-lg">{location.flag}</span>
                          <span className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">{location.city}</span>
                          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-700">{location.region}</span>
                        </div>
                        <h3 className="max-w-3xl font-serif text-2xl font-light tracking-[0.05em] text-zinc-100 md:text-3xl">{location.title}</h3>
                        <p className="mt-4 max-w-3xl text-sm font-light leading-8 text-zinc-500">{location.description}</p>
                        {location.address && (
                          <address className="mt-7 border-l border-[#c9a054]/35 pl-5 text-sm not-italic leading-7 text-zinc-300">
                            {location.address.map(line => <span key={line} className="block">{line}</span>)}
                          </address>
                        )}
                        {location.functions && (
                          <div className="mt-8">
                            <p className="mb-4 text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">House functions</p>
                            <div className="flex flex-wrap gap-2">{location.functions.map(item => <span key={item} className="border border-[#24201a] px-3 py-2 text-[8px] uppercase tracking-[0.22em] text-zinc-600">{item}</span>)}</div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-start gap-5 lg:items-end">
                        <span className={`inline-flex items-center gap-2 border px-4 py-3 text-[8px] uppercase tracking-[0.32em] ${status.className}`}><span>{status.symbol}</span>{status.label}</span>
                        <p className="max-w-[190px] text-left text-[10px] leading-6 text-zinc-700 lg:text-right">{status.description}</p>
                        {location.status === 'headquarters' && <Link href="/concierge" className="text-[8px] uppercase tracking-[0.35em] text-[#c9a054] transition hover:text-zinc-100">Contact the House →</Link>}
                        {location.status === 'private-experience' && <Link href="/concierge" className="text-[8px] uppercase tracking-[0.35em] text-[#c9a054] transition hover:text-zinc-100">Contact the Concierge →</Link>}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">02 / The House around the world</p>
            <h2 className="font-serif text-4xl font-light tracking-[0.05em] text-zinc-100 md:text-6xl">A global vision.</h2>
            <p className="mt-6 text-sm font-light leading-8 text-zinc-500">The House&apos;s international vision extends beyond a single location. These are regions of long-term interest — not announced boutique addresses.</p>
          </div>
          <div className="grid gap-px border border-[#151515] bg-[#151515] md:grid-cols-2">
            {REGIONS.map(region => (
              <article key={region.title} className="bg-[#050505] p-7 md:p-10">
                <div className="flex items-start justify-between gap-4"><span className="text-2xl">{region.flag}</span><span className="text-[8px] uppercase tracking-[0.35em] text-zinc-700">Future exploration</span></div>
                <p className="mt-10 text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">{region.kicker}</p>
                <h3 className="mt-3 font-serif text-3xl font-light text-zinc-100">{region.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-500">{region.body}</p>
                <p className="mt-6 border-t border-[#151515] pt-4 text-[8px] uppercase tracking-[0.3em] text-zinc-700">{region.cities}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">03 / Future locations</p>
            <h2 className="font-serif text-4xl font-light tracking-[0.05em] text-zinc-100 md:text-6xl">The future House network.</h2>
            <p className="mt-6 text-sm leading-8 text-zinc-500">Potential future formats are designed around meaning, service, craftsmanship, and the rhythm of each destination.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">{EXPERIENCE_FORMATS.map(([title, body]) => <div key={title} className="border-t border-[#c9a054]/25 pt-5"><h3 className="font-serif text-2xl font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p></div>)}</div>
        </div>
      </section>

      <section className="border-b border-[#0d0d0d] bg-[#080808] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">07 / How we choose a location</p>
            <h2 className="font-serif text-4xl font-light text-zinc-100 md:text-5xl">Location is part of the House.</h2>
            <p className="mt-6 text-sm leading-8 text-zinc-500">Shamim Forever does not view physical presence as a simple expansion metric. A city is not selected simply because it is famous; the location must have a meaningful relationship with the future of the House.</p>
          </div>
          <div className="border border-[#1a1a1a] p-7 md:p-10">
            <p className="text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">Location model</p>
            <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-zinc-400">
              {[
                ['L', 'Location Value'],
                ['C', 'Cultural Relevance'],
                ['H', 'House Alignment'],
                ['A', 'Accessibility'],
                ['S', 'Strategic Sustainability'],
              ].map(([symbol, label]) => <div key={symbol} className="border-t border-[#1a1a1a] pt-4"><span className="font-serif text-3xl text-[#c9a054]">{symbol}</span><p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-zinc-600">{label}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0d0d0d] bg-[#080808] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="private-visits">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">08 / Private visits</p>
            <h2 id="private-visits" className="font-serif text-4xl font-light text-zinc-100 md:text-6xl">The House, by appointment.</h2>
            <p className="mt-6 text-sm leading-8 text-zinc-500">Certain Shamim Forever experiences may operate through private appointments and concierge coordination. Availability, format, and location are confirmed directly by the House.</p>
            <Link href="/concierge" className="mt-8 inline-flex border border-[#c9a054]/60 px-7 py-4 text-[9px] uppercase tracking-[0.4em] text-[#c9a054] transition hover:bg-[#c9a054] hover:text-[#050505]">Contact the Concierge →</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">{PRIVATE_VISITS.map((item, index) => <div key={item} className="border border-[#1a1a1a] p-6"><span className="font-serif text-2xl text-[#c9a054]/70">0{index + 1}</span><p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-zinc-400">{item}</p></div>)}</div>
        </div>
      </section>

      <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">09 / Global expansion principle</p>
              <h2 className="font-serif text-4xl font-light text-zinc-100 md:text-5xl">Growth without losing identity.</h2>
            </div>
            <div className="text-lg font-light leading-9 text-zinc-500 md:text-2xl">Expansion without identity is simply multiplication. The objective is not to appear everywhere. The objective is to belong wherever the House appears.</div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3"><div className="border border-[#1a1a1a] p-6"><span className="font-serif text-4xl text-[#c9a054]">G</span><p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-zinc-600">Sustainable Growth</p></div><div className="border border-[#1a1a1a] p-6"><span className="font-serif text-4xl text-[#c9a054]">Q</span><p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-zinc-600">Quality of Presence</p></div><div className="border border-[#1a1a1a] p-6"><span className="font-serif text-4xl text-[#c9a054]">C</span><p className="mt-4 text-[9px] uppercase tracking-[0.3em] text-zinc-600">Consistency</p></div></div>
        </div>
      </section>

      <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="location-status">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">10 / Location status system</p>
          <h2 id="location-status" className="font-serif text-4xl font-light text-zinc-100 md:text-5xl">Clear status. No invented addresses.</h2>
          <div className="mt-10 grid gap-px border border-[#151515] bg-[#151515] sm:grid-cols-2 lg:grid-cols-4">{Object.entries(STATUS_META).map(([key, status]) => <div key={key} className="bg-[#050505] p-6"><span className={`text-xl ${status.className.split(' ')[0]}`}>{status.symbol}</span><h3 className="mt-5 text-[9px] uppercase tracking-[0.3em] text-zinc-300">{status.label}</h3><p className="mt-3 text-xs leading-6 text-zinc-600">{status.description}</p></div>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">A house without borders</p>
          <h2 className="mt-6 font-serif text-4xl font-light tracking-[0.05em] text-zinc-100 md:text-6xl">One House.<br /><span className="italic text-zinc-500">Many Destinations.</span></h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-zinc-500">Shamim Forever begins with a single center. Its vision extends further through carefully considered locations, private experiences, and long-term relationships designed to connect different places through a shared philosophy.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4"><Link href="/concierge" className="border border-[#c9a054]/60 px-8 py-4 text-[9px] uppercase tracking-[0.45em] text-[#c9a054] transition hover:bg-[#c9a054] hover:text-[#050505]">Contact the Concierge →</Link><a href="mailto:media@shamimforever.com" className="px-8 py-4 text-[9px] uppercase tracking-[0.45em] text-zinc-600 transition hover:text-[#c9a054]">Media Relations →</a></div>
        </div>
      </section>

      <section className="border-t border-[#0d0d0d] px-5 py-14 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-[1200px] gap-8 text-sm text-zinc-500 md:grid-cols-3">
          <div><p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Global Headquarters</p><p>Shamim Forever<br />77 Esplanade du Général de Gaulle<br />92800 Puteaux, Hauts-de-Seine<br />Paris La Défense, France</p></div>
          <div><p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Concierge</p><a href="mailto:concierge@shamimforever.com" className="transition hover:text-[#c9a054]">concierge@shamimforever.com</a></div>
          <div><p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Relations</p><a href="mailto:media@shamimforever.com" className="block transition hover:text-[#c9a054]">media@shamimforever.com</a><a href="mailto:relations@shamimforever.com" className="mt-2 block transition hover:text-[#c9a054]">relations@shamimforever.com</a></div>
        </div>
      </section>
    </main>
  )
}