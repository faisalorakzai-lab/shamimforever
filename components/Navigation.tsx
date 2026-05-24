'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import MobileDrawer from './MobileDrawer'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Atelier', href: '/atelier' },
  { label: 'Journal', href: '/journal' },
  { label: 'Boutiques', href: '/boutiques' },
  { label: 'Concierge', href: '/concierge' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#111]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="group flex-shrink-0">
              <img src="/logo.png" alt="Shamim Forever"
                className="h-9 md:h-11 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                style={{ filter: 'drop-shadow(0 0 8px rgba(201,160,84,0.15))' }} />
            </Link>

            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 hover:text-[#c9a054] transition-colors duration-500 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a054] group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 md:gap-5">
              <Link href="/inner-circle"
                className="hidden lg:block text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors duration-500">
                Inner Circle
              </Link>
              <Link href="/virtual-atelier"
                className="hidden lg:block text-[8px] tracking-[0.35em] uppercase text-zinc-600 hover:text-[#c9a054] transition-colors duration-500 border border-[#111] px-3 py-1.5 hover:border-[#c9a054]/30">
                AI Scanner
              </Link>
              <button onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 group p-2" aria-label="Open menu">
                <span className="w-6 h-px bg-zinc-400 group-hover:bg-[#c9a054] transition-colors duration-300" />
                <span className="w-4 h-px bg-zinc-400 group-hover:bg-[#c9a054] transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
