"use client";

import { useEffect, useMemo, useState } from "react";
import {
  entropyToMnemonic,
  mnemonicToEntropy,
  generateMnemonic,
} from "@scure/bip39";
import { wordlist as english } from "@scure/bip39/wordlists/english";
import { wordlist as spanish } from "@scure/bip39/wordlists/spanish";
import { wordlist as french } from "@scure/bip39/wordlists/french";
import { wordlist as italian } from "@scure/bip39/wordlists/italian";
import { wordlist as japanese } from "@scure/bip39/wordlists/japanese";
import { wordlist as korean } from "@scure/bip39/wordlists/korean";

type Wordlist = string[];

type LanguageOption = {
  code: string;
  name: string;
  wordlist: Wordlist;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", name: "English", wordlist: english },
  { code: "es", name: "Spanish", wordlist: spanish },
  { code: "fr", name: "French", wordlist: french },
  { code: "it", name: "Italian", wordlist: italian },
  { code: "ja", name: "Japanese", wordlist: japanese },
  { code: "ko", name: "Korean", wordlist: korean },
  // Chinese wordlists may not be exported by all bundlers; omit for now
];

const WORD_COUNT_TO_STRENGTH: Record<number, 128 | 160 | 192 | 224 | 256> = {
  12: 128,
  15: 160,
  18: 192,
  21: 224,
  24: 256,
};

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array | null {
  const clean = hex.trim().toLowerCase().replace(/^0x/, "");
  if (!/^[0-9a-f]*$/.test(clean) || clean.length % 2 !== 0) return null;
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

export default function BIP39Generator() {
  const [languageCode, setLanguageCode] = useState<string>("en");
  const [wordCount, setWordCount] = useState<number>(12);
  const [entropyHex, setEntropyHex] = useState<string>("");
  const [mnemonic, setMnemonic] = useState<string>("");
  const [copied, setCopied] = useState<{ entropy: boolean; mnemonic: boolean }>({ entropy: false, mnemonic: false });
  const [mnemonicValid, setMnemonicValid] = useState<boolean>(true);

  const currentWordlist: Wordlist = useMemo(() => {
    const found = LANGUAGE_OPTIONS.find((l) => l.code === languageCode);
    return found ? found.wordlist : english;
  }, [languageCode]);

  const regenerateEntropyAndMnemonic = () => {
    const strength = WORD_COUNT_TO_STRENGTH[wordCount] ?? 128;
    // Use library to generate mnemonic first for proper checksum then derive entropy from it
    const newMnemonic = generateMnemonic(currentWordlist, strength);
    const newEntropy = mnemonicToEntropy(newMnemonic, currentWordlist);
    setMnemonic(newMnemonic);
    setEntropyHex(bytesToHex(newEntropy));
    setMnemonicValid(true);
  };

  useEffect(() => {
    // Initial generation
    regenerateEntropyAndMnemonic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeEntropy = (hex: string) => {
    setEntropyHex(hex);
    const bytes = hexToBytes(hex);
    if (!bytes) return; // wait for valid hex
    try {
      const m = entropyToMnemonic(bytes, currentWordlist);
      setMnemonic(m);
      setMnemonicValid(true);
      const wc = m.trim().split(/\s+/g).length;
      if (WORD_COUNT_TO_STRENGTH[wc as keyof typeof WORD_COUNT_TO_STRENGTH]) {
        setWordCount(wc);
      }
    } catch {
      // ignore until hex length maps to valid strength
    }
  };

  const onChangeMnemonic = (m: string) => {
    setMnemonic(m);
    try {
      const ent = mnemonicToEntropy(m, currentWordlist);
      setEntropyHex(bytesToHex(ent));
      setMnemonicValid(true);
      const wc = m.trim().split(/\s+/g).length;
      if (WORD_COUNT_TO_STRENGTH[wc as keyof typeof WORD_COUNT_TO_STRENGTH]) {
        setWordCount(wc);
      }
    } catch {
      setMnemonicValid(false);
    }
  };

  const copyToClipboard = async (value: string, key: keyof typeof copied) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied((c) => ({ ...c, [key]: true }));
      setTimeout(() => setCopied((c) => ({ ...c, [key]: false })), 1500);
    } catch {
      // noop
    }
  };

  const onChangeWordCount = (count: number) => {
    setWordCount(count);
    // Regenerate to correct checksum length
    const strength = WORD_COUNT_TO_STRENGTH[count] ?? 128;
    const newMnemonic = generateMnemonic(currentWordlist, strength);
    setMnemonic(newMnemonic);
    const ent = mnemonicToEntropy(newMnemonic, currentWordlist);
    setEntropyHex(bytesToHex(ent));
    setMnemonicValid(true);
  };

  const onChangeLanguage = (code: string) => {
    setLanguageCode(code);
    // Re-derive values under new wordlist if mnemonic is present
    try {
      const wl = LANGUAGE_OPTIONS.find((l) => l.code === code)?.wordlist ?? english;
      const ent = mnemonicToEntropy(mnemonic, wl);
      setEntropyHex(bytesToHex(ent));
      setMnemonicValid(true);
    } catch {
      // If mnemonic invalid under new list, regenerate
      const strength = WORD_COUNT_TO_STRENGTH[wordCount] ?? 128;
      const newMnemonic = generateMnemonic(
        LANGUAGE_OPTIONS.find((l) => l.code === code)?.wordlist ?? english,
        strength,
      );
      setMnemonic(newMnemonic);
      const ent = mnemonicToEntropy(newMnemonic, LANGUAGE_OPTIONS.find((l) => l.code === code)?.wordlist ?? english);
      setEntropyHex(bytesToHex(ent));
      setMnemonicValid(true);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <span className="text-sm text-gray-700 dark:text-gray-200">Language</span>
          <select
            className="bg-transparent outline-none"
            value={languageCode}
            onChange={(e) => onChangeLanguage(e.target.value)}
          >
            {LANGUAGE_OPTIONS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
          <span className="text-sm text-gray-700 dark:text-gray-200">Words</span>
          <select
            className="bg-transparent outline-none"
            value={wordCount}
            onChange={(e) => onChangeWordCount(Number(e.target.value))}
          >
            {[12, 15, 18, 21, 24].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-3">
          <button onClick={regenerateEntropyAndMnemonic} className="btn-secondary w-full px-4 py-2.5">
            Refresh
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700 dark:text-gray-200">Entropy (seed) — hex</label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={entropyHex}
            onChange={(e) => onChangeEntropy(e.target.value)}
            placeholder="e.g. 71441eff..."
            className="flex-1 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50 font-mono text-sm dark:text-white"
          />
          <button onClick={() => copyToClipboard(entropyHex, "entropy")} className="btn-primary px-4 py-2.5">
            {copied.entropy ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm text-gray-700 dark:text-gray-200">Passphrase (mnemonic)</label>
          {!mnemonicValid && (
            <span className="text-xs text-red-600 dark:text-red-400">Invalid for selected language</span>
          )}
        </div>
        <div className="flex items-start gap-3">
          <textarea
            value={mnemonic}
            onChange={(e) => onChangeMnemonic(e.target.value)}
            rows={3}
            className={`flex-1 p-3 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50 font-mono text-sm dark:text-white ${
              mnemonicValid ? "" : "border-red-400 dark:border-red-500"
            }`}
          />
          <button onClick={() => copyToClipboard(mnemonic, "mnemonic")} className="btn-primary px-4 py-2.5 h-11">
            {copied.mnemonic ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}


