'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Atelier', href: '/atelier' },
  { label: 'Journal', href: '/journal' },
  { label: 'Boutiques', href: '/boutiques' },
  { label: 'Inner Circle', href: '/inner-circle' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: Props) {
  const pathname = usePathname()

  useEffect(() => {
    onClose()
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#0a0a0a]/90 backdrop-blur-md border-l border-[#1a1a1a] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-[#1a1a1a]">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-sm font-light tracking-[0.3em] uppercase text-zinc-100">
                  Shamim
                </span>
                <span className="font-serif text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">
                  Forever
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-[#c9a054] transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={16} strokeWidth={1} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col p-8 gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 py-4 text-xs tracking-[0.35em] uppercase font-light transition-colors duration-500 group ${
                      pathname === link.href
                        ? 'text-[#c9a054]'
                        : 'text-zinc-400 hover:text-[#c9a054]'
                    }`}
                  >
                    {pathname === link.href && (
                      <span className="w-1 h-1 rounded-full bg-[#c9a054] flex-shrink-0" />
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <div className="p-8 border-t border-[#1a1a1a]">
              <Link
                href="/auth"
                className="luxury-btn w-full text-[9px]"
              >
                Authenticate
              </Link>
              <p className="text-center text-[9px] tracking-[0.3em] uppercase text-zinc-600 mt-6">
                © 2025 Shamim Forever
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
