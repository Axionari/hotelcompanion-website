# START HERE — Hotel Companion v3

You are building **Hotel Companion v3**: a surgical upgrade of the live site (placecompanion-v2-ecru.vercel.app), executed as a fork. The live site is the chassis and the content source of truth. This kit is the complete, closed specification. **Nothing outside this kit is in scope.**

## Read order (do this before any code)

1. `01_RULES.md` — the operating protocol. Binding.
2. `00_BUILD_BRIEF.md` — the board's decisions (what and why).
3. `02_COPY_DECK.md` — every new/changed string, ES + EN, verbatim.
4. `03_TOKENS.md` — colors, type, motion, and the verified orb CSS.
5. `specs/PHASE_0_FORK.md` — begin here.

`context/TRANSPLANT_MAP.md` is rationale/history — read it only if a decision seems strange; it is never a source of requirements. `reference/sun-arc-8a-top.jpg` is the visual target for the Phase 3 sun arc.

## The mission in one line

Same soul, half the words, twice the proof: 15 sections → 13, two new hero visuals (sun arc, constellation), a receipts system, an ask-bar close — with the site's existing identity (warm dark, serif+mono, the ember orb) untouched.

## The loop (every phase, no exceptions)

```
READ the phase spec
  → PLAN: list every file you will touch and why (write it in the report first)
  → EXECUTE: only what the spec says
  → VERIFY: run every assertion in the spec's Gate section; fix until green
  → REPORT: write reports/PHASE_N_REPORT.md (template in 01_RULES.md)
  → STOP: do not start the next phase until the human approves
```

If any Gate assertion cannot pass as written, do not improvise around it — record it in `OPEN_QUESTIONS.md` with your smallest-change proposal and stop the phase there.

## What "done" means overall

All six phase reports green-gated and approved, on branch `v3`, deployed as a Vercel preview, production untouched. Phase 5's checklist is the final definition of done.
