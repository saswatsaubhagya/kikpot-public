"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";

export default function MarkdownToHtml() {
  const [mdInput, setMdInput] = useState(`# JSON to XML\n\n- Supports **_attributes** → attributes\n- Supports **_text** → text node\n\nExample:\n\n\`\`\`json\n{"a":{"_attributes":{"x":"1.234","y":"It's"}}}\n\`\`\``);

  const htmlOutput = useMemo(() => {
    const trimmed = mdInput.trim();
    if (!trimmed) return "";
    try {
      // Render markdown to HTML string
      return marked.parse(mdInput, { gfm: true, breaks: false }) as string;
    } catch (err) {
      return `<!-- Parse error -->\n${(err as Error).message}`;
    }
  }, [mdInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Convert Markdown to raw HTML string.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your Markdown</h3>
          <textarea
            value={mdInput}
            onChange={(e) => setMdInput(e.target.value)}
            placeholder="Paste your Markdown here..."
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Converted HTML</h3>
          <textarea
            value={htmlOutput}
            readOnly
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
          <div className="flex gap-2">
            <button onClick={() => copy(htmlOutput)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy HTML</button>
          </div>
        </section>
      </div>
    </div>
  );
}




