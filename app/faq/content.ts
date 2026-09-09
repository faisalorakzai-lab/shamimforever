export type FAQItem = {
  question: string
  answer: string
}

export type FAQCategory = {
  id: string
  number: string
  title: string
  description: string
  items: FAQItem[]
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'the-house',
    number: '01',
    title: 'The House',
    description: 'The philosophy, heritage and identity behind Shamim Forever.',
    items: [
      { question: 'What is Shamim Forever?', answer: 'Shamim Forever is a Sovereign Luxury House built around craftsmanship, identity, discretion, heritage and personal service. The House brings together fragrance, jewellery, cosmetics, couture, bespoke experiences and a long-term vision for a distinctive global luxury ecosystem.' },
      { question: 'What does Sovereign Luxury House mean?', answer: 'Sovereign Luxury House describes an independent luxury institution with its own philosophy, standards, identity and relationship with its clients. Shamim Forever approaches luxury as an ecosystem shaped by craft, cultural expression, private service and enduring value.' },
      { question: 'When was Shamim Forever established?', answer: 'Shamim Forever was established in 2023. The House continues to develop its collections, private services and long-term international vision.' },
      { question: 'Who founded Shamim Forever?', answer: 'Shamim Forever was founded by Faisal Orakzai, Founder and Chairman of the House. The House is being developed as a long-term institution rather than a temporary product label.' },
      { question: 'What makes Shamim Forever different?', answer: 'Shamim Forever connects craftsmanship with identity, authenticity, bespoke service, cultural expression and long-term heritage. The House does not define luxury by price alone; rarity, meaning, experience and personal connection matter equally.' },
    ],
  },
  {
    id: 'shopping-orders',
    number: '02',
    title: 'Shopping & Orders',
    description: 'Collections, availability, purchases and order assistance.',
    items: [
      { question: 'How can I purchase from Shamim Forever?', answer: 'Depending on the collection and availability, clients may purchase through official digital channels, boutique locations, private appointments, Concierge assistance or a bespoke consultation.' },
      { question: 'Are all products available online?', answer: 'No. Selected creations may be limited-edition, boutique-only, available through private client access or require a bespoke ordering process. Availability is confirmed for each collection and location.' },
      { question: 'Can I reserve a creation?', answer: 'Reservation availability depends on the product, collection and current demand. For rare or limited creations, contact the Concierge before making arrangements.' },
      { question: 'How can I check my order status?', answer: 'Order information may be available through your account, order communications or Client Relations. Concierge can assist with eligible orders when a personal response is required.' },
      { question: 'Can I cancel an order?', answer: 'Cancellation may be possible before an order enters processing or production. Bespoke, personalised and specially commissioned creations may follow different conditions, which are explained before confirmation.' },
    ],
  },
  {
    id: 'bespoke',
    number: '03',
    title: 'Bespoke Commissions',
    description: 'Private commissions and personalised creations for collectors.',
    items: [
      { question: 'What is a bespoke commission?', answer: 'A bespoke commission is a creation developed with a higher degree of personalisation. Depending on the service, this may include design direction, materials, colours, measurements, cultural references and private consultation.' },
      { question: 'How do I begin a bespoke commission?', answer: 'The process normally begins with a private consultation. The House then establishes the creative direction, develops the proposed creation, confirms specifications, begins craftsmanship and arranges the final client experience.' },
      { question: 'How long does bespoke creation take?', answer: 'Production time depends on complexity, materials, craftsmanship requirements and current schedules. A precise timeline is normally provided during the consultation and confirmation stages.' },
      { question: 'Can I request a completely unique design?', answer: 'Where available, eligible clients may request a private design consultation for a unique creation. The final scope depends on the materials, craftsmanship and service required.' },
      { question: 'Are bespoke creations made for gifting?', answer: 'Bespoke commissions can be considered for significant personal or gifting occasions. Concierge can advise on the appropriate direction, lead time and presentation.' },
    ],
  },
  {
    id: 'authenticity',
    number: '04',
    title: 'Authenticity & Provenance',
    description: 'Verification, product identity and protection from imitation.',
    items: [
      { question: 'How can I verify a Shamim Forever creation?', answer: 'Use official Shamim Forever verification channels. Depending on the creation, verification may involve product identifiers, certificates, digital records, purchase documentation, boutique verification or Concierge support.' },
      { question: 'Can I verify a creation purchased from another person?', answer: 'Authentication may have limitations for products purchased through unauthorised or unofficial sources. The House cannot guarantee authenticity without sufficient documentation and an appropriate verification review.' },
      { question: 'What is a Digital Passport?', answer: 'A Digital Passport is a digital record designed to document a creation’s identity, provenance, authenticity and, where applicable, ownership history.' },
      { question: 'Does blockchain prove authenticity by itself?', answer: 'No single technology replaces a complete authentication process. Blockchain can support a verifiable record, while product identifiers, documentation, physical inspection and official channels remain important.' },
      { question: 'What should I do if I suspect a counterfeit?', answer: 'Do not rely on visual appearance alone. Contact official Client Relations or Concierge with the available product information, purchase documentation and photographs so the matter can be reviewed appropriately.' },
    ],
  },
  {
    id: 'concierge',
    number: '05',
    title: 'Private Concierge',
    description: 'Personal assistance for appointments, collections and private requests.',
    items: [
      { question: 'What is the Shamim Forever Concierge?', answer: 'The Concierge provides personal assistance for private appointments, product discovery, bespoke enquiries, boutique coordination, special requests, delivery coordination and client support.' },
      { question: 'How do I contact the Concierge?', answer: 'Email concierge@shamimforever.com for private assistance. The Concierge may coordinate an appropriate communication channel for sensitive or appointment-related matters.' },
      { question: 'Is Concierge available internationally?', answer: 'Service availability depends on your location and the nature of the request. International clients are welcome to enquire and will receive guidance based on the relevant service.' },
      { question: 'How quickly will I receive a response?', answer: 'Response times vary with the complexity of the request and operational requirements. Priority may be given to time-sensitive appointments, delivery matters and active client orders.' },
      { question: 'Can Concierge help me choose a creation?', answer: 'Yes. Concierge can help clarify collection details, availability, gifting considerations, bespoke possibilities and the most appropriate next step for your request.' },
    ],
  },
  {
    id: 'boutiques',
    number: '06',
    title: 'Boutiques & Appointments',
    description: 'Locations, visits and private boutique experiences.',
    items: [
      { question: 'Where can I find Shamim Forever boutiques?', answer: 'Current boutique and operational locations are listed through the official Boutiques section. Locations and services may evolve as the House expands.' },
      { question: 'Do I need an appointment?', answer: 'Some services may be available without an appointment. Private consultations, bespoke commissions and certain experiences may require advance booking.' },
      { question: 'Can I request a private boutique appointment?', answer: 'Yes, where available. A private appointment can provide a more personal and discreet experience for collection discovery, gifting, authentication or bespoke consultation.' },
      { question: 'What can I do at a boutique?', answer: 'Boutique services may include collection discovery, product consultation, private appointments, bespoke consultations, Client Services and order assistance. Availability varies by location.' },
      { question: 'Are all announced locations open?', answer: 'A location shown in the House’s future network may be marked as coming soon. Confirm opening status and appointment availability through the official Boutiques section before travelling.' },
    ],
  },
  {
    id: 'delivery',
    number: '07',
    title: 'Private Delivery',
    description: 'Shipping, handling, discretion and delivery support.',
    items: [
      { question: 'Where does Shamim Forever deliver?', answer: 'Delivery availability depends on the destination, product category, local regulations, security requirements and product availability. International delivery is confirmed for eligible orders.' },
      { question: 'How long does delivery take?', answer: 'Delivery time depends on the product, destination and service level. Ready creations and bespoke commissions may have significantly different timelines.' },
      { question: 'Is delivery discreet?', answer: 'Discretion is an important part of the private client experience. Packaging and delivery procedures may vary according to location, product category and security requirements.' },
      { question: 'Can I track a delivery?', answer: 'Tracking availability depends on the delivery method and security requirements. Eligible order updates are provided through the relevant order communication or Client Relations channel.' },
      { question: 'What should I do if delivery is delayed?', answer: 'Contact Client Relations or Concierge with your order information. The team can review the eligible order and provide the most accurate available update.' },
    ],
  },
  {
    id: 'payments',
    number: '08',
    title: 'Payments & Pricing',
    description: 'Currencies, invoices and payment procedures.',
    items: [
      { question: 'Which payment methods are accepted?', answer: 'Available payment methods vary by location, platform, product and transaction type. Approved digital and banking options may be available at checkout or through Concierge.' },
      { question: 'Are prices the same in every country?', answer: 'Not necessarily. Prices may vary because of currency, local taxes, import requirements, regional pricing and operational factors.' },
      { question: 'Are taxes and duties included?', answer: 'Tax and duty treatment depends on the applicable jurisdiction and transaction. The relevant terms should be reviewed before confirmation.' },
      { question: 'Can I receive an invoice?', answer: 'Yes, where applicable. Request an invoice through the official order or Concierge channel and provide the required billing information.' },
      { question: 'Can pricing change?', answer: 'Prices may change over time because of materials, currency, operations or market conditions. Confirmed transactions follow the terms applicable at the time of purchase.' },
    ],
  },
  {
    id: 'returns-client-care',
    number: '09',
    title: 'Returns & Client Care',
    description: 'Returns, exchanges, damage reports and aftercare.',
    items: [
      { question: 'Can I return my purchase?', answer: 'Return eligibility depends on the product category, condition and applicable purchase terms. Review the relevant terms before confirmation or contact Client Relations for an eligible order.' },
      { question: 'Are bespoke creations returnable?', answer: 'Personalised and bespoke creations may not be eligible for standard returns. Specific conditions should be reviewed and confirmed before a commission begins.' },
      { question: 'Can I exchange a creation?', answer: 'Exchange eligibility depends on availability, product condition and the applicable policy. Contact Client Relations as soon as possible for guidance.' },
      { question: 'What if my order arrives damaged?', answer: 'Contact Client Relations promptly and provide the order information, photographs and any relevant packaging details so the matter can be reviewed.' },
      { question: 'Can a creation be repaired or cared for?', answer: 'Care or repair services depend on the product category, materials, condition, age and availability of components. Client Relations can advise on the appropriate care path.' },
    ],
  },
  {
    id: 'privacy',
    number: '10',
    title: 'Privacy & Discretion',
    description: 'Client confidentiality, personal information and trust.',
    items: [
      { question: 'How does Shamim Forever protect client privacy?', answer: 'Privacy and discretion are core principles of private luxury service. Client information should be handled according to applicable privacy practices, security controls and legal requirements.' },
      { question: 'Is my personal information shared?', answer: 'Information handling is governed by the applicable Privacy Policy and operational requirements. Only appropriate use and disclosure should take place for the relevant service, legal or security purpose.' },
      { question: 'Can I request access to my information?', answer: 'Applicable privacy rights depend on your jurisdiction and the relevant regulations. Contact the official privacy or Client Relations channel for guidance.' },
      { question: 'How do I contact the privacy team?', answer: 'Direct privacy-related enquiries through the official Shamim Forever communication channel so they can be routed to the appropriate team.' },
      { question: 'How can I identify an official Shamim Forever message?', answer: 'Use the official shamimforever.com domain and verified House communication channels. Treat unexpected payment requests, links or identity claims with caution.' },
    ],
  },
  {
    id: 'digital-services',
    number: '11',
    title: 'Digital Experience',
    description: 'Accounts, online safety and the House’s digital services.',
    items: [
      { question: 'Do I need an account to use Shamim Forever?', answer: 'Some website features can be accessed without an account. Other services, private access experiences or order features may require registration or verification.' },
      { question: 'I cannot access my account. What should I do?', answer: 'Use the account recovery process first. If the issue continues, contact Client Relations through an official channel and do not share your password or security codes.' },
      { question: 'Is the Shamim Forever website secure?', answer: 'The House maintains technical and operational measures appropriate to its digital services. Always confirm that you are using the official HTTPS domain before sharing information.' },
      { question: 'What is digital identity in luxury?', answer: 'Digital identity connects a creation or client experience with trusted records such as authenticity, provenance, access and ownership information, where the relevant service supports it.' },
      { question: 'Where can I find official Shamim Forever information?', answer: 'Use www.shamimforever.com and the official House channels linked from it. Be cautious of imitation sites and unofficial accounts.' },
    ],
  },
  {
    id: 'corporate-media',
    number: '12',
    title: 'Corporate & Media',
    description: 'Partnerships, press, editorial and institutional enquiries.',
    items: [
      { question: 'How can I contact Shamim Forever about a partnership?', answer: 'Business and partnership enquiries should be directed through the official corporate communication channel with a concise description of the opportunity and the relevant organisation.' },
      { question: 'Does Shamim Forever work with collaborators?', answer: 'Potential collaborations may be considered based on strategic alignment, creative relevance, cultural fit and the institutional standards of the House.' },
      { question: 'How can journalists request information?', answer: 'Editorial and press enquiries may be directed to media@shamimforever.com with the publication, deadline, subject and requested format.' },
      { question: 'Can media use Shamim Forever images?', answer: 'Image usage depends on copyright, licensing and prior authorisation. Request permission before publishing or adapting House imagery.' },
      { question: 'Can I request an interview?', answer: 'Interview and editorial requests may be reviewed by the appropriate communications team. Send the request and context to media@shamimforever.com.' },
    ],
  },
]

export const allFaqItems = faqCategories.flatMap((category) => category.items)

export const suggestedSearches = [
  'How do I verify authenticity?',
  'How do bespoke commissions work?',
  'Where are the boutiques?',
  'How do I contact Concierge?',
  'What is private delivery?',
  'How can I place an order?',
]
