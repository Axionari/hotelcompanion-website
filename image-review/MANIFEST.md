# Image review — provenance and placement

Prepared so the imagery can be judged independently of the code. Every file
that has been used as a **breather band**, **page bed** or **in-device answer
card** is here, grouped by where it came from, with the exact place it was (or
is) used.

## One correction before you compare

I did **not** independently source any images from the web. Everything in the
repo arrived one of two ways:

1. **The handoff's `scripts/fetch-assets.sh`** — a fixed list of URLs supplied
   with the project brief. I ran that script; I did not choose those images.
2. **URLs Eduardo supplied directly** — two Pexels batches (groups B and C).

So "the ones Code found" is more precisely **"the ones Code *selected and
placed*"** — group A. Those are library images I picked out and assigned to
breather slots and page beds. That is a curation decision, not a sourcing one,
and it is the thing worth grading in group A.

Sizes below are the encoded WebP as shipped, not the source.

---

## Group A — my selections from the existing library

Nine images from `public/assets/img/`, chosen by me for specific slots.

| File | KB | Where I placed it | Status |
| --- | --- | --- | --- |
| `hero-poolside.webp` | 316 | Home breather #1 (before `09 · EXECUTION`); previously the beach answer card | **Retired** as breather (replaced by `giant-tree`); **removed** from the answer card — it showed a pool for "Best beach near here?" |
| `platform-pool-night.webp` | 133 | Platform hero bed; was also Enterprise hero bed | **Live** on Platform only. Was a duplicate across two pages until this round. |
| `ambient-palms-night.webp` | 104 | Enterprise hero bed | **Live** — assigned to break the Platform/Enterprise duplicate |
| `luxury-lobby.webp` | 231 | Solutions hero bed; Platform breather #2; TabletOS `home` canvas | **Live** in all three |
| `company-reception.webp` | 108 | Enterprise breather | **Retired** (replaced by `waterfall-lagoon`) |
| `cta-beach-aerial-poster.webp` | 9 | Closing CTA bed, Platform + Solutions + Enterprise; Company breather | **Live** on Platform only — it was the identical closing bed on three pages until this round |
| `section-tropical-beach-poster.webp` | 25 | Platform breather #1; now Enterprise closing bed + poster for the Home video breather | **Live** |
| `hero-coastal-sunset-poster.webp` | 12 | Home hero video poster; now Solutions closing bed + poster for the Company video breather | **Live** |
| `lobby-modern.webp` | 215 | DeviceWall AR-glasses lens scene; `concierge` device screen | **Live** |

**Honest note on group A:** several of these are low-resolution posters
(9–25KB) intended as video fallbacks, not as standalone stills. They hold up
behind a scrim but will not survive a full-bleed breather at 1440. That is a
real weakness of my curation and it is why the breather slots ended up being
replaced.

---

## Group B — your first Pexels batch (retired)

Recovered from git for comparison. Cool/aqua aerials.

| File | KB | Where it was placed | Why retired |
| --- | --- | --- | --- |
| `aerial-seascape.webp` | 362 | Home breather #2 (video-pause poster) | You asked to retire the aqua/sandbar set |
| `aerial-islands.webp` | 277 | Company breather (video-pause poster) | same |
| `tropical-bay.webp` | 152 | Platform breather #1 | same |
| `archipelago.webp` | 474 | Enterprise breather | same |
| `white-sandbar.webp` | 595 | Solutions breather | Retired as a breather — but **re-encoded and kept** as the beach answer card (`ui/beach-akumal.webp`), which is where it now does its best work |

**Note:** this batch was uniformly cool. With no warm counterpoint fetching
successfully (`pexels 6861` 404s), the site read cold end to end, which is what
prompted the warm/green replacement.

---

## Group C — your second batch (live)

| File | KB | Where it is placed | Mood |
| --- | --- | --- | --- |
| `giant-tree.webp` | 558 | Home breather #1 | green / awe |
| `beach-golden.webp` | 196 | Home breather #2 (poster for `section-tropical-beach` video); Solutions breather | warm |
| `waterfall-swim.webp` | 399 | Platform breather #1 | green |
| `beach-dusk-walk.webp` | 322 | Platform breather #2; Company breather (poster for `hero-coastal-sunset` video) | warm |
| `waterfall-lagoon.webp` | 255 | Enterprise breather | green |
| `beach-akumal__answer-card.webp` | 233 | In-device answer card for "Best beach near here?" (`ui/beach-akumal.webp`) | — |

**Known compromises in group C:**

- Five images cover seven slots, so **two repeat across pages**:
  `beach-golden` (Home video poster + Solutions) and `beach-dusk-walk`
  (Platform + Company video poster). Both repeats are on distant pages and one
  of each pair is a video poster that is quickly replaced by motion.
- `giant-tree` and `waterfall-swim` are high-frequency foliage and would not
  compress below ~700KB at normal quality. They ship at **q46 / q54, 1600px** —
  visibly softer than the rest if you pixel-peep, acceptable behind a scrim.

---

## Current breather map (what a reviewer would actually see, in order)

| Page | Slot | Image | Video |
| --- | --- | --- | --- |
| Home | before `09 · EXECUTION` | `giant-tree` | — |
| Home | before `12 · BOUNDARIES` | `beach-golden` | `section-tropical-beach` |
| Platform | before `07 · RESERVATIONS` | `waterfall-swim` | — |
| Platform | before `12 · MULTI-PROPERTY` | `beach-dusk-walk` | — |
| Enterprise | before `11 · WHAT IT IS NOT` | `waterfall-lagoon` | — |
| Company | before `09 · CONTACT` | `beach-dusk-walk` | `hero-coastal-sunset` |
| Solutions | before `03 · COMPANION OS` | `beach-golden` | — |

Art direction applied to all seven: near full-bleed, scrim feathering **only**
the top and bottom edges (0.97) with the centre left at 0.16, slow parallax,
at most one line of copy. An earlier pass darkened the centre to 0.34–0.55 and
they read as black gaps.

---

## What is genuinely open

1. **The warm slot has no dedicated image.** `pexels 6861` (pool-golden-hour)
   404s. The two beach walks are carrying warm duty for three slots.
2. **Group A's posters are too low-res for full-bleed use** (9–25KB). If any
   group A image wins on composition, it needs re-fetching at full resolution.
3. **Two group C images repeat.** Two more stills would close that.
