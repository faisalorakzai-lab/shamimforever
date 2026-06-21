'use client'

  import { useEffect, useRef, useState, useCallback } from 'react'
  import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
  import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
  import { Copy, Check, Upload, X, ChevronDown, Shield, Gem, Crown } from 'lucide-react'
  import { formatPKR } from '@/lib/utils'
  import type { Product } from '@/types'
  import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
  import { useAccount } from 'wagmi'

  type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
  interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

  const NFT_CONTRACT    = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
  const MERCHANT_WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
  const EASYPAISA_NUMBER = '03367970004'
  const EASYPAISA_NAME   = 'M Faisal'
  const UBL_IBAN         = 'PK13UNIL0109000318870498'
  const SERIF   = "'Cormorant Garamond', Georgia, serif"
  const MONO    = "'Courier New', Courier, monospace"
  const GOLD    = '#c9a054'
  const GOLD2   = '#e8c97a'
  const RUBY    = '#C41E3A'
  const EMERALD = '#1A6B4A'
  const EM2     = '#2EA87A'

  const PAGE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
    html{scroll-behavior:smooth}
    .ev-reveal{opacity:0;transform:translateY(44px);filter:blur(5px)}
    .ev-reveal.vis{opacity:1;transform:translateY(0);filter:blur(0);transition:opacity 1.1s cubic-bezier(.22,1,.36,1),transform 1.1s cubic-bezier(.22,1,.36,1),filter 1.1s cubic-bezier(.22,1,.36,1)}
    .gem-row td{padding:13px 0;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:top}
    .gem-row tr:last-child td{border-bottom:none}
    .imperial-holo::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(196,30,58,0.12) 0%,rgba(201,160,84,0.1) 30%,transparent 60%,rgba(26,107,74,0.08) 100%);animation:imperial 5s ease-in-out infinite alternate;pointer-events:none;border-radius:inherit;z-index:1}
    @keyframes imperial{0%{opacity:.4;transform:rotate(0deg)}100%{opacity:1;transform:rotate(1.5deg)}}
    .scanline{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(201,160,84,.6),transparent);animation:scan 3.5s ease-in-out infinite;pointer-events:none;z-index:5}
    @keyframes scan{0%{top:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{top:100%;opacity:0}}
    .term-cursor{display:inline-block;width:8px;height:14px;background:#c9a054;animation:blink .9s step-end infinite;vertical-align:middle;margin-left:4px}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    .priv-row{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.04)}
    .priv-row:last-child{border-bottom:none}
    .piece-card{border:1px solid rgba(201,160,84,0.14);padding:28px 24px;background:rgba(201,160,84,0.025);transition:border-color .4s,background .4s}
    .piece-card:hover{border-color:rgba(201,160,84,0.35);background:rgba(201,160,84,0.055)}
    @media(max-width:768px){
      .ev-hero-grid{grid-template-columns:1fr!important;text-align:center!important}
      .ev-gem-grid{grid-template-columns:1fr!important}
      .ev-nft-grid{grid-template-columns:1fr!important}
      .ev-invest-grid{grid-template-columns:1fr 1fr!important}
      .ev-pay-grid{grid-template-columns:1fr 1fr!important}
      .ev-chest-grid{grid-template-columns:1fr!important}
      .ev-five-grid{grid-template-columns:1fr 1fr!important}
    }
  `

  function CopyBtn({ text }: { text: string }) {
    const [c, setC] = useState(false)
    return (
      <button onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
        style={{ display:'flex', alignItems:'center', gap:6, color:GOLD, background:'none', border:'none', cursor:'pointer' }}>
        {c ? <Check size={10}/> : <Copy size={10}/>}
        <span style={{ fontSize:7, letterSpacing:'0.3em', textTransform:'uppercase' as const }}>{c ? 'Copied' : 'Copy'}</span>
      </button>
    )
  }

  function ImperialDust({ n = 60 }: { n?: number }) {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
      const canvas = ref.current; if (!canvas) return
      const ctx = canvas.getContext('2d')!
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
      resize(); window.addEventListener('resize', resize)
      const colors = ['rgba(201,160,84,', 'rgba(196,30,58,', 'rgba(46,168,122,']
      const pts = Array.from({ length: n }, () => ({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.8 + 0.3, vy: -(Math.random() * 0.15 + 0.04),
        vx: (Math.random() - 0.5) * 0.06, a: Math.random(),
        va: (Math.random() - 0.5) * 0.005, col: colors[Math.floor(Math.random() * 3)],
      }))
      let raf: number
      const tick = () => {
        const W = canvas.width, H = canvas.height
        ctx.clearRect(0, 0, W, H)
        pts.forEach(p => {
          p.x += p.vx / W; p.y += p.vy / H; p.a += p.va
          if (p.a <= 0 || p.a >= 1) p.va *= -1
          if (p.y < 0) { p.y = 1; p.x = Math.random() }
          ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
          ctx.fillStyle = p.col + (p.a * 0.5) + ')'; ctx.fill()
        })
        raf = requestAnimationFrame(tick)
      }
      tick()
      return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [n])
    return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
  }

  function CrownEngine() {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
      const canvas = ref.current; if (!canvas) return
      const ctx = canvas.getContext('2d')!
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
      resize(); window.addEventListener('resize', resize)
      let t = 0
      const rays = Array.from({ length: 18 }, (_, i) => ({
        angle: (i / 18) * Math.PI * 2, speed: 0.002 + Math.random() * 0.004,
        len: 120 + Math.random() * 200, w: 1 + Math.random() * 2.8, phase: Math.random() * Math.PI * 2,
        col: ['rgba(196,30,58,', 'rgba(201,160,84,', 'rgba(46,168,122,'][Math.floor(Math.random() * 3)],
      }))
      const sparks = Array.from({ length: 50 }, () => ({
        x: Math.random(), y: Math.random(), life: Math.random(),
        spd: 0.003 + Math.random() * 0.008, sz: 0.5 + Math.random() * 2,
        col: ['rgba(196,30,58,', 'rgba(232,201,122,', 'rgba(46,168,122,'][Math.floor(Math.random() * 3)],
      }))
      let raf: number
      const draw = () => {
        t++
        const W = canvas.width, H = canvas.height, cx = W / 2, cy = H * 0.42
        ctx.clearRect(0, 0, W, H)
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W,H) * 0.4)
        grd.addColorStop(0, 'rgba(196,30,58,0.06)'); grd.addColorStop(0.5, 'rgba(201,160,84,0.04)'); grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H)
        rays.forEach(r => {
          const a = r.angle + t * r.speed
          const pulse = Math.sin(t * 0.03 + r.phase) * 0.5 + 0.5
          const x2 = cx + Math.cos(a) * r.len * (0.6 + pulse * 0.5)
          const y2 = cy + Math.sin(a) * r.len * (0.6 + pulse * 0.5)
          const g = ctx.createLinearGradient(cx, cy, x2, y2)
          g.addColorStop(0, r.col + (pulse * 0.45) + ')'); g.addColorStop(1, r.col + '0)')
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2)
          ctx.strokeStyle = g; ctx.lineWidth = r.w * pulse; ctx.stroke()
        })
        sparks.forEach(s => {
          s.life = (s.life + s.spd) % 1
          const sx = s.x * W, sy = s.y * H, al = Math.sin(s.life * Math.PI)
          ctx.beginPath(); ctx.arc(sx, sy, s.sz * al, 0, Math.PI * 2)
          ctx.fillStyle = s.col + (al * 0.7) + ')'; ctx.fill()
        })
        raf = requestAnimationFrame(draw)
      }
      draw()
      return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [])
    return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:6 }} />
  }

  function GemGauge({ label, value, pct, color = GOLD, delay = 0 }: { label: string; value: string; pct: number; color?: string; delay?: number }) {
    const [go, setGo] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setTimeout(() => setGo(true), delay) }, { threshold: 0.3 })
      if (ref.current) obs.observe(ref.current)
      return () => obs.disconnect()
    }, [delay])
    const R = 40, circ = 2 * Math.PI * R
    const gradId = 'gg-' + label.replace(/\s/g, '')
    return (
      <div ref={ref} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
        <svg width={96} height={96} style={{ transform:'rotate(-90deg)' }}>
          <circle cx={48} cy={48} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={2.5}/>
          <circle cx={48} cy={48} r={R} fill="none" stroke={'url(#' + gradId + ')'} strokeWidth={2.5}
            strokeDasharray={circ} strokeDashoffset={go ? circ * (1 - pct) : circ} strokeLinecap="round"
            style={{ transition: go ? '1.8s cubic-bezier(.22,1,.36,1)' : 'none' }}/>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.6"/>
              <stop offset="100%" stopColor={color}/>
            </linearGradient>
          </defs>
          <text x={48} y={48} textAnchor="middle" dominantBaseline="middle" fill={color}
            style={{ fontFamily: SERIF, fontSize:12, fontWeight:300, transform:'rotate(90deg)', transformOrigin:'48px 48px' }}>
            {value}
          </text>
        </svg>
        <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.32em', textTransform:'uppercase' as const, color:'rgba(255,255,255,0.3)', textAlign:'center' }}>{label}</div>
      </div>
    )
  }

  function TermRow({ label, value, gold, delay = 0 }: { label: string; value: string; gold?: boolean; delay?: number }) {
    const [show, setShow] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setTimeout(() => setShow(true), delay) }, { threshold: 0.05 })
      if (ref.current) obs.observe(ref.current)
      return () => obs.disconnect()
    }, [delay])
    return (
      <div ref={ref} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-14px)', transition:'opacity .5s ease, transform .5s ease' }}>
        <span style={{ fontFamily:MONO, fontSize:8.5, letterSpacing:'0.16em', color:'rgba(255,255,255,0.26)', textTransform:'uppercase' as const }}>{label}</span>
        <span style={{ fontFamily: gold ? SERIF : MONO, fontSize: gold ? 15 : 10, color: gold ? GOLD2 : 'rgba(201,160,84,0.62)', letterSpacing: gold ? '0.04em' : '0.16em', fontWeight: gold ? 300 : 400 }}>{value}</span>
      </div>
    )
  }

  function Divider() {
    return (
      <div style={{ display:'flex', alignItems:'center', gap:16, maxWidth:600, margin:'0 auto', padding:'0 40px' }}>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(196,30,58,0.25),rgba(201,160,84,0.3))' }}/>
        <div style={{ width:6, height:6, background:RUBY, transform:'rotate(45deg)', opacity:0.6 }}/>
        <div style={{ width:4, height:4, background:GOLD, transform:'rotate(45deg)', opacity:0.4, margin:'0 4px' }}/>
        <div style={{ width:6, height:6, background:EMERALD, transform:'rotate(45deg)', opacity:0.6 }}/>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(201,160,84,0.3),rgba(26,107,74,0.25),transparent)' }}/>
      </div>
    )
  }

  export default function EmpressSovereignVaultPage({ product }: { product: Product }) {
    const [payMethod, setPayMethod] = useState<PayMethod>('crypto')
    const [receipt, setReceipt]     = useState<File | null>(null)
    const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
    const [submitting, setSubmitting]   = useState(false)
    const { addItem } = useCart()
  const [error, setError]             = useState('')
  const [custMessage, setCustMessage] = useState('')
  const [walletAdded, setWalletAdded]   = useState(false)
    const [shipping, setShipping] = useState({ name:'', phone:'', address:'', city:'', note:'' })
    const { address: walletAddr } = useAccount()
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start','end start'] })
    const heroY  = useTransform(scrollYProgress, [0,1], ['0%','28%'])
    const heroOp = useTransform(scrollYProgress, [0,0.65], [1, 0])

    const story = (() => {
      try { return typeof product.story === 'string' ? JSON.parse(product.story) : (product.story || {}) } catch { return {} }
    })()
    const nft    = story.nft    || {}
    const chest  = story.imperial_chest || {}
    const invest = story.investment_matrix || {}
    const arch   = story.architecture || {}
    const gems   = story.gemstone_treasury || {}
    const gold   = story.gold_specs || {}
    const imgs = product.images || []
    const heroImg = imgs[0] || '/products/empress-sovereign-vault/empress-hero.png'
    const fivePieces: string[] = Array.isArray(story.five_piece_masterwork) ? story.five_piece_masterwork : [
      'Royal Choker Necklace','Pair Of Imperial Jhumka Earrings','Empress Maang Tikka','Rigid Sovereign Cuff Bracelet','Empress Crown Ring'
    ]
    const nftPrivs: string[] = Array.isArray(nft.holder_privileges) ? nft.holder_privileges : [
      'Founder Archive Status','Private House Access','Future Archive Allocations','Collector Registry Recognition',
      'Lifetime Provenance Protection','Priority Authentication Services','White-Glove Concierge Support',
      'Private House Ceremonies','Heritage Transfer Assistance','Archive Preservation Services','Early Access To Future Sovereign Objects'
    ]
    const pieceMeta = [
      { icon:'\u{1F451}', color: GOLD2 }, { icon:'\u{1F48E}', color: RUBY }, { icon:'\u2726', color: EM2 },
      { icon:'\u269C', color: GOLD }, { icon:'\u{1F48D}', color: RUBY },
    ]

    useEffect(() => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } })
      }, { threshold: 0.1 })
      document.querySelectorAll('.ev-reveal').forEach(el => obs.observe(el))
      return () => obs.disconnect()
    }, [])

    const handleCryptoSuccess = useCallback(async (txHash: string, coin: CoinType) => {
      setSubmitting(true); setError('')
      try {
        const f = new FormData()
        Object.entries(shipping).forEach(([k,v]) => f.append(k,v))
        f.append('product_id', product.id); f.append('quantity','1')
        f.append('payment_method', coin.toLowerCase()); f.append('tx_hash', txHash)
        const r = await fetch('/api/orders', { method:'POST', body:f })
        const d = await r.json()
        if (!r.ok) throw new Error(d.error||'Order failed')
        setOrderResult(d)
      } catch(e:any) { setError(e.message) } finally { setSubmitting(false) }
    }, [shipping, product.id])

    const handleManual = useCallback(async () => {
      if (!receipt) { setError('Please upload payment receipt'); return }
      setSubmitting(true); setError('')
      try {
        const f = new FormData()
        Object.entries(shipping).forEach(([k,v]) => f.append(k,v))
        f.append('product_id', product.id); f.append('quantity','1')
        f.append('payment_method','easypaisa'); f.append('receipt',receipt)
        const r = await fetch('/api/orders', { method:'POST', body:f })
        const d = await r.json()
        if (!r.ok) throw new Error(d.error||'Order failed')
        setOrderResult(d)
      } catch(e:any) { setError(e.message) } finally { setSubmitting(false) }
    }, [receipt, shipping, product.id])

    const handleCOD = useCallback(async () => {
      setSubmitting(true); setError('')
      try {
        const f = new FormData()
        Object.entries(shipping).forEach(([k,v]) => f.append(k,v))
        f.append('product_id', product.id); f.append('quantity','1'); f.append('payment_method','cod')
        const r = await fetch('/api/orders', { method:'POST', body:f })
        const d = await r.json()
        if (!r.ok) throw new Error(d.error||'Order failed')
        setOrderResult(d)
      } catch(e:any) { setError(e.message) } finally { setSubmitting(false) }
    }, [shipping, product.id])

    const inputSt: React.CSSProperties = {
      width:'100%', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,160,84,0.13)',
      color:'#fff', padding:'14px 18px', fontSize:12, letterSpacing:'0.07em', fontFamily:SERIF,
      outline:'none', boxSizing:'border-box' as const,
    }

    return (
      <>
        <style>{PAGE_CSS}</style>

        <div ref={heroRef} style={{ position:'relative', minHeight:'100vh', background:'#030303', overflow:'hidden', display:'flex', alignItems:'center' }}>
          <ImperialDust n={90}/>
          <CrownEngine/>
          <motion.div style={{ position:'absolute', inset:0, y: heroY, opacity: heroOp }}>
            <img src={heroImg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.16) saturate(0.5)', transform:'scale(1.1)' }}/>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 55% 45%,rgba(196,30,58,0.1) 0%,rgba(201,160,84,0.07) 30%,rgba(3,3,3,0.85) 65%,#030303 100%)' }}/>
          </motion.div>

          <Link href="/shop" style={{ position:'absolute', top:32, left:40, zIndex:30, fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', textDecoration:'none', border:'1px solid rgba(201,160,84,0.1)', padding:'10px 22px', backdropFilter:'blur(12px)', background:'rgba(0,0,0,0.45)' }}>
            ← Archive
          </Link>

          <div className="ev-hero-grid" style={{ position:'relative', zIndex:20, width:'100%', maxWidth:1380, margin:'0 auto', padding:'130px 60px 90px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:1.6, ease:[0.22,1,0.36,1] }}>
              <div style={{ position:'relative', overflow:'hidden', border:'1px solid rgba(196,30,58,0.25)', background:'rgba(196,30,58,0.02)' }}>
                <img src={heroImg} alt="Empress Sovereign Vault" style={{ width:'100%', display:'block', maxHeight:560, objectFit:'cover' }}/>
                <div className="scanline"/>
                {[
                  { top:0, left:0, borderWidth:'2px 0 0 2px', borderColor:'rgba(196,30,58,0.6)' },
                  { top:0, right:0, borderWidth:'2px 2px 0 0', borderColor:'rgba(201,160,84,0.5)' },
                  { bottom:0, left:0, borderWidth:'0 0 2px 2px', borderColor:'rgba(201,160,84,0.5)' },
                  { bottom:0, right:0, borderWidth:'0 2px 2px 0', borderColor:'rgba(26,107,74,0.6)' },
                ].map((s,i) => (
                  <div key={i} style={{ position:'absolute', width:26, height:26, borderStyle:'solid', ...s }}/>
                ))}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(3,3,3,0.5),transparent 50%)' }}/>
                <div style={{ position:'absolute', top:16, right:16, background:'rgba(196,30,58,0.9)', border:'1px solid rgba(196,30,58,0.6)', padding:'6px 14px', backdropFilter:'blur(8px)' }}>
                  <span style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.3em', color:'#fff', textTransform:'uppercase' }}>25 WORLDWIDE</span>
                </div>
              </div>
              <div style={{ background:'rgba(3,3,3,0.94)', border:'1px solid rgba(201,160,84,0.22)', padding:'9px 24px', display:'flex', alignItems:'center', gap:10, justifyContent:'center' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#00ff9d', boxShadow:'0 0 8px #00ff9d', flexShrink:0 }}/>
                <span style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.25em', color:'rgba(201,160,84,0.72)', textTransform:'uppercase' }}>Polygon Verified · NFT Authenticated · 01/25</span>
              </div>
            </motion.div>

            <div>
              <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:.28 }}
                style={{ fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(196,30,58,0.7)', marginBottom:14, fontFamily:MONO }}>
                The Archive Objects · Chapter IV
              </motion.div>
              <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:.36 }}
                style={{ fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:20, fontFamily:MONO }}>
                Strictly Limited To 25 Allocations Worldwide
              </motion.div>
              <motion.h1 initial={{ opacity:0,y:28 }} animate={{ opacity:1,y:0 }} transition={{ duration:1.2,delay:.44,ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SERIF, fontSize:'clamp(32px,4vw,58px)', fontWeight:300, letterSpacing:'0.06em', lineHeight:1.08, color:'#fff', margin:'0 0 6px' }}>
                Empress Sovereign
              </motion.h1>
              <motion.h1 initial={{ opacity:0,y:28 }} animate={{ opacity:1,y:0 }} transition={{ duration:1.2,delay:.58,ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SERIF, fontSize:'clamp(24px,3.2vw,44px)', fontWeight:300, letterSpacing:'0.08em', lineHeight:1.08, color:RUBY, margin:'0 0 28px', fontStyle:'italic' }}>
                Vault
              </motion.h1>
              <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1,delay:.7 }}
                style={{ width:60, height:1, background:'linear-gradient(90deg,' + RUBY + ',transparent)', marginBottom:28, transformOrigin:'left' }}/>
              <motion.p initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:.8 }}
                style={{ fontFamily:SERIF, fontSize:15, fontWeight:300, color:'rgba(255,255,255,0.48)', lineHeight:1.85, marginBottom:32 }}>
                {story.tagline || 'A museum-grade sovereign treasury crafted from 22K gold, natural emeralds, Burmese rubies, and natural diamonds — engineered as a generational heirloom and blockchain-authenticated archive.'}
              </motion.p>
              <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:1 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:8 }}>
                  <span style={{ fontFamily:SERIF, fontSize:'clamp(28px,3.5vw,48px)', fontWeight:300, color:GOLD2 }}>$150,000</span>
                  <span style={{ fontSize:8, letterSpacing:'0.35em', color:'rgba(201,160,84,0.4)', textTransform:'uppercase', fontFamily:MONO }}>USD</span>
                </div>
                <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.28em', color:'rgba(255,255,255,0.2)', marginBottom:32 }}>
                  Rs {formatPKR(42000000)} PKR · Private VVIP Allocation
                </div>
              </motion.div>
              <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:1.12 }}
                style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:40 }}>
                {[['22K Gold','Au916'],['Colombian','Emeralds'],['Burmese','Rubies'],['VVS','Diamonds'],['5-Piece','Treasury'],['25','Worldwide']].map(([v,l]) => (
                  <div key={l} style={{ border:'1px solid rgba(196,30,58,0.25)', padding:'8px 14px' }}>
                    <div style={{ fontFamily:SERIF, fontSize:14, fontWeight:300, color:GOLD, lineHeight:1 }}>{v}</div>
                    <div style={{ fontFamily:MONO, fontSize:6, letterSpacing:'0.28em', color:'rgba(255,255,255,0.25)', textTransform:'uppercase', marginTop:3 }}>{l}</div>
                  </div>
                ))}
              </motion.div>
              <motion.a href="#acquire" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:1.3 }}
                style={{ display:'inline-flex', alignItems:'center', gap:14, background:'linear-gradient(135deg,rgba(196,30,58,0.18),rgba(201,160,84,0.06))', border:'1px solid ' + RUBY, color:GOLD2, padding:'18px 40px', fontSize:9, letterSpacing:'0.42em', textTransform:'uppercase', textDecoration:'none', fontFamily:MONO }}>
                <Crown size={14}/> Request VVIP Allocation
              </motion.a>
            </div>
          </div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
            style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:20 }}>
            <span style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.4em', color:'rgba(201,160,84,0.28)', textTransform:'uppercase' }}>Scroll to Discover the Archive</span>
            <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}>
              <ChevronDown size={15} color="rgba(201,160,84,0.28)"/>
            </motion.div>
          </motion.div>
        </div>

        <div style={{ background:'#030303', padding:'110px 40px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <ImperialDust n={20}/>
          <div style={{ maxWidth:880, margin:'0 auto', position:'relative', zIndex:2 }}>
            <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(196,30,58,0.5)', marginBottom:48 }}>The Legacy Statement</div>
            {(story.legacy_statement || 'Queens sit on thrones for a season. An Empress archives her empire forever. Civilizations rise. Dynasties expand. Fortunes change hands. Yet only a handful of objects survive long enough to become history itself.').split('. ').filter(Boolean).map((s:string, i:number) => (
              <motion.p key={i} initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:1.2, delay:i*0.1, ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SERIF, fontSize:'clamp(18px,2.5vw,30px)', fontWeight:300, lineHeight:1.65, color:'rgba(255,255,255,' + Math.max(0.2, 0.92-i*0.08) + ')', marginBottom:10 }}>
                {s.trim()}.
              </motion.p>
            ))}
          </div>
        </div>

        <Divider/>

        <div style={{ background:'linear-gradient(180deg,#030303,#06020a)', padding:'100px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:960, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:1 }} style={{ marginBottom:60 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(196,30,58,0.5)', marginBottom:16 }}>Archive Chapter</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', marginBottom:36 }}>
                {(story.chapter && story.chapter.title) || 'Chapter IV — The Archive of Eternity'}
              </h2>
              <div style={{ width:50, height:1, background:'linear-gradient(90deg,' + RUBY + ',transparent)', marginBottom:36 }}/>
              {((story.chapter && story.chapter.content) || 'Most luxury objects are acquired. Few are inherited. Fewer still are remembered.').split('. ').filter(Boolean).map((s:string,i:number) => (
                <motion.p key={i} initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }}
                  transition={{ duration:.8, delay:i*0.08 }}
                  style={{ fontFamily:SERIF, fontSize:17, fontWeight:300, color:'rgba(255,255,255,' + Math.max(0.28, 0.7-i*0.05) + ')', lineHeight:1.82, marginBottom:6 }}>
                  {s.trim()}.
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>

        <Divider/>

        <div style={{ background:'#030303', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:72 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>The Five-Piece Masterwork</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(24px,3.5vw,48px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em' }}>Included Within Every Sovereign Vault</h2>
            </motion.div>
            <div className="ev-five-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12 }}>
              {fivePieces.map((piece, i) => (
                <motion.div key={i} initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
                  transition={{ duration:.8, delay:i*0.12 }} className="piece-card">
                  <div style={{ fontFamily:SERIF, fontSize:28, marginBottom:16, opacity:0.8 }}>
                    {['\u{1F451}','\u{1F48E}','\u2726','\u269C','\u{1F48D}'][i]}
                  </div>
                  <div style={{ fontFamily:SERIF, fontSize:15, fontWeight:300, color:'rgba(255,255,255,0.82)', lineHeight:1.5, marginBottom:12 }}>{piece}</div>
                  <div style={{ height:1, background:'linear-gradient(90deg,' + ([GOLD2,RUBY,EM2,GOLD,RUBY][i]||GOLD) + ',transparent)' }}/>
                  <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.28em', color:'rgba(255,255,255,0.25)', textTransform:'uppercase', marginTop:12 }}>Individually Crafted</div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.6 }}
              style={{ marginTop:32, textAlign:'center', padding:'20px', border:'1px solid rgba(201,160,84,0.1)', background:'rgba(201,160,84,0.025)' }}>
              <span style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:15, color:'rgba(201,160,84,0.6)' }}>
                Each object individually crafted. Each object individually documented. Each object forms part of a unified archive allocation.
              </span>
            </motion.div>
          </div>
        </div>

        <Divider/>

        <div style={{ background:'linear-gradient(180deg,#030303,#070405)', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:72 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>Precious Materials</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(24px,3.5vw,48px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em' }}>Gold & Gemstone Treasury</h2>
            </motion.div>
            <div className="ev-gem-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1px 1fr 1px 1fr 1px 1fr', gap:0 }}>
              <motion.div initial={{ opacity:0,x:-28 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:1 }} style={{ padding:'36px 44px' }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', marginBottom:28, textAlign:'center' }}>Gold Reserve</div>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}><GemGauge label="Purity" value="22K" pct={0.916} color={GOLD2} delay={100}/></div>
                <div style={{ marginBottom:18 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                    <span style={{ fontFamily:MONO, fontSize:8, color:'rgba(255,255,255,0.25)', letterSpacing:'0.15em', textTransform:'uppercase' }}>Au Purity</span>
                    <span style={{ fontFamily:SERIF, fontSize:17, color:GOLD2 }}>Au916</span>
                  </div>
                  <div style={{ height:2.5, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                    <motion.div initial={{ width:0 }} whileInView={{ width:'91.6%' }} viewport={{ once:true }} transition={{ duration:2.2,delay:.4,ease:[0.22,1,0.36,1] }}
                      style={{ height:'100%', background:'linear-gradient(90deg,' + GOLD + ',' + GOLD2 + ')' }}/>
                  </div>
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse' }} className="gem-row"><tbody>
                  {[['Metal','Solid 22K Royal Yellow Gold'],['Hallmark','Official Au916'],['Method','Master Artisan'],['Finish','Royal Mirror Polish'],['Purpose','Generational Preservation']].map(([k,v]) => (
                    <tr key={k}><td style={{ color:'rgba(255,255,255,0.26)', paddingRight:12, fontFamily:MONO, fontSize:8.5 }}>{k}</td><td style={{ color:'rgba(201,160,84,0.82)', fontFamily:SERIF, fontSize:12, textAlign:'right' }}>{v}</td></tr>
                  ))}
                </tbody></table>
              </motion.div>
              <div style={{ background:'linear-gradient(180deg,transparent,rgba(201,160,84,0.22),transparent)', width:1, alignSelf:'stretch' }}/>
              <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:1,delay:.15 }} style={{ padding:'36px 44px' }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(46,168,122,0.6)', marginBottom:28, textAlign:'center' }}>Colombian Emeralds</div>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}><GemGauge label="Saturation" value="AAA" pct={0.96} color={EM2} delay={200}/></div>
                <table style={{ width:'100%', borderCollapse:'collapse' }} className="gem-row"><tbody>
                  {[['Origin','Natural Colombian'],['Quality','Museum Grade'],['Color','Deep Forest Green'],['Symbolism','Wisdom & Power'],['Setting','Master Hand-Set']].map(([k,v]) => (
                    <tr key={k}><td style={{ color:'rgba(255,255,255,0.26)', paddingRight:12, fontFamily:MONO, fontSize:8.5 }}>{k}</td><td style={{ color:'rgba(46,168,122,0.85)', fontFamily:SERIF, fontSize:12, textAlign:'right' }}>{v}</td></tr>
                  ))}
                </tbody></table>
              </motion.div>
              <div style={{ background:'linear-gradient(180deg,transparent,rgba(196,30,58,0.22),transparent)', width:1, alignSelf:'stretch' }}/>
              <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:1,delay:.3 }} style={{ padding:'36px 44px' }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(196,30,58,0.6)', marginBottom:28, textAlign:'center' }}>Burmese Rubies</div>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}><GemGauge label="Royal Fire" value="AAA" pct={0.98} color={RUBY} delay={300}/></div>
                <table style={{ width:'100%', borderCollapse:'collapse' }} className="gem-row"><tbody>
                  {[['Origin','Natural Burmese'],['Quality','Museum Grade'],['Color','Pigeon Blood Red'],['Symbolism','Power & Authority'],['Setting','Sovereign Bezel']].map(([k,v]) => (
                    <tr key={k}><td style={{ color:'rgba(255,255,255,0.26)', paddingRight:12, fontFamily:MONO, fontSize:8.5 }}>{k}</td><td style={{ color:'rgba(196,30,58,0.85)', fontFamily:SERIF, fontSize:12, textAlign:'right' }}>{v}</td></tr>
                  ))}
                </tbody></table>
              </motion.div>
              <div style={{ background:'linear-gradient(180deg,transparent,rgba(201,160,84,0.22),transparent)', width:1, alignSelf:'stretch' }}/>
              <motion.div initial={{ opacity:0,x:28 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:1,delay:.45 }} style={{ padding:'36px 44px' }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', marginBottom:28, textAlign:'center' }}>VVS Diamonds</div>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}><GemGauge label="Clarity" value="VVS" pct={0.97} color={GOLD2} delay={400}/></div>
                <table style={{ width:'100%', borderCollapse:'collapse' }} className="gem-row"><tbody>
                  {[['Quality','VVS Grade Natural'],['Cut','Brilliant & Polki'],['Light','Exceptional Fire'],['Symbolism','Permanence'],['Setting','Hand-Crafted']].map(([k,v]) => (
                    <tr key={k}><td style={{ color:'rgba(255,255,255,0.26)', paddingRight:12, fontFamily:MONO, fontSize:8.5 }}>{k}</td><td style={{ color:'rgba(201,160,84,0.82)', fontFamily:SERIF, fontSize:12, textAlign:'right' }}>{v}</td></tr>
                  ))}
                </tbody></table>
              </motion.div>
            </div>
          </div>
        </div>

        <Divider/>

        <div style={{ background:'#030303', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
            <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(196,30,58,0.5)', marginBottom:48 }}>The Wearable Presence</div>
            {(story.wearable_presence || 'The Empress Sovereign Vault does not enhance appearance. It establishes lineage. Emeralds communicate wisdom. Rubies communicate power. Diamonds communicate permanence. Gold communicates sovereignty.').split('. ').filter(Boolean).map((s:string,i:number) => (
              <motion.p key={i} initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
                transition={{ duration:1.1,delay:i*0.09,ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SERIF, fontSize:'clamp(16px,2.2vw,26px)', fontWeight:300, lineHeight:1.7, marginBottom:10,
                  color: i===0?'#fff':i===1?'rgba(46,168,122,0.85)':i===2?'rgba(196,30,58,0.85)':i===3?GOLD2:'rgba(255,255,255,0.35)' }}>
                {s.trim()}.
              </motion.p>
            ))}
          </div>
        </div>

        <Divider/>

        <div style={{ background:'linear-gradient(180deg,#030303,#07050a)', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:1060, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:72 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>The Imperial Chest</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', marginBottom:14 }}>Museum-Grade Archive Chest</h2>
              <p style={{ fontFamily:SERIF, fontSize:16, color:'rgba(255,255,255,0.35)', lineHeight:1.7 }}>Hand-finished Sovereign Archive Chest — the ultimate vessel of imperial preservation.</p>
            </motion.div>
            <div className="ev-chest-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56 }}>
              <div>
                {[
                  { lab:'Material', val: chest.material||'Solid Walnut Wood', col: GOLD },
                  { lab:'Exterior', val: chest.exterior||'24K Gold-Plated Filigree Detailing', col: GOLD2 },
                  { lab:'Interior', val: chest.interior||'Museum-Grade Velvet Architecture', col: RUBY },
                  { lab:'Security', val: chest.security||'Cryptographic NFC Authentication', col: EM2 },
                  { lab:'Purpose',  val: chest.purpose||'Long-Term Heritage Storage', col: GOLD },
                ].map(({ lab,val,col },i) => (
                  <motion.div key={lab} initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }}
                    transition={{ duration:.7, delay:i*0.1 }}
                    style={{ display:'flex', alignItems:'flex-start', gap:20, padding:'20px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width:3, height:40, background:col, flexShrink:0, marginTop:2 }}/>
                    <div>
                      <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.3em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:5 }}>{lab}</div>
                      <div style={{ fontFamily:SERIF, fontSize:17, color:'rgba(255,255,255,0.78)', fontWeight:300 }}>{val}</div>
                    </div>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.7 }}
                  style={{ marginTop:28, padding:'18px 22px', border:'1px solid rgba(196,30,58,0.2)', background:'rgba(196,30,58,0.03)' }}>
                  <div style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:16, color:'rgba(196,30,58,0.7)', lineHeight:1.6 }}>
                    "This is not presentation. This is custodianship."
                  </div>
                </motion.div>
              </div>
              <motion.div initial={{ opacity:0,scale:.94 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ duration:1.2 }}>
                <div style={{ position:'relative', border:'1px solid rgba(196,30,58,0.2)', overflow:'hidden' }}>
                  <img src={heroImg} alt="Imperial Chest" style={{ width:'100%', display:'block' }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(196,30,58,0.06),transparent 50%)' }}/>
                </div>
                <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:12, padding:'13px 18px', border:'1px solid rgba(201,160,84,0.1)', background:'rgba(0,0,0,0.48)' }}>
                  <Shield size={13} color={GOLD}/>
                  <span style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.22em', color:'rgba(201,160,84,0.6)', textTransform:'uppercase' }}>Cryptographic NFC Authentication Integrated</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Divider/>

        <div style={{ background:'linear-gradient(180deg,#030303,#060505)', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(196,30,58,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,160,84,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1060, margin:'0 auto', position:'relative', zIndex:2 }}>
            <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ marginBottom:52 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(196,30,58,0.5)', marginBottom:14 }}>Private Allocation Matrix</div>
              <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', margin:0 }}>VVIP Sovereign Terminal</h2>
                <div style={{ fontFamily:MONO, fontSize:8, color:'#00ff9d', letterSpacing:'0.2em', border:'1px solid rgba(0,255,157,0.15)', padding:'4px 12px', display:'flex', alignItems:'center', gap:7 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:'#00ff9d', boxShadow:'0 0 6px #00ff9d' }}/> LIVE
                </div>
                <div className="term-cursor"/>
              </div>
            </motion.div>
            <div style={{ background:'rgba(196,30,58,0.05)', border:'1px solid rgba(196,30,58,0.15)', padding:'11px 24px', display:'flex', justifyContent:'space-between', fontFamily:MONO, fontSize:8, color:'rgba(196,30,58,0.5)', letterSpacing:'0.16em', flexWrap:'wrap', gap:10 }}>
              <span>EMPRESS-SOVEREIGN-VAULT</span><span>ASSET CLASS: SOVEREIGN HERITAGE</span><span>USD 150,000.00</span>
            </div>
            <div style={{ border:'1px solid rgba(201,160,84,0.08)', borderTop:'none', padding:'4px 24px 10px', background:'rgba(0,0,0,0.38)' }}>
              {[
                { label:'ASSET CATEGORY',          value:'Sovereign Heritage Archive', gold:true,  delay:0   },
                { label:'COMPOSITION',              value:'22K Gold + Emeralds + Rubies + VVS Diamonds', gold:true, delay:60 },
                { label:'PIECE COUNT',              value:'Five-Piece Imperial Treasury', gold:false, delay:120 },
                { label:'ALLOCATION QUANTITY',      value:'25 Worldwide — Private VVIP', gold:true,  delay:180 },
                { label:'ALLOCATION METHOD',        value:'Private VVIP Approval Only', gold:false, delay:240 },
                { label:'COLLECTOR TIER',           value:'Sovereign Archive Class', gold:false, delay:300 },
                { label:'ARCHIVE STATUS',           value:'Founding Generation Release', gold:false, delay:360 },
                { label:'PRODUCTION STATUS',        value:'Strictly Limited — 25 Allocations', gold:false, delay:420 },
                { label:'PRESERVATION HORIZON',     value:'Multi-Generational Heirloom', gold:false, delay:480 },
                { label:'BLOCKCHAIN REGISTRY',      value:'Polygon Mainnet — Verified', gold:false, delay:540 },
                { label:'RETAIL VALUATION PKR',     value:'Rs. 42,000,000+', gold:true, delay:600 },
                { label:'INTERNATIONAL VALUATION',  value:'$150,000 USD', gold:true, delay:660 },
              ].map(item => <TermRow key={item.label} {...item}/>)}
            </div>
            <div style={{ marginTop:20, border:'1px solid rgba(196,30,58,0.15)', padding:'28px 32px', background:'rgba(196,30,58,0.04)' }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.45em', color:'rgba(196,30,58,0.6)', textTransform:'uppercase', marginBottom:16 }}>Global Allocation Status — 25 Total</div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {Array.from({ length: 25 }, (_, i) => (
                  <motion.div key={i} initial={{ scale:0,opacity:0 }} whileInView={{ scale:1,opacity:1 }} viewport={{ once:true }}
                    transition={{ duration:.3, delay:i*0.04 }}
                    style={{ width:18, height:18, border:'1px solid rgba(201,160,84,0.3)', background:'rgba(201,160,84,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ fontFamily:MONO, fontSize:6, color:'rgba(201,160,84,0.5)' }}>{String(i+1).padStart(2,'0')}</div>
                  </motion.div>
                ))}
              </div>
              <div style={{ fontFamily:MONO, fontSize:8, color:'rgba(255,255,255,0.25)', marginTop:12, letterSpacing:'0.15em' }}>
                Slots available for qualified custodians. Allocation requires private VVIP approval.
              </div>
            </div>
            <div className="ev-invest-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, marginTop:1 }}>
              {[
                { val:'$150K', lab:'International Value', c:GOLD2 },
                { val:'25',    lab:'Worldwide Allocations', c:RUBY  },
                { val:'5pcs',  lab:'Imperial Pieces',      c:EM2   },
                { val:'∞',     lab:'Dynasty Horizon',      c:'rgba(201,160,84,0.5)' },
              ].map(({ val,lab,c }) => (
                <div key={lab} style={{ background:'rgba(201,160,84,0.035)', border:'1px solid rgba(201,160,84,0.08)', padding:'26px 18px', textAlign:'center' }}>
                  <div style={{ fontFamily:SERIF, fontSize:28, fontWeight:300, color:c, marginBottom:5 }}>{val}</div>
                  <div style={{ fontFamily:MONO, fontSize:6.5, letterSpacing:'0.28em', color:'rgba(255,255,255,0.26)', textTransform:'uppercase' }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider/>

        <div style={{ background:'linear-gradient(180deg,#030303,#0a050e)', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:1060, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:72 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>Digital Twin Identity</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em' }}>Empress Eternal Passport</h2>
              <p style={{ fontFamily:SERIF, fontSize:16, color:'rgba(255,255,255,0.28)', marginTop:12 }}>Blockchain-secured on Polygon. Permanently linked. Dynastically verified.</p>
            </motion.div>
            <div className="ev-nft-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56 }}>
              <motion.div initial={{ opacity:0,rotateY:-15 }} whileInView={{ opacity:1,rotateY:0 }} viewport={{ once:true }} transition={{ duration:1.4,ease:[0.22,1,0.36,1] }}>
                <div className="imperial-holo" style={{ position:'relative', border:'1px solid rgba(196,30,58,0.32)', background:'linear-gradient(135deg,rgba(8,2,12,0.98),rgba(20,6,8,0.98))', padding:'44px', overflow:'hidden', minHeight:360 }}>
                  <div style={{ position:'absolute', top:14, right:14, width:42, height:42, border:'1px solid rgba(196,30,58,0.25)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
                    <Crown size={16} color={RUBY}/>
                  </div>
                  <div style={{ position:'relative', zIndex:2 }}>
                    <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.45em', color:'rgba(196,30,58,0.45)', marginBottom:24, textTransform:'uppercase' }}>Founding Allocation · 01/25</div>
                    <div style={{ fontFamily:SERIF, fontSize:24, fontWeight:300, color:'#fff', letterSpacing:'0.05em', marginBottom:4 }}>
                      {nft.title || 'Empress Sovereign Vault — Eternal Passport'}
                    </div>
                    <div style={{ fontFamily:MONO, fontSize:9, color:RUBY, letterSpacing:'0.2em', marginBottom:32 }}>
                      {nft.rarity || 'FOUNDING GENERATION'} · Polygon
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
                      {[['Gold','22K Royal Yellow'],['Emeralds','Natural Colombian'],['Rubies','Natural Burmese'],['Diamonds','VVS Natural'],['Pieces','Five-Piece Treasury'],['Registry','Dynamic Sovereign']].map(([k,v]) => (
                        <div key={k} style={{ borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:9 }}>
                          <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.16em', color:'rgba(255,255,255,0.22)', textTransform:'uppercase', marginBottom:3 }}>{k}</div>
                          <div style={{ fontFamily:SERIF, fontSize:12, color:'rgba(201,160,84,0.88)' }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:'11px 14px', background:'rgba(0,255,157,0.04)', border:'1px solid rgba(0,255,157,0.1)', display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:6,height:6,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 7px #00ff9d',flexShrink:0 }}/>
                      <span style={{ fontFamily:MONO, fontSize:7.5, letterSpacing:'0.16em', color:'rgba(0,255,157,0.6)', textTransform:'uppercase', flex:1 }}>
                        {NFT_CONTRACT.slice(0,14)}...{NFT_CONTRACT.slice(-6)}
                      </span>
                      <CopyBtn text={NFT_CONTRACT}/>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity:0,x:36 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:1 }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:22 }}>Holder Privileges</div>
                {nftPrivs.map((p,i) => (
                  <motion.div key={i} initial={{ opacity:0,x:18 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }}
                    transition={{ duration:.55,delay:i*0.06 }} className="priv-row">
                    <Gem size={11} color={i%3===0?RUBY:i%3===1?EM2:GOLD} style={{ flexShrink:0 }}/>
                    <span style={{ fontFamily:SERIF, fontSize:14, color:'rgba(255,255,255,0.65)', fontWeight:300 }}>{p}</span>
                  </motion.div>
                ))}
                <div style={{ marginTop:24, padding:'16px 20px', border:'1px solid rgba(196,30,58,0.15)', background:'rgba(196,30,58,0.03)' }}>
                  <div style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:14, color:'rgba(196,30,58,0.6)', lineHeight:1.65 }}>
                    "Empires require records. Legacies require permanence."
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Divider/>

        <div id="acquire" style={{ background:'#030303', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <ImperialDust n={30}/>
          <div style={{ maxWidth:860, margin:'0 auto', position:'relative', zIndex:2 }}>
            <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:52 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.52em', textTransform:'uppercase', color:'rgba(196,30,58,0.5)', marginBottom:14 }}>VVIP Acquisition Console</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', marginBottom:10 }}>Request Sovereign Allocation</h2>
              <p style={{ fontFamily:SERIF, fontSize:15, color:'rgba(255,255,255,0.28)' }}>Empress Sovereign Vault · $150,000 USD · Rs {formatPKR(42000000)} PKR · 25 Worldwide</p>
            </motion.div>

            {orderResult ? (
              <motion.div initial={{ opacity:0,scale:.95 }} animate={{ opacity:1,scale:1 }} transition={{ duration:.8 }}
                style={{ border:'1px solid rgba(0,255,157,0.18)', background:'rgba(0,255,157,0.025)', padding:'52px 40px', textAlign:'center' }}>
                <div style={{ width:48,height:48,borderRadius:'50%',border:'1px solid rgba(0,255,157,0.25)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px' }}>
                  <Check size={20} color="#00ff9d"/>
                </div>
                <h3 style={{ fontFamily:SERIF, fontSize:24, fontWeight:300, color:'#fff', marginBottom:6 }}>Imperial Allocation Confirmed</h3>
                <p style={{ fontFamily:MONO, fontSize:8.5, letterSpacing:'0.25em', color:'rgba(255,255,255,0.3)', marginBottom:24 }}>YOUR SOVEREIGN ARCHIVE IS RESERVED</p>
                <div style={{ display:'flex', justifyContent:'center', gap:32, marginBottom:32, flexWrap:'wrap' }}>
                  {[['Order ID',orderResult.order_id],['Reference',orderResult.order_ref],['Tracking',orderResult.tracking_ref]].map(([l,v]) => (
                    <div key={l}><div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.25em', color:'rgba(255,255,255,0.25)', marginBottom:5, textTransform:'uppercase' }}>{l}</div><div style={{ fontFamily:SERIF, fontSize:15, color:GOLD }}>{v}</div></div>
                  ))}
                </div>
                <Link href={'/track/' + orderResult.tracking_ref} style={{ display:'inline-block', border:'1px solid ' + GOLD, color:GOLD, padding:'12px 36px', fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', textDecoration:'none', fontFamily:MONO }}>
                  Track Imperial Delivery
                </Link>
              </motion.div>
            ) : (
              <>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <textarea
                  value={custMessage} onChange={e=>setCustMessage(e.target.value)}
                  placeholder="Message / special instructions (optional)"
                  style={{ width:'100%', background:'transparent', border:'1px solid rgba(201,160,84,0.14)', padding:'14px 18px', fontSize:11, color:'rgba(212,204,184,0.7)', outline:'none', resize:'none', fontFamily:'inherit', boxSizing:'border-box' }}
                  rows={3}
                />
                {walletAdded ? (
                  <div style={{ padding:'18px', border:'1px solid rgba(201,160,84,0.22)', background:'rgba(201,160,84,0.04)', textAlign:'center' }}>
                    <p style={{ fontFamily:MONO, fontSize:8.5, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(201,160,84,0.8)' }}>◆ Added to Wallet</p>
                    <Link href="/wallet" style={{ fontSize:7.5, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(212,204,184,0.35)', marginTop:8, display:'inline-block', textDecoration:'none' }}>View Wallet →</Link>
                  </div>
                ) : (
                  <button
                    onClick={() => { addItem({ product_id:product.id, product_name:product.name, slug:product.slug, price_usd:product.price_usd, quantity:1, image:product.images?.[0]||'', custom_message:custMessage }); setWalletAdded(true) }}
                    style={{ width:'100%', background:'linear-gradient(135deg,rgba(196,30,58,0.12),rgba(201,160,84,0.05))', border:'1px solid rgba(196,30,58,0.28)', color:'rgba(201,160,84,0.85)', padding:'19px', fontFamily:MONO, fontSize:9, letterSpacing:'0.42em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}>
                    ADD TO WALLET
                  </button>
                )}
              </div>
              </>
            )}
          </div>
        </div>

        <div style={{ background:'linear-gradient(180deg,#030303,#07030a)', padding:'90px 40px', textAlign:'center', borderTop:'1px solid rgba(196,30,58,0.08)' }}>
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            <Divider/>
            <motion.p initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:1.2 }}
              style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:'clamp(16px,2vw,24px)', fontWeight:300, color:'rgba(255,255,255,0.26)', lineHeight:1.72, marginTop:52 }}>
              {story.final_positioning || 'Empress Sovereign Vault is not jewelry. It is a sovereign archive. A collectible heritage asset. A blockchain-authenticated heirloom. A treasury of gold, gemstones, provenance, and legacy. Where ownership, preservation, dynasty, and identity become one eternal empire.'}
            </motion.p>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:1,delay:.6 }}
              style={{ marginTop:40, fontFamily:SERIF, fontSize:13, color:'rgba(196,30,58,0.3)', letterSpacing:'0.15em' }}>
              House of Shamim Forever · The Archive Objects · Chapter IV
            </motion.div>
          </div>
        </div>
      </>
    )
  }
  