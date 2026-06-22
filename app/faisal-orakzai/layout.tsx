import type { Metadata } from 'next'
  import type { ReactNode } from 'react'

  export const metadata: Metadata = {
    metadataBase: new URL('https://www.shamimforever.com'),
  }

  export default function FaisalOrakzaiLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="en">
        <body style={{ margin: 0, background: '#030303', fontFamily: 'system-ui, sans-serif' }}>
          {children}
        </body>
      </html>
    )
  }
  