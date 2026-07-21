# ★ START HERE — Hotel Companion, full design build (all pages)

This bundle is everything Claude Code needs to take **hotelcompanion.ai** from its current state (Home hero +
`/company` are RC-grade; everything else is centered text with no visuals) to **Restaurant Companion level, on
every page.** Unzip it into the repo (or a `/handoff` folder). Work on branch `feat/hotel-companion`, commit per
task ID, do not deploy.

## Do these in order

**0 · Get the imagery (first).** From the repo root:
```
bash handoff/fetch-assets.sh    # downloads verified free-license hospitality video loops + photos → public/assets/
```
Details + where each asset lands per section: `ASSET_MANIFEST.md`. (Pexels License — commercial-free, no
attribution. If a video URL rate-limits, grab it from its source page.)

**1 · Read, in this order:**
1. `HotelCompanion__Panel_Teardown_and_LevelUp.md` — the verdict, the awards-jury critique, and **the plan**:
   re-import placecompanion.com's components (dashboard, tabbed demo, flow cards, 5-voice selector, knowledge
   split, issue alert) re-skinned to RC; add diagrams/cards/icons; trim Home 17→~10; the P1–P4 roadmap.
2. `HotelCompanion__Visual_Parity_Spec.md` — tokens + type (Fraunces 530 / General Sans self-hosted / Spline
   Sans Mono; near-black + copper). **Supersedes §3 of the Build Brief.**
3. `HotelCompanion__Design_Interaction_Spec.md` — the layout law (left-align, no centering), the 17-block
   vocabulary, Home composed section-by-section, block maps for **every** page, animation catalog, imagery note.
4. `HotelCompanion__Claude_Code_Build_Brief.md` — the original surgical brief (IA, components, phases, verification).
5. `HotelCompanion__Handoff_Addendum.md` — Rounds 2 & 3 (decisions: $160B swap, founding CTA, accessibility,
   the 12 preserved sections). Apply anything not yet in the branch.
6. Copy is canonical and verbatim — pull by `{#anchor}`: `HotelCompanion__Site_Copy.md` / `_ES.md` (pages, both
   languages) and `HotelCompanion__Library_Essays.md` / `_ES.md` (12 essays, both languages).
   `HotelCompanion__Preservation_Analysis.md` explains why the preserved copy exists.

**2 · Build — EVERY page, not just Home.** Apply the layout law + block vocabulary + imagery across the whole IA.
Nothing ships as centered text with no visual. Suggested order (from the Level-Up roadmap):
- **P1 Home** — rebuild sections 2–17 (swap `$47B`→`$160B` McKinsey), import PC's tabbed "conversation becomes
  action" demo + routing flow + dashboard + convergence diagram, drop in `hero-coastal-sunset.mp4`, trim to ~10.
- **P2 Platform + Solutions** — five-voice morph, knowledge split, two-stage alert, lifecycle timeline, dashboard;
  Solutions = interactive department index.
- **P3 Enterprise, Companion OS, Resources, Company, Book a Demo, Contact** — "What it is not" quadrant,
  convergence diagram, capability surface, Resources card grid + filters, FAQ accordions, fill `/company` right
  column with `company-reception.jpg`.
- **P4 Polish** — mobile 390 pass per block, persistent thumb CTA, numbered wayfinding, reduced-motion/no-JS
  states, Lighthouse, ES parity.

**3 · Verify (gate before sign-off).** For `/`, `/platform`, `/solutions`, `/enterprise`, `/companion-os`,
`/company`, `/resources`, `/demo`, `/contact`: screenshot beside restaurantcompanion.ai at 390 and 1440. Pass =
zero centered text walls, every major section has a visual (device/diagram/timeline/dashboard/photo/marquee),
Fraunces+General Sans+Spline Mono only (no Cormorant/DM Sans), ambient banding, EN/ES parity, the two
`NEEDS CONFIRM` stats ($160B, 91%/9%) flagged. Write it up in `PARITY.md`/`VERIFICATION.md`.

## Kickoff prompt (paste to Claude Code, from repo root)
> "Read handoff/MASTER_README.md and do exactly what it says, in order. Run fetch-assets.sh first. Then take
>  EVERY page to Restaurant Companion level using the Teardown/Level-Up plan + the two design specs — left-aligned
>  composed blocks, real visuals/diagrams/cards/photography in every section, no centered text walls. Copy is
>  canonical, pull verbatim by anchor; do not rewrite copy except the trims the Level-Up plan authorizes. Branch
>  feat/hotel-companion, commit per task ID, don't deploy. Verify with side-by-side screenshots vs RC at 390 and
>  1440 before calling any page done."

## Locked decisions (don't relitigate)
100% enterprise · two visible brand layers (Axionari + Companions; Companion OS = endorsement, not a 3rd brand) ·
Fraunces+General Sans+Spline Mono · left-aligned editorial, card-less by default · $160B/McKinsey stake ·
Founding CTA → /contact#founding · ES at full parity · "chatbot" banned. Still Eduardo's (non-blocking): Resend
domain verify, final imagery curation, confirm the two stats, Vercel/DNS.
