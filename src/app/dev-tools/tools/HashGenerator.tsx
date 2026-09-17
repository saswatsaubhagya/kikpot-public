"use client";

import { useState } from "react";
import { WebCryptoAlgo, computeHash } from "./hashUtils";

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState<WebCryptoAlgo>("SHA-256");
  const [hash, setHash] = useState<string>("");

  const handleHash = async () => {
    const out = await computeHash(algo, text);
    setHash(out);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {(["SHA-256", "SHA-1", "SHA-384", "SHA-512"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setAlgo(option)}
            className={`px-4 py-2 rounded-xl border transition-smooth ${
              algo === option ? "bg-brand text-text border-purple-600" : "bg-surface border-hairline"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface"
        placeholder="Enter text..."
      />
      <button onClick={handleHash} className="btn-primary px-5 py-2.5">
        Generate
      </button>
      {hash && (
        <pre className="w-full p-3 bg-surface-2 border border-hairline rounded-2xl overflow-x-auto font-mono text-sm text-text break-all">
          {hash}
        </pre>
      )}
    </div>
  );
}


