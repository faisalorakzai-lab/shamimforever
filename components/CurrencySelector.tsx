'use client'
  import { useState, useEffect, useRef, useCallback } from 'react'

  export const CURRENCIES = [
    { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
    { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'Pound Sterling' },
    { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', name: 'UAE Dirham' },
    { code: 'SAR', symbol: '﷼', flag: '🇸🇦', name: 'Saudi Riyal' },
    { code: 'QAR', symbol: 'QR', flag: '🇶🇦', name: 'Qatari Riyal' },
    { code: 'KWD', symbol: 'KD', flag: '🇰🇼', name: 'Kuwaiti Dinar' },
    { code: 'PKR', symbol: '₨', flag: '🇵🇰', name: 'Pakistani Rupee' },
    { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', flag: '🇨🇦', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'Australian Dollar' },
  ]

  export const CURRENCY_EVENT = 'sf:currencychange'
  export const CURRENCY_KEY = 'sf_currency'
  export const RATES_KEY = 'sf_exchange_rates'
  const RATES_TTL = 3_600_000

  export function getStoredCurrency(): string {
    if (typeof window === 'undefined') return 'USD'
    return localStorage.getItem(CURRENCY_KEY) || 'USD'
  }

  export function getStoredRates(): Record<string, number> {
    if (typeof window === 'undefined') return {}
    try {
      const raw = localStorage.getItem(RATES_KEY)
      if (!raw) return {}
      const { rates, ts } = JSON.parse(raw)
      if (Date.now() - ts > RATES_TTL) return {}
      return rates || {}
    } catch { return {} }
  }

  export function convertPrice(usdPrice: number, currency: string, rates?: Record<string, number>): string {
    const r = rates && Object.keys(rates).length > 0 ? rates : getStoredRates()
    const rate = r[currency] ?? 1
    const converted = usdPrice * rate
    const cur = CURRENCIES.find(c => c.code === currency)
    const symbol = cur?.symbol || '$'
    let formatted: string
    if (currency === 'PKR' || currency === 'INR') {
      formatted = Math.round(converted).toLocaleString('en-US')
    } else if (currency === 'KWD') {
      formatted = converted.toFixed(3)
    } else {
      formatted = converted.toFixed(2)
    }
    return `${symbol}${formatted} ${currency}`
  }

  export default function CurrencySelector() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('USD')
    const [rates, setRates] = useState<Record<string, number>>({})
    const ref = useRef<HTMLDivElement>(null)

    const fetchRates = useCallback(async () => {
      try {
        const res = await fetch('/api/exchange-rates')
        if (res.ok) {
          const data = await res.json()
          if (data.rates) {
            setRates(data.rates)
            localStorage.setItem(RATES_KEY, JSON.stringify({ rates: data.rates, ts: Date.now() }))
            window.dispatchEvent(new CustomEvent('sf:ratesupdate', { detail: data.rates }))
          }
        }
      } catch {}
    }, [])

    useEffect(() => {
      const stored = getStoredCurrency()
      setSelected(stored)
      const storedRates = getStoredRates()
      if (Object.keys(storedRates).length > 0) {
        setRates(storedRates)
      } else {
        fetchRates()
      }
      const handleOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
      }
      document.addEventListener('mousedown', handleOutside)
      return () => document.removeEventListener('mousedown', handleOutside)
    }, [fetchRates])

    const handleSelect = (code: string) => {
      setSelected(code)
      localStorage.setItem(CURRENCY_KEY, code)
      window.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: { code, rates } }))
      setOpen(false)
    }

    const current = CURRENCIES.find(c => c.code === selected) || CURRENCIES[0]

    return (
      <div ref={ref} style={{ position: 'relative', zIndex: 100 }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5, background: 'none',
            border: '1px solid rgba(201,160,84,0.22)', padding: '4px 9px',
            cursor: 'pointer', borderRadius: 2, color: '#c9a054',
            fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
            transition: 'border-color 0.3s', fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,160,84,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,160,84,0.22)' }}
        >
          <span style={{ fontSize: 12 }}>{current.flag}</span>
          <span>{current.code}</span>
          <span style={{ fontSize: 6, opacity: 0.45, marginTop: 1 }}>▼</span>
        </button>

        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: '#080604', border: '1px solid rgba(201,160,84,0.18)',
            minWidth: 190, zIndex: 9999, boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
            maxHeight: 400, overflowY: 'auto',
          }}>
            {CURRENCIES.map((cur) => (
              <button
                key={cur.code}
                onClick={() => handleSelect(cur.code)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                  padding: '9px 14px',
                  background: selected === cur.code ? 'rgba(201,160,84,0.1)' : 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(201,160,84,0.06)',
                  cursor: 'pointer',
                  color: selected === cur.code ? '#c9a054' : 'rgba(228,228,231,0.65)',
                  fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                  fontFamily: 'inherit', textAlign: 'left',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { if (selected !== cur.code) e.currentTarget.style.background = 'rgba(201,160,84,0.05)' }}
                onMouseLeave={e => { if (selected !== cur.code) e.currentTarget.style.background = 'none' }}
              >
                <span style={{ fontSize: 13, flexShrink: 0 }}>{cur.flag}</span>
                <span style={{ flexShrink: 0, minWidth: 32 }}>{cur.code}</span>
                <span style={{ opacity: 0.35, fontSize: 8, whiteSpace: 'nowrap' }}>{cur.name}</span>
                {selected === cur.code && (
                  <span style={{ marginLeft: 'auto', fontSize: 9, color: '#c9a054' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
  