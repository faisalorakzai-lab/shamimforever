'use client'
import { useState, useEffect, useRef } from 'react'

const CURRENCIES = [
  { code: 'USD', symbol: '$',   name: 'US Dollar' },
  { code: 'PKR', symbol: 'Rs',  name: 'Pakistani Rupee' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
  { code: 'GBP', symbol: 'GBP', name: 'British Pound' },
]

export const CURRENCY_EVENT = 'sf:currencychange'
export const CURRENCY_KEY = 'sf_currency'
export type CurrencyCode = 'USD' | 'PKR' | 'AED' | 'SAR' | 'GBP'

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

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 100 }}>
      {/* Trigger — ultra-minimal, just 3-letter code + chevron */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'none', border: 'none',
          cursor: 'pointer', color: 'rgba(201,160,84,0.45)',
          fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase',
          transition: 'color 0.3s', fontFamily: 'inherit', padding: '2px 0',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'rgba(201,160,84,0.9)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,160,84,0.45)' }}
      >
        <span>{selected}</span>
        <span style={{ fontSize: 5, opacity: 0.5, lineHeight: 1 }}>&#9660;</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: '#05040300', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(201,160,84,0.12)',
          minWidth: 160, zIndex: 9999,
          boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
          background: 'rgba(5,4,3,0.97)',
        }}>
          {/* Header */}
          <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid rgba(201,160,84,0.06)' }}>
            <p style={{ fontSize: 6, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.28)', margin: 0 }}>Currency</p>
          </div>
          {CURRENCIES.map((cur, i) => (
            <button
              key={cur.code}
              onClick={() => handleSelect(cur.code)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 14px',
                background: selected === cur.code ? 'rgba(201,160,84,0.06)' : 'none',
                border: 'none',
                borderBottom: i < CURRENCIES.length - 1 ? '1px solid rgba(201,160,84,0.04)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (selected !== cur.code) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,160,84,0.03)' }}
              onMouseLeave={e => { if (selected !== cur.code) (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
            >
              <span style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: selected === cur.code ? '#c9a054' : 'rgba(240,236,228,0.45)' }}>{cur.code}</span>
              <span style={{ fontSize: 8, letterSpacing: '0.1em', color: selected === cur.code ? 'rgba(201,160,84,0.55)' : 'rgba(255,255,255,0.15)' }}>{cur.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}