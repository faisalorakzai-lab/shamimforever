import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'
  import { mintSovereignNFT } from '@/lib/nft-engine'

  export const dynamic = 'force-dynamic'
  export const maxDuration = 300

  // Product → NFT serial mapping
  // When a user buys a product, they get the corresponding NFT
  const PRODUCT_NFT_MAP: Record<string, {
    serial: string; name: string; rarityTier: string; category: string;
    craftOrigin: string; manufactureDate: string;
  }> = {
    'sacred-incense-kyoto':    { serial: 'SF-IK-2026-00001', name: 'SACRED INCENSE OF KYOTO', rarityTier: 'IMPERIAL', category: 'Imperial Fragrance', craftOrigin: 'Kyoto Japan', manufactureDate: 'May 2026' },
    'sapphire-blue-levant':    { serial: 'SF-BL-2026-00002', name: 'SAPPHIRE BLUE LEVANT', rarityTier: 'ROYAL', category: 'Royal Heritage', craftOrigin: 'Damascus Syria', manufactureDate: 'May 2026' },
    'sf-vanilla-absolute':     { serial: 'SF-VA-2026-00003', name: 'SF VANILLA ABSOLUTE', rarityTier: 'FOUNDERS', category: 'Sovereign Fragrance', craftOrigin: 'Tahiti and Madagascar', manufactureDate: 'May 2026' },
    'midnight-iris-royale':    { serial: 'SF-MI-2026-00004', name: 'MIDNIGHT IRIS ROYALE', rarityTier: 'ONE-OF-ONE', category: 'Bespoke Masterpiece', craftOrigin: 'Florence Italy', manufactureDate: 'May 2026' },
    'shamims-ghost':           { serial: 'SF-SG-2026-00005', name: "SHAMIM'S GHOST", rarityTier: 'FOUNDERS', category: 'Sovereign Fragrance', craftOrigin: 'Karachi Sovereign Atelier', manufactureDate: 'May 2026' },
    'sovereign-rose-noir':     { serial: 'SF-RN-2026-00006', name: 'SOVEREIGN ROSE NOIR', rarityTier: 'ELITE', category: 'Elite Fragrance', craftOrigin: 'Istanbul Turkey', manufactureDate: 'May 2026' },
    'orakzai-crest-amber':     { serial: 'SF-OC-2026-00007', name: 'THE ORAKZAI CREST AMBER', rarityTier: 'ONE-OF-ONE', category: 'Vault Piece', craftOrigin: 'Orakzai Pakistan', manufactureDate: 'May 2026' },
    'majestic-oud-supreme':    { serial: 'SF-MO-2026-00008', name: 'MAJESTIC OUD SUPREME', rarityTier: 'IMPERIAL', category: 'Imperial Registry', craftOrigin: 'Phnom Penh Cambodia', manufactureDate: 'May 2026' },
    'celestial-musk-signet':   { serial: 'SF-CM-2026-00009', name: 'CELESTIAL MUSK SIGNET', rarityTier: 'ROYAL', category: 'Atelier Archive', craftOrigin: 'Kannauj India', manufactureDate: 'May 2026' },
    'sovereign-infinite-oud':  { serial: 'SF-IO-2026-00010', name: 'SOVEREIGN INFINITE OUD', rarityTier: 'ONE-OF-ONE', category: 'Grand Finale Asset', craftOrigin: 'Assam India 1963', manufactureDate: 'May 2026' },
  }

  function getSupabase() {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  }

  // POST /api/shop/purchase-mint
  // Called when a user completes a product purchase
  // Body: { productId, walletAddress, orderId, buyerEmail }
  export async function POST(req: NextRequest) {
    try {
      // Verify caller (shop backend or admin)
      const adminKey = req.headers.get('x-admin-key') || ''
      if (adminKey !== (process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { productId, walletAddress, orderId, buyerEmail } = await req.json()
      if (!productId || !walletAddress) {
        return NextResponse.json({ error: 'productId + walletAddress required' }, { status: 400 })
      }

      const nftConfig = PRODUCT_NFT_MAP[productId]
      if (!nftConfig) {
        return NextResponse.json({ error: `No NFT configured for product: ${productId}`, availableProducts: Object.keys(PRODUCT_NFT_MAP) }, { status: 404 })
      }

      const supabase = getSupabase()
      const { serial, name, rarityTier, category, craftOrigin, manufactureDate } = nftConfig

      // Check if already minted for this serial
      const { data: existing } = await supabase.from('sovereign_assets').select('*').eq('serial_number', serial).single()
      if (existing?.nft_status === 'minted') {
        return NextResponse.json({
          success: true, already_minted: true,
          serial, txHash: existing.tx_hash, tokenId: existing.token_id,
          opensea: `https://opensea.io/assets/matic/0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640/${existing.token_id}`,
          message: 'NFT already minted for this product',
        })
      }

      // Mark as minting
      await supabase.from('sovereign_assets').upsert({
        serial_number: serial,
        wallet_address: walletAddress,
        nft_status: 'minting',
        product_id: productId,
        ownership_cycle: 0,
        physical_status: 'vaulted',
      }, { onConflict: 'serial_number' })

      // Mint on Polygon
      const result = await mintSovereignNFT({ toAddress: walletAddress, productName: name, serial, rarityTier, category, craftOrigin, manufactureDate })

      // Save confirmed mint
      await Promise.all([
        supabase.from('sovereign_assets').update({
          nft_status: 'minted', tx_hash: result.txHash,
          token_id: parseInt(result.tokenId), wallet_address: walletAddress, ownership_cycle: 1,
          ipfs_metadata_url: result.metadataUrl, physical_status: 'vaulted',
        }).eq('serial_number', serial),
        supabase.from('provenance_ledger').insert([{
          token_id: parseInt(result.tokenId), previous_owner: '0x0000000000000000000000000000000000000000',
          new_owner: walletAddress, transfer_tx_hash: result.txHash, physical_shipment_status: 'vaulted',
        }]),
      ])

      const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
      return NextResponse.json({
        success: true, serial, name, rarityTier,
        txHash: result.txHash, tokenId: result.tokenId,
        walletAddress, orderId: orderId || null,
        opensea: `https://opensea.io/assets/matic/${CONTRACT}/${result.tokenId}`,
        polygonscan: `https://polygonscan.com/tx/${result.txHash}`,
        authenticate: `https://shamimforever-api-server.vercel.app/authenticate?serial=${serial}`,
        metadataUrl: result.metadataUrl,
      })
    } catch (err: unknown) {
      const e = err as { message?: string }
      return NextResponse.json({ error: e?.message || 'Mint failed' }, { status: 500 })
    }
  }

  // GET — list all product NFT mappings
  export async function GET() {
    return NextResponse.json({
      description: 'Call POST with productId + walletAddress to auto-mint NFT on product purchase',
      products: PRODUCT_NFT_MAP,
    })
  }
  