'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Copy, Check, Upload, X, ExternalLink, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatPKR } from '@/lib/utils'
import type { Product } from '@/types'
import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
import { useAccount } from 'wagmi'

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'
const SERIF = "'Cormorant Garamond', Georgia, serif"

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
      style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c9a054', background: 'none', border: 'none', cursor: 'pointer' }}>
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

interface ParsedStory {
  tagline?: string
  olfactory?: string | { top_description?: string; heart_description?: string; base_description?: string }
  scentPyramid?: { top: string; heart: string; base: string }
  specs?: { volume?: string; concentration?: string; sillage?: string; longevity?: string; batch?: string; price?: string }
}

export default function LuxuryGenericProductPage({ product }: { product: Product }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 50])

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
    gsap.utils.toArray<Element>('.g-reveal').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    })
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const callCheckout = useCallback(async (opts: { paymentMethod: string; paymentStatus: string; txHash?: string; proofUrl?: string; walletAddress?: string }) => {
    const discount = opts.paymentMethod === 'okbond' ? 10 : 0
    const totalUsd = parseFloat((product.price_usd * quantity * (1 - discount / 100)).toFixed(2))
    const res = await fetch('/api/v1/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.id, product_name: product.name, quantity,
        payment_method: opts.paymentMethod, payment_status: opts.paymentStatus,
        tx_hash: opts.txHash || null,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
        total_pkr: product.price_pkr * quantity, total_usd: totalUsd, discount_applied: discount,
        price_pkr: product.price_pkr, price_usd: product.price_usd,
        wallet_address: opts.walletAddress || null, payment_proof_url: opts.proofUrl || null, rarity_tier: 'ELITE',
      }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Checkout failed')
    return data as OrderResult
  }, [product, quantity, custName, custPhone, custAddress, custCity])

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    try { setOrderResult(await callCheckout({ paymentMethod: coin.toLowerCase(), paymentStatus: 'paid', txHash, walletAddress: walletAddress || undefined })) }
    catch (err: any) { setOrderError(err?.message || 'Payment received. Contact us with your TX hash.') }
  }, [callCheckout, walletAddress])

  async function handlePlaceOrder() {
    if (!custName || !custPhone || !custAddress || !custCity) { setOrderError('Please fill in all delivery details.'); return }
    if (payMethod === 'pkr_manual' && !txId && !proofFile) { setOrderError('Provide Transaction ID or screenshot.'); return }
    setSubmitting(true); setOrderError(null)
    try {
      let proofUrl: string | null = null
      if (proofFile && proofPreview) {
        const up = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageStr: proofPreview }) })
        const ud = await up.json(); if (ud.url) proofUrl = ud.url
      }
      setOrderResult(await callCheckout({ paymentMethod: payMethod, paymentStatus: payMethod === 'cod' ? 'pending' : 'awaiting_verification', proofUrl: proofUrl || undefined, txHash: txId || undefined }))
    } catch (err: any) { setOrderError(err?.message || 'Failed to place order.') }
    setSubmitting(false)
  }

  const heroImage = images[0] || null
  const categoryName = (product as any).main_category?.name

  if (orderResult) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: '#030303' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: 500, width: '100%' }}>
          <p style={{ fontFamily: SERIF, fontSize: 72, color: '#c9a054', lineHeight: 1, marginBottom: 16 }}>◆</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 300, letterSpacing: '0.15em', color: '#f0ece4', textTransform: 'uppercase', marginBottom: 8 }}>Order Placed</h2>
          <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 32 }}>House of Shamim Forever</p>
          <div style={{ border: '1px solid rgba(201,160,84,0.12)', background: 'linear-gradient(135deg, #0c0906 0%, #080604 100%)', marginBottom: 24 }}>
            {[['Order Reference', orderResult.order_ref], ['Tracking ID', orderResult.tracking_ref], ['Status', orderResult.status?.replace(/_/g, ' ')]].map(([lbl, val]) => (
              <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#c9b894' }}>{val}</p>
                  {lbl !== 'Status' && <CopyBtn text={val ?? ''} />}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <Link href={orderResult.track_url} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none' }}>
              <ExternalLink size={10} /> Track
            </Link>
            <Link href="/shop" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.08)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830', textDecoration: 'none' }}>Continue</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ background: '#030303', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .lux-gallery    { flex-direction: column !important; }
          .lux-thumbs     { flex-direction: row !important; flex-wrap: wrap !important; }
          .lux-thumb      { flex: 1 1 calc(50% - 4px) !important; aspect-ratio: 1 !important; }
          .lux-pay-grid   { grid-template-columns: 1fr 1fr !important; }
          .lux-spec-row   { flex-wrap: wrap !important; gap: 6px !important; align-items: flex-start !important; }
        }
      ` }} />

      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', height: '100svh', minHeight: 650, overflow: 'hidden', background: '#030303' }}>
        {heroImage ? (
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.25, 0.1, 0.1, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img src={heroImage} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }} />
          </motion.div>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(30,22,8,0.9) 0%, #030303 65%)' }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.06 }}
              transition={{ duration: 3 }}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: SERIF, fontSize: 'clamp(8rem, 30vw, 22rem)', color: '#c9a054', fontWeight: 300, whiteSpace: 'nowrap', lineHeight: 1 }}
            >
              SF
            </motion.p>
          </div>
        )}

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,3,3,0.2) 0%, rgba(3,3,3,0.05) 25%, rgba(3,3,3,0.35) 55%, rgba(3,3,3,0.92) 83%, #030303 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 40%, rgba(3,3,3,0.55) 100%)' }} />
        <GoldParticles />

        <motion.div
          style={{ opacity: textOpacity, y: textY, position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, padding: '0 clamp(20px, 5vw, 80px)', paddingBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          {categoryName && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }}
              style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 14 }}>
              {categoryName} · House of Shamim
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: SERIF, fontWeight: 300, color: '#f8f4ee', lineHeight: 0.9, marginBottom: 12, letterSpacing: '-0.01em', fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
          >
            {product.name}
          </motion.h1>
          {story?.tagline && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 1 }}
              style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: 'rgba(240,236,228,0.5)', fontWeight: 300, marginBottom: 16 }}>
              {story.tagline}
            </motion.p>
          )}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.3, duration: 1 }}
            style={{ height: 1, width: 140, background: 'linear-gradient(to right, #c9a054, transparent)', marginBottom: 16, transformOrigin: 'left' }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
            <span style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', fontWeight: 300, color: '#f8f4ee' }}>{formatPKR(product.price_pkr)}</span>
            <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(201,160,84,0.45)' }}>${product.price_usd} USD</span>
          </motion.div>
          <motion.a href="#acquire" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7, duration: 0.8 }}
            className="group"
            style={{ position: 'relative', overflow: 'hidden', padding: '13px 28px', border: '1px solid rgba(201,160,84,0.5)', fontSize: 8, letterSpacing: '0.65em', textTransform: 'uppercase', color: '#c9a054', display: 'inline-block', textDecoration: 'none' }}>
            <span className="group-hover:translate-x-0 -translate-x-full absolute inset-0 bg-[#c9a054] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative group-hover:text-black transition-colors duration-150">Acquire Now</span>
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
          style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.3)', writingMode: 'vertical-lr' }}>Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={10} color="rgba(201,160,84,0.3)" />
          </motion.div>
        </motion.div>
      </section>

      {/* GALLERY */}
      {images.length > 1 && (
        <section style={{ padding: 'clamp(44px,7vw,80px) 0', background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #0e0903 0%, #030303 65%)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Object Gallery</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#f0ece4' }}>The Sovereign Object</h2>
            </div>
            <div className="lux-gallery" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div className="g-reveal" style={{ flex: '1 1 400px', position: 'relative', aspectRatio: '4/5', background: '#080604', border: '1px solid rgba(201,160,84,0.08)', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.img key={activeImage} src={images[activeImage]} alt={product.name}
                    initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 32 }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2' }} />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImage(i => Math.max(0, i - 1))}
                      style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(3,3,3,0.7)', border: '1px solid rgba(201,160,84,0.2)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#c9a054' }}>
                      <ChevronLeft size={14} />
                    </button>
                    <button onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(3,3,3,0.7)', border: '1px solid rgba(201,160,84,0.2)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#c9a054' }}>
                      <ChevronRight size={14} />
                    </button>
                  </>
                )}
              </div>
              <div className="g-reveal" className="lux-thumbs" style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 3, maxHeight: '80vh', overflowY: 'auto' }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    style={{ aspectRatio: '4/3', background: '#080604', border: activeImage === i ? '1px solid rgba(201,160,84,0.5)' : '1px solid rgba(255,255,255,0.04)', overflow: 'hidden', cursor: 'pointer', padding: 0, transition: 'border-color 0.3s' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8, opacity: activeImage === i ? 1 : 0.5, transition: 'opacity 0.3s' }}
                      onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      {(product.description || (story?.olfactory && typeof story.olfactory === 'string')) && (
        <section style={{ padding: 'clamp(52px,8vw,90px) 0', background: 'linear-gradient(180deg, #030303 0%, #080602 50%, #030303 100%)' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <div className="g-reveal">
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 28 }}>The Archive Object</p>
            </div>
            {product.description && (
              <div className="g-reveal">
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.5, marginBottom: 24 }}>
                  {product.description}
                </p>
              </div>
            )}
            {story?.olfactory && typeof story.olfactory === 'string' && (
              <div className="g-reveal">
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'rgba(240,236,228,0.35)', fontWeight: 300, lineHeight: 1.9, borderLeft: '2px solid rgba(201,160,84,0.2)', paddingLeft: 20, textAlign: 'left', maxWidth: 620, margin: '0 auto' }}>
                  {story.olfactory}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SPECS */}
      {story?.specs && Object.values(story.specs).some(Boolean) && (
        <section style={{ padding: 'clamp(44px,7vw,80px) 0', background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #0e0903 0%, #030303 60%)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
            <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Specifications</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#f0ece4' }}>Performance Profile</h2>
            </div>
            <div className="g-reveal" style={{ border: '1px solid rgba(201,160,84,0.1)', background: 'linear-gradient(180deg, #0c0906 0%, #080603 100%)' }}>
              {([
                ['Volume', story.specs.volume],
                ['Concentration', story.specs.concentration],
                ['Longevity', story.specs.longevity],
                ['Sillage', story.specs.sillage],
                ['Batch', story.specs.batch],
              ] as [string, string | undefined][]).filter(([, v]) => v).map(([lbl, val], i, arr) => (
                <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6, padding: '16px 20px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'}>
                  <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                  <p style={{ fontFamily: SERIF, fontSize: 14, color: '#c9b894', fontWeight: 300 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ACQUIRE */}
      <section id="acquire" style={{ padding: '90px 0 100px', background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(25,18,6,0.95) 0%, #030303 55%)' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '0 24px' }}>
          <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Acquisition</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: '#f0ece4' }}>Claim Your Sovereign</h2>
          </div>

          <div className="g-reveal">
            <div style={{ textAlign: 'center', padding: '28px', border: '1px solid rgba(201,160,84,0.12)', background: '#0c0906', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 10 }}>Allocation Price</p>
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 300, color: '#f8f4ee', lineHeight: 1 }}>{formatPKR(product.price_pkr * quantity)}</p>
              <p style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(201,160,84,0.4)', marginTop: 6 }}>${(product.price_usd * quantity).toFixed(2)} USD</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', border: '1px solid rgba(201,160,84,0.06)', background: '#0a0703', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830' }}>Quantity</p>
              <div style={{ display: 'flex', border: '1px solid rgba(201,160,84,0.15)' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a054', borderRight: '1px solid rgba(201,160,84,0.15)', background: 'none', cursor: 'pointer', fontSize: 18 }}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontFamily: SERIF, fontSize: 18, color: '#f0ece4', lineHeight: '38px' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a054', borderLeft: '1px solid rgba(201,160,84,0.15)', background: 'none', cursor: 'pointer', fontSize: 18 }}>+</button>
              </div>
            </div>

            <div style={{ marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.06)' }}>Delivery Information</p>
              {([
                { v: custName, s: setCustName, ph: 'Full Name *' },
                { v: custPhone, s: setCustPhone, ph: 'Phone Number *' },
                { v: custAddress, s: setCustAddress, ph: 'Delivery Address *' },
                { v: custCity, s: setCustCity, ph: 'City *' },
              ] as { v: string; s: (val: string) => void; ph: string }[]).map(({ v, s, ph }) => (
                <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                  style={{ width: '100%', background: '#080602', border: 'none', borderBottom: '1px solid rgba(201,160,84,0.05)', padding: '15px 18px', fontSize: 11, color: '#c9b894', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.28)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.05)' }} />
              ))}
            </div>

            <div>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.06)', marginBottom: 2 }}>Payment Method</p>
              <div className="lux-pay-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 12 }}>
                {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    style={{ padding: '13px 4px', fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', background: payMethod === m ? 'rgba(201,160,84,0.07)' : '#080602', color: payMethod === m ? '#c9a054' : '#3f3830', border: payMethod === m ? '1px solid rgba(201,160,84,0.28)' : '1px solid rgba(255,255,255,0.03)', transition: 'all 0.3s' }}>
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
                    <div style={{ border: '1px solid rgba(201,160,84,0.1)', background: '#080602' }}>
                      {[['EasyPaisa', `${EASYPAISA_NUMBER} · ${EASYPAISA_NAME}`, EASYPAISA_NUMBER] as const, ['UBL IBAN', UBL_IBAN, UBL_IBAN] as const].map(([lbl, val, copyVal], i, arr) => (
                        <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                          <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#c9b894' }}>{val}</p>
                            <CopyBtn text={copyVal} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID / Reference Number"
                      style={{ background: '#080602', border: '1px solid rgba(201,160,84,0.07)', padding: '13px 18px', fontSize: 11, color: '#c9b894', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 18px', border: '1px dashed rgba(201,160,84,0.1)', cursor: 'pointer', background: '#080602' }}>
                      <Upload size={11} color="rgba(201,160,84,0.35)" />
                      <span style={{ fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Upload Payment Screenshot</span>
                      <input type="file" accept="image/*" onChange={e => {
                        const f = e.target.files?.[0]; if (!f) return; setProofFile(f)
                        const r = new FileReader(); r.onload = ev => setProofPreview(ev.target?.result as string); r.readAsDataURL(f)
                      }} className="hidden" />
                    </label>
                    {proofPreview && (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={proofPreview} alt="proof" style={{ height: 72, opacity: 0.7 }} />
                        <button onClick={() => { setProofFile(null); setProofPreview(null) }} style={{ position: 'absolute', top: 3, right: 3, background: 'none', border: 'none', cursor: 'pointer', color: '#c9a054' }}><X size={11} /></button>
                      </div>
                    )}
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.65)', padding: '4px 0' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group"
                      style={{ position: 'relative', overflow: 'hidden', padding: '17px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.65em', textTransform: 'uppercase', color: '#c9a054', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="group-hover:translate-x-0 -translate-x-full absolute inset-0 bg-[#c9a054] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Processing...' : 'Submit Order'}</span>
                    </button>
                  </motion.div>
                )}
                {payMethod === 'cod' && (
                  <motion.div key="cod" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ padding: '20px 18px', border: '1px solid rgba(201,160,84,0.1)', background: '#080602' }}>
                      <p style={{ fontFamily: SERIF, fontSize: 20, color: '#c9b894', marginBottom: 6 }}>Cash on Delivery</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 1.8 }}>Pay upon delivery. Available within Pakistan. Confirmed via WhatsApp within 2 hours.</p>
                    </div>
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.65)' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group"
                      style={{ position: 'relative', overflow: 'hidden', padding: '17px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.65em', textTransform: 'uppercase', color: '#c9a054', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="group-hover:translate-x-0 -translate-x-full absolute inset-0 bg-[#c9a054] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Placing Order...' : 'Confirm COD Order'}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
