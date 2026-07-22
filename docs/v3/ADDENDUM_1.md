# ADDENDUM 1 to the v3 Kit — Panel Rulings (final, no user decisions pending)

Place this file at `docs/v3/ADDENDUM_1.md`. It amends `02_COPY_DECK.md` and the phase specs. Rules of `01_RULES.md` apply to it unchanged.

## Open questions — resolved

**OQ1 (branch point):** Approved. `v3` branches from `3057618` (production reality); the Phase 0 diff gate run against `3057618` satisfies the gate's intent. Add to OPEN_QUESTIONS as a deferred task: *after v3 ships, fast-forward `main` to production reality* — do not do this during v3.

**OQ2 (Vercel project location):** Do not migrate. CLI-deployed previews from the personal-account project are the working method for all of v3. Project migration to the Axionari team is a promotion-time task, out of v3 scope. Change no project settings. Regenerate share links per review round as needed.

**ES gate method:** Approved — run ES copy gates against the hydrated DOM (headless browser after hydration + language switch). Document the method once in the Phase 1 report.

## Amendments — all three approved (panel, July 22)

**A1 — thesis line, section 04 intro.** Add after the section caption, before the arc:
- ES: `La reserva, la mejora, el taxi, la reseña — cada una empieza como una pregunta. El Companion las responde y las cierra. Sin OTA de por medio.`
- EN: `The booking, the upsell, the taxi, the review — each begins as a question. The Companion answers them all, and closes what it answers. No OTA in between.`
- Render `Sin OTA de por medio.` / `No OTA in between.` in `--champagne`.
- Phase: 1 (string), styled in Phase 3 with the arc build.

**A2 — numbers-as-art, section 02 stakes.** CSS-only treatment of the two existing figures:
- `2–3×`: oversized serif rendered as outlined/stroke type (`-webkit-text-stroke: 1px var(--text-lo); color: transparent;` with a solid fallback for non-WebKit), ≈200–250px at desktop.
- `$160B`: italic serif in `--champagne` with a soft amber glow (`text-shadow: 0 0 60px rgba(232,166,106,.25)`).
- Bars, sources, and all copy unchanged. AA does not apply to decorative display figures, but each figure must ALSO remain exposed to assistive tech via visually-hidden text or aria-label with the plain value.
- Phase: 2 (component CSS in `StatBlock`), verified in Phase 3 screenshots.

**A3 — trust line, section 07 RequestExecutionCard.** Replace the card's footer line from the copy deck with:
- ES: `Rastreado de inicio a fin. Esta noche: 14 conversaciones · 0 despertaron a tu equipo.`
- EN: `Tracked from creation to completion. Tonight: 14 conversations · 0 woke your staff.`
- `0 despertaron a tu equipo` / `0 woke your staff` in `--text-hi`. Mark the `14 conversaciones` figure with the illustrative-data comment convention below.
- Phase: 1/2 (string lands with the card).

## New standing rule — illustrative numbers

Every invented/narrative figure in v3 (`+$402`, `91%`, `14 conversaciones`, `$71`, `+$120`) gets a source-code comment `/* ILLUSTRATIVE — audit before production promotion */` at its definition site, and Phase 5's FINAL_REPORT must list all of them in one table. No visual change. This is the audit trail for the pre-launch claims review.

## Phase-flow authorization (replaces per-phase stop)

Code proceeds **Phase 1 → 2 → 3 without waiting for human approval**, provided every gate in each phase is green and no OPEN_QUESTION of brand-level consequence arises. Mandatory human review checkpoints remain after **Phase 3** (first visible build — Eduardo reviews the preview) and after **Phase 5** (final). A failed gate still stops the phase; an OPEN_QUESTION of the "smallest-interpretation" kind is logged and work continues.

## Expectation note (for the reports)

Phase 1's visual result is intentionally near-identical to production (same design, fewer words). The first intentionally *visible* divergence is Phase 3. Reports should lead with the word-count delta in Phase 1, not screenshots.
