'use client'

  import { useState, useEffect, useRef, useCallback } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import Link from 'next/link'
  import { Copy, Check, Upload, X, ExternalLink, ChevronDown, Shield, Gem, Crown, Star } from 'lucide-react'
  import type { Product } from '@/types'
  import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
  import { useAccount } from 'wagmi'

  const SERIF = "'Cormorant Garamond', Georgia, serif"
  const MONO  = "'Courier New', Courier, monospace"
  const GOLD  = '#c9a054'
  const GOLD2 = '#e8c97a'
  const EASYPAISA_NUMBER = '03367970004'
  const EASYPAISA_NAME   = 'M Faisal'
  const UBL_IBAN         = 'PK13UNIL0109000318870498'

  type PayMethod = 'crypto' | 'pkr_manual' | 'contact'
  interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

  const PAGE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
    html{scroll-behavior:smooth}
    .jw-trait-row{padding:12px 0;border-bottom:1px solid rgba(201,160,84,0.08)}
    .jw-trait-row:last-child{border-bottom:none}
    .jw-holo::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,160,84,.15) 0%,transparent 40%,rgba(201,160,84,.06) 60%,transparent 100%);pointer-events:none;border-radius:inherit}
    .jw-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(201,160,84,.5),transparent);animation:jwscan 4s ease-in-out infinite;pointer-events:none}
    @keyframes jwscan{0%{top:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{top:100%;opacity:0}}
    .nft-card-wrap{perspective:1100px;user-select:none}
    .nft-card-inner{transform-style:preserve-3d;position:relative;width:100%;aspect-ratio:3/4}
    .nft-face{position:absolute;inset:0;backface-visibility:hidden;display:flex;flex-direction:column;padding:20px}
    .nft-back{transform:rotateY(180deg)}
    @media(max-width:768px){
      .jw-hero-grid{grid-template-columns:1fr!important}
      .jw-price-grid{grid-template-columns:1fr!important}
      .jw-trait-grid{grid-template-columns:1fr 1fr!important}
      .jw-pay-grid{grid-template-columns:1fr 1fr!important}
      .jw-nft-row{flex-direction:column!important}
    }
  `

  function getPieceType(product: Product): string {
    const n = (product.name + ' ' + (product.slug || '')).toLowerCase()
    if (n.includes('ring')) return 'Ring'
    if (n.includes('necklace') || n.includes('pendant') || n.includes('chain')) return 'Necklace'
    if (n.includes('bracelet') || n.includes('cuff') || n.includes('bangle')) return 'Bracelet'
    if (n.includes('earring') || n.includes('stud')) return 'Earrings'
    if (n.includes('set')) return 'Jewelry Set'
    if (n.includes('tiara') || n.includes('crown')) return 'Crown Piece'
    return 'Jewelry'
  }

  function getRarity(usd: number): string {
    if (usd >= 50000) return 'ULTRA SOVEREIGN'
    if (usd >= 20000) return 'GRAND ARCHIVE'
    if (usd >= 10000) return 'HIGH JEWEL'
    if (usd >= 5000) return 'PREMIER'
    if (usd >= 1000) return 'CURATED'
    return 'ESSENTIAL'
  }

  function getMaterial(product: Product): string {
    const n = (product.name + ' ' + (product.description || '')).toLowerCase()
    if (n.includes('diamond')) return 'Diamond'
    if (n.includes('sapphire')) return 'Sapphire'
    if (n.includes('emerald')) return 'Emerald'
    if (n.includes('ruby')) return 'Ruby'
    if (n.includes('pearl')) return 'Pearl'
    if (n.includes('gold')) return '18K Gold'
    if (n.includes('platinum')) return 'Platinum'
    if (n.includes('steel')) return 'Steel'
    if (n.includes('crystal')) return 'Crystal'
    if (n.includes('titanium')) return 'Titanium'
    return 'Precious Metal'
  }

  function CopyBtn({ text }: { text: string }) {
    const [c, setC] = useState(false)
    return (
      <button onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, color: GOLD, background: 'none', border: 'none', cursor: 'pointer' }}>
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

  function NftCard3D({ product, pieceType, rarity, material }: {
    product: Product; pieceType: string; rarity: string; material: string
  }) {
    const [deg, setDeg] = useState(0)
    const [paused, setPaused] = useState(false)
    useEffect(() => {
      if (paused) return
      let frame: number; let t = deg
      const go = () => { t += 0.28; setDeg(t); frame = requestAnimationFrame(go) }
      go(); return () => cancelAnimationFrame(frame)
    }, [paused])

    const gold = product.price_usd >= 50000 ? '#f0d080' : product.price_usd >= 10000 ? '#c9a054' : '#a08040'
    const serial = 'SF-' + product.id.replace(/-/g, '').slice(0, 8).toUpperCase()
    const catName = (product as any).main_category?.name || 'Jewelry'

    const traits: [string, string][] = [
      ['Category', catName],
      ['Piece Type', pieceType],
      ['Material', material],
      ['Rarity', rarity],
      ['Network', 'Polygon Mainnet'],
      ['Standard', 'ERC-721'],
      ['Edition', 'House Allocation Reserve'],
      ['Authentication', 'Blockchain Verified'],
    ]

    return (
      <div
        className="nft-card-wrap"
        style={{ maxWidth: 260, margin: '0 auto' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="nft-card-inner" style={{ transform: `rotateY(${deg}deg)`, transition: 'none' }}>

          {/* Front */}
          <div className="nft-face" style={{
            background: 'linear-gradient(145deg, #0c0906 0%, #100d07 50%, #080604 100%)',
            border: `1px solid ${gold}55`,
          }}>
            {/* Shimmer sweep */}
            <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '40%' }}
              initial={{ x: '-100%' }} animate={{ x: '250%' }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'linear' }}
            >
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(201,160,84,0.07),transparent)' }}/>
            </motion.div>
            {/* Corner marks */}
            {[['top:0;left:0;border-top:1px solid;border-left:1px solid', 'tl'],['top:0;right:0;border-top:1px solid;border-right:1px solid', 'tr'],['bottom:0;left:0;border-bottom:1px solid;border-left:1px solid', 'bl'],['bottom:0;right:0;border-bottom:1px solid;border-right:1px solid', 'br']].map(([s, k]) => (
              <div key={k} style={{ position: 'absolute', width: 14, height: 14, borderColor: `${gold}60`, ...(Object.fromEntries(s.split(';').map(p => { const [a, b] = p.split(':'); return [a.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase()), b] }))) }} />
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, position: 'relative', zIndex: 1 }}>
              <div>
                <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: gold, marginBottom: 2, fontFamily: MONO }}>House of Shamim Forever</p>
                <p style={{ fontSize: 5, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: '#3f3830', fontFamily: MONO }}>Sovereign Jewelry NFT</p>
              </div>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ fontSize: 20, color: gold }}>◆</motion.div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name}
                  style={{ width: '78%', height: '78%', objectFit: 'contain', opacity: 0.9, filter: 'drop-shadow(0 0 12px rgba(201,160,84,0.2))' }} />
              ) : (
                <Gem size={48} color={`${gold}30`} />
              )}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: `1px solid ${gold}20`, position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: SERIF, fontSize: 11, color: '#c9b894', fontWeight: 300, lineHeight: 1.3, marginBottom: 3 }}>{product.name}</p>
              <p style={{ fontSize: 5, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: `${gold}80`, fontFamily: MONO }}>{rarity}</p>
            </div>
          </div>

          {/* Back */}
          <div className="nft-face nft-back" style={{
            background: 'linear-gradient(145deg, #0c0906 0%, #100d07 50%, #080604 100%)',
            border: `1px solid ${gold}55`,
          }}>
            <div style={{ marginBottom: 10, position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: gold, marginBottom: 6, fontFamily: MONO }}>Sovereign Traits</p>
              <div style={{ borderTop: `1px solid ${gold}20`, paddingTop: 8 }}>
                <p style={{ fontSize: 5, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: '#3f3830', marginBottom: 3, fontFamily: MONO }}>Serial Number</p>
                <p style={{ fontFamily: MONO, fontSize: 12, color: gold, letterSpacing: '0.12em' }}>{serial}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 3, flex: 1, position: 'relative', zIndex: 1 }}>
              {traits.map(([lbl, val]) => (
                <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 7px', background: '#0a0806' }}>
                  <p style={{ fontSize: 5, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#2a2520', fontFamily: MONO }}>{lbl}</p>
                  <p style={{ fontSize: 6, color: '#a08060', maxWidth: 100, textAlign: 'right' as const, fontFamily: MONO }}>{val}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${gold}12`, display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1 }}>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <p style={{ fontSize: 5, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: '#3f3830', fontFamily: MONO }}>Polygon Active — NFT Enabled</p>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center' as const, fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: `${gold}50`, marginTop: 10, fontFamily: MONO }}>Hover to pause · Auto-rotating</p>
      </div>
    )
  }

  export default function JewelryProductPage({ product }: { product: Product }) {
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
    const [activeImg, setActiveImg] = useState(0)
    const [openSection, setOpenSection] = useState<string | null>('payment')
    const { address: walletAddress } = useAccount()

    const images = product.images || []
    const heroImg = images[0] || null
    const priceUsd = product.price_usd || 0
    const pricePkr = product.price_pkr || 0
    const pieceType = getPieceType(product)
    const rarity = getRarity(priceUsd)
    const material = getMaterial(product)
    const pkrStr = pricePkr ? `PKR ${Number(pricePkr).toLocaleString()}` : null

    const traits = [
      { label: 'Classification', value: pieceType },
      { label: 'Rarity Tier', value: rarity },
      { label: 'Primary Material', value: material },
      { label: 'Archive Status', value: 'Sovereign Collection' },
      { label: 'Provenance', value: 'Shamim Forever House' },
      { label: 'NFT Twin', value: priceUsd >= 1000 ? 'Enabled' : 'Standard' },
    ]

    const callCheckout = useCallback(async (opts: {
      paymentMethod: string; paymentStatus: string; txHash?: string; proofUrl?: string; walletAddress?: string
    }) => {
      const res = await fetch('/api/v1/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id, product_name: product.name, quantity: 1,
          payment_method: opts.paymentMethod, payment_status: opts.paymentStatus,
          tx_hash: opts.txHash || null,
          shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
          total_pkr: pricePkr, total_usd: priceUsd,
          discount_applied: 0, price_pkr: pricePkr, price_usd: priceUsd,
          wallet_address: opts.walletAddress || null, payment_proof_url: opts.proofUrl || null, rarity_tier: rarity,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Checkout failed')
      return data as OrderResult
    }, [product, pricePkr, priceUsd, rarity, custName, custPhone, custAddress, custCity])

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
        setOrderResult(await callCheckout({
          paymentMethod: payMethod, paymentStatus: payMethod === 'contact' ? 'pending' : 'awaiting_verification',
          proofUrl: proofUrl || undefined, txHash: txId || undefined,
        }))
      } catch (err: any) {
        setOrderError(err?.message || 'Failed to place order.')
      }
      setSubmitting(false)
    }

    if (orderResult) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030303', padding: '80px 24px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: 500, width: '100%' }}>
            <p style={{ fontFamily: SERIF, fontSize: 64, color: GOLD, lineHeight: 1, marginBottom: 16 }}>◆</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 300, letterSpacing: '0.15em', color: '#f0ece4', textTransform: 'uppercase' as const, marginBottom: 8 }}>Order Placed</h2>
            <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 32, fontFamily: MONO }}>House of Shamim Forever</p>
            <div style={{ border: '1px solid rgba(201,160,84,0.12)', background: 'linear-gradient(135deg, #0c0906 0%, #080604 100%)', marginBottom: 24 }}>
              {[['Order Reference', orderResult.order_ref], ['Tracking ID', orderResult.tracking_ref], ['Status', orderResult.status?.replace(/_/g, ' ')]].map(([lbl, val]) => (
                <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 8, padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: '#3f3830', fontFamily: MONO }}>{lbl}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ fontFamily: MONO, fontSize: 11, color: '#c9b894', wordBreak: 'break-all' as const }}>{val}</p>
                    {lbl !== 'Status' && <CopyBtn text={val ?? ''} />}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <Link href={orderResult.track_url} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, textDecoration: 'none', fontFamily: MONO }}>
                <ExternalLink size={10} /> Track Order
              </Link>
              <Link href="/shop" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.08)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: '#3f3830', textDecoration: 'none', fontFamily: MONO }}>Continue</Link>
            </div>
          </motion.div>
        </div>
      )
    }

    return (
      <>
        <style>{PAGE_CSS}</style>
        <div style={{ background: '#030303', minHeight: '100vh', color: '#fff', fontFamily: SERIF }}>

          {/* ── NAV ─────────────────────────────────────────────────────── */}
          <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(201,160,84,0.08)', background: 'rgba(3,3,3,0.95)', backdropFilter: 'blur(12px)' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: SERIF, fontSize: 13, letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase' as const }}>Shamim Forever</span>
            </Link>
            <div style={{ display: 'flex', gap: 24 }}>
              <Link href="/shop" style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: MONO }}>Shop</Link>
              <Link href="/shop?cat=jewelry" style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, textDecoration: 'none', fontFamily: MONO }}>Jewelry</Link>
            </div>
          </nav>

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 32, paddingRight: 32, maxWidth: 1200, margin: '0 auto' }}>
            <div className="jw-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

              {/* Left — image */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <div style={{ position: 'relative', aspectRatio: '1', border: `1px solid ${GOLD}20`, overflow: 'hidden', background: '#0a0a0a' }} className="jw-holo">
                  <div className="jw-scan" />
                  <GoldParticles />
                  {/* Gold border top glow */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(201,160,84,0.9) 50%,transparent)', zIndex: 5 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(201,160,84,0.6) 50%,transparent)', zIndex: 5 }} />
                  {/* Center glow */}
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(201,160,84,0.09) 0%, transparent 70%)', zIndex: 4, pointerEvents: 'none' }} />
                  {heroImg ? (
                    <img src={activeImg < images.length ? images[activeImg] : heroImg}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10%', position: 'relative', zIndex: 3, filter: 'drop-shadow(0 0 20px rgba(201,160,84,0.2))' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 3 }}>
                      <Gem size={64} color={`${GOLD}30`} />
                    </div>
                  )}
                  {/* Rarity badge */}
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(3,3,3,0.9)', border: `1px solid ${GOLD}40`, padding: '4px 10px', zIndex: 6 }}>
                    <span style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, fontFamily: MONO }}>{rarity}</span>
                  </div>
                  {/* Piece type badge */}
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(3,3,3,0.9)', border: `1px solid rgba(255,255,255,0.08)`, padding: '4px 10px', zIndex: 6 }}>
                    <span style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', fontFamily: MONO }}>{pieceType}</span>
                  </div>
                </div>
                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    {images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImg(i)}
                        style={{ width: 56, height: 56, border: `1px solid ${i === activeImg ? GOLD : GOLD + '20'}`, background: '#0a0a0a', cursor: 'pointer', padding: 4, overflow: 'hidden' }}>
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right — details */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 16, fontFamily: MONO }}>
                  Shamim Forever · {pieceType} · {rarity}
                </p>
                <h1 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 300, lineHeight: 1.2, marginBottom: 8, color: '#fff' }}>
                  {product.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: 16, color: GOLD }}>◆</motion.div>
                  <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', fontFamily: MONO }}>{material}</span>
                </div>

                {/* Price */}
                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 300, color: GOLD2, marginBottom: 4 }}>
                    ${priceUsd.toLocaleString()} <span style={{ fontSize: 14, color: `${GOLD}80` }}>USD</span>
                  </p>
                  {pkrStr && (
                    <p style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', fontFamily: MONO }}>{pkrStr}</p>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: 32, fontStyle: 'italic', borderLeft: `2px solid ${GOLD}40`, paddingLeft: 16 }}>
                    {product.description.slice(0, 250)}{product.description.length > 250 ? '...' : ''}
                  </p>
                )}

                {/* Sovereign Traits mini */}
                <div style={{ border: `1px solid ${GOLD}15`, padding: 20, marginBottom: 32 }}>
                  <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 14, fontFamily: MONO }}>Sovereign Traits</p>
                  <div className="jw-trait-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                    {traits.slice(0, 4).map(t => (
                      <div key={t.label} className="jw-trait-row" style={{ paddingRight: 16 }}>
                        <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 3, fontFamily: MONO }}>{t.label}</p>
                        <p style={{ fontFamily: SERIF, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>{t.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <button onClick={() => { const el = document.getElementById('jw-order'); el?.scrollIntoView({ behavior: 'smooth' }) }}
                  style={{ width: '100%', background: GOLD, color: '#030303', border: 'none', padding: '16px', fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase' as const, cursor: 'pointer', fontFamily: MONO, fontWeight: 700, marginBottom: 12 }}>
                  Acquire This Piece
                </button>
                <button onClick={() => { const el = document.getElementById('jw-order'); el?.scrollIntoView({ behavior: 'smooth' }); setPayMethod('contact') }}
                  style={{ width: '100%', background: 'transparent', color: GOLD, border: `1px solid ${GOLD}40`, padding: '14px', fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase' as const, cursor: 'pointer', fontFamily: MONO }}>
                  Request Private Consultation
                </button>
              </motion.div>
            </div>
          </section>

          {/* ── SEPARATOR ──────────────────────────────────────────────── */}
          <div style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
            <div style={{ height: 1, background: `linear-gradient(to right,transparent,${GOLD}40,transparent)` }} />
          </div>

          {/* ── NFT SECTION ─────────────────────────────────────────────── */}
          <section style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 32px' }}>
            <p style={{ fontSize: 7, letterSpacing: '0.6em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 40, fontFamily: MONO, textAlign: 'center' as const }}>
              Digital Twin NFT · Sovereign Archive
            </p>
            <div className="jw-nft-row" style={{ display: 'flex', gap: 64, alignItems: 'center' }}>
              {/* 3D Card */}
              <div style={{ flex: '0 0 300px' }}>
                <NftCard3D product={product} pieceType={pieceType} rarity={rarity} material={material} />
              </div>
              {/* NFT Info */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#fff', marginBottom: 16 }}>
                  Every Piece. A Digital Legacy.
                </h2>
                <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', marginBottom: 32, fontStyle: 'italic' }}>
                  Each sovereign jewelry creation from Shamim Forever is paired with an authenticated NFT Digital Twin on Polygon — a permanent on-chain record of your ownership, rarity tier, and provenance. Your serial number is engraved on both the physical certificate and blockchain simultaneously.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 24 }}>
                  {([
                    ['Network', 'Polygon Mainnet'],
                    ['Token Standard', 'ERC-721'],
                    ['Royalty', '7.5%'],
                    ['Marketplace', 'OpenSea'],
                    ['Auto-Mint', 'On Crypto Purchase'],
                    ['Transfer', 'Allowed'],
                  ] as [string, string][]).map(([lbl, val]) => (
                    <div key={lbl} style={{ background: '#0a0806', padding: '10px 14px', border: `1px solid ${GOLD}08` }}>
                      <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', marginBottom: 3, fontFamily: MONO }}>{lbl}</p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: MONO }}>{val}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
                  <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', fontFamily: MONO }}>Polygon Active · Transferable · Blockchain Verified</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── ALL TRAITS ──────────────────────────────────────────────── */}
          <section style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 32px' }}>
            <div style={{ borderTop: `1px solid ${GOLD}15`, borderBottom: `1px solid ${GOLD}15`, padding: '48px 0' }}>
              <p style={{ fontSize: 6, letterSpacing: '0.6em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 40, fontFamily: MONO }}>Complete Archive Record</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
                {traits.map(t => (
                  <div key={t.label}>
                    <p style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 6, fontFamily: MONO }}>{t.label}</p>
                    <p style={{ fontFamily: SERIF, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>{t.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ORDER SECTION ────────────────────────────────────────────── */}
          <section id="jw-order" style={{ maxWidth: 800, margin: '0 auto 120px', padding: '0 32px' }}>
            <p style={{ fontSize: 7, letterSpacing: '0.6em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 8, fontFamily: MONO, textAlign: 'center' as const }}>Acquire</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 300, color: '#fff', marginBottom: 48, textAlign: 'center' as const, letterSpacing: '0.1em' }}>
              Claim Your Sovereign Piece
            </h2>

            {/* Payment Method Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginBottom: 40 }}>
              {([
                ['crypto', 'Crypto / Web3'],
                ['pkr_manual', 'PKR Transfer'],
                ['contact', 'Consultation'],
              ] as [PayMethod, string][]).map(([m, label]) => (
                <button key={m} onClick={() => setPayMethod(m)}
                  style={{ padding: '14px 8px', border: `1px solid ${payMethod === m ? GOLD + '60' : 'rgba(255,255,255,0.06)'}`, background: payMethod === m ? `${GOLD}08` : 'transparent', color: payMethod === m ? GOLD : 'rgba(255,255,255,0.35)', fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase' as const, cursor: 'pointer', fontFamily: MONO, transition: 'all 0.2s' }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Delivery Details */}
            <div style={{ border: `1px solid ${GOLD}12`, padding: 24, marginBottom: 24 }}>
              <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 20, fontFamily: MONO }}>Delivery Information</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Full Name', value: custName, set: setCustName, placeholder: 'Your Name' },
                  { label: 'Phone Number', value: custPhone, set: setCustPhone, placeholder: '+92 300 0000000' },
                  { label: 'Address', value: custAddress, set: setCustAddress, placeholder: 'Street Address' },
                  { label: 'City', value: custCity, set: setCustCity, placeholder: 'City' },
                ].map(f => (
                  <div key={f.label}>
                    <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 6, fontFamily: MONO }}>{f.label}</p>
                    <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                      style={{ width: '100%', background: '#0a0806', border: '1px solid rgba(255,255,255,0.07)', color: '#fff', padding: '10px 12px', fontSize: 11, fontFamily: SERIF, outline: 'none', boxSizing: 'border-box' as const }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Content */}
            <AnimatePresence mode="wait">
              {payMethod === 'crypto' && (
                <motion.div key="crypto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div style={{ border: `1px solid ${GOLD}12`, padding: 24, marginBottom: 24 }}>
                    <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 20, fontFamily: MONO }}>Crypto Payment</p>
                    <Web3PaySection productPriceUsd={priceUsd} onPaymentSuccess={handleWeb3Success} />
                  </div>
                </motion.div>
              )}
              {payMethod === 'pkr_manual' && (
                <motion.div key="pkr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div style={{ border: `1px solid ${GOLD}12`, padding: 24, marginBottom: 24 }}>
                    <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 20, fontFamily: MONO }}>PKR Bank Transfer</p>
                    {/* EasyPaisa */}
                    <div style={{ background: '#0a0806', padding: 16, marginBottom: 12 }}>
                      <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 12, fontFamily: MONO }}>EasyPaisa</p>
                      {[['Account Number', EASYPAISA_NUMBER], ['Account Name', EASYPAISA_NAME]].map(([lbl, val]) => (
                        <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div>
                            <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', fontFamily: MONO }}>{lbl}</p>
                            <p style={{ fontFamily: MONO, fontSize: 13, color: GOLD, letterSpacing: '0.06em', marginTop: 2 }}>{val}</p>
                          </div>
                          <CopyBtn text={val} />
                        </div>
                      ))}
                    </div>
                    {/* UBL */}
                    <div style={{ background: '#0a0806', padding: 16, marginBottom: 20 }}>
                      <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: GOLD, marginBottom: 12, fontFamily: MONO }}>UBL Bank</p>
                      {[['IBAN', UBL_IBAN], ['Account Name', EASYPAISA_NAME]].map(([lbl, val]) => (
                        <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div>
                            <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.25)', fontFamily: MONO }}>{lbl}</p>
                            <p style={{ fontFamily: MONO, fontSize: 11, color: GOLD, letterSpacing: '0.04em', marginTop: 2 }}>{val}</p>
                          </div>
                          <CopyBtn text={val} />
                        </div>
                      ))}
                    </div>
                    {pkrStr && (
                      <div style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}25`, padding: 14, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', fontFamily: MONO }}>Amount to Transfer</p>
                        <p style={{ fontFamily: SERIF, fontSize: 20, color: GOLD2, fontWeight: 300 }}>{pkrStr}</p>
                      </div>
                    )}
                    {/* TX ID */}
                    <div style={{ marginBottom: 12 }}>
                      <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 8, fontFamily: MONO }}>Transaction ID</p>
                      <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Enter transaction ID"
                        style={{ width: '100%', background: '#0a0806', border: '1px solid rgba(255,255,255,0.07)', color: '#fff', padding: '10px 12px', fontSize: 11, fontFamily: MONO, outline: 'none', boxSizing: 'border-box' as const }} />
                    </div>
                    {/* Proof Upload */}
                    <div>
                      <p style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 8, fontFamily: MONO }}>Payment Screenshot</p>
                      {!proofPreview ? (
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px dashed rgba(255,255,255,0.1)', padding: '16px 20px', cursor: 'pointer', color: 'rgba(255,255,255,0.3)' }}>
                          <Upload size={14} />
                          <span style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase' as const, fontFamily: MONO }}>Upload Screenshot</span>
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                            const f = e.target.files?.[0]; if (!f) return
                            setProofFile(f)
                            const reader = new FileReader(); reader.onload = ev => setProofPreview(ev.target?.result as string); reader.readAsDataURL(f)
                          }} />
                        </label>
                      ) : (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <img src={proofPreview} alt="proof" style={{ maxHeight: 120, border: '1px solid rgba(255,255,255,0.1)' }} />
                          <button onClick={() => { setProofFile(null); setProofPreview(null) }}
                            style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.8)', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {orderError && <p style={{ fontSize: 9, color: '#ef4444', marginBottom: 12, fontFamily: MONO }}>{orderError}</p>}
                  <button onClick={handlePlaceOrder} disabled={submitting}
                    style={{ width: '100%', background: submitting ? '#3a2d14' : GOLD, color: '#030303', border: 'none', padding: '16px', fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase' as const, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: MONO, fontWeight: 700 }}>
                    {submitting ? 'Processing...' : 'Confirm Order'}
                  </button>
                </motion.div>
              )}
              {payMethod === 'contact' && (
                <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div style={{ border: `1px solid ${GOLD}12`, padding: 32, marginBottom: 24, textAlign: 'center' as const }}>
                    <Crown size={32} color={`${GOLD}50`} style={{ margin: '0 auto 16px' }} />
                    <p style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 300, color: '#fff', marginBottom: 8 }}>Private Consultation</p>
                    <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: 24 }}>
                      For bespoke inquiries, private viewings, or sovereign gifting arrangements, our house concierge will be in contact within 24 hours.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
                      <a href="https://wa.me/923367970004" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: GOLD, color: '#030303', fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase' as const, textDecoration: 'none', fontFamily: MONO, fontWeight: 700 }}>
                        WhatsApp
                      </a>
                      <a href="/concierge"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', border: `1px solid ${GOLD}40`, color: GOLD, fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase' as const, textDecoration: 'none', fontFamily: MONO }}>
                        Concierge
                      </a>
                    </div>
                  </div>
                  {orderError && <p style={{ fontSize: 9, color: '#ef4444', marginBottom: 12, fontFamily: MONO }}>{orderError}</p>}
                  <button onClick={handlePlaceOrder} disabled={submitting}
                    style={{ width: '100%', background: 'transparent', color: GOLD, border: `1px solid ${GOLD}40`, padding: '14px', fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase' as const, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: MONO }}>
                    {submitting ? 'Processing...' : 'Register Consultation Request'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* ── FOOTER ───────────────────────────────────────────────────── */}
          <div style={{ borderTop: '1px solid rgba(201,160,84,0.08)', padding: '32px', textAlign: 'center' as const }}>
            <p style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)', fontFamily: MONO }}>
              © {new Date().getFullYear()} House of Shamim Forever · All Rights Reserved · Sovereign Luxury
            </p>
          </div>

        </div>
      </>
    )
  }
  