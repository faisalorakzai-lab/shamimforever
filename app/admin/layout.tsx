import type { Metadata } from 'next'
import AdminClientLayout from './AdminClientLayout'

export const metadata: Metadata = {
  title: 'Executive Panel',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>
}