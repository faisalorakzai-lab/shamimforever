import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-cats-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()
  const errors: string[] = []

  const { error: catErr } = await supabase.from('main_categories').upsert([
    { id: 'c513e298-7cb4-4c94-8288-19c6a12eed9b', name: 'Perfume',   slug: 'perfume',   description: 'Luxury fragrances — Male, Female, Unisex collections' },
    { id: '22226324-4789-419d-a9e2-f763df2d24f1', name: 'Cosmetics', slug: 'cosmetics', description: 'Premium beauty — Skin Prep, Color Makeup, Professional Treatments' },
    { id: 'e291b9af-a637-45da-a2df-d39f2e72e53c', name: 'Jewelry',   slug: 'jewelry',   description: 'Fine jewelry — Male and Female collections' },
  ], { onConflict: 'id' })
  if (catErr) errors.push('main_categories: ' + catErr.message.slice(0, 80))

  const { error: subErr } = await supabase.from('sub_categories').upsert([
    { id: 'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b', main_category_id: null, name: 'For Him', slug: 'for-him', description: 'Male products — Fragrances, Cosmetics, Jewelry' },
    { id: 'ab8df629-e022-41d9-a6de-fac63d5680e8', main_category_id: null, name: 'For Her', slug: 'for-her', description: 'Female products — Fragrances, Cosmetics, Jewelry' },
    { id: '63e2c67c-fdba-40f7-9cd1-2cbe7fd6d852', main_category_id: null, name: 'Unisex',  slug: 'unisex',  description: 'Unisex fragrances for all genders' },
  ], { onConflict: 'id' })
  if (subErr) errors.push('sub_categories: ' + subErr.message.slice(0, 80))

  const { error: collErr } = await supabase.from('collections').upsert([
    { name: 'Perfumes Range',  slug: 'perfumes-range',  description: 'Male, Female, and Unisex fragrances.', is_active: true },
    { name: 'Cosmetics Range', slug: 'cosmetics-range', description: 'Skincare and makeup for men and women.', is_active: true },
    { name: 'Jewelry Range',   slug: 'jewelry-range',   description: 'Fine jewelry for men and women.', is_active: true },
  ], { onConflict: 'slug' })
  if (collErr) errors.push('collections: ' + collErr.message.slice(0, 80))

  return NextResponse.json({
    success: errors.length === 0,
    errors: errors.length ? errors : undefined,
    message: '✅ Categories seeded. Next: /api/seed-products?secret=shamim-seed-2025 then /api/seed-more?secret=shamim-seed-more-2026',
    ids: {
      perfume: 'c513e298-7cb4-4c94-8288-19c6a12eed9b',
      cosmetics: '22226324-4789-419d-a9e2-f763df2d24f1',
      jewelry: 'e291b9af-a637-45da-a2df-d39f2e72e53c',
      for_him: 'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
      for_her: 'ab8df629-e022-41d9-a6de-fac63d5680e8',
      unisex: '63e2c67c-fdba-40f7-9cd1-2cbe7fd6d852',
    },
  })
}
