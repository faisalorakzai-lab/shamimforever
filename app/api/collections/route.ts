import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

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

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('collections')
    .select('*, main_categories(*)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ collections: data })
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase()
    const body = await req.json()
    const { data, error } = await supabase.from('collections').insert([body]).select().single()
    if (error) throw error
    return NextResponse.json({ collection: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
