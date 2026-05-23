'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

// ─── Static product catalogue for recommendations ───
const FRAGRANCE_PROFILES = [
  {
    id: 'oud-sovereign', name: 'Oud Sovereign', category: 'Perfume · For Him',
    desc: 'Aged Assam oud, black leather, vetiver — a declaration of power.',
    vibe: ['bold', 'evening', 'formal', 'masculine'],
    undertone: ['dark', 'warm'],
    price: 'PKR 12,500', href: '/shop?category=perfume',
  },
  {
    id: 'rose-empress', name: 'Rose Empress', category: 'Perfume · For Her',
    desc: 'Bulgarian rose absolute, jasmine, white musk — tender and sovereign.',
    vibe: ['romantic', 'floral', 'feminine', 'daily'],
    undertone: ['warm', 'neutral'],
    price: 'PKR 9,800', href: '/shop?category=perfume',
  },
  {
    id: 'signature-unison', name: 'Signature Unison', category: 'Perfume · Unisex',
    desc: 'Bergamot, sandalwood, amber — the accord that transcends gender.',
    vibe: ['fresh', 'professional', 'minimal', 'modern'],
    undertone: ['cool', 'neutral'],
    price: 'PKR 11,200', href: '/shop?category=perfume',
  },
  {
    id: 'cedar-dynasty', name: 'Cedar Dynasty', category: 'Perfume · For Him',
    desc: 'Himalayan cedarwood, cardamom, smoky guaiac — for the evening architect.',
    vibe: ['woody', 'evening', 'bold', 'formal'],
    undertone: ['warm', 'dark'],
    price: 'PKR 10,400', href: '/shop?category=perfume',
  },
  {
    id: 'citrus-lumiere', name: 'Citrus Lumière', category: 'Perfume · For Her',
    desc: 'Sicilian bergamot, mandarin, lily of the valley — light and playful.',
    vibe: ['fresh', 'daily', 'light', 'feminine'],
    undertone: ['cool', 'neutral'],
    price: 'PKR 8,500', href: '/shop?category=perfume',
  },
]

const JEWELRY_RECS: Record<string, { name: string; desc: string; category: string; price: string }[]> = {
  warm: [
    { name: 'Gold Sovereignty Ring', desc: 'Matte gold band with hidden hallmark — understated power.', category: 'Jewelry · For Him', price: 'PKR 18,000' },
    { name: 'Amber Statement Necklace', desc: '22K gold-plated amber drops — bridal and celestial.', category: 'Jewelry · For Her', price: 'PKR 24,500' },
  ],
  cool: [
    { name: 'Platinum Cuff Sovereign', desc: 'Brushed platinum cuff — clean, architectural, permanent.', category: 'Jewelry · For Him', price: 'PKR 22,000' },
    { name: 'Silver Constellation Set', desc: 'Sterling 925 minimalist earrings and chain — for the everyday sovereign.', category: 'Jewelry · For Her', price: 'PKR 14,800' },
  ],
  neutral: [
    { name: 'Diamond Luminary Bracelet', desc: 'Micro-pavé diamond tennis bracelet — pure luxury.', category: 'Jewelry · For Her', price: 'PKR 45,000' },
    { name: 'Executive Cufflink Set', desc: 'Hand-polished black onyx and gold cufflinks — for the sherwani.', category: 'Jewelry · For Him', price: 'PKR 12,500' },
  ],
}

const COSMETIC_RECS: Record<string, { name: string; desc: string; category: string; price: string }[]> = {
  fair: [
    { name: 'Pearl Glow Foundation', desc: 'Buildable coverage with pearl luminosity — for fair complexions.', category: 'Cosmetics · Face & Glow', price: 'PKR 4,200' },
    { name: 'Rose Petal Lip Oil', desc: 'Tinted rose lip oil with SPF — sheer and sovereign.', category: 'Cosmetics · Lip Luxury', price: 'PKR 2,800' },
  ],
  medium: [
    { name: 'Honey Serum Foundation', desc: 'Semi-matte finish with honey undertones — buildable prestige.', category: 'Cosmetics · Face & Glow', price: 'PKR 4,800' },
    { name: 'Brick Red Velvet Lip', desc: 'Long-wear velvet matte — statement lip for medium skin.', category: 'Cosmetics · Lip Luxury', price: 'PKR 3,200' },
  ],
  deep: [
    { name: 'Cocoa Luminous Foundation', desc: 'Rich coverage, luminous finish — crafted for deeper tones.', category: 'Cosmetics · Face & Glow', price: 'PKR 5,200' },
    { name: 'Plum Sovereign Lip', desc: 'Deep plum velvet matte — richness amplified.', category: 'Cosmetics · Lip Luxury', price: 'PKR 3,600' },
  ],
}

const PERFUME_QUIZ = [
  {
    q: 'Your signature occasion is:',
    opts: [
      { label: 'Evening galas & formal events', val: 'formal' },
      { label: 'Daily professional settings', val: 'professional' },
      { label: 'Intimate weekends at home', val: 'romantic' },
      { label: 'Outdoor adventures & travel', val: 'fresh' },
    ],
  },
  {
    q: 'Your aesthetic in one word:',
    opts: [
      { label: 'Bold & commanding', val: 'bold' },
      { label: 'Minimal & modern', val: 'minimal' },
      { label: 'Romantic & warm', val: 'romantic' },
      { label: 'Light & free', val: 'light' },
    ],
  },
  {
    q: 'Your preferred fragrance depth:',
    opts: [
      { label: 'Heavy & long-lasting', val: 'dark' },
      { label: 'Balanced & moderate', val: 'warm' },
      { label: 'Fresh & subtle', val: 'cool' },
    ],
  },
]

type Mode = 'select' | 'cosmetics' | 'jewelry' | 'perfume'
type ScanState = 'idle' | 'scanning' | 'done'

function extractDominantColor(img: HTMLImageElement): { r: number; g: number; b: number } {
  const canvas = document.createElement('canvas')
  canvas.width = 50; canvas.height = 50
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, 50, 50)
  const data = ctx.getImageData(0, 0, 50, 50).data
  let r = 0, g = 0, b = 0, count = 0
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]; g += data[i + 1]; b += data[i + 2]; count++
  }
  return { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) }
}

function classifySkinTone(r: number, g: number, b: number): 'fair' | 'medium' | 'deep' {
  const brightness = (r + g + b) / 3
  if (brightness > 180) return 'fair'
  if (brightness > 120) return 'medium'
  return 'deep'
}

function classifyColorTemp(r: number, g: number, b: number): 'warm' | 'cool' | 'neutral' {
  if (r > b + 20) return 'warm'
  if (b > r + 20) return 'cool'
  return 'neutral'
}

function matchPerfume(answers: string[]): typeof FRAGRANCE_PROFILES[0][] {
  const scores = FRAGRANCE_PROFILES.map(p => ({
    ...p,
    score: answers.filter(a => p.vibe.includes(a) || p.undertone.includes(a)).length,
  }))
  scores.sort((a, b) => b.score - a.score)
  return scores.slice(0, 2)
}

export default function VirtualAtelierPage() {
  const [mode, setMode] = useState<Mode>('select')
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [colorResult, setColorResult] = useState<{ r: number; g: number; b: number } | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const [quizStep, setQuizStep] = useState(0)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = useCallback((file: File, modeType: 'cosmetics' | 'jewelry') => {
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setScanState('scanning')
    setRecommendations([])

    const img = new Image()
    img.onload = () => {
      setTimeout(() => {
        const color = extractDominantColor(img)
        setColorResult(color)
        if (modeType === 'cosmetics') {
          const tone = classifySkinTone(color.r, color.g, color.b)
          setRecommendations(COSMETIC_RECS[tone] || COSMETIC_RECS.medium)
        } else {
          const temp = classifyColorTemp(color.r, color.g, color.b)
          setRecommendations(JEWELRY_RECS[temp] || JEWELRY_RECS.neutral)
        }
        setScanState('done')
      }, 2200)
    }
    img.src = url
  }, [])

  function handleQuizAnswer(val: string) {
    const updated = [...quizAnswers, val]
    setQuizAnswers(updated)
    if (quizStep < PERFUME_QUIZ.length - 1) {
      setQuizStep(q => q + 1)
    } else {
      setScanState('scanning')
      setTimeout(() => {
        const matches = matchPerfume(updated)
        setRecommendations(matches)
        setScanState('done')
      }, 2000)
    }
  }

  function resetMode() {
    setMode('select'); setScanState('idle'); setImageUrl(null)
    setColorResult(null); setQuizAnswers([]); setQuizStep(0); setRecommendations([])
  }

  const colorHex = colorResult
    ? `#${colorResult.r.toString(16).padStart(2,'0')}${colorResult.g.toString(16).padStart(2,'0')}${colorResult.b.toString(16).padStart(2,'0')}`
    : null

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-12 md:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease }}>
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Powered by Visual Intelligence</p>
            <h1 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-5">
              AI Visual<br />
              <span className="italic text-zinc-400">Atelier</span>
            </h1>
            <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-sm">
              Upload a photo. Our system scans your color profile and matches you to the 
              sovereign creations made for your tone, palette, and presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MODE SELECTOR ─── */}
      <AnimatePresence mode="wait">
        {mode === 'select' && (
          <motion.section key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="border-b border-[#0d0d0d]">
            <div className="px-5 md:px-12 lg:px-20 py-10 md:py-14">
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-8">Choose Your Scanner</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0a0a0a]">
                {[
                  {
                    id: 'cosmetics', icon: '◇', label: 'Cosmetics Match',
                    sub: 'Upload your selfie or skin photo. We analyze your skin tone and match premium foundations, lip colors, and skincare.',
                    action: 'Upload Skin Photo',
                  },
                  {
                    id: 'jewelry', icon: '◆', label: 'Jewelry & Outfit Match',
                    sub: 'Upload your outfit photo. We extract the dominant palette and match jewelry, rings, and accessories that complement it.',
                    action: 'Upload Outfit Photo',
                  },
                  {
                    id: 'perfume', icon: '◈', label: 'Fragrance Vibe Match',
                    sub: 'No photo needed. Answer 3 questions about your personality and we match you to your sovereign fragrance profile.',
                    action: 'Start Vibe Quiz',
                  },
                ].map((m, i) => (
                  <motion.button key={m.id} type="button" onClick={() => setMode(m.id as Mode)}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                    className="group bg-[#050505] px-6 md:px-8 py-10 md:py-12 text-left hover:bg-[#080808] transition-all duration-500">
                    <span className="text-2xl text-[#c9a054] block mb-5 md:mb-7 group-hover:scale-110 transition-transform duration-500 inline-block">{m.icon}</span>
                    <h3 className="font-serif font-light text-xl md:text-2xl tracking-[0.08em] text-zinc-200 group-hover:text-zinc-100 transition-colors duration-500 mb-4">{m.label}</h3>
                    <p className="text-zinc-600 text-xs font-light leading-relaxed mb-8">{m.sub}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-0 h-px bg-[#c9a054] group-hover:w-6 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                      <span className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] opacity-0 group-hover:opacity-100 transition-opacity duration-500">{m.action} →</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── COSMETICS / JEWELRY SCANNER ─── */}
        {(mode === 'cosmetics' || mode === 'jewelry') && (
          <motion.section key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="px-5 md:px-12 lg:px-20 py-10 md:py-16">
            <button onClick={resetMode} className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-400 mb-8 flex items-center gap-2">
              ← Back to Scanner
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
              {/* Upload Zone */}
              <div>
                <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-6">
                  {mode === 'cosmetics' ? 'Upload Skin / Selfie Photo' : 'Upload Outfit Photo'}
                </p>

                {!imageUrl ? (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border border-dashed border-[#1a1a1a] hover:border-[#c9a054]/40 transition-colors duration-500 cursor-pointer"
                    style={{ minHeight: '300px' }}>
                    <div className="flex flex-col items-center justify-center h-full py-16 px-8 text-center">
                      <span className="text-3xl text-[#c9a054]/30 mb-5">
                        {mode === 'cosmetics' ? '◇' : '◆'}
                      </span>
                      <p className="font-serif font-light text-xl text-zinc-600 mb-3">
                        {mode === 'cosmetics' ? 'Upload selfie or skin photo' : 'Upload your outfit'}
                      </p>
                      <p className="text-zinc-800 text-xs font-light mb-8">JPG, PNG, HEIC — any device</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <span className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/40 px-5 py-3">
                          Choose File
                        </span>
                        <span
                          onClick={(e) => { e.stopPropagation(); cameraRef.current?.click() }}
                          className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 border border-[#111] px-5 py-3 hover:border-[#c9a054]/30 transition-colors duration-400">
                          Use Camera
                        </span>
                      </div>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden"
                      onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], mode) }} />
                    <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
                      onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], mode) }} />
                  </div>
                ) : (
                  <div className="relative">
                    <img src={imageUrl} alt="Uploaded" className="w-full object-cover max-h-[420px]"
                      style={{ filter: 'contrast(1.05)' }} />
                    {scanState === 'scanning' && (
                      <div className="absolute inset-0 bg-[#050505]/70 flex flex-col items-center justify-center gap-5">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a054] to-transparent animate-pulse" />
                        <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] animate-pulse">Analyzing Color Profile...</p>
                        {/* Scan line animation */}
                        <motion.div className="absolute inset-x-0 h-0.5 bg-[#c9a054]/40"
                          animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                      </div>
                    )}
                    {colorHex && scanState === 'done' && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-[#050505]/85 backdrop-blur-sm px-3 py-2">
                        <div className="w-5 h-5 rounded-sm border border-zinc-700" style={{ backgroundColor: colorHex }} />
                        <div>
                          <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600">Dominant Color</p>
                          <p className="text-[9px] text-zinc-300 font-mono">{colorHex.toUpperCase()}</p>
                        </div>
                      </div>
                    )}
                    <button onClick={resetMode} className="absolute top-3 right-3 bg-[#050505]/80 text-zinc-600 text-[7px] tracking-[0.35em] uppercase px-3 py-2 hover:text-[#c9a054] transition-colors duration-400">
                      ← Reset
                    </button>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div>
                <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-6">
                  {scanState === 'idle' ? 'Sovereign Matches Will Appear Here' :
                   scanState === 'scanning' ? 'Scanning Your Profile...' : 'Your Sovereign Matches'}
                </p>

                {scanState === 'idle' && (
                  <div className="border border-[#0a0a0a] py-20 text-center">
                    <p className="font-serif font-light text-3xl text-zinc-800">Upload to begin</p>
                  </div>
                )}

                {scanState === 'scanning' && (
                  <div className="space-y-3">
                    {[1,2].map(n => (
                      <div key={n} className="border border-[#0a0a0a] p-5 animate-pulse">
                        <div className="h-3 w-32 bg-[#111] mb-3" />
                        <div className="h-5 w-48 bg-[#0d0d0d] mb-2" />
                        <div className="h-3 w-full bg-[#0a0a0a]" />
                      </div>
                    ))}
                  </div>
                )}

                {scanState === 'done' && recommendations.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease }}
                    className="space-y-3">
                    {recommendations.map((rec, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: i * 0.15 }}
                        className="border border-[#0d0d0d] p-5 md:p-6 hover:border-[#c9a054]/20 transition-colors duration-500">
                        <p className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] mb-2">{rec.category}</p>
                        <h3 className="font-serif font-light text-lg md:text-xl tracking-[0.06em] text-zinc-200 mb-2">{rec.name}</h3>
                        <p className="text-zinc-600 text-xs font-light leading-relaxed mb-4">{rec.desc}</p>
                        <div className="flex items-center justify-between mb-5">
                          <p className="text-zinc-300 text-sm font-light">{rec.price}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a href={rec.href || '/shop'}
                            className="group relative inline-flex items-center justify-center px-5 py-3 border border-[#c9a054]/50 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] overflow-hidden flex-1">
                            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-600" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Buy Now</span>
                          </a>
                          <a href="/concierge"
                            className="inline-flex items-center justify-center px-5 py-3 border border-[#111] text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-all duration-500 flex-1">
                            Book Consultation
                          </a>
                        </div>
                      </motion.div>
                    ))}
                    <div className="pt-3 text-center">
                      <button onClick={resetMode} className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-400">
                        Try Another Scan →
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── PERFUME QUIZ ─── */}
        {mode === 'perfume' && (
          <motion.section key="perfume" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="px-5 md:px-12 lg:px-20 py-10 md:py-16">
            <button onClick={resetMode} className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-400 mb-8">
              ← Back
            </button>

            <AnimatePresence mode="wait">
              {scanState === 'idle' && quizStep < PERFUME_QUIZ.length && (
                <motion.div key={`q${quizStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5, ease }}
                  className="max-w-lg">
                  <div className="flex gap-2 mb-8">
                    {PERFUME_QUIZ.map((_, i) => (
                      <div key={i} className={`h-0.5 flex-1 transition-colors duration-500 ${i <= quizStep ? 'bg-[#c9a054]' : 'bg-[#111]'}`} />
                    ))}
                  </div>
                  <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-5">
                    Question {quizStep + 1} of {PERFUME_QUIZ.length}
                  </p>
                  <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.05em] text-zinc-200 mb-10">
                    {PERFUME_QUIZ[quizStep].q}
                  </h2>
                  <div className="space-y-3">
                    {PERFUME_QUIZ[quizStep].opts.map(opt => (
                      <button key={opt.val} onClick={() => handleQuizAnswer(opt.val)}
                        className="w-full text-left border border-[#0d0d0d] px-6 py-5 text-sm font-light text-zinc-400 hover:text-zinc-100 hover:border-[#c9a054]/30 hover:bg-[#080808] transition-all duration-400">
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {scanState === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 gap-6">
                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a054] to-transparent animate-pulse" />
                  <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] animate-pulse">Matching Your Sovereign Fragrance...</p>
                  <p className="text-zinc-700 text-xs font-light">Analyzing vibe profile</p>
                </motion.div>
              )}

              {scanState === 'done' && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }}>
                  <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-700 mb-8">Your Sovereign Fragrance Match</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {recommendations.map((rec: any, i: number) => (
                      <motion.div key={rec.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: i * 0.15 }}
                        className="border border-[#0d0d0d] p-6 hover:border-[#c9a054]/20 transition-colors duration-500">
                        <p className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] mb-2">{rec.category}</p>
                        <h3 className="font-serif font-light text-xl tracking-[0.06em] text-zinc-200 mb-2">{rec.name}</h3>
                        <p className="text-zinc-600 text-xs font-light leading-relaxed mb-5">{rec.desc}</p>
                        <p className="text-zinc-300 text-sm font-light mb-5">{rec.price}</p>
                        <div className="flex flex-col gap-2">
                          <a href={rec.href}
                            className="group relative inline-flex items-center justify-center px-5 py-3 border border-[#c9a054]/50 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] overflow-hidden">
                            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-600" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Buy Now</span>
                          </a>
                          <a href="/concierge"
                            className="inline-flex items-center justify-center px-5 py-3 border border-[#111] text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-all duration-500">
                            Book In-Store Trial
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <button onClick={resetMode} className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-400">
                    ← Try Another Mode
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── HOW IT WORKS ─── */}
      {mode === 'select' && (
        <section className="border-t border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-12 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-8 md:mb-12">How It Works</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#0a0a0a]">
              {[
                { n: '01', t: 'Choose Mode', d: 'Cosmetics, Jewelry, or Fragrance scanner' },
                { n: '02', t: 'Upload or Answer', d: 'Photo upload or 3-question vibe quiz' },
                { n: '03', t: 'AI Color Scan', d: 'Color extraction from your image in real-time' },
                { n: '04', t: 'Sovereign Match', d: 'Buy directly or book an in-store consultation' },
              ].map((s, i) => (
                <div key={s.n} className="bg-[#050505] px-5 md:px-7 py-8 md:py-10">
                  <p className="font-serif font-light text-3xl text-[#c9a054]/20 mb-4">{s.n}</p>
                  <h4 className="font-serif font-light text-base text-zinc-300 mb-2 tracking-[0.06em]">{s.t}</h4>
                  <p className="text-zinc-700 text-xs font-light">{s.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  )
}
