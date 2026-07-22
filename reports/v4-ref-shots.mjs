import { chromium } from 'playwright-core'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'

/* v4 study step — render the approved reference at 1280 and capture each act.
   node reports/v4-ref-shots.mjs [base] */

const BASE = process.argv[2] ?? 'http://localhost:8471/Hotel%20Companion%20Homepage.dc.html'
const exec = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`

mkdirSync(fileURLToPath(new URL('./img', import.meta.url)), { recursive: true })
const browser = await chromium.launch({ executablePath: exec })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)

const acts = await page.$$('[data-screen-label]')
for (const act of acts) {
  const label = await act.getAttribute('data-screen-label')
  const slug = label.split('·')[0].trim().toLowerCase().replace(/\s+/g, '')
  await act.scrollIntoViewIfNeeded()
  await page.waitForTimeout(600)
  await act.screenshot({ path: fileURLToPath(new URL(`./img/v4-ref-${slug}-1280.png`, import.meta.url)) })
  const box = await act.boundingBox()
  console.log(`${label} → v4-ref-${slug}-1280.png (${Math.round(box.width)}×${Math.round(box.height)})`)
}
await page.screenshot({ path: fileURLToPath(new URL('./img/v4-ref-full-1280.png', import.meta.url)), fullPage: true })
console.log('full page → v4-ref-full-1280.png')
await browser.close()
