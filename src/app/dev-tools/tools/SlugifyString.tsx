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
      <p className="text-sm text-gray-600 dark:text-gray-400">Make a string url, filename and id safe.</p>

      <section className="space-y-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Your string to slugify</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Put your string here (ex: My file path)"
          className="w-full h-28 p-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white"
        />
      </section>

      <section className="space-y-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Your slug</h3>
        <textarea
          readOnly
          value={slug}
          placeholder="You slug will be generated here (ex: my-file-path)"
          className="w-full h-20 p-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white"
        />
        <button onClick={copy} className="btn-secondary px-5 py-2.5">Copy slug</button>
      </section>
    </div>
  );
}


