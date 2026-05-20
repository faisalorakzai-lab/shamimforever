'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'
import { formatPKR, formatUSD } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Copy, Check, Upload, X } from 'lucide-react'

// ─── Payment Config ──────────────────────────────────────────────
const WALLET_ADDRESS = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
const OKBOND_CONTRACT = '0xc89729DA02a8c2E282EC3070A9a680E01bE2E22F'
const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'
const UBL_ACCOUNT = '0909318870498'
const OKBOND_DISCOUNT = 0.1

type PaymentMethod = 'crypto' | 'pkr_manual' | 'cod'
type CryptoCoin = 'USDT' | 'USDC' | 'OKBOND'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-[#c9a054] hover:text-zinc-100 transition-colors duration-300"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      <span className="text-[8px] tracking-[0.3em] uppercase">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('crypto')
  const [cryptoCoin, setCryptoCoin] = useState<CryptoCoin>('USDT')
  const [txHash, setTxHash] = useState('')
  const [txId, setTxId] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)

  // Customer info
  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')

  useEffect(() => {
    supabase
      .from('products')
      .select('*, collection:collections(*)')
      .eq('id', params.id)
      .single()
      .then(({ data }) => {
        setProduct(data)
        setLoading(false)
      })
  }, [params.id])

  function getDiscountedPrice(base: number) {
    if (paymentMethod === 'crypto' && cryptoCoin === 'OKBOND') {
      return base * (1 - OKBOND_DISCOUNT)
    }
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
    if (!custName || !custPhone || !custAddress || !custCity) {
      setOrderError('Please fill in all delivery details.')
      return
    }
    if (paymentMethod === 'crypto' && !txHash) {
      setOrderError('Please enter your transaction hash.')
      return
    }
    if (paymentMethod === 'pkr_manual' && !txId && !proofFile) {
      setOrderError('Please provide transaction ID or upload payment screenshot.')
      return
    }

    setSubmitting(true)
    setOrderError(null)

    try {
      let proofUrl: string | null = null

      // Upload proof screenshot if provided
      if (proofFile && proofPreview) {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageStr: proofPreview }),
        })
        const uploadData = await uploadRes.json()
        if (uploadData.url) proofUrl = uploadData.url
      }

      const isOkbond = paymentMethod === 'crypto' && cryptoCoin === 'OKBOND'
      const totalPkr = getDiscountedPrice(product.price_pkr) * quantity
      const totalUsd = getDiscountedPrice(product.price_usd) * quantity

      const { data: order, error } = await supabase
        .from('orders')
        .insert([{
          status: paymentMethod === 'cod' ? 'confirmed' : 'pending_verification',
          payment_method: paymentMethod === 'crypto' ? cryptoCoin.toLowerCase() : paymentMethod,
          payment_status: paymentMethod === 'cod' ? 'pending' : 'awaiting_verification',
          total_pkr: Math.round(totalPkr),
          total_usd: parseFloat(totalUsd.toFixed(2)),
          discount_applied: isOkbond ? OKBOND_DISCOUNT * 100 : 0,
          shipping_address: {
            name: custName,
            phone: custPhone,
            line1: custAddress,
            city: custCity,
            country: 'Pakistan',
          },
          notes: txHash
            ? `Tx Hash: ${txHash}`
            : txId
            ? `Tx ID: ${txId}`
            : paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : '',
          payment_proof_url: proofUrl,
        }])
        .select()
        .single()

      if (error) throw error

      // Insert order item
      await supabase.from('order_items').insert([{
        order_id: order.id,
        product_id: product.id,
        quantity,
        price_pkr: Math.round(getDiscountedPrice(product.price_pkr)),
        price_usd: parseFloat(getDiscountedPrice(product.price_usd).toFixed(2)),
      }])

      setOrderPlaced(true)
    } catch (err: any) {
      setOrderError(err.message || 'Failed to place order. Please try again.')
    }

    setSubmitting(false)
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

  const images = product.images || []
  const isOkbond = paymentMethod === 'crypto' && cryptoCoin === 'OKBOND'
  const finalPkr = getDiscountedPrice(product.price_pkr) * quantity
  const finalUsd = getDiscountedPrice(product.price_usd) * quantity

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg"
        >
          <p className="font-serif text-6xl text-[#c9a054] mb-8">◆</p>
          <h2 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6">
            Order Received
          </h2>
          {paymentMethod === 'cod' ? (
            <p className="text-zinc-400 font-light leading-relaxed mb-10">
              Your order has been confirmed for <strong className="text-zinc-200">Cash on Delivery</strong>.
              Our team will contact you shortly to arrange delivery. Please keep your payment ready to pay on receipt.
            </p>
          ) : (
            <p className="text-zinc-400 font-light leading-relaxed mb-10">
              Your order has been submitted and is <strong className="text-zinc-200">pending verification</strong>.
              Once our team verifies your payment, your order will be confirmed and dispatched.
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="luxury-btn text-[9px]">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    )
  }

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

          {/* ── Gallery ── */}
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
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 overflow-hidden border transition-all duration-300 ${activeImage === i ? 'border-[#c9a054]' : 'border-[#1a1a1a] opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info + Payment ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {(product as any).collection && (
              <p className="luxury-meta mb-6">{(product as any).collection.name}</p>
            )}
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-10">
              <div className="flex items-baseline gap-4 flex-wrap">
                <p className="font-serif text-3xl font-light text-zinc-100">
                  {formatPKR(getDiscountedPrice(product.price_pkr))}
                </p>
                {isOkbond && (
                  <p className="text-zinc-600 line-through text-lg font-light">
                    {formatPKR(product.price_pkr)}
                  </p>
                )}
              </div>
              {isOkbond && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="luxury-meta text-[#c9a054] mt-2"
                >
                  ✦ 10% OKBOND Sovereign Discount Applied
                </motion.p>
              )}
              <p className="text-zinc-600 text-sm font-light mt-1">
                {formatUSD(getDiscountedPrice(product.price_usd))} USD
              </p>
            </div>

            {product.description && (
              <p className="text-zinc-400 font-light leading-relaxed mb-10 text-sm">
                {product.description}
              </p>
            )}

            {/* ── PAYMENT METHOD SELECTOR ── */}
            <div className="mb-10">
              <p className="luxury-meta mb-6">Select Payment Method</p>
              <div className="grid grid-cols-3 gap-px bg-[#1a1a1a]">
                {[
                  { id: 'crypto' as PaymentMethod, label: 'Crypto', sub: 'USDT · USDC · OKBOND' },
                  { id: 'pkr_manual' as PaymentMethod, label: 'PKR', sub: 'EasyPaisa · Bank' },
                  { id: 'cod' as PaymentMethod, label: 'COD', sub: 'Cash on Delivery' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`bg-[#050505] p-4 text-center transition-all duration-300 ${paymentMethod === opt.id ? 'bg-[#0a0a0a] border-t border-[#c9a054]' : 'hover:bg-[#0a0a0a]'}`}
                  >
                    <p className={`text-xs tracking-[0.2em] uppercase font-light mb-1 ${paymentMethod === opt.id ? 'text-[#c9a054]' : 'text-zinc-300'}`}>
                      {opt.label}
                    </p>
                    <p className="text-[9px] text-zinc-600 tracking-wide">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ── CRYPTO PANEL ── */}
            <AnimatePresence mode="wait">
              {paymentMethod === 'crypto' && (
                <motion.div
                  key="crypto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-10 border border-[#1a1a1a] p-6 space-y-6"
                >
                  {/* Coin selector */}
                  <div>
                    <p className="luxury-meta mb-4">Select Token</p>
                    <div className="flex gap-2">
                      {(['USDT', 'USDC', 'OKBOND'] as CryptoCoin[]).map(coin => (
                        <button
                          key={coin}
                          onClick={() => setCryptoCoin(coin)}
                          className={`px-4 py-2 text-[9px] tracking-[0.3em] uppercase border transition-all duration-300 ${cryptoCoin === coin ? 'border-[#c9a054] text-[#c9a054] bg-[#c9a054]/5' : 'border-[#1a1a1a] text-zinc-500 hover:border-[#c9a054]/30'}`}
                        >
                          {coin}
                        </button>
                      ))}
                    </div>
                    {cryptoCoin === 'OKBOND' && (
                      <p className="luxury-meta text-[#c9a054] mt-3">✦ 10% discount applies automatically</p>
                    )}
                  </div>

                  {/* Network info */}
                  <div className="bg-[#0a0a0a] p-4">
                    <p className="luxury-meta mb-1">Network</p>
                    <p className="text-zinc-300 text-xs font-light">Polygon (MATIC) Blockchain</p>
                    <p className="luxury-meta mt-3 mb-1">Compatible Wallets</p>
                    <p className="text-zinc-400 text-xs font-light">MetaMask · Trust Wallet · Any Web3 Wallet</p>
                  </div>

                  {/* Wallet address */}
                  <div>
                    <p className="luxury-meta mb-3">
                      {cryptoCoin === 'OKBOND' ? 'OKBOND Contract Address' : 'Recipient Wallet Address'}
                    </p>
                    <div className="bg-[#0a0a0a] p-4 flex items-center justify-between gap-4 border border-[#1a1a1a]">
                      <p className="text-zinc-300 text-xs font-mono break-all flex-1">
                        {cryptoCoin === 'OKBOND' ? OKBOND_CONTRACT : WALLET_ADDRESS}
                      </p>
                      <CopyButton text={cryptoCoin === 'OKBOND' ? OKBOND_CONTRACT : WALLET_ADDRESS} />
                    </div>
                    {cryptoCoin === 'OKBOND' && (
                      <div className="mt-3">
                        <p className="luxury-meta mb-3">Send To Wallet</p>
                        <div className="bg-[#0a0a0a] p-4 flex items-center justify-between gap-4 border border-[#1a1a1a]">
                          <p className="text-zinc-300 text-xs font-mono break-all flex-1">{WALLET_ADDRESS}</p>
                          <CopyButton text={WALLET_ADDRESS} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="bg-[#0a0a0a] p-4">
                    <p className="luxury-meta mb-2">Amount to Send</p>
                    <p className="font-serif text-2xl font-light text-[#c9a054]">
                      {formatUSD(finalUsd)}
                    </p>
                    <p className="text-zinc-600 text-xs mt-1">≈ {finalUsd.toFixed(2)} {cryptoCoin}</p>
                  </div>

                  {/* Transaction hash input */}
                  <div>
                    <label className="luxury-meta block mb-3">Transaction Hash (after payment)</label>
                    <input
                      type="text"
                      value={txHash}
                      onChange={e => setTxHash(e.target.value)}
                      className="luxury-input font-mono text-xs"
                      placeholder="0x..."
                    />
                    <p className="text-zinc-700 text-[9px] tracking-[0.2em] mt-2">
                      Send payment first, then paste your transaction hash here
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── PKR MANUAL PANEL ── */}
              {paymentMethod === 'pkr_manual' && (
                <motion.div
                  key="pkr"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-10 border border-[#1a1a1a] p-6 space-y-6"
                >
                  <div>
                    <p className="luxury-meta mb-4">EasyPaisa</p>
                    <div className="bg-[#0a0a0a] p-4 border border-[#1a1a1a] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="luxury-meta mb-1">Number</p>
                          <p className="text-zinc-200 text-sm font-light">{EASYPAISA_NUMBER}</p>
                        </div>
                        <CopyButton text={EASYPAISA_NUMBER} />
                      </div>
                      <div>
                        <p className="luxury-meta mb-1">Account Name</p>
                        <p className="text-zinc-200 text-sm font-light">{EASYPAISA_NAME}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="luxury-meta mb-4">UBL Bank Transfer</p>
                    <div className="bg-[#0a0a0a] p-4 border border-[#1a1a1a] space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="luxury-meta mb-1">IBAN</p>
                          <p className="text-zinc-200 text-xs font-mono">{UBL_IBAN}</p>
                        </div>
                        <CopyButton text={UBL_IBAN} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="luxury-meta mb-1">Account Number</p>
                          <p className="text-zinc-200 text-xs font-mono">{UBL_ACCOUNT}</p>
                        </div>
                        <CopyButton text={UBL_ACCOUNT} />
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="bg-[#0a0a0a] p-4">
                    <p className="luxury-meta mb-2">Amount to Transfer</p>
                    <p className="font-serif text-2xl font-light text-[#c9a054]">{formatPKR(finalPkr)}</p>
                  </div>

                  <p className="text-zinc-600 text-xs leading-relaxed tracking-wide">
                    After payment, enter your transaction ID below and upload your payment screenshot.
                    Your order will be confirmed after admin verification.
                  </p>

                  <div>
                    <label className="luxury-meta block mb-3">Transaction ID / Reference Number</label>
                    <input
                      type="text"
                      value={txId}
                      onChange={e => setTxId(e.target.value)}
                      className="luxury-input"
                      placeholder="Enter transaction ID..."
                    />
                  </div>

                  {/* Screenshot upload */}
                  <div>
                    <label className="luxury-meta block mb-3">Payment Screenshot</label>
                    {proofPreview ? (
                      <div className="relative">
                        <img src={proofPreview} alt="Payment proof" className="w-full max-h-48 object-contain bg-[#0a0a0a] border border-[#1a1a1a]" />
                        <button
                          onClick={() => { setProofFile(null); setProofPreview(null) }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 flex items-center justify-center"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center gap-3 border border-[#c9a054]/20 border-dashed p-8 cursor-pointer hover:border-[#c9a054]/50 transition-colors duration-300">
                        <Upload size={20} className="text-[#c9a054]/50" />
                        <span className="luxury-meta">Upload Screenshot</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleProofFile} />
                      </label>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── COD PANEL ── */}
              {paymentMethod === 'cod' && (
                <motion.div
                  key="cod"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-10 border border-[#1a1a1a] p-6"
                >
                  <p className="luxury-meta mb-4">Cash on Delivery</p>
                  <div className="space-y-4 text-zinc-400 text-sm font-light leading-relaxed">
                    <p>✓ Your parcel will be delivered to your address</p>
                    <p>✓ You may inspect the parcel before payment</p>
                    <p>✓ Pay the courier upon delivery in cash</p>
                    <p className="text-zinc-600 text-xs">
                      Note: COD available across Pakistan. Delivery time 3–7 business days.
                    </p>
                  </div>
                  <div className="mt-6 bg-[#0a0a0a] p-4">
                    <p className="luxury-meta mb-2">Total Payable on Delivery</p>
                    <p className="font-serif text-2xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Quantity ── */}
            <div className="mb-10">
              <p className="luxury-meta mb-4">Quantity</p>
              <div className="flex items-center gap-6 border border-[#1a1a1a] w-fit">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-[#c9a054] hover:bg-[#0a0a0a] transition-all">−</button>
                <span className="text-zinc-100 font-light w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.inventory || 99, q + 1))} className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-[#c9a054] hover:bg-[#0a0a0a] transition-all">+</button>
              </div>
            </div>

            {/* ── Delivery Details ── */}
            <div className="mb-10 space-y-6">
              <p className="luxury-meta">Delivery Details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="luxury-meta block mb-3">Full Name</label>
                  <input value={custName} onChange={e => setCustName(e.target.value)} className="luxury-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="luxury-meta block mb-3">Phone</label>
                  <input value={custPhone} onChange={e => setCustPhone(e.target.value)} className="luxury-input" placeholder="03XX XXXXXXX" />
                </div>
              </div>
              <div>
                <label className="luxury-meta block mb-3">Address</label>
                <input value={custAddress} onChange={e => setCustAddress(e.target.value)} className="luxury-input" placeholder="Street address" />
              </div>
              <div>
                <label className="luxury-meta block mb-3">City</label>
                <input value={custCity} onChange={e => setCustCity(e.target.value)} className="luxury-input" placeholder="City" />
              </div>
            </div>

            {/* Order Total */}
            <div className="mb-8 border border-[#1a1a1a] p-6 bg-[#0a0a0a]">
              <div className="flex items-center justify-between mb-4">
                <p className="luxury-meta">Subtotal ({quantity}×)</p>
                <p className="text-zinc-300 text-sm font-light">{formatPKR(product.price_pkr * quantity)}</p>
              </div>
              {isOkbond && (
                <div className="flex items-center justify-between mb-4">
                  <p className="luxury-meta text-[#c9a054]">OKBOND Discount (10%)</p>
                  <p className="text-[#c9a054] text-sm font-light">− {formatPKR(product.price_pkr * quantity * OKBOND_DISCOUNT)}</p>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4">
                <p className="text-zinc-200 text-xs tracking-[0.2em] uppercase">Total</p>
                <p className="font-serif text-xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
              </div>
            </div>

            {orderError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500/70 text-xs tracking-[0.2em] uppercase mb-6"
              >
                {orderError}
              </motion.p>
            )}

            <motion.button
              onClick={handlePlaceOrder}
              disabled={submitting}
              whileTap={{ scale: 0.98 }}
              className="w-full luxury-btn text-[10px] py-5 disabled:opacity-50"
            >
              {submitting
                ? 'Placing Order...'
                : paymentMethod === 'cod'
                ? 'Place COD Order'
                : paymentMethod === 'pkr_manual'
                ? 'Submit Order for Verification'
                : 'Confirm Crypto Order'}
            </motion.button>

            <p className="text-center text-zinc-700 text-[9px] tracking-[0.2em] uppercase mt-6">
              Sovereign quality guaranteed · White glove delivery
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
