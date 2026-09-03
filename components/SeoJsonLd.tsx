import type { ReactNode } from 'react'

type JsonLd = Record<string, unknown>

export default function SeoJsonLd({
  schemas,
  children,
}: {
  schemas: JsonLd[]
  children: ReactNode
}) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${String(schema['@type'])}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  )
}