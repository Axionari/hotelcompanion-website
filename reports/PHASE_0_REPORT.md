# Phase 0 report — Fork & Recon

## Plan (written before executing)

- Identify the commit actually deployed to production for the live site (Vercel API) — no file edits.
- Create branch `v3` from that commit; copy the kit to `docs/v3/`; create `reports/` + `OPEN_QUESTIONS.md` — commits `[P0] …` only, no source changes.
- Push `v3`; produce a preview deployment; record URL.
- RECON: read `src/app/HomeClient.tsx`, `site-nav.tsx`, `site-footer.tsx`, `src/lib/i18n/*`, `src/lib/demo/*`, `public/assets/*` → write `reports/SITE_MAP.md`.
- Gate: screenshot pairs (prod vs preview at 1440/768/375), empty source diff, SITE_MAP completeness.

## What changed

- `bfc5ed6` `[P0] v3 kit` — handoff kit committed at `docs/v3/` (17 files).
- `d2d5d86` `[P0] reports/ + OPEN_QUESTIONS` — `reports/.gitkeep`, `OPEN_QUESTIONS.md` (OQ-1, OQ-2).
- (this commit) `[P0] recon: SITE_MAP + phase report + gate screenshots`.
- **No source files touched.**

## Fork facts

- Production for `placecompanion-v2-ecru.vercel.app` = deployment `dpl_9SBwRx1J8mKZnrDD3T8C7syjN1qG`, commit **`3057618`** (`feat/hotel-companion` tip), deployed 2026-07-21 via CLI.
- `v3` created from `3057618` and pushed to `origin/v3`.
- **Preview deployment:** `dpl_CFQVW43WLSQTYXKTjbjafHJRbrnE` → https://placecompanion-v2-ok3m435mq-eduardovertiz-dotcoms-projects.vercel.app (target: preview; production untouched). The project has Deployment Protection — share link (expires 2026-07-23): `https://placecompanion-v2-ok3m435mq-eduardovertiz-dotcoms-projects.vercel.app/?_vercel_share=l8MXlDvWjDZhnSLhYgA7HktJ2X5BvMXc`
- The live project has **no git integration** (created + deployed via CLI on 2026-07-21), so `v3` previews are CLI-deployed: `npx vercel deploy --yes` from the `v3` checkout (linked to `prj_URgtRtpSboRVjydImXgFUHAPT4t7`).

## Gate results

- **[Preview URL loads; spot-check 1440/768/375 matches production]** → **PASS.**
  - Preview HTML = 117,617 bytes, same as production; identical marker counts ("Companion OS" ×20, `band-home-pause`, `hero-coastal-sunset`).
  - Screenshot pairs (full-page, identical pixel dimensions per pair):
    - 1440: `img/p0-home-1440-prod.png` vs `img/p0-home-1440-preview.png` (both 1440×14822) — visually identical.
    - 768: `img/p0-home-768-prod.png` vs `img/p0-home-768-preview.png` (both 768×16162) — visually identical.
    - 375: `img/p0-home-375-prod.png` vs `img/p0-home-375-preview.png` (both 390×19208) — visually identical.
- **[Source diff empty]** → **PASS** (as amended by OQ-1, since production ≠ `main`):
  - `git diff 3057618..v3 -- . ':!docs' ':!reports' ':!OPEN_QUESTIONS.md'` → `0` lines.
  - Literal spec assertion `git diff main..v3 …` is unsatisfiable (production is not `main`) — see OQ-1.
- **[SITE_MAP.md covers every item]** → **PASS.** Checklist:
  - [x] framework + version, styling, i18n mechanism, routing
  - [x] 15 sections + nav + footer → source files + i18n keys (table in SITE_MAP)
  - [x] demo engine (components + scenario data), revenue ticker, orb locations
  - [x] asset inventory (coastal sunset, luxury lobby, Akumal aerial, beach golden, palms night, suites, dishes — all mapped)
  - [x] build/test/lint commands

## Screenshots

- `reports/img/p0-home-{1440,768,375}-{prod,preview}.png` (6 files).

## Open questions raised

- **OQ-1** — production is `feat/hotel-companion` @ `3057618`, not `main`; `v3` branched from `3057618`; diff gate amended accordingly.
- **OQ-2** — the live Vercel project lives in the personal account, not the Axionari team; no settings touched; flagged for Eduardo.

## Status: READY FOR REVIEW
