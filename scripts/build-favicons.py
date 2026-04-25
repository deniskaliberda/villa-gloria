#!/usr/bin/env python3
"""
Build proper multi-size favicon.ico + sized PNG icons from the existing 192px source.

Problem before: favicon.ico was actually a 96x96 PNG with ICO extension. At 16x16
the detailed house+wave icon was visually mushy because the source had a lot of
transparent padding around the logo, leaving the house tiny in tab-strip browsers.

Fix:
  1. Crop the source to its non-transparent bounding box, add a small uniform
     padding (8% of side), so the house fills more of the canvas at small sizes.
  2. favicon.ico — real ICO container with sizes 16, 32, 48, 64 (multi-frame).
  3. Each PNG export uses high-quality LANCZOS resampling.

Run: python3 scripts/build-favicons.py
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "app" / "icon.png"
OUT_ICO = ROOT / "app" / "favicon.ico"
OUT_ICON = ROOT / "app" / "icon.png"
OUT_APPLE = ROOT / "app" / "apple-icon.png"

assert SRC.exists(), f"missing source: {SRC}"


def trim_to_bbox(img: Image.Image, padding_ratio: float = 0.08) -> Image.Image:
    """Crop to the alpha bounding box, then re-pad with a small transparent margin
    so the icon fills more of the visible canvas without touching the edge."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    alpha = img.split()[-1]
    bbox = alpha.getbbox()
    if not bbox:
        return img
    trimmed = img.crop(bbox)

    # Make square with small uniform padding
    w, h = trimmed.size
    side = max(w, h)
    pad = int(side * padding_ratio)
    canvas = Image.new("RGBA", (side + 2 * pad, side + 2 * pad), (0, 0, 0, 0))
    canvas.paste(trimmed, ((canvas.width - w) // 2, (canvas.height - h) // 2), trimmed)
    return canvas


src = Image.open(SRC).convert("RGBA")
print(f"Source: {SRC.name}  {src.size}")

trimmed = trim_to_bbox(src, padding_ratio=0.06)
print(f"Trimmed: {trimmed.size}  (bounding box + 6% padding)")

# Build multi-size ICO with PNG-compressed entries (modern, supported in all browsers).
# Use the trimmed version so 16/32px sizes maximize the icon area.
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
trimmed.save(OUT_ICO, format="ICO", sizes=ico_sizes, bitmap_format="png")
print(f"Wrote: {OUT_ICO}  sizes={ico_sizes}  (multi-frame ICO with PNG-compressed entries)")

# icon.png (192) and apple-icon.png (180) — keep original framing, larger sizes
# render the house clearly without the trim. Don't overwrite, source is good as-is.
print(f"Skip: {OUT_ICON} and {OUT_APPLE} (originals are fine at 180/192)")

print("Done.")
