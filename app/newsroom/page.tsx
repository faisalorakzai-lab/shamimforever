import type { Metadata } from 'next'
import NewsPage from '@/app/news/page'

export const metadata: Metadata = {
  title: 'Newsroom | Shamim Forever',
  description: 'Press releases, announcements, product launches, company news, and founder news from Shamim Forever.',
  alternates: { canonical: 'https://www.shamimforever.com/newsroom' },
}

export default function NewsroomPage() {
  return <NewsPage />
}
