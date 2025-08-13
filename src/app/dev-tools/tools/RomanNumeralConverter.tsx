"use client";

import { useMemo, useState } from "react";

const ROMAN_NUMERAL_PAIRS: Array<[number, string]> = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function convertArabicToRoman(input: string): string {
  const n = Number(input.replace(/[^0-9-]/g, ""));
  if (!Number.isFinite(n) || !Number.isInteger(n)) return "";
  if (n <= 0 || n >= 4000) return ""; // classic roman range 1..3999
  let value = n;
  let out = "";
  for (const [num, sym] of ROMAN_NUMERAL_PAIRS) {
    while (value >= num) {
      out += sym;
      value -= num;
    }
  }
  return out;
}

const ROMAN_TO_VALUE: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function convertRomanToArabic(roman: string): string {
  const s = roman.toUpperCase().replace(/[^IVXLCDM]/g, "");
  if (!s) return "";
  let total = 0;
  let i = 0;
  while (i < s.length) {
    const cur = ROMAN_TO_VALUE[s[i]] ?? 0;
    const next = ROMAN_TO_VALUE[s[i + 1]] ?? 0;
    if (next > cur) {
      total += next - cur;
      i += 2;
    } else {
      total += cur;
      i += 1;
    }
  }
  // Validate by re-encoding to ensure canonical/valid sequence
  const canonical = convertArabicToRoman(String(total));
  if (canonical !== s) return String(total); // still return numeric even if non‑canonical
  return String(total);
}

export default function RomanNumeralConverter() {
  const [arabic, setArabic] = useState("42");
  const [roman, setRoman] = useState("XLII");

  const arabicResult = useMemo(() => convertArabicToRoman(arabic), [arabic]);
  const romanResult = useMemo(() => convertRomanToArabic(roman), [roman]);

  const copy = (text: string) => {
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Convert Roman numerals to numbers and convert numbers to Roman numerals.
      </p>

      <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Number to Roman</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <input
            value={arabic}
            onChange={(e) => setArabic(e.target.value)}
            className="md:col-span-1 h-11 px-3 rounded-xl border border-gray-200 bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40 text-white font-mono"
            placeholder="e.g. 42"
          />
          <div className="md:col-span-1 text-2xl text-center text-white font-semibold">
            {arabicResult || ""}
          </div>
          <div className="md:col-span-1 flex md:justify-end">
            <button
              onClick={() => copy(arabicResult)}
              className="px-4 h-11 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white"
            >
              Copy
            </button>
          </div>
        </div>
      </section>

      <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Roman to Number</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <input
            value={roman}
            onChange={(e) => setRoman(e.target.value)}
            className="md:col-span-1 h-11 px-3 rounded-xl border border-gray-200 bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40 text-white font-mono"
            placeholder="e.g. XLII"
          />
          <div className="md:col-span-1 text-2xl text-center text-white font-semibold">
            {romanResult || ""}
          </div>
          <div className="md:col-span-1 flex md:justify-end">
            <button
              onClick={() => copy(romanResult)}
              className="px-4 h-11 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white"
            >
              Copy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


