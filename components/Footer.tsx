'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Atelier', href: '/atelier' },
  { label: 'Journal', href: '/journal' },
  { label: 'Boutiques', href: '/boutiques' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'FAQ', href: '/faq' },
]

const ACCESS_LINKS = [
  { label: 'Inner Circle', href: '/inner-circle' },
  { label: 'Concierge', href: '/concierge' },
  { label: 'Virtual Atelier', href: '/virtual-atelier' },
  { label: 'Whitelist Access', href: '/learn/whitelist-access' },
  { label: 'Sovereign Panel', href: '/admin' },
]

const LEARN_LINKS = [
  { label: 'Start here', href: '/learn#start-here' },
  { label: 'The House', href: '/learn#the-house' },
  { label: 'Founders & Leadership', href: '/learn#founders-leadership' },
  { label: 'The Art of Luxury', href: '/learn#the-art-of-luxury' },
  { label: 'Fragrance', href: '/learn#fragrance' },
  { label: 'Authenticity & Trust', href: '/learn#authenticity-trust' },
  { label: 'Brand Glossary', href: '/learn#brand-glossary' },
  { label: 'Learn FAQ', href: '/learn#learn-faq' },
]

const INFRA_LINKS = [
  { label: 'Authenticate', href: '/authenticate' },
  { label: 'Concierge & Care', href: '/care' },
  { label: 'Private Delivery', href: '/delivery' },
  { label: 'Bespoke Atelier', href: '/bespoke' },
  { label: 'Heritage Gallery', href: '/gallery' },
  { label: 'Whitelist Access', href: '/learn/whitelist-access' },
  { label: 'DNA Identity', href: '/dna-identity' },
  { label: 'Time Archive', href: '/time-archive' },
  { label: 'Heirloom Vault', href: '/heirloom-vault' },
  { label: 'Sovereign Vault', href: '/vault' },
  { label: 'Sovereign Aura', href: '/sovereign-aura' },
]

const CORPORATE_LINKS = [
  { label: 'Corporate', href: '/corporate' },
  { label: 'Founder & Leadership', href: '/founder-leadership' },
  { label: 'Leadership & Governance', href: '/leadership-governance' },
  { label: 'Press & Media', href: '/press' },
  { label: 'Brand Facts', href: '/brand-facts' },
  { label: 'Corporate Information', href: '/corporate-information' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Careers', href: '/careers' },
  { label: 'Investor Relations', href: '/investor-relations' },
  { label: 'Newsroom', href: '/newsroom' },
  { label: 'Policies & Legal', href: '/policies' },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Footer() {
  return (
    <footer className="border-t border-[#0d0d0d] bg-[#030303]">
      {/* Top manifesto strip */}
      <div className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-10 md:py-14">
        <motion.div {...fadeUp} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-800 mb-3">House of Shamim Forever</p>
            <p className="font-serif font-light italic text-2xl md:text-3xl text-zinc-600 max-w-xl leading-snug">
              "Built From Love. Forged Into Legacy."
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['PKR', 'USD', 'USDT', 'USDC', 'OKBOND'].map(p => (
              <span key={p} className="text-[7px] tracking-[0.35em] uppercase text-zinc-700 border border-[#111] px-2.5 py-1.5">{p}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main grid */}
      <div className="px-5 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_1.2fr_1.2fr] gap-10 md:gap-8">

          {/* Brand */}
          <motion.div {...fadeUp} className="col-span-2 md:col-span-1">
            <Link href="/">
              <img src="/logo.png" alt="Shamim Forever" className="h-10 w-auto object-contain mb-6 opacity-80 hover:opacity-100 transition-opacity duration-500"
                style={{ filter: 'drop-shadow(0 0 6px rgba(201,160,84,0.15))' }} />
            </Link>
            <p className="text-zinc-600 text-xs font-light leading-relaxed max-w-[180px] mb-6">
              A sovereign luxury house. Crafted for the discerning few.
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/923119447572" target="_blank" rel="noopener noreferrer"
                className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
                WhatsApp →
              </a>
              <a href="mailto:concierge@shamimforever.com"
                className="text-[8px] tracking-[0.35em] uppercase text-zinc-800 hover:text-[#c9a054] transition-colors duration-500">
                concierge@shamimforever.com
              </a>
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}>
            <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-6">Navigate</p>
            <div className="flex flex-col gap-3.5">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 hover:text-zinc-200 transition-colors duration-500">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Access */}
          <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.14, ease: [0.16, 1, 0.3, 1] as const }}>
            <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-6">Access</p>
            <div className="flex flex-col gap-3.5">
              {ACCESS_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 hover:text-zinc-200 transition-colors duration-500">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Learn */}
          <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.17, ease: [0.16, 1, 0.3, 1] as const }}>
            <Link href="/learn" className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-6 block hover:text-zinc-200 transition-colors">Learn</Link>
            <div className="flex flex-col gap-3.5">
              {LEARN_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-[9px] tracking-[0.18em] uppercase text-zinc-600 hover:text-zinc-200 transition-colors duration-500">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.20, ease: [0.16, 1, 0.3, 1] as const }}>
            <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-6">Contact</p>
            <div className="flex flex-col gap-3 mb-6">
              {[
                { label: 'Concierge', addr: 'concierge@shamimforever.com' },
                { label: 'Bespoke', addr: 'bespoke@shamimforever.com' },
                { label: 'Boutiques', addr: 'maisons@shamimforever.com' },
                { label: 'Relations', addr: 'relations@shamimforever.com' },
                { label: 'Media', addr: 'media@shamimforever.com' },
              ].map(e => (
                <div key={e.addr}>
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-800">{e.label}</p>
                  <a href={`mailto:${e.addr}`} className="text-[9px] text-zinc-600 hover:text-[#c9a054] transition-colors duration-500 font-light">
                    {e.addr}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sovereign Infrastructure */}
          <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.26, ease: [0.16, 1, 0.3, 1] as const }} className="col-span-2 md:col-span-1">
            <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-1">Sovereign</p>
            <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-6">Infrastructure</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {INFRA_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-[9px] tracking-[0.22em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500 whitespace-nowrap">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Corporate & legal */}
        <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] as const }} className="mt-14 border-t border-[#0d0d0d] pt-10">
          <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-6">Corporate &amp; Legal</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-6">
            {CORPORATE_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="text-[9px] tracking-[0.2em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-800">© 2025 Shamim Forever. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-800">HQ · Puteaux, France</p>
          <div className="w-px h-3 bg-[#111]" />
          <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-800">Sovereign Luxury</p>
        </div>
      </div>
    </footer>
  )
}
