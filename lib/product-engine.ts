import type { Product } from '@/types'
import { SOVEREIGN_CONFIGS, type SovereignConfig } from '@/lib/sovereign-configs'

export type ProductCategory = 'perfume' | 'cosmetics' | 'jewelry' | 'other'
export type ProductAvailability = 'InStock' | 'OutOfStock'

export interface ProductFaq {
  question: string
  answer: string
}

export interface ProductPageModel {
  product: Product
  slug: string
  canonicalPath: string
  category: ProductCategory
  categoryLabel: string
  description: string
  heroImage: string | null
  galleryImages: string[]
  videoUrl: string | null
  posterUrl: string | null
  price: {
    amount: number
    currency: 'USD'
    availability: ProductAvailability
  }
  perfume?: {
    fragranceFamily?: string
    topNotes: string[]
    heartNotes: string[]
    baseNotes: string[]
    sensoryJourney?: string
    whenToWear?: string
    application?: string
    care?: string
  }
  cosmetics?: {
    productType?: string
    skinType?: string
    benefits: string[]
    texture?: string
    ingredients: string[]
    usage?: string
    care?: string
  }
  jewelry?: {
    material?: string
    metal?: string
    gemstone?: string
    carat?: string
    dimensions?: string
    craftsmanship?: string
    care?: string
    provenance?: string
  }
  story?: string
  inspiration?: string
  archiveClass?: string
  edition?: string
  serialNumber?: string
  digitalPassport: {
    enabled: boolean
    network?: string
    tokenStandard?: string
    contractAddress?: string
    tokenId?: string
    explorerUrl?: string
  } | null
  walletEnabled: boolean
  holderPrivileges: string[]
  faq: ProductFaq[]
  seo: {
    title: string
    description: string
    canonical: string
    image: string
  }
}

type StoryRecord = Record<string, unknown>

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0).map(entry => entry.trim())
}

function parseStory(story: string | null): StoryRecord {
  if (!story) return {}
  try {
    const parsed: unknown = JSON.parse(story)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as StoryRecord : { text: story }
  } catch {
    return { text: story }
  }
}

function categoryFor(product: Product): ProductCategory {
  const value = `${product.main_category?.name ?? ''} ${product.main_category?.slug ?? ''}`.toLowerCase()
  if (/(perfume|fragrance|oud|musk|parfum|scent)/.test(value)) return 'perfume'
  if (/(cosmetic|beauty|skin|makeup|groom)/.test(value)) return 'cosmetics'
  if (/(jewel|ring|diamond|gold|silver|watch)/.test(value)) return 'jewelry'
  return 'other'
}

function categoryLabel(category: ProductCategory): string {
  return category === 'perfume'
    ? 'Perfume & Fragrance'
    : category === 'cosmetics'
      ? 'Cosmetics & Beauty'
      : category === 'jewelry'
        ? 'Jewelry'
        : 'Luxury Creation'
}

function notesFrom(story: StoryRecord, key: string): string[] {
  const olfactory = story.olfactory && typeof story.olfactory === 'object' && !Array.isArray(story.olfactory)
    ? story.olfactory as StoryRecord
    : {}
  const fromOlfactory = asStringArray(olfactory[key])
  return fromOlfactory.length ? fromOlfactory : asStringArray(story[key])
}

function configFor(slug: string): SovereignConfig | undefined {
  return SOVEREIGN_CONFIGS[slug]
}

export function canonicalProductSlug(slug: string): string {
  if (['shamim-bloom', 'shamims-bloom', 'shamim-bloom-the-sovereign-grace'].includes(slug)) return 'shamim-bloom'
  if (['midnight-iris-royale', 'sf-midnight-iris-royale'].includes(slug)) return 'sf-midnight-iris-royale'
  return slug
}

export function buildProductPageModel(product: Product): ProductPageModel {
  const story = parseStory(product.story)
  const config = configFor(product.slug)
  const category = categoryFor(product)
  const images = [
    ...(config?.heroImage ? [config.heroImage] : []),
    ...(config?.galleryImages ?? []),
    ...(product.images ?? []),
  ].filter((image, index, all): image is string => Boolean(image) && all.indexOf(image) === index)
  const nft = story.nft && typeof story.nft === 'object' && !Array.isArray(story.nft) ? story.nft as StoryRecord : {}
  const passportEnabled = config?.passportAvailable === true
  const description = product.description?.trim() || `${product.name} — a Shamim Forever ${categoryLabel(category).toLowerCase()} creation.`
  const canonical = `https://www.shamimforever.com/products/${canonicalProductSlug(product.slug)}`
  const seoTitle = `${product.name} — Shamim Forever`
  const posterUrl = asString(story.posterUrl) || asString(story.poster) || null

  const model: ProductPageModel = {
    product,
    slug: canonicalProductSlug(product.slug),
    canonicalPath: `/products/${canonicalProductSlug(product.slug)}`,
    category,
    categoryLabel: categoryLabel(category),
    description,
    heroImage: images[0] ?? null,
    galleryImages: images,
    videoUrl: config?.videoPath || asString(story.videoUrl) || asString(story.video) || null,
    posterUrl,
    price: {
      amount: Number(product.price_usd) || 0,
      currency: 'USD',
      availability: Number(product.inventory) > 0 ? 'InStock' : 'OutOfStock',
    },
    story: asString(story.text) || product.story || undefined,
    inspiration: asString(story.inspiration),
    archiveClass: asString(story.archiveClass) || asString(story.archive_class),
    edition: asString(story.edition) || asString(nft.edition),
    serialNumber: asString(story.serialNumber) || asString(story.serial_number) || asString(nft.serial),
    digitalPassport: passportEnabled
      ? {
          enabled: true,
          network: asString(nft.blockchain),
          tokenStandard: asString(nft.tokenStandard) || asString(nft.standard),
          contractAddress: asString(nft.contract),
          tokenId: asString(nft.tokenId) || asString(nft.token_id),
          explorerUrl: asString(nft.explorerUrl) || asString(nft.explorer),
        }
      : null,
    walletEnabled: passportEnabled && story.walletEnabled === true,
    holderPrivileges: asStringArray(nft.holder_privileges),
    faq: Array.isArray(story.faq)
      ? (story.faq as unknown[]).flatMap((item): ProductFaq[] => {
          if (!item || typeof item !== 'object') return []
          const entry = item as StoryRecord
          const question = asString(entry.question)
          const answer = asString(entry.answer)
          return question && answer ? [{ question, answer }] : []
        })
      : [],
    seo: {
      title: seoTitle,
      description: description.slice(0, 160),
      canonical,
      image: images[0] || 'https://www.shamimforever.com/logo-sf.png',
    },
  }

  if (category === 'perfume') {
    model.perfume = {
      fragranceFamily: asString(story.fragranceFamily) || asString(story.fragrance_family),
      topNotes: notesFrom(story, 'top'),
      heartNotes: notesFrom(story, 'heart'),
      baseNotes: notesFrom(story, 'base'),
      sensoryJourney: asString(story.sensoryJourney) || asString(story.sensory_journey),
      whenToWear: asString(story.whenToWear) || asString(story.when_to_wear),
      application: asString(story.application),
      care: asString(story.care),
    }
  }

  if (category === 'cosmetics') {
    model.cosmetics = {
      productType: asString(story.productType) || asString(story.product_type),
      skinType: asString(story.skinType) || asString(story.skin_type),
      benefits: asStringArray(story.benefits),
      texture: asString(story.texture),
      ingredients: asStringArray(story.ingredients),
      usage: asString(story.usage),
      care: asString(story.care),
    }
  }

  if (category === 'jewelry') {
    model.jewelry = {
      material: asString(story.material),
      metal: asString(story.metal),
      gemstone: asString(story.gemstone) || asString(story.stone),
      carat: asString(story.carat),
      dimensions: asString(story.dimensions),
      craftsmanship: asString(story.craftsmanship),
      care: asString(story.care),
      provenance: asString(story.provenance),
    }
  }

  return model
}

export interface ProductAudit {
  id: string
  name: string
  category: ProductCategory
  url: string
  completionStatus: 'completed' | 'needs-data'
  imageStatus: 'present' | 'missing' | 'broken'
  videoStatus: 'present' | 'not-provided' | 'broken'
  seoStatus: 'ready' | 'needs-data'
  schemaStatus: 'ready' | 'needs-data'
  passportStatus: 'enabled' | 'archive-only'
  issues: string[]
}

export function auditProduct(product: Product): ProductAudit {
  const model = buildProductPageModel(product)
  const issues: string[] = []
  if (!product.name?.trim()) issues.push('Missing product name')
  if (!product.slug?.trim()) issues.push('Missing slug')
  if (!product.description?.trim()) issues.push('Missing description')
  if (!Number.isFinite(Number(product.price_usd)) || Number(product.price_usd) <= 0) issues.push('Missing USD price')
  if (!model.heroImage) issues.push('Missing hero image')
  if (!product.main_category?.name) issues.push('Missing category')

  const criticalReady = issues.length === 0
  return {
    id: product.id,
    name: product.name || 'Unnamed product',
    category: model.category,
    url: model.canonicalPath,
    completionStatus: criticalReady ? 'completed' : 'needs-data',
    imageStatus: model.heroImage ? 'present' : 'missing',
    videoStatus: model.videoUrl ? 'present' : 'not-provided',
    seoStatus: criticalReady ? 'ready' : 'needs-data',
    schemaStatus: criticalReady ? 'ready' : 'needs-data',
    passportStatus: model.digitalPassport ? 'enabled' : 'archive-only',
    issues,
  }
}

export function auditCatalog(products: Product[]) {
  const rows = products.map(auditProduct)
  const count = (predicate: (row: ProductAudit) => boolean) => rows.filter(predicate).length
  return {
    total: rows.length,
    completed: count(row => row.completionStatus === 'completed'),
    needsReview: count(row => row.completionStatus === 'needs-data'),
    missingData: count(row => row.issues.length > 0),
    brokenAssets: count(row => row.imageStatus !== 'present'),
    brokenVideos: count(row => row.videoStatus === 'broken'),
    seoIssues: count(row => row.seoStatus !== 'ready'),
    schemaIssues: count(row => row.schemaStatus !== 'ready'),
    byCategory: {
      perfume: count(row => row.category === 'perfume'),
      cosmetics: count(row => row.category === 'cosmetics'),
      jewelry: count(row => row.category === 'jewelry'),
      other: count(row => row.category === 'other'),
    },
    rows,
  }
}