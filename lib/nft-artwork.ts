/**
 * SHAMIM FOREVER — Ultra-Luxury NFT Artwork Generator
 * $50,000+ Institutional Grade Sovereign Assets
 * Each NFT has a unique visual identity befitting ultra-high-net-worth collectors
 */

export interface ArtworkParams {
  serial: string
  rarityTier: string
  productName?: string
  ownershipCycle?: number
  price?: string
  origin?: string
}

// Unique visual identity per rarity tier
const TIER_DESIGN: Record<string, {
  bg1: string; bg2: string; bg3: string
  gold: string; goldLight: string; goldDark: string
  accent: string; accentLight: string
  pattern: string
  borderStyle: string
}> = {
  COMMON: {
    bg1: '#0a0a0c', bg2: '#111115', bg3: '#050507',
    gold: '#8a9898', goldLight: '#b0c4c4', goldDark: '#5a6868',
    accent: '#8a9898', accentLight: '#c0d0d0',
    pattern: 'grid', borderStyle: 'single',
  },
  ELITE: {
    bg1: '#0a0802', bg2: '#141008', bg3: '#050503',
    gold: '#c9a054', goldLight: '#e8c87a', goldDark: '#8a6830',
    accent: '#c9a054', accentLight: '#f0d890',
    pattern: 'diamonds', borderStyle: 'double',
  },
  ROYAL: {
    bg1: '#020510', bg2: '#080d1c', bg3: '#010308',
    gold: '#8aabdf', goldLight: '#b8d0f8', goldDark: '#4a6a9f',
    accent: '#c9a054', accentLight: '#e8c87a',
    pattern: 'hexagons', borderStyle: 'royal',
  },
  IMPERIAL: {
    bg1: '#0d0802', bg2: '#1a1004', bg3: '#080400',
    gold: '#d4900a', goldLight: '#f0b030', goldDark: '#8a5800',
    accent: '#e8c87a', accentLight: '#ffd870',
    pattern: 'imperial', borderStyle: 'triple',
  },
  FOUNDERS: {
    bg1: '#080008', bg2: '#110811', bg3: '#040004',
    gold: '#c8809a', goldLight: '#e8a0c0', goldDark: '#885060',
    accent: '#c9a054', accentLight: '#e8c87a',
    pattern: 'rose', borderStyle: 'founders',
  },
  'ONE-OF-ONE': {
    bg1: '#050505', bg2: '#0a0a0a', bg3: '#020202',
    gold: '#f0f0e8', goldLight: '#ffffff', goldDark: '#a0a098',
    accent: '#c9a054', accentLight: '#e8c87a',
    pattern: 'diamond-star', borderStyle: 'onyx',
  },
}

function getDesign(tier: string) {
  return TIER_DESIGN[tier] || TIER_DESIGN['ELITE']
}

// Generate unique background pattern per tier
function generatePattern(tier: string, d: ReturnType<typeof getDesign>): string {
  switch (d.pattern) {
    case 'diamonds':
      return `<pattern id="pat" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <polygon points="30,2 58,30 30,58 2,30" fill="none" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.12"/>
        <circle cx="30" cy="30" r="2" fill="${d.gold}" fill-opacity="0.06"/>
      </pattern>`
    case 'hexagons':
      return `<pattern id="pat" x="0" y="0" width="52" height="60" patternUnits="userSpaceOnUse">
        <polygon points="26,2 50,16 50,44 26,58 2,44 2,16" fill="none" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.1"/>
      </pattern>`
    case 'imperial':
      return `<pattern id="pat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <line x1="0" y1="40" x2="80" y2="40" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.08"/>
        <line x1="40" y1="0" x2="40" y2="80" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.08"/>
        <circle cx="40" cy="40" r="3" fill="${d.gold}" fill-opacity="0.05"/>
        <polygon points="40,10 70,40 40,70 10,40" fill="none" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.07"/>
      </pattern>`
    case 'rose':
      return `<pattern id="pat" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
        ${Array.from({length: 6}, (_, i) => {
          const a = i * 60 * Math.PI / 180
          const x = 35 + Math.cos(a) * 25, y = 35 + Math.sin(a) * 25
          return `<line x1="35" y1="35" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.1"/>`
        }).join('')}
        <circle cx="35" cy="35" r="25" fill="none" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.08"/>
      </pattern>`
    case 'diamond-star':
      return `<pattern id="pat" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        ${Array.from({length: 8}, (_, i) => {
          const a = i * 45 * Math.PI / 180
          const x = 50 + Math.cos(a) * 45, y = 50 + Math.sin(a) * 45
          return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.08"/>`
        }).join('')}
        <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.07"/>
      </pattern>`
    default:
      return `<pattern id="pat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="40" y2="40" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.05"/>
        <line x1="40" y1="0" x2="0" y2="40" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.05"/>
      </pattern>`
  }
}

// Generate unique emblem per rarity
function generateEmblem(tier: string, d: ReturnType<typeof getDesign>, sf: string): string {
  if (tier === 'ONE-OF-ONE') {
    // Diamond emblem
    return `
      <polygon points="0,-90 64,0 0,90 -64,0" fill="${d.gold}" fill-opacity="0.07" stroke="${d.gold}" stroke-width="1" stroke-opacity="0.8"/>
      <polygon points="0,-60 43,0 0,60 -43,0" fill="${d.gold}" fill-opacity="0.12" stroke="${d.gold}" stroke-width="0.8"/>
      <polygon points="0,-36 26,0 0,36 -26,0" fill="${d.gold}" fill-opacity="0.25" stroke="${d.gold}" stroke-width="1.2"/>
      <polygon points="0,-18 13,0 0,18 -13,0" fill="${d.gold}" fill-opacity="0.8"/>
      <circle cx="0" cy="0" r="4" fill="${d.gold}"/>
      <text x="0" y="-105" font-family="Georgia,serif" font-size="9" fill="${d.gold}" fill-opacity="0.5" text-anchor="middle" letter-spacing="3">◆ ONE OF ONE ◆</text>
    `
  }
  if (tier === 'FOUNDERS') {
    // Rose emblem
    return `
      <circle cx="0" cy="0" r="80" fill="none" stroke="${d.gold}" stroke-width="0.8" stroke-opacity="0.5"/>
      <circle cx="0" cy="0" r="60" fill="none" stroke="${d.gold}" stroke-width="0.5" stroke-opacity="0.3"/>
      ${Array.from({length: 6}, (_, i) => {
        const a = (i * 60 - 90) * Math.PI / 180
        const x1 = Math.cos(a) * 20, y1 = Math.sin(a) * 20
        const x2 = Math.cos(a) * 70, y2 = Math.sin(a) * 70
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${d.gold}" stroke-width="1" stroke-opacity="0.6"/>`
      }).join('')}
      <circle cx="0" cy="0" r="18" fill="${d.gold}" fill-opacity="0.2" stroke="${d.gold}" stroke-width="1"/>
      <circle cx="0" cy="0" r="8" fill="${d.gold}" fill-opacity="0.8"/>
      <text x="0" y="-95" font-family="Georgia,serif" font-size="9" fill="${d.gold}" fill-opacity="0.5" text-anchor="middle" letter-spacing="3">FOUNDERS RESERVE</text>
    `
  }
  if (tier === 'IMPERIAL') {
    // Crown emblem
    return `
      <polygon points="0,-85 60,0 0,85 -60,0" fill="none" stroke="${d.gold}" stroke-width="1" stroke-opacity="0.7"/>
      <polygon points="0,-65 46,0 0,65 -46,0" fill="${d.gold}" fill-opacity="0.06" stroke="${d.gold}" stroke-width="0.5" stroke-opacity="0.4"/>
      ${Array.from({length: 8}, (_, i) => {
        const a = (i * 45) * Math.PI / 180
        const x1 = Math.cos(a) * 25, y1 = Math.sin(a) * 25
        const x2 = Math.cos(a) * 75, y2 = Math.sin(a) * 75
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${d.gold}" stroke-width="0.6" stroke-opacity="0.4"/>`
      }).join('')}
      <polygon points="0,-28 20,0 0,28 -20,0" fill="${d.gold}" fill-opacity="0.6" stroke="${d.gold}" stroke-width="1"/>
      <circle cx="0" cy="0" r="6" fill="${d.gold}"/>
      <text x="0" y="-98" font-family="Georgia,serif" font-size="9" fill="${d.gold}" fill-opacity="0.5" text-anchor="middle" letter-spacing="3">IMPERIAL REGISTRY</text>
    `
  }
  if (tier === 'ROYAL') {
    // Hexagonal emblem
    return `
      <polygon points="0,-82 71,-41 71,41 0,82 -71,41 -71,-41" fill="none" stroke="${d.gold}" stroke-width="1" stroke-opacity="0.6"/>
      <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="${d.gold}" fill-opacity="0.05" stroke="${d.gold}" stroke-width="0.5" stroke-opacity="0.3"/>
      <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="${d.gold}" fill-opacity="0.2" stroke="${d.gold}" stroke-width="1"/>
      <circle cx="0" cy="0" r="10" fill="${d.gold}" fill-opacity="0.9"/>
      <text x="0" y="-97" font-family="Georgia,serif" font-size="9" fill="${d.gold}" fill-opacity="0.5" text-anchor="middle" letter-spacing="3">ROYAL HERITAGE</text>
    `
  }
  // Default (ELITE/COMMON) — 8-point star
  return `
    <circle cx="0" cy="0" r="82" fill="none" stroke="${d.gold}" stroke-width="0.8" stroke-opacity="0.5"/>
    ${Array.from({length: 8}, (_, i) => {
      const a = (i * 45) * Math.PI / 180
      const x1 = Math.cos(a) * 30, y1 = Math.sin(a) * 30
      const x2 = Math.cos(a) * 78, y2 = Math.sin(a) * 78
      const ma = ((i * 45 + 22.5) * Math.PI / 180)
      const mx = Math.cos(ma) * 52, my = Math.sin(ma) * 52
      return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${mx.toFixed(1)},${my.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="${d.gold}" stroke-width="0.8" stroke-opacity="0.6"/>`
    }).join('')}
    <polygon points="0,-34 24,0 0,34 -24,0" fill="${d.gold}" fill-opacity="0.2" stroke="${d.gold}" stroke-width="1"/>
    <polygon points="0,-16 11,0 0,16 -11,0" fill="${d.gold}" fill-opacity="0.9"/>
    <circle cx="0" cy="0" r="4" fill="${d.gold}"/>
  `
}

export function generateSovereignSVG(params: ArtworkParams): string {
  const {
    serial,
    rarityTier,
    productName = 'Sovereign Asset',
    ownershipCycle = 1,
    price = '$50,000+',
    origin = 'Karachi Sovereign Atelier',
  } = params

  const tier = rarityTier.toUpperCase()
  const d = getDesign(tier)
  const clean = (s: string) => s.replace(/[<>&"]/g, '').slice(0, 32)
  const sf = serial.replace(/[<>&"]/g, '')
  const pn = clean(productName)
  const orig = clean(origin).slice(0, 28)

  const isOneOfOne = tier === 'ONE-OF-ONE'
  const sealY = isOneOfOne ? 400 : 390

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
<defs>
  <!-- Background gradient -->
  <radialGradient id="bgGrad" cx="50%" cy="35%" r="70%">
    <stop offset="0%" stop-color="${d.bg2}"/>
    <stop offset="55%" stop-color="${d.bg1}"/>
    <stop offset="100%" stop-color="${d.bg3}"/>
  </radialGradient>
  <!-- Atmospheric glow -->
  <radialGradient id="atmoGlow" cx="50%" cy="38%" r="45%">
    <stop offset="0%" stop-color="${d.gold}" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="${d.gold}" stop-opacity="0"/>
  </radialGradient>
  <!-- Second accent glow (bottom) -->
  <radialGradient id="bottomGlow" cx="50%" cy="85%" r="35%">
    <stop offset="0%" stop-color="${d.accent}" stop-opacity="0.05"/>
    <stop offset="100%" stop-color="${d.accent}" stop-opacity="0"/>
  </radialGradient>
  <!-- Gold gradient -->
  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${d.goldLight}"/>
    <stop offset="40%" stop-color="${d.gold}"/>
    <stop offset="100%" stop-color="${d.goldDark}"/>
  </linearGradient>
  <!-- Border gradient -->
  <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${d.goldDark}" stop-opacity="0.4"/>
    <stop offset="25%" stop-color="${d.gold}" stop-opacity="0.9"/>
    <stop offset="50%" stop-color="${d.goldLight}"/>
    <stop offset="75%" stop-color="${d.gold}" stop-opacity="0.9"/>
    <stop offset="100%" stop-color="${d.goldDark}" stop-opacity="0.4"/>
  </linearGradient>
  <!-- Horizontal fade gradient -->
  <linearGradient id="hFade" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${d.gold}" stop-opacity="0"/>
    <stop offset="20%" stop-color="${d.gold}" stop-opacity="0.6"/>
    <stop offset="50%" stop-color="${d.goldLight}"/>
    <stop offset="80%" stop-color="${d.gold}" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="${d.gold}" stop-opacity="0"/>
  </linearGradient>
  <!-- Vertical fade for strips -->
  <linearGradient id="vFade" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${d.gold}" stop-opacity="0"/>
    <stop offset="30%" stop-color="${d.gold}" stop-opacity="0.4"/>
    <stop offset="70%" stop-color="${d.gold}" stop-opacity="0.4"/>
    <stop offset="100%" stop-color="${d.gold}" stop-opacity="0"/>
  </linearGradient>
  <!-- Pattern -->
  ${generatePattern(tier, d)}
  <!-- Filters -->
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="softGlow">
    <feGaussianBlur stdDeviation="8" result="blur"/>
    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
  </filter>
  <filter id="deepShadow">
    <feDropShadow dx="0" dy="0" stdDeviation="20" flood-color="${d.gold}" flood-opacity="0.25"/>
  </filter>
  <filter id="textGlow">
    <feGaussianBlur stdDeviation="2" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- ░░░ BASE LAYER ░░░ -->
<rect width="1000" height="1000" fill="url(#bgGrad)"/>
<rect width="1000" height="1000" fill="url(#pat)" opacity="1"/>
<rect width="1000" height="1000" fill="url(#atmoGlow)"/>
<rect width="1000" height="1000" fill="url(#bottomGlow)"/>

<!-- ░░░ OUTER FRAME — institutional certificate border ░░░ -->
<rect x="16" y="16" width="968" height="968" rx="2" fill="none" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.3"/>
<rect x="22" y="22" width="956" height="956" rx="1" fill="none" stroke="url(#borderGrad)" stroke-width="1.8"/>
<rect x="28" y="28" width="944" height="944" rx="1" fill="none" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.25"/>

<!-- Inner content box -->
<rect x="50" y="50" width="900" height="900" rx="1" fill="none" stroke="${d.gold}" stroke-width="0.3" stroke-opacity="0.15"/>

<!-- ░░░ CORNER ORNAMENTS ░░░ -->
${[
  [22, 22, 1, 1],
  [978, 22, -1, 1],
  [22, 978, 1, -1],
  [978, 978, -1, -1],
].map(([cx, cy, sx, sy]) => `
<g transform="translate(${cx},${cy})">
  <line x1="0" y1="0" x2="${sx * 36}" y2="0" stroke="${d.gold}" stroke-width="2" stroke-opacity="0.9"/>
  <line x1="0" y1="0" x2="0" y2="${sy * 36}" stroke="${d.gold}" stroke-width="2" stroke-opacity="0.9"/>
  <line x1="${sx * 8}" y1="0" x2="${sx * 36}" y2="0" stroke="${d.goldLight}" stroke-width="0.5" stroke-opacity="0.5"/>
  <circle cx="${sx * 4}" cy="${sy * 4}" r="2.5" fill="${d.gold}" fill-opacity="0.8"/>
  <circle cx="${sx * 4}" cy="${sy * 4}" r="1" fill="${d.goldLight}"/>
</g>`).join('')}

<!-- ░░░ VERTICAL SIDE ORNAMENTS ░░░ -->
<rect x="22" y="200" width="1.5" height="600" fill="url(#vFade)"/>
<rect x="976.5" y="200" width="1.5" height="600" fill="url(#vFade)"/>

<!-- ░░░ HEADER SECTION ░░░ -->
<!-- House mark -->
<text x="500" y="78"
  font-family="Georgia, 'Times New Roman', serif"
  font-size="9.5" fill="${d.gold}" fill-opacity="0.55"
  letter-spacing="7" text-anchor="middle">THE HOUSE OF SHAMIM FOREVER</text>

<!-- Top decorative line -->
<rect x="80" y="90" width="840" height="0.5" fill="url(#hFade)" opacity="0.5"/>

<!-- Rarity badge — top center -->
<rect x="390" y="100" width="220" height="28" rx="1"
  fill="${d.gold}" fill-opacity="0.07"
  stroke="${d.gold}" stroke-width="0.8" stroke-opacity="0.6"/>
<text x="500" y="119"
  font-family="Georgia, serif" font-size="11"
  fill="${d.gold}" text-anchor="middle" letter-spacing="5">${tier} TIER</text>

<!-- ░░░ SOVEREIGN SEAL — CENTER ░░░ -->
<g transform="translate(500,${sealY})" filter="url(#deepShadow)">
  <!-- Outer decorative ring -->
  <circle cx="0" cy="0" r="190" fill="none" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.3"/>
  <circle cx="0" cy="0" r="180" fill="none" stroke="${d.gold}" stroke-width="0.6" stroke-opacity="0.4"/>

  <!-- Main ring -->
  <circle cx="0" cy="0" r="160" fill="${d.gold}" fill-opacity="0.025"/>
  <circle cx="0" cy="0" r="158" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.85"/>
  <circle cx="0" cy="0" r="150" fill="none" stroke="${d.gold}" stroke-width="0.4" stroke-opacity="0.25"/>

  <!-- Unique emblem per tier -->
  <g filter="url(#glow)">
    ${generateEmblem(tier, d, sf)}
  </g>

  <!-- Circular text — top arc -->
  <defs>
    <path id="arcTop" d="M-148,0 A148,148 0 0,1 148,0"/>
    <path id="arcBot" d="M-148,0 A148,148 0 0,0 148,0"/>
  </defs>
  <text font-family="Georgia,serif" font-size="9" fill="${d.gold}" fill-opacity="0.45" letter-spacing="3.5">
    <textPath href="#arcTop" startOffset="10%">SHAMIM FOREVER · SOVEREIGN LUXURY ARCHIVE · KARACHI ·</textPath>
  </text>
  <text font-family="Georgia,serif" font-size="9" fill="${d.gold}" fill-opacity="0.45" letter-spacing="3">
    <textPath href="#arcBot" startOffset="15%">· POLYGON MAINNET · ERC-721 · ${tier} EDITION ·</textPath>
  </text>
</g>

<!-- ░░░ PRODUCT SECTION ░░░ -->
<!-- Horizontal divider above product name -->
<rect x="80" y="${sealY + 200}" width="840" height="0.5" fill="url(#hFade)" opacity="0.4"/>

<!-- Product name — serif, prominent -->
<text x="500" y="${sealY + 240}"
  font-family="Georgia, 'Times New Roman', serif"
  font-size="${pn.length > 22 ? 22 : pn.length > 16 ? 26 : 30}"
  fill="#f0ece0" fill-opacity="0.96"
  text-anchor="middle"
  letter-spacing="1"
  font-weight="400"
  filter="url(#textGlow)">${pn}</text>

<!-- Decorative diamond divider -->
<line x1="80" y1="${sealY + 262}" x2="435" y2="${sealY + 262}" stroke="${d.gold}" stroke-width="0.5" stroke-opacity="0.35"/>
<polygon points="500,${sealY + 255} 506,${sealY + 262} 500,${sealY + 269} 494,${sealY + 262}" fill="${d.gold}" fill-opacity="0.7"/>
<line x1="565" y1="${sealY + 262}" x2="920" y2="${sealY + 262}" stroke="${d.gold}" stroke-width="0.5" stroke-opacity="0.35"/>

<!-- Serial number — monospace, micro-etched style -->
<text x="500" y="${sealY + 302}"
  font-family="'Courier New', Courier, monospace"
  font-size="14" fill="${d.gold}" fill-opacity="0.9"
  text-anchor="middle" letter-spacing="4">${sf}</text>

<!-- Origin -->
<text x="500" y="${sealY + 325}"
  font-family="Georgia, serif" font-size="9"
  fill="${d.gold}" fill-opacity="0.4"
  text-anchor="middle" letter-spacing="3">${orig.toUpperCase()}</text>

<!-- Ownership cycle + price row -->
<text x="160" y="${sealY + 355}"
  font-family="Georgia, serif" font-size="9"
  fill="#555550" text-anchor="middle" letter-spacing="2">CYCLE · ${ownershipCycle.toString().padStart(3, '0')}</text>

<text x="500" y="${sealY + 355}"
  font-family="Georgia, serif" font-size="9"
  fill="${d.gold}" fill-opacity="0.5"
  text-anchor="middle" letter-spacing="2">SOVEREIGN ASSET · POLYGON MAINNET</text>

<text x="840" y="${sealY + 355}"
  font-family="Georgia, serif" font-size="9"
  fill="#555550" text-anchor="middle" letter-spacing="2">ERC-721</text>

<!-- ░░░ BOTTOM SECTION ░░░ -->
<!-- Bottom horizontal rule -->
<rect x="80" y="${sealY + 370}" width="840" height="0.5" fill="url(#hFade)" opacity="0.3"/>

<!-- Authenticity stamp row -->
<text x="500" y="${sealY + 400}"
  font-family="Georgia, 'Times New Roman', serif"
  font-size="16" fill="${d.gold}" fill-opacity="0.65"
  text-anchor="middle" letter-spacing="9">SHAMIM FOREVER</text>

<text x="500" y="${sealY + 418}"
  font-family="Georgia, serif" font-size="7.5"
  fill="${d.gold}" fill-opacity="0.28"
  text-anchor="middle" letter-spacing="4">SOVEREIGN LUXURY DIGITAL ARCHIVE — AUTHENTIC GENESIS MASTERPIECE</text>

<!-- Corner watermarks -->
<text x="72" y="${sealY + 430}"
  font-family="Georgia, serif" font-size="7"
  fill="${d.gold}" fill-opacity="0.2" letter-spacing="1">✦</text>
<text x="928" y="${sealY + 430}"
  font-family="Georgia, serif" font-size="7"
  fill="${d.gold}" fill-opacity="0.2" text-anchor="end" letter-spacing="1">✦</text>

</svg>`
}

// Collection banner (1400x400)
export function generateCollectionBannerSVG(): string {
  const d = getDesign('ELITE')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 400" width="1400" height="400">
<defs>
  <linearGradient id="bb" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#030303"/><stop offset="50%" stop-color="#0d0a04"/><stop offset="100%" stop-color="#030303"/>
  </linearGradient>
  <radialGradient id="cg" cx="50%" cy="50%" r="40%">
    <stop offset="0%" stop-color="#c9a054" stop-opacity="0.09"/>
    <stop offset="100%" stop-color="#c9a054" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gl" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#c9a054" stop-opacity="0"/>
    <stop offset="20%" stop-color="#c9a054" stop-opacity="0.7"/>
    <stop offset="50%" stop-color="#e8c87a"/>
    <stop offset="80%" stop-color="#c9a054" stop-opacity="0.7"/>
    <stop offset="100%" stop-color="#c9a054" stop-opacity="0"/>
  </linearGradient>
  <pattern id="bp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
    <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#c9a054" stroke-width="0.3" stroke-opacity="0.06"/>
  </pattern>
</defs>
<rect width="1400" height="400" fill="url(#bb)"/>
<rect width="1400" height="400" fill="url(#bp)"/>
<rect width="1400" height="400" fill="url(#cg)"/>
<rect x="0" y="20" width="1400" height="1" fill="url(#gl)" opacity="0.7"/>
<rect x="0" y="380" width="1400" height="1" fill="url(#gl)" opacity="0.7"/>
<rect x="0" y="24" width="1400" height="0.4" fill="url(#gl)" opacity="0.3"/>
<rect x="0" y="376" width="1400" height="0.4" fill="url(#gl)" opacity="0.3"/>
<rect x="60" y="40" width="1" height="320" fill="#c9a054" fill-opacity="0.15"/>
<rect x="1339" y="40" width="1" height="320" fill="#c9a054" fill-opacity="0.15"/>
<text x="700" y="145" font-family="Georgia,'Times New Roman',serif" font-size="11" fill="#c9a054" fill-opacity="0.5" text-anchor="middle" letter-spacing="8">THE HOUSE OF</text>
<text x="700" y="232" font-family="Georgia,'Times New Roman',serif" font-size="78" fill="#c9a054" text-anchor="middle" letter-spacing="14" font-weight="400">SHAMIM FOREVER</text>
<rect x="280" y="248" width="320" height="0.5" fill="url(#gl)" opacity="0.5"/>
<polygon points="700,242 705,248 700,254 695,248" fill="#c9a054" fill-opacity="0.6"/>
<rect x="800" y="248" width="320" height="0.5" fill="url(#gl)" opacity="0.5"/>
<text x="700" y="290" font-family="Georgia,serif" font-size="13" fill="#888880" text-anchor="middle" letter-spacing="8">SOVEREIGN LUXURY DIGITAL ARCHIVE</text>
<text x="700" y="350" font-family="Georgia,serif" font-size="9.5" fill="#555550" text-anchor="middle" letter-spacing="4">POLYGON MAINNET · ERC-721 · IPFS PROVENANCE · KARACHI SOVEREIGN ATELIER</text>
</svg>`
}

// Collection logo (350x350)
export function generateCollectionLogoSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" width="350" height="350">
<defs>
  <radialGradient id="lb" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#1a1408"/><stop offset="100%" stop-color="#050505"/></radialGradient>
  <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e8c87a"/><stop offset="50%" stop-color="#c9a054"/><stop offset="100%" stop-color="#8a6830"/></linearGradient>
</defs>
<rect width="350" height="350" fill="url(#lb)"/>
<circle cx="175" cy="175" r="162" fill="none" stroke="#c9a054" stroke-width="1.5" stroke-opacity="0.8"/>
<circle cx="175" cy="175" r="154" fill="none" stroke="#c9a054" stroke-width="0.4" stroke-opacity="0.3"/>
<circle cx="175" cy="175" r="138" fill="none" stroke="#c9a054" stroke-width="0.6" stroke-opacity="0.5"/>
${Array.from({length: 8}, (_, i) => {
  const a = (i * 45) * Math.PI / 180
  const x1 = 175 + Math.cos(a) * 55, y1 = 175 + Math.sin(a) * 55
  const x2 = 175 + Math.cos(a) * 130, y2 = 175 + Math.sin(a) * 130
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#c9a054" stroke-width="0.8" stroke-opacity="0.5"/>`
}).join('')}
<polygon points="175,120 223,175 175,230 127,175" fill="#c9a054" fill-opacity="0.12" stroke="#c9a054" stroke-width="1.2" stroke-opacity="0.8"/>
<polygon points="175,142 203,175 175,208 147,175" fill="#c9a054" fill-opacity="0.35" stroke="#c9a054" stroke-width="0.8"/>
<polygon points="175,158 191,175 175,192 159,175" fill="url(#lg)"/>
<circle cx="175" cy="175" r="5" fill="#e8c87a"/>
<text x="175" y="270" font-family="Georgia,serif" font-size="11" fill="#c9a054" fill-opacity="0.7" text-anchor="middle" letter-spacing="5">SF</text>
<text x="175" y="284" font-family="Georgia,serif" font-size="6.5" fill="#c9a054" fill-opacity="0.35" text-anchor="middle" letter-spacing="2">SOVEREIGN</text>
</svg>`
}
