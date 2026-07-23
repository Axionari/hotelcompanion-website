# V4 REPORT — The Seven-Act Homepage (amended for ADDENDUM 1)

Build authority: `docs/v4/V4_BUILD_KIT.md` + reference export, **as amended by
`docs/v4/V4_ADDENDUM_1.md`** (family alignment to restaurantcompanion.ai).
`docs/v3/01_RULES.md` binding as amended by kit §1. Branch `v4` (from `v3` @
`1e10c60`). Nothing merged; production untouched.

**Preview (share link, expires 2026-07-23):**
https://placecompanion-v2-2rz7ipc08-eduardovertiz-dotcoms-projects.vercel.app/?_vercel_share=hS8p3Yvs56W0kSsayhO60R4KN3jkxvwD

## ADDENDUM 1 — what changed (§A–§E applied; layout + copy untouched)

- **§A Typefaces:** Fraunces (display 530 / italic 480) + Spline Sans Mono on
  the marketing layer; General Sans inside device UI. The Instrument Serif /
  IBM Plex Mono pair and `v4fonts.ts` are removed — the homepage now uses the
  same three faces the layout already loads for every route.
- **§B Color:** champagne retired from all text (G-10 green). Emphasis
  italics (H1 line 2, `No OTA in between.`, Act IV/V/VI/VII accents) are
  Fraunces italic in cream `#F2EEE6`; `$160B` is cream italic keeping its
  warm glow; the `2–3×` stroke is unchanged. ASK + `BECOME A FOUNDING
  PARTNER` are terracotta `#C86A3A` solids with dark text. Brass `#C9A15A`
  appears only as micro-accents (eyebrows, device-screen labels — 10
  instances, max 12.5px). The `--day` ramp is re-anchored to the RC neutral
  ladder (`#141210 → #1f1913 → #181512 → #171717 → #141210 → #100e0c`).
- **§B2 The orb — no sun, ever:** the Act I dome, Act III sun ball, and Act
  VII setting dome are gone. Every orb is the vux VoiceOrb stack (rings +
  glow + shimmer; mic at hero scale): hero at 400px (listening state, the RC
  features presentation) behind the ask-bar with hairline arc backdrop, Act
  III's 56px marker on the drawn arc, Act IV phone/watch/puck orbs, both
  ask-bar dots, and a dim resting orb above `POWERED BY AXIONARI` in Act VII.
  The unused `core="sunrise"` ArcOrb extension was reverted (v3 component
  byte-identical again). `--day` still tells the day as light.
- **§D Nav:** the standard v3/RC site nav renders on the homepage (one
  family, one chrome); the minimal v4 top bar is gone and the coordinates
  chip now sits in Act I's upper-right as a mono data label.
- **§E Motion:** entrances use the family's reveal values
  (`--dur-base`/`--ease-standard`/`--reveal-distance-desktop`); the bespoke
  breathe keyframe is removed — orb motion is the vux component's own.
- OQ-10/11/12 affirmed by the panel (addendum §F) — no string edits; OQ-13
  logs three small addendum implementation choices.

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
- `b85de33` [V4] REPORT: gate evidence, OQ-10…12, screenshots
- (addendum commits) docs(v4) ADDENDUM 1 · [V4-A1] family alignment + regated

## Gate results (full literal output: `reports/v4-gates-output.txt` — ALL GATES GREEN)

### G-1 · Words (letter-bearing tokens; device-UI/sr-only excluded — OQ-12/13)

| Act | budget | EN (raw − device-ui) | ES |
|---|---|---|---|
| I · Sunrise | ≤35 | **29** (32−3) | **34** (37−3) |
| II · Arithmetic | ≤40 | **21** (22−0−1sr) | **31** (33−0−2sr) |
| III · One Day, One Voice | ≤70 | **32** (73−41) | **37** (78−41) |
| IV · Every Surface | ≤30 | **19** (78−59) | **18** (83−65) |
| V · The Receipt | ≤45 | **18** (33−15) | **24** (39−15) |
| VI · Live in Days | ≤25 | **17** (28−11) | **17** (34−17) |
| VII · 2AM | ≤35 | **26** (39−13) | **25** (36−11) |
| **Total** | ≤320 | **162** | **186** |

### G-2 · Family typefaces (ADDENDUM 1 §A/§C)
Computed `font-family` walk over every text node in all seven acts, both
languages: first family is Fraunces or Spline Sans Mono everywhere outside
`[data-device-ui]`; General Sans computes only inside device UI (the Act II
sub-lines / Act VI line stay Fraunces — OQ-13 choice). Zero other families.
PASS.

### G-3 · Verbatim + A2
- String-diff: all 35 §3 reading strings per language render exactly
  (§3-as-resolved per OQ-10), plus 17 device-UI strings (chips, receipt rows,
  card contents, placeholders). Zero deviations. PASS both languages.
- A2 (both languages): `2–3×` — 2px warm-neutral stroke (unchanged per §B3),
  transparent fill, 230.4px, aria-hidden visual + sr-only plain value ✓.
  `$160B` / `$160 mil millones` — Fraunces italic in cream `rgb(242,238,230)`
  with the warm glow retained, sr-only ✓ (ADDENDUM 1 §B3).
- Zero figure×copy rect collisions at 1280/1440/1600/2000/2600, EN + ES. PASS.

### G-4 · Geometry fidelity
- Side-by-side at 1280: `v4-ref-act{i…vii}-1280.png` (reference) vs
  `v4-act-{i…vii}-1280-en.png` (build, post-addendum). Layout, type scale,
  spacing and the Act IV cluster topology match; deviations enumerated below
  (faces + §B2 orb substitutions are addendum rulings, not drift).
- Act IV rect audit (reference-derived pairs — OQ-11): overlaps
  phone×tablet 3150 · tv×tablet 1200 · watch×tablet 6900 · voice×tablet 6400;
  web×tablet 0 (reference-true) · zero text under fronting frames · captions
  clear of frames and each other · zero SVG connector paths · 2px rim/side on
  all five framed screens (522-518 · 150-146 · 390-386 · 480-476 · 95-91) ·
  puck box-shadow present. PASS.

### G-5 · Palette
Computed color/background/border/background-image scan across the homepage:
zero cool-hue values (hue 150–280, sat > .18) outside `<img>` content. PASS.

### G-6 · Orbs (ADDENDUM 1 §B2 — the vux VoiceOrb stack, no sun)
Per-act visible `.vmic` census: Act I ×2 (hero 400 + ask dot) · Act III ×1
(arc marker 56) · Act IV ×3 (phone 56, watch 16, puck 22) · Act VII ×2 (ask
dot + resting 150) — every instance carries the full ring + glow + shimmer
stack; the hero carries the mic badge; **zero filled-sphere / dome / masked
radial-core orbs anywhere in the v4 root**. Zoomed captures:
`v4-orb-hero-zoom.png` (side-by-side with `rc-family-orb.png`),
`v4-orb-sun-zoom.png`. PASS.

### G-10 · Champagne retired / brass capped (new)
Zero elements with computed text color `#E7CE86` in either language; 10 brass
`#C9A15A` instances, all ≤12.5px (micro-accents only). PASS.

### G-11 · Family side-by-sides vs restaurantcompanion.ai (new)
Captured from the live RC site: `rc-family-hero-1280.png` /
`rc-family-nav-1280.png` / `rc-family-orb.png` (features page) against
`v4-family-hero-1280.png` / `v4-family-nav-1280.png` /
`v4-orb-hero-zoom.png` — same serif voice (Fraunces 530 + italic emphasis in
cream), same terracotta CTA treatment, same nav pattern, same orb. PASS.

### G-7 · Quality (deployed preview, 3 runs; JSON in `reports/lighthouse-v4-add1-*`)
- Performance (mobile): **90 / 99 / 86 → median 90 ≥ 90** ✓
  (pre-addendum runs: 96/90/90; observed LCP ~208 ms local · CLS 0 · TBT 10 ms)
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
7. **Chrome (superseded by ADDENDUM 1 §D):** the standard site nav renders on
   the homepage; the coordinates chip lives in Act I's stage; the v3 footer
   follows Act VII unchanged. PersistentCTA does not appear. Act VII's CTA
   links to `/contact#founding` (reference `href="#"`).
8. **ADDENDUM 1 face metrics:** Fraunces sets wider than the reference's
   Instrument Serif, so statements wrap a line earlier at 1280 and the `2–3×`
   figure holds one line at `min(240px, 18vw)` (stroke treatment unchanged,
   ≥180px per A2). Type scale and geometry otherwise as the reference.

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

- OQ-10 · [v3]-marked ES lines resolved deck-first — **AFFIRMED (ADDENDUM 1 §F)**
- OQ-11 · Act IV overlap pairs re-derived from the reference — **AFFIRMED**
- OQ-12 · word-measure exclusions — **AFFIRMED** (chip now an Act I device-ui label per §D)
- OQ-13 · addendum choices: trust line in cream (G-10 size cap), no General
  Sans body lines, coordinates chip as device-ui label

## Status: READY FOR PANEL REVIEW — all gates green incl. G-10/G-11 · ADDENDUM 1 applied · fresh preview deployed · nothing merged or promoted
