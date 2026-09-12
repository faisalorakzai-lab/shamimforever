import { access } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Product } from '@/types'
import { auditCatalog, buildProductPageModel, type ProductAudit } from '@/lib/product-engine'

export const dynamic = 'force-dynamic'

type AssetStatus = 'present' | 'missing' | 'broken'

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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const products = (data ?? []) as Product[]
  const baseReport = auditCatalog(products)
  const rows = await Promise.all(baseReport.rows.map(async (row) => {
    const product = products.find(item => item.id === row.id)
    if (!product) return row
    const model = buildProductPageModel(product)
    const [imageStatus, rawVideoStatus] = await Promise.all([
      probeAsset(model.heroImage),
      model.videoUrl ? probeAsset(model.videoUrl) : Promise.resolve<'not-provided'>('not-provided'),
    ])
    const videoStatus = rawVideoStatus === 'not-provided' ? rawVideoStatus : rawVideoStatus === 'present' ? 'present' : 'broken'
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