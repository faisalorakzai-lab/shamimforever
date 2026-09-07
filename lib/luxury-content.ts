import { LUXURY_PART_A1 } from './luxury-content-a1'
    import { LUXURY_PART_A2 } from './luxury-content-a2'
    import { LUXURY_PART_B } from './luxury-content-b'
    import { LUXURY_PART_C } from './luxury-content-c'

    export type LuxuryChapter = {
    number: string
    slug: string
    title: string
    kicker: string
    paragraphs: string[]
    bullets?: string[]
    formula?: string
    }

    export const LUXURY_CHAPTERS: LuxuryChapter[] = [...LUXURY_PART_A1, ...LUXURY_PART_A2, ...LUXURY_PART_B, ...LUXURY_PART_C]
    