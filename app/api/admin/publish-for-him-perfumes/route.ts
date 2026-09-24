import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  buildForHimPerfumeStory,
  FOR_HIM_PERFUME_CATALOG,
} from '@/lib/for-him-perfume-catalog'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!,
    { auth: { persistSession: false } },
  )
}

function authorized(req: NextRequest) {
  const suppliedPublishKey = req.headers.get('x-shamim-publish-key')
  const suppliedAdminKey = req.headers.get('x-admin-key')
  const configuredKeys = [
    process.env.SESSION_SECRET,
    process.env.ADMIN_SECRET_KEY,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  ].filter(Boolean)
  return configuredKeys.includes(suppliedPublishKey || '') || configuredKeys.includes(suppliedAdminKey || '')
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()
  let { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('id, name, slug')
    .eq('slug', 'sf-essential-archive-for-him')
    .maybeSingle()

  if (collectionError) {
    return NextResponse.json({ error: collectionError.message }, { status: 500 })
  }
  if (!collection) {
    const { data: createdCollection, error: createCollectionError } = await supabase
      .from('collections')
      .insert({
        name: 'SF Essential Archive For Him',
        slug: 'sf-essential-archive-for-him',
        description: 'Original Shamim Forever fragrances curated for the For Him collection.',
        is_active: true,
      })
      .select('id, name, slug')
      .single()

    if (createCollectionError) {
      const { data: existingCollection, error: retryCollectionError } = await supabase
        .from('collections')
        .select('id, name, slug')
        .eq('slug', 'sf-essential-archive-for-him')
        .maybeSingle()
      if (retryCollectionError || !existingCollection) {
        return NextResponse.json({
          error: createCollectionError.message,
          retryError: retryCollectionError?.message,
          inserted: 0,
        }, { status: 500 })
      }
      collection = existingCollection
    } else {
      collection = createdCollection
    }
  }

  if (!collection) {
    return NextResponse.json({ error: 'For Him collection could not be created; no products were published.' }, { status: 500 })
  }

  const { data: categories, error: categoryError } = await supabase
    .from('main_categories')
    .select('id, slug')
    .eq('slug', 'perfume')
    .maybeSingle()
  if (categoryError) return NextResponse.json({ error: categoryError.message }, { status: 500 })
  if (!categories) return NextResponse.json({ error: 'Perfume category is missing; no products were published.' }, { status: 409 })

  const { data: subCategories, error: subCategoryError } = await supabase
    .from('sub_categories')
    .select('id, name, slug')
  const forHim = subCategories?.find(subCategory =>
    subCategory.slug === 'for-him' || subCategory.name.toLowerCase() === 'for him',
  )
  if (subCategoryError) return NextResponse.json({ error: subCategoryError.message }, { status: 500 })
  if (!forHim) return NextResponse.json({ error: 'For Him sub-category is missing; no products were published.' }, { status: 409 })

  const { data: existing, error: existingError } = await supabase
    .from('products')
    .select('id, name, slug, story')
  if (existingError) return NextResponse.json({ error: existingError.message }, { status: 500 })

  const existingNames = new Set((existing ?? []).map(product => product.name.trim().toLowerCase()))
  const existingSlugs = new Set((existing ?? []).map(product => product.slug.trim().toLowerCase()))
  const existingCodes = new Set<string>()
  for (const product of existing ?? []) {
    try {
      const story = typeof product.story === 'string' ? JSON.parse(product.story) : product.story
      if (story?.productCode) existingCodes.add(String(story.productCode).toLowerCase())
      if (story?.specs?.allocation) existingCodes.add(String(story.specs.allocation).toLowerCase())
    } catch {
      // Existing products may use editorial, non-JSON story text.
    }
  }

  const conflicts = FOR_HIM_PERFUME_CATALOG
    .filter(product =>
      existingNames.has(product.name.toLowerCase()) ||
      existingSlugs.has(product.slug.toLowerCase()) ||
      existingCodes.has(product.code.toLowerCase()),
    )
    .map(product => ({ code: product.code, name: product.name, slug: product.slug }))

  const conflictKeys = new Set(conflicts.map(product => product.code))
  const toPublish = FOR_HIM_PERFUME_CATALOG.filter(product => !conflictKeys.has(product.code))

  const rows = toPublish.map(product => ({
    collection_id: collection.id,
    main_category_id: categories.id,
    sub_category_id: forHim.id,
    name: product.name,
    slug: product.slug,
    description: `${product.name} — an original Shamim Forever ${product.family.toLowerCase()} fragrance inspired by the ${product.reference} reference profile. No official affiliation is claimed.`,
    story: buildForHimPerfumeStory(product),
    price_pkr: Math.round(product.priceUsd * 278),
    price_usd: product.priceUsd,
    inventory: 10,
    images: [],
    is_featured: false,
    is_active: true,
  }))

  if (rows.length === 0) {
    return NextResponse.json({
      published: 0,
      expected: FOR_HIM_PERFUME_CATALOG.length,
      skippedExisting: conflicts,
      collection: { id: collection.id, name: collection.name, slug: collection.slug },
      category: { id: categories.id, slug: categories.slug },
      subCategory: { id: forHim.id, name: forHim.name, slug: forHim.slug },
      media: 'pending supplied product imagery and exact videos',
      passport: 'not issued',
      provenance: 'not verified',
      authentication: 'not issued',
      holderPrivileges: 'no active verified privileges supplied',
      products: [],
    })
  }

  const { data: inserted, error: insertError } = await supabase
    .from('products')
    .insert(rows)
    .select('id, name, slug, collection_id, main_category_id, sub_category_id, price_usd, is_active')

  if (insertError) {
    return NextResponse.json({ error: insertError.message, inserted: 0 }, { status: 500 })
  }

  return NextResponse.json({
    published: inserted?.length ?? 0,
    expected: FOR_HIM_PERFUME_CATALOG.length,
    skippedExisting: conflicts,
    collection: { id: collection.id, name: collection.name, slug: collection.slug },
    category: { id: categories.id, slug: categories.slug },
    subCategory: { id: forHim.id, name: forHim.name, slug: forHim.slug },
    media: 'pending supplied product imagery and exact videos',
    passport: 'not issued',
    provenance: 'not verified',
    authentication: 'not issued',
    holderPrivileges: 'no active verified privileges supplied',
    products: inserted ?? [],
  })
}