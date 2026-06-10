'use client'
import type React from 'react'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Copy, Check, Upload, X, ExternalLink, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/types'
import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
import { useAccount } from 'wagmi'

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

const SERIF = "'Cormorant Garamond', Georgia, serif"
const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'

const SUB_CAT_MAP: Record<string, string> = {
  'ab8df629-e022-41d9-a6de-fac63d5680e8': 'For Her',
  'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b': 'For Him',
  '63e2c67c-fdba-40f7-9cd1-2cbe7fd6d852': 'Unisex',
}

const GENDER_ARCHIVE: Record<string, string> = {
  'For Her': 'SF Feminine Beauty Archive',
  'For Him': 'SF Masculine Grooming Archive',
  'Unisex': 'SF Prestige Cosmetics Archive',
  'Default': 'SF Cosmetics Archive',
}

const GENDER_TAGLINE: Record<string, string> = {
  'For Her': 'Sovereign Feminine Curation',
  'For Him': 'Sovereign Masculine Curation',
  'Unisex': 'Sovereign Prestige Curation',
  'Default': 'Sovereign Cosmetics Curation',
}

const HOLDER_PRIVILEGES: Record<string, string[]> = {
  'For Her': [
    'SF Feminine Beauty Archive Member — Exclusive access to the House of Shamim Forever curated feminine beauty collection',
    'Priority Restock Alerts — First to receive feminine beauty allocation updates before public release',
    'House Feminine Newsletter — Monthly sovereign dispatches, exclusive drops, and insider curation notes',
    'Beauty Concierge Access — Direct WhatsApp priority line to the House of Shamim Forever curation team',
    'Bundle Allocation Access — Exclusive bundle pricing across the SF Feminine Beauty Archive collections',
  ],
  'For Him': [
    'SF Masculine Grooming Archive Member — Exclusive access to the House of Shamim Forever masculine grooming collection',
    'Priority Restock Alerts — First to receive masculine grooming allocation updates before public release',
    'House Gentleman Newsletter — Quarterly sovereign dispatches from the masculine curation vault',
    'Grooming Concierge Access — Direct WhatsApp priority line to the House of Shamim Forever curation team',
    'Bundle Allocation Access — Exclusive bundle pricing across the SF Masculine Grooming Archive collections',
  ],
  'Unisex': [
    'SF Prestige Archive Member — Exclusive access to the House of Shamim Forever prestige cosmetics collection',
    'Priority Restock Alerts — First to receive prestige allocation updates before public release',
    'House Prestige Newsletter — Monthly sovereign dispatches from the prestige curation vault',
    'Prestige Concierge Access — Direct WhatsApp priority line to the House of Shamim Forever curation team',
    'Bundle Allocation Access — Exclusive bundle pricing across the SF Prestige Cosmetics Archive',
  ],
  'Default': [
    'SF Cosmetics Archive Member — Exclusive access to the House of Shamim Forever cosmetics collection',
    'Priority Restock Alerts — First to receive allocation updates before public release',
    'House Newsletter — Monthly sovereign dispatches from the curation vault',
    'Cosmetics Concierge Access — Direct WhatsApp priority line to the House of Shamim Forever team',
    'Bundle Allocation Access — Exclusive bundle pricing across all SF Cosmetics Archive collections',
  ],
}

const CSS = `
@media(max-width:768px){
  .cos-gallery{flex-direction:column!important}
  .cos-thumbs{flex-direction:row!important;flex-wrap:wrap!important;max-height:none!important;overflow:visible!important}
  .cos-thumb{flex:1 1 calc(50% - 4px)!important;aspect-ratio:1!important}
  .cos-pay-grid{grid-template-columns:1fr 1fr!important}
  .cos-notes-grid{grid-template-columns:1fr!important}
  .cos-priv-item{padding:14px 16px!important}
}
@keyframes shimmerPulse{0%,100%{opacity:0.45}50%{opacity:1}}
@keyframes rotateSlow{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}
`

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
      style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c9a054', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {c ? <Check size={10} /> : <Copy size={10} />}
      <span style={{ fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase' as const }}>{c ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2, vx: (Math.random() - 0.5) * 0.1, vy: -(Math.random() * 0.18 + 0.03),
      a: Math.random(), va: (Math.random() - 0.5) * 0.005,
    }))
    let id: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.va
        if (p.a <= 0 || p.a >= 1) p.va *= -1
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,160,84,${p.a * 0.5})`; ctx.fill()
      })
      id = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }} />
}

function getRarityTier(price_pkr: number): string {
  if (price_pkr >= 150000) return 'SOVEREIGN VAULT'
  if (price_pkr >= 45000) return 'SIGNATURE RESERVE'
  if (price_pkr >= 15000) return 'PRESTIGE EDITION'
  return 'HERITAGE EDITION'
}

function getSerial(id: string): string {
  return `SF-${id.replace(/-/g, '').slice(0, 8).toUpperCase()}`
}

function formatPKR(n: number) {
  return 'Rs ' + Math.round(n).toLocaleString('en-PK')
}

function getRarityColor(tier: string): string {
  if (tier === 'SOVEREIGN VAULT') return '#f0d080'
  if (tier === 'SIGNATURE RESERVE') return '#c9a054'
  if (tier === 'PRESTIGE EDITION') return '#a08040'
  return '#6b5a3a'
}

interface ParsedStory {
  tagline?: string
  olfactory?: string | { top_description?: string; heart_description?: string; base_description?: string }
  scentPyramid?: { top?: string; heart?: string; base?: string }
  specs?: {
    volume?: string; concentration?: string; sillage?: string; longevity?: string; batch?: string; price?: string
    skinType?: string; benefits?: string; finish?: string; usage?: string; classification?: string
  }
  keyActives?: string[]
  benefits?: string[]
  ingredients?: string
  usage?: string
  holderPrivileges?: string[]
  archiveLabel?: string
  archiveCode?: string
  collectionName?: string
  category?: string
  whyCurated?: string[]
  curatorPositioning?: string[]
  legacyVoice?: string
  legacyStatement?: string
  topNotes?: string[]
  heartNotes?: string[]
  baseNotes?: string[]
}

function RotatingNftCard({ product, genderLabel, serial, tier }: { product: Product; genderLabel: string; serial: string; tier: string }) {
  const [deg, setDeg] = useState(0)
  useEffect(() => {
    let frame: number; let t = 0
    const go = () => { t += 0.3; setDeg(t); frame = requestAnimationFrame(go) }
    go(); return () => cancelAnimationFrame(frame)
  }, [])
  const front = deg % 360 < 180
  const archive = GENDER_ARCHIVE[genderLabel] || GENDER_ARCHIVE.Default
  const rarityColor = getRarityColor(tier)

  return (
    <div style={{ perspective: '1100px' }} className="w-full max-w-[260px] mx-auto select-none">
      <div style={{ transform: `rotateY(${deg}deg)`, transformStyle: 'preserve-3d', transition: 'none', position: 'relative', width: '100%', aspectRatio: '3/4' }}>
        {[false, true].map(isBack => (
          <div
            key={String(isBack)}
            style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              transform: isBack ? 'rotateY(180deg)' : 'none',
              background: 'linear-gradient(145deg, #0c0906 0%, #0f0c07 50%, #080604 100%)',
              border: `1px solid ${rarityColor}55`,
              display: 'flex', flexDirection: 'column', padding: 20,
            }}
          >
            {!isBack ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: rarityColor, marginBottom: 2 }}>House of Shamim</p>
                    <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Digital Passport</p>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ fontSize: 18, color: rarityColor, lineHeight: 1 }}
                  >◆</motion.div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} style={{ width: '80%', height: '80%', objectFit: 'contain', opacity: 0.85 }} />
                  ) : (
                    <p style={{ fontFamily: SERIF, fontSize: 48, color: `${rarityColor}15`, fontWeight: 300 }}>SF</p>
                  )}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${rarityColor}18` }}>
                  <p style={{ fontFamily: SERIF, fontSize: 11, color: '#c9b894', fontWeight: 300, lineHeight: 1.3, marginBottom: 4 }}>{product.name}</p>
                  <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase', color: `${rarityColor}80` }}>{genderLabel}</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase', color: rarityColor, marginBottom: 6 }}>Sovereign Certificate</p>
                  <div style={{ borderTop: `1px solid ${rarityColor}20`, paddingTop: 10 }}>
                    <p style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 4 }}>Serial Number</p>
                    <p style={{ fontFamily: 'monospace', fontSize: 13, color: rarityColor, letterSpacing: '0.15em' }}>{serial}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    ['Rarity Tier', tier],
                    ['Network', 'Polygon'],
                    ['Standard', 'ERC-721'],
                    ['Archive', archive.replace('SF ', '')],
                  ].map(([lbl, val]) => (
                    <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: '#0a0806' }}>
                      <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2a2520' }}>{lbl}</p>
                      <p style={{ fontSize: 7, color: '#a08060' }}>{val}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: `1px solid ${rarityColor}12`, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} />
                  <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Polygon Active</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CosmeticsProductPage({ product }: { product: Product }) {
  const images = product.images || []
  const [activeImage, setActiveImage] = useState(0)
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
  const [story, setStory] = useState<ParsedStory | null>(null)

  const genderLabel = SUB_CAT_MAP[product.sub_category_id || ''] || 'Default'
  const genderDisplay = genderLabel === 'Default' ? '' : genderLabel
  const archive = GENDER_ARCHIVE[genderLabel] || GENDER_ARCHIVE.Default
  const tagline = GENDER_TAGLINE[genderLabel] || GENDER_TAGLINE.Default
  const privileges = HOLDER_PRIVILEGES[genderLabel] || HOLDER_PRIVILEGES.Default
  const serial = getSerial(product.id)
  const tier = getRarityTier(product.price_pkr)
  const rarityColor = getRarityColor(tier)
  const isSovereign = product.price_pkr >= 45000

  useEffect(() => {
    if (product?.story) {
      try {
        const s: ParsedStory = typeof product.story === 'string' ? JSON.parse(product.story) : product.story
        if (s.olfactory && typeof s.olfactory === 'object') {
          const o = s.olfactory as { top_description?: string; heart_description?: string; base_description?: string }
          s.olfactory = [o.top_description, o.heart_description, o.base_description].filter(Boolean).join(' · ')
        }
        setStory(s)
      } catch {}
    }
  }, [product])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    (gsap.utils.toArray('.cos-reveal') as Element[]).forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36, filter: 'blur(7px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    })
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const callCheckout = useCallback(async (opts: { paymentMethod: string; paymentStatus: string; txHash?: string; proofUrl?: string; walletAddress?: string }) => {
    const totalUsd = parseFloat((product.price_usd * quantity).toFixed(2))
    const res = await fetch('/api/v1/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.id, product_name: product.name, quantity,
        payment_method: opts.paymentMethod, payment_status: opts.paymentStatus,
        tx_hash: opts.txHash || null,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
        total_pkr: product.price_pkr * quantity, total_usd: totalUsd, discount_applied: 0,
        price_pkr: product.price_pkr, price_usd: product.price_usd,
        wallet_address: opts.walletAddress || null, payment_proof_url: opts.proofUrl || null,
        rarity_tier: tier,
      }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Checkout failed')
    return data as OrderResult
  }, [product, quantity, custName, custPhone, custAddress, custCity, tier])

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    try {
      setOrderResult(await callCheckout({ paymentMethod: coin.toLowerCase(), paymentStatus: 'paid', txHash, walletAddress: walletAddress || undefined }))
    } catch (err: any) {
      setOrderError(err?.message || 'Payment received. Contact us with your TX hash.')
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
        const ud = await up.json(); if (ud.url) proofUrl = ud.url
      }
      setOrderResult(await callCheckout({ paymentMethod: payMethod, paymentStatus: payMethod === 'cod' ? 'pending' : 'awaiting_verification', proofUrl: proofUrl || undefined, txHash: txId || undefined }))
    } catch (err: any) {
      setOrderError(err?.message || 'Failed to place order.')
    }
    setSubmitting(false)
  }

  const heroImage = images[0] || null
  const categoryName = (product as any).main_category?.name || 'Cosmetics'

  const topNotes = story?.topNotes || (story?.scentPyramid?.top ? [story.scentPyramid.top] : [])
  const heartNotes = story?.heartNotes || (story?.scentPyramid?.heart ? [story.scentPyramid.heart] : [])
  const baseNotes = story?.baseNotes || (story?.scentPyramid?.base ? [story.scentPyramid.base] : [])
  const hasNotes = topNotes.length > 0 || heartNotes.length > 0 || baseNotes.length > 0

  const specs: [string, string][] = []
  if (story?.specs?.volume) specs.push(['Volume', story.specs.volume])
  if (story?.specs?.classification) specs.push(['Classification', story.specs.classification])
  if (story?.specs?.concentration) specs.push(['Formula Type', story.specs.concentration])
  if (story?.specs?.sillage) specs.push(['Finish', story.specs.sillage])
  if (story?.specs?.longevity) specs.push(['Duration', story.specs.longevity])
  if (story?.specs?.skinType) specs.push(['Skin Type', story.specs.skinType])
  if (story?.specs?.benefits) specs.push(['Benefits', story.specs.benefits])
  if (story?.specs?.batch) specs.push(['Batch', story.specs.batch])

  const narrativeText = story?.legacyVoice || story?.olfactory as string || product.description || null
  const whyCurated = story?.whyCurated || []
  const curatorPositioning = story?.curatorPositioning || []

  if (orderResult) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: '#030303' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: 500, width: '100%' }}>
          <p style={{ fontFamily: SERIF, fontSize: 64, color: '#c9a054', lineHeight: 1, marginBottom: 16 }}>◆</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 300, letterSpacing: '0.15em', color: '#f0ece4', textTransform: 'uppercase', marginBottom: 8 }}>Order Placed</h2>
          <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 32 }}>House of Shamim Forever</p>
          <div style={{ border: '1px solid rgba(201,160,84,0.12)', background: 'linear-gradient(135deg, #0c0906 0%, #080604 100%)', marginBottom: 24 }}>
            {[['Order Reference', orderResult.order_ref], ['Tracking ID', orderResult.tracking_ref], ['Status', orderResult.status?.replace(/_/g, ' ')]].map(([lbl, val]) => (
              <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#c9b894', wordBreak: 'break-all' }}>{val}</p>
                  {lbl !== 'Status' && <CopyBtn text={val ?? ''} />}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={orderResult.track_url} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none' }}>
              <ExternalLink size={10} /> Track Order
            </Link>
            <Link href="/shop" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.08)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830', textDecoration: 'none' }}>Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ background: '#030303', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', background: '#000', overflow: 'hidden', width: '100%', aspectRatio: '1 / 1', maxHeight: '90vh' }}>
        {/* Glow effects */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '5%', height: '55%', background: `radial-gradient(ellipse 52% 60% at 50% 26%, ${rarityColor}18 0%, ${rarityColor}06 40%, transparent 68%)`, pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 42%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none', zIndex: 3 }} />
        {/* Gold frame lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${rarityColor}cc 50%, transparent)`, zIndex: 8 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to left, transparent, ${rarityColor}cc 50%, transparent)`, zIndex: 8 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${rarityColor}80 50%, transparent)`, zIndex: 8 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${rarityColor}80 50%, transparent)`, zIndex: 8 }} />
        {/* Corner brackets */}
        {([
          { top: 54, left: 14, borderTop: `1px solid ${rarityColor}55`, borderLeft: `1px solid ${rarityColor}55` },
          { top: 54, right: 14, borderTop: `1px solid ${rarityColor}55`, borderRight: `1px solid ${rarityColor}55` },
          { bottom: 14, left: 14, borderBottom: `1px solid ${rarityColor}40`, borderLeft: `1px solid ${rarityColor}40` },
          { bottom: 14, right: 14, borderBottom: `1px solid ${rarityColor}40`, borderRight: `1px solid ${rarityColor}40` },
        ] as React.CSSProperties[]).map((style, i) => (
          <div key={i} style={{ position: 'absolute', ...style, width: 18, height: 18, pointerEvents: 'none', zIndex: 9 }} />
        ))}

        {heroImage ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <img src={heroImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
          </motion.div>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(30,22,8,0.9) 0%, #030303 65%)', zIndex: 1 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.05 }} transition={{ duration: 3 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: SERIF, fontSize: 'clamp(8rem,30vw,22rem)', color: '#c9a054', fontWeight: 300, whiteSpace: 'nowrap' }}>SF</motion.p>
          </div>
        )}

        <GoldParticles />

        {/* Top badge */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ position: 'absolute', top: 70, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 20 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.55em', textTransform: 'uppercase', color: `${rarityColor}90`, whiteSpace: 'nowrap' }}>
            {archive} {genderDisplay ? `· ${genderDisplay}` : ''}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 30, pointerEvents: 'none' }}>
          <span style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: `${rarityColor}50`, writingMode: 'vertical-lr' }}>Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={10} color={`${rarityColor}50`} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PRODUCT INFO ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#030303', padding: 'clamp(40px,7vw,72px) clamp(20px,5vw,80px)', textAlign: 'center', borderTop: `1px solid ${rarityColor}18` }}>
        <div className="cos-reveal">
          <p style={{ fontSize: 7, letterSpacing: '0.55em', textTransform: 'uppercase', color: rarityColor, marginBottom: 12 }}>
            {tagline} {genderDisplay ? `· ${genderDisplay}` : ''}
          </p>
        </div>
        <div className="cos-reveal">
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem,6vw,5rem)', fontWeight: 300, letterSpacing: '0.1em', color: '#f0ece4', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 20 }}>
            {product.name}
          </h1>
        </div>
        {story?.legacyStatement && (
          <div className="cos-reveal">
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem,2vw,1.4rem)', color: 'rgba(240,236,228,0.5)', fontWeight: 300, marginBottom: 16, letterSpacing: '0.04em' }}>
              {story.legacyStatement}
            </p>
          </div>
        )}
        <div className="cos-reveal" style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          <div>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, color: '#f8f4ee', lineHeight: 1 }}>
              ${product.price_usd} <span style={{ fontSize: '0.4em', letterSpacing: '0.35em', color: rarityColor }}>USD</span>
            </p>
            <p style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830', marginTop: 4 }}>{formatPKR(product.price_pkr)}</p>
          </div>
        </div>
        <div className="cos-reveal" style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {genderDisplay && (
            <span style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: rarityColor, border: `1px solid ${rarityColor}40`, padding: '5px 12px' }}>
              {genderDisplay}
            </span>
          )}
          <span style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830', border: '1px solid #1a1a1a', padding: '5px 12px' }}>
            {categoryName}
          </span>
          <span style={{ fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase', color: isSovereign ? rarityColor : '#3f3830', border: `1px solid ${isSovereign ? rarityColor + '40' : '#111'}`, padding: '5px 12px' }}>
            {isSovereign ? '◆' : '◇'} NFT Included
          </span>
        </div>
        <div className="cos-reveal" style={{ marginTop: 32 }}>
          <a href="#acquire" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', border: `1px solid ${rarityColor}55`, fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: rarityColor, textDecoration: 'none', transition: 'all 0.4s', background: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = rarityColor; (e.currentTarget as HTMLAnchorElement).style.color = '#050505' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'none'; (e.currentTarget as HTMLAnchorElement).style.color = rarityColor }}>
            Acquire Now
          </a>
        </div>
      </section>

      {/* ── IMAGE GALLERY ────────────────────────────────────────────────────── */}
      {images.length > 1 && (
        <section style={{ padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,80px)', background: '#000' }}>
          <div className="cos-reveal" style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: rarityColor }}>Gallery</p>
          </div>
          <div className="cos-gallery" style={{ display: 'flex', gap: 8, maxWidth: 900, margin: '0 auto' }}>
            <div style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.img key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                  src={images[activeImage]} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.92) contrast(1.04)' }} />
              </AnimatePresence>
            </div>
            <div className="cos-thumbs" style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: '100%', overflowY: 'auto', width: 80, flexShrink: 0 }}>
              {images.map((img, i) => (
                <button key={i} className="cos-thumb" onClick={() => setActiveImage(i)}
                  style={{ width: 80, aspectRatio: '3/4', border: i === activeImage ? `1px solid ${rarityColor}` : '1px solid #1a1a1a', background: 'none', cursor: 'pointer', padding: 0, overflow: 'hidden', flexShrink: 0, transition: 'border-color 0.3s' }}>
                  <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: i === activeImage ? 1 : 0.5, transition: 'opacity 0.3s' }} />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CURATOR'S NARRATIVE ──────────────────────────────────────────────── */}
      {narrativeText && (
        <section style={{ padding: 'clamp(52px,8vw,90px) 0', background: `linear-gradient(180deg, #030303 0%, #080602 50%, #030303 100%)` }}>
          <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <div className="cos-reveal">
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: rarityColor, marginBottom: 28 }}>
                {story?.legacyVoice ? "The House Archive Record" : "The Creation"}
              </p>
            </div>
            {product.description && (
              <div className="cos-reveal">
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.3rem,3vw,2.2rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.55, marginBottom: 28 }}>
                  {product.description}
                </p>
              </div>
            )}
            {story?.legacyVoice && (
              <div className="cos-reveal">
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.95rem,2vw,1.35rem)', color: 'rgba(240,236,228,0.38)', fontWeight: 300, lineHeight: 1.95, borderLeft: `2px solid ${rarityColor}22`, paddingLeft: 20, textAlign: 'left', maxWidth: 640, margin: '0 auto' }}>
                  {story.legacyVoice}
                </p>
              </div>
            )}
            {whyCurated.length > 0 && (
              <div className="cos-reveal" style={{ marginTop: 28 }}>
                {whyCurated.slice(0, 2).map((line, i) => (
                  <p key={i} style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.9rem,1.8vw,1.2rem)', color: 'rgba(240,236,228,0.3)', lineHeight: 1.85, marginBottom: 12 }}>
                    {line}
                  </p>
                ))}
              </div>
            )}
            {curatorPositioning.length > 0 && (
              <div className="cos-reveal" style={{ marginTop: 24, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                {curatorPositioning.map((pos, i) => (
                  <span key={i} style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: `${rarityColor}70`, borderBottom: `1px solid ${rarityColor}20`, paddingBottom: 2 }}>
                    {pos}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── INGREDIENT PROFILE ───────────────────────────────────────────────── */}
      {hasNotes && (
        <section style={{ padding: 'clamp(44px,7vw,80px) 0', background: `radial-gradient(ellipse 60% 50% at 50% 50%, #0d0902 0%, #030303 60%)` }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
            <div className="cos-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: rarityColor, marginBottom: 10 }}>Formulation</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: '#f0ece4' }}>Ingredient Profile</h2>
            </div>
            <div className="cos-notes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              {[
                { label: 'Key Actives', notes: topNotes, sym: '◈' },
                { label: 'Technology', notes: heartNotes, sym: '◉' },
                { label: 'Formula Base', notes: baseNotes, sym: '◌' },
              ].filter(g => g.notes.length > 0).map(group => (
                <div key={group.label} className="cos-reveal" style={{ border: `1px solid ${rarityColor}12`, background: 'linear-gradient(180deg, #0d0906 0%, #0a0703 100%)', padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${rarityColor}10` }}>
                    <span style={{ fontSize: 14, color: rarityColor }}>{group.sym}</span>
                    <p style={{ fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#3f3830' }}>{group.label}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {group.notes.map((note, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ width: 3, height: 3, borderRadius: '50%', background: `${rarityColor}60`, marginTop: 5, flexShrink: 0 }} />
                        <p style={{ fontFamily: SERIF, fontSize: 13, color: '#c9b894', fontWeight: 300, lineHeight: 1.4 }}>{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SPECIFICATIONS ───────────────────────────────────────────────────── */}
      {specs.length > 0 && (
        <section style={{ padding: 'clamp(44px,7vw,80px) 0', background: '#000' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
            <div className="cos-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: rarityColor, marginBottom: 10 }}>Specifications</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: '#f0ece4' }}>Product Profile</h2>
            </div>
            <div className="cos-reveal" style={{ border: `1px solid ${rarityColor}12`, background: 'linear-gradient(180deg, #0c0906 0%, #080603 100%)' }}>
              {specs.map(([lbl, val], i) => (
                <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6, padding: '16px 22px', borderBottom: i < specs.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                  <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                  <p style={{ fontFamily: SERIF, fontSize: 14, color: '#c9b894', fontWeight: 300 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NFT DIGITAL CERTIFICATE ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px,9vw,100px) 0', background: `radial-gradient(ellipse 70% 60% at 50% 50%, #0f0a03 0%, #030303 55%)` }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(20px,5vw,40px)' }}>
          <div className="cos-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: rarityColor, marginBottom: 12 }}>Blockchain Authenticated</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.12em' }}>NFT Digital Certificate</h2>
            <div style={{ width: 40, height: 1, background: `linear-gradient(to right, transparent, ${rarityColor}, transparent)`, margin: '20px auto 0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,5vw,60px)', alignItems: 'start' }}>

            {/* LEFT — Rotating Card */}
            <div className="cos-reveal">
              <RotatingNftCard product={product} genderLabel={genderLabel === 'Default' ? 'Cosmetics' : genderLabel} serial={serial} tier={tier} />
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 4 }}>Polygon Mainnet · ERC-721</p>
                <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase', color: `${rarityColor}60` }}>{archive}</p>
              </div>
            </div>

            {/* RIGHT — Certificate Details */}
            <div className="cos-reveal">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${rarityColor}28`, background: 'linear-gradient(135deg, #0d0b07 0%, #090806 50%, #050505 100%)' }}
              >
                {/* Shimmer sweep */}
                <motion.div
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(90deg, transparent, ${rarityColor}08, transparent)`, width: '40%' }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'linear' }}
                />
                {/* Corner marks */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 16, height: 16, borderTop: `1px solid ${rarityColor}70`, borderLeft: `1px solid ${rarityColor}70` }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, borderTop: `1px solid ${rarityColor}70`, borderRight: `1px solid ${rarityColor}70` }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 16, height: 16, borderBottom: `1px solid ${rarityColor}50`, borderLeft: `1px solid ${rarityColor}50` }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderBottom: `1px solid ${rarityColor}50`, borderRight: `1px solid ${rarityColor}50` }} />

                <div style={{ padding: 28 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${rarityColor}12` }}>
                    <div>
                      <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: `${rarityColor}70`, marginBottom: 4 }}>House of Shamim Forever</p>
                      <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: rarityColor }}>Sovereign Digital Certificate</p>
                    </div>
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ fontSize: 22, color: rarityColor }}>◆</motion.div>
                  </div>

                  {/* Serial */}
                  <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${rarityColor}10` }}>
                    <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 8 }}>Serial Number</p>
                    <motion.p initial={{ letterSpacing: '0.1em' }} animate={{ letterSpacing: '0.22em' }} transition={{ duration: 1, delay: 0.4 }} style={{ fontFamily: 'monospace', fontSize: 20, color: rarityColor, letterSpacing: '0.22em' }}>
                      {serial}
                    </motion.p>
                    <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1f1a14', marginTop: 4 }}>Assigned on purchase · Permanent on-chain record</p>
                  </div>

                  {/* Details grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 20 }}>
                    {[
                      ['Rarity Tier', tier],
                      ['Network', 'Polygon'],
                      ['Token Standard', 'ERC-721'],
                      ['Royalty', '7.5%'],
                      ['Authentication', 'NFT Passport'],
                      ['Marketplace', 'OpenSea'],
                      ['Archive', genderDisplay || 'Cosmetics'],
                      ['Transfer', 'Allowed'],
                    ].map(([lbl, val]) => (
                      <div key={lbl} style={{ background: '#0a0806', padding: '10px 12px', border: `1px solid ${rarityColor}06` }}>
                        <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#2a2218', marginBottom: 4 }}>{lbl}</p>
                        <p style={{ fontSize: 9, color: lbl === 'Rarity Tier' ? rarityColor : '#a08060', fontWeight: 300 }}>{val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: `1px solid ${rarityColor}10` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
                      <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830' }}>Polygon Active · Transferable</p>
                    </div>
                    <p style={{ fontSize: 6, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1f1a14' }}>Blockchain Verified</p>
                  </div>
                </div>
              </motion.div>

              <p style={{ fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1f1a14', marginTop: 14 }}>
                {isSovereign
                  ? `◆ ${tier} creation · Serial engraved on physical certificate · Viewable on OpenSea post-mint`
                  : '◇ Heritage NFT included · Serial assigned at checkout · Auto-minted on crypto purchase'}
              </p>
            </div>
          </div>

          {/* ── NFT HOLDER PRIVILEGES ── */}
          <div className="cos-reveal" style={{ marginTop: 64 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: rarityColor, marginBottom: 10 }}>Exclusive Benefits</p>
              <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 300, color: '#f0ece4' }}>NFT Holder Privileges</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {(story?.holderPrivileges || privileges).map((priv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="cos-priv-item"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 22px', border: `1px solid ${rarityColor}10`, background: i % 2 === 0 ? '#0a0806' : '#080603', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${rarityColor}28` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${rarityColor}10` }}
                >
                  <div style={{ width: 20, height: 20, border: `1px solid ${rarityColor}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 8, color: rarityColor }}>◆</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: '#c9b894', fontWeight: 300, lineHeight: 1.6 }}>
                      <strong style={{ color: '#d4b87a', fontWeight: 400 }}>{priv.split(' — ')[0]}</strong>
                      {priv.includes(' — ') ? ` — ${priv.split(' — ')[1]}` : ''}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px', border: `1px solid ${rarityColor}15`, background: `linear-gradient(90deg, ${rarityColor}06 0%, transparent 60%)` }}>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: 10, color: rarityColor }}>◆</motion.div>
              <p style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830' }}>
                Privileges activate upon NFT mint · Powered by Polygon Blockchain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACQUIRE ──────────────────────────────────────────────────────────── */}
      <section id="acquire" style={{ padding: 'clamp(52px,8vw,90px) 0 clamp(64px,9vw,100px)', background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(25,18,6,0.95) 0%, #030303 55%)` }}>
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
          <div className="cos-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: rarityColor, marginBottom: 10 }}>Acquisition</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4' }}>Claim Your Creation</h2>
          </div>

          <div className="cos-reveal">
            {/* Price */}
            <div style={{ textAlign: 'center', padding: 28, border: `1px solid ${rarityColor}14`, background: '#0c0906', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 10 }}>Allocation Price</p>
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,6vw,3.8rem)', fontWeight: 300, color: '#f8f4ee', lineHeight: 1 }}>
                ${(product.price_usd * quantity).toFixed(0)} <span style={{ fontSize: '0.4em', letterSpacing: '0.35em', color: rarityColor }}>USD</span>
              </p>
              <p style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830', marginTop: 6 }}>{formatPKR(product.price_pkr * quantity)}</p>
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', border: `1px solid ${rarityColor}08`, background: '#0a0703', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830' }}>Quantity</p>
              <div style={{ display: 'flex', border: `1px solid ${rarityColor}18` }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: rarityColor, borderRight: `1px solid ${rarityColor}18`, background: 'none', cursor: 'pointer', fontSize: 18 }}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontFamily: SERIF, fontSize: 18, color: '#f0ece4', lineHeight: '38px' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: rarityColor, borderLeft: `1px solid ${rarityColor}18`, background: 'none', cursor: 'pointer', fontSize: 18 }}>+</button>
              </div>
            </div>

            {/* Delivery */}
            <div style={{ marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: `1px solid ${rarityColor}08` }}>Delivery Information</p>
              {([
                { v: custName, s: setCustName, ph: 'Full Name *' },
                { v: custPhone, s: setCustPhone, ph: 'Phone Number *' },
                { v: custAddress, s: setCustAddress, ph: 'Delivery Address *' },
                { v: custCity, s: setCustCity, ph: 'City *' },
              ] as { v: string; s: (val: string) => void; ph: string }[]).map(({ v, s, ph }) => (
                <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                  style={{ width: '100%', background: '#080602', border: 'none', borderBottom: `1px solid ${rarityColor}07`, padding: '15px 18px', fontSize: 11, color: '#c9b894', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = `${rarityColor}30` }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = `${rarityColor}07` }} />
              ))}
            </div>

            {/* Payment method */}
            <div>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: `1px solid ${rarityColor}08`, marginBottom: 2 }}>Payment Method</p>
              <div className="cos-pay-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 12 }}>
                {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    style={{ padding: '13px 4px', fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', background: payMethod === m ? `${rarityColor}10` : '#080602', color: payMethod === m ? rarityColor : '#3f3830', border: payMethod === m ? `1px solid ${rarityColor}30` : '1px solid rgba(255,255,255,0.03)', transition: 'all 0.3s' }}>
                    {m === 'crypto' ? '◆ Crypto' : m === 'pkr_manual' ? 'PKR Transfer' : 'COD'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {payMethod === 'crypto' && (
                  <motion.div key="crypto" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Web3PaySection priceUsd={product.price_usd * quantity} onSuccess={handleWeb3Success} />
                  </motion.div>
                )}
                {payMethod === 'pkr_manual' && (
                  <motion.div key="pkr" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ border: `1px solid ${rarityColor}12`, background: '#080602' }}>
                      {([
                        ['EasyPaisa', `${EASYPAISA_NUMBER} · ${EASYPAISA_NAME}`, EASYPAISA_NUMBER],
                        ['UBL IBAN', UBL_IBAN, UBL_IBAN],
                      ] as [string, string, string][]).map(([lbl, val, copyVal], i, arr) => (
                        <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, padding: '14px 18px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                          <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#c9b894', wordBreak: 'break-all' }}>{val}</p>
                            <CopyBtn text={copyVal} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID / Reference Number"
                      style={{ background: '#080602', border: `1px solid ${rarityColor}09`, padding: '13px 18px', fontSize: 11, color: '#c9b894', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 18px', border: `1px dashed ${rarityColor}12`, cursor: 'pointer', background: '#080602' }}>
                      <Upload size={11} color={`${rarityColor}50`} />
                      <span style={{ fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Upload Payment Screenshot</span>
                      <input type="file" accept="image/*" onChange={e => {
                        const f = e.target.files?.[0]; if (!f) return; setProofFile(f)
                        const r = new FileReader(); r.onload = ev => setProofPreview(ev.target?.result as string); r.readAsDataURL(f)
                      }} className="hidden" />
                    </label>
                    {proofPreview && (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={proofPreview} alt="proof" style={{ height: 72, opacity: 0.7 }} />
                        <button onClick={() => { setProofFile(null); setProofPreview(null) }} style={{ position: 'absolute', top: 3, right: 3, background: 'none', border: 'none', cursor: 'pointer', color: rarityColor }}><X size={11} /></button>
                      </div>
                    )}
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.65)', padding: '4px 0' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group"
                      style={{ position: 'relative', overflow: 'hidden', padding: 17, border: `1px solid ${rarityColor}45`, fontSize: 8, letterSpacing: '0.65em', textTransform: 'uppercase', color: rarityColor, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="group-hover:translate-x-0 -translate-x-full absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ background: rarityColor }} />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Processing...' : 'Submit Order'}</span>
                    </button>
                  </motion.div>
                )}
                {payMethod === 'cod' && (
                  <motion.div key="cod" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ padding: '20px 18px', border: `1px solid ${rarityColor}12`, background: '#080602' }}>
                      <p style={{ fontFamily: SERIF, fontSize: 20, color: '#c9b894', marginBottom: 6 }}>Cash on Delivery</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 1.8 }}>Pay upon delivery. Available within Pakistan. Order confirmed via WhatsApp within 2 hours.</p>
                    </div>
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.65)' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group"
                      style={{ position: 'relative', overflow: 'hidden', padding: 17, border: `1px solid ${rarityColor}45`, fontSize: 8, letterSpacing: '0.65em', textTransform: 'uppercase', color: rarityColor, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="group-hover:translate-x-0 -translate-x-full absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ background: rarityColor }} />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Placing Order...' : 'Confirm COD Order'}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Inventory notice */}
          {product.inventory > 0 && product.inventory <= 5 && (
            <div className="cos-reveal" style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)' }}>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(239,68,68,0.7)', flexShrink: 0 }} />
              <p style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.6)' }}>
                Only {product.inventory} remaining in allocation
              </p>
            </div>
          )}
          {product.inventory === 0 && (
            <div style={{ marginTop: 20, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>This allocation is fully claimed</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
