import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const key =
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !key) {
    throw new Error('Supabase catalogue configuration is missing')
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key)
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getSupabase()
  const { data: byId, error: byIdError } = await supabase
    .from('products')
    .select('*, collection:collections(*), main_category:main_categories(*)')
    .eq('id', params.id)
    .maybeSingle()

  if (byId) return NextResponse.json({ product: byId })

  const { data: bySlug, error: bySlugError } = await supabase
    .from('products')
    .select('*, collection:collections(*), main_category:main_categories(*)')
    .eq('slug', params.id)
    .maybeSingle()

  if (bySlug) return NextResponse.json({ product: bySlug })
  return NextResponse.json(
    { error: bySlugError?.message || byIdError?.message || 'Product not found' },
    { status: 404 }
  )
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('products')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ product: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getSupabase()
  const { error } = await supabase.from('products').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
