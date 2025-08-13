"use client";

import { useEffect, useMemo, useState } from "react";

const WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua " +
    "ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur " +
    "excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet"
).split(/\s+/);

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateParagraph(
  sentences: number,
  wordsPerSentence: number,
  startWithLorem: boolean,
  isFirstParagraph: boolean
): string {
  const result: string[] = [];
  for (let i = 0; i < sentences; i++) {
    // vary word count slightly ±30%
    const n = Math.max(3, Math.round(wordsPerSentence * (0.7 + Math.random() * 0.6)));
    const words: string[] = [];
    if (startWithLorem && isFirstParagraph && i === 0) {
      const prefix = ["lorem", "ipsum", "dolor", "sit", "amet"];
      words.push(...prefix);
      for (let j = words.length; j < n; j++) words.push(WORDS[randomInt(0, WORDS.length - 1)]);
    } else {
      for (let j = 0; j < n; j++) words.push(WORDS[randomInt(0, WORDS.length - 1)]);
    }
    const sentence = capitalise(words.join(" ")) + ".";
    result.push(sentence);
  }
  return result.join(" ");
}

function generateLorem(paragraphs: number, sentences: number, words: number, startWithLorem: boolean, asHtml: boolean): string {
  const paras: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const text = generateParagraph(sentences, words, startWithLorem, p === 0);
    paras.push(asHtml ? `<p>${text}</p>` : text);
  }
  return asHtml ? paras.join("\n") : paras.join("\n\n");
}

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(5);
  const [words, setWords] = useState(14);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [asHtml, setAsHtml] = useState(false);
  const [output, setOutput] = useState("");

  const regenerate = useMemo(
    () => () => setOutput(generateLorem(paragraphs, sentences, words, startWithLorem, asHtml)),
    [paragraphs, sentences, words, startWithLorem, asHtml]
  );

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const copy = () => {
    if (!output) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(output).catch(() => {});
  };

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">Lorem ipsum generator</div>
      <p className="text-sm text-gray-400">Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content</p>

      <section className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-6">
        <div className="grid gap-5">
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] items-center gap-4">
            <div className="text-gray-300">Paragraphs</div>
            <input type="range" min={1} max={10} value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] items-center gap-4">
            <div className="text-gray-300">Sentences per paragraph</div>
            <input type="range" min={1} max={12} value={sentences} onChange={(e) => setSentences(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] items-center gap-4">
            <div className="text-gray-300">Words per sentence</div>
            <input type="range" min={3} max={24} value={words} onChange={(e) => setWords(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] items-center gap-4">
            <div className="text-gray-300">Start with lorem ipsum ?</div>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] items-center gap-4">
            <div className="text-gray-300">As html ?</div>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={asHtml} onChange={(e) => setAsHtml(e.target.checked)} />
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <textarea value={output} readOnly className="w-full h-48 p-3 rounded-2xl border border-gray-700 bg-transparent text-white font-mono text-sm" />
          <div className="flex gap-3">
            <button className="px-4 h-10 rounded-xl border border-gray-700 text-white hover:bg-gray-800" onClick={copy}>Copy</button>
            <button className="btn-primary px-5 py-2.5" onClick={regenerate}>Refresh</button>
          </div>
        </div>
      </section>
    </div>
  );
}


