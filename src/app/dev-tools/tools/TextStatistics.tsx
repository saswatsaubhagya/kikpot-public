"use client";

import { useMemo, useState } from "react";

function countCharacters(text: string): number {
  return text.length;
}

function countWords(text: string): number {
  const tokens = text.trim().split(/\s+/g).filter(Boolean);
  return text.trim().length === 0 ? 0 : tokens.length;
}

function countLines(text: string): number {
  if (text.length === 0) return 0;
  // Count line breaks; final line without trailing newline still counts
  return text.split(/\r?\n/).length;
}

function byteSize(text: string): number {
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(text).length;
  // Fallback: assume 2 bytes per char for UTF-16 (very rough)
  return text.length * 2;
}

export default function TextStatistics() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    return {
      characters: countCharacters(text),
      words: countWords(text),
      lines: countLines(text),
      bytes: byteSize(text),
    };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">Text statistics</div>
      <p className="text-sm text-gray-400">Get information about a text, the number of characters, the number of words, its size in bytes, …</p>

      <section className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here..."
          className="w-full h-40 p-3 rounded-2xl border border-gray-700 bg-transparent text-white font-mono text-sm"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="text-sm text-gray-400">Character count</div>
            <div className="mt-1 text-2xl font-semibold text-white">{stats.characters}</div>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="text-sm text-gray-400">Word count</div>
            <div className="mt-1 text-2xl font-semibold text-white">{stats.words}</div>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="text-sm text-gray-400">Line count</div>
            <div className="mt-1 text-2xl font-semibold text-white">{stats.lines}</div>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="text-sm text-gray-400">Byte size</div>
            <div className="mt-1 text-2xl font-semibold text-white">{stats.bytes} Bytes</div>
          </div>
        </div>
      </section>
    </div>
  );
}


