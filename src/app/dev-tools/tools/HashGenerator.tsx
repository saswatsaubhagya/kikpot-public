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
              algo === option ? "bg-purple-600 text-white border-purple-600" : "bg-white border-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60"
        placeholder="Enter text..."
      />
      <button onClick={handleHash} className="btn-primary px-5 py-2.5">
        Generate
      </button>
      {hash && (
        <pre className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl overflow-x-auto font-mono text-sm text-gray-900 break-all">
          {hash}
        </pre>
      )}
    </div>
  );
}


