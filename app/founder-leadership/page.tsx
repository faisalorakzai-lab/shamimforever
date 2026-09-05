import type { Metadata } from 'next'
import TeamPage from '@/app/team/page'

export const metadata: Metadata = {
  title: 'Founder & Leadership | Shamim Forever',
  description: 'Meet Faisal Orakzai, Dr Asma Orakzai, and Laiba Faisal Orakzai — the founders and leadership of Shamim Forever.',
  alternates: { canonical: 'https://www.shamimforever.com/founder-leadership' },
}

export default function FounderLeadershipPage() {
  return <TeamPage />
}
