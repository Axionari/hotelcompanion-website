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

Curated cinematic stills, sourced from Pexels under the Pexels License (free
to use, no attribution required; recorded here anyway). Fetched at w=2560 and
re-encoded to WebP at 1920px (1600px for the sandbar, which is high-frequency
and would not compress below ~600KB otherwise).

| File | Source |
| --- | --- |
| aerial-seascape.webp | pexels.com/photo/37943870 |
| aerial-islands.webp | pexels.com/photo/36332947 |
| tropical-bay.webp | pexels.com/photo/14574160 |
| white-sandbar.webp | pexels.com/photo/36111990 |
| archipelago.webp | pexels.com/photo/19758822 |

**Not fetched:** `pexels.com/photo/6861` (intended as `pool-golden-hour.jpg`,
the warm counterpoint) returns 404. The warm beats currently reuse the repo's
existing `hero-poolside.webp` and `luxury-lobby.webp`. Replace when a working
URL is available.
