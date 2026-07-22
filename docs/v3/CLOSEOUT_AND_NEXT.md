# v3 CLOSEOUT & NEXT — panel rulings + task list for the fresh session

Place at `docs/v3/CLOSEOUT_AND_NEXT.md`. This file + the repo's existing `docs/v3/*` and `reports/*` are the complete context; nothing else is needed. Rules of `docs/v3/01_RULES.md` continue to apply.

## Final panel rulings (all decided — nothing pending from the human except §C)

**R1 — Lighthouse perf 84/85: ACCEPTED, v3 ships with it.** The miss is entirely simulated LCP (4.6s modeled) against an observed LCP of 129–142ms with the priority hero poster; the remaining point requires refactoring the hero, which the v3 checklist itself forbids (hero-diff-identical). Record in FINAL_REPORT as an accepted, explained deviation. The hero demo-engine bundle split is **authorized as the first v3.1 task** (see backlog) — after v3 approval, when the hero-identical constraint lifts.

**R2 — OQ-7 closed.** No `homepage-concepts.dc.html` or 7a image existed; tier-2 forensic build with numeric fidelity evidence satisfies ADDENDUM_2. If the file ever lands in `docs/v3/reference/`, a 1:1 verification pass may run as a v3.1 task — it no longer blocks anything.

**R3 — word gate: closed as PASSED** per the reading-copy ruling (EN −26.9% / ES −28.8%, both measures reported, asymmetry stated). No further action.

## A — Verification sweep (fresh session, first task, ~minutes)

Confirm on the final preview + code that the earlier P3.1 punch list fully landed (it interleaved with ADDENDUM_2 work; verify, don't assume):
- [ ] Section 02: StatBlocks never collide at 1280 / 1440 / 1600 / 2000 / 2600px; `2–3×` renders as outlined stroke; `$160B` italic champagne + glow (A2). Screenshots at 1440 + 2000.
- [ ] Section 04: no stop label occluded at any scrub position at 1440 and ≥1600px (the receipt-wrap fix landed; verify labels too).
- [ ] Constellation: matches ADDENDUM_2 composition (tight overlap, silver rims, domed puck, readable TV photo) — screenshot for Eduardo's pass.
If any item fails: fix under P3.1 rules (spec-bound, no new decisions), re-gate, amend FINAL_REPORT.

## B — Only remaining human gate

Eduardo's visual pass on the final preview (constellation "exactly" bar + overall). On his approval, FINAL_REPORT status flips to APPROVED. **Nothing merges or promotes until he separately orders promotion.**

## C — Promotion protocol (execute ONLY on Eduardo's explicit "promote" — each step confirmed)

1. Merge `v3` → production lineage (fast-forward or merge to `feat/hotel-companion` tip, whichever preserves the deploy path) and deploy to the production domain. Verify prod = approved preview (byte/screenshot check).
2. Fast-forward `main` to production reality (deferred task from OQ-1).
3. Vercel project migration personal → Axionari team (standing plan; domains move with it; do NOT upgrade the personal Hobby plan). Verify domains + envs after.
4. Post-promotion smoke: Lighthouse on prod, share link removed, analytics intact.

## D — v3.1 backlog (do not start any item without Eduardo picking it)

Ordered by the board's roadmap:
1. **Perf point:** split the hero demo engine out of the critical bundle (authorized by R1); target Lighthouse ≥90 mobile.
2. **Demo scenario pack** (`HotelCompanion__Product_UI_Reference_Round5.md`, bucket B): direct-booking, honest-scarcity upsell, spa 5:30-open, spoken cart, post-stay RESTING state; context-aware rail + orb states as system patterns.
3. **Plataforma page** — live console hero (+ knowledge-gap card) + walkthrough chapters.
4. **Enterprise page** — boardroom cut + warmed night-audit section.
5. **Companion OS page** — triptych + engine room (triptych doubles as axionari.com "Our Companions" asset).
6. **Empresa page** — merged manifesto (origin scene + missed-moments ledger + three beliefs).
7. **Soluciones page** — five-type cards.
Each page gets its own mini-kit (spec + copy deck ES/EN + gates) authored by the panel before build — request it when Eduardo picks the next item.

## Fresh-session bootstrap prompt (Eduardo pastes this to start the new session)

```
You are continuing the Hotel Companion v3 project in this repo. A prior
session completed Phases 0–5 of docs/v3 (branch v3, preview deploys only,
production untouched). Do not re-derive anything: read, in order,
docs/v3/START_HERE.md (skim), docs/v3/CLOSEOUT_AND_NEXT.md (this cycle's
authority), reports/FINAL_REPORT.md, OPEN_QUESTIONS.md, and
reports/SITE_MAP.md. The rules in docs/v3/01_RULES.md remain binding.

Then execute section A of CLOSEOUT_AND_NEXT (verification sweep) and report.
Stop after A. Sections B–D proceed only on my explicit instruction.
```
