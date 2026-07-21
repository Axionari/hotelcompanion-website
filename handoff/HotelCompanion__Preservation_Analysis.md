# Preservation Analysis — What to Keep from placecompanion.com

**Date:** July 20, 2026 · Reviewed the live site: Home, `/features`, `/about`.
**Question:** The enterprise copy deck is new, but the current site has strong, concrete copy and real product detail. What do we keep, and where does it land in the Hotel Companion enterprise IA?

## The core finding

The new enterprise deck is *elevated* — abstract, confident, executive. The current site is *concrete* — visceral, specific, and in several places it out-writes the deck. **The current site's best asset is its concreteness.** Enterprise buyers are convinced by *specifics* (the exact upgrade, the 2 AM leak, the 200 repeated questions, "they needed a conversation, not a redirect") far more than by abstractions ("operational intelligence," "coordinated execution"). The move is not to choose one register over the other — it's to **keep the deck's enterprise spine and re-inject the current site's concrete proof into it.**

Three things the current site does that the deck doesn't, and that we must not lose:
1. **A sourced industry stake** — the McKinsey $160B figure (the value AI automation can *unlock* for hospitality). The deck opens with an abstract value promise; a hard, sourced number makes it concrete and CFO-legible.
2. **Product specificity that reads as "this is real, not vaporware"** — the five named voices, the two-stage maintenance alert, the four access channels, the 91% resolution rate, the live upgrade example with a dollar amount.
3. **The sharpest problem/differentiator writing in the whole property** — the About page. "The same 200 questions." "Walked out the door every time they clocked off." "The guest was already on your website. They needed a conversation, not a redirect." This is better than anything in the deck and must be preserved.

## Verdict framework

- **KEEP** — carry the copy/idea nearly verbatim into the enterprise site; it's gold and enterprise-appropriate.
- **ADAPT** — keep the substance, lift the register from SMB→enterprise (or add the new Hotel-unique surface).
- **ALREADY** — the deck already has an enterprise version; merge the site's concrete flavor into it.
- **DROP** — SMB-coded and conflicts with the 100%-enterprise reposition.

## Asset-by-asset

| # | Current-site asset | Verdict | Reasoning | Lands in (anchor) |
|---|---|---|---|---|
| 1 | **Sourced industry stake — McKinsey $160B in annual value & operational savings AI automation can unlock for hospitality** (upgraded from the site's original $47B/Medallia loss stat) | **KEEP** | The hard number the deck lacks; opportunity/upside framing pairs with the 91% resolution proof. Eduardo has the source; use now, verify exact report before launch. | Home — new `#home-stake` (right after Trust strip) |
| 2 | **"Guests are asking. Right now." live question marquee** (tacos after midnight, is the ocean safe, check out at 1pm, sunset cocktails, crib for the baby, pharmacy Sunday, masseur…) | **KEEP** | This IS the signature animation already preserved (`QuestionMarquee`). The specific questions are the gold — concrete, evocative, bilingual. Lock this exact question set as the marquee content. | Home hero / `#home-conversation` (marquee content) |
| 3 | **"Every conversation becomes action" — tabbed Upgrade/Spa/Late-checkout/Maintenance + live ocean-view-suite example ($250/night → "One upgrade. Investment: covered.")** | **KEEP** | Concrete, interactive, and the "Investment: covered" line is an ROI punchline enterprise buyers love. Stronger than the deck's abstract revenue section. | Home `#home-revenue` (add the interactive example + the ROI beat) |
| 4 | **Guest lifecycle: PRE-ARRIVAL / DURING STAY / AFTER STAY** ("link in the booking confirmation… QR in every space… warm follow-up → review"; "Happy guests become public advocates") | **KEEP (high value)** | A whole narrative the deck is missing: the assistant spans the entire journey, and closes the loop on *reviews/reputation* — a real revenue/brand lever. | Platform — new `#platform-lifecycle` |
| 5 | **Five named voices: Warm & Local · Refined Concierge · Barefoot Luxury · Playful Explorer · Zen & Mindful** | **KEEP (adapt)** | The deck's "Speaks in Your Hotel's Voice" lists adjectives; the site *productizes* five named styles — far more tangible and demoable. White-label voice is enterprise-fine. | Platform `#platform-your-voice` (replace adjective list with the 5 named styles) |
| 6 | **"Never miss a guest issue" — leak/AC/no-hot-water → multilingual detection → room number captured → two-stage email alert → guest reassured ("never a dead end at 2 AM")** | **KEEP (high value)** | The most concrete operational proof on the site, and it's a *real shipped capability* (the repo has `issue-detection.ts`). The deck's maintenance section is abstract by comparison. | Solutions `#solutions-engineering` + new `#platform-issue-detection` |
| 7 | **Access channels: QR codes · website widget · shareable link (booking confirmation / WhatsApp)** | **ADAPT** | Keep the three concrete channels; **add the in-room tablet** (Hotel Companion's new hero surface) and future voice. Result: tablet + QR + web widget + shareable link + voice. | Platform `#platform-voice-first` (channel list) |
| 8 | **Positioning-by-negation: "Not a PMS · Not a chatbot · Not an app · Not an integration" + "complements the systems you already use" ("Your PMS manages reservations… Place Companion understands guest conversations")** | **KEEP (high value)** | Crisp category boundaries are exactly what enterprise diligence rewards; softer than the deck's `#enterprise-integrates`. Reframe "chatbot" per the ban. | Enterprise — new `#enterprise-what-it-is-not` (+ teaser on Home) |
| 9 | **About: the visceral problem** — "the same 200 questions, every day… answers live in the heads of three people… the room upgrade that never got offered, the dinner reservation that never got made, the guest who left without a review" | **KEEP (highest-value copy)** | The best writing on the property. Concrete, ROI-laden, memorable. The deck's Company page is abstract next to it. | Company `#company-why-hotels` (new) + seeds Home problem framing |
| 10 | **About: "Generic AI knows everything about everywhere"** — "it will guess, hallucinate, or tell the guest to check your website. The guest was already on your website. They needed a conversation, not a redirect." | **KEEP (high value)** | The sharpest differentiator on the site — trained/contextual knowledge vs. general LLM. A tighter version of the "Beyond the AI Concierge" essay. | Platform — new `#platform-not-generic-ai` |
| 11 | **About: "walked out the door every time they clocked off"** (knowledge lives in the best team member's head) | **KEEP** | Echoes essays 05/06 in one line. Preserve verbatim as a pull-quote. | Company `#company-why-hotels` (pull-quote) |
| 12 | **Dual knowledge: YOUR HOTEL / YOUR DESTINATION**, with vivid examples (no-seaweed beach this week, where locals eat on a Tuesday, pharmacy Sunday morning, where to watch the sunset) | **ALREADY (merge flavor)** | Deck has `#platform-knows-property` + `#platform-destination` as noun lists; inject the site's vivid examples for texture. | `#platform-destination` (add the vivid examples) |
| 13 | **Dashboard "command center" — 91% resolved by AI / 9% escalated ("only what genuinely needs a human"), questions/month, multi-property** | **KEEP (adapt) — VERIFY STAT** | Strong proof. The 91%/9% framing is excellent *if defensible*; treat as `NEEDS CONFIRM` like the $160B until validated. Dashboard visual feeds the Executive Dashboards section. | `#platform-dashboards` / `#enterprise-dashboards` (proof stat, flagged) |
| 14 | **Marina persona + sample properties (MarAzul Riviera Maya, Casa Sol Tulum, Villa del Mar)** | **KEEP as demo device** | A named assistant + sample property makes the demo tangible. It's a demo device, not a brand layer — resolves the earlier "persona?" question: yes, in the interactive demo only. | Interactive demo content (Home hero / `/demo`) |
| 15 | **"Live in minutes / paste your website & the AI reads it"** | **ADAPT** | The self-serve "minutes" headline conflicts with the enterprise "deploy in weeks, guided" posture — DROP as a headline. But **keep the auto-ingestion capability** (paste site/guest guide → assistant built) as a *deployment* proof under Knowledge Configuration. | `#enterprise-deploy` / `#demo-deployment` (capability, not headline) |
| 16 | **Founding Partner "lifetime rates / 3 of 5 spots"** | **DROP framing (idea already kept)** | SMB scarcity/pricing. The co-creation/limited-partners idea already lives as the enterprise design-partner program → `/contact#founding`. | — |
| 17 | **Pricing tiers $199/$599/Custom** | **DROP** | Already removed in the enterprise reposition. | — |
| 18 | **FAQ ("Common questions")** — concrete answers on voices, the two-email alert, no-app access | **ALREADY (merge)** | Deck has FAQs; import the *concrete* current answers (five voices, two-stage alert) minus the "30 minutes/free trial" SMB bits. | `#home-faq` / `#platform` FAQ |

## What this adds to the build (net-new copy the deck didn't have)

Priority order for Claude Code (all as approved copy in the Site Copy files, EN + ES):
1. `#home-stake` — the McKinsey $160B opportunity stake (Home, after Trust). **[Eduardo has the source; verify exact report before launch]**
2. `#company-why-hotels` — the visceral problem + "clocked off" pull-quote (Company). *Best copy on the site — do not dilute.*
3. `#platform-not-generic-ai` — "needed a conversation, not a redirect" differentiator (Platform).
4. `#platform-lifecycle` — Pre-Arrival / During / After + review loop (Platform).
5. `#enterprise-what-it-is-not` — the "Not a…" category boundaries + complements-not-replaces (Enterprise; teaser on Home).
6. `#platform-issue-detection` — the two-stage maintenance-alert mechanic (Platform; deepens `#solutions-engineering`).
7. Enrich `#platform-your-voice` with the five named voices; `#platform-voice-first` channels with tablet+QR+widget+link+voice; `#platform-destination` with the vivid examples; `#home-revenue` with the live upgrade example + "Investment: covered."
8. Proof stat 91%/9% into the dashboards sections — flagged `NEEDS CONFIRM`.

Everything above is written out verbatim (EN + ES) in `HotelCompanion__Site_Copy.md` / `_ES.md` at the listed anchors, and summarized for Claude Code in the Round-3 addendum.

## One caution

Two numbers now live on the site — **$160B** and **91%/9%**. Both are persuasive precisely because they're specific, and both are `NEEDS CONFIRM` until sourced. Keep them (Eduardo's call), but treat them like any sourced claim: verify before public launch, and don't let a second unverified stat creep in. Concreteness is the current site's superpower; fabricated concreteness would be its worst liability.
