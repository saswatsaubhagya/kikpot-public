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
      <p className="text-sm text-dim ">
        Simply encode and decode strings into their base64 representation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">String to base64</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-dim ">Encode URL safe</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={encodeUrlSafe} onChange={(e) => setEncodeUrlSafe(e.target.checked)} className="sr-only peer" />
              <div className="w-10 h-5 bg-surface-2 rounded-full peer peer-checked:bg-brand transition-colors"></div>
            </label>
          </div>
          <div>
            <div className="text-xs text-dim mb-1">String to encode</div>
            <textarea
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              className="w-full h-36 p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface "
              placeholder="Put your string here..."
            />
          </div>
          <div>
            <div className="text-xs text-dim mb-1">Base64 of string</div>
            <textarea
              value={encoded || ""}
              onChange={() => {}}
              readOnly
              className="w-full h-28 p-3 border border-hairline rounded-2xl font-mono text-sm text-text bg-surface "
              placeholder="The base64 encoding of your string will be here"
            />
          </div>
          <div>
            <button onClick={() => copy(encoded)} className="px-4 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">Copy base64</button>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">Base64 to string</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-dim ">Decode URL safe</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={decodeUrlSafe} onChange={(e) => setDecodeUrlSafe(e.target.checked)} className="sr-only peer" />
              <div className="w-10 h-5 bg-surface-2 rounded-full peer peer-checked:bg-brand transition-colors"></div>
            </label>
          </div>
          <div>
            <div className="text-xs text-dim mb-1">Base64 string to decode</div>
            <textarea
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              className="w-full h-36 p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface "
              placeholder="Your base64 string..."
            />
          </div>
          <div>
            <div className="text-xs text-dim mb-1">Decoded string</div>
            <textarea
              value={decoded || ""}
              onChange={() => {}}
              readOnly
              className="w-full h-28 p-3 border border-hairline rounded-2xl font-mono text-sm text-text bg-surface "
              placeholder="The decoded string will be here"
            />
          </div>
          <div>
            <button onClick={() => copy(decoded)} className="px-4 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">Copy decoded string</button>
          </div>
        </section>
      </div>
    </div>
  );
}


