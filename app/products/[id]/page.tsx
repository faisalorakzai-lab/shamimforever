'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'
import { formatPKR, formatUSD } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Copy, Check, Upload, X, Gem, Leaf, Package } from 'lucide-react'
import ShamimsBloomPage from '@/components/ShamimsBloomPage'

const WALLET_ADDRESS = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
const OKBOND_CONTRACT = '0xc89729DA02a8c2E282EC3070A9a680E01bE2E22F'
const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'
const UBL_ACCOUNT = '0909318870498'
const OKBOND_DISCOUNT = 0.1

type PaymentMethod = 'crypto' | 'pkr_manual' | 'cod'
type CryptoCoin = 'USDT' | 'USDC' | 'OKBOND'

interface ProductDetails {
  tagline?: string
  olfactory?: string
  ingredients?: Array<{ name: string; role: string; detail: string }>
  scentPyramid?: { top: string; heart: string; base: string }
  specs?: { volume: string; concentration: string; sillage: string; longevity: string; batch: string; price: string }
  nft?: { title: string; description: string }
  packaging?: string
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-[#c9a054] hover:text-zinc-100 transition-colors duration-300">
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
      {layers.map((layer) => (
        <motion.div
          key={layer.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: layer.delay, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-6 items-stretch"
        >
          <div className="w-16 shrink-0 flex flex-col justify-center">
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#c9a054] font-medium">{layer.label}</p>
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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('crypto')
  const [cryptoCoin, setCryptoCoin] = useState<CryptoCoin>('USDT')
  const [txHash, setTxHash] = useState('')
  const [txId, setTxId] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)

  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')
  const [custCountry, setCustCountry] = useState('Pakistan')

  useEffect(() => {
    const slug = params.id
    // Try by slug first, then fallback to ID
    supabase
      .from('products')
      .select('*, collection:collections(*), main_category:main_categories(*)')
      .eq('slug', slug)
      .single()
      .then(({ data }) => {
        if (data) {
          setProduct(data)
          if (data?.story) { try { setDetails(JSON.parse(data.story)) } catch {} }
          setLoading(false)
        } else {
          // Fallback to ID lookup
          return supabase
            .from('products')
            .select('*, collection:collections(*), main_category:main_categories(*)')
            .eq('id', slug)
            .single()
            .then(({ data: d2 }) => {
              setProduct(d2)
              if (d2?.story) { try { setDetails(JSON.parse(d2.story)) } catch {} }
              setLoading(false)
            })
        }
      })
  }, [params.id])

  function getDiscountedPrice(base: number) {
    if (paymentMethod === 'crypto' && cryptoCoin === 'OKBOND') return base * (1 - OKBOND_DISCOUNT)
    return base
  }

  function handleProofFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setProofFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setProofPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function handlePlaceOrder() {
    if (!product) return
    if (!custName || !custPhone || !custAddress || !custCity || !custCountry) { setOrderError('Please fill in all delivery details.'); return }
    if (paymentMethod === 'crypto' && !txHash) { setOrderError('Please enter your transaction hash.'); return }
    if (paymentMethod === 'pkr_manual' && !txId && !proofFile) { setOrderError('Please provide transaction ID or upload payment screenshot.'); return }
    setSubmitting(true); setOrderError(null)
    try {
      let proofUrl: string | null = null
      if (proofFile && proofPreview) {
        const uploadRes = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageStr: proofPreview }) })
        const uploadData = await uploadRes.json()
        if (uploadData.url) proofUrl = uploadData.url
      }
      const isOkbond = paymentMethod === 'crypto' && cryptoCoin === 'OKBOND'
      const totalPkr = getDiscountedPrice(product.price_pkr) * quantity
      const totalUsd = getDiscountedPrice(product.price_usd) * quantity
      const { data: order, error } = await supabase.from('orders').insert([{
        status: paymentMethod === 'cod' ? 'confirmed' : 'pending_verification',
        payment_method: paymentMethod === 'crypto' ? cryptoCoin.toLowerCase() : paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'awaiting_verification',
        total_pkr: Math.round(totalPkr), total_usd: parseFloat(totalUsd.toFixed(2)),
        discount_applied: isOkbond ? OKBOND_DISCOUNT * 100 : 0,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: custCountry },
        notes: txHash ? ('Tx Hash: ' + txHash) : txId ? ('Tx ID: ' + txId) : paymentMethod === 'cod' ? 'Cash on Delivery' : '',
        payment_proof_url: proofUrl,
      }]).select().single()
      if (error) throw error
      await supabase.from('order_items').insert([{
        order_id: order.id, product_id: product.id, quantity,
        price_pkr: Math.round(getDiscountedPrice(product.price_pkr)),
        price_usd: parseFloat(getDiscountedPrice(product.price_usd).toFixed(2)),
      }])
      setOrderPlaced(true)
    } catch (err: unknown) {
      const e = err as { message?: string }
      setOrderError(e?.message || 'Failed to place order. Please try again.')
    }
    setSubmitting(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center">
      <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">Accessing Sovereign Vault...</p>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex flex-col items-center justify-center gap-8">
      <p className="font-serif text-4xl font-light text-zinc-700">Creation Not Found</p>
      <Link href="/shop" className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 border border-zinc-800 px-8 py-3 hover:text-[#c9a054] hover:border-[#c9a054]/40 transition-all">Return to Shop</Link>
    </div>
  )

  // ── SHAMIM'S BLOOM special cinematic page ──
  if (product.slug === 'shamims-bloom') {
    return <ShamimsBloomPage product={product} onBack={() => window.history.back()} />
  }

  const images = product.images || []
  const isOkbond = paymentMethod === 'crypto' && cryptoCoin === 'OKBOND'
  const finalPkr = getDiscountedPrice(product.price_pkr) * quantity
  const finalUsd = getDiscountedPrice(product.price_usd) * quantity
  const ease = [0.16, 1, 0.3, 1] as const

  if (orderPlaced) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease }} className="text-center max-w-lg">
        <p className="font-serif text-6xl text-[#c9a054] mb-8">◆</p>
        <h2 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6">Order Received</h2>
        {paymentMethod === 'cod' ? (
          <p className="text-zinc-400 font-light leading-relaxed mb-10">Your order has been confirmed for <strong className="text-zinc-200">Cash on Delivery</strong>. Our team will contact you shortly.</p>
        ) : (
          <p className="text-zinc-400 font-light leading-relaxed mb-10">Your order is <strong className="text-zinc-200">pending verification</strong>. Once our team verifies your payment, your order will be confirmed and dispatched.</p>
        )}
        <Link href="/shop" className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 border border-zinc-800 px-8 py-3 hover:text-[#c9a054] hover:border-[#c9a054]/40 transition-all">Continue Shopping</Link>
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
          <div>
            <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.img key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                    src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="font-serif text-9xl text-[#c9a054]/10">SF</p>
                  </div>
                )}
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage(i => Math.max(0, i - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#050505]/80 text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#050505]/80 text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={'flex-shrink-0 aspect-square overflow-hidden border transition-colors ' + (activeImage === i ? 'border-[#c9a054]/60' : 'border-transparent')} style={{ width: '60px' }}>
                    <img src={img} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {(product as any).main_category?.name && (
              <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">{(product as any).main_category.name}</p>
            )}
            <h1 className="font-serif font-light text-4xl md:text-5xl tracking-[0.1em] text-zinc-100 leading-tight mb-4">{product.name}</h1>
            {details?.tagline && (
              <p className="font-serif italic text-zinc-500 text-lg mb-8">{details.tagline}</p>
            )}
            <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-[#111]">
              <p className="text-3xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
              <p className="text-zinc-500 text-sm">${finalUsd.toFixed(0)} USD</p>
              {isOkbond && <span className="text-[8px] tracking-[0.3em] uppercase text-[#c9a054]">−10% OKBOND</span>}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#111] mb-10">
              {(['story', 'specs', 'nft'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={'flex-1 py-4 text-[8px] tracking-[0.35em] uppercase transition-all duration-300 border-b-2 ' + (activeTab === tab ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-600 border-transparent hover:text-zinc-400')}>
                  {tab === 'story' ? 'Story' : tab === 'specs' ? 'Specs' : 'Digital Twin'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'story' && (
                <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-8 mb-10">
                  {product.description && <p className="text-zinc-500 font-light leading-[2] text-sm">{product.description}</p>}
                  {details?.olfactory && <p className="font-serif italic text-zinc-600 text-sm leading-[2] border-l-2 border-[#c9a054]/20 pl-5">{details.olfactory}</p>}
                  {details?.scentPyramid && <ScentPyramid pyramid={details.scentPyramid} />}
                </motion.div>
              )}
              {activeTab === 'specs' && (
                <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="mb-10 space-y-0">
                  {specRows.map(({ label, value }) => value ? (
                    <div key={label} className="flex justify-between items-center py-5 border-b border-[#0d0d0d]">
                      <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-600">{label}</p>
                      <p className="text-zinc-300 text-xs font-light text-right">{value}</p>
                    </div>
                  ) : null)}
                </motion.div>
              )}
              {activeTab === 'nft' && (
                <motion.div key="nft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="mb-10 space-y-6">
                  <p className="text-zinc-500 font-light leading-[2] text-sm">{details?.nft?.description || 'Every creation from the House of Shamim Forever comes with a Digital Twin — an NFT minted on Polygon that permanently records your ownership and provides VVIP access to the House.'}</p>
                  <div className="p-5 border border-[#c9a054]/15 bg-[#c9a054]/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-600">Network</p>
                      <p className="text-zinc-300 text-xs">Polygon Mainnet</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-600">Auto-Mint</p>
                      <p className="text-zinc-300 text-xs">On Purchase Confirmation</p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-600">Verify</p>
                      <Link href={'/authenticate?serial=' + (product.slug || product.id)} className="text-[8px] tracking-[0.25em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors">Authenticate →</Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Payment */}
            <div className="mb-6">
              <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mb-4">Payment Method</p>
              <div className="flex gap-0 border border-[#1a1a1a] mb-6">
                {(['crypto', 'pkr_manual', 'cod'] as PaymentMethod[]).map(m => (
                  <button key={m} onClick={() => setPaymentMethod(m)} className={'flex-1 py-3 text-[8px] tracking-[0.25em] uppercase transition-all duration-300 ' + (paymentMethod === m ? 'bg-[#c9a054]/10 text-[#c9a054] border-b-2 border-b-[#c9a054]' : 'text-zinc-600 hover:text-zinc-400')}>
                    {m === 'crypto' ? 'Crypto' : m === 'pkr_manual' ? 'PKR Bank' : 'COD'}
                  </button>
                ))}
              </div>

              {paymentMethod === 'crypto' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['USDT', 'USDC', 'OKBOND'] as CryptoCoin[]).map(c => (
                      <button key={c} onClick={() => setCryptoCoin(c)} className={'flex-1 py-2.5 text-[8px] tracking-[0.2em] uppercase border transition-all duration-300 ' + (cryptoCoin === c ? 'border-[#c9a054]/50 text-[#c9a054] bg-[#c9a054]/5' : 'border-[#1a1a1a] text-zinc-600 hover:text-zinc-400')}>
                        {c}{c === 'OKBOND' ? ' −10%' : ''}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 border border-[#1a1a1a] bg-[#080808]">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[9px] text-zinc-400 font-mono truncate">{WALLET_ADDRESS}</p>
                      <CopyButton text={WALLET_ADDRESS} />
                    </div>
                  </div>
                  <input value={txHash} onChange={e => setTxHash(e.target.value)} placeholder="Transaction hash (0x...)"
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors" />
                </div>
              )}

              {paymentMethod === 'pkr_manual' && (
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
                      <span className="text-zinc-400 text-[10px]">{UBL_IBAN}</span>
                      <CopyButton text={UBL_IBAN} />
                    </div>
                  </div>
                  <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID or reference"
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors" />
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-dashed border-[#1a1a1a] hover:border-[#c9a054]/30 transition-colors">
                    <Upload size={14} className="text-zinc-600" />
                    <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-600">Upload Payment Proof</span>
                    <input type="file" accept="image/*" onChange={handleProofFile} className="hidden" />
                  </label>
                  {proofPreview && (
                    <div className="relative">
                      <img src={proofPreview} alt="proof" className="h-24 object-cover opacity-60" />
                      <button onClick={() => { setProofFile(null); setProofPreview(null) }} className="absolute top-1 right-1 text-zinc-400"><X size={12} /></button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity + delivery */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 border border-[#1a1a1a]">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors">−</button>
                <span className="w-8 text-center text-zinc-300">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors">+</button>
              </div>
              <div className="flex-1">
                <p className="font-serif text-2xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
                <p className="text-zinc-600 text-xs">${finalUsd.toFixed(0)} USD{isOkbond ? ' · −10%' : ''}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { v: custName, s: setCustName, ph: 'Full Name' },
                { v: custPhone, s: setCustPhone, ph: 'Phone Number' },
                { v: custAddress, s: setCustAddress, ph: 'Delivery Address' },
                { v: custCity, s: setCustCity, ph: 'City' },
              ].map(({ v, s, ph }) => (
                <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                  className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors" />
              ))}
            </div>

            {orderError && <p className="text-red-400/80 text-[10px] mb-4">{orderError}</p>}

            <button onClick={handlePlaceOrder} disabled={submitting}
              className="w-full py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500 disabled:opacity-50">
              {submitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
