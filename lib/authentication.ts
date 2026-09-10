import { supabaseAdmin } from '@/lib/supabase-server'

export const AUTHENTICATION_STATUSES = [
  'Authentic',
  'Pending',
  'Transferred',
  'Archived',
  'Suspended',
  'Not Found',
  'Invalid',
] as const

export type AuthenticationStatus = (typeof AUTHENTICATION_STATUSES)[number]

type SovereignAsset = {
  serial_number: string
  product_id?: string | null
  nft_status?: string | null
  tx_hash?: string | null
  token_id?: number | string | null
  rarity_tier?: string | null
  physical_status?: string | null
  ownership_cycle?: number | null
  created_at?: string | null
}

type LegacyAuthentication = {
  serial_number: string
  product_id?: string | null
  blockchain_hash?: string | null
  nft_token_id?: string | null
  is_claimed?: boolean | null
  verification_status?: boolean | null
  manufacture_date?: string | null
  provenance?: string | null
  nft_metadata?: Record<string, unknown> | null
  created_at?: string | null
}

export type PublicAuthenticationRecord = {
  serial: string
  status: Exclude<AuthenticationStatus, 'Not Found' | 'Invalid'>
  registry: 'Sovereign Asset Registry' | 'Product Authentication Registry'
  recordedAt?: string
  manufactureDate?: string
  productName?: string
  category?: string
  atelier?: string
  rarityTier?: string
  onChain?: {
    network: 'Polygon Mainnet'
    transactionHash?: string
    tokenId?: string
    explorerUrl?: string
  }
}

export function normalizeSerial(value: string | null | undefined) {
  const serial = value?.trim().toUpperCase() ?? ''
  if (!serial || serial.length > 64) return null
  if (!/^SF-[A-Z0-9]+-(?:[0-9]{4}-)?[0-9]{1,6}$/.test(serial)) return null
  return serial
}

function nonEmpty(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function statusForAsset(asset: SovereignAsset): Exclude<AuthenticationStatus, 'Not Found' | 'Invalid'> {
  const state = `${asset.nft_status ?? ''} ${asset.physical_status ?? ''}`.toLowerCase()
  if (/(suspend|revok|block)/.test(state)) return 'Suspended'
  if (/(archive|retir)/.test(state)) return 'Archived'
  if (asset.ownership_cycle !== undefined && Number(asset.ownership_cycle) > 1) return 'Transferred'
  if (asset.physical_status?.toLowerCase() === 'transferred') return 'Transferred'
  if (asset.nft_status?.toLowerCase() === 'minted') return 'Authentic'
  return 'Pending'
}

function statusForLegacy(record: LegacyAuthentication): Exclude<AuthenticationStatus, 'Not Found' | 'Invalid'> {
  const metadata = record.nft_metadata ?? {}
  const state = `${String(metadata.status ?? '')} ${String(metadata.lifecycle_status ?? '')}`.toLowerCase()
  if (/(suspend|revok|block)/.test(state)) return 'Suspended'
  if (/(archive|retir)/.test(state)) return 'Archived'
  if (metadata.transferred === true || metadata.transfer_status === 'transferred') return 'Transferred'
  if (record.verification_status === true || (record.is_claimed === true && !!record.blockchain_hash)) {
    return 'Authentic'
  }
  return 'Pending'
}

async function productDetails(productId: string | null | undefined) {
  if (!productId) return null

  const [catalogResult, productResult] = await Promise.all([
    supabaseAdmin
      .from('products_catalog')
      .select('product_name, category, craftsmanship_origin')
      .eq('product_id', productId)
      .maybeSingle(),
    supabaseAdmin
      .from('products')
      .select('name')
      .eq('id', productId)
      .maybeSingle(),
  ])

  if (catalogResult.data) {
    return {
      productName: nonEmpty(catalogResult.data.product_name),
      category: nonEmpty(catalogResult.data.category),
      atelier: nonEmpty(catalogResult.data.craftsmanship_origin),
    }
  }

  if (productResult.data) return { productName: nonEmpty(productResult.data.name) }
  return null
}

function chainReference(hash: string | null | undefined, tokenId: string | number | null | undefined) {
  const transactionHash = nonEmpty(hash)
  const normalizedTokenId = tokenId === null || tokenId === undefined ? undefined : String(tokenId)
  if (!transactionHash && !normalizedTokenId) return undefined

  return {
    network: 'Polygon Mainnet' as const,
    ...(transactionHash
      ? {
          transactionHash,
          explorerUrl: `https://polygonscan.com/tx/${encodeURIComponent(transactionHash)}`,
        }
      : {}),
    ...(normalizedTokenId ? { tokenId: normalizedTokenId } : {}),
  }
}

export async function getAuthenticationRecord(serial: string): Promise<PublicAuthenticationRecord | null> {
  const normalized = normalizeSerial(serial)
  if (!normalized) return null

  const [assetResult, legacyResult] = await Promise.all([
    supabaseAdmin
      .from('sovereign_assets')
      .select('serial_number, product_id, nft_status, tx_hash, token_id, rarity_tier, physical_status, ownership_cycle, created_at')
      .eq('serial_number', normalized)
      .maybeSingle(),
    supabaseAdmin
      .from('product_authentication')
      .select('serial_number, product_id, blockchain_hash, nft_token_id, is_claimed, verification_status, manufacture_date, provenance, nft_metadata, created_at')
      .eq('serial_number', normalized)
      .maybeSingle(),
  ])

  if (assetResult.error && legacyResult.error) {
    throw new Error('Authentication registry is unavailable')
  }

  const asset = assetResult.data as SovereignAsset | null
  if (asset) {
    const details = await productDetails(asset.product_id)
    return {
      serial: normalized,
      status: statusForAsset(asset),
      registry: 'Sovereign Asset Registry',
      recordedAt: nonEmpty(asset.created_at),
      productName: details?.productName,
      category: details?.category,
      atelier: details?.atelier,
      rarityTier: nonEmpty(asset.rarity_tier),
      onChain: chainReference(asset.tx_hash, asset.token_id),
    }
  }

  const legacy = legacyResult.data as LegacyAuthentication | null
  if (!legacy) return null

  const details = await productDetails(legacy.product_id)
  const metadata = legacy.nft_metadata ?? {}
  return {
    serial: normalized,
    status: statusForLegacy(legacy),
    registry: 'Product Authentication Registry',
    recordedAt: nonEmpty(legacy.created_at),
    manufactureDate: nonEmpty(legacy.manufacture_date),
    productName: nonEmpty(metadata.product_name),
    category: nonEmpty(metadata.category),
    atelier: nonEmpty(legacy.provenance) ?? details?.atelier,
    ...(details?.productName ? { productName: details.productName } : {}),
    ...(details?.category ? { category: details.category } : {}),
    onChain: chainReference(legacy.blockchain_hash, legacy.nft_token_id),
  }
}