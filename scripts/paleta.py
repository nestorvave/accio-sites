#!/usr/bin/env python3
"""Saca el color de marca de un logo y lo ajusta para que contraste con la plantilla.

Uso: python3 scripts/paleta.py public/logos/maya-spa.jpg spa
Imprime un JSON con `colores` listo para pegar en sites/<slug>.json.
Requiere Pillow (pip install pillow).
"""
import colorsys, json, sys
from PIL import Image

FONDOS = {"spa": "#0F1F1A", "restaurante": "#FFFCF6", "consultorio": "#F6F9FA", "fitness": "#F3EFE7"}

def hex_to_rgb(h): h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def rgb_to_hex(c): return "#%02X%02X%02X" % tuple(max(0, min(255, round(x))) for x in c)
def lum(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

def dominante(path):
    im = Image.open(path).convert("RGB").resize((80, 80))
    q = im.quantize(colors=12, method=Image.Quantize.MEDIANCUT).convert("RGB")
    counts = {}
    for px in q.getdata():
        counts[px] = counts.get(px, 0) + 1
    best, score = None, -1
    for rgb, n in counts.items():
        h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in rgb))
        if v < 0.12 or (v > 0.93 and s < 0.12):  # casi negro o casi blanco: no sirve de acento
            continue
        sc = n * (0.35 + s)  # frecuencia ponderada por saturación
        if sc > score:
            best, score = rgb, sc
    if best is None:  # logo en blanco y negro: gris medio con el tono del más frecuente
        best = max(counts, key=counts.get)
    return best

def ajustar(rgb, fondo_hex, oscuro):
    """Mueve la luminosidad hasta cumplir contraste: 4.5 sobre fondo claro (se usa en texto), 3 sobre fondo oscuro (botón)."""
    fondo = hex_to_rgb(fondo_hex)
    h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in rgb))
    objetivo = 3.0 if oscuro else 4.5
    for _ in range(40):
        c = tuple(x * 255 for x in colorsys.hsv_to_rgb(h, s, v))
        if contrast(c, fondo) >= objetivo:
            return c
        v = min(1, v + 0.03) if oscuro else max(0, v - 0.03)
        if not oscuro and v < 0.25:
            s = min(1, s + 0.05)
    return tuple(x * 255 for x in colorsys.hsv_to_rgb(h, s, v))

def main():
    path, giro = sys.argv[1], sys.argv[2]
    fondo = FONDOS[giro]
    base = dominante(path)
    marca = ajustar(base, fondo, oscuro=(giro == "spa"))
    h, s, v = colorsys.rgb_to_hsv(*(x / 255 for x in marca))
    if giro == "spa":
        papel = tuple(x * 255 for x in colorsys.hsv_to_rgb(h, min(s, 0.35), 0.17))
        fondo_out = rgb_to_hex(tuple(x * 255 for x in colorsys.hsv_to_rgb(h, min(s, 0.4), 0.11)))
    else:
        papel = tuple(x * 255 for x in colorsys.hsv_to_rgb(h, min(s, 0.18), 0.94))
        fondo_out = fondo
    print(json.dumps({"colores": {"fondo": fondo_out, "marca": rgb_to_hex(marca), "papel": rgb_to_hex(papel)}, "base": rgb_to_hex(base), "contraste": round(contrast(marca, hex_to_rgb(fondo_out)), 2)}))

if __name__ == "__main__":
    main()
