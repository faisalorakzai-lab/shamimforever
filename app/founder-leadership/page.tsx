import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { leaders, principles } from './content'

const siteUrl = 'https://www.shamimforever.com'

export const metadata: Metadata = {
  title: 'Founder & Leadership | The People Behind the Legacy',
  description:
    'Meet Faisal Orakzai, Dr Asma Orakzai, and Dr Laiba Faisal Orakzai — the leadership team shaping Shamim Forever with vision, craftsmanship, and enduring ambition.',
  keywords: [
    'Shamim Forever founder',
    'Shamim Forever leadership',
    'Faisal Orakzai Founder Chairman',
    'Dr Asma Orakzai Chief Executive Officer',
    'Dr Laiba Faisal Orakzai Director',
    'luxury house leadership',
    'Pakistani luxury brand founder',
  ],
  authors: [{ name: 'Shamim Forever' }, { name: 'Faisal Orakzai' }],
  alternates: { canonical: `${siteUrl}/founder-leadership` },
  openGraph: {
    title: 'Founder & Leadership | The People Behind the Legacy',
    description:
      'The people behind Shamim Forever: a leadership team united by a long-term vision for luxury, identity, innovation, and enduring value.',
    url: `${siteUrl}/founder-leadership`,
    siteName: 'Shamim Forever',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/leadership/faisal-orakzai.webp`,
        width: 1024,
        height: 1024,
        alt: 'Faisal Orakzai, Founder and Chairman of Shamim Forever',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder & Leadership | Shamim Forever',
    description:
      'Meet the leadership team shaping Shamim Forever with vision, craftsmanship, and enduring ambition.',
    images: [`${siteUrl}/leadership/faisal-orakzai.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const personSchema = leaders.map((leader) => ({
  '@type': 'Person',
  '@id': `${siteUrl}/founder-leadership#${leader.id}`,
  name: leader.name,
  jobTitle: leader.role,
  url: `${siteUrl}/founder-leadership#${leader.id}`,
  image: `${siteUrl}${leader.image}`,
  description: `${leader.name} serves as ${leader.role} of Shamim Forever.`,
  worksFor: { '@id': `${siteUrl}/#organization` },
  mainEntityOfPage: { '@id': `${siteUrl}/founder-leadership#page` },
}))

const leadershipJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/founder-leadership#page`,
      url: `${siteUrl}/founder-leadership`,
      name: 'Founder & Leadership | Shamim Forever',
      description: metadata.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${siteUrl}/leadership/faisal-orakzai.webp`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/founder-leadership#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Founder & Leadership',
          item: `${siteUrl}/founder-leadership`,
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Shamim Forever',
      url: siteUrl,
      logo: `${siteUrl}/logo-sf.png`,
      description:
        'A global luxury digital house shaped by bespoke fragrances, sovereign jewellery, couture, and enduring craftsmanship.',
      founder: { '@id': `${siteUrl}/founder-leadership#faisal-orakzai` },
      employee: leaders.map((leader) => ({ '@id': `${siteUrl}/founder-leadership#${leader.id}` })),
      knowsAbout: [
        'Luxury house leadership',
        'Bespoke fragrances',
        'Couture jewellery',
        'Digital luxury',
        'Blockchain-verified authenticity',
        'Brand stewardship',
      ],
      sameAs: [
        'https://www.instagram.com/shamimforever',
        'https://www.linkedin.com/company/shamimforever',
        'https://www.theorg.com/org/shamim-forever',
      ],
    },
    ...personSchema,
  ],
}

function LeadershipCard({
  leader,
  featured = false,
}: {
  leader: (typeof leaders)[number]
  featured?: boolean
}) {
  return (
    <article
      id={leader.id}
      className={`group border border-[#24201a] bg-[#090909] ${
        featured ? 'lg:grid lg:grid-cols-[0.92fr_1.08fr]' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'min-h-[420px] lg:min-h-full' : 'aspect-[4/5]'}`}>
        <Image
          src={leader.image}
          alt={leader.imageAlt}
          fill
          priority={leader.id === 'faisal-orakzai'}
          sizes={featured ? '(max-width: 1024px) 100vw, 46vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover grayscale-[12%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/75 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.35em] text-[#e0b86f]">
          Shamim Forever
        </div>
      </div>
      <div className={featured ? 'flex flex-col justify-center p-7 md:p-12' : 'p-6'}>
        <p className="text-[10px] uppercase tracking-[0.38em] text-[#c9a054]">{leader.role}</p>
        <h3 className={`mt-3 font-light text-zinc-100 ${featured ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
          {leader.name}
        </h3>
        <p className="mt-5 text-sm leading-7 text-zinc-400">{leader.intro}</p>
        {!featured && (
          <Link
            href={`#${leader.id}-profile`}
            className="mt-6 inline-block text-[10px] uppercase tracking-[0.3em] text-[#c9a054] transition hover:text-[#f0d08b]"
          >
            Read biography →
          </Link>
        )}
      </div>
    </article>
  )
}

export default function FounderLeadershipPage() {
  const founder = leaders[0]
  const executiveLeaders = leaders.slice(1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipJsonLd) }}
      />

      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <section className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden border-b border-[#1b1814] px-6 pb-24 pt-32 md:px-12 lg:px-20">
          <div className="pointer-events-none absolute -right-16 top-10 select-none font-serif text-[28rem] font-light leading-none text-[#c9a054]/[0.025]">
            SF
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,160,84,0.12),transparent_62%)]" />
          <div className="relative mx-auto w-full max-w-[1180px]">
            <p className="text-[10px] uppercase tracking-[0.55em] text-[#c9a054]">The House</p>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-tight text-[#eee9df] md:text-8xl">
              The People Behind
              <br />
              <span className="text-[#c9a054]">the Legacy</span>
            </h1>
            <p className="mt-9 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              A shared vision shaped by leadership, craftsmanship, ambition, and a commitment to building a legacy designed to endure.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              Shamim Forever is guided by a leadership team united by a long-term vision for luxury, identity, innovation, and enduring value.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <a href="#leadership" className="border border-[#c9a054] px-7 py-3 text-[10px] uppercase tracking-[0.35em] text-[#c9a054] transition hover:bg-[#c9a054] hover:text-[#050505]">
                Meet the leadership
              </a>
              <Link href="/about" className="border border-[#29251f] px-7 py-3 text-[10px] uppercase tracking-[0.35em] text-zinc-500 transition hover:border-[#c9a054] hover:text-[#c9a054]">
                Our story
              </Link>
            </div>
            <a href="#leadership" className="mt-20 inline-flex items-center gap-4 text-[9px] uppercase tracking-[0.45em] text-zinc-600">
              <span className="h-12 w-px bg-[#c9a054]" />
              Scroll to leadership
            </a>
          </div>
        </section>

        <section className="border-b border-[#1b1814] px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">Leadership</p>
              <h2 className="mt-5 max-w-md font-serif text-4xl font-light leading-tight text-[#eee9df] md:text-6xl">
                Building More Than a Brand.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-zinc-400">
              <p>
                Shamim Forever is built around the belief that a lasting luxury house requires more than exceptional creations. It requires vision, discipline, stewardship, and a commitment to protecting the identity of the House across generations.
              </p>
              <p>
                Our leadership brings together entrepreneurial vision, executive direction, and strategic oversight to guide the evolution of Shamim Forever.
              </p>
            </div>
          </div>
        </section>

        <section id="leadership" className="px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">The Leadership</p>
                <h2 className="mt-4 font-serif text-4xl font-light text-[#eee9df] md:text-6xl">One House. One Vision.</h2>
              </div>
              <p className="hidden max-w-xs text-right text-xs leading-6 text-zinc-600 md:block">
                The people responsible for the vision, direction, and stewardship of Shamim Forever.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {leaders.map((leader) => (
                <LeadershipCard key={leader.id} leader={leader} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#1b1814] bg-[#080808] px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">Founder</p>
              <h2 className="mt-4 font-serif text-4xl font-light text-[#eee9df] md:text-6xl">Vision with permanence.</h2>
            </div>
            <div id="faisal-orakzai-profile">
              <LeadershipCard leader={founder} featured />
            </div>
            <blockquote className="mx-auto mt-14 max-w-3xl text-center">
              <p className="font-serif text-3xl font-light italic leading-tight text-[#d7c5a1] md:text-5xl">
                “{founder.quote}”
              </p>
              <footer className="mt-6 text-[10px] uppercase tracking-[0.35em] text-[#c9a054]">
                Faisal Orakzai · Founder &amp; Chairman
              </footer>
            </blockquote>
          </div>
        </section>

        <section className="px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-12 max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">Executive direction</p>
              <h2 className="mt-4 font-serif text-4xl font-light text-[#eee9df] md:text-6xl">Leadership in motion.</h2>
            </div>
            <div className="space-y-16">
              {executiveLeaders.map((leader, index) => (
                <article
                  id={`${leader.id}-profile`}
                  key={leader.id}
                  className={`grid gap-8 border-t border-[#1b1814] pt-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 ${
                    index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#111] lg:aspect-[4/5]">
                    <Image
                      src={leader.image}
                      alt={leader.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a054]">{leader.role}</p>
                    <h3 className="mt-4 font-serif text-4xl font-light text-[#eee9df] md:text-6xl">{leader.name}</h3>
                    <div className="mt-7 space-y-5 text-sm leading-8 text-zinc-400">
                      {leader.bio.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <blockquote className="mt-8 border-l border-[#c9a054] pl-5">
                      <p className="font-serif text-2xl font-light italic leading-snug text-[#d7c5a1]">“{leader.quote}”</p>
                      <footer className="mt-3 text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                        {leader.name} · {leader.role}
                      </footer>
                    </blockquote>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#1b1814] bg-[#080808] px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-12 max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">The principles that guide the House</p>
              <h2 className="mt-4 font-serif text-4xl font-light text-[#eee9df] md:text-6xl">Built to endure.</h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#24201a] bg-[#24201a] md:grid-cols-5">
              {principles.map(([title, text], index) => (
                <article key={title} className="bg-[#080808] p-6 md:min-h-[230px]">
                  <p className="text-xs text-[#c9a054]">0{index + 1}</p>
                  <h3 className="mt-10 font-serif text-2xl font-light capitalize text-[#eee9df]">{title}</h3>
                  <p className="mt-4 text-xs leading-6 text-zinc-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">The House governance</p>
              <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#eee9df] md:text-6xl">
                Stewardship of the House.
              </h2>
            </div>
            <div className="space-y-6 text-sm leading-8 text-zinc-400">
              <p>
                The leadership of Shamim Forever is guided by a commitment to responsible stewardship. Strategic decisions are considered in relation to the long-term identity of the House, its standards, its clients, and the legacy it seeks to build.
              </p>
              <p>
                As Shamim Forever evolves, its leadership structure will continue to develop in support of responsible growth, operational excellence, and the preservation of the House&apos;s founding philosophy.
              </p>
              <div className="border-l border-[#c9a054] pl-6 pt-1 text-[#d7c5a1]">
                <p className="font-serif text-2xl font-light">One House. One Vision.</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-zinc-600">Vision · Execution · Stewardship · Growth</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1b1814] px-6 py-24 text-center md:px-12 lg:px-20">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">The legacy continues</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-light leading-tight text-[#eee9df] md:text-6xl">
            Built by Vision. Sustained by Stewardship.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-zinc-500">
            Shamim Forever is shaped by individuals who believe that the most meaningful creations are not built for attention alone, but for the generations that follow.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/about" className="border border-[#c9a054] px-8 py-3 text-[10px] uppercase tracking-[0.35em] text-[#c9a054] transition hover:bg-[#c9a054] hover:text-[#050505]">
              Our story
            </Link>
            <Link href="/atelier" className="border border-[#29251f] px-8 py-3 text-[10px] uppercase tracking-[0.35em] text-zinc-500 transition hover:border-[#c9a054] hover:text-[#c9a054]">
              Explore the atelier
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}