import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'

  export const dynamic = 'force-dynamic'

  function db() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )
  }

  export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== 'unisex-images-fix-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = db()

    // Find and update Midnight Iris Royale by slug
    const mirSlugs = ['midnight-iris-royale', 'midnight iris royale']
    const mirImages = [
      '/products/midnight-iris-royale/mir-hero.png',
      '/products/midnight-iris-royale/mir-box.png',
    ]

    // Find and update Kyoto Sacred Incense by slug
    const kyotoSlugs = ['sf-kyoto-sacred-incense', 'kyoto-sacred-incense', 'kyoto sacred incense']
    const kyotoImages = [
      '/products/sf-kyoto-sacred-incense/kyoto-hero.png',
      '/products/sf-kyoto-sacred-incense/kyoto-box.png',
    ]

    // Find and update Eternal Sovereign by slug
    const eternalSlugs = ['eternal-sovereign', 'eternal sovereign']
    const eternalImages = [
      '/products/eternal-sovereign/hero.png',
      '/products/eternal-sovereign/vault.png',
    ]

    const results: { name: string; slug: string; status: string; error?: string }[] = []

    // Helper: update product images by matching any of the slugs
    async function updateBySlug(slugs: string[], images: string[], name: string) {
      const { data: found, error: findErr } = await supabase
        .from('products')
        .select('id, slug, name')
        .or(slugs.map(s => `slug.ilike.%${s}%`).join(','))

      if (findErr) {
        results.push({ name, slug: slugs[0], status: 'find_error', error: findErr.message })
        return
      }

      if (!found || found.length === 0) {
        results.push({ name, slug: slugs[0], status: 'not_found' })
        return
      }

      for (const product of found) {
        const { error: updateErr } = await supabase
          .from('products')
          .update({
            images,
            image_url: images[0],
          })
          .eq('id', product.id)

        results.push({
          name: product.name ?? name,
          slug: product.slug ?? slugs[0],
          status: updateErr ? 'error' : 'updated',
          ...(updateErr ? { error: updateErr.message } : {}),
        })
      }
    }

    await updateBySlug(mirSlugs, mirImages, 'Midnight Iris Royale')
    await updateBySlug(kyotoSlugs, kyotoImages, 'Kyoto Sacred Incense')
    await updateBySlug(eternalSlugs, eternalImages, 'Eternal Sovereign')

    return NextResponse.json({ results, updated_at: new Date().toISOString() })
  }
  