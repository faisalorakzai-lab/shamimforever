import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, tier } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Create user via admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name, tier, member_since: new Date().toISOString() },
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    // Also send welcome email via formsubmit (non-fatal)
    try {
      await fetch('https://formsubmit.co/ajax/relations@shamimf.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Shamim Forever — Member Account Created: ${name}`,
          member_name: name,
          member_email: email,
          tier,
          temp_password: password,
          login_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://shamimforever-api-server.vercel.app'}/auth`,
          _template: 'table',
        }),
      })
    } catch { /* non-fatal */ }

    return NextResponse.json({ success: true, userId: data.user?.id })
  } catch (err: unknown) {
    const e = err as { message?: string }
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}
