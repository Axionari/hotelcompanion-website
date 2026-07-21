# Hotel Companion — Awards Jury Teardown & Level-Up Plan

**Reviewed live at localhost:3000 (Home, Company, Platform) on July 20, 2026, against restaurantcompanion.ai
and placecompanion.com. Studied visually, page by page, not just in code.**

## Executive verdict

**Current award-readiness: ~5.5/10. Restaurant Companion: ~9/10. The gap is real but it's now a *finishing*
gap, not a foundation gap.** The typographic system is fixed site-wide (heavy Fraunces + General Sans + mono
copper eyebrow — the anemic Cormorant is gone). Two surfaces are genuinely RC-grade: the **Home hero** (left
two-column, italic-accented headline, the in-room tablet with a live "MARAZUL / ¿Dónde se sirve el desayuno?"
exchange and breathing orb) and **/company** (left two-column with the "walked out the door…" line pulled out as
a copper Fraunces italic blockquote). That proves the team can hit the bar.

But **every page except the Home hero and /company is still center-aligned heavy-serif text with no visuals** —
`/platform`, `/solutions`, `/enterprise`, `/companion-os`, `/resources`, `/demo`, `/contact`, and Home items
2–17. There are **no diagrams, no dashboards, no cards, no device walkthroughs, no photography anywhere**, and
the Home stake still reads a centered `$47B` (pre-swap). As it stands, an Awwwards jury bounces it in the first
five seconds of scrolling past the hero — because the promise the hero makes is broken by the second section.

**The single most important realization for this level-up:**
> **The winning site = placecompanion.com's information design (its cards, dashboard, flow diagrams, tabbed
> demos, personality selector) × restaurantcompanion.ai's art direction (left-aligned editorial, near-black +
> copper, heavy serif, mono eyebrow, air) × the enterprise copy.** PC already *built* the visuals this site is
> missing. The enterprise rewrite threw them away and left prose. Bring them back, re-skinned to RC's system.

---

## The panel (brutal, by juror)

### 1 · Awwwards juror (overall craft / SOTD bar) — current 5/10
- **What kills it:** after a strong hero, section 2 is a centered `$47B` floating in a void. SOTD sites never
  break their own promise in the first scroll. The homepage has *17 sections* and only one is composed.
- **RC does:** every section is a self-contained *scene* — timeline, node diagram, device, morph. Relentless.
- **Fix:** no section ships as centered text. Every one gets a visual on one side (see Level-Up). Cut Home from
  17 sections to ~10 composed ones.

### 2 · CSS Design Awards juror (visual design + UI + creativity, the 3 CSSDA axes) — current 5/10
- **UI 4/10:** no component system visible below the hero — no cards, chips, tabs, accordions, stat blocks.
  It reads as an unstyled document. PC had a whole card language; it's gone.
- **Creativity 5/10:** the tablet hero and the question marquee are the only two creative moments. One idea does
  not carry a site.
- **Fix:** build the block vocabulary (Design & Interaction Spec §3) and *re-import PC's cards* (below).

### 3 · FWA juror (innovation / interaction / "wow") — current 4/10
- **What's missing:** interactivity. RC has a touchable hero, a swipeable 5-step walkthrough, a brand morph.
  Hotel has one live hero and then static text. There is nothing to *do*.
- **The Hotel win they're not using:** the **five-voice morph** and the **two-stage 2 AM alert** are more
  interesting than anything on RC — and neither is built.
- **Fix:** ship the voice-morph selector and the guest-journey device walkthrough. That's the FWA hook.

### 4 · Webby juror (content structure, clarity, navigation, IA) — current 6.5/10
- **Strength:** IA and copy are strong and the nav is clean.
- **What's weak:** the pages are a wall of prose with 20-item noun-stacks (Platform "knows your property" lists
  ~20 things centered). Nobody reads that; it should be a scannable 2-column icon list or chips. No visual
  hierarchy inside sections. No "what do I click next" beyond the CTA.
- **Fix:** convert noun-stacks → chips/icon-rows; add in-section hierarchy; add contextual links between pages
  (Platform ↔ Solutions ↔ Enterprise), and a sticky mini-CTA.

### 5 · Red Dot juror (does it look like the premium product it sells?) — current 6/10
- **Strength:** the type and palette now read luxury-hospitality, not SaaS-dashboard. Good.
- **What breaks it:** empty right columns (the /company hero right half is dead space), oceans of vertical
  padding with nothing in them, and **zero photography** — luxury hospitality without imagery reads as a
  wireframe. RC leans on warm full-bleed photography; Hotel has none.
- **Fix:** add hospitality photography (shot list below) and fill the empty right columns with devices/diagrams.

### 6 · iF Design juror (system rigor, consistency, restraint) — current 6/10
- **Strength:** tokens and type are consistent; the surface ladder exists.
- **What's inconsistent:** alignment (hero left, section 2 centered — on the *same page*); ambient banding not
  yet applied (long stretches of one flat black); spacing rhythm uneven (huge dead gaps). A system half-applied
  reads worse than no system.
- **Fix:** apply the left-align law and surface banding *everywhere*, one pass, no exceptions.

### 7 · UX Design Awards juror (usability, flow, mobile) — current 6/10
- **What's untested here:** mobile (390) — the primary canvas — wasn't reviewable in this pass; RC is mobile-
  first and Hotel must be. The centered desktop layouts often *look* okay-ish centered on mobile, which masks
  the desktop failure and creates a false sense of "done."
- **Flow gaps:** no persistent thumb-zone CTA seen; long scroll with no wayfinding (no section index / progress).
- **Fix:** the persistent mobile CTA, a subtle section progress or numbered wayfinding (RC numbers its sections),
  and a genuine 390px composition pass per block.

**Consensus score today: 5.5/10. With the level-up below: a credible 8.5–9/10.**

---

## What's already right (keep, don't touch)
- The **font system** (Fraunces 530 / italics 480, General Sans self-hosted, Spline Sans Mono) — correct and RC-true.
- The **Home hero** — left, tablet device, orb, live exchange, italic accents. This is the template for everything.
- **/company** — the two-column + copper italic pull-quote is exactly right.
- The **question marquee** — a PC inheritance that already works. Keep it as the model for "import PC's good stuff."
- Palette, copper accent, mono eyebrow, wordmark.

---

## THE LEVEL-UP PLAN

### A · Re-import placecompanion.com's components (its best assets — re-skinned to RC)
PC already designed the visuals this site is missing. Rebuild each in the near-black/copper/Fraunces system,
card-less where RC would be, tasteful cards where genuinely useful (dashboards, flows). Map:

| PC component (already designed) | Re-skin into | Hotel anchor |
|---|---|---|
| **"Command center" dashboard** (Your Hotels list · questions this month · **91% AI / 9% escalated** donut · activity chart · multi-property) | A handsome windowed dashboard mockup | `#home-enterprise-intel`, `#platform-dashboards`, `#enterprise-dashboards` |
| **"Every conversation becomes action"** tabbed panel (Suite upgrade / Spa / Late checkout / Maintenance) + live chat (the $250 ocean-view upgrade → "Investment: covered") | Tabbed interactive **device walkthrough** | `#home-revenue` + `#home-revenue-example` |
| **"From conversation to action"** 4 mini-flow cards (Guest asks → identified → team notified) | **Routing-flow** cards, animated L→R | `#home-execution`, `#platform-request-action` |
| **Five personality cards** (Warm & Local, Refined Concierge, Barefoot Luxury, Playful Explorer, Zen & Mindful) | **Voice-morph selector** (one reply, five tones) | `#platform-five-voices` |
| **"Built on knowledge" dual columns** (YOUR HOTEL / YOUR DESTINATION with icon lists) | Two-panel **knowledge split** with icons | `#platform-knows-property` + `#platform-destination` |
| **"Never miss a guest issue"** two-stage alert | **Two-stage alert flow** on a device | `#platform-issue-detection` |
| **"Live in minutes" 3-step** | Numbered **deploy timeline** | `#enterprise-deploy`, `#home-live-in-days` |
| **"Three ways guests reach"** (QR / widget / link) | **Channel cards** + in-room tablet | `#platform-voice-first` |
| **Guest lifecycle Pre/During/After** | Horizontal **journey timeline** | `#platform-lifecycle` |
| **$47B→$160B stat** | Left-aligned **stat block** (not centered) | `#home-stake` |

### B · New graphics/visuals to introduce (beyond PC)
- **Node/fragmentation diagram** for the problem ("the same 200 questions" / generic-AI-vs-yours) — RC's
  "CONTEXT LOST ✕" pattern, adapted.
- **Convergence diagram** into one glowing copper node for Companion OS ("one intelligent layer").
- **Capability surface** for the 8 Companion OS capabilities — a restrained ticker/grid, not 8 SaaS cards.
- **Iconography set** — one thin-line copper icon family for the noun-lists (property, destination, departments).
  This alone kills the "wall of text" problem the Webby juror flagged.

### C · Cards & intuitiveness (make it scannable, navigable, beautiful)
- Convert every **20-item noun-stack** into either a 2–3 column **icon-chip grid** or a tasteful **card set** —
  never a centered vertical list. (Platform property/destination, Home "every room," Solutions departments.)
- **Solutions** = a **department index**: a left rail of departments (Front Desk, Concierge, Housekeeping,
  Engineering, F&B, Spa, Revenue, GM) that swaps the right-panel content on hover/click — intuitive, dense,
  navigable (replaces today's endless centered stack).
- **Resources** = an editorial **card grid** for the 12 essays with category filter pills (not a text list).
- **FAQ** everywhere = **accordions** (the "dropdowns" you asked for).
- Add **contextual cross-links** and a **sticky "Book a Demo"** in the thumb zone on mobile.

### D · Copy trims & rearrangements (yes, cut)
- **Home: 17 → ~10 composed sections.** Merge the redundant text beats (employee/voice/available overlap;
  intelligence/enterprise-intel overlap). Proposed order: **Hero → Stake($160B) → Marquee → "Conversation
  becomes action" (tabbed device) → Knowledge split → Intelligence→Dashboard → Execution flow → Companion OS
  convergence → Guest lifecycle → Founding/CTA.** Everything else becomes a Platform/Solutions detail.
- **Trim noun-stacks to the strongest 8–10 items** + "and more," rendered as chips. The 20-item lists read as
  filler and hurt the luxury tone.
- **Platform** is very long — split its 14 sections into scannable blocks; lead with the voice-morph and the
  knowledge split (the two most visual), push memory/analytics lower.
- Keep every headline and the approved emotional copy (the $160B stake, "Why Hotels," "conversation not a
  redirect") verbatim — trims apply to the *list bodies*, not the hero lines.

---

## Art direction & stock footage / photography (fitting, free-license)

**Direction:** warm, dim, editorial, unposed. Golden-hour coastal Mexico / resort. Darkened 55–70% with a warm
copper grade so type stays legible on top (exactly how RC treats its night-dining photo). **Never** bright,
smiley, "stock-y" business people. People implied, not posed. Motion should be slow and ambient (a 6–10s loop),
never fast cuts.

**Sources (all free for commercial use):**
- **Pexels Video** (Pexels License, no attribution) — confirmed deep library (161K+ resort clips). Hero loops.
- **Coverr** (coverr.co) — curated, cinematic, muted hero-loop videos; hospitality/nature; free.
- **Mixkit** (mixkit.co) — free HD hotel/resort/beach clips, generous license.
- **Unsplash** + **Pexels Photos** — stills for section beds (356K+ resort photos on Pexels).

**Search queries that fit (use on Pexels/Coverr/Mixkit):**
`luxury resort aerial` · `infinity pool sunset` · `beach resort golden hour` · `hotel lobby ambient` ·
`ocean waves slow motion` · `palm trees breeze evening` · `resort terrace dusk` · `spa candle calm` ·
`fine dining table evening` · `coastal town mexico` · `boutique hotel room morning light`.

**Shot list (map to sections):**
1. **Hero bed (video loop, 6–10s, muted, darkened):** slow aerial over an infinity pool at golden hour, or a
   calm ocean/terrace at dusk. Behind the left text + tablet. This is the single highest-impact asset.
2. **Company / "Why Hotels":** a quiet lobby or front-desk moment, dim — humanizes the problem passage.
3. **Destination section:** a coastal town / beach still — pairs with the "no-seaweed beach, locals on a Tuesday"
   copy.
4. **Lifecycle:** three warm stills — arrival (bags/door), in-stay (pool/spa), departure/review (terrace).
5. **Enterprise/CTA band:** a wide dusk resort still on the warmest surface step.
- Deliver as optimized `webp`/`avif` (stills) and `webm`/`mp4` H.265 (loops, ≤2–3 MB, `poster` still for no-JS).
  Provide a `{/* NEEDS PHOTO */}` slot now so swapping real assets is trivial.
- **Licensing hygiene:** Pexels/Coverr/Mixkit/Unsplash are commercial-free; still record the source URL per asset
  in a `CREDITS.md` (some jurisdictions/юridical review like a trail), and avoid any clip with recognizable brand
  signage or identifiable faces in the foreground.

---

## Priority roadmap (build order)

**P1 — Finish Home to RC level (the make-or-break page):**
1. Rebuild Home sections 2–17 with the block vocabulary; swap `$160B`; apply left-align + banding.
2. Import the tabbed "conversation becomes action" device, the routing flow, the dashboard, the convergence
   diagram. Trim 17→~10 sections.
3. Drop in the hero video loop + one section still.

**P2 — Platform + Solutions (the product proof):**
4. Voice-morph selector, knowledge split, two-stage alert, lifecycle timeline, dashboard.
5. Solutions department index (interactive left rail).

**P3 — Enterprise, Companion OS, Resources, Demo, Contact:**
6. "What it is not" quadrant, convergence diagram, capability surface, Resources card grid, FAQ accordions.

**P4 — Polish to award bar:**
7. Mobile 390 composition pass per block; persistent thumb CTA; numbered wayfinding; reduced-motion/no-JS states;
   Lighthouse; side-by-side screenshot parity vs RC at 390 + 1440.

**Definition of "RC-level / award-ready":** open any page beside restaurantcompanion.ai at 390 and 1440 — same
compositional density, same editorial air, every section a composed scene with a visual, zero centered text
walls, real photography, at least two genuinely interactive moments (voice-morph + device walkthrough) that RC
doesn't have. That's when it's better, not just equal.
