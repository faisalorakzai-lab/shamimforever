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

const easing = [0.16, 1, 0.3, 1]

const STATIC_ARTICLES: Record<string, JournalPost & { body: string[]; pullQuote: string; secondImage: string }> = {
  'architecture-of-scent': {
    id: '1',
    title: 'The Architecture of Scent',
    slug: 'architecture-of-scent',
    excerpt: 'Before fragrance can move emotion, it must first master restraint.',
    cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1800&q=90&fit=crop',
    category: 'CRAFT',
    published: true,
    created_at: '2025-05-01T00:00:00Z',
    content: null,
    pullQuote: 'Restraint is not the absence of ambition. It is ambition made sovereign.',
    body: [
      'Before fragrance can move emotion, it must first master restraint. At the House of Shamim Forever, composition begins not with excess — but with silence, structure, and balance.',
      'The atelier begins its work not with the addition of notes, but with the subtraction of the unnecessary. What remains after rigorous editing is not simplicity — it is clarity. And clarity, in the art of perfumery, is the highest form of luxury.',
      'Each accord is built like architecture: foundation first, then structure, then the finishing details that make the composition recognizable as belonging to the House. The base notes are chosen not for impact, but for permanence. They must endure — not just across hours of wear, but across decades of memory.',
      'The master perfumer works in silence. The brief is never about what to add. It is always about what to remove. A great fragrance, like a great building, achieves its power through the tension between what is present and what is deliberately absent.',
      'This is the architecture of scent. Not a metaphor, but a discipline. Not an aesthetic, but a philosophy. The House creates not for the moment of application, but for the long arc of impression — the way a person will be remembered long after they have left the room.',
    ],
  },
  'sovereign-materials': {
    id: '2',
    title: 'Sovereign Materials',
    slug: 'sovereign-materials',
    excerpt: 'A journey from the Khyber passes to the flowering fields of Grasse.',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90&fit=crop',
    category: 'HERITAGE',
    published: true,
    created_at: '2025-04-01T00:00:00Z',
    content: null,
    pullQuote: 'The ingredient is not raw material. It is inherited intelligence, compressed into essence.',
    body: [
      'There are trade routes older than nations. Before borders were drawn across the mountains of the Khyber, merchants carried resins, spices, and rare woods along paths worn smooth by centuries of footsteps. The House of Shamim Forever traces its sourcing philosophy directly to these ancient lines of exchange.',
      'Our master perfumer travels twice a year — once to the high altitude farms of South Asia, where oud trees grow in controlled cultivation under conditions that produce a distinctly smoky, resinous heart, and once to the valleys of Grasse in the south of France, where the world\'s finest jasmine, rose centifolia, and tuberose are harvested by hand at first light.',
      'The selection process is not merely technical. It is relational. The House has developed partnerships with specific families of growers — relationships measured not in contracts but in decades of mutual understanding. We know their land. They know our standards.',
      'Luxury, in the truest sense, is not about price. It is about provenance. When you wear a fragrance from the House, you are wearing the distilled intelligence of specific places, specific seasons, and specific hands. That traceability is not a marketing claim — it is an ethical commitment.',
      'The journey from Khyber to Grasse is more than geographic. It is the House\'s declaration that the source of beauty matters as much as beauty itself. Sovereign materials produce sovereign compositions. And sovereignty begins with the decision never to compromise on origin.',
    ],
  },
  'okbond-digital-sovereignty': {
    id: '3',
    title: 'OKBOND: Digital Sovereignty',
    slug: 'okbond-digital-sovereignty',
    excerpt: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereign currency.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90&fit=crop',
    category: 'INNOVATION',
    published: true,
    created_at: '2025-03-01T00:00:00Z',
    content: null,
    pullQuote: 'The future of luxury is not scarcity of product. It is scarcity of access.',
    body: [
      'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty — a digital infrastructure that allows the House of Shamim Forever to exist and operate on its own terms in a world increasingly defined by platform dependency.',
      'OKBOND is a luxury currency. Not a points system, not a rewards mechanism, not a gamified engagement loop. It is a unit of value that appreciates with relationship, deepens with time, and unlocks experiences that cannot be purchased by any other means.',
      'The distinction is critical. In a conventional loyalty program, the brand holds all the value and distributes it conditionally. In OKBOND, the holder accumulates genuine equity in their relationship with the House. The token is a record of trust, of patronage, of belonging to a community that predates digital commerce and will outlast it.',
      'The infrastructure we have built is designed to be immune to the volatility of conventional cryptocurrency markets. OKBOND is pegged not to speculation, but to the verified luxury goods and experiences of the House. Its value is anchored in the real — in the physical craftsmanship, the rare materials, and the curated access that define what the House creates.',
      'This is not disruption. This is architecture. The House has always built for permanence. OKBOND is our declaration that digital infrastructure must meet the same standard as everything else we make: it must endure, it must command trust, and it must reward those who understand the difference between price and value.',
    ],
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<(JournalPost & { body?: string[]; pullQuote?: string; secondImage?: string }) | null>(null)
  const [loading, setLoading] = useState(true)
  const articleRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08])

  useEffect(() => {
    const staticData = STATIC_ARTICLES[params.slug]
    if (staticData) {
      setPost(staticData)
      setLoading(false)
      return
    }
    supabase
      .from('journal_posts')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single()
      .then(({ data }) => {
        setPost(data ?? null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="luxury-meta text-zinc-700">Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-8">
        <p className="luxury-meta">Dispatch not found</p>
        <Link href="/journal" className="luxury-btn text-[9px]">Return to Journal</Link>
      </div>
    )
  }

  const staticArticle = STATIC_ARTICLES[params.slug]
  const bodyParagraphs = staticArticle?.body ?? (post.content ? [post.content] : [post.excerpt ?? ''])
  const pullQuote = staticArticle?.pullQuote ?? ''
  const secondImage = staticArticle?.secondImage ?? post.cover_image ?? ''

  return (
    <div className="min-h-screen bg-[#050505]" ref={articleRef}>

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[1px] bg-[#c9a054] z-[100] origin-left"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 origin-center">
          <img
            src={post.cover_image ?? 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90&fit=crop'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-[#050505]/40" />
        </motion.div>

        {/* Category + Back */}
        <div className="absolute top-24 left-0 right-0 px-6 md:px-12 lg:px-24 flex items-center justify-between z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easing }}
          >
            <Link href="/journal" className="luxury-meta text-zinc-600 hover:text-[#c9a054] transition-colors duration-500">
              ← Journal
            </Link>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easing }}
            className="luxury-meta"
          >
            {post.category}
          </motion.span>
        </div>
      </section>

      {/* ─── TITLE BLOCK ─── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto -mt-32 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing }}
          className="max-w-4xl"
        >
          <h1 className="font-serif font-light tracking-[0.1em] text-5xl md:text-7xl lg:text-8xl text-zinc-100 leading-[1.0] mb-10">
            {post.title}
          </h1>

          {/* Floating metadata */}
          <div className="flex flex-wrap items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#c9a054]/50" />
              <span className="luxury-meta">{post.category}</span>
            </div>
            <span className="luxury-meta text-zinc-700">
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="luxury-meta text-zinc-700">
              {bodyParagraphs.length * 2} min read
            </span>
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-[#c9a054] to-transparent" />
        </motion.div>
      </section>

      {/* ─── BODY CONTENT ─── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-auto lg:mr-16">

          {/* Lead paragraph */}
          {bodyParagraphs[0] && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easing }}
              className="font-serif text-2xl md:text-3xl text-zinc-200 font-light leading-[1.7] tracking-wide mb-16"
            >
              {bodyParagraphs[0]}
            </motion.p>
          )}

          {/* Body paragraphs */}
          {bodyParagraphs.slice(1, 2).map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easing }}
              className="text-zinc-400 font-light leading-[2] text-base md:text-lg mb-10"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Pull Quote */}
        {pullQuote && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easing }}
            className="my-24 md:my-32 pl-8 md:pl-16 border-l border-[#c9a054]/40 max-w-3xl mx-auto lg:mx-0"
          >
            <blockquote className="font-serif font-light text-2xl md:text-4xl text-zinc-200 tracking-[0.08em] leading-[1.4] italic">
              "{pullQuote}"
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-8 h-px bg-[#c9a054]/40" />
              <span className="luxury-meta text-zinc-700">House of Shamim Forever</span>
            </div>
          </motion.div>
        )}

        {/* Full-width imagery */}
        {secondImage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easing }}
            className="my-20 md:my-28 -mx-6 md:-mx-12 lg:-mx-24 relative overflow-hidden"
          >
            <div className="aspect-[16/7] overflow-hidden">
              <img
                src={secondImage}
                alt="Dispatch imagery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40" />
            </div>
          </motion.div>
        )}

        {/* Remaining paragraphs */}
        <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-auto lg:mr-16">
          {bodyParagraphs.slice(2).map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.05, ease: easing }}
              className="text-zinc-400 font-light leading-[2] text-base md:text-lg mb-10"
            >
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ─── MINIMAL FOOTER CTA ─── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easing }}
          className="border-t border-[#1a1a1a] pt-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
        >
          <div>
            <span className="luxury-meta text-zinc-700 block mb-6">Continue Reading</span>
            <Link href="/journal" className="group font-serif font-light text-3xl md:text-5xl text-zinc-300 hover:text-[#c9a054] transition-colors duration-700 tracking-[0.08em]">
              Return to Journal
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
            </Link>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="h-px w-24 bg-gradient-to-l from-[#c9a054]/40 to-transparent" />
            <span className="luxury-meta">House of Shamim Forever</span>
            <Link href="/shop" className="luxury-btn text-[9px]">
              Explore the Collection
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
