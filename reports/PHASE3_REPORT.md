# PHASE 3 REPORT — Buyer-Journey Implementation (before / after)

Governing document: `PRODUCT_ARCHITECTURE.md` (v1.1, with Hospitality
Principle, Do Not Regress, Definition of Done, Drift Check). Rulings:
`docs/v4/V4_ADDENDUM_2.md`. Branch `v4-phase3` (from `v4` @ `d8b78c8`).
**Nothing merged; production untouched.**

**Preview (share link, expires 2026-07-24):**
https://placecompanion-v2-aacxqsk74-eduardovertiz-dotcoms-projects.vercel.app/?_vercel_share=FM7kJJgi9Glk1qFuQa6YJGUZ6SclQPC0

## Before → after (measured, 1280px hydrated EN — `reports/p2-before-metrics.json` → `p3-after-metrics.json`)

| Page | Height | Sections | Words | What changed |
|---|---|---|---|---|
| / | 8,793 → 8,818px | 7 → 7 | 483 → 480 | Act VII: partner signal ↓ **Book a Demo** (Addendum 2); one eyebrow spec; one gold; compact primary Ask |
| /platform | 15,273 → **9,012px** | 16 → **6** | 1,366 → 878 | Four chapters + tease + CTA; every signature visual kept; the site's only dashboards telling |
| /enterprise | 13,217 → **8,024px** | 16 → **6** | 961 → 656 | Trust-architecture centerpiece; dashboards & Companion OS silent; boundaries kept verbatim |
| /companion-os | 11,560 → **6,725px** | 15 → **6** | 852 → 520 | Eight capability cards, layer language only; ecosystem + Axionari merged |
| /solutions | 7,420 → 6,547px | 6 → 5* | 646 → 593 | Application only; Companion OS band gone (*photo band = segments intro) |
| /resources | 7,787 → **5,281px** | 8 → **4** | 827 → 688 | Editorial only: library owns its filter; FAQ/updates/closing bands gone |
| /company | 9,369 → 7,235px | 11 → **5** | 787 → 686 | Manifesto merged **with narrative kept** (per strategy: not over-compressed); Founding Partner silent |
| /contact | 6,112 → **4,674px** | 7 → **4** | 536 → 484 | Canonical Founding Partner home; FAQ gone; HQ + scheduling folded in |
| /demo | 10,147 → **6,850px** | 11 → **6** | 925 → 585 | **Form at position 2**; one "what to expect"; the site's ONLY FAQ beneath the form; JSON-LD moved here |
| /faq | 2,263px → **redirect → /demo#faq** | 1 → 0 | 233 → 0 | FAQ doctrine: definitional Q&As answered by the site itself |
| **Total** | 92,000 → **63,166px** (−31%) | **98 → 49** (−50%) | **7,616 → 5,570** (−27%) | |

Per the Final Decision Rule, the word/section numbers are outcomes, not
targets — Company and Demo were deliberately kept richer than the original
plan (narrative depth; FAQ + try-it as hesitation reducers).

## Narrative ownership enforced (constitution §7)

- Companion OS: zero mentions on Platform/Solutions/Enterprise/Home acts —
  the footer endorsement is the single cross-reference (machine-checked,
  G-12).
- Founding Partner: teased on Home (partner line), linked under the demo
  form, told fully once at /contact#founding. Company/Resources silent.
- Dashboards: told once, on /platform (Enterprise silent — G-12).
- The five "one-line pointers" from the earlier plan were **deleted**, per
  the pointer rule; each page keeps exactly one forward handoff link.

## Validation (ALL GATES GREEN — `reports/v4-gates-output.txt`)

- **G-1…G-11**: unchanged suite re-run green (words, faces, verbatim + A2
  cream, Act-IV rects, palette, vux orbs, integrity, responsive, G-10
  champagne/brass, G-11 family) with two spec updates: Act VII expects
  *Book a Demo* / *Agenda una Demo* (Addendum 2) and G-2 exempts the one
  sanctioned sans button system.
- **G-12 (new)** narrative silence: home/platform/solutions silent on
  Companion OS · enterprise silent on Companion OS + Executive Dashboards ·
  resources/company silent on Founding Partner + FAQ. PASS.
- **G-13 (new)** anchor integrity: all in-page hash links across 9 routes
  resolve (footer FAQ/Updates links repaired; old section ids preserved as
  scroll anchors inside merged sections). PASS.
- **Engineering hygiene:** dead components removed (v3 HomeClient,
  FaqClient, Constellation, HeroIgnition, JourneyWalkthrough, SunArc);
  orphaned copy modules removed (faqPage, sunArc); unused i18n blocks and
  sub-keys pruned EN + ES in lockstep; PersistentCTA retired (minimal
  chrome); `tsc` + eslint clean (0 errors).

## Lighthouse (mobile)

| Page | Old preview (pre-Phase-3) | New preview |
|---|---|---|
| / | 61 · a11y 90 *(cold)* — prior warm median 90 | sim 5-run median **89** (87–**99**) · **devtools-throttled 91** · a11y **96** · SEO 100 local |
| /platform | 64 | **80** |
| /demo | 65 | **89** |

No regression on any page; a11y +6 site-wide. The homepage's simulated
median (89, range 87–99) is statistically indistinguishable from the
pre-phase 90 (range 86–99) — the variance is Lantern modeling over the
share-link redirect; the devtools-throttled measurement on the same URL is
**91** (LCP 2.8s, CLS 0.03) and 99 locally. Recorded as met-with-note for
the panel.

## Design-system consolidation (constitution §11)

One gold `#C9A15A` everywhere (`--gold` re-pointed; receipt tan retired —
scope includes legal routes per approval) · one body cream (`var(--text)`;
`#F2E9DA` retired; `--cream` for emphasis italics only) · one eyebrow spec
(11px/0.26em; accent/faint/brass; ~17 permutations removed) · one button
system (sans sentence case, 44/52px; mono-caps pills retired) · two CTA
labels (*Book a Demo* + *See It Live*; four legacy labels retired).

## Evidence

Full-page after-captures: `reports/img/p3/after-*.png` (8 pages) ·
metrics JSON before/after in `reports/` · gate output in
`reports/v4-gates-output.txt` · Lighthouse JSONs `/tmp/lh-*` (preview runs
re-runnable via the share link).

## PHASE 4 — Editorial Unification (final pass, presentation only)

Every change below is layout/typography only; architecture, copy, tokens,
CTAs, and section order untouched. RC = reference implementation.

1. **Hero normalized:** H1 −13% (`clamp(34px, 6.6vw, 100px)`); the orb rose
   30px and the ask area enters sooner — the conversational interface is the
   visual hero, typography supports it.
2. **One display scale:** Act VI 88→78px, Act VII 92→80px; Act III/IV/V
   statements aligned to the family 54px heading ceiling.
3. **One focal point per section:** Platform §01 closer collapsed to a single
   supporting line (competing serif-beat column removed) · §02 routing flow →
   chips → close as one path (was chips-beside-beats) · §03 DashboardMockup
   stands alone (competing chip column removed) · Companion OS keeps one
   signature diagram (fragmentation NodeDiagram removed; prose carries the
   why) · Company manifesto and builder single-column (side codas moved
   below prose) · why-hotels floating pull-quote resolved: prose first, then
   the quote-on-photograph as the section's single visual anchor.
4. **Freed keys pruned** EN+ES (`knowsProperty.close`, `dashboards.items`/
   `monitorLead`, `why.industries`/`fragmentLabel`).
5. **Nothing added:** no new animation, gradient, glow, card, or decoration.

Validation: ALL GATES G-1…G-13 GREEN after the pass. Lighthouse preview
(1g718fjwk): sim 99/90/89 → median **90**, devtools-throttled **92**
(LCP 2.7s), a11y 96. Before/after captures: `reports/img/p3/after-*.png`
(pre-P4) vs `reports/img/p4/after-*.png`.

## Status: PROMOTED TO PRODUCTION (2026-07-23, explicit owner order) — v4-phase3 merged to v4; placecompanion-v2-ecru.vercel.app serves this build
