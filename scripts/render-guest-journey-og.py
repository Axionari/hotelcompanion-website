"""Render bilingual 1200×630 social cards from existing website assets.

No previous social-card image is repainted or used as a raster source. The card
is recomposed from the editorial photograph and the site's brand typography.

Usage: python3 scripts/render-guest-journey-og.py
"""

from io import BytesIO
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PHOTO = ROOT / "public/assets/figma/2-4065-imgEditorialPhotograph.webp"
SERIF = ROOT / "scripts/og-fonts/InstrumentSerif-Regular.woff2"
SANS_REGULAR = ROOT / "public/fonts/GeneralSans-400.woff2"
SANS_BOLD = ROOT / "public/fonts/GeneralSans-700.woff2"

COLORS = {
    "paper": "#f7f5ef",
    "ink": "#193f35",
    "muted": "#6b776d",
    "hairline": "#d9ded5",
    "gold": "#ba873c",
}

EDITIONS = {
    "en": {
        "headline": ["Smarter offers.", "More revenue."],
        "description": [
            "From the first question to the next stay.",
            "Reservations, relevant recommendations",
            "and guest service—24/7.",
        ],
    },
    "es": {
        "headline": ["Mejores ofertas.", "Más ingresos."],
        "description": [
            "De la primera consulta a la próxima visita.",
            "Reservas, recomendaciones relevantes",
            "y atención al huésped, las 24 horas.",
        ],
    },
}


def font(path: Path, pixels: int) -> ImageFont.FreeTypeFont:
    """Convert a bundled WOFF2 face to TTF in memory for Pillow rendering."""
    source = TTFont(path)
    source.flavor = None
    buffer = BytesIO()
    source.save(buffer)
    buffer.seek(0)
    return ImageFont.truetype(buffer, pixels)


def render(locale: str, data: dict[str, list[str]]) -> Path:
    scale = 2
    canvas = Image.new("RGB", (1200 * scale, 630 * scale), COLORS["paper"])
    draw = ImageDraw.Draw(canvas)

    with Image.open(PHOTO) as original:
        photo = ImageOps.fit(
            original.convert("RGB"),
            (445 * scale, 582 * scale),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
    canvas.paste(photo, (731 * scale, 24 * scale))

    wordmark = font(SANS_BOLD, 22 * scale)
    title = font(SERIF, 102 * scale)
    body = font(SANS_REGULAR, 23 * scale)
    footer = font(SANS_REGULAR, 14 * scale)

    draw.text((60 * scale, 55 * scale), "HOTEL", font=wordmark, fill=COLORS["ink"], anchor="lt", stroke_width=0)
    draw.text((60 * scale, 78 * scale), "COMPANION", font=wordmark, fill=COLORS["ink"], anchor="lt", stroke_width=0)
    draw.text((214 * scale, 78 * scale), "·", font=wordmark, fill=COLORS["gold"], anchor="lt")

    for index, line in enumerate(data["headline"]):
        x, y = 60 * scale, (186 + index * 100) * scale
        width = draw.textbbox((x, y), line, font=title, anchor="lt")[2] - x
        if width > 620 * scale:
            raise ValueError(f"{locale} headline exceeds text column: {line!r} ({width/scale:.0f}px)")
        draw.text((x, y), line, font=title, fill=COLORS["ink"], anchor="lt")

    for index, line in enumerate(data["description"]):
        x, y = 60 * scale, (431 + index * 33) * scale
        width = draw.textbbox((x, y), line, font=body, anchor="lt")[2] - x
        if width > 600 * scale:
            raise ValueError(f"{locale} description exceeds text column: {line!r} ({width/scale:.0f}px)")
        draw.text((x, y), line, font=body, fill=COLORS["muted"], anchor="lt")

    draw.line(((60 * scale, 558 * scale), (660 * scale, 558 * scale)), fill=COLORS["hairline"], width=scale)
    draw.text((60 * scale, 578 * scale), "hotelcompanion.ai", font=footer, fill=COLORS["muted"], anchor="lt")
    draw.line(((630 * scale, 586 * scale), (660 * scale, 586 * scale)), fill=COLORS["gold"], width=2 * scale)

    output = ROOT / f"public/og/hotel-companion-guest-journey-{locale}.png"
    canvas.resize((1200, 630), Image.Resampling.LANCZOS).save(output, optimize=True)
    return output


if __name__ == "__main__":
    for lang, edition in EDITIONS.items():
        print(render(lang, edition))
