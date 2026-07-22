# PANEL INSPECTION & CORRECTIONS — P3.2 (post-Phase-5 audit)

Place at `docs/v3/PANEL_INSPECTION_AND_CORRECTIONS.md`. This file **supersedes §A and §B of `docs/v3/CLOSEOUT_AND_NEXT.md`**: the expert panel performed the final visual inspection on the live final preview (July 22, ES + EN, 1008px and 1440px viewports, hydrated DOM, computed-style forensics). Eduardo will not do a visual pass; the panel's evidence-based gates below replace it. Rules of `docs/v3/01_RULES.md` apply unchanged: spec-bound fixes only, no new copy, no new decisions, hero untouched.

**Verdict: NOT APPROVED. Four confirmed defect groups (F1–F4) + one minor (F5).** Two are absent amendments that Phase reports claimed or implied as landed; verify-don't-assume was warranted. Fix all under this directive, re-gate, then stop.

---

## F1 — Section 02: ADDENDUM_1/A2 "numbers-as-art" was never implemented — CONFIRMED by computed style

Measured on the final preview, both languages:

```
2–3×      → color rgb(200,106,58) FILLED · -webkit-text-stroke: 0px · font-size 90.72px · font-style normal
$160B /
$160 mil millones → color rgb(200,106,58) · font-style normal · text-shadow none · 90.72px
```

Required (ADDENDUM_1 A2, verbatim):
- `2–3×`: oversized serif as **outlined/stroke type** — `-webkit-text-stroke: 1px var(--text-lo); color: transparent;` (solid fallback for non-WebKit), **≈200–250px at desktop** (currently 90px filled terracotta).
- `$160B` / `$160 mil millones`: **italic serif in `--champagne` (#E7CE86)** with soft amber glow `text-shadow: 0 0 60px rgba(232,166,106,.25)`. Not terracotta, not upright.
- Each figure also exposed to AT via visually-hidden text or `aria-label` with the plain value.
- Bars, sources, copy: unchanged.

Panel note: at 1008 and 1440 the section stacks single-column and does **not** collide. Growing `2–3×` to 200–250px raises collision risk again — the P3.1 no-collision gate re-runs after this fix (see G-2).

## F2 — Section 04: the pinned sun-arc scroll-scrub NEVER SHIPPED — CONFIRMED by DOM audit

Evidence: `section#home-revenue` contains **zero `position: sticky|fixed` elements** (programmatic sweep of every descendant). What shipped is a static stacked timeline in the left ~45% of the viewport: one small (56px) ember orb sits at the top of the rail beside `ONE VOICE · NOON` and never travels; the sky/background is essentially constant from `3 WEEKS OUT` to `2:14 AM`; the right ~55% of the viewport is empty for ~3,400px of scroll.

The spec (PHASE_3 §3A — the board's chosen signature for section 04) requires the **pinned scroll-scrub arc**: a sticky stage ≥200vh where the sun/orb travels an arc path as the guest's day advances, with sky gradient states per stop (dawn → noon → dusk → 2AM), warm-black night per tokens (never navy). The stop content (booking card, 10:04 tablet, 2:14 AM voice, +2 days phone — all present and correct today) is retained; only the stage behavior and sky are built around it.

Implementation reminders (spec-bound, known traps):
- `overflow-x: clip` — NOT `hidden` — on every ancestor of the sticky stage (`hidden` silently kills sticky; this exact bug was already fixed once elsewhere in this repo).
- Sun = the existing VoiceOrb/ember recipe (it already renders correctly here); sky states from `03_TOKENS` amber ramp + warm blacks. A1 thesis line and all strings unchanged.
- If Lighthouse mobile drops >2 points from the FINAL_REPORT baseline, report it; do not optimize the hero to compensate (hero remains locked).

## F3 — Section 05 constellation: fails the "exactly like the reference" bar (A4/ADDENDUM_2) — measured geometry

This is the defect Eduardo rejected by screenshot. What is RIGHT and must not regress: real assets (Akumal on tablet, suite thumb on monitor, readable lobby photo on TV), the frame layer stack (silver gradient outer → #0b0908 bezel → screen, radius 40/44/22/30, shadow `0 34px 70px -24px rgba(0,0,0,.65)`), device inventory, captions' mono style, closing line. Do not rebuild those; re-compose.

Measured defects (stage ≈898×621 at 1008vw; same topology at 1440):

1. **Monitor amputated.** Tablet (z3, x305–595) covers ~55% of the monitor's screen: suite name renders as "n-View Suite" / "…Vista al Mar", price line and half the CTA hidden. Reference: tablet overlaps only the monitor's left edge; the booking UI reads.
2. **Puck floats.** Puck at y524 vs tablet bottom y475 — overlaps nothing, `box-shadow: none`; reads as a UFO. Reference: it is a grounded hardware object below the tablet, overlapping the tablet's bottom edge, with a soft contact shadow.
3. **Captions occluded.** PHONE and TABLET captions run under the watch ("…ET · LA RESPUESTA ES UNA IMAGEN"); WEB caption's first word under the tablet; TV eyebrow amputated to "NÁS TARDES · SUITE 214". No copy may be cut by an overlap, ever.
4. **Phone screen half-empty + hard-ball orb.** ~35% dead black band between suggestion pills and the ghost input; the orb is a crisp-edged flat disc (zoom-verified) — violates the sacred-orb rule. Use the ember-orb recipe (diffuse radial `#B98C58 → #8A5F38 45% → #4A3520 78% → #241A11`, halo, ring, 6s breathe; outermost boundary a ≥12px fade, never a hard circle edge). Redistribute the phone content per ADDENDUM_2 (orb + listening line + two pills + ghost input fill the screen).
5. **Silver rim sub-spec.** Outer−inner delta measures ~1.5px/side (290 vs 287): invisible at page scale. Spec: **2px per side** light gradient stroke (#9c9c9c→#d9d9d9) on every screen device.
6. **Foreign element.** An SVG path (`stroke: var(--gold)`, 1px curve) crosses the stage. The reference has **no connector lines**. Remove it.
7. **Overlaps too timid.** Phone↔tablet overlap is 12px; the reference is a tight fan where every device visibly tucks behind a neighbor.

### Re-composition (deterministic, normalized to a 1200×760 stage; scale linearly to container width)

| Device  | z | x (left→right)      | y (top→bottom)     | Notes |
|---------|---|---------------------|--------------------|-------|
| Monitor | 1 | 46% → 96% (552→1152)| 2% → 43% screen (15→330), stand to 52% (395) | Content laid out in the RIGHT 65% of its screen; left 35% is imagery/margin only |
| Phone   | 2 | 12% → 33.5% (144→402)| 14% → 80% (106→608)| Right edge tucks 24px under tablet |
| TV      | 2 | 62% → 92% (744→1104)| 62% → 88% (471→669)| Left edge tucks 24px under tablet; screen text starts ≥48px from its left bezel |
| Tablet  | 3 | 31.5% → 64% (378→768)| 8% → 84% (61→638) | Dominant, front-center |
| Watch   | 4 | 29% → 37% (348→444) | 58% → 76% (441→578)| Nested at the phone/tablet lower seam, in front of both |
| Puck    | 4 | 47% → 59% (564→708) | 80% → 92% (608→699)| Top overlaps tablet bottom by ~30px; elliptical contact shadow beneath |

Caption slots (mono, unchanged strings): each caption in clear stage space adjacent to its device — phone caption below-left of phone; watch caption below watch; tablet caption below tablet's left half; puck caption below puck; TV caption below TV; web caption right of the monitor stand. Exact placement free WITHIN gate G-4c (zero intersection with any frame or other caption).

If exact pixel-porting from a recovered `homepage-concepts.dc.html` ever becomes possible, tier 1 of ADDENDUM_2 still supersedes this table (OQ-7 remains closed otherwise).

## F4 — Orb integrity, site-wide spot-rule

Anywhere an orb appears at any size (phone screen, watch dot, arc sun, hero): it is the diffuse ember (recipe above / existing VoiceOrb), never a flat filled circle with a hard edge. The constellation phone orb and watch dot currently fail; fix via component reuse, not a hand-rolled gradient.

## F5 — Minor (fix with the batch, no separate gate)

Section 07 command-centre legend: the `9% escalated` swatch is invisible (no visible fill/outline next to its label while the 91% swatch shows). Give it a `--hairline` outline + `--text-lo` fill at the same size as the 91% swatch.

**Passed and locked (do not touch):** hero (EN/ES), 01 marquee, 03 conversation chips, the four scenario tablet cards, 06 knowledge lists, 07 memory + request-execution cards (A3 line verified present with bold `0 woke your staff` / `0 despertaron a tu equipo`), 08 Companion OS band, 09 deployment, 10 boundaries + sunset band, 11 founding partners, 12 FAQ, 13 ask-bar close, footer. A1 thesis line verified present in both languages with champagne `Sin OTA de por medio.` / `No OTA in between.`

---

## Gates (all machine-checkable; every one green before STOP)

- **G-1 (A2):** Puppeteer/Playwright computed-style assertions at 1440, EN + hydrated ES: `2–3×` has `-webkit-text-stroke-width ≥ 1px` AND transparent fill AND font-size ≥ 180px; `$160B`/`$160 mil millones` has `font-style: italic` AND color #E7CE86 AND a non-none text-shadow. Both figures expose aria/visually-hidden plain values.
- **G-2 (02 collision):** zero rect intersection between each StatBlock figure and any sibling copy/bars at 1280 / 1440 / 1600 / 2000 / 2600, EN + ES.
- **G-3 (arc):** section 04 contains a sticky container spanning ≥200vh; the sun element's center moves monotonically along the arc across ≥4 sampled scrub positions; sampled sky background differs across ≥3 stops; **no ancestor of the sticky stage has `overflow-x: hidden`** (must be `clip`); all stop labels/copy unoccluded at 1440 and 1600 at every sampled position.
- **G-4 (constellation topology, JS rect audit at 1440):**
  - (a) intersection area > 0 for pairs: tablet×monitor, tablet×TV, phone×tablet, watch×phone, watch×tablet, puck×tablet;
  - (b) zero text-node clipping: no text inside monitor/TV/phone screens intersects the tablet frame; no device's own copy is cut by a neighbor;
  - (c) zero intersection for caption×any-frame and caption×caption;
  - (d) SVG connector paths in the section: count = 0;
  - (e) outer−inner frame delta = 2px per side on all five screen devices;
  - (f) puck `box-shadow ≠ none`.
- **G-5 (orb):** constellation phone orb and watch dot render via the shared orb component; zoomed screenshot (≥3× region) shows no hard circular boundary — outermost edge is a gradient fade.
- **G-6 (fidelity overlay):** side-by-side of the rebuilt section at 1440 vs the reference image in `docs/v3/reference/` — device count, overlap topology and materials visibly match; differences enumerated (copy/assets/responsive only).
- **G-7 (regression):** screenshots 1440 + 2000 desktop and 390 mobile, EN + ES, for sections 02, 04, 05; word-count gate re-run (reading copy only, `data-device-ui` exclusion) — deltas must not regress below Phase-5 values; hero byte-diff identical; Lighthouse re-run with delta vs FINAL_REPORT reported (accepted budget: −2).

Loop: READ this file → PLAN (list every file you'll touch, ≤10 lines) → EXECUTE F1→F5 → VERIFY every gate → REPORT (`reports/P3_2_REPORT.md`: per-gate evidence, screenshots, deviations) → STOP. A failed gate loops within P3.2; an interpretation question goes to OPEN_QUESTIONS and work continues on the smallest reading. Amend FINAL_REPORT status to `P3.2 PENDING → COMPLETE` when green. Nothing merges or promotes; §C/§D of CLOSEOUT_AND_NEXT still require Eduardo's explicit order.

After your STOP, deploy a fresh preview + share link and print it: the panel re-inspects in-browser and issues the approval that flips FINAL_REPORT to APPROVED.
