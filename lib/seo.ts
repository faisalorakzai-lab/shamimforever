export const SITE_URL = 'https://www.shamimforever.com'
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`
}

export function organizationRef() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Shamim Forever',
  }
}

export function pageSchema({
  type = 'WebPage',
  path,
  name,
  description,
  image,
  mainEntity,
}: {
  type?: string
  path: string
  name: string
  description: string
  image: string
  mainEntity?: Record<string, unknown>
}) {
  const url = absoluteUrl(path)
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#${type.toLowerCase()}`,
    name,
    description,
    url,
    image: absoluteUrl(image),
    isPartOf: { '@type': 'WebSite', '@id': WEBSITE_ID, name: 'Shamim Forever' },
    publisher: organizationRef(),
    ...(mainEntity ? { mainEntity } : {}),
  }
}

export function breadcrumbSchema(
  path: string,
  label: string,
  parents: Array<{ name: string; path: string }> = [],
) {
  const items = [
    { name: 'Home', path: '/' },
    ...parents,
    { name: label, path },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function metadataImage(path: string, alt: string) {
  return {
    url: absoluteUrl(path),
    width: 1200,
    height: 630,
    alt,
  }
}