# Phase 3 report — The Two Heroes

## Plan (written before executing)

- **3A Sun Arc:** new `SunArc.tsx` (pinned 250vh stage, damped rAF scrub, arc
  geometry from chord/sagitta, five stops as mini-UIs + `ReceiptCard`s, layered
  sky gradients, tokens-reference orb core under the site's `VoiceOrb` chrome,
  reduced-motion static-noon variant, <1024 vertical gold rail). New copy
  module `sunArc.ts` (deck {#04} verbatim; stop 2 reuses `deviceScreens.beach`,
  which matches the deck character-for-character). Epilogue: `RevenueTally`
  (extracted ticker idiom) + closing line + `TabletFilmstrip`.
- **3B Constellation:** new `Constellation.tsx` (six devices in depth — TV,
  laptop, tablet largest-center, phone, watch, voice puck with amber glow —
  role captions, question once on the tablet, gold thread dash-draw 600ms,
  80ms staggered rise, mobile scroll-snap row). New `constellation.ts` (deck
  {#05} verbatim); screens reuse `surfaceWall` (trimmed), `deviceScreens.beach`,
  `liveDemoCopy.orbStates.idle`. Old bento: `DeviceWall.tsx` deleted,
  `surfaceWall` kiosk/glasses/call/labels deleted.
- Section 07 gains Cards B/C (OQ-5.1). `html,body` overflow-x `hidden→clip`
  (OQ-5.3, sticky prerequisite).

## What changed

- `[P3] the two heroes: sun arc (scroll-scrubbed) + constellation; bento
  retired; cards B/C wired; epilogue ticker+filmstrip` (single commit).

## Gate results — verified on the dev build, re-verified on the preview below

- **[Desktop scrub: orb travels stop 1→5; sky shifts; stops appear at
  thresholds; recording attached]** → **PASS.** `img/p3-arc-scrub.webm`
  (7s programmatic scroll through the pin). Stills at p = 0/25/50/75/100:
  `img/p3-arc-1440-p{0,25,50,75,100}.png` (+ `-es` set). Orb label swaps to the
  active stop's time and fades near stops (OQ-5.5); sky runs dawn → amber noon
  glow (follows the orb) → dusk → warm night `#171310`.
- **[60fps: trace attached; no frame >32ms sustained]** → **PASS.** rAF frame
  sampler across the full scrub @1440×900: **421 frames · avg 16.63ms ·
  p95 17.3ms · max 17.7ms · frames >32ms: 0 · longest >32ms run: 0.**
  All motion is transform/opacity via refs; zero per-frame React renders
  (stop reveals are one-shot state flips).
- **[Reduced-motion audit: both sections static and complete]** → **PASS.**
  `img/p3-arc-1440-reduced.png` (no pin, orb static at noon with
  `ONE VOICE · NOON`, all five stops + receipts visible, sky static
  mid-gradient) · `img/p3-constellation-1440-reduced.png` (thread drawn,
  devices static).
- **[Mobile 375: arc = vertical rail; constellation = snap row]** → **PASS.**
  `img/p3-arc-375-rail.png` (2px gold rail, orb at top, stops stacked in time
  order, dawn→night vertical sky) · `img/p3-constellation-375-row.png`
  (scroll-snap row, captions beneath).
- **[Zero placeholder/striped backgrounds; zero non-token colors]** → **PASS.**
  Every screen uses real assets (suite-1, beach-akumal, platform-pool-night,
  dish/spa imagery via the filmstrip). Full hex/rgba audit of the two new
  components: sky values `#241B10/#2A1D10/#2B1810/#171310` (spec 3A), arc
  stroke `rgba(197,124,66,.18)` (spec 3A), orb core + glow values (03_TOKENS
  reference orb, verbatim), `rgba(232,166,106,…)` (A2 amber = `--accent-1`),
  device scrims `rgba(13,13,15,…)` (= `--device-frame`), neutral black
  shadows. No blue/teal/violet anywhere.
- **[Closing lines verbatim, both locales]** → **PASS.** Hydrated DOM: arc
  closing and constellation closing each appear exactly once in EN and ES.
- **[Ticker + tablet demo still function]** → **PASS.** `RevenueTally` renders
  `REVENUE THIS STAY / INGRESOS DE ESTA ESTANCIA` and counts +$0→+$402 on
  reveal (`img/p3-arc-epilogue-1440.png` shows the filmstrip's six demo
  screens); the interactive LiveDemo modal (marazul engine) is untouched by
  this phase — `openLiveDemo` entry points unchanged, 33/33 tests pass
  (includes `marazulDemo.test.ts`).
- **[Old bento strings gone]** → **PASS.** `KIOSCO DEL LOBBY` / `GAFAS AR`
  (and EN equivalents) = 0 matches in both locales' hydrated DOM;
  `DeviceWall.tsx` deleted, `surfaceWall` trimmed to the three reused screens.
- Build: `tsc` clean · `next build` green · lint 0 errors · 33/33 tests.

## Screenshots & recordings

`reports/img/`: `p3-arc-scrub.webm`, `p3-arc-1440-p{0,25,50,75,100}.png`,
`p3-arc-1440-p{0,25,50,75,100}-es.png`, `p3-arc-1440-reduced.png`,
`p3-arc-375-rail.png`, `p3-arc-epilogue-1440.png`,
`p3-constellation-1440.png`, `p3-constellation-1440-es.png`,
`p3-constellation-1440-reduced.png`, `p3-constellation-375-row.png`.

## Open questions raised

- **OQ-5** — six smallest-interpretation decisions (cards B/C wiring phase,
  epilogue composition, `overflow-x: clip`, arc endpoint height, orb-label
  fade, ES TV greeting register).
- **OQ-6 (panel input requested)** — the heroes' spec-mandated device-UI text
  (~250–300 words/locale) makes the Phase-5 ≥25% `innerText` gate unreachable:
  post-P3 paired counts EN 1361 (vs 1357 baseline), ES 1504 (vs 1538).
  Options in OPEN_QUESTIONS; no copy touched per the ruling.

## Status: READY FOR REVIEW — mandatory checkpoint (first visible build)
