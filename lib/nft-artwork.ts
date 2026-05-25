/**
 * SHAMIM FOREVER — Ultra-Luxury NFT Artwork Generator v2
 * Product-specific visual identity for $50K–$1M NFTs
 */

export interface ArtworkParams {
  serial: string
  rarityTier: string
  productName?: string
  ownershipCycle?: number
  price?: string
  origin?: string
  tokenId?: number
}

// Complete product data (no external deps)
const PRODUCT_DATA: Record<string, { name: string; price: string; origin: string; material: string; notes: string; edition: string; tokenId: number }> = {
  'SF-IK-2026-00001': { name: 'Sacred Incense of Kyoto', price: '$85,000', origin: 'Kyoto, Japan', material: 'Agarwood & Hinoki', notes: 'Japanese Oud · Hinoki Wood · Sacred Benzoin', edition: 'Imperial Registry — 1 of 3', tokenId: 0 },
  'SF-BL-2026-00002': { name: 'Sapphire Blue Levant', price: '$65,000', origin: 'Damascus, Syria', material: 'Taif Rose & Sandalwood', notes: 'Taif Rose · Sea Salt · Aged Sandalwood', edition: 'Royal Archive — 1 of 5', tokenId: 1 },
  'SF-VA-2026-00003': { name: 'SF Vanilla Absolute', price: '$120,000', origin: 'Tahiti & Madagascar', material: 'Vanilla Absolute & Ambergris', notes: 'Tahitian Vanilla · White Ambergris · Musk', edition: 'Founders Archive — 1 of 2', tokenId: 2 },
  'SF-MI-2026-00004': { name: 'Midnight Iris Royale', price: '$250,000', origin: 'Florence, Italy', material: '12yr Iris Concrete & Civet', notes: 'Florentine Iris · Aged Patchouli · Civet', edition: 'Absolute Unique — 1 of 1', tokenId: 3 },
  'SF-SG-2026-00005': { name: "Shamim's Ghost", price: '$150,000', origin: 'Karachi, Pakistan', material: 'Black Oud & Kashmiri Saffron', notes: 'Black Oud · Kashmiri Saffron · Grasse Rose', edition: 'Founders Legacy — 1 of 2', tokenId: 4 },
  'SF-RN-2026-00006': { name: 'Sovereign Rose Noir', price: '$55,000', origin: 'Istanbul, Turkey', material: 'Rose de Mai & Oud Smoke', notes: 'Turkish Rose · Oud Smoke · Dark Vetiver', edition: 'Elite Selection — 1 of 7', tokenId: 5 },
  'SF-OC-2026-00007': { name: 'The Orakzai Crest Amber', price: '$500,000', origin: 'Orakzai, Pakistan', material: 'Baltic Amber & 60yr Mysore Sandalwood', notes: 'Baltic Amber · Ancient Oud · Sacred Resin', edition: 'Absolute Unique — 1 of 1', tokenId: 6 },
  'SF-MO-2026-00008': { name: 'Majestic Oud Supreme', price: '$95,000', origin: 'Phnom Penh, Cambodia', material: '25yr Wild Oud & Frankincense', notes: '25yr Wild Oud · Frankincense · Dark Amber', edition: 'Imperial Registry — 1 of 3', tokenId: 7 },
  'SF-CM-2026-00009': { name: 'Celestial Musk Signet', price: '$75,000', origin: 'Kannauj, India', material: 'White Musk & Himalayan Cedar', notes: 'White Indian Musk · Ambrette · Cedar', edition: 'Royal Archive — 1 of 5', tokenId: 8 },
  'SF-IO-2026-00010': { name: 'Sovereign Infinite Oud', price: '$1,000,000', origin: 'Assam, India — 1963', material: '60yr Assam Oud & 1985 Grasse Rose', notes: '1963 Assam Oud · 1985 Rose Absolute · Civet', edition: 'Absolute Unique — 1 of 1', tokenId: 9 },
}

const TIER: Record<string, { bg1: string; bg2: string; bg3: string; g1: string; g2: string; g3: string; acc: string; label: string }> = {
  ELITE:       { bg1: '#0a0802', bg2: '#1a1408', bg3: '#050401', g1: '#e8c87a', g2: '#c9a054', g3: '#8a6830', acc: '#d4b060', label: 'ELITE ATELIER' },
  ROYAL:       { bg1: '#010418', bg2: '#060c28', bg3: '#010210', g1: '#b8d4ff', g2: '#7a9fcf', g3: '#3a5a8f', acc: '#c9a054', label: 'ROYAL HERITAGE' },
  IMPERIAL:    { bg1: '#0d0600', bg2: '#1e0e00', bg3: '#080300', g1: '#ffcc44', g2: '#d4900a', g3: '#8a5800', acc: '#ff9a00', label: 'IMPERIAL REGISTRY' },
  FOUNDERS:    { bg1: '#080008', bg2: '#140818', bg3: '#040004', g1: '#e8a0c0', g2: '#c06080', g3: '#783050', acc: '#c9a054', label: 'FOUNDERS RESERVE' },
  'ONE-OF-ONE':{ bg1: '#040404', bg2: '#0a0a08', bg3: '#020202', g1: '#ffffff', g2: '#d8d8d0', g3: '#909088', acc: '#c9a054', label: '◆ ONE OF ONE ◆' },
  COMMON:      { bg1: '#0a0c0a', bg2: '#141814', bg3: '#050705', g1: '#b0c0b0', g2: '#809080', g3: '#506050', acc: '#a0b090', label: 'STANDARD EDITION' },
}

function getTier(t: string) { return TIER[t.toUpperCase()] || TIER.ELITE }

function bottleSVG(tier: string, d: ReturnType<typeof getTier>): string {
  // Draw a stylized luxury perfume bottle shape unique per tier
  const bx = 500, by = 340

  if (tier === 'ONE-OF-ONE') {
    // Venetian glass — slender tall bottle with hand-blown look
    return `
      <g transform="translate(${bx},${by})">
        <ellipse cx="0" cy="-130" rx="36" ry="150" fill="url(#bottleGrad)" opacity="0.85"/>
        <ellipse cx="0" cy="-130" rx="36" ry="150" fill="none" stroke="${d.g1}" stroke-width="0.8" opacity="0.6"/>
        <ellipse cx="0" cy="-260" rx="10" ry="22" fill="url(#bottleGrad)" opacity="0.8"/>
        <rect x="-6" y="-292" width="12" height="20" rx="3" fill="${d.g2}" opacity="0.9"/>
        <ellipse cx="0" cy="-278" rx="7" ry="5" fill="${d.g1}" opacity="0.7"/>
        <ellipse cx="0" cy="-100" rx="22" ry="8" fill="${d.g1}" fill-opacity="0.08"/>
        <ellipse cx="-12" cy="-160" rx="8" ry="30" fill="${d.g1}" fill-opacity="0.12" transform="rotate(-15,-12,-160)"/>
        <text x="0" y="-120" font-family="Georgia,serif" font-size="7" fill="${d.g1}" fill-opacity="0.5" text-anchor="middle" letter-spacing="2">SF</text>
      </g>`
  }

  if (tier === 'IMPERIAL') {
    // Broad imperial bottle with crown stopper
    return `
      <g transform="translate(${bx},${by})">
        <rect x="-52" y="-230" width="104" height="210" rx="8" fill="url(#bottleGrad)" opacity="0.9"/>
        <rect x="-52" y="-230" width="104" height="210" rx="8" fill="none" stroke="${d.g1}" stroke-width="1" opacity="0.7"/>
        <rect x="-28" y="-260" width="56" height="36" rx="4" fill="url(#bottleGrad)" opacity="0.85"/>
        <rect x="-10" y="-280" width="20" height="26" rx="3" fill="${d.g2}"/>
        <polygon points="0,-298 -8,-278 -4,-278 0,-268 4,-278 8,-278" fill="${d.g1}"/>
        <rect x="-44" y="-220" width="88" height="2" fill="${d.g1}" fill-opacity="0.4"/>
        <rect x="-44" y="-90" width="88" height="2" fill="${d.g1}" fill-opacity="0.3"/>
        <ellipse cx="-18" cy="-155" rx="12" ry="40" fill="${d.g1}" fill-opacity="0.08" transform="rotate(-10,-18,-155)"/>
        <text x="0" y="-150" font-family="Georgia,serif" font-size="8" fill="${d.g1}" fill-opacity="0.5" text-anchor="middle" letter-spacing="2">SF</text>
      </g>`
  }

  if (tier === 'ROYAL') {
    // Sapphire hexagonal bottle
    return `
      <g transform="translate(${bx},${by})">
        <polygon points="0,-230 50,-200 50,-30 0,-0 -50,-30 -50,-200" fill="url(#bottleGrad)" opacity="0.88"/>
        <polygon points="0,-230 50,-200 50,-30 0,-0 -50,-30 -50,-200" fill="none" stroke="${d.g1}" stroke-width="0.8" opacity="0.7"/>
        <polygon points="0,-260 22,-248 22,-232 0,-220 -22,-232 -22,-248" fill="url(#bottleGrad)" opacity="0.9"/>
        <rect x="-8" y="-286" width="16" height="28" rx="3" fill="${d.g2}"/>
        <polygon points="0,-302 -8,-282 8,-282" fill="${d.g1}"/>
        <line x1="-50" y1="-100" x2="50" y2="-100" stroke="${d.g1}" stroke-width="0.6" opacity="0.35"/>
        <ellipse cx="-16" cy="-155" rx="10" ry="35" fill="${d.g1}" fill-opacity="0.1" transform="rotate(-8,-16,-155)"/>
        <text x="0" y="-148" font-family="Georgia,serif" font-size="7" fill="${d.g1}" fill-opacity="0.5" text-anchor="middle" letter-spacing="2">SF</text>
      </g>`
  }

  if (tier === 'FOUNDERS') {
    // Obsidian oval bottle
    return `
      <g transform="translate(${bx},${by})">
        <ellipse cx="0" cy="-115" rx="58" ry="125" fill="url(#bottleGrad)" opacity="0.9"/>
        <ellipse cx="0" cy="-115" rx="58" ry="125" fill="none" stroke="${d.g1}" stroke-width="0.8" opacity="0.6"/>
        <ellipse cx="0" cy="-250" rx="16" ry="24" fill="url(#bottleGrad)" opacity="0.85"/>
        <rect x="-9" y="-282" width="18" height="22" rx="4" fill="${d.g2}"/>
        <ellipse cx="0" cy="-292" rx="10" ry="7" fill="${d.g1}" opacity="0.8"/>
        <ellipse cx="-20" cy="-130" rx="14" ry="45" fill="${d.g1}" fill-opacity="0.09" transform="rotate(-12,-20,-130)"/>
        <text x="0" y="-108" font-family="Georgia,serif" font-size="8" fill="${d.g1}" fill-opacity="0.5" text-anchor="middle" letter-spacing="2">SF</text>
      </g>`
  }

  // Default (ELITE / COMMON) — classic rectangular flacon
  return `
    <g transform="translate(${bx},${by})">
      <rect x="-46" y="-218" width="92" height="198" rx="6" fill="url(#bottleGrad)" opacity="0.88"/>
      <rect x="-46" y="-218" width="92" height="198" rx="6" fill="none" stroke="${d.g1}" stroke-width="0.8" opacity="0.65"/>
      <rect x="-24" y="-248" width="48" height="35" rx="4" fill="url(#bottleGrad)" opacity="0.85"/>
      <rect x="-8" y="-272" width="16" height="26" rx="3" fill="${d.g2}"/>
      <rect x="-12" y="-280" width="24" height="10" rx="2" fill="${d.g1}" opacity="0.8"/>
      <rect x="-38" y="-188" width="76" height="1" fill="${d.g1}" fill-opacity="0.35"/>
      <rect x="-38" y="-60" width="76" height="1" fill="${d.g1}" fill-opacity="0.25"/>
      <ellipse cx="-16" cy="-140" rx="11" ry="38" fill="${d.g1}" fill-opacity="0.1" transform="rotate(-10,-16,-140)"/>
      <text x="0" y="-132" font-family="Georgia,serif" font-size="7.5" fill="${d.g1}" fill-opacity="0.5" text-anchor="middle" letter-spacing="2">SF</text>
    </g>`
}

export function generateSovereignSVG(params: ArtworkParams): string {
  const { serial } = params
  const s = serial.toUpperCase().replace(/\.svg$/i, '')
  const pd = PRODUCT_DATA[s]
  const tier = (params.rarityTier || pd?.tokenId !== undefined ? (
    s.includes('00004') || s.includes('00007') || s.includes('00010') ? 'ONE-OF-ONE' :
    s.includes('00001') || s.includes('00008') ? 'IMPERIAL' :
    s.includes('00002') || s.includes('00009') ? 'ROYAL' :
    s.includes('00003') || s.includes('00005') ? 'FOUNDERS' : 'ELITE'
  ) : params.rarityTier || 'ELITE').toUpperCase()
  const d = getTier(tier)
  const name = pd?.name || params.productName || 'Sovereign Asset'
  const price = pd?.price || params.price || '$50,000+'
  const origin = pd?.origin || params.origin || 'Karachi Sovereign Atelier'
  const material = pd?.material || 'Luxury Accord'
  const notes = pd?.notes || ''
  const edition = pd?.edition || '—'
  const tokenId = pd?.tokenId ?? 0

  const nameParts = name.length > 20 ? [name.slice(0, name.lastIndexOf(' ', 20)), name.slice(name.lastIndexOf(' ', 20) + 1)] : [name]

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
<defs>
  <radialGradient id="bgG" cx="50%" cy="30%" r="75%">
    <stop offset="0%" stop-color="${d.bg2}"/>
    <stop offset="60%" stop-color="${d.bg1}"/>
    <stop offset="100%" stop-color="${d.bg3}"/>
  </radialGradient>
  <radialGradient id="spotG" cx="50%" cy="30%" r="40%">
    <stop offset="0%" stop-color="${d.g2}" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="${d.g2}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="bottleGrad" cx="35%" cy="25%" r="70%">
    <stop offset="0%" stop-color="${d.g1}" stop-opacity="0.22"/>
    <stop offset="40%" stop-color="${d.g2}" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="${d.g3}" stop-opacity="0.35"/>
  </radialGradient>
  <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${d.g2}" stop-opacity="0.35"/>
    <stop offset="100%" stop-color="${d.g2}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="hLine" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${d.g2}" stop-opacity="0"/>
    <stop offset="20%" stop-color="${d.g2}" stop-opacity="0.7"/>
    <stop offset="50%" stop-color="${d.g1}"/>
    <stop offset="80%" stop-color="${d.g2}" stop-opacity="0.7"/>
    <stop offset="100%" stop-color="${d.g2}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="vLine" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${d.g2}" stop-opacity="0"/>
    <stop offset="30%" stop-color="${d.g2}" stop-opacity="0.5"/>
    <stop offset="70%" stop-color="${d.g2}" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="${d.g2}" stop-opacity="0"/>
  </linearGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="softGlow"><feGaussianBlur stdDeviation="18" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
  <filter id="bottleGlow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="textGlow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <pattern id="bgPat" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
    <circle cx="25" cy="25" r="0.4" fill="${d.g2}" fill-opacity="0.12"/>
  </pattern>
</defs>

<!-- BASE -->
<rect width="1000" height="1000" fill="url(#bgG)"/>
<rect width="1000" height="1000" fill="url(#bgPat)"/>
<rect width="1000" height="1000" fill="url(#spotG)"/>

<!-- OUTER BORDER SYSTEM -->
<rect x="12" y="12" width="976" height="976" rx="2" fill="none" stroke="${d.g2}" stroke-width="0.3" stroke-opacity="0.25"/>
<rect x="18" y="18" width="964" height="964" rx="1" fill="none" stroke="${d.g2}" stroke-width="1.6" stroke-opacity="0.85"/>
<rect x="23" y="23" width="954" height="954" rx="1" fill="none" stroke="${d.g2}" stroke-width="0.4" stroke-opacity="0.2"/>
<rect x="44" y="44" width="912" height="912" rx="1" fill="none" stroke="${d.g2}" stroke-width="0.25" stroke-opacity="0.12"/>

<!-- CORNER MARKS -->
${[[18,18,1,1],[982,18,-1,1],[18,982,1,-1],[982,982,-1,-1]].map(([cx,cy,sx,sy]) => `
<g transform="translate(${cx},${cy})">
  <line x1="0" y1="0" x2="${sx*40}" y2="0" stroke="${d.g1}" stroke-width="1.8" stroke-opacity="0.9"/>
  <line x1="0" y1="0" x2="0" y2="${sy*40}" stroke="${d.g1}" stroke-width="1.8" stroke-opacity="0.9"/>
  <circle cx="${sx*5}" cy="${sy*5}" r="2.5" fill="${d.g1}" fill-opacity="0.8"/>
</g>`).join('')}

<!-- SIDE RULES -->
<rect x="18" y="220" width="1.5" height="560" fill="url(#vLine)"/>
<rect x="980.5" y="220" width="1.5" height="560" fill="url(#vLine)"/>

<!-- HEADER -->
<text x="500" y="66" font-family="Georgia,'Times New Roman',serif" font-size="9" fill="${d.g2}" fill-opacity="0.55" letter-spacing="8" text-anchor="middle">THE HOUSE OF SHAMIM FOREVER</text>
<rect x="70" y="75" width="860" height="0.5" fill="url(#hLine)" opacity="0.45"/>

<!-- TIER BADGE -->
<rect x="370" y="85" width="260" height="32" rx="1" fill="${d.g2}" fill-opacity="0.06" stroke="${d.g2}" stroke-width="0.8" stroke-opacity="0.55"/>
<text x="500" y="106" font-family="Georgia,serif" font-size="11" fill="${d.g1}" text-anchor="middle" letter-spacing="5.5" filter="url(#textGlow)">${d.label}</text>

<!-- TOKEN ID — top right -->
<text x="938" y="70" font-family="'Courier New',monospace" font-size="10" fill="${d.g2}" fill-opacity="0.4" text-anchor="end" letter-spacing="2">TOKEN #${tokenId}</text>

<!-- BOTTLE GLOW HALO -->
<ellipse cx="500" cy="345" rx="120" ry="130" fill="url(#glowG)" filter="url(#softGlow)"/>

<!-- PERFUME BOTTLE — center art -->
<g filter="url(#bottleGlow)">
${bottleSVG(tier, d)}
</g>

<!-- SHADOW under bottle -->
<ellipse cx="500" cy="26" rx="60" ry="8" fill="${d.g2}" fill-opacity="0.18" transform="translate(0,368)"/>

<!-- DIVIDER after bottle -->
<rect x="70" y="540" width="860" height="0.5" fill="url(#hLine)" opacity="0.4"/>

<!-- ── PRODUCT DETAILS ── -->
<!-- Product name — large serif -->
${nameParts.length > 1
  ? `<text x="500" y="586" font-family="Georgia,'Times New Roman',serif" font-size="26" fill="#f0ece0" fill-opacity="0.97" text-anchor="middle" letter-spacing="1" font-weight="400" filter="url(#textGlow)">${nameParts[0]}</text>
     <text x="500" y="618" font-family="Georgia,'Times New Roman',serif" font-size="26" fill="#f0ece0" fill-opacity="0.97" text-anchor="middle" letter-spacing="1" font-weight="400" filter="url(#textGlow)">${nameParts[1]}</text>`
  : `<text x="500" y="602" font-family="Georgia,'Times New Roman',serif" font-size="${name.length > 18 ? 24 : 30}" fill="#f0ece0" fill-opacity="0.97" text-anchor="middle" letter-spacing="1" font-weight="400" filter="url(#textGlow)">${name}</text>`
}

<!-- Diamond divider -->
<line x1="70" y1="638" x2="440" y2="638" stroke="${d.g2}" stroke-width="0.5" stroke-opacity="0.3"/>
<polygon points="500,631 508,638 500,645 492,638" fill="${d.g2}" fill-opacity="0.65"/>
<line x1="560" y1="638" x2="930" y2="638" stroke="${d.g2}" stroke-width="0.5" stroke-opacity="0.3"/>

<!-- PRICE — prominent -->
<text x="500" y="678" font-family="Georgia,'Times New Roman',serif" font-size="20" fill="${d.g1}" text-anchor="middle" letter-spacing="3" filter="url(#glow)">${price}</text>
<text x="500" y="695" font-family="Georgia,serif" font-size="8" fill="${d.g2}" fill-opacity="0.4" text-anchor="middle" letter-spacing="3">APPRAISED VALUE</text>

<!-- DETAIL ROW 1 -->
<rect x="60" y="712" width="880" height="0.4" fill="url(#hLine)" opacity="0.2"/>
<text x="175" y="736" font-family="Georgia,serif" font-size="9" fill="${d.g2}" fill-opacity="0.6" text-anchor="middle" letter-spacing="1.5">ORIGIN</text>
<text x="175" y="754" font-family="Georgia,'Times New Roman',serif" font-size="10.5" fill="${d.g1}" fill-opacity="0.85" text-anchor="middle" letter-spacing="1">${origin}</text>
<line x1="330" y1="718" x2="330" y2="758" stroke="${d.g2}" stroke-width="0.4" stroke-opacity="0.2"/>
<text x="500" y="736" font-family="Georgia,serif" font-size="9" fill="${d.g2}" fill-opacity="0.6" text-anchor="middle" letter-spacing="1.5">MATERIAL</text>
<text x="500" y="754" font-family="Georgia,'Times New Roman',serif" font-size="10.5" fill="${d.g1}" fill-opacity="0.85" text-anchor="middle" letter-spacing="1">${material}</text>
<line x1="670" y1="718" x2="670" y2="758" stroke="${d.g2}" stroke-width="0.4" stroke-opacity="0.2"/>
<text x="825" y="736" font-family="Georgia,serif" font-size="9" fill="${d.g2}" fill-opacity="0.6" text-anchor="middle" letter-spacing="1.5">EDITION</text>
<text x="825" y="754" font-family="Georgia,'Times New Roman',serif" font-size="10.5" fill="${d.g1}" fill-opacity="0.85" text-anchor="middle" letter-spacing="1">${edition}</text>
<rect x="60" y="766" width="880" height="0.4" fill="url(#hLine)" opacity="0.2"/>

<!-- DETAIL ROW 2 — Notes + Serial -->
<text x="500" y="790" font-family="Georgia,serif" font-size="8.5" fill="${d.g2}" fill-opacity="0.45" text-anchor="middle" letter-spacing="2">FRAGRANCE NOTES — ${notes}</text>
<text x="500" y="812" font-family="'Courier New',Courier,monospace" font-size="13" fill="${d.g2}" fill-opacity="0.8" text-anchor="middle" letter-spacing="4">${s}</text>

<!-- BOTTOM DIVIDER -->
<rect x="70" y="828" width="860" height="0.5" fill="url(#hLine)" opacity="0.3"/>

<!-- BLOCKCHAIN ROW -->
<text x="175" y="852" font-family="Georgia,serif" font-size="7.5" fill="${d.g2}" fill-opacity="0.35" text-anchor="middle" letter-spacing="2">POLYGON MAINNET</text>
<text x="500" y="852" font-family="Georgia,'Times New Roman',serif" font-size="13" fill="${d.g2}" fill-opacity="0.55" text-anchor="middle" letter-spacing="7">SHAMIM FOREVER</text>
<text x="825" y="852" font-family="Georgia,serif" font-size="7.5" fill="${d.g2}" fill-opacity="0.35" text-anchor="middle" letter-spacing="2">ERC-721</text>

<!-- BOTTOM -->
<rect x="70" y="862" width="860" height="0.4" fill="url(#hLine)" opacity="0.2"/>
<text x="500" y="884" font-family="Georgia,serif" font-size="7" fill="${d.g2}" fill-opacity="0.2" text-anchor="middle" letter-spacing="3">SOVEREIGN LUXURY DIGITAL ARCHIVE — AUTHENTIC GENESIS MASTERPIECE — ${new Date().getFullYear()}</text>

</svg>`
}

export function generateCollectionBannerSVG(): string { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 400"><rect width="1400" height="400" fill="#050505"/><text x="700" y="210" font-family="Georgia,serif" font-size="60" fill="#c9a054" text-anchor="middle" letter-spacing="12">SHAMIM FOREVER</text></svg>' }
export function generateCollectionLogoSVG(): string { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350"><rect width="350" height="350" fill="#050505"/><text x="175" y="185" font-family="Georgia,serif" font-size="40" fill="#c9a054" text-anchor="middle">SF</text></svg>' }
