# PRODUCT ARCHITECTURE — Hotel Companion Website

**This document is the constitution for the Hotel Companion website.**
Every future change — by any engineer, human or AI — is checked against this
document first. If a proposed section, page, message, or interaction conflicts
with it, the proposal is wrong or this document gets amended deliberately;
nothing drifts. It was produced and approved through the Phase-3 buyer-journey
review (July 2026) and supersedes ad-hoc page-level reasoning.

Status of record: approved architecture; implementation pending the two
sign-offs listed in §13.

---

## 1 · North Star

Hotel Companion is not a website. It is the first conversation a customer has
with our company.

Every page should feel like an exceptional hospitality professional. The
visitor should never feel overwhelmed, pressured, or confused. Every
interaction should make them feel:

- welcomed
- understood
- informed
- confident
- curious to continue

The website embodies the same hospitality principles Hotel Companion delivers
to guests. When making any implementation decision, ask:

> **Would an exceptional concierge communicate this way?**

If not, redesign the interaction. The experience should feel calm, confident,
and effortless. Not clever. Not busy. Not sales-driven.

**Hospitality first. Technology second.**
Hotel Companion isn't selling software. It's selling hospitality — and that is
reflected everywhere, including here.

## 2 · Do Not Regress

The following are signature assets. They must not be weakened by any
implementation work, ever, without explicit owner approval.

**Homepage**
- the live conversational hero (the ask bar IS the product)
- the seven-act narrative
- the day progression (10:04 → 18:40 → 02:14) and the `--day` light ramp
- the receipt visualization (Act V)
- the constellation visualization (Act IV)
- the Live in Days act
- the premium pacing and whitespace

**Design**
- restrained typography (Fraunces / Spline Sans Mono / General Sans — the family system)
- cinematic visual rhythm
- dark luxury palette (warm neutrals, terracotta actions, cream emphasis)
- conversational interface (the vux VoiceOrb stack — never a sphere, dome, or sun)
- premium motion (the family reveal values; the orb's own states; nothing bespoke)
- minimal chrome (one nav, one footer, no persistent popups)

**Product positioning.** Hotel Companion is *proactive, conversational,
operational, intelligent*. It is **not** a chatbot, an AI concierge, a booking
engine, or a support widget. No copy, component, or interaction may regress
toward those categories — if a change makes the product read like any of them,
the change is wrong.

## 3 · The Buyer Journey

The website is a sales conversation, not documentation. Documentation asks
"where should this information live?" A sales journey asks "**when should the
buyer learn this?**"

**The spine:** Home → Platform → Enterprise (or Solutions) → Demo.

**The emotional journey:** Curiosity → Understanding → Confidence → Trust → Action.
Every page moves the visitor exactly one emotional step forward. If two pages
produce the same emotional outcome by the same mechanism, one is redundant.

| Page | Emotional step | Mechanism |
|---|---|---|
| Home | Curiosity | The product performs instead of explaining |
| Platform | Understanding | Three capability chapters answer "what does it do" — completely, and nothing else |
| Solutions | Confidence (fit) | "It works for my department / my property type" — application, never capability re-teaching |
| Enterprise | Confidence (deployment) | Risk removal: trust architecture, boundaries, deployment |
| Company | Trust | Belief in the builders — the only page allowed narrative depth |
| Demo | Action | Form at position 2; everything below it dissolves hesitation |
| Contact | Action (alternate door) | Conversation + the Founding Partner Program (canonical home) |
| Resources | Trust (sustained) | Editorial nurture loop outside the linear journey; teaches, never sells |
| Companion OS | Trust (foundation) | Platform philosophy for the strategic minority |

People don't buy because they understand. They buy because they trust.

## 4 · Page Responsibility Matrix

One purpose per page. One primary question per page. One primary CTA
site-wide: **Book a Demo** (secondary: **See It Live**).

| Page | Job | The one question it answers |
|---|---|---|
| **/** | Create excitement and curiosity; earn the demo | "What is this and why should I care?" |
| **/platform** | Explain what the product actually is. Owns capabilities: conversation, knowledge, workflows, execution, guest intelligence, dashboards | "What does it actually do?" |
| **/solutions** | Show relevance. Application, not capabilities | "How does this help my type of business?" |
| **/enterprise** | Remove risk. Owns security, governance, administration, compliance, deployment, scale, integration | "Can my organization trust and deploy this?" |
| **/companion-os** | Explain the technology philosophy — the platform behind the ecosystem. Architecture, not features | "What powers every Companion?" |
| **/company** | Build trust through story. Deliberately narrative; quality over brevity | "Why should I believe you?" |
| **/resources** | Teach. Editorial, never promotional | "What can I learn from these people?" |
| **/demo** | Generate meetings. Form as high as possible; all other content exists to reduce hesitation | "How do I see it live?" |
| **/contact** | Start a conversation; canonical (and only full) Founding Partner telling | "How do I reach you / join?" |

The homepage never explains features, Companion OS, enterprise architecture,
or governance. No other page may teach in detail what Platform owns. No page
but Enterprise removes risk. Companion OS is never confused with Hotel
Companion.

## 5 · Homepage Architecture (locked)

Seven acts, this order, nothing added, no intermediate CTAs:

1. **Hero** — the product, live (ask bar + voice-orb)
2. **Stakes** — the arithmetic (2–3× · $160B)
3. **One Day** — the story (10:04 · 18:40 · 02:14)
4. **Every Screen** — the constellation
5. **Conversation → Execution** — the receipt
6. **Live in Days** — ease + trust chips (names only)
7. **Ask It** — the close: ask bar + **Book a Demo** (primary), Founding
   Partner partner-line as tease

The page opens and closes as a conversation. The nav pill carries the CTA
between acts; no mid-page CTA bands.

## 6 · Narrative Ownership

Every major idea has exactly one owner and a defined lifecycle:
**Tease** (name it, never explain) · **Introduce** · **Expand** ·
**Reinforce** · **Silent** (never mention).

| Concept | Tease | Introduce | Expand | Reinforce | Silent |
|---|---|---|---|---|---|
| Voice-first interface | — | Home Act I (experienced) | Platform | Demo (try-it) | Enterprise, Company, Solutions, COS |
| Conversation intelligence | Home Act V | Platform §Intelligence | — | Enterprise (operator lens) | Company, Resources, Contact, COS |
| Revenue / direct economics | Home Act II | Home Act III | Platform §Intelligence | Solutions (application) | Enterprise, Company, Resources |
| Every surface | Home Act IV | Platform | — | Demo FAQ ("app?") | Solutions, Enterprise, Company |
| Execution / routing | Home Act V | Platform §Lifecycle | Solutions §Departments | — | Enterprise (outcomes only), Company |
| Enterprise trust | Home Act VI chips (names only) | Enterprise §Trust architecture | Enterprise §Deployment & fit | Demo FAQ | Home acts, Platform, Solutions, Resources, Company |
| Deployment ease | Home Act VI statement | Enterprise §Deployment & fit | — | Demo (§after-submit + FAQ) | Platform, Solutions, Company |
| Companion OS | Footer line (every page — the only sanctioned cross-reference) | /companion-os | Company §Built by Axionari (as credibility) | — | Platform, Solutions, Enterprise, Home acts, Demo, Resources, Contact |
| Founding Partner Program | Home Act VII partner line | Contact §founding (sole full telling) | — | Demo (text link under form) | Company, Platform, Solutions, Enterprise, Resources |
| Hospitality philosophy | Home Act V "0 woke your staff" (embodied) | Company §Manifesto | — | — | Platform, Enterprise, Solutions, Demo, Resources |

**The pointer rule:** a page gets exactly **one** forward handoff link — its
next journey stage. Every other cross-reference is carried by the footer or by
silence. "One-line pointers" are how duplication regrows; they are banned.

Introduce once. Expand once. Reference sparingly. Never re-explain.

## 7 · Preserve Mystery

Enterprise software reveals itself progressively. Information revealed too
early destroys the motivation to continue.

1. **Home demonstrates, rather than explains.** The homepage does explain —
   through experience instead of exposition. That is the philosophy of the
   entire product. The acts stay caption-free; if an act fails to create the
   itch, the fix is craft, not prose.
2. Platform's scale-and-trust band is a **tease** (≤40 words: the enterprise
   question named + the handoff link). The answers live only on Enterprise.
3. Act VI's trust chips never gain tooltips, popovers, or sublines. The gap
   between the name and the explanation is the motivation to keep going.
4. Demo re-pitches nothing. By arrival, persuasion is spent; only hesitation
   removal remains.
5. Companion OS holds depth back — philosophy yes, implementation detail no.
   The page should leave strategic buyers wanting the conversation.
6. The test for any content, anywhere: **does this answer tomorrow's question
   on today's page?** If yes, it moves or dies.

## 8 · Final Decision Rule

When choosing between two implementation options, prefer the one that produces
the **stronger buyer journey**, even at the cost of more words, more sections,
or more code.

Success is not fewer words, fewer sections, or fewer components. Success is:
**faster understanding · greater confidence · higher trust · stronger
motivation to request a demo.** Every decision is evaluated against those four
outcomes — and reduction may never be cited as a goal in itself.

(Recorded precedents: Company kept its narrative depth; Demo kept its FAQ and
try-it; Platform kept a sixth section as a tease band.)

## 9 · Site Architecture (target state)

- **/** — 7 acts (§5)
- **/platform** — Hero · Voice & your hotel's knowledge · The guest lifecycle,
  acted on · Intelligence (the site's ONLY dashboards telling) · Scale & trust
  (tease → Enterprise) · Final CTA — ~700 words
- **/solutions** — Hero · Departments · Segments (application language only) ·
  Final CTA — ~430 words
- **/enterprise** — Hero · Shared intelligence, multi-property · Trust
  architecture (security + governance + administration, one section, three
  columns) · Intelligence for operators · Deployment & fit (incl. the
  what-it-is-not boundary beats, verbatim) · Final CTA — ~560 words
- **/companion-os** — Hero · Why · Architecture grid (8 capabilities as cards;
  layer language only, zero HC feature restatement) · Built for enterprise ·
  Ecosystem & Axionari · Final CTA — ~430 words
- **/resources** — Hero · Featured (absorbs the editorial pitch) · Library
  (with its built-in filter; no separate categories band) · Newsletter ·
  footer — ~420 words
- **/company** — Hero · Why Hotels · Manifesto (belief + mission + philosophy
  + approach as one structured narrative — NOT over-compressed) · Built by
  Axionari · Closing — ~620 words
- **/contact** — Hero · How can we help (incl. HQ + scheduling) · Founding
  Partner (canonical) · Closing — ~300 words
- **/demo** — Hero (one line) · **Form** (+ quiet Founding Partner link) ·
  What to expect (one merged section) · Try it (compact) · FAQ (the site's
  only FAQ — six hesitation questions) · After you submit — ~560 words
- **/faq** — removed; route redirects to /demo#faq

**FAQ doctrine:** definitional questions ("What is Companion OS?", "Is it an
AI concierge?") must be answered by the site itself — if one survives into an
FAQ, the website failed. Hesitation questions (deployment time, app download,
integration, languages, security, boutique fit) live in exactly one place:
under the demo form, where buyers actually ask them.

## 10 · Design System Rules

Consistency, not redesign. Visitors should never notice transitions between
pages.

- **Typefaces:** Fraunces (display 530 / italic 480) + Spline Sans Mono
  (labels) on the marketing layer; General Sans inside device-UI and body.
- **Text colors:** `--text #F7F6F1` (one body cream, all layers) ·
  `--cream #F2EEE6` (emphasis italics only). No champagne text, ever (G-10).
- **Gold:** one — `#C9A15A` (brass), micro-accents ≤20px only.
- **Accent:** one terracotta `#C86A3A` / `var(--accent)`; all solid actions,
  dark text.
- **CTAs:** two labels site-wide — *Book a Demo* (primary) + *See It Live*
  (secondary). Two pill heights: 44 compact / 52 standard. Sans, sentence
  case. One primary CTA per page.
- **Eyebrows:** one spec — mono 11px / 0.26em / uppercase; three sanctioned
  colors (accent numbered · faint labels · brass micro). Device-screen labels
  inside `[data-device-ui]` are exempt (they are UI).
- **Section spacing:** subpages 112 standard / 144 finale / 96 hero-top; the
  homepage acts keep their reference-locked pacing.
- **Headings:** one subpage H1 clamp (`heading-page`); `heading-section` for
  section H2s. Display-scale moments are homepage-only.
- If a visual communicates the idea, the explanatory text is deleted. If text
  explains what a screenshot shows, the text is deleted.

## 11 · Definition of Done

Implementation is complete only when ALL of the following are true.

**Narrative** — every page answers one primary question · every concept has
one narrative owner · Silent cells in §6 remain silent · progressive
disclosure (§7) is preserved.

**Buyer journey** — a first-time visitor can progress Home → Platform →
Enterprise/Solutions → Demo without confusion; each page hands off to the
next.

**Design** — typography, spacing, CTA language, color tokens, and component
language are each one consistent system.

**Product** — no capability explained twice · no page teaches another page's
responsibility · Companion OS never confused with Hotel Companion.

**Conversion** — every page naturally leads toward booking a demo; nothing
interrupts or competes with that objective.

**Engineering** — no dead components · no unused translation keys (EN or ES)
· no broken anchors (incl. `/faq → /demo#faq` redirect) · no accessibility
regression · no Lighthouse regression (mobile perf ≥90 · a11y ≥95 · SEO ≥95)
· all visual gates pass · all existing automated gates pass
(`reports/v4-gates.mjs`, updated to this spec, plus a narrative-ownership
check asserting Silent cells stay silent).

## 12 · Governance

- **Copy is law.** No one writes marketing copy ad hoc. Implementation may
  delete, relocate, or select among approved strings; new strings require an
  approved copy deck. ES ships with EN in the same commit.
- **The homepage acts are gate-protected** (reference fidelity, word budgets,
  verbatim copy, orb/palette rules — `reports/v4-gates.mjs`).
- **Workflow:** feature branches off `v4` · preview deploys only · full gate
  re-run · amended report · STOP before merge. Production promotion is always
  a separate, explicit order.
- Amendments to this document are deliberate and recorded here, never implied
  by code.

## 13 · Open items blocking implementation (as of 2026-07-22)

1. **V4 Addendum 2 sign-off:** Act VII CTA becomes *Book a Demo / Agenda una
   Demo* → /demo (amends V4 kit §3); partner line retained as the Founding
   Partner tease; `CONVIÉRTETE EN SOCIO FUNDADOR` string retires.
2. **Surviving-headings approval:** each merged section's surviving H2 (named
   in the Phase-3 plan) — approve wholesale or via a headings-only deck.
3. Gold-token scope on legal/app routes (in or out).
