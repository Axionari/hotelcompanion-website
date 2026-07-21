import { readFileSync } from 'node:fs'
import path from 'node:path'
import indexJson from '@/content/library/index.json'

export type EssayCategory =
  | 'Guest Experience'
  | 'Revenue Growth'
  | 'Hotel Operations'
  | 'Artificial Intelligence'
  | 'Voice Technology'
  | 'Companion OS'

export interface EssayMeta {
  slug: string
  order: number
  title: string
  subtitle: string
  category: EssayCategory
  readingTime: string
  next: string | null
}

/** The 12 essays in narrative order (front matter from the approved index). */
export const ESSAYS = (indexJson as EssayMeta[]).slice().sort((a, b) => a.order - b.order)

export const CATEGORY_ORDER: EssayCategory[] = [
  'Guest Experience',
  'Revenue Growth',
  'Hotel Operations',
  'Artificial Intelligence',
  'Voice Technology',
  'Companion OS',
]

export function getEssay(slug: string): EssayMeta | undefined {
  return ESSAYS.find((e) => e.slug === slug)
}

/** A parsed essay body: subheads and the one-line-per-beat paragraphs. */
export type EssayBlock = { type: 'subhead'; text: string } | { type: 'beat'; text: string } | { type: 'gap' }

/**
 * Reads an essay body from src/content/library and parses the intentionally
 * simple structure: "### " lines are display-serif subheads, blank lines are
 * rhythm breaks, and every other line is its own visual beat (verbatim).
 */
export function readEssayBody(slug: string): EssayBlock[] {
  const file = path.join(process.cwd(), 'src/content/library', `${slug}.md`)
  const raw = readFileSync(file, 'utf8')
  const blocks: EssayBlock[] = []
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (trimmed === '') {
      if (blocks.length > 0 && blocks[blocks.length - 1].type !== 'gap') blocks.push({ type: 'gap' })
      continue
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'subhead', text: trimmed.slice(4).trim() })
      continue
    }
    blocks.push({ type: 'beat', text: trimmed })
  }
  while (blocks.length > 0 && blocks[blocks.length - 1].type === 'gap') blocks.pop()
  return blocks
}
