"use client";

import { useEffect, useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setError(null);
      const regex = new RegExp(pattern, flags);
      const results = Array.from(text.matchAll(regex)).map((m) => m[0]);
      setMatches(results);
    } catch {
      setMatches([]);
      setError("Invalid regex or flags");
    }
  }, [pattern, flags, text]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Pattern (without / /)"
          className="h-10 px-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60"
        />
        <input
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="Flags (e.g. gim)"
          className="h-10 px-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60"
        />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Test text..."
        className="w-full h-40 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60"
      />
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">{error}</div>}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl font-mono text-sm text-gray-900">
        Matches ({matches.length}): {matches.join(", ")}
      </div>
    </div>
  );
}


