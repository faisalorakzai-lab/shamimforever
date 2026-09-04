import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Tracking',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children
}