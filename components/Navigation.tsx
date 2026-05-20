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
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#1a1a1a]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-light tracking-[0.3em] uppercase text-zinc-100 group-hover:text-[#c9a054] transition-colors duration-500">
                  Shamim
                </span>
                <span className="font-serif text-[10px] tracking-[0.5em] uppercase text-[#c9a054]">
                  Forever
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 hover:text-[#c9a054] transition-colors duration-500 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a054] group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-6">
              <Link
                href="/inner-circle"
                className="hidden lg:block text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors duration-500"
              >
                Inner Circle
              </Link>
              <Link
                href="/auth"
                className="hidden lg:block luxury-btn text-[9px] py-2 px-5"
              >
                Access
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 group"
                aria-label="Open menu"
              >
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
