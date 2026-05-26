import { NextRequest, NextResponse } from 'next/server'

  export const dynamic = 'force-dynamic'

  const BASE = 'https://shamimforever-api-server.vercel.app'

  const METADATA: Record<string, object> = {
    'SF-RO-2026-01': {
      name: "SHAMIM'S GHOST — FOUNDERS SOVEREIGN EDITION",
      description: "Ultra-luxury sovereign fragrance NFT — $150,000 Founder collectible. Cinematic matte black, obsidian crystal bottle with engraved gold SF insignia, royal diamond crown cap, floating sovereign gold key charm, museum-grade reflections, black velvet shadows, luxury smoke atmosphere, royal gold silk fabric, hyper-detailed cinematic lighting. Sotheby's x Rolls Royce x Tom Ford aesthetic. Permanent digital provenance with VVIP institutional access to the House of Shamim Forever.",
      image: `${BASE}/api/nft/artwork/SF-RO-2026-01`,
      external_url: `${BASE}/authenticate?serial=SF-RO-2026-01`,
      background_color: '050505',
      attributes: [
        { trait_type: 'Serial Number', value: 'SF-RO-2026-01' },
        { trait_type: 'Edition', value: 'Founders Sovereign Edition' },
        { trait_type: 'Rarity Tier', value: 'FOUNDERS' },
        { trait_type: 'Valuation', value: '$150,000 USD' },
        { trait_type: 'Edition Number', value: '1 of 1' },
        { trait_type: 'Type', value: 'Ultra-luxury Sovereign Fragrance NFT' },
        { trait_type: 'Environment', value: 'Cinematic Matte Black' },
        { trait_type: 'Bottle Material', value: 'Obsidian Crystal' },
        { trait_type: 'Bottle Details', value: 'Engraved Gold SF Insignia, Royal Diamond Crown Cap, Floating Sovereign Gold Key Charm' },
        { trait_type: 'Material', value: 'Black Oud and Kashmiri Saffron' },
        { trait_type: 'Reflections', value: 'Museum-grade' },
        { trait_type: 'Atmosphere', value: 'Black Velvet Shadows, Soft Luxury Smoke' },
        { trait_type: 'Fabric', value: 'Royal Gold Silk' },
        { trait_type: 'Accents', value: 'Subtle Rose Elements' },
        { trait_type: 'Lighting', value: 'Hyper-detailed Cinematic, Dramatic from Above' },
        { trait_type: 'Aesthetic', value: 'Elite Billionaire, Institutional Luxury Branding' },
        { trait_type: 'Color Palette', value: 'Deep Black and Gold' },
        { trait_type: 'Quality', value: "Sotheby's x Rolls Royce x Tom Ford, Ultra Realistic, 8K, Masterpiece" },
        { trait_type: 'Seal', value: 'Sovereign Seal Emblem' },
        { trait_type: 'Surface', value: 'Dark Reflective Marble' },
        { trait_type: 'Mood', value: 'Timeless, Powerful, Emotional, Legendary, Sovereign' },
        { trait_type: 'Hidden Elements', value: 'Microscopic Serial Engraving, Floating Dust Particles, Arabic/Persian Texture Patterns, Gold Embossing, Cinematic Lens Bloom, Luxury Fog' },
        { trait_type: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
        { trait_type: 'Manufacture Date', value: 'May 2026' },
        { trait_type: 'Sovereign Status', value: 'Active Founders Passport' },
        { trait_type: 'Physical Authenticity', value: '100/100 (Sovereign Seal)' },
        { trait_type: 'Physical Asset', value: 'Sovereign Fragrance — Vaulted at Karachi Atelier' },
        { trait_type: 'Ownership Cycle Count', value: 1, display_type: 'number' },
      ],
    },
  }

  export async function GET(
    _req: NextRequest,
    { params }: { params: { serial: string } }
  ) {
    const serial = params.serial.toUpperCase()
    const meta = METADATA[serial]
    if (!meta) {
      // Generic fallback for other serials
      return NextResponse.json({
        name: `Shamim Forever — ${serial}`,
        image: `${BASE}/api/nft/artwork/${encodeURIComponent(serial)}`,
        external_url: `${BASE}/authenticate?serial=${serial}`,
        attributes: [{ trait_type: 'Serial Number', value: serial }],
      }, { headers: { 'Access-Control-Allow-Origin': '*' } })
    }
    return NextResponse.json(meta, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      }
    })
  }