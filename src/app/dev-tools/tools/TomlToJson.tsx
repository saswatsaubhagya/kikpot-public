"use client";

import { useMemo, useState } from "react";
import * as TOML from "@iarna/toml";

export default function TomlToJson() {
  const [tomlInput, setTomlInput] = useState("");

  const jsonOutput = useMemo(() => {
    const trimmed = tomlInput.trim();
    if (!trimmed) return "";
    try {
      const value = (TOML.parse as unknown as (toml: string) => unknown)(tomlInput);
      return JSON.stringify(value, null, 2);
    } catch (err) {
      return `/* Parse error */\n${(err as Error).message}`;
    }
  }, [tomlInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-dim ">Parse and convert TOML to JSON.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">Your TOML</h3>
          <textarea
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            placeholder="Paste your TOML here..."
            className="w-full h-[28rem] p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface "
          />
        </section>

        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">JSON from your TOML</h3>
          <textarea
            value={jsonOutput}
            readOnly
            className="w-full h-[28rem] p-3 border border-hairline rounded-2xl font-mono text-sm text-text bg-surface "
          />
          <div>
            <button onClick={() => copy(jsonOutput)} className="px-4 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">Copy JSON to clipboard</button>
          </div>
        </section>
      </div>
    </div>
  );
}



