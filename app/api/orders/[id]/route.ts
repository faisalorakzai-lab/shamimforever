import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'

  function getSupabase() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }

  const ALLOWED_STATUSES = [
    'Pending Verification',
    'Payment Approved',
    'Under Private Delivery Dispatch',
    'Completed',
    'Cancelled',
  ]

  export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const supabase = getSupabase()
    const body = await req.json()
    const { status } = body

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ order: data })
  }
  