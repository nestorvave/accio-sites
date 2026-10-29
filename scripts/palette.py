#!/usr/bin/env python3
"""Picks the brand color from a logo and adjusts it to contrast with the template background.

Usage: python3 scripts/palette.py public/logos/maya-spa.jpg spa
Prints a JSON with `colors` ready to paste into sites/<slug>.json.
Requires Pillow (pip install pillow).
"""
import colorsys, json, sys
from PIL import Image

BACKGROUNDS = {"spa": "#0F1F1A", "restaurant": "#FFFCF6", "clinic": "#F6F9FA", "fitness": "#F3EFE7"}

def hex_to_rgb(h): h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def rgb_to_hex(c): return "#%02X%02X%02X" % tuple(max(0, min(255, round(x))) for x in c)
def luminance(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

def dominant(path):
    im = Image.open(path).convert("RGB").resize((80, 80))
    q = im.quantize(colors=12, method=Image.Quantize.MEDIANCUT).convert("RGB")
    counts = {}
    for px in q.getdata():
        counts[px] = counts.get(px, 0) + 1
    best, score = None, -1
    for rgb, n in counts.items():
        h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in rgb))
        if v < 0.12 or (v > 0.93 and s < 0.12):  # near black or near white: useless as an accent
            continue
        sc = n * (0.35 + s)  # frequency weighted by saturation
        if sc > score:
            best, score = rgb, sc
    if best is None:  # black-and-white logo: fall back to the most frequent color
        best = max(counts, key=counts.get)
    return best

def adjust(rgb, bg_hex, dark):
    """Moves the value until contrast is met: 4.5 on a light background (used as text), 3 on a dark one (button)."""
    bg = hex_to_rgb(bg_hex)
    h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in rgb))
    target = 3.0 if dark else 4.5
    for _ in range(40):
        c = tuple(x * 255 for x in colorsys.hsv_to_rgb(h, s, v))
        if contrast(c, bg) >= target:
            return c
        v = min(1, v + 0.03) if dark else max(0, v - 0.03)
        if not dark and v < 0.25:
            s = min(1, s + 0.05)
    return tuple(x * 255 for x in colorsys.hsv_to_rgb(h, s, v))

def main():
    path, category = sys.argv[1], sys.argv[2]
    bg = BACKGROUNDS[category]
    base = dominant(path)
    brand = adjust(base, bg, dark=(category == "spa"))
    h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in brand))
    if category == "spa":
        paper = tuple(x * 255 for x in colorsys.hsv_to_rgb(h, min(s, 0.35), 0.17))
        bg_out = rgb_to_hex(tuple(x * 255 for x in colorsys.hsv_to_rgb(h, min(s, 0.4), 0.11)))
    else:
        paper = tuple(x * 255 for x in colorsys.hsv_to_rgb(h, min(s, 0.18), 0.94))
        bg_out = bg
    print(json.dumps({"colors": {"bg": bg_out, "brand": rgb_to_hex(brand), "paper": rgb_to_hex(paper)}, "base": rgb_to_hex(base), "contrast": round(contrast(brand, hex_to_rgb(bg_out)), 2)}))

if __name__ == "__main__":
    main()
