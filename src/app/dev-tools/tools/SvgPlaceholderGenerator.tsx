"use client";

import { useEffect, useMemo, useState } from "react";

function normalizeHexColor(input: string, fallback: string): string {
  if (!input) return fallback;
  const value = input.trim();
  if (!value.startsWith("#")) return value; // allow named colors
  const hex = value.replace(/[^#0-9a-fA-F]/g, "");
  if (/^#([0-9a-fA-F]{3})$/.test(hex)) return hex;
  if (/^#([0-9a-fA-F]{6})$/.test(hex)) return hex;
  if (/^#([0-9a-fA-F]{4})$/.test(hex)) return `#${hex.slice(1, 4)}`; // strip alpha
  if (/^#([0-9a-fA-F]{8})$/.test(hex)) return `#${hex.slice(1, 7)}`; // strip alpha
  return fallback;
}

function toBase64Svg(svg: string): string {
  const utf8 = new TextEncoder().encode(svg);
  let binary = "";
  utf8.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  return `data:image/svg+xml;base64,${base64}`;
}

export default function SvgPlaceholderGenerator() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(350);
  const [fontSize, setFontSize] = useState(26);
  const [bg, setBg] = useState("#cccccc");
  const [fg, setFg] = useState("#333333");
  const [text, setText] = useState("");
  const [exact, setExact] = useState(true);
  const [svgString, setSvgString] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  const displayText = useMemo(() => text || `${width}x${height}` , [text, width, height]);

  const svg = useMemo(() => {
    const w = Math.max(1, Math.floor(width));
    const h = Math.max(1, Math.floor(height));
    const fs = Math.max(1, Math.floor(fontSize));
    const bgColor = normalizeHexColor(bg, "#cccccc");
    const fgColor = normalizeHexColor(fg, "#333333");
    const sizeAttrs = exact ? ` width="${w}" height="${h}"` : "";
    return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${sizeAttrs}>\n  <rect width="${w}" height="${h}" fill="${bgColor}"/>\n  <text x="50%" y="50%" fill="${fgColor}" font-size="${fs}" dominant-baseline="middle" text-anchor="middle">${displayText}</text>\n</svg>`;
  }, [width, height, fontSize, bg, fg, exact, displayText]);

  useEffect(() => {
    setSvgString(svg);
    setDataUrl(toBase64Svg(svg));
  }, [svg]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  const download = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `placeholder-${width}x${height}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">SVG placeholder generator</div>
      <p className="text-sm text-gray-400">Generate svg images to use as a placeholder in your applications.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Width (in px)</label>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="min-w-0 flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
                />
                <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={() => setWidth((w) => w + 10)}>+</button>
                <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={() => setWidth((w) => Math.max(1, w - 10))}>−</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Height (in px)</label>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="min-w-0 flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
                />
                <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={() => setHeight((h) => h + 10)}>+</button>
                <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={() => setHeight((h) => Math.max(1, h - 10))}>−</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Font size</label>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="min-w-0 flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
                />
                <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={() => setFontSize((s) => s + 2)}>+</button>
                <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={() => setFontSize((s) => Math.max(1, s - 2))}>−</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Custom text</label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Default is ${width}x${height}`}
                className="min-w-0 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Background</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={normalizeHexColor(bg, '#cccccc')}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-10 w-12 p-0 rounded-xl border border-gray-700 bg-transparent"
                />
                <input
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-white text-black font-mono text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Text color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={normalizeHexColor(fg, '#333333')}
                  onChange={(e) => setFg(e.target.value)}
                  className="h-10 w-12 p-0 rounded-xl border border-gray-700 bg-transparent"
                />
                <input
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-black text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={exact} onChange={(e) => setExact(e.target.checked)} />
            Use exact size
          </label>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">SVG HTML element</label>
            <textarea value={svgString} readOnly className="w-full h-44 p-3 border border-gray-700 rounded-2xl font-mono text-sm text-white bg-transparent" />
            <div className="flex gap-3">
              <button onClick={() => copy(svgString)} className="px-4 h-10 rounded-xl border border-gray-700 hover:bg-gray-800 text-white">Copy svg</button>
              <button onClick={() => copy(dataUrl)} className="px-4 h-10 rounded-xl border border-gray-700 hover:bg-gray-800 text-white">Copy base64</button>
              <button onClick={download} className="btn-primary px-5 py-2.5">Download svg</button>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 overflow-hidden">
          <div className="w-full aspect-[16/9] bg-gray-200/20 flex items-center justify-center overflow-hidden rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${Math.max(1, Math.floor(width))} ${Math.max(1, Math.floor(height))}`}
              className="w-full h-full"
            >
              <rect width={Math.max(1, Math.floor(width))} height={Math.max(1, Math.floor(height))} fill={normalizeHexColor(bg, "#cccccc")} />
              <text
                x="50%"
                y="50%"
                fill={normalizeHexColor(fg, "#333333")}
                fontSize={Math.max(1, Math.floor(fontSize))}
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {displayText}
              </text>
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}


