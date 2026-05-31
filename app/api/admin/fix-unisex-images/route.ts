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

    const results: { name: string; slug: string; status: string; error?: string }[] = []

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
          .update({ images })
          .eq('id', product.id)

        results.push({
          name: product.name ?? name,
          slug: product.slug ?? slugs[0],
          status: updateErr ? 'error' : 'updated',
          ...(updateErr ? { error: updateErr.message } : {}),
        })
      }
    }

    await updateBySlug(['midnight-iris-royale'], ['/products/midnight-iris-royale/mir-hero.png', '/products/midnight-iris-royale/mir-box.png'], 'Midnight Iris Royale')
    await updateBySlug(['kyoto-sacred-incense', 'sf-kyoto-sacred-incense'], ['/products/sf-kyoto-sacred-incense/kyoto-hero.png', '/products/sf-kyoto-sacred-incense/kyoto-box.png'], 'Kyoto Sacred Incense')
    await updateBySlug(['eternal-sovereign'], ['/products/eternal-sovereign/hero.png', '/products/eternal-sovereign/vault.png'], 'Eternal Sovereign')
    await updateBySlug(['house-vault-no-001', 'house-vault-no.001'], ['/products/house-vault-no-001/hero.png', '/products/house-vault-no-001/vault.png'], 'House Vault No.001')
    await updateBySlug(['sovereign-genesis'], ['/products/sovereign-genesis/hero.png', '/products/sovereign-genesis/vault.png'], 'Sovereign Genesis')

    return NextResponse.json({ results, updated_at: new Date().toISOString() })
  }
  