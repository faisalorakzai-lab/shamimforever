import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticationRecord, normalizeSerial } from '@/lib/authentication'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const value = new URL(request.url).searchParams.get('serial')
  const serial = normalizeSerial(value)

  if (!value?.trim() || !serial) {
    return NextResponse.json(
      { status: 'Invalid', record: null, message: 'Enter a valid Sovereign Serial.' },
      { status: 400 },
    )
  }

  try {
    const record = await getAuthenticationRecord(serial)
    if (!record) {
      return NextResponse.json(
        { status: 'Not Found', record: null, message: 'No public registry record matches this serial.' },
        { status: 404 },
      )
    }
    return NextResponse.json({ status: record.status, record })
  } catch {
    return NextResponse.json(
      { status: 'Pending', record: null, message: 'The registry is temporarily unavailable. Please try again.' },
      { status: 503 },
    )
  }
}