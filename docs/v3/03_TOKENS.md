# 03 · TOKENS — closed design vocabulary

Match existing site values where they already exist (RECON will confirm); these are the canonical values for anything new. **Nothing outside this file.**

## Color

```css
--bg:            #0E0B09;   /* warm black — page base (site's existing dark; keep site's actual value if it differs by ≤ a few points) */
--surface:       #17120E;   /* raised panels, cards */
--surface-2:     #201A12;   /* deep luxury panels (investor register) */
--text-hi:       #F3ECE2;   /* champagne/sand high-contrast text */
--text-lo:       #A99C8C;   /* muted sand */
--accent-1:      #E8A66A;   /* amber light */
--accent-2:      #C56A3D;   /* terracotta */
--accent-solid:  #C97A45;   /* solid CTA fill (existing site CTA color wins if different) */
--eyebrow:       #D08A54;   /* mono eyebrows/labels */
--champagne:     #E7CE86;   /* serif italic emphasis, gold captions */
--gold:          #9C7220;   /* hairlines, AXIONARI mark */
--success:       #5B8C6E;   /* receipt ✓ */
--money:         #D9A441;   /* receipt amounts */
--hairline:      rgba(243,236,226,0.08);
```

Forbidden: any hue with blue/teal/violet dominance. Night-sky moments darken toward `#171310` (warm), never navy.

## Type

- Serif display (site's existing serif) — headlines; italics for the emphasized phrase.
- Mono (site's existing mono) — eyebrows, labels, captions, metadata, receipts, timestamps. CAPS with letter-spacing ≈ .2–.3em at ≤12px.
- Sans (site's existing body) — reading copy, UI text.
- Rule: serif = emotion · mono = system · sans = human.

## Radius & elevation

Cards 20–24px · pills 999px · device bezels per existing demo. No hard shadows: soft warm glows (amber, low opacity) + 1px `--hairline` borders.

## Motion

- Entrances: fade + 12px rise · 700ms · `cubic-bezier(0.16,1,0.3,1)` · on scroll into view, once.
- The sun-arc scrub is the only scroll-bound animation on the page (spec in Phase 3).
- Nothing animates on hover except color/transform ≤ 150ms.
- Every animated element has a `prefers-reduced-motion` fallback (static final state).

## The orb (verified CSS — reuse the site's existing orb if present; this is the reference implementation for new instances)

```css
.orbwrap{position:relative;display:flex;align-items:center;justify-content:center}
.orbwrap .ring{position:absolute;border-radius:50%;border:1px solid rgba(197,124,66,.14)}
.orbwrap .ring.rA{width:158%;height:158%;border-color:rgba(197,124,66,.18)}
.orbwrap .ring.rB{width:225%;height:225%;border-color:rgba(197,124,66,.10)}
.orbwrap .ring.rC{width:300%;height:300%;border-color:rgba(197,124,66,.05)}
.orbwrap .halo{position:absolute;width:230%;height:230%;border-radius:50%;
  background:radial-gradient(circle, rgba(176,118,64,.20), rgba(176,118,64,.07) 45%, transparent 68%);
  filter:blur(6px)}
.orbcore{position:relative;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
  background:radial-gradient(circle at 50% 32%, #B98C58, #8A5F38 45%, #4A3520 78%, #241A11 100%);
  box-shadow:0 0 80px 10px rgba(176,118,64,.22), inset 0 -20px 46px rgba(20,12,6,.55);
  animation:breathe 6s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
```

The orb is never a flat disc. Mic icon stroke `#F3ECE2`; waveform bars `#C5763F`, 5 bars, staggered 1.6s scaleY loop.

## Receipt idiom (G2)

Mono, 12–12.5px, line-height ≈ 2. `✓` in `--success`; route arrows `→` in `--eyebrow`; money in `--money`; IDs/emphasis in `--text-hi`; container `--surface` at 80–92% opacity, blur(8px), 1px `--hairline`, radius 16–18px.
