"use client";

import { useState } from "react";

export default function UrlEncoderDecoder() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    try {
      const output = mode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text);
      setResult(output);
    } catch {
      setResult("Invalid input for current mode");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded-xl border transition-smooth ${
            mode === "encode" ? "bg-purple-600 text-white border-purple-600" : "bg-white border-gray-200"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-xl border transition-smooth ${
            mode === "decode" ? "bg-purple-600 text-white border-purple-600" : "bg-white border-gray-200"
          }`}
        >
          Decode
        </button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60"
        placeholder="Enter text..."
      />
      <div className="flex items-center gap-3">
        <button onClick={handleConvert} className="btn-primary px-5 py-2.5">
          Convert
        </button>
      </div>
      {result && <pre className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl overflow-x-auto font-mono text-sm text-gray-900">{result}</pre>}
    </div>
  );
}


