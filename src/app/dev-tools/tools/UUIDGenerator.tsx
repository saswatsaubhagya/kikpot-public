"use client";

import { useEffect, useState } from "react";

export default function UUIDGenerator() {
  const [version, setVersion] = useState<"NIL" | "v1" | "v3" | "v4" | "v5">("v4");
  const [quantity, setQuantity] = useState<number>(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const make = async () => {
    const uuidLib = await import("uuid");
    const out: string[] = [];
    for (let i = 0; i < quantity; i++) {
      switch (version) {
        case "NIL":
          out.push(uuidLib.NIL);
          break;
        case "v1":
          out.push(uuidLib.v1());
          break;
        case "v3":
          out.push(uuidLib.v3(String(i) + Date.now(), uuidLib.v3.URL));
          break;
        case "v4":
          out.push(uuidLib.v4());
          break;
        case "v5":
          out.push(uuidLib.v5(String(i) + Date.now(), uuidLib.v5.URL));
          break;
      }
    }
    setUuids(out);
  };

  useEffect(() => {
    make();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, quantity]);

  const copy = async () => {
    if (!uuids.length) return;
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="space-y-5">
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        A Universally Unique Identifier (UUID) is a 128‑bit value. Generate various versions below.
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {(["NIL", "v1", "v3", "v4", "v5"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVersion(v)}
            className={`px-4 py-2 rounded-xl border transition-smooth ${
              version === v ? "bg-green-600 text-white border-green-600" : "bg-white border-gray-200"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700 dark:text-gray-200">Quantity</span>
        <div className="inline-flex items-center rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg">
            −
          </button>
          <input
            type="number"
            min={1}
            max={1000}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
            className="w-24 h-10 text-center bg-transparent text-white dark:text-white caret-white"
          />
          <button onClick={() => setQuantity((q) => Math.min(1000, q + 1))} className="px-3 py-2 text-lg">
            +
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={make} className="btn-secondary px-5 py-2.5">
          Refresh
        </button>
        <button onClick={copy} className="btn-primary px-5 py-2.5">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <textarea
        readOnly
        value={uuids.join("\n")}
        className="w-full h-36 p-3 border border-gray-200 rounded-2xl bg-gray-50 dark:bg-gray-900/40 dark:border-gray-700/50 font-mono text-sm text-gray-900 dark:text-gray-100"
      />
    </div>
  );
}


