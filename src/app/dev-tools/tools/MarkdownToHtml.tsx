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
      <p className="text-sm text-dim ">Convert Markdown to raw HTML string.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">Your Markdown</h3>
          <textarea
            value={mdInput}
            onChange={(e) => setMdInput(e.target.value)}
            placeholder="Paste your Markdown here..."
            className="w-full h-[28rem] p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface "
          />
        </section>

        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <h3 className="font-medium text-text ">Converted HTML</h3>
          <textarea
            value={htmlOutput}
            readOnly
            className="w-full h-[28rem] p-3 border border-hairline rounded-2xl font-mono text-sm text-text bg-surface "
          />
          <div className="flex gap-2">
            <button onClick={() => copy(htmlOutput)} className="px-4 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">Copy HTML</button>
          </div>
        </section>
      </div>
    </div>
  );
}




