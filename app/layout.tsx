import type { Metadata } from 'next'
  import './globals.css'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import Navigation from '@/components/Navigation'
  import Footer from '@/components/Footer'

  export const metadata: Metadata = {
    title: 'Shamim Forever — Sovereign Luxury',
    description: 'A global luxury digital house. Bespoke fragrances and couture for the discerning few.',
    keywords: 'luxury fragrances, couture, bespoke, shamim forever, pakistan luxury',
    openGraph: {
      title: 'Shamim Forever — Sovereign Luxury',
      description: 'A global luxury digital house.',
      type: 'website',
    },
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className="bg-[#050505] text-zinc-200 antialiased">
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    )
  }
  