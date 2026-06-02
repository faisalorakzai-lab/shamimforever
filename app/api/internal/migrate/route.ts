import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'pg'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-migrate-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()
    const results: string[] = []

    const sqls = [
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_proof_url TEXT`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_ref TEXT`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_ref TEXT`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS consumer_number TEXT`,
    ]

    for (const sql of sqls) {
      await client.query(sql)
      results.push(sql)
    }

    const { rows } = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name='orders' ORDER BY ordinal_position`
    )
    await client.query(`SELECT pg_notify('pgrst', 'reload schema')`)
    await client.end()

    return NextResponse.json({
      success: true,
      migrations: results,
      columns: rows.map((r: { column_name: string }) => r.column_name),
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    try { await client.end() } catch {}
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
