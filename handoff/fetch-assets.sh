#!/usr/bin/env bash
# Hotel Companion — media fetch. Run LOCALLY from the repo root (Claude Code can run this).
# Pulls verified free-license (Pexels License) hospitality video loops + photos into public/assets/.
# Pexels License: free for commercial use, no attribution required. Source URLs recorded in ASSET_MANIFEST.md.
set -euo pipefail
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
VID="public/assets/video"; IMG="public/assets/img"
mkdir -p "$VID" "$IMG"

dl(){ # url outfile
  echo "→ $2"
  curl -fL --retry 3 -A "$UA" "$1" -o "$2" || echo "  !! failed: $1 (fetch manually from its source page in ASSET_MANIFEST.md)"
}

# ---- VIDEO loops (download endpoint returns the original mp4) ----
dl "https://www.pexels.com/download/video/32821780/" "$VID/hero-coastal-sunset.mp4"      # HERO (landscape aerial, tranquil coastal sunset)
dl "https://www.pexels.com/download/video/38005781/" "$VID/hero-resort-dusk.mp4"          # HERO alt (coastal resort at dusk)
dl "https://www.pexels.com/download/video/29150156/" "$VID/section-tropical-beach.mp4"    # Destination / lifecycle ambient
dl "https://www.pexels.com/download/video/6073399/"  "$VID/cta-beach-aerial.mp4"          # Enterprise / final CTA band

# ---- PHOTOS (stills for section beds + poster frames) ----
P="auto=compress&cs=tinysrgb&w=2400"
dl "https://images.pexels.com/photos/37729825/pexels-photo-37729825.jpeg?$P" "$IMG/hero-poolside.jpg"     # hero poster / no-JS still
dl "https://images.pexels.com/photos/7974839/pexels-photo-7974839.jpeg?$P"   "$IMG/platform-pool-night.jpg" # Platform / Enterprise bed
dl "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?$P"     "$IMG/ambient-palms-night.jpg"  # ambient band
dl "https://images.pexels.com/photos/34607320/pexels-photo-34607320.jpeg?$P" "$IMG/company-reception.jpg"    # Company "Why Hotels"
dl "https://images.pexels.com/photos/6758531/pexels-photo-6758531.jpeg?$P"   "$IMG/lobby-modern.jpg"         # lobby / solutions
dl "https://images.pexels.com/photos/33803739/pexels-photo-33803739.jpeg?$P" "$IMG/luxury-lobby.jpg"         # luxury / heritage lobby

echo ""
echo "Done. Files in $VID and $IMG."
echo "RECOMMENDED post-process (needs ffmpeg): darken 55-70%, warm grade, and transcode loops to webm + a poster jpg."
echo "Example (per hero video):"
echo '  ffmpeg -i public/assets/video/hero-coastal-sunset.mp4 -vf "eq=brightness=-0.18:saturation=1.06,colorbalance=rm=.04:gm=.0:bm=-.03" -an -c:v libvpx-vp9 -b:v 1600k -t 10 public/assets/video/hero-coastal-sunset.webm'
echo '  ffmpeg -i public/assets/video/hero-coastal-sunset.mp4 -vframes 1 public/assets/img/hero-poster.jpg'
