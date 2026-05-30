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
    if (secret !== 'sovereign-amethyst-update-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = db()

    const updates = {
      name: 'SOVEREIGN AMETHYST',
      description: 'A violet imperial extrait crafted from Rare Purple Iris, Midnight Orchid, and Amethyst Amber. Engineered for women whose silence defines their authority.',
      images: [
        '/products/sovereign-amethyst/amethyst-hero.png',
        '/products/sovereign-amethyst/amethyst-1.png',
      ],
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', '2396d52d-e864-4b59-b3cd-81903bf453d3')
      .select('id, name, slug')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, updated: data, method: 'by-id' })
  }
  