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
    if (secret !== 'eternal-empress-update-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = db()

    const updates = {
      name: 'ETERNAL EMPRESS',
      description: 'An imperial feminine masterpiece crafted around Red Rose Absolute, French Royal Violet, Golden Ambergris, and Royal Oud. Engineered for authority, elegance, and timeless feminine power.',
      images: [
        '/products/eternal-empress/empress-hero.png',
        '/products/eternal-empress/empress-1.png',
      ],
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', '39548a94-8f18-46ca-9de3-a38d7cc293da')
      .select('id, name, slug')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, updated: data, method: 'by-id' })
  }
  