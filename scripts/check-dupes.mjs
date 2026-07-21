/**
 * Recycled-copy gate.
 *
 * The DEPLOYMENT step row shipped with the same sentence under steps 01 and 02
 * because a render mapped a 2-item array onto a 3-item structure and reused an
 * entry to fill the gap. That is a *class* of bug: several sections map a flat
 * copy array onto a richer visual structure, and any place the array is shorter
 * than the structure can silently recycle a line.
 *
 * This checks the copy modules themselves: within any single array, a repeated
 * string is almost always a paste error; across sibling fields of one section
 * it usually means a render will duplicate. Proper nouns and short labels
 * repeat legitimately, so only sentence-like strings are considered.
 *
 * Usage: npx tsx scripts/check-dupes.mjs
 */

const ROOT = new URL('..', import.meta.url).pathname

const MODULES = [
  'home', 'platform', 'solutions', 'enterprise', 'companionOs', 'company',
  'contact', 'demo', 'resources', 'accessibility', 'liveDemo', 'surfaceWall',
  'deviceScreens', 'global',
]

/** Sentence-like: long enough that a repeat is meaningful, not a label. */
const isProse = (v) => typeof v === 'string' && v.trim().length >= 25

let failures = 0
let arraysChecked = 0

function walk(node, path, lang, report) {
  if (Array.isArray(node)) {
    const strings = node.filter(isProse)
    if (strings.length > 1) {
      arraysChecked++
      const seen = new Map()
      for (const s of strings) {
        const k = s.trim()
        seen.set(k, (seen.get(k) ?? 0) + 1)
      }
      for (const [s, n] of seen) {
        if (n > 1) report.push({ path, lang, count: n, text: s.slice(0, 64) })
      }
    }
    node.forEach((v, i) => walk(v, `${path}[${i}]`, lang, report))
    return
  }
  if (node && typeof node === 'object') {
    // Sibling prose fields that are byte-identical inside one section.
    const proseFields = Object.entries(node).filter(([, v]) => isProse(v))
    const byValue = new Map()
    for (const [k, v] of proseFields) {
      const key = v.trim()
      byValue.set(key, [...(byValue.get(key) ?? []), k])
    }
    for (const [v, keys] of byValue) {
      if (keys.length > 1) {
        report.push({ path: `${path}.{${keys.join('|')}}`, lang, count: keys.length, text: v.slice(0, 64) })
      }
    }
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`, lang, report)
  }
}

for (const name of MODULES) {
  let mod
  try {
    mod = await import(`${ROOT}/src/lib/i18n/marketing/${name}.ts`)
  } catch {
    console.log(`skip   ${name} (not found)`)
    continue
  }
  const exported = Object.values(mod).find((v) => v && typeof v === 'object' && 'en' in v && 'es' in v)
  if (!exported) {
    console.log(`skip   ${name} (not a Localized module)`)
    continue
  }

  const report = []
  walk(exported.en, name, 'en', report)
  walk(exported.es, name, 'es', report)

  if (report.length === 0) {
    console.log(`ok     ${name}`)
  } else {
    failures += report.length
    console.log(`FAIL   ${name}`)
    for (const r of report) {
      console.log(`         ${r.lang}  ${r.path}  x${r.count}  "${r.text}"`)
    }
  }
}

console.log(`\nRECYCLED-COPY GATE: ${failures} duplicate(s) across ${arraysChecked} array(s)`)
process.exit(failures > 0 ? 1 : 0)
