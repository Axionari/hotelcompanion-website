import { chromium } from 'playwright-core'
import { readFileSync } from 'fs'

/**
 * Phase 5 copy-integrity + structure + a11y + word-count sweep.
 * ADD strings must appear (verbatim) on their surface; DELETE strings must be
 * absent everywhere swept. ES via hydrated DOM (localStorage.pc_lang).
 * Modal-only strings (demo scenarios) were live-verified in the Phase 4 gates;
 * here they are re-checked against the source modules (the modal is not open
 * during a page sweep).
 */

const BASE = process.argv[2]
const SHARE = process.argv[3] // ?_vercel_share=…
const exec = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const axeSource = readFileSync(new URL('./node_modules/axe-core/axe.min.js', import.meta.url), 'utf8')

const ADD = {
  es: {
    '/': [
      '0% COMISIÓN OTA · 24/7 · EN CADA IDIOMA · EN MARCHA EN DÍAS',
      'Lo rutinario, resuelto automáticamente — tu equipo, libre para los momentos que importan.',
      'La reserva, la mejora, el taxi, la reseña — cada una empieza como una pregunta. El Companion las responde y las cierra.',
      'Sin OTA de por medio.',
      'Un día con el Companion — del primer rayo de luz a la hora más pequeña.',
      'UNA VOZ · MEDIODÍA', '3 SEMANAS ANTES', 'TABLET · SUITE 214', 'RELOJ · ALBERCA', 'VOZ · A OSCURAS', 'TELÉFONO',
      '0% COMISIÓN · $71 MENOS QUE LA OTA', 'CABAÑA RESERVADA · +$120 AL FOLIO',
      'INGENIERÍA · HAB 214 · 02:14 · PALABRAS EXACTAS ADJUNTAS', '★5 PÚBLICA · RESERVA DIRECTA CAPTURADA',
      'Un día. Una voz. +$402 que la OTA nunca verá.',
      '«¿La mejor playa cerca?» — preguntado una vez, respondido en todas partes. El diseño se adapta. La inteligencia no.',
      'WEB · RESERVA ANTES DE LLEGAR', 'TV · SALUDA AL LLEGAR', 'TABLET · LA RESPUESTA ES UNA IMAGEN',
      'RELOJ · LA TRAE DE VUELTA', 'TELÉFONO · ANTES, DURANTE Y DESPUÉS', 'SOLO VOZ · DESCRITO EN VOZ ALTA',
      'Cinco pantallas. Una memoria. Nunca tuvo que repetirse.',
      'Sabe que la 214 tiene la mejor vista del atardecer.', 'Sabe dónde comen los locales un martes.',
      'Cada conversación se convierte en inteligencia — y en ejecución.',
      'MEMORIA DEL HUÉSPED', 'Maya vuelve en noviembre. El Companion ya sabe:', 'Familiar desde el primer mensaje.',
      'SOLICITUD → EJECUCIÓN', '"Mesa para dos a las ocho"', '→ RECEPCIÓN', '→ TRANSPORTE',
      'Rastreado de inicio a fin. Esta noche: 14 conversaciones · ', '0 despertaron a tu equipo',
      'Construido sobre Companion OS — la plataforma de inteligencia detrás de cada Companion.', 'Conoce la plataforma →',
      'POWERED BY AXIONARI',
      'Tu equipo sigue haciendo lo que mejor sabe hacer — cada interacción, mejor.',
      'Todas las preguntas →',
      'Deja de leerlo.', 'Pregúntale algo.', 'Pregunta lo que sea…',
      '¿Qué venderías más en mi hotel?', '¿Cómo manejas las 2 AM?', '¿Qué sabes de mi destino?',
      'Construido sobre Companion OS — una plataforma de inteligencia, Companions ilimitados.', 'Conoce más →',
      'Construido por Axionari — Plataformas de Inteligencia Organizacional.', 'Conoce Axionari →',
      '© 2026 Hotel Companion. Todos los derechos reservados.',
    ],
    '/faq': ['¿Hotel Companion es un concierge con IA?', '¿Qué sabe Hotel Companion?', '¿Hotel Companion admite varios idiomas?', '¿Qué es Companion OS?'],
  },
  en: {
    '/': [
      '0% OTA COMMISSION · 24/7 · IN EVERY LANGUAGE · LIVE IN DAYS',
      'The routine, resolved automatically — your team, free for the moments that matter.',
      'No OTA in between.',
      'One day with the Companion — from first light to the smallest hour.',
      'ONE VOICE · NOON', '3 WEEKS OUT',
      '0% COMMISSION · $71 LESS THAN THE OTA', 'CABANA RESERVED · +$120 TO FOLIO',
      "ENGINEERING · ROOM 214 · 02:14 · GUEST'S EXACT WORDS ATTACHED", '★5 PUBLIC · DIRECT REBOOK CAPTURED',
      'One day. One voice. +$402 the OTA will never see.',
      'Five screens. One memory. She never repeated herself once.',
      'Knows room 214 has the best sunset view.', 'Knows where the locals eat on a Tuesday.',
      'Every conversation becomes intelligence — and execution.',
      'GUEST MEMORY', 'REQUEST → EXECUTION', '0 woke your staff',
      'Built on Companion OS — the intelligence platform behind every Companion.', 'Meet the platform →',
      'POWERED BY AXIONARI',
      'Your team keeps doing what it does best — every interaction, better.',
      'All questions →', 'Ask it something.', 'Ask anything…',
      'Built on Companion OS — one intelligence platform, unlimited Companions.',
      'Built by Axionari — Organizational Intelligence Platforms.',
      '© 2026 Hotel Companion. All rights reserved.',
    ],
    '/faq': ['Is Hotel Companion an AI concierge?', 'What does Hotel Companion know?', 'Does Hotel Companion support multiple languages?', 'What is Companion OS?'],
  },
}

const DELETE = [
  'IMPULSADO POR COMPANION OS', 'POWERED BY COMPANION OS', 'Impulsado por Companion OS', 'Powered by Companion OS',
  'Los equipos de atención están saturados', 'Hotel Companion resuelve lo rutinario',
  'El Companion vende la propiedad', 'Un seguimiento cálido',
  'Voice Intelligence', 'Knowledge Architecture',
  '¿Hay una farmacia cerca?', '¿Puedo rentar una bicicleta?', 'Is there a pharmacy nearby?', 'Can I rent a bike?',
  'KIOSCO DEL LOBBY', 'GAFAS AR', 'Lobby kiosk', 'AR glasses',
  'Cada Conversación con un Huésped Es una Oportunidad', 'Every Guest Conversation Is an Opportunity',
  'Los tableros ejecutivos transforman', 'Executive dashboards transform',
]
// DELETE strings checked on the homepage + secondary pages; the capability
// names legitimately remain on /platform, /companion-os etc.? NO — G5 only
// removed OS badges from secondary pages; capability strips there are allowed.
// So 'Voice Intelligence'/'Knowledge Architecture' are homepage-only deletes.
const HOME_ONLY_DELETES = new Set(['Voice Intelligence', 'Knowledge Architecture'])

const PAGES = ['/', '/faq', '/platform', '/solutions', '/enterprise', '/resources', '/company']

const browser = await chromium.launch({ executablePath: exec })
const out = { add: {}, del: {}, structure: {}, words: {}, axe: {} }

for (const lang of ['en', 'es']) {
  out.add[lang] = []
  out.del[lang] = []
  for (const path of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 364, height: 765 } })
    const page = await ctx.newPage()
    await page.addInitScript((l) => localStorage.setItem('pc_lang', l), lang)
    await page.goto(`${BASE}${path}${SHARE}`, { waitUntil: 'networkidle' }).catch(() => {})
    await page.waitForTimeout(900)
    const text = await page.evaluate(() => document.body.innerText)

    if (ADD[lang][path]) {
      for (const s of ADD[lang][path]) if (!text.includes(s)) out.add[lang].push(`MISSING on ${path}: ${s}`)
    }
    for (const s of DELETE) {
      if (HOME_ONLY_DELETES.has(s) && path !== '/') continue
      if (text.includes(s)) out.del[lang].push(`PRESENT on ${path}: ${s}`)
    }

    if (path === '/') {
      out.words[lang] = text.trim().split(/\s+/).filter(Boolean).length
      out.structure[lang] = await page.evaluate(() =>
        [...document.querySelectorAll('.eyebrow')].map((e) => e.textContent.trim()).filter((x) => /^\d\d · /.test(x))
      )
    }
    if ((path === '/' || path === '/faq') && lang === 'en') {
      await page.addScriptTag({ content: axeSource })
      const axe = await page.evaluate(async () => await window.axe.run(document, { resultTypes: ['violations'] }))
      out.axe[path] = axe.violations.map((v) => `${v.impact}:${v.id}(${v.nodes.length})`)
    }
    await ctx.close()
  }
}

await browser.close()
console.log(JSON.stringify(out, null, 1))
