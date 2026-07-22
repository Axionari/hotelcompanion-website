# Phase 1 report — Words & Structure

## Plan (written before executing)

- Copy modules: `home.ts` (proof line, stakes close, A1 thesis, journey caption/act
  deletion, merged 07 headline, Companion OS band line, deployment close, FAQ 4+4
  split, insider lines), `global.ts` (footer 4-col, essays→lines, legal line),
  `translations.ts` (marquee 16→10), `faqPage.ts` (new), `eyebrows.ts` (3 ES labels).
- Components: `HomeClient.tsx` (merges, renumbering 01–13, band rebuild),
  `site-nav.tsx` (G5), `site-footer.tsx` (4 columns, mark), `EndorsementMark.tsx`
  (AxionariMark), `JourneyWalkthrough.tsx` + `blocks.tsx` (optional act/caption),
  `PlatformClient.tsx` (deleted-caption fallback), `page.tsx` (meta), `tokens.css`
  (v3 token block), new `/faq` route with FAQPage JSON-LD.
- Measure word-count baseline on the Phase 0 preview before deploying.

## What changed

- `1312500..d20ac05` — Phase 0 tail (kit addendum).
- `[P1] words & structure: G5 dedupe, merges 02+03/08+09, caption cuts, marquee
  16→10, FAQ prune + /faq, footer rework (ES+EN)` — single commit, both locales.

## ES gate method (per ADDENDUM_1)

Language selection is client-side (`localStorage.pc_lang`), so ES assertions run
against the **hydrated DOM** of the deployed preview: set `pc_lang='es'`, reload,
evaluate `document.body.innerText` / string counts in the browser. EN uses the
same method (and matches the SSR HTML). Same viewport and session for
baseline-vs-Phase-1 pairs.

## Gate results — preview `placecompanion-v2-k2cx2meyt…vercel.app`

- **[IMPULSADO POR / POWERED BY COMPANION OS = 0]** → **PASS** (EN 0, ES 0).
- **[`Companion OS` ≤ 2 per locale]** → **PASS** (EN 2, ES 2: section-08 band + footer line; meta description also cleaned, OQ-3.3).
- **[8 deleted ES strings = 0 matches]** → **PASS** (all 8 return 0; EN equivalents also 0).
- **[Added ES strings exactly once]** → **PASS** — `Lo rutinario, resuelto automáticamente` 1 · `0% COMISIÓN OTA · 24/7` 1 · `Construido sobre Companion OS — la plataforma de inteligencia` 1 · `POWERED BY AXIONARI` 2 (band + footer — twice is the allowed maximum).
- **[Homepage FAQ = 4; /faq renders 4 + valid schema]** → **PASS** — homepage accordion has the 4 kept Q&As; `/faq` renders the 4 moved Q&As; JSON-LD parses as `FAQPage` with `Question`/`Answer` items (schema carries all 8 so the pruned four stay indexed, per the SEO seat's intent).
- **[Marquee = 10 unique]** → **PASS** (EN 10, ES 10).
- **[Word count ≥ 25% lower]** → **FAIL** — EN 1357 → 1067 (**−21.4%**), ES 1538 → 1187 (**−22.8%**). Content-only (minus nav/footer): −20.9% / −22.5%. Every cut specified in the deck was applied; see **OQ-4** for why the remainder is unreachable without new copy rulings.
- **[Límites, Socios Fundadores, hero (minus 2 edits), demo, ticker diff-identical]** → **PASS** — the commit diff touches none of their markup/copy: `whatItIsNot`, `foundingPartner`, hero copy (besides badge removal + proof line), `TabletOS`/`LiveDemo`/`marazulDemo`, tally rendering all unchanged.
- **[Both locales build; no missing-translation warnings]** → **PASS** — `tsc --noEmit` clean (the `es: typeof en` constraint proves key parity), `next build` green, 33/33 tests pass, lint 0 errors (24 pre-existing warnings).

## Eyebrow order (rendered, EN): 02 WHAT'S AT STAKE · 03 CONVERSATION · 04 REVENUE · 05 EVERY SURFACE · 06 KNOWLEDGE · 07 INTELLIGENCE & EXECUTION · 08 COMPANION OS · 09 DEPLOYMENT · 10 BOUNDARIES · 11 FOUNDING PARTNERS · 12 FAQ · 13 NEXT STEP ✓ (13 sections)

## Screenshots

Per ADDENDUM_1's expectation note, Phase 1 leads with the word-count delta;
the visual state is intentionally near-identical to production minus the cuts.

## Open questions raised

- **OQ-4 (BLOCKING)** — word-count gate unreachable with the specified cuts; options laid out, phase stopped per addendum ("a failed gate still stops the phase").
- OQ-3 — six smallest-interpretation decisions (sixth journey caption, /platform teaser fallback, meta description, insider-line phase, band eyebrow, marquee row split).

## Status: BLOCKED ON OQ-4 — awaiting ruling (all other gates green; Phases 2–3 not started)
