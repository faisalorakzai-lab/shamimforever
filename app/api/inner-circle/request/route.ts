import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

function clean(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = clean(body.name, 120)
    const email = clean(body.email, 180).toLowerCase()
    const country = clean(body.country, 120)
    const interest = clean(body.interest, 160)
    const message = clean(body.message, 500)

    if (clean(body.website, 120)) {
      return NextResponse.json({ error: 'Unable to process this request.' }, { status: 400 })
    }

    if (!name || !email || !country || !interest || !body.consent || !body.privacyAccepted) {
      return NextResponse.json({ error: 'Please complete the required fields and consent.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const record = [
      `Interest: ${interest}`,
      `Country / region: ${country}`,
      `Message: ${message || 'None'}`,
      'Consent: Selected communications accepted.',
      'Privacy policy: Accepted.',
    ].join('\n')

    const { data, error } = await db()
      .from('inner_circle_applications')
      .insert([{
        name,
        email,
        city: country,
        message: record,
        tier: 'consideration',
        status: 'pending',
        created_at: new Date().toISOString(),
      }])
      .select('id')
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: 'The House could not record your request. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, requestId: data?.id ?? null })
  } catch {
    return NextResponse.json({ error: 'The House could not record your request. Please try again.' }, { status: 500 })
  }
}