import { NextResponse } from 'next/server'

  export const dynamic = 'force-dynamic'

  let _cachedRates: Record<string, number> | null = null
  let _cacheTs = 0
  const TTL = 3_600_000

  const FALLBACK: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, AED: 3.67, SAR: 3.75,
    QAR: 3.64, KWD: 0.307, PKR: 278, INR: 83.5, CAD: 1.36, AUD: 1.52,
  }

  export async function GET() {
    try {
      if (_cachedRates && Date.now() - _cacheTs < TTL) {
        return NextResponse.json({ rates: _cachedRates, cached: true })
      }
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      if (!res.ok) throw new Error('upstream error')
      const data = await res.json()
      const needed = ['USD','EUR','GBP','AED','SAR','QAR','KWD','PKR','INR','CAD','AUD']
      const filtered: Record<string, number> = { USD: 1 }
      for (const c of needed) if (data.rates?.[c]) filtered[c] = data.rates[c]
      _cachedRates = filtered
      _cacheTs = Date.now()
      return NextResponse.json({ rates: filtered })
    } catch {
      return NextResponse.json({ rates: FALLBACK, fallback: true })
    }
  }
  