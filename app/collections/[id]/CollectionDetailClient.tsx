'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Collection, Product } from '@/types'
import { formatPKR } from '@/lib/utils'

export default function CollectionDetailClient({
  collection,
  products,
}: {
  collection: Collection
  products: Product[]
}) {
  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      <div className="border-b border-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {collection.cover_image && (
          <div className="absolute inset-0">
            <img src={collection.cover_image} alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 to-[#050505]" />
          </div>
        )}
        <div className="max-w-[1600px] mx-auto relative z-10">
          <Link href="/collections" className="luxury-meta hover:text-[#c9a054] transition-colors mb-8 inline-block">
            ← All Collections
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luxury-meta mb-6">Collection</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-zinc-500 font-light max-w-lg leading-relaxed">{collection.description}</p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        {products.length === 0 ? (
          <div className="text-center py-40">
            <p className="luxury-meta">No active products are currently available in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/products/${product.slug}`} className="block group">
                  <div className="aspect-[3/4] bg-[#0a0a0a] mb-6 overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="font-serif text-6xl text-[#c9a054]/10">SF</p>
                      </div>
                    )}
                  </div>
                  <p className="luxury-meta mb-2">{collection.name}</p>
                  <h2 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-2 group-hover:text-[#c9a054] transition-colors duration-500">
                    {product.name}
                  </h2>
                  <p className="text-zinc-400 text-sm font-light">{formatPKR(product.price_pkr)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}