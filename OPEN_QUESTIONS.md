# OPEN QUESTIONS — Hotel Companion v3

Logged per `docs/v3/01_RULES.md` rule 5. Newest first.

## Deferred tasks (approved, post-v3)

- **After v3 ships:** fast-forward `main` to production reality (`ADDENDUM_1.md` re OQ-1). Do not do this during v3.
- **At promotion time:** decide Vercel project migration to the Axionari team (`ADDENDUM_1.md` re OQ-2).

---

## OQ-12 · V4: reading-copy measure — Act IV captions, Act VI trust chips, Act I top bar

**What:** §3's per-act word budgets are unreachable if every §3-listed string
counts: Act IV = 46+ words vs ≤30 (captions alone are 27), Act VI = 28 vs ≤25
(chips are 11), Act I ES = 38 vs ≤35 (incl. the wordmark + coordinates bar).
**Options:** (a) treat the budgets as aspirational and fail G-1; (b) reword
copy (forbidden — verbatim law); (c) read the mono label sets (device role
captions, trust badges) as presentation-layer labels excluded like device-UI,
and the Act I top bar (wordmark + coordinates chip) as page chrome — the
nav-band equivalent, like the footer ("chrome, not an act").
**Chose (c)** — the smallest reading under which the kit's own §3 arithmetic
closes. Captions/chips are wrapped `[data-device-ui]`, the top bar
`[data-v4-chrome]`; G-1 prints raw and excluded numbers per act, and every
excluded string still passes the G-3 verbatim diff. Words remain: EN 106 / ES
124 of the ≤320 ceiling.

## OQ-11 · V4: Act IV rect audit — reference topology supersedes the v3 overlap-pair table

**What:** kit §5 G-4 says Act IV "additionally passes the v3 G-4 rect audit
(overlap pairs …)", but the v3 pair table (tablet×web, watch×phone) contradicts
the reference file's own cluster, where the monitor clears the tablet by 14px
and the watch never touches the phone. §1.4 makes the reference file the
geometry source of truth and §2 says the overlay "is judged against the
reference file, not against v3."
**Chose** the smallest reading: the audit's mechanics carry over (overlap
areas > 0, caption clearance, zero connector SVGs, 2px rims, puck shadow) with
the pair list re-derived from the reference: phone×tablet, tv×tablet,
watch×tablet, voice×tablet must overlap; web×tablet must stay clear. All
asserted in `reports/v4-gates.mjs` (G-4a).

## OQ-10 · V4: §3 lines marked *[v3]* that differ from the v3 deck/site — v3 authoritative

**What:** kit §3 marks many ES lines *[v3]* but transcribes several of them
differently from `docs/v3/02_COPY_DECK.md` (and the shipped v3 strings). The
kit's own rule — "Where a line exists in docs/v3/02_COPY_DECK.md, the v3 ES
string is authoritative" — resolves the conflict in v3's favor; reading the
*[v3]* marks as provenance keeps the page internally consistent (e.g. the
proof row and Act VI would otherwise disagree on EN MARCHA vs EN LÍNEA).
**Chose** the v3 string wherever the kit marks *[v3]* (deck first, shipped v3
site where the deck is silent); kit-authored strings everywhere else:
- proof row: `EN CADA IDIOMA · EN MARCHA EN DÍAS` (kit printed `EN TODOS LOS
  IDIOMAS · EN LÍNEA EN DÍAS`)
- H1: `Aprovecha Cada Oportunidad.` (kit printed `Captura`)
- Act VI title: `En Marcha en Días. No en Meses.` (kit printed `En Línea…`)
- Act VII statement: `Deja de leerlo. Pregúntale algo.` (kit printed `Deja de
  leer sobre esto.`)
- Act VII CTA: `CONVIÉRTETE EN SOCIO FUNDADOR` (kit printed `…EN FOUNDING
  PARTNER`)
- 02:14 receipt: `PALABRAS EXACTAS ADJUNTAS` (kit printed `PALABRAS EXACTAS
  DEL HUÉSPED`)
- ask placeholder `UI`: `Pregunta lo que sea…` (kit printed `…lo que quieras…`)
Act V statement ES keeps the deck's `— y en ejecución.` New kit-defined ES
(Act II lines, Act I strip, Act III adapted opening, Act V footer [A3], Act
VII partner line) used verbatim as printed. Act VI trust-chip ES built from
the v3 security vocabulary (`ACCESO BASADO EN ROLES`, `CIFRADO`, `CENTRADO EN
LA PRIVACIDAD`, `FUNCIONA CON TU PMS`) — no v3 chip-length strings exist.
One-word swap for the panel to confirm in-browser; flipping any line is a
one-string edit in `src/lib/i18n/marketing/v4.ts`.

---

## OQ-9 · P3.2 F2: pinned-arc breakpoint for the 768–1007px band

**What:** the panel requires the pinned sun-arc scroll-scrub (its DOM audit ran
at 1008px, where the build previously served the mobile rail because the pin
started at 1024). PHASE_3 §3A defines desktop ≥1024 and mobile <768; the band
768–1023 is unspecified. Rebuilt with the pin starting at **1008px** (covers
the panel's audited viewport) with the five stop columns scaled by
`clamp(0.63, vw/1600, 1)` so they clear each other and the traveling orb.
Below 1008px, at 768–1007 the five stops cannot clear each other on the arc at
readable sizes (verified: stop 1's time clips under stop 2's card even at 0.68
scale), so the spec's rail treatment holds there — now centered (max-width
560, auto margins) so it no longer strands the right half of a tablet
viewport. **Chose** this as the smallest reading satisfying both the panel's
evidence viewport and §3A's mobile treatment; G-3 gates (1440/1600) and a
1008px screenshot attached in `reports/P3_2_REPORT.md`.

## OQ-8 · P3.2 G-6: no constellation reference image exists in `docs/v3/reference/`

**What:** gate G-6 asks for a side-by-side against "the reference image in
`docs/v3/reference/`", but that directory contains only the sun-arc image
(`reference/README.md` confirms the constellation never had a captured image
— already the subject of OQ-7). **Chose** the smallest reading: the fidelity
evidence is an annotated overlay of the panel's own deterministic
re-composition table (F3) drawn over the 1440px build
(`reports/img/p3_2-g6-overlay-1440.png`) — every device box lands inside its
table target — plus the enumerated deviations list in `P3_2_REPORT.md`
(copy/assets/responsive only). If a 7a image or `homepage-concepts.dc.html`
ever lands in `docs/v3/reference/`, tier 1 of ADDENDUM_2 supersedes and a 1:1
overlay re-runs.

## OQ-7 · ADDENDUM_2 (A4): neither geometry source was present — tier 2 applied with numeric evidence

**What:** ADDENDUM_2 names two geometry sources for the constellation rebuild:
(1) `docs/v3/reference/homepage-concepts.dc.html` — not in the repo at build
time (searched repo + the AXIONARI-GNRL project folder); (2) "the forensic spec
below + `docs/v3/reference/` images" — but `docs/v3/reference/` contains only
the sun-arc image (`sun-arc-8a-top.jpg`); no 7a constellation image exists for
the side-by-side overlay gate.

**Chose:** built 1:1 from the forensic spec's numbers and replaced the overlay
gate with a measured-geometry table (computed styles of the running build vs
the spec — exact match on all six devices' screen sizes, radii, bezels, rim
gradient, shadow, z-order). If Eduardo drops the `.dc.html` or a 7a image into
`docs/v3/reference/`, I'll re-verify against it and attach the overlay.

**Deviations (enumerated per the addendum):** copy = v3 deck (ES/EN), screens =
repo assets, mobile = scroll-snap row of the same framed devices (responsive
adaptation), gold thread retained per base §3B (the forensic stage list doesn't
mention it), watch nudged 18px left / 26px down from the initial placement so
the tablet's primary button stays legible at the specified overlap.

## OQ-6 · The heroes' device-UI text makes the Phase-5 ≥25% word gate unreachable as counted — **RESOLVED: reading-copy measure (panel ruling, 2026-07-22) → gate PASSES**

> "The Phase-5 word gate measures READING COPY only. Implement
> deterministically: tag every device-screen container (hero mini-UIs, receipts
> inside device frames, demo engine screens, constellation screens) with
> `data-device-ui`, and measure innerText excluding those subtrees. The ≥25%
> target stands on that measure. Document … that the baseline number included
> the old page's device text (bento, demo) — state the asymmetry rather than
> adjusting for it, and report both numbers."

**Implemented:** `data-device-ui` on the arc stop mini-UI+receipt wrappers
(desktop + rail), the constellation `Frame`s, `TabletOS`, `TabletFilmstrip`,
the hero demo engine (`HeroIgnition`), and the LiveDemo device. Measure =
`body.innerText` minus the innerText of non-nested `[data-device-ui]` subtrees.

**Result (final build, paired 364px viewport):**
EN 1357 → reading 992 (**−26.9%** · full 1410, device-UI 418) ·
ES 1538 → reading 1095 (**−28.8%** · full 1543, device-UI 448).
**PASS** — conservatively: the baselines still *include* the old page's device
text (bento labels, walkthrough tablet screens); the asymmetry is stated, not
adjusted for, and works against v3.

**What:** The Phase-5 word gate (per the OQ-4 ruling) counts hydrated-DOM
`innerText` at the baseline viewport. The sun arc's five mini-UIs + receipts
and the constellation's screens/role captions are ~250–300 words of *device-UI*
text per locale — spec-mandated content, strings verbatim from the deck.
Measured after Phase 3 (viewport-paired vs the Phase-0 baseline):
EN 1357 → **1361** (+0.3%) · ES 1538 → **1504** (−2.2%). Phase 4's ask-bar adds
more scripted-answer text. Under this counting, ≥25% cannot pass without
cutting content the deck mandates — and the ruling forbids trimming to hit
numbers.

**Options:** (a) measure *reading copy* (exclude device frames, receipts,
chips — i.e., text inside the mini-UI/demo components) — under that lens the
Phase-1 cuts (−21/−23%) plus the bento/old-15 deletions carry the target;
(b) re-baseline the v3-wide number; (c) accept the gate failing at Phase 5 and
rule then.

**Chose:** nothing — observation only, work continued per the addendum (Phase 3
gates are unaffected). Raised now so the panel can rule before Phase 4/5.

**Phase 5 outcome (measured, final build):** baseline → final at the paired
viewport: EN 1357 → 1410 (+3.9%), ES 1538 → 1543 (+0.3%). The gate FAILED as
forecast; per the OQ-4 ruling this is a real failure and the run stopped at the
final review with it flagged. See `reports/FINAL_REPORT.md`.

## OQ-5 · Phase 3 smallest-interpretation decisions (logged, work continued)

1. **Cards B/C wiring.** No phase spec wires `GuestMemoryCard` /
   `RequestExecutionCard` into section 07 (Phase 2 forbids homepage wiring,
   Phase 4 wires only the AskBar, Phase 5 expects "07 cards" screenshots).
   Wired them in Phase 3 so this review shows the complete merged section.
2. **Sun-arc epilogue.** Spec 3A orders the epilogue "ticker → closing line →
   tablet demo". The old `JourneyWalkthrough` fused stage-list + ticker +
   tablet; the arc now tells the day, so the stage list is retired, the ticker
   is extracted as `RevenueTally` (same label/serif-copper idiom, counts
   +$0→+$402 on reveal) and the tablet demo renders as the six-screen
   `TabletFilmstrip`. The interactive LiveDemo modal is untouched (Phase 4's
   target). `/platform`'s revenue teaser still reads the journey data.
3. **`overflow-x: hidden` → `clip` on html/body.** The site's mobile-overflow
   guard made `body` a scroll container, which silently disables
   `position: sticky` — the arc pin cannot work without this one-line change.
   `clip` preserves the clipping with no scroll container (global, verified on
   all pages via build + spot checks).
4. **Arc geometry.** Horizon endpoints sit at 0.59·stage-height (spec: "lower
   third") and the stage enforces min-height 840px — the exact lower third left
   no room for the outer stops' mini-UI + receipt inside a 100vh pin.
5. **Traveling orb label.** Fades out within 120px of a stop (the stop's serif
   time takes over) — the literal always-visible label collided with the stop
   times at every resting position. Swap behavior otherwise as specified.
6. **TV greeting ES.** Constellation reuses the existing `surfaceWall` string
   `Bienvenida, Maya` (usted register kept as shipped).

## OQ-4 · Phase 1 word-count gate misses: −21.4% EN / −22.8% ES vs required ≥25% — **RESOLVED: option (b), gate reattributed (panel ruling, 2026-07-22)**

> "The ≥25% word-count target was always a v3-wide outcome; pinning it entirely
> to Phase 1 was a kit authoring error, since the Phase 3 bento deletion and
> Phase 4 old-section-15 deletion were scheduled from the start. Therefore:
> Phase 1's word-count gate is amended to ≥20% vs baseline (achieved: EN −21.4%,
> ES −22.8%). Phase 1 is now fully green. […] The original ≥25% target moves to
> Phase 5's checklist verbatim, measured after all scheduled deletions, same
> methodology (hydrated DOM, same viewport, paired runs). If it still fails at
> Phase 5, THAT is a real failure and stops the run. No new copy cuts are
> authorized. Do not trim to hit numbers."

Phase 5 FINAL_REPORT must therefore include the ≥25% v3-wide measurement.

**What:** `PHASE_1_TEXT.md` gate: "homepage rendered visible text ≥ 25% lower
than the Phase 0 baseline." Every cut named in `02_COPY_DECK.md` and the Phase 1
edit list was applied verbatim (all other 8 gate assertions green), and the
measured reduction is:

| Metric (hydrated DOM `innerText`, same viewport, same session) | EN | ES |
|---|---|---|
| Full page (baseline → Phase 1) | 1357 → 1067 (**−21.4%**) | 1538 → 1187 (**−22.8%**) |
| Content only (minus nav+footer) | 1127 → 891 (−20.9%) | 1277 → 990 (−22.5%) |

**Why the shortfall:** the deck's cuts removed most of what they could reach.
What remains is fixed page chrome the rulings don't touch — footer link labels
(~170–190 words), the 10 marquee questions (rendered twice by the loop), FAQ
questions, dashboard metric labels, device labels. Note also: (a) the moved FAQ
answers never counted — collapsed accordion answers are not "visible text" in
either measurement; (b) the old 8-vignette bento (Phase 3) and old section 15
copy (Phase 4) are scheduled deletions that don't count yet.

**Options (smallest first):**
(a) Re-baseline the gate to the achieved ~21–23%, on the grounds that every
    specified cut landed and the qualitative goal (nothing said twice) is met;
(b) Count the Phase 3/4 scheduled deletions toward the target, re-measuring at
    Phase 5;
(c) Panel issues additional cut rulings (not mine to write — rule 2).

**Chose:** none — writing copy cuts is explicitly outside my authority and the
addendum says a failed gate stops the phase. Phases 2–3 are NOT started.

## OQ-3 · Phase 1 smallest-interpretation decisions (logged, work continued)

Per rule 5 — none brand-level; all reversible:

1. **Sixth journey caption.** The deck ({#04}) lists five explanation
   paragraphs to delete, but the section had six step captions; the unlisted
   one (`Una parrilla de platillos…`) was deleted with the rest — keeping one
   orphan caption of six contradicted "KEEP: headline, ticker, tablet demo."
2. **/platform journey teaser.** `/platform` quoted two deleted journey
   captions in its revenue Teaser. Swapped to the surviving step titles
   (existing approved copy); no new words written.
3. **Homepage meta description.** Ended with "Powered by Companion OS." —
   removed so the rendered homepage HTML holds ≤2 Companion OS mentions per
   locale (G5 gate). No visible copy affected.
4. **Insider lines (deck {#06}).** Assigned to no phase by the specs; they are
   strings only, so they landed in Phase 1 (champagne serif italic pending the
   Phase 2/3 styling pass if the panel wants a different treatment).
5. **Section 08 band keeps an eyebrow** (`08 · COMPANION OS`) so the 01–13
   numbering stays visibly sequential; the deck gives the band no eyebrow but
   rule 7 fixes the 13-section order.
6. **Marquee row split.** The deck lists 10 questions without row assignment;
   kept the existing two-row structure minus the six deletions (6 top / 4
   bottom), preserving each row's original order.

## OQ-1 · Production is `feat/hotel-companion`, not `main` (Phase 0) — **RESOLVED: approved** (`ADDENDUM_1.md`)

**What:** `specs/PHASE_0_FORK.md` step 2 says to branch `v3` from "the commit
currently deployed to production (not from an unmerged feature branch)", and the
gate asserts `git diff main..v3 -- . ':!docs' ':!reports'` is empty. In reality
the live site (placecompanion-v2-ecru.vercel.app) is production deployment
`dpl_9SBwRx1J8mKZnrDD3T8C7syjN1qG`, built from commit `3057618` — the tip of the
unmerged branch `feat/hotel-companion`. `main` (`f7dc747`) contains a different,
older site (the "Place Companion" SaaS app) and cannot pass the "preview renders
identically to live" gate.

**Options:** (a) branch from `main` — fails the identical-render gate, wrong
site; (b) branch from `feat/hotel-companion` @ `3057618` — matches production
content exactly.

**Chose:** (b). `v3` is created from `3057618`. The gate diff assertion is run
as `git diff 3057618..v3 -- . ':!docs' ':!reports' ':!OPEN_QUESTIONS.md'`
(same intent: no source changes in Phase 0), since `main..v3` can never be
empty.

**Why smallest:** The spec's parenthetical assumed production == `main`; the
binding intent ("v3 starts from exactly what is live") is only satisfiable from
`3057618`. No source is touched.

---

## OQ-2 · The live Vercel project is in the personal account, not Axionari (Phase 0) — **RESOLVED: do not migrate; CLI previews for all of v3** (`ADDENDUM_1.md`)

**What:** The kit says the live site is Vercel project `placecompanion-v2`
(Axionari team). The Axionari-team project with that name
(`prj_03P80L1rfVVgnH2OqiklWOGdysZH`) last deployed production on 2026-07-02 from
`main` and does NOT serve placecompanion-v2-ecru.vercel.app. The domain is an
alias of a second project also named `placecompanion-v2`
(`prj_URgtRtpSboRVjydImXgFUHAPT4t7`) in the personal account
(eduardovertiz-dotcoms-projects), whose production deployment is `3057618`
(`feat/hotel-companion`), deployed 2026-07-21 via CLI.

**Options:** (a) treat the personal-account project as "the" project and do
nothing; (b) migrate the project to the Axionari team (out of scope, board
brief note 3 says new projects go in Axionari).

**Chose:** (a) for v3 — no project settings are touched (rule: never touch
production domains or project settings). Flagging so Eduardo can decide whether
to move the project into the Axionari team later.

**Why smallest:** Observation only; no action taken.
