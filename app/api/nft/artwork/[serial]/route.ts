import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ─── Product registry ────────────────────────────────────────────────────────
interface Product {
  name: string; line1: string; line2: string
  subtitle: string; price: string; origin: string
  material: string; notes: string; edition: string
  tier: string; tokenId: number; serial: string
}
const PRODUCTS: Record<string, Product> = {
  'SF-FND-0001': { name: "SHAMIM'S GHOST", line1: "SHAMIM'S", line2: 'GHOST', subtitle: 'FOUNDERS SOVEREIGN EDITION', price: '$150,000', origin: 'Karachi Sovereign Atelier', material: 'Black Pakistani Oud · Kashmiri Saffron', notes: 'Oud · Saffron · Grasse Rose · Sacred Amber', edition: '1 of 1 — Founder Master Asset', tier: 'FOUNDERS', tokenId: 4, serial: 'SF-FND-0001' },
  'SF-SG-2026-00005': { name: "SHAMIM'S GHOST", line1: "SHAMIM'S", line2: 'GHOST', subtitle: 'FOUNDERS SOVEREIGN EDITION', price: '$150,000', origin: 'Karachi Sovereign Atelier', material: 'Black Pakistani Oud · Kashmiri Saffron', notes: 'Oud · Saffron · Grasse Rose · Sacred Amber', edition: '1 of 1 — Founders Legacy', tier: 'FOUNDERS', tokenId: 4, serial: 'SF-SG-2026-00005' },
  'SF-IK-2026-00001': { name: 'SACRED INCENSE OF KYOTO', line1: 'SACRED INCENSE', line2: 'OF KYOTO', subtitle: 'IMPERIAL CUT', price: '$85,000', origin: 'Kyoto, Japan', material: 'Japanese Oud · Hinoki Wood', notes: 'Oud · Hinoki · Benzoin · Incense', edition: 'Imperial Registry — 1 of 3', tier: 'IMPERIAL', tokenId: 0, serial: 'SF-IK-2026-00001' },
  'SF-BL-2026-00002': { name: 'SAPPHIRE BLUE LEVANT', line1: 'SAPPHIRE BLUE', line2: 'LEVANT', subtitle: 'ROYAL HERITAGE', price: '$65,000', origin: 'Damascus, Syria', material: 'Taif Rose · Aged Sandalwood', notes: 'Taif Rose · Sea Salt · Sandalwood', edition: 'Royal Archive — 1 of 5', tier: 'ROYAL', tokenId: 1, serial: 'SF-BL-2026-00002' },
  'SF-VA-2026-00003': { name: 'SF VANILLA ABSOLUTE', line1: 'SF VANILLA', line2: 'ABSOLUTE', subtitle: 'FOUNDERS EDITION', price: '$120,000', origin: 'Tahiti & Madagascar', material: 'Vanilla Absolute · White Ambergris', notes: 'Vanilla · Ambergris · Ylang · Musk', edition: 'Founders Archive — 1 of 2', tier: 'FOUNDERS', tokenId: 2, serial: 'SF-VA-2026-00003' },
  'SF-MI-2026-00004': { name: 'MIDNIGHT IRIS ROYALE', line1: 'MIDNIGHT IRIS', line2: 'ROYALE', subtitle: 'BESPOKE MASTERPIECE', price: '$250,000', origin: 'Florence, Italy', material: '12yr Iris Concrete · Civet', notes: 'Florentine Iris · Patchouli · Civet', edition: 'Absolute Unique — 1 of 1', tier: 'ONE-OF-ONE', tokenId: 3, serial: 'SF-MI-2026-00004' },
  'SF-RN-2026-00006': { name: 'SOVEREIGN ROSE NOIR', line1: 'SOVEREIGN', line2: 'ROSE NOIR', subtitle: 'ELITE ATELIER SELECTION', price: '$55,000', origin: 'Istanbul, Turkey', material: 'Rose de Mai · Oud Smoke', notes: 'Turkish Rose · Oud Smoke · Vetiver', edition: 'Elite Selection — 1 of 7', tier: 'ELITE', tokenId: 5, serial: 'SF-RN-2026-00006' },
  'SF-OC-2026-00007': { name: 'THE ORAKZAI CREST AMBER', line1: 'THE ORAKZAI', line2: 'CREST AMBER', subtitle: '1/1 VAULT PIECE', price: '$500,000', origin: 'Orakzai, KPK, Pakistan', material: 'Baltic Amber · 60yr Mysore Sandalwood', notes: 'Baltic Amber · Tribal Oud · Sacred Resin', edition: 'Absolute Unique — 1 of 1', tier: 'ONE-OF-ONE', tokenId: 6, serial: 'SF-OC-2026-00007' },
  'SF-MO-2026-00008': { name: 'MAJESTIC OUD SUPREME', line1: 'MAJESTIC OUD', line2: 'SUPREME', subtitle: 'IMPERIAL REGISTRY', price: '$95,000', origin: 'Phnom Penh, Cambodia', material: '25yr Wild Oud · Frankincense', notes: 'Wild Oud · Frankincense · Civet · Amber', edition: 'Imperial Registry — 1 of 3', tier: 'IMPERIAL', tokenId: 7, serial: 'SF-MO-2026-00008' },
  'SF-CM-2026-00009': { name: 'CELESTIAL MUSK SIGNET', line1: 'CELESTIAL MUSK', line2: 'SIGNET', subtitle: 'ATELIER ARCHIVE', price: '$75,000', origin: 'Kannauj, India', material: 'White Musk · Himalayan Cedar', notes: 'White Musk · Ambrette · Cedar · Orris', edition: 'Royal Archive — 1 of 5', tier: 'ROYAL', tokenId: 8, serial: 'SF-CM-2026-00009' },
  'SF-IO-2026-00010': { name: 'SOVEREIGN INFINITE OUD', line1: 'SOVEREIGN', line2: 'INFINITE OUD', subtitle: 'GRAND FINALE ASSET', price: '$1,000,000', origin: 'Assam, India — 1963', material: '60yr Assam Oud · 1985 Grasse Rose', notes: '1963 Oud · 1985 Rose · Civet · Amber', edition: 'Absolute Unique — 1 of 1', tier: 'ONE-OF-ONE', tokenId: 9, serial: 'SF-IO-2026-00010' },
}

// ─── Tier palettes ────────────────────────────────────────────────────────────
const PALETTE: Record<string, { g1: string; g2: string; g3: string; bg: string; glow: string; badge: string }> = {
  FOUNDERS:    { g1: '#e8c87a', g2: '#c9a054', g3: '#8a6830', bg: '#060402', glow: '#c9a054', badge: 'FOUNDERS RESERVE' },
  'ONE-OF-ONE':{ g1: '#f5f5ed', g2: '#d8d8cc', g3: '#909088', bg: '#040404', glow: '#e0e0d8', badge: 'ONE OF ONE' },
  IMPERIAL:    { g1: '#ffcc44', g2: '#d4900a', g3: '#8a5800', bg: '#080400', glow: '#d4900a', badge: 'IMPERIAL REGISTRY' },
  ROYAL:       { g1: '#b8d4ff', g2: '#7a9fcf', g3: '#3a5a8f', bg: '#010418', glow: '#7a9fcf', badge: 'ROYAL HERITAGE' },
  ELITE:       { g1: '#d8c890', g2: '#b0a060', g3: '#706040', bg: '#080706', glow: '#b0a060', badge: 'ELITE ATELIER' },
}

function getPalette(tier: string) {
  return PALETTE[tier] || PALETTE.ELITE
}

// ─── The sovereign SVG artwork ────────────────────────────────────────────────
function buildSVG(p: Product): string {
  const c = getPalette(p.tier)
  const isFounders = p.tier === 'FOUNDERS'
  const isOneOfOne = p.tier === 'ONE-OF-ONE'

  // Bottle height varies by tier
  const bottleH = isFounders || isOneOfOne ? 320 : 290
  const bottleW = isFounders ? 100 : isOneOfOne ? 72 : 90

  const parts: string[] = []

  parts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="2000" height="2000">')
  parts.push('<defs>')

  // Background
  parts.push('<radialGradient id="bg" cx="50%" cy="28%" r="80%">')
  parts.push('<stop offset="0%" stop-color="#151008" />')
  parts.push('<stop offset="45%" stop-color="' + c.bg + '" />')
  parts.push('<stop offset="100%" stop-color="#020202" />')
  parts.push('</radialGradient>')

  // Spotlight from above
  parts.push('<radialGradient id="spot" cx="50%" cy="0%" r="65%">')
  parts.push('<stop offset="0%" stop-color="' + c.glow + '" stop-opacity="0.22" />')
  parts.push('<stop offset="60%" stop-color="' + c.glow + '" stop-opacity="0.04" />')
  parts.push('<stop offset="100%" stop-color="' + c.glow + '" stop-opacity="0" />')
  parts.push('</radialGradient>')

  // Bottle gradient
  parts.push('<linearGradient id="bG" x1="15%" y1="0%" x2="85%" y2="100%">')
  parts.push('<stop offset="0%" stop-color="' + c.g1 + '" stop-opacity="0.18" />')
  parts.push('<stop offset="30%" stop-color="#1a1a18" stop-opacity="0.95" />')
  parts.push('<stop offset="70%" stop-color="#0a0a08" />')
  parts.push('<stop offset="100%" stop-color="#1e1e1c" stop-opacity="0.9" />')
  parts.push('</linearGradient>')

  // Bottle reflection
  parts.push('<linearGradient id="bR" x1="0%" y1="0%" x2="100%" y2="0%">')
  parts.push('<stop offset="0%" stop-color="' + c.g1 + '" stop-opacity="0" />')
  parts.push('<stop offset="12%" stop-color="' + c.g1 + '" stop-opacity="0.28" />')
  parts.push('<stop offset="22%" stop-color="' + c.g1 + '" stop-opacity="0.08" />')
  parts.push('<stop offset="100%" stop-color="' + c.g1 + '" stop-opacity="0" />')
  parts.push('</linearGradient>')

  // Gold gradient
  parts.push('<linearGradient id="gG" x1="0%" y1="0%" x2="100%" y2="100%">')
  parts.push('<stop offset="0%" stop-color="' + c.g1 + '" />')
  parts.push('<stop offset="50%" stop-color="' + c.g2 + '" />')
  parts.push('<stop offset="100%" stop-color="' + c.g3 + '" />')
  parts.push('</linearGradient>')

  // Horizontal line fade
  parts.push('<linearGradient id="hL" x1="0%" y1="0%" x2="100%" y2="0%">')
  parts.push('<stop offset="0%" stop-color="' + c.g2 + '" stop-opacity="0" />')
  parts.push('<stop offset="20%" stop-color="' + c.g2 + '" stop-opacity="0.75" />')
  parts.push('<stop offset="50%" stop-color="' + c.g1 + '" />')
  parts.push('<stop offset="80%" stop-color="' + c.g2 + '" stop-opacity="0.75" />')
  parts.push('<stop offset="100%" stop-color="' + c.g2 + '" stop-opacity="0" />')
  parts.push('</linearGradient>')

  // Smoke/fog filter
  parts.push('<filter id="smoke" x="-20%" y="-20%" width="140%" height="140%">')
  parts.push('<feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="4" seed="8" result="noise" />')
  parts.push('<feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />')
  parts.push('<feComponentTransfer in="grayNoise" result="alphaSmoke">')
  parts.push('<feFuncA type="gamma" amplitude="0.18" exponent="1.8" offset="0" />')
  parts.push('</feComponentTransfer>')
  parts.push('<feFlood flood-color="' + c.g2 + '" flood-opacity="1" result="goldColor" />')
  parts.push('<feComposite in="goldColor" in2="alphaSmoke" operator="in" result="goldSmoke" />')
  parts.push('<feMerge><feMergeNode in="goldSmoke" /><feMergeNode in="SourceGraphic" /></feMerge>')
  parts.push('</filter>')

  // Glow filter
  parts.push('<filter id="glow">')
  parts.push('<feGaussianBlur stdDeviation="8" result="b" />')
  parts.push('<feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>')
  parts.push('</filter>')

  // Bottle glow filter
  parts.push('<filter id="bottleGlow" x="-30%" y="-15%" width="160%" height="130%">')
  parts.push('<feGaussianBlur stdDeviation="24" result="b" />')
  parts.push('<feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>')
  parts.push('</filter>')

  // Text glow
  parts.push('<filter id="tGlow">')
  parts.push('<feGaussianBlur stdDeviation="3" result="b" />')
  parts.push('<feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>')
  parts.push('</filter>')

  // Dot pattern
  parts.push('<pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">')
  parts.push('<circle cx="30" cy="30" r="0.6" fill="' + c.g2 + '" fill-opacity="0.1" />')
  parts.push('</pattern>')

  parts.push('</defs>')

  // ── LAYERS ──────────────────────────────────────────────────────

  // Base
  parts.push('<rect width="2000" height="2000" fill="url(#bg)" />')
  parts.push('<rect width="2000" height="2000" fill="url(#dots)" />')
  parts.push('<rect width="2000" height="2000" fill="url(#spot)" />')

  // Smoke layer below bottle
  parts.push('<rect x="600" y="900" width="800" height="700" fill="' + c.g2 + '" fill-opacity="0.015" filter="url(#smoke)" />')

  // ── BORDER SYSTEM ──
  parts.push('<rect x="24" y="24" width="1952" height="1952" rx="2" fill="none" stroke="' + c.g2 + '" stroke-width="0.6" stroke-opacity="0.25" />')
  parts.push('<rect x="34" y="34" width="1932" height="1932" rx="1" fill="none" stroke="url(#gG)" stroke-width="2.5" stroke-opacity="0.95" />')
  parts.push('<rect x="42" y="42" width="1916" height="1916" rx="1" fill="none" stroke="' + c.g2 + '" stroke-width="0.5" stroke-opacity="0.2" />')
  parts.push('<rect x="80" y="80" width="1840" height="1840" rx="1" fill="none" stroke="' + c.g2 + '" stroke-width="0.3" stroke-opacity="0.1" />')

  // Corner ornaments
  const corners = [[34,34,1,1],[1966,34,-1,1],[34,1966,1,-1],[1966,1966,-1,-1]]
  for (const [cx,cy,sx,sy] of corners) {
    parts.push('<g transform="translate(' + cx + ',' + cy + ')">')
    parts.push('<line x1="0" y1="0" x2="' + (sx*70) + '" y2="0" stroke="' + c.g1 + '" stroke-width="2.5" stroke-opacity="0.95" />')
    parts.push('<line x1="0" y1="0" x2="0" y2="' + (sy*70) + '" stroke="' + c.g1 + '" stroke-width="2.5" stroke-opacity="0.95" />')
    parts.push('<line x1="' + (sx*12) + '" y1="0" x2="' + (sx*70) + '" y2="0" stroke="' + c.g1 + '" stroke-width="0.8" stroke-opacity="0.5" />')
    parts.push('<circle cx="' + (sx*8) + '" cy="' + (sy*8) + '" r="4" fill="' + c.g1 + '" fill-opacity="0.85" />')
    parts.push('<circle cx="' + (sx*8) + '" cy="' + (sy*8) + '" r="1.5" fill="#ffffff" fill-opacity="0.5" />')
    parts.push('</g>')
  }

  // Vertical side rules
  parts.push('<rect x="34" y="450" width="2.5" height="1100" fill="' + c.g2 + '" fill-opacity="0.25" />')
  parts.push('<rect x="1963.5" y="450" width="2.5" height="1100" fill="' + c.g2 + '" fill-opacity="0.25" />')

  // ── HEADER ──────────────────────────────────────────────────────
  parts.push('<text x="1000" y="130" font-family="Georgia,'Times New Roman',serif" font-size="17" fill="' + c.g2 + '" fill-opacity="0.55" letter-spacing="14" text-anchor="middle">THE HOUSE OF SHAMIM FOREVER</text>')
  parts.push('<rect x="120" y="150" width="1760" height="0.8" fill="url(#hL)" opacity="0.5" />')

  // Rarity badge
  parts.push('<rect x="760" y="164" width="480" height="52" rx="1" fill="' + c.g2 + '" fill-opacity="0.06" stroke="' + c.g2 + '" stroke-width="0.8" stroke-opacity="0.5" />')
  parts.push('<text x="1000" y="198" font-family="Georgia,serif" font-size="18" fill="' + c.g1 + '" text-anchor="middle" letter-spacing="8" filter="url(#tGlow)">' + c.badge + '</text>')

  // Token ID badge top-right
  parts.push('<text x="1900" y="130" font-family="'Courier New',monospace" font-size="16" fill="' + c.g2 + '" fill-opacity="0.4" text-anchor="end" letter-spacing="3">TOKEN #' + p.tokenId + '</text>')

  // ── SOVEREIGN SEAL — circular emblem above bottle ──────────────
  const sealCX = 1000, sealCY = 420
  parts.push('<g transform="translate(' + sealCX + ',' + sealCY + ')" filter="url(#glow)">')
  // Outer rings
  parts.push('<circle cx="0" cy="0" r="148" fill="none" stroke="' + c.g2 + '" stroke-width="0.6" stroke-opacity="0.35" />')
  parts.push('<circle cx="0" cy="0" r="138" fill="' + c.g2 + '" fill-opacity="0.03" stroke="' + c.g2 + '" stroke-width="1.4" stroke-opacity="0.75" />')
  parts.push('<circle cx="0" cy="0" r="124" fill="none" stroke="' + c.g2 + '" stroke-width="0.5" stroke-opacity="0.25" />')

  // 8 radial spokes
  for (let i = 0; i < 8; i++) {
    const a = (i * 45) * Math.PI / 180
    const x1 = Math.cos(a) * 38, y1 = Math.sin(a) * 38
    const x2 = Math.cos(a) * 118, y2 = Math.sin(a) * 118
    parts.push('<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + c.g2 + '" stroke-width="0.8" stroke-opacity="0.45" />')
  }

  // Central emblem — diamond for founders/one-of-one, octagon for others
  if (p.tier === 'FOUNDERS' || p.tier === 'ONE-OF-ONE') {
    parts.push('<polygon points="0,-48 34,0 0,48 -34,0" fill="' + c.g2 + '" fill-opacity="0.12" stroke="' + c.g2 + '" stroke-width="1.2" />')
    parts.push('<polygon points="0,-28 20,0 0,28 -20,0" fill="url(#gG)" fill-opacity="0.7" />')
    parts.push('<circle cx="0" cy="0" r="8" fill="' + c.g1 + '" />')
  } else {
    parts.push('<polygon points="0,-48 34,-20 34,20 0,48 -34,20 -34,-20" fill="' + c.g2 + '" fill-opacity="0.15" stroke="' + c.g2 + '" stroke-width="1.2" />')
    parts.push('<polygon points="0,-28 20,-12 20,12 0,28 -20,12 -20,-12" fill="url(#gG)" fill-opacity="0.65" />')
    parts.push('<circle cx="0" cy="0" r="7" fill="' + c.g1 + '" />')
  }

  // Circular text
  parts.push('<defs><path id="arcT" d="M-126,0 A126,126 0 0,1 126,0" /><path id="arcB" d="M-126,0 A126,126 0 0,0 126,0" /></defs>')
  parts.push('<text font-family="Georgia,serif" font-size="13.5" fill="' + c.g2 + '" fill-opacity="0.5" letter-spacing="4.5"><textPath href="#arcT" startOffset="8%">SHAMIM FOREVER · SOVEREIGN LUXURY ARCHIVE · KARACHI ATELIER ·</textPath></text>')
  parts.push('<text font-family="Georgia,serif" font-size="13.5" fill="' + c.g2 + '" fill-opacity="0.45" letter-spacing="4"><textPath href="#arcB" startOffset="10%">· POLYGON MAINNET · ERC-721 · ' + p.serial + ' ·</textPath></text>')
  parts.push('</g>')

  // ── PERFUME BOTTLE — CENTERPIECE ────────────────────────────────
  const bCX = 1000, bTop = 580, bH = bottleH, bW = bottleW, bBot = bTop + bH

  parts.push('<g filter="url(#bottleGlow)">')

  // Atmospheric glow behind bottle
  parts.push('<ellipse cx="' + bCX + '" cy="' + (bTop + bH/2) + '" rx="' + (bW + 100) + '" ry="' + (bH/2 + 80) + '" fill="' + c.g2 + '" fill-opacity="0.04" />')

  if (p.tier === 'ONE-OF-ONE') {
    // Slender tall Venetian glass bottle
    const neck = bW * 0.28
    parts.push('<path d="M' + (bCX - neck) + ',' + bTop + ' Q' + (bCX - bW) + ',' + (bTop + bH*0.15) + ' ' + (bCX - bW) + ',' + (bTop + bH*0.35) + ' L' + (bCX - bW) + ',' + bBot + ' L' + (bCX + bW) + ',' + bBot + ' L' + (bCX + bW) + ',' + (bTop + bH*0.35) + ' Q' + (bCX + bW) + ',' + (bTop + bH*0.15) + ' ' + (bCX + neck) + ',' + bTop + ' Z" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="0.8" stroke-opacity="0.6" />')
    // Stopper
    parts.push('<rect x="' + (bCX - neck*0.7) + '" y="' + (bTop - 60) + '" width="' + (neck*1.4) + '" height="64" rx="4" fill="' + c.g2 + '" fill-opacity="0.85" />')
    parts.push('<ellipse cx="' + bCX + '" cy="' + (bTop - 62) + '" rx="' + (neck*0.8) + '" ry="10" fill="' + c.g1 + '" fill-opacity="0.7" />')
  } else if (p.tier === 'IMPERIAL') {
    // Wide imperial flacon
    parts.push('<rect x="' + (bCX - bW) + '" y="' + (bTop + 40) + '" width="' + (bW*2) + '" height="' + (bH - 40) + '" rx="8" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="0.8" stroke-opacity="0.6" />')
    parts.push('<rect x="' + (bCX - bW*0.55) + '" y="' + bTop + '" width="' + (bW*1.1) + '" height="46" rx="4" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="0.7" stroke-opacity="0.5" />')
    // Crown stopper
    parts.push('<rect x="' + (bCX - 20) + '" y="' + (bTop - 56) + '" width="40" height="58" rx="4" fill="' + c.g2 + '" fill-opacity="0.9" />')
    parts.push('<polygon points="' + bCX + ',' + (bTop-74) + ' ' + (bCX-18) + ',' + (bTop-54) + ' ' + (bCX-8) + ',' + (bTop-54) + ' ' + bCX + ',' + (bTop-42) + ' ' + (bCX+8) + ',' + (bTop-54) + ' ' + (bCX+18) + ',' + (bTop-54) + '" fill="' + c.g1 + '" />')
  } else if (p.tier === 'FOUNDERS') {
    // Obsidian oval — the SHAMIM'S GHOST signature bottle
    parts.push('<ellipse cx="' + bCX + '" cy="' + (bTop + bH*0.5) + '" rx="' + bW + '" ry="' + (bH*0.52) + '" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="1" stroke-opacity="0.65" />')
    // Neck
    parts.push('<rect x="' + (bCX - 28) + '" y="' + bTop + '" width="56" height="' + (bH*0.12) + '" rx="4" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="0.6" stroke-opacity="0.5" />')
    // Gold cap stopper
    parts.push('<rect x="' + (bCX - 22) + '" y="' + (bTop - 52) + '" width="44" height="56" rx="6" fill="url(#gG)" />')
    parts.push('<ellipse cx="' + bCX + '" cy="' + (bTop - 52) + '" rx="24" ry="10" fill="' + c.g1 + '" fill-opacity="0.7" />')
  } else if (p.tier === 'ROYAL') {
    // Hexagonal
    const hW = bW, hH = bH
    const hx = bCX, hy = bTop + hH*0.5
    parts.push('<polygon points="' + hx + ',' + bTop + ' ' + (hx+hW) + ',' + (bTop+hH*0.25) + ' ' + (hx+hW) + ',' + (bTop+hH*0.75) + ' ' + hx + ',' + (bTop+hH) + ' ' + (hx-hW) + ',' + (bTop+hH*0.75) + ' ' + (hx-hW) + ',' + (bTop+hH*0.25) + '" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="0.9" stroke-opacity="0.6" />')
    parts.push('<rect x="' + (hx-24) + '" y="' + (bTop-54) + '" width="48" height="58" rx="4" fill="' + c.g2 + '" fill-opacity="0.9" />')
    parts.push('<polygon points="' + hx + ',' + (bTop-72) + ' ' + (hx-12) + ',' + (bTop-54) + ' ' + (hx+12) + ',' + (bTop-54) + '" fill="' + c.g1 + '" />')
  } else {
    // Classic rectangular ELITE flacon
    parts.push('<rect x="' + (bCX - bW) + '" y="' + (bTop + 40) + '" width="' + (bW*2) + '" height="' + (bH - 40) + '" rx="8" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="0.8" stroke-opacity="0.6" />')
    parts.push('<rect x="' + (bCX - bW*0.5) + '" y="' + bTop + '" width="' + (bW) + '" height="46" rx="4" fill="url(#bG)" stroke="' + c.g2 + '" stroke-width="0.6" stroke-opacity="0.5" />')
    parts.push('<rect x="' + (bCX - 18) + '" y="' + (bTop - 52) + '" width="36" height="56" rx="4" fill="' + c.g2 + '" fill-opacity="0.9" />')
    parts.push('<rect x="' + (bCX - 26) + '" y="' + (bTop - 58) + '" width="52" height="10" rx="2" fill="' + c.g1 + '" fill-opacity="0.8" />')
  }

  // Bottle reflection highlight (always)
  parts.push('<rect x="' + (bCX - bW + 4) + '" y="' + (bTop + 50) + '" width="' + (bW*2 - 8) + '" height="' + (bH - 60) + '" rx="6" fill="url(#bR)" />')

  // SF monogram engraving on bottle center
  const engY = bTop + bH * 0.52
  parts.push('<text x="' + bCX + '" y="' + engY + '" font-family="Georgia,'Times New Roman',serif" font-size="22" fill="' + c.g2 + '" fill-opacity="0.55" text-anchor="middle" letter-spacing="6">SF</text>')
  parts.push('<text x="' + bCX + '" y="' + (engY + 22) + '" font-family="Georgia,serif" font-size="10" fill="' + c.g2 + '" fill-opacity="0.3" text-anchor="middle" letter-spacing="3">SOVEREIGN</text>')

  // Ground shadow
  parts.push('<ellipse cx="' + bCX + '" cy="' + (bBot + 18) + '" rx="' + (bW*0.75) + '" ry="12" fill="' + c.g2 + '" fill-opacity="0.12" />')
  parts.push('</g>')

  // ── PRODUCT TITLE ────────────────────────────────────────────────
  const titleTop = bBot + 70
  parts.push('<rect x="120" y="' + (titleTop - 12) + '" width="1760" height="0.8" fill="url(#hL)" opacity="0.4" />')

  // Title line 1
  parts.push('<text x="1000" y="' + (titleTop + 72) + '" font-family="Georgia,'Times New Roman',serif" font-size="62" fill="#f4efe0" fill-opacity="0.98" text-anchor="middle" letter-spacing="4" font-weight="400" filter="url(#tGlow)">' + p.line1 + '</text>')
  // Title line 2
  parts.push('<text x="1000" y="' + (titleTop + 148) + '" font-family="Georgia,'Times New Roman',serif" font-size="62" fill="#f4efe0" fill-opacity="0.98" text-anchor="middle" letter-spacing="4" font-weight="400" filter="url(#tGlow)">' + p.line2 + '</text>')

  // Diamond divider
  const divY = titleTop + 175
  parts.push('<line x1="120" y1="' + divY + '" x2="890" y2="' + divY + '" stroke="' + c.g2 + '" stroke-width="0.6" stroke-opacity="0.35" />')
  parts.push('<polygon points="1000,' + (divY-9) + ' 1010,' + divY + ' 1000,' + (divY+9) + ' 990,' + divY + '" fill="' + c.g2 + '" fill-opacity="0.7" />')
  parts.push('<line x1="1110" y1="' + divY + '" x2="1880" y2="' + divY + '" stroke="' + c.g2 + '" stroke-width="0.6" stroke-opacity="0.35" />')

  // Subtitle
  parts.push('<text x="1000" y="' + (divY + 44) + '" font-family="Georgia,serif" font-size="20" fill="' + c.g2 + '" fill-opacity="0.7" text-anchor="middle" letter-spacing="9">' + p.subtitle + '</text>')

  // Price
  parts.push('<text x="1000" y="' + (divY + 100) + '" font-family="Georgia,'Times New Roman',serif" font-size="36" fill="' + c.g1 + '" text-anchor="middle" letter-spacing="4" filter="url(#glow)">' + p.price + '</text>')
  parts.push('<text x="1000" y="' + (divY + 126) + '" font-family="Georgia,serif" font-size="13" fill="' + c.g2 + '" fill-opacity="0.4" text-anchor="middle" letter-spacing="5">APPRAISED VALUE</text>')

  // ── DETAIL ROW ───────────────────────────────────────────────────
  const dRow = divY + 158
  parts.push('<rect x="120" y="' + dRow + '" width="1760" height="0.5" fill="url(#hL)" opacity="0.2" />')

  // Three columns
  const cols = [
    { label: 'ORIGIN', value: p.origin, x: 380 },
    { label: 'MATERIAL', value: p.material, x: 1000 },
    { label: 'EDITION', value: p.edition, x: 1620 },
  ]
  for (const col of cols) {
    parts.push('<text x="' + col.x + '" y="' + (dRow + 38) + '" font-family="Georgia,serif" font-size="13" fill="' + c.g2 + '" fill-opacity="0.45" text-anchor="middle" letter-spacing="3">' + col.label + '</text>')
    parts.push('<text x="' + col.x + '" y="' + (dRow + 66) + '" font-family="Georgia,'Times New Roman',serif" font-size="16" fill="' + c.g1 + '" fill-opacity="0.85" text-anchor="middle">' + col.value + '</text>')
  }
  // Column dividers
  parts.push('<line x1="688" y1="' + (dRow + 14) + '" x2="688" y2="' + (dRow + 76) + '" stroke="' + c.g2 + '" stroke-width="0.4" stroke-opacity="0.2" />')
  parts.push('<line x1="1312" y1="' + (dRow + 14) + '" x2="1312" y2="' + (dRow + 76) + '" stroke="' + c.g2 + '" stroke-width="0.4" stroke-opacity="0.2" />')

  parts.push('<rect x="120" y="' + (dRow + 82) + '" width="1760" height="0.5" fill="url(#hL)" opacity="0.15" />')

  // Notes + serial
  const noteY = dRow + 116
  parts.push('<text x="1000" y="' + noteY + '" font-family="Georgia,serif" font-size="14" fill="' + c.g2 + '" fill-opacity="0.4" text-anchor="middle" letter-spacing="3">FRAGRANCE NOTES  ·  ' + p.notes + '</text>')
  parts.push('<text x="1000" y="' + (noteY + 44) + '" font-family="'Courier New',Courier,monospace" font-size="22" fill="' + c.g2 + '" fill-opacity="0.85" text-anchor="middle" letter-spacing="7">' + p.serial + '</text>')

  // ── FOOTER ───────────────────────────────────────────────────────
  const footY = noteY + 80
  parts.push('<rect x="120" y="' + footY + '" width="1760" height="0.8" fill="url(#hL)" opacity="0.3" />')
  parts.push('<text x="380" y="' + (footY + 38) + '" font-family="Georgia,serif" font-size="13" fill="' + c.g2 + '" fill-opacity="0.3" text-anchor="middle" letter-spacing="3">POLYGON MAINNET</text>')
  parts.push('<text x="1000" y="' + (footY + 38) + '" font-family="Georgia,'Times New Roman',serif" font-size="22" fill="' + c.g2 + '" fill-opacity="0.55" text-anchor="middle" letter-spacing="12">SHAMIM FOREVER</text>')
  parts.push('<text x="1620" y="' + (footY + 38) + '" font-family="Georgia,serif" font-size="13" fill="' + c.g2 + '" fill-opacity="0.3" text-anchor="middle" letter-spacing="3">ERC-721</text>')
  parts.push('<rect x="120" y="' + (footY + 52) + '" width="1760" height="0.4" fill="url(#hL)" opacity="0.15" />')
  parts.push('<text x="1000" y="' + (footY + 76) + '" font-family="Georgia,serif" font-size="12" fill="' + c.g2 + '" fill-opacity="0.18" text-anchor="middle" letter-spacing="3">SOVEREIGN LUXURY DIGITAL ARCHIVE · AUTHENTIC GENESIS MASTERPIECE · 2026</text>')

  parts.push('</svg>')
  return parts.join('\n')
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: { serial: string } }
) {
  const serial = params.serial.toUpperCase().replace(/\.svg$/i, '')
  const product = PRODUCTS[serial]

  const p: Product = product ?? {
    name: 'SOVEREIGN ASSET', line1: 'SOVEREIGN', line2: 'ASSET',
    subtitle: 'ELITE EDITION', price: '$50,000+',
    origin: 'Karachi Sovereign Atelier', material: 'Luxury Accord',
    notes: 'Oud · Rose · Amber · Musk',
    edition: 'Sovereign Edition', tier: 'ELITE',
    tokenId: 0, serial,
  }

  const svg = buildSVG(p)
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
