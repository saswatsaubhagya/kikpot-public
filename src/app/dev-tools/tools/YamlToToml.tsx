"use client";

import { useMemo, useState } from "react";
import * as YAML from "yaml";
import * as TOML from "@iarna/toml";

export default function YamlToToml() {
  const [yamlInput, setYamlInput] = useState("");

  const tomlOutput = useMemo(() => {
    const trimmed = yamlInput.trim();
    if (!trimmed) return "";
    try {
      const docs = YAML.parseAllDocuments(yamlInput);
      const values = docs.map((d) => d.toJSON());
      const value = values.length === 1 ? values[0] : values;
      const stringify = TOML.stringify as unknown as (obj: unknown) => string;
      return stringify(value);
    } catch (err) {
      return `# Parse error\n# ${(err as Error).message}`;
    }
  }, [yamlInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-dim ">Parse and convert YAML to TOML.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">Your YAML</h3>
          <textarea
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            placeholder="Paste your YAML here..."
            className="w-full h-[28rem] p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface "
          />
        </section>

        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">TOML from your YAML</h3>
          <textarea
            value={tomlOutput}
            readOnly
            className="w-full h-[28rem] p-3 border border-hairline rounded-2xl font-mono text-sm text-text bg-surface "
          />
          <div>
            <button onClick={() => copy(tomlOutput)} className="px-4 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">Copy TOML to clipboard</button>
          </div>
        </section>
      </div>
    </div>
  );
}


