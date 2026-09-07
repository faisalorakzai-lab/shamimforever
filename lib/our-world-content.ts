import { OUR_WORLD_PART_A1 } from './our-world-content-a1'
    import { OUR_WORLD_PART_A2 } from './our-world-content-a2'
    import { OUR_WORLD_PART_B } from './our-world-content-b'
    import { OUR_WORLD_PART_C } from './our-world-content-c'

    export type OurWorldChapter = {
    number: string
    slug: string
    title: string
    kicker: string
    paragraphs: string[]
    bullets?: string[]
    formula?: string
    }

    export const OUR_WORLD_CHAPTERS: OurWorldChapter[] = [...OUR_WORLD_PART_A1, ...OUR_WORLD_PART_A2, ...OUR_WORLD_PART_B, ...OUR_WORLD_PART_C]
    