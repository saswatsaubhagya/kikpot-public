"use client";

import { useMemo, useState } from "react";

function splitWords(input: string): string[] {
  if (!input) return [];
  const spaced = input
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/[_\-\.\/]+/g, " ")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim();
  if (!spaced) return [];
  return spaced.split(/\s+/);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function toLowercase(input: string): string {
  return input.toLowerCase();
}

function toUppercase(input: string): string {
  return input.toUpperCase();
}

function toCamelCase(input: string): string {
  const words = splitWords(input).map((w) => w.toLowerCase());
  if (words.length === 0) return "";
  return words[0] + words.slice(1).map(capitalize).join("");
}

function toPascalCase(input: string): string {
  const words = splitWords(input);
  return words.map(capitalize).join("");
}

function toCapitalCase(input: string): string {
  const words = splitWords(input);
  return words.map(capitalize).join(" ");
}

function toConstantCase(input: string): string {
  const words = splitWords(input);
  return words.map((w) => w.toUpperCase()).join("_");
}

function toDotCase(input: string): string {
  const words = splitWords(input);
  return words.map((w) => w.toLowerCase()).join(".");
}

function toHeaderCase(input: string): string {
  const words = splitWords(input);
  return words.map(capitalize).join("-");
}

function toNoCase(input: string): string {
  const words = splitWords(input);
  return words.map((w) => w.toLowerCase()).join(" ");
}

function toParamCase(input: string): string {
  const words = splitWords(input);
  return words.map((w) => w.toLowerCase()).join("-");
}

function toPathCase(input: string): string {
  const words = splitWords(input);
  return words.map((w) => w.toLowerCase()).join("/");
}

function toSentenceCase(input: string): string {
  const lower = input.toLowerCase().trim();
  if (!lower) return "";
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function toSnakeCase(input: string): string {
  const words = splitWords(input);
  return words.map((w) => w.toLowerCase()).join("_");
}

function toMockingCase(input: string): string {
  let toggleUpper = true;
  let out = "";
  for (const ch of input.toLowerCase()) {
    if (/[a-z]/.test(ch)) {
      out += toggleUpper ? ch.toUpperCase() : ch;
      toggleUpper = !toggleUpper;
    } else {
      out += ch;
    }
  }
  return out;
}

function Row({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-32 shrink-0 text-sm text-gray-300">{label}</div>
      <input
        value={value}
        readOnly
        className="flex-1 h-10 px-3 rounded-xl border border-gray-700/40 bg-gray-800 text-white font-mono"
      />
      <button onClick={onCopy} className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-gray-700/40 hover:bg-gray-700 transition-smooth text-white">⧉</button>
    </div>
  );
}

export default function CaseConverter() {
  const [input, setInput] = useState("lorem ipsum dolor sit amet");

  const values = useMemo(() => {
    return {
      lowercase: toLowercase(input),
      uppercase: toUppercase(input),
      camelcase: toCamelCase(input),
      capitalcase: toCapitalCase(input),
      constantcase: toConstantCase(input),
      dotcase: toDotCase(input),
      headercase: toHeaderCase(input),
      nocase: toNoCase(input),
      paramcase: toParamCase(input),
      pascalcase: toPascalCase(input),
      pathcase: toPathCase(input),
      sentencecase: toSentenceCase(input),
      snakecase: toSnakeCase(input),
      mockingcase: toMockingCase(input),
    };
  }, [input]);

  const copy = (text: string) => {
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Transform the case of a string and choose between different formats
      </p>

      <div className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-32 shrink-0 text-sm text-gray-300">Your string:</div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 h-11 px-3 rounded-xl border border-gray-700/40 bg-gray-800 text-white"
            placeholder="Type…"
          />
        </div>

        <div className="border-t border-gray-800 my-2" />

        <Row label="Lowercase:" value={values.lowercase} onCopy={() => copy(values.lowercase)} />
        <Row label="Uppercase:" value={values.uppercase} onCopy={() => copy(values.uppercase)} />
        <Row label="Camelcase:" value={values.camelcase} onCopy={() => copy(values.camelcase)} />
        <Row label="Capitalcase:" value={values.capitalcase} onCopy={() => copy(values.capitalcase)} />
        <Row label="Constantcase:" value={values.constantcase} onCopy={() => copy(values.constantcase)} />
        <Row label="Dotcase:" value={values.dotcase} onCopy={() => copy(values.dotcase)} />
        <Row label="Headercase:" value={values.headercase} onCopy={() => copy(values.headercase)} />
        <Row label="Nocase:" value={values.nocase} onCopy={() => copy(values.nocase)} />
        <Row label="Paramcase:" value={values.paramcase} onCopy={() => copy(values.paramcase)} />
        <Row label="Pascalcase:" value={values.pascalcase} onCopy={() => copy(values.pascalcase)} />
        <Row label="Pathcase:" value={values.pathcase} onCopy={() => copy(values.pathcase)} />
        <Row label="Sentencecase:" value={values.sentencecase} onCopy={() => copy(values.sentencecase)} />
        <Row label="Snakecase:" value={values.snakecase} onCopy={() => copy(values.snakecase)} />
        <Row label="Mockingcase:" value={values.mockingcase} onCopy={() => copy(values.mockingcase)} />
      </div>
    </div>
  );
}


