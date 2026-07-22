# OPEN QUESTIONS — Hotel Companion v3

Logged per `docs/v3/01_RULES.md` rule 5. Newest first.

---

## OQ-1 · Production is `feat/hotel-companion`, not `main` (Phase 0)

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

## OQ-2 · The live Vercel project is in the personal account, not Axionari (Phase 0)

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
