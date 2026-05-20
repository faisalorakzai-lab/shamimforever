'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { JournalPost } from '@/types'

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('journal_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
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
        ) : posts.length === 0 ? (
          <div className="space-y-px bg-[#1a1a1a]">
            {/* Placeholder editorial layout */}
            {[
              {
                title: 'The Architecture of Scent: Why Structure Precedes Soul',
                excerpt: 'Before a fragrance can move you, it must first be still. We explore how restraint becomes power in the atelier.',
                date: 'May 2025',
                category: 'Craft',
              },
              {
                title: 'Sovereign Materials: A Journey from Khyber to Grasse',
                excerpt: 'Our master perfumer traces the ancient trade routes that now supply the House with its rarest ingredients.',
                date: 'April 2025',
                category: 'Heritage',
              },
              {
                title: 'OKBOND: Redefining Luxury Currency in the Digital Age',
                excerpt: 'When we created OKBOND, we weren't building a loyalty program. We were building a new form of sovereignty.',
                date: 'March 2025',
                category: 'Innovation',
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#050505] group"
              >
                <div className="p-10 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-6 mb-8">
                        <p className="luxury-meta">{post.category}</p>
                        <span className="w-8 h-px bg-[#c9a054]/30" />
                        <p className="luxury-meta text-zinc-600">{post.date}</p>
                      </div>
                      <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6 leading-tight group-hover:text-[#c9a054] transition-colors duration-700">
                        {post.title}
                      </h2>
                      <p className="text-zinc-500 font-light leading-relaxed max-w-xl">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-end justify-end">
                      <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054] group-hover:text-zinc-100 transition-colors duration-500">
                        Read Dispatch →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-px bg-[#1a1a1a]">
            {/* Featured (first post) */}
            {posts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#050505] group"
              >
                <Link href={`/journal/${posts[0].slug}`} className="block p-10 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <p className="luxury-meta mb-6">Featured Dispatch</p>
                      <h2 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6 leading-tight group-hover:text-[#c9a054] transition-colors duration-700">
                        {posts[0].title}
                      </h2>
                      {posts[0].excerpt && (
                        <p className="text-zinc-500 font-light leading-relaxed mb-8">
                          {posts[0].excerpt}
                        </p>
                      )}
                      <span className="luxury-meta text-[#c9a054]">Read Dispatch →</span>
                    </div>
                    {posts[0].cover_image && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={posts[0].cover_image}
                          alt={posts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Rest of posts */}
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-[#050505] group"
              >
                <Link href={`/journal/${post.slug}`} className="block p-10 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-2">
                      <p className="luxury-meta mb-4">
                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                      <h3 className="font-serif text-3xl md:text-4xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-4 group-hover:text-[#c9a054] transition-colors duration-700">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-zinc-500 font-light leading-relaxed text-sm">{post.excerpt}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="luxury-meta text-[#c9a054] group-hover:text-zinc-100 transition-colors duration-500">
                        Read →
                      </span>
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
