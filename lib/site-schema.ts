const SITE_URL = 'https://www.shamimforever.com'
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const BRAND_ID = `${SITE_URL}/#brand`
const WEBSITE_ID = `${SITE_URL}/#website`
const HOMEPAGE_ID = `${SITE_URL}/#webpage`
const FOUNDER_ID = `${SITE_URL}/faisal-orakzai#person`

const brandLogo = {
  '@type': 'ImageObject',
  '@id': `${SITE_URL}/#logo`,
  url: `${SITE_URL}/logo-sf.png`,
  contentUrl: `${SITE_URL}/logo-sf.png`,
  width: 512,
  height: 512,
  caption: 'Shamim Forever logo',
}

const founder = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Faisal Orakzai',
  url: `${SITE_URL}/faisal-orakzai`,
  image: `${SITE_URL}/founder-faisal-orakzai.jpg`,
  jobTitle: 'Founder',
  worksFor: { '@id': ORGANIZATION_ID },
  sameAs: [
    'https://www.wikidata.org/wiki/Q140588912',
    'https://orcid.org/0009-0000-0915-7272',
    'https://www.linkedin.com/in/faisalorakzaii',
    'https://www.instagram.com/faisalorakzaii',
    'https://x.com/faisalorakzaii',
  ],
}

export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Shamim Forever',
      url: SITE_URL,
      logo: brandLogo,
      image: `${SITE_URL}/founder-faisal-orakzai.jpg`,
      description:
        'Shamim Forever is a luxury house offering fragrances, jewellery, cosmetics, and couture from Pakistan.',
      founder: { '@id': FOUNDER_ID },
      brand: { '@id': BRAND_ID },
      sameAs: [
        'https://www.instagram.com/shamimforever',
        'https://www.facebook.com/shamimforever',
        'https://x.com/shamimforever',
        'https://www.linkedin.com/company/shamimforever',
        'https://www.tiktok.com/@shamimforever',
      ],
    },
    {
      '@type': 'Brand',
      '@id': BRAND_ID,
      name: 'Shamim Forever',
      url: SITE_URL,
      logo: brandLogo,
      slogan: 'Built From Love. Forged Into Legacy.',
      parentOrganization: { '@id': ORGANIZATION_ID },
    },
    founder,
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: 'Shamim Forever',
      description: 'Sovereign luxury fragrances, jewellery, cosmetics, and couture.',
      publisher: { '@id': ORGANIZATION_ID },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': HOMEPAGE_ID,
      url: `${SITE_URL}/`,
      name: 'Shamim Forever — Sovereign Luxury Fragrances & Couture',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      primaryImageOfPage: { '@id': `${SITE_URL}/#logo` },
      breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
      ],
    },
  ],
}