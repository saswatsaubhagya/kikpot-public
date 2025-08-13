"use client";

import { useMemo, useState } from "react";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "_",
  allowBooleanAttributes: true,
  parseAttributeValue: false,
});

export default function XmlToJson() {
  const [xmlInput, setXmlInput] = useState("<a x=\"1.234\" y=\"It's\"/>");

  const jsonOutput = useMemo(() => {
    const trimmed = xmlInput.trim();
    if (!trimmed) return "";
    try {
      const value = parser.parse(xmlInput);
      return JSON.stringify(value, null, 2);
    } catch (err) {
      return `/* Parse error */\n${(err as Error).message}`;
    }
  }, [xmlInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Convert XML to JSON</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your XML content</h3>
          <textarea
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            placeholder="Paste your XML here..."
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Converted JSON</h3>
          <textarea
            value={jsonOutput}
            readOnly
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
          <div className="flex gap-2">
            <button onClick={() => copy(jsonOutput)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy JSON</button>
          </div>
        </section>
      </div>
    </div>
  );
}



