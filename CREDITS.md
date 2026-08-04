# CREDITS.md — media provenance

All media below is **Pexels License**: free for commercial use, no attribution required.
Attribution is recorded here anyway as a licensing trail, per the Level-Up plan's
"licensing hygiene" note. Fetched by `handoff/fetch-assets.sh`.

Screened per the art direction: no recognizable brand signage, no identifiable faces
in the foreground.

## Video loops → `public/assets/video/`

| File | Source | Used on |
|---|---|---|
| `hero-coastal-sunset.{webm,mp4}` | https://www.pexels.com/video/32821780/ | Home hero bed |
| `section-tropical-beach.{webm,mp4}` | https://www.pexels.com/video/29150156/ | Destination / lifecycle ambient |
| `cta-beach-aerial.{webm,mp4}` | https://www.pexels.com/video/6073399/ | Enterprise / final CTA band |

`hero-resort-dusk` (https://www.pexels.com/video/38005781/) was fetched as a hero
alternate and dropped from the build to keep the payload lean; re-transcode from the
manifest if the primary hero loop is ever swapped.

## Stills → `public/assets/img/`

| File | Source | Used on |
|---|---|---|
| `hero-poolside.webp` | https://www.pexels.com/photo/37729825/ | Hero poster / no-JS still |
| `platform-pool-night.webp` | https://www.pexels.com/photo/7974839/ | Platform / Enterprise bed |
| `ambient-palms-night.webp` | https://www.pexels.com/photo/258154/ | Ambient band |
| `company-reception.webp` | https://www.pexels.com/photo/34607320/ | Company "Why Hotels" right column |
| `lobby-modern.webp` | https://www.pexels.com/photo/6758531/ | Lobby / Solutions |
| `luxury-lobby.webp` | https://www.pexels.com/photo/33803739/ | Luxury / heritage lobby |
| `*-poster.webp` | frame extracted from the matching loop | `<video poster>` / no-JS still |

## In-device UI imagery → `public/assets/ui/`

Rendered *inside* the tablet screens (Visual Interface Level-Up §E), so these are kept
brighter and cleaner than the section beds — they should read as real product photography.

| File | Source | Screen |
|---|---|---|
| `suite-1.webp` | https://www.pexels.com/photo/3688261/ | Room-upgrade carousel |
| `suite-2.webp` | https://www.pexels.com/photo/36916378/ | Room-upgrade carousel |
| `suite-3.webp` | https://www.pexels.com/photo/34496715/ | Room-upgrade carousel |
| `dish-1.webp` | https://www.pexels.com/photo/7243881/ | Room-service grid |
| `dish-2.webp` | https://www.pexels.com/photo/17237180/ | Room-service grid |
| `dish-3.webp` | https://www.pexels.com/photo/23644633/ | Room-service grid |
| `spa-1.webp` | https://www.pexels.com/photo/9146381/ | Spa & wellness cards |
| `spa-2.webp` | https://www.pexels.com/photo/37719540/ | Spa & wellness cards |
| `spa-3.webp` | https://www.pexels.com/photo/19666192/ | Spa & wellness cards |

Scaled to max 900w (760w for the largest), converted to webp, **every file under 120 KB**
per the spec budget. No darkening grade — unlike the beds, these sit inside a UI.

## Processing applied

Raw downloads totalled **245 MB**, which is not shippable. Every asset was processed
locally with ffmpeg before being committed:

- **Loops:** 8-second cut, scaled to 1280w, audio stripped, darkened ~16% with a warm
  copper grade (`eq` + `colorbalance`) so type stays legible on top — the treatment the
  art direction asks for. Encoded to VP9 `.webm` plus an H.264 `.mp4` fallback with
  `+faststart`. Each is now **under 3 MB** (largest: 2.0 MB).
- **Stills:** scaled to max 1920w, same warm darkening grade, converted to `.webp`.
- Raw originals deleted after transcode. Total committed media: **7.1 MB**.

## Breather bands (`public/assets/breathers/`)

Executed per `HotelCompanion__Image_System.md`. Five Pexels stills (Pexels
License), each re-fetched at w=2560, **graded**, then encoded to WebP.

**The grade** (ffmpeg, identical for all five, so the set reads as one
art-directed world): `colortemperature=4700 mix=0.85` for the warm/copper white
balance, `eq=contrast=1.10:saturation=1.06:brightness=-0.015` for the contrast
lift. The darkening is applied in CSS, not baked in: ~50% over the centre
rising to 90% at the feathered top and bottom edges.

| File | Pexels | Encode | Temperature | Slot |
| --- | --- | --- | --- | --- |
| giant-tree.webp | 4618623 | 1700 / q72 | green · awe | Home, after the conversation beat |
| beach-golden.webp | 3605451 | 2000 / q72 | warm | Home, the video pause poster |
| waterfall-swim.webp | 2410860 | 1700 / q72 | cool · adventure | Platform, the single breather |
| waterfall-lagoon.webp | 8521850 | 2000 / q72 | cool · social | Enterprise |
| beach-dusk-walk.webp | 37804743 | 2000 / q72 | warm · romantic | Company, the emotional peak |

giant-tree and waterfall-swim were previously shipped at q46/q54 and read soft
full-bleed. They are the two heaviest files even after re-encoding (836KB and
510KB) because dense foliage does not compress; 1700px was the point where
quality held and weight stayed defensible.

`public/assets/ui/beach-akumal.webp` (pexels 36111990) is the in-device answer
card for "Best beach near here?" — a small, subject-legible role, deliberately
not one of the seven full-bleed visuals.

## The seven full-bleed visuals, 1:1

| # | Visual | Where | Type |
| --- | --- | --- | --- |
| 1 | hero-coastal-sunset | Home hero bed | video |
| 2 | giant-tree | Home breather | still |
| 3 | section-tropical-beach | Home mid-page pause | video |
| 4 | beach-golden | Home warm breather (pause poster) | still |
| 5 | waterfall-swim | Platform breather | still |
| 6 | waterfall-lagoon | Enterprise breather | still |
| 7 | beach-dusk-walk | Company emotional peak | still |

Zero repeats. Solutions' breather and Platform's second breather were **deleted**
rather than repeat a visual, per the plan's "if a page would need an 8th band,
delete the band".

CTA bands are darkened stills, never a second run of a cinematic video:
Home → ambient-palms-night, Platform → hero-poolside, Solutions → lobby-modern,
Enterprise → company-reception, Companion OS → platform-pool-night.

Retired as standalone bands: the 9–25KB video-poster stills
(cta-beach-aerial-poster, hero-coastal-sunset-poster,
section-tropical-beach-poster). They remain only as posters for their own videos.

## Suite photography added 2026-08-04 → `public/assets/ui/`

**Unsplash License** (free for commercial use, no permission or attribution required —
a different licence from the Pexels media above, recorded here for the trail).
Screened against the same art direction: real photography not CGI, no people in frame,
no recognizable brand signage, resort register.

| File | Source | Used on |
|---|---|---|
| `suite-sculpted.webp` | https://unsplash.com/photos/1731336478850-6bce7235e320 | /solutions — Guest-memory hero |
| `suite-garden.webp` | https://unsplash.com/photos/1761039265583-9489b4246454 | Home SuiteShowcase — Garden Villa |

Both 1400px long edge, cwebp q82 / q74, matching `suite-ocean.webp`'s spec.

**Rejected during screening, do not press into service:** a Barcelona city-hotel room
(recognizable skyline), a room with a person in the bed, a CGI render, a brick-walled
suite with a model in frame, and a mosquito-net lodge — all off-register or against the
art direction. The two pre-existing weak files (`suite-1.webp` twin-bed business room,
`suite-3.webp` ornate gold suite) are now unused; `suite-3` was the Garden Villa until
`suite-garden.webp` replaced it.
