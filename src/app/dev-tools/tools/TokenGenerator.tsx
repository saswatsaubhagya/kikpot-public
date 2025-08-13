"use client";

import { useEffect, useMemo, useState } from "react";

export default function TokenGenerator() {
  const [length, setLength] = useState<number>(32);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const charsets = useMemo(
    () => ({
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()-_=+[]{};:,.?/|~",
    }),
    []
  );

  const getRandomValues = (size: number): Uint32Array => {
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint32Array(size);
      window.crypto.getRandomValues(arr);
      return arr;
    }
    return Uint32Array.from({ length: size }, () => Math.floor(Math.random() * 2 ** 32));
  };

  const regenerate = () => {
    let pool = "";
    if (useUpper) pool += charsets.upper;
    if (useLower) pool += charsets.lower;
    if (useNumbers) pool += charsets.numbers;
    if (useSymbols) pool += charsets.symbols;
    if (!pool) {
      setToken("");
      return;
    }
    const bytes = getRandomValues(length);
    let out = "";
    for (let i = 0; i < length; i++) {
      out += pool[bytes[i] % pool.length];
    }
    setToken(out);
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copy = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <span className="text-sm text-gray-700 dark:text-gray-200">Uppercase</span>
          <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <span className="text-sm text-gray-700 dark:text-gray-200">Lowercase</span>
          <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <span className="text-sm text-gray-700 dark:text-gray-200">Numbers</span>
          <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <span className="text-sm text-gray-700 dark:text-gray-200">Symbols</span>
          <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
        </label>
        <div className="col-span-2 md:col-span-5 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-200">Length</span>
            <span className="text-xs text-gray-600 dark:text-gray-300 font-mono">{length}</span>
          </div>
          <input
            type="range"
            min={1}
            max={512}
            step={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
        </div>
      </div>

      <div>
        <textarea
          readOnly
          value={token}
          className="w-full h-32 p-3 border border-gray-200 rounded-2xl bg-gray-50 dark:bg-gray-900/40 dark:border-gray-700/50 font-mono text-sm select-all text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="flex items-center gap-3">
        <button onClick={regenerate} className="btn-secondary px-5 py-2.5">
          Refresh
        </button>
        <button onClick={copy} className="btn-primary px-5 py-2.5">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}


