// Cinematic luxury NFT artwork generator — pure SVG, no external dependencies

export interface ArtworkParams {
  serial: string
  rarityTier: string
  productName?: string
  ownershipCycle?: number
}

const RARITY_COLORS: Record<string, { primary: string; accent: string; label: string }> = {
  COMMON:       { primary: '#8a9a8a', accent: '#b0c4b0', label: 'COMMON' },
  ELITE:        { primary: '#c9a054', accent: '#e8c87a', label: 'ELITE' },
  ROYAL:        { primary: '#a0b8e0', accent: '#c8dcf8', label: 'ROYAL' },
  IMPERIAL:     { primary: '#d4af6a', accent: '#f0d090', label: 'IMPERIAL' },
  FOUNDERS:     { primary: '#e8c87a', accent: '#ffd700', label: 'FOUNDERS' },
  'ONE-OF-ONE': { primary: '#ff8c42', accent: '#ffa860', label: 'ONE-OF-ONE' },
}

export function generateSovereignSVG(params: ArtworkParams): string {
  const { serial, rarityTier, productName = 'Sovereign Asset', ownershipCycle = 1 } = params
  const colors = RARITY_COLORS[rarityTier] || RARITY_COLORS['ELITE']
  const gold = colors.primary
  const goldLight = colors.accent

  // Sanitize for SVG
  const cleanSerial = serial.replace(/[<>&"]/g, '')
  const cleanName = productName.replace(/[<>&"]/g, '').slice(0, 28)
  const cleanRarity = rarityTier.replace(/[<>&"]/g, '')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#1a1408"/>
      <stop offset="40%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${gold}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${gold}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gold}"/>
      <stop offset="30%" stop-color="${goldLight}"/>
      <stop offset="70%" stop-color="${gold}"/>
      <stop offset="100%" stop-color="#8a6830"/>
    </linearGradient>
    <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${goldLight}"/>
      <stop offset="50%" stop-color="${gold}"/>
      <stop offset="100%" stop-color="#8a6830"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#888880"/>
      <stop offset="50%" stop-color="${gold}"/>
      <stop offset="100%" stop-color="#888880"/>
    </linearGradient>
    <filter id="glow-filter">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${gold}" flood-opacity="0.3"/>
    </filter>
    <filter id="subtle-glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1000" height="1000" fill="url(#bg)"/>
  <rect width="1000" height="1000" fill="url(#glow)"/>

  <!-- Outer border — double line luxury frame -->
  <rect x="20" y="20" width="960" height="960" rx="4" fill="none" stroke="${gold}" stroke-width="0.5" stroke-opacity="0.4"/>
  <rect x="26" y="26" width="948" height="948" rx="3" fill="none" stroke="${gold}" stroke-width="1.5" stroke-opacity="0.8"/>
  <rect x="32" y="32" width="936" height="936" rx="2" fill="none" stroke="${gold}" stroke-width="0.4" stroke-opacity="0.3"/>

  <!-- Corner ornaments -->
  ${['30,30', '970,30', '30,970', '970,970'].map((pos, i) => {
    const [cx, cy] = pos.split(',').map(Number)
    const flip = [(1,1),(−1,1),(1,−1),(−1,−1)][i] || [1,1]
    return `<g transform="translate(${cx},${cy})">
      <line x1="0" y1="0" x2="${i < 2 ? 24 : -24}" y2="0" stroke="${gold}" stroke-width="1.5" stroke-opacity="0.9"/>
      <line x1="0" y1="0" x2="0" y2="${i % 2 === 0 && i < 2 ? 24 : i >= 2 ? -24 : 24}" stroke="${gold}" stroke-width="1.5" stroke-opacity="0.9"/>
      <circle cx="0" cy="0" r="2.5" fill="${gold}" fill-opacity="0.7"/>
    </g>`
  }).join('')}

  <!-- Top house mark -->
  <text x="500" y="75" 
    font-family="Georgia, 'Times New Roman', serif" 
    font-size="10" 
    fill="${gold}" 
    fill-opacity="0.6"
    letter-spacing="6"
    text-anchor="middle"
    font-weight="400">THE HOUSE OF SHAMIM FOREVER</text>

  <!-- Decorative top line -->
  <line x1="120" y1="85" x2="380" y2="85" stroke="${gold}" stroke-width="0.5" stroke-opacity="0.4"/>
  <line x1="620" y1="85" x2="880" y2="85" stroke="${gold}" stroke-width="0.5" stroke-opacity="0.4"/>
  <circle cx="500" cy="85" r="2" fill="${gold}" fill-opacity="0.5"/>

  <!-- Sovereign Seal — center emblem -->
  <g transform="translate(500,380)" filter="url(#shadow)">
    <!-- Outer ring -->
    <circle cx="0" cy="0" r="180" fill="none" stroke="url(#sealGrad)" stroke-width="1" stroke-opacity="0.5"/>
    <circle cx="0" cy="0" r="172" fill="none" stroke="${gold}" stroke-width="0.5" stroke-opacity="0.3"/>
    <!-- Inner ring -->
    <circle cx="0" cy="0" r="148" fill="none" stroke="url(#sealGrad)" stroke-width="1.5" stroke-opacity="0.7"/>
    <circle cx="0" cy="0" r="140" fill="${gold}" fill-opacity="0.04"/>
    
    <!-- 8-point star emblem -->
    <g filter="url(#glow-filter)">
      <!-- Star points -->
      ${Array.from({length: 8}, (_, i) => {
        const angle = (i * 45) * Math.PI / 180
        const x1 = Math.cos(angle) * 40
        const y1 = Math.sin(angle) * 40
        const x2 = Math.cos(angle) * 120
        const y2 = Math.sin(angle) * 120
        const midAngle1 = ((i * 45 + 22.5) * Math.PI / 180)
        const mx1 = Math.cos(midAngle1) * 65
        const my1 = Math.sin(midAngle1) * 65
        return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${mx1.toFixed(1)},${my1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" 
          fill="none" stroke="${gold}" stroke-width="1" stroke-opacity="0.6"/>`
      }).join('')}
      <!-- Central diamond -->
      <polygon points="0,-45 32,0 0,45 -32,0" fill="${gold}" fill-opacity="0.15" stroke="${gold}" stroke-width="1" stroke-opacity="0.8"/>
      <polygon points="0,-28 20,0 0,28 -20,0" fill="${gold}" fill-opacity="0.3"/>
      <polygon points="0,-14 10,0 0,14 -10,0" fill="${gold}" fill-opacity="0.9"/>
    </g>

    <!-- SF Monogram -->
    <text x="0" y="-8"
      font-family="Georgia, 'Times New Roman', serif"
      font-size="32"
      fill="${gold}"
      text-anchor="middle"
      letter-spacing="4"
      font-weight="400">SF</text>
    <text x="0" y="16"
      font-family="Georgia, 'Times New Roman', serif"
      font-size="8"
      fill="${gold}"
      fill-opacity="0.6"
      text-anchor="middle"
      letter-spacing="3">SOVEREIGN</text>

    <!-- Circular text path -->
    <defs>
      <path id="circle-top" d="M -155,0 A 155,155 0 0,1 155,0"/>
      <path id="circle-bottom" d="M -155,0 A 155,155 0 0,0 155,0"/>
    </defs>
    <text font-family="Georgia, serif" font-size="9" fill="${gold}" fill-opacity="0.5" letter-spacing="4">
      <textPath href="#circle-top" startOffset="12%">SHAMIM FOREVER · KARACHI ATELIER · EST. 2024 ·</textPath>
    </text>

    <!-- Rarity tier arc -->
    <text font-family="Georgia, serif" font-size="10" fill="${gold}" fill-opacity="0.6" letter-spacing="5">
      <textPath href="#circle-bottom" startOffset="20%">· ${cleanRarity} EDITION · POLYGON MAINNET ·</textPath>
    </text>
  </g>

  <!-- Rarity tier badge -->
  <rect x="350" y="578" width="300" height="36" rx="2" 
    fill="${gold}" fill-opacity="0.08"
    stroke="${gold}" stroke-width="0.8" stroke-opacity="0.6"/>
  <text x="500" y="601"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="13"
    fill="${gold}"
    text-anchor="middle"
    letter-spacing="5"
    font-weight="400">${cleanRarity} TIER</text>

  <!-- Product name -->
  <text x="500" y="660"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="22"
    fill="#ffffff"
    fill-opacity="0.9"
    text-anchor="middle"
    font-weight="400">${cleanName}</text>

  <!-- Decorative divider -->
  <line x1="200" y1="680" x2="440" y2="680" stroke="${gold}" stroke-width="0.5" stroke-opacity="0.4"/>
  <polygon points="500,673 503,680 500,687 497,680" fill="${gold}" fill-opacity="0.6"/>
  <line x1="560" y1="680" x2="800" y2="680" stroke="${gold}" stroke-width="0.5" stroke-opacity="0.4"/>

  <!-- Serial number -->
  <text x="500" y="726"
    font-family="'Courier New', Courier, monospace"
    font-size="16"
    fill="${gold}"
    text-anchor="middle"
    letter-spacing="3">${cleanSerial}</text>

  <!-- Ownership cycle -->
  <text x="500" y="755"
    font-family="Georgia, serif"
    font-size="10"
    fill="#666660"
    text-anchor="middle"
    letter-spacing="2">OWNERSHIP CYCLE ${ownershipCycle.toString().padStart(3,'0')}</text>

  <!-- Bottom metadata strip -->
  <rect x="60" y="800" width="880" height="1" fill="${gold}" fill-opacity="0.15"/>

  <!-- Bottom info row -->
  <text x="80" y="835"
    font-family="Georgia, serif"
    font-size="9"
    fill="#555550"
    letter-spacing="2">AUTHENTIC SOVEREIGN ASSET</text>
  
  <text x="500" y="835"
    font-family="Georgia, serif"
    font-size="9"
    fill="#555550"
    text-anchor="middle"
    letter-spacing="2">POLYGON MAINNET · ERC-721</text>

  <text x="920" y="835"
    font-family="Georgia, serif"
    font-size="9"
    fill="#555550"
    text-anchor="end"
    letter-spacing="2">KARACHI ATELIER</text>

  <!-- Bottom border ornament -->
  <text x="500" y="910"
    font-family="Georgia, serif"
    font-size="8"
    fill="${gold}"
    fill-opacity="0.3"
    text-anchor="middle"
    letter-spacing="3">✦ ✦ ✦</text>

  <!-- SHAMIM FOREVER footer -->
  <text x="500" y="945"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="18"
    fill="${gold}"
    fill-opacity="0.7"
    text-anchor="middle"
    letter-spacing="8"
    font-weight="400">SHAMIM FOREVER</text>

  <text x="500" y="965"
    font-family="Georgia, serif"
    font-size="8"
    fill="${gold}"
    fill-opacity="0.3"
    text-anchor="middle"
    letter-spacing="3">SOVEREIGN LUXURY DIGITAL ARCHIVE</text>
</svg>`
}

// Generate collection banner SVG (1400x400)
export function generateCollectionBannerSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 400" width="1400" height="400">
  <defs>
    <linearGradient id="bannerBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#030303"/>
      <stop offset="30%" stop-color="#0d0a04"/>
      <stop offset="50%" stop-color="#141008"/>
      <stop offset="70%" stop-color="#0d0a04"/>
      <stop offset="100%" stop-color="#030303"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="40%">
      <stop offset="0%" stop-color="#c9a054" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#c9a054" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c9a054" stop-opacity="0"/>
      <stop offset="20%" stop-color="#c9a054" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#e8c87a"/>
      <stop offset="80%" stop-color="#c9a054" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#c9a054" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1400" height="400" fill="url(#bannerBg)"/>
  <rect width="1400" height="400" fill="url(#centerGlow)"/>

  <!-- Top + bottom gold lines -->
  <rect x="0" y="18" width="1400" height="1" fill="url(#goldLine)" opacity="0.6"/>
  <rect x="0" y="22" width="1400" height="0.5" fill="url(#goldLine)" opacity="0.3"/>
  <rect x="0" y="377" width="1400" height="1" fill="url(#goldLine)" opacity="0.6"/>
  <rect x="0" y="373" width="1400" height="0.5" fill="url(#goldLine)" opacity="0.3"/>

  <!-- Left ornamental lines -->
  <line x1="60" y1="40" x2="60" y2="360" stroke="#c9a054" stroke-width="0.5" stroke-opacity="0.3"/>
  <line x1="66" y1="60" x2="66" y2="340" stroke="#c9a054" stroke-width="0.3" stroke-opacity="0.2"/>

  <!-- Right ornamental lines -->
  <line x1="1340" y1="40" x2="1340" y2="360" stroke="#c9a054" stroke-width="0.5" stroke-opacity="0.3"/>
  <line x1="1334" y1="60" x2="1334" y2="340" stroke="#c9a054" stroke-width="0.3" stroke-opacity="0.2"/>

  <!-- 8-point seal (smaller, left) -->
  <g transform="translate(200,200)" opacity="0.2">
    ${Array.from({length: 8}, (_, i) => {
      const a = (i * 45) * Math.PI / 180
      const x1 = Math.cos(a) * 20, y1 = Math.sin(a) * 20
      const x2 = Math.cos(a) * 70, y2 = Math.sin(a) * 70
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#c9a054" stroke-width="1"/>`
    }).join('')}
    <circle cx="0" cy="0" r="80" fill="none" stroke="#c9a054" stroke-width="0.8"/>
    <polygon points="0,-30 21,0 0,30 -21,0" fill="#c9a054" fill-opacity="0.5"/>
  </g>

  <!-- 8-point seal (smaller, right) -->
  <g transform="translate(1200,200)" opacity="0.2">
    ${Array.from({length: 8}, (_, i) => {
      const a = (i * 45) * Math.PI / 180
      const x1 = Math.cos(a) * 20, y1 = Math.sin(a) * 20
      const x2 = Math.cos(a) * 70, y2 = Math.sin(a) * 70
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#c9a054" stroke-width="1"/>`
    }).join('')}
    <circle cx="0" cy="0" r="80" fill="none" stroke="#c9a054" stroke-width="0.8"/>
    <polygon points="0,-30 21,0 0,30 -21,0" fill="#c9a054" fill-opacity="0.5"/>
  </g>

  <!-- Main titles -->
  <text x="700" y="150"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="11"
    fill="#c9a054"
    fill-opacity="0.6"
    text-anchor="middle"
    letter-spacing="8">THE HOUSE OF</text>

  <text x="700" y="230"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="72"
    fill="#c9a054"
    text-anchor="middle"
    letter-spacing="12"
    font-weight="400">SHAMIM FOREVER</text>

  <text x="700" y="275"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="13"
    fill="#888880"
    text-anchor="middle"
    letter-spacing="8">SOVEREIGN LUXURY DIGITAL ARCHIVE</text>

  <!-- Divider lines -->
  <line x1="300" y1="245" x2="550" y2="245" stroke="#c9a054" stroke-width="0.5" stroke-opacity="0.4"/>
  <polygon points="700,238 704,245 700,252 696,245" fill="#c9a054" fill-opacity="0.5"/>
  <line x1="850" y1="245" x2="1100" y2="245" stroke="#c9a054" stroke-width="0.5" stroke-opacity="0.4"/>

  <!-- Bottom caption -->
  <text x="700" y="345"
    font-family="Georgia, serif"
    font-size="10"
    fill="#555550"
    text-anchor="middle"
    letter-spacing="4">POLYGON MAINNET · ERC-721 · IPFS PROVENANCE · KARACHI SOVEREIGN ATELIER</text>
</svg>`
}

// Generate collection logo SVG (350x350)
export function generateCollectionLogoSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" width="350" height="350">
  <defs>
    <radialGradient id="logoBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1a1408"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
  </defs>
  <rect width="350" height="350" fill="url(#logoBg)"/>
  <circle cx="175" cy="175" r="160" fill="none" stroke="#c9a054" stroke-width="1.5" stroke-opacity="0.8"/>
  <circle cx="175" cy="175" r="152" fill="none" stroke="#c9a054" stroke-width="0.4" stroke-opacity="0.3"/>
  ${Array.from({length: 8}, (_, i) => {
    const a = (i * 45) * Math.PI / 180
    const x1 = 175 + Math.cos(a) * 60, y1 = 175 + Math.sin(a) * 60
    const x2 = 175 + Math.cos(a) * 140, y2 = 175 + Math.sin(a) * 140
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#c9a054" stroke-width="0.8" stroke-opacity="0.5"/>`
  }).join('')}
  <polygon points="175,130 215,175 175,220 135,175" fill="#c9a054" fill-opacity="0.15" stroke="#c9a054" stroke-width="1"/>
  <polygon points="175,148 197,175 175,202 153,175" fill="#c9a054" fill-opacity="0.5"/>
  <polygon points="175,160 188,175 175,190 162,175" fill="#c9a054"/>
  <text x="175" y="265"
    font-family="Georgia, serif"
    font-size="14"
    fill="#c9a054"
    fill-opacity="0.8"
    text-anchor="middle"
    letter-spacing="4">SF</text>
  <text x="175" y="282"
    font-family="Georgia, serif"
    font-size="7"
    fill="#c9a054"
    fill-opacity="0.4"
    text-anchor="middle"
    letter-spacing="2">SOVEREIGN</text>
</svg>`
}
