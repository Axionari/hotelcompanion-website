# PHASE 5 — Full-Site QA & Handover

## Goal
Prove v3 against the brief, end to end. Produce the final review package for Eduardo.

## Checklist

**Structure**
- [ ] Homepage renders exactly 13 sections in the brief's order; eyebrow numbering sequential 01–13 (or the site's equivalent), both locales.
- [ ] Secondary pages (Plataforma, Soluciones, Enterprise, Recursos, Empresa): G5 pass only — no `IMPULSADO POR COMPANION OS` badges, nav/footer consistent with homepage. No other changes (diff check).

**Copy integrity**
- [ ] Every string in `02_COPY_DECK.md` present verbatim (scripted grep sweep; attach the script + output).
- [ ] Every DELETE string absent (same sweep).
- [ ] ES/EN parity: every new key exists in both locales; no locale fallback warnings in build.

**Quality gates**
- [ ] Lighthouse (mobile, preview URL, 3 runs median): Performance ≥ 85 · Accessibility ≥ 95 · SEO ≥ 95. Attach JSON.
- [ ] LCP element is the hero; LCP ≤ 2.5s on throttled mobile run.
- [ ] axe scan homepage + /faq: zero critical violations.
- [ ] Full keyboard walkthrough of the page (nav → demo → ask-bar → footer) recorded in the report.
- [ ] Reduced-motion full-page pass (screenshots of both heroes).
- [ ] Screenshot matrix: {1440, 768, 375} × {top, 04 arc, 05 constellation, 07 cards, 13 ask-bar, footer} × {ES} + {1440 × EN top}.
- [ ] Visual regression on untouched sections vs production (hero minus edits, Límites, Socios, ticker, demo scenario A entry): overlay or pixel-diff, differences explained.

**Handover**
- [ ] `reports/FINAL_REPORT.md`: preview URL, all phase gates summary, word-count before/after, known limitations, OPEN_QUESTIONS resolved/remaining.
- [ ] Do NOT merge to main. Do NOT touch domains. The deliverable is the `v3` preview URL + FINAL_REPORT.

## Definition of done
All boxes checked with evidence, FINAL_REPORT written, awaiting Eduardo's review on the preview URL.
