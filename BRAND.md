# Brand — product language

How Hotel Companion sounds. `TERMINOLOGY.md` governs vocabulary; this governs
voice. Read both before writing customer-facing text.

This is descriptive, not aspirational — it was derived by measuring the copy
already shipped on hotelcompanion.ai. Where it states a number, that number is
from the live site.

---

## Tone

Editorial and declarative. Closer to a design monograph than to SaaS marketing.
Confident enough to state things plainly and stop.

The register is **a hotelier talking about their property**, not a vendor
talking about software. Warmth comes from specificity — *cenote at dawn*,
*barefoot is welcome*, *the room just remembers you* — never from adjectives.

## Rhythm

- **Median sentence: 12 words.** Statements often run shorter.
- Fragments are correct when they land: *"One platform. Unlimited
  possibilities."* / *"No commands. No menus. No learning curve."*
- **Noun runs** are a signature device — a period-separated list standing in
  for a paragraph: *"Extra towels. Extra pillows. Blankets. Laundry."* Use them
  for scope; never more than one per section.
- Em dashes carry the turn in a sentence. Semicolons do not appear.
- Headlines are sentences and take a full stop: *"Hospitality begins with a
  question."*

## Our verbs

The platform **understands, remembers, routes, resolves, connects, surfaces,
coordinates, compounds**. These are precise and mostly intransitive about the
technology — they describe what happens, not what the AI does.

Avoid verbs that put the software in the hero role: *powers* (except for the
Platform/OS relationship), *delivers*, *drives*, *enables*, *empowers*.

## Our nouns

**the guest · the property · the department · the team · the Companion ·
the conversation · context · intelligence · the moment · the stay**

"The Companion" is the product in prose. Not "the assistant", not "the bot",
not "the AI". The guest is *the guest*, never "the user" or "the customer".

## Preferred metaphors

- **Layer / beneath.** The platform sits under existing systems, not beside
  them. *"It understands the conversations between them."*
- **Memory.** Knowledge that compounds instead of resetting.
- **Input, not product.** The conversation is raw material.
- **Freeing people.** *"The routine, resolved automatically — your team, free
  for the moments that matter."*

Avoid: brains, magic, wizards, journeys-as-funnels, anything military
(*capture*, *target*, *dominate*) or anything that makes the guest a resource.

## Things we always say

- **Not X — Y.** Positioning is always a negative paired with its positive:
  *not a PMS replacement — it understands the conversations between your
  systems.* State it as fact, never as reassurance.
- **The specific over the general.** A named cenote beats "local experiences".
- **What the guest experiences**, before what the system does.
- **"Powered by Companion OS"** — the endorsement line, used sparingly.

## Things we never say

| Never | Why |
| --- | --- |
| chatbot, AI concierge *(about us)* | The category we are moving beyond. Fine when naming competitors or the prior generation. |
| assistant, bot, virtual agent | It is the Companion. |
| user, end-user | It is the guest. |
| seamless, effortless, frictionless | Claim the outcome, not the adjective. |
| leverage, harness, unlock, empower | Consultant register. Currently near-zero on the site — keep it there. |
| cutting-edge, revolutionary, game-changing, next-gen | Says nothing. Zero occurrences today. |
| robust, best-in-class, world-class, industry-leading | Unfalsifiable. |
| delight, wow, magic | Hospitality is specific, not whimsical. |
| 24/7 *(in prose)* | Prefer "24 hours a day", or say what is actually always true. |

Exclamation marks do not appear in product copy.

## Reading level

Plain English, roughly grade 8–10. A GM reads it as easily as a CTO. No
technical vocabulary in marketing copy: no *LLM*, *RAG*, *vector*, *inference*,
*model*, *fine-tune*, *API* (outside developer docs). If a mechanism must be
explained, explain it in terms of what a guest or a department experiences.

Enterprise pages may use *governance*, *role-based access*, *deployment* and
*integration* — these are the buyer's own words, not jargon.

## Category hierarchy

```
Brand              Hotel Companion
Category           Hospitality Intelligence Platform
Core architecture  Hospitality Intelligence Operating System
Concepts           guest intelligence · operational intelligence
Capabilities       voice-first, offline knowledge access, …
```

Full rules, Spanish equivalents, banned terms and deliberate exceptions:
`TERMINOLOGY.md`.

## Spanish

Spanish is a first-class locale, not a translation layer — `const es: typeof en`
makes the build fail without it. Match the register rather than the words:
Spanish tolerates longer sentences, so a literal translation reads clipped.
Use *tú*, not *usted*. Keep the noun-run device; it works in both.

---

*When in doubt: say the specific true thing, in the fewest words, and stop.*
