'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

type Boutique = {
  id: string; num: string; city: string; country: string; flag: string
  region: string; title: string; address: string
  tier: 'hq' | 'pakistan' | 'middle-east' | 'europe' | 'usa'
  phone?: string; whatsapp?: string
}

const BOUTIQUES: Boutique[] = [
  {
    id: 'hq-puteaux',
    num: '00',
    city: 'Puteaux',
    country: 'France',
    flag: '🇫🇷',
    region: 'La Défense — Puteaux',
    title: 'Shamim Forever Global Headquarters',
    address: '77 Espl. du Général de Gaulle, 92800 Puteaux, France',
    tier: 'hq',
  },
  {
    id: 'khi-tariq', num: '01', city: 'Karachi', country: 'Pakistan', flag: '🇵🇰',
    region: 'Tariq Road',
    title: 'Sovereign Corporate HQ & Visual Experience Center',
    address: 'Dolmen Mall Tariq Road, Store# TF-010, 3rd Floor, Plot 13, Block 3, P.E.C.H.S, Tariq Road, Karachi, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'khi-clifton', num: '02', city: 'Karachi', country: 'Pakistan', flag: '🇵🇰',
    region: 'Clifton',
    title: 'Clifton Main Executive Atrium & Haute Couture Suite',
    address: 'Dolmen Mall Clifton, Store # G-14, Ground Floor, Dolmen City, Clifton Block 5, Marine Drive, Karachi, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'lhr-dha', num: '03', city: 'Lahore', country: 'Pakistan', flag: '🇵🇰',
    region: 'DHA Phase 6',
    title: 'Royal Heritage Collection Hub & Bespoke Bridal Salon',
    address: 'Main Boulevard, Phase 6, Defense Housing Authority (DHA), Lahore, Punjab, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'isb-dha', num: '04', city: 'Islamabad', country: 'Pakistan', flag: '🇵🇰',
    region: 'DHA Phase II',
    title: 'Elite VIP Client Consultation Vault',
    address: 'Giga Mall, Main Grand Trunk (GT) Road, Defense Housing Authority (DHA) Phase II, Islamabad, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'psh-ring', num: '05', city: 'Peshawar', country: 'Pakistan', flag: '🇵🇰',
    region: 'Ring Road',
    title: 'Traditional Sovereign Crafting Hub',
    address: 'HBK Hyper Market, Main Ring Road (near Hayatabad Intersection), Peshawar, Khyber Pakhtunkhwa, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'dubai', num: '06', city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪',
    region: 'Downtown Dubai',
    title: 'Shamim Forever Oasis Pavilion & Bespoke Royal Atrium',
    address: 'Fashion Avenue Extension, Level 1, The Dubai Mall, Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, Dubai, UAE.',
    tier: 'middle-east',
  },
  {
    id: 'riyadh', num: '07', city: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦',
    region: 'Al Hada District',
    title: 'Najd Sovereign Estate & Private Crown Consultation Sanctuary',
    address: 'VIA Riyadh Luxury District, 2941 Makkah Al Mukarramah Road, Al Hada District, Riyadh 12912, Saudi Arabia.',
    tier: 'middle-east',
  },
  {
    id: 'london', num: '08', city: 'London', country: 'United Kingdom', flag: '🇬🇧',
    region: 'Mayfair',
    title: 'Shamim Forever Commonwealth Heritage Townhouse & Atelier',
    address: '158-160 New Bond Street, Mayfair, London W1S 2UB, United Kingdom.',
    tier: 'europe',
  },
  {
    id: 'paris', num: '09', city: 'Paris', country: 'France', flag: '🇫🇷',
    region: 'Place Vendôme',
    title: 'Maison de Haute Parfumerie & High Artistry Vault',
    address: '12 Place Vendôme (Avenue Montaigne District), 75001 Paris, France.',
    tier: 'europe',
  },
  {
    id: 'nyc', num: '10', city: 'New York', country: 'United States', flag: '🇺🇸',
    region: 'Fifth Avenue',
    title: 'Fifth Ave Penthouse Exhibition & Global Runway Suite',
    address: '712 Fifth Avenue (Manhattan Skyline District), New York, NY 10019, United States.',
    tier: 'usa',
  },
]

const FILTERS = [
  { id: 'all', label: 'All Locations' },
  { id: 'hq', label: 'Headquarters' },
  { id: 'pakistan', label: 'Pakistan' },
  { id: 'middle-east', label: 'Middle East' },
  { id: 'europe', label: 'Europe' },
  { id: 'usa', label: 'Americas' },
]

const TIER_ACCENT: Record<string, string> = {
  hq: 'text-[#c9a054]',
  pakistan: 'text-emerald-500/60',
  'middle-east': 'text-amber-500/60',
  europe: 'text-blue-400/60',
  usa: 'text-purple-400/60',
}

const TIER_BORDER: Record<string, string> = {
  hq: 'border-l-2 border-l-[#c9a054]',
  pakistan: 'border-l border-l-[#0d0d0d]',
  'middle-east': 'border-l border-l-[#0d0d0d]',
  europe: 'border-l border-l-[#0d0d0d]',
  usa: 'border-l border-l-[#0d0d0d]',
}

export default function BoutiquesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = activeFilter === 'all' ? BOUTIQUES : BOUTIQUES.filter(b => b.tier === activeFilter)

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="pt-20 relative border-b border-[#0d0d0d]">
        <div className="relative overflow-hidden" style={{ minHeight: '42vw', maxHeight: '520px' }}>
          <div className="absolute inset-0 bg-[#050505]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(201,160,84,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,160,84,0.03) 0%, transparent 50%)' }} />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a054" strokeWidth="0.5"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col justify-end h-full px-5 md:px-12 lg:px-20 py-12 md:py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5 md:mb-7">Sovereign Locations</p>
              <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.06em] text-zinc-100 leading-[0.92] mb-5 md:mb-7">Boutiques</h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-6">
                <span className="font-serif italic text-zinc-600 text-lg md:text-2xl">11 Sovereign Addresses</span>
                <div className="w-4 h-px bg-[#c9a054]/30" />
                <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">5 Countries · 4 Continents · 1 HQ</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* HQ banner strip */}
        <a href="/concierge" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 md:gap-5 px-5 md:px-12 lg:px-20 py-3 bg-[#c9a054]/5 border-y border-[#c9a054]/10 hover:bg-[#c9a054]/8 transition-colors duration-500 group">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a054] animate-pulse" />
          <span className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054]">Global HQ</span>
          <span className="text-zinc-700 text-xs">·</span>
          <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-500">77 Espl. du Général de Gaulle, Puteaux, France</span>
          <span className="text-zinc-700 text-xs hidden md:inline">·</span>
          <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-600 hidden md:inline">92800 Puteaux · France</span>
          <span className="ml-auto text-[8px] tracking-[0.35em] uppercase text-[#c9a054] group-hover:opacity-100 opacity-60 transition-opacity duration-400">Contact →</span>
        </a>

        {/* Filter tabs */}
        <div className="flex overflow-x-auto scrollbar-none border-t border-[#0d0d0d]">
          {FILTERS.map((f, i) => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)}
              className={`flex-shrink-0 px-5 md:px-7 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase whitespace-nowrap transition-all duration-500 border-b-2 ${
                activeFilter === f.id ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-700 border-transparent hover:text-zinc-400'
              } ${i < FILTERS.length - 1 ? 'border-r border-r-[#0a0a0a]' : ''}`}>
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── LOCATIONS ─── */}
      <section>
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            {filtered.map((b, i) => (
              <motion.div key={b.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredId(b.id)} onMouseLeave={() => setHoveredId(null)}
                className={`border-b border-[#0d0d0d] group relative transition-colors duration-500 ${hoveredId === b.id ? 'bg-[#080808]' : ''} ${TIER_BORDER[b.tier]}`}>

                {/* HQ gold glow */}
                {b.tier === 'hq' && <div className="absolute inset-0 bg-gradient-to-r from-[#c9a054]/3 to-transparent pointer-events-none" />}

                <div className="px-5 md:px-12 lg:px-20 py-7 md:py-9 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-3 md:gap-8 items-start md:items-center">

                    {/* Num */}
                    <span className={`hidden md:block font-serif font-light text-3xl ${b.tier === 'hq' ? 'text-[#c9a054]/30' : 'text-zinc-800'} group-hover:opacity-60 transition-opacity duration-500`}>
                      {b.num}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <span className="text-base">{b.flag}</span>
                        <span className={`text-[8px] tracking-[0.45em] uppercase ${TIER_ACCENT[b.tier]}`}>{b.city}</span>
                        {b.tier === 'hq' && (
                          <span className="text-[6px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-2 py-0.5">
                            Global HQ
                          </span>
                        )}
                        <span className="md:hidden text-[7px] text-zinc-800">{b.num}</span>
                      </div>
                      <h2 className={`font-serif font-light text-base md:text-lg lg:text-xl tracking-[0.06em] mb-2 md:mb-3 leading-snug ${
                        b.tier === 'hq' ? 'text-zinc-100' : 'text-zinc-300 group-hover:text-zinc-100'
                      } transition-colors duration-500`}>
                        {b.title}
                      </h2>
                      <p className="text-zinc-600 text-xs font-light leading-relaxed max-w-2xl">{b.address}</p>
                      {b.phone && (
                        <div className="flex flex-wrap gap-4 mt-3">
                          <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[8px] tracking-[0.35em] uppercase text-[#c9a054]/70 hover:text-[#c9a054] transition-colors duration-400">
                            <span>◈</span> WhatsApp {b.phone}
                          </a>
                          <a href="tel:+923367970004"
                            className="flex items-center gap-2 text-[8px] tracking-[0.35em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors duration-400">
                            <span>◇</span> Founder +92 336 7970004
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Badge */}
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="relative border border-[#c9a054]/20 px-4 py-2.5 text-center">
                        <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] whitespace-nowrap">Coming Soon</p>
                        <div className="absolute -top-1 -right-1">
                          <div className="w-2 h-2 rounded-full bg-[#c9a054] animate-ping opacity-40" />
                          <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#c9a054]/60" />
                        </div>
                      </div>
                      <a href="/concierge" className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 hover:text-[#c9a054] transition-colors duration-400 whitespace-nowrap">
                        Book Private Visit →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── STATS + CTA ─── */}
      <section className="border-t border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 mb-14 pb-14 border-b border-[#0d0d0d]">
            {[{v:'11',l:'Sovereign Addresses'},{v:'6',l:'Countries'},{v:'4',l:'Continents'},{v:'2025',l:'Opening Year'}].map(s => (
              <div key={s.l} className="text-center md:text-left">
                <p className="font-serif font-light text-4xl md:text-5xl text-[#c9a054] mb-2">{s.v}</p>
                <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="font-serif font-light italic text-xl md:text-3xl text-zinc-500 max-w-lg leading-snug">
                "Be the first to enter."
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/concierge"
                className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Book Private Visit</span>
              </a>
              <a href="/inner-circle" className="inline-flex items-center justify-center text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
                Inner Circle →
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
