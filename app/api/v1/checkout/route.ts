import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mintSovereignNFT } from '@/lib/nft-engine'

export const dynamic = 'force-dynamic'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ─── ID Generators ────────────────────────────────────────────────────────────

function generateOrderRef(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const suffix = Array.from({ length: 5 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `SF-ORD-${new Date().getFullYear()}-${suffix}`
}

async function generateTrackingRef(seed: string): Promise<string> {
  const data = new TextEncoder().encode(seed + Date.now().toString())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  return `SF-TRK-${hex.slice(0, 8).toUpperCase()}`
}

// ─── WhatsApp Notification ─────────────────────────────────────────────────────

async function notifyWhatsApp(msg: string): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) return
  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(msg)}&apikey=${apikey}`
  ).catch(() => { /* non-critical */ })
}

// ─── Main Handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const supabase = db()

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    product_id,
    product_name,
    quantity = 1,
    payment_method,
    payment_status: payStatus,
    tx_hash,
    shipping_address,
    total_pkr,
    total_usd,
    discount_applied = 0,
    wallet_address,
    rarity_tier = 'ELITE',
    price_pkr,
    price_usd,
    payment_proof_url,
  } = body

  if (!total_pkr || !payment_method) {
    return NextResponse.json({ success: false, error: 'total_pkr and payment_method are required' }, { status: 400 })
  }

  // ── Step 1: Generate sovereign IDs ───────────────────────────────────────────
  const order_ref = generateOrderRef()
  const tracking_ref = await generateTrackingRef(order_ref)

  const isCrypto = ['usdt', 'usdc', 'okbond'].includes(payment_method?.toLowerCase())
  const isCOD = payment_method?.toLowerCase() === 'cod'

  const orderStatus = isCrypto ? 'confirmed' : isCOD ? 'confirmed' : 'pending_verification'
  const orderPayStatus = isCrypto ? 'paid' : isCOD ? 'pending' : 'awaiting_verification'

  const notesArr: string[] = []
  if (tx_hash) notesArr.push(`Crypto TX: ${tx_hash} | ${payment_method?.toUpperCase()}`)
  if (isCOD) notesArr.push('Cash on Delivery')

  // ── Step 2: Insert order ─────────────────────────────────────────────────────
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert([{
      status: orderStatus,
      payment_method,
      payment_status: orderPayStatus,
      total_pkr: Math.round(total_pkr),
      total_usd: parseFloat((total_usd || 0).toFixed(2)),
      discount_applied,
      shipping_address: shipping_address || {},
      notes: notesArr.join(' | ') || null,
      payment_proof_url: payment_proof_url || null,
      order_ref,
      tracking_ref,
    }])
    .select()
    .single()

  if (orderErr) {
    // Fallback: insert without order_ref/tracking_ref if columns don't exist yet
    const { data: orderFallback, error: err2 } = await supabase
      .from('orders')
      .insert([{
        status: orderStatus, payment_method, payment_status: orderPayStatus,
        total_pkr: Math.round(total_pkr),
        total_usd: parseFloat((total_usd || 0).toFixed(2)),
        discount_applied,
        shipping_address: shipping_address || {},
        notes: [notesArr.join(' | '), `Ref: ${order_ref}`, `Trk: ${tracking_ref}`].filter(Boolean).join(' | '),
        payment_proof_url: payment_proof_url || null,
      }])
      .select().single()
    if (err2) return NextResponse.json({ success: false, error: err2.message }, { status: 500 })
    body._order = orderFallback
    // Continue with fallback order
    return handlePostInsert(supabase, orderFallback, {
      order_ref, tracking_ref, product_id, product_name, quantity,
      price_pkr, price_usd, total_pkr, total_usd, isCrypto, wallet_address,
      rarity_tier, shipping_address, payment_method, tx_hash,
    })
  }

  return handlePostInsert(supabase, order, {
    order_ref, tracking_ref, product_id, product_name, quantity,
    price_pkr, price_usd, total_pkr, total_usd, isCrypto, wallet_address,
    rarity_tier, shipping_address, payment_method, tx_hash,
  })
}

async function handlePostInsert(
  supabase: ReturnType<typeof createClient>,
  order: any,
  p: {
    order_ref: string; tracking_ref: string
    product_id?: string; product_name?: string; quantity: number
    price_pkr?: number; price_usd?: number; total_pkr: number; total_usd?: number
    isCrypto: boolean; wallet_address?: string; rarity_tier: string
    shipping_address?: any; payment_method: string; tx_hash?: string
  }
) {
  const {
    order_ref, tracking_ref, product_id, product_name, quantity,
    price_pkr, price_usd, total_pkr, total_usd, isCrypto,
    wallet_address, rarity_tier, shipping_address, payment_method,
  } = p

  // ── Step 3: Order items ───────────────────────────────────────────────────────
  if (product_id) {
    await supabase.from('order_items').insert([{
      order_id: order.id,
      product_id,
      quantity,
      price_pkr: Math.round(price_pkr ?? total_pkr / quantity),
      price_usd: parseFloat(((price_usd ?? (total_usd || 0) / quantity) || 0).toFixed(2)),
    }]).catch(() => {})
  }

  // ── Step 4: Initial tracking event ───────────────────────────────────────────
  await supabase.from('order_tracking').insert([{
    order_id: order.id,
    status: 'order_placed',
    title: 'Order Received',
    description: `Your sovereign order ${order_ref} has been received. Our team will process it shortly.`,
    location: 'Shamim Forever HQ, Pakistan',
  }]).catch(() => { /* table may not exist yet */ })

  // ── Step 5: WhatsApp notification (non-blocking) ─────────────────────────────
  const name = shipping_address?.name || 'Customer'
  const city = shipping_address?.city || ''
  notifyWhatsApp(
    `🛍️ NEW ORDER — ${order_ref}\n👤 ${name}${city ? ' · ' + city : ''}\n📦 ${product_name || 'Product'} ×${quantity}\n💰 PKR ${Math.round(total_pkr).toLocaleString()}\n💳 ${payment_method?.toUpperCase()}\n📍 Tracking: ${tracking_ref}`
  ).catch(() => {})

  // ── Step 6: NFT minting (async, non-blocking) ─────────────────────────────────
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
        order_id: order.id,
        status: 'confirmed',
        title: 'Digital Twin NFT Minted',
        description: `Your NFT Digital Twin (Token #${result.tokenId}) has been minted on Polygon Mainnet.`,
        location: 'Polygon Mainnet · Shamim Forever Collection',
      }]).catch(() => {})
    }).catch((err: Error) => {
      console.warn('[NFT-MINT] Non-critical failure:', err?.message?.slice(0, 100))
    })
  }

  return NextResponse.json({
    success: true,
    order_id: order.id,
    order_ref,
    tracking_ref,
    status: order.status,
    payment_status: order.payment_status,
    track_url: `/track/${order.id}`,
    message: 'Order placed successfully',
  })
}
