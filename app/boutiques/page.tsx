'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

type Boutique = {
  id: string
  num: string
  city: string
  country: string
  flag: string
  region: string
  title: string
  address: string
  tier: 'pakistan' | 'middle-east' | 'europe' | 'usa'
}

const BOUTIQUES: Boutique[] = [
  {
    id: 'khi-tariq',
    num: '01',
    city: 'Karachi',
    country: 'Pakistan',
    flag: '🇵🇰',
    region: 'Tariq Road',
    title: 'Sovereign Corporate HQ & Visual Experience Center',
    address: 'Dolmen Mall Tariq Road, Store# TF-010, 3rd Floor, Plot 13, Block 3, P.E.C.H.S, Tariq Road, Karachi, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'khi-clifton',
    num: '02',
    city: 'Karachi',
    country: 'Pakistan',
    flag: '🇵🇰',
    region: 'Clifton',
    title: 'Clifton Main Executive Atrium & Haute Couture Suite',
    address: 'Dolmen Mall Clifton, Store # G-14, Ground Floor, Dolmen City, Clifton Block 5, Marine Drive, Karachi, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'lhr-dha',
    num: '03',
    city: 'Lahore',
    country: 'Pakistan',
    flag: '🇵🇰',
    region: 'DHA Phase 6',
    title: 'Royal Heritage Collection Hub & Bespoke Bridal Salon',
    address: 'Main Boulevard, Phase 6, Defense Housing Authority (DHA), Lahore, Punjab, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'isb-dha',
    num: '04',
    city: 'Islamabad',
    country: 'Pakistan',
    flag: '🇵🇰',
    region: 'DHA Phase II',
    title: 'Elite VIP Client Consultation Vault',
    address: 'Giga Mall, Main Grand Trunk (GT) Road, Defense Housing Authority (DHA) Phase II, Islamabad, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'psh-ring',
    num: '05',
    city: 'Peshawar',
    country: 'Pakistan',
    flag: '🇵🇰',
    region: 'Ring Road',
    title: 'Traditional Sovereign Crafting Hub',
    address: 'HBK Hyper Market, Main Ring Road (near Hayatabad Intersection), Peshawar, Khyber Pakhtunkhwa, Pakistan.',
    tier: 'pakistan',
  },
  {
    id: 'dubai',
    num: '06',
    city: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Downtown Dubai',
    title: 'Shamim Forever Oasis Pavilion & Bespoke Royal Atrium',
    address: 'Fashion Avenue Extension, Level 1, The Dubai Mall, Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, Dubai, United Arab Emirates.',
    tier: 'middle-east',
  },
  {
    id: 'london',
    num: '07',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Mayfair',
    title: 'Shamim Forever Commonwealth Heritage Townhouse & Atelier',
    address: '158-160 New Bond Street, Mayfair, London W1S 2UB, United Kingdom.',
    tier: 'europe',
  },
  {
    id: 'paris',
    num: '08',
    city: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    region: 'Place Vendôme',
    title: 'Maison de Haute Parfumerie & High Artistry Vault',
    address: '12 Place Vendôme (Avenue Montaigne District), 75001 Paris, France.',
    tier: 'europe',
  },
  {
    id: 'nyc',
    num: '09',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    region: 'Fifth Avenue',
    title: 'Fifth Ave Penthouse Exhibition & Global Runway Suite',
    address: '712 Fifth Avenue (Manhattan Skyline District), New York, NY 10019, United States.',
    tier: 'usa',
  },
  {
    id: 'riyadh',
    num: '10',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    region: 'Al Hada District',
    title: 'Najd Sovereign Estate & Private Crown Consultation Sanctuary',
    address: 'VIA Riyadh Luxury District, 2941 Makkah Al Mukarramah Road, Al Hada District, Riyadh 12912, Saudi Arabia.',
    tier: 'middle-east',
  },
]

const FILTERS = [
  { id: 'all', label: 'All Locations' },
  { id: 'pakistan', label: 'Pakistan' },
  { id: 'middle-east', label: 'Middle East' },
  { id: 'europe', label: 'Europe' },
  { id: 'usa', label: 'Americas' },
]

const TIER_COLORS: Record<string, string> = {
  pakistan: 'text-emerald-500/60',
  'middle-east': 'text-amber-500/60',
  europe: 'text-blue-400/60',
  usa: 'text-purple-400/60',
}

export default function BoutiquesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = activeFilter === 'all'
    ? BOUTIQUES
    : BOUTIQUES.filter(b => b.tier === activeFilter)

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="pt-20 relative border-b border-[#111]">
        <div className="relative overflow-hidden" style={{ minHeight: '42vw', maxHeight: '520px' }}>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[#050505]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(ellipse at 20% 50%, #c9a054/4 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #c9a054/3 0%, transparent 50%)',
            }} />
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a054" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col justify-end h-full px-5 md:px-12 lg:px-20 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease }}
            >
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5 md:mb-8">
                Sovereign Locations
              </p>
              <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.06em] text-zinc-100 leading-[0.92] mb-6 md:mb-8">
                Boutiques
              </h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-4">
                <span className="font-serif italic text-zinc-600 text-lg md:text-2xl">10 Sovereign Addresses</span>
                <div className="w-4 h-px bg-[#c9a054]/30" />
                <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">5 Countries · 4 Continents</span>
              </div>
              <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-sm md:max-w-md">
                From the bazaars of Karachi to the couture corridors of Paris and the diamond avenues of Manhattan — 
                Shamim Forever is arriving everywhere that luxury is understood.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex overflow-x-auto scrollbar-none border-t border-[#0d0d0d]">
          {FILTERS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex-shrink-0 px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase whitespace-nowrap transition-all duration-500 border-b-2 ${
                activeFilter === f.id
                  ? 'text-[#c9a054] border-[#c9a054]'
                  : 'text-zinc-700 border-transparent hover:text-zinc-400'
              } ${i < FILTERS.length - 1 ? 'border-r border-r-[#0a0a0a]' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── LOCATIONS LIST ─── */}
      <section>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((boutique, i) => (
              <motion.div
                key={boutique.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.06 }}
                onMouseEnter={() => setHoveredId(boutique.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="border-b border-[#0d0d0d] group"
              >
                <div className={`relative px-5 md:px-12 lg:px-20 py-8 md:py-10 transition-colors duration-500 ${
                  hoveredId === boutique.id ? 'bg-[#080808]' : ''
                }`}>

                  {/* Gold line on hover */}
                  <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-700 ${
                    hoveredId === boutique.id ? 'bg-[#c9a054]' : 'bg-transparent'
                  }`} />

                  <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-start md:items-center">

                    {/* Number */}
                    <div className="hidden md:block">
                      <span className="font-serif font-light text-4xl text-zinc-800 group-hover:text-[#c9a054]/30 transition-colors duration-700">
                        {boutique.num}
                      </span>
                    </div>

                    {/* Main info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                        <span className="text-base md:text-lg">{boutique.flag}</span>
                        <span className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054]">
                          {boutique.city}
                        </span>
                        <span className="text-zinc-800 text-xs hidden md:inline">·</span>
                        <span className={`text-[7px] tracking-[0.35em] uppercase hidden md:inline ${TIER_COLORS[boutique.tier]}`}>
                          {boutique.region}
                        </span>
                        <span className="md:hidden text-[7px] tracking-[0.3em] uppercase text-zinc-800">
                          {boutique.num}
                        </span>
                      </div>

                      <h2 className="font-serif font-light text-lg md:text-xl lg:text-2xl tracking-[0.06em] text-zinc-200 group-hover:text-zinc-100 transition-colors duration-500 mb-3 leading-snug">
                        {boutique.title}
                      </h2>

                      <p className="text-zinc-600 text-xs md:text-sm font-light leading-relaxed max-w-xl">
                        {boutique.address}
                      </p>
                    </div>

                    {/* Coming Soon badge */}
                    <div className="flex flex-col items-start md:items-end gap-3">
                      <div className="relative">
                        <div className="border border-[#c9a054]/20 px-4 md:px-5 py-2.5 md:py-3 text-center">
                          <p className="text-[7px] md:text-[8px] tracking-[0.5em] uppercase text-[#c9a054] whitespace-nowrap">
                            Coming Soon
                          </p>
                        </div>
                        {/* Pulsing dot */}
                        <div className="absolute -top-1 -right-1 w-2 h-2">
                          <div className="w-2 h-2 rounded-full bg-[#c9a054] animate-ping opacity-40" />
                          <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#c9a054]/60" />
                        </div>
                      </div>
                      <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 whitespace-nowrap">
                        {boutique.country}
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── GLOBAL PRESENCE STRIP ─── */}
      <section className="border-t border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 mb-14 md:mb-20 pb-14 md:pb-20 border-b border-[#0d0d0d]">
            {[
              { value: '10', label: 'Sovereign Addresses' },
              { value: '5', label: 'Countries' },
              { value: '4', label: 'Continents' },
              { value: '2025', label: 'Opening Year' },
            ].map(stat => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="font-serif font-light text-4xl md:text-5xl text-[#c9a054] mb-2">{stat.value}</p>
                <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom message */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-700 mb-5">Notification</p>
              <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.04em] text-zinc-200 leading-[1.05] mb-5">
                Be the first<br />
                <span className="italic text-zinc-500">to enter.</span>
              </h2>
              <p className="text-zinc-600 text-sm font-light leading-relaxed max-w-sm">
                Join the Inner Circle and receive exclusive early access to boutique openings, 
                private previews, and sovereign appointment booking.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="/inner-circle"
                className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden transition-all duration-700 min-w-[200px] text-center"
              >
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                  Join the Inner Circle
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
