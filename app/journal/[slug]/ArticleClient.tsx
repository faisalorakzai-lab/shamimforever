'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface JournalPost {
  id: string; title: string; slug: string; excerpt: string | null
  content: string | null; cover_image: string | null; category: string | null
  published: boolean; created_at: string
}

const ease = [0.16, 1, 0.3, 1] as const

type Block = { type: 'p' | 'h2' | 'quote'; text: string }
type ArticleData = JournalPost & {
  heroImage?: string
  body: Block[]
  pullQuote: string
  secondImage: string
  secondImageCaption?: string
  secondImageStyle?: 'ecosystem' | 'standard'
  nextSlug: string; nextTitle: string; nextImage: string; nextCategory: string
}

const STATIC: Record<string, ArticleData> = {
  'founders-vision': {
    id: '0', slug: 'founders-vision', published: true, content: null,
    title: "The Founder's Vision: Why Shamim Forever Was Created",
    excerpt: 'In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy.',
    cover_image: '/founders-vision.png',
    heroImage: '/founders-portrait.jpg',
    secondImage: '/founders-ecosystem.jpg',
    secondImageCaption: 'The Orakzai Ecosystem — a sovereign network of brands built for the future.',
    secondImageStyle: 'ecosystem',
    category: 'VISION', created_at: '2025-06-01T00:00:00Z',
    pullQuote: 'True luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations.',
    nextSlug: 'sovereign-materials', nextTitle: 'Sovereign Materials', nextImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop', nextCategory: 'CRAFT',
    body: [
      { type: 'p', text: 'In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy. Shamim Forever was founded with that ambition: to build a luxury house where craftsmanship, innovation, authenticity, and timeless design come together under one vision.' },
      { type: 'p', text: 'The inspiration behind the House was simple yet powerful. Luxury should not be measured only by price or exclusivity; it should represent meaning, permanence, and the ability to be appreciated across generations. Every fragrance, every jewelry piece, every curated object, and every digital innovation introduced by Shamim Forever reflects this philosophy.' },
      { type: 'h2', text: 'A Vision Rooted in Long-Term Thinking' },
      { type: 'p', text: 'From the beginning, the objective was never to become another online retailer or trend-driven lifestyle brand. The goal was to establish an ecosystem where carefully selected creations could be appreciated not only for their beauty but also for their authenticity, provenance, and enduring value. The founder envisioned a brand that would stand confidently between traditional luxury craftsmanship and the possibilities offered by modern technology.' },
      { type: 'h2', text: 'Luxury Built on Curation' },
      { type: 'p', text: 'The modern luxury market is filled with countless products competing for attention. Shamim Forever follows a different path. The House believes that exceptional quality deserves careful selection — reflected in its own exclusive creations as well as the Guest Curation Series, where internationally respected fragrances and luxury objects are recognized for their craftsmanship. The focus remains on excellence rather than volume.' },
      { type: 'quote', text: 'True luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations.' },
      { type: 'h2', text: 'The Importance of Authenticity' },
      { type: 'p', text: 'Trust is one of the most valuable assets in luxury. Collectors increasingly expect transparent documentation and confidence in the origin of the products they acquire. For this reason, Shamim Forever embraces modern verification concepts through Digital Passports designed to strengthen authenticity and preserve provenance for eligible creations. Technology is used not to replace craftsmanship, but to reinforce it.' },
      { type: 'h2', text: 'A New Ownership Experience' },
      { type: 'p', text: "The OKBOND Lifetime Loyalty Program was created to reward long-term engagement through meaningful benefits. Eligible participants enjoy lifetime advantages such as continued savings on qualifying purchases, priority access to selected releases, and opportunities to participate more deeply in the evolving Shamim Forever ecosystem." },
      { type: 'h2', text: 'Fragrance as Wearable Identity' },
      { type: 'p', text: "For centuries, fragrance has represented memory, emotion, and personal identity. Shamim Forever approaches perfumery with this understanding, seeking compositions that balance artistry with permanence. Every fragrance is intended to become part of the wearer's story rather than simply a seasonal accessory." },
      { type: 'h2', text: 'Building a Global Community' },
      { type: 'p', text: 'The founder envisioned Shamim Forever not merely as a company but as a community of discerning individuals who value excellence, authenticity, and thoughtful design. The House aspires to serve collectors across cultures and regions while maintaining consistent standards of quality and presentation.' },
      { type: 'h2', text: 'A Legacy in Progress' },
      { type: 'p', text: 'For Shamim Forever, that vision is not limited to fragrances or jewelry. It is the pursuit of a modern luxury house where timeless craftsmanship, careful curation, verified authenticity, and meaningful relationships come together to create lasting value. Luxury may capture attention for a moment. Legacy earns its place forever.' },
    ],
  },
  'architecture-of-scent': {
    id: '1', slug: 'architecture-of-scent', published: true, content: null,
    title: 'The Architecture of Scent: Why Structure Precedes Soul',
    excerpt: 'Before fragrance can move emotion, it must first master restraint.',
    cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1800&q=90&fit=crop',
    secondImageCaption: 'The atelier works in silence. The brief is always about what to remove.',
    category: 'CRAFT', created_at: '2025-05-01T00:00:00Z',
    pullQuote: 'Restraint is not the absence of ambition. It is ambition made sovereign.',
    nextSlug: 'sovereign-materials', nextTitle: 'Sovereign Materials', nextImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop', nextCategory: 'HERITAGE',
    body: [
      { type: 'p', text: 'Before fragrance can move emotion, it must first master restraint. At the House of Shamim Forever, composition begins not with excess — but with silence, structure, and absolute discipline.' },
      { type: 'p', text: 'The atelier begins its work not with the addition of notes, but with the subtraction of the unnecessary. What remains after rigorous editing is not simplicity — it is clarity. And clarity, in the art of perfumery, is the highest form of luxury.' },
      { type: 'h2', text: 'Foundation Before Soul' },
      { type: 'p', text: 'Each accord is built like architecture: foundation first, then structure, then the finishing details that make the composition recognizable as belonging to the House. The base notes are chosen not for impact, but for permanence.' },
      { type: 'quote', text: 'Restraint is not the absence of ambition. It is ambition made sovereign.' },
      { type: 'p', text: 'The master perfumer works in silence. A great fragrance, like a great building, achieves its power through the tension between what is present and what is deliberately absent.' },
    ],
  },
  'sovereign-materials': {
    id: '2', slug: 'sovereign-materials', published: true, content: null,
    title: 'Sovereign Materials: A Journey from Khyber to Grasse',
    excerpt: 'Our master perfumer traces the ancient trade routes from Khyber to the flowering fields of Grasse.',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90&fit=crop',
    secondImageCaption: 'Jasmine and rose centifolia harvested by hand at first light in the valleys of Grasse.',
    category: 'HERITAGE', created_at: '2025-04-15T00:00:00Z',
    pullQuote: 'The ingredient is not raw material. It is inherited intelligence, compressed into essence.',
    nextSlug: 'okbond-digital-sovereignty', nextTitle: 'OKBOND: Redefining Luxury Currency', nextImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85&fit=crop', nextCategory: 'INNOVATION',
    body: [
      { type: 'p', text: 'There are trade routes older than nations. Before borders were drawn across the mountains of the Khyber, merchants carried resins, spices, and rare woods along paths worn smooth by centuries of footsteps.' },
      { type: 'p', text: 'Our master perfumer travels twice a year — once to the high altitude farms of South Asia, where oud trees grow under conditions that produce a distinctly smoky, resinous heart, and once to the valleys of Grasse, where jasmine and rose centifolia are harvested by hand at first light.' },
      { type: 'h2', text: 'The Relational Standard' },
      { type: 'p', text: 'The selection process is not merely technical. It is relational. The House has developed partnerships with specific families of growers — relationships measured not in contracts but in decades of mutual understanding.' },
      { type: 'quote', text: 'The ingredient is not raw material. It is inherited intelligence, compressed into essence.' },
      { type: 'p', text: "The journey from Khyber to Grasse is the House's declaration that the source of beauty matters as much as beauty itself. Sovereign materials produce sovereign compositions." },
    ],
  },
  'okbond-digital-sovereignty': {
    id: '3', slug: 'okbond-digital-sovereignty', published: true, content: null,
    title: 'OKBOND: Redefining Luxury Currency in the Digital Age',
    excerpt: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90&fit=crop',
    secondImageCaption: 'Digital infrastructure built to meet the same standard as everything else the House creates.',
    category: 'INNOVATION', created_at: '2025-04-01T00:00:00Z',
    pullQuote: 'The future of luxury is not scarcity of product. It is scarcity of access.',
    nextSlug: 'psychology-of-prestige', nextTitle: 'The Psychology of Prestige', nextImage: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=900&q=85&fit=crop', nextCategory: 'SOVEREIGNTY',
    body: [
      { type: 'p', text: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty — a digital infrastructure that allows the House of Shamim Forever to operate on its own terms.' },
      { type: 'h2', text: 'A Luxury Currency, Not a Points System' },
      { type: 'p', text: 'OKBOND is a luxury currency. Not a points system, not a rewards mechanism, not a gamified engagement loop. It is a unit of value that appreciates with relationship, deepens with time, and unlocks experiences that cannot be purchased by any other means.' },
      { type: 'quote', text: 'The future of luxury is not scarcity of product. It is scarcity of access.' },
      { type: 'p', text: 'OKBOND is pegged not to speculation, but to the verified luxury goods and experiences of the House. Its value is anchored in the real — in physical craftsmanship, rare materials, and curated access.' },
    ],
  },
  'psychology-of-prestige': {
    id: '4', slug: 'psychology-of-prestige', published: true, content: null,
    title: 'The Psychology of Prestige',
    excerpt: 'Prestige is not manufactured. It accumulates slowly, over decades of uncompromising decisions.',
    cover_image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=1800&q=90&fit=crop',
    secondImageCaption: 'The compound interest of consistent excellence across decades.',
    category: 'SOVEREIGNTY', created_at: '2025-03-15T00:00:00Z',
    pullQuote: 'Prestige is the compound interest of consistent excellence over time.',
    nextSlug: 'silence-new-luxury', nextTitle: 'Why Silence Is the New Luxury', nextImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop', nextCategory: 'CULTURE',
    body: [
      { type: 'p', text: 'Prestige is not manufactured. It accumulates slowly, over decades of uncompromising decisions — each one invisible to the market, and yet collectively definitive.' },
      { type: 'h2', text: 'The Compound Interest of Excellence' },
      { type: 'p', text: 'The House understands prestige as a form of compound interest. Each decision — each material chosen, each collaboration declined, each compromise refused — deposits into an account that pays dividends across generations.' },
      { type: 'quote', text: 'Prestige is the compound interest of consistent excellence over time.' },
      { type: 'p', text: 'Prestige, ultimately, is the recognition that time is the only currency that cannot be counterfeited. The House of Shamim Forever makes nothing that is designed to depreciate.' },
    ],
  },
  'silence-new-luxury': {
    id: '5', slug: 'silence-new-luxury', published: true, content: null,
    title: 'Why Silence Is the New Luxury',
    excerpt: 'In a world of maximum noise, silence has become the ultimate status signal.',
    cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1800&q=90&fit=crop',
    secondImageCaption: 'The most powerful statement a luxury house can make is often no statement at all.',
    category: 'CULTURE', created_at: '2025-03-01T00:00:00Z',
    pullQuote: 'The loudest statement a luxury house can make is to speak only when it has something worth saying.',
    nextSlug: 'future-sovereign-commerce', nextTitle: 'The Future of Sovereign Commerce', nextImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=85&fit=crop', nextCategory: 'DIGITAL LUXURY',
    body: [
      { type: 'p', text: 'In a world of maximum noise, silence has become the ultimate status signal. The House of Shamim Forever has always known this — and it shapes every decision about how, when, and through what channels we choose to communicate.' },
      { type: 'h2', text: 'Visibility vs. Value' },
      { type: 'p', text: 'The attention economy has trained brands to believe that visibility is equivalent to value. It is not. Value is accumulated through restraint, through the discipline to remain silent when the temptation to speak is greatest.' },
      { type: 'quote', text: 'The loudest statement a luxury house can make is to speak only when it has something worth saying.' },
      { type: 'p', text: 'The House does not post for engagement. We create work of such deliberate quality that those who are meant to find it will find it — drawn by the gravitational pull of genuine excellence.' },
    ],
  },
  'future-sovereign-commerce': {
    id: '6', slug: 'future-sovereign-commerce', published: true, content: null,
    title: 'The Future of Sovereign Commerce',
    excerpt: 'The next decade of luxury will be won by those with the deepest systems and the courage to build independently.',
    cover_image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90&fit=crop',
    secondImageCaption: 'Sovereignty in commerce means owning not just the product, but the entire system.',
    category: 'DIGITAL LUXURY', created_at: '2025-02-15T00:00:00Z',
    pullQuote: 'Sovereignty in commerce means owning not just the product, but the entire system through which it reaches its patron.',
    nextSlug: 'founders-vision', nextTitle: "The Founder's Vision", nextImage: '/founders-vision.png', nextCategory: 'VISION',
    body: [
      { type: 'p', text: 'The next decade of luxury will not be won by those with the largest catalogues. It will be won by those with the deepest systems — and the courage to build independently of the platforms that have come to mediate all commercial relationships.' },
      { type: 'h2', text: 'The Platform Problem' },
      { type: 'p', text: 'Sovereign commerce is not a rejection of technology. It is a refusal to cede control of the customer relationship to intermediaries who do not share the values of the House.' },
      { type: 'quote', text: 'Sovereignty in commerce means owning not just the product, but the entire system through which it reaches its patron.' },
      { type: 'p', text: 'The future of luxury commerce is not about who can reach the most people. It is about who has built the most trustworthy system for reaching exactly the right people.' },
    ],
  },
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => { setUrl(window.location.href) }, [])

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareX = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
  const shareWA = () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' — ' + url)}`, '_blank')

  return (
    <div style={{ borderTop: '1px solid #1a1d2e', borderBottom: '1px solid #1a1d2e', padding: '24px 0', margin: '48px 0', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#555', marginRight: '8px' }}>SHARE</span>

      <button onClick={copyLink}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', background: 'transparent', border: '1px solid #1a1d2e', color: copied ? '#d4af37' : '#666', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37' }}
        onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = '#1a1d2e'; e.currentTarget.style.color = '#666' } }}>
        {copied ? '✓ COPIED' : '⎘ COPY LINK'}
      </button>

      <button onClick={shareX}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', background: 'transparent', border: '1px solid #1a1d2e', color: '#666', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1d2e'; e.currentTarget.style.color = '#666' }}>
        𝕏 &nbsp;POST
      </button>

      <button onClick={shareWA}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', background: 'transparent', border: '1px solid #1a1d2e', color: '#666', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1d2e'; e.currentTarget.style.color = '#666' }}>
        ✉ WHATSAPP
      </button>
    </div>
  )
}

export default function ArticleClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<ArticleData | null>(STATIC[slug] ?? null)
  const [loading, setLoading] = useState(!STATIC[slug])
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '-18%'])

  useEffect(() => {
    if (STATIC[slug]) return
    supabase.from('journal_posts').select('*').eq('slug', slug).single()
      .then(({ data }) => {
        if (data) setPost({ ...data, body: [{ type: 'p', text: data.content ?? data.excerpt ?? '' }], pullQuote: '', secondImage: '', nextSlug: '', nextTitle: '', nextImage: '', nextCategory: '' })
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div style={{ background: '#06070f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#d4af37' }}>LOADING</span>
    </div>
  )
  if (!post) return (
    <div style={{ background: '#06070f', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#555' }}>DISPATCH NOT FOUND</span>
      <Link href="/journal" style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#d4af37', border: '1px solid #d4af3740', padding: '10px 20px' }}>RETURN TO JOURNAL</Link>
    </div>
  )

  const readTime = Math.ceil(post.body.filter(b => b.type === 'p').length * 1.5)
  const heroSrc = post.heroImage ?? post.cover_image ?? ''
  const isPortrait = !!post.heroImage

  return (
    <div style={{ background: '#06070f', color: '#e0e0e8', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>

      {/* Reading progress */}
      <motion.div className="fixed top-0 left-0 h-[2px] z-[100] origin-left" style={{ scaleX: scrollYProgress, background: '#d4af37' }} />

      {/* ── NAV BAR ── */}
      <div className="sticky top-0 z-50 border-b" style={{ background: 'rgba(6,7,15,0.97)', backdropFilter: 'blur(16px)', borderColor: '#1a1d2e' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
          <Link href="/journal" className="flex items-center gap-3 group">
            <span style={{ color: '#d4af37', fontSize: '14px' }}>←</span>
            <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#666' }}>JOURNAL</span>
          </Link>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#d4af37', letterSpacing: '3px', fontWeight: 700 }}>SF</div>
          <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#444' }}>{post.category}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', height: 'clamp(520px, 80vh, 860px)', overflow: 'hidden' }}>
        <motion.img
          src={heroSrc}
          alt={post.title}
          style={{
            y: heroY,
            position: 'absolute',
            top: 0, left: 0, right: 0,
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            objectPosition: isPortrait ? '50% 12%' : 'center 20%',
          }}
        />
        {/* Gradient — lighter overlay so face shows more */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,7,15,0.05) 0%, rgba(6,7,15,0.1) 30%, rgba(6,7,15,0.75) 68%, #06070f 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,7,15,0.12)' }} />

        {/* Hero text block */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(28px,6vw,68px)' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{post.category}</span>
              <div style={{ width: '1px', height: '10px', background: '#333' }} />
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#555' }}>
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
              </span>
              <div style={{ width: '1px', height: '10px', background: '#333' }} />
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#555' }}>{readTime} MIN READ</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 68px)', fontWeight: 700, lineHeight: 1.05, color: '#ffffff', letterSpacing: '-0.02em', maxWidth: '780px', marginBottom: '14px' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 'clamp(12px, 1.3vw, 16px)', color: '#aaa', lineHeight: 1.65, maxWidth: '580px', fontWeight: 300 }}>
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <article style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(36px,6vw,72px) clamp(20px,5vw,40px)' }}>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease }}
          style={{ width: '48px', height: '2px', background: '#d4af37', marginBottom: '44px', transformOrigin: 'left' }} />

        {post.body.map((block, i) => {
          if (block.type === 'h2') return (
            <motion.h2 key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.25, marginTop: '52px', marginBottom: '18px', letterSpacing: '-0.01em' }}>
              {block.text}
            </motion.h2>
          )
          if (block.type === 'quote') return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              style={{ margin: '48px 0', padding: '26px 30px', borderLeft: '3px solid #d4af37', background: 'rgba(212,175,55,0.05)' }}>
              <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px, 1.9vw, 22px)', fontStyle: 'italic', color: '#d4c87a', lineHeight: 1.6 }}>
                "{block.text}"
              </blockquote>
            </motion.div>
          )
          return (
            <motion.p key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              style={{ fontSize: i === 0 ? 'clamp(15px, 1.55vw, 19px)' : 'clamp(13px, 1.25vw, 16px)', fontWeight: i === 0 ? 400 : 300, color: i === 0 ? '#ccc' : '#8a8aa8', lineHeight: 1.95, marginBottom: '26px' }}>
              {block.text}
            </motion.p>
          )
        })}

        {/* ── SECOND IMAGE ── ecosystem or standard */}
        {post.secondImage && (
          post.secondImageStyle === 'ecosystem' ? (
            /* ── LUXURY ECOSYSTEM TREATMENT ── */
            <motion.div
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1.1, ease }}
              style={{ margin: '60px -20px' }}>
              {/* Gold heading */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #d4af3770)' }} />
                  <span style={{ fontSize: '9px', letterSpacing: '4px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>THE ECOSYSTEM</span>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #d4af3770)' }} />
                </div>
              </div>

              {/* Image with luxury frame */}
              <div style={{ position: 'relative', padding: '2px', background: 'linear-gradient(135deg, #d4af37 0%, #8a6914 35%, #d4af37 65%, #5a4008 100%)' }}>
                <div style={{ position: 'relative', background: '#06070f' }}>
                  <img
                    src={post.secondImage} alt="Orakzai Ecosystem"
                    style={{ width: '100%', display: 'block', aspectRatio: '1 / 1', objectFit: 'cover', opacity: 0.95 }}
                  />
                  {/* Corner overlays for luxury depth */}
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(6,7,15,0.55) 100%)' }} />
                  {/* Gold corner marks */}
                  {[['top:0;left:0', 'border-top:1px solid #d4af37;border-left:1px solid #d4af37'],
                    ['top:0;right:0', 'border-top:1px solid #d4af37;border-right:1px solid #d4af37'],
                    ['bottom:0;left:0', 'border-bottom:1px solid #d4af37;border-left:1px solid #d4af37'],
                    ['bottom:0;right:0', 'border-bottom:1px solid #d4af37;border-right:1px solid #d4af37']].map(([pos, border], ci) => (
                    <div key={ci} style={{ position: 'absolute', width: '20px', height: '20px', ...Object.fromEntries(pos.split(';').map(p => { const [k,v]=p.split(':'); return [k,v]; })), ...Object.fromEntries(border.split(';').map(p => { const [k,...v]=p.split(':'); return [k.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v.join(':')]; })) }} />
                  ))}
                </div>
              </div>

              {/* Caption */}
              {post.secondImageCaption && (
                <p style={{ textAlign: 'center', padding: '14px 16px', fontSize: '10px', color: '#666', letterSpacing: '0.05em', lineHeight: 1.6, fontStyle: 'italic' }}>
                  {post.secondImageCaption}
                </p>
              )}
            </motion.div>
          ) : (
            /* ── STANDARD IMAGE ── */
            <motion.figure
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              style={{ margin: '52px -20px' }}>
              <img src={post.secondImage} alt="" style={{ width: '100%', aspectRatio: '16/7', objectFit: 'cover', display: 'block' }} />
              {post.secondImageCaption && (
                <figcaption style={{ padding: '10px 4px 14px', fontSize: '10px', color: '#555', letterSpacing: '0.05em', lineHeight: 1.5, borderBottom: '1px solid #1a1d2e' }}>
                  {post.secondImageCaption}
                </figcaption>
              )}
            </motion.figure>
          )
        )}

        {/* ── SHARE BUTTONS ── */}
        <ShareButtons title={post.title} />

        {/* Article footer */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid #1a1d2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{post.category}</span>
          <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#444' }}>
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
        </div>
      </article>

      {/* ── NEXT ARTICLE ── */}
      {post.nextSlug && (
        <motion.section
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          style={{ borderTop: '1px solid #1a1d2e' }}>
          <Link href={`/journal/${post.nextSlug}`} className="grid grid-cols-1 md:grid-cols-2 group">
            <div style={{ padding: 'clamp(36px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid #1a1d2e' }} className="md:border-b-0 md:border-r border-[#1a1d2e]">
              <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#555', marginBottom: '10px', display: 'block' }}>NEXT DISPATCH</span>
              <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#d4af37', marginBottom: '14px', display: 'block' }}>{post.nextCategory}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 2.6vw, 36px)', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.01em' }} className="group-hover:text-[#d4af37] transition-colors duration-500">
                {post.nextTitle}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-5 h-px group-hover:w-10 transition-all duration-500" style={{ background: '#d4af37' }} />
                <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#d4af37' }}>READ ARTICLE →</span>
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '240px' }}>
              <img src={post.nextImage} alt={post.nextTitle}
                className="w-full h-full group-hover:scale-[1.05] transition-transform duration-[2000ms]"
                style={{ objectFit: 'cover', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,7,15,0.3)' }} />
            </div>
          </Link>
        </motion.section>
      )}

      {/* ── FOOTER ── */}
      <div style={{ borderTop: '1px solid #1a1d2e', padding: '24px clamp(20px,5vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/journal" style={{ fontSize: '9px', letterSpacing: '3px', color: '#555', display: 'flex', alignItems: 'center', gap: '10px' }} className="hover:text-[#d4af37] transition-colors">
          <span style={{ color: '#d4af37' }}>←</span> JOURNAL
        </Link>
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#d4af37', letterSpacing: '2px' }}>SHAMIM FOREVER</Link>
        <Link href="/shop" style={{ fontSize: '9px', letterSpacing: '3px', color: '#555' }} className="hover:text-[#d4af37] transition-colors">SHOP →</Link>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #06070f; }
        ::-webkit-scrollbar-thumb { background: #d4af3770; }
      `}</style>
    </div>
  )
}
