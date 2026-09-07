import { HOUSE_PART_A } from './the-house-content-a1'
import { HOUSE_PART_A2 } from './the-house-content-a2'
import { HOUSE_PART_B } from './the-house-content-b'
import { HOUSE_PART_C } from './the-house-content-c'

export type HouseChapter = {
  number: string
  slug: string
  title: string
  kicker: string
  paragraphs: string[]
  bullets?: string[]
  formula?: string
}

export const HOUSE_CHAPTERS: HouseChapter[] = [...HOUSE_PART_A, ...HOUSE_PART_A2, ...HOUSE_PART_B, ...HOUSE_PART_C]
