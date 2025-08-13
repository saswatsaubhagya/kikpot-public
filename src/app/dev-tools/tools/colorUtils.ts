"use client";

export function normalizeHex(value: string): string {
  let v = value.trim();
  if (!v.startsWith("#")) v = `#${v}`;
  if (v.length === 4) {
    v = `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
  }
  return v.slice(0, 7);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = normalizeHex(hex);
  const bigint = parseInt(normalized.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function rgbToHwb(r: number, g: number, b: number): { h: number; w: number; bl: number } {
  const { h } = rgbToHsl(r, g, b);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const w = Math.min(rn, gn, bn);
  const bl = 1 - Math.max(rn, gn, bn);
  return { h, w: Math.round(w * 100), bl: Math.round(bl * 100) };
}

// sRGB -> XYZ (D65)
function srgbToXyz(r: number, g: number, b: number): { x: number; y: number; z: number } {
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const rl = srgb[0], gl = srgb[1], bl = srgb[2];
  const x = rl * 0.4124 + gl * 0.3576 + bl * 0.1805;
  const y = rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
  const z = rl * 0.0193 + gl * 0.1192 + bl * 0.9505;
  return { x, y, z };
}

function xyzToLab(x: number, y: number, z: number): { L: number; a: number; b: number } {
  // D65 reference white
  const Xn = 0.95047, Yn = 1.0, Zn = 1.08883;
  let fx = x / Xn, fy = y / Yn, fz = z / Zn;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  fx = f(fx); fy = f(fy); fz = f(fz);
  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);
  return { L, a, b };
}

export function rgbToLch(r: number, g: number, b: number): { L: number; C: number; H: number } {
  const { x, y, z } = srgbToXyz(r, g, b);
  const lab = xyzToLab(x, y, z);
  const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let H = Math.atan2(lab.b, lab.a) * (180 / Math.PI);
  if (H < 0) H += 360;
  return { L: Math.round(lab.L), C: Math.round(C), H: Math.round(H) };
}

export function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

type NamedColor = { name: string; hex: string };

const namedColors: NamedColor[] = [
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "red", hex: "#ff0000" },
  { name: "green", hex: "#008000" },
  { name: "blue", hex: "#0000ff" },
  { name: "seagreen", hex: "#2e8b57" },
  { name: "rebeccapurple", hex: "#663399" },
  { name: "yellow", hex: "#ffff00" },
  { name: "cyan", hex: "#00ffff" },
  { name: "magenta", hex: "#ff00ff" },
  { name: "orange", hex: "#ffa500" },
  { name: "tomato", hex: "#ff6347" },
  { name: "slategray", hex: "#708090" },
  { name: "lightskyblue", hex: "#87cefa" },
  { name: "indianred", hex: "#cd5c5c" },
  { name: "teal", hex: "#008080" },
];

export function rgbToNearestName(r: number, g: number, b: number): string {
  const toRgb = (hex: string) => {
    const h = hex.replace("#", "");
    const rv = parseInt(h.slice(0, 2), 16);
    const gv = parseInt(h.slice(2, 4), 16);
    const bv = parseInt(h.slice(4, 6), 16);
    return { rv, gv, bv };
  };
  let bestName = "—";
  let bestDist = Number.POSITIVE_INFINITY;
  for (const { name, hex } of namedColors) {
    const { rv, gv, bv } = toRgb(hex);
    const d = (rv - r) ** 2 + (gv - g) ** 2 + (bv - b) ** 2;
    if (d < bestDist) {
      bestDist = d;
      bestName = name;
    }
  }
  return bestName;
}


