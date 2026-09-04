'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  BarChart3, LogOut, ChevronRight, Truck, Hash, Star
} from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Image Manager', href: '/admin/products/images', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Shipments', href: '/admin/shipments', icon: Truck },
  { label: 'Serials / NFC', href: '/admin/generate-serials', icon: Hash },
  { label: 'Inner Circle', href: '/admin/inner-circle', icon: Star },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/auth')
      } else {
        setUser(session.user)
      }
      setChecking(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">Verifying Sovereign Access...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <aside className="w-72 border-r border-[#1a1a1a] flex flex-col fixed top-0 left-0 bottom-0 z-40 overflow-y-auto">
        <div className="p-8 border-b border-[#1a1a1a]">
          <Link href="/">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-light tracking-[0.3em] uppercase text-zinc-100">Shamim</span>
              <span className="font-serif text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">Forever</span>
            </div>
          </Link>
          <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mt-4">Sovereign Executive Panel</p>
        </div>

        <nav className="flex-1 p-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 transition-all duration-300 group ${
                  isActive
                    ? 'text-[#c9a054] bg-[#c9a054]/5 border-l border-[#c9a054]'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#111111]'
                }`}
              >
                <Icon size={14} strokeWidth={1.5} />
                <span className="text-[10px] tracking-[0.3em] uppercase">{item.label}</span>
                {isActive && <ChevronRight size={10} className="ml-auto" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-[#1a1a1a]">
          {user && (
            <div className="mb-4">
              <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">Signed in as</p>
              <p className="text-zinc-400 text-xs font-light truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-zinc-600 hover:text-red-500/70 transition-colors duration-300 text-[9px] tracking-[0.3em] uppercase"
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-72 min-h-screen">
        {children}
      </main>
    </div>
  )
}