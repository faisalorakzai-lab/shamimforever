import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const trackingId = params.id.toUpperCase()

  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .eq('tracking_id', trackingId)
    .single()

  if (error || !data) {
    // Also try private_deliveries legacy table
    const { data: legacyData } = await supabase
      .from('private_deliveries')
      .select('*')
      .eq('tracking_code', trackingId)
      .single()

    if (legacyData) {
      const statusMap: Record<string, number> = {
        'Vault Prepared': 0,
        'Identity Verified': 1,
        'Route Secured': 2,
        'Chauffeur Assigned': 3,
        'Transit Active': 4,
        'Arrival Confirmed': 5,
      }
      return NextResponse.json({
        tracking_id: legacyData.tracking_code,
        customer_name: legacyData.customer_name,
        status: legacyData.delivery_status ?? 'Vault Prepared',
        status_index: statusMap[legacyData.delivery_status ?? ''] ?? 0,
        current_location: legacyData.current_city ?? 'Karachi Sovereign Vault',
        destination: legacyData.current_city,
        chauffeur_name: null,
        vehicle: null,
        eta: legacyData.estimated_arrival,
        latitude: 24.8607,
        longitude: 67.0011,
        is_active: true,
      })
    }

    return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
  }

  const STATUS_ORDER = [
    'vault_prepared',
    'identity_verified',
    'route_secured',
    'chauffeur_assigned',
    'transit_active',
    'arrival_confirmed',
  ]

  return NextResponse.json({
    ...data,
    status_index: STATUS_ORDER.indexOf(data.status),
  })
}
