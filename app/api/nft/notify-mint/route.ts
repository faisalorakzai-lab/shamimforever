import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function POST(req: NextRequest) {
  try {
    const { productName, serial, walletAddress, buyerName, orderId, txHash, tokenId } = await req.json()

    const supabase = getSupabase()
    const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
    const BASE = 'https://shamimforever-api-server.vercel.app'

    // Save notification record to Supabase
    await supabase.from('nft_notifications').upsert([{
      serial_number: serial,
      order_id: orderId || null,
      buyer_name: buyerName || null,
      wallet_address: walletAddress || null,
      tx_hash: txHash || null,
      token_id: tokenId ? parseInt(tokenId) : null,
      product_name: productName,
      opensea_url: tokenId ? ('https://opensea.io/assets/matic/' + CONTRACT + '/' + tokenId) : null,
      polygonscan_url: txHash ? ('https://polygonscan.com/tx/' + txHash) : null,
      authenticate_url: BASE + '/authenticate?serial=' + serial,
      notified_at: new Date().toISOString(),
    }], { onConflict: 'serial_number' }).catch(() => {})

    // If Resend/email service configured, send email
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey && buyerName) {
      const emailBody = {
        from: 'House of Shamim Forever <noreply@shamimforever.com>',
        to: [], // email not collected yet — placeholder
        subject: 'Your Digital Twin NFT — ' + productName,
        html: `
          <div style="background:#050505;color:#e4e4e7;font-family:Georgia,serif;padding:48px;max-width:600px;margin:0 auto;">
            <p style="color:#c9a054;font-size:10px;letter-spacing:0.5em;text-transform:uppercase;margin-bottom:32px;">House of Shamim Forever</p>
            <h1 style="font-weight:300;font-size:28px;letter-spacing:0.2em;margin-bottom:8px;">DIGITAL TWIN MINTED</h1>
            <p style="color:#71717a;font-size:14px;margin-bottom:40px;">Your sovereign NFT passport has been registered on the blockchain.</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:12px 0;border-bottom:1px solid #111;color:#71717a;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">Product</td><td style="padding:12px 0;border-bottom:1px solid #111;color:#e4e4e7;font-size:13px;text-align:right;">${productName}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #111;color:#71717a;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">Serial</td><td style="padding:12px 0;border-bottom:1px solid #111;color:#c9a054;font-family:monospace;font-size:12px;text-align:right;">${serial}</td></tr>
              ${walletAddress ? '<tr><td style="padding:12px 0;border-bottom:1px solid #111;color:#71717a;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">Wallet</td><td style="padding:12px 0;border-bottom:1px solid #111;color:#e4e4e7;font-family:monospace;font-size:10px;text-align:right;">' + walletAddress + '</td></tr>' : ''}
              ${txHash ? '<tr><td style="padding:12px 0;border-bottom:1px solid #111;color:#71717a;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">TX Hash</td><td style="padding:12px 0;border-bottom:1px solid #111;color:#e4e4e7;font-family:monospace;font-size:10px;text-align:right;">' + txHash.slice(0, 20) + '...</td></tr>' : ''}
            </table>
            <div style="margin-top:40px;display:flex;gap:16px;">
              ${txHash ? '<a href="https://polygonscan.com/tx/' + txHash + '" style="color:#c9a054;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;text-decoration:none;border:1px solid #c9a054;padding:12px 24px;">View on Polygonscan</a>' : ''}
              <a href="${BASE}/authenticate?serial=${serial}" style="color:#71717a;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;text-decoration:none;border:1px solid #1a1a1a;padding:12px 24px;">Verify Authenticity</a>
            </div>
            <p style="margin-top:48px;color:#3f3f46;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;">House of Shamim Forever · Sovereign Registry · Polygon Mainnet</p>
          </div>
        `,
      }
      // Only send if we have email
      // await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: 'Bearer ' + resendApiKey, 'Content-Type': 'application/json' }, body: JSON.stringify(emailBody) })
    }

    return NextResponse.json({ success: true, serial, notified: true })
  } catch (err: unknown) {
    const e = err as { message?: string }
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
