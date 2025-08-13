"use client";

import { useEffect, useState } from "react";

export default function BcryptTool() {
  const [plain, setPlain] = useState<string>("");
  const [rounds, setRounds] = useState<number>(10);
  const [hash, setHash] = useState<string>("");
  const [cmpPlain, setCmpPlain] = useState<string>("");
  const [cmpHash, setCmpHash] = useState<string>("");
  const [match, setMatch] = useState<boolean | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Lazy import to keep initial bundle light
  const hashNow = async () => {
    const bcryptModule = await import("bcryptjs");
    const bcrypt = (bcryptModule as unknown as { default: typeof import("bcryptjs") }).default;
    const salt = await bcrypt.genSalt(rounds);
    const h = await bcrypt.hash(plain, salt);
    setHash(h);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!cmpPlain || !cmpHash) {
        setMatch(null);
        return;
      }
      const bcryptModule = await import("bcryptjs");
      const bcrypt = (bcryptModule as unknown as { default: typeof import("bcryptjs") }).default;
      const ok = await bcrypt.compare(cmpPlain, cmpHash);
      if (!cancelled) setMatch(ok);
    })();
    return () => {
      cancelled = true;
    };
  }, [cmpPlain, cmpHash]);

  const copyHash = async () => {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="space-y-6">
      <div className="card bg-transparent border-none p-0">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Hash</h3>
        <div className="space-y-3">
          <input
            value={plain}
            onChange={(e) => setPlain(e.target.value)}
            placeholder="Your string to bcrypt..."
            className="w-full h-10 px-3 rounded-xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 dark:text-gray-200">Salt count</span>
            <input
              type="number"
              min={4}
              max={15}
              value={rounds}
              onChange={(e) => setRounds(Math.max(4, Math.min(15, Number(e.target.value) || 10)))}
              className="h-8 w-20 px-2 rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/60 text-sm text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={hashNow} className="btn-primary px-5 py-2.5">
              Generate
            </button>
            {hash && (
              <button onClick={copyHash} className="btn-secondary px-4 py-2 text-sm">
                {copied ? "Copied" : "Copy hash"}
              </button>
            )}
          </div>
          {hash && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl dark:bg-gray-900/40 dark:border-gray-700/50 font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
              {hash}
            </div>
          )}
        </div>
      </div>

      <div className="card bg-transparent border-none p-0">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Compare string with hash</h3>
        <div className="space-y-3">
          <input
            value={cmpPlain}
            onChange={(e) => setCmpPlain(e.target.value)}
            placeholder="Your string to compare..."
            className="w-full h-10 px-3 rounded-xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
          />
          <input
            value={cmpHash}
            onChange={(e) => setCmpHash(e.target.value)}
            placeholder="Your hash to compare..."
            className="w-full h-10 px-3 rounded-xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
          />
          <div className="text-sm text-gray-800 dark:text-gray-200">Do they match ? {match === null ? "–" : match ? "Yes" : "No"}</div>
        </div>
      </div>
    </div>
  );
}


