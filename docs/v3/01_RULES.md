# 01 · RULES — Operating Protocol (binding)

## No-drift rules

1. **Only specified changes.** If it is not in a phase spec or the copy deck, you do not build it, restyle it, rename it, or "improve" it. Sections the brief marks *keep* or *untouched* are byte-identical except where a spec names an edit.
2. **Copy is verbatim.** Every user-facing string comes from `02_COPY_DECK.md`, character for character, both locales. You never write marketing copy. If a string you need is missing, that is an OPEN_QUESTION, not an invitation.
3. **Tokens are closed.** No color, font, radius, easing, or duration outside `03_TOKENS.md`. No new dependencies unless a spec names them. Never any blue/teal/violet accent.
4. **Branch discipline.** All work on branch `v3`. Never commit to `main`. Never touch production domains or project settings. One commit per logical step, message prefixed `[P<n>]`.
5. **Unspecified decisions.** Choose the smallest possible interpretation, log it in `OPEN_QUESTIONS.md` (what, options, what you chose, why smallest), and continue. If the decision is irreversible or user-visible at brand level, stop instead and ask.
6. **Both locales, same commit.** Every content change lands in ES and EN together. ES is the reference voice.
7. **No section reordering beyond the spec.** The new page order is fixed in `00_BUILD_BRIEF.md` (13 sections). Nothing else moves.
8. **Preserve what works.** Existing assets, the revenue ticker component, the tablet demo engine, the orb, analytics, SEO meta — reuse, never rewrite from scratch. Refactors are out of scope unless a spec requires one.

## Verification discipline

- Every Gate assertion is executed literally (grep counts, screenshots, Lighthouse runs) and its output pasted into the phase report. "It looks right" is not evidence.
- Grep assertions run against the **rendered HTML of the preview build** (both locales), not just the source tree, unless the spec says otherwise.
- Screenshots: 1440×900, 768×1024, 375×812 for any phase that changes layout. Name them `reports/img/p<n>-<section>-<width>.png`.

## Report template (`reports/PHASE_N_REPORT.md`)

```
# Phase N report — <name>
## Plan (written before executing)
- files to touch + why
## What changed
- commit list with one-line summaries
## Gate results
- [assertion] → PASS/FAIL + literal output/evidence
## Screenshots
- linked files
## Open questions raised
- none | list
## Status: READY FOR REVIEW
```

## Stack notes

The repo is whatever powers Vercel project `placecompanion-v2` (Axionari team). Phase 0 includes a RECON step: you map the actual codebase (framework, i18n mechanism, section source files, asset locations) into `reports/SITE_MAP.md` before editing anything. All later phase instructions are outcome-level; you bind them to real files via your SITE_MAP.
