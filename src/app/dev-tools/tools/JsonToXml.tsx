"use client";

import { useMemo, useState } from "react";
import { XMLBuilder } from "fast-xml-parser";

// Configure builder to match the XmlToJson parser settings
const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: "_",
  suppressEmptyNode: true,
});

// Normalize a JSON structure that may use helpers like `_attributes` and `_text`
function normalizeForBuilder(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map((item) => normalizeForBuilder(item));
  }
  if (input && typeof input === "object") {
    const obj = input as Record<string, unknown>;
    const output: Record<string, unknown> = {};

    // Promote `_attributes` to prefixed attribute keys
    if (obj._attributes && typeof obj._attributes === "object") {
      const attrs = obj._attributes as Record<string, unknown>;
      for (const [k, v] of Object.entries(attrs)) {
        output[`_${k}`] = v;
      }
    }

    // Map `_text` to standard text node name `#text`
    if (Object.prototype.hasOwnProperty.call(obj, "_text")) {
      output["#text"] = (obj as Record<string, unknown>)["_text"];
    }

    // Recurse other keys
    for (const [key, value] of Object.entries(obj)) {
      if (key === "_attributes" || key === "_text") continue;
      output[key] = normalizeForBuilder(value);
    }

    return output;
  }
  return input;
}

export default function JsonToXml() {
  const [jsonInput, setJsonInput] = useState("{\n  \"a\": { \n    \"_attributes\": { \"x\": \"1.234\", \"y\": \"It's\" }\n  }\n}");

  const xmlOutput = useMemo(() => {
    const trimmed = jsonInput.trim();
    if (!trimmed) return "";
    try {
      const parsed = JSON.parse(jsonInput) as unknown;
      const normalized = normalizeForBuilder(parsed);
      return builder.build(normalized);
    } catch (err) {
      return `<!-- Parse error -->\n${(err as Error).message}`;
    }
  }, [jsonInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Convert JSON to XML.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your JSON content</h3>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Converted XML</h3>
          <textarea
            value={xmlOutput}
            readOnly
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
          <div className="flex gap-2">
            <button onClick={() => copy(xmlOutput)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy XML</button>
          </div>
        </section>
      </div>
    </div>
  );
}




