import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Authentication',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function AuthenticateLayout({ children }: { children: React.ReactNode }) {
  return children
}