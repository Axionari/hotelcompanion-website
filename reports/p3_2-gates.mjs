import { chromium } from 'playwright-core'
import { mkdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'

/**
 * P3.2 gate harness (docs/v3/PANEL_INSPECTION_AND_CORRECTIONS.md).
 *   node reports/p3_2-gates.mjs <BASE> [share-query]
 * G-1 A2 computed styles · G-2 stakes collision · G-3 arc scrub · G-4
 * constellation topology · G-5 orb edge softness · G-7 word count +
 * regression screenshots. Every assertion prints PASS/FAIL + the literal
 * numbers; process exits 1 on any FAIL.
 */

const BASE = process.argv[2] ?? 'http://localhost:4310'
const SHARE = process.argv[3] ?? ''
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

async function open(width, height, lang, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: opts.dpr ?? 1,
    reducedMotion: 'no-preference',
  })
  const page = await ctx.newPage()
  if (lang === 'es') await page.addInitScript(() => localStorage.setItem('pc_lang', 'es'))
  await page.goto(BASE + '/' + SHARE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)
  return { ctx, page }
}

const inter = (a, b) => {
  const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
  const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
  return x * y
}

/* ================================================== G-1 · A2 numbers-as-art */
for (const lang of ['en', 'es']) {
  const { ctx, page } = await open(1440, 900, lang)
  const r = await page.evaluate(() => {
    const sec = document.querySelector('#home-stake')
    const outline = sec?.querySelector('.stat-art-outline')
    const glow = sec?.querySelector('.stat-art-glow')
    const read = (el) => {
      const cs = getComputedStyle(el)
      return {
        text: el.textContent,
        stroke: cs.webkitTextStrokeWidth,
        color: cs.color,
        fontSize: parseFloat(cs.fontSize),
        fontStyle: cs.fontStyle,
        textShadow: cs.textShadow,
        srOnly: !!el.querySelector('.sr-only')?.textContent?.trim(),
        hidden: el.querySelector('[aria-hidden="true"]') != null,
      }
    }
    return { outline: outline && read(outline), glow: glow && read(glow) }
  })
  const o = r.outline
  const g = r.glow
  gate(
    `G-1 ${lang} · 2–3× outline`,
    o && o.text.includes('2–3×') && parseFloat(o.stroke) >= 1 && o.color === 'rgba(0, 0, 0, 0)' && o.fontSize >= 180 && o.srOnly && o.hidden,
    o ? `"${o.text.slice(0, 12)}" · stroke ${o.stroke} · color ${o.color} · font-size ${o.fontSize}px · sr-only ${o.srOnly}` : 'element missing'
  )
  gate(
    `G-1 ${lang} · $160B glow`,
    g && g.text.includes('$160') && g.fontStyle === 'italic' && g.color === 'rgb(231, 206, 134)' && g.textShadow !== 'none' && g.srOnly && g.hidden,
    g ? `"${g.text.slice(0, 20)}" · font-style ${g.fontStyle} · color ${g.color} · text-shadow ${g.textShadow.slice(0, 40)}… · sr-only ${g.srOnly}` : 'element missing'
  )
  await ctx.close()
}

/* =============================================== G-2 · stakes no-collision */
for (const lang of ['en', 'es']) {
  for (const width of [1280, 1440, 1600, 2000, 2600]) {
    const { ctx, page } = await open(width, 950, lang)
    // settle the Reveal entrance transforms before measuring
    await page.evaluate(() => document.querySelector('#home-stake').scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(1400)
    const r = await page.evaluate(() => {
      const R = (el) => el.getBoundingClientRect()
      const inter = (a, b) =>
        Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
        Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
      const sec = document.querySelector('#home-stake')
      const figures = [...sec.querySelectorAll('.stat-art-outline, .stat-art-glow')]
      const bad = []
      for (const f of figures) {
        const fr = R(f)
        // every text/bars element in the section that is not the figure itself
        // and not an ancestor of it
        sec.querySelectorAll('p, li, td, th, span, div').forEach((el) => {
          if (f === el || f.contains(el) || el.contains(f)) return
          if (!el.textContent.trim()) return
          // leaf-ish only: skip wrappers that contain the other figure
          if (el.querySelector('.stat-art-outline, .stat-art-glow')) return
          // invisible/in-transit elements cannot occlude
          if (+getComputedStyle(el).opacity < 0.05) return
          const a = inter(fr, R(el))
          if (a > 0) bad.push({ fig: f.className, el: el.textContent.slice(0, 32), area: Math.round(a) })
        })
      }
      return bad
    })
    gate(`G-2 ${lang} ${width}px`, r.length === 0, r.length === 0 ? 'zero figure×copy intersections' : JSON.stringify(r.slice(0, 3)))
    await ctx.close()
  }
}

/* ===================================================== G-3 · the sun arc */
for (const width of [1440, 1600]) {
  const { ctx, page } = await open(width, 900, 'en')
  const meta = await page.evaluate(() => {
    const sec = document.querySelector('#home-revenue')
    let sticky = null
    sec.querySelectorAll('*').forEach((el) => {
      if (getComputedStyle(el).position === 'sticky') sticky = el
    })
    if (!sticky) return { sticky: false }
    const badAnc = []
    let a = sticky.parentElement
    while (a && a !== document.documentElement) {
      const cs = getComputedStyle(a)
      if (cs.overflowX === 'hidden') badAnc.push(a.tagName + '.' + a.className)
      a = a.parentElement
    }
    const wrapH = sticky.parentElement.getBoundingClientRect().height
    return { sticky: true, wrapH, vh: innerHeight, badAnc }
  })
  gate(
    `G-3 ${width}px · sticky ≥200vh`,
    meta.sticky && meta.wrapH >= 2 * meta.vh,
    meta.sticky ? `wrapper ${Math.round(meta.wrapH)}px vs 200vh=${2 * meta.vh}px` : 'NO STICKY ELEMENT'
  )
  gate(
    `G-3 ${width}px · no overflow-x:hidden ancestor`,
    meta.sticky && meta.badAnc.length === 0,
    JSON.stringify(meta.badAnc ?? 'n/a')
  )

  // scrub sampling: 5 positions across the pin
  const samples = []
  for (const p of [0.02, 0.3, 0.55, 0.8, 0.98]) {
    await page.evaluate((p) => {
      const sec = document.querySelector('#home-revenue')
      const wrap = [...sec.querySelectorAll('*')].find((el) => getComputedStyle(el).position === 'sticky')?.parentElement
      const top = wrap.getBoundingClientRect().top + scrollY
      const total = wrap.getBoundingClientRect().height - innerHeight
      scrollTo(0, top + p * total)
    }, p)
    await page.waitForTimeout(900) // let the damped p settle
    samples.push(
      await page.evaluate(() => {
        const R = (el) => el?.getBoundingClientRect()
        const orb = R(document.querySelector('[data-arc-orb]'))
        const sky = ['[data-sky-glow]', '[data-sky-dusk]', '[data-sky-night]'].map(
          (s) => +getComputedStyle(document.querySelector(s)).opacity
        )
        // occlusion: stop time/tag text vs the traveling orb (label counts
        // only when visible), and vs other stops' VISIBLE content — their
        // mini-UI/receipt boxes and their own text — not empty column area
        const label = document.querySelector('[data-arc-label]')
        const labelOn = +getComputedStyle(label).opacity > 0.05
        // the orb VISUAL (the ArcOrb child) — the container box also holds the
        // label slot, which is judged separately by visibility
        const orbCore = R(document.querySelector('[data-arc-orb]').firstElementChild)
        const inter = (a, b) =>
          a && b
            ? Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
              Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
            : 0
        const texts = [...document.querySelectorAll('[data-stop-time], [data-stop-tag]')]
        const details = []
        for (const t of texts) {
          const tr = R(t)
          if (labelOn && inter(tr, R(label)) > 0) details.push(`label×"${t.textContent.slice(0, 14)}"`)
          // the orb core itself must never sit on stop text
          if (inter(tr, orbCore) > 0) details.push(`orb×"${t.textContent.slice(0, 14)}"`)
        }
        const cols = [...document.querySelectorAll('[data-stop-col]')]
        for (const t of texts) {
          const col = t.closest('[data-stop-col]')
          const tr = R(t)
          for (const other of cols) {
            if (other === col) continue
            for (const solid of other.querySelectorAll('[data-device-ui], [data-stop-time], [data-stop-tag]')) {
              if (inter(tr, R(solid)) > 0) details.push(`"${t.textContent.slice(0, 12)}"×stop-content`)
            }
          }
        }
        return { orbX: orb.left + orb.width / 2, sky, details }
      })
    )
  }
  const xs = samples.map((s) => Math.round(s.orbX))
  const monotone = xs.every((x, i) => i === 0 || x > xs[i - 1])
  gate(`G-3 ${width}px · orb monotone along arc (5 samples)`, monotone, `x = ${xs.join(' → ')}`)
  const skySignatures = new Set(samples.map((s) => s.sky.map((o) => o.toFixed(2)).join('/')))
  gate(`G-3 ${width}px · sky differs across ≥3 stops`, skySignatures.size >= 3, `${skySignatures.size} distinct sky states: ${[...skySignatures].join(' · ')}`)
  const occl = samples.flatMap((s) => s.details)
  gate(`G-3 ${width}px · stop labels/copy unoccluded at every position`, occl.length === 0, occl.length ? occl.slice(0, 5).join(' · ') : 'zero occlusions across samples')
  await ctx.close()
}

/* =========================================== G-4 · constellation topology */
{
  const { ctx, page } = await open(1440, 950, 'es')
  await page.evaluate(() => document.querySelector('[data-caption]').scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(1200)
  const r = await page.evaluate(() => {
    const R = (el) => el.getBoundingClientRect()
    const inter = (a, b) =>
      Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
      Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
    const root = document.querySelector('[data-caption]').closest('section') ?? document.body
    const stageFigures = [...root.querySelectorAll('figure')].filter((f) => R(f).width > 0)
    const byKey = {}
    const order = ['web', 'phone', 'tv', 'tablet', 'watch', 'voice']
    stageFigures.slice(0, 6).forEach((f, i) => (byKey[order[i]] = f))

    // (a) required overlaps
    const pairs = [
      ['tablet', 'web'],
      ['tablet', 'tv'],
      ['phone', 'tablet'],
      ['watch', 'phone'],
      ['watch', 'tablet'],
      ['voice', 'tablet'],
    ]
    const overlaps = pairs.map(([p, q]) => ({ pair: `${p}×${q}`, area: Math.round(inter(R(byKey[p]), R(byKey[q]))) }))

    // (b) text clipping: VISIBLE text rects (range rects clipped by their own
    // overflow ancestors — an ellipsized pill's hidden tail is not visible
    // text) of web/tv/phone screens vs the tablet frame, and every device's
    // own text vs any higher-z sibling frame
    const visibleTextRects = (rootEl) => {
      const rects = []
      const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT)
      let n
      while ((n = walker.nextNode())) {
        if (!n.textContent.trim()) continue
        const range = document.createRange()
        range.selectNodeContents(n)
        for (let rr of range.getClientRects()) {
          if (!rr.width) continue
          // clip by every scrolling/hidden ancestor
          let a = n.parentElement
          let box = { left: rr.left, top: rr.top, right: rr.right, bottom: rr.bottom }
          while (a && a !== rootEl.parentElement) {
            const cs = getComputedStyle(a)
            if (cs.overflow !== 'visible' || cs.textOverflow === 'ellipsis') {
              const ar = a.getBoundingClientRect()
              box = {
                left: Math.max(box.left, ar.left),
                top: Math.max(box.top, ar.top),
                right: Math.min(box.right, ar.right),
                bottom: Math.min(box.bottom, ar.bottom),
              }
            }
            a = a.parentElement
          }
          if (box.right > box.left && box.bottom > box.top)
            rects.push({ rect: { ...box, width: box.right - box.left, height: box.bottom - box.top }, text: n.textContent.trim().slice(0, 28) })
        }
      }
      return rects
    }
    const tabletFrame = byKey.tablet.querySelector('[data-cframe]')
    const tfr = R(tabletFrame)
    const clipped = []
    for (const key of ['web', 'tv', 'phone']) {
      for (const { rect, text } of visibleTextRects(byKey[key])) {
        if (inter(rect, tfr) > 0) clipped.push({ key, text })
      }
    }
    const zOf = { web: 1, phone: 2, tv: 2, tablet: 3, watch: 4, voice: 4 }
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

    // (c) captions vs hardware + captions vs captions
    const caps = [...root.querySelectorAll('[data-caption]')].filter((c) => R(c).width > 0)
    const frames = [...root.querySelectorAll('[data-cframe]')].filter((f) => R(f).width > 0)
    const capBad = []
    caps.forEach((c, i) => {
      const cr = R(c)
      frames.forEach((f) => {
        if (inter(cr, R(f)) > 0) capBad.push({ cap: c.textContent.slice(0, 20), vs: 'frame', area: Math.round(inter(cr, R(f))) })
      })
      caps.forEach((c2, j) => {
        if (j <= i) return
        if (inter(cr, R(c2)) > 0) capBad.push({ cap: c.textContent.slice(0, 20), vs: c2.textContent.slice(0, 20) })
      })
    })

    // (d) connector svg paths
    const svgPaths = root.querySelectorAll('svg path').length

    // (e) rim delta — offsetWidth is transform-independent layout truth;
    // rendered frames only (the mobile row's duplicates are display:none)
    const rims = [...root.querySelectorAll('[data-cframe]')]
      .filter((f) => f.firstElementChild && f.getAttribute('data-device-ui') != null && f.offsetWidth > 0)
      .map((f) => ({ outer: f.offsetWidth, inner: f.firstElementChild.offsetWidth }))

    // (f) puck shadow
    const puckShadow = getComputedStyle(document.querySelector('[data-puck-body]')).boxShadow

    return { overlaps, clipped, capBad, svgPaths, rims, puckShadow, deviceCount: stageFigures.length }
  })
  gate('G-4a · six required overlaps > 0', r.overlaps.every((o) => o.area > 0), r.overlaps.map((o) => `${o.pair}:${o.area}`).join(' · '))
  gate('G-4b · zero text-node clipping', r.clipped.length === 0, r.clipped.length ? JSON.stringify(r.clipped.slice(0, 4)) : 'no screen text under a fronting frame')
  gate('G-4c · captions clear of frames + captions', r.capBad.length === 0, r.capBad.length ? JSON.stringify(r.capBad.slice(0, 4)) : `checked ${6} captions vs ${r.rims.length}+ frames`)
  gate('G-4d · zero SVG connector paths', r.svgPaths === 0, `svg path count = ${r.svgPaths}`)
  gate('G-4e · rim delta 2px/side on all screen devices', r.rims.length >= 5 && r.rims.every((x) => x.outer - x.inner === 4), r.rims.map((x) => `${x.outer}-${x.inner}`).join(' · '))
  gate('G-4f · puck box-shadow ≠ none', r.puckShadow !== 'none', r.puckShadow.slice(0, 60) + '…')
  await ctx.close()
}

/* ================================================ G-5 · orb edge softness */
{
  const { ctx, page } = await open(1440, 950, 'en', { dpr: 3 })
  mkdirSync(fileURLToPath(new URL('./img', import.meta.url)), { recursive: true })
  const targets = await page.evaluate(() => {
    document.querySelector('[data-caption]').scrollIntoView({ block: 'center' })
    return null
  })
  void targets
  await page.waitForTimeout(1500)
  // phone orb = first ArcOrb inside the phone screen; watch dot = the ArcOrb in the watch
  const boxes = await page.evaluate(() => {
    const root = document.querySelector('[data-caption]').closest('section') ?? document.body
    const figs = [...root.querySelectorAll('figure')].filter((f) => f.getBoundingClientRect().width > 0)
    const order = ['web', 'phone', 'tv', 'tablet', 'watch', 'voice']
    const get = (k) => figs[order.indexOf(k)]
    // the masked ember core inside the shared orb
    const orbCore = (host) => {
      const el = [...host.querySelectorAll('div')].find((d) => (getComputedStyle(d).maskImage ?? '').includes('radial-gradient'))
      const r = el.getBoundingClientRect()
      return { x: r.left, y: r.top, w: r.width, h: r.height }
    }
    return { phone: orbCore(get('phone')), watch: orbCore(get('watch')) }
  })
  for (const key of ['phone', 'watch']) {
    const b = boxes[key]
    const pad = b.w // capture one orb-width of padding around
    const shot = await page.screenshot({
      clip: { x: b.x - pad / 2, y: b.y - pad / 2, width: b.w + pad, height: b.h + pad },
    })
    writeFileSync(fileURLToPath(new URL(`./img/p3_2-orb-${key}-3x.png`, import.meta.url)), shot)
    // decode PNG via the browser itself
    const softness = await page.evaluate(
      async ({ png, cx }) => {
        const img = new Image()
        img.src = 'data:image/png;base64,' + png
        await img.decode()
        const cv = document.createElement('canvas')
        cv.width = img.width
        cv.height = img.height
        const g = cv.getContext('2d')
        g.drawImage(img, 0, 0)
        const row = g.getImageData(0, Math.round(img.height / 2), img.width, 1).data
        const lum = []
        for (let i = 0; i < img.width; i++) lum.push(0.2126 * row[i * 4] + 0.7152 * row[i * 4 + 1] + 0.0722 * row[i * 4 + 2])
        // scan rightward from center across the orb's own fade zone only —
        // the orb spans the middle half of the capture, so stop at 87.5% of
        // its radius past the edge (before the device's bezel/rim)
        const start = Math.round(cx)
        const end = Math.min(img.width, Math.round(cx + img.width * 0.34))
        const zone = lum.slice(start, end)
        let maxStep = 0
        for (let i = 1; i < zone.length; i++) maxStep = Math.max(maxStep, Math.abs(zone[i] - zone[i - 1]))
        const span = Math.max(...zone) - Math.min(...zone)
        return { maxStep: +maxStep.toFixed(2), span: +span.toFixed(2), ratio: +(maxStep / Math.max(span, 1)).toFixed(3) }
      },
      { png: shot.toString('base64'), cx: ((b.w + pad) / 2) * 3 }
    )
    gate(
      `G-5 · ${key} orb edge is a fade (3× zoom)`,
      softness.ratio < 0.25 && softness.span > 4,
      `max single-pixel step ${softness.maxStep} of span ${softness.span} (ratio ${softness.ratio}, cliff would be ≥0.25)`
    )
  }
  await ctx.close()
}

/* ================================= G-7 · word count + regression shots */
for (const lang of ['en', 'es']) {
  const { ctx, page } = await open(364, 800, lang)
  // The Phase-5 (OQ-6) measure, verbatim: full innerText words minus the
  // innerText words of NON-NESTED [data-device-ui] subtrees. `.sr-only` AT
  // duplicates (mandated by G-1) are excluded from the reading measure — they
  // are invisible, assistive-tech-only text; the visible figure still counts
  // once, exactly as in Phase 5. Both raw and excluded numbers print.
  const words = await page.evaluate(() => {
    const count = (t) => (t.trim().match(/\S+/g) ?? []).length
    const fullRaw = count(document.body.innerText)
    const srWords = [...document.querySelectorAll('.sr-only')].reduce((n, el) => n + count(el.textContent ?? ''), 0)
    let device = 0
    document.querySelectorAll('[data-device-ui]').forEach((el) => {
      if (el.parentElement?.closest('[data-device-ui]')) return // non-nested only
      device += count(el.innerText ?? el.textContent ?? '')
    })
    return { fullRaw, srWords, device }
  })
  const baseline = lang === 'en' ? 1357 : 1538
  const phase5 = lang === 'en' ? 992 : 1095
  const readingRaw = words.fullRaw - words.device
  const reading = readingRaw - words.srWords
  const delta = ((baseline - reading) / baseline) * 100
  const phase5Delta = ((baseline - phase5) / baseline) * 100
  gate(
    `G-7 ${lang} · reading-copy delta ≥ Phase-5`,
    delta >= phase5Delta - 0.05,
    `reading ${reading} (raw ${readingRaw} incl. ${words.srWords} sr-only AT words) vs baseline ${baseline} → −${delta.toFixed(1)}% (Phase-5: ${phase5} → −${phase5Delta.toFixed(1)}%; full ${words.fullRaw} · device-ui ${words.device})`
  )
  await ctx.close()
}

// regression screenshots — sections 02/04/05 at 1440+2000 desktop, 390 mobile
for (const lang of ['en', 'es']) {
  for (const width of [1440, 2000, 390]) {
    const { ctx, page } = await open(width, 950, lang)
    const secs = { '02-stake': '#home-stake', '04-arc': '#home-revenue', '05-constellation': null }
    for (const [name, sel] of Object.entries(secs)) {
      const el = sel
        ? await page.$(sel)
        : await page.evaluateHandle(() => document.querySelector('[data-caption]')?.closest('section') ?? document.querySelector('.md\\:hidden [style*="scroll-snap"]')?.closest('section'))
      try {
        const target = sel ? el : el.asElement()
        if (!target) throw new Error('section not found')
        await target.scrollIntoViewIfNeeded?.()
        await page.waitForTimeout(900)
        await target.screenshot({ path: fileURLToPath(new URL(`./img/p3_2-${name}-${width}-${lang}.png`, import.meta.url)) })
        say(`shot · p3_2-${name}-${width}-${lang}.png`)
      } catch (e) {
        say(`shot-skip · ${name}-${width}-${lang}: ${String(e).slice(0, 80)}`)
      }
    }
    await ctx.close()
  }
}

await browser.close()
writeFileSync(fileURLToPath(new URL('./p3_2-gates-output.txt', import.meta.url)), out.join('\n') + '\n')
say(`\n${failures === 0 ? 'ALL GATES GREEN' : failures + ' FAILURES'}`)
process.exit(failures ? 1 : 0)
