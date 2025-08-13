"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

type ErrorLevel = "low" | "medium" | "quartile" | "high";

const levelMap: Record<ErrorLevel, "L" | "M" | "Q" | "H"> = {
  low: "L",
  medium: "M",
  quartile: "Q",
  high: "H",
};

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [level, setLevel] = useState<ErrorLevel>("medium");
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function normalizeHexColor(input: string, fallback: string): string {
    if (!input) return fallback;
    const value = input.trim();
    // Allow named colors or rgb(a) as-is
    if (!value.startsWith('#')) return value;
    // Remove non-hex chars
    const hex = value.replace(/[^#0-9a-fA-F]/g, '');
    // #RGB or #RRGGBB
    if (/^#([0-9a-fA-F]{3})$/.test(hex)) return hex;
    if (/^#([0-9a-fA-F]{6})$/.test(hex)) return hex;
    // #RGBA or #RRGGBBAA -> strip alpha
    if (/^#([0-9a-fA-F]{4})$/.test(hex)) return `#${hex.slice(1, 4)}`;
    if (/^#([0-9a-fA-F]{8})$/.test(hex)) return `#${hex.slice(1, 7)}`;
    return fallback;
  }

  const qrOptions = useMemo(() => {
    return {
      errorCorrectionLevel: levelMap[level],
      margin: 2,
      color: {
        dark: normalizeHexColor(fg, '#000000'),
        light: normalizeHexColor(bg, '#ffffff'),
      },
      width: 512,
      scale: 6,
    } as const;
  }, [fg, bg, level]);

  useEffect(() => {
    const value = text || "";
    QRCode.toDataURL(value, qrOptions)
      .then((url: string) => {
        setError(null);
        setDataUrl(url);
      })
      .catch(() => setError("Failed to generate QR code. Check colors or input."));
  }, [text, qrOptions]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">QR Code generator</div>
      <p className="text-sm text-gray-400">Generate and download a QR code for a URL (or just plain text), and customize the background and foreground colors.</p>

      <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm text-gray-300">Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-20 p-3 rounded-2xl border border-gray-700 bg-transparent text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm"
            placeholder="Paste text or URL..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Foreground color:</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={normalizeHexColor(fg, '#000000')}
                onChange={(e) => setFg(e.target.value)}
                className="h-10 w-12 p-0 rounded-xl border border-gray-700 bg-transparent"
                aria-label="Foreground color picker"
              />
              <input
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-black text-white font-mono text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Background color:</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={normalizeHexColor(bg, '#ffffff')}
                onChange={(e) => setBg(e.target.value)}
                className="h-10 w-12 p-0 rounded-xl border border-gray-700 bg-transparent"
                aria-label="Background color picker"
              />
              <input
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-white text-black font-mono text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Error resistance:</label>
          <div className="relative">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as ErrorLevel)}
              className="w-full h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="quartile">quartile</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt="qr" className="w-64 h-64 object-contain" />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-gray-500">No preview</div>
            )}
          </div>
          <button onClick={download} className="btn-primary px-5 py-2.5">Download qr-code</button>
        </div>

        {error && <div className="p-3 bg-red-50/10 text-red-400 rounded-2xl border border-red-900/30">{error}</div>}
      </div>
    </div>
  );
}


