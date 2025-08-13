"use client";

import { useMemo, useState } from "react";
import { hexToRgb, normalizeHex, rgbToHsl, rgbToHwb, rgbToLch, rgbToCmyk, rgbToNearestName } from "./colorUtils";

export default function ColorConverter() {
  const [hex, setHex] = useState("#227a40ff".slice(0, 7));
  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);
  const hwb = useMemo(() => rgbToHwb(rgb.r, rgb.g, rgb.b), [rgb]);
  const lch = useMemo(() => rgbToLch(rgb.r, rgb.g, rgb.b), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb.r, rgb.g, rgb.b), [rgb]);
  const nearestName = useMemo(() => rgbToNearestName(rgb.r, rgb.g, rgb.b), [rgb]);

  const copy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Convert color between the different formats (hex, rgb, hsl and css name)
      </p>

      <div className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-28 text-sm text-gray-300">color picker:</span>
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-10 w-20 rounded-lg border border-gray-700/40" />
          <input
            value={hex}
            onChange={(e) => setHex(normalizeHex(e.target.value))}
            className="flex-1 h-10 px-3 rounded-xl border border-gray-700/40 bg-emerald-700 text-white font-mono"
          />
        </div>

        <Row label="hex:" value={hex.toLowerCase()} onCopy={() => copy(hex.toLowerCase())} />
        <Row label="rgb:" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onCopy={() => copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} />
        <Row label="hsl:" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} onCopy={() => copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} />
        <Row label="hwb:" value={`hwb(${hwb.h} ${hwb.w}% ${hwb.bl}%)`} onCopy={() => copy(`hwb(${hwb.h} ${hwb.w}% ${hwb.bl}%)`)} />
        <Row label="lch:" value={`lch(${lch.L} ${lch.C} ${lch.H})`} onCopy={() => copy(`lch(${lch.L} ${lch.C} ${lch.H})`)} />
        <Row label="cmyk:" value={`device-cmyk(${cmyk.c}% ${cmyk.m}% ${cmyk.y}% ${cmyk.k}%)`} onCopy={() => copy(`device-cmyk(${cmyk.c}% ${cmyk.m}% ${cmyk.y}% ${cmyk.k}%)`)} />
        <Row label="name:" value={nearestName} onCopy={() => copy(nearestName)} />
      </div>
    </div>
  );
}

function Row({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-sm text-gray-300">{label}</span>
      <input value={value} readOnly className="flex-1 h-10 px-3 rounded-xl border border-gray-700/40 bg-gray-800 text-white font-mono" />
      <button onClick={onCopy} className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-700/40 hover:bg-gray-700 transition-smooth text-white">⧉</button>
    </div>
  );
}


