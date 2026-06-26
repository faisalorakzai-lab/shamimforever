'use client'

  export default function GlobalError({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
      <html lang="en">
        <body
          style={{
            margin: 0,
            minHeight: '100vh',
            background: '#0a0806',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
            fontFamily: "'Inter', sans-serif",
            color: '#f3ecd1',
            textAlign: 'center',
            padding: '40px 20px',
          }}
        >
          <h1 style={{ fontSize: '20px', fontWeight: 600 }}>Shamim Forever</h1>
          <p style={{ color: 'rgba(243,236,209,0.5)', fontSize: '14px' }}>
            An unexpected error occurred. Please refresh to continue.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '10px 28px',
              background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #AA771C 100%)',
              color: '#0a0806',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            REFRESH
          </button>
        </body>
      </html>
    )
  }
  