# P3.2 report — Panel inspection corrections (F1–F5)

Authority: `docs/v3/PANEL_INSPECTION_AND_CORRECTIONS.md` (supersedes CLOSEOUT
§A/§B). Rules of `docs/v3/01_RULES.md` applied. Branch `v3`, production
untouched, nothing merged or promoted.

## Plan (written before executing)

1. `src/app/HomeClient.tsx` — pass `art="outline"` (2–3×) / `art="glow"`
   ($160B) to the section-02 StatBlocks (F1 — the A2 CSS + prop existed since
   Phase 2 but was never wired at the call site).
2. `src/components/cds/blocks.tsx` — art-variant StatBlocks stack figure over
   copy so a 200–250px figure can never collide (G-2); ResolutionDonut
   escalated swatch `--text-lo` fill + `--hairline` outline (F5).
3. `src/components/cds/SunArc.tsx` — pin the arc from 1008px (F2 — root cause
   below), scale stop columns at narrow widths, deepen inner-stop offsets so
   the traveling orb never crosses stop text (G-3); ArcOrb rebuilt with a
   halo layer + masked ≥12px fade edge (F4).
4. `src/components/cds/Constellation.tsx` — re-composition per the panel's
   1200×760 table (F3), caption slots in clear stage space, puck grounded
   with contact shadow, connector SVG removed, monitor/TV/phone content
   zones, phone orb + watch dot via shared ArcOrb (F4).
5. `reports/p3_2-gates.mjs` — machine gates G-1…G-5 + G-7.
6. This report + FINAL_REPORT amendment (+ OQ-8/OQ-9).

Files actually touched: exactly the four source files above (see
`git diff aa22fba..HEAD --stat`) — no hero file, no token file, no copy
module.

## Root causes (verify-don't-assume, confirmed locally before fixing)

- **F1:** ADDENDUM_1 A2 was implemented as component capability
  (`StatBlock.art`, `.stat-art-*` CSS) in Phase 2 but the two call sites never
  passed the prop — the figures rendered on the default (filled terracotta)
  path. Wired, with the art layout stacked to hold G-2.
- **F2:** the pinned stage *did* exist — from 1024px up. The panel audited at
  1008px, where the code served the §3A mobile rail (hence "zero sticky
  elements" and the empty right half). Reproduced exactly on a local build:
  sticky present at 1440, absent at 1008. Fix: pin from 1008px with scaled
  stop columns; rail (<1008) centered. Decision logged as OQ-9.
- **F3/F4/F5:** as described by the panel; re-composed / re-plumbed per the
  directive.

## What changed (commits)

- `0ed9129` [P3.2] docs: CLOSEOUT_AND_NEXT + PANEL_INSPECTION_AND_CORRECTIONS
  committed to `docs/v3/`.
- `9815664` [P3.2] F1–F5 source fixes (4 files).
- `9e7ca0c` [P3.2] gate harness + screenshot/overlay/zoom evidence.
- (this commit) report + FINAL_REPORT amendment + OQ-8/OQ-9.

Also fixed in passing (defect surfaced by the G-1 text assertion): StatBlock's
count-up kept the previous locale's figure after a language switch until the
block re-entered the viewport; the shown value now resyncs on `figure` change.

## Gate results (full literal output: `reports/p3_2-gates-output.txt`)

Harness: `node reports/p3_2-gates.mjs http://localhost:4310` (production
`next start` of the P3.2 build, hydrated DOM, ES via `localStorage.pc_lang`).
Final run: **ALL GATES GREEN**.

- **G-1 (A2), EN+ES @1440** — PASS. `2–3×`: `-webkit-text-stroke 1px`,
  `color rgba(0,0,0,0)`, font-size 216px (≥180), sr-only plain value present,
  decorative span `aria-hidden`. `$160B` / `$160 mil millones`:
  `font-style italic`, color `rgb(231,206,134)` (#E7CE86), text-shadow
  `rgba(232,166,106,.25) 0 0 60px`. Text-content asserted (the first green run
  had the two treatments swapped across figures — caught by screenshot review,
  gate hardened to assert content, re-run green).
- **G-2 (02 collision)** — PASS at 1280/1440/1600/2000/2600 × EN/ES: zero
  rect intersection between each art figure and any sibling copy/bars
  (measured after Reveal entrance transforms settle; opacity-0 in-transit
  elements excluded).
- **G-3 (arc) @1440+1600** — PASS. Sticky container 2250px ≥ 200vh (1800px);
  zero `overflow-x: hidden` ancestors (html/body remain `clip`); orb center x
  strictly monotone across 5 sampled scrub positions (1440: 122→454→787→1112→
  1318); ≥3 distinct sky states (5 measured: glow/dusk/night opacity tuples);
  zero occlusion of stop time/tag text by the orb, its (visible) label, or any
  other stop's content at every sampled position. Bonus evidence: sticky also
  present at the panel's 1008px viewport (`p3_2-04-arc-1008-midscrub.png`).
- **G-4 (constellation topology, JS rect audit @1440)** — PASS.
  (a) required overlaps, px²: tablet×monitor 58328 · tablet×TV 3270 ·
  phone×tablet 9829 · watch×phone 5991 · watch×tablet 7323 · puck×tablet
  3524. (b) zero visible-text clipping under any fronting frame (range rects
  clipped by their own overflow ancestors — an ellipsized pill's hidden tail
  is not visible text). (c) zero caption×frame and caption×caption
  intersections. (d) SVG path count in the section: 0 (gold thread removed).
  (e) rim−bezel delta exactly 4px (2px/side, `offsetWidth`, transform-
  independent) on all five screen devices: 600−596 · 258−254 · 360−356 ·
  390−386 · 96−92. (f) puck body box-shadow ≠ none (drop + inset).
- **G-5 (orb integrity)** — PASS. Phone orb and watch dot both render via the
  shared `ArcOrb` (ember core + halo + VoiceOrb ring chrome, masked edge).
  3×-zoom captures (`p3_2-orb-{phone,watch}-3x.png`) machine-scanned across
  the boundary: max single-pixel luminance step 6.7/104 (phone) and
  10.6/68 (watch) — ratio ≤0.16 vs the 0.25 cliff threshold; the outermost
  edge is a mask-driven fade (30% of radius — ≥12px at spec sizes).
- **G-6 (fidelity)** — smallest reading per **OQ-8** (no constellation
  reference image exists; already OQ-7 territory): annotated overlay of the
  panel's F3 table boxes over the 1440 build —
  `reports/img/p3_2-g6-overlay-1440.png` — all six devices inside their
  targets; device count 6; overlap topology per (a); materials per ADDENDUM_2
  (silver 2px rim, #0b0908 bezel, radius 40/44/22/30, shadow
  `0 34px 70px -24px rgba(0,0,0,.65)`). Deviations, enumerated: strings are
  the v3 ES/EN deck; screens use repo assets; monitor text sits in the right
  65% (per the F3 table note); phone pills/input left-anchored a few px and
  the tablet answer block starts at x64 inside its screen so the watch/tablet
  overlaps mandated by the same table can never cut copy; mobile remains the
  snap row.
- **G-7 (regression)** — PASS.
  - Screenshots 1440/2000/390 × EN/ES for sections 02/04/05:
    `reports/img/p3_2-{02-stake,04-arc,05-constellation}-{1440,2000,390}-{en,es}.png`.
  - Word gate (OQ-6 measure re-run, paired 364px, hydrated): EN reading 980
    vs baseline 1357 → **−27.8%** (Phase-5 −26.9%); ES 1071 vs 1538 →
    **−30.4%** (Phase-5 −28.8%). Method note: raw values including the new
    G-1-mandated `.sr-only` AT duplicates are EN 994 / ES 1099 (−26.75% /
    −28.5%); the reading measure excludes sr-only text (invisible,
    AT-only; the visible figure still counts once exactly as in Phase 5).
    Both numbers stated for transparency.
  - Hero: byte-identical hydrated DOM at 1440 vs the Phase-5 build
    (sha256 `545ce591d7224225`, 2487 bytes, both builds served locally);
    corroborated by the diff stat (no hero file touched).
  - Lighthouse (mobile, local `next start`, 3 runs, same method as
    FINAL_REPORT): perf **84 / 84 / 84 → median 84**, a11y 97, SEO 100, LCP
    (simulated) 4.6s — **delta vs FINAL_REPORT baseline: 0** (accepted budget
    −2). JSON attached: `reports/lighthouse-p3_2-run1.json`.
- **F5 evidence** — escalated swatch computed style: background
  `rgb(169,156,140)` (--text-lo) + 1px `--hairline` border, same 10px size as
  the 91% swatch (`p3_2-07-legend-1440-es.png`).

## Screenshots

- Section 02: `img/p3_2-02-stake-{1440,2000,390}-{en,es}.png`
- Section 04: `img/p3_2-04-arc-{1440,2000,390}-{en,es}.png` +
  `img/p3_2-04-arc-1008-midscrub.png`
- Section 05: `img/p3_2-05-constellation-{1440,2000,390}-{en,es}.png` +
  `img/p3_2-g6-overlay-1440.png` + `img/p3_2-orb-{phone,watch}-3x.png`
- Section 07 legend: `img/p3_2-07-legend-1440-es.png`

## Open questions raised

- OQ-8 (G-6 reference image absent — overlay vs the panel's table used).
- OQ-9 (pinned-arc breakpoint 1008px; centered rail below).

## Passed-and-locked check

None of the locked surfaces were touched: hero byte-identical (above); the
diff stat shows only `HomeClient.tsx` (two StatBlock props + one comment),
`blocks.tsx` (StatBlock art path + legend swatch), `SunArc.tsx`,
`Constellation.tsx`, plus reports/docs.

## Deployment

Fresh preview (this build):
https://placecompanion-v2-cfoj68hco-eduardovertiz-dotcoms-projects.vercel.app
— the entire gate harness re-run against the deployed URL (hydrated, share
cookie): **ALL GATES GREEN** (`reports/p3_2-gates-output.txt` is that run).
Share links expire ~23h; re-mint per review round via the Vercel MCP.

## Status: READY FOR PANEL RE-INSPECTION (P3.2 gates green; STOP)
