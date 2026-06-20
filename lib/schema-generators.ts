/**
 * Schema.org JSON-LD Generator Utilities
 * Helps generate consistent structured data for SEO
 */

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const generateProductSchema = (product: {
  name: string
  description: string
  image: string
  price: number
  currency: string
  availability: 'InStock' | 'OutOfStock' | 'PreOrder'
  sku?: string
  brand?: string
  category?: string
  rating?: number
  reviewCount?: number
  url: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  brand: {
    '@type': 'Brand',
    name: product.brand || 'Shamim Forever',
  },
  offers: {
    '@type': 'Offer',
    url: product.url,
    priceCurrency: product.currency,
    price: product.price.toString(),
    availability: `https://schema.org/${product.availability}`,
  },
  ...(product.sku && { sku: product.sku }),
  ...(product.category && { category: product.category }),
  ...(product.rating && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount?.toString() || '0',
    },
  }),
})

export const generateLocalBusinessSchema = (business: {
  name: string
  address: string
  city: string
  country: string
  phone?: string
  email?: string
  image?: string
  url: string
  latitude?: number
  longitude?: number
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  image: business.image || 'https://www.shamimforever.com/logo-sf.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address,
    addressLocality: business.city,
    addressCountry: business.country,
  },
  ...(business.phone && { telephone: business.phone }),
  ...(business.email && { email: business.email }),
  url: business.url,
  ...(business.latitude &&
    business.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.latitude.toString(),
        longitude: business.longitude.toString(),
      },
    }),
})

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

export const generateNewsArticleSchema = (article: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.headline,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  ...(article.dateModified && { dateModified: article.dateModified }),
  author: {
    '@type': 'Organization',
    name: article.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Shamim Forever',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.shamimforever.com/logo-sf.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url,
  },
})

export const generateEventSchema = (event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
  image?: string
  url: string
  eventStatus?: 'EventScheduled' | 'EventRescheduled' | 'EventCancelled'
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  ...(event.endDate && { endDate: event.endDate }),
  ...(event.eventStatus && { eventStatus: `https://schema.org/${event.eventStatus}` }),
  location: {
    '@type': 'Place',
    name: event.location,
  },
  ...(event.image && { image: event.image }),
  url: event.url,
  organizer: {
    '@type': 'Organization',
    name: 'Shamim Forever',
    url: 'https://www.shamimforever.com',
  },
})

export const generateAggregateOfferSchema = (offers: {
  priceCurrency: string
  lowPrice: number
  highPrice: number
  offerCount: number
  availability: 'InStock' | 'OutOfStock'
}) => ({
  '@context': 'https://schema.org',
  '@type': 'AggregateOffer',
  priceCurrency: offers.priceCurrency,
  lowPrice: offers.lowPrice.toString(),
  highPrice: offers.highPrice.toString(),
  offerCount: offers.offerCount.toString(),
  availability: `https://schema.org/${offers.availability}`,
})

export const generateReviewSchema = (review: {
  reviewRating: number
  reviewBody: string
  author: string
  datePublished: string
  productName: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.reviewRating.toString(),
    bestRating: '5',
    worstRating: '1',
  },
  reviewBody: review.reviewBody,
  author: {
    '@type': 'Person',
    name: review.author,
  },
  datePublished: review.datePublished,
  itemReviewed: {
    '@type': 'Product',
    name: review.productName,
  },
})

export const generateContactPointSchema = (contact: {
  contactType: string
  telephone?: string
  email?: string
  url?: string
  areaServed?: string
  availableLanguage?: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPoint',
  contactType: contact.contactType,
  ...(contact.telephone && { telephone: contact.telephone }),
  ...(contact.email && { email: contact.email }),
  ...(contact.url && { url: contact.url }),
  ...(contact.areaServed && { areaServed: contact.areaServed }),
  ...(contact.availableLanguage && { availableLanguage: contact.availableLanguage }),
})
