"use client";

import { useMemo, useState } from "react";

function textToUnicodeNumericReferences(input: string): string {
  if (!input) return "";
  const parts: string[] = [];
  for (const char of input) {
    const codePoint = char.codePointAt(0);
    if (codePoint == null) continue;
    parts.push(`&#${codePoint};`);
  }
  return parts.join("");
}

function unicodeNumericReferencesToText(input: string): string {
  if (!input.trim()) return "";
  // Accept sequences like &#115;&#97; and ignore any non-matching text
  const result: string[] = [];
  const regex = /&#(\d+);/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    const code = Number(match[1]);
    if (Number.isFinite(code)) {
      try {
        result.push(String.fromCodePoint(code));
      } catch {
        // skip invalid code points
      }
    }
  }
  return result.join("");
}

function Section({
  title,
  inputPlaceholder,
  inputValue,
  onInputChange,
  outputValue,
  copyLabel,
  onCopy,
}: {
  title: string;
  inputPlaceholder: string;
  inputValue: string;
  onInputChange: (v: string) => void;
  outputValue: string;
  copyLabel: string;
  onCopy: () => void;
}) {
  return (
    <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Enter {inputPlaceholder}</div>
        <textarea
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className="w-full h-28 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
        />
      </div>
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title.includes("to Text") ? "Text from your Unicode" : "Unicode from your text"}</div>
        <textarea
          value={outputValue}
          readOnly
          className="w-full h-24 p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
        />
      </div>
      <div>
        <button onClick={onCopy} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">{copyLabel}</button>
      </div>
    </section>
  );
}

export default function TextToUnicode() {
  const [textInput, setTextInput] = useState("");
  const [unicodeInput, setUnicodeInput] = useState("");

  const unicodeFromText = useMemo(() => textToUnicodeNumericReferences(textInput), [textInput]);
  const textFromUnicode = useMemo(() => unicodeNumericReferencesToText(unicodeInput), [unicodeInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Parse and convert text to unicode and vice-versa.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section
          title="Text to Unicode"
          inputPlaceholder="text to convert to unicode"
          inputValue={textInput}
          onInputChange={setTextInput}
          outputValue={unicodeFromText}
          copyLabel="Copy unicode to clipboard"
          onCopy={() => copy(unicodeFromText)}
        />

        <Section
          title="Unicode to Text"
          inputPlaceholder="unicode to convert to text"
          inputValue={unicodeInput}
          onInputChange={setUnicodeInput}
          outputValue={textFromUnicode}
          copyLabel="Copy text to clipboard"
          onCopy={() => copy(textFromUnicode)}
        />
      </div>
    </div>
  );
}


