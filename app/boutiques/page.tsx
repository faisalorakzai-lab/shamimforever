'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Boutique } from '@/types'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/BoutiqueMap'), { ssr: false })

const PLACEHOLDER_BOUTIQUES: Boutique[] = [
  {
    id: '1',
    name: 'Lahore Sovereign Node',
    address: 'DHA Phase VI, Sector C',
    city: 'Lahore',
    country: 'Pakistan',
    phone: '+92 42 3000 0001',
    email: 'lahore@shamimforever.com',
    coordinates: { lat: 31.4504, lng: 74.3587 },
    image: null,
    is_active: true,
  },
  {
    id: '2',
    name: 'Karachi Sovereign Node',
    address: 'Clifton Block 5',
    city: 'Karachi',
    country: 'Pakistan',
    phone: '+92 21 3000 0002',
    email: 'karachi@shamimforever.com',
    coordinates: { lat: 24.8260, lng: 67.0187 },
    image: null,
    is_active: true,
  },
  {
    id: '3',
    name: 'Dubai Sovereign Node',
    address: 'DIFC, Gate Village',
    city: 'Dubai',
    country: 'UAE',
    phone: '+971 4 300 0003',
    email: 'dubai@shamimforever.com',
    coordinates: { lat: 25.2105, lng: 55.2749 },
    image: null,
    is_active: true,
  },
]

export default function BoutiquesPage() {
  const [boutiques, setBoutiques] = useState<Boutique[]>([])
  const [selected, setSelected] = useState<Boutique | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBoutiques() {
      const { data } = await supabase
        .from('boutiques')
        .select('*')
        .eq('is_active', true)
      if (data && data.length > 0) {
        setBoutiques(data)
      } else {
        setBoutiques(PLACEHOLDER_BOUTIQUES)
      }
      setLoading(false)
    }
    fetchBoutiques()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luxury-meta mb-6">Global Sovereign Nodes</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8">
              Boutiques
            </h1>
            <p className="text-zinc-500 font-light max-w-lg leading-relaxed">
              Each boutique is a sovereign node — an outpost of the House. 
              Private viewings available by appointment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Map + List */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Boutique List */}
          <div className="lg:col-span-2 space-y-px bg-[#1a1a1a]">
            {boutiques.map((boutique, i) => (
              <motion.div
                key={boutique.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(boutique)}
                className={`bg-[#050505] p-8 cursor-pointer group transition-colors duration-500 ${
                  selected?.id === boutique.id ? 'bg-[#0a0a0a]' : 'hover:bg-[#0a0a0a]'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="luxury-meta mb-2">
                      Node {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className={`font-serif text-xl font-light tracking-[0.2em] uppercase transition-colors duration-500 ${
                      selected?.id === boutique.id ? 'text-[#c9a054]' : 'text-zinc-100 group-hover:text-[#c9a054]'
                    }`}>
                      {boutique.city}
                    </h3>
                  </div>
                  {selected?.id === boutique.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a054] mt-1" />
                  )}
                </div>
                <p className="text-zinc-500 text-xs font-light mb-1">{boutique.address}</p>
                <p className="text-zinc-600 text-xs font-light">{boutique.country}</p>

                {selected?.id === boutique.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 pt-6 border-t border-[#1a1a1a] space-y-4"
                  >
                    <div>
                      <p className="luxury-meta mb-1">Phone</p>
                      <a href={`tel:${boutique.phone}`} className="text-zinc-400 text-xs font-light hover:text-[#c9a054] transition-colors">
                        {boutique.phone}
                      </a>
                    </div>
                    {boutique.email && (
                      <div>
                        <p className="luxury-meta mb-1">Email</p>
                        <a href={`mailto:${boutique.email}`} className="text-zinc-400 text-xs font-light hover:text-[#c9a054] transition-colors">
                          {boutique.email}
                        </a>
                      </div>
                    )}
                    <div className="flex gap-3 mt-6">
                      <a href={`mailto:${boutique.email}`} className="luxury-btn text-[8px] py-2 px-4">
                        Request Private Viewing
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="h-[600px] bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden sticky top-24">
              {!loading && (
                <Map
                  boutiques={boutiques}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Concierge CTA */}
      <section className="py-20 border-t border-[#1a1a1a] px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="luxury-meta mb-6">VIP Access</p>
            <h2 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8">
              Contact VIP Concierge
            </h2>
            <p className="text-zinc-500 font-light mb-10 max-w-md mx-auto">
              For private viewings, bespoke commissions, or corporate gifting, 
              our concierge team is available 24 hours.
            </p>
            <a
              href="mailto:faisalorakzaiofficial@gmail.com"
              className="luxury-btn text-[9px]"
            >
              Contact Concierge
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
