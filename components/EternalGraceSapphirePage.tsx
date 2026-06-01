'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Copy, Check, Upload, X, Shield, Gem, Droplets, ChevronDown } from 'lucide-react'
import { formatPKR } from '@/lib/utils'
import type { Product } from '@/types'
import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
import { useAccount } from 'wagmi'

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string }

const NFT_CONTRACT     = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME   = 'M Faisal'
const UBL_IBAN         = 'PK13UNIL0109000318870498'
const SERIF   = "'Cormorant Garamond', Georgia, serif"
const MONO    = "'Courier New', Courier, monospace"
const SAPH    = '#1A56DB'
const SAPH2   = '#3B82F6'
const WG      = '#D4CCB8'
const WG2     = '#EDE9DD'
const BG      = '#020509'
const BG2     = '#03050f'

const FADE_UP = { initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true, margin:'-60px' }, transition:{ duration:1, ease:[0.22,1,0.36,1] } }
const FADE_IN = { initial:{ opacity:0 }, whileInView:{ opacity:1 }, viewport:{ once:true, margin:'-60px' }, transition:{ duration:0.9 } }
const EG_PAGE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
    html{scroll-behavior:smooth}
    .sg-piece{border:1px solid rgba(26,86,219,0.16);padding:32px 28px;background:rgba(26,86,219,0.025);transition:border-color .4s,background .4s,transform .3s}
    .sg-piece:hover{border-color:rgba(59,130,246,0.4);background:rgba(26,86,219,0.06);transform:translateY(-4px)}
    .sg-trow td{padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:top}
    .sg-trow:last-child td{border-bottom:none}
    .sg-priv{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
    .sg-priv:last-child{border-bottom:none}
    @media(max-width:768px){
      .hero-cols{grid-template-columns:1fr!important}
      .three-cols{grid-template-columns:1fr!important}
      .gem-cols{grid-template-columns:1fr!important}
      .nft-cols{grid-template-columns:1fr!important}
      .pay-cols{grid-template-columns:repeat(3,1fr)!important}
      .info-cols{grid-template-columns:1fr 1fr!important}
      .vault-inc{grid-template-columns:1fr!important}
    }
  `
const INPUT_STYLE={width:'100%',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(26,86,219,0.12)',color:'#fff',padding:'14px 18px',fontSize:12,letterSpacing:'0.07em',fontFamily:"'Cormorant Garamond', Georgia, serif",outline:'none',boxSizing:'border-box'}



/* ── Ocean particles ─────────────────────────────────────────────────── */
function OceanMist({ n=50 }: { n?:number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const c = ref.current; if(!c) return
    const ctx = c.getContext('2d')!
    const resize = () => { c.width=c.offsetWidth; c.height=c.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const cols = ['rgba(26,86,219,','rgba(59,130,246,','rgba(212,204,184,']
    const pts = Array.from({length:n},()=>({
      x:Math.random(), y:Math.random(), r:Math.random()*1.8+0.3,
      vy:-(Math.random()*0.1+0.025), vx:(Math.random()-.5)*0.03,
      a:Math.random(), va:(Math.random()-.5)*0.003, col:cols[Math.floor(Math.random()*3)]
    }))
    let raf:number
    const tick = () => {
      const W=c.width, H=c.height
      ctx.clearRect(0,0,W,H)
      pts.forEach(p=>{
        p.x+=p.vx/W; p.y+=p.vy/H; p.a+=p.va
        if(p.a<=0||p.a>=1) p.va*=-1
        if(p.y<0){p.y=1;p.x=Math.random()}
        ctx.beginPath(); ctx.arc(p.x*W,p.y*H,p.r,0,Math.PI*2)
        ctx.fillStyle=p.col+(p.a*0.4)+')'; ctx.fill()
      })
      raf=requestAnimationFrame(tick)
    }
    tick()
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
  },[n])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

/* ── Animated gauge ──────────────────────────────────────────────────── */
function Gauge({ label, value, pct, color=SAPH, delay=0 }: { label:string; value:string; pct:number; color?:string; delay?:number }) {
  const [go,setGo]=useState(false); const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting)setTimeout(()=>setGo(true),delay)},{threshold:0.3})
    if(ref.current) obs.observe(ref.current); return()=>obs.disconnect()
  },[delay])
  const R=38,circ=2*Math.PI*R
  const gId='g-'+label.replace(/\s+/g,'')
  return(
    <div ref={ref} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
      <svg width={88} height={88} style={{transform:'rotate(-90deg)'}}>
        <circle cx={44} cy={44} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={2.5}/>
        <circle cx={44} cy={44} r={R} fill="none" stroke={'url(#'+gId+')'} strokeWidth={2.5}
          strokeDasharray={circ} strokeDashoffset={go?circ*(1-pct):circ} strokeLinecap="round"
          style={{transition:go?'stroke-dashoffset 2s cubic-bezier(0.22,1,0.36,1)':'none'}}/>
        <defs>
          <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.45"/>
            <stop offset="100%" stopColor={color}/>
          </linearGradient>
        </defs>
        <text x={44} y={44} textAnchor="middle" dominantBaseline="middle" fill={color}
          style={{fontFamily:SERIF,fontSize:11,fontWeight:300,transform:'rotate(90deg)',transformOrigin:'44px 44px'}}>
          {value}
        </text>
      </svg>
      <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(255,255,255,0.26)',textAlign:'center'}}>{label}</div>
    </div>
  )
}

/* ── Copy button ─────────────────────────────────────────────────────── */
function CopyBtn({ text }: { text:string }) {
  const [c,setC]=useState(false)
  return(
    <button onClick={()=>{navigator.clipboard.writeText(text);setC(true);setTimeout(()=>setC(false),2000)}}
      style={{display:'flex',alignItems:'center',gap:6,color:WG,background:'none',border:'none',cursor:'pointer'}}>
      {c?<Check size={10}/>:<Copy size={10}/>}
      <span style={{fontSize:7,letterSpacing:'0.3em',textTransform:'uppercase'}}>{c?'Copied':'Copy'}</span>
    </button>
  )
}

/* ── Divider ─────────────────────────────────────────────────────────── */
function Divider() {
  return(
    <div style={{display:'flex',alignItems:'center',gap:16,maxWidth:540,margin:'0 auto',padding:'0 40px'}}>
      <div style={{flex:1,height:1,background:'linear-gradient(90deg,transparent,rgba(26,86,219,0.3),rgba(212,204,184,0.2))'}}/>
      <div style={{width:5,height:5,background:SAPH,transform:'rotate(45deg)',opacity:0.6}}/>
      <div style={{width:3,height:3,background:WG,transform:'rotate(45deg)',opacity:0.3,margin:'0 4px'}}/>
      <div style={{width:5,height:5,background:SAPH2,transform:'rotate(45deg)',opacity:0.5}}/>
      <div style={{flex:1,height:1,background:'linear-gradient(90deg,rgba(212,204,184,0.2),rgba(26,86,219,0.3),transparent)'}}/>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════════ */
export default function EternalGraceSapphirePage({ product }: { product: Product }) {
  const [payMethod,setPayMethod]=useState<PayMethod>('crypto')
  const [receipt,setReceipt]=useState<File|null>(null)
  const [orderResult,setOrderResult]=useState<OrderResult|null>(null)
  const [submitting,setSubmitting]=useState(false)
  const [error,setError]=useState('')
  const [shipping,setShipping]=useState({name:'',phone:'',address:'',city:'',note:''})
  const videoRef=useRef<HTMLVideoElement>(null)
  useAccount()

  const story = (() => { try { return typeof product.story==='string'?JSON.parse(product.story):(product.story||{}) } catch(_e){return{}} })()
  const nft       = story.nft       || {}
  const vault     = story.vault     || {}
  const pieces: string[] = Array.isArray(story.three_piece_masterwork) ? story.three_piece_masterwork : ['Royal Sapphire Pendant Necklace','Pair Of Sovereign Sapphire Earrings','Sovereign Sapphire Ring']
  const privs: string[]  = Array.isArray(nft.privileges) ? nft.privileges : ['Archive Collector Status','Sovereign Vault Access','Future Jewelry Allocations','Private House Invitations','Collector Registry Recognition','Priority Authentication Services','Concierge Restoration Program','Lifetime Provenance Protection','Legacy Registry Membership','Early Access To Future Archive Releases']
  const vaultIncludes: string[] = Array.isArray(vault.includes) ? vault.includes : ['Founder Authentication Certificate','Gemstone Documentation','Metal Purity Documentation','Archive Ownership Registry','Digital Twin NFT Passport']
  const imgs = product.images || []
  const modelImg = imgs[0] || '/products/eternal-grace-sapphire-set/sapphire-model.png'
  const setImg   = imgs[1] || '/products/eternal-grace-sapphire-set/sapphire-set.png'
  const videoSrc = '/products/eternal-grace-sapphire-set/product-video.mp4'

  /* ensure video plays on mount */
  useEffect(()=>{
    const v=videoRef.current; if(!v) return
    v.muted=true; v.loop=true; v.playsInline=true
    v.play().catch(()=>{})
  },[]);

  const handleCryptoSuccess = useCallback(async(txHash:string,coin:CoinType)=>{
    setSubmitting(true); setError('')
    try{
      const f=new FormData(); Object.entries(shipping).forEach(([k,v])=>f.append(k,v))
      f.append('product_id',product.id); f.append('quantity','1')
      f.append('payment_method',coin.toLowerCase()); f.append('tx_hash',txHash)
      const r=await fetch('/api/orders',{method:'POST',body:f})
      const d=await r.json(); if(!r.ok) throw new Error(d.error||'Order failed')
      setOrderResult(d)
    }catch(e:any){setError(e.message)}finally{setSubmitting(false)}
  },[shipping,product.id]);

  const handleManual = useCallback(async()=>{
    if(!receipt){setError('Please upload payment receipt');return}
    setSubmitting(true); setError('')
    try{
      const f=new FormData(); Object.entries(shipping).forEach(([k,v])=>f.append(k,v))
      f.append('product_id',product.id); f.append('quantity','1')
      f.append('payment_method','easypaisa'); f.append('receipt',receipt)
      const r=await fetch('/api/orders',{method:'POST',body:f})
      const d=await r.json(); if(!r.ok) throw new Error(d.error||'Order failed')
      setOrderResult(d)
    }catch(e:any){setError(e.message)}finally{setSubmitting(false)}
  },[receipt,shipping,product.id]);

  const handleCOD = useCallback(async()=>{
    setSubmitting(true); setError('')
    try{
      const f=new FormData(); Object.entries(shipping).forEach(([k,v])=>f.append(k,v))
      f.append('product_id',product.id); f.append('quantity','1'); f.append('payment_method','cod')
      const r=await fetch('/api/orders',{method:'POST',body:f})
      const d=await r.json(); if(!r.ok) throw new Error(d.error||'Order failed')
      setOrderResult(d)
    }catch(e:any){setError(e.message)}finally{setSubmitting(false)}
  },[shipping,product.id]);


  return (
    <>
    <div style={{background:BG,minHeight:'100vh',fontFamily:SERIF}}>
      <style>{EG_PAGE_CSS}</style>

      {/* ═══════ 1. HERO — AUTOPLAY VIDEO ═══════ */}
      <div style={{position:'relative',minHeight:'100vh',overflow:'hidden',display:'flex',alignItems:'center'}}>

        {/* Background: video covers full hero */}
        <video ref={videoRef} autoPlay loop muted playsInline
          poster={modelImg}
          style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.22) saturate(0.7)',transform:'scale(1.04)',zIndex:1}}>
          <source src={videoSrc} type="video/mp4"/>
        </video>

        {/* Gradient overlay */}
        <div style={{position:'absolute',inset:0,zIndex:2,background:'radial-gradient(ellipse at 50% 40%,rgba(26,86,219,0.15) 0%,rgba(2,5,9,0.6) 50%,'+BG+' 100%)'}}/>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:'35%',zIndex:2,background:'linear-gradient(to bottom,transparent,'+BG+')'}}/>

        {/* Ocean mist above video */}
        <div style={{position:'absolute',inset:0,zIndex:3,pointerEvents:'none'}}><OceanMist n={60}/></div>

        {/* Back link */}
        <Link href="/shop" style={{position:'absolute',top:32,left:40,zIndex:30,fontSize:7,letterSpacing:'0.45em',textTransform:'uppercase',color:'rgba(212,204,184,0.45)',textDecoration:'none',border:'1px solid rgba(212,204,184,0.1)',padding:'10px 22px',backdropFilter:'blur(12px)',background:'rgba(2,5,9,0.55)'}}>
          ← Archive
        </Link>

        {/* Hero content */}
        <div className="hero-cols" style={{position:'relative',zIndex:20,width:'100%',maxWidth:1300,margin:'0 auto',padding:'120px 60px 80px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:70,alignItems:'center'}}>

          {/* Left: video frame */}
          <motion.div initial={{opacity:0,scale:0.94}} animate={{opacity:1,scale:1}} transition={{duration:1.6,ease:[0.22,1,0.36,1]}}>
            <div style={{position:'relative',border:'1px solid rgba(26,86,219,0.3)',overflow:'hidden',background:BG}}>
              <video autoPlay loop muted playsInline
                poster={modelImg}
                style={{width:'100%',display:'block',height:500,objectFit:'cover',objectPosition:'center top'}}>
                <source src={videoSrc} type="video/mp4"/>
              </video>
              {/* Corner brackets */}
              {[
                {top:0,left:0,borderWidth:'2px 0 0 2px',borderColor:'rgba(59,130,246,0.7)'},
                {top:0,right:0,borderWidth:'2px 2px 0 0',borderColor:'rgba(212,204,184,0.5)'},
                {bottom:0,left:0,borderWidth:'0 0 2px 2px',borderColor:'rgba(212,204,184,0.5)'},
                {bottom:0,right:0,borderWidth:'0 2px 2px 0',borderColor:'rgba(59,130,246,0.6)'}
              ].map((s,i)=>(
                <div key={i} style={{position:'absolute',width:24,height:24,borderStyle:'solid',...s}}/>
              ))}
              {/* Live badge */}
              <div style={{position:'absolute',top:14,left:14,display:'flex',alignItems:'center',gap:7,background:'rgba(2,5,9,0.75)',border:'1px solid rgba(26,86,219,0.2)',padding:'5px 11px',backdropFilter:'blur(8px)'}}>
                <div style={{width:5,height:5,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 6px #00ff9d'}}/>
                <span style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.22em',color:'rgba(212,204,184,0.55)',textTransform:'uppercase'}}>Live Preview</span>
              </div>
            </div>
            {/* Flat-lay below */}
            <div style={{marginTop:8,position:'relative',border:'1px solid rgba(26,86,219,0.15)',overflow:'hidden',height:140}}>
              <img src={setImg} alt="Eternal Grace Sapphire Set" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(2,5,9,0.65))'}}/>
              <div style={{position:'absolute',bottom:10,right:14,fontFamily:MONO,fontSize:7,letterSpacing:'0.22em',color:'rgba(212,204,184,0.5)',textTransform:'uppercase'}}>
                18K White Gold · Natural Sapphires · VVS Diamonds
              </div>
            </div>
            <div style={{marginTop:8,background:'rgba(2,5,9,0.9)',border:'1px solid rgba(26,86,219,0.15)',padding:'9px 18px',display:'flex',alignItems:'center',gap:10,justifyContent:'center'}}>
              <div style={{width:4,height:4,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 5px #00ff9d'}}/>
              <span style={{fontFamily:MONO,fontSize:7.5,letterSpacing:'0.22em',color:'rgba(212,204,184,0.5)',textTransform:'uppercase'}}>Polygon Verified · NFT Authenticated · Object XI</span>
            </div>
          </motion.div>

          {/* Right: text */}
          <div>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.2}} style={{fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.6)',marginBottom:12,fontFamily:MONO}}>
              The Archive Objects · Chapter III
            </motion.div>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.28}} style={{fontSize:7,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(212,204,184,0.32)',marginBottom:20,fontFamily:MONO}}>
              Sovereign Archive Allocation · Object XI
            </motion.div>
            <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:0.38,ease:[0.22,1,0.36,1]}} style={{fontFamily:SERIF,fontSize:'clamp(30px,4vw,56px)',fontWeight:300,letterSpacing:'0.06em',lineHeight:1.05,color:'#fff',margin:0}}>
              Eternal Grace
            </motion.h1>
            <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:0.5,ease:[0.22,1,0.36,1]}} style={{fontFamily:SERIF,fontSize:'clamp(20px,2.9vw,40px)',fontWeight:300,letterSpacing:'0.1em',lineHeight:1.1,color:SAPH2,marginTop:2,fontStyle:'italic'}}>
              Sapphire Set
            </motion.h1>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:0.6}} style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.28em',color:'rgba(212,204,184,0.28)',marginTop:10,marginBottom:20,textTransform:'uppercase'}}>
              The Sovereign Bloom · 3-Piece High Jewelry
            </motion.div>
            <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.2,delay:0.7,ease:[0.22,1,0.36,1]}} style={{width:50,height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:24,transformOrigin:'left'}}/>
            <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.78}} style={{fontFamily:SERIF,fontSize:15,fontWeight:300,color:'rgba(255,255,255,0.42)',lineHeight:1.9,marginBottom:30}}>
              {story.tagline||'A refined High Jewelry Sovereign Asset crafted from solid 18K white gold, natural pear-cut blue sapphires, and brilliant white diamonds — engineered as a symbol of elegance, identity, and generational legacy.'}
            </motion.p>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.9}}>
              <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:5}}>
                <span style={{fontFamily:SERIF,fontSize:'clamp(28px,3.2vw,46px)',fontWeight:300,color:WG2}}>$4,800</span>
                <span style={{fontSize:7,letterSpacing:'0.35em',color:'rgba(212,204,184,0.35)',textTransform:'uppercase',fontFamily:MONO}}>USD</span>
              </div>
              <div style={{fontFamily:MONO,fontSize:8.5,letterSpacing:'0.22em',color:'rgba(255,255,255,0.17)',marginBottom:28}}>
                Rs {formatPKR(1344000)} PKR · High Jewelry Archive Allocation
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:1,delay:1}} style={{display:'flex',flexWrap:'wrap',gap:7,marginBottom:34}}>
              {[['18K','White Gold'],['Natural','Sapphires'],['VVS','Diamonds'],['Pear','Cut'],['3 Piece','Set'],['Polygon','NFT']].map(([v,l])=>(
                <div key={l} style={{border:'1px solid rgba(26,86,219,0.2)',padding:'7px 13px'}}>
                  <div style={{fontFamily:SERIF,fontSize:14,fontWeight:300,color:WG,lineHeight:1.1}}>{v}</div>
                  <div style={{fontFamily:MONO,fontSize:5.5,letterSpacing:'0.28em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginTop:2}}>{l}</div>
                </div>
              ))}
            </motion.div>
            <motion.a href="#acquire" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:1,delay:1.15}} style={{display:'inline-flex',alignItems:'center',gap:12,background:'linear-gradient(135deg,rgba(26,86,219,0.14),rgba(212,204,184,0.04))',border:'1px solid '+SAPH,color:WG2,padding:'16px 36px',fontSize:8.5,letterSpacing:'0.42em',textTransform:'uppercase',textDecoration:'none',fontFamily:MONO}}>
              <Gem size={12}/> Acquire This Archive
            </motion.a>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}} style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:7,zIndex:20}}>
          <span style={{fontFamily:MONO,fontSize:6.5,letterSpacing:'0.4em',color:'rgba(212,204,184,0.2)',textTransform:'uppercase'}}>Discover The Archive</span>
          <motion.div animate={{y:[0,6,0]}} transition={{duration:2.4,repeat:Infinity}}>
            <ChevronDown size={13} color="rgba(212,204,184,0.2)"/>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════ 2. LEGACY STATEMENT ═══════ */}
      <div style={{background:BG,padding:'100px 40px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <OceanMist n={18}/>
        <div style={{maxWidth:800,margin:'0 auto',position:'relative',zIndex:2}}>
          <motion.div {...FADE_IN} style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.4)',marginBottom:48}}>The Legacy Statement</motion.div>
          {[
            {t:'True elegance does not demand space.',s:'clamp(18px,2.4vw,30px)',c:'rgba(255,255,255,0.95)'},
            {t:'It captures the horizon in crystal silence.',s:'clamp(16px,2.1vw,26px)',c:'rgba(255,255,255,0.85)'},
            {t:'Some treasures announce themselves.',s:'clamp(15px,1.9vw,23px)',c:'rgba(212,204,184,0.65)'},
            {t:'Others become unforgettable without ever speaking.',s:'clamp(14px,1.8vw,22px)',c:'rgba(212,204,184,0.55)'},
            {t:'The Eternal Grace Sapphire Set was never created to follow fashion.',s:'clamp(13px,1.6vw,19px)',c:'rgba(26,86,219,0.75)'},
            {t:'It was created to embody timeless feminine refinement.',s:'clamp(13px,1.6vw,19px)',c:'rgba(59,130,246,0.65)'},
            {t:'Discipline Before Detail.',s:'clamp(16px,2vw,24px)',c:WG2},
          ].map(({t,s,c},i)=>(
            <motion.p key={i} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}}
              transition={{duration:1.1,delay:i*0.07,ease:[0.22,1,0.36,1]}}
              style={{fontFamily:SERIF,fontSize:s,fontWeight:300,lineHeight:1.68,marginBottom:10,color:c}}>
              {t}
            </motion.p>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ═══════ 3. CHAPTER III ═══════ */}
      <div style={{background:'linear-gradient(180deg,'+BG+','+BG2+')',padding:'90px 40px'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <motion.div {...FADE_IN} style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.4)',marginBottom:14}}>Archive Chapter</motion.div>
          <motion.h2 {...FADE_UP} style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,40px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',marginBottom:22}}>
            {(story.chapter&&story.chapter.title)||'Chapter III — The Bloom of Sovereign Elegance'}
          </motion.h2>
          <div style={{width:44,height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:32}}/>
          <div style={{columns:'2 400px',columnGap:44}}>
            {[
              'The rarest luxury in the world is not wealth. It is composure.',
              'The ability to remain graceful while carrying immense responsibility.',
              'The ability to remain calm while others seek validation.',
              'The Eternal Grace Sapphire Set was engineered for women who embody that rare equilibrium.',
              'Women whose presence feels effortless.',
              'Women whose confidence requires no performance.',
              'Women whose elegance becomes part of their legacy.',
              'This is not jewelry designed for a season. This is beauty preserved for generations.',
            ].map((s,i)=>(
              <motion.p key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-30px'}}
                transition={{duration:0.8,delay:i*0.06}}
                style={{fontFamily:SERIF,fontSize:16,fontWeight:300,color:'rgba(255,255,255,'+(Math.max(0.28,0.68-i*0.04))+')',lineHeight:1.85,marginBottom:6,breakInside:'avoid'}}>
                {s}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <Divider/>

      {/* ═══════ 4. STORY ═══════ */}
      <div style={{background:BG,padding:'90px 40px',position:'relative'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(26,86,219,0.03) 1px,transparent 1px)',backgroundSize:'42px 42px',pointerEvents:'none'}}/>
        <div style={{maxWidth:900,margin:'0 auto',position:'relative'}}>
          <motion.div {...FADE_IN} style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(212,204,184,0.28)',marginBottom:14}}>The Story</motion.div>
          <motion.h2 {...FADE_UP} style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,38px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',marginBottom:22,fontStyle:'italic'}}>
            The Woman of the Blue Horizon
          </motion.h2>
          <div style={{width:44,height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:32}}/>
          <div style={{columns:'2 400px',columnGap:44}}>
            {[
              'The ocean never competes with the sky.',
              'Yet together they create the world's most beautiful horizon.',
              'The Eternal Grace Sapphire Set draws inspiration from that eternal relationship.',
              'Its deep blue sapphires mirror the stillness of ancient oceans.',
              'Its brilliant diamonds reflect sunlight dancing upon water.',
              'Its white gold structure captures the purity of moonlight against a silent sea.',
              'Created for women who appreciate refinement over extravagance.',
              'Its purpose is not decoration. Its purpose is identity.',
              'A wearable reflection of grace, discipline, and enduring femininity.',
              'Every sapphire represents depth. Every diamond represents clarity. Every detail represents permanence.',
            ].map((s,i)=>(
              <motion.p key={i} initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:'-30px'}}
                transition={{duration:0.8,delay:i*0.055}}
                style={{fontFamily:SERIF,fontSize:16,fontWeight:300,color:'rgba(255,255,255,'+(Math.max(0.24,0.65-i*0.04))+')',lineHeight:1.88,marginBottom:6,breakInside:'avoid'}}>
                {s}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <Divider/>

      {/* ═══════ 5. THREE-PIECE MASTERWORK ═══════ */}
      <div style={{background:'linear-gradient(180deg,'+BG+','+BG2+')',padding:'100px 40px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <motion.div {...FADE_IN} style={{textAlign:'center',marginBottom:60}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.38)',marginBottom:12}}>The Masterwork</div>
            <h2 style={{fontFamily:SERIF,fontSize:'clamp(22px,3.2vw,42px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em'}}>Three-Piece High Jewelry Archive</h2>
          </motion.div>
          <div className="three-cols" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
            {pieces.map((piece,i)=>(
              <motion.div key={i} className="sg-piece" initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}}
                transition={{duration:0.9,delay:i*0.14}}>
                <div style={{marginBottom:18}}>
                  {i===0?<Gem size={20} color={SAPH2}/>:i===1?<Droplets size={20} color={SAPH}/>:
                    <div style={{width:20,height:20,border:'1.5px solid '+SAPH2,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:7,height:7,background:SAPH2,borderRadius:'50%'}}/></div>}
                </div>
                <div style={{fontFamily:SERIF,fontSize:18,fontWeight:300,color:'rgba(255,255,255,0.88)',lineHeight:1.4,marginBottom:12}}>{piece}</div>
                <div style={{height:1,background:'linear-gradient(90deg,'+SAPH+',transparent)',marginBottom:12}}/>
                <div style={{fontFamily:MONO,fontSize:6.5,letterSpacing:'0.28em',color:'rgba(255,255,255,0.2)',textTransform:'uppercase'}}>Independently Crafted</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...FADE_IN} style={{marginTop:24,textAlign:'center',padding:'20px',border:'1px solid rgba(26,86,219,0.08)',background:'rgba(26,86,219,0.02)'}}>
            <span style={{fontFamily:SERIF,fontStyle:'italic',fontSize:15,color:'rgba(212,204,184,0.45)'}}>
              Each component crafted as an independent jewel. Together they form a complete visual symphony.
            </span>
          </motion.div>
        </div>
      </div>

      <Divider/>

      {/* ═══════ 6. GEMSTONE TREASURY ═══════ */}
      <div style={{background:BG,padding:'100px 40px'}}>
        <div style={{maxWidth:1120,margin:'0 auto'}}>
          <motion.div {...FADE_IN} style={{textAlign:'center',marginBottom:64}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(212,204,184,0.28)',marginBottom:12}}>Precious Materials</div>
            <h2 style={{fontFamily:SERIF,fontSize:'clamp(22px,3.2vw,42px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em'}}>Sapphire, Diamond & White Gold</h2>
          </motion.div>
          <div className="gem-cols" style={{display:'grid',gridTemplateColumns:'1fr 1px 1fr 1px 1fr',gap:0}}>
            {/* Sapphires */}
            <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1}} style={{padding:'32px 36px'}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(26,86,219,0.5)',marginBottom:22,textAlign:'center'}}>Royal Sapphires</div>
              <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
                <Gauge label="Depth" value="AAA" pct={0.96} color={SAPH} delay={100}/>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}><tbody>
                {[['Stone','Natural Royal Blue'],['Shape','Pear Cut'],['Color','Deep Ocean Blue'],['Symbolism','Wisdom · Depth'],['Grade','AAA Precious']].map(([k,v])=>(
                  <tr key={k} className="sg-trow"><td style={{color:'rgba(255,255,255,0.22)',paddingRight:10,fontFamily:MONO,fontSize:7.5}}>{k}</td><td style={{color:'rgba(59,130,246,0.78)',fontFamily:SERIF,fontSize:12,textAlign:'right'}}>{v}</td></tr>
                ))}
              </tbody></table>
            </motion.div>
            <div style={{background:'linear-gradient(180deg,transparent,rgba(26,86,219,0.2),transparent)'}}/>
            {/* Diamonds */}
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,delay:0.15}} style={{padding:'32px 36px'}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(212,204,184,0.4)',marginBottom:22,textAlign:'center'}}>Diamond Halo</div>
              <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
                <Gauge label="Clarity" value="VVS" pct={0.97} color={WG} delay={200}/>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}><tbody>
                {[['Stone','Natural White Diamonds'],['Setting','Micro-Pavé Halo'],['Performance','Maximum Fire'],['Effect','Crown Of Light'],['Grade','VVS Natural']].map(([k,v])=>(
                  <tr key={k} className="sg-trow"><td style={{color:'rgba(255,255,255,0.22)',paddingRight:10,fontFamily:MONO,fontSize:7.5}}>{k}</td><td style={{color:'rgba(237,233,221,0.78)',fontFamily:SERIF,fontSize:12,textAlign:'right'}}>{v}</td></tr>
                ))}
              </tbody></table>
            </motion.div>
            <div style={{background:'linear-gradient(180deg,transparent,rgba(212,204,184,0.18),transparent)'}}/>
            {/* White Gold */}
            <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,delay:0.3}} style={{padding:'32px 36px'}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(212,204,184,0.38)',marginBottom:22,textAlign:'center'}}>White Gold</div>
              <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
                <Gauge label="Purity" value="18K" pct={0.75} color={WG} delay={300}/>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}><tbody>
                {[['Metal','Solid 18K White Gold'],['Purity','Au750 Hallmarked'],['Finish','Mirror Platinum'],['Character','Clean · Modern'],['Method','Hand-Finished HJ']].map(([k,v])=>(
                  <tr key={k} className="sg-trow"><td style={{color:'rgba(255,255,255,0.22)',paddingRight:10,fontFamily:MONO,fontSize:7.5}}>{k}</td><td style={{color:'rgba(237,233,221,0.78)',fontFamily:SERIF,fontSize:12,textAlign:'right'}}>{v}</td></tr>
                ))}
              </tbody></table>
            </motion.div>
          </div>
        </div>
      </div>

      <Divider/>

      {/* ═══════ 7. WEARABLE PRESENCE ═══════ */}
      <div style={{background:'linear-gradient(180deg,'+BG+','+BG2+')',padding:'90px 40px'}}>
        <div style={{maxWidth:820,margin:'0 auto',textAlign:'center'}}>
          <motion.div {...FADE_IN} style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.38)',marginBottom:44}}>The Wearable Presence</motion.div>
          {[
            {t:'The Eternal Grace Sapphire Set does not dominate attention.',c:'rgba(255,255,255,0.95)',sz:'clamp(16px,2.2vw,26px)'},
            {t:'It attracts it naturally.',c:SAPH2,sz:'clamp(18px,2.6vw,32px)'},
            {t:'The sapphires provide depth. The diamonds provide light. The white gold provides structure.',c:'rgba(212,204,184,0.72)',sz:'clamp(15px,1.9vw,22px)'},
            {t:'Together they create a visual identity that feels effortless yet unforgettable.',c:'rgba(212,204,184,0.6)',sz:'clamp(14px,1.8vw,21px)'},
            {t:'Its presence resembles moonlight over calm water.',c:'rgba(255,255,255,0.4)',sz:'clamp(15px,1.9vw,23px)'},
            {t:'Quiet. Powerful. Impossible to ignore.',c:WG2,sz:'clamp(18px,2.4vw,30px)'},
          ].map(({t,c,sz},i)=>(
            <motion.p key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-30px'}}
              transition={{duration:1.1,delay:i*0.08,ease:[0.22,1,0.36,1]}}
              style={{fontFamily:SERIF,fontSize:sz,fontWeight:300,lineHeight:1.7,marginBottom:10,color:c}}>
              {t}
            </motion.p>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ═══════ 8. INVESTMENT TERMINAL ═══════ */}
      <div style={{background:BG,padding:'100px 40px',position:'relative'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(26,86,219,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(212,204,184,0.015) 1px,transparent 1px)',backgroundSize:'55px 55px',pointerEvents:'none'}}/>
        <div style={{maxWidth:1000,margin:'0 auto',position:'relative'}}>
          <motion.div {...FADE_IN} style={{marginBottom:44}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.38)',marginBottom:12}}>Investment Asset Matrix</div>
            <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
              <h2 style={{fontFamily:SERIF,fontSize:'clamp(20px,2.6vw,38px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',margin:0}}>Sovereign Archive Terminal</h2>
              <div style={{fontFamily:MONO,fontSize:7,color:'#00ff9d',letterSpacing:'0.18em',border:'1px solid rgba(0,255,157,0.14)',padding:'4px 10px',display:'flex',alignItems:'center',gap:6}}>
                <div style={{width:4,height:4,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 5px #00ff9d'}}/> LIVE
              </div>
            </div>
          </motion.div>
          <div style={{background:'rgba(26,86,219,0.04)',border:'1px solid rgba(26,86,219,0.12)',padding:'9px 20px',display:'flex',justifyContent:'space-between',fontFamily:MONO,fontSize:7.5,color:'rgba(26,86,219,0.45)',letterSpacing:'0.12em',flexWrap:'wrap',gap:8}}>
            <span>ETERNAL-GRACE-SAPPHIRE-SET</span><span>HIGH JEWELRY SOVEREIGN ASSET</span><span>USD 4,800.00</span>
          </div>
          <div style={{border:'1px solid rgba(212,204,184,0.06)',borderTop:'none',padding:'4px 20px 8px',background:'rgba(0,0,0,0.3)'}}>
            {[
              ['ASSET CATEGORY','High Jewelry Sovereign Object',true],
              ['INTRINSIC VALUE','18K White Gold + Natural Sapphires + Natural Diamonds',true],
              ['PIECE COUNT','Three-Piece Archive Set',false],
              ['STONE TYPE','Natural Pear-Cut Royal Blue Sapphires',false],
              ['DIAMOND SETTING','Micro-Pavé Halo Construction',false],
              ['METAL FOUNDATION','Solid 18K White Gold — Au750',false],
              ['COLLECTIBILITY','The Archive Objects — Object XI',false],
              ['OWNERSHIP','Physical Asset + Digital Registry',false],
              ['TRANSFERABILITY','Generational Heirloom',false],
              ['BLOCKCHAIN REGISTRY','Polygon Mainnet — Verified',false],
              ['INTERNATIONAL VALUE','$4,800 USD',true],
              ['PKR VALUATION','Rs. 1,344,000',true],
            ].map(([label,value,blue],i)=>(
              <motion.div key={label as string} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:'-20px'}}
                transition={{duration:0.5,delay:i*0.04}}
                style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 0',borderBottom:'1px solid rgba(255,255,255,0.035)'}}>
                <span style={{fontFamily:MONO,fontSize:8,letterSpacing:'0.14em',color:'rgba(255,255,255,0.24)',textTransform:'uppercase'}}>{label as string}</span>
                <span style={{fontFamily:blue?SERIF:MONO,fontSize:blue?15:9.5,color:blue?WG2:'rgba(212,204,184,0.5)',letterSpacing:blue?'0.04em':'0.12em',fontWeight:blue?300:400}}>{value as string}</span>
              </motion.div>
            ))}
          </div>
          <div className="info-cols" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,marginTop:1}}>
            {[{v:'$4,800',l:'International Value',c:WG2},{v:'18K',l:'White Gold',c:WG},{v:'3pcs',l:'Archive Pieces',c:SAPH2},{v:'Polygon',l:'NFT Secured',c:'rgba(212,204,184,0.4)'}].map(({v,l,c})=>(
              <div key={l} style={{background:'rgba(26,86,219,0.025)',border:'1px solid rgba(26,86,219,0.06)',padding:'22px 14px',textAlign:'center'}}>
                <div style={{fontFamily:SERIF,fontSize:24,fontWeight:300,color:c,marginBottom:4}}>{v}</div>
                <div style={{fontFamily:MONO,fontSize:6,letterSpacing:'0.24em',color:'rgba(255,255,255,0.22)',textTransform:'uppercase'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider/>

      {/* ═══════ 9. VAULT + NFT PASSPORT ═══════ */}
      <div style={{background:'linear-gradient(180deg,'+BG+',#040610)',padding:'100px 40px'}}>
        <div style={{maxWidth:1040,margin:'0 auto'}}>
          <motion.div {...FADE_IN} style={{textAlign:'center',marginBottom:64}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(212,204,184,0.28)',marginBottom:12}}>Archive & Digital Identity</div>
            <h2 style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,40px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em'}}>Sovereign Vault & Eternal Passport</h2>
          </motion.div>
          <div className="nft-cols" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48}}>
            {/* NFT Card */}
            <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1}}>
              <div style={{position:'relative',border:'1px solid rgba(26,86,219,0.28)',background:'linear-gradient(135deg,rgba(2,5,18,0.98),rgba(4,8,24,0.98))',padding:'42px',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg,rgba(26,86,219,0.08) 0%,rgba(212,204,184,0.04) 40%,transparent 70%)',pointerEvents:'none'}}/>
                <div style={{position:'absolute',top:13,right:13,width:36,height:36,border:'1px solid rgba(26,86,219,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Gem size={14} color={SAPH2}/>
                </div>
                <div style={{position:'relative'}}>
                  <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.4em',color:'rgba(26,86,219,0.42)',marginBottom:20,textTransform:'uppercase'}}>Sovereign Bloom Edition · Object XI</div>
                  <div style={{fontFamily:SERIF,fontSize:21,fontWeight:300,color:'#fff',letterSpacing:'0.04em',marginBottom:4}}>
                    {nft.name||'Eternal Grace Sapphire Set — Sovereign Passport'}
                  </div>
                  <div style={{fontFamily:MONO,fontSize:8,color:SAPH2,letterSpacing:'0.16em',marginBottom:26,textTransform:'uppercase'}}>POLYGON · HIGH JEWELRY ARCHIVE</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9,marginBottom:20}}>
                    {[['Metal','18K White Gold'],['Sapphires','Natural Pear Cut'],['Diamonds','Natural VVS'],['Setting','Micro-Pavé Halo'],['Pieces','Three-Piece Set'],['Archive','Object XI']].map(([k,v])=>(
                      <div key={k} style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:7}}>
                        <div style={{fontFamily:MONO,fontSize:6.5,letterSpacing:'0.14em',color:'rgba(255,255,255,0.18)',textTransform:'uppercase',marginBottom:2}}>{k}</div>
                        <div style={{fontFamily:SERIF,fontSize:12,color:'rgba(212,204,184,0.8)'}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{padding:'9px 13px',background:'rgba(0,255,157,0.03)',border:'1px solid rgba(0,255,157,0.1)',display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:4,height:4,borderRadius:'50%',background:'#00ff9d',boxShadow:'0 0 5px #00ff9d',flexShrink:0}}/>
                    <span style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.12em',color:'rgba(0,255,157,0.5)',flex:1,textTransform:'uppercase'}}>
                      {NFT_CONTRACT.slice(0,14)}...{NFT_CONTRACT.slice(-6)}
                    </span>
                    <CopyBtn text={NFT_CONTRACT}/>
                  </div>
                </div>
              </div>
              {/* Vault includes */}
              <div style={{marginTop:8,border:'1px solid rgba(26,86,219,0.1)',background:'rgba(26,86,219,0.02)',padding:'20px 26px'}}>
                <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.36em',textTransform:'uppercase',color:'rgba(26,86,219,0.4)',marginBottom:12}}>Archive Vault Contents</div>
                <div className="vault-inc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7}}>
                  {vaultIncludes.map((item:string,i:number)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:7}}>
                      <div style={{width:4,height:4,background:SAPH,flexShrink:0}}/>
                      <span style={{fontFamily:SERIF,fontSize:12,color:'rgba(255,255,255,0.5)'}}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Privileges */}
            <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,delay:0.12}}>
              <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(212,204,184,0.28)',marginBottom:18}}>Holder Privileges</div>
              {privs.map((p:string,i:number)=>(
                <motion.div key={i} initial={{opacity:0,x:14}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:'-20px'}}
                  transition={{duration:0.5,delay:i*0.05}}
                  className="sg-priv">
                  <Gem size={10} color={i%2===0?SAPH2:WG} style={{flexShrink:0}}/>
                  <span style={{fontFamily:SERIF,fontSize:14,color:'rgba(255,255,255,0.6)',fontWeight:300}}>{p}</span>
                </motion.div>
              ))}
              <div style={{marginTop:20,padding:'15px 18px',border:'1px solid rgba(26,86,219,0.12)',background:'rgba(26,86,219,0.025)'}}>
                <div style={{fontFamily:SERIF,fontStyle:'italic',fontSize:14,color:'rgba(59,130,246,0.5)',lineHeight:1.65}}>
                  "Beauty may be admired. Provenance must be protected."
                </div>
              </div>
              {/* Set image */}
              <motion.div initial={{opacity:0,scale:0.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1.2}} style={{marginTop:20}}>
                <div style={{position:'relative',overflow:'hidden',border:'1px solid rgba(26,86,219,0.15)'}}>
                  <img src={setImg} alt="Sapphire vault" style={{width:'100%',display:'block',maxHeight:190,objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 40%,rgba(2,5,9,0.65))'}}/>
                  <div style={{position:'absolute',bottom:12,left:14,display:'flex',alignItems:'center',gap:8}}>
                    <Shield size={10} color={WG}/>
                    <span style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.18em',color:'rgba(212,204,184,0.5)',textTransform:'uppercase'}}>Sapphire-Blue Velvet Archive Vault</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Divider/>

      {/* ═══════ 10. FINAL STATEMENT ═══════ */}
      <div style={{background:BG,padding:'60px 40px 20px',textAlign:'center'}}>
        <div style={{maxWidth:720,margin:'0 auto'}}>
          <motion.p {...FADE_UP} style={{fontFamily:SERIF,fontStyle:'italic',fontSize:'clamp(14px,1.8vw,21px)',fontWeight:300,color:'rgba(255,255,255,0.22)',lineHeight:1.75,marginBottom:32}}>
            {story.final_positioning||'Eternal Grace Sapphire Set is not jewelry. It is a celebration of feminine composure. A collectible High Jewelry artifact. A blockchain-authenticated heirloom. Where sapphire, diamond, elegance, ownership, and identity become one eternal horizon.'}
          </motion.p>
          <motion.div {...FADE_IN} style={{fontFamily:MONO,fontSize:10,color:'rgba(26,86,219,0.25)',letterSpacing:'0.12em',marginBottom:44}}>
            House of Shamim Forever · The Archive Objects · Chapter III
          </motion.div>
        </div>
      </div>

      {/* ═══════ 11. ACQUISITION CONSOLE ═══════ */}
      <div id="acquire" style={{background:'linear-gradient(180deg,'+BG2+','+BG+')',padding:'90px 40px',position:'relative',overflow:'hidden'}}>
        <OceanMist n={22}/>
        <div style={{maxWidth:820,margin:'0 auto',position:'relative',zIndex:2}}>
          <motion.div {...FADE_IN} style={{textAlign:'center',marginBottom:44}}>
            <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.52em',textTransform:'uppercase',color:'rgba(26,86,219,0.38)',marginBottom:12}}>Acquisition Console</div>
            <h2 style={{fontFamily:SERIF,fontSize:'clamp(20px,2.8vw,38px)',fontWeight:300,color:'#fff',letterSpacing:'0.05em',marginBottom:8}}>Acquire This Archive Object</h2>
            <p style={{fontFamily:SERIF,fontSize:14,color:'rgba(255,255,255,0.24)'}}>Eternal Grace Sapphire Set · $4,800 USD · Rs {formatPKR(1344000)} PKR</p>
          </motion.div>

          {orderResult ? (
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.8}}
              style={{border:'1px solid rgba(0,255,157,0.14)',background:'rgba(0,255,157,0.02)',padding:'48px 38px',textAlign:'center'}}>
              <div style={{width:44,height:44,borderRadius:'50%',border:'1px solid rgba(0,255,157,0.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                <Check size={17} color="#00ff9d"/>
              </div>
              <h3 style={{fontFamily:SERIF,fontSize:21,fontWeight:300,color:'#fff',marginBottom:4}}>Archive Acquisition Confirmed</h3>
              <p style={{fontFamily:MONO,fontSize:7.5,letterSpacing:'0.22em',color:'rgba(255,255,255,0.26)',marginBottom:20}}>YOUR SAPPHIRE ARCHIVE IS RESERVED</p>
              <div style={{display:'flex',justifyContent:'center',gap:28,flexWrap:'wrap',marginBottom:26}}>
                {[['Order ID',orderResult.order_id],['Reference',orderResult.order_ref],['Tracking',orderResult.tracking_ref]].map(([l,v])=>(
                  <div key={l}><div style={{fontFamily:MONO,fontSize:6.5,letterSpacing:'0.2em',color:'rgba(255,255,255,0.2)',marginBottom:3,textTransform:'uppercase'}}>{l}</div><div style={{fontFamily:SERIF,fontSize:14,color:WG}}>{v}</div></div>
                ))}
              </div>
              <Link href={'/track/'+orderResult.tracking_ref} style={{display:'inline-block',border:'1px solid '+WG,color:WG,padding:'11px 30px',fontSize:7.5,letterSpacing:'0.36em',textTransform:'uppercase',textDecoration:'none',fontFamily:MONO}}>
                Track Delivery
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="pay-cols" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2,marginBottom:32}}>
                {(['crypto','pkr_manual','cod'] as PayMethod[]).map((m,i)=>(
                  <button key={m} onClick={()=>setPayMethod(m)} style={{padding:'16px 8px',background:payMethod===m?'rgba(26,86,219,0.07)':'rgba(255,255,255,0.015)',border:payMethod===m?'1px solid '+SAPH:'1px solid rgba(255,255,255,0.06)',color:payMethod===m?WG2:'rgba(255,255,255,0.3)',fontFamily:MONO,fontSize:7.5,letterSpacing:'0.18em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.3s'}}>
                    {['Crypto · USDT/USDC','Bank Transfer','COD'][i]}
                  </button>
                ))}
              </div>

              {/* Shipping */}
              <div style={{marginBottom:26}}>
                <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.36em',textTransform:'uppercase',color:'rgba(212,204,184,0.26)',marginBottom:12}}>Delivery Information</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
                  <input value={shipping.name} onChange={e=>setShipping(s=>({...s,name:e.target.value}))} placeholder="Full Name" style={INPUT_STYLE}/>
                  <input value={shipping.phone} onChange={e=>setShipping(s=>({...s,phone:e.target.value}))} placeholder="Phone Number" style={INPUT_STYLE}/>
                </div>
                <input value={shipping.address} onChange={e=>setShipping(s=>({...s,address:e.target.value}))} placeholder="Delivery Address" style={{...INPUT_STYLE,marginBottom:8}}/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  <input value={shipping.city} onChange={e=>setShipping(s=>({...s,city:e.target.value}))} placeholder="City" style={INPUT_STYLE}/>
                  <input value={shipping.note} onChange={e=>setShipping(s=>({...s,note:e.target.value}))} placeholder="Special Instructions" style={INPUT_STYLE}/>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {payMethod==='crypto' && (
                  <motion.div key="cr" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.3}}>
                    <div style={{marginBottom:14,padding:'11px 16px',border:'1px solid rgba(26,86,219,0.08)',background:'rgba(26,86,219,0.02)'}}>
                      <div style={{fontFamily:MONO,fontSize:7.5,letterSpacing:'0.16em',color:'rgba(212,204,184,0.35)',marginBottom:3,textTransform:'uppercase'}}>Polygon · USDT / USDC / OKBOND</div>
                      <div style={{fontFamily:SERIF,fontSize:13,color:'rgba(255,255,255,0.25)'}}>10% discount with OKBOND · Blockchain confirmed on Polygon</div>
                    </div>
                    <Web3PaySection priceUsd={product.price_usd} onSuccess={handleCryptoSuccess}/>
                  </motion.div>
                )}
                {payMethod==='pkr_manual' && (
                  <motion.div key="pk" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.3}}>
                    <div style={{border:'1px solid rgba(26,86,219,0.08)',padding:'26px',background:'rgba(0,0,0,0.2)',marginBottom:16}}>
                      <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.36em',textTransform:'uppercase',color:'rgba(212,204,184,0.26)',marginBottom:18}}>Bank Transfer Details</div>
                      {[{lab:'Easypaisa',val:EASYPAISA_NUMBER,sub:EASYPAISA_NAME},{lab:'UBL IBAN',val:UBL_IBAN,sub:'Bank Transfer'},{lab:'Amount',val:'Rs '+formatPKR(product.price_pkr),sub:'Exact Amount'}].map(({lab,val,sub})=>(
                        <div key={lab} style={{marginBottom:14,paddingBottom:14,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                          <div style={{fontFamily:MONO,fontSize:6.5,letterSpacing:'0.2em',color:'rgba(255,255,255,0.18)',textTransform:'uppercase',marginBottom:3}}>{lab}</div>
                          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <span style={{fontFamily:SERIF,fontSize:14,color:WG}}>{val}</span>
                            <CopyBtn text={val}/>
                          </div>
                          <div style={{fontFamily:MONO,fontSize:7,color:'rgba(255,255,255,0.16)',marginTop:2}}>{sub}</div>
                        </div>
                      ))}
                      <div style={{border:'2px dashed '+(receipt?'rgba(0,255,157,0.2)':'rgba(26,86,219,0.12)'),padding:'22px',textAlign:'center',cursor:'pointer'}}
                        onClick={()=>document.getElementById('receipt-sg')?.click()}>
                        <input id="receipt-sg" type="file" accept="image/*,application/pdf" style={{display:'none'}} onChange={e=>setReceipt(e.target.files?.[0]||null)}/>
                        {receipt?(
                          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                            <Check size={12} color="#00ff9d"/>
                            <span style={{fontFamily:SERIF,fontSize:13,color:'rgba(0,255,157,0.65)'}}>{receipt.name}</span>
                            <button onClick={e=>{e.stopPropagation();setReceipt(null)}} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.22)'}}><X size={10}/></button>
                          </div>
                        ):(
                          <><Upload size={13} color={WG} style={{marginBottom:6}}/><div style={{fontFamily:MONO,fontSize:7.5,letterSpacing:'0.2em',color:'rgba(212,204,184,0.36)',textTransform:'uppercase'}}>Upload Payment Receipt</div></>
                        )}
                      </div>
                    </div>
                    <button onClick={handleManual} disabled={submitting||!receipt}
                      style={{width:'100%',background:receipt?'linear-gradient(135deg,rgba(26,86,219,0.12),rgba(212,204,184,0.03))':'rgba(255,255,255,0.02)',border:'1px solid '+(receipt?SAPH:'rgba(255,255,255,0.06)'),color:receipt?WG2:'rgba(255,255,255,0.16)',padding:'16px',fontFamily:MONO,fontSize:8,letterSpacing:'0.36em',textTransform:'uppercase',cursor:receipt?'pointer':'not-allowed',transition:'all 0.3s'}}>
                      {submitting?'Processing...':'Complete Acquisition'}
                    </button>
                  </motion.div>
                )}
                {payMethod==='cod' && (
                  <motion.div key="cd" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.3}}>
                    <div style={{border:'1px solid rgba(26,86,219,0.08)',padding:'26px',background:'rgba(0,0,0,0.2)',marginBottom:16}}>
                      <div style={{fontFamily:MONO,fontSize:7,letterSpacing:'0.36em',textTransform:'uppercase',color:'rgba(212,204,184,0.26)',marginBottom:14}}>Cash on Delivery</div>
                      <p style={{fontFamily:SERIF,fontSize:14,color:'rgba(255,255,255,0.38)',lineHeight:1.8,marginBottom:14}}>Your Eternal Grace Sapphire Set will be delivered by certified white-glove courier. Payment collected upon delivery. A 5% COD surcharge applies.</p>
                      <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
                        <div><div style={{fontFamily:MONO,fontSize:6.5,color:'rgba(255,255,255,0.18)',textTransform:'uppercase',marginBottom:3}}>COD Amount</div><div style={{fontFamily:SERIF,fontSize:18,color:WG}}>Rs {formatPKR(Math.round(product.price_pkr*1.05))}</div></div>
                        <div><div style={{fontFamily:MONO,fontSize:6.5,color:'rgba(255,255,255,0.18)',textTransform:'uppercase',marginBottom:3}}>Delivery</div><div style={{fontFamily:SERIF,fontSize:18,color:WG}}>3–5 Business Days</div></div>
                      </div>
                    </div>
                    <button onClick={handleCOD} disabled={submitting||!shipping.name||!shipping.phone||!shipping.address}
                      style={{width:'100%',background:'linear-gradient(135deg,rgba(26,86,219,0.11),rgba(212,204,184,0.03))',border:'1px solid '+SAPH,color:WG2,padding:'16px',fontFamily:MONO,fontSize:8,letterSpacing:'0.36em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.3s'}}>
                      {submitting?'Confirming...':'Confirm Archive Acquisition'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              {error&&<div style={{marginTop:10,padding:'10px 13px',border:'1px solid rgba(255,80,80,0.12)',background:'rgba(255,80,80,0.03)',fontFamily:MONO,fontSize:8,color:'rgba(255,120,120,0.65)'}}>{error}</div>}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
