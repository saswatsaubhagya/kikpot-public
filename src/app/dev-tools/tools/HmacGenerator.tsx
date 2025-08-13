"use client";

import { useEffect, useState } from "react";
import { WebCryptoAlgo, bytesToBase64, bytesToHex, computeHmacRaw } from "./hashUtils";

export default function HmacGenerator() {
  const [text, setText] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [algo, setAlgo] = useState<WebCryptoAlgo>("SHA-384");
  const [encoding, setEncoding] = useState<"hex" | "base64">("hex");
  const [hmac, setHmac] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bytes = await computeHmacRaw(algo, secret, text);
        const value = encoding === "hex" ? bytesToHex(bytes) : bytesToBase64(bytes);
        if (!cancelled) setHmac(value);
      } catch {
        if (!cancelled) setHmac("");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [text, secret, algo, encoding]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hmac);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore copy failures
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Plain text to compute the hash</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your string to sign..."
          className="w-full h-28 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60 dark:bg-gray-900/40 dark:text-gray-100 dark:border-gray-700/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Secret key</label>
        <input
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret..."
          className="w-full h-10 px-3 rounded-2xl border bg-white/70 border-gray-200 backdrop-blur-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-900/40 dark:border-gray-700/50 dark:text-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Hashing function</label>
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value as WebCryptoAlgo)}
            className="h-10 px-3 rounded-xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
          >
            <option value="SHA-1">SHA1</option>
            <option value="SHA-256">SHA256</option>
            <option value="SHA-384">SHA384</option>
            <option value="SHA-512">SHA512</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Output encoding</label>
          <select
            value={encoding}
            onChange={(e) => setEncoding(e.target.value as "hex" | "base64")}
            className="h-10 px-3 rounded-xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
          >
            <option value="hex">Hexadecimal (base 16)</option>
            <option value="base64">Base64</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">HMAC of your text</label>
        <div className="flex items-center gap-3">
          <input
            readOnly
            value={hmac}
            placeholder=""
            className="flex-1 h-10 px-3 rounded-2xl border bg-white/70 border-gray-200 backdrop-blur-xl dark:bg-gray-900/40 dark:border-gray-700/50 dark:text-gray-100 font-mono text-sm"
          />
          <button onClick={copy} className="btn-secondary px-4 py-2">{copied ? "Copied" : "Copy HMAC"}</button>
        </div>
      </div>
    </div>
  );
}


