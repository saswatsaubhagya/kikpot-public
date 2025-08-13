"use client";

import { useEffect, useState, useMemo } from "react";
import { WebCryptoAlgo, bytesToBase64, bytesToHex, computeHashRaw } from "./hashUtils";

export default function HashTextTool() {
  const [text, setText] = useState<string>("");
  const [encoding, setEncoding] = useState<"hex" | "base64">("hex");
  const [results, setResults] = useState<Record<WebCryptoAlgo, string>>({} as Record<WebCryptoAlgo, string>);
  const [copiedAlgo, setCopiedAlgo] = useState<WebCryptoAlgo | null>(null);

  const algorithms = useMemo<WebCryptoAlgo[]>(() => ["SHA-1", "SHA-256", "SHA-384", "SHA-512"], []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pairs = await Promise.all(
        algorithms.map(async (algo) => {
          const bytes = await computeHashRaw(algo, text);
          const value = encoding === "hex" ? bytesToHex(bytes) : bytesToBase64(bytes);
          return [algo, value] as const;
        })
      );
      if (!cancelled) {
        const map = pairs.reduce((acc, [k, v]) => {
          acc[k] = v;
          return acc;
        }, {} as Record<WebCryptoAlgo, string>);
        setResults(map);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [text, encoding, algorithms]);

  const copy = async (algo: WebCryptoAlgo) => {
    try {
      await navigator.clipboard.writeText(results[algo] || "");
      setCopiedAlgo(algo);
      setTimeout(() => setCopiedAlgo(null), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Your text to hash:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your string to hash..."
          className="w-full h-28 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60 dark:bg-gray-900/40 dark:text-gray-100 dark:border-gray-700/50"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Digest encoding</label>
        <select
          value={encoding}
          onChange={(e) => setEncoding(e.target.value as "hex" | "base64")}
          className="h-10 px-3 rounded-xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
        >
          <option value="hex">Hexadecimal (base 16)</option>
          <option value="base64">Base64</option>
        </select>
      </div>

      <div className="space-y-3">
        {algorithms.map((algo) => (
          <div key={algo} className="flex items-center gap-3 p-3 rounded-xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50">
            <div className="w-24 text-xs font-semibold text-gray-700 dark:text-gray-300">{algo}</div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate font-mono text-sm text-gray-900 dark:text-gray-100">{results[algo] || ""}</div>
            </div>
            <button onClick={() => copy(algo)} className="btn-secondary px-3 py-1.5 text-sm whitespace-nowrap">
              {copiedAlgo === algo ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


