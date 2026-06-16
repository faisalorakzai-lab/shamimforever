'use client'

  import { useEffect, useRef, useState, useCallback } from 'react'
  import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Link from 'next/link'
  import { Copy, Check, Upload, X, ExternalLink, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
  import type { Product } from '@/types'
  import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
  import { useAccount } from 'wagmi'

  type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
  interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

  const EASYPAISA_NUMBER = '03367970004'
  const EASYPAISA_NAME = 'M Faisal'
  const UBL_IBAN = 'PK13UNIL0109000318870498'
  const SERIF = "'Cormorant Garamond', Georgia, serif"

  const LUX_CSS = [
    '@media(max-width:768px){',
    '.lux-gallery{flex-direction:column!important}',
    '.lux-thumbs{flex-direction:row!important;flex-wrap:wrap!important;max-height:none!important;overflow:visible!important}',
    '.lux-thumb{flex:1 1 calc(50% - 4px)!important;aspect-ratio:1!important}',
    '.lux-pay-grid{grid-template-columns:1fr 1fr!important}',
    '}',
  ].join('')

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

  interface ParsedStory {
    tagline?: string
    sovereign_title?: string
    legacy_statement?: string
    positioning?: string
    atmospheric_presence?: string
    allocation?: string
    material_notes?: string | {
      primary?: string[]; secondary?: string[]; accent?: string[]
      primary_description?: string; secondary_description?: string; accent_description?: string
    }
    designArchitecture?: { primary: string; secondary: string; accent: string }
    specs?: {
      title?: string; piece_type?: string; classification?: string
      material?: string; gemstone?: string; carat?: string; cut?: string
      setting?: string; finish?: string; weight?: string; dimensions?: string
      gender?: string; production?: string; production_philosophy?: string
      blockchain?: string; allocation?: string; price_pkr?: string; price_usd?: string
      longevity?: string; batch?: string
    }
    nft?: {
      title?: string; description?: string; blockchain?: string; rarity?: string
      edition?: string; contract?: string; tx?: string; holder_privileges?: string[]
    }
    packaging?: { box?: string; certificate?: string }
  }

  function NftCard({ product, story }: { product: Product; story: ParsedStory | null }) {
    const [deg, setDeg] = useState(0)
    useEffect(() => {
      let frame: number; let t = 0
      const go = () => { t += 0.28; setDeg(t); frame = requestAnimationFrame(go) }
      go(); return () => cancelAnimationFrame(frame)
    }, [])
    const nft = story?.nft
    const rarity = nft?.rarity || (product.price_usd >= 10000 ? 'SOVEREIGN FOUNDERS' : product.price_usd >= 1000 ? 'INSTITUTIONAL RESERVE' : 'HERITAGE ARCHIVE')
    const gold = product.price_usd >= 50000 ? '#f0d080' : product.price_usd >= 10000 ? '#c9a054' : '#a08040'
    const serial = 'SF-' + product.id.replace(/-/g,'').slice(0,8).toUpperCase()
    const catName = (product as any).main_category?.name || 'Jewelry'
    const traits = [
      ['Category', catName],
      ['Rarity', rarity],
      ['Network', nft?.blockchain || 'Polygon Mainnet'],
      ['Standard', 'ERC-721'],
      ['Edition', nft?.edition || 'House Allocation Reserve'],
      ['Authentication', 'Polygon Verified'],
    ]
    return (
      <div style={{ perspective: '1100px', maxWidth: 280, margin: '0 auto', userSelect: 'none' }}>
        <div style={{ transform: `rotateY(${deg}deg)`, transformStyle: 'preserve-3d', position: 'relative', width: '100%', aspectRatio: '3/4', transition: 'none' }}>
          {[false, true].map(isBack => (
            <div key={String(isBack)} style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              transform: isBack ? 'rotateY(180deg)' : 'none',
              background: 'linear-gradient(145deg, #0c0906 0%, #100d07 50%, #080604 100%)',
              border: `1px solid ${gold}55`, display: 'flex', flexDirection: 'column', padding: 20
            }}>
              {!isBack ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: gold, marginBottom: 2 }}>House of Shamim Forever</p>
                      <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Sovereign Digital Passport</p>
                    </div>
                    <motion.div animate={{ opacity: [0.4,1,0.4] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ fontSize: 20, color: gold }}>◆</motion.div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} style={{ width: '80%', height: '80%', objectFit: 'contain', opacity: 0.85 }} />
                    ) : (
                      <p style={{ fontFamily: SERIF, fontSize: 52, color: `${gold}15`, fontWeight: 300 }}>SF</p>
                    )}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${gold}20` }}>
                    <p style={{ fontFamily: SERIF, fontSize: 12, color: '#c9b894', fontWeight: 300, lineHeight: 1.3, marginBottom: 4 }}>{product.name}</p>
                    <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase', color: `${gold}80` }}>{rarity}</p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase', color: gold, marginBottom: 6 }}>Sovereign Traits</p>
                    <div style={{ borderTop: `1px solid ${gold}20`, paddingTop: 8 }}>
                      <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 3 }}>Serial Number</p>
                      <p style={{ fontFamily: 'monospace', fontSize: 13, color: gold, letterSpacing: '0.1em' }}>{serial}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                    {traits.map(([lbl, val]) => (
                      <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px', background: '#0a0806' }}>
                        <p style={{ fontSize: 6, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2a2520' }}>{lbl}</p>
                        <p style={{ fontSize: 7, color: '#a08060', maxWidth: 120, textAlign: 'right' }}>{val}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${gold}12`, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <motion.div animate={{ opacity: [0.4,1,0.4] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} />
                    <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Polygon Active — NFT Enabled</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default function JewelryProductPage({ product }: { product: Product }) {
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
          if (s.material_notes && typeof s.material_notes === 'object') {
            const o = s.material_notes as { primary_description?: string; secondary_description?: string; accent_description?: string }
            s.material_notes = [o.primary_description, o.secondary_description, o.accent_description].filter(Boolean).join(' · ')
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
      try {
        setOrderResult(await callCheckout({ paymentMethod: coin.toLowerCase(), paymentStatus: 'paid', txHash, walletAddress: walletAddress || undefined }))
      } catch (err: any) {
        setOrderError(err?.message || 'Payment received. Contact us with your TX hash.')
      }
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
      } catch (err: any) {
        setOrderError(err?.message || 'Failed to place order.')
      }
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
        <style dangerouslySetInnerHTML={{ __html: LUX_CSS }} />

        {/* HERO IMAGE */}
        <section style={{ position: 'relative', background: '#000000', overflow: 'hidden', width: '100%', aspectRatio: '1 / 1' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: '5%', height: '55%', background: 'radial-gradient(ellipse 52% 60% at 50% 26%, rgba(212,175,55,0.14) 0%, rgba(201,160,84,0.04) 40%, transparent 68%)', pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: 'radial-gradient(ellipse 62% 80% at 50% 100%, rgba(201,160,84,0.09) 0%, transparent 75%)', pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 42%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none', zIndex: 3 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.9) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.65) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.9) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: 'linear-gradient(to top, transparent, rgba(212,175,55,0.65) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          <div style={{ position: 'absolute', top: 54, left: 14, width: 18, height: 18, borderTop: '1px solid rgba(212,175,55,0.4)', borderLeft: '1px solid rgba(212,175,55,0.4)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', top: 54, right: 14, width: 18, height: 18, borderTop: '1px solid rgba(212,175,55,0.4)', borderRight: '1px solid rgba(212,175,55,0.4)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', bottom: 14, left: 14, width: 18, height: 18, borderBottom: '1px solid rgba(212,175,55,0.28)', borderLeft: '1px solid rgba(212,175,55,0.28)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', bottom: 14, right: 14, width: 18, height: 18, borderBottom: '1px solid rgba(212,175,55,0.28)', borderRight: '1px solid rgba(212,175,55,0.28)', pointerEvents: 'none', zIndex: 9 }} />

          {heroImage ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
              <img src={heroImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }} />
            </motion.div>
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(30,22,8,0.9) 0%, #030303 65%)', zIndex: 2 }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ duration: 3 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: SERIF, fontSize: 'clamp(8rem, 30vw, 22rem)', color: '#c9a054', fontWeight: 300, whiteSpace: 'nowrap', lineHeight: 1 }}>SF</motion.p>
            </div>
          )}
          <GoldParticles />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 30, pointerEvents: 'none' }}>
            <span style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.35)', writingMode: 'vertical-lr' }}>Scroll</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ArrowDown size={10} color="rgba(201,160,84,0.3)" />
            </motion.div>
          </motion.div>
        </section>

        {/* PRODUCT INFO */}
        <section style={{ background: '#030303', padding: 'clamp(40px,7vw,72px) clamp(20px,5vw,80px)', textAlign: 'center', borderTop: '1px solid rgba(201,160,84,0.1)' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            {categoryName && (
              <p style={{ fontSize: 7, letterSpacing: '0.85em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 20 }}>
                {categoryName} — House of Shamim
              </p>
            )}
            <div style={{ width: 72, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '0 auto 28px' }} />
            <h1 style={{ fontFamily: SERIF, fontWeight: 300, letterSpacing: '0.15em', lineHeight: 0.9, color: '#f8f4ee', marginBottom: 16, textTransform: 'uppercase', fontSize: 'clamp(2.8rem,10vw,7rem)' }}>
              {product.name}
            </h1>
            {story?.tagline && (
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem,2.5vw,1.8rem)', color: 'rgba(240,236,228,0.55)', fontWeight: 300, marginBottom: 12 }}>
                {story.tagline}
              </p>
            )}
            <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 36 }}>
              Crafted for eternity — worn by sovereigns
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 18, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,6vw,3rem)', fontWeight: 300, color: '#f8f4ee' }}>
                ${product.price_usd} <span style={{ fontSize: '0.4em', letterSpacing: '0.35em', color: '#c9a054' }}>USD</span>
              </span>
              <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(201,160,84,0.32)' }}>Rs {Math.round(product.price_pkr).toLocaleString()}</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(201,160,84,0.22)', padding: '10px 24px', marginBottom: 36, background: 'rgba(201,160,84,0.04)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a054', flexShrink: 0 }} />
              <p style={{ fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a054', margin: 0 }}>NFT Sovereign Passport · Polygon Mainnet</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <a href="#acquire" className="group" style={{ position: 'relative', overflow: 'hidden', padding: '15px 40px', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#050202', display: 'inline-block', textDecoration: 'none', background: 'linear-gradient(135deg, #c9a054 0%, #b8860b 100%)', fontWeight: 600 }}>
                Acquire Now
              </a>
              <a href="#archive" style={{ padding: '15px 40px', border: '1px solid rgba(201,160,84,0.35)', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', display: 'inline-block', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,160,84,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                Explore Archive
              </a>
            </div>
          </motion.div>
        </section>

        {/* ACQUIRE */}
        <section id="acquire" style={{ padding: 'clamp(52px,8vw,90px) 0 clamp(64px,9vw,100px)', background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(25,18,6,0.95) 0%, #030303 55%)' }}>
          <div style={{ maxWidth: 620, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
            <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Acquisition</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, color: '#f0ece4' }}>Claim Your Sovereign</h2>
            </div>
            <div className="g-reveal">
              <div style={{ textAlign: 'center', padding: '28px', border: '1px solid rgba(201,160,84,0.12)', background: '#0c0906', marginBottom: 2 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 10 }}>Allocation Price</p>
                <p style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 6vw, 3.8rem)', fontWeight: 300, color: '#f8f4ee', lineHeight: 1 }}>$ {(product.price_usd * quantity).toFixed(0)} <span style={{ fontSize: '0.4em', letterSpacing: '0.35em', color: '#c9a054' }}>USD</span></p>
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
                    onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.05)' }}
                  />
                ))}
              </div>
              <div>
                <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.06)', marginBottom: 2 }}>Payment Method</p>
                <div className="lux-pay-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 12 }}>
                  {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map(m => (
                    <button key={m} onClick={() => setPayMethod(m)}
                      style={{ padding: '13px 4px', fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', background: payMethod === m ? 'rgba(201,160,84,0.07)' : '#080602', color: payMethod === m ? '#c9a054' : '#3f3830', border: payMethod === m ? '1px solid rgba(201,160,84,0.28)' : '1px solid rgba(255,255,255,0.03)', transition: 'all 0.3s' }}>
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

        {/* GALLERY */}
        {images.length > 1 && (
          <section style={{ padding: 'clamp(48px,7vw,80px) 0', background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #0e0903 0%, #030303 65%)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
              <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Object Gallery</p>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#f0ece4' }}>The Sovereign Object</h2>
              </div>
              <div className="lux-gallery" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div className="g-reveal" style={{ flex: '1 1 300px', position: 'relative', aspectRatio: '4/5', background: '#080604', border: '1px solid rgba(201,160,84,0.08)', overflow: 'hidden', minHeight: 280 }}>
                  <AnimatePresence mode="wait">
                    <motion.img key={activeImage} src={images[activeImage]} alt={product.name}
                      initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
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
                <div className="lux-thumbs g-reveal" style={{ flex: '0 0 auto', width: 120, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className="lux-thumb"
                      style={{ aspectRatio: '1', background: '#080604', border: activeImage === i ? '1px solid rgba(201,160,84,0.5)' : '1px solid rgba(255,255,255,0.04)', overflow: 'hidden', cursor: 'pointer', padding: 0, transition: 'border-color 0.3s', flexShrink: 0 }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6, opacity: activeImage === i ? 1 : 0.5, transition: 'opacity 0.3s' }}
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1' }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* DESCRIPTION */}
        {(product.description || (story?.material_notes && typeof story.material_notes === 'string')) && (
          <section style={{ padding: 'clamp(52px,8vw,90px) 0', background: 'linear-gradient(180deg, #030303 0%, #080602 50%, #030303 100%)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
              <div className="g-reveal">
                <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 28 }}>The Archive Object</p>
              </div>
              {product.description && (
                <div className="g-reveal">
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.3rem, 3vw, 2.4rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.5, marginBottom: 24 }}>
                    {product.description}
                  </p>
                </div>
              )}
              {story?.material_notes && typeof story.material_notes === 'string' && (
                <div className="g-reveal">
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.95rem, 2vw, 1.4rem)', color: 'rgba(240,236,228,0.35)', fontWeight: 300, lineHeight: 1.9, borderLeft: '2px solid rgba(201,160,84,0.2)', paddingLeft: 20, textAlign: 'left', maxWidth: 620, margin: '0 auto' }}>
                    {story.material_notes}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* LEGACY STATEMENT */}
        {(story?.legacy_statement || story?.positioning) && (
          <section style={{ padding: 'clamp(52px,8vw,90px) 0', background: 'linear-gradient(180deg, #030303 0%, #080602 50%, #030303 100%)' }}>
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
              <div className="g-reveal">
                <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 28 }}>Legacy Statement</p>
                <div style={{ width: 64, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '0 auto 40px' }} />
              </div>
              {story?.legacy_statement && (
                <div className="g-reveal">
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1.3rem,3.5vw,2.4rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.6, marginBottom: 32 }}>
                    &ldquo;{story.legacy_statement}&rdquo;
                  </p>
                </div>
              )}
              {story?.positioning && (
                <div className="g-reveal">
                  <p style={{ fontFamily: SERIF, fontSize: 'clamp(0.9rem,1.8vw,1.25rem)', color: 'rgba(240,236,228,0.45)', fontWeight: 300, lineHeight: 1.9, maxWidth: 720, margin: '0 auto' }}>
                    {story.positioning}
                  </p>
                </div>
              )}
              {story?.atmospheric_presence && (
                <div className="g-reveal" style={{ marginTop: 32 }}>
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.85rem,1.5vw,1.1rem)', color: 'rgba(201,160,84,0.4)', fontWeight: 300, lineHeight: 1.8 }}>
                    {story.atmospheric_presence}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SPECIFICATIONS MATRIX */}
        {story?.specs && Object.values(story.specs).some(Boolean) && (
          <section style={{ padding: 'clamp(44px,7vw,80px) 0', background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #0e0903 0%, #030303 60%)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
              <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Technical Specifications</p>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#f0ece4' }}>Sovereign Details</h2>
                <div style={{ width: 64, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '20px auto 0' }} />
              </div>
              <div className="g-reveal" style={{ border: '1px solid rgba(201,160,84,0.1)', background: 'linear-gradient(180deg, #0c0906 0%, #080603 100%)' }}>
                {([
                  ['Classification', story.specs.classification || story.specs.piece_type],
                  ['Primary Material', story.specs.material],
                  ['Gemstone', story.specs.gemstone],
                  ['Carat Weight', story.specs.carat],
                  ['Cut', story.specs.cut],
                  ['Setting', story.specs.setting],
                  ['Finish', story.specs.finish],
                  ['Weight', story.specs.weight],
                  ['Dimensions', story.specs.dimensions],
                  ['Gender Profile', story.specs.gender],
                  ['Production Method', story.specs.production || story.specs.production_philosophy],
                  ['Authentication', story.specs.blockchain || 'Polygon Verified — NFT Enabled'],
                  ['NFT Pairing', story.nft?.edition || story.specs.allocation || 'Enabled'],
                ] as [string, string | undefined][]).filter(([, v]) => v).map(([lbl, val], i, arr) => (
                  <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, padding: '18px 24px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                    <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', flexShrink: 0 }}>{lbl}</p>
                    <p style={{ fontFamily: SERIF, fontSize: 14, color: '#c9b894', fontWeight: 300, wordBreak: 'break-word', textAlign: 'right', maxWidth: '55%' }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DESIGN / MATERIAL ARCHITECTURE */}
        {story?.material_notes && typeof story.material_notes === 'object' && ((story.material_notes as any).primary?.length || (story.material_notes as any).secondary?.length || (story.material_notes as any).accent?.length) && (
          <section style={{ padding: 'clamp(52px,8vw,90px) 0', background: 'linear-gradient(180deg, #030303 0%, #0a0805 50%, #030303 100%)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>
              <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Material Architecture</p>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#f0ece4' }}>Composition of Light</h2>
                <div style={{ width: 64, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '20px auto 0' }} />
              </div>
              {(['primary', 'secondary', 'accent'] as const).map((tier, ti) => {
                const notes = (story.material_notes as any)[tier] as string[] | undefined
                if (!notes?.length) return null
                const labels = ['Primary Stone', 'Secondary Elements', 'Accent Details']
                return (
                  <div key={tier} className="g-reveal" style={{ marginBottom: 36 }}>
                    <p style={{ fontSize: 7, letterSpacing: '0.65em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)', marginBottom: 16 }}>{labels[ti]}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {notes.map((n: string) => (
                        <span key={n} style={{ padding: '6px 14px', border: '1px solid rgba(201,160,84,0.15)', fontSize: 10, color: '#c9b894', fontFamily: SERIF, fontWeight: 300 }}>{n}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* NFT DIGITAL PASSPORT */}
        <section id="archive" style={{ padding: 'clamp(52px,8vw,90px) 0', background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(12,9,6,0.95) 0%, #030303 60%)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <div className="g-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Sovereign Archive</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#f0ece4' }}>NFT Digital Passport</h2>
              <div style={{ width: 64, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '20px auto 0' }} />
            </div>
            <div className="g-reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start', justifyContent: 'center' }}>
              <NftCard product={product} story={story} />
              <div style={{ flex: '1 1 300px', maxWidth: 480 }}>
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem,2vw,1.4rem)', color: 'rgba(240,236,228,0.5)', fontWeight: 300, lineHeight: 1.9, marginBottom: 32 }}>
                  {story?.nft?.description || 'Every sovereign jewelry creation from House of Shamim Forever is authenticated with a Digital Twin NFT on Polygon — a permanent on-chain record of your ownership, rarity tier, and provenance. Your serial number is engraved on both the physical certificate and the blockchain simultaneously.'}
                </p>
                <div style={{ border: '1px solid rgba(201,160,84,0.1)', background: 'linear-gradient(180deg, #0c0906 0%, #080603 100%)' }}>
                  {([
                    ['Network', story?.nft?.blockchain || 'Polygon Mainnet'],
                    ['Token Standard', 'ERC-721'],
                    ['Royalty', '7.5%'],
                    ['Edition', story?.nft?.edition || 'House Allocation Reserve'],
                    ['Marketplace', 'OpenSea'],
                    ['Authentication', 'Blockchain Verified'],
                  ] as [string, string][]).map(([lbl, val], i, arr) => (
                    <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                      <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                      <p style={{ fontFamily: SERIF, fontSize: 13, color: '#c9b894', fontWeight: 300 }}>{val}</p>
                    </div>
                  ))}
                </div>
                {story?.nft?.holder_privileges?.length && (
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Holder Privileges</p>
                    {story.nft.holder_privileges.map((p, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                        <span style={{ color: '#c9a054', flexShrink: 0 }}>◆</span>
                        <p style={{ fontFamily: SERIF, fontSize: 12, color: 'rgba(240,236,228,0.45)', fontWeight: 300 }}>{p}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
  