import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-delete-demo-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = db()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', '12b24167-3be1-4294-a749-d94ea7bfb1a6')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, message: 'Old demo Her Legacy Vault deleted.' })
}
