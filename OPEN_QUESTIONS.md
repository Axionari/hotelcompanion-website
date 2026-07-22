# OPEN QUESTIONS — Hotel Companion v3

Logged per `docs/v3/01_RULES.md` rule 5. Newest first.

## Deferred tasks (approved, post-v3)

- **After v3 ships:** fast-forward `main` to production reality (`ADDENDUM_1.md` re OQ-1). Do not do this during v3.
- **At promotion time:** decide Vercel project migration to the Axionari team (`ADDENDUM_1.md` re OQ-2).

---

## OQ-6 · The heroes' device-UI text makes the Phase-5 ≥25% word gate unreachable as counted — **PANEL INPUT REQUESTED at the post-P3 review**

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
