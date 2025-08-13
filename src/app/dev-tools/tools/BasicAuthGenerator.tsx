"use client";

import { useMemo, useState } from "react";

function toBase64Utf8(input: string): string {
  try {
    // Handles UTF‑8 characters safely in browsers
    return btoa(unescape(encodeURIComponent(input)));
  } catch {
    return "";
  }
}

export default function BasicAuthGenerator() {
  const [username, setUsername] = useState("kikpot");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const header = useMemo(() => {
    const token = toBase64Utf8(`${username}:${password}`);
    return token ? `Authorization: Basic ${token}` : "";
  }, [username, password]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Generate a base64 basic auth header from a username and password.</p>

      <div className="grid grid-cols-1 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Username</label>
            <div className="flex items-center gap-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="flex-1 h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white"
              />
              <button onClick={() => setUsername("")} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">✕</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Password</label>
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="flex-1 h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white"
              />
              <button onClick={() => setShowPassword((v) => !v)} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Authorization header:</div>
          <textarea
            readOnly
            value={header}
            className="w-full h-28 p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
          <div>
            <button onClick={() => copy(header)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy header</button>
          </div>
        </section>
      </div>
    </div>
  );
}




