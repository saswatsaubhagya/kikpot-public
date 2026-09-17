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
      <p className="text-sm text-dim ">Generate a base64 basic auth header from a username and password.</p>

      <div className="grid grid-cols-1 gap-6">
        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-dim ">Username</label>
            <div className="flex items-center gap-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="flex-1 h-12 px-3 rounded-2xl border bg-surface border-hairline focus:ring-2 focus:ring-brand/40 focus:border-brand text-text"
              />
              <button onClick={() => setUsername("")} className="px-3 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">✕</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-dim ">Password</label>
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="flex-1 h-12 px-3 rounded-2xl border bg-surface border-hairline focus:ring-2 focus:ring-brand/40 focus:border-brand text-text"
              />
              <button onClick={() => setShowPassword((v) => !v)} className="px-3 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
          <div className="text-sm text-dim ">Authorization header:</div>
          <textarea
            readOnly
            value={header}
            className="w-full h-28 p-3 border border-hairline rounded-2xl font-mono text-sm text-text bg-surface "
          />
          <div>
            <button onClick={() => copy(header)} className="px-4 h-10 rounded-xl border border-hairline hover:bg-surface-2 dark:hover:bg-surface-2 transition-smooth text-text">Copy header</button>
          </div>
        </section>
      </div>
    </div>
  );
}




