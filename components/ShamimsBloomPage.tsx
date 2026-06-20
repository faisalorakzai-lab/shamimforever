'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Copy, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/cart-context'
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

  function CrystalSparkles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')!
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
      resize()
      window.addEventListener('resize', resize)
      const sparks = Array.from({ length: 38 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        a: Math.random(),
        va: (Math.random() * 0.025 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        color: Math.random() > 0.5 ? [255, 220, 180] : [255, 180, 210],
      }))
      let id: number
      const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        sparks.forEach(p => {
          p.a += p.va
          if (p.a <= 0 || p.a >= 1) p.va *= -1
          const [r, g, b] = p.color
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
          grd.addColorStop(0, `rgba(${r},${g},${b},${p.a * 0.9})`)
          grd.addColorStop(0.4, `rgba(${r},${g},${b},${p.a * 0.4})`)
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
          // Star cross-hair
          ctx.save()
          ctx.globalAlpha = p.a * 0.6
          ctx.strokeStyle = `rgba(${r},${g},${b},0.8)`
          ctx.lineWidth = 0.5
          ctx.beginPath(); ctx.moveTo(p.x - p.r * 4, p.y); ctx.lineTo(p.x + p.r * 4, p.y); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(p.x, p.y - p.r * 4); ctx.lineTo(p.x, p.y + p.r * 4); ctx.stroke()
          ctx.restore()
        })
        id = requestAnimationFrame(tick)
      }
      tick()
      return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
    }, [])
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }} />
  }
  

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
type Coin = 'USDT' | 'USDC' | 'OKBOND'

interface Props { product: Product; onBack: () => void }

export default function ShamimsBloomPage({ product, onBack }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
    const bottleParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

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
  const [custMessage, setCustMessage] = useState('')
  const [walletAdded, setWalletAdded] = useState(false)
  const [walletAddr, setWalletAddr] = useState('')
  const [nftStatus, setNftStatus] = useState<'idle' | 'minting' | 'minted'>('idle')
  const [mintedTx, setMintedTx] = useState('')

  const { addItem } = useCart()
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
      <div className="min-h-screen bg-[#050202] overflow-x-hidden">
  
        {/* ── CINEMATIC HERO — Bottle on Pedestal, Zero Text Over Image ── */}
        <section ref={heroRef} className="relative overflow-hidden bg-[#050202]" style={{ minHeight: '100svh' }}>

          {/* PARALLAX BACKGROUND */}
          <motion.div style={{ y: bgParallaxY }} className="absolute inset-0 z-0">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 160% 110% at 50% 110%, #1f0c08 0%, #0c0404 40%, #030101 100%)'
            }} />
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: `
                repeating-linear-gradient(125deg, transparent 0px, transparent 80px, rgba(255,255,255,0.014) 80px, rgba(255,255,255,0.014) 82px),
                repeating-linear-gradient(55deg, transparent 0px, transparent 120px, rgba(255,255,255,0.009) 120px, rgba(255,255,255,0.009) 122px)
              `
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 130% 70% at 50% 0%, rgba(30,8,14,0.95) 0%, transparent 65%)'
            }} />
            <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{
              background: 'linear-gradient(to top, rgba(5,2,2,1) 0%, transparent 100%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 60% 45% at 50% 15%, rgba(170,110,25,0.14) 0%, transparent 60%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 45% 55% at 0% 55%, rgba(170,55,90,0.10) 0%, transparent 55%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 35% 50% at 100% 40%, rgba(201,160,84,0.06) 0%, transparent 55%)'
            }} />
          </motion.div>

          {/* FLOATING ROSE PETALS */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[
              { left: '7%',  delay: 0,    dur: 10, size: 18, dx: 25 },
              { left: '18%', delay: 2.2,  dur: 12, size: 13, dx: -20 },
              { left: '33%', delay: 4.5,  dur: 9,  size: 22, dx: 30 },
              { left: '50%', delay: 1.2,  dur: 13, size: 15, dx: -28 },
              { left: '64%', delay: 3.1,  dur: 10, size: 19, dx: 22 },
              { left: '79%', delay: 0.8,  dur: 11, size: 12, dx: -18 },
              { left: '88%', delay: 5.5,  dur: 9,  size: 24, dx: 20 },
              { left: '12%', delay: 7,    dur: 14, size: 10, dx: -25 },
              { left: '44%', delay: 6.2,  dur: 10, size: 16, dx: 18 },
              { left: '72%', delay: 3.8,  dur: 12, size: 14, dx: -22 },
              { left: '25%', delay: 8.5,  dur: 9,  size: 11, dx: 28 },
              { left: '57%', delay: 9.1,  dur: 11, size: 20, dx: -15 },
            ].map((p, i) => (
              <motion.div
                key={'petal-' + i}
                style={{ left: p.left, position: 'absolute', top: '-8%' }}
                animate={{
                  y: ['0vh', '115vh'],
                  x: [0, p.dx, p.dx * 0.5, p.dx * 1.2, 0],
                  rotate: [0, 180 + i * 15],
                  opacity: [0, 0.75, 0.6, 0.4, 0],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1.5 + Math.random() * 3,
                }}
              >
                <svg width={p.size} height={Math.round(p.size * 1.35)} viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="10" cy="14" rx="9" ry="12" fill="rgba(195,80,120,0.65)" />
                  <ellipse cx="10" cy="14" rx="5" ry="7" fill="rgba(220,110,150,0.3)" />
                  <line x1="10" y1="2" x2="10" y2="26" stroke="rgba(180,60,100,0.2)" strokeWidth="0.5" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* GOLD PARTICLES */}
          <GoldParticles />

          {/* CRYSTAL SPARKLES */}
          <CrystalSparkles />

          {/* BOTTLE + PEDESTAL — centre stage, NO text */}
          <div className="relative z-20 flex flex-col items-center" style={{ minHeight: '100svh', justifyContent: 'flex-end', paddingBottom: 0 }}>

            {/* Warm halo lighting behind bottle */}
            <div aria-hidden className="absolute pointer-events-none" style={{
              top: '2%', left: '50%', transform: 'translateX(-50%)',
              width: 'min(700px, 95vw)', height: 'min(700px, 95vw)',
              background: 'radial-gradient(ellipse at 50% 45%, rgba(201,160,84,0.22) 0%, rgba(170,55,90,0.10) 38%, transparent 65%)',
              filter: 'blur(40px)',
              zIndex: 1,
            }} />

            {/* Bottle with cinematic lighting overlays */}
            <motion.div
              style={{ y: bottleParallaxY, position: 'relative', zIndex: 5 }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gold rim light — right */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 55% 90% at 88% 25%, rgba(201,160,84,0.28) 0%, transparent 55%)',
                borderRadius: '50%',
              }} />
              {/* Pink fill light — left */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 45% 70% at 12% 50%, rgba(200,75,115,0.18) 0%, transparent 55%)',
              }} />
              {/* Crystal crown highlight */}
              <div aria-hidden style={{
                position: 'absolute', top: '6%', left: '28%', width: '44%', height: '1px', zIndex: 10,
                background: 'linear-gradient(90deg, transparent, rgba(255,240,200,0.65), transparent)',
              }} />
              <div aria-hidden style={{
                position: 'absolute', top: '12%', left: '38%', width: '24%', height: '1px', zIndex: 10,
                background: 'linear-gradient(90deg, transparent, rgba(255,200,230,0.5), transparent)',
              }} />

              {/* THE BOTTLE — fully unobstructed */}
              <img
                src="/products/shamims-bloom/bloom-hero.png"
                alt="Shamim's Bloom — The Sovereign Grace"
                draggable={false}
                style={{
                  width: 'min(72vw, 400px)',
                  height: 'auto',
                  display: 'block',
                  position: 'relative',
                  zIndex: 5,
                  filter: [
                    'drop-shadow(0 50px 70px rgba(0,0,0,0.9))',
                    'drop-shadow(0 8px 20px rgba(0,0,0,0.7))',
                    'drop-shadow(0 0 50px rgba(170,55,90,0.28))',
                    'drop-shadow(0 0 90px rgba(201,160,84,0.18))',
                  ].join(' '),
                  marginBottom: '-2px',
                }}
              />
            </motion.div>

            {/* MUSEUM PEDESTAL */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
              style={{ width: 'min(72vw, 400px)', position: 'relative', zIndex: 4, flexShrink: 0 }}
            >
              {/* Top gold filigree band */}
              <div style={{
                height: '13px',
                background: 'linear-gradient(180deg, #f0d070 0%, #c9a054 25%, #a07830 55%, #c9a054 75%, #8b6510 100%)',
                borderRadius: '4px 4px 0 0',
                boxShadow: '0 0 18px rgba(201,160,84,0.55), inset 0 1px 2px rgba(255,255,255,0.35)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: '2px 3px',
                  background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 7px)',
                }} />
              </div>
              {/* Black marble body */}
              <div style={{
                height: 'min(13vw, 72px)',
                background: 'linear-gradient(180deg, #1c0e0e 0%, #120808 50%, #0a0404 100%)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `
                    repeating-linear-gradient(118deg, transparent 0px, transparent 42px, rgba(255,255,255,0.022) 42px, rgba(255,255,255,0.022) 43px),
                    repeating-linear-gradient(62deg, transparent 0px, transparent 58px, rgba(255,255,255,0.014) 58px, rgba(255,255,255,0.014) 59px)
                  `,
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.65) 100%)',
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '25%',
                  background: 'linear-gradient(180deg, rgba(201,160,84,0.10) 0%, transparent 100%)',
                }} />
              </div>
              {/* Bottom gold filigree band */}
              <div style={{
                height: '13px',
                background: 'linear-gradient(180deg, #8b6510 0%, #c9a054 30%, #a07830 60%, #6b4e0a 100%)',
                borderRadius: '0 0 4px 4px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.85), inset 0 -1px 2px rgba(0,0,0,0.5)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: '2px 3px',
                  background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 7px)',
                }} />
              </div>
              {/* Shadow + marble floor + reflection */}
              <div style={{ height: '70px', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(12,5,5,0.95) 0%, rgba(5,2,2,1) 100%)',
                  backgroundImage: 'repeating-linear-gradient(112deg, transparent 0px, transparent 55px, rgba(255,255,255,0.016) 55px, rgba(255,255,255,0.016) 56px)',
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '85%', height: '14px',
                  background: 'radial-gradient(ellipse 90% 100%, rgba(0,0,0,0.95) 0%, transparent 100%)',
                }} />
                <div style={{
                  position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%) scaleY(-1)',
                  width: 'min(40vw, 200px)', height: '55px', overflow: 'hidden',
                  opacity: 0.18, filter: 'blur(3px)',
                  maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
                }}>
                  <img
                    src="/products/shamims-bloom/bloom-hero.png"
                    alt=""
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1.2 }}
            style={{ opacity: heroOpacity }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 pointer-events-none"
          >
            <p className="text-[6px] tracking-[0.6em] uppercase text-[#c9a054]/35">Scroll</p>
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a054]/45 to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* ── HERO INFO — ALL TEXT BELOW THE BOTTLE ── */}
        <section id="hero-info" className="relative bg-[#050202] pt-14 pb-16 px-6" style={{ textAlign: 'center' }}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a054]/18 to-transparent mb-14" />
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease }}
            className="max-w-lg mx-auto"
          >
            <p className="text-[7px] tracking-[0.7em] uppercase text-[#c9a054] mb-5">
              Founder Reserve Allocation  ◈  Archive I
            </p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a054]/40 to-transparent mx-auto mb-7" />
            <h1
              className="font-serif font-light tracking-[0.28em] uppercase text-zinc-100 leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 5.5rem)' }}
            >
              Shamim&apos;s<br />Bloom
            </h1>
            <p
              className="font-serif italic text-zinc-400 tracking-[0.12em] mb-2"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}
            >
              The Sovereign Grace
            </p>
            <p className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase mb-10">
              Love does not fade — it blooms into eternity
            </p>
            <div className="flex items-baseline justify-center gap-5 mb-5">
              <p className="font-serif font-light text-zinc-100" style={{ fontSize: 'clamp(1.75rem, 6vw, 2.4rem)' }}>
                Rs 85,000
              </p>
              <p className="text-[#c9a054] text-sm tracking-[0.1em] font-light">$306 USD</p>
            </div>
            <div className="inline-flex items-center gap-2.5 border border-[#c9a054]/25 bg-[#c9a054]/5 px-5 py-2.5 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a054] animate-pulse" />
              <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054]">
                NFT Sovereign Passport  ·  Polygon Mainnet
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('acquire')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto text-[9px] tracking-[0.45em] uppercase text-[#050202] px-10 py-4 hover:opacity-90 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #c9a054, #b8860b)' }}
              >
                Acquire Archive I
              </button>
              <button
                onClick={onBack}
                className="w-full sm:w-auto text-[9px] tracking-[0.45em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-10 py-4 hover:border-[#c9a054]/60 hover:bg-[#c9a054]/5 transition-all duration-500"
              >
                Explore Archive
              </button>
            </div>
          </motion.div>
        </section>

        {/* ── STORY ── */}
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
      <section id="acquire" className="max-w-[1200px] mx-auto px-6 md:px-20 py-24 md:py-32">
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

              <div className="mb-8 space-y-3">
                <textarea
                  value={custMessage} onChange={e => setCustMessage(e.target.value)}
                  placeholder="Message / special instructions (optional)"
                  className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none transition-colors resize-none"
                  rows={3}
                />
                {walletAdded ? (
                  <div className="p-4 border border-[#c9a054]/20 bg-[#c9a054]/5 text-center">
                    <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">◆ Added to Wallet</p>
                    <Link href="/wallet" className="text-[7px] tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors mt-2 inline-block">View Wallet →</Link>
                  </div>
                ) : (
                  <button
                    onClick={() => { addItem({ product_id: product.id, product_name: product.name, slug: product.slug, price_usd: product.price_usd, quantity: qty, image: product.images?.[0] || '', custom_message: custMessage }); setWalletAdded(true) }}
                    className="w-full py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500"
                  >
                    ADD TO WALLET
                  </button>
                )}
              </div>

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
