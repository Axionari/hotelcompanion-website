# PHASE 3 — The Two Heroes

Reference image: `docs/v3/reference/sun-arc-8a-top.jpg` (composition + palette target for the arc).

## 3A — Section 04: the Sun Arc (Cada Conversación Es Ingreso)

**Layout (desktop ≥1024):**
- Full-width dark stage. Serif headline top-left; right-aligned caption (copy deck).
- A circular arc (SVG path or bordered circle segment), stroke `rgba(197,124,66,.18)`, spanning ~86% viewport width; horizon endpoints at the section's lower third.
- The orb (tokens spec, 72–96px) sits ON the arc; mono label beneath it (`UNA VOZ · MEDIODÍA` swaps to the active stop's time label when scrubbing).
- Five stops distributed along the arc at angles ≈ −72° · −36° · 0° · +36° · +72° (left/dawn → right/night). Each stop: big serif time (28–44px, `--champagne`) + mono device tag + the mini-UI hanging below (mini-UIs are compact device frames ~200–260px wide reusing existing demo visual language + real assets; content per copy deck) + `ReceiptCard sm` where the deck specifies.
- Sky: the stage background is a horizontal gradient that warms/darkens left→right: `#241B10` (dawn) → `#2A1D10` (noon, faint amber glow behind orb) → `#2B1810` (golden hour) → `#171310` (night — warm, never navy). Implement as layered radial/linear gradients whose opacity is driven by scrub progress.
- Epilogue below the arc: existing ticker component, then closing line (copy deck), then the existing tablet demo (unmoved).

**Motion:**
- Section pins for 250vh of scroll (position: sticky stage). Scroll progress `p ∈ [0,1]` maps the orb's position along the arc from stop 1 to stop 5 (linear in angle, eased `cubic-bezier(0.16,1,0.3,1)` per-frame smoothing).
- Each stop's mini-UI + receipt fades in (300ms) when `p` crosses its position −0.06 and stays visible. Sky gradient interpolates with `p`. Orb label swaps to the nearest stop's time.
- Transform/opacity only; target 60fps (no layout thrash — measure once, use `will-change: transform`).
- `prefers-reduced-motion`: no pin; orb static at noon; all five stops visible; sky static mid-gradient.

**Mobile (<768):** no pin. Thin vertical timeline rail on the left (2px, gold hairline) with the orb at top; stops stack vertically in time order, each with its time, tag, mini-UI, receipt; sky gradient runs top→bottom dawn→night.

## 3B — Section 05: the Constellation (Una conversación, cada pantalla)

**Layout (desktop):**
- One composed still, ~90vh: six devices overlapping in depth with realistic bezels — laptop/web (rear, right), in-room TV (rear, left-center), in-room tablet (mid, center — largest), phone (front-left), watch (front-center-right), voice puck (front-right: a small dark rounded speaker disc with the amber orb glow on top — NOT a gray blob).
- Screen contents reuse existing real assets/components: web = Ocean-View booking card (`0% COMISIÓN` chip); TV = `Welcome, Maya` + terraza/golden-hour line; tablet = Akumal answer card with the question top-right; phone = orb home state (`Talk or type` per existing demo locale strings); watch = `20 min · SPA IXCHEL`.
- One question (`¿La mejor playa cerca?` / `Best beach near here?`) renders once, on the tablet; a faint gold hairline thread connects the devices left→right (static, opacity .15).
- Mono role caption under each device (copy deck). Right-aligned intro caption. Closing line centered below (copy deck).
- Photography: device screens use the real assets from SITE_MAP (Akumal aerial, suite/lobby imagery). Zero placeholder stripes.

**Motion:** devices rise+fade in staggered 80ms as the section enters; thread draws once (600ms). Reduced motion: static.

**Mobile:** horizontal swipe row (scroll-snap) of the six devices at readable size, captions beneath each; closing line after the row.

**Removal:** the old 8-vignette bento markup is deleted in this phase (its assets are reused above).

## Gate
- [ ] Desktop scrub: orb visibly travels stop 1→5; sky shifts; each stop appears at its threshold. Screen-record a full scroll-through, attach.
- [ ] 60fps: performance trace attached (Chrome DevTools, main-thread frames during scrub; no frame >32ms sustained).
- [ ] Reduced-motion audit: both sections static and complete (screenshots).
- [ ] Mobile 375px: arc = vertical rail (screenshot); constellation = snap row (screenshot).
- [ ] Zero placeholder/striped backgrounds; zero non-token colors (grep new CSS).
- [ ] Closing lines render verbatim (grep both locales).
- [ ] Ticker + tablet demo still function identically (manual check, noted in report).
- [ ] Old bento strings gone: `KIOSCO DEL LOBBY` · `GAFAS AR` → 0 matches.
- STOP for approval.
