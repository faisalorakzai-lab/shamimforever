import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const collection = searchParams.get('collection')
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') || '50')

  let query = supabase
    .from('products')
    .select('*, collection:collections(name, slug)')
    .eq('is_active', true)
    .limit(limit)

  if (collection) query = query.eq('collection_id', collection)
  if (featured === 'true') query = query.eq('is_featured', true)

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ products: data })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data, error } = await supabase.from('products').insert([body]).select().single()
    if (error) throw error
    return NextResponse.json({ product: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
