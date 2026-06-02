import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mintSovereignNFT } from '@/lib/nft-engine'

export const dynamic = 'force-dynamic'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
}

// ── ID Generators ─────────────────────────────────────────────────────────────
function generateOrderRef(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const suffix = Array.from({ length: 5 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `SF-ORD-${new Date().getFullYear()}-${suffix}`
}

function generateConsumerNumber(): string {
  const year = new Date().getFullYear()
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const suffix = Array.from({ length: 5 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `SF-${year}-${suffix}`
}

async function generateTrackingRef(seed: string): Promise<string> {
  const data = new TextEncoder().encode(seed + Date.now().toString())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  return `SF-TRK-${hex.slice(0, 8).toUpperCase()}`
}

// ── WhatsApp Notification ─────────────────────────────────────────────────────
async function notifyWhatsApp(msg: string): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) return
  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(msg)}&apikey=${apikey}`
  )
}

// ── Inner Circle Auto-Enrollment (OKBOND buyers) ──────────────────────────────
async function enrollInnerCircle(params: {
  name: string; email?: string; phone?: string
  wallet_address?: string; order_ref: string; total_usd: number
}): Promise<void> {
  const { name, email, phone, wallet_address, order_ref, total_usd } = params
  if (!email && !wallet_address) return

  const supabase = db()
  const identifier = email || wallet_address!

  try {
    // Check if member exists by email or wallet
    const { data: existing } = await supabase
      .from('inner_circle_applications')
      .select('id, tier, total_orders, total_spent_usd')
      .or(email ? `email.eq.${email}` : `wallet_address.eq.${wallet_address}`)
      .maybeSingle()

    if (existing) {
      const totalOrders = (existing.total_orders || 0) + 1
      const totalSpent = (existing.total_spent_usd || 0) + total_usd
      const newTier = totalOrders >= 5 || totalSpent >= 500 ? 'Platinum'
                    : totalOrders >= 3 || totalSpent >= 200 ? 'Gold' : 'Silver'

      await supabase.from('inner_circle_applications').update({
        total_orders: totalOrders,
        total_spent_usd: totalSpent,
        tier: newTier,
        wallet_address: wallet_address || undefined,
        status: 'approved',
        updated_at: new Date().toISOString(),
      }).eq('id', existing.id)
    } else {
      await supabase.from('inner_circle_applications').insert([{
        name,
        email: email || null,
        phone: phone || null,
        message: `Auto-enrolled via OKBOND purchase. Order: ${order_ref}`,
        tier: 'Silver',
        status: 'approved',
        wallet_address: wallet_address || null,
        total_orders: 1,
        total_spent_usd: total_usd,
        created_at: new Date().toISOString(),
      }])
    }
  } catch {
    // Non-critical — silent
  }
}

// ── Main Handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const supabase = db()

  let body: any
  try { body = await req.json() }
  catch { return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 }) }

  const {
    product_id, product_name, quantity = 1,
    payment_method, payment_status: _payStatus,
    tx_hash, shipping_address, total_pkr: _total_pkr_raw, total_usd,
    discount_applied = 0, wallet_address, rarity_tier = 'ELITE',
    price_pkr, price_usd, payment_proof_url,
  } = body

  // Accept either PKR or USD — always maintain both
    let total_pkr: number = Number(_total_pkr_raw) || 0
    if (!total_pkr && total_usd) total_pkr = Math.round(total_usd * 285)

    if ((!total_pkr && !total_usd) || !payment_method) {
      return NextResponse.json({ success: false, error: 'payment_method and at least one price (total_usd or total_pkr) are required' }, { status: 400 })
    }

  const order_ref = generateOrderRef()
  const tracking_ref = await generateTrackingRef(order_ref)
  const consumer_number = generateConsumerNumber()
    // Consumer ID for PKR bill payment apps (EasyPaisa, JazzCash, NayaPay, SadaPay)
    // Format: 12-digit numeric so apps can process it as a bill consumer ID
    const pkrConsumerId = Date.now().toString().slice(-8).padStart(12, '9')

  const isCrypto = ['usdt', 'usdc', 'okbond'].includes(payment_method?.toLowerCase())
  const isOKBOND = payment_method?.toLowerCase() === 'okbond'
  const isCOD = payment_method?.toLowerCase() === 'cod'

  const orderStatus = (isCrypto || isCOD) ? 'confirmed' : 'pending_verification'
  const orderPayStatus = isCrypto ? 'paid' : isCOD ? 'pending' : 'awaiting_verification'

  const notesArr: string[] = []
  if (tx_hash) notesArr.push(`Crypto TX: ${tx_hash} | ${payment_method?.toUpperCase()}`)
  if (isCOD) notesArr.push('Cash on Delivery')
  if (isOKBOND) notesArr.push('Inner Circle: Silver (Auto-enrolled)')

  // Insert order (try with order_ref columns first)
  let order: any = null
  const insertPayload: any = {
    status: orderStatus, payment_method, payment_status: orderPayStatus,
    pkr_consumer_id: pkrConsumerId,
    total_pkr: Math.round(total_pkr),
    total_usd: parseFloat((total_usd || 0).toFixed(2)),
    discount_applied, shipping_address: shipping_address || {},
    notes: notesArr.join(' | ') || null,
    payment_proof_url: payment_proof_url || null,
    order_ref, tracking_ref, consumer_number,
  }

  const { data: o1, error: e1 } = await supabase.from('orders').insert([insertPayload]).select().single()
  if (e1) {
    // Fallback without new columns
    const { data: o2, error: e2 } = await supabase.from('orders').insert([{
      ...insertPayload,
      order_ref: undefined, tracking_ref: undefined, payment_proof_url: undefined, consumer_number: undefined,
      notes: [...notesArr, `Ref: ${order_ref}`, `Trk: ${tracking_ref}`].join(' | '),
    }]).select().single()
    if (e2) return NextResponse.json({ success: false, error: e2.message }, { status: 500 })
    order = o2
  } else {
    order = o1
  }

  // Order items
  if (product_id) {
    await supabase.from('order_items').insert([{
      order_id: order.id, product_id, quantity,
      price_pkr: Math.round(price_pkr ?? total_pkr / quantity),
      price_usd: parseFloat(((price_usd ?? (total_usd || 0) / quantity) || 0).toFixed(2)),
    }])
  }

  // Initial tracking event
  await supabase.from('order_tracking').insert([{
    order_id: order.id, status: 'order_placed',
    title: 'Order Received',
    description: `Your sovereign order ${order_ref} has been received and is being processed.`,
    location: 'Shamim Forever HQ, Pakistan',
  }])

  // WhatsApp notification (non-blocking)
  const custName = shipping_address?.name || 'Customer'
  const city = shipping_address?.city || ''
  notifyWhatsApp(
    `🛍️ NEW ORDER — ${order_ref}\n👤 ${custName}${city ? ' · ' + city : ''}\n📦 ${product_name || 'Product'} ×${quantity}\n💰 PKR ${Math.round(total_pkr).toLocaleString()}\n💳 ${payment_method?.toUpperCase()}${isOKBOND ? ' ⭐ INNER CIRCLE' : ''}\n📍 ${tracking_ref}`
  )

  // Inner Circle auto-enrollment for OKBOND buyers (non-blocking)
  if (isOKBOND) {
    enrollInnerCircle({
      name: custName,
      email: shipping_address?.email || undefined,
      phone: shipping_address?.phone || undefined,
      wallet_address: wallet_address || undefined,
      order_ref,
      total_usd: total_usd || 0,
    })
  }

  // NFT minting — async, non-blocking
  if (isCrypto && wallet_address) {
    mintSovereignNFT({
      toAddress: wallet_address,
      productName: product_name || 'Sovereign Creation',
      serial: order_ref,
      rarityTier: rarity_tier || 'ELITE',
      category: 'Fragrance',
    }).then(async (result) => {
      await supabase.from('orders').update({
        notes: (order.notes || '') + ` | NFT_TX: ${result.txHash} | NFT_ID: ${result.tokenId}`,
      }).eq('id', order.id)
      await supabase.from('order_tracking').insert([{
        order_id: order.id, status: 'confirmed',
        title: 'Digital Twin NFT Minted',
        description: `Your NFT Digital Twin (Token #${result.tokenId}) has been minted on Polygon Mainnet.`,
        location: 'Polygon Mainnet · Shamim Forever Collection',
      }])
    })
  }

  return NextResponse.json({
    success: true,
      pkr_consumer_id: pkrConsumerId,
    order_id: order.id,
    order_ref,
    tracking_ref,
    consumer_number,
    status: order.status,
    payment_status: order.payment_status,
    track_url: `/track/${order.id}`,
    inner_circle: isOKBOND ? { enrolled: true, tier: 'Silver', benefits: ['10% OKBOND discount', 'Early access to new drops', 'VIP notifications'] } : null,
    message: 'Order placed successfully',
  })
}
