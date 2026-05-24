import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, city, message, tier } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const supabase = getSupabase()

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('inner_circle_applications')
      .insert([{ name, email, city, message, tier, status: 'pending', created_at: new Date().toISOString() }])

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // 2. Send email to relations@shamimf.com via FormSubmit
    try {
      await fetch('https://formsubmit.co/ajax/relations@shamimf.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `New Inner Circle Application — ${tier} — ${name}`,
          name,
          email,
          city: city || 'Not provided',
          tier,
          message: message || 'No message provided',
          _template: 'table',
        }),
      })
    } catch {
      // Email failure is non-fatal — application is already saved
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const e = err as { message?: string }
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('inner_circle_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ applications: data })
}
