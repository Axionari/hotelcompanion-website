# Hotel Companion — Design & Interaction Spec (Match + Beat Restaurant Companion)

**For Claude Code, branch `feat/hotel-companion`. Read with `HotelCompanion__Visual_Parity_Spec.md` (tokens/type).
This is the LAYOUT + INTERACTION half. Styling only — do not change approved copy (EN/ES).**

I opened both sites in a real browser and studied them. This spec is grounded in what I actually saw, section by
section, at 1512px.

## 0 · What I saw (the honest diagnosis)

**Restaurant Companion (the reference):** every section is a *composed block*, **left-aligned**, asymmetric,
with a device mockup or a hand-built diagram carrying the right side. Heavy, high-contrast display serif with an
*italic accent on one word* per headline. Mono copper eyebrow, numbered (`01 · THE INDUSTRY SHIFT`), left-aligned.
Scroll-reveal fade-ups. Real interactive moments: a glowing-orb phone in the hero, a dated **timeline**, a
**node diagram** of fragmented systems with "CONTEXT LOST ✕" break-points, a **convergence diagram** into one
glowing copper node, a 5-step device walkthrough, a white-label brand **morph**.

**Hotel Companion (current build):** everything is **center-aligned**, a single narrow text column, a **thin,
anemic serif** (Cormorant Light) that looks delicate instead of confident, **no device mockups, no diagrams, no
right column, no composed blocks** — and alignment is even *inconsistent* (the `$47B` sits left while the copy
below it centers). It reads like an unstyled draft. This is the entire problem, and it is fixable.

**The five failures to fix, in priority order:**
1. **Centering.** Kill it. RC is left-aligned editorial. → §1
2. **No devices/diagrams.** Every major section needs a visual on one side. → §3 block vocabulary
3. **Thin serif.** Cormorant Light → a heavy high-contrast display serif with real italics. → Visual Parity §3
4. **No asymmetry / no grid.** One narrow centered column → a 12-col editorial grid, content 5–7 cols left,
   visual 5–6 cols right. → §1
5. **Dead, uncomposed space.** Replace vertical voids with the diagrams/devices/timelines below.

## 1 · The layout law (applies to every marketing section)

- **LEFT-ALIGN by default.** Eyebrow, headline, body, CTAs all flush-left on a 12-column grid
  (`max-w-6xl`/`max-w-7xl`, `px-6 md:px-10`). The ONLY centered moments allowed are rare full-bleed
  "statement" lines (RC uses maybe one or two) — never whole sections, never the hero.
- **Asymmetric two-column** is the default section shape: **content 5–7 cols (left), visual 5–6 cols (right)**,
  vertically centered to each other. Alternate side per section occasionally for rhythm, but keep text left-read.
- **Ambient surface banding:** adjacent sections step one level on the surface ladder (Visual Parity §2). No two
  neighbors share a bg; generous `py-28 md:py-36`.
- **Every section = eyebrow → headline → ≤2-line support → [visual/interaction].** If a section has no visual,
  it's either a deliberate statement line or it's unfinished — give it one from §3.

## 2 · The hero (single biggest miss — rebuild it)

Current: centered text, no device. Target (mirror RC, elevate for Hotel):
- **Left column (6 cols):** mono eyebrow `THE VOICE-FIRST GUEST INTELLIGENCE PLATFORM` · heavy serif H1 with an
  italic accent — "Understand *Every Guest*. Capture *Every Opportunity*." · one General Sans support paragraph
  (`--text-dim`) · two CTAs (solid copper **Book a Demo** + hairline **Watch Product Tour**) · a small
  `POWERED BY COMPANION OS` mono lockup beneath (RC puts "POWERED BY AXIONARI" exactly here).
- **Right column (6 cols) — THE HOTEL UPGRADE OVER RC:** an **in-room tablet** device (landscape) *and* a phone,
  or a single hero tablet, running the live guest-question demo — a glowing copper mic orb, "Talk or type — in
  your language," EN/ES pills, and the guest-question marquee feeding into it (MarAzul / Marina sample). RC has a
  phone; Hotel's differentiator is the tablet, so lead with it. Warm radial copper glow behind the device.
- Reduced-motion/no-JS: device renders as a composed still.
- **Imagery reality (confirmed from RC's live hero):** RC's hero and several section beds sit on **full-bleed
  hospitality photography** (dim, warm, editorial). Hotel's `public/` has none yet, so the current hero uses a
  warm CSS wash — acceptable as a placeholder, but **real coastal/hotel photography is what closes the final 15%
  of the RC gap.** This is an Eduardo dependency (see open items). Where a section calls for a photo bed, build it
  to accept a `<Image>` now and drop a `{/* NEEDS PHOTO */}` so it's trivial to swap in. Shots to source: a warm
  in-room/arrival scene (hero), a coastal/destination frame (destination section), a lobby/service moment
  (lifecycle). Treatment: darkened ~55–70%, warm grade, never bright/stocky.

## 3 · The block vocabulary (build these; reuse across pages)

Each maps a Hotel copy anchor onto an RC-proven block. Left-aligned unless noted.

1. **Hero-with-live-device** — §2. (Home hero `#home-hero`.)
2. **Stat/stake block** — big heavy-serif number left (e.g. `$160B` in copper), one-line support to its right or
   below, mono source line; NOT centered. Add a subtle count-up on reveal. (`#home-stake`.) *Fixes the broken
   centered $47B block I saw.*
3. **Question marquee** — full-bleed rows of real guest questions drifting horizontally, pause-on-hover, feeding
   the hero device. (Already built — keep, re-tune easing.) (`#home-conversation`.)
4. **Dated timeline** — horizontal row of items (serif label + copper year) with hairline dividers; reveal
   left-to-right. Use for the **guest lifecycle** Before/During/After (`#platform-lifecycle`) and any
   industry-shift beat. (RC's "Reservations 2004 → Loyalty 2016".)
5. **Node/fragmentation diagram** — scattered system/《problem》 boxes linked by dotted paths with copper "✕"
   break-points. Use for the **problem** framing ("the same 200 questions," `#company-why-hotels`) and
   "generic AI vs yours" (`#platform-not-generic-ai`) as a split diagram. (RC's "CONTEXT LOST" map.)
6. **Convergence diagram** — many boxes on one side flowing into a single glowing copper node. Use for
   **"one intelligent layer"** / Companion OS (`#home-companion-os`, `#companionos-*`). (RC's operating-model node.)
7. **Three-pillar row** — three left-aligned columns, each mono eyebrow + serif headline + line, staggered
   reveal. Use for audience/department triads (Solutions groupings; the "employee/voice/available" beats).
8. **Device walkthrough (swipe)** — a phone/tablet that steps through a numbered flow (RC's 5-step "Listening →
   recommendation → the usual → secure payment → invited back"). Use for the **guest journey** and the
   `#home-revenue-example` 10:14 PM upgrade (Listening → suggests suite → confirm → paid → invited back). Dots +
   swipe on touch; reduced-motion = filmstrip of stills.
9. **Voice-morph toggle** — the white-label **morph** applied to the **five named voices**: a selector (Warm &
   Local / Refined Concierge / Barefoot Luxury / Playful Explorer / Zen & Mindful) that cross-fades the SAME
   in-device reply into each tone. This is Hotel's version of RC's STOKE!/CASA MAREA brand morph.
   (`#platform-five-voices`.) ~420ms `--ease-emphasis` cross-fade.
10. **Routing flow** — request → correct department, animated left-to-right (housekeeping/engineering/etc.).
    (`#home-execution`, `#platform-request-action`.)
11. **Two-stage alert flow** — a device showing the guest reporting a leak → room captured → two email-alert
    cards firing in sequence → guest reassured. (`#platform-issue-detection`.)
12. **Capability surface** — the 8 Companion OS capabilities as a restrained surface (not 8 bordered SaaS cards):
    a tight grid of label + hairline, or a horizontal ticker, on a warm surface step. (`#*-companion-os`.)
13. **Dashboard mockup** — a windowed "command center" (questions/month, the 91%/9% donut, multi-property list).
    (`#platform-dashboards`, `#enterprise-dashboards`.)
14. **Accordion / dropdown** — FAQ as expand/collapse rows (chevron, `--ease-standard`), left-aligned, hairline
    dividers. This is the "dropdowns" you asked for. (`#home-faq`, `#demo-faq`, `#contact-faq`.)
15. **Statement line** — rare, large centered serif line for a single beat ("Hospitality that feels personal.").
    Use sparingly (≤1 per page).
16. **Trust strip / logo row** — hairline-separated small caps. (`#home-trust`, `#enterprise` trust.)
17. **Final CTA band** — warmest surface step (`--surface-5`), left-aligned headline + single copper button.

## 4 · Home, fully composed (copy anchor → block → layout → motion)

1. `#home-hero` → **Hero-with-live-device** (§2). Left text / right in-room tablet. Reveal: text words settle,
   device glow breathes.
2. `#home-trust` → **Trust strip** (block 16), hairline, small caps, full-width under hero.
3. `#home-stake` → **Stat block** (block 2): `$160B` heavy copper serif left; support + `Source: McKinsey`
   right; the "missed moment" lines as a tight left-aligned list, NOT centered. Count-up on reveal.
4. `#home-conversation` → **Question marquee** (block 3) full-bleed + a left headline above it.
5. `#home-employee` / `#home-voice` → **two-column** (text left, a supporting device or the mic-orb right).
6. `#home-every-room` → **RhythmStack** as two flush-left columns of capabilities (not one centered list).
7. `#home-revenue` (+ `#home-revenue-example`) → **Device walkthrough** (block 8): the 10:14 PM ocean-view-suite
   upgrade, ending on "One upgrade. Investment: covered." as a copper punch line.
8. `#home-knows` → **two-column**: text left, a "Your Hotel / Your Destination" split panel right.
9. `#home-intelligence` → **node→signal diagram** (block 5 variant): conversation → extracted signals.
10. `#home-execution` → **Routing flow** (block 10).
11. `#home-enterprise-intel` → **Dashboard mockup** (block 13).
12. `#home-companion-os` → **Convergence diagram** (block 6) + **capability surface** (block 12) + EndorsementMark.
13. `#home-live-in-days` → **three-step** mini-timeline (block 4).
14. `#home-what-it-is-not-teaser` → short left statement + link to `/enterprise#what-it-is-not`.
15. `#home-founding-partner` → left block + CTA to `/contact#founding`.
16. `#home-faq` → **Accordion** (block 14).
17. `#home-final-cta` → **CTA band** (block 17).
Numbered eyebrows run 01…n down the page (RC style), left-aligned, mono copper.

## 5 · Block maps for the other pages (same grammar)

- **Platform** — hero (device) → voice-first + **channels** (block: device + channel list, incl. tablet) →
  `#platform-your-voice` = **Voice-morph toggle** (block 9) → `#platform-knows-property` two-column →
  `#platform-not-generic-ai` = **split node diagram** (generic-AI-hallucinates vs yours-knows) →
  `#platform-destination` two-column w/ vivid examples → `#platform-lifecycle` = **timeline** (block 4) →
  `#platform-issue-detection` = **two-stage alert flow** (block 11) → reservations/request = **routing flow** →
  memory/intel two-columns → `#platform-dashboards` = **dashboard** → capability surface → CTA band.
- **Solutions** — hero → department blocks as alternating two-columns + one **three-pillar row**; segment blocks
  (luxury/resort/boutique/business/groups) as a compact left-aligned index, each a hairline row (not cards) → CTA.
- **Enterprise** — hero → trust strip → security/governance/etc. as two-columns → `#enterprise-what-it-is-not` =
  **"Not a…" quadrant** (four hairline rows, left) → dashboards → convergence/OS → CTA. Warmest banding here.
- **Companion OS** — hero → **convergence diagram** anchoring the page → 8 capability deep-dives as alternating
  two-columns → ecosystem = a **family row** (Hotel/Restaurant/…future) → Axionari endorsement → CTA.
- **Company** — hero (left) → **`#company-why-hotels`** as the emotional peak: an editorial passage, the
  "walked out the door…" line as a large italic copper **pull-quote**, NOT a centered blob → belief/mission/etc.
  alternating two-columns → founding → CTA. *(This is the page you flagged — it should feel like RC `/company`.)*
- **Resources** — editorial index: featured essay as a large left card, the rest as a hairline list with
  category filters (pills). Article template = left-measure ~680px, mono eyebrow `LIBRARY · {CATEGORY}`, heavy
  serif title, italic dek, "Next Article →" card.
- **Book a Demo / Contact** — two-column: form left (real fields, states), value/what-you'll-see right; FAQ as
  **accordion**.

## 6 · Animation catalog (re-tune, don't over-animate)

- **Reveal:** fade-up + 16px(mobile)/24px(desktop), ≤240ms, `--ease-standard`, in-view `rootMargin:"0px 0px -10% 0px"`,
  first viewport exempt (full opacity on load — RC does this; kills blank-above-fold).
- **Hero device:** slow breathing glow on the mic orb; marquee feeds it; on tap, a real reply resolves.
- **Marquee:** linear infinite, pause on hover, two rows opposite directions (Place already had this — keep).
- **Timeline / routing / diagrams:** draw-on / stagger left-to-right on reveal; reduced-motion = final state.
- **Voice-morph & walkthrough:** ~420ms `--ease-emphasis` cross-fade; dots; swipe on touch.
- **Accordion:** height+opacity ≤240ms; chevron rotate.
- **Counts (stats):** count-up once on reveal.
- All blocks ship motion / reduced-motion / no-JS states.

## 7 · Where Hotel should BEAT Restaurant Companion (earn "we made it better")

- **The in-room tablet hero** — RC only has a phone. Hotel leads with a landscape in-room tablet *and* phone,
  and the connectivity-adaptive voice→text idea is visible.
- **The voice-morph** — RC morphs two restaurant brands; Hotel morphs **five named guest-service voices** on one
  reply — a richer, more product-true interaction.
- **The lifecycle timeline** — RC's timeline is industry history; Hotel's is the **guest's own journey**
  (arrival → stay → review), which is more emotionally resonant and closes on reputation/reviews.
- **The dashboard** — give leadership a genuinely handsome command-center mockup (91%/9% donut, multi-property),
  a proof surface RC doesn't foreground.
- **Warmth** — same near-black + copper system, but Hotel's photography/accent runs a touch warmer/coastal (the
  25% soul). Same system, different soul — not a recolor of RC.

## 8 · Verification (write `PARITY.md`, screenshots required)

Open Hotel and RC side by side at 360 / 390 / 768 / 1440 for `/`, `/company`, `/platform`, `/enterprise`. Gate:
1. **No centered sections** (except ≤1 statement line/page). Grep/inspect: hero + stake are left-aligned.
2. **Every major section has a visual** (device, diagram, timeline, dashboard, or marquee) — no bare text voids.
3. **Heavy serif** with italic accents loaded; **zero Cormorant/DM Sans** left (grep).
4. **Asymmetric grid** present (content/visual columns), not a single narrow column.
5. Ambient banding: no two adjacent sections share a surface; WCAG AA holds.
6. The two flagged pages (`/company`, `/`) read as the same family as RC — same air, same cadence, same polish.
Ship nothing until `/` and `/company` screenshots sit convincingly beside RC's.
