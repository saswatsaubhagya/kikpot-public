"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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

  const sidebarTools = useMemo(() => [...tools].sort((a, b) => a.name.localeCompare(b.name)), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <span className="gradient-text">Developer Tools</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-balance">
            A modern, fast, privacy‑friendly toolbox. Search with ⌘K.
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</div>
            <input
              id="dev-tools-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tools.length} tools…`}
              className="w-full h-12 pl-10 pr-4 rounded-2xl border bg-white/70 border-white/20 backdrop-blur-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-900/40 dark:border-gray-700/40 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="card p-5 sticky top-28">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Tools</h4>
              <ul className="space-y-1 max-h-[50vh] overflow-auto pr-1">
                {sidebarTools.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/dev-tools/${t.id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-smooth"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white text-[12px]">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((tool) => (
                <Link key={tool.id} href={`/dev-tools/${tool.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left card p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-smooth cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xl shadow-lg">
                        {tool.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{tool.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-white/60 border border-white/50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700/50 whitespace-nowrap">
                            {tool.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-h-[40px] overflow-hidden">
                          {tool.description}
                        </p>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transition-smooth text-gray-400 dark:text-gray-500">→</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


