import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://www.shamimforever.com'
const PAGE_URL = `${SITE_URL}/press-media`

export const metadata: Metadata = {
  title: 'Press & Media | Shamim Forever',
  description:
    'Explore the official Shamim Forever Press & Media Centre, featuring press releases, executive biographies, media resources, official statements, editorial information, imagery and newsroom updates.',
  keywords: [
    'Shamim Forever press',
    'Shamim Forever media',
    'Shamim Forever newsroom',
    'Faisal Orakzai press',
    'luxury brand press office',
    'luxury media kit',
    'Shamim Forever interviews',
    'Shamim Forever official statements',
    'Puteaux France luxury house',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Press & Media | Shamim Forever',
    description:
      'The official public record of Shamim Forever: announcements, leadership, media resources, statements, editorial guidance and press contacts.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Shamim Forever',
    images: [
      {
        url: `${SITE_URL}/logo-sf.png`,
        width: 512,
        height: 512,
        alt: 'Shamim Forever — Press & Media',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press & Media | Shamim Forever',
    description:
      'The official Shamim Forever Press & Media Centre for journalists, editors, researchers and authorised media professionals.',
    images: [`${SITE_URL}/logo-sf.png`],
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

const sectionLinks = [
  ['The House', '#the-house'],
  ['Latest News', '#newsroom'],
  ['Press Releases', '#press-releases'],
  ['Statements', '#statements'],
  ['Media Kit', '#media-kit'],
  ['Leadership', '#leadership'],
  ['Interviews', '#interviews'],
  ['In the Press', '#coverage'],
  ['Events', '#events'],
  ['Research', '#research'],
  ['Media Request', '#media-request'],
]

const principles = [
  ['Accuracy before attention', 'Communications should be precise, attributable and supported by verifiable information.'],
  ['Substance before noise', 'The public record should carry meaning rather than publicity for its own sake.'],
  ['Transparent time horizons', 'Current reality, confirmed initiatives, plans, ambitions and long-term vision must remain distinct.'],
  ['Editorial independence', 'Coverage is not presented as endorsement unless an explicit endorsement exists.'],
  ['Respect for people and work', 'Names, titles, images, creators and sources should be credited correctly.'],
]

const newsroomCategories = ['Latest', 'Corporate', 'Leadership', 'Luxury', 'Innovation', 'Heritage', 'Sustainability', 'Research', 'Events', 'Announcements']

const mediaKitGroups = [
  {
    title: 'Brand identity',
    items: ['Official logo', 'Monogram', 'Wordmark', 'House seal', 'Black, gold, white and transparent marks'],
  },
  {
    title: 'Brand guidelines',
    items: ['Logo usage and clear space', 'Minimum size', 'Typography and colour system', 'Photography principles', 'Editorial language and co-branding rules'],
  },
  {
    title: 'Executive assets',
    items: ['Approved portraits', 'Executive biographies', 'Official titles', 'Corporate descriptions'],
  },
  {
    title: 'Photography and film',
    items: ['Product, architecture and atelier imagery', 'Events, craftsmanship and heritage', 'Brand films and executive interviews', 'Campaign, corporate and behind-the-scenes footage'],
  },
]

const interviewSubjects = [
  {
    role: 'Founder & Chairman',
    name: 'Faisal Orakzai',
    topics: ['Entrepreneurship', 'Vision of Shamim Forever', 'Luxury philosophy', 'Brand architecture', 'Innovation', 'Long-term strategy', 'Heritage', 'Technology', 'Institution building'],
  },
  {
    role: 'CEO',
    name: 'Dr Asma Orakzai',
    topics: ['Executive leadership', 'House operations', 'Strategic development', 'Luxury experiences', 'Organisational culture', 'Long-term growth'],
  },
  {
    role: 'Director',
    name: 'Dr Laiba Faisal Orakzai',
    topics: ['Brand development', 'Creative direction', 'Emerging leadership', 'Institutional initiatives', 'Future-facing programmes'],
  },
]

const requestTypes = ['Interview', 'Press release', 'Corporate information', 'Executive information', 'Image request', 'Video request', 'Event access', 'Documentary', 'Research request', 'Brand assets', 'Partnership inquiry', 'Other']

const faqs = [
  ['What is Shamim Forever?', 'Shamim Forever is a sovereign luxury house focused on enduring luxury, heritage, craftsmanship, innovation and long-term value creation.'],
  ['Where is Shamim Forever headquartered?', 'The House currently presents its headquarters as being in Puteaux, France.'],
  ['Who founded Shamim Forever?', 'Shamim Forever identifies Faisal Orakzai as Founder & Chairman.'],
  ['Who leads the House?', 'The current leadership structure presented by the House includes Founder & Chairman Faisal Orakzai, CEO Dr Asma Orakzai and Director Dr Laiba Faisal Orakzai.'],
  ['How can journalists contact Shamim Forever?', 'Verified media inquiries can be directed to media@shamimforever.com. Please include your publication, market, subject, deadline and requested spokesperson.'],
  ['Can journalists request interviews?', 'Yes. Interview requests are assessed according to subject matter, availability and editorial relevance.'],
  ['Can media organisations use Shamim Forever imagery?', 'Authorised editorial usage may be available subject to the applicable image rights, permissions, credits and licensing conditions.'],
  ['Does media coverage constitute endorsement?', 'No. Editorial coverage should not automatically be interpreted as endorsement by Shamim Forever.'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Press & Media', item: PAGE_URL },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Shamim Forever Press & Media',
      url: PAGE_URL,
      description: metadata.description,
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Shamim Forever' },
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Shamim Forever' },
      about: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Shamim Forever' },
      mainEntity: { '@id': `${PAGE_URL}#sections` },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#sections`,
      name: 'Shamim Forever Press & Media Centre sections',
      numberOfItems: sectionLinks.length,
      itemListElement: sectionLinks.map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: `${PAGE_URL}${path}`,
      })),
    },
    {
      '@type': 'ContactPage',
      '@id': `${PAGE_URL}#contact`,
      name: 'Shamim Forever Press Office',
      url: `${PAGE_URL}#media-request`,
      description: 'Official press and media contact information for Shamim Forever.',
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Shamim Forever' },
      mainEntity: {
        '@type': 'ContactPoint',
        contactType: 'press office',
        email: 'media@shamimforever.com',
        areaServed: 'Worldwide',
        availableLanguage: 'English',
      },
    },
  ],
}

export default function PressMediaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: `
        .press-media { background:#030303; color:#e4e4e7; min-height:100vh; }
        .press-media * { box-sizing:border-box; }
        .pm-container { width:min(1180px, calc(100% - 48px)); margin:0 auto; }
        .pm-eyebrow { color:#c9a054; font-size:10px; letter-spacing:.42em; text-transform:uppercase; margin:0 0 16px; }
        .pm-muted { color:#71717a; }
        .pm-hero { min-height:650px; display:grid; grid-template-columns:minmax(0,1.3fr) minmax(280px,.7fr); gap:72px; align-items:center; padding:112px 0 96px; border-bottom:1px solid #111; }
        .pm-hero h1 { font-family:Georgia,serif; font-size:clamp(3.2rem,7vw,7.8rem); line-height:.94; font-weight:400; letter-spacing:-.055em; margin:0 0 28px; color:#f1f1f2; }
        .pm-hero h1 span { color:#c9a054; }
        .pm-lead { max-width:690px; color:#a1a1aa; font-size:clamp(1.05rem,1.7vw,1.35rem); line-height:1.7; margin:0; }
        .pm-hero-note { border-left:1px solid #c9a054; padding-left:28px; }
        .pm-hero-note h2, .pm-section-heading h2 { font-family:Georgia,serif; font-weight:400; color:#f1f1f2; }
        .pm-hero-note h2 { font-size:2rem; font-style:italic; margin:0 0 18px; }
        .pm-hero-note p { color:#71717a; font-size:14px; line-height:1.85; margin:0; }
        .pm-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:34px; }
        .pm-button { display:inline-flex; align-items:center; justify-content:center; padding:13px 20px; border:1px solid rgba(201,160,84,.6); color:#c9a054; text-decoration:none; font-size:10px; letter-spacing:.24em; text-transform:uppercase; transition:background .25s,color .25s; }
        .pm-button:hover { background:#c9a054; color:#030303; }
        .pm-button.secondary { border-color:#262626; color:#a1a1aa; }
        .pm-section-nav { display:flex; gap:16px; overflow:auto; padding:18px 0; border-bottom:1px solid #111; scrollbar-width:none; }
        .pm-section-nav::-webkit-scrollbar { display:none; }
        .pm-section-nav a { flex:0 0 auto; color:#71717a; font-size:9px; letter-spacing:.2em; text-decoration:none; text-transform:uppercase; }
        .pm-section-nav a:hover { color:#c9a054; }
        .pm-section { padding:108px 0; border-bottom:1px solid #111; }
        .pm-section.dark { background:#060606; }
        .pm-section-heading { display:grid; grid-template-columns:minmax(180px,.55fr) minmax(0,1.45fr); gap:72px; margin-bottom:52px; }
        .pm-section-heading h2 { font-size:clamp(2.4rem,5vw,5rem); line-height:1.03; letter-spacing:-.045em; margin:0; }
        .pm-section-heading p { max-width:650px; color:#71717a; font-size:15px; line-height:1.9; margin:0; }
        .pm-kicker { color:#c9a054; font-size:10px; letter-spacing:.35em; text-transform:uppercase; margin:4px 0 15px; }
        .pm-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; background:#181818; border:1px solid #181818; }
        .pm-card { background:#050505; padding:28px; min-height:180px; }
        .pm-card h3 { color:#e4e4e7; font-size:16px; font-weight:400; margin:0 0 12px; }
        .pm-card p { color:#71717a; font-size:13px; line-height:1.8; margin:0; }
        .pm-card ul, .pm-list { list-style:none; padding:0; margin:0; }
        .pm-card li, .pm-list li { color:#71717a; font-size:13px; line-height:1.8; padding:5px 0 5px 16px; position:relative; }
        .pm-card li::before, .pm-list li::before { content:'—'; color:#c9a054; position:absolute; left:0; }
        .pm-two-col { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
        .pm-feature { border:1px solid #181818; padding:34px; background:rgba(255,255,255,.01); }
        .pm-feature h3 { color:#e4e4e7; font-family:Georgia,serif; font-size:25px; font-weight:400; margin:0 0 15px; }
        .pm-feature p { color:#71717a; font-size:14px; line-height:1.9; margin:0; }
        .pm-feature strong { color:#c9a054; font-weight:400; }
        .pm-tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:22px; }
        .pm-tag { border:1px solid #222; color:#71717a; padding:7px 10px; font-size:9px; letter-spacing:.13em; text-transform:uppercase; }
        .pm-release { display:grid; grid-template-columns:180px minmax(0,1fr); gap:28px; padding:25px 0; border-top:1px solid #181818; }
        .pm-release:first-child { border-top:0; }
        .pm-release h3 { color:#e4e4e7; font-weight:400; font-size:16px; margin:0 0 8px; }
        .pm-release p { color:#71717a; font-size:13px; line-height:1.8; margin:0; }
        .pm-label { color:#c9a054; font-size:9px; letter-spacing:.25em; text-transform:uppercase; }
        .pm-muted-box { border:1px dashed #282828; padding:30px; color:#71717a; font-size:14px; line-height:1.8; }
        .pm-muted-box strong { color:#c9a054; font-weight:400; }
        .pm-bio { display:grid; grid-template-columns:160px minmax(0,1fr); gap:28px; padding:28px 0; border-top:1px solid #181818; }
        .pm-bio:first-child { border-top:0; }
        .pm-bio h3 { color:#e4e4e7; font-family:Georgia,serif; font-size:24px; font-weight:400; margin:0 0 5px; }
        .pm-bio p { color:#71717a; font-size:13px; line-height:1.8; margin:0 0 12px; }
        .pm-bio-role { color:#c9a054; font-size:10px; letter-spacing:.2em; text-transform:uppercase; margin:0 0 8px; }
        .pm-number { color:#c9a054; font-size:11px; letter-spacing:.3em; }
        .pm-faq { border-top:1px solid #181818; padding:22px 0; }
        .pm-faq h3 { color:#e4e4e7; font-size:15px; font-weight:400; margin:0 0 8px; }
        .pm-faq p { color:#71717a; font-size:13px; line-height:1.8; margin:0; }
        .pm-contact { display:grid; grid-template-columns:minmax(0,1fr) minmax(280px,.7fr); gap:60px; align-items:start; }
        .pm-email { color:#c9a054; font-family:Georgia,serif; font-size:clamp(1.7rem,3vw,3rem); text-decoration:none; overflow-wrap:anywhere; }
        .pm-small { color:#52525b; font-size:11px; line-height:1.8; }
        .pm-final { text-align:center; padding:125px 0; }
        .pm-final h2 { font-family:Georgia,serif; color:#f1f1f2; font-size:clamp(2.8rem,6vw,6rem); line-height:1; font-weight:400; letter-spacing:-.05em; margin:0 auto 22px; max-width:850px; }
        .pm-final p { color:#71717a; max-width:610px; margin:0 auto; font-size:15px; line-height:1.9; }
        @media (max-width: 820px) {
          .pm-container { width:min(100% - 32px, 680px); }
          .pm-hero { min-height:0; grid-template-columns:1fr; gap:42px; padding:82px 0 70px; }
          .pm-hero-note { padding-left:20px; }
          .pm-section { padding:72px 0; }
          .pm-section-heading { grid-template-columns:1fr; gap:20px; margin-bottom:34px; }
          .pm-grid, .pm-two-col { grid-template-columns:1fr; }
          .pm-release, .pm-bio, .pm-contact { grid-template-columns:1fr; gap:14px; }
          .pm-card { min-height:0; }
        }
      ` }} />

      <main className="press-media">
        <div className="pm-container">
          <section className="pm-hero">
            <div>
              <p className="pm-eyebrow">Shamim Forever · Press &amp; Media</p>
              <h1>The House,<br /><span>in the Public Record.</span></h1>
              <p className="pm-lead">
                Shamim Forever is a sovereign luxury house built around enduring value, craftsmanship, identity, innovation, heritage and the belief that true luxury should be designed not merely for the present, but for generations.
              </p>
              <div className="pm-actions">
                <a className="pm-button" href="#newsroom">Media Centre</a>
                <a className="pm-button secondary" href="#media-kit">Press Kit</a>
                <a className="pm-button secondary" href="mailto:media@shamimforever.com?subject=Interview%20request%20%E2%80%94%20Shamim%20Forever">Request an interview</a>
              </div>
            </div>
            <aside className="pm-hero-note">
              <p className="pm-eyebrow">Official reference point</p>
              <h2>Communication with precision.</h2>
              <p>
                This Press &amp; Media Centre provides authorised access to official announcements, corporate information, executive biographies, brand resources, imagery, publications, research materials and media contacts.
              </p>
              <p style={{ marginTop: 18 }}>
                For editorial accuracy, please treat the information published here as the official reference point for Shamim Forever&apos;s public communications.
              </p>
            </aside>
          </section>

          <nav className="pm-section-nav" aria-label="Press and Media Centre sections">
            {sectionLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
        </div>

        <section id="the-house" className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">01 · A note from the House</p></div>
              <div>
                <h2>A House Worth Recording</h2>
                <p style={{ marginTop: 24 }}>
                  Shamim Forever exists at the intersection of luxury, heritage, innovation and permanence. Our public story is not defined solely by products, campaigns or moments of attention. It is defined by the architecture of the House itself: its philosophy, people, craftsmanship, systems, intellectual work and long-term ambition.
                </p>
                <p style={{ marginTop: 18 }}>
                  This Centre is therefore designed as more than a collection of press releases. It is an institutional archive of the public-facing story of Shamim Forever, built for journalists, editors, publishers, documentary producers, researchers, photographers, partners and authorised media professionals.
                </p>
              </div>
            </div>
            <div className="pm-two-col">
              <div className="pm-feature">
                <h3>The House</h3>
                <p>
                  Shamim Forever is positioned as a sovereign luxury house focused on enduring value through luxury, craftsmanship, heritage, innovation and long-term stewardship. Its ecosystem includes identity, design, personalisation, technology, experiences, private services, digital infrastructure, archival preservation, sustainability and responsibility across generations.
                </p>
              </div>
              <div className="pm-feature">
                <h3>A public record, not a publicity wall</h3>
                <p>
                  Names should be correct. Dates should be verifiable. Statements should be attributable. Images should be properly credited. Claims should be supported. The distinction between aspiration, strategy and accomplished fact should never be blurred.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">02 · Our standard</p></div>
              <div>
                <h2>Accuracy Before Attention</h2>
                <p style={{ marginTop: 24 }}>
                  Responsible communication makes the public record more useful. Every official communication should contribute substance, disclose its time horizon and respect the independence of the people who report on it.
                </p>
              </div>
            </div>
            <div className="pm-grid">
              {principles.map(([title, body], index) => (
                <article className="pm-card" key={title}>
                  <p className="pm-number">0{index + 1}</p>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="newsroom" className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">03 · Newsroom</p></div>
              <div>
                <h2>Latest from the House</h2>
                <p style={{ marginTop: 24 }}>
                  The Newsroom is the gateway to permanent announcements, corporate updates, leadership news, events, research references and verified developments. Each published story should carry a publication date, update date, category, author, reading time, related stories and a press contact.
                </p>
              </div>
            </div>
            <div className="pm-tags" style={{ marginBottom: 34 }}>
              {newsroomCategories.map(category => <span className="pm-tag" key={category}>{category}</span>)}
            </div>
            <div className="pm-muted-box">
              <strong>Newsroom archive.</strong> The public newsroom is being developed as verified announcements become available. No announcement, partnership, event or coverage is presented here until it has an attributable source and a permanent reference.
              <div className="pm-actions"><Link className="pm-button secondary" href="/newsroom">Open Newsroom</Link></div>
            </div>
          </div>
        </section>

        <section id="press-releases" className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">04 · Official announcements</p></div>
              <div>
                <h2>Press Releases</h2>
                <p style={{ marginTop: 24 }}>
                  Official releases will be maintained as permanent, linkable records. The archive is intentionally empty until confirmed announcements are ready for publication.
                </p>
              </div>
            </div>
            <div className="pm-two-col">
              <div className="pm-feature">
                <p className="pm-label">Recommended categories</p>
                <ul className="pm-list" style={{ marginTop: 14 }}>
                  {['Corporate developments', 'Leadership and governance', 'Luxury and design', 'Innovation and digital infrastructure', 'Heritage and archival initiatives', 'Sustainability and responsibility', 'Confirmed partnerships', 'Global expansion', 'Research and publications'].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="pm-feature">
                <p className="pm-label">Release format</p>
                <ul className="pm-list" style={{ marginTop: 14 }}>
                  {['SHAMIM FOREVER · FOR IMMEDIATE RELEASE', 'Headline and subheadline', 'City, country and publication date', 'Opening statement and significance', 'Supporting details and attribution', 'Official statement', 'About Shamim Forever', 'Media contact and reference number'].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="statements" className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">05 · Official positions</p></div>
              <div>
                <h2>Statements From the House</h2>
                <p style={{ marginTop: 24 }}>
                  A dedicated archive may contain corporate statements, leadership statements, clarifications, brand-protection notices and, where appropriate, crisis communications. Every statement should name its date, subject, authorised spokesperson and reference number where applicable.
                </p>
              </div>
            </div>
            <div className="pm-muted-box">
              <strong>Statements archive.</strong> No statement is published in this archive until an authorised communication is available. Verified journalists seeking a corporate position should contact the Press Office with the subject, deadline and intended publication context.
            </div>
          </div>
        </section>

        <section id="leadership" className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">06 · Leadership</p></div>
              <div>
                <h2>Executive Media Bios</h2>
                <p style={{ marginTop: 24 }}>
                  Titles and biographies should be reproduced exactly according to current official corporate records. Short, medium and long versions can be provided to verified media professionals where a story requires additional context.
                </p>
              </div>
            </div>
            {interviewSubjects.map((subject, index) => (
              <article className="pm-bio" key={subject.name}>
                <div><p className="pm-number">0{index + 1}</p><p className="pm-bio-role">{subject.role}</p></div>
                <div>
                  <h3>{subject.name}</h3>
                  <p style={{ marginTop: 14 }}>
                    {subject.name === 'Faisal Orakzai'
                      ? 'Faisal Orakzai is the Founder and Chairman associated with Shamim Forever’s long-term vision and institutional direction. His work spans entrepreneurship, technology, digital systems, business development, research and emerging industries. Within Shamim Forever, his strategic philosophy centres on building an enduring institution rather than a short-lived luxury label.'
                      : `${subject.name} is presented in the House’s current leadership structure. Media conversations should be arranged around verified responsibilities, editorial relevance and availability.`}
                  </p>
                  <div className="pm-tags">{subject.topics.map(topic => <span className="pm-tag" key={topic}>{topic}</span>)}</div>
                </div>
              </article>
            ))}
            <p className="pm-small" style={{ margin: '28px 0 0' }}>Editorial rule: names, titles and biographies must be checked against current official corporate records before publication.</p>
          </div>
        </section>

        <section id="interviews" className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">07 · Conversations</p></div>
              <div>
                <h2>Conversations With the House</h2>
                <p style={{ marginTop: 24 }}>
                  Shamim Forever may facilitate interviews with authorised representatives depending on subject matter, availability and editorial relevance. Requests should include the publication, format, intended audience, deadline and requested spokesperson.
                </p>
              </div>
            </div>
            <div className="pm-two-col">
              <div className="pm-feature">
                <h3>Interview archive</h3>
                <p>Official interviews can be archived with the title, interviewer, publication, date, speaker, topic, transcript or video and related resources. No interview is presented as confirmed until the source and publication are verified.</p>
              </div>
              <div className="pm-feature">
                <h3>Documentary access</h3>
                <p>Documentary producers may request founder interviews, corporate filming, atelier access, architectural photography, historical research or brand archive access. Production details and permissions are required before access is considered.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="media-kit" className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">08 · Official resources</p></div>
              <div>
                <h2>Media Kit</h2>
                <p style={{ marginTop: 24 }}>
                  Official brand resources are supplied for legitimate editorial, research and media purposes. Asset availability, usage rights and required credits should be confirmed with the Press Office before publication.
                </p>
              </div>
            </div>
            <div className="pm-grid">
              {mediaKitGroups.map(group => (
                <article className="pm-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="pm-actions"><a className="pm-button" href="mailto:media@shamimforever.com?subject=Press%20kit%20request%20%E2%80%94%20Shamim%20Forever">Request press kit</a></div>
          </div>
        </section>

        <section className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">09 · Image and content rights</p></div>
              <div>
                <h2>Use With Permission</h2>
                <p style={{ marginTop: 24 }}>
                  Media organisations may request authorised imagery for legitimate editorial purposes subject to applicable permissions and licensing conditions. Every asset should carry its title, photographer or creator, year, usage rights, required credit and restrictions.
                </p>
              </div>
            </div>
            <div className="pm-two-col">
              <div className="pm-feature">
                <p className="pm-label">Permitted uses are assessed separately</p>
                <div className="pm-tags"><span className="pm-tag">Editorial</span><span className="pm-tag">Commercial</span><span className="pm-tag">Advertising</span><span className="pm-tag">Social</span><span className="pm-tag">Documentary</span><span className="pm-tag">Publication</span></div>
              </div>
              <div className="pm-feature">
                <p className="pm-label">Integrity of the image</p>
                <p style={{ marginTop: 12 }}>Images should not be materially altered in a manner that misrepresents the House, its people, products or activities. Redistribution, modification and commercial reuse require separate confirmation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">10 · Clear information architecture</p></div>
              <div>
                <h2>Brand Facts vs Press Information</h2>
                <p style={{ marginTop: 24 }}>
                  These pages serve different questions and should not duplicate one another.
                </p>
              </div>
            </div>
            <div className="pm-two-col">
              <div className="pm-feature">
                <p className="pm-label">Brand Facts</p>
                <h3>Who is Shamim Forever?</h3>
                <p>Structured corporate facts, dates, locations, identity, leadership, architecture and reference information.</p>
                <div className="pm-actions"><Link className="pm-button secondary" href="/brand-facts">Open Brand Facts</Link></div>
              </div>
              <div className="pm-feature">
                <p className="pm-label">Press &amp; Media</p>
                <h3>How should the media interact with the House?</h3>
                <p>Newsroom, press releases, media contacts, press kit, executive bios, interviews, statements, resources, coverage archive and media requests.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="coverage" className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">11 · In the Press</p></div>
              <div>
                <h2>Verified Coverage Archive</h2>
                <p style={{ marginTop: 24 }}>
                  Legitimate third-party coverage may be archived with its publication, headline, date, author, country or market, article type, topic and external reference. Coverage is never manufactured, implied or presented as endorsement.
                </p>
              </div>
            </div>
            <div className="pm-muted-box">
              <strong>Media Coverage Archive.</strong> This archive is being developed as verified editorial coverage becomes available. A quiet, accurate archive is more valuable than a wall of unconfirmed logos or invented publication relationships.
            </div>
          </div>
        </section>

        <section id="research" className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">12 · Research and publications</p></div>
              <div>
                <h2>Research, Without Duplication</h2>
                <p style={{ marginTop: 24 }}>
                  Press &amp; Media is the communication gateway, not a second document warehouse. Relevant publication summaries, press references and official links can be presented here while complete research papers remain in the dedicated White Papers section.
                </p>
              </div>
            </div>
            <div className="pm-grid">
              {['White Papers', 'Research Archive', 'Technical Papers', 'Institutional Reports'].map((title, index) => (
                <article className="pm-card" key={title}>
                  <p className="pm-number">0{index + 1}</p>
                  <h3>{title}</h3>
                  <p>Explore verified intellectual work and publications through the dedicated research destination.</p>
                </article>
              ))}
            </div>
            <div className="pm-actions"><Link className="pm-button" href="/whitepapers">Explore White Papers</Link></div>
          </div>
        </section>

        <section id="events" className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">13 · Access</p></div>
              <div>
                <h2>Events &amp; Media Credentials</h2>
                <p style={{ marginTop: 24 }}>
                  Official media information may be provided for launches, exhibitions, private presentations, atelier events, cultural programmes, corporate announcements, conferences and research events.
                </p>
              </div>
            </div>
            <div className="pm-two-col">
              <div className="pm-feature">
                <h3>Event information</h3>
                <p>Each event record should include the event name, date, location, description, media access, credential requirements and press contact. Only confirmed event details should be published.</p>
              </div>
              <div className="pm-feature">
                <h3>Media accreditation</h3>
                <p>Requests may require full name, publication, professional email, role, assignment, event, deadline, published work or portfolio and photography or filming requirements. Approval remains subject to capacity, security, privacy and House policies.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">14 · Editorial practice</p></div>
              <div>
                <h2>Reporting on Shamim Forever</h2>
                <p style={{ marginTop: 24 }}>
                  Journalists are encouraged to use the official names, titles and terminology published by the House. Statements about financial performance, valuation, investments, partnerships, market presence, sustainability, technology, availability or expansion should be attributed to verified official sources.
                </p>
              </div>
            </div>
            <div className="pm-grid">
              {[
                ['Preferred terminology', 'Shamim Forever. Reproduce executive titles accurately and avoid unapproved abbreviations or altered representations unless editorial context requires them.'],
                ['Corrections policy', 'Corrections should identify the original statement, correct information, date of correction and reason where appropriate, creating an auditable public record.'],
                ['Media ethics', 'Accuracy, integrity, respect, confidentiality, editorial independence, privacy, attribution, responsible disclosure and non-deception guide media relations.'],
              ].map(([title, body]) => <article className="pm-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">15 · Official channels</p></div>
              <div>
                <h2>Digital Media &amp; Anti-Impersonation</h2>
                <p style={{ marginTop: 24 }}>
                  Only communications originating from verified Shamim Forever channels should be considered official. The House should maintain a clear process for reporting fake websites, fake social accounts, fake press releases, fake investment offers, fake representatives, fake employment offers, unauthorised product listings and fraudulent media communications.
                </p>
              </div>
            </div>
            <div className="pm-muted-box">
              <strong>Official contact rule.</strong> If a message claims to represent Shamim Forever but does not originate from a verified House channel, do not rely on it as an official communication. Report suspicious communications to the Press Office and consult the separate <Link href="/policies" style={{ color: '#c9a054' }}>Policies &amp; Legal</Link> section for legal and security guidance.
            </div>
          </div>
        </section>

        <section id="media-request" className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">16 · Media request centre</p></div>
              <div>
                <h2>Make the Request Useful</h2>
                <p style={{ marginTop: 24 }}>
                  A complete request helps the Press Office route the enquiry to the right person and respond with the right level of context. Please send legitimate professional, editorial, research or media requests with accurate information.
                </p>
              </div>
            </div>
            <div className="pm-two-col">
              <div className="pm-feature">
                <p className="pm-label">Request types</p>
                <div className="pm-tags">{requestTypes.map(type => <span className="pm-tag" key={type}>{type}</span>)}</div>
              </div>
              <div className="pm-feature">
                <p className="pm-label">Include these details</p>
                <ul className="pm-list" style={{ marginTop: 12 }}>
                  {['Full name and professional email', 'Publication or organisation and country / market', 'Role and subject of inquiry', 'Questions, deadline and intended publication date', 'Requested spokesperson and interview format', 'Audience, distribution plan and attachment context'].map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="pm-actions"><a className="pm-button" href="mailto:media@shamimforever.com?subject=Media%20request%20%E2%80%94%20Shamim%20Forever">Submit media request</a><Link className="pm-button secondary" href="/concierge">General concierge</Link></div>
            <p className="pm-small" style={{ marginTop: 22 }}>By sending a request, you confirm that it is submitted for a legitimate professional, editorial, research or media purpose and that the information provided is accurate.</p>
          </div>
        </section>

        <section className="pm-section">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">17 · Response standard</p></div>
              <div>
                <h2>A Working Media Operation</h2>
                <p style={{ marginTop: 24 }}>
                  Requests can be categorised internally so urgent public matters do not disappear into a general inbox.
                </p>
              </div>
            </div>
            <div className="pm-grid">
              {[
                ['Priority 01', 'Breaking news or urgent corporate matters.'],
                ['Priority 02', 'Interview deadlines and active editorial assignments.'],
                ['Priority 03', 'General information and resource requests.'],
                ['Priority 04', 'Long-term documentary or research requests.'],
                ['Press archive', 'Year → Quarter → Category → Announcement.'],
                ['Corporate timeline', 'Only verified foundation, development, innovation, research and future milestones.'],
              ].map(([title, body]) => <article className="pm-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="pm-section dark">
          <div className="pm-container">
            <div className="pm-section-heading">
              <div><p className="pm-kicker">18 · Frequently asked</p></div>
              <div>
                <h2>Media FAQ</h2>
                <p style={{ marginTop: 24 }}>A concise reference for recurring journalist and researcher questions.</p>
              </div>
            </div>
            <div>
              {faqs.map(([question, answer]) => <article className="pm-faq" key={question}><h3>{question}</h3><p>{answer}</p></article>)}
            </div>
          </div>
        </section>

        <section className="pm-section" id="press-office">
          <div className="pm-container">
            <div className="pm-contact">
              <div>
                <p className="pm-kicker">19 · Press office</p>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.4rem,5vw,5rem)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-.045em', margin: '0 0 24px' }}>For the record,<br /><span style={{ color: '#c9a054' }}>contact the House.</span></h2>
                <p className="pm-muted" style={{ maxWidth: 580, fontSize: 15, lineHeight: 1.9, margin: 0 }}>For journalists, editors, researchers, producers and authorised media professionals, the House welcomes substantive conversations grounded in accuracy, context and mutual respect.</p>
              </div>
              <div>
                <p className="pm-label">Verified media inquiries</p>
                <a className="pm-email" href="mailto:media@shamimforever.com">media@shamimforever.com</a>
                <p className="pm-small" style={{ marginTop: 18 }}>Suitable inquiries include journalistic inquiries, interviews, editorial questions, documentary requests, photography, brand information, corporate statements, executive commentary, press credentials, media partnerships, event coverage and image licensing.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pm-final">
          <div className="pm-container">
            <p className="pm-eyebrow">The public record</p>
            <h2>Luxury is experienced privately. A House is remembered publicly.</h2>
            <p>Shamim Forever’s Press &amp; Media Centre exists to make that public record accurate, accessible and enduring.</p>
            <div className="pm-actions" style={{ justifyContent: 'center' }}>
              <a className="pm-button" href="mailto:media@shamimforever.com?subject=Press%20kit%20request%20%E2%80%94%20Shamim%20Forever">Press Office</a>
              <a className="pm-button secondary" href="mailto:media@shamimforever.com?subject=Press%20kit%20request%20%E2%80%94%20Shamim%20Forever">Download press kit</a>
              <a className="pm-button secondary" href="mailto:media@shamimforever.com?subject=Interview%20request%20%E2%80%94%20Shamim%20Forever">Request an interview</a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}