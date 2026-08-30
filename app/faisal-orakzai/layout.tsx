import type { ReactNode } from 'react'

const SITE_URL = 'https://www.shamimforever.com'
const FOUNDER_URL = 'https://faisalorakzai.com/'

const profileSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/faisal-orakzai#profilepage`,
      url: `${SITE_URL}/faisal-orakzai`,
      name: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${FOUNDER_URL}#person` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/founder-faisal-orakzai.jpg`,
        width: 800,
        height: 800,
        caption: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Faisal Orakzai',
            item: `${SITE_URL}/faisal-orakzai`,
          },
        ],
      },
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': `${FOUNDER_URL}#person`,
      name: 'Faisal Orakzai',
      url: FOUNDER_URL,
      jobTitle: 'Founder & Chairman',
      worksFor: {
        '@id': `${SITE_URL}/#organization`,
      },
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/founder-faisal-orakzai.jpg`,
        width: 800,
        height: 800,
        caption: 'Faisal Orakzai official portrait',
      },
    },
  ],
}

export default function FaisalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      {children}
    </>
  )
}