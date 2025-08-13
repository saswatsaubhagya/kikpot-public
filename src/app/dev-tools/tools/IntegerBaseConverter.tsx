"use client";

import { useCallback, useMemo, useState } from "react";

const BASE64_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";

function normalizeInput(input: string): string {
  return input.replace(/[_\s]/g, "");
}

function charToValue(char: string): number {
  const idx = BASE64_ALPHABET.indexOf(char);
  if (idx !== -1) return idx;
  // also accept uppercase for a-z
  const lower = char.toLowerCase();
  return BASE64_ALPHABET.indexOf(lower);
}

function valueToChar(value: number): string {
  return BASE64_ALPHABET[value] ?? "";
}

function convertToDecimal(value: string, base: number): bigint | null {
  if (base < 2 || base > 64) return null;
  const trimmed = normalizeInput(value);
  if (trimmed === "") return 0n;
  let isNegative = false;
  let startIndex = 0;
  if (trimmed[0] === "-") {
    isNegative = true;
    startIndex = 1;
  }
  let result = 0n;
  for (let i = startIndex; i < trimmed.length; i++) {
    const ch = trimmed[i];
    const digit = charToValue(ch);
    if (digit < 0 || digit >= base) return null;
    result = result * BigInt(base) + BigInt(digit);
  }
  return isNegative ? -result : result;
}

function convertFromDecimal(decimal: bigint, base: number): string {
  if (base < 2 || base > 64) return "";
  if (decimal === 0n) return "0";
  const isNegative = decimal < 0n;
  let n = isNegative ? -decimal : decimal;
  let out = "";
  const b = BigInt(base);
  while (n > 0n) {
    const rem = Number(n % b);
    out = valueToChar(rem) + out;
    n = n / b;
  }
  return isNegative ? "-" + out : out;
}

function clampBase(n: number): number {
  return Math.max(2, Math.min(64, Math.floor(n || 0)));
}

function OutputRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-36 shrink-0 text-sm text-gray-600 dark:text-gray-300">{label}</div>
      <input
        className="flex-1 h-10 px-3 rounded-xl border border-gray-200 bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40 text-white font-mono text-sm"
        value={value}
        readOnly
      />
      <button onClick={onCopy} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">
        ⧉
      </button>
    </div>
  );
}

export default function IntegerBaseConverter() {
  const [input, setInput] = useState("42");
  const [inputBase, setInputBase] = useState(10);
  const [customBase, setCustomBase] = useState(10);

  const decimal = useMemo(() => convertToDecimal(input, inputBase), [input, inputBase]);

  const toBase = useCallback(
    (base: number) => {
      if (decimal === null) return "Invalid";
      return convertFromDecimal(decimal, base);
    },
    [decimal]
  );

  const handleCopy = useCallback((text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }, []);

  const invalid = decimal === null;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Convert a number between different bases (decimal, hexadecimal, binary, octal, base64, ...)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Input number</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40 text-white font-mono text-sm"
            placeholder="Enter a number"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Input base</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={2}
              max={64}
              value={inputBase}
              onChange={(e) => setInputBase(clampBase(Number(e.target.value)))}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40 text-white font-mono text-sm"
            />
            <button
              onClick={() => setInputBase((b) => clampBase(b - 1))}
              className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white"
              aria-label="decrease base"
            >
              −
            </button>
            <button
              onClick={() => setInputBase((b) => clampBase(b + 1))}
              className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white"
              aria-label="increase base"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2 space-y-3 border-t border-gray-200 dark:border-gray-800">
        <OutputRow label="Binary (2)" value={invalid ? "Invalid" : toBase(2)} onCopy={() => handleCopy(invalid ? "" : toBase(2))} />
        <OutputRow label="Octal (8)" value={invalid ? "Invalid" : toBase(8)} onCopy={() => handleCopy(invalid ? "" : toBase(8))} />
        <OutputRow label="Decimal (10)" value={invalid ? "Invalid" : toBase(10)} onCopy={() => handleCopy(invalid ? "" : toBase(10))} />
        <OutputRow label="Hexadecimal (16)" value={invalid ? "Invalid" : toBase(16)} onCopy={() => handleCopy(invalid ? "" : toBase(16))} />
        <OutputRow label="Base64 (64)" value={invalid ? "Invalid" : toBase(64)} onCopy={() => handleCopy(invalid ? "" : toBase(64))} />
        <div className="flex items-center gap-4">
          <div className="w-36 shrink-0 text-sm text-gray-600 dark:text-gray-300">Custom:</div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomBase((b) => clampBase(b - 1))}
                className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white"
                aria-label="decrease custom base"
              >
                −
              </button>
              <span className="w-16 text-center text-white font-mono">{invalid ? "" : toBase(customBase)}</span>
              <button
                onClick={() => setCustomBase((b) => clampBase(b + 1))}
                className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white"
                aria-label="increase custom base"
              >
                +
              </button>
            </div>
            <input
              type="number"
              min={2}
              max={64}
              value={customBase}
              onChange={(e) => setCustomBase(clampBase(Number(e.target.value)))}
              className="w-20 h-10 px-3 rounded-xl border border-gray-200 bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40 text-white font-mono text-sm"
            />
            <button onClick={() => handleCopy(invalid ? "" : toBase(customBase))} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">
              ⧉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


