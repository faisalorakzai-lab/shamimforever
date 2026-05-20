'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Collection, MainCategory } from '@/types'

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [{ data: cols }, { data: cats }] = await Promise.all([
        supabase.from('collections').select('*').order('created_at', { ascending: false }),
        supabase.from('main_categories').select('*'),
      ])
      if (cols) setCollections(cols)
      if (cats) setCategories(cats)
      setLoading(false)
    }
    fetchData()
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
            <p className="luxury-meta mb-6">Curated Universes</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8">
              Collections
            </h1>
            <p className="text-zinc-500 font-light max-w-lg leading-relaxed">
              Each collection is a sovereign world — a distinct olfactory territory 
              explored through obsessive craft and cultural precision.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Collections */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        {loading ? (
          <div className="text-center py-40">
            <p className="luxury-meta">Establishing Secure Connection to Sovereign Vault...</p>
          </div>
        ) : collections.length === 0 ? (
          <div className="text-center py-40">
            <p className="font-serif text-3xl font-light text-zinc-700 mb-4">Coming Soon</p>
            <p className="luxury-meta">Establishing Sovereign Collections...</p>
          </div>
        ) : (
          <div className="space-y-px bg-[#1a1a1a]">
            {collections.map((collection, i) => {
              const collectionCats = categories.filter(c => c.collection_id === collection.id)
              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#050505] group"
                >
                  <Link href={`/collections/${collection.id}`} className="block p-10 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                      {/* Left: Info */}
                      <div className="lg:col-span-2">
                        <p className="luxury-meta mb-4">Collection {String(i + 1).padStart(2, '0')}</p>
                        <h2 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6 group-hover:text-[#c9a054] transition-colors duration-700">
                          {collection.name}
                        </h2>
                        {collection.description && (
                          <p className="text-zinc-500 font-light leading-relaxed max-w-xl mb-8">
                            {collection.description}
                          </p>
                        )}
                        {collectionCats.length > 0 && (
                          <div className="flex flex-wrap gap-4">
                            {collectionCats.map(cat => (
                              <span key={cat.id} className="luxury-meta border border-[#1a1a1a] px-4 py-2">
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Image */}
                      <div className="aspect-[4/3] bg-[#0a0a0a] overflow-hidden relative">
                        {collection.cover_image ? (
                          <img
                            src={collection.cover_image}
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="font-serif text-6xl text-[#c9a054]/10">{String(i + 1).padStart(2, '0')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
