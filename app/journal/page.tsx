'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

const PLACEHOLDER_POSTS = [
  {
    id: '1',
    title: 'The Architecture of Scent: Why Structure Precedes Soul',
    slug: 'architecture-of-scent',
    excerpt: 'Before a fragrance can move you, it must first be still. We explore how restraint becomes power in the atelier.',
    cover_image: null,
    category: 'Craft',
    created_at: '2025-05-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Sovereign Materials: A Journey from Khyber to Grasse',
    slug: 'sovereign-materials',
    excerpt: 'Our master perfumer traces the ancient trade routes that now supply the House with its rarest ingredients.',
    cover_image: null,
    category: 'Heritage',
    created_at: '2025-04-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'OKBOND: Redefining Luxury Currency in the Digital Age',
    slug: 'okbond-luxury-currency',
    excerpt: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty.',
    cover_image: null,
    category: 'Innovation',
    created_at: '2025-03-01T00:00:00Z',
  },
]

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('journal_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPosts(data)
        } else {
          setPosts(PLACEHOLDER_POSTS as JournalPost[])
        }
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luxury-meta mb-6">House Dispatches</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8">
              Journal
            </h1>
            <p className="text-zinc-500 font-light max-w-lg leading-relaxed">
              Thoughts on craft, culture, and the sovereign pursuit of excellence.
              From inside the House of Shamim Forever.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        {loading ? (
          <div className="text-center py-40">
            <p className="luxury-meta">Loading dispatches...</p>
          </div>
        ) : (
          <div className="space-y-px bg-[#1a1a1a]">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#050505] group"
              >
                <Link
                  href={`/journal/${post.slug}`}
                  className="block p-10 lg:p-16"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-6 mb-8">
                        {post.category && (
                          <p className="luxury-meta">{post.category}</p>
                        )}
                        <span className="w-8 h-px bg-[#c9a054]/30" />
                        <p className="luxury-meta text-zinc-600">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>

                      <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6 leading-tight group-hover:text-[#c9a054] transition-colors duration-700">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-zinc-500 font-light leading-relaxed max-w-xl">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-end justify-end h-full">
                      {post.cover_image ? (
                        <div className="w-full aspect-[4/3] overflow-hidden">
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        </div>
                      ) : (
                        <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054] group-hover:text-zinc-100 transition-colors duration-500">
                          Read Dispatch →
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
