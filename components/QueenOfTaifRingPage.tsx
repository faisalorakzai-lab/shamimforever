'use client'

  import { useEffect, useRef, useState, useCallback } from 'react'
  import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Link from 'next/link'
  import { Copy, Check, Upload, X, ArrowDown } from 'lucide-react'
  import { formatPKR } from '@/lib/utils'
  import type { Product } from '@/types'
  import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
  import { useAccount } from 'wagmi'

  type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
  interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

  const NFT_CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
  const MERCHANT_WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
  const EASYPAISA_NUMBER = '03367970004'
  const EASYPAISA_NAME = 'M Faisal'
  const UBL_IBAN = 'PK13UNIL0109000318870498'
  const SERIF = "'Cormorant Garamond', Georgia, serif"

  const PAGE_CSS = `
    .r-reveal{opacity:0;transform:translateY(60px);filter:blur(8px)}
    .r-reveal.visible{opacity:1;transform:translateY(0);filter:blur(0);transition:opacity 1.4s cubic-bezier(.25,.1,.1,1),transform 1.4s cubic-bezier(.25,.1,.1,1),filter 1.4s cubic-bezier(.25,.1,.1,1)}
    .gem-table td{padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:top}
    .gem-table tr:last-child td{border-bottom:none}
    @media(max-width:768px){
      .ring-hero-text{padding:0 24px!important}
      .ring-pay-grid{grid-template-columns:1fr 1fr!important}
      .ring-gallery{flex-direction:column!important}
      .gem-3col{grid-template-columns:1fr!important}
      .invest-grid{grid-template-columns:1fr!important}
      .ring-nft-grid{grid-template-columns:1fr!important}
    }
  `

  function CopyBtn({ text }: { text: string }) {
    const [c, setC] = useState(false)
    return (
      <button onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
        style={{ display:'flex', alignItems:'center', gap:6, color:'#c9a054', background:'none', border:'none', cursor:'pointer' }}>
        {c ? <Check size={10} /> : <Copy size={10} />}
        <span style={{ fontSize:7, letterSpacing:'0.3em', textTransform:'uppercase' as const }}>{c ? 'Copied' : 'Copy'}</span>
      </button>
    )
  }

  function GoldDust() {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
      const canvas = ref.current; if (!canvas) return
      const ctx = canvas.getContext('2d')!
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
      resize(); window.addEventListener('resize', resize)
      const pts = Array.from({ length: 90 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.3, vx: (Math.random() - 0.5) * 0.1, vy: -(Math.random() * 0.22 + 0.05),
        a: Math.random(), va: (Math.random() - 0.5) * 0.006,
      }))
      let id: number
      const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.a += p.va
          if (p.a <= 0 || p.a >= 1) p.va *= -1
          if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201,160,84,${p.a * 0.6})`; ctx.fill()
        })
        id = requestAnimationFrame(tick)
      }
      tick()
      return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
    }, [])
    return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:10 }} />
  }

  function SovereignPassport() {
    const nftTraits = [
      { k: 'CATEGORY', v: 'High Jewelry Sovereign Asset' },
      { k: 'COLLECTION', v: 'The Archive Objects' },
      { k: 'RARITY TIER', v: 'FOUNDER ARCHIVE' },
      { k: 'METAL', v: 'Solid 18K Yellow Gold' },
      { k: 'CENTER STONE', v: 'Natural VVS Diamond' },
      { k: 'TOTAL DIAMONDS', v: '1.30 Carats' },
      { k: 'AUTHENTICATION', v: 'Polygon Verified' },
      { k: 'OWNERSHIP', v: 'Active Sovereign Passport' },
      { k: 'PHYSICAL PAIRING', v: 'Ring + Certificate + Digital Twin' },
      { k: 'ALLOCATION', v: 'Ultra Limited — Founder Batch' },
      { k: 'ORIGIN', v: 'Sovereign Atelier, Karachi' },
      { k: 'COLLECTOR STATUS', v: 'Founder Archive Holder' },
      { k: 'VAULT ACCESS', v: 'Enabled' },
      { k: 'ARCHIVE STATUS', v: 'Active' },
    ]
    return (
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'rgba(201,160,84,0.06)' }} className="ring-nft-grid">
        {/* LEFT — Passport front */}
        <div style={{ background:'linear-gradient(160deg,#0c0906 0%,#080604 100%)', padding:'clamp(32px,5vw,60px)', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:460 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
              <svg width="22" height="22" viewBox="0 0 38.4 33.5" fill="#8247e5">
                <path d="M29 10.2a.7.7 0 0 0-.7 0l-4.4 2.6-3 1.7-4.4 2.6a.7.7 0 0 1-.7 0l-3.5-2a.7.7 0 0 1-.4-.6v-4a.7.7 0 0 1 .4-.6l3.5-2a.7.7 0 0 1 .7 0l3.5 2a.7.7 0 0 1 .4.6v2.6l3-1.8v-2.6a.7.7 0 0 0-.4-.6l-6.4-3.7a.7.7 0 0 0-.7 0l-6.5 3.8a.7.7 0 0 0-.4.6v7.4a.7.7 0 0 0 .4.6l6.5 3.7a.7.7 0 0 0 .7 0l4.4-2.5 3-1.8 4.4-2.5a.7.7 0 0 1 .7 0l3.5 2a.7.7 0 0 1 .4.6v4a.7.7 0 0 1-.4.6l-3.5 2a.7.7 0 0 1-.7 0l-3.5-2a.7.7 0 0 1-.4-.6V18l-3 1.7v2.6a.7.7 0 0 0 .4.6l6.5 3.7a.7.7 0 0 0 .7 0l6.5-3.7a.7.7 0 0 0 .3-.6v-7.4a.7.7 0 0 0-.3-.6z" />
              </svg>
              <div>
                <p style={{ fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'#c9a054', lineHeight:1 }}>Polygon Mainnet</p>
                <p style={{ fontSize:6, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,160,84,0.3)', marginTop:3 }}>Blockchain Verified</p>
              </div>
            </div>
            <div style={{ width:40, height:1, background:'linear-gradient(to right,#c9a054,transparent)', marginBottom:28 }} />
            <p style={{ fontSize:7, letterSpacing:'0.7em', textTransform:'uppercase', color:'rgba(201,160,84,0.5)', marginBottom:12 }}>Sovereign Identity</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(22px,3.5vw,38px)', fontWeight:300, color:'#f0ece4', lineHeight:1.1, letterSpacing:'0.05em', marginBottom:16 }}>Queen of Taif<br/>Crown Ring</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(13px,1.8vw,17px)', fontWeight:300, color:'rgba(201,160,84,0.7)', fontStyle:'italic' }}>Founder Archive Edition</p>
          </div>
          <div>
            <div style={{ padding:'14px 0', borderTop:'1px solid rgba(201,160,84,0.08)', marginTop:32 }}>
              <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:6 }}>NFT Name</p>
              <p style={{ fontSize:8, color:'rgba(255,255,255,0.5)', fontWeight:300 }}>Queen of Taif Crown Ring — Founder Archive Edition</p>
            </div>
            <div style={{ padding:'14px 0', borderTop:'1px solid rgba(201,160,84,0.08)' }}>
              <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:6 }}>Contract</p>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <p style={{ fontFamily:'monospace', fontSize:7, color:'rgba(201,160,84,0.4)' }}>{NFT_CONTRACT.slice(0,18)}...{NFT_CONTRACT.slice(-6)}</p>
                <CopyBtn text={NFT_CONTRACT} />
              </div>
            </div>
            <div style={{ padding:'14px 0', borderTop:'1px solid rgba(201,160,84,0.08)' }}>
              <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:6 }}>Description</p>
              <p style={{ fontSize:7, color:'rgba(255,255,255,0.35)', lineHeight:1.7, fontWeight:300 }}>A blockchain-authenticated High Jewelry Sovereign Asset crafted from solid 18K gold and natural VVS diamonds. This Digital Passport certifies ownership, provenance, rarity allocation, archive status, and founder-level collector privileges within the House of Shamim Forever.</p>
            </div>
          </div>
        </div>
        {/* RIGHT — Attributes */}
        <div style={{ background:'linear-gradient(160deg,#0a0806 0%,#060503 100%)', padding:'clamp(32px,5vw,60px)' }}>
          <p style={{ fontSize:7, letterSpacing:'0.7em', textTransform:'uppercase', color:'#c9a054', marginBottom:28 }}>NFT Attributes</p>
          <div>
            {nftTraits.map((t, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', flexShrink:0 }}>{t.k}</span>
                <span style={{ fontSize:8, color:'rgba(255,255,255,0.65)', fontWeight:300, textAlign:'right' }}>{t.v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:32, padding:'20px', background:'rgba(201,160,84,0.03)', border:'1px solid rgba(201,160,84,0.1)' }}>
            <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(201,160,84,0.5)', marginBottom:8 }}>Luxury objects may be replicated.</p>
            <p style={{ fontFamily:SERIF, fontSize:15, fontWeight:300, color:'rgba(201,160,84,0.85)', fontStyle:'italic' }}>Provenance cannot.</p>
          </div>
        </div>
      </div>
    )
  }

  export default function QueenOfTaifRingPage({ product }: { product: Product }) {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
    const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
    const textY = useTransform(scrollYProgress, [0, 0.6], [0, 80])

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
    const [activeGallery, setActiveGallery] = useState(0)
    const { address: walletAddress } = useAccount()
    const [imgError, setImgError] = useState(false)

    const heroImages = [
      '/products/queen-of-taif-crown-ring/hero.png',
      '/products/queen-of-taif-crown-ring/box.png',
    ]
    const dbImages = Array.isArray(product.images) && product.images.length > 0 ? product.images : heroImages
    const galleryImgs = dbImages

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.utils.toArray<Element>('.r-reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })
      return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
    }, [])

    const callCheckout = useCallback(async (opts: { paymentMethod: string; paymentStatus: string; txHash?: string; proofUrl?: string; walletAddress?: string }) => {
      if (!product) throw new Error('No product')
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
          wallet_address: opts.walletAddress || null, payment_proof_url: opts.proofUrl || null,
          rarity_tier: 'FOUNDER ARCHIVE',
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Checkout failed')
      return data as OrderResult
    }, [product, quantity, custName, custPhone, custAddress, custCity])

    const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
      try {
        setOrderResult(await callCheckout({ paymentMethod: coin.toLowerCase(), paymentStatus: 'paid', txHash, walletAddress: walletAddress || undefined }))
      } catch (e) { setOrderError((e as Error).message) }
    }, [callCheckout, walletAddress])

    const handlePkrSubmit = useCallback(async () => {
      if (!custName || !custPhone || !custAddress || !custCity) { setOrderError('Please fill all fields.'); return }
      setSubmitting(true); setOrderError(null)
      try {
        let proofUrl: string | undefined
        if (proofFile) {
          const fd = new FormData(); fd.append('file', proofFile)
          const up = await fetch('/api/v1/upload-proof', { method: 'POST', body: fd })
          const upd = await up.json()
          proofUrl = upd.url
        }
        setOrderResult(await callCheckout({ paymentMethod: 'easypaisa', paymentStatus: 'pending', txHash: txId || undefined, proofUrl }))
      } catch (e) { setOrderError((e as Error).message) }
      finally { setSubmitting(false) }
    }, [custName, custPhone, custAddress, custCity, proofFile, txId, callCheckout])

    const handleCodSubmit = useCallback(async () => {
      if (!custName || !custPhone || !custAddress || !custCity) { setOrderError('Please fill all fields.'); return }
      setSubmitting(true); setOrderError(null)
      try { setOrderResult(await callCheckout({ paymentMethod: 'cod', paymentStatus: 'pending' })) }
      catch (e) { setOrderError((e as Error).message) }
      finally { setSubmitting(false) }
    }, [custName, custPhone, custAddress, custCity, callCheckout])

    if (orderResult) return (
      <div style={{ minHeight:'100vh', background:'#030303', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:28, padding:40 }}>
        <div style={{ width:64, height:64, border:'1px solid rgba(201,160,84,0.3)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:SERIF, fontSize:32, color:'#c9a054' }}>◆</span>
        </div>
        <p style={{ fontFamily:SERIF, fontSize:'clamp(28px,5vw,52px)', fontWeight:300, color:'#f0ece4', textAlign:'center', letterSpacing:'0.05em' }}>Sovereign Allocation Confirmed</p>
        <p style={{ fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.6)', textAlign:'center' }}>Order Reference: {orderResult.order_ref}</p>
        <p style={{ fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.6)', textAlign:'center' }}>Tracking: {orderResult.tracking_ref}</p>
        {orderResult.track_url && <a href={orderResult.track_url} target="_blank" rel="noreferrer" style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.5)', border:'1px solid rgba(201,160,84,0.15)', padding:'14px 32px', textDecoration:'none' }}>Track Sovereign Archive</a>}
        <Link href="/shop" style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', textDecoration:'none' }}>Return to Archive</Link>
      </div>
    )

    const addressFields = (
      <div style={{ display:'flex', flexDirection:'column', gap:12, marginTop:20 }}>
        {[['Full Name', custName, setCustName], ['Phone', custPhone, setCustPhone], ['Address', custAddress, setCustAddress], ['City', custCity, setCustCity]].map(([label, val, set]) => (
          <div key={label as string} style={{ display:'flex', flexDirection:'column', gap:5 }}>
            <p style={{ fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)' }}>{label as string}</p>
            <input value={val as string} onChange={e => (set as (v: string) => void)(e.target.value)}
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.7)', padding:'10px 14px', fontSize:13, outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' as const }} />
          </div>
        ))}
      </div>
    )

    const priceUsd = product.price_usd || 2500
    const pricePkr = product.price_pkr || 700000

    return (
      <div style={{ background:'#030303', minHeight:'100vh', color:'#f0ece4' }}>
        <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} style={{ position:'relative', height:'100svh', minHeight:700, overflow:'hidden', background:'#030303' }}>
          <motion.div style={{ position:'absolute', inset:0, scale:imgScale }}>
            <img
              src={imgError ? galleryImgs[0] : '/products/queen-of-taif-crown-ring/hero.png'}
              alt="Queen of Taif Crown Ring"
              onError={() => setImgError(true)}
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 10%' }}
            />
          </motion.div>
          {/* Gradient overlay */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(3,3,3,0.2) 0%, rgba(3,3,3,0.05) 15%, rgba(3,3,3,0.35) 55%, rgba(3,3,3,0.92) 85%, #030303 100%)' }} />
          {/* Gold dust particles */}
          <GoldDust />
          {/* Hero text */}
          <motion.div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom:'clamp(60px,10vh,120px)', opacity:textOpacity, y:textY, zIndex:20 }} className="ring-hero-text">
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:1.2 }}
              style={{ fontSize:7, letterSpacing:'0.9em', textTransform:'uppercase', color:'rgba(201,160,84,0.7)', marginBottom:20 }}>
              House of Shamim Forever — Archive III
            </motion.p>
            <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1, duration:1.6 }}
              style={{ fontFamily:SERIF, fontSize:'clamp(38px,8vw,96px)', fontWeight:300, letterSpacing:'0.08em', color:'#f0ece4', textAlign:'center', lineHeight:1, marginBottom:10 }}>
              QUEEN OF TAIF
            </motion.p>
            <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.3, duration:1.6 }}
              style={{ fontFamily:SERIF, fontSize:'clamp(38px,8vw,96px)', fontWeight:300, letterSpacing:'0.08em', color:'#c9a054', textAlign:'center', lineHeight:1, marginBottom:24 }}>
              CROWN RING
            </motion.p>
            <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:1.8, duration:1.4 }}
              style={{ width:120, height:1, background:'linear-gradient(to right,transparent,#c9a054,transparent)', marginBottom:24 }} />
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2, duration:1.2 }}
              style={{ fontFamily:SERIF, fontSize:'clamp(14px,2vw,20px)', fontWeight:300, color:'rgba(201,160,84,0.8)', fontStyle:'italic', marginBottom:10, textAlign:'center' }}>
              The Royal Tiara Masterpiece
            </motion.p>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.5, duration:1 }}
              style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:40, textAlign:'center' }}>
              Sovereign Archive Allocation · Object I
            </motion.p>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:2.8, duration:1 }}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(26px,4vw,42px)', fontWeight:300, color:'#f0ece4', letterSpacing:'0.05em' }}>$2,500 USD</p>
              <p style={{ fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)' }}>Rs. {pricePkr.toLocaleString()} PKR</p>
            </motion.div>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:3.2, duration:1 }}
              style={{ marginTop:32, display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
              <a href="#acquire"
                style={{ fontSize:7, letterSpacing:'0.6em', textTransform:'uppercase', color:'#030303', background:'#c9a054', padding:'16px 48px', textDecoration:'none', display:'block' }}>
                Acquire Sovereign Ownership
              </a>
              <a href="#legacy"
                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, textDecoration:'none' }}>
                <ArrowDown size={14} color="rgba(201,160,84,0.4)" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ GALLERY ═══════════════════════════════════════════════════════ */}
        <section style={{ padding:'clamp(60px,8vw,100px) clamp(24px,6vw,80px)' }}>
          <div style={{ display:'flex', gap:2, maxWidth:1100, margin:'0 auto' }} className="ring-gallery">
            {galleryImgs.map((img, i) => (
              <motion.div key={i} onClick={() => setActiveGallery(i)}
                style={{ flex: i === activeGallery ? 2 : 1, overflow:'hidden', cursor:'pointer', transition:'flex 0.6s cubic-bezier(.25,.1,.1,1)', border: i === activeGallery ? '1px solid rgba(201,160,84,0.25)' : '1px solid rgba(201,160,84,0.06)' }}>
                <img src={img} alt={`Ring view ${i + 1}`}
                  style={{ width:'100%', aspectRatio: i === activeGallery ? '4/5' : '3/4', objectFit:'cover', objectPosition:'center', display:'block', transition:'opacity 0.4s', opacity: i === activeGallery ? 1 : 0.5 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ LEGACY STATEMENT ═══════════════════════════════════════════════ */}
        <section id="legacy" style={{ padding:'clamp(80px,10vw,140px) clamp(24px,10vw,160px)', borderTop:'1px solid rgba(201,160,84,0.06)' }}>
          <div className="r-reveal" style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:40 }}>The Legacy Statement</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(28px,5vw,60px)', fontWeight:300, color:'#f0ece4', lineHeight:1.2, marginBottom:20, letterSpacing:'0.02em' }}>
              A crown belongs on the head.
            </p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(20px,3.5vw,42px)', fontWeight:300, color:'rgba(201,160,84,0.8)', lineHeight:1.3, fontStyle:'italic', marginBottom:40 }}>
              A sovereign authority is permanently sealed by the hand.
            </p>
            <div style={{ width:60, height:1, background:'linear-gradient(to right,transparent,#c9a054,transparent)', margin:'0 auto 40px' }} />
            <p style={{ fontFamily:SERIF, fontSize:'clamp(15px,2vw,20px)', fontWeight:300, color:'rgba(255,255,255,0.45)', lineHeight:2, letterSpacing:'0.02em' }}>
              Before kingdoms were recorded in history, they were recognized through symbols.<br/>
              Crowns. Seals. Treasures. Artifacts.<br/>
              Objects capable of carrying power beyond a single lifetime.
            </p>
          </div>
        </section>

        {/* ══ CHAPTER III ═══════════════════════════════════════════════════ */}
        <section style={{ background:'linear-gradient(180deg,#080604 0%,#030303 100%)', padding:'clamp(80px,10vw,140px) clamp(24px,10vw,160px)' }}>
          <div className="r-reveal" style={{ maxWidth:800, margin:'0 auto' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16 }}>Chapter III</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(22px,4vw,46px)', fontWeight:300, color:'#f0ece4', letterSpacing:'0.05em', marginBottom:48 }}>The Weight of Sovereignty</p>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {[
                'Power that can disappear was never power.',
                'The strongest form of authority is authority that becomes tangible.',
                'A title can be challenged. A reputation can be questioned. Ownership remains ownership.',
              ].map((line, i) => (
                <p key={i} style={{ fontFamily:SERIF, fontSize:'clamp(16px,2.5vw,26px)', fontWeight:300, color: i === 0 ? 'rgba(201,160,84,0.85)' : 'rgba(255,255,255,0.5)', lineHeight:1.5, fontStyle: i === 0 ? 'italic' : 'normal' }}>{line}</p>
              ))}
            </div>
            <div style={{ marginTop:48, paddingLeft:28, borderLeft:'1px solid rgba(201,160,84,0.2)' }}>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(14px,2vw,19px)', fontWeight:300, color:'rgba(255,255,255,0.4)', lineHeight:2 }}>
                Queen of Taif Crown Ring was engineered for women whose lives operate beyond trends.<br/>
                Women who understand that precious metals outlive currencies.<br/>
                That diamonds survive centuries.<br/>
                That heirlooms preserve stories longer than memory itself.
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(16px,2.2vw,22px)', fontWeight:300, color:'rgba(201,160,84,0.7)', fontStyle:'italic', marginTop:24, lineHeight:1.6 }}>
                This is not fashion.<br/>This is permanent wealth transformed into wearable art.
              </p>
            </div>
          </div>
        </section>

        {/* ══ THE STORY ═════════════════════════════════════════════════════ */}
        <section style={{ padding:'clamp(80px,10vw,140px) clamp(24px,10vw,160px)', borderTop:'1px solid rgba(201,160,84,0.05)' }}>
          <div className="r-reveal" style={{ maxWidth:800, margin:'0 auto' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16 }}>The Story</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(20px,3.5vw,40px)', fontWeight:300, color:'#f0ece4', letterSpacing:'0.04em', marginBottom:48 }}>
              The Queen Who Builds Her Own Empire
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(15px,2vw,20px)', fontWeight:300, color:'rgba(255,255,255,0.45)', lineHeight:2 }}>
                Most luxury products are designed to be admired. Few are designed to be preserved.
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(16px,2.2vw,22px)', fontWeight:300, color:'rgba(255,255,255,0.6)', lineHeight:2 }}>
                Queen of Taif Crown Ring stands at the intersection of beauty, permanence, and ownership. As the inaugural High Jewelry Masterpiece of the House of Shamim Forever, it represents a philosophy that extends beyond adornment.
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(18px,2.8vw,32px)', fontWeight:300, color:'rgba(201,160,84,0.8)', lineHeight:1.5, fontStyle:'italic' }}>
                It represents legacy.
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(15px,2vw,20px)', fontWeight:300, color:'rgba(255,255,255,0.45)', lineHeight:2 }}>
                This sovereign object was created for women who understand that true luxury is not measured by visibility. It is measured by permanence.
              </p>
            </div>
            {/* Value callout */}
            <div style={{ marginTop:56, padding:'clamp(28px,4vw,48px)', background:'linear-gradient(135deg,rgba(201,160,84,0.04) 0%,transparent 100%)', border:'1px solid rgba(201,160,84,0.12)' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }} className="ring-pay-grid">
                {[
                  { label:'International Valuation', value:'$2,500 USD', sub:'High Jewelry Sovereign Asset' },
                  { label:'Pakistan Retail Value', value:'Rs. 700,000+', sub:'Exceeds conventional jewelry categories' },
                ].map((item, i) => (
                  <div key={i} style={{ padding:'clamp(20px,3vw,32px)', background:'rgba(3,3,3,0.8)', border:'1px solid rgba(201,160,84,0.08)' }}>
                    <p style={{ fontSize:6, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:12 }}>{item.label}</p>
                    <p style={{ fontFamily:SERIF, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:300, color:'#c9a054', marginBottom:8 }}>{item.value}</p>
                    <p style={{ fontSize:7, color:'rgba(255,255,255,0.3)' }}>{item.sub}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:28, textAlign:'center' }}>
                <p style={{ fontFamily:SERIF, fontSize:'clamp(14px,2vw,18px)', fontWeight:300, color:'rgba(255,255,255,0.35)', lineHeight:2, fontStyle:'italic' }}>
                  A wearable reserve of gold. A curated collection of natural diamonds.<br/>
                  A future heirloom preserved for generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HIGH JEWELRY ARCHITECTURE ══════════════════════════════════════ */}
        <section style={{ background:'#080604', padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)' }}>
          <div className="r-reveal" style={{ maxWidth:1000, margin:'0 auto' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16, textAlign:'center' }}>The High Jewelry Architecture</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(18px,3vw,36px)', fontWeight:300, color:'#f0ece4', letterSpacing:'0.04em', marginBottom:16, textAlign:'center' }}>This is not ornamentation.</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(18px,3vw,36px)', fontWeight:300, color:'rgba(201,160,84,0.8)', fontStyle:'italic', textAlign:'center', marginBottom:56 }}>This is wearable sovereignty.</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }} className="ring-pay-grid">
              {[
                { label:'Design Language', value:'Royal Tiara Architecture' },
                { label:'Construction Style', value:'Multi-Level Crown Formation' },
                { label:'Visual Identity', value:'Sovereign Feminine Authority' },
                { label:'Inspiration Source', value:'Historical Royal Crowns & Imperial Regalia' },
                { label:'Structural Philosophy', value:'Power Refined Into Elegance' },
                { label:'Mood', value:'Regal · Commanding · Timeless' },
              ].map((row, i) => (
                <div key={i} style={{ padding:'clamp(20px,3vw,32px)', background:'rgba(3,3,3,0.8)', border:'1px solid rgba(201,160,84,0.06)', borderBottom:'1px solid rgba(201,160,84,0.04)' }}>
                  <p style={{ fontSize:6, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:10 }}>{row.label}</p>
                  <p style={{ fontFamily:SERIF, fontSize:'clamp(14px,2vw,20px)', fontWeight:300, color:'rgba(255,255,255,0.7)' }}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GEMOLOGICAL COMPOSITION ══════════════════════════════════════════ */}
        <section style={{ padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)', borderTop:'1px solid rgba(201,160,84,0.05)' }}>
          <div className="r-reveal" style={{ maxWidth:1100, margin:'0 auto' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16, textAlign:'center' }}>Gemological Composition</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(18px,3vw,36px)', fontWeight:300, color:'#f0ece4', textAlign:'center', marginBottom:56 }}>Three Layers of Permanent Value</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:2 }} className="gem-3col">
              {[
                {
                  title: 'Center Stone',
                  subtitle: 'The Sovereign Heart of the Crown',
                  rows: [
                    ['Stone', 'Natural Diamond'],
                    ['Cut', 'Round Brilliant'],
                    ['Carat Weight', '0.50 Carat'],
                    ['Clarity', 'VVS'],
                    ['Color Grade', 'F–G'],
                    ['Light Performance', 'Exceptional Fire & Brilliance'],
                    ['Classification', 'Investment-Grade Natural Diamond'],
                  ]
                },
                {
                  title: 'Crown Diamond Array',
                  subtitle: 'An Endless Circle of Sovereign Radiance',
                  rows: [
                    ['Stone Type', 'Natural Micro-Pavé Diamonds'],
                    ['Total Weight', '0.80 Carat'],
                    ['Setting', 'Hand-Set Under Magnification'],
                    ['Placement', 'Crown Pillars & Royal Borders'],
                    ['Visual Effect', 'Continuous Light Reflection'],
                    ['Total Diamonds', '1.30 Carats Combined'],
                    ['Quality Standard', 'Museum-Grade Natural Stones'],
                  ]
                },
                {
                  title: 'Gold Reserve',
                  subtitle: 'Physical Wealth Preservation',
                  rows: [
                    ['Metal', 'Solid 18K Yellow Gold'],
                    ['Purity', 'Au750 Official Hallmark'],
                    ['Gold Weight', '~5.5 Grams'],
                    ['Construction', 'Hand-Finished High Jewelry'],
                    ['Surface', 'Royal Mirror Polish Finish'],
                    ['Category', 'Precious Metal Asset'],
                    ['Intrinsic Value', 'Gold Spot Price + Craft Premium'],
                  ]
                },
              ].map((col, i) => (
                <div key={i} style={{ background: i === 1 ? 'linear-gradient(180deg,rgba(201,160,84,0.06) 0%,rgba(201,160,84,0.02) 100%)' : '#080604', border: i === 1 ? '1px solid rgba(201,160,84,0.2)' : '1px solid rgba(201,160,84,0.06)', padding:'clamp(28px,4vw,44px)' }}>
                  <p style={{ fontSize:7, letterSpacing:'0.6em', textTransform:'uppercase', color: i === 1 ? '#c9a054' : 'rgba(201,160,84,0.5)', marginBottom:8 }}>{col.title}</p>
                  <p style={{ fontFamily:SERIF, fontSize:'clamp(12px,1.5vw,15px)', fontWeight:300, color:'rgba(255,255,255,0.3)', fontStyle:'italic', marginBottom:28 }}>{col.subtitle}</p>
                  <table className="gem-table" style={{ width:'100%', borderCollapse:'collapse' }}>
                    <tbody>
                      {col.rows.map(([k, v], j) => (
                        <tr key={j}>
                          <td style={{ fontSize:6, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', paddingRight:16, width:'42%' }}>{k}</td>
                          <td style={{ fontSize:'clamp(11px,1.5vw,13px)', color:'rgba(255,255,255,0.65)', fontWeight:300 }}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ THE WEARABLE PRESENCE ══════════════════════════════════════════ */}
        <section style={{ background:'#080604', padding:'clamp(80px,10vw,140px) clamp(24px,10vw,160px)' }}>
          <div className="r-reveal" style={{ maxWidth:720, margin:'0 auto', textAlign:'center' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:40 }}>The Wearable Presence</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(22px,4vw,48px)', fontWeight:300, color:'#f0ece4', lineHeight:1.25, marginBottom:32, letterSpacing:'0.02em' }}>
              The Queen of Taif Crown Ring does not decorate the hand.
            </p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(22px,4vw,48px)', fontWeight:300, color:'rgba(201,160,84,0.8)', fontStyle:'italic', lineHeight:1.25, marginBottom:56 }}>
              It defines it.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                'The center diamond captures attention. The crown architecture commands it. The gold structure preserves it.',
                'Each movement creates flashes of light resembling a royal decree being sealed into history.',
                'Its presence feels unmistakably regal. Confident without excess. Elegant without compromise. Powerful without announcement.',
              ].map((line, i) => (
                <p key={i} style={{ fontFamily:SERIF, fontSize:'clamp(14px,2vw,19px)', fontWeight:300, color:'rgba(255,255,255,0.4)', lineHeight:1.9 }}>{line}</p>
              ))}
            </div>
            <div style={{ width:1, height:60, background:'linear-gradient(to bottom,rgba(201,160,84,0.3),transparent)', margin:'48px auto 0' }} />
            <p style={{ fontFamily:SERIF, fontSize:'clamp(18px,2.8vw,28px)', fontWeight:300, color:'rgba(201,160,84,0.7)', fontStyle:'italic', marginTop:32 }}>
              It feels less like jewelry.<br/>And more like authority forged into matter.
            </p>
          </div>
        </section>

        {/* ══ INVESTMENT ASSET MATRIX ════════════════════════════════════════ */}
        <section style={{ padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)', borderTop:'1px solid rgba(201,160,84,0.05)' }}>
          <div className="r-reveal" style={{ maxWidth:1000, margin:'0 auto' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16 }}>Investment Asset Matrix</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(20px,3.5vw,40px)', fontWeight:300, color:'#f0ece4', marginBottom:56 }}>A New Class of Hard Asset</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }} className="invest-grid">
              {[
                { k:'Asset Category', v:'High Jewelry Sovereign Object' },
                { k:'Intrinsic Value', v:'18K Gold + Natural Diamonds' },
                { k:'Collectibility', v:'Archive Objects Series' },
                { k:'Ownership Structure', v:'Physical Asset + Digital Identity' },
                { k:'Transferability', v:'Generational Heirloom' },
                { k:'Preservation Horizon', v:'Multi-Generational' },
                { k:'Wealth Classification', v:'Luxury Hard Asset' },
                { k:'Legacy Status', v:'Permanent' },
                { k:'Future Significance', v:'Founder-Era Collectible' },
                { k:'Price Point', v:'$2,500 USD / Rs. 700,000+' },
              ].map((row, i) => (
                <div key={i} style={{ padding:'clamp(18px,2.5vw,28px)', background: i % 2 === 0 ? '#080604' : '#060503', border:'1px solid rgba(201,160,84,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:20 }}>
                  <span style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', flexShrink:0 }}>{row.k}</span>
                  <span style={{ fontFamily:SERIF, fontSize:'clamp(13px,1.8vw,17px)', fontWeight:300, color:'rgba(255,255,255,0.65)', textAlign:'right' }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRESENTATION VAULT ════════════════════════════════════════════ */}
        <section style={{ background:'#080604', padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)' }}>
          <div className="r-reveal invest-grid" style={{ maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,80px)', alignItems:'center' }}>
            <div>
              <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16 }}>The Presentation Vault</p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(20px,3vw,36px)', fontWeight:300, color:'#f0ece4', marginBottom:24, lineHeight:1.2 }}>
                Every allocation arrives inside a museum-grade Sovereign Vault.
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(13px,1.8vw,17px)', fontWeight:300, color:'rgba(255,255,255,0.35)', lineHeight:1.8, marginBottom:32 }}>
                Constructed from architectural black hardwood. Finished with royal crimson interiors. Protected through integrated NFC authentication technology.
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(14px,2vw,19px)', fontWeight:300, color:'rgba(201,160,84,0.6)', fontStyle:'italic', marginBottom:32 }}>
                This is not packaging. This is preservation.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  'Founder Authentication Certificate',
                  'Gold Purity Documentation',
                  'Diamond Quality Certification',
                  'Archive Ownership Registry',
                  'Blockchain Registration Identity',
                  'Digital Twin NFT Passport',
                  'Collector Documentation',
                  'Allocation Signature Record',
                  'Archive Preservation Guide',
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ color:'rgba(201,160,84,0.4)', fontSize:10 }}>◆</span>
                    <span style={{ fontSize:8, color:'rgba(255,255,255,0.45)', fontWeight:300, letterSpacing:'0.05em' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:'relative', overflow:'hidden', border:'1px solid rgba(201,160,84,0.1)' }}>
              <img src="/products/queen-of-taif-crown-ring/box.png" alt="Sovereign Vault"
                style={{ width:'100%', display:'block', objectFit:'cover' }}
                onError={(e) => { const t = e.target as HTMLImageElement; if (product.images?.[1]) { t.src = product.images[1] } }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 60%,rgba(8,6,4,0.9) 100%)' }} />
              <div style={{ position:'absolute', bottom:24, left:24 }}>
                <p style={{ fontFamily:SERIF, fontSize:16, fontWeight:300, color:'rgba(201,160,84,0.8)', fontStyle:'italic' }}>The Sovereign Vault</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DIGITAL TWIN — NFT PASSPORT ════════════════════════════════════ */}
        <section style={{ padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)', borderTop:'1px solid rgba(201,160,84,0.05)' }}>
          <div className="r-reveal" style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:56 }}>
              <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16 }}>The Digital Twin</p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(20px,3.5vw,44px)', fontWeight:300, color:'#f0ece4', marginBottom:16 }}>
                Queen of Taif Crown Ring
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(16px,2.5vw,30px)', fontWeight:300, color:'rgba(201,160,84,0.7)', fontStyle:'italic', marginBottom:16 }}>
                Sovereign Passport
              </p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(13px,1.8vw,17px)', fontWeight:300, color:'rgba(255,255,255,0.35)', lineHeight:1.8, maxWidth:600, margin:'0 auto 32px' }}>
                Every authenticated allocation receives a permanent blockchain identity secured on Polygon — certifying authenticity, ownership, diamond provenance, gold registry, serial identity, and collector history.
              </p>
            </div>
            <SovereignPassport />
            {/* Blockchain info */}
            <div style={{ marginTop:2, background:'#060503', border:'1px solid rgba(201,160,84,0.06)', padding:'clamp(24px,4vw,40px)', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:1 }} className="gem-3col">
              {[
                { label:'Contract', value:NFT_CONTRACT, copy:true },
                { label:'Network', value:'Polygon Mainnet' },
                { label:'Blockchain Authentication', value:'Every sovereign creation carries a permanent, irrevocable proof of authenticity — the NFT is your identity, inseparable from the physical artifact.' },
              ].map((row, i) => (
                <div key={i} style={{ padding:'clamp(16px,3vw,28px)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <p style={{ fontSize:6, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:10 }}>{row.label}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <p style={{ fontFamily: i === 0 ? 'monospace' : SERIF, fontSize: i === 2 ? 12 : i === 0 ? 9 : 14, color:'rgba(255,255,255,0.5)', fontWeight:300, lineHeight:1.6, wordBreak:'break-all' as const }}>{row.value}</p>
                    {row.copy && <CopyBtn text={row.value} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOLDER PRIVILEGES ══════════════════════════════════════════════ */}
        <section style={{ background:'#080604', padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)' }}>
          <div className="r-reveal" style={{ maxWidth:900, margin:'0 auto' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16 }}>Holder Privileges</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(20px,3.5vw,42px)', fontWeight:300, color:'#f0ece4', marginBottom:56, lineHeight:1.2 }}>
              Authority does not end with acquisition.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }} className="invest-grid">
              {[
                { title:'Archive Collector Status', desc:'Permanently listed in the Imperial Archive Jewelry Registry — a named sovereign collector.' },
                { title:'Sovereign Vault Access', desc:'Private access to House vault assets, archive releases, and exclusive sovereign inventory.' },
                { title:'Future High Jewelry Allocations', desc:'Priority access to all future Archive Objects and High Jewelry Decrees from the House.' },
                { title:'Private House Invitations', desc:'Exclusive access to ceremonial unveilings, jewelry auctions, and founder-only events.' },
                { title:'Priority Authentication Services', desc:'Lifetime NFC + blockchain verification and re-authentication service, always free.' },
                { title:'Concierge Restoration Program', desc:'Expert jewelry care, cleaning, stone tightening, and mirror polish restoration.' },
                { title:'Lifetime Provenance Protection', desc:'Permanent blockchain provenance and legal ownership documentation — generational transfer ready.' },
                { title:'Founder Allocation Status', desc:'Recognized as a Founding Collector of the Queen of Taif Crown Ring — the inaugural High Jewelry Decree.' },
                { title:'Legacy Registry Membership', desc:'Named entry in the multi-generational Sovereign Legacy Registry of the House.' },
                { title:'Early Access To Future Archive Objects', desc:'First right of refusal on all future Archive Object allocations before public access.' },
              ].map((priv, i) => (
                <div key={i} style={{ padding:'clamp(20px,3vw,32px)', background:'rgba(3,3,3,0.6)', border:'1px solid rgba(201,160,84,0.07)', borderLeft: i % 2 === 0 ? '2px solid rgba(201,160,84,0.25)' : '1px solid rgba(201,160,84,0.07)' }}>
                  <p style={{ fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(201,160,84,0.6)', marginBottom:10 }}>{priv.title}</p>
                  <p style={{ fontFamily:SERIF, fontSize:'clamp(12px,1.6vw,15px)', fontWeight:300, color:'rgba(255,255,255,0.35)', lineHeight:1.8 }}>{priv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRODUCT IDENTITY ══════════════════════════════════════════════ */}
        <section style={{ padding:'clamp(60px,8vw,100px) clamp(24px,8vw,120px)', borderTop:'1px solid rgba(201,160,84,0.05)' }}>
          <div className="r-reveal" style={{ maxWidth:800, margin:'0 auto' }}>
            <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:40 }}>Product Identity</p>
            <table className="gem-table" style={{ width:'100%', borderCollapse:'collapse' }}>
              <tbody>
                {[
                  ['Product Name', 'QUEEN OF TAIF CROWN RING'],
                  ['Object Title', 'The Royal Tiara Masterpiece'],
                  ['Collection', 'The Archive Objects'],
                  ['Classification', 'High Jewelry Sovereign Asset'],
                  ['Allocation Type', 'Sovereign Archive Allocation · Object I'],
                  ['Authentication', 'Polygon Verified'],
                  ['NFT Pairing', 'Enabled — Founder Archive Edition'],
                  ['Serial Registry', 'Dynamic — Non-Replicable'],
                  ['Production Status', 'Ultra-Limited Founder Batch'],
                  ['Price', '$2,500 USD / Rs. 700,000+'],
                ].map(([k, v], i) => (
                  <tr key={i}>
                    <td style={{ fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', paddingRight:32, width:'35%' }}>{k}</td>
                    <td style={{ fontFamily:SERIF, fontSize:'clamp(13px,1.8vw,18px)', fontWeight:300, color:'rgba(255,255,255,0.65)' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══ ACQUIRE ════════════════════════════════════════════════════════ */}
        <section id="acquire" style={{ background:'linear-gradient(180deg,#060503 0%,#030303 100%)', padding:'clamp(80px,10vw,140px) clamp(24px,8vw,120px)' }}>
          <div className="r-reveal" style={{ maxWidth:900, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <p style={{ fontSize:7, letterSpacing:'0.8em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16 }}>Acquire Sovereign Ownership</p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(24px,4.5vw,52px)', fontWeight:300, color:'#f0ece4', marginBottom:16, lineHeight:1.2 }}>Queen of Taif Crown Ring</p>
              <p style={{ fontFamily:SERIF, fontSize:'clamp(18px,3vw,36px)', fontWeight:300, color:'rgba(201,160,84,0.8)', fontStyle:'italic', marginBottom:32 }}>
                $2,500 · {quantity > 1 ? `Total: $${(priceUsd * quantity).toLocaleString()}` : 'Founder Archive Allocation'}
              </p>
              {/* Quantity */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:20, marginBottom:32 }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width:36, height:36, border:'1px solid rgba(201,160,84,0.2)', background:'none', color:'#c9a054', fontSize:20, cursor:'pointer' }}>−</button>
                <span style={{ fontFamily:SERIF, fontSize:28, fontWeight:300, color:'#f0ece4', minWidth:40, textAlign:'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ width:36, height:36, border:'1px solid rgba(201,160,84,0.2)', background:'none', color:'#c9a054', fontSize:20, cursor:'pointer' }}>+</button>
              </div>
            </div>

            {/* Payment method selector */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:2, marginBottom:32 }} className="gem-3col">
              {([['crypto','Crypto / Web3'],['pkr_manual','Bank / EasyPaisa'],['cod','Cash on Delivery']] as [PayMethod,string][]).map(([m, label]) => (
                <button key={m} onClick={() => setPayMethod(m)}
                  style={{ padding:'clamp(14px,2vw,20px)', border: payMethod === m ? '1px solid rgba(201,160,84,0.4)' : '1px solid rgba(255,255,255,0.06)', background: payMethod === m ? 'rgba(201,160,84,0.06)' : 'rgba(3,3,3,0.6)', color: payMethod === m ? '#c9a054' : 'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase' as const, fontFamily:'inherit', transition:'all 0.3s' }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Payment panels */}
            <AnimatePresence mode="wait">
              <motion.div key={payMethod} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}
                style={{ background:'rgba(8,6,4,0.8)', border:'1px solid rgba(201,160,84,0.08)', padding:'clamp(28px,4vw,48px)' }}>
                {payMethod === 'crypto' && (
                  <Web3PaySection
                    amountUsd={priceUsd * quantity}
                    merchantWallet={MERCHANT_WALLET}
                    onSuccess={handleWeb3Success}
                  />
                )}
                {payMethod === 'pkr_manual' && (
                  <div>
                    <p style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.5)', marginBottom:24 }}>Bank Transfer / EasyPaisa</p>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginBottom:24 }} className="ring-pay-grid">
                      <div style={{ padding:'clamp(16px,3vw,24px)', background:'rgba(3,3,3,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:8 }}>EasyPaisa</p>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <p style={{ fontFamily:SERIF, fontSize:18, color:'rgba(255,255,255,0.6)' }}>{EASYPAISA_NUMBER}</p>
                          <CopyBtn text={EASYPAISA_NUMBER} />
                        </div>
                        <p style={{ fontSize:7, color:'rgba(255,255,255,0.2)', marginTop:4 }}>{EASYPAISA_NAME}</p>
                      </div>
                      <div style={{ padding:'clamp(16px,3vw,24px)', background:'rgba(3,3,3,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:8 }}>UBL Bank (IBAN)</p>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <p style={{ fontFamily:'monospace', fontSize:9, color:'rgba(255,255,255,0.6)', wordBreak:'break-all' as const }}>{UBL_IBAN}</p>
                          <CopyBtn text={UBL_IBAN} />
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom:16 }}>
                      <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:8 }}>Transaction ID (optional)</p>
                      <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Enter your transaction ID"
                        style={{ width:'100%', boxSizing:'border-box' as const, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.6)', padding:'10px 14px', fontSize:13, outline:'none', fontFamily:'inherit' }} />
                    </div>
                    {/* Upload proof */}
                    <div style={{ marginBottom:20 }}>
                      <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:8 }}>Payment Proof</p>
                      <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', border:'1px dashed rgba(201,160,84,0.15)', padding:'16px 20px', color:'rgba(201,160,84,0.4)' }}>
                        <Upload size={14} />
                        <span style={{ fontSize:7, letterSpacing:'0.3em', textTransform:'uppercase' }}>{proofFile ? proofFile.name : 'Upload Screenshot'}</span>
                        <input type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (f) { setProofFile(f); setProofPreview(URL.createObjectURL(f)) } }} />
                      </label>
                      {proofPreview && <img src={proofPreview} alt="proof" style={{ marginTop:8, maxHeight:100, objectFit:'contain', opacity:0.6 }} />}
                    </div>
                    {addressFields}
                    {orderError && <p style={{ color:'rgba(255,100,100,0.7)', fontSize:9, marginTop:12 }}>{orderError}</p>}
                    <button onClick={handlePkrSubmit} disabled={submitting}
                      style={{ marginTop:20, width:'100%', padding:'16px', background:'#c9a054', color:'#030303', border:'none', cursor:submitting ? 'wait' : 'pointer', fontSize:7, letterSpacing:'0.6em', textTransform:'uppercase' as const, fontFamily:'inherit' }}>
                      {submitting ? 'Processing...' : 'Authenticate Sovereign Archive Passport'}
                    </button>
                  </div>
                )}
                {payMethod === 'cod' && (
                  <div>
                    <p style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.5)', marginBottom:24 }}>Cash on Delivery</p>
                    <p style={{ fontFamily:SERIF, fontSize:15, color:'rgba(255,255,255,0.35)', lineHeight:1.8, marginBottom:24 }}>
                      Pay upon receiving your Sovereign Vault. Available within Pakistan for verified sovereign collectors.
                    </p>
                    {addressFields}
                    {orderError && <p style={{ color:'rgba(255,100,100,0.7)', fontSize:9, marginTop:12 }}>{orderError}</p>}
                    <button onClick={handleCodSubmit} disabled={submitting}
                      style={{ marginTop:20, width:'100%', padding:'16px', background:'rgba(201,160,84,0.1)', color:'#c9a054', border:'1px solid rgba(201,160,84,0.25)', cursor:submitting ? 'wait' : 'pointer', fontSize:7, letterSpacing:'0.6em', textTransform:'uppercase' as const, fontFamily:'inherit' }}>
                      {submitting ? 'Processing...' : 'Enter The Sovereign Vault'}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══ FINAL POSITIONING ══════════════════════════════════════════════ */}
        <section style={{ padding:'clamp(80px,12vw,160px) clamp(24px,10vw,160px)', borderTop:'1px solid rgba(201,160,84,0.05)', textAlign:'center' }}>
          <div className="r-reveal">
            <div style={{ width:1, height:60, background:'linear-gradient(to bottom,rgba(201,160,84,0.3),transparent)', margin:'0 auto 48px' }} />
            <p style={{ fontFamily:SERIF, fontSize:'clamp(18px,3vw,38px)', fontWeight:300, color:'rgba(255,255,255,0.5)', lineHeight:2 }}>Queen of Taif Crown Ring is not jewelry.</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(20px,3.5vw,46px)', fontWeight:300, color:'#c9a054', fontStyle:'italic', lineHeight:1.6 }}>It is a sovereign asset.</p>
            <p style={{ fontFamily:SERIF, fontSize:'clamp(14px,2.2vw,24px)', fontWeight:300, color:'rgba(255,255,255,0.35)', lineHeight:2, marginTop:24 }}>
              A collectible High Jewelry artifact.<br/>
              A blockchain-authenticated heirloom.<br/>
              A physical reserve of gold, diamonds, ownership, and legacy.
            </p>
            <div style={{ width:80, height:1, background:'linear-gradient(to right,transparent,#c9a054,transparent)', margin:'48px auto' }} />
            <p style={{ fontFamily:SERIF, fontSize:'clamp(16px,2.5vw,28px)', fontWeight:300, color:'rgba(201,160,84,0.6)', fontStyle:'italic' }}>
              Where craftsmanship, wealth preservation, provenance, prestige,<br/>and feminine authority become one eternal crown.
            </p>
            <div style={{ marginTop:56, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
              <a href="#acquire"
                style={{ fontSize:7, letterSpacing:'0.7em', textTransform:'uppercase', color:'#030303', background:'#c9a054', padding:'18px 56px', textDecoration:'none' }}>
                Acquire Sovereign Ownership
              </a>
              <a href="#acquire" style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', padding:'14px 40px', border:'1px solid rgba(201,160,84,0.15)', textDecoration:'none' }}>Authenticate Archive Passport</a>
              <Link href="/shop" style={{ fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.15)', textDecoration:'none', marginTop:8 }}>Return to Archive</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }
  