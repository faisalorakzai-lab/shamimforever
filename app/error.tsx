'use client'

  import { useEffect } from 'react'
  import Link from 'next/link'

  export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    useEffect(() => {
      console.error('Page error:', error)
    }, [error])

    return (
      <div style={{ minHeight: '100vh', background: '#0a0806', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px', fontFamily: "'Inter', sans-serif", padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #AA771C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
          ✦
        </div>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#f3ecd1', marginBottom: '10px', letterSpacing: '-0.01em' }}>
            Something went wrong
          </h1>
          <p style={{ color: 'rgba(243,236,209,0.45)', fontSize: '14px', maxWidth: '400px' }}>
            A momentary interruption. Our sovereign systems are resolving this.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={reset} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #AA771C 100%)', color: '#0a0806', border: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', cursor: 'pointer' }}>
            TRY AGAIN
          </button>
          <Link href="/" style={{ padding: '10px 24px', background: 'transparent', color: '#c9b87a', border: '1px solid rgba(201,184,122,0.3)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textDecoration: 'none' }}>
            RETURN HOME
          </Link>
        </div>
      </div>
    )
  }
  