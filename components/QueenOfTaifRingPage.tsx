'use client'

  import { useEffect, useRef, useState, useCallback } from 'react'
  import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
  import Link from 'next/link'
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
  const SERIF = "'Cormorant Garamond', Georgia, serif"
  const MONO  = "'Courier New', Courier, monospace"
  const GOLD  = '#c9a054'
  const GOLD2 = '#e8c97a'

  const PAGE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
    html{scroll-behavior:smooth}
    .qr-reveal{opacity:0;transform:translateY(48px);filter:blur(6px)}
    .qr-reveal.vis{opacity:1;transform:translateY(0);filter:blur(0);transition:opacity 1.2s cubic-bezier(.22,1,.36,1),transform 1.2s cubic-bezier(.22,1,.36,1),filter 1.2s cubic-bezier(.22,1,.36,1)}
    .gem-row td{padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:top}
    .gem-row tr:last-child td{border-bottom:none}
    .holo-sheen::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,160,84,.18) 0%,transparent 40%,rgba(201,160,84,.08) 60%,transparent 100%);animation:holo 4s ease-in-out infinite alternate;pointer-events:none;border-radius:inherit;z-index:1}
    @keyframes holo{0%{opacity:.4;transform:skewX(0deg)}100%{opacity:1;transform:skewX(1deg)}}
    .scanline{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(201,160,84,.7),transparent);animation:scan 3.5s ease-in-out infinite;pointer-events:none;z-index:5}
    @keyframes scan{0%{top:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{top:100%;opacity:0}}
    .term-cursor{display:inline-block;width:8px;height:14px;background:#c9a054;animation:blink .9s step-end infinite;vertical-align:middle;margin-left:4px}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    .priv-row{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.04)}
    .priv-row:last-child{border-bottom:none}
    @media(max-width:768px){
      .qr-hero-grid{grid-template-columns:1fr!important;text-align:center!important}
      .qr-gem-grid{grid-template-columns:1fr!important}
      .qr-nft-grid{grid-template-columns:1fr!important}
      .qr-invest-grid{grid-template-columns:1fr 1fr!important}
      .qr-pay-grid{grid-template-columns:1fr 1fr!important}
      .qr-vault-grid{grid-template-columns:1fr!important}
      .qr-presence-grid{grid-template-columns:1fr!important}
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

  /* ── Diamond light-facet engine ─────────────────────────────────────────── */
  function DiamondEngine() {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
      const canvas = ref.current; if (!canvas) return
      const ctx = canvas.getContext('2d')!
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
      resize(); window.addEventListener('resize', resize)
      let t = 0
      const rays = Array.from({ length: 28 }, (_, i) => ({
        angle: (i / 28) * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.005,
        len: 100 + Math.random() * 180,
        w: 1 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      }))
      const sparks = Array.from({ length: 70 }, () => ({
        x: Math.random(), y: Math.random(),
        life: Math.random(), spd: 0.004 + Math.random() * 0.009,
        sz: 0.5 + Math.random() * 2.2,
      }))
      let raf: number
      const draw = () => {
        t++
        const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2
        ctx.clearRect(0, 0, W, H)
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.45)
        grd.addColorStop(0, 'rgba(201,160,84,0.07)'); grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H)
        rays.forEach(r => {
          const a = r.angle + t * r.speed
          const pulse = Math.sin(t * 0.035 + r.phase) * 0.5 + 0.5
          const x2 = cx + Math.cos(a) * r.len * (0.65 + pulse * 0.5)
          const y2 = cy + Math.sin(a) * r.len * (0.65 + pulse * 0.5)
          const g = ctx.createLinearGradient(cx, cy, x2, y2)
          const al = pulse * 0.5
          g.addColorStop(0, `rgba(232,201,122,${al})`)
          g.addColorStop(0.5, `rgba(201,160,84,${al * 0.4})`)
          g.addColorStop(1, 'rgba(201,160,84,0)')
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2)
          ctx.strokeStyle = g; ctx.lineWidth = r.w * pulse; ctx.stroke()
        })
        sparks.forEach(s => {
          s.life = (s.life + s.spd) % 1
          const sx = s.x * W, sy = s.y * H, al = Math.sin(s.life * Math.PI)
          ctx.beginPath(); ctx.arc(sx, sy, s.sz * al, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(232,201,122,${al * 0.75})`; ctx.fill()
          if (s.sz > 1.4) {
            ctx.save(); ctx.translate(sx, sy)
            ctx.strokeStyle = `rgba(255,240,200,${al * 0.5})`; ctx.lineWidth = 0.4
            const arm = s.sz * 3.5
            ctx.beginPath(); ctx.moveTo(-arm, 0); ctx.lineTo(arm, 0); ctx.stroke()
            ctx.beginPath(); ctx.moveTo(0, -arm); ctx.lineTo(0, arm); ctx.stroke()
            ctx.restore()
          }
        })
        raf = requestAnimationFrame(draw)
      }
      draw()
      return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [])
    return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:6 }} />
  }

  /* ── Floating gold dust ─────────────────────────────────────────────────── */
  function GoldDust({ n = 70 }: { n?: number }) {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
      const canvas = ref.current; if (!canvas) return
      const ctx = canvas.getContext('2d')!
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
      resize(); window.addEventListener('resize', resize)
      const pts = Array.from({ length: n }, () => ({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.8 + 0.3, vy: -(Math.random() * 0.18 + 0.04),
        vx: (Math.random() - 0.5) * 0.07,
        a: Math.random(), va: (Math.random() - 0.5) * 0.005,
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
          ctx.fillStyle = `rgba(201,160,84,${p.a * 0.55})`; ctx.fill()
        })
        raf = requestAnimationFrame(tick)
      }
      tick()
      return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [n])
    return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
  }

  /* ── Circular gem gauge ─────────────────────────────────────────────────── */
  function GemGauge({ label, value, sub, pct, delay = 0 }: { label: string; value: string; sub?: string; pct: number; delay?: number }) {
    const [go, setGo] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setTimeout(() => setGo(true), delay) }, { threshold: 0.3 })
      if (ref.current) obs.observe(ref.current)
      return () => obs.disconnect()
    }, [delay])
    const R = 42, circ = 2 * Math.PI * R
    return (
      <div ref={ref} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
        <svg width={100} height={100} style={{ transform:'rotate(-90deg)' }}>
          <circle cx={50} cy={50} r={R} fill="none" stroke="rgba(201,160,84,0.1)" strokeWidth={2.5}/>
          <circle cx={50} cy={50} r={R} fill="none" stroke=`url(#gg-${label})` strokeWidth={2.5}
            strokeDasharray={circ} strokeDashoffset={go ? circ * (1 - pct) : circ} strokeLinecap="round"
            style={{ transition: go ? '1.8s cubic-bezier(.22,1,.36,1)' : 'none' }}/>
          <defs>
            <linearGradient id={`gg-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a054"/><stop offset="100%" stopColor="#e8c97a"/>
            </linearGradient>
          </defs>
          <text x={50} y={50} textAnchor="middle" dominantBaseline="middle" fill={GOLD}
            style={{ fontFamily: SERIF, fontSize:13, fontWeight:300, transform:'rotate(90deg)', transformOrigin:'50px 50px' }}>
            {value}
          </text>
        </svg>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase' as const, color:'rgba(255,255,255,0.35)', marginBottom:3 }}>{label}</div>
          {sub && <div style={{ fontFamily:SERIF, fontSize:12, color:'rgba(201,160,84,0.55)', fontStyle:'italic' }}>{sub}</div>}
        </div>
      </div>
    )
  }

  /* ── Terminal data row ──────────────────────────────────────────────────── */
  function TermRow({ label, value, gold, delay = 0 }: { label: string; value: string; gold?: boolean; delay?: number }) {
    const [show, setShow] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setTimeout(() => setShow(true), delay) }, { threshold: 0.05 })
      if (ref.current) obs.observe(ref.current)
      return () => obs.disconnect()
    }, [delay])
    return (
      <div ref={ref} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-16px)', transition:'opacity .55s ease, transform .55s ease' }}>
        <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.18em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase' as const }}>{label}</span>
        <span style={{ fontFamily: gold ? SERIF : MONO, fontSize: gold ? 15 : 10, color: gold ? GOLD2 : 'rgba(201,160,84,0.65)', letterSpacing: gold ? '0.04em' : '0.18em', fontWeight: gold ? 300 : 400 }}>{value}</span>
      </div>
    )
  }

  /* ── Gold divider ───────────────────────────────────────────────────────── */
  function Divider() {
    return (
      <div style={{ display:'flex', alignItems:'center', gap:20, maxWidth:600, margin:'0 auto', padding:'0 40px' }}>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(201,160,84,0.3))' }}/>
        <div style={{ width:5, height:5, background:GOLD, transform:'rotate(45deg)', opacity:0.5 }}/>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(201,160,84,0.3),transparent)' }}/>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     MAIN PAGE COMPONENT
  ═══════════════════════════════════════════════════════════════════════════ */
  export default function QueenOfTaifRingPage({ product }: { product: Product }) {
    const [payMethod, setPayMethod] = useState<PayMethod>('crypto')
    const [receipt, setReceipt]     = useState<File | null>(null)
    const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
    const [submitting, setSubmitting]   = useState(false)
    const [error, setError]             = useState('')
    const [shipping, setShipping] = useState({ name:'', phone:'', address:'', city:'', note:'' })
    const [vaultReady, setVaultReady]   = useState(false)
    const { address: walletAddr } = useAccount()
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
    const heroOp = useTransform(scrollYProgress, [0, 0.65], [1, 0])

    /* Parse story JSON */
    const story = (() => {
      try { return typeof product.story === 'string' ? JSON.parse(product.story) : (product.story || {}) } catch { return {} }
    })()
    const gemology = story.gemology  || {}
    const goldSpec  = story.gold_specs || {}
    const nft       = story.nft       || {}
    const vault     = story.vault     || {}
    const imgs  = product.images || []
    const ringImg  = imgs[0] || '/products/queen-of-taif-crown-ring/ring-hero.png'
    const vaultImg = imgs[1] || '/products/queen-of-taif-crown-ring/ring-vault.png'

    /* Vault reveal on scroll into view */
    useEffect(() => {
      const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setTimeout(() => setVaultReady(true), 400) }, { threshold: 0.25 })
      const el = document.getElementById('qr-vault')
      if (el) obs.observe(el)
      return () => obs.disconnect()
    }, [])

    /* Scroll reveal for .qr-reveal elements */
    useEffect(() => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } })
      }, { threshold: 0.1 })
      document.querySelectorAll('.qr-reveal').forEach(el => obs.observe(el))
      return () => obs.disconnect()
    }, [])

    const handleCryptoSuccess = useCallback(async (txHash: string, coin: CoinType) => {
      setSubmitting(true); setError('')
      try {
        const f = new FormData()
        Object.entries(shipping).forEach(([k, v]) => f.append(k, v))
        f.append('product_id', product.id); f.append('quantity', '1')
        f.append('payment_method', coin.toLowerCase()); f.append('tx_hash', txHash)
        const r = await fetch('/api/orders', { method: 'POST', body: f })
        const d = await r.json()
        if (!r.ok) throw new Error(d.error || 'Order failed')
        setOrderResult(d)
      } catch (e: any) { setError(e.message) } finally { setSubmitting(false) }
    }, [shipping, product.id])

    const handleManual = useCallback(async () => {
      if (!receipt) { setError('Please upload payment receipt'); return }
      setSubmitting(true); setError('')
      try {
        const f = new FormData()
        Object.entries(shipping).forEach(([k, v]) => f.append(k, v))
        f.append('product_id', product.id); f.append('quantity', '1')
        f.append('payment_method', 'easypaisa'); f.append('receipt', receipt)
        const r = await fetch('/api/orders', { method: 'POST', body: f })
        const d = await r.json()
        if (!r.ok) throw new Error(d.error || 'Order failed')
        setOrderResult(d)
      } catch (e: any) { setError(e.message) } finally { setSubmitting(false) }
    }, [receipt, shipping, product.id])

    const handleCOD = useCallback(async () => {
      setSubmitting(true); setError('')
      try {
        const f = new FormData()
        Object.entries(shipping).forEach(([k, v]) => f.append(k, v))
        f.append('product_id', product.id); f.append('quantity', '1')
        f.append('payment_method', 'cod')
        const r = await fetch('/api/orders', { method: 'POST', body: f })
        const d = await r.json()
        if (!r.ok) throw new Error(d.error || 'Order failed')
        setOrderResult(d)
      } catch (e: any) { setError(e.message) } finally { setSubmitting(false) }
    }, [shipping, product.id])

    const inputSt: React.CSSProperties = {
      width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,160,84,0.13)',
      color: '#fff', padding: '14px 18px', fontSize: 12, letterSpacing: '0.07em', fontFamily: SERIF,
      outline: 'none', boxSizing: 'border-box' as const,
    }

    const vaultItems: string[] = Array.isArray(vault.contents) ? vault.contents : [
      'Founder Authentication Certificate','Gold Purity Documentation',
      'Diamond Quality Certification','Archive Ownership Registry',
      'Blockchain Registration Identity','Digital Twin NFT Passport',
      'Collector Documentation','Allocation Signature Record','Archive Preservation Guide',
    ]

    const nftPrivs: string[] = Array.isArray(nft.holder_privileges) ? nft.holder_privileges : [
      'Archive Collector Status','Sovereign Vault Access','Future High Jewelry Allocations',
      'Private House Invitations','Priority Authentication Services','Concierge Restoration Program',
      'Lifetime Provenance Protection','Collector Registry Recognition','Founder Allocation Status',
      'Legacy Registry Membership','Early Access To Future Archive Objects',
    ]

    /* ── Render ─────────────────────────────────────────────────────────── */
    return (
      <>
        <style>{PAGE_CSS}</style>

        {/* ════════════ 1. CINEMATIC HERO ════════════════════════════════════ */}
        <div ref={heroRef} style={{ position:'relative', minHeight:'100vh', background:'#030303', overflow:'hidden', display:'flex', alignItems:'center' }}>
          <GoldDust n={80}/>
          <DiamondEngine/>

          {/* Parallax bg image */}
          <motion.div style={{ position:'absolute', inset:0, y: heroY, opacity: heroOp }}>
            <img src={ringImg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.16) saturate(0.4)', transform:'scale(1.12)' }}/>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 58% 50%,rgba(201,160,84,0.09) 0%,rgba(3,3,3,0.75) 55%,#030303 100%)' }}/>
          </motion.div>

          {/* Back link */}
          <Link href="/shop" style={{ position:'absolute', top:32, left:40, zIndex:30, fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', textDecoration:'none', border:'1px solid rgba(201,160,84,0.1)', padding:'10px 22px', backdropFilter:'blur(12px)', background:'rgba(0,0,0,0.45)' }}>
            ← Archive
          </Link>

          <div className="qr-hero-grid" style={{ position:'relative', zIndex:20, width:'100%', maxWidth:1380, margin:'0 auto', padding:'130px 60px 90px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>

            {/* Left: product image with scanner overlay */}
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:1.6, ease:[0.22,1,0.36,1] }}>
              <div style={{ position:'relative', overflow:'hidden', border:'1px solid rgba(201,160,84,0.14)', background:'rgba(201,160,84,0.02)' }}>
                <img src={ringImg} alt="Queen of Taif Crown Ring" style={{ width:'100%', display:'block', maxHeight:560, objectFit:'cover' }}/>
                <div className="scanline"/>
                {/* Corner ornaments */}
                {[
                  { top:0,  left:0,  borderWidth:'2px 0 0 2px' },
                  { top:0,  right:0, borderWidth:'2px 2px 0 0' },
                  { bottom:0, left:0, borderWidth:'0 0 2px 2px' },
                  { bottom:0, right:0, borderWidth:'0 2px 2px 0' },
                ].map((s, i) => (
                  <div key={i} style={{ position:'absolute', width:26, height:26, borderColor:'rgba(201,160,84,0.55)', borderStyle:'solid', ...s }}/>
                ))}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(3,3,3,0.55),transparent 50%)' }}/>
              </div>
              {/* Auth badge */}
              <div style={{ background:'rgba(3,3,3,0.94)', border:'1px solid rgba(201,160,84,0.28)', padding:'9px 24px', display:'flex', alignItems:'center', gap:10, backdropFilter:'blur(12px)', justifyContent:'center' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#00ff9d', boxShadow:'0 0 8px #00ff9d', flexShrink:0 }}/>
                <span style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.28em', color:'rgba(201,160,84,0.75)', textTransform:'uppercase' }}>Polygon Verified · NFT Authenticated</span>
              </div>
            </motion.div>

            {/* Right: text */}
            <div style={{ paddingLeft:8 }}>
              <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:.28 }}
                style={{ fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', marginBottom:20, fontFamily:MONO }}>
                Sovereign Archive Allocation — Object I
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.2, delay:.44, ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SERIF, fontSize:'clamp(34px,4.5vw,60px)', fontWeight:300, letterSpacing:'0.06em', lineHeight:1.08, color:'#fff', margin:'0 0 6px' }}>
                Queen of Taif
              </motion.h1>
              <motion.h1 initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.2, delay:.6, ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SERIF, fontSize:'clamp(26px,3.5vw,48px)', fontWeight:300, letterSpacing:'0.06em', lineHeight:1.08, color:GOLD, margin:'0 0 28px', fontStyle:'italic' }}>
                Crown Ring
              </motion.h1>

              <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1, delay:.7 }}
                style={{ width:60, height:1, background:`linear-gradient(90deg,${GOLD},transparent)`, marginBottom:28, transformOrigin:'left' }}/>

              <motion.p initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:.8 }}
                style={{ fontFamily:SERIF, fontSize:16, fontWeight:300, color:'rgba(255,255,255,0.5)', lineHeight:1.85, marginBottom:36 }}>
                {story.tagline || 'A wearable sovereign object forged in 18K gold and 1.30 carats of natural VVS diamonds — engineered for permanence, not adornment.'}
              </motion.p>

              {/* Price */}
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:1 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:14, marginBottom:10 }}>
                  <span style={{ fontFamily:SERIF, fontSize:'clamp(30px,4vw,52px)', fontWeight:300, color:GOLD2 }}>$2,500</span>
                  <span style={{ fontSize:8, letterSpacing:'0.35em', color:'rgba(201,160,84,0.45)', textTransform:'uppercase', fontFamily:MONO }}>USD</span>
                </div>
                <div style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.28em', color:'rgba(255,255,255,0.22)', marginBottom:36 }}>
                  Rs {formatPKR(700000)} PKR · Retail Valuation
                </div>
              </motion.div>

              {/* Spec pills */}
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:1.15 }}
                style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:44 }}>
                {[['1.30 ct','Total Diamonds'],['18K Gold','Au750'],['VVS','Clarity'],['Polygon','Verified']].map(([v, l]) => (
                  <div key={l} style={{ border:'1px solid rgba(201,160,84,0.2)', padding:'9px 18px' }}>
                    <div style={{ fontFamily:SERIF, fontSize:15, fontWeight:300, color:GOLD, lineHeight:1 }}>{v}</div>
                    <div style={{ fontFamily:MONO, fontSize:6.5, letterSpacing:'0.3em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginTop:3 }}>{l}</div>
                  </div>
                ))}
              </motion.div>

              <motion.a href="#acquire" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:1.35 }}
                style={{ display:'inline-flex', alignItems:'center', gap:14, background:'linear-gradient(135deg,rgba(201,160,84,0.14),rgba(201,160,84,0.04))', border:`1px solid ${GOLD}`, color:GOLD2, padding:'18px 42px', fontSize:9, letterSpacing:'0.45em', textTransform:'uppercase', textDecoration:'none', fontFamily:MONO }}>
                <Crown size={14}/> Acquire Sovereign Ownership
              </motion.a>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
            style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:20 }}>
            <span style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.4em', color:'rgba(201,160,84,0.3)', textTransform:'uppercase' }}>Scroll to Discover</span>
            <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}>
              <ChevronDown size={15} color="rgba(201,160,84,0.3)"/>
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════ 2. LEGACY STATEMENT ══════════════════════════════════ */}
        <div style={{ background:'#030303', padding:'110px 40px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <GoldDust n={25}/>
          <div style={{ maxWidth:880, margin:'0 auto', position:'relative', zIndex:2 }}>
            <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:52 }}>The Legacy Statement</div>
            {(story.legacy_statement || 'A crown belongs on the head. A sovereign authority is permanently sealed by the hand. Before kingdoms were recorded in history, they were recognized through symbols. Crowns. Seals. Treasures. Objects capable of carrying power beyond a single lifetime. The Queen of Taif Crown Ring was never created as jewelry. It was created as a sovereign object.').split('. ').filter(Boolean).map((s: string, i: number) => (
              <motion.p key={i} initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:1.2, delay: i * 0.1, ease:[0.22,1,0.36,1] }}
                style={{ fontFamily:SERIF, fontSize:'clamp(17px,2.2vw,27px)', fontWeight:300, lineHeight:1.65, color:`rgba(255,255,255,${Math.max(0.2, 0.9 - i * 0.07)})`, marginBottom:10 }}>
                {s.trim()}.
              </motion.p>
            ))}
          </div>
        </div>

        <Divider/>

        {/* ════════════ 3. GEMOLOGICAL OBSERVATORY ══════════════════════════ */}
        <div style={{ background:'linear-gradient(180deg,#030303,#060404)', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
              style={{ textAlign:'center', marginBottom:80 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:16 }}>Gemological Composition</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(26px,3.5vw,50px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', margin:0 }}>Diamond Architecture</h2>
            </motion.div>

            <div className="qr-gem-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1px 1fr 1px 1fr', gap:0 }}>

              {/* Center Stone */}
              <motion.div initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:1 }}
                style={{ padding:'40px 52px' }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.48em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', marginBottom:32, textAlign:'center' }}>Center Stone</div>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
                  <GemGauge label="Carat" value="0.50" sub="Round Brilliant" pct={0.72} delay={200}/>
                </div>
                <div style={{ display:'flex', justifyContent:'center', gap:20, marginBottom:28 }}>
                  <GemGauge label="Clarity" value="VVS" pct={0.96} delay={340}/>
                  <GemGauge label="Color" value="F–G" pct={0.93} delay={480}/>
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse' }} className="gem-row">
                  <tbody>
                    {[['Cut','Round Brilliant'],['Light','Exceptional Fire'],['Class','Investment Grade'],['Symbol','Sovereign Heart']].map(([k,v]) => (
                      <tr key={k}><td style={{ color:'rgba(255,255,255,0.28)', paddingRight:14, fontFamily:MONO, fontSize:9, letterSpacing:'0.1em' }}>{k}</td><td style={{ color:'rgba(201,160,84,0.82)', fontFamily:SERIF, fontSize:13, textAlign:'right' }}>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              <div style={{ background:'linear-gradient(180deg,transparent,rgba(201,160,84,0.28),transparent)', width:1, alignSelf:'stretch' }}/>

              {/* Crown Pavé */}
              <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1, delay:.18 }}
                style={{ padding:'40px 52px', textAlign:'center' }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.48em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', marginBottom:32 }}>Crown Pavé Array</div>
                <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
                  <GemGauge label="Total" value="0.80ct" sub="Micro-Pavé" pct={0.85} delay={280}/>
                </div>
                {/* Pavé dot grid */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(9,1fr)', gap:5, marginBottom:28, padding:'0 16px' }}>
                  {Array.from({ length: 36 }, (_, i) => (
                    <motion.div key={i} initial={{ opacity:0, scale:0 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                      transition={{ duration:0.25, delay: 0.4 + i * 0.02 }}
                      style={{ paddingBottom:'100%', position:'relative' }}>
                      <div style={{ position:'absolute', inset:'12%', borderRadius:'50%', background: i % 4 === 0 ? GOLD2 : i % 4 === 1 ? GOLD : 'rgba(201,160,84,0.42)', boxShadow: i % 7 === 0 ? `0 0 5px ${GOLD2}` : 'none' }}/>
                    </motion.div>
                  ))}
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse' }} className="gem-row">
                  <tbody>
                    {[['Setting','Hand-Set Magnification'],['Placement','Crown Pillars & Borders'],['Effect','Continuous Light Reflection'],['Philosophy','Sovereign Radiance']].map(([k,v]) => (
                      <tr key={k}><td style={{ color:'rgba(255,255,255,0.28)', paddingRight:14, fontFamily:MONO, fontSize:9 }}>{k}</td><td style={{ color:'rgba(201,160,84,0.82)', fontFamily:SERIF, fontSize:13, textAlign:'right' }}>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              <div style={{ background:'linear-gradient(180deg,transparent,rgba(201,160,84,0.28),transparent)', width:1, alignSelf:'stretch' }}/>

              {/* Gold Reserve */}
              <motion.div initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:1, delay:.36 }}
                style={{ padding:'40px 52px' }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.48em', textTransform:'uppercase', color:'rgba(201,160,84,0.45)', marginBottom:32, textAlign:'center' }}>Gold Reserve</div>
                {/* Purity bar */}
                <div style={{ marginBottom:28 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <span style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.18em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase' }}>Au Purity</span>
                    <span style={{ fontFamily:SERIF, fontSize:17, color:GOLD2 }}>18K · 75%</span>
                  </div>
                  <div style={{ height:3, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                    <motion.div initial={{ width:0 }} whileInView={{ width:'75%' }} viewport={{ once:true }}
                      transition={{ duration:2.2, delay:.5, ease:[0.22,1,0.36,1] }}
                      style={{ height:'100%', background:`linear-gradient(90deg,${GOLD},${GOLD2})` }}/>
                  </div>
                </div>
                {/* Weight figure */}
                <div style={{ textAlign:'center', marginBottom:28 }}>
                  <div style={{ fontFamily:SERIF, fontSize:54, fontWeight:300, color:GOLD, lineHeight:1 }}>5.5</div>
                  <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.32em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginTop:4 }}>Grams Solid Gold</div>
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse' }} className="gem-row">
                  <tbody>
                    {[['Metal','Solid 18K Yellow Gold'],['Hallmark','Official Au750'],['Weight','~5.5 Grams'],['Finish','Royal Mirror Polish'],['Category','Precious Metal Asset']].map(([k,v]) => (
                      <tr key={k}><td style={{ color:'rgba(255,255,255,0.28)', paddingRight:14, fontFamily:MONO, fontSize:9 }}>{k}</td><td style={{ color:'rgba(201,160,84,0.82)', fontFamily:SERIF, fontSize:13, textAlign:'right' }}>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

            {/* Total summary bar */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1, delay:.2 }}
              style={{ marginTop:56, border:'1px solid rgba(201,160,84,0.13)', padding:'30px 52px', display:'flex', justifyContent:'center', gap:56, alignItems:'center', flexWrap:'wrap', background:'rgba(201,160,84,0.025)' }}>
              {[['1.30 ct','Total Diamonds'],['VVS','Clarity'],['F–G','Color Grade'],['18K Au750','Gold'],['Hand-Set','Craftsmanship']].map(([v,l]) => (
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:SERIF, fontSize:24, fontWeight:300, color:GOLD2, marginBottom:4 }}>{v}</div>
                  <div style={{ fontFamily:MONO, fontSize:6.5, letterSpacing:'0.33em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <Divider/>

        {/* ════════════ 4. WEARABLE PRESENCE ════════════════════════════════ */}
        <div style={{ background:'#030303', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div className="qr-presence-grid" style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-36 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:1.2 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:28 }}>The Wearable Presence</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,2.8vw,38px)', fontWeight:300, color:'#fff', lineHeight:1.3, marginBottom:28 }}>Authority Forged Into Matter</h2>
              {(story.wearable_presence || 'The Queen of Taif Crown Ring does not decorate the hand. It defines it. The center diamond captures attention. The crown architecture commands it. The gold structure preserves it. It feels less like jewelry. And more like authority forged into matter.').split('. ').filter(Boolean).map((s: string, i: number) => (
                <motion.p key={i} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                  transition={{ duration:.8, delay: i * 0.09 }}
                  style={{ fontFamily:SERIF, fontSize:16, fontWeight:300, color:`rgba(255,255,255,${0.7 - i*0.06})`, lineHeight:1.82, marginBottom:6 }}>
                  {s.trim()}.
                </motion.p>
              ))}
              <div style={{ marginTop:36, display:'flex', flexDirection:'column', gap:0 }}>
                {[['Regal','The presence of inherited authority'],['Commanding','Attention without effort'],['Timeless','Beyond seasons and trends']].map(([w, d], i) => (
                  <motion.div key={w} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ duration:.7, delay:.3 + i*.1 }}
                    style={{ display:'flex', alignItems:'center', gap:18, padding:'16px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width:1, height:34, background:`linear-gradient(180deg,${GOLD},transparent)`, flexShrink:0 }}/>
                    <div>
                      <div style={{ fontFamily:SERIF, fontSize:18, color:GOLD, marginBottom:3 }}>{w}</div>
                      <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.18em', color:'rgba(255,255,255,0.28)' }}>{d}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:36 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:1.2, delay:.28 }}
              style={{ position:'relative' }}>
              <div style={{ position:'relative', overflow:'hidden', border:'1px solid rgba(201,160,84,0.12)' }}>
                <img src={vaultImg} alt="Sovereign Vault" style={{ width:'100%', display:'block' }}/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(201,160,84,0.05),transparent 50%)' }}/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 55%,rgba(3,3,3,0.72))' }}/>
              </div>
              <div style={{ padding:'16px 20px', border:'1px solid rgba(201,160,84,0.1)', borderTop:'none', background:'rgba(0,0,0,0.5)' }}>
                <div style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:13, color:'rgba(201,160,84,0.6)', lineHeight:1.6 }}>
                  Museum-Grade Sovereign Vault — Architectural Black Hardwood with Royal Crimson Interiors
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Divider/>

        {/* ════════════ 5. INVESTMENT TERMINAL ══════════════════════════════ */}
        <div style={{ background:'linear-gradient(180deg,#030303,#060505)', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(201,160,84,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,160,84,0.025) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1060, margin:'0 auto', position:'relative', zIndex:2 }}>
            <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:56 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>Investment Asset Matrix</div>
              <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', margin:0 }}>Sovereign Asset Terminal</h2>
                <div style={{ fontFamily:MONO, fontSize:8, color:'#00ff9d', letterSpacing:'0.2em', border:'1px solid rgba(0,255,157,0.18)', padding:'4px 12px', display:'flex', alignItems:'center', gap:7 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:'#00ff9d', boxShadow:'0 0 6px #00ff9d' }}/> LIVE
                </div>
                <div className="term-cursor"/>
              </div>
            </motion.div>

            {/* Terminal header */}
            <div style={{ background:'rgba(201,160,84,0.055)', border:'1px solid rgba(201,160,84,0.13)', padding:'11px 24px', display:'flex', justifyContent:'space-between', fontFamily:MONO, fontSize:8, color:'rgba(201,160,84,0.45)', letterSpacing:'0.18em', flexWrap:'wrap', gap:10 }}>
              <span>QUEEN-OF-TAIF-CROWN-RING</span>
              <span>ASSET CLASS: HIGH JEWELRY</span>
              <span>USD 2,500.00</span>
            </div>

            <div style={{ border:'1px solid rgba(201,160,84,0.09)', borderTop:'none', padding:'4px 24px 12px', background:'rgba(0,0,0,0.38)' }}>
              {[
                { label:'ASSET CATEGORY',             value:'High Jewelry Sovereign Object',       gold:true,  delay:0   },
                { label:'INTRINSIC VALUE',             value:'18K Gold + Natural VVS Diamonds',     gold:true,  delay:60  },
                { label:'COLLECTIBILITY',              value:'Archive Objects Series',               gold:false, delay:120 },
                { label:'OWNERSHIP STRUCTURE',         value:'Physical Asset + Digital NFT',        gold:false, delay:180 },
                { label:'TRANSFERABILITY',             value:'Generational Heirloom',               gold:false, delay:240 },
                { label:'PRESERVATION HORIZON',       value:'Multi-Generational',                  gold:false, delay:300 },
                { label:'WEALTH CLASSIFICATION',      value:'Luxury Hard Asset',                   gold:false, delay:360 },
                { label:'LEGACY STATUS',              value:'Permanent',                            gold:false, delay:420 },
                { label:'FUTURE SIGNIFICANCE',        value:'Founder-Era Collectible',             gold:false, delay:480 },
                { label:'BLOCKCHAIN REGISTRY',        value:'Polygon Mainnet — Verified',          gold:false, delay:540 },
                { label:'RETAIL VALUATION PKR',       value:'Rs 700,000',                          gold:true,  delay:600 },
                { label:'INTERNATIONAL VALUATION',    value:'$2,500 USD',                          gold:true,  delay:660 },
              ].map(item => <TermRow key={item.label} {...item}/>)}
            </div>

            {/* KPI row */}
            <div className="qr-invest-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, marginTop:1 }}>
              {[
                { val:'$2,500', lab:'International Value', c:GOLD2 },
                { val:'1.30ct', lab:'Diamond Reserve',     c:GOLD  },
                { val:'5.5g',   lab:'Gold Weight',         c:'#e8c97a' },
                { val:'∞',      lab:'Legacy Horizon',      c:'rgba(201,160,84,0.55)' },
              ].map(({ val, lab, c }) => (
                <div key={lab} style={{ background:'rgba(201,160,84,0.04)', border:'1px solid rgba(201,160,84,0.09)', padding:'28px 20px', textAlign:'center' }}>
                  <div style={{ fontFamily:SERIF, fontSize:30, fontWeight:300, color:c, marginBottom:6 }}>{val}</div>
                  <div style={{ fontFamily:MONO, fontSize:6.5, letterSpacing:'0.3em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase' }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════ 6. SOVEREIGN VAULT ══════════════════════════════════ */}
        <div id="qr-vault" style={{ background:'#030303', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:1060, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ textAlign:'center', marginBottom:72 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>The Presentation Vault</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', marginBottom:16 }}>Museum-Grade Sovereign Vault</h2>
              <p style={{ fontFamily:SERIF, fontSize:16, color:'rgba(255,255,255,0.38)', maxWidth:580, margin:'0 auto', lineHeight:1.7 }}>
                {vault.construction || 'Crafted from architectural black hardwood with royal crimson interiors. Protected through integrated NFC authentication technology.'}
              </p>
            </motion.div>

            <div className="qr-vault-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'start' }}>
              <div>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:20 }}>Inside Every Vault</div>
                {vaultItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:-18 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ duration:.55, delay: i * 0.1 }}
                    style={{ display:'flex', alignItems:'center', gap:16, padding:'13px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ width:20, height:20, border:'1px solid rgba(201,160,84,0.28)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <div style={{ width:6, height:6, background:GOLD, transform:'rotate(45deg)' }}/>
                    </div>
                    <span style={{ fontFamily:SERIF, fontSize:15, color:'rgba(255,255,255,0.68)', fontWeight:300 }}>{item}</span>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.9 }}
                  style={{ marginTop:28, padding:'18px 22px', border:'1px solid rgba(201,160,84,0.18)', background:'rgba(201,160,84,0.035)' }}>
                  <div style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:15, color:GOLD, lineHeight:1.6 }}>
                    "This is not packaging. This is preservation."
                  </div>
                </motion.div>
              </div>

              <motion.div initial={{ opacity:0, scale:.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:1.2 }}>
                <div style={{ position:'relative', border:'1px solid rgba(201,160,84,0.12)', overflow:'hidden' }}>
                  <img src={vaultImg} alt="Sovereign Vault" style={{ width:'100%', display:'block' }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(201,160,84,0.055),transparent)' }}/>
                </div>
                <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:12, padding:'14px 18px', border:'1px solid rgba(201,160,84,0.1)', background:'rgba(0,0,0,0.48)' }}>
                  <Shield size={13} color={GOLD}/>
                  <span style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.22em', color:'rgba(201,160,84,0.65)', textTransform:'uppercase' }}>NFC Authentication Technology Integrated</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Divider/>

        {/* ════════════ 7. NFT HOLOGRAPHIC PASSPORT ═════════════════════════ */}
        <div style={{ background:'linear-gradient(180deg,#030303,#08050c)', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:1060, margin:'0 auto' }}>
            <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ textAlign:'center', marginBottom:72 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>Digital Twin Identity</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em' }}>Sovereign Blockchain Passport</h2>
            </motion.div>

            <div className="qr-nft-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56 }}>

              {/* Holographic card */}
              <motion.div initial={{ opacity:0, rotateY:-15 }} whileInView={{ opacity:1, rotateY:0 }} viewport={{ once:true }}
                transition={{ duration:1.4, ease:[0.22,1,0.36,1] }} style={{ perspective:1200 }}>
                <div className="holo-sheen" style={{ position:'relative', border:'1px solid rgba(201,160,84,0.28)', background:'linear-gradient(135deg,rgba(6,3,14,0.98),rgba(18,10,5,0.98))', padding:'44px', overflow:'hidden', minHeight:360 }}>
                  <div style={{ position:'absolute', top:14, right:14, width:44, height:44, border:'1px solid rgba(201,160,84,0.18)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
                    <Crown size={18} color={GOLD}/>
                  </div>
                  <div style={{ position:'relative', zIndex:2 }}>
                    <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.48em', color:'rgba(201,160,84,0.38)', marginBottom:28, textTransform:'uppercase' }}>
                      Digital Twin · Sovereign Passport
                    </div>
                    <div style={{ fontFamily:SERIF, fontSize:26, fontWeight:300, color:'#fff', letterSpacing:'0.05em', marginBottom:4 }}>
                      {nft.title || 'Founder Archive Edition'}
                    </div>
                    <div style={{ fontFamily:MONO, fontSize:9, color:GOLD, letterSpacing:'0.2em', marginBottom:36 }}>
                      {nft.rarity || 'FOUNDER ARCHIVE'} · {nft.blockchain || 'Polygon'}
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                      {Object.entries((nft.attributes as Record<string,unknown>) || {
                        'Metal':'Solid 18K Yellow Gold','Center Stone':'Natural VVS Diamond',
                        'Total Diamonds':'1.30 Carats','Authentication':'Polygon Verified',
                        'Physical Pairing':'Yes','Status':'Active Sovereign Passport',
                      }).slice(0,6).map(([k,v]) => (
                        <div key={k} style={{ borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:10 }}>
                          <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.18em', color:'rgba(255,255,255,0.22)', textTransform:'uppercase', marginBottom:3 }}>{k}</div>
                          <div style={{ fontFamily:SERIF, fontSize:12, color:'rgba(201,160,84,0.88)' }}>{String(v)}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:28, padding:'11px 14px', background:'rgba(0,255,157,0.045)', border:'1px solid rgba(0,255,157,0.1)', display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:'#00ff9d', boxShadow:'0 0 7px #00ff9d', flexShrink:0 }}/>
                      <span style={{ fontFamily:MONO, fontSize:7.5, letterSpacing:'0.18em', color:'rgba(0,255,157,0.65)', textTransform:'uppercase', flex:1 }}>
                        {NFT_CONTRACT.slice(0,14)}...{NFT_CONTRACT.slice(-6)}
                      </span>
                      <CopyBtn text={NFT_CONTRACT}/>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Privileges */}
              <motion.div initial={{ opacity:0, x:36 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:1 }}>
                <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:24 }}>Holder Privileges</div>
                {nftPrivs.map((p, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:18 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ duration:.55, delay: i * 0.065 }} className="priv-row">
                    <Gem size={11} color={GOLD} style={{ flexShrink:0 }}/>
                    <span style={{ fontFamily:SERIF, fontSize:14, color:'rgba(255,255,255,0.65)', fontWeight:300 }}>{p}</span>
                  </motion.div>
                ))}
                <div style={{ marginTop:28, padding:'18px 22px', border:'1px solid rgba(201,160,84,0.14)', background:'rgba(201,160,84,0.03)' }}>
                  <div style={{ fontFamily:MONO, fontSize:7.5, letterSpacing:'0.18em', color:'rgba(201,160,84,0.45)', marginBottom:7, textTransform:'uppercase' }}>Luxury objects may be replicated.</div>
                  <div style={{ fontFamily:SERIF, fontSize:15, color:'rgba(255,255,255,0.4)', lineHeight:1.65, fontStyle:'italic' }}>Provenance cannot.</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <Divider/>

        {/* ════════════ 8. ACQUISITION CONSOLE ══════════════════════════════ */}
        <div id="acquire" style={{ background:'#030303', padding:'110px 40px', position:'relative', overflow:'hidden' }}>
          <GoldDust n={36}/>
          <div style={{ maxWidth:860, margin:'0 auto', position:'relative', zIndex:2 }}>
            <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ textAlign:'center', marginBottom:56 }}>
              <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:14 }}>Sovereign Acquisition Console</div>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3vw,42px)', fontWeight:300, color:'#fff', letterSpacing:'0.05em', marginBottom:10 }}>Acquire Sovereign Ownership</h2>
              <p style={{ fontFamily:SERIF, fontSize:15, color:'rgba(255,255,255,0.3)' }}>
                Queen of Taif Crown Ring · $2,500 USD · Rs {formatPKR(700000)} PKR
              </p>
            </motion.div>

            {orderResult ? (
              <motion.div initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.8 }}
                style={{ border:'1px solid rgba(0,255,157,0.18)', background:'rgba(0,255,157,0.025)', padding:'56px 44px', textAlign:'center' }}>
                <div style={{ width:52, height:52, borderRadius:'50%', border:'1px solid rgba(0,255,157,0.28)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px' }}>
                  <Check size={22} color="#00ff9d"/>
                </div>
                <h3 style={{ fontFamily:SERIF, fontSize:26, fontWeight:300, color:'#fff', marginBottom:6 }}>Allocation Confirmed</h3>
                <p style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.28em', color:'rgba(255,255,255,0.36)', marginBottom:28 }}>YOUR SOVEREIGN ARCHIVE OBJECT IS RESERVED</p>
                <div style={{ display:'flex', justifyContent:'center', gap:36, marginBottom:36, flexWrap:'wrap' }}>
                  {[['Order ID', orderResult.order_id], ['Reference', orderResult.order_ref], ['Tracking', orderResult.tracking_ref]].map(([l,v]) => (
                    <div key={l}><div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.28em', color:'rgba(255,255,255,0.28)', marginBottom:6, textTransform:'uppercase' }}>{l}</div><div style={{ fontFamily:SERIF, fontSize:15, color:GOLD }}>{v}</div></div>
                  ))}
                </div>
                <Link href={`/track/${orderResult.tracking_ref}`} style={{ display:'inline-block', border:`1px solid ${GOLD}`, color:GOLD, padding:'13px 38px', fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', textDecoration:'none', fontFamily:MONO }}>
                  Track Sovereign Delivery
                </Link>
              </motion.div>
            ) : (
              <>
                {/* Payment tabs */}
                <div className="qr-pay-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, marginBottom:44 }}>
                  {([['crypto','Crypto · USDT/USDC'],['pkr_manual','Bank Transfer'],['cod','Cash on Delivery']] as [PayMethod,string][]).map(([m,l]) => (
                    <button key={m} onClick={() => setPayMethod(m)} style={{ padding:'19px 14px', background: payMethod===m ? 'rgba(201,160,84,0.09)' : 'rgba(255,255,255,0.02)', border: payMethod===m ? `1px solid ${GOLD}` : '1px solid rgba(255,255,255,0.07)', color: payMethod===m ? GOLD2 : 'rgba(255,255,255,0.36)', fontFamily:MONO, fontSize:8, letterSpacing:'0.22em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}>
                      {l}
                    </button>
                  ))}
                </div>

                {/* Shipping */}
                <div style={{ marginBottom:36 }}>
                  <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:18 }}>Delivery Information</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
                    {([['name','Full Name'],['phone','Phone Number']] as [keyof typeof shipping,string][]).map(([f,p]) => (
                      <input key={f} value={shipping[f]} onChange={e => setShipping(s => ({...s,[f]:e.target.value}))} placeholder={p} style={inputSt}/>
                    ))}
                  </div>
                  <input value={shipping.address} onChange={e => setShipping(s => ({...s,address:e.target.value}))} placeholder="Delivery Address" style={{...inputSt,marginBottom:10}}/>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    <input value={shipping.city} onChange={e => setShipping(s => ({...s,city:e.target.value}))} placeholder="City" style={inputSt}/>
                    <input value={shipping.note} onChange={e => setShipping(s => ({...s,note:e.target.value}))} placeholder="Special Instructions" style={inputSt}/>
                  </div>
                </div>

                {/* Payment panels */}
                <AnimatePresence mode="wait">
                  {payMethod === 'crypto' && (
                    <motion.div key="cr" initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-14 }} transition={{ duration:.45 }}>
                      <div style={{ marginBottom:20, padding:'14px 22px', border:'1px solid rgba(201,160,84,0.1)', background:'rgba(201,160,84,0.025)' }}>
                        <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.22em', color:'rgba(201,160,84,0.45)', marginBottom:6, textTransform:'uppercase' }}>Polygon Network · USDT / USDC / OKBOND</div>
                        <div style={{ fontFamily:SERIF, fontSize:13, color:'rgba(255,255,255,0.36)', lineHeight:1.6 }}>10% discount with OKBOND · Blockchain confirmed on Polygon</div>
                      </div>
                      <Web3PaySection priceUsd={product.price_usd} onSuccess={handleCryptoSuccess}/>
                    </motion.div>
                  )}

                  {payMethod === 'pkr_manual' && (
                    <motion.div key="pk" initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-14 }} transition={{ duration:.45 }}>
                      <div style={{ border:'1px solid rgba(201,160,84,0.1)', padding:'36px', background:'rgba(0,0,0,0.28)', marginBottom:22 }}>
                        <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:24 }}>Bank Transfer Details</div>
                        {[
                          { lab:'Easypaisa', val:EASYPAISA_NUMBER, sub:EASYPAISA_NAME },
                          { lab:'UBL IBAN', val:UBL_IBAN, sub:'Bank Transfer' },
                          { lab:'Amount', val:`Rs ${formatPKR(product.price_pkr)}`, sub:'Exact Amount Required' },
                        ].map(({ lab,val,sub }) => (
                          <div key={lab} style={{ marginBottom:20, paddingBottom:20, borderBottom:'1px solid rgba(255,255,255,0.045)' }}>
                            <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.28em', color:'rgba(255,255,255,0.24)', textTransform:'uppercase', marginBottom:5 }}>{lab}</div>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                              <span style={{ fontFamily:SERIF, fontSize:15, color:GOLD }}>{val}</span>
                              <CopyBtn text={val}/>
                            </div>
                            <div style={{ fontFamily:MONO, fontSize:7.5, color:'rgba(255,255,255,0.22)', marginTop:3 }}>{sub}</div>
                          </div>
                        ))}
                        <div style={{ border:`2px dashed ${receipt ? 'rgba(0,255,157,0.28)' : 'rgba(201,160,84,0.14)'}`, padding:'28px', textAlign:'center', cursor:'pointer', position:'relative' }}
                          onClick={() => document.getElementById('receipt-up')?.click()}>
                          <input id="receipt-up" type="file" accept="image/*,application/pdf" style={{ display:'none' }} onChange={e => setReceipt(e.target.files?.[0] || null)}/>
                          {receipt ? (
                            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
                              <Check size={15} color="#00ff9d"/>
                              <span style={{ fontFamily:SERIF, fontSize:14, color:'rgba(0,255,157,0.75)' }}>{receipt.name}</span>
                              <button onClick={e=>{e.stopPropagation();setReceipt(null)}} style={{ background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.28)' }}><X size={13}/></button>
                            </div>
                          ) : (
                            <>
                              <Upload size={18} color={GOLD} style={{ marginBottom:10 }}/>
                              <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.28em', color:'rgba(201,160,84,0.45)', textTransform:'uppercase' }}>Upload Payment Receipt</div>
                            </>
                          )}
                        </div>
                      </div>
                      <button onClick={handleManual} disabled={submitting||!receipt}
                        style={{ width:'100%', background: receipt ? 'linear-gradient(135deg,rgba(201,160,84,0.18),rgba(201,160,84,0.07))' : 'rgba(255,255,255,0.025)', border:`1px solid ${receipt ? GOLD : 'rgba(255,255,255,0.09)'}`, color: receipt ? GOLD2 : 'rgba(255,255,255,0.2)', padding:'19px', fontFamily:MONO, fontSize:9, letterSpacing:'0.42em', textTransform:'uppercase', cursor: receipt ? 'pointer' : 'not-allowed', transition:'all .3s' }}>
                        {submitting ? 'Processing Allocation...' : 'Submit Sovereign Allocation'}
                      </button>
                    </motion.div>
                  )}

                  {payMethod === 'cod' && (
                    <motion.div key="cd" initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-14 }} transition={{ duration:.45 }}>
                      <div style={{ border:'1px solid rgba(201,160,84,0.1)', padding:'36px', background:'rgba(0,0,0,0.28)', marginBottom:22 }}>
                        <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,160,84,0.35)', marginBottom:20 }}>Cash on Delivery</div>
                        <p style={{ fontFamily:SERIF, fontSize:16, color:'rgba(255,255,255,0.45)', lineHeight:1.82, marginBottom:20 }}>
                          Your Sovereign Archive Object will be delivered to your address. Payment collected upon delivery by our certified courier. A 5% surcharge applies for COD allocations.
                        </p>
                        <div style={{ display:'flex', gap:28, flexWrap:'wrap' }}>
                          <div>
                            <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.28em', color:'rgba(255,255,255,0.24)', textTransform:'uppercase', marginBottom:5 }}>COD Amount (PKR)</div>
                            <div style={{ fontFamily:SERIF, fontSize:19, color:GOLD }}>Rs {formatPKR(Math.round(product.price_pkr * 1.05))}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily:MONO, fontSize:7, letterSpacing:'0.28em', color:'rgba(255,255,255,0.24)', textTransform:'uppercase', marginBottom:5 }}>Delivery Time</div>
                            <div style={{ fontFamily:SERIF, fontSize:19, color:GOLD }}>3–5 Business Days</div>
                          </div>
                        </div>
                      </div>
                      <button onClick={handleCOD} disabled={submitting||!shipping.name||!shipping.phone||!shipping.address}
                        style={{ width:'100%', background:'linear-gradient(135deg,rgba(201,160,84,0.14),rgba(201,160,84,0.05))', border:`1px solid ${GOLD}`, color:GOLD2, padding:'19px', fontFamily:MONO, fontSize:9, letterSpacing:'0.42em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}>
                        {submitting ? 'Reserving Allocation...' : 'Confirm COD Allocation'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <div style={{ marginTop:14, padding:'13px 18px', border:'1px solid rgba(255,80,80,0.18)', background:'rgba(255,80,80,0.04)', fontFamily:MONO, fontSize:8.5, letterSpacing:'0.14em', color:'rgba(255,120,120,0.75)' }}>
                    {error}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ════════════ FINAL STATEMENT ═════════════════════════════════════ */}
        <div style={{ background:'linear-gradient(180deg,#030303,#060304)', padding:'90px 40px', textAlign:'center', borderTop:'1px solid rgba(201,160,84,0.07)' }}>
          <div style={{ maxWidth:780, margin:'0 auto' }}>
            <Divider/>
            <motion.p initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1.2 }}
              style={{ fontFamily:SERIF, fontStyle:'italic', fontSize:'clamp(17px,2.2vw,26px)', fontWeight:300, color:'rgba(255,255,255,0.28)', lineHeight:1.72, marginTop:52 }}>
              {story.final_positioning || 'Queen of Taif Crown Ring is not jewelry. It is a sovereign asset — a physical reserve of gold, diamonds, ownership, and legacy.'}
            </motion.p>
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:1, delay:.6 }}
              style={{ marginTop:44, fontFamily:SERIF, fontSize:13, color:'rgba(201,160,84,0.3)', letterSpacing:'0.15em' }}>
              House of Shamim Forever · The Archive Objects · Chapter III
            </motion.div>
          </div>
        </div>
      </>
    )
  }
  