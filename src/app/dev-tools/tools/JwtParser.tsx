"use client";

import { useMemo, useState } from "react";

type DecodedPart = Record<string, unknown> | null;

function base64UrlToString(input: string): string | null {
  try {
    const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 === 2 ? "==" : b64.length % 4 === 3 ? "=" : "";
    if (typeof atob === "function") {
      return decodeURIComponent(
        Array.prototype
          .map
          .call(atob(b64 + pad), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    }
    return Buffer.from(b64 + pad, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

function decodeJwtPart(part: string): DecodedPart {
  const s = base64UrlToString(part);
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function pretty(obj: DecodedPart): string {
  if (!obj) return "";
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return "";
  }
}

function humanTime(value: unknown): string | null {
  if (typeof value !== "number") return null;
  try {
    const d = new Date(value * 1000);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString();
  } catch {
    return null;
  }
}

export default function JwtParser() {
  const [token, setToken] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );

  const parts = useMemo(() => token.trim().split("."), [token]);

  const header = useMemo(() => (parts.length >= 1 ? decodeJwtPart(parts[0]) : null), [parts]);
  const payload = useMemo(() => (parts.length >= 2 ? decodeJwtPart(parts[1]) : null), [parts]);
  const signature = useMemo(() => (parts.length >= 3 ? parts[2] : ""), [parts]);

  const isValidStructure = parts.length === 3 && !!header && !!payload;

  const HeaderRow = ({ k, v, hint }: { k: string; v: unknown; hint?: string }) => (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 items-center py-2 border-b last:border-b-0 border-gray-200/70 dark:border-gray-800/70">
      <div className="col-span-1 text-sm text-gray-600 dark:text-gray-400">{k}</div>
      <div className="col-span-2 md:col-span-4">
        <input readOnly value={String(v ?? "")} className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
      </div>
      <div className="hidden md:block text-xs text-gray-500">{hint || ""}</div>
    </div>
  );

  const PayloadRow = ({ k, v }: { k: string; v: unknown }) => (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 items-center py-2 border-b last:border-b-0 border-gray-200/70 dark:border-gray-800/70">
      <div className="col-span-1 text-sm text-gray-600 dark:text-gray-400">{k}</div>
      <div className="col-span-2 md:col-span-4">
        <input readOnly value={String(v ?? "")} className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
      </div>
      <div className="hidden md:block text-xs text-gray-500">{humanTime(v) ? humanTime(v) : ""}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Parse and decode your JSON Web Token (JWT). This tool does not verify signatures.</p>

      <section className="space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">JWT to decode</h3>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT here..."
          className="w-full h-28 p-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white"
        />
        {!isValidStructure && (
          <div className="text-sm text-red-500">Invalid token structure. Expected three base64url sections separated by dots.</div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Header</h3>
          {header ? (
            <div className="divide-y divide-gray-200/70 dark:divide-gray-800/70">
              {Object.entries(header).map(([k, v]) => (
                <HeaderRow key={k} k={k} v={v} hint={k === "alg" ? "Algorithm" : k === "typ" ? "Type" : undefined} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Unable to decode header</div>
          )}
          <pre className="mt-3 p-3 rounded-xl bg-gray-100/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 overflow-auto text-xs text-gray-800 dark:text-gray-100">{pretty(header)}</pre>
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Payload</h3>
          {payload ? (
            <div className="divide-y divide-gray-200/70 dark:divide-gray-800/70">
              {Object.entries(payload).map(([k, v]) => (
                <PayloadRow key={k} k={k} v={v} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Unable to decode payload</div>
          )}
          <pre className="mt-3 p-3 rounded-xl bg-gray-100/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 overflow-auto text-xs text-gray-800 dark:text-gray-100">{pretty(payload)}</pre>
        </section>
      </div>

      <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Signature</h3>
        <input
          readOnly
          value={signature}
          className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white"
        />
        <p className="text-xs text-gray-500">Base64url‑encoded signature. Verification is not performed.</p>
      </section>
    </div>
  );
}


