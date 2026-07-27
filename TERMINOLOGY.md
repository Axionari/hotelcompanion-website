# Terminology

Canonical language for Hotel Companion. Applies to the marketing site, product
UI, documentation, investor materials, decks, and anything an agent writes.

This exists to prevent drift. Terminology hardens fast across a company; once
three names for one thing are in circulation, every new page picks one at
random. If you are adding copy and the term you want is not here, add it here
first.

**Companion documents.** This governs *vocabulary* — which words name which
things. `BRAND.md` governs *voice* — tone, rhythm, our verbs and nouns, and
what we never say. `docs/COMPANION_OS_SITE_BLUEPRINT.md` holds the Category
Principles the whole site is evaluated against.

---

## The hierarchy

```
Brand         Hotel Companion
Platform      Companion OS — Axionari's platform for white-label,
              voice-native AI Companions
Company       Axionari
```

**Companion OS is the canonical platform noun.** Hotel Companion is a
Companion *built on* Companion OS. There is no second platform name: the
product's own description is a lowercase descriptor, never a proper noun.

- **Hotel Companion** is what a hotel buys and what we lead with.
- **Companion OS** is the platform underneath — Axionari's, shared by every
  Companion. Memory and learning live here ("That memory lives in Companion
  OS — and it compounds.").
- **"hospitality intelligence"** survives **only as a lowercase descriptor** —
  "the hospitality intelligence layer for your property" — never capitalized,
  never a product name.

### The default framing sentences

> Hotel Companion turns every guest conversation into revenue, action, and
> intelligence — a Companion for the whole stay, built on Companion OS.

> Hotel Companion is the hospitality intelligence layer for your property —
> built on Companion OS, Axionari's platform for white-label, voice-native AI
> Companions.

Use one of these the first time the product is introduced on any surface.
Once the relationship is established, shorter variations are fine ("the
Companion", "Hotel Companion").

### The credit lockup

The family credit is one shared component (`CreditLockup` in
`src/components/cds/EndorsementMark.tsx`), mono caps, both halves links:

```
BUILT ON COMPANION OS · POWERED BY AXIONARI
```

Brand names do not translate — the lockup is identical in EN and ES.

### Spanish

| English | Spanish |
| --- | --- |
| built on Companion OS | construido/construida sobre Companion OS |
| the hospitality intelligence layer | la capa de inteligencia hotelera *(lowercase)* |

---

## RETIRED proper nouns — do not reintroduce

These were the site's category nouns until 2026-07-27 and are **permanently
retired**. They read as a fabricated second product beside Companion OS. If
you find one in copy, decks, or metadata, it is a bug.

| Retired | Spanish (also retired) |
| --- | --- |
| Hospitality Intelligence Platform | Plataforma de Inteligencia Hotelera |
| Hospitality Intelligence Operating System | Sistema Operativo de Inteligencia Hotelera |
| Guest Intelligence Platform | Plataforma de Inteligencia de Huéspedes |
| Voice-First Guest Intelligence Platform | Plataforma de Inteligencia de Huéspedes por Voz |

✅ "the hospitality intelligence layer for your property" (lowercase descriptor)
✅ "an intelligence operating system" (lowercase, generic — e.g. The Category headline)
❌ "the Hospitality Intelligence Platform" — retired proper noun
❌ "powered by a Hospitality Intelligence Operating System" — retired proper noun

---

## Concepts (lowercase, not categories)

These are things the product **produces**. They are never the product name.

- **guest intelligence** — what the system learns about guests
- **operational intelligence** — what the system learns about how the hotel runs
- **hospitality intelligence** — the two together; the category's subject matter

✅ "The Companion generates guest intelligence."
✅ "Guest intelligence becomes operational intelligence."
❌ "Hotel Companion is a Guest Intelligence Platform."

---

## Capabilities (never the category)

**Voice-first** is a capability, not a category. The product spans voice agents,
the in-room voice companion, chat, self-navigation, and offline knowledge
access — leading with any single modality understates it.

✅ "Voice-First by Design." (Platform capability section)
✅ heroChips: `VOICE-FIRST`
❌ "The Voice-First Guest Intelligence Platform"

Same rule for chat: never describe the product as chat-only.

---

## Avoid

| Do not use | Use instead | Why |
| --- | --- | --- |
| Hospitality Intelligence Platform / Operating System | "the hospitality intelligence layer" (lowercase) + "built on Companion OS" | Retired proper nouns — see above. |
| Guest Intelligence Platform | same as above | Generic, guest-scoped, and retired. |
| Operating Layer *(as a proper name)* | "intelligence layer" as a descriptor | "Layer" is a descriptor, not a name. |
| AI Guest Companion *(marketing / guest-facing)* | Hotel Companion, "your Companion" | Guests do not need reminding they are talking to AI. |
| AI Concierge *(describing us)* | — | This is the category we are moving beyond. |

**"intelligence layer" as a descriptor is fine** — "the intelligence layer that
connects conversations, departments, knowledge, and operations."

**"AI Concierge" is allowed when discussing competitors or the prior
generation** — e.g. the essay *Beyond the AI Concierge*.

---

## Demo honesty

Nothing on the marketing site is live product. Simulated UI must say so:

- Never label anything simulated **"LIVE"** (EN) or **"EN VIVO"** (ES).
- The operations feed is `SIMULATED NIGHT · DEMO PROPERTY: MARAZUL` /
  `NOCHE SIMULADA · PROPIEDAD DEMO: MARAZUL`, with its caption underneath.
- The in-room journey carries `Guided demonstration · demo property` /
  `Demostración guiada · propiedad demo`.
- Product content *inside* the demos (room rates, spa credits, order totals
  like $250/night) is product UI — keep it exactly as designed.
- "live in weeks" (deployment claim) is fine — it means going live, not a
  liveness label on simulated data.

---

## Positioning: what we are not

Use confidently, never defensively. Pair each negative with the positive.

- not a guest messaging platform → it turns conversations into operational
  intelligence shared across departments
- not a PMS replacement → it sits above your systems and understands the
  conversations between them
- not another chatbot → it is the layer that connects conversations,
  departments, knowledge, and operations
- not a staff replacement → it resolves the routine so the team is free for the
  moments that matter

---

## Deliberate exceptions

Places where older or different terminology is intentionally left alone. Do
not "fix" these.

- **Library essays** (`src/content/library/*.md`) — use "guest intelligence" as
  an industry concept, which is correct under this guide. Titles and slugs are
  URLs; do not rename. `the-rise-of-guest-intelligence-platforms` describes an
  industry shift, not our category. *The Operating System for Hospitality* is
  an editorial metaphor, not the retired noun.
- **Runtime LLM prompts** (`src/lib/extracted-prompt.ts`,
  `src/lib/marazul-config.ts`, `src/app/api/preview-chat/route.ts`,
  `src/app/onboarding/page.tsx`) — "AI Guest Companion" here is a behavioural
  role descriptor fed to the model, not customer-facing copy. Changing it
  changes product behaviour. The *guest-facing greeting* in
  `src/components/chat-interface.tsx` is customer-facing and does follow this
  guide.
- **Legal definitions** (`src/lib/i18n/marketing/legal*.ts`) — Companion OS is
  defined as "the underlying Organizational Intelligence Platform"; that is a
  contractual definition, not marketing category language. The Terms contact
  address ("Mexico City, Mexico") is a legal address on a legal page and
  stays.
- **Lowercase generic descriptors** — "an intelligence operating system" (The
  Category headline) and "The intelligence operating system for hospitality
  organizations" (Enterprise) are generic descriptions, not the retired proper
  nouns.

**Superseded:** the old "no hero eyebrow on the homepage" rule. The homepage
now opens with chapter kicker `01 · HOTEL COMPANION` and the numbered kickers
run 01–07 top to bottom. Keep the sequence complete.

---

## Where copy lives

Marketing copy is not authored in components. It lives in
`src/lib/i18n/marketing/*.ts` as `{ en, es }` pairs, with `const es: typeof en`
enforcing key parity at compile time — if you add an English string, the build
fails until the Spanish exists.

`handoff/HotelCompanion__Site_Copy*.md` are the source decks the i18n modules
mirror. Update both, or the "verbatim — do not edit here" note at the top of
each module becomes a lie.
