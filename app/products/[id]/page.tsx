'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'
import { formatPKR } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Copy, Check, Upload, X, ExternalLink } from 'lucide-react'
import NftBadge from '@/components/NftBadge'
import ShamimsBloomPage from '@/components/ShamimsBloomPage'
import ShamimBloomSovereignPage from '@/components/ShamimBloomSovereignPage'
import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
import { useAccount } from 'wagmi'

const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'

interface ProductDetails {
  tagline?: string; olfactory?: string
  scentPyramid?: { top: string; heart: string; base: string }
  specs?: { volume: string; concentration: string; sillage: string; longevity: string; batch: string; price: string }
}

interface OrderResult {
  order_id: string; order_ref: string; tracking_ref: string
  status: string; track_url: string
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="flex items-center gap-1.5 text-[#c9a054] hover:text-zinc-100 transition-colors">
      {copied ? <Check size={11} /> : <Copy size={11} />}
      <span className="text-[8px] tracking-[0.3em] uppercase">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function ScentPyramid({ pyramid }: { pyramid: ProductDetails['scentPyramid'] }) {
  if (!pyramid) return null
  const layers = [
    { label: 'TOP', sublabel: 'Opening', value: pyramid.top, width: 'w-2/3', delay: 0 },
    { label: 'HEART', sublabel: 'Core', value: pyramid.heart, width: 'w-4/5', delay: 0.1 },
    { label: 'BASE', sublabel: 'Anchor', value: pyramid.base, width: 'w-full', delay: 0.2 },
  ]
  return (
    <div className="space-y-1">
      {layers.map(layer => (
        <motion.div key={layer.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: layer.delay }} className="flex gap-6 items-stretch">
          <div className="w-16 shrink-0 flex flex-col justify-center">
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#c9a054]">{layer.label}</p>
            <p className="text-[7px] tracking-[0.2em] uppercase text-zinc-600">{layer.sublabel}</p>
          </div>
          <div className={`${layer.width} bg-gradient-to-r from-[#c9a054]/20 to-[#c9a054]/5 border-l-2 border-[#c9a054] px-5 py-4`}>
            <p className="text-zinc-300 text-xs font-light leading-relaxed">{layer.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [details, setDetails] = useState<ProductDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'story' | 'specs' | 'nft'>('story')

  const [payMethod, setPayMethod] = useState<PayMethod>('crypto')
  const [txId, setTxId] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const [orderError, setOrderError] = useState<string | null>(null)

  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')

  const { address: walletAddress } = useAccount()

  useEffect(() => {
    const slug = params.id
    supabase.from('products').select('*, main_category:main_categories(*)').eq('slug', slug).single()
      .then(({ data }) => {
        if (data) {
          setProduct(data); tryParseDetails(data); setLoading(false)
        } else {
          supabase.from('products').select('*, main_category:main_categories(*)').eq('id', slug).single()
            .then(({ data: d2 }) => { setProduct(d2); if (d2) tryParseDetails(d2); setLoading(false) })
        }
      })
  }, [params.id])

  function tryParseDetails(p: any) {
    if (p?.story) { try { setDetails(JSON.parse(p.story)) } catch {} }
  }

  const callCheckout = useCallback(async (opts: {
    paymentMethod: string; paymentStatus: string
    txHash?: string; proofUrl?: string; walletAddress?: string
  }) => {
    if (!product) throw new Error('No product')
    const priceUsd = product.price_usd * quantity
    const discount = opts.paymentMethod === 'okbond' ? 10 : 0
    const totalUsd = parseFloat((priceUsd * (1 - discount / 100)).toFixed(2))

    const res = await fetch('/api/v1/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.id,
        product_name: product.name,
        quantity,
        payment_method: opts.paymentMethod,
        payment_status: opts.paymentStatus,
        tx_hash: opts.txHash || null,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
        total_pkr: product.price_pkr * quantity,
        total_usd: totalUsd,
        discount_applied: discount,
        price_pkr: product.price_pkr,
        price_usd: product.price_usd,
        wallet_address: opts.walletAddress || null,
        payment_proof_url: opts.proofUrl || null,
        rarity_tier: 'ELITE',
      }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Checkout failed')
    return data as OrderResult
  }, [product, quantity, custName, custPhone, custAddress, custCity])

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    try {
      const result = await callCheckout({
        paymentMethod: coin.toLowerCase(),
        paymentStatus: 'paid',
        txHash,
        walletAddress: walletAddress || undefined,
      })
      setOrderResult(result)
    } catch (err: unknown) {
      const e = err as { message?: string }
      setOrderError(e?.message || 'Order save failed — but your crypto payment went through. Contact us with your TX hash.')
    }
  }, [callCheckout, walletAddress])

  async function handlePlaceOrder() {
    if (!product) return
    if (!custName || !custPhone || !custAddress || !custCity) {
      setOrderError('Please fill in all delivery details.'); return
    }
    if (payMethod === 'pkr_manual' && !txId && !proofFile) {
      setOrderError('Please provide Transaction ID or upload payment screenshot.'); return
    }
    setSubmitting(true); setOrderError(null)
    try {
      let proofUrl: string | null = null
      if (proofFile && proofPreview) {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageStr: proofPreview }),
        })
        const uploadData = await uploadRes.json()
        if (uploadData.url) proofUrl = uploadData.url
      }
      const result = await callCheckout({
        paymentMethod: payMethod,
        paymentStatus: payMethod === 'cod' ? 'pending' : 'awaiting_verification',
        proofUrl: proofUrl || undefined,
        txHash: txId || undefined,
      })
      setOrderResult(result)
    } catch (err: unknown) {
      const e = err as { message?: string }
      setOrderError(e?.message || 'Failed to place order. Please try again.')
    }
    setSubmitting(false)
  }

  function handleProofFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setProofFile(file)
    const reader = new FileReader()
    reader.onload = ev => setProofPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center">
      <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">Accessing Sovereign Vault...</p>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex flex-col items-center justify-center gap-8">
      <p className="font-serif text-4xl font-light text-zinc-700">Creation Not Found</p>
      <Link href="/shop" className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 border border-zinc-800 px-8 py-3 hover:text-[#c9a054] hover:border-[#c9a054]/40 transition-all">
        Return to Shop
      </Link>
    </div>
  )

  if (product.slug === 'shamims-bloom') return <ShamimsBloomPage product={product} onBack={() => window.history.back()} />
  if (product.slug === 'shamim-bloom-sovereign-grace') return <ShamimBloomSovereignPage product={product} />

  const images = product.images || []
  const ease = [0.16, 1, 0.3, 1] as const
  const finalPkr = product.price_pkr * quantity

  // ─── Order Success Screen ─────────────────────────────────────────────────────
  if (orderResult) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }} className="text-center max-w-lg w-full">
        <p className="font-serif text-7xl text-[#c9a054] mb-8">◆</p>
        <h2 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-3">
          Order Placed
        </h2>
        <p className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054] mb-10">
          House of Shamim Forever
        </p>

        {/* Order details */}
        <div className="border border-[#1a1a1a] divide-y divide-[#111] mb-8 text-left">
          <div className="flex justify-between items-center px-6 py-4">
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">Order Reference</p>
            <div className="flex items-center gap-2">
              <p className="text-zinc-100 font-mono text-sm font-light">{orderResult.order_ref}</p>
              <CopyButton text={orderResult.order_ref} />
            </div>
          </div>
          <div className="flex justify-between items-center px-6 py-4">
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">Tracking ID</p>
            <div className="flex items-center gap-2">
              <p className="text-zinc-300 font-mono text-xs">{orderResult.tracking_ref}</p>
              <CopyButton text={orderResult.tracking_ref} />
            </div>
          </div>
          <div className="flex justify-between items-center px-6 py-4">
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">Status</p>
            <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 border ${
              orderResult.status === 'confirmed' ? 'border-emerald-500/30 text-emerald-400'
              : 'border-amber-500/30 text-amber-400'
            }`}>
              {orderResult.status?.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="flex justify-between items-center px-6 py-4">
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">NFT Digital Twin</p>
            <p className="text-zinc-600 text-[8px]">Minting in background...</p>
          </div>
        </div>

        <div className="text-zinc-500 text-xs font-light leading-relaxed mb-8 px-4">
          {orderResult.status === 'confirmed'
            ? 'Your order is confirmed. A WhatsApp notification has been sent to our team. Your sovereign creation will be dispatched shortly.'
            : 'Your order has been received and is pending payment verification. Our team will review within 2-4 hours.'}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={orderResult.track_url}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[#c9a054]/40 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all">
            <ExternalLink size={11} /> Track Order
          </Link>
          <Link href="/shop"
            className="flex items-center justify-center px-6 py-3 border border-zinc-800 text-[8px] tracking-[0.4em] uppercase text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )

  const specRows = details?.specs ? [
    { label: 'Volume Density', value: details.specs.volume },
    { label: 'Concentration Class', value: details.specs.concentration },
    { label: 'Sillage & Projection', value: details.specs.sillage },
    { label: 'Longevity Vector', value: details.specs.longevity },
    { label: 'Batch Production', value: details.specs.batch },
    { label: 'Valuation', value: details.specs.price },
  ] : []

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

          {/* Images */}
          <div>
            <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.img key={activeImage} src={images[activeImage]} alt={product.name}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="font-serif text-9xl text-[#c9a054]/10">SF</p>
                  </div>
                )}
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage(i => Math.max(0, i - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#050505]/80 text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#050505]/80 text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={'flex-shrink-0 overflow-hidden border transition-colors ' + (activeImage === i ? 'border-[#c9a054]/60' : 'border-transparent')}
                    style={{ width: 60, aspectRatio: '1' }}>
                    <img src={img} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info + checkout */}
          <div>
            {(product as any).main_category?.name && (
              <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">{(product as any).main_category.name}</p>
            )}
            <h1 className="font-serif font-light text-4xl md:text-5xl tracking-[0.1em] text-zinc-100 leading-tight mb-4">{product.name}</h1>
            {details?.tagline && <p className="font-serif italic text-zinc-500 text-lg mb-8">{details.tagline}</p>}

            <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-[#111]">
              <p className="text-3xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
              <p className="text-zinc-500 text-sm">${product.price_usd} USD</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#111] mb-10">
              {(['story', 'specs', 'nft'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={'flex-1 py-4 text-[8px] tracking-[0.35em] uppercase transition-all duration-300 border-b-2 ' +
                    (activeTab === tab ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-600 border-transparent hover:text-zinc-400')}>
                  {tab === 'story' ? 'Story' : tab === 'specs' ? 'Specs' : 'Digital Twin'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'story' && (
                <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 mb-10">
                  {product.description && <p className="text-zinc-500 font-light leading-[2] text-sm">{product.description}</p>}
                  {details?.olfactory && <p className="font-serif italic text-zinc-600 text-sm leading-[2] border-l-2 border-[#c9a054]/20 pl-5">{details.olfactory}</p>}
                  {details?.scentPyramid && <ScentPyramid pyramid={details.scentPyramid} />}
                </motion.div>
              )}
              {activeTab === 'specs' && (
                <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-10">
                  {specRows.map(({ label, value }) => value ? (
                    <div key={label} className="flex justify-between items-center py-5 border-b border-[#0d0d0d]">
                      <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-600">{label}</p>
                      <p className="text-zinc-300 text-xs font-light text-right">{value}</p>
                    </div>
                  ) : null)}
                </motion.div>
              )}
              {activeTab === 'nft' && (
                  <motion.div key="nft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-10">
                    <NftBadge product={product} />
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-0 border border-[#1a1a1a]">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors border-r border-[#1a1a1a]">−</button>
                <span className="w-10 text-center text-zinc-300 text-sm">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors border-l border-[#1a1a1a]">+</button>
              </div>
              <div>
                <p className="font-serif text-2xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
                <p className="text-zinc-600 text-xs">${(product.price_usd * quantity).toFixed(2)} USD</p>
              </div>
            </div>

            {/* Delivery details */}
            <div className="grid grid-cols-1 gap-2 mb-6">
              {[
                { v: custName, s: setCustName, ph: 'Full Name *' },
                { v: custPhone, s: setCustPhone, ph: 'Phone Number *' },
                { v: custAddress, s: setCustAddress, ph: 'Delivery Address *' },
                { v: custCity, s: setCustCity, ph: 'City *' },
              ].map(({ v, s, ph }) => (
                <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                  className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 placeholder:text-zinc-700 focus:border-[#c9a054]/30 focus:outline-none transition-colors" />
              ))}
            </div>

            {/* Payment method tabs */}
            <div className="mb-5">
              <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mb-3">Payment Method</p>
              <div className="flex border border-[#1a1a1a] mb-5">
                {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    className={'flex-1 py-3 text-[8px] tracking-[0.22em] uppercase transition-all duration-300 border-b-2 ' +
                      (payMethod === m ? 'bg-[#c9a054]/8 text-[#c9a054] border-b-[#c9a054]' : 'text-zinc-600 border-b-transparent hover:text-zinc-400')}>
                    {m === 'crypto' ? '◆ Crypto' : m === 'pkr_manual' ? 'PKR Bank' : 'COD'}
                  </button>
                ))}
              </div>

              {payMethod === 'crypto' && (
                <Web3PaySection
                  priceUsd={product.price_usd * quantity}
                  onSuccess={handleWeb3Success}
                />
              )}

              {payMethod === 'pkr_manual' && (
                <div className="space-y-4">
                  <div className="p-5 border border-[#1a1a1a] bg-[#080808] space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-[#111]">
                      <span className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">EasyPaisa</span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 text-xs">{EASYPAISA_NUMBER} · {EASYPAISA_NAME}</span>
                        <CopyButton text={EASYPAISA_NUMBER} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">UBL IBAN</span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 text-[9px] font-mono">{UBL_IBAN}</span>
                        <CopyButton text={UBL_IBAN} />
                      </div>
                    </div>
                  </div>
                  <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID or reference number"
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors placeholder:text-zinc-700" />
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-dashed border-[#1a1a1a] hover:border-[#c9a054]/30 transition-colors">
                    <Upload size={13} className="text-zinc-600" />
                    <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-600">Upload Payment Screenshot</span>
                    <input type="file" accept="image/*" onChange={handleProofFile} className="hidden" />
                  </label>
                  {proofPreview && (
                    <div className="relative inline-block">
                      <img src={proofPreview} alt="proof" className="h-24 object-cover opacity-60" />
                      <button onClick={() => { setProofFile(null); setProofPreview(null) }} className="absolute top-1 right-1 text-zinc-400 hover:text-white"><X size={12} /></button>
                    </div>
                  )}
                  {orderError && <p className="text-red-400/80 text-[9px]">{orderError}</p>}
                  <button onClick={handlePlaceOrder} disabled={submitting}
                    className="w-full py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500 disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit Order'}
                  </button>
                  <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700">
                    Verified within 2-4 hours by our team.
                  </p>
                </div>
              )}

              {payMethod === 'cod' && (
                <div className="space-y-4">
                  <div className="p-4 border border-[#1a1a1a] bg-[#080808]">
                    <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-500 mb-2">Cash on Delivery</p>
                    <p className="text-zinc-600 text-xs leading-relaxed">Pay when your order arrives. Available within Pakistan. Our team will confirm via WhatsApp.</p>
                  </div>
                  {orderError && <p className="text-red-400/80 text-[9px]">{orderError}</p>}
                  <button onClick={handlePlaceOrder} disabled={submitting}
                    className="w-full py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500 disabled:opacity-50">
                    {submitting ? 'Placing Order...' : 'Place COD Order'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
