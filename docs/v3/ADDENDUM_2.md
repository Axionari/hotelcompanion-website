# ADDENDUM 2 to the v3 Kit — Constellation Fidelity Directive (A4)

Place at `docs/v3/ADDENDUM_2.md`. Amends `specs/PHASE_3_HEROES.md` §3B. Rules of `01_RULES.md` apply.

## The ruling (panel + Eduardo, July 22)

**A4 — approved.** Section 05's constellation must reproduce the Claude Design reference ("Homepage Concepts" section 7a) **exactly at the device level**: frame construction, materials, radii, shadows, overlap order, scale relationships, caption treatment, and composition. "Exactly" applies to the devices and composition; the **copy remains the v3 copy deck's** (ES/EN role captions, headline, closing line — NOT the reference's English strings), and **screen contents use the repo's real assets** where the deck says so (the reference's striped placeholders never ship).

## Geometry source of truth (two-tier)

1. **If `docs/v3/reference/homepage-concepts.dc.html` exists** (Eduardo is exporting it from Claude Design into the project folder): extract section 7a's markup and styles from that file and port them 1:1 into the React implementation — same dimensions, same CSS values, same stacking. This file is authoritative for geometry/materials. Strings and screen contents are then swapped per the copy deck. Any deliberate deviation (responsive adaptation, token substitution) is listed in the phase report.
2. **If the file is absent at build time**, build from the forensic spec below + `docs/v3/reference/` images, matching the reference screenshot to visual tolerance (side-by-side overlay in the report).

## Forensic spec (from the approved reference screenshot, 1272px frame)

**Composition (desktop, section inner width ≈ 1200px):**
- Six devices, overlapping, on the warm-black stage with a faint radial amber vignette bottom-center.
- **Desktop monitor** (web/booking) — rear layer, right-of-center; screen ≈ 560×260; thin light bezel; trapezoidal aluminum stand + rounded foot bar below, rendered as soft gray gradient (#6a6a6a→#3a3a3a).
- **In-room tablet (portrait)** — front-center, the largest and visually dominant; screen ≈ 360×550; overlaps the monitor's left edge.
- **Smartphone** — mid-left, portrait, ≈ 250×500; slightly behind the tablet's left edge; shows orb home state.
- **Watch** — front, tucked between phone and tablet at their lower overlap, ≈ 95×110 squircle screen with strap stubs above/below in near-black (#241c14).
- **In-room TV (landscape)** — lower-right, ≈ 420×205, slightly behind the tablet's right edge.
- **Voice puck** — front-center-right, below the tablet: a soft gray ellipsoid dome ≈ 150×85 (radial gradient #b9b9b9 → #7c7c7c, darker underside) with a small amber orb lens (radial #E8A66A→#C56A3D, ≈22px) set on its upper surface. It is a hardware object, not a UI frame.

**Frame construction (all screen devices):**
- Outer metallic rim: 2px, light gradient stroke (#9c9c9c → #d9d9d9 top-light), giving the pale silver edge visible in the reference.
- Inner bezel: near-black (#0b0908), phone ≈ 10px / tablet ≈ 12px / monitor & TV ≈ 8px / watch ≈ 8px.
- Corner radii (outer): phone ≈ 44px · tablet ≈ 40px · monitor ≈ 22px · TV ≈ 22px · watch ≈ 30px (squircle feel).
- Phone shows a slim rounded notch/island bar at screen top (dark pill ≈ 90×22 centered).
- Shadows: one soft deep drop per device — `0 34px 70px -24px rgba(0,0,0,.65)` — plus a 1px hairline separation glow where devices overlap. No hard edges.

**Screen treatments:**
- Tablet: full-bleed Akumal aerial (real asset) with status row (MARAZUL pill · LISTENING) and the question top-right; answer block bottom-left (serif title, gold caption, solid + ghost buttons).
- Monitor: booking UI on `--surface` (URL pill · `0% COMMISSION` mono right · suite thumb (real asset) · serif suite name, gold price line, meta line, solid CTA).
- Phone: centered orb (tokens spec, with ring) + "listening" line + two suggestion pills + ghost input pill.
- Watch: centered small orb dot + `20 min` serif + `SPA IXCHEL` mono.
- TV: full-bleed warm suite/lobby imagery (real asset) with `GOOD AFTERNOON · SUITE 214` eyebrow + serif greeting + one meta line.
- Captions beneath/beside each device: mono, ~10px, letter-spacing .28em, `--text-lo` at ~65% opacity, device name + role (strings from the copy deck).

**Stage:** headline row per copy deck; hairline divider + centered closing line at bottom; faint amber radial glow behind the cluster (`radial-gradient` ≈ 60% width, rgba(232,166,106,.10), blur).

## Gate additions (Phase 3B)

- [ ] Side-by-side overlay: implementation screenshot vs `docs/v3/reference/` constellation image at 1440px — device count, positions, overlap order, and frame construction visibly match; differences enumerated and justified (copy/assets/responsiveness only).
- [ ] If the `.dc.html` was used: diff summary of ported CSS vs source noted in the report.
- [ ] The voice puck renders as the domed hardware object described above — never a flat gray blob.
- [ ] All six screens show real assets or token UI — zero striped placeholders (existing gate, reaffirmed).
