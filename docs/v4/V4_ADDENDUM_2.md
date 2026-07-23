# V4 ADDENDUM 2 — Phase-3 Rulings: CTA Hierarchy, Headings, Gold Scope
Product owner rulings, Jul 22 2026. Amends `V4_BUILD_KIT.md` §3 (Act VII
action slot) and closes the Phase-3 blockers. The governing document for all
Phase-3 implementation is `PRODUCT_ARCHITECTURE.md` at the repository root —
where any older specification (including this kit) conflicts with it, the
constitution wins.

## A — Act VII CTA (amends kit §3, APPROVED)

The homepage's job is to generate customers. The Founding Partner Program is
a strategic opportunity, not the primary conversion objective. The hierarchy
becomes:

```
Partner signal   (the partner line, retained as a subtle scarcity signal)
        ↓
Book a Demo      (primary action → /demo)
```

- Action: `Book a Demo` / ES `Agenda una Demo` (the existing site string;
  no new copy), styled as the site's primary pill.
- The partner line `Now partnering with a limited number of visionary hotel
  groups.` / `Ahora nos asociamos con un número limitado de grupos hoteleros
  visionarios.` stays, above the action.
- `BECOME A FOUNDING PARTNER` / `CONVIÉRTETE EN SOCIO FUNDADOR` retires from
  the homepage. The program's canonical (and only full) telling is
  `/contact#founding`; a quiet text link sits under the /demo form.

## B — Surviving headings (APPROVED wholesale)

The merged-section headings named in the Phase-3 plan are approved without a
further review cycle. Headings are implementation details under the
constitution's constraints; a weak heading is a copy iteration, not an
architectural issue.

## C — Gold token scope (APPROVED, in scope everywhere)

One brand, one gold, one design language: `#C9A15A` unifies the gold family
site-wide, including legal and app routes. Legacy values (`#9C7220`,
`#C9A87A`) retire.

## D — Execution order

Implement on a dedicated branch (`v4-phase3`) · preview deployment · full
validation suite (updated gates + narrative-ownership check + anchor check) ·
before/after implementation report · STOP. No merge until visually reviewed
and approved.
