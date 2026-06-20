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
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <textarea
                    value={custMessage} onChange={e=>setCustMessage(e.target.value)}
                    placeholder="Message / special instructions (optional)"
                    style={{ width:'100%', background:'transparent', border:'1px solid rgba(201,160,84,0.12)', padding:'15px 20px', fontSize:11, color:'rgba(212,204,184,0.7)', outline:'none', resize:'none', fontFamily:'inherit', boxSizing:'border-box' }}
                    rows={3}
                  />
                  {walletAdded ? (
                    <div style={{ padding:'20px', border:'1px solid rgba(201,160,84,0.22)', background:'rgba(201,160,84,0.04)', textAlign:'center' }}>
                      <p style={{ fontFamily:'monospace', fontSize:9, letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,160,84,0.8)' }}>◆ Added to Wallet</p>
                      <Link href="/wallet" style={{ fontSize:8, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(212,204,184,0.38)', marginTop:10, display:'inline-block', textDecoration:'none' }}>View Wallet →</Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => { addItem({ product_id:product.id, product_name:product.name, slug:product.slug, price_usd:product.price_usd, quantity:1, image:product.images?.[0]||'', custom_message:custMessage }); setWalletAdded(true) }}
                      style={{ width:'100%', background:'linear-gradient(135deg,rgba(201,160,84,0.14),rgba(201,160,84,0.05))', border:'1px solid rgba(201,160,84,0.28)', color:'rgba(212,204,184,0.85)', padding:'20px', fontFamily:'monospace', fontSize:9, letterSpacing:'0.44em', textTransform:'uppercase', cursor:'pointer', transition:'all .3s' }}>
                      ADD TO WALLET
                    </button>
                  )}
                </div>
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
  