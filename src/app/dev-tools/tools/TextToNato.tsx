"use client";

import { useMemo, useState } from "react";

const NATO: Record<string, string> = {
  A: "Alpha",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliett",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Niner",
};

function toNatoString(input: string): string {
  if (!input) return "";
  const parts: string[] = [];
  for (const ch of input) {
    if (ch.trim() === "") {
      parts.push(" ");
      continue;
    }
    const key = ch.toUpperCase();
    const word = NATO[key];
    if (word) {
      parts.push(word);
    } else {
      parts.push(ch);
    }
  }
  // collapse multiple spaces without removing intentional spacers between words
  return parts
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .replace(/\s+([,.;:!?])/g, "$1");
}

export default function TextToNato() {
  const [text, setText] = useState("");
  const nato = useMemo(() => toNatoString(text), [text]);

  const copy = () => {
    if (!nato) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(nato).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Transform text into the NATO phonetic alphabet for oral transmission.
      </p>

      <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="text-sm text-gray-300">Your text to convert to NATO phonetic alphabet</div>
        <div className="relative">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-11 px-3 pr-10 rounded-xl border border-gray-700/40 bg-gray-800 text-white"
            placeholder="Type here…"
          />
          {text && (
            <button
              onClick={() => setText("")}
              aria-label="clear"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md border border-gray-700/40 text-white hover:bg-gray-700"
            >
              ×
            </button>
          )}
        </div>
      </section>

      <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="text-sm text-gray-300">Your text in NATO phonetic alphabet</div>
        <div className="w-full min-h-14 p-3 rounded-xl border border-gray-700/40 bg-gray-800 text-white">
          {nato || ""}
        </div>
        <div>
          <button onClick={copy} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">
            Copy NATO string
          </button>
        </div>
      </section>
    </div>
  );
}


