'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Copy, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'
import { formatPKR } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const
const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
const WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
const OKBOND_DISCOUNT = 0.1

const BLOOM_IMAGES = [
  '/products/shamims-bloom/bloom-hero.png',
  '/products/shamims-bloom/bloom-1.png',
  '/products/shamims-bloom/bloom-2.png',
  '/products/shamims-bloom/bloom-crown.png',
  '/products/shamims-bloom/bloom-clean.png',
  '/products/shamims-bloom/bloom-3.png',
  '/products/shamims-bloom/bloom-4.png',
]

const TOP_NOTES = ['Velvet Peony', 'White Rose Silk', 'Soft Blush Accord']
const HEART_NOTES = ['Taif Rose Absolute', 'Turkish Rose Resin', 'Imperial Floral Nectar']
const BASE_NOTES = ['White Ambergris', 'Cashmere Skin Musk', 'Warm Cream Woods']

const SPECS = [
  { label: 'Sovereign Title', value: 'The Sovereign Grace' },
  { label: 'Classification', value: 'Sovereign Feminine Extrait' },
  { label: 'Concentration', value: 'Extrait de Parfum' },
  { label: 'Volume Allocation', value: '100ML' },
  { label: 'Longevity', value: '12–18+ Hours' },
  { label: 'Projection', value: 'Elegant Sovereign Aura' },
  { label: 'Sillage', value: 'Soft Yet Commanding' },
  { label: 'Production', value: 'Limited Atelier Production' },
  { label: 'Gender Profile', value: 'Feminine Luxury' },
  { label: 'Wearing Environment', value: 'Royal Events · Black Tie · Signature Identity' },
  { label: 'Allocation Type', value: 'Founder Reserve Allocation — Archive I' },
  { label: 'Valuation', value: 'Rs 85,000 PKR  ·  $306 USD' },
  { label: 'Blockchain Authentication', value: 'Polygon Mainnet — NFT Verified' },
  { label: 'Production Method', value: 'Small-Batch Sovereign Craftsmanship' },
]

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
      className="flex items-center gap-1.5 text-[#c9a054] hover:text-zinc-100 transition-colors"
    >
      {c ? <Check size={10} /> : <Copy size={10} />}
      <span className="text-[7px] tracking-[0.3em] uppercase">{c ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.3 + 0.1),
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.008,
    }))
    let id: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.va
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        if (p.a < 0) p.va = Math.abs(p.va)
        if (p.a > 1) p.va = -Math.abs(p.va)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,160,84,${p.a * 0.7})`
        ctx.fill()
      })
      id = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />
}

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
type Coin = 'USDT' | 'USDC' | 'OKBOND'

interface Props { product: Product; onBack: () => void }

export default function ShamimsBloomPage({ product, onBack }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [payMethod, setPayMethod] = useState<PayMethod>('crypto')
  const [coin, setCoin] = useState<Coin>('USDT')
  const [txHash, setTxHash] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [addr, setAddr] = useState('')
  const [city, setCity] = useState('')
  const [country] = useState('Pakistan')
  const [submitting, setSubmitting] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [walletAddr, setWalletAddr] = useState('')
  const [nftStatus, setNftStatus] = useState<'idle' | 'minting' | 'minted'>('idle')
  const [mintedTx, setMintedTx] = useState('')

  const isOK = payMethod === 'crypto' && coin === 'OKBOND'
  const basePkr = product.price_pkr || 85000
  const baseUsd = product.price_usd || 306
  const finalPkr = (isOK ? basePkr * (1 - OKBOND_DISCOUNT) : basePkr) * qty
  const finalUsd = (isOK ? baseUsd * (1 - OKBOND_DISCOUNT) : baseUsd) * qty

  async function placeOrder() {
    if (!name || !phone || !addr || !city) { setErr('Please fill in all delivery fields.'); return }
    if (payMethod === 'crypto' && !txHash) { setErr('Please enter your crypto transaction hash.'); return }
    setSubmitting(true); setErr(null)
    try {
      const { data: order, error } = await supabase.from('orders').insert([{
        status: payMethod === 'cod' ? 'confirmed' : 'pending_verification',
        payment_method: payMethod === 'crypto' ? coin.toLowerCase() : payMethod,
        payment_status: payMethod === 'cod' ? 'pending' : 'awaiting_verification',
        total_pkr: Math.round(finalPkr),
        total_usd: parseFloat(finalUsd.toFixed(2)),
        discount_applied: isOK ? 10 : 0,
        shipping_address: { name, phone, line1: addr, city, country },
        notes: txHash ? ('Tx: ' + txHash) : payMethod === 'cod' ? 'Cash on Delivery' : '',
      }]).select().single()
      if (error) throw error
      await supabase.from('order_items').insert([{
        order_id: order.id, product_id: product.id, quantity: qty,
        price_pkr: Math.round(finalPkr / qty),
        price_usd: parseFloat((finalUsd / qty).toFixed(2)),
      }])
      if (walletAddr && walletAddr.startsWith('0x')) {
        setNftStatus('minting')
        try {
          const mintRes = await fetch('/api/shop/purchase-mint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-admin-key': 'shamim-forever-sovereign-admin-2026' },
            body: JSON.stringify({ productId: 'shamims-bloom', walletAddress: walletAddr, orderId: order.id }),
          })
          const mintData = await mintRes.json()
          if (mintData.txHash) { setMintedTx(mintData.txHash); setNftStatus('minted') }
          else setNftStatus('idle')
        } catch { setNftStatus('idle') }
      }
      // Email notification
      if (walletAddr || name) {
        fetch('/api/nft/notify-mint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: "SHAMIM'S BLOOM — The Sovereign Grace",
            serial: 'SF-BL-2026-00001',
            walletAddress: walletAddr,
            buyerName: name,
            orderId: order.id,
          }),
        }).catch(() => {})
      }
      setPlaced(true)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to place order.'
      setErr(msg)
    }
    setSubmitting(false)
  }

  if (placed) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="text-center max-w-lg"
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a054] to-transparent mx-auto mb-8" />
        <p className="font-serif text-5xl text-[#c9a054] mb-4">◆</p>
        <h2 className="font-serif text-3xl font-light tracking-[0.25em] uppercase text-zinc-100 mb-6">
          Order Received
        </h2>
        <p className="text-zinc-500 font-light leading-relaxed text-sm mb-4">
          {payMethod === 'cod'
            ? 'Confirmed for Cash on Delivery. Our sovereign concierge will contact you shortly.'
            : 'Pending payment verification. Your order will be dispatched once confirmed.'}
        </p>
        {nftStatus === 'minted' && (
          <div className="my-8 p-6 border border-[#c9a054]/20 bg-[#c9a054]/5">
            <p className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054] mb-2">Digital Twin Minted ◆</p>
            <p className="text-zinc-400 text-xs font-light mb-3">
              Your Sovereign Passport NFT has been minted to your wallet on Polygon.
            </p>
            <a
              href={'https://polygonscan.com/tx/' + mintedTx}
              target="_blank" rel="noreferrer"
              className="text-[8px] tracking-[0.3em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors"
            >
              View on Polygonscan →
            </a>
          </div>
        )}
        <div className="flex items-center justify-center gap-4 mt-10">
          <Link href="/shop" className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 border border-zinc-800 px-8 py-3 hover:text-[#c9a054] hover:border-[#c9a054]/40 transition-all duration-500">
            Return to Shop
          </Link>
          <Link href="/vault" className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/40 px-8 py-3 hover:bg-[#c9a054]/10 transition-all duration-500">
            Sovereign Vault
          </Link>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">

      {/* ── CINEMATIC HERO ── */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={BLOOM_IMAGES[0]}
            alt="Shamim's Bloom"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.32)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50" />
        </motion.div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(120,40,60,0.18) 0%, transparent 70%)' }} />
        <GoldParticles />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.2 }}
            className="text-[8px] tracking-[0.7em] uppercase text-[#c9a054] mb-8"
          >
            House of Shamim Forever  ◈  Sovereign Feminine Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.4, ease }}
            className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] text-zinc-100 leading-none mb-4"
          >
            SHAMIM&apos;S<br />BLOOM
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 1.2, ease }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-[#c9a054] to-transparent mx-auto my-6"
          />
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1.2 }}
            className="font-serif italic text-zinc-400 text-lg md:text-xl tracking-[0.1em]"
          >
            The Sovereign Grace
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}
            className="text-zinc-600 text-[10px] tracking-[0.3em] mt-4 uppercase"
          >
            Love does not fade — it blooms into eternity
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            className="text-[9px] tracking-[0.3em] uppercase text-[#c9a054]/60 mt-2"
          >
            Velvet Taif &amp; Peony  ·  100ML Extrait de Parfum  ·  Rs 85,000
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a054]/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── STORY ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-20 py-32 md:py-40">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease }}
          >
            <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-8">Chapter I  ·  The House</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.15em] text-zinc-100 leading-relaxed mb-10">
              The Liquid<br />Manifestation<br />of Love
            </h2>
            <div className="w-12 h-px bg-[#c9a054]/40 mb-10" />
            <p className="text-zinc-500 font-light leading-[2] text-sm mb-8">
              Shamim Bloom was conceived as an eternal feminine archive — a liquid monument dedicated to grace powerful enough to outlive memory itself. Inside the House of Shamim Forever, fragrance is treated not as cosmetic luxury, but as emotional architecture. Every molecule exists to preserve permanence: of presence, of identity, of love.
            </p>
            <p className="font-serif italic text-zinc-600 text-base leading-[2] border-l-2 border-[#c9a054]/20 pl-6">
              Dunya mein har cheez fani hai, siwaye us sachi mohabbat ke jo apne peechay aik legacy chhor jati hai.
            </p>
            <p className="text-zinc-600 font-light leading-[2] text-sm mt-8">
              Shamim&apos;s Bloom un khawateen ke liye tarasha gaya hai jo khamosh taqat, shahi nazaakat, aur timeless identity par yaqeen rakhti hain.
            </p>
            <p className="text-zinc-700 font-light leading-[2] text-sm mt-6">
              Its heart is built around rare Taif Rose harvested before sunrise. Combined with White Ambergris from the depths of the ocean, the fragrance creates an aura that feels eternal, warm, feminine, and sovereign.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img src={BLOOM_IMAGES[1]} alt="Shamim's Bloom" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054]/70">Taif Rose Absolute · Harvested Before Sunrise · Crown-Forged Flacon</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SCENT PYRAMID ── */}
      <section className="py-24 md:py-32 border-y border-[#111]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0808 50%, #0a0a0a 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease }}
            className="text-center mb-20"
          >
            <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-4">The Olfactory Architecture</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-zinc-100">Scent Pyramid</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              { tier: 'The First Veil', subtitle: 'Opening Layer', notes: TOP_NOTES, delay: 0 },
              { tier: 'The Sovereign Heart', subtitle: 'Core Layer', notes: HEART_NOTES, delay: 0.15 },
              { tier: 'The Eternal Foundation', subtitle: 'Base Layer', notes: BASE_NOTES, delay: 0.3 },
            ].map(({ tier, subtitle, notes, delay }) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease, delay }}
                className="px-8 md:px-12 py-10 border-b md:border-b-0 md:border-r border-[#1a1a1a] last:border-0"
              >
                <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">{tier}</p>
                <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700 mb-8">{subtitle}</p>
                <div className="space-y-5">
                  {notes.map(n => (
                    <div key={n} className="flex items-center gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#c9a054]/50 flex-shrink-0" />
                      <p className="font-serif font-light text-zinc-300 tracking-[0.08em]">{n}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className="py-20 overflow-hidden">
        <div className="flex gap-4 px-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4">
          {BLOOM_IMAGES.slice(1).map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="flex-shrink-0 snap-center"
              style={{ width: 'clamp(220px,35vw,380px)' }}
            >
              <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => setActiveImg(i + 1)}>
                <img
                  src={src}
                  alt={'Shamim Bloom ' + (i + 1)}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[2000ms]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, ease }}
          className="mb-16"
        >
          <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-4">Institutional Data Matrix</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.2em] text-zinc-100">Specifications</h2>
        </motion.div>
        <div className="space-y-0">
          {SPECS.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex items-start justify-between py-6 border-b border-[#111] hover:border-[#c9a054]/20 transition-colors duration-500 group"
            >
              <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-500 w-1/3">{label}</p>
              <p className="font-serif font-light text-zinc-300 text-sm tracking-[0.06em] text-right flex-1">{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DIGITAL TWIN NFT ── */}
      <section className="py-24 md:py-32 border-y border-[#111]" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0b08 50%, #0a0a0a 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1, ease }}
            >
              <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-6">Blockchain Provenance</p>
              <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.15em] text-zinc-100 mb-8">
                Digital Twin<br />Sovereign Passport
              </h2>
              <div className="space-y-6 mb-10">
                {[
                  { label: 'NFT-Backed Authenticity', desc: 'Every bottle is paired with a unique token on Polygon blockchain' },
                  { label: 'Serial Number Verification', desc: 'Scan your bottle to verify origin, batch, and ownership chain' },
                  { label: 'Ownership History', desc: 'Complete transfer chain recorded permanently on-chain' },
                  { label: 'Inner Circle Access', desc: 'NFT holders get VVIP privileges in the House of Shamim Forever' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-1 h-1 rounded-full bg-[#c9a054]/50 flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-zinc-300 text-xs tracking-[0.08em] mb-1">{label}</p>
                      <p className="text-zinc-600 text-[11px] font-light leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 border border-[#c9a054]/15 bg-[#c9a054]/5">
                <p className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">Polygon Contract</p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-zinc-500 text-[10px] font-mono">{CONTRACT.slice(0, 20)}...{CONTRACT.slice(-6)}</p>
                  <CopyBtn text={CONTRACT} />
                </div>
              </div>
              <div className="mt-5 p-5 border border-[#1a1a1a] bg-[#080808]">
                <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-3">Your Wallet Address (Optional)</p>
                <p className="text-[7px] text-zinc-700 mb-4 leading-relaxed">
                  Enter your Polygon wallet to receive your NFT automatically after purchase confirmation.
                </p>
                <input
                  value={walletAddr}
                  onChange={e => setWalletAddr(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors font-mono"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1, ease, delay: 0.2 }}
            >
              <div className="relative p-6 border border-[#c9a054]/20 bg-gradient-to-b from-[#0d0b08] to-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ background: 'repeating-linear-gradient(45deg, #c9a054 0, #c9a054 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
                <div className="relative">
                  <img src={BLOOM_IMAGES[4]} alt="NFT Preview" className="w-full aspect-square object-cover mb-5" style={{ filter: 'brightness(0.9)' }} />
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-serif font-light text-zinc-100 tracking-[0.1em] text-sm">SHAMIM&apos;S BLOOM</p>
                      <p className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] mt-1">Sovereign Feminine Edition</p>
                    </div>
                    <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">◆ NFT</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#c9a054]/10 pt-4">
                    <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">Polygon Mainnet</p>
                    <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">Auto-Minted on Purchase</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PURCHASE ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, ease }}
          className="grid md:grid-cols-2 gap-20"
        >
          {/* Sidebar */}
          <div>
            <div className="sticky top-28">
              <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-4">Sovereign Reserve</p>
              <h2 className="font-serif font-light text-2xl tracking-[0.15em] text-zinc-100 mb-1">SHAMIM&apos;S BLOOM</h2>
              <p className="font-serif italic text-zinc-500 text-sm mb-8">The Sovereign Grace</p>
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={BLOOM_IMAGES[activeImg < BLOOM_IMAGES.length ? activeImg : 0]}
                  alt="Shamim's Bloom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {BLOOM_IMAGES.map((src, i) => (
                  <button
                    key={i} onClick={() => setActiveImg(i)}
                    className={'flex-shrink-0 overflow-hidden border transition-colors duration-300 ' + (activeImg === i ? 'border-[#c9a054]/60' : 'border-transparent')}
                    style={{ width: '48px', height: '48px' }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="flex items-baseline justify-between mb-10 pb-6 border-b border-[#111]">
              <div>
                <p className="font-serif text-4xl font-light text-zinc-100">{formatPKR(finalPkr)}</p>
                <p className="text-zinc-600 text-sm mt-1">
                  ${finalUsd.toFixed(0)} USD
                  {isOK && <span className="text-[#c9a054] ml-2">−10% OKBOND Applied ◆</span>}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] text-zinc-400 hover:text-zinc-100 hover:border-[#c9a054]/30 transition-all">−</button>
                <span className="w-6 text-center text-zinc-300 text-sm">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] text-zinc-400 hover:text-zinc-100 hover:border-[#c9a054]/30 transition-all">+</button>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-4">Payment Method</p>
              <div className="flex gap-0 border border-[#1a1a1a]">
                {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map(m => (
                  <button
                    key={m} onClick={() => setPayMethod(m)}
                    className={'flex-1 py-3 text-[8px] tracking-[0.25em] uppercase transition-all duration-300 ' + (payMethod === m ? 'bg-[#c9a054]/10 text-[#c9a054] border-b-2 border-b-[#c9a054]' : 'text-zinc-600 hover:text-zinc-400')}
                  >
                    {m === 'crypto' ? 'Crypto' : m === 'pkr_manual' ? 'PKR Bank' : 'COD'}
                  </button>
                ))}
              </div>
            </div>

            {payMethod === 'crypto' && (
              <div className="mb-8 space-y-4">
                <div className="flex gap-2">
                  {(['USDT', 'USDC', 'OKBOND'] as Coin[]).map(c => (
                    <button
                      key={c} onClick={() => setCoin(c)}
                      className={'flex-1 py-2.5 text-[8px] tracking-[0.2em] uppercase border transition-all duration-300 ' + (coin === c ? 'border-[#c9a054]/50 text-[#c9a054] bg-[#c9a054]/5' : 'border-[#1a1a1a] text-zinc-600 hover:text-zinc-400')}
                    >
                      {c}{c === 'OKBOND' ? ' −10%' : ''}
                    </button>
                  ))}
                </div>
                <div className="p-4 border border-[#1a1a1a] bg-[#080808]">
                  <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-2">Send to Wallet</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[9px] text-zinc-400 font-mono truncate">{WALLET}</p>
                    <CopyBtn text={WALLET} />
                  </div>
                </div>
                <input
                  value={txHash} onChange={e => setTxHash(e.target.value)}
                  placeholder="Transaction hash (0x...)"
                  className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors"
                />
              </div>
            )}

            {payMethod === 'pkr_manual' && (
              <div className="mb-8 p-5 border border-[#1a1a1a] bg-[#080808] space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#111]">
                  <span className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">EasyPaisa</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-xs font-light">03367970004 · M Faisal</span>
                    <CopyBtn text="03367970004" />
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">UBL IBAN</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-[10px] font-light">PK13UNIL0109000318870498</span>
                    <CopyBtn text="PK13UNIL0109000318870498" />
                  </div>
                </div>
                <input
                  placeholder="Transaction ID or reference"
                  className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors mt-2"
                />
              </div>
            )}

            <div className="mb-8 space-y-3">
              <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-4">Delivery Information</p>
              {[
                { v: name, s: setName, ph: 'Full Name' },
                { v: phone, s: setPhone, ph: 'Phone Number' },
                { v: addr, s: setAddr, ph: 'Delivery Address' },
                { v: city, s: setCity, ph: 'City' },
              ].map(({ v, s, ph }) => (
                <input
                  key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                  className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors"
                />
              ))}
            </div>

            {err && <p className="text-red-400/80 text-[10px] mb-4">{err}</p>}

            <button
              onClick={placeOrder} disabled={submitting}
              className="w-full py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500 disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Place Sovereign Order'}
            </button>

            <div className="mt-6 flex items-center justify-center gap-6 text-[7px] tracking-[0.3em] uppercase text-zinc-700">
              <span>◆ Secure</span>
              <span>◆ Blockchain Verified</span>
              <span>◆ NFT-Backed</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── AUTHENTICATION ── */}
      <section className="max-w-[900px] mx-auto px-6 md:px-20 py-16 mb-20">
        <div className="border border-[#c9a054]/10 p-10 text-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0b08 100%)' }}>
          <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-4">Sovereign Authentication</p>
          <h3 className="font-serif font-light text-2xl tracking-[0.15em] text-zinc-100 mb-6">
            Verify Your Bottle
          </h3>
          <p className="text-zinc-600 font-light text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Scan the NFC chip or QR code on your bottle to verify authenticity, check ownership history, and access your sovereign passport.
          </p>
          <Link
            href="/authenticate?serial=SF-BL-2026-00001"
            className="inline-block text-[9px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-10 py-3 hover:bg-[#c9a054]/10 transition-all duration-500"
          >
            Verify Authenticity →
          </Link>
        </div>
      </section>
    </div>
  )
}
