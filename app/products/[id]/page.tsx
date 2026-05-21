'use client'

  import { useState, useEffect } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import Link from 'next/link'
  import { supabase } from '@/lib/supabase'
  import type { Product } from '@/types'
  import { formatPKR, formatUSD } from '@/lib/utils'
  import { ChevronLeft, ChevronRight, Copy, Check, Upload, X, Gem, Leaf, Package } from 'lucide-react'

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
      supabase
        .from('products')
        .select('*, collection:collections(*)')
        .eq('id', params.id)
        .single()
        .then(({ data }) => {
          setProduct(data)
          if (data?.story) {
            try { setDetails(JSON.parse(data.story)) } catch {}
          }
          setLoading(false)
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
          notes: txHash ? `Tx Hash: ${txHash}` : txId ? `Tx ID: ${txId}` : paymentMethod === 'cod' ? 'Cash on Delivery' : '',
          payment_proof_url: proofUrl,
        }]).select().single()
        if (error) throw error
        await supabase.from('order_items').insert([{ order_id: order.id, product_id: product.id, quantity, price_pkr: Math.round(getDiscountedPrice(product.price_pkr)), price_usd: parseFloat(getDiscountedPrice(product.price_usd).toFixed(2)) }])
        setOrderPlaced(true)
      } catch (err: any) { setOrderError(err.message || 'Failed to place order. Please try again.') }
      setSubmitting(false)
    }

    if (loading) return (
      <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center">
        <p className="luxury-meta">Accessing Sovereign Vault...</p>
      </div>
    )

    if (!product) return (
      <div className="min-h-screen bg-[#050505] pt-20 flex flex-col items-center justify-center gap-8">
        <p className="font-serif text-4xl font-light text-zinc-700">Creation Not Found</p>
        <Link href="/shop" className="luxury-btn text-[9px]">Return to Shop</Link>
      </div>
    )

    const images = product.images || []
    const isOkbond = paymentMethod === 'crypto' && cryptoCoin === 'OKBOND'
    const finalPkr = getDiscountedPrice(product.price_pkr) * quantity
    const finalUsd = getDiscountedPrice(product.price_usd) * quantity

    if (orderPlaced) return (
      <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center max-w-lg">
          <p className="font-serif text-6xl text-[#c9a054] mb-8">◆</p>
          <h2 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6">Order Received</h2>
          {paymentMethod === 'cod' ? (
            <p className="text-zinc-400 font-light leading-relaxed mb-10">Your order has been confirmed for <strong className="text-zinc-200">Cash on Delivery</strong>. Our team will contact you shortly to arrange delivery.</p>
          ) : (
            <p className="text-zinc-400 font-light leading-relaxed mb-10">Your order is <strong className="text-zinc-200">pending verification</strong>. Once our team verifies your payment, your order will be confirmed and dispatched.</p>
          )}
          <Link href="/shop" className="luxury-btn text-[9px]">Continue Shopping</Link>
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

        {/* ── Hero: Gallery + Info ── */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Gallery */}
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
                    <button onClick={() => setActiveImage(i => Math.max(0, i - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#c9a054]/30 text-[#c9a054] hover:bg-[#c9a054] hover:text-black transition-all duration-300"><ChevronLeft size={14} /></button>
                    <button onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#c9a054]/30 text-[#c9a054] hover:bg-[#c9a054] hover:text-black transition-all duration-300"><ChevronRight size={14} /></button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`w-16 h-16 overflow-hidden border transition-all duration-300 ${activeImage === i ? 'border-[#c9a054]' : 'border-[#1a1a1a] opacity-50 hover:opacity-100'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              {(product as any).collection && <p className="luxury-meta mb-4">{(product as any).collection.name}</p>}
              {details?.tagline && <p className="text-[9px] tracking-[0.35em] uppercase text-[#c9a054]/70 mb-3">{details.tagline}</p>}
              <h1 className="font-serif text-3xl md:text-5xl font-light tracking-[0.15em] uppercase text-zinc-100 mb-8 leading-tight">{product.name}</h1>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <p className="font-serif text-3xl font-light text-zinc-100">{formatPKR(getDiscountedPrice(product.price_pkr))}</p>
                  {isOkbond && <p className="text-zinc-600 line-through text-lg font-light">{formatPKR(product.price_pkr)}</p>}
                </div>
                {isOkbond && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="luxury-meta text-[#c9a054] mt-2">✦ 10% OKBOND Sovereign Discount Applied</motion.p>}
                <p className="text-zinc-600 text-sm font-light mt-1">{formatUSD(getDiscountedPrice(product.price_usd))} USD</p>
              </div>

              {product.description && (
                <p className="text-zinc-300 font-light leading-relaxed mb-8 text-sm border-l-2 border-[#c9a054]/40 pl-5">{product.description}</p>
              )}

              {/* Scent Pyramid preview */}
              {details?.scentPyramid && (
                <div className="mb-10 p-6 bg-[#0a0a0a] border border-[#1a1a1a]">
                  <p className="luxury-meta mb-5">The Architecture of Notes</p>
                  <ScentPyramid pyramid={details.scentPyramid} />
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="mb-8">
                <p className="luxury-meta mb-5">Select Payment Method</p>
                <div className="grid grid-cols-3 gap-px bg-[#1a1a1a]">
                  {[
                    { id: 'crypto' as PaymentMethod, label: 'Crypto', sub: 'USDT · USDC · OKBOND' },
                    { id: 'pkr_manual' as PaymentMethod, label: 'PKR', sub: 'EasyPaisa · Bank' },
                    { id: 'cod' as PaymentMethod, label: 'COD', sub: 'Cash on Delivery' },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setPaymentMethod(opt.id)}
                      className={`bg-[#050505] p-4 text-center transition-all duration-300 ${paymentMethod === opt.id ? 'bg-[#0a0a0a] border-t border-[#c9a054]' : 'hover:bg-[#0a0a0a]'}`}>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-200 mb-1">{opt.label}</p>
                      <p className="text-[7px] tracking-[0.15em] uppercase text-zinc-600">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crypto Payment */}
              <AnimatePresence mode="wait">
                {paymentMethod === 'crypto' && (
                  <motion.div key="crypto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-8 space-y-5">
                    <div className="grid grid-cols-3 gap-px bg-[#1a1a1a]">
                      {(['USDT', 'USDC', 'OKBOND'] as CryptoCoin[]).map(coin => (
                        <button key={coin} onClick={() => setCryptoCoin(coin)}
                          className={`bg-[#050505] p-3 text-center transition-all duration-300 ${cryptoCoin === coin ? 'border border-[#c9a054] bg-[#0f0d08]' : 'hover:bg-[#0a0a0a]'}`}>
                          <p className="text-[9px] tracking-[0.2em] uppercase text-zinc-300">{coin}</p>
                          {coin === 'OKBOND' && <p className="text-[7px] text-[#c9a054] mt-0.5">−10% discount</p>}
                        </button>
                      ))}
                    </div>
                    <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-600">Wallet Address</p>
                        <CopyButton text={WALLET_ADDRESS} />
                      </div>
                      <p className="font-mono text-[10px] text-zinc-400 break-all leading-relaxed">{WALLET_ADDRESS}</p>
                    </div>
                    {cryptoCoin === 'OKBOND' && (
                      <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-600">OKBOND Contract</p>
                          <CopyButton text={OKBOND_CONTRACT} />
                        </div>
                        <p className="font-mono text-[10px] text-zinc-400 break-all">{OKBOND_CONTRACT}</p>
                      </div>
                    )}
                    <input value={txHash} onChange={e => setTxHash(e.target.value)} placeholder="Enter transaction hash..."
                      className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3.5 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-[#c9a054]/50 font-mono transition-colors" />
                  </motion.div>
                )}

                {paymentMethod === 'pkr_manual' && (
                  <motion.div key="pkr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-8 space-y-4">
                    <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 space-y-3">
                      <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 mb-3">EasyPaisa</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-zinc-300 font-mono">{EASYPAISA_NUMBER}</p>
                        <CopyButton text={EASYPAISA_NUMBER} />
                      </div>
                      <p className="text-[8px] text-zinc-600 tracking-wider uppercase">Account: {EASYPAISA_NAME}</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5 space-y-3">
                      <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 mb-3">UBL Bank Transfer</p>
                      <div className="flex justify-between items-center">
                        <p className="text-[9px] text-zinc-300 font-mono">{UBL_IBAN}</p>
                        <CopyButton text={UBL_IBAN} />
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-[9px] text-zinc-300 font-mono">AC: {UBL_ACCOUNT}</p>
                        <CopyButton text={UBL_ACCOUNT} />
                      </div>
                    </div>
                    <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID / Reference number..."
                      className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3.5 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-[#c9a054]/50 transition-colors" />
                    <label className="flex items-center gap-3 w-full cursor-pointer bg-[#0a0a0a] border border-dashed border-[#2a2a2a] hover:border-[#c9a054]/40 p-5 transition-colors">
                      <Upload size={16} className="text-zinc-600" />
                      <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-600">{proofFile ? proofFile.name : 'Upload Payment Screenshot'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleProofFile} />
                    </label>
                    {proofPreview && (
                      <div className="relative">
                        <img src={proofPreview} alt="Payment proof" className="w-full h-48 object-cover border border-[#1a1a1a]" />
                        <button onClick={() => { setProofFile(null); setProofPreview(null) }} className="absolute top-2 right-2 w-6 h-6 bg-black/80 flex items-center justify-center text-zinc-400 hover:text-zinc-100">
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {paymentMethod === 'cod' && (
                  <motion.div key="cod" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-8">
                    <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-5">
                      <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 mb-2">Cash on Delivery</p>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">Pay in cash when your order arrives. Available across Pakistan. Our team will confirm your order via phone.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Delivery Details */}
              <div className="mb-8 space-y-3">
                <p className="luxury-meta mb-4">Delivery Details</p>
                {[
                  { value: custName, setter: setCustName, placeholder: 'Full Name' },
                  { value: custPhone, setter: setCustPhone, placeholder: 'Phone Number (WhatsApp preferred)' },
                  { value: custAddress, setter: setCustAddress, placeholder: 'Complete Address' },
                  { value: custCity, setter: setCustCity, placeholder: 'City' },
                ].map((field, i) => (
                  <input key={i} value={field.value} onChange={e => field.setter(e.target.value)} placeholder={field.placeholder}
                    className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3.5 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-[#c9a054]/50 transition-colors" />
                ))}
                <input value={custCountry} onChange={e => setCustCountry(e.target.value)} placeholder="Country"
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3.5 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-[#c9a054]/50 transition-colors" />
              </div>

              {/* Quantity + Order */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-600">Quantity</p>
                  <div className="flex items-center border border-[#1a1a1a]">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-[#0a0a0a] transition-all">−</button>
                    <span className="w-12 text-center text-sm font-light text-zinc-300">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.inventory, q + 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-[#0a0a0a] transition-all">+</button>
                  </div>
                  <p className="text-[8px] tracking-[0.2em] uppercase text-zinc-700">{product.inventory} remaining</p>
                </div>
                <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-[#1a1a1a]">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-600">Total</p>
                  <div className="text-right">
                    <p className="font-serif text-2xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
                    <p className="text-zinc-600 text-xs font-light">{formatUSD(finalUsd)}</p>
                  </div>
                </div>
                {orderError && <p className="text-red-400 text-xs mb-4 tracking-wide">{orderError}</p>}
                <button onClick={handlePlaceOrder} disabled={submitting}
                  className="w-full bg-[#c9a054] text-black text-[9px] tracking-[0.4em] uppercase py-5 hover:bg-[#e8b85e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium">
                  {submitting ? 'Processing...' : 'Acquire Now'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Detailed Sections ── */}
        <div className="border-t border-[#1a1a1a]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">

            {/* Tab Navigation */}
            <div className="flex border-b border-[#1a1a1a]">
              {[
                { id: 'story' as const, label: 'The Olfactory Art', icon: <Leaf size={12} /> },
                { id: 'specs' as const, label: 'Specification Matrix', icon: <Gem size={12} /> },
                { id: 'nft' as const, label: 'Digital Twin', icon: <Package size={12} /> },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-8 py-6 text-[9px] tracking-[0.3em] uppercase transition-all duration-300 border-b-2 ${activeTab === tab.id ? 'border-[#c9a054] text-[#c9a054]' : 'border-transparent text-zinc-600 hover:text-zinc-400'}`}>
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Story Tab */}
              {activeTab === 'story' && details && (
                <motion.div key="story" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
                  className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">

                  {/* Olfactory Statement */}
                  <div>
                    <p className="luxury-meta mb-8">The Olfactory Statement</p>
                    <p className="text-zinc-300 font-light leading-loose text-sm">{details.olfactory}</p>

                    {details.packaging && (
                      <div className="mt-12">
                        <p className="luxury-meta mb-6">The Packaging Essence</p>
                        <p className="text-zinc-400 font-light leading-loose text-sm">{details.packaging}</p>
                      </div>
                    )}
                  </div>

                  {/* Ingredients */}
                  {details.ingredients && (
                    <div>
                      <p className="luxury-meta mb-8">Extraction Architecture</p>
                      <div className="space-y-6">
                        {details.ingredients.map((ing, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="border-l border-[#c9a054]/30 pl-6 pb-6 border-b border-b-[#1a1a1a] last:border-b-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <p className="text-zinc-100 text-sm font-light">{ing.name}</p>
                              <span className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-2 py-1 shrink-0">{ing.role}</span>
                            </div>
                            <p className="text-zinc-500 text-xs font-light leading-relaxed">{ing.detail}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Specs Tab */}
              {activeTab === 'specs' && (
                <motion.div key="specs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
                  className="py-20">
                  <p className="luxury-meta mb-12">The Specification Matrix</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                      <table className="w-full">
                        <tbody>
                          {specRows.map((row, i) => (
                            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                              className="border-b border-[#1a1a1a] group">
                              <td className="py-5 pr-8 text-[8px] tracking-[0.3em] uppercase text-zinc-600 w-2/5 group-hover:text-zinc-500 transition-colors">{row.label}</td>
                              <td className="py-5 text-xs text-zinc-300 font-light">{row.value}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {details?.scentPyramid && (
                      <div>
                        <p className="luxury-meta mb-8">The Scent Pyramid</p>
                        <ScentPyramid pyramid={details.scentPyramid} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* NFT Tab */}
              {activeTab === 'nft' && details?.nft && (
                <motion.div key="nft" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
                  className="py-20">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 border border-[#c9a054]/40 flex items-center justify-center">
                        <p className="font-serif text-lg text-[#c9a054]">◆</p>
                      </div>
                      <div>
                        <p className="luxury-meta">{details.nft.title}</p>
                        <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-700 mt-1">Physical Ownership · Cryptographic Proof</p>
                      </div>
                    </div>
                    <p className="text-zinc-300 font-light leading-loose text-sm mb-12">{details.nft.description}</p>

                    {/* NFT Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
                      {[
                        { title: 'On-Chain Authenticity', desc: 'Immutable NFT minted to your wallet upon acquisition. Non-counterfeitable proof of genuine ownership.' },
                        { title: 'Asset Liquidity', desc: 'Batch number, production sequence, and authentication metrics permanently logged on blockchain.' },
                        { title: 'Inner Circle Access', desc: 'Token holders receive priority allocation on future private reserves, jewelry drops, and exclusive network events.' },
                      ].map((card, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          className="bg-[#050505] p-8">
                          <p className="text-[#c9a054] text-xs font-light mb-3">0{i + 1}</p>
                          <p className="text-zinc-200 text-xs tracking-wide mb-3">{card.title}</p>
                          <p className="text-zinc-600 text-[10px] font-light leading-relaxed">{card.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }
  