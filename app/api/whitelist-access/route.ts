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
    const interest = clean(body.interest, 120)
    const note = clean(body.note, 500)
    const accessInterests = Array.isArray(body.accessInterests)
      ? body.accessInterests.filter((item: unknown): item is string => typeof item === 'string').slice(0, 12).map(item => clean(item, 80))
      : []

    if (clean(body.website, 120)) {
      return NextResponse.json({ error: 'Unable to process this request.' }, { status: 400 })
    }

    if (!name || !email || !country || !interest || !body.consent || !body.privacyAccepted) {
      return NextResponse.json({ error: 'Please complete the required fields and consent.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = db()
    const message = [
      `Why they are here: ${interest}`,
      `Access interests: ${accessInterests.length ? accessInterests.join(', ') : 'Not specified'}`,
      `Notes: ${note || 'None'}`,
      'Consent: Selected communications accepted.',
      'Privacy policy: Accepted.',
    ].join('\n')

    const { data, error } = await supabase
      .from('whitelist_access_requests')
      .insert([{
        name,
        email,
        country,
        interest,
        access_interests: accessInterests,
        note: note || null,
        consent: true,
        privacy_accepted: true,
        status: 'pending',
        created_at: new Date().toISOString(),
      }])
      .select('id')
      .maybeSingle()

    if (!error) {
      return NextResponse.json({ success: true, requestId: data?.id ?? null })
    }

    // The fallback keeps the public request flow usable on installations that
    // still have the original request table but not the dedicated whitelist table.
    const fallback = await supabase
      .from('inner_circle_requests')
      .insert([{
        name,
        email,
        message,
        tier: 'Whitelist',
        status: 'pending',
        created_at: new Date().toISOString(),
      }])
      .select('id')
      .maybeSingle()

    if (fallback.error) {
      return NextResponse.json({ error: 'The House could not record your request. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, requestId: fallback.data?.id ?? null, fallback: true })
  } catch {
    return NextResponse.json({ error: 'The House could not record your request. Please try again.' }, { status: 500 })
  }
}