# PHASE 0 — Fork & Recon

## Goal
A `v3` branch that deploys as a Vercel preview, rendering byte-identically to production, plus a complete map of the codebase.

## Steps
1. Confirm the repo is the source of Vercel project `placecompanion-v2` (Axionari team). If the working directory is not that repo, STOP — OPEN_QUESTION.
2. Create branch `v3` from the commit currently deployed to production (not from an unmerged feature branch).
3. Copy this kit into the repo at `docs/v3/` (all files). Commit `[P0] v3 kit`.
4. Create `reports/`, `OPEN_QUESTIONS.md` (empty), commit.
5. Push; confirm Vercel builds a preview deployment for `v3`. Record the preview URL in the report.
6. RECON → write `reports/SITE_MAP.md`:
   - framework + version, styling system, i18n mechanism (how ES/EN strings are stored), routing
   - for each of the live site's 15 sections + nav + footer: the source file(s) and the i18n keys involved
   - where the demo engine lives (components, scenario data), where the revenue ticker lives, where the orb lives
   - image/video asset inventory (paths for: coastal sunset, luxury lobby, Akumal aerial, beach golden, palms night, suites, dishes)
   - build/test/lint commands

## Gate
- [ ] Preview URL loads; visual spot-check at 1440/768/375 matches production (3 screenshot pairs in report).
- [ ] `git diff main..v3 -- . ':!docs' ':!reports'` is empty (no source changes yet).
- [ ] SITE_MAP.md covers every item listed above (checklist in report).
- STOP for approval.
