import { Metadata } from 'next'
import ArticleClient from './ArticleClient'

const BASE = 'https://shamimforever.com'

type ArticleMeta = {
  title: string; description: string; image: string
  category: string; date: string; keywords: string[]
}

const ARTICLE_META: Record<string, ArticleMeta> = {
  'founders-vision': {
    title: "The Founder's Vision: Why Shamim Forever Was Created",
    description: "Discover the story behind Shamim Forever — a luxury house built on timeless craftsmanship, authentic curation, and a founder's vision to create a lasting legacy beyond products.",
    image: `${BASE}/founders-portrait.jpg`,
    category: 'Vision', date: '2025-06-01',
    keywords: ['Shamim Forever founder', 'Shamim Forever vision', 'Orakzai founder', 'OKBOND loyalty', 'luxury house legacy', 'Shamim Forever story', 'luxury brand Pakistan', 'Faisalorakzai luxury'],
  },
  'architecture-of-scent': {
    title: 'The Architecture of Scent: Why Structure Precedes Soul',
    description: 'Inside the Shamim Forever perfumery atelier — where restraint, structure, and silence create fragrance compositions that endure for decades.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=85',
    category: 'Craft', date: '2025-05-01',
    keywords: ['luxury perfumery', 'bespoke fragrance', 'Shamim Forever fragrance', 'fine perfume craft', 'luxury scent composition', 'artisan perfume Pakistan'],
  },
  'sovereign-materials': {
    title: 'Sovereign Materials: A Journey from Khyber to Grasse',
    description: 'How Shamim Forever sources the world\'s most precious fragrance ingredients — from the mountains of Khyber Pass to the lavender fields of Grasse, France.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    category: 'Heritage', date: '2025-04-15',
    keywords: ['luxury fragrance ingredients', 'oud Khyber', 'Grasse perfumery', 'rare perfume materials', 'Shamim Forever heritage', 'luxury ingredient sourcing'],
  },
  'okbond-digital-sovereignty': {
    title: 'OKBOND: Redefining Luxury Currency in the Digital Age',
    description: 'How the OKBOND program is creating a new form of luxury sovereignty — a digital currency built on trust, craftsmanship, and lifetime loyalty by Shamim Forever.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85',
    category: 'Innovation', date: '2025-04-01',
    keywords: ['OKBOND', 'Orakzai Bond', 'luxury loyalty program', 'digital luxury', 'Shamim Forever OKBOND', 'luxury digital currency', 'luxury blockchain Pakistan'],
  },
  'psychology-of-prestige': {
    title: 'The Psychology of Prestige | Shamim Forever',
    description: 'Why prestige is not manufactured but accumulated — the psychology behind luxury perception, identity, and how the greatest luxury houses build trust over decades.',
    image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1200&q=85',
    category: 'Sovereignty', date: '2025-03-15',
    keywords: ['psychology of luxury', 'luxury prestige', 'luxury brand psychology', 'Shamim Forever journal', 'luxury identity', 'luxury brand perception'],
  },
  'silence-new-luxury': {
    title: 'Why Silence Is the New Luxury | Shamim Forever Journal',
    description: 'In a world of maximum noise, silence has become the ultimate status signal. How the most prestigious luxury houses use restraint as their most powerful communication.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
    category: 'Culture', date: '2025-03-01',
    keywords: ['luxury brand strategy', 'luxury silence', 'luxury marketing', 'Shamim Forever culture', 'luxury communication strategy', 'prestige brand Pakistan'],
  },
  'future-sovereign-commerce': {
    title: 'The Future of Sovereign Commerce | Shamim Forever',
    description: 'How Shamim Forever is building independent luxury commerce infrastructure — owning the entire system that connects the house to its collectors worldwide.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=85',
    category: 'Digital Luxury', date: '2025-02-15',
    keywords: ['luxury ecommerce', 'sovereign commerce', 'luxury digital commerce', 'Shamim Forever digital', 'luxury brand independence', 'luxury platform Pakistan'],
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = ARTICLE_META[params.slug]
  if (!a) return { title: 'Article | Shamim Forever Journal' }
  const url = `${BASE}/journal/${params.slug}`
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    authors: [{ name: 'Shamim Forever', url: BASE }],
    openGraph: {
      title: a.title, description: a.description, url,
      type: 'article', siteName: 'Shamim Forever', locale: 'en_US',
      publishedTime: a.date, authors: ['Shamim Forever'], section: a.category,
      images: [{ url: a.image, width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: 'summary_large_image', title: a.title, description: a.description,
      images: [a.image], site: '@shamimforever', creator: '@shamimforever',
    },
    alternates: { canonical: url },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(ARTICLE_META).map(slug => ({ slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = ARTICLE_META[params.slug]

  const jsonLd = a ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${BASE}/journal/${params.slug}#article`,
        headline: a.title,
        description: a.description,
        image: { '@type': 'ImageObject', url: a.image, width: 1200, height: 630 },
        datePublished: a.date,
        dateModified: a.date,
        inLanguage: 'en-US',
        articleSection: a.category,
        keywords: a.keywords.join(', '),
        url: `${BASE}/journal/${params.slug}`,
        isPartOf: { '@type': 'Blog', '@id': `${BASE}/journal`, name: 'Shamim Forever Journal' },
        author: {
          '@type': 'Person',
          name: 'Shamim Forever',
          url: BASE,
          sameAs: [BASE, 'https://www.instagram.com/shamimforever'],
        },
        publisher: {
          '@type': 'Organization',
          name: 'Shamim Forever',
          url: BASE,
          logo: { '@type': 'ImageObject', url: `${BASE}/favicon.ico` },
          sameAs: [BASE],
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/journal/${params.slug}` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE}/journal/${params.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Journal', item: `${BASE}/journal` },
          { '@type': 'ListItem', position: 3, name: a.title, item: `${BASE}/journal/${params.slug}` },
        ],
      },
    ],
  } : null

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <ArticleClient slug={params.slug} />
    </>
  )
}
