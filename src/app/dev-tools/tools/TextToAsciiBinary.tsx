"use client";

import { useMemo, useState } from "react";

function textToBinary(input: string): string {
  return Array.from(input)
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(input: string): string {
  const groups = input.trim().split(/\s+/).filter(Boolean);
  if (groups.length === 0) return "";
  const chars = groups.map((g) => {
    if (!/^([01]{8})$/.test(g)) return ""; // invalid group → decode to empty char
    const code = parseInt(g, 2);
    return String.fromCharCode(code);
  });
  return chars.join("");
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
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title.includes("to text") ? "Text from your binary" : "Binary from your text"}</div>
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

export default function TextToAsciiBinary() {
  const [textInput, setTextInput] = useState("");
  const [binaryInput, setBinaryInput] = useState("");

  const binaryFromText = useMemo(() => textToBinary(textInput), [textInput]);
  const textFromBinary = useMemo(() => binaryToText(binaryInput), [binaryInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Convert text to its ASCII binary representation and vice-versa.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section
          title="Text to ASCII binary"
          inputPlaceholder="text to convert to binary"
          inputValue={textInput}
          onInputChange={setTextInput}
          outputValue={binaryFromText}
          copyLabel="Copy binary to clipboard"
          onCopy={() => copy(binaryFromText)}
        />

        <Section
          title="ASCII binary to text"
          inputPlaceholder="binary to convert to text"
          inputValue={binaryInput}
          onInputChange={setBinaryInput}
          outputValue={textFromBinary}
          copyLabel="Copy text to clipboard"
          onCopy={() => copy(textFromBinary)}
        />
      </div>
    </div>
  );
}


