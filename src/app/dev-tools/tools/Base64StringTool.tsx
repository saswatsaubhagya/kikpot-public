"use client";

import { useMemo, useState } from "react";

function toBase64(input: string): string {
  try {
    return typeof window === "undefined" ? "" : window.btoa(unescape(encodeURIComponent(input)));
  } catch {
    return "";
  }
}

function fromBase64(b64: string): string {
  try {
    return typeof window === "undefined" ? "" : decodeURIComponent(escape(window.atob(b64)));
  } catch {
    return "";
  }
}

function toBase64Url(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(b64url: string): string {
  const padded = b64url.replace(/-/g, "+").replace(/_/g, "/");
  // add padding
  const padLength = (4 - (padded.length % 4)) % 4;
  return padded + "=".repeat(padLength);
}

export default function Base64StringTool() {
  const [encodeUrlSafe, setEncodeUrlSafe] = useState(false);
  const [encodeInput, setEncodeInput] = useState("");

  const [decodeUrlSafe, setDecodeUrlSafe] = useState(false);
  const [decodeInput, setDecodeInput] = useState("");

  const encoded = useMemo(() => {
    const b64 = toBase64(encodeInput);
    if (!b64) return "";
    return encodeUrlSafe ? toBase64Url(b64) : b64;
  }, [encodeInput, encodeUrlSafe]);

  const decoded = useMemo(() => {
    if (!decodeInput) return "";
    const b64 = decodeUrlSafe ? fromBase64Url(decodeInput) : decodeInput;
    return fromBase64(b64);
  }, [decodeInput, decodeUrlSafe]);

  const copy = (text: string) => {
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Simply encode and decode strings into their base64 representation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">String to base64</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Encode URL safe</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={encodeUrlSafe} onChange={(e) => setEncodeUrlSafe(e.target.checked)} className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-purple-600 transition-colors"></div>
            </label>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">String to encode</div>
            <textarea
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              className="w-full h-36 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
              placeholder="Put your string here..."
            />
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Base64 of string</div>
            <textarea
              value={encoded || ""}
              onChange={() => {}}
              readOnly
              className="w-full h-28 p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
              placeholder="The base64 encoding of your string will be here"
            />
          </div>
          <div>
            <button onClick={() => copy(encoded)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy base64</button>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Base64 to string</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Decode URL safe</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={decodeUrlSafe} onChange={(e) => setDecodeUrlSafe(e.target.checked)} className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-purple-600 transition-colors"></div>
            </label>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Base64 string to decode</div>
            <textarea
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              className="w-full h-36 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
              placeholder="Your base64 string..."
            />
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Decoded string</div>
            <textarea
              value={decoded || ""}
              onChange={() => {}}
              readOnly
              className="w-full h-28 p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
              placeholder="The decoded string will be here"
            />
          </div>
          <div>
            <button onClick={() => copy(decoded)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy decoded string</button>
          </div>
        </section>
      </div>
    </div>
  );
}


