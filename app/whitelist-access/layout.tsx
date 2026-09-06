import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Whitelist Access',
  description: 'A considered entry point for selected communications, private experiences, limited releases, and the evolving world of Shamim Forever.',
  alternates: {
    canonical: 'https://www.shamimforever.com/whitelist-access',
  },
  openGraph: {
    title: 'Whitelist Access | Shamim Forever',
    description: 'Enter the House before the door opens.',
    url: 'https://www.shamimforever.com/whitelist-access',
    type: 'website',
  },
}

export default function WhitelistAccessLayout({ children }: { children: React.ReactNode }) {
  return children
}