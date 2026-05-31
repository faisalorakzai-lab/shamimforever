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
  if (secret !== 'for-him-images-fix-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()

  const products = [
    {
      id: '404480ae-fd59-4e24-8dc8-1945f3e22a28',
      name: "Founder's Eternal Archive",
      images: [
        '/products/founders-eternal-archive/founder-hero.png',
        '/products/founders-eternal-archive/founder-box.png',
      ],
    },
    {
      id: 'ce175b29-d0b0-48b8-895c-e03ad1b729eb',
      name: "Shamim's Ghost — The Eternal Legacy",
      images: [
        '/products/shamims-ghost/ghost-hero.png',
        '/products/shamims-ghost/ghost-box.png',
      ],
    },
    {
      id: '444c1c4d-cbd7-4c36-a8eb-15520e908b9b',
      name: 'Sovereign Oud Absolute',
      images: [
        '/products/sovereign-oud-absolute/oud-bottle.png',
        '/products/sovereign-oud-absolute/oud-box.png',
      ],
    },
    {
      id: '3212d3d4-6415-4557-8bdd-d788753ff5d9',
      name: 'Imperial Black Throne',
      images: [
        '/products/imperial-black-throne/throne-bottle.png',
        '/products/imperial-black-throne/throne-box.png',
      ],
    },
    {
      id: 'bda3ee9b-426b-479a-8454-29e296c51eaf',
      name: 'Sapphire Blue Levant',
      images: [
        '/products/sapphire-blue-levant/levant-bottle.png',
        '/products/sapphire-blue-levant/levant-box.png',
      ],
    },
  ]

  const results: { name: string; status: string; error?: string }[] = []

  for (const product of products) {
    const { error } = await supabase
      .from('products')
      .update({ images: product.images })
      .eq('id', product.id)

    results.push({
      name: product.name,
      status: error ? 'error' : 'updated',
      ...(error ? { error: error.message } : {}),
    })
  }

  return NextResponse.json({ results, updated_at: new Date().toISOString() })
}
