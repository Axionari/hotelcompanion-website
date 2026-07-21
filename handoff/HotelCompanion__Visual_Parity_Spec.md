# Hotel Companion — Visual Parity Spec (Match Restaurant Companion)

**For Claude Code, branch `feat/hotel-companion`. This SUPERSEDES §3 of the Build Brief.**
The IA and copy are right; the *skin* is wrong. The site was built on the old Place Companion styling
(Cormorant Garamond + DM Sans, card/box layouts) and reads nothing like restaurantcompanion.ai. This spec
re-skins it to RC's actual design system. **This is a re-skin, not a re-copy — do not touch approved copy.**

## 0 · The root cause (what to stop doing)
The original brief said "keep Cormorant Garamond + DM Sans and converge toward RC." That was wrong — **RC does
not use those fonts and is not card-based.** Fix all four:
1. **Fonts** — Place uses Cormorant Garamond (serif) + DM Sans. RC uses **Fraunces (display serif) + General Sans
   (body/UI) + Spline Sans Mono (eyebrow)**. Adopt RC's stack. *(Confirmed from RC's live computed styles — see §3.)*
2. **Layout** — Place wraps content in cards/boxes/panels. RC is **card-less**: content sits directly on a
   near-black bed with generous whitespace. Remove the boxes.
3. **Color** — unify on RC's exact near-black + copper tokens (below), not Place's `#141413`/`#C96A3A`.
4. **Section anatomy** — every section becomes: **mono eyebrow → large italic-accented display-serif headline →
   one line of support copy → whitespace.** No panels, no borders-as-decoration, no "SaaS" grids of bordered cards.

## 1 · Get RC's exact values first (do this before styling)
The authoritative source is the live RC site and its repo. **Before writing tokens:**
1. Load **https://www.restaurantcompanion.ai/** (and `/company`, `/product`, `/enterprise`) in a real browser;
   read the computed `font-family` on a headline, on body text, and on a mono eyebrow; read the section
   background colors and the accent. Record them in `PARITY.md`.
2. If the RC repo is reachable in this environment, copy its `:root` token block and font imports verbatim —
   that is the ground truth. If not, use the token set in §2 (extracted from RC's own build docs) and pull the
   **exact display-serif family name** from the live site's CSS/font `<link>`.
3. Screenshot RC `/company` and Hotel `/company` at 390 and 1440 side by side. That gap is the target to close.

## 2 · Tokens to adopt (verbatim from RC's build docs — put in `tokens.css`)
```css
:root{
  /* Surfaces — near-black tonal ladder (ambient banding between adjacent sections) */
  --bg:            #100E0C;   /* page bed */
  --surface-1:     #141210;
  --surface-2:     #171717;   /* RC theme-color */
  --surface-3:     #1c1815;
  --surface-4:     #1F1913;
  --surface-5:     #261E15;   /* warmest lift (e.g. enterprise/CTA zones) */
  --device-frame:  #0d0d0f;   /* deepest — device bezel */

  /* Accent — warm copper, single accent only */
  --accent:        #A9541F;   /* deep copper */
  --accent-bright: #C86A3A;   /* bright copper — active/hover/emphasis */

  /* Text on near-black — warm off-white */
  --text:          #F2EEE6;
  --text-dim:      rgba(242,238,230,0.62);
  --text-faint:    rgba(242,238,230,0.38);

  /* Motion */
  --ease-standard: cubic-bezier(.22,.61,.36,1);
  --ease-emphasis: cubic-bezier(.2,.8,.2,1);   /* ~420ms cross-fades */
  --dur-fast: 180ms; --dur-base: 240ms; --dur-slow: 420ms;
  --reveal-distance-mobile: 16px; --reveal-distance-desktop: 24px;

  /* Device-frame system (reuse for the in-room tablet / phone mockups) */
  --device-radius:44px; --device-radius-mobile:38px;
  --bezel:10px; --bezel-mobile:7px; --island-w:96px; --island-h:24px;
}
```
Adjacent narrative sections must differ by ~one step on the surface ladder (ambient banding), text stays WCAG AA.

## 3 · Typography — the biggest single fix (CONFIRMED from RC's live computed styles)
Ground truth read off restaurantcompanion.ai — use these exact faces, do not substitute:
- **Body / UI:** **General Sans** (Fontshare). **Self-host it** from `public/fonts` (no runtime third-party
  request) — it is not on Google Fonts. RC uses it site-wide (~89 nodes on the homepage). Replace DM Sans everywhere.
- **Display / headlines:** **Fraunces** — RC's exact display face at **weight ~530**, with **italic accents at
  ~480** on one key word per headline (RC's signature, e.g. "The *future interface* between restaurants and
  their guests"). It IS confirmed (not a guess). Note: Fraunces is a variable font — do **not** combine a fixed
  `weight` array with `axes` in `next/font` (that build error already bit us); configure it as variable.
  **Do NOT keep Cormorant Garamond** — thin/anemic, and the #1 reason the pages look off.
- **Eyebrow:** **Spline Sans Mono** — small, UPPERCASE, letter-spaced ~0.12–0.18em, `--text-faint`/`--text-dim`,
  numbered (`01 · VOICE`). RC's eyebrow face.
- Headline scale: keep the existing `clamp()` display sizes but re-point them at the serif; verify the italic
  headline never overflows or hyphenates at 360px and holds ~34–40 char measure.

## 4 · Section anatomy (apply to EVERY marketing section)
RC pattern, card-less:
```
[mono eyebrow — uppercase, tracked, numbered]
[BIG display-serif headline, one word in italic]        ← on near-black, no box
[one line of support copy in General Sans, --text-dim]
[generous vertical whitespace: ~py-28/py-36 desktop]
```
- **Remove**: bordered cards, drop-shadowed panels, boxed feature grids, the Place "pricing-card" look, any
  `rounded-2xl border bg-…` container used purely as decoration. Lists (the RhythmStack noun stacks) sit on the
  bed as tracked text or thin-ruled rows — not cards.
- **Keep**: the signature animations already preserved (QuestionMarquee, reveals) but re-tune them to
  `--ease-standard` / the reveal distances above.
- Big-statement sections (e.g. the new `#platform-not-generic-ai`, `#enterprise-what-it-is-not`) should render
  like RC's "One suggestion. Never a pitch." — huge serif line, one support line, air, no card.

## 5 · Worked example — `/company` (the page flagged as ugly)
Current: boxed sections, DM Sans, Place palette. Target, top to bottom:
1. **Hero** — mono eyebrow `COMPANY`; display-serif H1 with one italic word ("We're building the *future* of intelligent hospitality."); one General Sans support line; near-black `--bg`. No hero card.
2. **`#company-why-hotels`** (the 200-questions problem) — this is the emotional peak; set it as a large
   editorial passage: serif subhead, the short lines as generously-spaced text on the bed, the "walked out the
   door…" line as an italic pull-quote in `--accent-bright`. No box.
3. Belief / Mission / Approach / Companion OS / Axionari / Philosophy — each a card-less section on an
   alternating surface step, mono eyebrow + serif headline + General Sans body.
4. Founding Partners → CTA to `/contact#founding`; final CTA band on `--surface-5` (warm lift), single copper
   button. Match RC's footer + CTA rhythm exactly.
DoD: `/company` at 390 and 1440 is visually of-a-piece with RC `/company` — same type feel, same near-black
banding, same card-less editorial air, same copper accent, same section cadence.

## 6 · Components to reconcile with RC
- **Buttons**: primary = solid copper (`--accent`→hover `--accent-bright`) on near-black; secondary = hairline
  outline in `--text-faint`. Kill any Place button styling that differs.
- **Nav**: RC's fixed, near-black, hairline bottom border, wordmark left, tracked-uppercase wordmark, General Sans links, one solid copper CTA.
- **Footer**: RC's stacked editorial footer; the Companion OS + Axionari endorsement blocks in the RC type system.
- **EndorsementMark**: RC lockup style (no underline; copper hover).
- **Device mockups** (hero tablet/phone, the `#home-revenue-example` chat, the demo): use the `--device-*`
  frame tokens above; full-bleed at ≤768px per RC's bezel rules.

## 7 · Guardrails
- One accent only (copper). No second accent, no gradients-as-decoration, no emoji, no stock-SaaS illustration.
- Do not alter approved copy (EN or ES) — this is styling only.
- Preserve the signature animations; only re-tune easing/distance to the tokens.
- Every change ships the three states (motion / reduced-motion / no-JS) already required by the brief.

## 8 · Verification (write `PARITY.md`)
1. Side-by-side screenshots, Hotel vs RC, at 360/390/768/1440, for `/` `/company` `/platform` `/enterprise`.
   The two should read as the same design family (RC = reference, Hotel = warmer coastal sibling).
2. Confirm: Fraunces (530; italics 480) + General Sans (self-hosted) + Spline Sans Mono loaded; zero Cormorant/DM Sans references left
   (grep the repo), zero decorative card containers left on marketing sections (grep for the old card classes).
3. Type: italic-accent headlines hold measure and don't overflow at 360px.
4. Banding: no two adjacent sections share a surface step; text stays WCAG AA on each.
5. Motion: reveals use `--ease-standard` + the reveal distances; no dead-zones/mid-fade on fast mobile scroll.

**The 25% that stays Hotel's own (don't over-clone):** the warmer/coastal accent temperature, hospitality
photography world, the in-room-tablet hero artifact, and the guest-question marquee content. Same system as RC,
different soul — not a recolor of RC.
