'use client'
import { useCart } from '@/lib/cart-context'

  import { useState, useEffect } from 'react'
  import Link from 'next/link'
  import { usePathname, useRouter } from 'next/navigation'
  import { motion, AnimatePresence } from 'framer-motion'
  import MobileDrawer from './MobileDrawer'
  import CurrencySelector from './CurrencySelector'

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Atelier', href: '/atelier' },
    { label: 'Journal', href: '/journal' },
    { label: 'Boutiques', href: '/boutiques' },
    { label: 'Vault', href: '/vault' },
    { label: 'Authenticate', href: '/authenticate' },
    { label: 'Concierge', href: '/concierge' },
    { label: 'Team', href: '/team' },
  ]

  function getBackLabel(pathname: string): string {
    if (pathname.startsWith('/products')) return 'Shop'
    if (pathname.startsWith('/shop')) return 'Shop'
    if (pathname.startsWith('/collections')) return 'Collections'
    if (pathname.startsWith('/journal')) return 'Journal'
    if (pathname.startsWith('/atelier')) return 'Atelier'
    if (pathname.startsWith('/boutiques')) return 'Boutiques'
    if (pathname.startsWith('/vault')) return 'Vault'
    if (pathname.startsWith('/gallery')) return 'Gallery'
    if (pathname.startsWith('/our-story')) return 'Our Story'
    if (pathname.startsWith('/inner-circle')) return 'Inner Circle'
    if (pathname.startsWith('/concierge')) return 'Concierge'
    if (pathname.startsWith('/care')) return 'Care'
    if (pathname.startsWith('/delivery')) return 'Delivery'
    if (pathname.startsWith('/track')) return 'Track'
    return 'Back'
  }

  function isInnerPage(pathname: string): boolean {
    return pathname !== '/' && pathname !== ''
  }

  export default function Navigation() {
    const { totalItems } = useCart()
  const [scrolled, setScrolled] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [canGoBack, setCanGoBack] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 60)
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
      setCanGoBack(isInnerPage(pathname) && window.history.length > 1)
    }, [pathname])

    const showBack = canGoBack && isInnerPage(pathname)
    const backLabel = getBackLabel(pathname)

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

              {/* Left: Logo + contextual back button */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <Link href="/" className="group flex-shrink-0">
                  {/* Logo — slow cinematic fade in on page load */}
                  <motion.img
                    src="/logo.png"
                    alt="Shamim Forever"
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 0.9, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ opacity: 1 }}
                    className="h-9 md:h-11 w-auto object-contain transition-opacity duration-500"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(201,160,84,0.15))' }}
                  />
                </Link>

                {/* Luxury back button — only on inner pages */}
                <AnimatePresence>
                  {showBack && (
                    <motion.button
                      key="back-btn"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => router.back()}
                      className="group flex items-center gap-2 border-l border-[#1a1a1a] pl-4"
                      aria-label="Go back"
                    >
                      <img
                        src="/logo-icon.png"
                        alt="SF"
                        className="w-[18px] h-[18px] object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-400 flex-shrink-0"
                        style={{ filter: 'drop-shadow(0 0 4px rgba(201,160,84,0.3))' }}
                      />
                      <span className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]/70 group-hover:text-[#c9a054] transition-colors duration-400 hidden sm:block"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}>
                        {backLabel}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c9a054]/30 group-hover:w-full transition-all duration-500" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav links — gold underline grows from CENTER on hover */}
              <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={link.href}
                      className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 hover:text-[#c9a054] transition-colors duration-500 relative group inline-block">
                      {link.label}
                      {/* Gold underline — grows from center outward */}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#c9a054] group-hover:w-full transition-all duration-500 ease-out" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex items-center gap-3 md:gap-4">
                <Link href="/inner-circle"
                  className="hidden lg:block text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors duration-500">
                  Inner Circle
                </Link>
                <Link href="/virtual-atelier"
                  className="hidden lg:block text-[8px] tracking-[0.35em] uppercase text-zinc-600 hover:text-[#c9a054] transition-colors duration-500 border border-[#111] px-3 py-1.5 hover:border-[#c9a054]/30">
                  AI Scanner
                </Link>

                <div className="hidden lg:block"><CurrencySelector /></div>

                {/* ── WALLET ICON ── */}
                  <Link href="/wallet" className="relative flex items-center justify-center w-8 h-8 text-zinc-500 hover:text-[#c9a054] transition-colors duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                    </svg>
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#c9a054] text-[#050505] text-[8px] font-bold leading-none">
                        {totalItems > 9 ? '9+' : totalItems}
                      </span>
                    )}
                  </Link>

                  {/* ── ACCESS BUTTON ── */}
                <Link href="/auth"
                  className="group relative inline-flex items-center justify-center px-3 md:px-4 py-1.5 md:py-2 border border-[#c9a054]/50 text-[7px] md:text-[8px] tracking-[0.35em] md:tracking-[0.4em] uppercase text-[#c9a054] overflow-hidden hover:border-[#c9a054] transition-colors duration-300">
                  <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Access</span>
                </Link>

                <button onClick={() => setDrawerOpen(true)}
                  className="lg:hidden flex flex-col gap-1.5 group p-1 ml-1">
                  <span className="w-5 h-px bg-zinc-400 group-hover:bg-[#c9a054] transition-colors duration-500" />
                  <span className="w-3.5 h-px bg-zinc-400 group-hover:bg-[#c9a054] transition-colors duration-500 ml-auto" />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </>
    )
  }
