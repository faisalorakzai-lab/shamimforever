import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@/lib/supabase/server'

  export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const supabase = await createClient()
    const body = await req.json()
    const { status } = body

    const allowed = [
      'Pending Verification',
      'Payment Approved',
      'Under Private Delivery Dispatch',
      'Completed',
      'Cancelled',
    ]
    if (!allowed.includes(status)) {
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
  