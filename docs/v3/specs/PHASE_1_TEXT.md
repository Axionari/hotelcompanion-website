# PHASE 1 — Words & Structure (no new components, no new visuals)

## Goal
The page says everything once. Section count 15 → 13 by merging (02+03) and (08+09) **at the content level** (visual rebuilds come in Phase 3; here the merged sections may reuse existing layouts stacked under one heading). All cuts from the copy deck applied. Both locales.

## Edits (each maps to `02_COPY_DECK.md`; apply ES and EN together)

1. **Nav:** remove `Companion OS` item.
2. **Hero:** remove `IMPULSADO POR COMPANION OS.` badge; add mono proof line.
3. **Stakes merge:** one section, eyebrow `02 · LO QUE ESTÁ EN JUEGO`, both StatBlocks kept, two paragraphs deleted, one replacement line added. Renumber subsequent section eyebrows (03…13) per the new order in `00_BUILD_BRIEF.md`.
4. **Marquee:** reduce to the 10 listed questions (both loops of the marquee).
5. **Old 05:** delete the five explanation paragraphs + ANTES/DURANTE/DESPUÉS bullets. KEEP (for Phase 3): headline, ticker, tablet demo. The section may look sparse until Phase 3 — that is expected.
6. **Old 08+09 merge:** one section heading (copy deck 07); delete old 09's 8-row list; delete old 08 intro paragraph. Keep the Centro de mando block. (Cards B/C arrive in Phase 2/3.)
7. **Companion OS:** old section 10 reduced to the single band line + link + `POWERED BY AXIONARI` mark; capability names deleted.
8. **Implementación:** closing sentences → single line.
9. **FAQ:** homepage keeps 4 listed Q&As; create `/faq` (both locales) with the other 4, FAQPage JSON-LD schema, linked `Todas las preguntas →`.
10. **Footer:** 4 columns, remove Companion OS product link, essays → the two single lines, add `POWERED BY AXIONARI` mark, fix copyright line.
11. **Old 15:** leave as-is (rebuilt in Phase 2 as AskBar) — do NOT delete yet.

## Gate (run against rendered preview HTML, both locales)
- [ ] `IMPULSADO POR COMPANION OS` / `POWERED BY COMPANION OS` → **0 occurrences**.
- [ ] `Companion OS` total occurrences on homepage → **≤ 2 per locale** (the band + one footer line).
- [ ] These deleted ES strings return zero matches: `Los equipos de atención están saturados` · `Hotel Companion resuelve lo rutinario` · `El Companion vende la propiedad` · `Un seguimiento cálido` · `Voice Intelligence` · `Knowledge Architecture` · `¿Hay una farmacia cerca?` · `¿Puedo rentar una bicicleta?`
- [ ] These added ES strings appear exactly once: `Lo rutinario, resuelto automáticamente` · `0% COMISIÓN OTA · 24/7` · `Construido sobre Companion OS — la plataforma de inteligencia` · `POWERED BY AXIONARI` (footer; twice site-wide is OK: band + footer).
- [ ] Homepage FAQ questions rendered = 4; `/faq` renders 4 + valid FAQPage schema (validate with a schema linter).
- [ ] Marquee question count = 10 unique.
- [ ] Word-count check: homepage rendered visible text ≥ 25% lower than the Phase 0 baseline (record both numbers).
- [ ] Sections `Límites`, `Socios Fundadores`, hero (minus the two edits), demo, ticker: diff-identical.
- [ ] Both locales build; no missing-translation warnings.
- STOP for approval.
