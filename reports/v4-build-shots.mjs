import { chromium } from 'playwright-core'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'

/* v4 build capture — per-act screenshots for the G-4 side-by-side.
   node reports/v4-build-shots.mjs [base] [width] [lang] [tag] */

const BASE = process.argv[2] ?? 'http://localhost:4311'
const WIDTH = +(process.argv[3] ?? 1280)
const LANG = process.argv[4] ?? 'en'
const TAG = process.argv[5] ?? `${WIDTH}-${LANG}`
const exec = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`

mkdirSync(fileURLToPath(new URL('./img', import.meta.url)), { recursive: true })
const browser = await chromium.launch({ executablePath: exec })
const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 900 } })
const page = await ctx.newPage()
if (LANG === 'es') await page.addInitScript(() => localStorage.setItem('pc_lang', 'es'))
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)

for (const id of ['act-i', 'act-ii', 'act-iii', 'act-iv', 'act-v', 'act-vi', 'act-vii']) {
  const el = await page.$(`#${id}`)
  if (!el) {
    console.log(`${id} MISSING`)
    continue
  }
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
  await el.screenshot({ path: fileURLToPath(new URL(`./img/v4-${id}-${TAG}.png`, import.meta.url)) })
  const box = await el.boundingBox()
  console.log(`${id} → v4-${id}-${TAG}.png (${Math.round(box.width)}×${Math.round(box.height)})`)
}
await browser.close()
