'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'
import { formatPKR, formatUSD, applyOkbondDiscount } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PAYMENT_METHODS = [
  { id: 'pkr', label: 'PKR — Pakistani Rupee', currency: 'PKR' },
  { id: 'usd', label: 'USD — US Dollar', currency: 'USD' },
  { id: 'usdt', label: 'USDT — Tether', currency: 'USDT' },
  { id: 'usdc', label: 'USDC — USD Coin', currency: 'USDC' },
  { id: 'okbond', label: 'OKBOND — 10% Sovereign Discount', currency: 'OKBOND' },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState('pkr')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*, collection:collections(*), main_category:main_categories(*)')
        .eq('id', params.id)
        .single()
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  function getDisplayPrice() {
    if (!product) return ''
    const isOkbond = selectedPayment === 'okbond'
    if (selectedPayment === 'usd' || selectedPayment === 'usdt' || selectedPayment === 'usdc') {
      const price = isOkbond ? applyOkbondDiscount(product.price_usd) : product.price_usd
      return formatUSD(price)
    }
    const price = isOkbond ? applyOkbondDiscount(product.price_pkr) : product.price_pkr
    return formatPKR(price)
  }

  async function handleAddToCart() {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center">
        <p className="luxury-meta">Accessing Sovereign Vault...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] pt-20 flex flex-col items-center justify-center gap-8">
        <p className="font-serif text-4xl font-light text-zinc-700">Creation Not Found</p>
        <Link href="/shop" className="luxury-btn text-[9px]">Return to Shop</Link>
      </div>
    )
  }

  const images = product.images?.length > 0 ? product.images : []
  const isOkbond = selectedPayment === 'okbond'

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-8 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-zinc-600">
          <Link href="/" className="hover:text-[#c9a054] transition-colors">House</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#c9a054] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-zinc-400">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="font-serif text-9xl text-[#c9a054]/10">SF</p>
                  </div>
                )}
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(i => Math.max(0, i - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#c9a054]/30 text-[#c9a054] hover:bg-[#c9a054] hover:text-black transition-all duration-300"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#c9a054]/30 text-[#c9a054] hover:bg-[#c9a054] hover:text-black transition-all duration-300"
                  >
                    <ChevronRight size={14} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 overflow-hidden border transition-all duration-300 ${
                      activeImage === i ? 'border-[#c9a054]' : 'border-[#1a1a1a] opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {product.collection && (
              <p className="luxury-meta mb-6">{product.collection.name}</p>
            )}

            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 leading-tight">
              {product.name}
            </h1>

            {/* Price Display */}
            <div className="mb-10">
              <div className="flex items-baseline gap-4">
                <p className="font-serif text-3xl font-light text-zinc-100">
                  {getDisplayPrice()}
                </p>
                {isOkbond && (
                  <span className="luxury-meta text-red-400/70 line-through text-xs">
                    {formatPKR(product.price_pkr)}
                  </span>
                )}
              </div>
              {isOkbond && (
                <p className="luxury-meta text-[#c9a054] mt-2">
                  10% Sovereign Discount Applied
                </p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-zinc-400 font-light leading-relaxed mb-10 text-sm">
                {product.description}
              </p>
            )}

            {/* Story */}
            {product.story && (
              <div className="border-l border-[#c9a054]/30 pl-6 mb-10">
                <p className="luxury-meta mb-3">The Story</p>
                <p className="text-zinc-500 font-light leading-relaxed text-sm italic">
                  {product.story}
                </p>
              </div>
            )}

            {/* Payment Method */}
            <div className="mb-10">
              <p className="luxury-meta mb-4">Payment Currency</p>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center justify-between p-4 border transition-all duration-300 text-left ${
                      selectedPayment === method.id
                        ? 'border-[#c9a054] bg-[#c9a054]/5'
                        : 'border-[#1a1a1a] hover:border-[#c9a054]/30'
                    }`}
                  >
                    <span className={`text-xs tracking-[0.2em] uppercase font-light ${
                      selectedPayment === method.id ? 'text-[#c9a054]' : 'text-zinc-400'
                    }`}>
                      {method.label}
                    </span>
                    {selectedPayment === method.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <p className="luxury-meta mb-4">Quantity</p>
              <div className="flex items-center gap-6 border border-[#1a1a1a] w-fit">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-[#c9a054] hover:bg-[#0a0a0a] transition-all duration-300"
                >
                  −
                </button>
                <span className="text-zinc-100 font-light w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.inventory, q + 1))}
                  className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-[#c9a054] hover:bg-[#0a0a0a] transition-all duration-300"
                >
                  +
                </button>
              </div>
              {product.inventory <= 10 && (
                <p className="luxury-meta mt-3 text-amber-500/70">
                  {product.inventory} units remaining
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.98 }}
              className={`w-full luxury-btn text-[10px] py-5 ${
                added ? 'bg-[#c9a054] text-black border-[#c9a054]' : ''
              }`}
            >
              {added ? '✓ Added to Collection' : 'Add to Collection'}
            </motion.button>

            {/* Metadata */}
            <div className="mt-12 pt-8 border-t border-[#1a1a1a] grid grid-cols-2 gap-6">
              <div>
                <p className="luxury-meta mb-2">Authenticity</p>
                <p className="text-zinc-500 text-xs font-light">Blockchain Verified</p>
              </div>
              <div>
                <p className="luxury-meta mb-2">Provenance</p>
                <p className="text-zinc-500 text-xs font-light">House of Shamim Forever</p>
              </div>
              <div>
                <p className="luxury-meta mb-2">Packaging</p>
                <p className="text-zinc-500 text-xs font-light">Sovereign Edition Box</p>
              </div>
              <div>
                <p className="luxury-meta mb-2">Delivery</p>
                <p className="text-zinc-500 text-xs font-light">White Glove Service</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
