# Hotel Companion — Handoff Addendum (Round 2)

Follow-up for Claude Code after the first `feat/hotel-companion` build. These resolve the open items from that
build's report. Apply on the same branch; commit per item ID; do not deploy.

## Decisions made (Eduardo, July 2026)

**A2-1 · 8th capability section — RESOLVED (content added).**
The canonical taxonomy is 8; the copy previously had only 7 Companion OS deep-dives. The missing **Enterprise
Analytics** deep-dive is now written and lives in `HotelCompanion__Site_Copy.md` at `#companionos-analytics`
(ES at the same anchor in `HotelCompanion__Site_Copy_ES.md`). Insert it on `/companion-os` between
`#companionos-operational` and `#companionos-learning`, and **remove the deep-link workaround** — the Enterprise
Analytics tile now links to its own section. DoD: `/companion-os` renders 8 deep-dive sections in taxonomy
order; the capability grid's 8 tiles each anchor to a real section.

**A2-2 · Founding Partner CTA destination — DECIDED: `/contact#founding`.**
Point every "Founding Partner" / "Become a Founding Partner" CTA (home `#home-founding-partner`, company
`#company-founding-partners`, footer "Founding Partner Program", contact `#contact-founding`) at
`/contact#founding` (the shipped "Join the Founding Partner Program" block). Reuses existing copy; no new page.
DoD: all founding CTAs resolve to `/contact#founding`; the anchor exists and clears the fixed nav.

**A2-3 · Accessibility page — ADD IT.**
New route `/accessibility` from `#accessibility` (EN) / `#accessibility` (ES). Restore the footer "Accessibility"
link to point there. New contact address `accessibility@hotelcompanion.ai`. DoD: `/accessibility` renders in
EN+ES; footer link resolves; no dead link.

**A2-4 · McKinsey $160B stat — KEEP (Eduardo confirms the source).**
Retain the $160B / McKinsey framing where the design uses a sourced stake. Eduardo verifies the citation
(exact figure, report, year) before public launch. Until confirmed in-repo, leave the citation string exactly
as approved; do NOT invent a different number. (This is the one remaining `NEEDS CONFIRM` and it's a Eduardo
task, not a code change.)

**A2-5 · Spanish — professional ES delivered (Batch 1).**
`HotelCompanion__Site_Copy_ES.md` now contains human, professional Spanish (neutral / Mexico register) for the
ENTIRE guest- and buyer-facing surface: Home, Platform, Solutions, Enterprise, Companion OS (incl. the new
Enterprise Analytics section), Resources, Company, Book a Demo, Contact, Footer, 404, and Accessibility — mirrored
1:1 on the same `{#anchor}` IDs. Replace the `NEEDS ES` placeholders for these pages with these strings in
`translations.ts`. Keep product names in English (Hotel Companion, Companion OS, Axionari); CTA label is
**"Agenda una Demo."** DoD: EN/ES toggle renders real Spanish (no `NEEDS ES`) on every page listed above; no
missing-key errors.

**A2-6 · Spanish Batch 2 — DELIVERED (site is now fully bilingual at the copy layer).**
`HotelCompanion__Site_Copy_ES.md` now also contains the six legal/trust pages (`#privacy`, `#terms`, `#cookies`,
`#security`, `#responsible-ai`, `#trust-center`) — full parity: **all 133 page anchors exist in EN and ES.**
The 12 Library essays are fully translated in `HotelCompanion__Library_Essays_ES.md` (`#essay-01`…`#essay-12`,
same slugs, same "Siguiente Artículo →" chain, essay 12 Epilogue). There are **no remaining `NEEDS ES` markers**
to leave in place — wire every page's ES strings. Note on the legal ES: it is a professional translation but
**flag it for counsel review before public launch** (the EN legal text carries the same caveat). DoD: EN/ES
toggle renders real Spanish site-wide incl. legal + all 12 essays; zero `NEEDS ES`; no missing-key errors.

## Still Eduardo's to provide (not code; unchanged from the brief's open items)
1. Self-serve `/onboarding`: keep reachable (utility Sign In only) or fully sales-gate? (P0-4 — still open.)
2. Resend: done 2026-07-30 — `from` is `no-reply@axionari.com` (axionari.com is the only Resend-verified
   sending domain), recipient `sales@axionari.com`, `DEMO_REQUEST_TO` set in all environments.
   hotelcompanion.ai has no MX and an apex SPF of `v=spf1 -all` **by design** — never register it in Resend.
3. Real imagery/brand assets — hero, in-room tablet render, editorial photography, favicon/OG share image,
   logo lockups. `public/` still holds only default Next SVGs.
4. Vercel project + `hotelcompanion.ai` DNS target (Axionari-org migration) — needed for the Vercel preview so
   Lighthouse, on-device passes, and motion recordings can be captured against a baseline.

## Suggested Round-2 commit order
A2-1 (8th section + remove workaround) → A2-3 (accessibility page + footer link) → A2-2 (founding CTAs) →
A2-5 (wire ES Batch 1 into translations) → re-run the brief's consistency + link + no-dead-anchor gates →
update VERIFICATION.md.

---

# Round 3 — Preserve the best of placecompanion.com

Rationale + full KEEP/ADAPT/DROP reasoning: `HotelCompanion__Preservation_Analysis.md`. Net effect: the enterprise
deck keeps its spine; we re-inject the current site's concrete proof. 12 new approved sections, EN + ES, at these
anchors in `HotelCompanion__Site_Copy.md` / `_ES.md` (146/146 EN/ES parity verified).

- **A3-1 `#home-stake`** — the McKinsey $160B opportunity stake ("annual value & operational savings AI automation can unlock for hospitality"). Place on Home right after `#home-trust`. `{/* NEEDS CONFIRM */}` on the figure (Eduardo has the source; use now). ES renders the number as "$160 mil millones."
- **A3-2 `#company-why-hotels`** — the "same 200 questions / walked out the door when they clocked off" problem section. Place on Company after `#company-hero`, before `#company-belief`. **Strongest copy on the site — render verbatim, do not dilute.**
- **A3-3 `#platform-not-generic-ai`** — "they needed a conversation, not a redirect." Platform, near `#platform-knows-property`.
- **A3-4 `#platform-lifecycle`** — Before/During/After + the review loop. Platform, after `#platform-destination`.
- **A3-5 `#enterprise-what-it-is-not`** — the "Not a PMS / generic assistant / app / rip-and-replace" category boundaries + complements-not-replaces. Enterprise, near `#enterprise-integrates`. Anchor id must be `what-it-is-not` (the Home teaser links `/enterprise#what-it-is-not`).
- **A3-6 `#platform-issue-detection`** — the two-stage 2 AM maintenance-alert mechanic. Platform; also deepens `#solutions-engineering`. (Maps to the repo's real `issue-detection.ts`.)
- **A3-7 `#home-what-it-is-not-teaser`** — short Home strip linking to A3-5.
- **A3-8 `#home-revenue-example`** — the live 10:14 PM ocean-view-suite upgrade + "Investment: covered." Fold into `#home-revenue` (ideal content for the interactive demo module / `RoutingDiagram` sibling).
- **Enrichments (replace/augment existing sections, don't duplicate):**
  - `#platform-five-voices` → **replace** the adjective stack in `#platform-your-voice` with the five named voices (Warm & Local, Refined Concierge, Barefoot Luxury, Playful Explorer, Zen & Mindful).
  - `#platform-channels` → **merge** into `#platform-voice-first`'s channel list (in-room tablet + QR + website widget + shareable link + voice).
  - `#platform-destination-examples` → **add** the vivid examples (no-seaweed beach, locals on a Tuesday, pharmacy Sunday) into `#platform-destination`.
  - `#dashboards-resolution` → proof stat (91% resolved / 9% escalated) into `#platform-dashboards` + `#enterprise-dashboards`. `{/* NEEDS CONFIRM */}`.

**Two numbers are now on the site and both are `NEEDS CONFIRM`:** `$160B` (A3-1) and `91%/9%` (A3-9 dashboards). Keep them (Eduardo's call); verify before public launch; do not add a third unverified stat.

**Suggested commit order:** A3-2 (Company problem) → A3-1 (Home stake) → A3-3 → A3-4 → A3-5 (+ `#what-it-is-not` id) → A3-6 → A3-8 → enrichments (five voices / channels / destination / dashboards) → A3-7 teaser → re-run link/anchor + ES-parity gates → update VERIFICATION.md.
