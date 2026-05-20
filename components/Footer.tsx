'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] mt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <div className="flex flex-col leading-none mb-6">
                <span className="font-serif text-2xl font-light tracking-[0.3em] uppercase text-zinc-100">
                  Shamim
                </span>
                <span className="font-serif text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">
                  Forever
                </span>
              </div>
            </Link>
            <p className="text-zinc-500 text-xs font-light leading-relaxed tracking-wide max-w-[200px]">
              A sovereign luxury digital house. Crafted for the discerning few.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="luxury-meta mb-6">Navigate</p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Shop', href: '/shop' },
                { label: 'Collections', href: '/collections' },
                { label: 'Atelier', href: '/atelier' },
                { label: 'Journal', href: '/journal' },
                { label: 'Boutiques', href: '/boutiques' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-[0.2em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Access */}
          <div>
            <p className="luxury-meta mb-6">Access</p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Inner Circle', href: '/inner-circle' },
                { label: 'Authenticate', href: '/auth' },
                { label: 'Sovereign Panel', href: '/admin' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-[0.2em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="luxury-meta mb-6">Concierge</p>
            <div className="flex flex-col gap-4">
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Private viewings available by appointment.
              </p>
              <a
                href="mailto:faisalorakzaiofficial@gmail.com"
                className="text-xs tracking-[0.2em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500"
              >
                Request Consultation
              </a>
            </div>

            <div className="mt-10">
              <p className="luxury-meta mb-4">Payments</p>
              <div className="flex flex-wrap gap-2">
                {['PKR', 'USD', 'USDT', 'USDC', 'OKBOND'].map((p) => (
                  <span
                    key={p}
                    className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 border border-[#1a1a1a] px-2 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700">
            © 2025 Shamim Forever. All Rights Reserved.
          </p>
          <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700">
            Sovereign Luxury — Est. 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
