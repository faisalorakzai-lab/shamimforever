'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface JournalPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  category: string | null
  published: boolean
  created_at: string
}

const ease = [0.16, 1, 0.3, 1] as const

type ArticleData = JournalPost & {
  body: { type: 'p' | 'h2' | 'quote'; text: string }[]
  pullQuote: string
  secondImage: string
  secondImageCaption?: string
  nextSlug: string
  nextTitle: string
  nextImage: string
  nextCategory: string
}

const STATIC: Record<string, ArticleData> = {
  'founders-vision': {
    id: '0', slug: 'founders-vision', published: true, content: null,
    title: "The Founder's Vision: Why Shamim Forever Was Created",
    excerpt: 'In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy.',
    cover_image: '/founders-vision.png',
    secondImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&fit=crop',
    secondImageCaption: 'Each material chosen by the House carries the weight of a deliberate, irreversible decision.',
    category: 'VISION',
    created_at: '2025-06-01T00:00:00Z',
    pullQuote: 'True luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations.',
    nextSlug: 'sovereign-materials',
    nextTitle: 'Sovereign Materials',
    nextImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop',
    nextCategory: 'CRAFT',
    body: [
      { type: 'p', text: 'In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy. Shamim Forever was founded with that ambition: to build a luxury house where craftsmanship, innovation, authenticity, and timeless design come together under one vision.' },
      { type: 'p', text: 'The inspiration behind the House was simple yet powerful. Luxury should not be measured only by price or exclusivity; it should represent meaning, permanence, and the ability to be appreciated across generations. Every fragrance, every jewelry piece, every curated object, and every digital innovation introduced by Shamim Forever reflects this philosophy.' },
      { type: 'h2', text: 'A Vision Rooted in Long-Term Thinking' },
      { type: 'p', text: 'From the beginning, the objective was never to become another online retailer or trend-driven lifestyle brand. The goal was to establish an ecosystem where carefully selected creations could be appreciated not only for their beauty but also for their authenticity, provenance, and enduring value.' },
      { type: 'p', text: 'The founder envisioned a brand that would stand confidently between traditional luxury craftsmanship and the possibilities offered by modern technology. Rather than replacing heritage, innovation would strengthen it. This vision continues to shape every decision made by the House.' },
      { type: 'h2', text: 'Luxury Built on Curation' },
      { type: 'p', text: 'The modern luxury market is filled with countless products competing for attention. Shamim Forever follows a different path. The House believes that exceptional quality deserves careful selection — reflected in its own exclusive creations as well as the Guest Curation Series, where internationally respected fragrances and luxury objects are recognized for their craftsmanship and added to the broader ecosystem. The focus remains on excellence rather than volume.' },
      { type: 'quote', text: 'True luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations.' },
      { type: 'h2', text: 'The Importance of Authenticity' },
      { type: 'p', text: 'Trust is one of the most valuable assets in luxury. Collectors increasingly expect transparent documentation and confidence in the origin of the products they acquire. For this reason, Shamim Forever embraces modern verification concepts through Digital Passports designed to strengthen authenticity and preserve provenance for eligible creations. Technology is used not to replace craftsmanship, but to reinforce it.' },
      { type: 'h2', text: 'Introducing a New Ownership Experience' },
      { type: 'p', text: "The founder's vision extends beyond the initial purchase. Luxury should create an ongoing relationship between the House and the collector. This belief inspired the development of the OKBOND Lifetime Loyalty Program, designed to reward long-term engagement through meaningful benefits. Eligible participants enjoy lifetime advantages such as continued savings on qualifying purchases, priority access to selected releases, and opportunities to participate more deeply in the evolving Shamim Forever ecosystem." },
      { type: 'h2', text: 'Fragrance as Wearable Identity' },
      { type: 'p', text: 'For centuries, fragrance has represented memory, emotion, and personal identity. Shamim Forever approaches perfumery with this understanding, seeking compositions that balance artistry with permanence. Every fragrance is intended to become part of the wearer\'s story rather than simply a seasonal accessory.' },
      { type: 'h2', text: 'Jewelry Designed for Generations' },
      { type: 'p', text: 'Fine jewelry occupies a unique place within the House\'s vision. Rather than focusing solely on decoration, jewelry is viewed as an enduring object capable of carrying emotional significance across generations. Precious metals, gemstones, and refined craftsmanship combine to create pieces that celebrate milestones, preserve memories, and express individuality. Many of these creations are conceived as heirlooms intended to outlive trends and retain meaning over decades.' },
      { type: 'h2', text: 'Building a Global Community' },
      { type: 'p', text: 'The founder envisioned Shamim Forever not merely as a company but as a community of discerning individuals who value excellence, authenticity, and thoughtful design. Whether engaging with fragrances, jewelry, curated cosmetics, or collectible archive objects, members of this community share an appreciation for products chosen with care and presented with integrity. The House aspires to serve collectors across cultures and regions while maintaining consistent standards of quality and presentation.' },
      { type: 'h2', text: 'A Legacy in Progress' },
      { type: 'p', text: 'Every great institution begins with a vision. For Shamim Forever, that vision is not limited to fragrances or jewelry. It is the pursuit of a modern luxury house where timeless craftsmanship, careful curation, verified authenticity, and meaningful relationships come together to create lasting value.' },
      { type: 'p', text: 'The founder believes that true luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations. As Shamim Forever continues to evolve, its purpose remains clear: to offer a destination where exceptional creations are discovered, appreciated, and remembered — not simply for what they are, but for what they represent. Luxury may capture attention for a moment. Legacy earns its place forever.' },
    ],
  },
  'architecture-of-scent': {
    id: '1', slug: 'architecture-of-scent', published: true, content: null,
    title: 'The Architecture of Scent: Why Structure Precedes Soul',
    excerpt: 'Before fragrance can move emotion, it must first master restraint.',
    cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1800&q=90&fit=crop',
    secondImageCaption: 'The atelier works in silence. The brief is always about what to remove.',
    category: 'CRAFT',
    created_at: '2025-05-01T00:00:00Z',
    pullQuote: 'Restraint is not the absence of ambition. It is ambition made sovereign.',
    nextSlug: 'sovereign-materials',
    nextTitle: 'Sovereign Materials',
    nextImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop',
    nextCategory: 'HERITAGE',
    body: [
      { type: 'p', text: 'Before fragrance can move emotion, it must first master restraint. At the House of Shamim Forever, composition begins not with excess — but with silence, structure, and absolute discipline.' },
      { type: 'p', text: 'The atelier begins its work not with the addition of notes, but with the subtraction of the unnecessary. What remains after rigorous editing is not simplicity — it is clarity. And clarity, in the art of perfumery, is the highest form of luxury.' },
      { type: 'h2', text: 'Foundation Before Soul' },
      { type: 'p', text: 'Each accord is built like architecture: foundation first, then structure, then the finishing details that make the composition recognizable as belonging to the House. The base notes are chosen not for impact, but for permanence. They must endure — not just across hours of wear, but across decades of memory.' },
      { type: 'quote', text: 'Restraint is not the absence of ambition. It is ambition made sovereign.' },
      { type: 'p', text: 'The master perfumer works in silence. The brief is never about what to add. It is always about what to remove. A great fragrance, like a great building, achieves its power through the tension between what is present and what is deliberately absent.' },
      { type: 'p', text: 'This is the architecture of scent. Not a metaphor, but a discipline. Not an aesthetic, but a philosophy. The House creates not for the moment of application, but for the long arc of impression — the way a person will be remembered long after they have left the room.' },
    ],
  },
  'sovereign-materials': {
    id: '2', slug: 'sovereign-materials', published: true, content: null,
    title: 'Sovereign Materials: A Journey from Khyber to Grasse',
    excerpt: 'Our master perfumer traces the ancient trade routes from Khyber to the flowering fields of Grasse.',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90&fit=crop',
    secondImageCaption: 'Jasmine and rose centifolia harvested by hand at first light in the valleys of Grasse.',
    category: 'HERITAGE',
    created_at: '2025-04-15T00:00:00Z',
    pullQuote: 'The ingredient is not raw material. It is inherited intelligence, compressed into essence.',
    nextSlug: 'okbond-digital-sovereignty',
    nextTitle: 'OKBOND: Redefining Luxury Currency',
    nextImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85&fit=crop',
    nextCategory: 'INNOVATION',
    body: [
      { type: 'p', text: 'There are trade routes older than nations. Before borders were drawn across the mountains of the Khyber, merchants carried resins, spices, and rare woods along paths worn smooth by centuries of footsteps.' },
      { type: 'p', text: 'Our master perfumer travels twice a year — once to the high altitude farms of South Asia, where oud trees grow under conditions that produce a distinctly smoky, resinous heart, and once to the valleys of Grasse, where jasmine and rose centifolia are harvested by hand at first light.' },
      { type: 'h2', text: 'The Relational Standard' },
      { type: 'p', text: 'The selection process is not merely technical. It is relational. The House has developed partnerships with specific families of growers — relationships measured not in contracts but in decades of mutual understanding. We know their land. They know our standards.' },
      { type: 'quote', text: 'The ingredient is not raw material. It is inherited intelligence, compressed into essence.' },
      { type: 'p', text: 'Luxury, in the truest sense, is not about price. It is about provenance. When you wear a fragrance from the House, you are wearing the distilled intelligence of specific places, specific seasons, and specific hands.' },
      { type: 'p', text: "The journey from Khyber to Grasse is more than geographic. It is the House's declaration that the source of beauty matters as much as beauty itself. Sovereign materials produce sovereign compositions. And sovereignty begins with the decision never to compromise on origin." },
    ],
  },
  'okbond-digital-sovereignty': {
    id: '3', slug: 'okbond-digital-sovereignty', published: true, content: null,
    title: 'OKBOND: Redefining Luxury Currency in the Digital Age',
    excerpt: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90&fit=crop',
    secondImageCaption: 'Digital infrastructure built to meet the same standard as everything else the House creates.',
    category: 'INNOVATION',
    created_at: '2025-04-01T00:00:00Z',
    pullQuote: 'The future of luxury is not scarcity of product. It is scarcity of access.',
    nextSlug: 'psychology-of-prestige',
    nextTitle: 'The Psychology of Prestige',
    nextImage: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=900&q=85&fit=crop',
    nextCategory: 'SOVEREIGNTY',
    body: [
      { type: 'p', text: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty — a digital infrastructure that allows the House of Shamim Forever to operate on its own terms in a world defined by platform dependency.' },
      { type: 'h2', text: 'A Luxury Currency, Not a Points System' },
      { type: 'p', text: 'OKBOND is a luxury currency. Not a points system, not a rewards mechanism, not a gamified engagement loop. It is a unit of value that appreciates with relationship, deepens with time, and unlocks experiences that cannot be purchased by any other means.' },
      { type: 'p', text: 'The distinction is critical. In a conventional loyalty program, the brand holds all the value and distributes it conditionally. In OKBOND, the holder accumulates genuine equity in their relationship with the House. The token is a record of trust, of patronage, of belonging.' },
      { type: 'quote', text: 'The future of luxury is not scarcity of product. It is scarcity of access.' },
      { type: 'p', text: 'The infrastructure we have built is designed to be immune to the volatility of conventional markets. OKBOND is pegged not to speculation, but to the verified luxury goods and experiences of the House. Its value is anchored in the real — in physical craftsmanship, rare materials, and curated access.' },
      { type: 'p', text: 'This is not disruption. This is architecture. The House has always built for permanence. OKBOND is our declaration that digital infrastructure must meet the same standard as everything else we make: it must endure, command trust, and reward those who understand the difference between price and value.' },
    ],
  },
  'psychology-of-prestige': {
    id: '4', slug: 'psychology-of-prestige', published: true, content: null,
    title: 'The Psychology of Prestige',
    excerpt: 'Prestige is not manufactured. It accumulates slowly, over decades of uncompromising decisions.',
    cover_image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=1800&q=90&fit=crop',
    secondImageCaption: 'The compound interest of consistent excellence across decades.',
    category: 'SOVEREIGNTY',
    created_at: '2025-03-15T00:00:00Z',
    pullQuote: 'Prestige is the compound interest of consistent excellence over time.',
    nextSlug: 'silence-new-luxury',
    nextTitle: 'Why Silence Is the New Luxury',
    nextImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop',
    nextCategory: 'CULTURE',
    body: [
      { type: 'p', text: 'Prestige is not manufactured. It accumulates slowly, over decades of uncompromising decisions — each one invisible to the market, and yet collectively definitive.' },
      { type: 'p', text: 'The psychology of prestige operates on a paradox: the more aggressively it is pursued, the more rapidly it diminishes. True prestige is the residue of authentic conviction. It cannot be acquired through marketing spend, celebrity association, or artificial scarcity.' },
      { type: 'h2', text: 'The Compound Interest of Excellence' },
      { type: 'p', text: 'The House understands prestige as a form of compound interest. Each decision — each material chosen, each collaboration declined, each compromise refused — deposits into an account that pays dividends across generations.' },
      { type: 'quote', text: 'Prestige is the compound interest of consistent excellence over time.' },
      { type: 'p', text: 'What separates the merely expensive from the genuinely prestigious is the quality of the decisions made when no one is watching. When the supplier offers a slightly inferior ingredient at a significant discount. When the opportunity to expand rapidly appears, dressed as progress. The prestigious house declines. Quietly. Without announcement.' },
      { type: 'p', text: 'Prestige, ultimately, is the recognition that time is the only currency that cannot be counterfeited. The House of Shamim Forever makes nothing that is designed to depreciate. We create for the long arc — for the collector who will pass it forward, for the legacy that outlasts its maker.' },
    ],
  },
  'silence-new-luxury': {
    id: '5', slug: 'silence-new-luxury', published: true, content: null,
    title: 'Why Silence Is the New Luxury',
    excerpt: 'In a world of maximum noise, silence has become the ultimate status signal.',
    cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1800&q=90&fit=crop',
    secondImageCaption: 'The most powerful statement a luxury house can make is often no statement at all.',
    category: 'CULTURE',
    created_at: '2025-03-01T00:00:00Z',
    pullQuote: 'The loudest statement a luxury house can make is to speak only when it has something worth saying.',
    nextSlug: 'future-sovereign-commerce',
    nextTitle: 'The Future of Sovereign Commerce',
    nextImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=85&fit=crop',
    nextCategory: 'DIGITAL LUXURY',
    body: [
      { type: 'p', text: 'In a world of maximum noise, silence has become the ultimate status signal. The House of Shamim Forever has always known this — and it shapes every decision about how, when, and through what channels we choose to communicate.' },
      { type: 'h2', text: 'Visibility vs. Value' },
      { type: 'p', text: 'The attention economy has trained brands to believe that visibility is equivalent to value. It is not. Visibility is available to anyone with a marketing budget. Value is accumulated through restraint, through the discipline to remain silent when the temptation to speak is greatest.' },
      { type: 'p', text: 'Consider the most enduring luxury institutions. They do not announce. They do not explain. They simply exist — with a confidence so complete that it requires no validation from external voices. Their silence is not absence. It is authority.' },
      { type: 'quote', text: 'The loudest statement a luxury house can make is to speak only when it has something worth saying.' },
      { type: 'p', text: 'The House does not post for engagement. We do not optimize for reach. We create work of such deliberate quality that those who are meant to find it will find it — drawn not by algorithmic amplification but by the gravitational pull of genuine excellence.' },
      { type: 'p', text: 'Silence, in the age of noise, is the rarest material of all. The House hoards it carefully — releasing communication only when it has something to say that could not be said more powerfully by saying nothing.' },
    ],
  },
  'future-sovereign-commerce': {
    id: '6', slug: 'future-sovereign-commerce', published: true, content: null,
    title: 'The Future of Sovereign Commerce',
    excerpt: 'The next decade of luxury will be won by those with the deepest systems and the courage to build independently.',
    cover_image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90&fit=crop',
    secondImageCaption: 'Sovereignty in commerce means owning not just the product, but the entire system through which it reaches its patron.',
    category: 'DIGITAL LUXURY',
    created_at: '2025-02-15T00:00:00Z',
    pullQuote: 'Sovereignty in commerce means owning not just the product, but the entire system through which it reaches its patron.',
    nextSlug: 'founders-vision',
    nextTitle: "The Founder's Vision",
    nextImage: '/founders-vision.png',
    nextCategory: 'VISION',
    body: [
      { type: 'p', text: 'The next decade of luxury will not be won by those with the largest catalogues. It will be won by those with the deepest systems — and the courage to build independently of the platforms that have come to mediate all commercial relationships.' },
      { type: 'h2', text: 'The Platform Problem' },
      { type: 'p', text: 'Sovereign commerce is not a rejection of technology. It is a refusal to cede control of the customer relationship to intermediaries who do not share the values of the House. When a luxury brand distributes through a platform that also distributes mass-market goods, it does not gain exposure. It loses identity.' },
      { type: 'p', text: 'The House of Shamim Forever is building its own infrastructure — its own discovery channels, its own customer relationships, its own currency. Not because we are hostile to commerce, but because we understand that the quality of the experience is inseparable from the quality of the system that delivers it.' },
      { type: 'quote', text: 'Sovereignty in commerce means owning not just the product, but the entire system through which it reaches its patron.' },
      { type: 'p', text: 'The patron of a sovereign luxury house should feel, at every point of contact, that they are in a world apart. Not in a marketplace, but in a house. Not completing a transaction, but deepening a relationship. This feeling is impossible to engineer when the infrastructure belongs to someone else.' },
      { type: 'p', text: 'The future of luxury commerce is not about who can reach the most people. It is about who has built the most trustworthy system for reaching exactly the right people — and delivering an experience so complete that the question of alternatives simply does not arise.' },
    ],
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<ArticleData | null>(STATIC[params.slug] ?? null)
  const [loading, setLoading] = useState(!STATIC[params.slug])
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '-18%'])

  useEffect(() => {
    if (STATIC[params.slug]) return
    supabase.from('journal_posts').select('*').eq('slug', params.slug).single()
      .then(({ data }) => {
        if (data) setPost({ ...data, body: [{ type: 'p', text: data.content ?? data.excerpt ?? '' }], pullQuote: '', secondImage: '', nextSlug: '', nextTitle: '', nextImage: '', nextCategory: '' })
        setLoading(false)
      })
  }, [params.slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#06070f' }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#d4af37' }}>LOADING</span>
    </div>
  )
  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#06070f' }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#555' }}>DISPATCH NOT FOUND</span>
      <Link href="/journal" style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#d4af37', border: '1px solid #d4af3740', padding: '10px 20px' }}>RETURN TO JOURNAL</Link>
    </div>
  )

  const readTime = Math.ceil(post.body.filter(b => b.type === 'p').length * 1.5)

  return (
    <div style={{ background: '#06070f', color: '#e0e0e8', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>

      {/* Reading progress */}
      <motion.div className="fixed top-0 left-0 h-[2px] z-[100] origin-left" style={{ scaleX: scrollYProgress, background: '#d4af37' }} />

      {/* ── TOP NAV BAR ── Bloomberg-style thin header */}
      <div className="sticky top-0 z-50 border-b" style={{ background: 'rgba(6,7,15,0.97)', backdropFilter: 'blur(16px)', borderColor: '#1a1d2e' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
          <Link href="/journal" className="flex items-center gap-3 group">
            <span style={{ color: '#d4af37', fontSize: '14px' }}>←</span>
            <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#666', fontFamily: "'Inter', sans-serif" }}>JOURNAL</span>
          </Link>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#d4af37', letterSpacing: '3px', fontWeight: 700 }}>SF</div>
          <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#444' }}>{post.category}</span>
        </div>
      </div>

      {/* ── HERO — full-bleed image with parallax ── */}
      <section ref={heroRef} style={{ position: 'relative', height: 'clamp(480px, 70vh, 780px)', overflow: 'hidden' }}>
        {/* Parallax image — extends below container so it has room to slide */}
        <motion.img
          src={post.cover_image ?? ''}
          alt={post.title}
          style={{
            y: heroY,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            /* 65% horizontal focuses on center-right where the person stands,
               20% vertical shows the face / upper body prominently */
            objectPosition: post.slug === 'founders-vision' ? '65% 20%' : 'center 20%',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,7,15,0.0) 0%, rgba(6,7,15,0.15) 35%, rgba(6,7,15,0.85) 75%, #06070f 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,7,15,0.18)' }} />

        {/* Hero text — vertically centered bottom-third */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(32px,6vw,72px)' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            {/* Category + date bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>{post.category}</span>
              <div style={{ width: '1px', height: '12px', background: '#333' }} />
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#555' }}>
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
              </span>
              <div style={{ width: '1px', height: '12px', background: '#333' }} />
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#555' }}>{readTime} MIN READ</span>
            </div>

            {/* Big title */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 5.5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              maxWidth: '820px',
              marginBottom: '16px',
            }}>
              {post.title}
            </h1>

            {/* Deck / excerpt */}
            <p style={{ fontSize: 'clamp(13px, 1.4vw, 17px)', color: '#aaa', lineHeight: 1.6, maxWidth: '620px', fontWeight: 300 }}>
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE BODY — Bloomberg editorial layout ── */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,40px)' }}>

        {/* Thin gold rule after hero */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease }}
          style={{ width: '48px', height: '2px', background: '#d4af37', marginBottom: '48px', transformOrigin: 'left' }} />

        {post.body.map((block, i) => {
          if (block.type === 'h2') return (
            <motion.h2 key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(20px, 2.4vw, 28px)',
                fontWeight: 700,
                color: '#f0f0f0',
                lineHeight: 1.25,
                marginTop: '56px',
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}>
              {block.text}
            </motion.h2>
          )

          if (block.type === 'quote') return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              style={{
                margin: '52px 0',
                padding: '28px 32px',
                borderLeft: '3px solid #d4af37',
                background: 'rgba(212,175,55,0.04)',
              }}>
              <blockquote style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontStyle: 'italic',
                color: '#d4c87a',
                lineHeight: 1.6,
                fontWeight: 400,
              }}>
                "{block.text}"
              </blockquote>
            </motion.div>
          )

          // type === 'p'
          const isLead = i === 0
          return (
            <motion.p key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: isLead ? 0 : 0.05, ease }}
              style={{
                fontSize: isLead ? 'clamp(16px, 1.6vw, 20px)' : 'clamp(14px, 1.3vw, 17px)',
                fontWeight: isLead ? 500 : 300,
                color: isLead ? '#d0d0de' : '#9a9ab0',
                lineHeight: 1.9,
                marginBottom: '28px',
                letterSpacing: '0.01em',
              }}>
              {block.text}
            </motion.p>
          )
        })}

        {/* Second editorial image — full article width */}
        {post.secondImage && (
          <motion.figure
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            style={{ margin: '56px -20px', position: 'relative' }}>
            <img
              src={post.secondImage}
              alt=""
              style={{ width: '100%', aspectRatio: '16/7', objectFit: 'cover', display: 'block' }}
            />
            {post.secondImageCaption && (
              <figcaption style={{ padding: '10px 4px', fontSize: '10px', color: '#555', letterSpacing: '0.05em', lineHeight: 1.5, borderBottom: '1px solid #1a1d2e', paddingBottom: '12px' }}>
                {post.secondImageCaption}
              </figcaption>
            )}
          </motion.figure>
        )}

        {/* Article-end rule + share line */}
        <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid #1a1d2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{post.category}</span>
          <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#444' }}>
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
        </div>
      </article>

      {/* ── NEXT ARTICLE — Bloomberg bottom card ── */}
      {post.nextSlug && (
        <motion.section
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          style={{ borderTop: '1px solid #1a1d2e', marginTop: '0' }}>
          <Link href={`/journal/${post.nextSlug}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="group">
            {/* Text side */}
            <div style={{ padding: 'clamp(40px,6vw,72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #1a1d2e' }}>
              <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#555', marginBottom: '12px', display: 'block' }}>NEXT DISPATCH</span>
              <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#d4af37', marginBottom: '16px', display: 'block' }}>{post.nextCategory}</span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 2.8vw, 38px)',
                fontWeight: 700,
                color: '#f0f0f0',
                lineHeight: 1.1,
                marginBottom: '28px',
                letterSpacing: '-0.01em',
                transition: 'color 0.5s',
              }} className="group-hover:text-[#d4af37]">
                {post.nextTitle}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '1px', background: '#d4af37', transition: 'width 0.5s' }} className="group-hover:w-12" />
                <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#d4af37' }}>READ ARTICLE →</span>
              </div>
            </div>

            {/* Image side */}
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: 'auto', minHeight: '280px' }}>
              <img
                src={post.nextImage} alt={post.nextTitle}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 2s cubic-bezier(0.16,1,0.3,1)' }}
                className="group-hover:scale-[1.05]"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,7,15,0.3)' }} />
            </div>
          </Link>
        </motion.section>
      )}

      {/* ── FOOTER NAV ── */}
      <div style={{ borderTop: '1px solid #1a1d2e', padding: '28px clamp(20px,5vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/journal" style={{ fontSize: '9px', letterSpacing: '3px', color: '#555', display: 'flex', alignItems: 'center', gap: '10px', transition: 'color 0.3s' }} className="hover:text-[#d4af37]">
          <span style={{ color: '#d4af37' }}>←</span> JOURNAL
        </Link>
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#d4af37', letterSpacing: '2px' }}>SHAMIM FOREVER</Link>
        <Link href="/shop" style={{ fontSize: '9px', letterSpacing: '3px', color: '#555', transition: 'color 0.3s' }} className="hover:text-[#d4af37]">
          SHOP →
        </Link>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #06070f; }
        ::-webkit-scrollbar-thumb { background: #d4af3770; }
        @media (max-width: 640px) {
          section[style*='grid-template-columns'] { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
