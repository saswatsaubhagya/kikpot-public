"use client";

import { useMemo, useState } from "react";

type SortMode = "none" | "alpha" | "reverse" | "len-asc" | "len-desc";

function splitIntoItems(
  rawInput: string,
  separator: string,
  keepLineBreaks: boolean,
  splitOnWhitespace: boolean
): string[] {
  if (!rawInput) return [];
  // Precedence: whitespace splitting overrides others so users can quickly tokenise words
  if (splitOnWhitespace) return rawInput.trim().split(/\s+/g);
  if (keepLineBreaks) return rawInput.split(/\r?\n/);
  if (separator === "\n") return rawInput.split(/\r?\n/);
  if (!separator) return [rawInput];
  return rawInput.split(separator);
}

function transformList(
  rawInput: string,
  options: {
    separator: string;
    keepLineBreaks: boolean;
    splitOnWhitespace: boolean;
    trimItems: boolean;
    removeDuplicates: boolean;
    caseInsensitiveDedupe: boolean;
    ignoreEmpty: boolean;
    lowercase: boolean;
    sortMode: SortMode;
    itemPrefix: string;
    itemSuffix: string;
    listPrefix: string;
    listSuffix: string;
    outputSeparator: string;
  }
): string {
  const {
    separator,
    keepLineBreaks,
    splitOnWhitespace,
    trimItems,
    removeDuplicates,
    caseInsensitiveDedupe,
    ignoreEmpty,
    lowercase,
    sortMode,
    itemPrefix,
    itemSuffix,
    listPrefix,
    listSuffix,
    outputSeparator,
  } = options;

  let items = splitIntoItems(rawInput, separator, keepLineBreaks, splitOnWhitespace);
  if (trimItems) items = items.map((i) => i.trim());
  items = ignoreEmpty ? items.filter((i) => i.length > 0) : items;

  if (lowercase) items = items.map((i) => i.toLowerCase());
  if (removeDuplicates) {
    const seen = new Set<string>();
    items = items.filter((i) => {
      const key = caseInsensitiveDedupe ? i.toLowerCase() : i;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  switch (sortMode) {
    case "alpha":
      items = [...items].sort((a, b) => a.localeCompare(b));
      break;
    case "reverse":
      items = [...items].sort((a, b) => b.localeCompare(a));
      break;
    case "len-asc":
      items = [...items].sort((a, b) => a.length - b.length);
      break;
    case "len-desc":
      items = [...items].sort((a, b) => b.length - a.length);
      break;
    default:
      break;
  }

  if (itemPrefix || itemSuffix) items = items.map((i) => `${itemPrefix}${i}${itemSuffix}`);

  const joiner = keepLineBreaks ? "\n" : (outputSeparator !== undefined ? outputSeparator : ",");
  const core = items.join(joiner);
  if (!core) return "";
  return `${listPrefix}${core}${listSuffix}`;
}

export default function ListConverter() {
  const [rawInput, setRawInput] = useState("");
  const [trimItems, setTrimItems] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [caseInsensitiveDedupe, setCaseInsensitiveDedupe] = useState(true);
  const [lowercase, setLowercase] = useState(false);
  const [keepLineBreaks, setKeepLineBreaks] = useState(false);
  const [separator, setSeparator] = useState(",");
  const [outputSeparator, setOutputSeparator] = useState(",");
  const [splitOnWhitespace, setSplitOnWhitespace] = useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>("alpha");
  const [itemPrefix, setItemPrefix] = useState("");
  const [itemSuffix, setItemSuffix] = useState("");
  const [listPrefix, setListPrefix] = useState("");
  const [listSuffix, setListSuffix] = useState("");

  const output = useMemo(() => {
    return transformList(rawInput, {
      separator,
      keepLineBreaks,
      splitOnWhitespace,
      trimItems,
      removeDuplicates,
      caseInsensitiveDedupe,
      ignoreEmpty,
      lowercase,
      sortMode,
      itemPrefix,
      itemSuffix,
      listPrefix,
      listSuffix,
      outputSeparator,
    });
  }, [rawInput, separator, keepLineBreaks, splitOnWhitespace, trimItems, removeDuplicates, caseInsensitiveDedupe, ignoreEmpty, lowercase, sortMode, itemPrefix, itemSuffix, listPrefix, listSuffix, outputSeparator]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        This tool can process column‑based data and apply various changes (transpose, add prefix and suffix, reverse list, sort list, lowercase values, truncate values) to each row.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center justify-between gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200">Trim list items</span>
              <input type="checkbox" checked={trimItems} onChange={(e) => setTrimItems(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200">Remove duplicates</span>
              <input type="checkbox" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200">Case‑insensitive dedupe</span>
              <input type="checkbox" checked={caseInsensitiveDedupe} onChange={(e) => setCaseInsensitiveDedupe(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200">Convert to lowercase</span>
              <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200">Keep line breaks</span>
              <input type="checkbox" checked={keepLineBreaks} onChange={(e) => setKeepLineBreaks(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200">Split on whitespace</span>
              <input type="checkbox" checked={splitOnWhitespace} onChange={(e) => setSplitOnWhitespace(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200">Ignore empty items</span>
              <input type="checkbox" checked={ignoreEmpty} onChange={(e) => setIgnoreEmpty(e.target.checked)} />
            </label>
            <div className="flex items-center gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200 w-32">Sort list</span>
              <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)} className="flex-1 bg-transparent outline-none text-sm text-white">
                <option value="none">No sort</option>
                <option value="alpha">Sort alphabetically</option>
                <option value="reverse">Sort reverse</option>
                <option value="len-asc">Sort by length (asc)</option>
                <option value="len-desc">Sort by length (desc)</option>
              </select>
            </div>
            <div className="flex items-center gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200 w-32">Input separator</span>
              <input value={separator} onChange={(e) => setSeparator(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-white" />
            </div>
            <div className="flex items-center gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200 w-32">Output separator</span>
              <input value={outputSeparator} onChange={(e) => setOutputSeparator(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-white" />
            </div>
            <div className="flex items-center gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200 w-24">Wrap item</span>
              <input placeholder="" value={itemPrefix} onChange={(e) => setItemPrefix(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-white" />
              <input placeholder="" value={itemSuffix} onChange={(e) => setItemSuffix(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-white" />
            </div>
            <div className="flex items-center gap-3 px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-200 w-24">Wrap list</span>
              <input placeholder="" value={listPrefix} onChange={(e) => setListPrefix(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-white" />
              <input placeholder="" value={listSuffix} onChange={(e) => setListSuffix(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-white" />
            </div>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your input data</h3>
          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="Paste your input data here..."
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
        </section>
      </div>

      <div className="grid grid-cols-1">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your transformed data</h3>
          <textarea value={output} readOnly className="w-full h-24 p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40" />
          <div>
            <button onClick={() => copy(output)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy to clipboard</button>
          </div>
        </section>
      </div>
    </div>
  );
}


