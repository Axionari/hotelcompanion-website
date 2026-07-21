/**
 * ES parity gate. Walks each marketing copy module's exported Localized pair and
 * asserts: (a) key structure is identical EN vs ES, (b) ES strings actually differ
 * from EN (i.e. the module was really translated, not left mirroring), except for
 * an allowlist of strings that are correctly identical in both languages
 * (product names, emails, routes, slugs, ids).
 */
const ROOT = process.cwd()

const MODULES = [
  ['home', 'homeCopy'],
  ['global', 'globalCopy'],
  ['demoForm', 'demoFormCopy'],
  ['platform', 'platformCopy'],
  ['solutions', 'solutionsCopy'],
  ['enterprise', 'enterpriseCopy'],
  ['companionOs', 'companionOsCopy'],
  ['company', 'companyCopy'],
  ['contact', 'contactCopy'],
  ['demo', 'demoCopy'],
  ['resources', 'resourcesCopy'],
  ['accessibility', 'accessibilityDoc'],
]

// Values legitimately identical across languages.
const SHARED_OK = /^(\/|https?:|mailto:|#)|@hotelcompanion\.ai$|^(Hotel Companion|Companion OS|Axionari|Restaurant Companion)\.?$/

// Structural keys that MUST be identical across languages.
const NON_CONTENT = /\.(type|href|slug|id|email|code)$/

function walk(en, es, path, out) {
  if (typeof en === 'string') {
    if (NON_CONTENT.test(path)) {
      if (en !== es) out.shape.push(`${path}: structural value differs! EN=${en} ES=${es}`)
      return
    }
    out.total++
    if (en === es) {
      if (!SHARED_OK.test(en) && en.trim().length > 3) out.identical.push(`${path}: ${JSON.stringify(en.slice(0, 70))}`)
    } else out.translated++
    return
  }
  if (Array.isArray(en)) {
    if (!Array.isArray(es) || en.length !== es.length) {
      out.shape.push(`${path}: array length ${en.length} vs ${Array.isArray(es) ? es.length : typeof es}`)
      return
    }
    en.forEach((v, i) => walk(v, es[i], `${path}[${i}]`, out))
    return
  }
  if (en && typeof en === 'object') {
    const ek = Object.keys(en).sort()
    const sk = Object.keys(es ?? {}).sort()
    if (ek.join() !== sk.join()) {
      out.shape.push(`${path}: keys differ\n    EN: ${ek.join(',')}\n    ES: ${sk.join(',')}`)
      return
    }
    for (const k of ek) walk(en[k], es[k], `${path}.${k}`, out)
  }
}

const results = []
for (const [file, exportName] of MODULES) {
  const mod = await import(`${ROOT}/src/lib/i18n/marketing/${file}.ts`)
  const pair = mod[exportName]
  const out = { total: 0, translated: 0, identical: [], shape: [] }
  walk(pair.en, pair.es, file, out)
  results.push({ file, ...out })
}

// Legal docs
const legal = await import(`${ROOT}/src/lib/i18n/marketing/legal.ts`)
for (const name of ['privacyDoc', 'termsDoc', 'cookiesDoc', 'securityDoc', 'responsibleAiDoc', 'trustDoc']) {
  const pair = legal[name]
  const out = { total: 0, translated: 0, identical: [], shape: [] }
  walk(pair.en, pair.es, name, out)
  results.push({ file: name, ...out })
}

let bad = 0
for (const r of results) {
  const pct = r.total ? Math.round((r.translated / r.total) * 100) : 0
  const flag = r.shape.length ? 'SHAPE-MISMATCH' : r.identical.length > 2 ? 'CHECK' : 'ok'
  if (r.shape.length || r.identical.length > 2) bad++
  console.log(`${flag.padEnd(15)} ${r.file.padEnd(16)} ${r.translated}/${r.total} strings translated (${pct}%)`)
  for (const s of r.shape) console.log(`    SHAPE ${s}`)
  for (const s of r.identical.slice(0, 6)) console.log(`    same  ${s}`)
}
console.log(bad === 0 ? '\nES PARITY GATE: PASS' : `\nES PARITY GATE: ${bad} module(s) need attention`)
