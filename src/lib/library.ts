import { readFileSync } from 'node:fs'
import path from 'node:path'
import indexJson from '@/content/library/index.json'
import indexJsonEs from '@/content/library/es/index.json'
import type { Language } from '@/lib/i18n/translations'

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
  category: string
  readingTime: string
  next: string | null
}

const byOrder = (a: EssayMeta, b: EssayMeta) => a.order - b.order

/** The 12 essays in narrative order. Slugs and the Next chain are shared across languages. */
export const ESSAYS = (indexJson as EssayMeta[]).slice().sort(byOrder)
export const ESSAYS_ES = (indexJsonEs as EssayMeta[]).slice().sort(byOrder)

export const ESSAYS_BY_LANG: Record<Language, EssayMeta[]> = { en: ESSAYS, es: ESSAYS_ES }

export const CATEGORY_ORDER: EssayCategory[] = [
  'Guest Experience',
  'Revenue Growth',
  'Hotel Operations',
  'Artificial Intelligence',
  'Voice Technology',
  'Companion OS',
]

export function getEssay(slug: string, lang: Language = 'en'): EssayMeta | undefined {
  return ESSAYS_BY_LANG[lang].find((e) => e.slug === slug)
}

/** A parsed essay body: subheads and the one-line-per-beat paragraphs. */
export type EssayBlock = { type: 'subhead'; text: string } | { type: 'beat'; text: string } | { type: 'gap' }

/**
 * Reads an essay body from src/content/library (EN) or .../es (ES) and parses the
 * intentionally simple structure: "### " lines are display-serif subheads, blank
 * lines are rhythm breaks, and every other line is its own visual beat (verbatim).
 */
export function readEssayBody(slug: string, lang: Language = 'en'): EssayBlock[] {
  const dir = lang === 'es' ? 'src/content/library/es' : 'src/content/library'
  const raw = readFileSync(path.join(process.cwd(), dir, `${slug}.md`), 'utf8')
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
