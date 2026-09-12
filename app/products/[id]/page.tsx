import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Product } from '@/types'
import SovereignProductPage from '@/components/SovereignProductPage'
import { SOVEREIGN_CONFIGS } from '@/lib/sovereign-configs'
import LuxuryGenericProductPage from '@/components/LuxuryGenericProductPage'
import GuestCurationProductPage from '@/components/GuestCurationProductPage'
import { GUEST_CURATION_SLUGS } from '@/lib/guest-curation-configs'
import { PRODUCT_IMAGE_OVERRIDES } from '@/lib/product-image-overrides'
import { SOVEREIGN_CONTRACT_ADDRESS, SOVEREIGN_NETWORK } from '@/lib/sovereign-contract'
import CosmeticsProductPage from '@/components/CosmeticsProductPage'
import JewelryProductPage from '@/components/JewelryProductPage'
import HimalayanSnowMuskPage from '@/components/HimalayanSnowMuskPage'
import LaVieEstBelleInspiredPage from '@/components/LaVieEstBelleInspiredPage'
import { LA_VIE_DESCRIPTION, LA_VIE_FAQS, LA_VIE_TITLE } from '@/lib/la-vie-est-belle'

export const revalidate = 300

const BASE_URL = 'https://www.shamimforever.com'
const SOVEREIGN_SLUGS = Object.keys(SOVEREIGN_CONFIGS)
const COSMETICS_CATEGORY_ID = '22226324-4789-419d-a9e2-f763df2d24f1'
const JEWELRY_CATEGORY_ID = 'e291b9af-a637-45da-a2df-d39f2e72e53c'
const BLOOM_CANONICAL_SLUG = 'shamim-bloom'
const HIMALAYAN_CANONICAL_SLUG = 'sf-himalayan-snow-musk'
const VANILLA_CANONICAL_SLUG = 'sf-sovereign-vanilla-absolute'
const ROSE_CANONICAL_SLUG = 'eternal-rose-de-taif'
const MIDNIGHT_CANONICAL_SLUG = 'sf-midnight-iris-royale'
const LA_VIE_CANONICAL_SLUG = 'la-vie-est-belle-inspired'
const LA_VIE_SLUGS = new Set(['la-vie-est-belle-inspired'])
const BLOOM_SLUGS = new Set(['shamim-bloom', 'shamims-bloom', 'shamim-bloom-the-sovereign-grace'])
const HIMALAYAN_SLUGS = new Set(['sf-himalayan-snow-musk', 'himalayan-snow-musk'])
const BLOOM_TITLE = 'Shamim Bloom — The Sovereign Grace | Luxury Fragrance & Digital Sovereign Passport'
const BLOOM_DESCRIPTION =
  'Discover Shamim Bloom, The Sovereign Grace. A 100ML luxury fragrance with an evolving floral composition, Founder Reserve allocation, digital provenance and a Polygon-based Sovereign Passport.'
const VANILLA_TITLE = 'SF Sovereign Vanilla Absolute | Luxury Vanilla Perfume'
const VANILLA_DESCRIPTION =
  'Discover SF Sovereign Vanilla Absolute by Shamim Forever: a refined Madagascar Bourbon vanilla fragrance with benzoin, tonka bean and white sandalwood, listed at $198 USD with a blockchain-linked Sovereign Passport.'
const ROSE_TITLE = 'Eternal Rose de Taif | Luxury Rose Perfume'
const ROSE_DESCRIPTION =
  'Discover Eternal Rose de Taif by Shamim Forever, a refined rose fragrance inspired by Taif rose and layered with white musk and Mysore sandalwood, listed at $245 USD with a Sovereign digital passport.'
const HIMALAYAN_TITLE = 'SF Himalayan Snow Musk | Luxury White Musk Perfume | Shamim Forever'
const HIMALAYAN_DESCRIPTION =
  'Discover SF Himalayan Snow Musk by Shamim Forever, a sovereign luxury perfume composed around high-altitude Himalayan white musk, bergamot, white florals and translucent sandalwood. $259 USD.'
const MIDNIGHT_TITLE = 'SF Midnight Iris Royale — Luxury Iris Perfume & Sovereign Digital Passport | Shamim Forever'
const MIDNIGHT_DESCRIPTION =
  'Discover SF Midnight Iris Royale, a sovereign feminine fragrance by Shamim Forever built around deep orris root, violet leaf, purple iris and powdery sandalwood, with a Polygon-based Digital Sovereign Passport.'

function isBloomSlug(slug: string) {
  return BLOOM_SLUGS.has(slug)
}

function isVanillaSlug(slug: string) {
  return slug === VANILLA_CANONICAL_SLUG
}

function isRoseSlug(slug: string) {
  return slug === ROSE_CANONICAL_SLUG
}

function isHimalayanSlug(slug: string) {
  return HIMALAYAN_SLUGS.has(slug)
}

function isMidnightSlug(slug: string) {
  return slug === 'sf-midnight-iris-royale' || slug === 'midnight-iris-royale'
}

function isLaVieSlug(slug: string) {
  return LA_VIE_SLUGS.has(slug)
}

function canonicalProductSlug(slug: string) {
  if (isBloomSlug(slug)) return BLOOM_CANONICAL_SLUG
  if (isHimalayanSlug(slug)) return HIMALAYAN_CANONICAL_SLUG
  if (isMidnightSlug(slug)) return MIDNIGHT_CANONICAL_SLUG
  if (isLaVieSlug(slug)) return LA_VIE_CANONICAL_SLUG
  return slug
}

function productImagePaths(product: Product): string[] {
  const override =
    PRODUCT_IMAGE_OVERRIDES[product.slug] ??
    (isBloomSlug(product.slug) ? PRODUCT_IMAGE_OVERRIDES[BLOOM_CANONICAL_SLUG] : undefined)
  const source = override ?? product.images ?? []
  const paths = Array.isArray(source) ? source : [source]
  return [...new Set(paths.filter((path): path is string => Boolean(path)))]
}

function absoluteProductImage(path: string) {
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
}

const LA_VIE_FALLBACK_PRODUCT = {
  id: 'e5534810-6c63-4ec8-8ca8-d177b347b725',
  collection_id: null,
  main_category_id: 'c513e298-7cb4-4c94-8288-19c6a12eed9b',
  sub_category_id: 'ab8df629-e022-41d9-a6de-fac63d5680e8',
  name: 'LA VIE EST BELLE INSPIRED',
  slug: LA_VIE_CANONICAL_SLUG,
  description: 'Sweet gourmand floral. Iris, patchouli, vanilla over praline and tonka bean. Joyful and warm.',
  story: null,
  price_pkr: 9800,
  price_usd: 35,
  inventory: 45,
  images: ['/products/la-vie-est-belle-inspired/hero.png'],
  is_featured: false,
  is_active: true,
  main_category: { name: 'Perfume' },
} as unknown as Product

async function getProduct(id: string): Promise<Product | null> {
  const { data: bySlug } = await supabaseAdmin
    .from('products')
    .select('*, main_category:main_categories(*)')
    .eq('slug', id)
    .maybeSingle()
  if (bySlug) return bySlug

  if (isBloomSlug(id) || isHimalayanSlug(id) || isMidnightSlug(id)) {
    const aliases = isHimalayanSlug(id)
      ? HIMALAYAN_SLUGS
      : isBloomSlug(id)
        ? BLOOM_SLUGS
        : new Set([MIDNIGHT_CANONICAL_SLUG, 'midnight-iris-royale'])
    for (const slug of aliases) {
      const { data: bloomProduct } = await supabaseAdmin
        .from('products')
        .select('*, main_category:main_categories(*)')
        .eq('slug', slug)
        .maybeSingle()
      if (bloomProduct) return bloomProduct
    }
  }

  const { data: byId } = await supabaseAdmin
    .from('products')
    .select('*, main_category:main_categories(*)')
    .eq('id', id)
    .maybeSingle()
  if (isLaVieSlug(id)) return LA_VIE_FALLBACK_PRODUCT
  return byId ?? null
}

async function getRelatedProducts(product: Product): Promise<Array<Pick<Product, 'id' | 'name' | 'slug' | 'price_usd' | 'images'>>> {
  try {
    let query = supabaseAdmin
      .from('products')
      .select('id, name, slug, price_usd, images')
      .eq('is_active', true)
      .neq('slug', product.slug)
      .limit(3)
    if (product.main_category_id) query = query.eq('main_category_id', product.main_category_id)
    const { data } = await query
    return (data ?? []) as Array<Pick<Product, 'id' | 'name' | 'slug' | 'price_usd' | 'images'>>
  } catch {
    return []
  }
}

/** Pre-render active products, then refresh them with ISR. */
export async function generateStaticParams() {
  try {
    const { data } = await supabaseAdmin
      .from('products')
      .select('slug')
      .eq('is_active', true)
    return (data ?? []).map((p: Pick<Product, 'slug'>) => ({ id: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) return { title: 'Product Not Found — Shamim Forever' }

  const bloom = isBloomSlug(product.slug) || isBloomSlug(params.id)
  const vanilla = isVanillaSlug(product.slug) || isVanillaSlug(params.id)
  const rose = isRoseSlug(product.slug) || isRoseSlug(params.id)
  const himalayan = isHimalayanSlug(product.slug) || isHimalayanSlug(params.id)
  const midnight = isMidnightSlug(product.slug) || isMidnightSlug(params.id)
  const laVie = isLaVieSlug(product.slug) || isLaVieSlug(params.id)
  const images = productImagePaths(product)
  const productImages = images.length ? images : ['/logo-sf.png']
  const productUrl = `${BASE_URL}/products/${canonicalProductSlug(product.slug)}`
  const title = laVie ? LA_VIE_TITLE : bloom ? BLOOM_TITLE : vanilla ? VANILLA_TITLE : himalayan ? HIMALAYAN_TITLE : rose ? ROSE_TITLE : midnight ? MIDNIGHT_TITLE : `${product.name} — Shamim Forever`
  const desc = laVie
    ? LA_VIE_DESCRIPTION
    : bloom
    ? BLOOM_DESCRIPTION
    : vanilla
      ? VANILLA_DESCRIPTION
      : himalayan
        ? HIMALAYAN_DESCRIPTION
        : rose
          ? ROSE_DESCRIPTION
          : midnight
            ? MIDNIGHT_DESCRIPTION
            : product.description
        ? product.description.slice(0, 160)
        : `${product.name} — sovereign luxury creation by Shamim Forever. Shop online in Pakistan & worldwide.`

  return {
    title: laVie ? { absolute: LA_VIE_TITLE } : title,
    description: desc,
    keywords: [
      product.name,
      ...(laVie ? ['La Vie Est Belle Inspired Perfume', 'luxury inspired perfume', 'floral gourmand perfume', 'sweet feminine perfume', 'iris vanilla perfume', 'praline vanilla fragrance', 'blackcurrant pear perfume', 'jasmine orange blossom perfume', 'Shamim Forever perfume'] : []),
      ...(bloom
        ? [
            'Shamim Bloom',
            'The Sovereign Grace',
            'luxury rose perfume',
            'Taif Rose perfume',
            '100ML extrait de parfum',
            'Founder Reserve fragrance',
            'digital sovereign passport',
            'Polygon NFT fragrance',
          ]
        : vanilla
          ? ['SF Sovereign Vanilla Absolute', 'Sovereign Vanilla Absolute', 'luxury vanilla perfume', 'Madagascar vanilla perfume', 'luxury vanilla fragrance', 'Shamim Forever Vanilla', 'luxury perfume with digital passport', 'blockchain authenticated perfume', 'Polygon luxury perfume']
          : himalayan
            ? ['SF Himalayan Snow Musk', 'Himalayan Snow Musk', 'luxury white musk perfume', 'Himalayan musk perfume', 'white musk fragrance', 'luxury musk fragrance', 'sovereign luxury perfume', 'premium white musk perfume', 'exclusive musk fragrance']
          : rose
            ? ['Eternal Rose de Taif', 'Eternal Rose de Taif perfume', 'Taif rose perfume', 'luxury rose perfume', 'Shamim Forever perfume', 'luxury rose fragrance', 'Taif rose fragrance', 'Mysore sandalwood rose perfume', 'white musk rose perfume', 'blockchain authenticated perfume', 'Polygon perfume passport', 'luxury digital passport']
            : midnight
              ? ['SF Midnight Iris Royale', 'Midnight Iris Royale', 'luxury iris perfume', 'orris root perfume', 'purple iris fragrance', 'violet leaf perfume', 'sandalwood iris perfume', 'luxury feminine perfume', 'luxury perfume Pakistan', 'luxury perfume France', 'sovereign luxury perfume', 'digital perfume passport', 'Polygon perfume NFT']
              : []),
      'Shamim Forever',
      'luxury fragrance Pakistan',
      'buy perfume online Pakistan',
      product.main_category?.name ?? 'luxury perfume',
      'best perfume brand Pakistan',
      'oud perfume Pakistan',
      'shamimforever.com',
    ],
    alternates: { canonical: productUrl },
    openGraph: {
      title,
      description: desc,
      url: productUrl,
      siteName: 'Shamim Forever',
      type: 'website',
      images: productImages.slice(0, 4).map((path) => ({
        url: absoluteProductImage(path),
        width: 1080,
        height: 1080,
        alt: bloom
          ? 'Shamim Bloom — The Sovereign Grace luxury fragrance'
          : himalayan
            ? 'SF Himalayan Snow Musk luxury white musk perfume'
          : midnight
            ? 'SF Midnight Iris Royale luxury iris perfume by Shamim Forever'
            : `${product.name} — Shamim Forever Luxury Collection`,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: productImages.slice(0, 4).map(absoluteProductImage),
    },
  }
}

function ProductJsonLd({ product }: { product: Product }) {
  const bloom = isBloomSlug(product.slug)
  const vanilla = isVanillaSlug(product.slug)
  const rose = isRoseSlug(product.slug)
  const himalayan = isHimalayanSlug(product.slug)
  const midnight = isMidnightSlug(product.slug)
  const laVie = isLaVieSlug(product.slug)
  const productImages = productImagePaths(product).map(absoluteProductImage)
  const images = productImages.length ? productImages : [`${BASE_URL}/logo-sf.png`]
  const productUrl = `${BASE_URL}/products/${canonicalProductSlug(product.slug)}`
  const isSovereign = !laVie && (SOVEREIGN_SLUGS.includes(product.slug) || himalayan || rose || midnight)
  const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const priceUsd = himalayan ? 259 : midnight ? 223 : Number(product.price_usd ?? (bloom ? 270 : 0))
  const pricePkr = himalayan ? 72000 : midnight ? 62000 : Number(product.price_pkr ?? (bloom ? 75000 : 0))
  const displayName = laVie ? 'La Vie Est Belle Inspired' : bloom ? 'Shamim Bloom — The Sovereign Grace' : vanilla ? 'SF Sovereign Vanilla Absolute' : himalayan ? 'SF Himalayan Snow Musk' : rose ? 'Eternal Rose de Taif' : midnight ? 'SF Midnight Iris Royale' : product.name
  const displayDescription = laVie
    ? LA_VIE_DESCRIPTION
    : bloom
    ? BLOOM_DESCRIPTION
    : vanilla
      ? VANILLA_DESCRIPTION
      : himalayan
        ? HIMALAYAN_DESCRIPTION
          : rose
          ? ROSE_DESCRIPTION
            : midnight
              ? MIDNIGHT_DESCRIPTION
              : product.description || `${product.name} — sovereign luxury creation by Shamim Forever`
  const additionalProperty = isSovereign
    ? [
        { '@type': 'PropertyValue', name: 'Blockchain Network', value: SOVEREIGN_NETWORK },
        { '@type': 'PropertyValue', name: 'NFT Sovereign Passport', value: 'Enabled where applicable' },
        {
          '@type': 'PropertyValue',
          name: 'Authentication',
          value: 'Digital provenance record linked to the physical creation where applicable',
        },
        { '@type': 'PropertyValue', name: 'Token Standard', value: 'ERC-721' },
        ...(bloom
          ? [
              { '@type': 'PropertyValue', name: 'Archive', value: 'Archive I' },
              { '@type': 'PropertyValue', name: 'Edition', value: 'Founder Reserve' },
              { '@type': 'PropertyValue', name: 'Volume', value: '100ML' },
              { '@type': 'PropertyValue', name: 'Concentration', value: 'Extrait de Parfum' },
              { '@type': 'PropertyValue', name: 'Fragrance Family', value: 'Floral / Amber / Musk / Woody' },
              { '@type': 'PropertyValue', name: 'Contract Address', value: SOVEREIGN_CONTRACT_ADDRESS },
              { '@type': 'PropertyValue', name: 'Founder Reserve Supply', value: '50 pieces' },
            ]
          : vanilla
            ? [
                { '@type': 'PropertyValue', name: 'Archive Class', value: 'Heritage Archive' },
                { '@type': 'PropertyValue', name: 'Core Material', value: 'Madagascar Bourbon Vanilla' },
                { '@type': 'PropertyValue', name: 'Supporting Materials', value: 'Benzoin, Tonka Bean, White Sandalwood' },
                { '@type': 'PropertyValue', name: 'Edition', value: 'House Allocation Reserve' },
                { '@type': 'PropertyValue', name: 'Serial', value: 'SF-FC57502B' },
              ]
            : himalayan
              ? [
                  { '@type': 'PropertyValue', name: 'Archive Class', value: 'Heritage Archive' },
                  { '@type': 'PropertyValue', name: 'Signature', value: 'Himalayan White Musk' },
                  { '@type': 'PropertyValue', name: 'Opening', value: 'Bergamot' },
                  { '@type': 'PropertyValue', name: 'Heart', value: 'White Florals' },
                  { '@type': 'PropertyValue', name: 'Base', value: 'Translucent Sandalwood' },
                  { '@type': 'PropertyValue', name: 'Edition', value: 'House Allocation Reserve' },
                  { '@type': 'PropertyValue', name: 'Contract Address', value: SOVEREIGN_CONTRACT_ADDRESS },
                ]
              : rose
                ? [
                    { '@type': 'PropertyValue', name: 'Archive Class', value: 'Heritage Archive' },
                    { '@type': 'PropertyValue', name: 'Rose Identity', value: 'Taif Rose' },
                    { '@type': 'PropertyValue', name: 'Supporting Note', value: 'White Musk' },
                    { '@type': 'PropertyValue', name: 'Foundation', value: 'Mysore Sandalwood' },
                    { '@type': 'PropertyValue', name: 'Edition', value: 'House Allocation Reserve' },
                    { '@type': 'PropertyValue', name: 'Serial', value: 'SF-E32B4700' },
                  ]
                : midnight
                  ? [
                      { '@type': 'PropertyValue', name: 'Archive Class', value: 'Heritage Archive' },
                      { '@type': 'PropertyValue', name: 'Serial', value: 'SF-7B962857' },
                      { '@type': 'PropertyValue', name: 'Olfactive Direction', value: 'Iris / Powdery Floral / Woody' },
                      { '@type': 'PropertyValue', name: 'Contract Address', value: SOVEREIGN_CONTRACT_ADDRESS },
                    ]
                  : []),
      ]
    : undefined

  const productSchema = {
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: displayName,
    alternateName: bloom ? ['Shamim Bloom', 'The Sovereign Grace'] : midnight ? ['Midnight Iris Royale', 'The Sovereign Iris'] : undefined,
    description: displayDescription,
    image: images,
    url: productUrl,
    sku: midnight ? 'SF-7B962857' : product.slug,
    brand: { '@type': 'Brand', name: 'Shamim Forever', logo: `${BASE_URL}/logo-sf.png` },
    manufacturer: { '@type': 'Organization', name: 'Shamim Forever', url: BASE_URL },
    category: product.main_category?.name || 'Luxury Fragrance',
    audience: bloom || vanilla || rose || midnight
      ? { '@type': 'PeopleAudience', audienceType: 'Luxury fragrance collectors', suggestedGender: 'Female' }
      : undefined,
    offers: [
      {
        '@type': 'Offer',
        price: priceUsd,
        priceCurrency: 'USD',
        priceValidUntil,
        availability:
          (product.inventory ?? 1) > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: 'Shamim Forever', url: BASE_URL },
        url: productUrl,
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'PK',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        },
      },
      ...(pricePkr > 0
        ? [
            {
              '@type': 'Offer',
              price: pricePkr,
              priceCurrency: 'PKR',
              priceValidUntil,
              availability:
                (product.inventory ?? 1) > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: { '@type': 'Organization', name: 'Shamim Forever', url: BASE_URL },
              url: productUrl,
            },
          ]
        : []),
    ],
    ...(additionalProperty ? { additionalProperty } : {}),
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${productUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${BASE_URL}/shop` },
      ...(product.main_category
        ? [{ '@type': 'ListItem', position: 3, name: product.main_category.name, item: `${BASE_URL}/shop` }]
        : []),
      {
        '@type': 'ListItem',
        position: product.main_category ? 4 : 3,
        name: displayName,
        item: productUrl,
      },
    ],
  }

  const faq = laVie
    ? {
        '@type': 'FAQPage',
        '@id': `${productUrl}#faq`,
        mainEntity: LA_VIE_FAQS.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      }
    : bloom
    ? {
        '@type': 'FAQPage',
        '@id': `${productUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does Shamim Bloom last?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Shamim Bloom is presented with an estimated performance of approximately 12–18 hours. Actual longevity varies by skin chemistry, climate, application and environment.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is Shamim Bloom?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Shamim Bloom — The Sovereign Grace is a 100ML Extrait de Parfum built around Taif Rose Absolute, Turkish Rose Resin, amber, musk and creamy woods.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the Shamim Bloom Sovereign Passport?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Sovereign Passport is a digital provenance identity associated with eligible Shamim Bloom creations and their applicable blockchain record.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does NFT ownership transfer the Shamim Forever brand or fragrance formula?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. NFT ownership does not automatically transfer the Shamim Forever trademark, formula, copyright or other intellectual property unless separate written terms expressly grant those rights.',
            },
          },
        ],
      }
    : vanilla
       ? {
           '@type': 'FAQPage',
           '@id': `${productUrl}#faq`,
           mainEntity: [
             { '@type': 'Question', name: 'What is SF Sovereign Vanilla Absolute?', acceptedAnswer: { '@type': 'Answer', text: 'SF Sovereign Vanilla Absolute is a vanilla-centred fragrance by Shamim Forever, built around Madagascar Bourbon vanilla with benzoin, tonka bean and white sandalwood.' } },
             { '@type': 'Question', name: 'What is the Sovereign Passport?', acceptedAnswer: { '@type': 'Answer', text: 'The Sovereign Passport is the digital provenance layer associated with the creation and its applicable product record.' } },
             { '@type': 'Question', name: 'Does the Passport automatically mean legal ownership of the physical perfume?', acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. The legal effect is determined by applicable terms and law; a digital passport does not automatically transfer intellectual property or physical ownership rights.' } },
             { '@type': 'Question', name: 'Is SF Sovereign Vanilla Absolute an investment?', acceptedAnswer: { '@type': 'Answer', text: 'No investment-return claim should be inferred from the fragrance, its digital passport or any blockchain-linked record.' } },
           ],
         }
        : himalayan
          ? {
              '@type': 'FAQPage',
              '@id': `${productUrl}#faq`,
              mainEntity: [
                { '@type': 'Question', name: 'What is SF Himalayan Snow Musk?', acceptedAnswer: { '@type': 'Answer', text: 'SF Himalayan Snow Musk is a luxury white musk perfume by Shamim Forever, composed around bergamot, white florals, Himalayan white musk and translucent sandalwood.' } },
                { '@type': 'Question', name: 'How much does SF Himalayan Snow Musk cost?', acceptedAnswer: { '@type': 'Answer', text: 'SF Himalayan Snow Musk is listed at $259 USD, with a local price of Rs 72,000.' } },
                { '@type': 'Question', name: 'What does Himalayan Snow Musk smell like?', acceptedAnswer: { '@type': 'Answer', text: 'It is cool, clean and luminous, moving from citrus brightness through white florals into soft musk and pale sandalwood.' } },
                { '@type': 'Question', name: 'What blockchain is used?', acceptedAnswer: { '@type': 'Answer', text: 'The product record references Polygon Mainnet and the ERC-721 token standard.' } },
              ],
            }
          : rose
            ? {
                '@type': 'FAQPage',
                '@id': `${productUrl}#faq`,
                mainEntity: [
                  { '@type': 'Question', name: 'What is Eternal Rose de Taif?', acceptedAnswer: { '@type': 'Answer', text: 'Eternal Rose de Taif is a rose-centred fragrance from Shamim Forever built around Taif rose, white musk and Mysore sandalwood.' } },
                  { '@type': 'Question', name: 'What is the price?', acceptedAnswer: { '@type': 'Answer', text: 'Eternal Rose de Taif is listed at $245 USD, with a Pakistan reference price of Rs 68,000.' } },
                  { '@type': 'Question', name: 'What is the main fragrance identity?', acceptedAnswer: { '@type': 'Answer', text: 'Taif Rose, supported by white musk and Mysore sandalwood.' } },
                  { '@type': 'Question', name: 'Is it part of the Heritage Archive?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The product record identifies the rarity as Heritage Archive and the edition as House Allocation Reserve.' } },
                  { '@type': 'Question', name: 'Does it have a digital passport?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The product is presented with a Sovereign Digital Passport associated with its applicable blockchain-linked record.' } },
                  { '@type': 'Question', name: 'Does the NFT legally equal ownership of the perfume?', acceptedAnswer: { '@type': 'Answer', text: 'Not automatically. That relationship must be established by the applicable legal terms.' } },
                  { '@type': 'Question', name: 'Can Shamim Forever ask for my seed phrase?', acceptedAnswer: { '@type': 'Answer', text: 'No. Never share a private key, seed phrase, recovery phrase or wallet password.' } },
                  { '@type': 'Question', name: 'Is the product an investment?', acceptedAnswer: { '@type': 'Answer', text: 'No investment-return claim should be made simply because the product has a blockchain passport.' } },
                ],
              }
            : midnight
              ? {
                  '@type': 'FAQPage',
                  '@id': `${productUrl}#faq`,
                  mainEntity: [
                    { '@type': 'Question', name: 'What is SF Midnight Iris Royale?', acceptedAnswer: { '@type': 'Answer', text: 'SF Midnight Iris Royale is a feminine luxury fragrance by Shamim Forever built around an iris-centred concept of orris root, violet leaf, purple iris and powdery sandalwood.' } },
                    { '@type': 'Question', name: 'What is the price?', acceptedAnswer: { '@type': 'Answer', text: 'SF Midnight Iris Royale is listed at $223 USD, with a Pakistan reference price of Rs 62,000.' } },
                    { '@type': 'Question', name: 'What is the Digital Sovereign Passport?', acceptedAnswer: { '@type': 'Answer', text: 'It is a blockchain-based digital identity and provenance layer associated with the physical creation. It does not automatically transfer intellectual-property rights or legal title unless applicable terms expressly say so.' } },
                    { '@type': 'Question', name: 'What blockchain and token standard are referenced?', acceptedAnswer: { '@type': 'Answer', text: 'The product record references Polygon Mainnet and the ERC-721 token standard.' } },
                    { '@type': 'Question', name: 'Does Shamim Forever need my seed phrase?', acceptedAnswer: { '@type': 'Answer', text: 'No. Never share a seed phrase, private key, recovery phrase or wallet password.' } },
                  ],
                }
              : null

  const video = bloom
    ? {
        '@type': 'VideoObject',
        name: 'Shamim Bloom — Official Product Film',
        description: BLOOM_DESCRIPTION,
        thumbnailUrl: images[0],
        contentUrl: `${BASE_URL}/products/shamims-bloom/shamim-bloom-hero.mp4`,
        uploadDate: '2026-09-10',
        duration: 'PT6S',
        inLanguage: 'en',
        isFamilyFriendly: true,
      }
    : vanilla
      ? {
        '@type': 'VideoObject',
        name: 'SF Sovereign Vanilla Absolute — Official Product Film',
        description: VANILLA_DESCRIPTION,
        thumbnailUrl: images[0],
        contentUrl: `${BASE_URL}/products/${VANILLA_CANONICAL_SLUG}/vanilla-absolute.mp4`,
        uploadDate: '2026-09-10',
        duration: 'PT6S',
        inLanguage: 'en',
        isFamilyFriendly: true,
      }
        : rose
         ? {
         '@type': 'VideoObject',
         name: 'Eternal Rose de Taif — Official Product Film',
         description: ROSE_DESCRIPTION,
         thumbnailUrl: images[0],
         contentUrl: `${BASE_URL}/products/${ROSE_CANONICAL_SLUG}/eternal-rose-de-taif.mp4`,
         uploadDate: '2026-09-10',
         duration: 'PT6S',
         inLanguage: 'en',
         isFamilyFriendly: true,
       }
        : midnight
          ? {
              '@type': 'VideoObject',
              name: 'SF Midnight Iris Royale — Official Product Film',
              description: MIDNIGHT_DESCRIPTION,
              thumbnailUrl: images[0],
              contentUrl: `${BASE_URL}/products/midnight-iris-royale/sf-midnight-iris-royale.mp4`,
              uploadDate: '2026-09-11',
              duration: 'PT6S',
              inLanguage: 'en',
              isFamilyFriendly: true,
            }
          : null


  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [productSchema, breadcrumb, ...(faq ? [faq] : []), ...(video ? [video] : [])],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const rawProduct = await getProduct(params.id)
  if (!rawProduct) notFound()
  const resolvedProduct = rawProduct as Product

  const imageOverride = PRODUCT_IMAGE_OVERRIDES[resolvedProduct.slug]
  const product = imageOverride
    ? { ...resolvedProduct, images: Array.isArray(imageOverride) ? [...imageOverride] : [imageOverride] }
    : resolvedProduct
  const relatedProducts = isLaVieSlug(params.id) || isLaVieSlug(product.slug) ? await getRelatedProducts(product) : []

  if (isHimalayanSlug(params.id) || isHimalayanSlug(product.slug)) {
    return (
      <>
        <ProductJsonLd product={product} />
        <HimalayanSnowMuskPage product={product} />
      </>
    )
  }

  if (product.main_category_id === JEWELRY_CATEGORY_ID) {
    return (
      <>
        <ProductJsonLd product={product} />
        <JewelryProductPage product={product} />
      </>
    )
  }

  if (isLaVieSlug(product.slug) || isLaVieSlug(params.id)) {
    return (
      <>
        <ProductJsonLd product={product} />
        <LaVieEstBelleInspiredPage product={product} relatedProducts={relatedProducts} />
      </>
    )
  }

  if (SOVEREIGN_SLUGS.includes(product.slug)) {
    return (
      <>
        <ProductJsonLd product={product} />
        <SovereignProductPage product={product} />
      </>
    )
  }

  if (GUEST_CURATION_SLUGS.includes(product.slug)) {
    return (
      <>
        <ProductJsonLd product={product} />
        <GuestCurationProductPage product={product} />
      </>
    )
  }

  if (product.main_category_id === COSMETICS_CATEGORY_ID) {
    return (
      <>
        <ProductJsonLd product={product} />
        <CosmeticsProductPage product={product} />
      </>
    )
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <LuxuryGenericProductPage product={product} />
    </>
  )
}
    