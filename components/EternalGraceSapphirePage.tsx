'use client'

  import { useEffect, useRef, useState, useCallback } from 'react'
  import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
  import Link from 'next/link'
  import { Copy, Check, Upload, X, ChevronDown, Shield, Gem, Droplets } from 'lucide-react'
  import { formatPKR } from '@/lib/utils'
  import type { Product } from '@/types'
  import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
  import { useAccount } from 'wagmi'

  type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
  interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

  const NFT_CONTRACT     = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
  const EASYPAISA_NUMBER = '03367970004'
  const EASYPAISA_NAME   = 'M Faisal'
  const UBL_IBAN         = 'PK13UNIL0109000318870498'
  const SERIF   = "'Cormorant Garamond', Georgia, serif"
  const MONO    = "'Courier New', Courier, monospace"
  const SAPH    = '#1A56DB'
  const SAPH2   = '#3B82F6'
  const SAPH_DK = '#0E2F6A'
  const WG      = '#D4CCB8'
  const WG2     = '#EDE9DD'
  const DIAM    = '#EEF2FF'
  const BG      = '#020509'

  const PAGE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
    html{scroll-behavior:smooth}
    .sg-reveal{opacity:0;transform:translateY(38px)}
    .sg-reveal.vis{opacity:1;transform:translateY(0);transition:opacity 1.1s cubic-bezier(.22,1,.36,1),transform 1.1s cubic-bezier(.22,1,.36,1)}
    .sg-table td{padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:top}
    .sg-table tr:last-child td{border-bottom:none}
    .sg-holo::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(26,86,219,0.1) 0%,rgba(212,204,184,0.06) 40%,transparent 70%);animation:sgholo 6s ease-in-out infinite alternate;pointer-events:none;z-index:1}
    @keyframes sgholo{0%{opacity:.3;transform:rotate(0deg) scale(1)}100%{opacity:.9;transform:rotate(1deg) scale(1.01)}}
    .sg-scanline{position:absolute;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(59,130,246,.55),transparent);animation:sgscan 4s ease-in-out infinite;pointer-events:none;z-index:5}
    @keyframes sgscan{0%{top:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{top:100%;opacity:0}}
    .sg-cursor{display:inline-block;width:7px;height:13px;background:#3B82F6;animation:sgblink .9s step-end infinite;vertical-align:middle;margin-left:4px}
    @keyframes sgblink{0%,100%{opacity:1}50%{opacity:0}}
    .sg-priv{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.04)}
    .sg-priv:last-child{border-bottom:none}
    .sg-piece{border:1px solid rgba(26,86,219,0.16);padding:32px 28px;background:rgba(26,86,219,0.025);transition:border-color .4s,background .4s,transform .3s}
    .sg-piece:hover{border-color:rgba(59,130,246,0.38);background:rgba(26,86,219,0.06);transform:translateY(-3px)}
    @media(max-width:768px){
      .sg-hero-grid{grid-template-columns:1fr!important}
      .sg-img-pair{grid-template-columns:1fr!important}
      .sg-gem-grid{grid-template-columns:1fr!important}
      .sg-nft-grid{grid-template-columns:1fr!important}
      .sg-invest-grid{grid-template-columns:1fr 1fr!important}
      .sg-chest-grid{grid-template-columns:1fr!important}
      .sg-pay-grid{grid-template-columns:1fr 1fr!important}
      .sg-pieces-grid{grid-template-columns:1fr!important}
    }
  `

  function CopyBtn({ text }: { text: string }) {
    const [c, setC] = useState(false)
    return (
      <button onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(()=>setC(false),2000) }}
        style={{ display:'flex', alignItems:'center', gap:6, color:WG, background:'none', border:'none', cursor:'pointer' }}>
        {c?<Check size={10}/>:<Copy size={10}/>}
        <span style={{ fontSize:7, letterSpacing:'0.3em', textTransform:'uppercase' as const }}>{c?'Copied':'Copy'}</span>
      </button>
    )
  }

  /* ── Ocean mist particles ───────────────────────────────────────────────── */
  function OceanMist({ n=50 }: { n?:number }) {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
      const c=ref.current; if(!c) return
      const ctx=c.getContext('2d')!
      const resize=()=>{ c.width=c.offsetWidth; c.height=c.offsetHeight }
      resize(); window.addEventListener('resize',resize)
      const cols=['rgba(26,86,219,','rgba(59,130,246,','rgba(212,204,184,']
      const pts=Array.from({length:n},()=>({
        x:Math.random(), y:Math.random(), r:Math.random()*2+0.4,
        vy:-(Math.random()*0.12+0.03), vx:(Math.random()-.5)*0.04,
        a:Math.random(), va:(Math.random()-.5)*0.004, col:cols[Math.floor(Math.random()*3)]
      }))
      let raf:number
      const tick=()=>{
        const W=c.width, H=c.height
        ctx.clearRect(0,0,W,H)
        pts.forEach(p=>{
          p.x+=p.vx/W; p.y+=p.vy/H; p.a+=p.va
          if(p.a<=0||p.a>=1) p.va*=-1
          if(p.y<0){p.y=1; p.x=Math.random()}
          ctx.beginPath(); ctx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2)
          ctx.fillStyle=p.col+(p.a*.45)+')'; ctx.fill()
        })
        raf=requestAnimationFrame(tick)
      }
      tick()
      return()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
    },[n])
    return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
  }

  /* ── Sapphire light ripple engine ───────────────────────────────────────── */
  function HorizonEngine() {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
      const c=ref.current; if(!c) return
      const ctx=c.getContext('2d')!
      const resize=()=>{ c.width=c.offsetWidth; c.height=c.offsetHeight }
      resize(); window.addEventListener('resize',resize)
      let t=0
      const waves=Array.from({length:5},(_,i)=>({ phase: i*(Math.PI*2/5), speed:0.008+i*0.003, amp:30+i*12 }))
      const orbs=Array.from({length:3},(_,i)=>({ x:0.2+i*0.3, y:0.4+i*0.1, r:80+i*60, phase:i*2.1, speed:0.006 }))
      let raf:number
      const draw=()=>{
        t++
        const W=c.width, H=c.height
        ctx.clearRect(0,0,W,H)
        orbs.forEach(o=>{
          const ox=o.x*W+Math.sin(t*o.speed+o.phase)*40
          const oy=o.y*H+Math.cos(t*o.speed*0.7+o.phase)*25
          const grd=ctx.createRadialGradient(ox,oy,0,ox,oy,o.r*(0.8+Math.sin(t*0.02+o.phase)*0.2))
          grd.addColorStop(0,'rgba(26,86,219,0.07)'); grd.addColorStop(0.5,'rgba(59,130,246,0.04)'); grd.addColorStop(1,'transparent')
          ctx.fillStyle=grd; ctx.fillRect(0,0,W,H)
        })
        const horizY = H*0.75
        waves.forEach(w=>{
          ctx.beginPath(); ctx.moveTo(0,horizY)
          for(let x=0;x<W;x+=4){
            const y=horizY+Math.sin(x*0.015+t*w.speed+w.phase)*w.amp
            ctx.lineTo(x,y)
          }
          ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath()
          ctx.fillStyle='rgba(26,86,219,0.015)'; ctx.fill()
        })
        raf=requestAnimationFrame(draw)
      }
      draw()
      return()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
    },[])
    return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:3}}/>
  }

  /* ── Sapphire gauge ─────────────────────────────────────────────────────── */
  function SapphireGauge({ label, value, pct, color=SAPH, delay=0 }: { label:string; value:string; pct:number; color?:string; delay?:number }) {
    const [go,setGo]=useState(false); const ref=useRef<HTMLDivElement>(null)
    useEffect(()=>{
      const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting) setTimeout(()=>setGo(true),delay)},{threshold:.3})
      if(ref.current) obs.observe(ref.current); return()=>obs.disconnect()
    },[delay])
    const R=38, circ=2*Math.PI*R
    const gId='sg-'+label.replace(/\s/g,'')
    return (
      <div ref={ref} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <svg width={88} height={88} style={{transform:'rotate(-90deg)'}}>
          <circle cx={44} cy={44} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={2}/>
          <circle cx={44} cy={44} r={R} fill="none" stroke={'url(#'+gId+')'} strokeWidth={2}
            strokeDasharray={circ} strokeDashoffset={go?circ*(1-pct):circ} strokeLinecap="round"
            style={{transition:go?'2s cubic-bezier(.22,1,.36,1)':'none'}}/>
          <defs><linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
            <stop offset="100%" stopColor={color}/>
          </linearGradient></defs>
          <text x={44} y={44} textAnchor="middle" dominantBaseline="middle" fill={color}
            style={{fontFamily:SERIF,fontSize:11,fontWeight:300,transform:'rotate(90deg)',transformOrigin:'44px 44px'}}>
            {value}
          </text>
        </svg>
        <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.3em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.28)',textAlign:'center'}}>{label}</div>
      </div>
    )
  }

  /* ── Terminal row ───────────────────────────────────────────────────────── */
  function TermRow({ label, value, blue, delay=0 }: { label:string; value:string; blue?:boolean; delay?:number }) {
    const [show,setShow]=useState(false); const ref=useRef<HTMLDivElement>(null)
    useEffect(()=>{
      const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting) setTimeout(()=>setShow(true),delay)},{threshold:.05})
      if(ref.current) obs.observe(ref.current); return()=>obs.disconnect()
    },[delay])
    return (
      <div ref={ref} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',opacity:show?1:0,transform:show?'translateX(0)':'translateX(-12px)',transition:'opacity .5s, transform .5s'}}>
        <span style={{fontFamily:MONO,fontSize:8.5,letterSpacing:'0.16em',color:'rgba(255,255,255,0.25)',textTransform:'uppercase' as const}}>{label}</span>
        <span style={{fontFamily:blue?SERIF:MONO,fontSize:blue?15:10,color:blue?WG2:'rgba(212,204,184,0.55)',letterSpacing:blue?'0.04em':'0.15em',fontWeight:blue?300:400}}>{value}</span>
      </div>
    )
  }

  /* ── Elegant divider ────────────────────────────────────────────────────── */
  function Divider() {
    return (
      <div style={{display:'flex',alignItems:'center',gap:16,maxWidth:560,margin:'0 auto',padding:'0 40px'}}>
        <div style={{flex:1,height:1,background:'linear-gradient(90deg,transparent,rgba(26,86,219,0.3),rgba(212,204,184,0.25))'}}/>
        <div style={{width:5,height:5,background:SAPH,transform:'rotate(45deg)',opacity:.6}}/>
        <div style={{width:3,height:3,background:WG,transform:'rotate(45deg)',opacity:.35,margin:'0 5px'}}/>
        <div style={{width:5,height:5,background:SAPH2,transform:'rotate(45deg)',opacity:.5}}/>
        <div style={{flex:1,height:1,background:'linear-gradient(90deg,rgba(212,204,184,0.25),rgba(26,86,219,0.3),transparent)'}}/>
      </div>
    )
  }

  /* ══════════════════════════════════════════════════════════════════════════
     MAIN COMPONENT
  ══════════════════════════════════════════════════════════════════════════ */
  export default function EternalGraceSapphirePage({ product }: { product: Product }) {
    const [payMethod,setPayMethod]=useState<PayMethod>('crypto')
    const [receipt,setReceipt]=useState<File|null>(null)
    const [orderResult,setOrderResult]=useState<OrderResult|null>(null)
    const [submitting,setSubmitting]=useState(false)
    const [error,setError]=useState('')
    const [shipping,setShipping]=useState({name:'',phone:'',address:'',city:'',note:''})
    useAccount()
    const heroRef=useRef<HTMLDivElement>(null)
    const {scrollYProgress}=useScroll({target:heroRef,offset:['start start','end start']})
    const heroY=useTransform(scrollYProgress,[0,1],['0%','22%'])
    const heroOp=useTransform(scrollYProgress,[0,0.7],[1,0])

    const story=(() => { try { return typeof product.story==='string'?JSON.parse(product.story):(product.story||{}) } catch{return{}} })()
    const nft=story.nft||{}; const vault=story.vault||{}; const invest=story.investment||{}
    const imgs=product.images||[]
    const heroImg=imgs[0]||'/products/eternal-grace-sapphire-set/sapphire-model.png'
    const setImg=imgs[1]||'/products/eternal-grace-sapphire-set/sapphire-set.png'
    const pieces:string[]=Array.isArray(story.three_piece_masterwork)?story.three_piece_masterwork:['Royal Sapphire Pendant Necklace','Pair Of Sovereign Sapphire Earrings','Sovereign Sapphire Ring']
    const privs:string[]=Array.isArray(nft.privileges)?nft.privileges:['Archive Collector Status','Sovereign Vault Access','Future Jewelry Allocations','Private House Invitations','Collector Registry Recognition','Priority Authentication Services','Concierge Restoration Program','Lifetime Provenance Protection','Legacy Registry Membership','Early Access To Future Archive Releases']
    const vaultIncludes:string[]=Array.isArray(vault.includes)?vault.includes:['Founder Authentication Certificate','Gemstone Documentation','Metal Purity Documentation','Archive Ownership Registry','Digital Twin NFT Passport']

    useEffect(()=>{
      const obs=new IntersectionObserver(entries=>{
        entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})
      },{threshold:.1})
      document.querySelectorAll('.sg-reveal').forEach(el=>obs.observe(el))
      return()=>obs.disconnect()
    },[])

    const handleCryptoSuccess=useCallback(async(txHash:string,coin:CoinType)=>{
      setSubmitting(true); setError('')
      try {
        const f=new FormData()
        Object.entries(shipping).forEach(([k,v])=>f.append(k,v))
        f.append('product_id',product.id); f.append('quantity','1')
        f.append('payment_method',coin.toLowerCase()); f.append('tx_hash',txHash)
        const r=await fetch('/api/orders',{method:'POST',body:f})
        const d=await r.json(); if(!r.ok) throw new Error(d.error||'Order failed')
        setOrderResult(d)
      } catch(e:any){setError(e.message)} finally{setSubmitting(false)}
    },[shipping,product.id])

    const handleManual=useCallback(async()=>{
      if(!receipt){setError('Please upload payment receipt'); return}
      setSubmitting(true); setError('')
      try {
        const f=new FormData()
        Object.entries(shipping).forEach(([k,v])=>f.append(k,v))
        f.append('product_id',product.id); f.append('quantity','1')
        f.append('payment_method','easypaisa'); f.append('receipt',receipt)
        const r=await fetch('/api/orders',{method:'POST',body:f})
        const d=await r.json(); if(!r.ok) throw new Error(d.error||'Order failed')
        setOrderResult(d)
      } catch(e:any){setError(e.message)} finally{setSubmitting(false)}
    },[receipt,shipping,product.id])

    const handleCOD=useCallback(async()=>{
      setSubmitting(true); setError('')
      try {
        const f=new FormData()
        Object.entries(shipping).forEach(([k,v])=>f.append(k,v))
        f.append('product_id',product.id); f.append('quantity','1'); f.append('payment_method','cod')
        const r=await fetch('/api/orders',{method:'POST',body:f})
        const d=await r.json(); if(!r.ok) throw new Error(d.error||'Order failed')
        setOrderResult(d)
      } catch(e:any){setError(e.message)} finally{setSubmitting(false)}
    },[shipping,product.id])

    const inputSt:React.CSSProperties={width:'100%',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(26,86,219,0.12)',color:'#fff',padding:'14px 18px',fontSize:12,letterSpacing:'0.07em',fontFamily:SERIF,outline:'none',boxSizing:'border-box' as const}

    return (
      <>
        <style>{PAGE_CSS}</style>

        {/* ═══════════════════════ 1. HERO ═══════════════════════════════════ */}
        <div ref={heroRef} style={{position:'relative',minHeight:'100vh',background:BG,overflow:'hidden',display:'flex',alignItems:'center'}}>
          <OceanMist n={70}/>
          <HorizonEngine/>
          <motion.div style={{position:'absolute',inset:0,y:heroY,opacity:heroOp}}>
            <img src={heroImg} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.14) saturate(0.6) hue-rotate(10deg)',transform:'scale(1.06)'}}/>
            <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 45%,rgba(26,86,219,0.12) 0%,rgba(212,204,184,0.05) 30%,rgba(2,5,9,0.88) 62%,'+BG+' 100%)'}}/>
          </motion.div>

          <Link href="/shop" style={{position:'absolute',top:32,left:40,zIndex:30,fontSize:7,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(212,204,184,0.42)',textDecoration:'none',border:'1px solid rgba(212,204,184,0.1)',padding:'10px 22px',backdropFilter:'blur(12px)',background:'rgba(2,5,9,0.5)'}}>
            ← Archive
          </Link>

          <div className="sg-hero-grid" style={{position:'relative',zIndex:20,width:'100%',maxWidth:1380,margin:'0 auto',padding:'120px 60px 80px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
            {/* Left: dual image */}
            <motion.div initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:1.6,ease:[.22,1,.36,1]}}>
              <div className="sg-img-pair" style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:10,marginBottom:10}}>
                <div style={{position:'relative',overflow:'hidden',border:'1px solid rgba(26,86,219,0.22)',gridRow:'span 1'}}>
                  <img src={heroImg} alt="Eternal Grace Sapphire Set" style={{width:'100%',display:'block',height:460,objectFit:'cover',objectPosition:'center top'}}/>
                  <div className="sg-scanline"/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 55%,rgba(2,5,9,0.6))'}}/>
                  {[{top:0,left:0,borderWidth:'2px 0 0 2px',borderColor:'rgba(59,130,246,0.55)'},{top:0,right:0,borderWidth:'2px 2px 0 0',borderColor:'rgba(212,204,184,0.4)'},{bottom:0,left:0,borderWidth:'0 0 2px 2px',borderColor:'rgba(212,204,184,0.4)'},{bottom:0,right:0,borderWidth:'0 2px 2px 0',borderColor:'rgba(59,130,246,0.45)'}].map((s,i)=>(
                    <div key={i} style={{position:'absolute',width:22,height:22,borderStyle:'solid',...s}}/>
                  ))}
                </div>
                <div style={{position:'relative',overflow:'hidden',border:'1px solid rgba(26,86,219,0.18)'}}>
                  <img src={setImg} alt="Sapphire set in vault" style={{width:'100%',display:'block',height:460,objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 50%,rgba(2,5,9,0.55))'}}/>
                </div>
              </div>
              <div style={{background:'rgba(2,5,9,0.96)',border:'1px solid rgba(26,86,219,0.2)',padding:'10px 22px',display:'flex',alignItems:'center',gap:10,justifyContent:'center'}}>
                <div style={{width:5,height:5,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 7px #00ff9d',flexShrink:0}}/>
                <span style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.25em',color:'rgba(212,204,184,0.6)',textTransform:'uppercase'}}>Polygon Verified · NFT Authenticated · Object XI</span>
              </div>
            </motion.div>

            {/* Right: text */}
            <div>
              <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.25}}
                style={{fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.65)',marginBottom:14,fontFamily:MONO}}>
                The Archive Objects · Chapter III
              </motion.div>
              <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.33}}
                style={{fontSize:7,letterSpacing:'0.42em',textTransform:'uppercase',color:'rgba(212,204,184,0.38)',marginBottom:22,fontFamily:MONO}}>
                Sovereign Archive Allocation · Object XI
              </motion.div>
              <motion.h1 initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:.42,ease:[.22,1,.36,1]}}
                style={{fontFamily:SERIF,fontSize:'clamp(28px,3.8vw,54px)',fontWeight:300,letterSpacing:'0.06em',lineHeight:1.1,color:'#fff',margin:'0 0 4px'}}>
                Eternal Grace
              </motion.h1>
              <motion.h1 initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:.54,ease:[.22,1,.36,1]}}
                style={{fontFamily:SERIF,fontSize:'clamp(18px,2.8vw,38px)',fontWeight:300,letterSpacing:'0.1em',lineHeight:1.1,color:SAPH2,margin:'0 0 4px',fontStyle:'italic'}}>
                Sapphire Set
              </motion.h1>
              <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.62}}
                style={{fontFamily:MONO,fontSize:8.5,letterSpacing:'0.28em',color:'rgba(212,204,184,0.3)',marginBottom:24,textTransform:'uppercase'}}>
                The Sovereign Bloom · 3-Piece High Jewelry
              </motion.div>
              <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.2,delay:.72}}
                style={{width:52,height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:28,transformOrigin:'left'}}/>
              <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.82}}
                style={{fontFamily:SERIF,fontSize:15,fontWeight:300,color:'rgba(255,255,255,0.44)',lineHeight:1.88,marginBottom:34}}>
                {story.tagline||'A refined High Jewelry Sovereign Asset crafted from solid 18K white gold, natural pear-cut blue sapphires, and brilliant white diamonds — engineered as a symbol of elegance, identity, and generational legacy.'}
              </motion.p>
              <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:1,delay:1}}>
                <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:7}}>
                  <span style={{fontFamily:SERIF,fontSize:'clamp(26px,3.2vw,44px)',fontWeight:300,color:WG2}}>$4,800</span>
                  <span style={{fontSize:7.5,letterSpacing:'0.35em',color:'rgba(212,204,184,0.38)',textTransform:'uppercase',fontFamily:MONO}}>USD</span>
                </div>
                <div style={{fontFamily:MONO,fontSize:9,letterSpacing:'0.26em',color:'rgba(255,255,255,0.18)',marginBottom:34}}>
                  Rs {formatPKR(1344000)} PKR · High Jewelry Archive Allocation
                </div>
              </motion.div>
              <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:1,delay:1.1}}
                style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:38}}>
                {[['18K White Gold','Au750'],['Natural','Sapphires'],['Brilliant','Diamonds'],['Pear Cut','Centerpiece'],['3-Piece','Set'],['Polygon','Verified']].map(([v,l])=>(
                  <div key={l} style={{border:'1px solid rgba(26,86,219,0.22)',padding:'8px 14px'}}>
                    <div style={{fontFamily:SERIF,fontSize:14,fontWeight:300,color:WG,lineHeight:1}}>{v}</div>
                    <div style={{fontFamily:MONO,fontSize:6,letterSpacing:'0.28em',color:'rgba(255,255,255,0.22)',textTransform:'uppercase',marginTop:3}}>{l}</div>
                  </div>
                ))}
              </motion.div>
              <motion.a href="#acquire" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:1,delay:1.28}}
                style={{display:'inline-flex',alignItems:'center',gap:14,background:'linear-gradient(135deg,rgba(26,86,219,0.14),rgba(212,204,184,0.04))',border:'1px solid '+SAPH,color:WG2,padding:'17px 38px',fontSize:9,letterSpacing:'0.42em',textTransform:'uppercase',textDecoration:'none',fontFamily:MONO}}>
                <Gem size={13}/> Acquire This Archive
              </motion.a>
            </div>
          </div>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}
            style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,zIndex:20}}>
            <span style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.4em',color:'rgba(212,204,184,0.22)',textTransform:'uppercase'}}>Discover The Archive</span>
            <motion.div animate={{y:[0,7,0]}} transition={{duration:2.4,repeat:Infinity,ease:'easeInOut'}}>
              <ChevronDown size={14} color="rgba(212,204,184,0.22)"/>
            </motion.div>
          </motion.div>
        </div>

        {/* ═══════════════════════ 2. LEGACY STATEMENT ═══════════════════════ */}
        <div style={{background:BG,padding:'110px 40px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <OceanMist n={16}/>
          <div style={{maxWidth:820,margin:'0 auto',position:'relative',zIndex:2}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.45)',marginBottom:52}}>The Legacy Statement</div>
            {(story.legacy_statement||'True elegance does not demand space. It captures the horizon in crystal silence. Some treasures announce themselves. Others become unforgettable without ever speaking. The Eternal Grace Sapphire Set was never created to follow fashion. It was created to embody timeless feminine refinement.').split('. ').filter(Boolean).map((s:string,i:number)=>(
              <motion.p key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-50px'}}
                transition={{duration:1.2,delay:i*.08,ease:[.22,1,.36,1]}}
                style={{fontFamily:SERIF,fontSize:'clamp(17px,2.3vw,28px)',fontWeight:300,lineHeight:1.7,marginBottom:8,
                  color: i<2?'rgba(255,255,255,'+(0.95-i*.05)+')': i<5?'rgba(212,204,184,'+(0.7-i*.05)+')':'rgba(26,86,219,'+(0.6-i*.04)+')'}}>
                {s.trim()}.
              </motion.p>
            ))}
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 3. CHAPTER III ═══════════════════════════ */}
        <div style={{background:'linear-gradient(180deg,'+BG+',#03050f)',padding:'100px 40px',position:'relative',overflow:'hidden'}}>
          <div style={{maxWidth:920,margin:'0 auto'}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.45)',marginBottom:16}}>Archive Chapter</div>
            <motion.h2 initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}}
              style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,40px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',marginBottom:28}}>
              {(story.chapter&&story.chapter.title)||'Chapter III — The Bloom of Sovereign Elegance'}
            </motion.h2>
            <div style={{width:44,height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:36}}/>
            {((story.chapter&&story.chapter.content)||'The rarest luxury in the world is not wealth. It is composure. The ability to remain graceful while carrying immense responsibility.').split('. ').filter(Boolean).map((s:string,i:number)=>(
              <motion.p key={i} initial={{opacity:0,x:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                transition={{duration:.8,delay:i*.07}}
                style={{fontFamily:SERIF,fontSize:17,fontWeight:300,color:'rgba(255,255,255,'+(Math.max(.28,.7-i*.05))+')',lineHeight:1.82,marginBottom:6}}>
                {s.trim()}.
              </motion.p>
            ))}
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 4. STORY ══════════════════════════════════ */}
        <div style={{background:BG,padding:'100px 40px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(26,86,219,0.035) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none'}}/>
          <div style={{maxWidth:920,margin:'0 auto',position:'relative',zIndex:2}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(212,204,184,0.32)',marginBottom:16}}>The Story</div>
            <motion.h2 initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}}
              style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,40px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',marginBottom:28,fontStyle:'italic'}}>
              {(story.story&&story.story.title)||'The Woman of the Blue Horizon'}
            </motion.h2>
            <div style={{width:44,height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:36}}/>
            <div className="sg-reveal" style={{columns:'2 400px',columnGap:48}}>
              {((story.story&&story.story.content)||'The ocean never competes with the sky. Yet together they create the world's most beautiful horizon. The Eternal Grace Sapphire Set draws inspiration from that eternal relationship. Its deep blue sapphires mirror the stillness of ancient oceans. Its brilliant diamonds reflect sunlight dancing upon water. Its white gold structure captures the purity of moonlight against a silent sea. Every sapphire represents depth. Every diamond represents clarity. Every detail represents permanence.').split('. ').filter(Boolean).map((s:string,i:number)=>(
                <p key={i} style={{fontFamily:SERIF,fontSize:16,fontWeight:300,color:'rgba(255,255,255,'+(Math.max(.26,.66-i*.04))+')',lineHeight:1.85,marginBottom:8,breakInside:'avoid'}}>
                  {s.trim()}.
                </p>
              ))}
            </div>
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 5. THREE-PIECE MASTERWORK ═════════════════ */}
        <div style={{background:'linear-gradient(180deg,'+BG+',#03050f)',padding:'110px 40px',position:'relative',overflow:'hidden'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:68}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.4)',marginBottom:14}}>The Masterwork</div>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(22px,3.2vw,44px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em'}}>Three-Piece High Jewelry Archive</h2>
            </motion.div>
            <div className="sg-pieces-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
              {pieces.map((piece,i)=>(
                <motion.div key={i} initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                  transition={{duration:.9,delay:i*.15}} className="sg-piece">
                  <div style={{marginBottom:20}}>
                    {i===0&&<Gem size={22} color={SAPH2}/>}
                    {i===1&&<Droplets size={22} color={SAPH}/>}
                    {i===2&&<div style={{width:22,height:22,border:'1.5px solid '+SAPH2,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:8,height:8,background:SAPH2,borderRadius:'50%'}}/></div>}
                  </div>
                  <div style={{fontFamily:SERIF,fontSize:18,fontWeight:300,color:'rgba(255,255,255,0.88)',lineHeight:1.4,marginBottom:14}}>{piece}</div>
                  <div style={{height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:14}}/>
                  <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.28em',color:'rgba(255,255,255,0.22)',textTransform:'uppercase'}}>Individually Crafted</div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.5}}
              style={{marginTop:28,textAlign:'center',padding:'22px',border:'1px solid rgba(26,86,219,0.1)',background:'rgba(26,86,219,0.025)'}}>
              <span style={{fontFamily:SERIF,fontStyle:'italic',fontSize:15,color:'rgba(212,204,184,0.55)'}}>
                Each component crafted as an independent jewel. Together they form a complete visual symphony.
              </span>
            </motion.div>
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 6. GEMSTONE TREASURY ══════════════════════ */}
        <div style={{background:BG,padding:'110px 40px',position:'relative',overflow:'hidden'}}>
          <div style={{maxWidth:1140,margin:'0 auto'}}>
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:72}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(212,204,184,0.32)',marginBottom:14}}>Precious Materials</div>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(22px,3.2vw,44px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em'}}>Sapphire, Diamond & White Gold</h2>
            </motion.div>
            <div className="sg-gem-grid" style={{display:'grid',gridTemplateColumns:'1fr 1px 1fr 1px 1fr',gap:0}}>

              {/* Sapphires */}
              <motion.div initial={{opacity:0,x:-28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1}} style={{padding:'36px 40px'}}>
                <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.42em',textTransform:'uppercase',color:'rgba(26,86,219,0.55)',marginBottom:26,textAlign:'center'}}>Royal Sapphires</div>
                <div style={{display:'flex',justifyContent:'center',marginBottom:22}}><SapphireGauge label="Depth" value="AAA" pct={.96} color={SAPH} delay={100}/></div>
                <div style={{marginBottom:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{fontFamily:MONO,fontSize:8,color:'rgba(255,255,255,0.22)',letterSpacing:'0.14em',textTransform:'uppercase'}}>Saturation</span>
                    <span style={{fontFamily:SERIF,fontSize:16,color:SAPH2}}>Deep Ocean</span>
                  </div>
                  <div style={{height:2,background:'rgba(255,255,255,0.05)',borderRadius:2,overflow:'hidden'}}>
                    <motion.div initial={{width:0}} whileInView={{width:'96%'}} viewport={{once:true}} transition={{duration:2.2,delay:.4,ease:[.22,1,.36,1]}}
                      style={{height:'100%',background:'linear-gradient(90deg,'+SAPH_DK+','+SAPH2+')'}}/>
                  </div>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}} className="sg-table"><tbody>
                  {[['Stone','Natural Royal Blue Sapphires'],['Shape','Pear Cut'],['Color','Deep Ocean Blue'],['Symbolism','Wisdom · Depth · Composure'],['Origin','Natural Precious']].map(([k,v])=>(
                    <tr key={k}><td style={{color:'rgba(255,255,255,0.24)',paddingRight:10,fontFamily:MONO,fontSize:8}}>{k}</td><td style={{color:'rgba(59,130,246,0.82)',fontFamily:SERIF,fontSize:12,textAlign:'right'}}>{v}</td></tr>
                  ))}
                </tbody></table>
              </motion.div>

              <div style={{background:'linear-gradient(180deg,transparent,rgba(26,86,219,0.2),transparent)',width:1,alignSelf:'stretch'}}/>

              {/* Diamonds */}
              <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,delay:.18}} style={{padding:'36px 40px'}}>
                <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.42em',textTransform:'uppercase',color:'rgba(212,204,184,0.42)',marginBottom:26,textAlign:'center'}}>Diamond Halo</div>
                <div style={{display:'flex',justifyContent:'center',marginBottom:22}}><SapphireGauge label="Clarity" value="VVS" pct={.97} color={WG} delay={200}/></div>
                <div style={{marginBottom:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{fontFamily:MONO,fontSize:8,color:'rgba(255,255,255,0.22)',letterSpacing:'0.14em',textTransform:'uppercase'}}>Sparkle</span>
                    <span style={{fontFamily:SERIF,fontSize:16,color:WG2}}>Maximum Fire</span>
                  </div>
                  <div style={{height:2,background:'rgba(255,255,255,0.05)',borderRadius:2,overflow:'hidden'}}>
                    <motion.div initial={{width:0}} whileInView={{width:'97%'}} viewport={{once:true}} transition={{duration:2.2,delay:.55,ease:[.22,1,.36,1]}}
                      style={{height:'100%',background:'linear-gradient(90deg,rgba(212,204,184,0.4),'+WG2+')'}}/>
                  </div>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}} className="sg-table"><tbody>
                  {[['Stone','Natural White Diamonds'],['Setting','Micro-Pavé Halo'],['Placement','Every Centerpiece'],['Performance','Maximum Fire'],['Effect','Crown Of Light']].map(([k,v])=>(
                    <tr key={k}><td style={{color:'rgba(255,255,255,0.24)',paddingRight:10,fontFamily:MONO,fontSize:8}}>{k}</td><td style={{color:'rgba(237,233,221,0.82)',fontFamily:SERIF,fontSize:12,textAlign:'right'}}>{v}</td></tr>
                  ))}
                </tbody></table>
              </motion.div>

              <div style={{background:'linear-gradient(180deg,transparent,rgba(212,204,184,0.2),transparent)',width:1,alignSelf:'stretch'}}/>

              {/* White Gold */}
              <motion.div initial={{opacity:0,x:28}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,delay:.36}} style={{padding:'36px 40px'}}>
                <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.42em',textTransform:'uppercase',color:'rgba(212,204,184,0.42)',marginBottom:26,textAlign:'center'}}>White Gold</div>
                <div style={{display:'flex',justifyContent:'center',marginBottom:22}}><SapphireGauge label="Purity" value="18K" pct={.75} color={WG} delay={300}/></div>
                <div style={{marginBottom:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{fontFamily:MONO,fontSize:8,color:'rgba(255,255,255,0.22)',letterSpacing:'0.14em',textTransform:'uppercase'}}>Au750</span>
                    <span style={{fontFamily:SERIF,fontSize:16,color:WG2}}>18 Karat</span>
                  </div>
                  <div style={{height:2,background:'rgba(255,255,255,0.05)',borderRadius:2,overflow:'hidden'}}>
                    <motion.div initial={{width:0}} whileInView={{width:'75%'}} viewport={{once:true}} transition={{duration:2.2,delay:.7,ease:[.22,1,.36,1]}}
                      style={{height:'100%',background:'linear-gradient(90deg,rgba(212,204,184,0.35),'+WG2+')'}}/>
                  </div>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}} className="sg-table"><tbody>
                  {[['Metal','Solid 18K White Gold'],['Purity','Au750 Hallmarked'],['Finish','Mirror Polish Platinum'],['Character','Clean · Modern · Luxurious'],['Method','Hand-Finished HJ']].map(([k,v])=>(
                    <tr key={k}><td style={{color:'rgba(255,255,255,0.24)',paddingRight:10,fontFamily:MONO,fontSize:8}}>{k}</td><td style={{color:'rgba(237,233,221,0.82)',fontFamily:SERIF,fontSize:12,textAlign:'right'}}>{v}</td></tr>
                  ))}
                </tbody></table>
              </motion.div>
            </div>
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 7. WEARABLE PRESENCE ══════════════════════ */}
        <div style={{background:'linear-gradient(180deg,'+BG+',#03050f)',padding:'110px 40px',position:'relative',overflow:'hidden'}}>
          <div style={{maxWidth:860,margin:'0 auto',textAlign:'center'}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.4)',marginBottom:52}}>The Wearable Presence</div>
            {(story.wearable_presence||'The Eternal Grace Sapphire Set does not dominate attention. It attracts it naturally. The sapphires provide depth. The diamonds provide light. The white gold provides structure. Together they create a visual identity that feels effortless yet unforgettable. Its presence resembles moonlight over calm water. Quiet. Powerful. Impossible to ignore.').split('. ').filter(Boolean).map((s:string,i:number)=>(
              <motion.p key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:1.1,delay:i*.08,ease:[.22,1,.36,1]}}
                style={{fontFamily:SERIF,fontSize:'clamp(15px,2.1vw,25px)',fontWeight:300,lineHeight:1.72,marginBottom:9,
                  color:i===0?'#fff':i===1?'rgba(26,86,219,0.85)':i===2?'rgba(212,204,184,0.9)':i===3?SAPH2:'rgba(255,255,255,'+(Math.max(.22,.6-i*.06))+')'}}>
                {s.trim()}.
              </motion.p>
            ))}
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 8. INVESTMENT TERMINAL ════════════════════ */}
        <div style={{background:BG,padding:'110px 40px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(26,86,219,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(212,204,184,0.018) 1px,transparent 1px)',backgroundSize:'55px 55px',pointerEvents:'none'}}/>
          <div style={{maxWidth:1020,margin:'0 auto',position:'relative',zIndex:2}}>
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginBottom:50}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.4)',marginBottom:14}}>Investment Asset Matrix</div>
              <div style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}>
                <h2 style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,40px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',margin:0}}>Sovereign Archive Terminal</h2>
                <div style={{fontFamily:MONO,fontSize:7.5,color:'#00ff9d',letterSpacing:'0.2em',border:'1px solid rgba(0,255,157,0.14)',padding:'4px 11px',display:'flex',alignItems:'center',gap:7}}>
                  <div style={{width:5,height:5,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 6px #00ff9d'}}/> LIVE
                </div>
                <div className="sg-cursor"/>
              </div>
            </motion.div>
            <div style={{background:'rgba(26,86,219,0.05)',border:'1px solid rgba(26,86,219,0.14)',padding:'10px 22px',display:'flex',justifyContent:'space-between',fontFamily:MONO,fontSize:8,color:'rgba(26,86,219,0.5)',letterSpacing:'0.15em',flexWrap:'wrap',gap:10}}>
              <span>ETERNAL-GRACE-SAPPHIRE-SET</span><span>HIGH JEWELRY SOVEREIGN ASSET</span><span>USD 4,800.00</span>
            </div>
            <div style={{border:'1px solid rgba(212,204,184,0.07)',borderTop:'none',padding:'4px 22px 10px',background:'rgba(0,0,0,0.35)'}}>
              {[
                {label:'ASSET CATEGORY',         value:'High Jewelry Sovereign Object',       blue:true,  delay:0},
                {label:'INTRINSIC COMPOSITION',   value:'18K White Gold + Sapphires + Diamonds',blue:true, delay:55},
                {label:'PIECE COUNT',             value:'Three-Piece Archive Set',              blue:false, delay:110},
                {label:'STONE TYPE',              value:'Natural Pear-Cut Royal Blue Sapphires',blue:false, delay:165},
                {label:'DIAMOND SETTING',         value:'Micro-Pavé Halo Construction',         blue:false, delay:220},
                {label:'METAL FOUNDATION',        value:'Solid 18K White Gold — Au750',         blue:false, delay:275},
                {label:'COLLECTIBILITY',          value:'The Archive Objects — Object XI',      blue:false, delay:330},
                {label:'OWNERSHIP',               value:'Physical Asset + Digital Registry',    blue:false, delay:385},
                {label:'TRANSFERABILITY',         value:'Generational Heirloom',                blue:false, delay:440},
                {label:'PRESERVATION HORIZON',    value:'Multi-Generational',                   blue:false, delay:495},
                {label:'BLOCKCHAIN REGISTRY',     value:'Polygon Mainnet — Verified',           blue:false, delay:550},
                {label:'INTERNATIONAL VALUATION', value:'$4,800 USD',                           blue:true,  delay:605},
                {label:'RETAIL VALUATION PKR',    value:'Rs. 1,344,000',                        blue:true,  delay:660},
              ].map(item=><TermRow key={item.label} {...item}/>)}
            </div>
            <div className="sg-invest-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,marginTop:1}}>
              {[{val:'$4,800',lab:'International Value',c:WG2},{val:'18K',lab:'White Gold Foundation',c:WG},{val:'3pcs',lab:'Archive Pieces',c:SAPH2},{val:'Polygon',lab:'Blockchain Secured',c:'rgba(212,204,184,0.45)'}].map(({val,lab,c})=>(
                <div key={lab} style={{background:'rgba(26,86,219,0.03)',border:'1px solid rgba(26,86,219,0.07)',padding:'24px 16px',textAlign:'center'}}>
                  <div style={{fontFamily:SERIF,fontSize:26,fontWeight:300,color:c,marginBottom:5}}>{val}</div>
                  <div style={{fontFamily:MONO,fontSize:6.5,letterSpacing:'0.26em',color:'rgba(255,255,255,0.24)',textTransform:'uppercase'}}>{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 9. VAULT + NFT PASSPORT ═══════════════════ */}
        <div style={{background:'linear-gradient(180deg,'+BG+',#040610)',padding:'110px 40px',position:'relative',overflow:'hidden'}}>
          <div style={{maxWidth:1060,margin:'0 auto'}}>
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:72}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(212,204,184,0.3)',marginBottom:14}}>Archive & Digital Identity</div>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,42px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',marginBottom:10}}>Sovereign Vault & Eternal Passport</h2>
              <p style={{fontFamily:SERIF,fontSize:15,color:'rgba(255,255,255,0.26)'}}>Museum-grade presentation vessel. Blockchain-secured digital twin. One unified archive allocation.</p>
            </motion.div>
            <div className="sg-nft-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:52}}>
              {/* NFT Holographic Card */}
              <motion.div initial={{opacity:0,rotateY:-12}} whileInView={{opacity:1,rotateY:0}} viewport={{once:true}} transition={{duration:1.4,ease:[.22,1,.36,1]}}>
                <div className="sg-holo" style={{position:'relative',border:'1px solid rgba(26,86,219,0.3)',background:'linear-gradient(135deg,rgba(2,5,18,0.98),rgba(4,8,24,0.98))',padding:'44px',overflow:'hidden',minHeight:340}}>
                  <div style={{position:'absolute',top:14,right:14,width:38,height:38,border:'1px solid rgba(26,86,219,0.22)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2}}>
                    <Gem size={15} color={SAPH2}/>
                  </div>
                  <div style={{position:'relative',zIndex:2}}>
                    <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.42em',color:'rgba(26,86,219,0.45)',marginBottom:22,textTransform:'uppercase'}}>Sovereign Bloom Edition · Object XI</div>
                    <div style={{fontFamily:SERIF,fontSize:22,fontWeight:300,color:'#fff',letterSpacing:'0.04em',marginBottom:4}}>
                      {nft.name||'Eternal Grace Sapphire Set — Sovereign Passport'}
                    </div>
                    <div style={{fontFamily:MONO,fontSize:8.5,color:SAPH2,letterSpacing:'0.18em',marginBottom:28}}>POLYGON · HIGH JEWELRY ARCHIVE</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:22}}>
                      {[['Metal','18K White Gold'],['Sapphires','Natural Pear Cut'],['Diamonds','Natural VVS'],['Setting','Micro-Pavé Halo'],['Pieces','Three-Piece Set'],['Registry','Dynamic Archive']].map(([k,v])=>(
                        <div key={k} style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:8}}>
                          <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.15em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginBottom:3}}>{k}</div>
                          <div style={{fontFamily:SERIF,fontSize:12,color:'rgba(212,204,184,0.85)'}}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{padding:'10px 14px',background:'rgba(0,255,157,0.03)',border:'1px solid rgba(0,255,157,0.1)',display:'flex',alignItems:'center',gap:12}}>
                      <div style={{width:5,height:5,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 6px #00ff9d',flexShrink:0}}/>
                      <span style={{fontFamily:MONO,fontSize:7.5,letterSpacing:'0.14em',color:'rgba(0,255,157,0.55)',textTransform:'uppercase',flex:1}}>
                        {NFT_CONTRACT.slice(0,14)}...{NFT_CONTRACT.slice(-6)}
                      </span>
                      <CopyBtn text={NFT_CONTRACT}/>
                    </div>
                  </div>
                </div>
                {/* Vault includes */}
                <div style={{marginTop:10,border:'1px solid rgba(26,86,219,0.1)',background:'rgba(26,86,219,0.025)',padding:'22px 28px'}}>
                  <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(26,86,219,0.45)',marginBottom:14}}>Archive Vault Contents</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                    {vaultIncludes.map((item:string,i:number)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:4,height:4,background:SAPH,flexShrink:0}}/>
                        <span style={{fontFamily:SERIF,fontSize:12,color:'rgba(255,255,255,0.52)'}}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              {/* Privileges */}
              <motion.div initial={{opacity:0,x:32}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1}}>
                <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.42em',textTransform:'uppercase',color:'rgba(212,204,184,0.3)',marginBottom:20}}>Holder Privileges</div>
                {privs.map((p:string,i:number)=>(
                  <motion.div key={i} initial={{opacity:0,x:16}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                    transition={{duration:.5,delay:i*.055}} className="sg-priv">
                    <Gem size={10} color={i%2===0?SAPH2:WG} style={{flexShrink:0}}/>
                    <span style={{fontFamily:SERIF,fontSize:14,color:'rgba(255,255,255,0.62)',fontWeight:300}}>{p}</span>
                  </motion.div>
                ))}
                <div style={{marginTop:22,padding:'16px 20px',border:'1px solid rgba(26,86,219,0.14)',background:'rgba(26,86,219,0.03)'}}>
                  <div style={{fontFamily:SERIF,fontStyle:'italic',fontSize:14,color:'rgba(59,130,246,0.55)',lineHeight:1.65}}>
                    "Beauty may be admired. Provenance must be protected."
                  </div>
                </div>
                {/* Presentation vault image */}
                <motion.div initial={{opacity:0,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1.2}} style={{marginTop:24}}>
                  <div style={{position:'relative',overflow:'hidden',border:'1px solid rgba(26,86,219,0.18)'}}>
                    <img src={setImg} alt="Sapphire set in vault" style={{width:'100%',display:'block',maxHeight:200,objectFit:'cover'}}/>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(2,5,9,0.7))'}}/>
                    <div style={{position:'absolute',bottom:14,left:16,display:'flex',alignItems:'center',gap:9}}>
                      <Shield size={11} color={WG}/>
                      <span style={{fontFamily:MONO,fontSize:7.5,letterSpacing:'0.2em',color:'rgba(212,204,184,0.55)',textTransform:'uppercase'}}>Sapphire-Blue Velvet Archive Vault</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <Divider/>

        {/* ═══════════════════════ 10. ACQUISITION CONSOLE ═══════════════════ */}
        <div id="acquire" style={{background:BG,padding:'110px 40px',position:'relative',overflow:'hidden'}}>
          <OceanMist n={25}/>
          <div style={{maxWidth:840,margin:'0 auto',position:'relative',zIndex:2}}>
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{textAlign:'center',marginBottom:50}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.4)',marginBottom:14}}>Acquisition Console</div>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,40px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',marginBottom:10}}>Acquire This Archive Object</h2>
              <p style={{fontFamily:SERIF,fontSize:15,color:'rgba(255,255,255,0.26)'}}>Eternal Grace Sapphire Set · $4,800 USD · Rs {formatPKR(1344000)} PKR</p>
            </motion.div>

            {orderResult ? (
              <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.8}}
                style={{border:'1px solid rgba(0,255,157,0.16)',background:'rgba(0,255,157,0.02)',padding:'50px 40px',textAlign:'center'}}>
                <div style={{width:46,height:46,borderRadius:'50%',border:'1px solid rgba(0,255,157,0.22)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 22px'}}>
                  <Check size={18} color="#00ff9d"/>
                </div>
                <h3 style={{fontFamily:SERIF,fontSize:22,fontWeight:300,color:'#fff',marginBottom:5}}>Archive Acquisition Confirmed</h3>
                <p style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.25em',color:'rgba(255,255,255,0.28)',marginBottom:22}}>YOUR SAPPHIRE ARCHIVE IS RESERVED</p>
                <div style={{display:'flex',justifyContent:'center',gap:30,marginBottom:28,flexWrap:'wrap'}}>
                  {[['Order ID',orderResult.order_id],['Reference',orderResult.order_ref],['Tracking',orderResult.tracking_ref]].map(([l,v])=>(
                    <div key={l}><div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.22em',color:'rgba(255,255,255,0.22)',marginBottom:4,textTransform:'uppercase'}}>{l}</div><div style={{fontFamily:SERIF,fontSize:14,color:WG}}>{v}</div></div>
                  ))}
                </div>
                <Link href={'/track/'+orderResult.tracking_ref} style={{display:'inline-block',border:'1px solid '+WG,color:WG,padding:'12px 32px',fontSize:8,letterSpacing:'0.38em',textTransform:'uppercase',textDecoration:'none',fontFamily:MONO}}>
                  Track Delivery
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="sg-pay-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2,marginBottom:38}}>
                  {(['crypto','pkr_manual','cod'] as PayMethod[]).map((m,i)=>(
                    <button key={m} onClick={()=>setPayMethod(m)} style={{padding:'17px 10px',background:payMethod===m?'rgba(26,86,219,0.08)':'rgba(255,255,255,0.018)',border:payMethod===m?'1px solid '+SAPH:'1px solid rgba(255,255,255,0.06)',color:payMethod===m?WG2:'rgba(255,255,255,0.32)',fontFamily:MONO,fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',cursor:'pointer',transition:'all .3s'}}>
                      {['Crypto · USDT/USDC','Bank Transfer','COD'][i]}
                    </button>
                  ))}
                </div>
                <div style={{marginBottom:30}}>
                  <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(212,204,184,0.28)',marginBottom:14}}>Delivery Information</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9,marginBottom:9}}>
                    {(['name','phone'] as const).map(f=>(
                      <input key={f} value={shipping[f]} onChange={e=>setShipping(s=>({...s,[f]:e.target.value}))} placeholder={f==='name'?'Full Name':'Phone Number'} style={inputSt}/>
                    ))}
                  </div>
                  <input value={shipping.address} onChange={e=>setShipping(s=>({...s,address:e.target.value}))} placeholder="Delivery Address" style={{...inputSt,marginBottom:9}}/>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9}}>
                    <input value={shipping.city} onChange={e=>setShipping(s=>({...s,city:e.target.value}))} placeholder="City" style={inputSt}/>
                    <input value={shipping.note} onChange={e=>setShipping(s=>({...s,note:e.target.value}))} placeholder="Special Instructions" style={inputSt}/>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  {payMethod==='crypto' && (
                    <motion.div key="cr" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}}>
                      <div style={{marginBottom:16,padding:'12px 18px',border:'1px solid rgba(26,86,219,0.1)',background:'rgba(26,86,219,0.025)'}}>
                        <div style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.18em',color:'rgba(212,204,184,0.38)',marginBottom:4,textTransform:'uppercase'}}>Polygon Network · USDT / USDC / OKBOND</div>
                        <div style={{fontFamily:SERIF,fontSize:13,color:'rgba(255,255,255,0.28)',lineHeight:1.6}}>10% discount with OKBOND · Blockchain confirmed on Polygon</div>
                      </div>
                      <Web3PaySection priceUsd={product.price_usd} onSuccess={handleCryptoSuccess}/>
                    </motion.div>
                  )}
                  {payMethod==='pkr_manual' && (
                    <motion.div key="pk" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}}>
                      <div style={{border:'1px solid rgba(26,86,219,0.1)',padding:'28px',background:'rgba(0,0,0,0.22)',marginBottom:18}}>
                        <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(212,204,184,0.28)',marginBottom:20}}>Bank Transfer Details</div>
                        {[{lab:'Easypaisa',val:EASYPAISA_NUMBER,sub:EASYPAISA_NAME},{lab:'UBL IBAN',val:UBL_IBAN,sub:'Bank Transfer'},{lab:'Amount',val:'Rs '+formatPKR(product.price_pkr),sub:'Exact Amount Required'}].map(({lab,val,sub})=>(
                          <div key={lab} style={{marginBottom:16,paddingBottom:16,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.22em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginBottom:4}}>{lab}</div>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                              <span style={{fontFamily:SERIF,fontSize:15,color:WG}}>{val}</span>
                              <CopyBtn text={val}/>
                            </div>
                            <div style={{fontFamily:MONO,fontSize:7.5,color:'rgba(255,255,255,0.18)',marginTop:3}}>{sub}</div>
                          </div>
                        ))}
                        <div style={{border:'2px dashed '+(receipt?'rgba(0,255,157,0.22)':'rgba(26,86,219,0.14)'),padding:'24px',textAlign:'center',cursor:'pointer'}}
                          onClick={()=>document.getElementById('receipt-sg')?.click()}>
                          <input id="receipt-sg" type="file" accept="image/*,application/pdf" style={{display:'none'}} onChange={e=>setReceipt(e.target.files?.[0]||null)}/>
                          {receipt?(
                            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:9}}>
                              <Check size={13} color="#00ff9d"/>
                              <span style={{fontFamily:SERIF,fontSize:13,color:'rgba(0,255,157,0.7)'}}>{receipt.name}</span>
                              <button onClick={e=>{e.stopPropagation();setReceipt(null)}} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.24)'}}><X size={11}/></button>
                            </div>
                          ):(
                            <><Upload size={14} color={WG} style={{marginBottom:7}}/><div style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.22em',color:'rgba(212,204,184,0.38)',textTransform:'uppercase'}}>Upload Payment Receipt</div></>
                          )}
                        </div>
                      </div>
                      <button onClick={handleManual} disabled={submitting||!receipt}
                        style={{width:'100%',background:receipt?'linear-gradient(135deg,rgba(26,86,219,0.14),rgba(212,204,184,0.04))':'rgba(255,255,255,0.02)',border:'1px solid '+(receipt?SAPH:'rgba(255,255,255,0.07)'),color:receipt?WG2:'rgba(255,255,255,0.18)',padding:'17px',fontFamily:MONO,fontSize:8.5,letterSpacing:'0.38em',textTransform:'uppercase',cursor:receipt?'pointer':'not-allowed',transition:'all .3s'}}>
                        {submitting?'Processing...':'Complete Acquisition'}
                      </button>
                    </motion.div>
                  )}
                  {payMethod==='cod' && (
                    <motion.div key="cd" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}}>
                      <div style={{border:'1px solid rgba(26,86,219,0.1)',padding:'28px',background:'rgba(0,0,0,0.22)',marginBottom:18}}>
                        <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(212,204,184,0.28)',marginBottom:16}}>Cash on Delivery</div>
                        <p style={{fontFamily:SERIF,fontSize:15,color:'rgba(255,255,255,0.4)',lineHeight:1.8,marginBottom:16}}>Your Eternal Grace Sapphire Set will be delivered by certified white-glove courier. Payment collected upon delivery. A 5% surcharge applies.</p>
                        <div style={{display:'flex',gap:22,flexWrap:'wrap'}}>
                          <div><div style={{fontFamily:MONO,fontSize:7,color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginBottom:4}}>COD Amount</div><div style={{fontFamily:SERIF,fontSize:18,color:WG}}>Rs {formatPKR(Math.round(product.price_pkr*1.05))}</div></div>
                          <div><div style={{fontFamily:MONO,fontSize:7,color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginBottom:4}}>Delivery</div><div style={{fontFamily:SERIF,fontSize:18,color:WG}}>3–5 Business Days</div></div>
                        </div>
                      </div>
                      <button onClick={handleCOD} disabled={submitting||!shipping.name||!shipping.phone||!shipping.address}
                        style={{width:'100%',background:'linear-gradient(135deg,rgba(26,86,219,0.12),rgba(212,204,184,0.03))',border:'1px solid '+SAPH,color:WG2,padding:'17px',fontFamily:MONO,fontSize:8.5,letterSpacing:'0.38em',textTransform:'uppercase',cursor:'pointer',transition:'all .3s'}}>
                        {submitting?'Confirming...':'Confirm Archive Acquisition'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {error&&<div style={{marginTop:11,padding:'11px 14px',border:'1px solid rgba(255,80,80,0.14)',background:'rgba(255,80,80,0.03)',fontFamily:MONO,fontSize:8.5,color:'rgba(255,120,120,0.68)'}}>{error}</div>}
              </>
            )}
          </div>
        </div>

        {/* ═══════════════════════ FINAL STATEMENT ═══════════════════════════ */}
        <div style={{background:'linear-gradient(180deg,'+BG+',#030710)',padding:'88px 40px',textAlign:'center',borderTop:'1px solid rgba(26,86,219,0.07)'}}>
          <div style={{maxWidth:780,margin:'0 auto'}}>
            <Divider/>
            <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1.2}}
              style={{fontFamily:SERIF,fontStyle:'italic',fontSize:'clamp(15px,1.9vw,22px)',fontWeight:300,color:'rgba(255,255,255,0.24)',lineHeight:1.75,marginTop:50}}>
              {story.final_positioning||'Eternal Grace Sapphire Set is not jewelry. It is a celebration of feminine composure. A collectible High Jewelry artifact. A blockchain-authenticated heirloom. A physical reserve of gemstones, craftsmanship, provenance, and legacy. Where sapphire, diamond, elegance, ownership, and identity become one eternal horizon.'}
            </motion.p>
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:1,delay:.5}}
              style={{marginTop:38,fontFamily:SERIF,fontSize:12,color:'rgba(26,86,219,0.28)',letterSpacing:'0.14em'}}>
              House of Shamim Forever · The Archive Objects · Chapter III
            </motion.div>
          </div>
        </div>
      </>
    )
  }
  