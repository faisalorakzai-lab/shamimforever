import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { FOR_HER_10_PRODUCTS } from '@/lib/for-her-product-catalog'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase admin configuration is missing')
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function POST(req: NextRequest) {
  if (!process.env.SESSION_SECRET || req.headers.get('x-session-secret') !== process.env.SESSION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = getAdminClient()
    const { data: existing, error: readError } = await supabase
      .from('products')
      .select('slug, name, story')
      .limit(1000)
    if (readError) throw readError

    const bySlug = new Map((existing ?? []).map((product) => [product.slug, product]))
    const byName = new Map((existing ?? []).map((product) => [product.name, product]))
    const usedCodes = new Map<string, { slug: string; name: string }>()
    for (const product of existing ?? []) {
      try {
        const story = typeof product.story === 'string' ? JSON.parse(product.story) : product.story
        const code = story?.specs?.code || story?.code
        if (code) usedCodes.set(code, product)
      } catch {}
    }

    const pending = FOR_HER_10_PRODUCTS.filter((product) => {
      const code = JSON.parse(product.story)?.specs?.code
      return !bySlug.has(product.slug) && !byName.has(product.name) && !usedCodes.has(code)
    })

    if (pending.length === 0) {
      return NextResponse.json({ inserted: [], count: 0, status: 'already-published' })
    }

    const { data: inserted, error: insertError } = await supabase
      .from('products')
      .insert(pending)
      .select('slug, name, price_usd, main_category_id, sub_category_id, is_active')
    if (insertError) throw insertError

    return NextResponse.json({ inserted, count: inserted?.length ?? 0, status: 'published' })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Seed failed' }, { status: 500 })
  }
}