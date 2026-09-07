export const dimensions = [
  { n: '01', title: 'Origin', text: 'Where the object began: House, collection, atelier, creator, period, and authorized distribution history.' },
  { n: '02', title: 'Identity', text: 'What makes this object distinguishable: reference, materials, design attributes, and craftsmanship.' },
  { n: '03', title: 'Provenance', text: 'The documented journey from creation through registration, allocation, acquisition, service, and heritage.' },
  { n: '04', title: 'Integrity', text: 'Whether the object and its record have remained materially and historically consistent.' },
  { n: '05', title: 'Evidence', text: 'Physical, documentary, historical, and authorized information available for examination.' },
]
export const layers = ['07 · Preservation','06 · Verification','05 · Integrity','04 · Provenance','03 · Creation record','02 · House identity','01 · Object identity']
export const methodology = [
  ['01','Identify','Define the object, collection, reference, materials, and claimed period.'],
  ['02','Review','Gather available documentation without treating one document as conclusive.'],
  ['03','Compare','Examine identity, construction, design, and temporal consistency.'],
  ['04','Trace','Consider creation, registration, allocation, acquisition, service, and heritage.'],
  ['05','Evaluate','Weigh independent signals and note agreement, conflict, or absence.'],
  ['06','Document','Record the conclusion with responsible language and stated uncertainty.'],
] as const
export const chapters = [
  ['what-is-authenticity','What Is Authenticity?','The relationship between an object and the evidence supporting its origin.'],
  ['provenance','Provenance','How an object’s documented journey strengthens or limits an assessment.'],
  ['object-identity','Object Identity','Why a precise identity is stronger than a generic product description.'],
  ['materials','Materials & Craft','How composition, construction, and the hand of the maker become evidence.'],
  ['digital-authenticity','Digital Authenticity','Records, access, integrity, traceability, and the limits of a QR code.'],
  ['authentication-guide','Authentication Guide','A responsible, evidence-led examination without theatrical certainty.'],
] as const
export const faqs = [
  ['What does authenticity mean at Shamim Forever?','Authenticity is the relationship between an object, its identity, its origin, its provenance, and the evidence available to support those claims.'],
  ['Does a logo prove authenticity?','No. A logo alone does not establish authenticity. It should be considered alongside identity, materials, records, provenance, and other evidence.'],
  ['Does a certificate guarantee authenticity?','A certificate may support an assessment, but it should be considered alongside the physical object and other available evidence.'],
  ['Can a serial number be copied?','Yes. Serial numbers can be copied or reproduced and should be examined within a broader verification context.'],
  ['Does missing provenance mean an object is fake?','No. Missing information does not automatically prove inauthenticity, but it may reduce the available historical evidence.'],
  ['Does blockchain prove a physical object is authentic?','No. Blockchain may preserve records, but cannot independently determine whether original physical information was true.'],
] as const
