"use client";

import { useMemo, useState } from "react";
import * as TOML from "@iarna/toml";

export default function JsonToToml() {
  const [jsonInput, setJsonInput] = useState("");

  const tomlOutput = useMemo(() => {
    const trimmed = jsonInput.trim();
    if (!trimmed) return "";
    try {
      const value = JSON.parse(jsonInput) as unknown;
      const stringify = TOML.stringify as unknown as (obj: unknown) => string;
      return stringify(value);
    } catch (err) {
      return `# Parse error\n# ${(err as Error).message}`;
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
      <p className="text-sm text-gray-600 dark:text-gray-400">Parse and convert JSON to TOML.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your JSON</h3>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">TOML from your JSON</h3>
          <textarea
            value={tomlOutput}
            readOnly
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
          <div>
            <button onClick={() => copy(tomlOutput)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy TOML to clipboard</button>
          </div>
        </section>
      </div>
    </div>
  );
}


