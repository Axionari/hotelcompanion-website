# V4 REPORT — The Seven-Act Homepage

Build authority: `docs/v4/V4_BUILD_KIT.md` + `docs/v4/reference/Hotel Companion
Homepage.dc.html` (rendered at 1280 and studied act-by-act before building —
captures in `reports/img/v4-ref-act*-1280.png`). `docs/v3/01_RULES.md` binding
as amended by kit §1. Branch `v4` (from `v3` @ `1e10c60`). Nothing merged;
production untouched.

**Preview (share link, expires 2026-07-23):**
https://placecompanion-v2-k8m15sctd-eduardovertiz-dotcoms-projects.vercel.app/?_vercel_share=6ofxBCrZJP1UMlzL8FTi8ahz5XGvMImH

## Plan (written before executing)

1. `src/lib/i18n/marketing/v4.ts` — §3 copy EN+ES verbatim ([v3] conflicts resolved deck-first → OQ-10)
2. `src/components/v4/v4fonts.ts` — Instrument Serif + IBM Plex Mono, homepage-scoped
3. `src/components/v4/shared.tsx` — primitives, V4Reveal (one entrance/act), §4 day model, DeferredImg
4. `src/components/v4/AskBarV4.tsx` — v3 scripted AskBar engine in the reference pill
5. `src/components/v4/acts/Act1…Act7.tsx` — seven acts, reference geometry, shared ArcOrb, real assets
6. `src/app/page.tsx` + `src/app/HomeV4Client.tsx` — homepage swap (metadata kept)
7. `src/components/cds/SunArc.tsx` — ArcOrb optional `core="sunrise"` ramp (default untouched)
8. `src/app/resources/ResourcesClient.tsx` — FAQ relocation into `#faq`
9. `src/app/globals.css` — appended `.v4-*` block; `reports/v4-gates.mjs` — G-1…G-9 harness

## What changed (commits)

- `43c3454` docs(v4): kit + approved reference export committed to `docs/v4/`
- `f575399` [V4] EXECUTE: seven-act homepage + FAQ relocation to /resources#faq
- `d8c5611` [V4] VERIFY: gate harness green; LCP repaint fix; authorized bundle split; image variants
- (this commit) [V4] REPORT: gate evidence, OQ-10…12, screenshots

## Gate results (full literal output: `reports/v4-gates-output.txt` — ALL GATES GREEN)

### G-1 · Words (letter-bearing tokens; device-UI/chrome/sr-only excluded — OQ-12)

| Act | budget | EN (raw − dev − chrome) | ES |
|---|---|---|---|
| I · Sunrise | ≤35 | **29** (34−1−4) | **34** (39−1−4) |
| II · Arithmetic | ≤40 | **21** | **31** |
| III · One Day, One Voice | ≤70 | **32** (73−41) | **37** (78−41) |
| IV · Every Surface | ≤30 | **19** (78−59) | **18** (83−65) |
| V · The Receipt | ≤45 | **18** (33−15) | **24** (39−15) |
| VI · Live in Days | ≤25 | **17** (28−11) | **17** (34−17) |
| VII · 2AM | ≤35 | **26** (39−13) | **25** (36−11) |
| **Total** | ≤320 | **106** | **124** |

### G-2 · Two typefaces
Computed `font-family` walk over every text node in all seven acts, both
languages: first family is Instrument Serif or IBM Plex Mono everywhere
outside `[data-device-ui]` (which computes the `ui-sans-serif` stack per §1.3).
Zero other families. PASS.

### G-3 · Verbatim + A2
- String-diff: all 35 §3 reading strings per language render exactly
  (§3-as-resolved per OQ-10), plus 17 device-UI strings (chips, receipt rows,
  card contents, placeholders). Zero deviations. PASS both languages.
- A2 (both languages): `2–3×` — 2px champagne stroke, transparent fill,
  268.8px, aria-hidden visual + sr-only plain value ✓. `$160B` / `$160 mil
  millones` — italic, `rgb(231,206,134)`, double glow text-shadow, sr-only ✓.
- Zero figure×copy rect collisions at 1280/1440/1600/2000/2600, EN + ES. PASS.

### G-4 · Geometry fidelity
- Side-by-side at 1280: `v4-ref-act{i…vii}-1280.png` (reference) vs
  `v4-act-{i…vii}-1280-en-final.png` (build). Layout, type scale, spacing and
  the Act IV cluster topology match; deviations enumerated below.
- Act IV rect audit (reference-derived pairs — OQ-11): overlaps
  phone×tablet 3150 · tv×tablet 1200 · watch×tablet 6900 · voice×tablet 6400;
  web×tablet 0 (reference-true) · zero text under fronting frames · captions
  clear of frames and each other · zero SVG connector paths · 2px rim/side on
  all five framed screens (522-518 · 150-146 · 390-386 · 480-476 · 95-91) ·
  puck box-shadow present. PASS.

### G-5 · Palette
Computed color/background/border/background-image scan across the homepage:
zero cool-hue values (hue 150–280, sat > .18) outside `<img>` content. PASS.

### G-6 · Orbs
Every orb instance is the shared `ArcOrb` (masked-fade core asserted by
computed `mask-image`): hero dome (760), Act III sun (110), Act IV phone orb
(56) + watch dot (16) + puck lens (22), both ask-bar dots (26), Act VII ember
(900). The dome/sun use the component's new `core="sunrise"` ramp (reference
values); the v3 ember default is untouched. Zoomed captures:
`v4-orb-askdot-zoom.png`, `v4-orb-sun-zoom.png`. PASS.

### G-7 · Quality (deployed preview, 3 runs; JSON in `reports/lighthouse-v4-*`)
- Performance (mobile): **96 / 90 / 90 → median 90 ≥ 90** ✓
  (observed LCP 208 ms local · CLS 0 · TBT 10 ms; devtools-throttled run: 99)
- Accessibility: **96 ≥ 95** ✓ · SEO: **100 ≥ 95** ✓ (local prod run —
  the preview URL reports 63 solely because Vercel previews send
  `x-robots-tag: noindex`; single failing audit is `is-crawlable`)
- Screenshots: 1440 + 2000 + 390, EN + ES, all seven acts —
  `reports/img/v4-act-{i…vii}-{1440,2000,390}-{en,es}.png` (42 files).

### G-8 · Site integrity
All 16 non-home routes 200 · v3 nav intact on non-home routes · FAQ reachable
at `/resources#faq` (all four homepage Q&As render, text unchanged) · zero
dead links on the homepage (31 checked; `/auth/login` 500s only on localhost
without Supabase env — **200 on the deployed preview**) · Act VII chip click →
scripted v3 answer + receipt renders (no network). PASS.

### G-9 · Responsive (390, EN + ES)
Zero horizontal overflow (scrollWidth − clientWidth = 0) · Act III moments
stack to one column · Act IV uses the v3 constellation's snap-row treatment ·
each act remains one readable idea (`v4-act-*-390-*.png`). PASS.

## Deviations from the reference (enumerated per §1.4)

1. **Real assets** replace the striped `PHOTO:` slots (standing law):
   beach-akumal (Act III card, Act IV tablet), suite-1 (Act III 18:40 card,
   Act IV monitor), luxury-lobby (Act IV TV). Right-sized variants generated
   for v4 use only (`beach-akumal-band.webp` 85KB center-band crop,
   `suite-1-900.webp`, `luxury-lobby-800.webp`); originals untouched for v3
   routes.
2. **Kit §3 overrides on Act IV screens:** watch face is v3's
   `20 min / SPA IXCHEL`; the phone shows the v3 orb home state (reference
   showed 18:40 orb face / chat bubbles). Monitor is photo-only; its reference
   card text sat under the fronting phone (G-4b).
3. **Act III 18:40 card** header uses the v3 suite photo (v3 arc-stop
   treatment) instead of the reference's flat dusk gradient.
4. **Responsiveness** (the reference is fixed ≥1240): H1 wraps below 1024,
   figures clamp, grids stack ≤900, Act IV snap-row ≤767 — G-9.
5. **§4 motion budget:** the reference's grain/ring animations are dropped
   (static grain, static rings); motion is one entrance per act + the orb's
   6s breathe, all disabled under `prefers-reduced-motion`. The §4 day model
   renders as a static document-height gradient through the acts' exact
   keyframes with `--day` set on scroll — zero runtime paint invalidation
   (G-7; mutating backgrounds at scroll re-timed the H1's LCP paint).
6. **Hydration/perf:** v4 fonts `display:optional` (preloaded; on very slow
   first visits the metric-matched fallback holds — CLS 0); v3 fonts no longer
   force-preloaded (still `@font-face` + `swap`, rendering unchanged);
   LiveDemoModal deferred out of the initial bundle (authorized v3.1 bundle
   split — same modal, event-triggered load with idle warmup); act images
   fetch on approach (600px margin); favicon recompressed 26KB → 2.3KB.
7. **Chrome:** the v4 homepage renders the reference's own top bar (wordmark +
   coordinates) instead of the v3 SiteNav — "all other routes keep … the site
   nav" (§0); the v3 footer follows Act VII unchanged (navigation + language
   toggle remain reachable). PersistentCTA does not appear (not in the
   reference). Act VII's CTA links to `/contact#founding` (reference `href="#"`).

## Illustrative numbers (audit before production promotion)

| Value | Where | Status |
|---|---|---|
| `$160B` / `$160 mil millones` | Act II | Sourced: McKinsey (NEEDS CONFIRM carried from v3) |
| `2–3×` | Act II | Sourced: Kalibri Labs (NEEDS CONFIRM carried from v3) |
| `14 conversations` / `0 woke your staff` | Act V footer | ILLUSTRATIVE (A3) |
| `10:04 · 10:12 · 18:40 · 02:14` | Acts III/V rows | ILLUSTRATIVE narrative times |
| `$250/night` | Act III 18:40 card | ILLUSTRATIVE (v3 device UI) |
| `ROOM 214` / `HAB 214` | Acts III/V | ILLUSTRATIVE narrative |
| `+$402 PER STAY` (ask-bar receipt) | Acts I/VII scripted answers | ILLUSTRATIVE (v3 askBar) |
| `20 min / SPA IXCHEL` | Act IV watch | ILLUSTRATIVE (v3 device UI) |

## Open questions raised

- OQ-10 · [v3]-marked ES lines resolved deck-first (7 strings differ from the
  kit's inline transcription — one-string edits if the panel rules otherwise)
- OQ-11 · Act IV overlap-pair table re-derived from the reference file
- OQ-12 · word-measure exclusions (Act IV captions, Act VI chips, Act I top bar)

## Status: READY FOR PANEL REVIEW — all gates green · preview deployed · nothing merged or promoted
