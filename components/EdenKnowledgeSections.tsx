'use client'

    import { useRef, useState } from 'react'
    import Link from 'next/link'
    import { Play, Pause, Maximize2, AlertTriangle } from 'lucide-react'
    import type { Product } from '@/types'
    import { EDEN_FAQS, EDEN_NOTES, EDEN_POSTER_PATH, EDEN_VIDEO_PATH } from '@/lib/eden-juicy-apple'

    const SERIF = "'Cormorant Garamond', Georgia, serif"
    const GOLD = '#c9a054'
    const INK = '#080604'
    const MUTED = 'rgba(240,236,228,0.58)'

    function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
    return <div id={id} style={{ textAlign: 'center', marginBottom: 42 }}>
      <p style={{ fontSize: 7, letterSpacing: '0.8em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>{eyebrow}</p>
      <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.04em', margin: 0 }}>{title}</h2>
      <div style={{ width: 64, height: 1, background: 'linear-gradient(90deg, transparent, ' + GOLD + ', transparent)', margin: '20px auto 0' }} />
    </div>
    }

    function EdenFilm() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [ready, setReady] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [error, setError] = useState(false)
    const toggle = async () => {
      const video = videoRef.current
      if (!video) return
      if (video.paused) { await video.play().catch(() => setError(true)); setPlaying(true) }
      else { video.pause(); setPlaying(false) }
    }
    return <section style={{ padding: 'clamp(56px,8vw,110px) 0', background: '#030303' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(18px,4vw,32px)' }}>
        <SectionHeading eyebrow="The Eden Film" title="Juicy light. Floral radiance. Sensual warmth." />
        <div style={{ position: 'relative', maxWidth: 540, margin: '0 auto', border: '1px solid rgba(201,160,84,0.24)', background: INK, overflow: 'hidden' }}>
          {error ? <div style={{ aspectRatio: '9/16', display: 'grid', placeItems: 'center', background: 'linear-gradient(160deg,#160d08,#050403)' }}><div style={{ textAlign: 'center', padding: 28 }}><AlertTriangle color={GOLD} size={22} /><p style={{ color: MUTED, fontSize: 12, lineHeight: 1.7, margin: '14px 0 0' }}>The Eden film is temporarily unavailable. The product poster remains available.</p><img src={EDEN_POSTER_PATH} alt="SF Eden Juicy Apple Inspired perfume by Shamim Forever" style={{ width: '100%', marginTop: 18, opacity: .7 }} /></div></div> : <video ref={videoRef} controls playsInline preload="metadata" poster={EDEN_POSTER_PATH} onLoadedData={() => setReady(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setError(true)} style={{ display: 'block', width: '100%', aspectRatio: '9/16', objectFit: 'cover', background: '#050403' }}><source src={EDEN_VIDEO_PATH} type="video/mp4" /></video>}
          {!error && <button type="button" onClick={toggle} aria-label={playing ? 'Pause the Eden film' : 'Play the Eden film'} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 70, height: 70, borderRadius: '50%', border: '1px solid rgba(240,236,228,.6)', background: 'rgba(5,4,3,.72)', color: '#f0ece4', display: 'grid', placeItems: 'center', cursor: 'pointer', opacity: playing ? .12 : 1, transition: 'opacity .25s' }}>{playing ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}</button>}
          {!error && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}><span style={{ color: ready ? GOLD : 'rgba(240,236,228,.5)', fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase' }}>{ready ? 'Ready to play' : 'Loading film'}</span><Maximize2 size={13} color="rgba(240,236,228,.65)" /></div>}
        </div>
        <p style={{ maxWidth: 640, margin: '24px auto 0', textAlign: 'center', color: 'rgba(240,236,228,.42)', fontSize: 12, lineHeight: 1.8 }}>A Shamim Forever product film for SF Eden Juicy Apple Inspired. This is a House creation and is not an official KAYALI commercial.</p>
      </div>
    </section>
    }

    function NoteGroup({ title, notes, tone }: { title: string; notes: readonly string[]; tone: string }) {
    return <div style={{ padding: '26px 22px', background: '#090705', borderTop: '2px solid ' + tone }}><p style={{ color: tone, fontSize: 7, letterSpacing: '.6em', textTransform: 'uppercase', marginBottom: 14 }}>{title}</p>{notes.map((note) => <p key={note} style={{ color: '#d8cbb6', fontFamily: SERIF, fontSize: 21, fontWeight: 300, margin: '10px 0' }}>{note}</p>)}</div>
    }

    export default function EdenKnowledgeSections({ product }: { product: Product }) {
    return <>
      <EdenFilm />
      <section style={{ padding: 'clamp(56px,8vw,110px) 0', background: 'linear-gradient(180deg,#060403,#0b0704,#030303)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(18px,4vw,32px)' }}>
          <SectionHeading eyebrow="The Olfactive Identity" title="A red-apple pulse through a luminous floral heart" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 1, background: 'rgba(201,160,84,.16)' }}>
            <NoteGroup title="Top Notes · First Impression" notes={EDEN_NOTES.top} tone="#e2a47f" />
            <NoteGroup title="Heart Notes · Radiance" notes={EDEN_NOTES.heart} tone="#d58e9d" />
            <NoteGroup title="Dry Notes · Sensual Warmth" notes={EDEN_NOTES.dry} tone="#c9a054" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 1, background: 'rgba(201,160,84,.12)', marginTop: 36 }}>
            {[['01', 'The First Impression', 'Juicy · Bright · Sparkling'], ['02', 'The Heart', 'Fruity · Floral · Playful'], ['03', 'The Dry Down', 'Soft · Warm · Sensual']].map(([n, t, copy]) => <div key={n} style={{ padding: '24px 20px', background: '#080604' }}><p style={{ color: GOLD, fontSize: 8, letterSpacing: '.4em' }}>{n}</p><h3 style={{ color: '#f0ece4', fontFamily: SERIF, fontSize: 25, fontWeight: 300, margin: '10px 0' }}>{t}</h3><p style={{ color: MUTED, fontSize: 12 }}>{copy}</p></div>)}
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(56px,8vw,110px) 0', background: '#030303' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(18px,4vw,32px)' }}>
          <SectionHeading eyebrow="The Eden Concept" title="Biting into summer light" />
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.35rem,3vw,2.25rem)', color: '#f0ece4', lineHeight: 1.35, textAlign: 'center', maxWidth: 760, margin: '0 auto 32px' }}>A fragrance built around the feeling of biting into a perfectly ripe red apple beneath bright summer light.</p>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.9, textAlign: 'center', maxWidth: 740, margin: '0 auto 40px' }}>The composition moves from crisp fruit into a colorful floral heart before settling into a soft, sensual foundation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 1, background: 'rgba(201,160,84,.14)' }}>{[['APPLE','Juicy optimism'],['BERRIES','Playful energy'],['FLORALS','Radiance'],['VANILLA','Warmth'],['MUSK','Sensuality'],['AMBER','Depth']].map(([t, d]) => <div key={t} style={{ padding: '24px 18px', background: '#090705' }}><p style={{ color: GOLD, fontSize: 8, letterSpacing: '.45em' }}>{t}</p><p style={{ color: '#d8cbb6', fontFamily: SERIF, fontSize: 19, margin: '10px 0 0' }}>{d}</p></div>)}</div>
        </div>
      </section>
      <section style={{ padding: 'clamp(56px,8vw,110px) 0', background: '#080604' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(18px,4vw,32px)' }}>
          <SectionHeading eyebrow="The Shamim Interpretation" title="A House creation, clearly identified" />
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 1, background: 'rgba(201,160,84,.15)' }}>
            <div style={{ padding: '34px 28px', background: '#0a0704' }}><p style={{ color: '#d8cbb6', fontFamily: SERIF, fontSize: 24, lineHeight: 1.55, margin: 0 }}>SF Eden Juicy Apple Inspired is a House of Shamim interpretation of a vibrant fruity-floral fragrance profile associated with KAYALI Eden Juicy Apple | 01. It is presented as an inspired creation within the Shamim Forever fragrance world and is not represented as the original KAYALI product.</p></div>
            <div style={{ padding: '34px 28px', background: '#060403', borderLeft: '1px solid rgba(201,160,84,.15)' }}><p style={{ color: GOLD, fontSize: 8, letterSpacing: '.35em', textTransform: 'uppercase', lineHeight: 1.7 }}>Reference disclosure</p><p style={{ color: MUTED, fontSize: 13, lineHeight: 1.8 }}>KAYALI Eden Juicy Apple | 01 is a reference fragrance. Shamim Forever is not claiming affiliation, endorsement or ownership of the KAYALI brand.</p></div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(56px,8vw,110px) 0', background: '#030303' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 clamp(18px,4vw,32px)' }}>
          <SectionHeading eyebrow="The Eden Ritual" title="When to wear · how to preserve" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 1, background: 'rgba(201,160,84,.14)' }}>
            <div style={{ padding: 28, background: '#090705' }}><p style={{ color: GOLD, fontSize: 8, letterSpacing: '.45em', textTransform: 'uppercase' }}>Wear it for</p><p style={{ color: '#d8cbb6', fontFamily: SERIF, fontSize: 22, lineHeight: 1.6 }}>Daytime · Brunch · Summer occasions · Casual luxury · Social gatherings · Date nights · Travel · Gifting · Signature wear · Private occasions</p></div>
            <div style={{ padding: 28, background: '#090705' }}><p style={{ color: GOLD, fontSize: 8, letterSpacing: '.45em', textTransform: 'uppercase' }}>Application & care</p><p style={{ color: MUTED, fontSize: 13, lineHeight: 1.9 }}>Apply lightly to wrists, neck, behind ears and pulse points. Allow it to develop naturally and avoid excessive rubbing. Keep away from direct sunlight, excessive heat and repeated temperature changes.</p></div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(56px,8vw,110px) 0', background: '#080604' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(18px,4vw,32px)' }}>
          <SectionHeading eyebrow="The Eden Dossier" title="A complete product record" />
          <div style={{ borderTop: '1px solid rgba(201,160,84,.2)' }}>{['01 · The Creation','02 · The Inspiration','03 · The Olfactive Identity','04 · The Opening','05 · The Heart','06 · The Dry Down','07 · When to Wear','08 · Application & Care','09 · The Archive Object','10 · Authentication','11 · Wallet Safety','12 · Fragrance FAQ'].map((item) => <p key={item} style={{ margin: 0, padding: '17px 0', borderBottom: '1px solid rgba(201,160,84,.1)', color: '#d8cbb6', fontFamily: SERIF, fontSize: 21 }}>{item}</p>)}</div>
          <div style={{ marginTop: 32, padding: 26, border: '1px solid rgba(201,160,84,.15)', background: '#090705' }}><p style={{ color: GOLD, fontSize: 8, letterSpacing: '.45em', textTransform: 'uppercase' }}>Archive object</p><p style={{ color: MUTED, fontSize: 13, lineHeight: 1.85, marginBottom: 0 }}>House: Shamim Forever · Category: Perfume · Collection: Inspired Collection · Archive Status: Heritage Archive · Allocation Price: $190 USD · Digital Passport: Not currently verified for this product.</p></div>
        </div>
      </section>
      <section id="eden-faq" style={{ padding: 'clamp(56px,8vw,110px) 0', background: '#030303' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(18px,4vw,32px)' }}>
          <SectionHeading eyebrow="Fragrance FAQ" title="Questions answered clearly" />
          {EDEN_FAQS.map(([question, answer]) => <details key={question} style={{ borderBottom: '1px solid rgba(201,160,84,.14)', padding: '18px 0' }}><summary style={{ cursor: 'pointer', color: '#d8cbb6', fontFamily: SERIF, fontSize: 21 }}>{question}</summary><p style={{ color: MUTED, fontSize: 13, lineHeight: 1.85, maxWidth: 760 }}>{answer}</p></details>)}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 42 }}><Link href="/authenticate" style={{ color: GOLD, border: '1px solid rgba(201,160,84,.35)', padding: '14px 20px', textDecoration: 'none', fontSize: 8, letterSpacing: '.35em', textTransform: 'uppercase' }}>Authentication</Link><Link href="#acquire" style={{ color: '#050403', background: GOLD, padding: '14px 20px', textDecoration: 'none', fontSize: 8, letterSpacing: '.35em', textTransform: 'uppercase' }}>Acquire Your Creation</Link></div>
        </div>
      </section>
    </>
    }
    