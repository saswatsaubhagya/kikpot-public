"use client";

import { useMemo, useState } from "react";

function slugify(input: string): string {
  // Normalize diacritics, lowercase, replace non-alphanumerics with hyphen
  const normalized = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const slug = normalized
    .toLowerCase()
    .replace(/['`\"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return slug;
}

export default function SlugifyString() {
  const [text, setText] = useState("");
  const slug = useMemo(() => slugify(text), [text]);

  const copy = async () => {
    if (!slug) return;
    try {
      await navigator.clipboard.writeText(slug);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-dim ">Make a string url, filename and id safe.</p>

      <section className="space-y-2">
        <h3 className="font-medium text-text ">Your string to slugify</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Put your string here (ex: My file path)"
          className="w-full h-28 p-3 rounded-2xl border bg-surface border-hairline focus:ring-2 focus:ring-brand/40 focus:border-brand text-text"
        />
      </section>

      <section className="space-y-2">
        <h3 className="font-medium text-text ">Your slug</h3>
        <textarea
          readOnly
          value={slug}
          placeholder="You slug will be generated here (ex: my-file-path)"
          className="w-full h-20 p-3 rounded-2xl border bg-surface border-hairline text-text"
        />
        <button onClick={copy} className="btn-secondary px-5 py-2.5">Copy slug</button>
      </section>
    </div>
  );
}


