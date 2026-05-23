'use client'

  import { motion, AnimatePresence } from 'framer-motion'
  import Link from 'next/link'
  import { X } from 'lucide-react'
  import { usePathname } from 'next/navigation'
  import { useEffect } from 'react'

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Our Story', href: '/our-story' },
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
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#080808]/95 backdrop-blur-xl border-l border-[#1a1a1a] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-6 border-b border-[#1a1a1a]">
                <img
                  src="/logo.png"
                  alt="Shamim Forever"
                  className="h-8 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(201,160,84,0.2))' }}
                />
                <button
                  onClick={onClose}
                  className="text-zinc-500 hover:text-[#c9a054] transition-colors duration-300 p-1"
                  aria-label="Close menu"
                >
                  <X size={16} strokeWidth={1} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-7 py-6 gap-0.5 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.07,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 py-4 text-[11px] tracking-[0.35em] uppercase font-light transition-colors duration-500 border-b border-[#111] group ${
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
              <div className="px-7 py-7 border-t border-[#1a1a1a]">
                <Link href="/auth" className="luxury-btn w-full text-[9px] block text-center">
                  Authenticate
                </Link>
                <p className="text-center text-[9px] tracking-[0.3em] uppercase text-zinc-700 mt-5">
                  © 2025 Shamim Forever
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
  