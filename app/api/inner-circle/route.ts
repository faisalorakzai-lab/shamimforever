import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ── Tier calculation ──────────────────────────────────────────────────────────
function getTier(totalOrders: number, totalSpentUsd: number): string {
  if (totalOrders >= 5 || totalSpentUsd >= 500) return 'Platinum'
  if (totalOrders >= 3 || totalSpentUsd >= 200) return 'Gold'
  if (totalOrders >= 1) return 'Silver'
  return 'Founding'
}

// ── POST: enroll or upgrade member ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const supabase = db()
    const body = await req.json()
    const { name, email, city, message, tier, phone,
            wallet_address, order_ref, total_usd, auto_enrolled } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    // Check if member already exists
    const { data: existing } = await supabase
      .from('inner_circle_applications')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (existing) {
      // Update existing member — upgrade tier if auto-enrolled via OKBOND
      const totalOrders = (existing.total_orders || 0) + (auto_enrolled ? 1 : 0)
      const totalSpent = (existing.total_spent_usd || 0) + (total_usd || 0)
      const newTier = getTier(totalOrders, totalSpent)

      const { data: updated, error } = await supabase
        .from('inner_circle_applications')
        .update({
          total_orders: totalOrders,
          total_spent_usd: totalSpent,
          tier: newTier,
          wallet_address: wallet_address || existing.wallet_address,
          status: 'approved',
          updated_at: new Date().toISOString(),
        })
        .eq('email', email)
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

      return NextResponse.json({
        success: true,
        action: 'upgraded',
        member: updated,
        tier: newTier,
        message: newTier !== existing.tier
          ? `Congratulations! You've been upgraded to ${newTier} tier.`
          : `Welcome back, ${name}. Your ${newTier} membership is active.`,
      })
    }

    // New member enrollment
    const newTier = auto_enrolled ? 'Silver' : (tier || 'Silver')

    const { data: member, error } = await supabase
      .from('inner_circle_applications')
      .insert([{
        name,
        email,
        city: city || null,
        phone: phone || null,
        message: message || (auto_enrolled
          ? `Auto-enrolled via OKBOND purchase. Order: ${order_ref || 'N/A'}`
          : null),
        tier: newTier,
        status: auto_enrolled ? 'approved' : 'pending',
        wallet_address: wallet_address || null,
        total_orders: auto_enrolled ? 1 : 0,
        total_spent_usd: total_usd || 0,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) {
      // Fallback: insert without new columns if they don't exist yet
      const { data: fallback, error: err2 } = await supabase
        .from('inner_circle_applications')
        .insert([{
          name, email,
          city: city || null,
          message: message || (auto_enrolled ? `Auto-enrolled via OKBOND purchase ${order_ref || ''}` : null),
          tier: newTier,
          status: auto_enrolled ? 'approved' : 'pending',
          created_at: new Date().toISOString(),
        }])
        .select()
        .single()

      if (err2) return NextResponse.json({ error: err2.message }, { status: 500 })
      return NextResponse.json({
        success: true,
        action: 'enrolled',
        member: fallback,
        tier: newTier,
        message: `Welcome to the Inner Circle, ${name}. Your ${newTier} membership is now active.`,
        benefits: getBenefits(newTier),
      })
    }

    return NextResponse.json({
      success: true,
      action: 'enrolled',
      member,
      tier: newTier,
      message: `Welcome to the Inner Circle, ${name}. Your ${newTier} membership is now active.`,
      benefits: getBenefits(newTier),
    })
  } catch (err: unknown) {
    const e = err as { message?: string }
    return NextResponse.json({ error: e?.message || 'Enrollment failed' }, { status: 500 })
  }
}

// ── GET: look up member by email or wallet ────────────────────────────────────
export async function GET(req: NextRequest) {
  const supabase = db()
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const wallet = searchParams.get('wallet')
  const status = searchParams.get('status')

  if (!email && !wallet && !status) {
    // Admin: get all members
    const { data, error } = await supabase
      .from('inner_circle_applications')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ members: data })
  }

  let query = supabase.from('inner_circle_applications').select('*')
  if (email) query = query.eq('email', email)
  else if (wallet) query = query.eq('wallet_address', wallet)
  else if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ members: data, benefits: data?.[0] ? getBenefits(data[0].tier) : null })
}

function getBenefits(tier: string) {
  const tiers: Record<string, { discount: number; earlyAccess: boolean; perks: string[] }> = {
    Silver:   { discount: 10, earlyAccess: false, perks: ['10% OKBOND discount', 'Monthly newsletter', 'Exclusive drops notification'] },
    Gold:     { discount: 15, earlyAccess: true,  perks: ['15% discount on all orders', '48-hour early access', 'Priority WhatsApp support', 'Free shipping'] },
    Platinum: { discount: 20, earlyAccess: true,  perks: ['20% discount on all orders', '72-hour early access', 'Dedicated concierge', 'Free shipping worldwide', 'Annual gift'] },
    Founding: { discount: 25, earlyAccess: true,  perks: ['25% lifetime discount', '1-week early access', 'Personal atelier session', 'Free shipping worldwide', 'Annual sovereign gift', 'NFT Founders Edition mint'] },
  }
  return tiers[tier] || tiers.Silver
}
