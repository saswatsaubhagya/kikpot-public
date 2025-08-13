"use client";

import { useMemo, useState } from "react";

type Parsed = {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  params: Array<{ key: string; value: string }>; // decoded
};

export default function UrlParser() {
  const [urlInput, setUrlInput] = useState(
    "https://me:pwd@kikpot.com:3000/url-parser?key1=value&key2=value2#the-hash"
  );

  const parsed = useMemo<Parsed | null>(() => {
    const trimmed = urlInput.trim();
    if (!trimmed) return null;
    try {
      const u = new URL(urlInput);
      const params: Array<{ key: string; value: string }> = [];
      const sp = new URLSearchParams(u.search);
      sp.forEach((v, k) => {
        params.push({ key: decodeURIComponent(k), value: decodeURIComponent(v) });
      });
      return {
        protocol: u.protocol,
        username: u.username,
        password: u.password,
        hostname: u.hostname,
        port: u.port,
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        origin: u.origin,
        params,
      };
    } catch {
      return null;
    }
  }, [urlInput]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-2">
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      <div className="flex gap-2">
        <input
          readOnly
          value={value}
          className="flex-1 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white"
        />
        <button onClick={() => copy(value)} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Parse a URL into its separate constituent parts (protocol, origin, params, port, username, password, …)</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your url to parse:</h3>
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste your URL here..."
            className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white"
          />

          {parsed ? (
            <div className="grid grid-cols-1 gap-4">
              <Field label="Protocol" value={parsed.protocol} />
              <Field label="Username" value={parsed.username} />
              <Field label="Password" value={parsed.password} />
              <Field label="Hostname" value={parsed.hostname} />
              <Field label="Port" value={parsed.port} />
              <Field label="Path" value={parsed.pathname} />
              <Field label="Params" value={parsed.search} />
              <Field label="Hash" value={parsed.hash} />
              <Field label="Origin" value={parsed.origin} />
            </div>
          ) : (
            <div className="text-sm text-red-500">Invalid URL (must be absolute, e.g. https://domain/path)</div>
          )}
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Query parameters</h3>
          {parsed && parsed.params.length > 0 ? (
            <div className="space-y-3">
              {parsed.params.map((p, idx) => (
                <div key={`${p.key}-${idx}`} className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <input readOnly value={p.key} className="w-48 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
                    <span className="text-gray-500">→</span>
                    <input readOnly value={p.value} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
                    <button onClick={() => copy(p.value)} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No parameters</div>
          )}
        </section>
      </div>
    </div>
  );
}




