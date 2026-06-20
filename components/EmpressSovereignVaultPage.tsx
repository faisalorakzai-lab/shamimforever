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
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  <textarea
                    value={custMessage} onChange={e=>setCustMessage(e.target.value)}
                    placeholder="Message / special instructions (optional)"
                    style={{ width:'100%', background:'transparent', border:'1px solid rgba(201,160,84,0.12)', padding:'14px 18px', fontSize:11, color:'rgba(212,204,184,0.7)', outline:'none', resize:'none', fontFamily:'inherit', boxSizing:'border-box' }}
                    rows={3}
                  />
                  {walletAdded ? (
                    <div style={{ padding:'18px', border:'1px solid rgba(201,160,84,0.2)', background:'rgba(201,160,84,0.04)', textAlign:'center' }}>
                      <p style={{ fontFamily:'monospace', fontSize:8.5, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(201,160,84,0.8)' }}>◆ Added to Wallet</p>
                      <Link href="/wallet" style={{ fontSize:7.5, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(212,204,184,0.35)', marginTop:8, display:'inline-block', textDecoration:'none' }}>View Wallet →</Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => { addItem({ product_id:product.id, product_name:product.name, slug:product.slug, price_usd:product.price_usd, quantity:1, image:product.images?.[0]||'', custom_message:custMessage }); setWalletAdded(true) }}
                      style={{ width:'100%', background:'linear-gradient(135deg,rgba(196,30,58,0.12),rgba(201,160,84,0.05))', border:'1px solid rgba(196,30,58,0.3)', color:'rgba(201,160,84,0.85)', padding:'19px', fontFamily:'monospace', fontSize:9, letterSpacing:'0.42em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}>
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
  