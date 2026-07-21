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

## Processing applied

Raw downloads totalled **245 MB**, which is not shippable. Every asset was processed
locally with ffmpeg before being committed:

- **Loops:** 8-second cut, scaled to 1280w, audio stripped, darkened ~16% with a warm
  copper grade (`eq` + `colorbalance`) so type stays legible on top — the treatment the
  art direction asks for. Encoded to VP9 `.webm` plus an H.264 `.mp4` fallback with
  `+faststart`. Each is now **under 3 MB** (largest: 2.0 MB).
- **Stills:** scaled to max 1920w, same warm darkening grade, converted to `.webp`.
- Raw originals deleted after transcode. Total committed media: **7.1 MB**.
