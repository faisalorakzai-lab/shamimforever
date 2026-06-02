'use client'
import { useState, useEffect, useRef } from 'react'

const CURRENCIES = [
  { code: 'USD', symbol: '

export const CURRENCY_EVENT = 'sf:currencychange'
export const CURRENCY_KEY = 'sf_currency'

export function getStoredCurrency(): string {
  if (typeof window === 'undefined') return 'USD'
  return localStorage.getItem(CURRENCY_KEY) || 'USD'
}

export default function CurrencySelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('USD')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = getStoredCurrency()
    if (stored) setSelected(stored)
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (code: string) => {
    setSelected(code)
    localStorage.setItem(CURRENCY_KEY, code)
    window.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: code }))
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
          minWidth: 140, zIndex: 9999, boxShadow: '0 16px 48px rgba(0,0,0,0.9)',
        }}>
          {CURRENCIES.map((cur, i) => (
            <button
              key={cur.code}
              onClick={() => handleSelect(cur.code)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 12px',
                background: selected === cur.code ? 'rgba(201,160,84,0.1)' : 'none',
                border: 'none',
                borderBottom: i < CURRENCIES.length - 1 ? '1px solid rgba(201,160,84,0.06)' : 'none',
                cursor: 'pointer',
                color: selected === cur.code ? '#c9a054' : 'rgba(240,236,228,0.5)',
                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 13 }}>{cur.flag}</span>
              <span>{cur.code}</span>
              <span style={{ marginLeft: 'auto', fontSize: 9, opacity: 0.4 }}>{cur.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
, flag: '🇺🇸' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', flag: '🇸🇦' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧' },
]

export const CURRENCY_EVENT = 'sf:currencychange'
export const CURRENCY_KEY = 'sf_currency'

export function getStoredCurrency(): string {
  if (typeof window === 'undefined') return 'USD'
  return localStorage.getItem(CURRENCY_KEY) || 'USD'
}

export default function CurrencySelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('USD')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = getStoredCurrency()
    if (stored) setSelected(stored)
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (code: string) => {
    setSelected(code)
    localStorage.setItem(CURRENCY_KEY, code)
    window.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: code }))
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
          minWidth: 140, zIndex: 9999, boxShadow: '0 16px 48px rgba(0,0,0,0.9)',
        }}>
          {CURRENCIES.map((cur, i) => (
            <button
              key={cur.code}
              onClick={() => handleSelect(cur.code)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 12px',
                background: selected === cur.code ? 'rgba(201,160,84,0.1)' : 'none',
                border: 'none',
                borderBottom: i < CURRENCIES.length - 1 ? '1px solid rgba(201,160,84,0.06)' : 'none',
                cursor: 'pointer',
                color: selected === cur.code ? '#c9a054' : 'rgba(240,236,228,0.5)',
                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 13 }}>{cur.flag}</span>
              <span>{cur.code}</span>
              <span style={{ marginLeft: 'auto', fontSize: 9, opacity: 0.4 }}>{cur.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
