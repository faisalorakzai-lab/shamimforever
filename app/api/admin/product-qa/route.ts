import { access } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Product } from '@/types'

export const dynamic = 'force-dynamic'

type ProductCategory = 'perfume' | 'cosmetics' | 'jewelry' | 'other'
type AssetStatus = 'present' | 'missing' | 'broken'
type StoryRecord = Record<string, unknown>

type ProductAudit = {
  id: string
  name: string
  category: ProductCategory
  url: string
  completionStatus: 'completed' | 'needs-data'
  imageStatus: AssetStatus
  videoStatus: 'present' | 'not-provided' | 'broken'
  seoStatus: 'ready' | 'needs-data'
  schemaStatus: 'ready' | 'needs-data'
  passportStatus: 'enabled' | 'archive-only'
  issues: string[]
}

function parseStory(value: string | null): StoryRecord {
  if (!value?.trim()) return {}
  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function stringValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function categoryFor(product: Product): ProductCategory {
  const value = String(product.main_category?.slug ?? '') + ' ' + String(product.main_category?.name ?? '')
  const normalized = value.toLowerCase()
  if (normalized.includes('cosmetic') || normalized.includes('skin') || normalized.includes('makeup')) return 'cosmetics'
  if (normalized.includes('jewel') || normalized.includes('ring') || normalized.includes('watch')) return 'jewelry'
  if (normalized.includes('perfume') || normalized.includes('fragrance') || normalized.includes('scent')) return 'perfume'
  return 'other'
}

function productVideo(product: Product): string | null {
  const story = parseStory(product.story)
  return stringValue(story.videoUrl) || stringValue(story.video_url) || stringValue(story.video)
}

function auditProduct(product: Product): ProductAudit {
  const heroImage = product.images?.find(Boolean) || null
  const videoUrl = productVideo(product)
  const issues: string[] = []
  if (!product.name?.trim()) issues.push('Missing product name')
  if (!product.slug?.trim()) issues.push('Missing slug')
  if (!product.description?.trim()) issues.push('Missing description')
  if (!Number.isFinite(Number(product.price_usd)) || Number(product.price_usd) <= 0) issues.push('Missing USD price')
  if (!heroImage) issues.push('Missing hero image')
  if (!product.main_category?.name) issues.push('Missing category')
  const ready = issues.length === 0
  const story = parseStory(product.story)
  const nft = story.nft && typeof story.nft === 'object' ? story.nft as StoryRecord : null
  return {
    id: product.id,
    name: product.name || 'Unnamed product',
    category: categoryFor(product),
    url: '/products/' + (product.slug || ''),
    completionStatus: ready ? 'completed' : 'needs-data',
    imageStatus: heroImage ? 'present' : 'missing',
    videoStatus: videoUrl ? 'present' : 'not-provided',
    seoStatus: ready ? 'ready' : 'needs-data',
    schemaStatus: ready ? 'ready' : 'needs-data',
    passportStatus: nft ? 'enabled' : 'archive-only',
    issues,
  }
}

function auditCatalog(products: Product[]) {
  const rows = products.map(auditProduct)
  const count = (predicate: (row: ProductAudit) => boolean) => rows.filter(predicate).length
  return {
    total: rows.length,
    completed: count(row => row.completionStatus === 'completed'),
    needsReview: count(row => row.completionStatus === 'needs-data'),
    missingData: count(row => row.issues.length > 0),
    brokenAssets: count(row => row.imageStatus !== 'present'),
    brokenVideos: count(row => row.videoStatus === 'broken'),
    seoIssues: count(row => row.seoStatus !== 'ready'),
    schemaIssues: count(row => row.schemaStatus !== 'ready'),
    byCategory: {
      perfume: count(row => row.category === 'perfume'),
      cosmetics: count(row => row.category === 'cosmetics'),
      jewelry: count(row => row.category === 'jewelry'),
      other: count(row => row.category === 'other'),
    },
    rows,
  }
}

async function probeAsset(asset: string | null): Promise<AssetStatus> {
  if (!asset) return 'missing'
  if (/^https?:\/\//i.test(asset)) {
    try {
      const response = await fetch(asset, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
        cache: 'no-store',
      })
      return response.ok ? 'present' : 'broken'
    } catch {
      return 'broken'
    }
  }

  try {
    await access(path.join(process.cwd(), 'public', asset.replace(/^\/+/, '')))
    return 'present'
  } catch {
    return 'missing'
  }
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, main_category:main_categories(id,name,slug)')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })
    .limit(500)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const products = (data ?? []) as Product[]
  const baseReport = auditCatalog(products)
  const rows = await Promise.all(baseReport.rows.map(async (row) => {
    const product = products.find(item => item.id === row.id)
    if (!product) return row
    const imageStatus = await probeAsset(product.images?.find(Boolean) || null)
    const video = productVideo(product)
    const rawVideoStatus = await probeAsset(video)
    const videoStatus: ProductAudit['videoStatus'] = video ? (rawVideoStatus === 'present' ? 'present' : 'broken') : 'not-provided'
    const issues = [...row.issues]
    if (imageStatus === 'broken') issues.push('Hero image failed to load')
    if (imageStatus === 'missing' && !issues.includes('Missing hero image')) issues.push('Hero image is missing')
    if (videoStatus === 'broken') issues.push('Video failed to load')
    return {
      ...row,
      imageStatus,
      videoStatus,
      issues,
      completionStatus: issues.length === 0 ? 'completed' : 'needs-data',
      seoStatus: issues.length === 0 ? 'ready' : 'needs-data',
      schemaStatus: issues.length === 0 ? 'ready' : 'needs-data',
    } satisfies ProductAudit
  }))

  return NextResponse.json({
    ...baseReport,
    completed: rows.filter(row => row.completionStatus === 'completed').length,
    needsReview: rows.filter(row => row.completionStatus === 'needs-data').length,
    missingData: rows.filter(row => row.issues.length > 0).length,
    brokenAssets: rows.filter(row => row.imageStatus !== 'present').length,
    brokenVideos: rows.filter(row => row.videoStatus === 'broken').length,
    seoIssues: rows.filter(row => row.seoStatus !== 'ready').length,
    schemaIssues: rows.filter(row => row.schemaStatus !== 'ready').length,
    rows,
  })
}
