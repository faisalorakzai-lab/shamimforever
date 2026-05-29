'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Copy, Check, Upload, X, ExternalLink, ArrowDown } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Navigation } from 'swiper/modules'
import { formatPKR } from '@/lib/utils'
import type { Product } from '@/types'
import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
import { useAccount } from 'wagmi'

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'

interface SpecRow { label: string; value: string }
interface NftTrait { trait: string; value: string }
interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

interface SovereignConfig {
  heroTitle: string; heroSubtitle: string; heroTagline: string
  legacyStatement: string; legacyVoice: string
  topNotes: string[]; heartNotes: string[]; baseNotes: string[]
  specs: SpecRow[]
  nftTitle: string; nftEdition: string; nftRarity: string; nftTraits: NftTrait[]
  galleryImages: string[]; heroImage: string
}

const CONFIGS: Record<string, SovereignConfig> = {
  'shamims-bloom': {
    heroTitle: "SHAMIM'S BLOOM", heroSubtitle: "THE SOVEREIGN GRACE",
    heroTagline: "Archive I · Founder Reserve Allocation",
    legacyStatement: "In every breath, a dynasty. In every note, a sovereign memory that transcends time.",
    legacyVoice: "Shamim's Bloom was born not from a laboratory, but from a legacy. A fragrance that carries the weight of generations — the velvet of Taif roses, the warmth of cashmere skin, the eternal whisper of white ambergris. This is not perfume. This is identity.",
    topNotes: ['Velvet Peony', 'White Rose Silk', 'Soft Blush Accord'],
    heartNotes: ['Taif Rose Absolute', 'Turkish Rose Resin', 'Imperial Floral Nectar'],
    baseNotes: ['White Ambergris', 'Cashmere Skin Musk', 'Warm Cream Woods'],
    specs: [
      { label: 'Classification', value: 'Sovereign Feminine Extrait' },
      { label: 'Concentration', value: 'Extrait de Parfum' },
      { label: 'Volume', value: '100ML' },
      { label: 'Longevity', value: '12–18+ Hours' },
      { label: 'Projection', value: 'Elegant Sovereign Aura' },
      { label: 'Sillage', value: 'Soft Yet Commanding' },
      { label: 'Production', value: 'Limited Atelier Batch' },
      { label: 'Edition', value: 'Archive I — 100 Editions' },
      { label: 'Authentication', value: 'Polygon Mainnet — NFT Verified' },
    ],
    nftTitle: "Shamim's Bloom", nftEdition: "Sovereign Grace Edition", nftRarity: "ELITE FOUNDERS",
    nftTraits: [
      { trait: 'Archive', value: 'Archive I — Founder Reserve' },
      { trait: 'Series', value: 'The Sovereign Feminine' },
      { trait: 'Edition', value: 'Elite — 100 Flacon Editions' },
      { trait: 'Holder Rights', value: 'Lifetime Replenishment' },
      { trait: 'Access Tier', value: 'Founder Sovereign' },
    ],
    galleryImages: ['/products/shamims-bloom/bloom-hero.png','/products/shamims-bloom/bloom-1.png','/products/shamims-bloom/bloom-2.png','/products/shamims-bloom/bloom-crown.png','/products/shamims-bloom/bloom-clean.png'],
    heroImage: '/products/shamims-bloom/bloom-hero.png',
  },
  'queen-of-taif': {
    heroTitle: "QUEEN OF TAIF", heroSubtitle: "THE ROSE SOVEREIGN",
    heroTagline: "Archive II · Royal Reserve Allocation",
    legacyStatement: "From the ancient valleys of Taif, where roses carry the weight of empires, emerges the most powerful olfactory statement of our generation.",
    legacyVoice: "The Queen of Taif is an act of devotion. Sourced from the legendary Taif rose harvest — the rarest in the Arab world — this fragrance channels centuries of royal tradition into one breathtaking declaration. For those who command rooms without speaking.",
    topNotes: ['Damascene Rose Dew', 'Taif Blossom Elixir', 'Golden Saffron Silk'],
    heartNotes: ['Oud Rose Fusion', 'Bulgarian Rose Absolute', 'Tuberose Majesty'],
    baseNotes: ['Royal Ambergris', 'Sandalwood Throne', 'Sacred Incense Trail'],
    specs: [
      { label: 'Classification', value: 'Imperial Rose Extrait' },
      { label: 'Concentration', value: 'Extrait de Parfum' },
      { label: 'Volume', value: '100ML' },
      { label: 'Longevity', value: '16–24+ Hours' },
      { label: 'Projection', value: 'Majestic Royal Aura' },
      { label: 'Sillage', value: 'Commanding Presence' },
      { label: 'Production', value: 'Ultra-Limited Batch' },
      { label: 'Edition', value: 'Archive II — 50 Editions' },
      { label: 'Authentication', value: 'Polygon Mainnet — NFT Verified' },
    ],
    nftTitle: "Queen of Taif", nftEdition: "Rose Sovereign Edition", nftRarity: "ROYAL FOUNDERS",
    nftTraits: [
      { trait: 'Archive', value: 'Archive II — Royal Reserve' },
      { trait: 'Series', value: 'The Imperial Rose' },
      { trait: 'Edition', value: 'Royal — 50 Editions' },
      { trait: 'Holder Rights', value: 'Private Concierge Access' },
      { trait: 'Access Tier', value: 'Royal Sovereign' },
    ],
    galleryImages: ['/products/queen-of-taif/taif-hero.png','/products/queen-of-taif/taif-1.png','/products/queen-of-taif/taif-2.png'],
    heroImage: '/products/queen-of-taif/taif-hero.png',
  },
  'her-legacy-vault': {
    heroTitle: "HER LEGACY VAULT", heroSubtitle: "THE ETERNAL ARCHIVE",
    heroTagline: "Grand Sovereign · The Complete Dynasty",
    legacyStatement: "Four sovereign compositions. One eternal identity. The complete archive of a dynasty — yours forever.",
    legacyVoice: "Her Legacy Vault is the ultimate declaration. Containing all four sovereign compositions of the House of Shamim — each a masterwork of olfactory architecture — this is not merely a purchase. It is an inheritance. An archive of identity that will outlast seasons, trends, and time.",
    topNotes: ["Shamim's Bloom Accord", "Queen's Rose Dew", "Crystal Musk Elixir"],
    heartNotes: ["Eternal Empress Rose", "Archive Floral Complex", "Golden Ambrosia Reserve"],
    baseNotes: ["Grand Ambergris Vault", "Vintage Oud Reserve", "Legacy Foundation Musk"],
    specs: [
      { label: 'Classification', value: 'Grand Sovereign Archive' },
      { label: 'Contents', value: '4 × Extrait de Parfum' },
      { label: 'Volume', value: '4 × 100ML' },
      { label: 'Compositions', value: 'Bloom · Queen · Empress · Elixir' },
      { label: 'Edition', value: 'Ultra-Rare — 25 Vaults' },
      { label: 'Holder Status', value: 'Grand Sovereign Founder' },
      { label: 'Authentication', value: 'Polygon NFT — Grand Passport' },
      { label: 'Privileges', value: 'Lifetime · Concierge · Archive' },
    ],
    nftTitle: "Her Legacy Vault", nftEdition: "Grand Sovereign Archive", nftRarity: "GRAND SOVEREIGN",
    nftTraits: [
      { trait: 'Archive', value: 'Complete — All 4 Compositions' },
      { trait: 'Edition', value: 'Grand Sovereign — 25 Vaults' },
      { trait: 'Rarity', value: 'Ultra-Rare / 1 of 25' },
      { trait: 'Holder Status', value: 'Grand Sovereign Founder' },
      { trait: 'Privileges', value: 'Lifetime Replenishment + Private' },
    ],
    galleryImages: ['/products/her-legacy-vault/vault-hero.png','/products/her-legacy-vault/vault-box.png'],
    heroImage: '/products/her-legacy-vault/vault-hero.png',
  },
}

const NFT_CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
const MERCHANT_WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
      className="flex items-center gap-1.5 text-[#c9a054] hover:text-zinc-100 transition-colors">
      {c ? <Check size={10} /> : <Copy size={10} />}
      <span className="text-[7px] tracking-[0.3em] uppercase">{c ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.15, vy: -(Math.random() * 0.25 + 0.05),
      a: Math.random(), va: (Math.random() - 0.5) * 0.006,
    }))
    let id: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.va
        if (p.a <= 0 || p.a >= 1) p.va *= -1
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,160,84,${p.a * 0.6})`
        ctx.fill()
      })
      id = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function VelvetSmoke({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#c9a054]/4 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#c9a054]/2 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
    </div>
  )
}

function RevealText({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !inView.current) {
        inView.current = true
        gsap.fromTo(el, { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay, ease: 'power3.out' })
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>
}

function NftCard({ config }: { config: SovereignConfig }) {
  const [rotY, setRotY] = useState(0)
  useEffect(() => {
    let frame: number
    let t = 0
    const animate = () => { t += 0.4; setRotY(t); frame = requestAnimationFrame(animate) }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])
  return (
    <div style={{ perspective: '1000px' }} className="w-full max-w-xs mx-auto">
      <div style={{ transform: `rotateY(${rotY}deg)`, transformStyle: 'preserve-3d', transition: 'none' }}
        className="relative w-full aspect-[3/4] rounded-sm">
        {/* Front */}
        <div style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 bg-gradient-to-br from-[#0a0808] via-[#111007] to-[#0a0808] border border-[#c9a054]/40 rounded-sm p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">House of Shamim</p>
              <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600 mt-0.5">Sovereign NFT</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#8247e5]/20 border border-[#8247e5]/30 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#8247e5"><path d="M16.672 8.786l-5.148 2.97-1.525-.88 5.148-2.97 1.525.88zm-1.525 2.97l-5.148 2.97v-1.76l5.148-2.97v1.76zm0-5.940l1.525.88v1.76l-5.148 2.97v-1.76l3.623-2.09v-1.76zm-6.672 3.85l1.525-.88 5.148 2.97-1.525.88-5.148-2.97z"/></svg>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="font-[Cormorant_Garamond] text-3xl font-light tracking-[0.15em] text-zinc-100 leading-tight">{config.nftTitle}</p>
              <div className="w-8 h-px bg-[#c9a054]/60 mx-auto my-3" />
              <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]">{config.nftEdition}</p>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[6px] tracking-[0.4em] uppercase text-zinc-600">Rarity Tier</span>
              <span className="text-[7px] tracking-[0.2em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-2 py-0.5">{config.nftRarity}</span>
            </div>
            <p className="text-[6px] font-mono text-zinc-700 truncate">{NFT_CONTRACT}</p>
          </div>
        </div>
        {/* Back */}
        <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 bg-gradient-to-br from-[#0a0808] via-[#0d0a05] to-[#0a0808] border border-[#c9a054]/40 rounded-sm p-6 flex flex-col justify-between">
          <div>
            <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">NFT Traits</p>
            {config.nftTraits.map(t => (
              <div key={t.trait} className="flex justify-between py-2.5 border-b border-[#111]">
                <span className="text-[7px] tracking-[0.25em] uppercase text-zinc-600">{t.trait}</span>
                <span className="text-[8px] text-zinc-300 text-right max-w-[55%] font-light">{t.value}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <div className="w-16 h-16 mx-auto border border-[#c9a054]/20 flex items-center justify-center mb-2">
              <p className="font-[Cormorant_Garamond] text-2xl text-[#c9a054]/40">◆</p>
            </div>
            <p className="text-[6px] tracking-[0.3em] uppercase text-zinc-700">Blockchain Verified</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SovereignProductPage({ product }: { product: Product }) {
  const config = CONFIGS[product.slug] ?? CONFIGS['shamims-bloom']
  const heroRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const [activeGallery, setActiveGallery] = useState(0)
  const [quantity, setQuantity] = useState(1)
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
    gsap.registerPlugin(ScrollTrigger)
    gsap.utils.toArray<Element>('.sovereign-reveal').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, delay: (i % 3) * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      )
    })
    gsap.utils.toArray<Element>('.sovereign-line').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
    })
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const callCheckout = useCallback(async (opts: { paymentMethod: string; paymentStatus: string; txHash?: string; proofUrl?: string; walletAddress?: string }) => {
    if (!product) throw new Error('No product')
    const priceUsd = product.price_usd * quantity
    const discount = opts.paymentMethod === 'okbond' ? 10 : 0
    const totalUsd = parseFloat((priceUsd * (1 - discount / 100)).toFixed(2))
    const res = await fetch('/api/v1/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.id, product_name: product.name, quantity,
        payment_method: opts.paymentMethod, payment_status: opts.paymentStatus,
        tx_hash: opts.txHash || null,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
        total_pkr: product.price_pkr * quantity, total_usd: totalUsd, discount_applied: discount,
        price_pkr: product.price_pkr, price_usd: product.price_usd,
        wallet_address: opts.walletAddress || null, payment_proof_url: opts.proofUrl || null, rarity_tier: config.nftRarity,
      }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Checkout failed')
    return data as OrderResult
  }, [product, quantity, custName, custPhone, custAddress, custCity, config.nftRarity])

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    try {
      const result = await callCheckout({ paymentMethod: coin.toLowerCase(), paymentStatus: 'paid', txHash, walletAddress: walletAddress || undefined })
      setOrderResult(result)
    } catch (err: any) {
      setOrderError(err?.message || 'Order save failed — your crypto payment went through. Contact us with TX hash.')
    }
  }, [callCheckout, walletAddress])

  async function handlePlaceOrder() {
    if (!custName || !custPhone || !custAddress || !custCity) { setOrderError('Please fill in all delivery details.'); return }
    if (payMethod === 'pkr_manual' && !txId && !proofFile) { setOrderError('Please provide Transaction ID or payment screenshot.'); return }
    setSubmitting(true); setOrderError(null)
    try {
      let proofUrl: string | null = null
      if (proofFile && proofPreview) {
        const up = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageStr: proofPreview }) })
        const ud = await up.json()
        if (ud.url) proofUrl = ud.url
      }
      const result = await callCheckout({ paymentMethod: payMethod, paymentStatus: payMethod === 'cod' ? 'pending' : 'awaiting_verification', proofUrl: proofUrl || undefined, txHash: txId || undefined })
      setOrderResult(result)
    } catch (err: any) { setOrderError(err?.message || 'Failed to place order. Please try again.') }
    setSubmitting(false)
  }

  function handleProofFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setProofFile(file)
    const reader = new FileReader()
    reader.onload = ev => setProofPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const images = config.galleryImages.length > 0 ? config.galleryImages : (product.images || [])
  const finalPkr = product.price_pkr * quantity
  const finalUsd = (product.price_usd * quantity).toFixed(2)

  if (orderResult) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center px-6" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a1206 0%, #050505 60%)' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-lg w-full">
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
          className="font-[Cormorant_Garamond] text-8xl text-[#c9a054] mb-6">◆</motion.p>
        <h2 className="font-[Cormorant_Garamond] text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-2">Order Placed</h2>
        <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-10">House of Shamim Forever</p>
        <div className="border border-[#1a1008] divide-y divide-[#0e0a04] mb-8 text-left" style={{ background: 'linear-gradient(135deg, #0a0804 0%, #080603 100%)' }}>
          {[['Order Reference', orderResult.order_ref],['Tracking ID', orderResult.tracking_ref],['Status', orderResult.status?.replace(/_/g,' ')]].map(([label, val]) => (
            <div key={label} className="flex justify-between items-center px-6 py-5">
              <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">{label}</p>
              <div className="flex items-center gap-2">
                <p className="text-zinc-200 font-mono text-xs font-light">{val}</p>
                {label !== 'Status' && <CopyBtn text={val ?? ''} />}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <Link href={orderResult.track_url} className="flex items-center gap-2 px-8 py-3.5 border border-[#c9a054]/40 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all"><ExternalLink size={11} /> Track Order</Link>
          <Link href="/shop" className="px-8 py-3.5 border border-zinc-800 text-[8px] tracking-[0.4em] uppercase text-zinc-500 hover:text-zinc-300 transition-all">Continue</Link>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% -10%, #1c1406 0%, #0c0902 40%, #050505 70%)' }}>
        <GoldParticles />
        <VelvetSmoke className="absolute inset-0" />

        {/* Ambient gold orb */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,160,84,0.06) 0%, transparent 70%)', transform: 'translate(50%, -30%)' }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[8px] tracking-[0.8em] uppercase text-[#c9a054] mb-6">{config.heroTagline}</motion.p>

              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: [0.16,1,0.3,1] }}
                className="font-[Cormorant_Garamond] font-light leading-none tracking-[0.06em] text-zinc-50 mb-4"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                {config.heroTitle}
              </motion.h1>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, delay: 0.8, ease: 'power2.out' }}
                className="h-px bg-gradient-to-r from-[#c9a054] to-transparent mb-5 origin-left" style={{ width: '40%' }} />

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
                className="font-[Cormorant_Garamond] italic text-2xl md:text-3xl text-zinc-400 mb-10 leading-relaxed font-light">
                {config.heroSubtitle}
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex items-baseline gap-6 mb-12">
                <p className="font-[Cormorant_Garamond] text-4xl font-light text-zinc-100">{formatPKR(product.price_pkr)}</p>
                <p className="text-zinc-600 text-sm tracking-widest">${product.price_usd} USD</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="flex flex-wrap gap-4">
                <a href="#acquire" className="group relative overflow-hidden px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.6em] uppercase text-[#c9a054] transition-all duration-700 hover:text-black">
                  <span className="absolute inset-0 bg-[#c9a054] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative">Acquire Now</span>
                </a>
                <a href="#legacy" className="px-10 py-4 border border-zinc-800 text-[9px] tracking-[0.6em] uppercase text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all duration-500">
                  Explore Legacy
                </a>
              </motion.div>
            </div>

            {/* Right: Floating bottle */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <motion.div ref={bottleRef} style={{ y: bottleY }}
                animate={{ y: [0, -18, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative">
                {/* Reflection glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(201,160,84,0.25) 0%, transparent 70%)' }} />
                <motion.img
                  src={config.heroImage}
                  alt={config.heroTitle}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.4, delay: 0.5, ease: [0.16,1,0.3,1] }}
                  className="relative z-10 object-contain drop-shadow-2xl"
                  style={{ height: 'clamp(320px, 55vh, 560px)', width: 'auto', filter: 'drop-shadow(0 40px 80px rgba(201,160,84,0.15))' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-[7px] tracking-[0.5em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={12} className="text-[#c9a054]/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ LEGACY STATEMENT ══════════════════════════════════════════════ */}
      <section id="legacy" className="py-40 px-8 md:px-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050505 0%, #080601 50%, #050505 100%)' }}>
        <div className="sovereign-line h-px bg-gradient-to-r from-transparent via-[#c9a054]/40 to-transparent mb-20 origin-center" />

        <div className="max-w-5xl mx-auto text-center">
          <RevealText delay={0}>
            <p className="text-[7px] tracking-[0.9em] uppercase text-[#c9a054] mb-8">Legacy Statement</p>
          </RevealText>
          <RevealText delay={0.1}>
            <blockquote className="font-[Cormorant_Garamond] font-light text-zinc-100 leading-tight mb-12"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
              "{config.legacyStatement}"
            </blockquote>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="font-[Cormorant_Garamond] italic text-zinc-500 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
              {config.legacyVoice}
            </p>
          </RevealText>
        </div>

        <div className="sovereign-line h-px bg-gradient-to-r from-transparent via-[#c9a054]/20 to-transparent mt-20 origin-center" />
      </section>

      {/* ═══ GALLERY ════════════════════════════════════════════════════════ */}
      {images.length > 0 && (
        <section className="py-20 relative overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #100b02 0%, #050505 70%)' }}>
          <RevealText className="text-center mb-16 px-8">
            <p className="text-[7px] tracking-[0.9em] uppercase text-[#c9a054] mb-4">Flacon Gallery</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-zinc-200 tracking-[0.1em]">The Sovereign Object</h2>
          </RevealText>

          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Main image */}
              <div className="relative aspect-square overflow-hidden sovereign-reveal"
                style={{ background: 'radial-gradient(ellipse at center, #100b02 0%, #070604 100%)' }}>
                <AnimatePresence mode="wait">
                  <motion.img key={activeGallery} src={images[activeGallery]} alt={config.heroTitle}
                    initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.8 }} className="w-full h-full object-contain p-8"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </AnimatePresence>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at bottom, rgba(201,160,84,0.08) 0%, transparent 60%)' }} />
              </div>

              {/* Thumbnails + details */}
              <div className="space-y-6 px-4 lg:px-8 sovereign-reveal">
                <div className="flex gap-3 flex-wrap mb-8">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveGallery(i)}
                      className={`overflow-hidden transition-all duration-300 border-2 ${activeGallery === i ? 'border-[#c9a054]/70 scale-105' : 'border-zinc-800/60 hover:border-zinc-600'}`}
                      style={{ width: 72, height: 72 }}>
                      <img src={img} alt="" className="w-full h-full object-contain bg-zinc-900/80 p-1"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                    </button>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-[#c9a054]/30 to-transparent" />

                <div>
                  <p className="font-[Cormorant_Garamond] text-4xl font-light text-zinc-100 tracking-[0.1em] mb-2">{config.heroTitle}</p>
                  <p className="font-[Cormorant_Garamond] italic text-zinc-500 text-xl">{config.heroSubtitle}</p>
                </div>

                <div className="space-y-3 pt-4">
                  {[
                    { label: 'Archive Classification', value: config.heroTagline },
                    { label: 'Concentration', value: 'Extrait de Parfum' },
                    { label: 'Authentication', value: 'Polygon Mainnet NFT' },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between items-center py-3 border-b border-[#0e0a04]">
                      <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-600">{r.label}</span>
                      <span className="text-zinc-300 text-xs font-light">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ SCENT ARCHITECTURE ════════════════════════════════════════════ */}
      <section className="py-40 px-8 md:px-20 relative"
        style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0702 30%, #050505 100%)' }}>
        <div className="max-w-[1400px] mx-auto">
          <RevealText className="text-center mb-20">
            <p className="text-[7px] tracking-[0.9em] uppercase text-[#c9a054] mb-4">Olfactory Architecture</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-zinc-200 tracking-[0.1em]">Scent Pyramid</h2>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-4xl mx-auto">
            {[
              { tier: 'TOP', label: 'Opening Veil', sub: 'First Impression', notes: config.topNotes, delay: 0.1, width: '70%' },
              { tier: 'HEART', label: 'Sovereign Core', sub: 'Emotional Identity', notes: config.heartNotes, delay: 0.2, width: '85%' },
              { tier: 'BASE', label: 'Eternal Foundation', sub: 'Memory & Longevity', notes: config.baseNotes, delay: 0.3, width: '100%' },
            ].map((layer, idx) => (
              <RevealText key={layer.tier} delay={layer.delay} className="sovereign-reveal">
                <div className={`relative p-8 md:p-10 border-b md:border-b-0 border-[#0d0a04] md:border-r last:border-r-0 border-r-[#0d0a04] ${idx === 1 ? 'md:border-t-0 border-t border-[#0d0a04]' : ''}`}
                  style={{ background: `linear-gradient(${idx === 1 ? '180deg' : idx === 0 ? '135deg' : '225deg'}, rgba(201,160,84,${0.04 - idx * 0.005}) 0%, transparent 60%)` }}>
                  <div className="text-center mb-8">
                    <span className="text-[7px] tracking-[0.7em] uppercase text-[#c9a054]/70 block mb-1">{layer.tier}</span>
                    <p className="font-[Cormorant_Garamond] text-2xl font-light text-zinc-300 mb-1">{layer.label}</p>
                    <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-700">{layer.sub}</p>
                  </div>
                  <div className="space-y-3">
                    {layer.notes.map((note, ni) => (
                      <div key={ni} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#c9a054]/50 flex-shrink-0" />
                        <p className="text-zinc-400 font-light text-sm leading-relaxed">{note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(201,160,84,${0.15 + idx * 0.05}), transparent)` }} />
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PERFORMANCE MATRIX ════════════════════════════════════════════ */}
      <section className="py-40 px-8 md:px-20 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #0c0802 0%, #050505 65%)' }}>
        <div className="max-w-3xl mx-auto">
          <RevealText className="text-center mb-20">
            <p className="text-[7px] tracking-[0.9em] uppercase text-[#c9a054] mb-4">Technical Specifications</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-zinc-200 tracking-[0.1em]">Performance Matrix</h2>
          </RevealText>

          <div className="border border-[#1a1206]" style={{ background: 'linear-gradient(180deg, #0a0702 0%, #070503 100%)' }}>
            {config.specs.map((spec, i) => (
              <RevealText key={spec.label} delay={i * 0.06}>
                <div className="flex justify-between items-center px-8 py-6 border-b border-[#0e0a04] last:border-b-0 group hover:bg-[#c9a054]/3 transition-colors duration-500">
                  <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600 group-hover:text-zinc-500 transition-colors">{spec.label}</p>
                  <p className="text-zinc-300 text-sm font-light text-right max-w-[55%] font-[Cormorant_Garamond] text-base">{spec.value}</p>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIGITAL TWIN / NFT ═════════════════════════════════════════════ */}
      <section className="py-40 px-8 md:px-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050505 0%, #08060e 50%, #050505 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(130,71,229,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-[1400px] mx-auto">
          <RevealText className="text-center mb-20">
            <p className="text-[7px] tracking-[0.9em] uppercase text-[#8247e5]/70 mb-4">Blockchain · Polygon Mainnet</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-zinc-200 tracking-[0.1em]">Digital Sovereign Passport</h2>
          </RevealText>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealText delay={0.1}>
              <NftCard config={config} />
            </RevealText>

            <RevealText delay={0.2} className="space-y-8">
              <div>
                <p className="font-[Cormorant_Garamond] text-4xl font-light text-zinc-100 mb-3">Blockchain Authentication</p>
                <p className="text-zinc-600 font-light leading-relaxed">Every sovereign creation from the House of Shamim carries a permanent, irrevocable proof of authenticity on the Polygon blockchain. Your NFT is your identity — inseparable from the physical artifact.</p>
              </div>

              <div className="space-y-0 border border-[#1a1008]" style={{ background: 'linear-gradient(135deg, #0a0708 0%, #080605 100%)' }}>
                {[
                  { label: 'Contract', value: `${NFT_CONTRACT.slice(0,10)}...${NFT_CONTRACT.slice(-6)}`, copy: NFT_CONTRACT },
                  { label: 'Network', value: 'Polygon Mainnet', copy: null },
                  { label: 'Standard', value: 'ERC-721 Non-Fungible Token', copy: null },
                  { label: 'Rarity Tier', value: config.nftRarity, copy: null },
                  { label: 'Merchant Wallet', value: `${MERCHANT_WALLET.slice(0,8)}...${MERCHANT_WALLET.slice(-6)}`, copy: MERCHANT_WALLET },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center px-6 py-5 border-b border-[#0e0a04] last:border-b-0">
                    <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{row.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-zinc-400 text-xs font-mono font-light">{row.value}</p>
                      {row.copy && <CopyBtn text={row.copy} />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`https://polygonscan.com/address/${NFT_CONTRACT}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-[#8247e5]/30 text-[8px] tracking-[0.3em] uppercase text-[#8247e5]/80 hover:bg-[#8247e5]/10 transition-all">
                  <ExternalLink size={10} /> View on Polygonscan
                </a>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* ═══ ACQUIRE ═══════════════════════════════════════════════════════ */}
      <section id="acquire" className="py-40 px-8 md:px-20 relative"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a1206 0%, #050505 50%)' }}>
        <div className="sovereign-line h-px bg-gradient-to-r from-transparent via-[#c9a054]/40 to-transparent mb-20 origin-center" />

        <div className="max-w-3xl mx-auto">
          <RevealText className="text-center mb-16">
            <p className="text-[7px] tracking-[0.9em] uppercase text-[#c9a054] mb-4">Acquisition</p>
            <h2 className="font-[Cormorant_Garamond] text-5xl md:text-6xl font-light text-zinc-200 tracking-[0.1em]">Claim Your Sovereign</h2>
          </RevealText>

          <RevealText delay={0.1}>
            {/* Price display */}
            <div className="text-center mb-12 py-10 border border-[#1a1206]"
              style={{ background: 'linear-gradient(135deg, #0c0902 0%, #080601 100%)' }}>
              <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600 mb-3">Sovereign Allocation Price</p>
              <div className="flex items-baseline justify-center gap-4 mb-2">
                <span className="font-[Cormorant_Garamond] text-6xl font-light text-zinc-100">{formatPKR(finalPkr)}</span>
              </div>
              <p className="text-zinc-600 tracking-widest">${finalUsd} USD</p>
              {quantity > 1 && <p className="text-[8px] text-zinc-700 mt-2 tracking-widest">({quantity} × {formatPKR(product.price_pkr)})</p>}
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mb-8 px-6 py-5 border border-[#1a1206]"
              style={{ background: 'linear-gradient(135deg, #0a0802 0%, #060501 100%)' }}>
              <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600">Quantity</p>
              <div className="flex items-center border border-[#1a1206]">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-[#c9a054] transition-colors border-r border-[#1a1206]">−</button>
                <span className="w-12 text-center text-zinc-200 font-[Cormorant_Garamond] text-xl">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-[#c9a054] transition-colors border-l border-[#1a1206]">+</button>
              </div>
            </div>

            {/* Delivery details */}
            <div className="space-y-2 mb-8">
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600 mb-4">Delivery Information</p>
              {[
                { v: custName, s: setCustName, ph: 'Full Name *' },
                { v: custPhone, s: setCustPhone, ph: 'Phone Number *' },
                { v: custAddress, s: setCustAddress, ph: 'Delivery Address *' },
                { v: custCity, s: setCustCity, ph: 'City *' },
              ].map(({ v, s, ph }) => (
                <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                  className="w-full px-5 py-4 text-[11px] text-zinc-300 placeholder:text-zinc-700 focus:outline-none transition-all duration-300"
                  style={{ background: '#080601', border: '1px solid #1a1206' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(201,160,84,0.3)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#1a1206' }} />
              ))}
            </div>

            {/* Payment method */}
            <div className="mb-8">
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600 mb-4">Payment Method</p>
              <div className="grid grid-cols-3 gap-0 border border-[#1a1206]">
                {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map((m, i) => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    className={`py-4 text-[8px] tracking-[0.3em] uppercase transition-all duration-300 ${i !== 2 ? 'border-r border-[#1a1206]' : ''} ${payMethod === m ? 'text-[#c9a054] bg-[#c9a054]/6 border-b-2 border-b-[#c9a054]' : 'text-zinc-600 hover:text-zinc-400 border-b-2 border-b-transparent'}`}>
                    {m === 'crypto' ? '◆ Crypto' : m === 'pkr_manual' ? 'PKR Transfer' : 'Cash on Delivery'}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {payMethod === 'crypto' && (
                <motion.div key="crypto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Web3PaySection priceUsd={product.price_usd * quantity} onSuccess={handleWeb3Success} />
                </motion.div>
              )}

              {payMethod === 'pkr_manual' && (
                <motion.div key="pkr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="border border-[#1a1206] divide-y divide-[#0e0a04]" style={{ background: '#080601' }}>
                    <div className="flex justify-between items-center px-6 py-5">
                      <div>
                        <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-1">EasyPaisa</p>
                        <p className="text-zinc-400 text-xs">{EASYPAISA_NUMBER} · {EASYPAISA_NAME}</p>
                      </div>
                      <CopyBtn text={EASYPAISA_NUMBER} />
                    </div>
                    <div className="flex justify-between items-center px-6 py-5">
                      <div>
                        <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-1">UBL Bank IBAN</p>
                        <p className="text-zinc-400 text-xs font-mono">{UBL_IBAN}</p>
                      </div>
                      <CopyBtn text={UBL_IBAN} />
                    </div>
                  </div>
                  <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID / Reference Number"
                    className="w-full px-5 py-4 text-[11px] text-zinc-300 placeholder:text-zinc-700 focus:outline-none transition-all"
                    style={{ background: '#080601', border: '1px solid #1a1206' }} />
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-dashed border-[#1a1206] hover:border-[#c9a054]/30 transition-colors">
                    <Upload size={13} className="text-zinc-700" />
                    <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-700">Upload Payment Screenshot</span>
                    <input type="file" accept="image/*" onChange={handleProofFile} className="hidden" />
                  </label>
                  {proofPreview && (
                    <div className="relative inline-block">
                      <img src={proofPreview} alt="proof" className="h-24 object-cover opacity-60" />
                      <button onClick={() => { setProofFile(null); setProofPreview(null) }} className="absolute top-1 right-1 text-zinc-400 hover:text-white"><X size={12} /></button>
                    </div>
                  )}
                  {orderError && <p className="text-red-400/70 text-[9px] tracking-wide">{orderError}</p>}
                  <button onClick={handlePlaceOrder} disabled={submitting}
                    className="group relative w-full overflow-hidden py-5 border border-[#c9a054]/50 text-[9px] tracking-[0.7em] uppercase text-[#c9a054] hover:text-black transition-colors duration-500 disabled:opacity-50">
                    <span className="absolute inset-0 bg-[#c9a054] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <span className="relative">{submitting ? 'Processing...' : 'Submit Sovereign Order'}</span>
                  </button>
                </motion.div>
              )}

              {payMethod === 'cod' && (
                <motion.div key="cod" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="px-6 py-8 border border-[#1a1206]" style={{ background: '#080601' }}>
                    <p className="font-[Cormorant_Garamond] text-2xl text-zinc-300 mb-3">Cash on Delivery</p>
                    <p className="text-zinc-600 text-sm font-light leading-relaxed">Pay upon white-glove delivery. Available within Pakistan. Our concierge will confirm via WhatsApp within 2 hours.</p>
                  </div>
                  {orderError && <p className="text-red-400/70 text-[9px] tracking-wide">{orderError}</p>}
                  <button onClick={handlePlaceOrder} disabled={submitting}
                    className="group relative w-full overflow-hidden py-5 border border-[#c9a054]/50 text-[9px] tracking-[0.7em] uppercase text-[#c9a054] hover:text-black transition-colors duration-500 disabled:opacity-50">
                    <span className="absolute inset-0 bg-[#c9a054] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <span className="relative">{submitting ? 'Placing Order...' : 'Confirm COD Order'}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealText>
        </div>

        <div className="sovereign-line h-px bg-gradient-to-r from-transparent via-[#c9a054]/20 to-transparent mt-20 origin-center" />
      </section>

      {/* ═══ RELATED COLLECTION ═════════════════════════════════════════════ */}
      <section className="py-24 px-8 md:px-20">
        <RevealText className="text-center mb-14">
          <p className="text-[7px] tracking-[0.9em] uppercase text-[#c9a054] mb-4">The Sovereign House</p>
          <h2 className="font-[Cormorant_Garamond] text-4xl font-light text-zinc-400 tracking-[0.1em]">Related Creations</h2>
        </RevealText>
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {[
            { slug: 'shamims-bloom', name: "Shamim's Bloom", sub: 'Archive I' },
            { slug: 'queen-of-taif', name: 'Queen of Taif', sub: 'Archive II' },
            { slug: 'her-legacy-vault', name: 'Her Legacy Vault', sub: 'Grand Sovereign' },
          ].filter(p => p.slug !== product.slug).map(p => (
            <Link key={p.slug} href={`/products/${p.slug}`}
              className="group px-8 py-5 border border-[#1a1206] hover:border-[#c9a054]/30 transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, #080601 0%, #060500 100%)' }}>
              <p className="font-[Cormorant_Garamond] text-xl font-light text-zinc-300 group-hover:text-[#c9a054] transition-colors mb-1">{p.name}</p>
              <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{p.sub}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
