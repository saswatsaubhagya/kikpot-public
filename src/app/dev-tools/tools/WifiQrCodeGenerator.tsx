"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

type Security = "WPA" | "WEP" | "nopass";

function escapeWifiValue(raw: string): string {
  // Per spec, escape \ ; , :
  return raw.replace(/[\\;,:]/g, (m) => `\\${m}`);
}

function normalizeHexColor(input: string, fallback: string): string {
  if (!input) return fallback;
  const value = input.trim();
  if (!value.startsWith("#")) return value; // allow named colors and rgb(a)
  const hex = value.replace(/[^#0-9a-fA-F]/g, "");
  if (/^#([0-9a-fA-F]{3})$/.test(hex)) return hex;
  if (/^#([0-9a-fA-F]{6})$/.test(hex)) return hex;
  if (/^#([0-9a-fA-F]{4})$/.test(hex)) return `#${hex.slice(1, 4)}`; // strip alpha
  if (/^#([0-9a-fA-F]{8})$/.test(hex)) return `#${hex.slice(1, 7)}`; // strip alpha
  return fallback;
}

export default function WifiQrCodeGenerator() {
  const [securityUi, setSecurityUi] = useState<"WPA/WPA2" | "WEP" | "None">("WEP");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const security: Security = useMemo(() => {
    if (securityUi === "WEP") return "WEP";
    if (securityUi === "None") return "nopass";
    return "WPA"; // WPA/WPA2
  }, [securityUi]);

  const payload = useMemo(() => {
    const parts = [
      `WIFI:T:${security};`,
      `S:${escapeWifiValue(ssid)};`,
    ];
    if (security !== "nopass") parts.push(`P:${escapeWifiValue(password)};`);
    if (hidden) parts.push(`H:true;`);
    // Two trailing semicolons are accepted but one is fine; keep one for brevity
    return parts.join("");
  }, [security, ssid, password, hidden]);

  const qrOptions = useMemo(() => {
    return {
      errorCorrectionLevel: "M" as const,
      margin: 2,
      color: {
        dark: normalizeHexColor(fg, "#000000"),
        light: normalizeHexColor(bg, "#ffffff"),
      },
      width: 512,
      scale: 6,
    } as const;
  }, [fg, bg]);

  useEffect(() => {
    const value = payload;
    if (!ssid) {
      setDataUrl("");
      return;
    }
    QRCode.toDataURL(value, qrOptions)
      .then((url: string) => {
        setError(null);
        setDataUrl(url);
      })
      .catch(() => setError("Failed to generate QR code. Check inputs."));
  }, [payload, qrOptions, ssid]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "wifi-qr-code.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">WiFi QR Code generator</div>
      <p className="text-sm text-gray-400">Generate and download QR codes for quick connections to WiFi networks.</p>

      <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Encryption method</label>
          <select
            value={securityUi}
            onChange={(e) => setSecurityUi(e.target.value as typeof securityUi)}
            className="w-full h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
          >
            <option value="WPA/WPA2">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="None">None</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">SSID:</label>
            <div className="flex items-center gap-3">
              <input
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                className="flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
                placeholder="Your WiFi SSID..."
              />
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
                Hidden SSID
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Password:</label>
            <div className="flex items-center gap-3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
                placeholder="Your WiFi Password..."
                disabled={security === "nopass"}
              />
              <button
                onClick={() => setShowPassword((s) => !s)}
                className="px-3 h-10 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800"
                aria-label="Toggle password visibility"
                type="button"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
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

        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt="wifi-qr" className="w-64 h-64 object-contain" />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-gray-500">Enter SSID to preview</div>
            )}
          </div>
          <button onClick={download} className="btn-primary px-5 py-2.5" disabled={!dataUrl}>Download qr-code</button>
        </div>

        {error && <div className="p-3 bg-red-50/10 text-red-400 rounded-2xl border border-red-900/30">{error}</div>}
      </div>
    </div>
  );
}


