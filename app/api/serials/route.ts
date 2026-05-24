import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function generateSerial(prefix: string, index: number): string {
  const year = new Date().getFullYear()
  const num = String(index).padStart(5, '0')
  return `${prefix}-${year}-${num}`
}

export async function POST(req: NextRequest) {
  const { prefix = 'SF-RO', count = 1, product_name, atelier = 'Karachi Sovereign Atelier' } = await req.json()

  // Get current max serial count for this prefix+year
  const year = new Date().getFullYear()
  const { data: existing } = await supabase
    .from('product_authentication')
    .select('serial_number')
    .like('serial_number', `${prefix}-${year}-%`)
    .order('serial_number', { ascending: false })
    .limit(1)

  let startIndex = 1
  if (existing && existing.length > 0) {
    const lastSerial = existing[0].serial_number
    const lastNum = parseInt(lastSerial.split('-').pop() ?? '0', 10)
    startIndex = lastNum + 1
  }

  const serials: string[] = []
  const rows = []

  for (let i = 0; i < count; i++) {
    const serial = generateSerial(prefix, startIndex + i)
    const blockchainHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    const nftTokenId = String(Math.floor(Math.random() * 900000) + 100000)

    serials.push(serial)
    rows.push({
      serial_number: serial,
      blockchain_hash: blockchainHash,
      nft_token_id: nftTokenId,
      is_claimed: false,
      verification_status: false,
      authenticity_score: 100,
      provenance: atelier,
      nft_metadata: {
        product_name: product_name ?? 'Sovereign Creation',
        atelier,
        minted_at: new Date().toISOString(),
      },
    })
  }

  const { data, error } = await supabase
    .from('product_authentication')
    .insert(rows)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Return serials with QR URL patterns
  const result = (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    qr_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shamimforever-api-server.vercel.app'}/authenticate?serial=${row.serial_number}`,
  }))

  return NextResponse.json({ serials: result, count: result.length })
}

export async function GET(_req: NextRequest) {
  const { data, error } = await supabase
    .from('product_authentication')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ serials: data })
}
