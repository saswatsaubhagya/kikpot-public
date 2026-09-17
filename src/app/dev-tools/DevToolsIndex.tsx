"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { tools as toolsData } from "./toolsData";

const tools = toolsData;

export default function DevToolsIndex() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const input = document.getElementById("dev-tools-search");
        input?.focus();
      }
    };
    window.addEventListener("keydown", onKey as unknown as EventListener);
    return () => window.removeEventListener("keydown", onKey as unknown as EventListener);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = tools.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q));
      return matchesQuery;
    });
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  const sidebarTools = useMemo(
    () => [...tools].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  return (
    <div className="min-h-screen bg-canvas pt-28">
      <div className="mx-auto max-w-[1200px] px-6 pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Free to use</p>
          <h1 className="display mt-5 text-[clamp(2.25rem,5vw,3.5rem)]">
            Developer tools
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-dim">
            A fast, privacy-friendly toolbox. Everything runs in your browser —
            no account, no upload.
          </p>
        </div>

        <div className="relative mt-10 max-w-xl">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dim"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="dev-tools-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${tools.length} tools`}
            aria-label={`Search ${tools.length} tools`}
            className="h-12 w-full rounded-full border border-hairline bg-surface pl-11 pr-20 text-[0.9375rem] outline-none transition-colors duration-200 focus:border-brand"
          />
          <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded border border-hairline px-2 py-0.5 text-xs text-dim">
            ⌘K
          </kbd>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <h2 className="text-sm font-medium text-accent">All tools</h2>
              <ul className="mt-4 max-h-[60vh] space-y-0.5 overflow-auto pr-2">
                {sidebarTools.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/dev-tools/${t.id}`}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-dim transition-colors duration-200 hover:bg-surface-2 hover:text-text"
                    >
                      <span aria-hidden="true" className="shrink-0 text-base">
                        {t.icon}
                      </span>
                      <span className="truncate">{t.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-9">
            {filtered.length === 0 ? (
              <p className="text-dim">
                No tool matches “{search}”. Try a shorter word, or{" "}
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-brand underline underline-offset-4"
                >
                  clear the search
                </button>
                .
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/dev-tools/${tool.id}`}
                    className="card flex flex-col p-5 hover:border-brand"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-surface-2 text-lg"
                      >
                        {tool.icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[0.9375rem] font-semibold leading-snug">
                          {tool.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-accent">{tool.category}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-dim">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
