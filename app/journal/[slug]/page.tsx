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
  body: string[]
  pullQuote: string
  secondImage: string
  nextSlug: string
  nextTitle: string
  nextImage: string
  nextCategory: string
}

const STATIC: Record<string, ArticleData> = {
  'founders-vision': {
    id: '0', slug: 'founders-vision', published: true, content: null,
    title: "The Founder's Vision: Why Shamim Forever Was Created",
    excerpt: 'In every generation, a handful of brands emerge that aspire to do more than sell products—they seek to create a lasting legacy.',
    cover_image: '/founders-vision.png',
    secondImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&fit=crop',
    category: 'VISION',
    created_at: '2025-06-01T00:00:00Z',
    pullQuote: 'True luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations.',
    nextSlug: 'sovereign-materials',
    nextTitle: 'Sovereign Materials: A Journey from Khyber to Grasse',
    nextImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop',
    nextCategory: 'CRAFT',
    body: [
      'In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy. Shamim Forever was founded with that ambition: to build a luxury house where craftsmanship, innovation, authenticity, and timeless design come together under one vision.',
      'The inspiration behind the House was simple yet powerful. Luxury should not be measured only by price or exclusivity; it should represent meaning, permanence, and the ability to be appreciated across generations. Every fragrance, every jewelry piece, every curated object, and every digital innovation introduced by Shamim Forever reflects this philosophy.',
      'From the beginning, the objective was never to become another online retailer or trend-driven lifestyle brand. The goal was to establish an ecosystem where carefully selected creations could be appreciated not only for their beauty but also for their authenticity, provenance, and enduring value. The founder envisioned a brand that would stand confidently between traditional luxury craftsmanship and the possibilities offered by modern technology. Rather than replacing heritage, innovation would strengthen it.',
      'The modern luxury market is filled with countless products competing for attention. Shamim Forever follows a different path. The House believes that exceptional quality deserves careful selection. This philosophy is reflected in its own exclusive creations as well as the Guest Curation Series, where internationally respected fragrances and luxury objects are recognized for their craftsmanship. The focus remains on excellence rather than volume.',
      'Trust is one of the most valuable assets in luxury. Collectors increasingly expect transparent documentation and confidence in the origin of the products they acquire. For this reason, Shamim Forever embraces modern verification concepts through Digital Passports designed to strengthen authenticity and preserve provenance for eligible creations. Technology is used not to replace craftsmanship, but to reinforce it.',
      'Luxury should create an ongoing relationship between the House and the collector. This belief inspired the development of the OKBOND Lifetime Loyalty Program, designed to reward long-term engagement through meaningful benefits. Eligible participants enjoy lifetime advantages such as continued savings on qualifying purchases, priority access to selected releases, and opportunities to participate more deeply in the evolving Shamim Forever ecosystem.',
      'For centuries, fragrance has represented memory, emotion, and personal identity. Shamim Forever approaches perfumery with this understanding, seeking compositions that balance artistry with permanence. Every fragrance is intended to become part of the wearer\'s story rather than simply a seasonal accessory. Fine jewelry occupies an equally profound place — viewed as an enduring object capable of carrying emotional significance across generations, conceived as heirlooms intended to outlive trends.',
      'The founder envisioned Shamim Forever not merely as a company but as a community of discerning individuals who value excellence, authenticity, and thoughtful design. The House aspires to serve collectors across cultures and regions while maintaining consistent standards of quality and presentation. Every detail matters — from product selection and packaging to customer experience and digital infrastructure.',
      'The founder\'s ambition extends well beyond today\'s product catalogue. Future initiatives include expanded archive collections, enhanced digital experiences, broader international reach, and continued investment in authentication technologies that strengthen collector confidence. At the same time, the guiding philosophy remains unchanged: create objects and experiences worthy of preservation.',
      'For Shamim Forever, that vision is not limited to fragrances or jewelry. It is the pursuit of a modern luxury house where timeless craftsmanship, careful curation, verified authenticity, and meaningful relationships come together to create lasting value. Luxury may capture attention for a moment. Legacy earns its place forever.',
    ],
  },
  'architecture-of-scent': {
    id: '1', slug: 'architecture-of-scent', published: true, content: null,
    title: 'The Architecture of Scent: Why Structure Precedes Soul',
    excerpt: 'Before fragrance can move emotion, it must first master restraint.',
    cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1800&q=90&fit=crop',
    category: 'CRAFT',
    created_at: '2025-05-01T00:00:00Z',
    pullQuote: 'Restraint is not the absence of ambition. It is ambition made sovereign.',
    nextSlug: 'sovereign-materials',
    nextTitle: 'Sovereign Materials: A Journey from Khyber to Grasse',
    nextImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop',
    nextCategory: 'HERITAGE',
    body: [
      'Before fragrance can move emotion, it must first master restraint. At the House of Shamim Forever, composition begins not with excess — but with silence, structure, and absolute discipline.',
      'The atelier begins its work not with the addition of notes, but with the subtraction of the unnecessary. What remains after rigorous editing is not simplicity — it is clarity. And clarity, in the art of perfumery, is the highest form of luxury.',
      'Each accord is built like architecture: foundation first, then structure, then the finishing details that make the composition recognizable as belonging to the House. The base notes are chosen not for impact, but for permanence. They must endure — not just across hours of wear, but across decades of memory.',
      'The master perfumer works in silence. The brief is never about what to add. It is always about what to remove. A great fragrance, like a great building, achieves its power through the tension between what is present and what is deliberately absent.',
      'This is the architecture of scent. Not a metaphor, but a discipline. Not an aesthetic, but a philosophy. The House creates not for the moment of application, but for the long arc of impression — the way a person will be remembered long after they have left the room.',
    ],
  },
  'sovereign-materials': {
    id: '2', slug: 'sovereign-materials', published: true, content: null,
    title: 'Sovereign Materials: A Journey from Khyber to Grasse',
    excerpt: 'Our master perfumer traces the ancient trade routes from Khyber to the flowering fields of Grasse.',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90&fit=crop',
    category: 'HERITAGE',
    created_at: '2025-04-15T00:00:00Z',
    pullQuote: 'The ingredient is not raw material. It is inherited intelligence, compressed into essence.',
    nextSlug: 'okbond-digital-sovereignty',
    nextTitle: 'OKBOND: Redefining Luxury Currency in the Digital Age',
    nextImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85&fit=crop',
    nextCategory: 'INNOVATION',
    body: [
      'There are trade routes older than nations. Before borders were drawn across the mountains of the Khyber, merchants carried resins, spices, and rare woods along paths worn smooth by centuries of footsteps.',
      'Our master perfumer travels twice a year — once to the high altitude farms of South Asia, where oud trees grow under conditions that produce a distinctly smoky, resinous heart, and once to the valleys of Grasse, where jasmine and rose centifolia are harvested by hand at first light.',
      'The selection process is not merely technical. It is relational. The House has developed partnerships with specific families of growers — relationships measured not in contracts but in decades of mutual understanding. We know their land. They know our standards.',
      'Luxury, in the truest sense, is not about price. It is about provenance. When you wear a fragrance from the House, you are wearing the distilled intelligence of specific places, specific seasons, and specific hands.',
      'The journey from Khyber to Grasse is more than geographic. It is the House\'s declaration that the source of beauty matters as much as beauty itself. Sovereign materials produce sovereign compositions. And sovereignty begins with the decision never to compromise on origin.',
    ],
  },
  'okbond-digital-sovereignty': {
    id: '3', slug: 'okbond-digital-sovereignty', published: true, content: null,
    title: 'OKBOND: Redefining Luxury Currency in the Digital Age',
    excerpt: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90&fit=crop',
    category: 'INNOVATION',
    created_at: '2025-04-01T00:00:00Z',
    pullQuote: 'The future of luxury is not scarcity of product. It is scarcity of access.',
    nextSlug: 'psychology-of-prestige',
    nextTitle: 'The Psychology of Prestige',
    nextImage: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=900&q=85&fit=crop',
    nextCategory: 'SOVEREIGNTY',
    body: [
      'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty — a digital infrastructure that allows the House of Shamim Forever to operate on its own terms in a world defined by platform dependency.',
      'OKBOND is a luxury currency. Not a points system, not a rewards mechanism, not a gamified engagement loop. It is a unit of value that appreciates with relationship, deepens with time, and unlocks experiences that cannot be purchased by any other means.',
      'The distinction is critical. In a conventional loyalty program, the brand holds all the value and distributes it conditionally. In OKBOND, the holder accumulates genuine equity in their relationship with the House. The token is a record of trust, of patronage, of belonging.',
      'The infrastructure we have built is designed to be immune to the volatility of conventional markets. OKBOND is pegged not to speculation, but to the verified luxury goods and experiences of the House. Its value is anchored in the real — in physical craftsmanship, rare materials, and curated access.',
      'This is not disruption. This is architecture. The House has always built for permanence. OKBOND is our declaration that digital infrastructure must meet the same standard as everything else we make: it must endure, command trust, and reward those who understand the difference between price and value.',
    ],
  },
  'psychology-of-prestige': {
    id: '4', slug: 'psychology-of-prestige', published: true, content: null,
    title: 'The Psychology of Prestige',
    excerpt: 'Prestige is not manufactured. It accumulates slowly, over decades of uncompromising decisions.',
    cover_image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=1800&q=90&fit=crop',
    category: 'SOVEREIGNTY',
    created_at: '2025-03-15T00:00:00Z',
    pullQuote: 'Prestige is the compound interest of consistent excellence over time.',
    nextSlug: 'silence-new-luxury',
    nextTitle: 'Why Silence Is the New Luxury',
    nextImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop',
    nextCategory: 'CULTURE',
    body: [
      'Prestige is not manufactured. It accumulates slowly, over decades of uncompromising decisions — each one invisible to the market, and yet collectively definitive.',
      'The psychology of prestige operates on a paradox: the more aggressively it is pursued, the more rapidly it diminishes. True prestige is the residue of authentic conviction. It cannot be acquired through marketing spend, celebrity association, or artificial scarcity.',
      'The House understands prestige as a form of compound interest. Each decision — each material chosen, each collaboration declined, each compromise refused — deposits into an account that pays dividends across generations.',
      'What separates the merely expensive from the genuinely prestigious is the quality of the decisions made when no one is watching. When the supplier offers a slightly inferior ingredient at a significant discount. When the opportunity to expand rapidly appears, dressed as progress. The prestigious house declines. Quietly. Without announcement.',
      'Prestige, ultimately, is the recognition that time is the only currency that cannot be counterfeited. The House of Shamim Forever makes nothing that is designed to depreciate. We create for the long arc — for the collector who will pass it forward, for the legacy that outlasts its maker.',
    ],
  },
  'silence-new-luxury': {
    id: '5', slug: 'silence-new-luxury', published: true, content: null,
    title: 'Why Silence Is the New Luxury',
    excerpt: 'In a world of maximum noise, silence has become the ultimate status signal.',
    cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1800&q=90&fit=crop',
    category: 'CULTURE',
    created_at: '2025-03-01T00:00:00Z',
    pullQuote: 'The loudest statement a luxury house can make is to speak only when it has something worth saying.',
    nextSlug: 'future-sovereign-commerce',
    nextTitle: 'The Future of Sovereign Commerce',
    nextImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=85&fit=crop',
    nextCategory: 'DIGITAL LUXURY',
    body: [
      'In a world of maximum noise, silence has become the ultimate status signal. The House of Shamim Forever has always known this — and it shapes every decision we make about how, when, and through what channels we choose to communicate.',
      'The attention economy has trained brands to believe that visibility is equivalent to value. It is not. Visibility is available to anyone with a marketing budget. Value is accumulated through restraint, through the discipline to remain silent when the temptation to speak is greatest.',
      'Consider the most enduring luxury institutions. They do not announce. They do not explain. They simply exist — with a confidence so complete that it requires no validation from external voices. Their silence is not absence. It is authority.',
      'The House does not post for engagement. We do not optimize for reach. We create work of such deliberate quality that those who are meant to find it will find it — drawn not by algorithmic amplification but by the gravitational pull of genuine excellence.',
      'Silence, in the age of noise, is the rarest material of all. The House hoards it carefully — releasing communication only when it has something to say that could not be said more powerfully by saying nothing.',
    ],
  },
  'future-sovereign-commerce': {
    id: '6', slug: 'future-sovereign-commerce', published: true, content: null,
    title: 'The Future of Sovereign Commerce',
    excerpt: 'The next decade of luxury will be won by those with the deepest systems and the courage to build independently.',
    cover_image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90&fit=crop',
    secondImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=90&fit=crop',
    category: 'DIGITAL LUXURY',
    created_at: '2025-02-15T00:00:00Z',
    pullQuote: 'Sovereignty in commerce means owning not just the product, but the entire system through which it reaches its patron.',
    nextSlug: 'founders-vision',
    nextTitle: "The Founder's Vision: Why Shamim Forever Was Created",
    nextImage: '/founders-vision.png',
    nextCategory: 'VISION',
    body: [
      'The next decade of luxury will not be won by those with the largest catalogues. It will be won by those with the deepest systems — and the courage to build independently of the platforms that have come to mediate all commercial relationships.',
      'Sovereign commerce is not a rejection of technology. It is a refusal to cede control of the customer relationship to intermediaries who do not share the values of the House. When a luxury brand distributes through a platform that also distributes mass-market goods, it does not gain exposure. It loses identity.',
      'The House of Shamim Forever is building its own infrastructure — its own discovery channels, its own customer relationships, its own currency. Not because we are hostile to commerce, but because we understand that the quality of the experience is inseparable from the quality of the system that delivers it.',
      'The patron of a sovereign luxury house should feel, at every point of contact, that they are in a world apart. Not in a marketplace, but in a house. Not completing a transaction, but deepening a relationship. This feeling is impossible to engineer when the infrastructure belongs to someone else.',
      'The future of luxury commerce is not about who can reach the most people. It is about who has built the most trustworthy system for reaching exactly the right people — and delivering an experience so complete that the question of alternatives simply does not arise.',
    ],
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<ArticleData | null>(STATIC[params.slug] ?? null)
  const [loading, setLoading] = useState(!STATIC[params.slug])
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '28%'])

  useEffect(() => {
    if (STATIC[params.slug]) return
    supabase.from('journal_posts').select('*').eq('slug', params.slug).single()
      .then(({ data }) => {
        if (data) setPost({ ...data, body: [data.content ?? data.excerpt ?? ''], pullQuote: '', secondImage: '', nextSlug: '', nextTitle: '', nextImage: '', nextCategory: '' })
        setLoading(false)
      })
  }, [params.slug])

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Loading...</span>
    </div>
  )

  if (!post) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-8">
      <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-600">Dispatch not found</span>
      <Link href="/journal" className="luxury-btn text-[9px]">Return to Journal</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050505]">

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[1px] bg-[#c9a054] z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ─── CINEMATIC HERO ─── */}
      <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={post.cover_image ?? ''}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/30 to-[#050505]" />
          <div className="absolute inset-0 bg-[#050505]/35" />
        </motion.div>

        {/* Back nav */}
        <div className="absolute top-24 left-8 md:left-14 lg:left-20 z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }}>
            <Link href="/journal" className="group flex items-center gap-3">
              <span className="text-[#c9a054] text-xs group-hover:text-zinc-100 transition-colors duration-500">←</span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-300 transition-colors duration-500">Journal</span>
            </Link>
          </motion.div>
        </div>

        {/* Category */}
        <div className="absolute top-24 right-8 md:right-14 lg:right-20 z-10">
          <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }}
            className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">
            {post.category}
          </motion.span>
        </div>
      </section>

      {/* ─── TITLE BLOCK ─── */}
      <section className="px-8 md:px-14 lg:px-24 max-w-[1300px] mx-auto -mt-36 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
        >
          <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-[5.5rem] tracking-[0.08em] text-zinc-100 leading-[1.0] mb-12 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-[#c9a054]/50" />
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">{post.category}</span>
            </div>
            <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
              {post.body.length * 2}–{post.body.length * 3} min read
            </span>
          </div>

          <div className="mt-10 w-20 h-px bg-gradient-to-r from-[#c9a054] to-transparent" />
        </motion.div>
      </section>

      {/* ─── ARTICLE BODY ─── */}
      <section className="px-8 md:px-14 lg:px-24 pb-20">
        <div className="max-w-[680px] mx-auto">

          {/* Lead paragraph */}
          {post.body[0] && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="font-serif text-xl md:text-2xl text-zinc-200 font-light leading-[1.85] tracking-wide mb-14 border-l border-[#c9a054]/30 pl-8"
            >
              {post.body[0]}
            </motion.p>
          )}

          {/* Separator */}
          <div className="flex items-center gap-6 mb-14">
            <div className="w-8 h-px bg-[#c9a054]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a054]/40" />
            <div className="w-8 h-px bg-[#c9a054]/40" />
          </div>

          {/* Body P2 */}
          {post.body[1] && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="text-zinc-400 font-light leading-[2.1] text-[16px] mb-12"
            >
              {post.body[1]}
            </motion.p>
          )}

          {/* Body P3 */}
          {post.body[2] && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="text-zinc-400 font-light leading-[2.1] text-[16px] mb-12"
            >
              {post.body[2]}
            </motion.p>
          )}
        </div>

        {/* Pull Quote */}
        {post.pullQuote && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="my-20 md:my-28 max-w-[900px] mx-auto px-8 md:px-14 border-l-2 border-[#c9a054]/50"
          >
            <blockquote className="font-serif font-light text-2xl md:text-4xl text-zinc-200 tracking-[0.07em] leading-[1.45] italic">
              "{post.pullQuote}"
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-8 h-px bg-[#c9a054]/40" />
              <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">House of Shamim Forever</span>
            </div>
          </motion.div>
        )}

        {/* Full-width second image */}
        {post.secondImage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="my-16 md:my-24 -mx-8 md:-mx-14 lg:-mx-24 overflow-hidden"
          >
            <div className="aspect-[21/9] relative">
              <img src={post.secondImage} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />
            </div>
          </motion.div>
        )}

        {/* Remaining body paragraphs */}
        <div className="max-w-[680px] mx-auto">
          {post.body.slice(3).map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.06, ease }}
              className="text-zinc-400 font-light leading-[2.1] text-[16px] mb-12"
            >
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ─── GOLD SEPARATOR ─── */}
      <div className="px-8 md:px-14 lg:px-24 max-w-[680px] mx-auto">
        <div className="flex items-center gap-6 my-8">
          <div className="flex-1 h-px bg-[#111]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a054]/40" />
          <div className="flex-1 h-px bg-[#111]" />
        </div>
      </div>

      {/* ─── NEXT ARTICLE ─── */}
      {post.nextSlug && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="border-t border-[#111] mt-16"
        >
          <Link href={`/journal/${post.nextSlug}`} className="group grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 md:py-20 border-r border-[#111] order-2 md:order-1">
              <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 mb-6 block">Next Dispatch</span>
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054] mb-6 block">{post.nextCategory}</span>
              <h3 className="font-serif font-light text-2xl md:text-4xl tracking-[0.07em] text-zinc-100 leading-[1.1] mb-10 group-hover:text-[#c9a054]/80 transition-colors duration-700">
                {post.nextTitle}
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-6 h-px bg-[#c9a054]/40 group-hover:w-12 transition-all duration-700" />
                <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Enter Dispatch →</span>
              </div>
            </div>
            <div className="relative overflow-hidden aspect-[3/2] md:aspect-auto order-1 md:order-2">
              <img
                src={post.nextImage}
                alt={post.nextTitle}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              />
              <div className="absolute inset-0 bg-[#050505]/30 group-hover:bg-[#050505]/10 transition-colors duration-700" />
            </div>
          </Link>
        </motion.section>
      )}

      {/* ─── BACK TO JOURNAL ─── */}
      <section className="px-8 md:px-14 lg:px-20 py-16 border-t border-[#111] flex items-center justify-between">
        <Link href="/journal" className="group flex items-center gap-4">
          <span className="text-[#c9a054] text-xs group-hover:text-zinc-100 transition-colors duration-500">←</span>
          <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-600 group-hover:text-[#c9a054] transition-colors duration-500">Return to Journal</span>
        </Link>
        <Link href="/shop" className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
          Explore the Collection →
        </Link>
      </section>

    </div>
  )
}
