import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// POST /api/admin/init-db?secret=<ADMIN_EMAIL>
// Checks which sovereign tables exist and returns status
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const results: Record<string, string> = {}

  const { error: saErr } = await supabase.from('sovereign_assets').select('id').limit(1)
  results['sovereign_assets'] = saErr ? `MISSING: ${saErr.message}` : 'OK'

  const { error: plErr } = await supabase.from('provenance_ledger').select('id').limit(1)
  results['provenance_ledger'] = plErr ? `MISSING: ${plErr.message}` : 'OK'

  const { error: pcErr } = await supabase.from('products_catalog').select('id').limit(1)
  results['products_catalog'] = pcErr ? `MISSING: ${pcErr.message}` : 'OK'

  const allOk = Object.values(results).every(v => v === 'OK')

  return NextResponse.json({
    status: allOk ? 'ready' : 'tables_missing',
    tables: results,
    instructions: allOk ? 'All NFT tables exist. System is ready.' : 'Run the SQL in supabase/schema-nft.sql in your Supabase SQL Editor to create missing tables.',
    sql_file: 'supabase/schema-nft.sql',
  })
}

export async function GET(req: NextRequest) {
  return POST(req)
}
