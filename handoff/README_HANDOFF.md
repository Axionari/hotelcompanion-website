# Hotel Companion — Claude Code Handoff (START HERE)

This bundle is everything Claude Code needs to transform the existing **placecompanion** repo
(`github.com/Axionari/placecompanion`, Next.js 16 / React 19 / Tailwind v4) into **hotelcompanion.ai**
on the Companion OS family design language. It is self-contained — no external content required.

## Files (read in this order)
1. **HotelCompanion__Claude_Code_Build_Brief.md** — THE spec. Role, guardrails, recon, the Companion
   Design System (unified tokens; preserves the existing signature animations), full IA/routing, the
   SMB→enterprise removal list, component architecture, page-by-page section maps, responsive + three-state
   motion rules, phased ID'd tasks (P0–P4) with a Definition of Done + verification protocol. Everything
   points into the content files by `{#anchor}`.
2. **HotelCompanion__Site_Copy.md** — every marketing + legal/trust page, verbatim (EN), with stable `{#anchor}`
   IDs (Home, Platform, Solutions, Enterprise, Companion OS [incl. the 8th capability, Enterprise Analytics],
   Resources, Company, Book a Demo, Contact, Footer, Privacy, Terms, Cookie, Security, Responsible AI,
   Trust Center, Accessibility, 404).
3. **HotelCompanion__Site_Copy_ES.md** — professional Spanish (Batch 1) for the full marketing surface +
   Footer + 404 + Accessibility, mirrored 1:1 on the same anchors. (Legal pages + 12 essays = ES Batch 2, pending.)
4. **HotelCompanion__Library_Essays.md** — the 12-essay Library, all reproduced in full (EN), with front matter
   (slugs, categories, the "Next Article" chain) + the article-template spec.
5. **HotelCompanion__Handoff_Addendum.md** — ROUND 2. Read this if the first build already ran: it resolves the
   open items (8th capability section, Founding CTA target, Accessibility page, McKinsey decision, Spanish wiring)
   with ID'd follow-up tasks.

## How to run it (suggested prompt to Claude Code, from the repo root)
> "Read README_HANDOFF.md, then execute HotelCompanion__Claude_Code_Build_Brief.md against this repo.
>  Copy is canonical — pull it verbatim from HotelCompanion__Site_Copy.md and HotelCompanion__Library_Essays.md
>  by anchor. Work on branch `feat/hotel-companion`, commit per task ID, do not deploy, and STOP and ask on
>  any item the brief flags. Start with Recon (write AUDIT.md), then P0."

## Decisions already locked (in the brief; don't relitigate)
- Hotel Companion is **100% enterprise** — no self-serve pricing/free-trial; primary CTA "Book a Demo."
- Two visible brand layers: **Axionari** + **the Companions**; **Companion OS** is endorsement + one
  platform story, never a third consumer brand. Lockups: "Powered by Companion OS." / "Powered by Axionari."
- Preserve the existing warm-dark art direction + signature animations; converge toward Restaurant
  Companion (~75% shared system / ~25% Hotel soul).
- Rename Place Companion → Hotel Companion everywhere; ban "chatbot."

## Open items the brief will STOP and ask you about (decide up front to avoid stalls)
1. Keep self-serve `/onboarding` reachable, or fully sales-gate it? (P0-4)
2. Spanish (ES) translation approach for all new copy — professional vs. flagged placeholders. (P0-5)
3. Real imagery/brand assets — hero, the in-room tablet render, editorial photography, favicon/OG share
   image, logo lockups — none are in the repo's `public/` yet.
4. Does the McKinsey **$160B** stat carry over as the sourced stake?
5. Legal/Trust bodies — RESOLVED: included verbatim in the copy file. (Counsel review before launch is
   standard, not a build blocker.)
6. Vercel project + `hotelcompanion.ai` DNS target (ties to the Axionari-org migration).
