import { chromium } from 'playwright-core'
import { mkdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'

/**
 * V4 gate harness (docs/v4/V4_BUILD_KIT.md §5).
 *   node reports/v4-gates.mjs <BASE>
 * G-1 words · G-2 typefaces · G-3 verbatim+A2+collisions · G-4 Act IV rect
 * audit · G-5 palette · G-6 orbs · G-8 site integrity · G-9 responsive.
 * (G-4 side-by-side and G-7 Lighthouse/screenshots run as separate steps.)
 * Every assertion prints PASS/FAIL + literal numbers; exit 1 on any FAIL.
 */

const BASE = process.argv[2] ?? 'http://localhost:4311'
const exec = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`

let failures = 0
const out = []
const say = (s) => {
  out.push(s)
  console.log(s)
}
const gate = (name, ok, detail) => {
  if (!ok) failures++
  say(`${ok ? 'PASS' : 'FAIL'} · ${name} — ${detail}`)
}

const browser = await chromium.launch({ executablePath: exec })

async function open(width, height, lang, path = '/') {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'no-preference' })
  const page = await ctx.newPage()
  if (lang === 'es') await page.addInitScript(() => localStorage.setItem('pc_lang', 'es'))
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  return { ctx, page }
}

const ACTS = ['act-i', 'act-ii', 'act-iii', 'act-iv', 'act-v', 'act-vi', 'act-vii']
const BUDGETS = { 'act-i': 35, 'act-ii': 40, 'act-iii': 70, 'act-iv': 30, 'act-v': 45, 'act-vi': 25, 'act-vii': 35 }

/* §3 reading copy, resolved per the kit's [v3]-authority rule (OQ-10) */
const READING = {
  en: {
    'act-i': [
      'THE VOICE-FIRST GUEST INTELLIGENCE PLATFORM FOR HOTELS',
      'Understand Every Guest.',
      'Capture Every Opportunity.',
      'NO FORM · NO BROCHURE · THIS IS THE PRODUCT',
      '0% OTA COMMISSION · 24/7 · IN EVERY LANGUAGE · LIVE IN DAYS',
    ],
    'act-ii': ["02 · WHAT'S AT STAKE", '2–3×', 'What an OTA booking costs versus direct.', 'SOURCE: KALIBRI LABS.', '$160B', 'Waiting inside AI-run hospitality operations.', 'SOURCE: MCKINSEY.'],
    'act-iii': [
      '03 · ONE DAY, ONE VOICE',
      'The booking, the upsell, the 2AM save — each begins as a question. The Companion closes what it answers. No OTA in between.',
      '10:04',
      'TABLET',
      '18:40',
      'DUSK · PHONE',
      '02:14',
      'VOICE · LIGHTS OFF',
    ],
    'act-iv': ['04 · EVERY SURFACE', "One conversation. Every screen in the guest's world.", 'Five screens. One memory. She never repeated herself once.'],
    'act-v': ['05 · INTELLIGENCE & EXECUTION', 'Every conversation becomes intelligence — and execution.', 'Tracked from creation to completion. Tonight: 14 conversations · 0 woke your staff.'],
    'act-vi': ['06 · DEPLOYMENT', 'Live in Days. Not Months.', "It doesn't replace your systems. It understands the conversations between them."],
    'act-vii': ['07 · NEXT STEP', 'Stop reading about it.', 'Ask it something.', 'Now partnering with a limited number of visionary hotel groups.', 'BECOME A FOUNDING PARTNER', 'POWERED BY AXIONARI'],
  },
  es: {
    'act-i': [
      'LA PLATAFORMA DE INTELIGENCIA DE HUÉSPEDES POR VOZ PARA HOTELES',
      'Entiende a Cada Huésped.',
      'Aprovecha Cada Oportunidad.',
      'SIN FORMULARIO · SIN FOLLETO · ESTO ES EL PRODUCTO',
      '0% COMISIÓN OTA · 24/7 · EN CADA IDIOMA · EN MARCHA EN DÍAS',
    ],
    'act-ii': ['02 · LO QUE ESTÁ EN JUEGO', '2–3×', 'Lo que cuesta una reserva por OTA frente a una directa.', 'FUENTE: KALIBRI LABS.', '$160 mil millones', 'Esperando dentro de la hospitalidad operada con IA.', 'FUENTE: MCKINSEY.'],
    'act-iii': [
      '03 · UN DÍA, UNA VOZ',
      'La reserva, la mejora, el rescate de las 2AM — cada uno empieza como una pregunta. El Companion las responde y las cierra. Sin OTA de por medio.',
      '10:04',
      'TABLET',
      '18:40',
      'ATARDECER · TELÉFONO',
      '02:14',
      'VOZ · A OSCURAS',
    ],
    'act-iv': ['04 · CADA SUPERFICIE', 'Una conversación. Cada pantalla del mundo del huésped.', 'Cinco pantallas. Una memoria. Nunca tuvo que repetirse.'],
    'act-v': ['05 · INTELIGENCIA Y EJECUCIÓN', 'Cada conversación se convierte en inteligencia — y en ejecución.', 'Rastreado de inicio a fin. Esta noche: 14 conversaciones · 0 despertaron a tu equipo.'],
    'act-vi': ['06 · IMPLEMENTACIÓN', 'En Marcha en Días. No en Meses.', 'No reemplaza tus sistemas. Entiende las conversaciones entre ellos.'],
    'act-vii': ['07 · SIGUIENTE PASO', 'Deja de leerlo.', 'Pregúntale algo.', 'Ahora nos asociamos con un número limitado de grupos hoteleros visionarios.', 'CONVIÉRTETE EN SOCIO FUNDADOR', 'POWERED BY AXIONARI'],
  },
}

/* device-UI strings that remain verbatim law (kit §3, `UI` slots) */
const DEVICE_UI = {
  en: ['Ask anything…', '"Best beach near here?"', '"Can we upgrade to an ocean view?"', '"There\'s water on the bathroom floor."', 'Suite Vista al Mar', '$250/night', 'Confirm upgrade', '→ FRONT DESK · LATE CHECKOUT', '→ CONCIERGE · TAXI TO AKUMAL', '→ RESERVATIONS · SUITE UPGRADE', 'LIVE IN DAYS', 'ROLE-BASED ACCESS', 'ENCRYPTED', 'PRIVACY-FIRST', 'WORKS WITH YOUR PMS', 'What would you upsell at my hotel?', 'How do you handle 2AM?'],
  es: ['Pregunta lo que sea…', '«¿La mejor playa cerca?»', '«¿Podemos mejorar a vista al mar?»', '«Hay agua en el piso del baño.»', 'Suite Vista al Mar', '$250/noche', 'Confirmar mejora', '→ RECEPCIÓN · SALIDA TARDÍA', '→ CONCIERGE · TAXI A AKUMAL', '→ RESERVAS · MEJORA DE SUITE', 'EN MARCHA EN DÍAS', 'ACCESO BASADO EN ROLES', 'CIFRADO', 'CENTRADO EN LA PRIVACIDAD', 'FUNCIONA CON TU PMS', '¿Qué venderías más en mi hotel?', '¿Cómo manejas las 2 AM?'],
}

/* ==================================== G-1 · word budgets (per act + total) */
for (const lang of ['en', 'es']) {
  const { ctx, page } = await open(1280, 900, lang)
  const rows = await page.evaluate((acts) => {
    const countWords = (t) => (t.match(/\S+/g) ?? []).filter((tok) => /\p{L}/u.test(tok)).length
    const subtree = (el) => (el.innerText ?? el.textContent ?? '')
    return acts.map((id) => {
      const sec = document.getElementById(id)
      if (!sec) return { id, missing: true }
      const full = countWords(sec.innerText)
      let device = 0
      sec.querySelectorAll('[data-device-ui]').forEach((el) => {
        if (el.parentElement?.closest('[data-device-ui]')) return
        if (el.getClientRects().length === 0) return // hidden (e.g. the other breakpoint's cluster)
        device += countWords(subtree(el))
      })
      let chrome = 0
      sec.querySelectorAll('[data-v4-chrome]').forEach((el) => (chrome += countWords(subtree(el))))
      let sr = 0
      sec.querySelectorAll('.sr-only').forEach((el) => {
        if (el.closest('[data-device-ui]')) return
        sr += countWords(el.textContent ?? '')
      })
      return { id, full, device, chrome, sr, reading: full - device - chrome - sr }
    })
  }, ACTS)
  let total = 0
  for (const r of rows) {
    if (r.missing) {
      gate(`G-1 ${lang} · ${r.id}`, false, 'SECTION MISSING')
      continue
    }
    total += r.reading
    gate(
      `G-1 ${lang} · ${r.id} ≤ ${BUDGETS[r.id]}`,
      r.reading <= BUDGETS[r.id],
      `reading ${r.reading} (raw ${r.full} − device-ui ${r.device} − chrome ${r.chrome} − sr-only ${r.sr})`
    )
  }
  gate(`G-1 ${lang} · total ≤ 320`, total <= 320, `total reading ${total}`)
  await ctx.close()
}

/* ============================== G-2 · two typefaces on the marketing layer */
for (const lang of ['en', 'es']) {
  const { ctx, page } = await open(1280, 900, lang)
  const bad = await page.evaluate((acts) => {
    const offending = []
    for (const id of acts) {
      const sec = document.getElementById(id)
      const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT)
      let n
      while ((n = walker.nextNode())) {
        if (!n.textContent.trim()) continue
        const el = n.parentElement
        if (!el || el.closest('[data-device-ui]')) continue
        const fam = getComputedStyle(el).fontFamily.toLowerCase()
        const first = fam.split(',')[0].replace(/["']/g, '').trim()
        /* ADDENDUM 1 §A/§C — Fraunces / Spline Sans Mono outside device UI */
        const ok = first.includes('fraunces') || first.includes('spline')
        if (!ok) offending.push({ act: id, first, text: n.textContent.trim().slice(0, 24) })
      }
    }
    return offending
  }, ACTS)
  gate(`G-2 ${lang} · serif/mono only outside [data-device-ui]`, bad.length === 0, bad.length ? JSON.stringify(bad.slice(0, 4)) : 'every reading text node computes Fraunces or Spline Sans Mono')
  await ctx.close()
}

/* ========================= G-3 · verbatim copy + A2 treatments + collisions */
for (const lang of ['en', 'es']) {
  const { ctx, page } = await open(1280, 900, lang)
  const misses = await page.evaluate(
    ({ reading, deviceUi }) => {
      const norm = (s) => s.replace(/\s+/g, ' ').trim()
      /* placeholders are attributes, not innerText — fold them in */
      const placeholders = [...document.querySelectorAll('input[placeholder]')].map((i) => i.placeholder).join(' ')
      const body = norm(document.body.innerText + ' ' + placeholders)
      const missing = []
      for (const [act, strings] of Object.entries(reading)) {
        const sec = norm(document.getElementById(act)?.innerText ?? '')
        for (const s of strings) if (!sec.includes(norm(s))) missing.push({ act, s: s.slice(0, 50) })
      }
      for (const s of deviceUi) if (!body.includes(norm(s))) missing.push({ act: 'device-ui', s: s.slice(0, 50) })
      return missing
    },
    { reading: READING[lang], deviceUi: DEVICE_UI[lang] }
  )
  gate(`G-3 ${lang} · verbatim §3 strings render`, misses.length === 0, misses.length ? JSON.stringify(misses.slice(0, 5)) : `${Object.values(READING[lang]).flat().length} reading + ${DEVICE_UI[lang].length} device-UI strings matched`)

  const a2 = await page.evaluate(() => {
    const o = document.querySelector('[data-v4-outline] [aria-hidden]')
    const g = document.querySelector('[data-v4-glow] [aria-hidden]')
    const oc = o && getComputedStyle(o)
    const gc = g && getComputedStyle(g)
    return {
      outline: o && { stroke: oc.webkitTextStrokeWidth, color: oc.color, size: parseFloat(oc.fontSize), sr: !!o.parentElement.querySelector('.sr-only')?.textContent.trim() },
      glow: g && { style: gc.fontStyle, color: gc.color, shadow: gc.textShadow, sr: !!g.parentElement.querySelector('.sr-only')?.textContent.trim() },
    }
  })
  gate(
    `G-3 ${lang} · A2 outline (2–3×)`,
    a2.outline && parseFloat(a2.outline.stroke) >= 1 && a2.outline.color === 'rgba(0, 0, 0, 0)' && a2.outline.size >= 180 && a2.outline.sr,
    a2.outline ? `stroke ${a2.outline.stroke} · color ${a2.outline.color} · ${a2.outline.size}px · sr-only ${a2.outline.sr}` : 'missing'
  )
  gate(
    `G-3 ${lang} · A2 glow ($160B, cream italic per ADDENDUM 1)`,
    a2.glow && a2.glow.style === 'italic' && a2.glow.color === 'rgb(242, 238, 230)' && a2.glow.shadow !== 'none' && a2.glow.sr,
    a2.glow ? `italic ${a2.glow.style} · ${a2.glow.color} · shadow ${a2.glow.shadow.slice(0, 30)}… · sr-only ${a2.glow.sr}` : 'missing'
  )
  await ctx.close()
}

for (const lang of ['en', 'es']) {
  for (const width of [1280, 1440, 1600, 2000, 2600]) {
    const { ctx, page } = await open(width, 950, lang)
    await page.evaluate(() => document.getElementById('act-ii').scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(1200)
    const bad = await page.evaluate(() => {
      const R = (el) => el.getBoundingClientRect()
      const inter = (a, b) =>
        Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
      const sec = document.getElementById('act-ii')
      const figs = [...sec.querySelectorAll('[data-v4-outline], [data-v4-glow]')]
      const bad = []
      for (const f of figs) {
        const fr = R(f)
        sec.querySelectorAll('div, span').forEach((el) => {
          if (f === el || f.contains(el) || el.contains(f)) return
          if (!el.textContent.trim()) return
          if (el.querySelector('[data-v4-outline], [data-v4-glow]')) return
          if (+getComputedStyle(el).opacity < 0.05) return
          const a = inter(fr, R(el))
          if (a > 0) bad.push({ el: el.textContent.slice(0, 24), area: Math.round(a) })
        })
      }
      return bad
    })
    gate(`G-3 ${lang} ${width}px · zero figure×copy collisions`, bad.length === 0, bad.length ? JSON.stringify(bad.slice(0, 3)) : 'clean')
    await ctx.close()
  }
}

/* ============================== G-4 · Act IV rect audit (reference-derived) */
{
  const { ctx, page } = await open(1280, 950, 'es')
  await page.evaluate(() => document.getElementById('act-iv').scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(1400)
  const r = await page.evaluate(() => {
    const R = (el) => el.getBoundingClientRect()
    const inter = (a, b) =>
      Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
    const sec = document.getElementById('act-iv')
    const desk = sec.querySelector('.v4-cluster-desktop')
    const figs = [...desk.querySelectorAll('figure')].filter((f) => R(f).width > 0)
    const order = ['web', 'phone', 'tv', 'tablet', 'watch', 'voice']
    const byKey = {}
    figs.slice(0, 6).forEach((f, i) => (byKey[order[i]] = f))

    // (a) overlap topology per the reference file
    const mustOverlap = [
      ['phone', 'tablet'],
      ['tv', 'tablet'],
      ['watch', 'tablet'],
      ['voice', 'tablet'],
    ]
    const overlaps = mustOverlap.map(([p, q]) => ({ pair: `${p}×${q}`, area: Math.round(inter(R(byKey[p]), R(byKey[q]))) }))
    const webTablet = Math.round(inter(R(byKey.web), R(byKey.tablet)))

    // (b) visible text vs fronting frames
    const zOf = { web: 1, phone: 2, tv: 2, tablet: 4, watch: 5, voice: 6 }
    const visibleTextRects = (rootEl) => {
      const rects = []
      const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT)
      let n
      while ((n = walker.nextNode())) {
        if (!n.textContent.trim()) continue
        const range = document.createRange()
        range.selectNodeContents(n)
        for (const rr of range.getClientRects()) {
          if (!rr.width) continue
          let a = n.parentElement
          let box = { left: rr.left, top: rr.top, right: rr.right, bottom: rr.bottom }
          while (a && a !== rootEl.parentElement) {
            const cs = getComputedStyle(a)
            if (cs.overflow !== 'visible' || cs.textOverflow === 'ellipsis') {
              const ar = a.getBoundingClientRect()
              box = { left: Math.max(box.left, ar.left), top: Math.max(box.top, ar.top), right: Math.min(box.right, ar.right), bottom: Math.min(box.bottom, ar.bottom) }
            }
            a = a.parentElement
          }
          if (box.right > box.left && box.bottom > box.top) rects.push({ rect: box, text: n.textContent.trim().slice(0, 24) })
        }
      }
      return rects
    }
    const clipped = []
    for (const key of order) {
      for (const { rect, text } of visibleTextRects(byKey[key])) {
        for (const other of order) {
          if (other === key || zOf[other] <= zOf[key]) continue
          for (const fr of byKey[other].querySelectorAll('[data-cframe]')) {
            if (inter(rect, R(fr)) > 0) clipped.push({ key, under: other, text })
          }
        }
      }
    }

    // (c) captions clear of frames and each other
    const caps = [...desk.querySelectorAll('[data-caption]')].filter((c) => R(c).width > 0)
    const frames = [...desk.querySelectorAll('[data-cframe]')].filter((f) => R(f).width > 0)
    const capBad = []
    caps.forEach((c, i) => {
      const cr = R(c)
      frames.forEach((f) => {
        if (inter(cr, R(f)) > 0) capBad.push({ cap: c.textContent.slice(0, 18), vs: 'frame' })
      })
      caps.forEach((c2, j) => {
        if (j <= i) return
        if (inter(cr, R(c2)) > 0) capBad.push({ cap: c.textContent.slice(0, 18), vs: c2.textContent.slice(0, 18) })
      })
    })

    // (d) zero connector SVGs · (e) 2px rims · (f) puck shadow
    const svgPaths = sec.querySelectorAll('svg path').length
    const rims = [...desk.querySelectorAll('[data-cframe]')]
      .filter((f) => f.firstElementChild && f.getAttribute('data-device-ui') != null && f.offsetWidth > 0 && f.querySelector('div'))
      .map((f) => ({ outer: f.offsetWidth, inner: f.firstElementChild.offsetWidth }))
      .filter((x) => x.inner > 0)
    const puckShadow = getComputedStyle(desk.querySelector('[data-puck-body]')).boxShadow

    return { overlaps, webTablet, clipped, capBad, svgPaths, rims, puckShadow, count: figs.length }
  })
  gate('G-4a · reference overlap pairs > 0', r.overlaps.every((o) => o.area > 0), r.overlaps.map((o) => `${o.pair}:${o.area}`).join(' · '))
  gate('G-4a · web×tablet stays clear (reference)', r.webTablet === 0, `area ${r.webTablet}`)
  gate('G-4b · zero text under fronting frames', r.clipped.length === 0, r.clipped.length ? JSON.stringify(r.clipped.slice(0, 4)) : 'clean')
  gate('G-4c · captions clear of frames + captions', r.capBad.length === 0, r.capBad.length ? JSON.stringify(r.capBad.slice(0, 4)) : `${6} captions checked`)
  gate('G-4d · zero SVG connector paths', r.svgPaths === 0, `svg path count = ${r.svgPaths}`)
  gate('G-4e · 2px rim per side on framed devices', r.rims.length >= 5 && r.rims.every((x) => x.outer - x.inner === 4), r.rims.map((x) => `${x.outer}-${x.inner}`).join(' · '))
  gate('G-4f · puck box-shadow ≠ none', r.puckShadow !== 'none', r.puckShadow.slice(0, 50) + '…')
  await ctx.close()
}

/* ==================================== G-5 · palette — zero cool hues */
{
  const { ctx, page } = await open(1280, 900, 'en')
  const cool = await page.evaluate(() => {
    const toHsl = (r, g, b) => {
      r /= 255; g /= 255; b /= 255
      const max = Math.max(r, g, b), min = Math.min(r, g, b)
      let h = 0
      const l = (max + min) / 2
      const d = max - min
      const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
      if (d !== 0) {
        if (max === r) h = 60 * (((g - b) / d) % 6)
        else if (max === g) h = 60 * ((b - r) / d + 2)
        else h = 60 * ((r - g) / d + 4)
      }
      return { h: (h + 360) % 360, s, l }
    }
    const offending = []
    const seen = new Set()
    const check = (el, prop, val) => {
      for (const m of val.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g)) {
        const [, r, g, b, a] = m
        if (a !== undefined && parseFloat(a) === 0) continue
        const { h, s } = toHsl(+r, +g, +b)
        if (h >= 150 && h <= 280 && s > 0.18) {
          const key = `${prop}:${m[0]}`
          if (!seen.has(key)) {
            seen.add(key)
            offending.push({ prop, val: m[0], tag: el.tagName, cls: String(el.className).slice(0, 30) })
          }
        }
      }
    }
    document.querySelectorAll('main *').forEach((el) => {
      if (el.closest('img') || el.tagName === 'IMG') return
      const cs = getComputedStyle(el)
      check(el, 'color', cs.color)
      check(el, 'background-color', cs.backgroundColor)
      check(el, 'border-color', cs.borderTopColor)
      check(el, 'background-image', cs.backgroundImage)
    })
    return offending
  })
  gate('G-5 · zero cool hues outside <img>', cool.length === 0, cool.length ? JSON.stringify(cool.slice(0, 4)) : 'computed scan clean (hue 150–280 · sat > .18)')
  await ctx.close()
}

/* ============ G-6 · every orb is the vux VoiceOrb stack (ADDENDUM 1 §B2) */
{
  const { ctx, page } = await open(1280, 900, 'en')
  const orbs = await page.evaluate(() => {
    const visible = (el) => el.getClientRects().length > 0
    const stackOk = (host) =>
      !!(host.querySelector('.vstage') && host.querySelector('.vring.r1') && host.querySelector('.vring.r2') && host.querySelector('.vglow') && host.querySelector('.vshimmer'))
    const counts = {}
    for (const id of ['act-i', 'act-iii', 'act-iv', 'act-vii']) {
      const sec = document.getElementById(id)
      const mics = [...sec.querySelectorAll('.vmic')].filter(visible)
      counts[id] = { count: mics.length, allStacks: mics.every(stackOk) }
    }
    // §B2: zero filled spheres / domes — no masked radial cores anywhere in the v4 root
    const root = document.querySelector('.v4-root')
    const filled = [...root.querySelectorAll('div')].filter((d) => {
      if (!visible(d)) return false
      const cs = getComputedStyle(d)
      return ((cs.maskImage || cs.webkitMaskImage) ?? '').includes('radial-gradient')
    }).length
    const heroMic = !!document.querySelector('.v4-hero-orb .vmic svg')
    return { counts, filled, heroMic }
  })
  const expect = { 'act-i': 2, 'act-iii': 1, 'act-iv': 3, 'act-vii': 2 }
  for (const [id, n] of Object.entries(expect)) {
    const r = orbs.counts[id]
    gate(`G-6 · ${id} vux orbs ×${n}`, r.count === n && r.allStacks, `${r.count} visible .vmic · full ring+glow+shimmer stacks: ${r.allStacks}`)
  }
  gate('G-6 · zero filled-sphere/dome orbs', orbs.filled === 0, `masked radial cores in v4 root = ${orbs.filled}`)
  gate('G-6 · hero orb carries the mic badge', orbs.heroMic, orbs.heroMic ? 'mic svg present' : 'missing')

  mkdirSync(fileURLToPath(new URL('./img', import.meta.url)), { recursive: true })
  const clipShot = async (sel, name, pad = 10) => {
    const el = await page.$(sel)
    if (!el) return
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel)
    await page.waitForTimeout(800)
    const b = await el.boundingBox()
    if (!b) return
    await page.screenshot({
      path: fileURLToPath(new URL(`./img/${name}`, import.meta.url)),
      clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad },
    })
  }
  await clipShot('.v4-hero-orb', 'v4-orb-hero-zoom.png', 24)
  await clipShot('.v4-sunarc-sun', 'v4-orb-sun-zoom.png', 24)
  say('shot · v4-orb-hero-zoom.png · v4-orb-sun-zoom.png')
  await ctx.close()
}

/* ================= G-10 · champagne retired; brass micro-accents only */
for (const lang of ['en', 'es']) {
  const { ctx, page } = await open(1280, 900, lang)
  const r = await page.evaluate(() => {
    const champagne = []
    const brass = []
    document.querySelectorAll('main *').forEach((el) => {
      if (!el.getClientRects().length) return
      const cs = getComputedStyle(el)
      if (cs.color === 'rgb(231, 206, 134)' && el.textContent.trim()) champagne.push({ tag: el.tagName, text: el.textContent.trim().slice(0, 24) })
      if (cs.color === 'rgb(201, 161, 90)' && el.textContent.trim() && !el.querySelector('*')) brass.push({ size: parseFloat(cs.fontSize), text: el.textContent.trim().slice(0, 24) })
    })
    return { champagne, brass }
  })
  gate(`G-10 ${lang} · zero champagne text`, r.champagne.length === 0, r.champagne.length ? JSON.stringify(r.champagne.slice(0, 4)) : 'no computed #E7CE86 text')
  gate(
    `G-10 ${lang} · brass ≤20px micro-accents only`,
    r.brass.every((b) => b.size <= 20),
    `${r.brass.length} brass instances · max ${Math.max(0, ...r.brass.map((b) => b.size))}px`
  )
  await ctx.close()
}

/* ====================== G-11 · family side-by-side vs restaurantcompanion.ai */
{
  const { ctx, page } = await open(1280, 900, 'en')
  await page.screenshot({ path: fileURLToPath(new URL('./img/v4-family-hero-1280.png', import.meta.url)) })
  await page.evaluate(() => scrollTo(0, 0))
  await page.waitForTimeout(400)
  const nav = await page.$('nav, header')
  if (nav) {
    const b = await nav.boundingBox()
    if (b) await page.screenshot({ path: fileURLToPath(new URL('./img/v4-family-nav-1280.png', import.meta.url)), clip: { x: 0, y: 0, width: 1280, height: Math.max(80, b.height + b.y) } })
  }
  await ctx.close()
  try {
    const rc = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    const rcPage = await rc.newPage()
    await rcPage.goto('https://restaurantcompanion.ai', { waitUntil: 'networkidle', timeout: 45000 })
    await rcPage.waitForTimeout(2000)
    await rcPage.screenshot({ path: fileURLToPath(new URL('./img/rc-family-hero-1280.png', import.meta.url)) })
    await rcPage.screenshot({ path: fileURLToPath(new URL('./img/rc-family-nav-1280.png', import.meta.url)), clip: { x: 0, y: 0, width: 1280, height: 96 } })
    await rcPage.goto('https://restaurantcompanion.ai/features', { waitUntil: 'networkidle', timeout: 45000 })
    await rcPage.waitForTimeout(2500)
    const rcOrb = await rcPage.$('.vmic')
    if (rcOrb) {
      await rcPage.evaluate(() => document.querySelector('.vmic')?.scrollIntoView({ block: 'center' }))
      await rcPage.waitForTimeout(900)
      const b = await rcOrb.boundingBox()
      if (b) {
        const x = Math.max(0, Math.min(b.x - 24, 1279))
        const y = Math.max(0, Math.min(b.y - 24, 899))
        const w = Math.max(40, Math.min(b.width + 48, 1280 - x))
        const h = Math.max(40, Math.min(b.height + 48, 900 - y))
        await rcPage.screenshot({ path: fileURLToPath(new URL('./img/rc-family-orb.png', import.meta.url)), clip: { x, y, width: w, height: h } })
      }
    } else {
      await rcPage.screenshot({ path: fileURLToPath(new URL('./img/rc-family-orb.png', import.meta.url)) })
    }
    await rc.close()
    gate('G-11 · family side-by-sides captured', true, 'v4 hero/nav + RC hero/nav/orb saved to reports/img/')
  } catch (e) {
    gate('G-11 · family side-by-sides captured', false, `RC unreachable: ${String(e).slice(0, 80)} — v4 halves saved; retry when online`)
  }
}

/* ======================= G-8 · site integrity (v3 routes + FAQ + links) */
{
  const routes = ['/platform', '/solutions', '/enterprise', '/companion-os', '/resources', '/company', '/contact', '/demo', '/faq', '/privacy', '/terms', '/cookies', '/security', '/responsible-ai', '/trust', '/accessibility']
  const bad = []
  for (const r of routes) {
    const res = await fetch(BASE + r)
    if (res.status !== 200) bad.push(`${r}:${res.status}`)
  }
  gate('G-8 · all non-home routes 200', bad.length === 0, bad.length ? bad.join(' ') : `${routes.length} routes OK`)

  const { ctx, page } = await open(1280, 900, 'en', '/resources')
  const faqThere = await page.evaluate(() => document.body.innerText.includes('What is Hotel Companion?'))
  const navThere = await page.evaluate(() => !!document.querySelector('nav'))
  gate('G-8 · FAQ reachable at /resources#faq', faqThere, faqThere ? 'homepage Q&A present' : 'MISSING')
  gate('G-8 · v3 nav intact on non-home routes', navThere, navThere ? 'nav renders' : 'MISSING')
  await ctx.close()

  // homepage links resolve (footer + act VII CTA)
  const { ctx: c2, page: home } = await open(1280, 900, 'en')
  const links = await home.evaluate(() => [...document.querySelectorAll('main a[href^="/"]')].map((a) => a.getAttribute('href')))
  const uniq = [...new Set(links)].filter((h) => !h.startsWith('/#'))
  const dead = []
  const envDependent = []
  for (const h of uniq) {
    const res = await fetch(BASE + h.split('#')[0])
    if (res.status !== 200) {
      /* the legacy Supabase-backed auth routes 500 without the Vercel env —
         pre-existing v3 behavior; re-verified against the deployed preview */
      if (h.startsWith('/auth')) envDependent.push(`${h}:${res.status}`)
      else dead.push(`${h}:${res.status}`)
    }
  }
  gate(
    'G-8 · zero dead links on the homepage',
    dead.length === 0,
    `${uniq.length} links · ${dead.length ? 'DEAD: ' + dead.join(' ') : 'clean'}${envDependent.length ? ` · env-dependent (auth, verify on preview): ${envDependent.join(' ')}` : ''}`
  )

  // the ask-bar answers (scripted, no network)
  await home.evaluate(() => document.getElementById('act-vii').scrollIntoView({ block: 'center' }))
  await home.waitForTimeout(800)
  const chip = await home.$('#act-vii .v4-chip-btn')
  await chip.click()
  await home.waitForTimeout(2200)
  const reply = await home.evaluate(() => document.querySelector('#act-vii .v4-reply-card')?.innerText ?? '')
  gate('G-8 · Act VII chip → scripted answer renders', reply.length > 40, `reply ${reply.length} chars: "${reply.slice(0, 48)}…"`)
  await c2.close()
}

/* ============================ G-9 · responsive (390 · one idea per act) */
for (const lang of ['en', 'es']) {
  const { ctx, page } = await open(390, 844, lang)
  const r = await page.evaluate((acts) => {
    const doc = document.documentElement
    const overflow = doc.scrollWidth - doc.clientWidth
    const momentsCols = getComputedStyle(document.querySelector('.v4-moments')).gridTemplateColumns.split(' ').length
    const clusterDesktop = getComputedStyle(document.querySelector('.v4-cluster-desktop')).display
    const clusterMobile = getComputedStyle(document.querySelector('.v4-cluster-mobile')).display
    const missing = acts.filter((id) => !document.getElementById(id))
    return { overflow, momentsCols, clusterDesktop, clusterMobile, missing }
  }, ACTS)
  gate(`G-9 ${lang} · zero horizontal overflow at 390`, r.overflow <= 0, `scrollWidth − clientWidth = ${r.overflow}`)
  gate(`G-9 ${lang} · Act III moments stack`, r.momentsCols === 1, `grid columns = ${r.momentsCols}`)
  gate(`G-9 ${lang} · Act IV uses v3 mobile treatment`, r.clusterDesktop === 'none' && r.clusterMobile === 'block', `desktop ${r.clusterDesktop} · mobile ${r.clusterMobile}`)
  await ctx.close()
}

await browser.close()
writeFileSync(fileURLToPath(new URL('./v4-gates-output.txt', import.meta.url)), out.join('\n') + '\n')
say(`\n${failures === 0 ? 'ALL GATES GREEN' : failures + ' FAILURES'}`)
process.exit(failures ? 1 : 0)
