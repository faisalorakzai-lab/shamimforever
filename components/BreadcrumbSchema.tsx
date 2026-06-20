import Script from 'next/script'
import { generateBreadcrumbSchema } from '@/lib/schema-generators'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

/**
 * BreadcrumbSchema Component
 * Renders breadcrumb navigation with JSON-LD schema for SEO
 * Helps Google understand site structure and improves SERP appearance
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = generateBreadcrumbSchema(items)

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="py-4 px-5 md:px-12 lg:px-20">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span className="text-zinc-600">/</span>}
              {index === items.length - 1 ? (
                <span className="text-zinc-400">{item.name}</span>
              ) : (
                <a href={item.url} className="text-[#c9a054] hover:text-[#d4b86b] transition-colors">
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
