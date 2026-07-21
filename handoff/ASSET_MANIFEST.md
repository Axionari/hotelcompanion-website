# Hotel Companion — Asset Manifest & Credits

**License:** every asset below is **Pexels License** — free for commercial use, no attribution required, no sign-up.
Run `fetch-assets.sh` from the repo root to download them into `public/assets/`. If any URL 403s, open its
**Source page** and click "Free download" (the `/download/video/{id}/` endpoint occasionally rate-limits).

**Art direction (apply on top):** darken each 55–70%, warm/copper grade, so Fraunces type stays legible. Loops
6–10s, muted, `autoplay loop playsinline`, with a poster still for reduced-motion/no-JS. Transcode to `webm` +
`mp4`, keep each ≤2–3 MB. No recognizable faces/brand signage in the foreground.

## Video loops
| File | Use | Source page | Direct download |
|---|---|---|---|
| `video/hero-coastal-sunset.mp4` | **HERO bed** (Home) — tranquil coastal aerial, sunset | pexels.com/video/32821780 | pexels.com/download/video/32821780/ |
| `video/hero-resort-dusk.mp4` | HERO alt / Platform hero — coastal resort at dusk | pexels.com/video/38005781 | pexels.com/download/video/38005781/ |
| `video/section-tropical-beach.mp4` | Destination / guest-lifecycle ambient | pexels.com/video/29150156 | pexels.com/download/video/29150156/ |
| `video/cta-beach-aerial.mp4` | Enterprise / final-CTA band | pexels.com/video/6073399 | pexels.com/download/video/6073399/ |

## Photos (section beds + poster frames)
| File | Use | Source page | Direct download |
|---|---|---|---|
| `img/hero-poolside.jpg` | Hero poster / no-JS still — luxurious poolside oasis | pexels.com/photo/…-37729825 | images.pexels.com/photos/37729825/pexels-photo-37729825.jpeg |
| `img/platform-pool-night.jpg` | Platform / Enterprise bed — hotel pool at night | pexels.com/photo/…-7974839 | images.pexels.com/photos/7974839/pexels-photo-7974839.jpeg |
| `img/ambient-palms-night.jpg` | Ambient banding — palms at night | pexels.com/photo/…-258154 | images.pexels.com/photos/258154/pexels-photo-258154.jpeg |
| `img/company-reception.jpg` | **Company "Why Hotels"** — chic reception interior | pexels.com/photo/…-34607320 | images.pexels.com/photos/34607320/pexels-photo-34607320.jpeg |
| `img/lobby-modern.jpg` | Lobby / Solutions — spacious modern hotel hall | pexels.com/photo/…-6758531 | images.pexels.com/photos/6758531/pexels-photo-6758531.jpeg |
| `img/luxury-lobby.jpg` | Luxury / heritage lobby — Solutions·Luxury | pexels.com/photo/…-33803739 | images.pexels.com/photos/33803739/pexels-photo-33803739.jpeg |

## Where each lands (section → asset)
- **Home hero** → `hero-coastal-sunset.mp4` (poster `hero-poolside.jpg`), behind the left text + tablet.
- **Home destination / lifecycle** → `section-tropical-beach.mp4`.
- **Home / Enterprise final CTA band** → `cta-beach-aerial.mp4` (or a still).
- **Platform hero / beds** → `hero-resort-dusk.mp4`, `platform-pool-night.jpg`.
- **Company "Why Hotels"** → `company-reception.jpg` (fills the empty right column).
- **Solutions (luxury/boutique/resort)** → `lobby-modern.jpg`, `luxury-lobby.jpg`, `platform-pool-night.jpg`.
- **Destination section (Platform)** → `section-tropical-beach.mp4` / a beach still.
- **Ambient banding anywhere** → `ambient-palms-night.jpg`.

> Want more variety? Same pattern, any Pexels ID: photo `images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg`,
> video `pexels.com/download/video/{ID}/`. Good queries: `infinity pool sunset`, `hotel lobby ambient`,
> `spa candle calm`, `fine dining evening`, `coastal town mexico`, `boutique hotel room morning light`.
> Also free: Coverr (coverr.co), Mixkit (mixkit.co).
