# FINAL REPORT — Hotel Companion v3

**Deliverable:** the `v3` branch preview. Production untouched; nothing merged
to `main`; no domain or project settings changed.

- **Preview (final candidate):**
  https://placecompanion-v2-na0l3nedx-eduardovertiz-dotcoms-projects.vercel.app
  (deployment-protected — mint a share link per review round; the deployment id
  is stable).
- Branch: `v3` @ `[P5]` commits · forked from production `3057618`.
- All evidence: `reports/PHASE_{0..5}_REPORT.md` + `reports/img/` +
  `OPEN_QUESTIONS.md` (OQ-1…OQ-7).

## Phase gate summary

| Phase | Result |
|---|---|
| 0 · Fork & recon | GREEN (OQ-1/OQ-2 resolved by ruling) |
| 1 · Words & structure | GREEN under the OQ-4 ruling (≥20%: EN −21.4%, ES −22.8%) |
| 2 · Component kit | GREEN (AA measured; axe 0 critical; reduced-motion verified) |
| 3 · Two heroes (+A4 rebuild) | GREEN (60fps trace: 0 frames >32ms; forensic geometry exact) |
| 4 · Demo + AskBar | GREEN (both scenarios start→receipt, keyboard-only, both locales) |
| 5 · Full-site QA | **2 gate failures documented below; everything else green** |

## Phase 5 checklist results

**Structure** — 13 sections, eyebrows sequential 01–13 both locales (ES:
`02 · LO QUE ESTÁ EN JUEGO … 13 · SIGUIENTE PASO`) ✓. Secondary pages: G5 pass
done — zero `IMPULSADO POR COMPANION OS` badges site-wide (Platform/Solutions/
Enterprise ×2 each + Company swapped to the `POWERED BY AXIONARI` mark); the
sentence-case Companion OS *section titles/body copy* on /platform, /enterprise
and /company remain per "no other changes" (they are copy, not badges).
Nav/footer consistent ✓.

**Copy integrity** — scripted sweep (`p5-sweep.mjs`, output committed with the
report evidence): every deck ADD string verbatim on its surface, both locales,
zero missing; every DELETE string absent (modal-only demo strings verified live
in the Phase 4 gates). One sweep false-positive documented: /platform's
`Un seguimiento cálido con un enlace…` is that page's own approved lifecycle
copy, not the deleted home caption.

**Quality gates**
- **Lighthouse (mobile, 3 runs)** — measured on a local `next start` of the
  identical build: the protected preview URL's SSO redirect + `x-robots-tag:
  noindex` distort LCP/SEO (preview runs recorded 53–91 perf · SEO 60 for that
  reason; JSONs attached).
  Local: **perf 84 / 84 / 84 → median 84 (GATE ≥85: FAIL by 1)** ·
  **a11y 96–97 ✓** · **SEO 100 ✓**.
- **LCP** — element is the hero poster ✓. **Observed LCP 129–142ms** on the
  final build (the poster is a 12.5KB SSR'd `<img fetchpriority="high">`;
  281ms before the fix). Lighthouse's *simulated*
  slow-4G/4×-CPU LCP is 4.6s (**gate ≤2.5s: FAIL under simulation**): the
  simulator attributes ~2.3s render delay to the hydration bundle's long tasks.
  Root cause: the hero hosts the live demo engine (`useCompanion`/`useSpeech`/
  cards) in the critical bundle — deferring it is a hero refactor, which the
  same checklist forbids (hero must stay diff-identical minus specified edits).
  Fixes that did land: priority hero `<img>`, native lazy-loading for all
  below-fold bed/card images, deferred breather backgrounds (~1MB off first
  load), a11y 96→97.
- **axe** (home + /faq): **0 critical** ✓. Remaining serious `color-contrast`
  nodes, all pre-existing or spec-mandated: LanguageToggle inactive label
  (ships on production), `.text-white` on the accent CTA (production styling),
  the constellation captions (A4 forensic spec: `--text-lo` at 65%), the gold
  `AXIONARI` word (G6/tokens gold). Moderate: /faq lacks an `h1` (Section
  renders `h2`). Listed for a post-v3 pass.
- **Keyboard walkthrough** — nav → hero CTAs → demo orb/entry → section links →
  FAQ accordion → ask-bar chips/input → footer: order logical, all interactive
  elements native buttons/links; demo scenarios and ask-bar completable
  keyboard-only (Phase 4 recordings).
- **Reduced-motion** — full pass: arc static at noon with all stops, no pin;
  constellation static with thread drawn; ask-bar types instantly, no pulse;
  receipts render final-state (`img/p3-*-reduced.png`, Phase 2 evidence).
- **Screenshot matrix** — `img/p5-{top,arc,constellation,cards,askbar,footer}-
  {1440,768,375}-es.png` + `img/p5-top-1440-en.png` (19 files).
- **Visual regression (untouched sections vs production)** —
  `img/p5-regress-{hero,limites,socios}-{prod,preview}.png`. Differences, all
  specified: hero = badge removed + mono proof line added (deck {#01});
  Límites = byte-identical copy, renumbered eyebrow only; Socios = G4 mono-list
  restyle (Phase 2's one permitted diff). Ticker + demo entry unchanged in
  behavior (Phase 3/4 regression checks).

**Word count (the OQ-4 ruling's ≥25% v3-wide gate)** — **FAIL**, as forecast in
OQ-6. Baseline → final (hydrated DOM, 364px viewport, paired runs):
**EN 1357 → 1410 (+3.9%) · ES 1538 → 1543 (+0.3%)**. Every deck cut landed
(Phase 1 alone measured −21.4%/−22.8%); the specified heroes, cards, and
ask-bar then *added* ~350 words/locale of device-UI and receipt text. Under
`innerText` counting the target is arithmetically unreachable without cutting
deck-mandated content, which the ruling forbids. **Per the ruling, this is a
real failure and stops the run** — OQ-6's options (count reading-copy only /
re-baseline / accept) await the panel.

## Illustrative numbers (ADDENDUM_1 standing rule — audit before promotion)

| Figure | Where | Source note |
|---|---|---|
| `+$402` (per stay / tally) | journey tallies, arc closing, ask-bar receipt | ILLUSTRATIVE |
| `+$250/+$312` | journey tallies | ILLUSTRATIVE |
| `91% / 9%` | section 07 resolution ring | ILLUSTRATIVE |
| `14 conversaciones · 0 despertaron` | A3 trust line | ILLUSTRATIVE |
| `$71` | arc stop 1 receipt | ILLUSTRATIVE |
| `+$120` | arc stop 3 receipt | ILLUSTRATIVE |
| `$10` (taxi) | demo scenario A metadata | ILLUSTRATIVE |
| `$95 · 78 KM` | scenario B route/receipt | ILLUSTRATIVE |
| `2–3×` | stakes (Kalibri Labs) | pre-existing NEEDS CONFIRM |
| `$160B` | stakes (McKinsey) | pre-existing NEEDS CONFIRM |
| `4,820 / 12 / 1,140` | dashboard metrics (Platform teaser) | pre-existing |

## Known limitations

1. The two Phase 5 gate failures above (word-count counting method; Lighthouse
   perf 84 median / simulated LCP) — both have documented root causes and
   proposed resolutions; neither is reachable within the kit's own constraints.
2. `/faq` heading level (h2, no h1) — moderate axe note.
3. LanguageToggle inactive-label contrast — pre-existing, ships on production.
4. Voice paths (Web Speech) untested headless — code untouched from production.
5. The `.dc.html` 7a export never arrived; the constellation is built from the
   forensic spec (OQ-7) — drop the file into `docs/v3/reference/` and I will
   re-verify 1:1.

## OPEN_QUESTIONS status

Resolved: OQ-1, OQ-2, OQ-4 (rulings) · OQ-3, OQ-5, OQ-7 (logged
interpretations, none brand-level). **Awaiting panel: OQ-6** (word-gate
counting method — now a measured Phase 5 failure).

## Definition of done

All checklist boxes carry evidence; FINAL_REPORT written; **run stopped at the
mandatory post-Phase-5 review** with the two failures flagged. Deliverable is
the `v3` preview + this report. Not merged to `main`; production untouched.
