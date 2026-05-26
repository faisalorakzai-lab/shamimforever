import { NextRequest, NextResponse } from 'next/server'

  export const dynamic = 'force-dynamic'

  const BASE = 'https://shamimforever-api-server.vercel.app'
  const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'

  // Map serial → real PNG image (hosted in /public/nft/)
  // Founders NFT uses the actual artwork from the zip package
  // All other serials fall back to the SVG artwork API
  const IMAGES: Record<string, string> = {
    'SF-RO-2026-01': `${BASE}/nft/SF-RO-2026-01-main.png`,
    'SF-FND-0001':   `${BASE}/nft/SF-RO-2026-01-main.png`,
    'SF-SG-2026-00005': `${BASE}/nft/SF-RO-2026-01-main.png`,
  }

  const METADATA: Record<string, object> = {
    'SF-RO-2026-01': {
      name: "SHAMIM'S GHOST — FOUNDERS SOVEREIGN EDITION",
      description: "Ultra-luxury sovereign fragrance NFT artwork for a \$150,000 founder collectible. Cinematic matte black environment, obsidian crystal perfume bottle with engraved gold SF insignia, massive royal diamond crown cap, floating sovereign gold key charm, museum-grade reflections, black velvet shadows, soft luxury smoke atmosphere, royal gold silk fabric, subtle rose elements, hyper-detailed cinematic lighting, elite billionaire aesthetic, institutional luxury branding. Sotheby's × Rolls Royce × Tom Ford aesthetic. Ultra realistic 8K masterpiece composition. This token grants permanent digital provenance, verified ownership history, and VVIP institutional access to the House of Shamim Forever.",
      image: `${BASE}/nft/SF-RO-2026-01-main.png`,
      external_url: `${BASE}/authenticate?serial=SF-RO-2026-01`,
      background_color: '050505',
      contract_address: CONTRACT,
      attributes: [
        { trait_type: 'Serial Number', value: 'SF-RO-2026-01' },
        { trait_type: 'Edition', value: 'Founders Sovereign Edition' },
        { trait_type: 'Rarity Tier', value: 'FOUNDERS' },
        { trait_type: 'Valuation', value: '\$150,000 USD' },
        { trait_type: 'Edition Number', value: '1 of 1' },
        { trait_type: 'Type', value: 'Ultra-luxury Sovereign Fragrance NFT Artwork' },
        { trait_type: 'Environment', value: 'Cinematic Matte Black' },
        { trait_type: 'Bottle Material', value: 'Obsidian Crystal' },
        { trait_type: 'Bottle Details', value: 'Engraved Gold SF Insignia, Massive Royal Diamond Crown Cap, Floating Sovereign Gold Key Charm' },
        { trait_type: 'Material', value: 'Black Oud and Kashmiri Saffron' },
        { trait_type: 'Reflections', value: 'Museum-grade' },
        { trait_type: 'Atmosphere', value: 'Black Velvet Shadows, Soft Luxury Smoke' },
        { trait_type: 'Fabric', value: 'Royal Gold Silk' },
        { trait_type: 'Accents', value: 'Subtle Rose Elements' },
        { trait_type: 'Lighting', value: 'Hyper-detailed Cinematic, Dramatic from Above' },
        { trait_type: 'Aesthetic', value: 'Elite Billionaire, Institutional Luxury Branding' },
        { trait_type: 'Color Palette', value: 'Deep Black and Gold' },
        { trait_type: 'Quality', value: "Sotheby's x Rolls Royce x Tom Ford, Ultra Realistic, 8K, Masterpiece Composition" },
        { trait_type: 'Seal', value: 'Sovereign Seal Emblem' },
        { trait_type: 'Surface', value: 'Dark Reflective Marble' },
        { trait_type: 'Spotlight', value: 'Dramatic from Above' },
        { trait_type: 'Typography', value: "Ultra-clean for SHAMIM'S GHOST title" },
        { trait_type: 'Mood', value: 'Timeless, Powerful, Emotional, Legendary, Sovereign' },
        { trait_type: 'Hidden Elements', value: 'Microscopic Serial Engraving, Floating Dust Particles, Arabic/Persian Texture Patterns, Gold Embossing, Black Lacquer Reflections, Cinematic Lens Bloom, Luxury Fog' },
        { trait_type: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
        { trait_type: 'Manufacture Date', value: 'May 2026' },
        { trait_type: 'Sovereign Status', value: 'Active Founders Passport' },
        { trait_type: 'Physical Authenticity', value: '100/100 — Sovereign Seal' },
        { trait_type: 'Physical Asset', value: 'Sovereign Fragrance — Vaulted at Karachi Atelier' },
        { trait_type: 'Ownership Cycle Count', value: 1, display_type: 'number' },
        { trait_type: 'House', value: 'Shamim Forever' },
        { trait_type: 'Country', value: 'Pakistan' },
      ],
    },
  }

  export async function GET(
    _req: NextRequest,
    { params }: { params: { serial: string } }
  ) {
    const serial = params.serial.toUpperCase().replace(/\.json$/i, '')
    const meta = METADATA[serial]
    const image = IMAGES[serial] || `${BASE}/api/nft/artwork/${encodeURIComponent(serial)}`

    if (meta) {
      return NextResponse.json(meta, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300',
        },
      })
    }

    // Dynamic fallback for product-minted NFTs
    return NextResponse.json({
      name: `Shamim Forever Sovereign Asset — ${serial}`,
      description: 'A sovereign luxury NFT from the House of Shamim Forever. Tied to a physical ultra-luxury fragrance collectible with on-chain provenance and VVIP House access.',
      image,
      external_url: `${BASE}/authenticate?serial=${serial}`,
      background_color: '050505',
      contract_address: CONTRACT,
      attributes: [
        { trait_type: 'Serial Number', value: serial },
        { trait_type: 'House', value: 'Shamim Forever' },
        { trait_type: 'Country', value: 'Pakistan' },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    })
  }
  