'use client'

  import { useEffect, useState } from 'react'

  const SERIF = "'Cormorant Garamond', Georgia, serif"
  const GOLD = '#c9a054'

  export type ToastType = 'error' | 'warning' | 'success' | 'info'

  interface SovereignToastProps {
    message: string
    subMessage?: string
    type?: ToastType
    visible: boolean
    onClose: () => void
    duration?: number
  }

  const ICONS = {
    error: '✕',
    warning: '◈',
    success: '◆',
    info: '◇',
  }

  const COLORS = {
    error: { border: 'rgba(220, 60, 60, 0.35)', accent: '#dc3c3c', bg: 'rgba(220, 60, 60, 0.05)' },
    warning: { border: 'rgba(201, 160, 84, 0.5)', accent: GOLD, bg: 'rgba(201, 160, 84, 0.06)' },
    success: { border: 'rgba(80, 200, 120, 0.35)', accent: '#50c878', bg: 'rgba(80, 200, 120, 0.05)' },
    info: { border: 'rgba(201, 160, 84, 0.25)', accent: 'rgba(201,160,84,0.6)', bg: 'rgba(201,160,84,0.03)' },
  }

  export function SovereignToast({ message, subMessage, type = 'info', visible, onClose, duration = 4000 }: SovereignToastProps) {
    const [opacity, setOpacity] = useState(0)
    const c = COLORS[type]

    useEffect(() => {
      if (visible) {
        setOpacity(1)
        const t = setTimeout(() => { setOpacity(0); setTimeout(onClose, 400) }, duration)
        return () => clearTimeout(t)
      }
    }, [visible, duration, onClose])

    if (!visible && opacity === 0) return null

    return (
      <div style={{
        position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, opacity, transition: 'opacity 0.4s ease',
        background: '#050505', border: `1px solid ${c.border}`,
        padding: '18px 28px', display: 'flex', alignItems: 'flex-start', gap: 16,
        minWidth: 320, maxWidth: 480, boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
      }}>
        <span style={{ color: c.accent, fontSize: 14, lineHeight: 1.4, flexShrink: 0, marginTop: 2 }}>{ICONS[type]}</span>
        <div>
          <p style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 300, color: '#f0ece4', letterSpacing: '0.02em', margin: 0 }}>{message}</p>
          {subMessage && <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '6px 0 0' }}>{subMessage}</p>}
        </div>
        <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: 12, flexShrink: 0, padding: '2px 0 0 8px' }}>✕</button>
      </div>
    )
  }

  // ── Elegant Web3 error message resolver ──────────────────────────────────────
  export function resolveWeb3Error(error: unknown): { message: string; subMessage: string; type: ToastType } {
    const msg = (error as { message?: string; code?: number })?.message || String(error)
    const code = (error as { code?: number })?.code

    if (code === 4001 || msg.includes('User rejected') || msg.includes('user rejected'))
      return { message: 'Acquisition declined gracefully.', subMessage: 'Transaction was not signed', type: 'warning' }

    if (msg.includes('wrong network') || msg.includes('chain') || code === 4902)
      return { message: 'Please switch to Polygon Network.', subMessage: 'Tap to switch network in your wallet', type: 'warning' }

    if (msg.includes('insufficient funds') || msg.includes('gas'))
      return { message: 'Insufficient MATIC for gas fees.', subMessage: 'Add MATIC to your wallet to proceed', type: 'error' }

    if (msg.includes('nonce') || msg.includes('replacement'))
      return { message: 'Transaction pending. Please wait.', subMessage: 'A previous transaction is still processing', type: 'info' }

    if (msg.includes('timeout') || msg.includes('network'))
      return { message: 'Network connection interrupted.', subMessage: 'Retrying with backup RPC node', type: 'warning' }

    return { message: 'Transaction could not be completed.', subMessage: 'Please try again or contact support', type: 'error' }
  }
  