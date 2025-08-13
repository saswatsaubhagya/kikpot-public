"use client";

import { useMemo, useState } from "react";

function estimateCharsetSize(password: string): number {
  if (!password) return 0;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSpace = /\s/.test(password);
  // Common printable symbols (ASCII)
  const hasSymbols = /[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/.test(password);
  // Any non-ASCII characters (very rough approximation)
  const hasUnicode = /[^\x00-\x7F]/.test(password);

  let size = 0;
  if (hasLower) size += 26;
  if (hasUpper) size += 26;
  if (hasDigits) size += 10;
  if (hasSymbols) size += 33;
  if (hasSpace) size += 1;
  if (hasUnicode) size += 100; // conservative bump for non-ASCII charsets
  return size;
}

function formatDuration(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0.5) return "Instantly";
  const units: [string, number][] = [
    ["second", 1],
    ["minute", 60],
    ["hour", 60 * 60],
    ["day", 60 * 60 * 24],
    ["month", 60 * 60 * 24 * 30],
    ["year", 60 * 60 * 24 * 365],
    ["century", 60 * 60 * 24 * 365 * 100],
    ["millennium", 60 * 60 * 24 * 365 * 1000],
  ];
  let value = seconds;
  let label = "second";
  for (let i = units.length - 1; i >= 0; i--) {
    const [name, s] = units[i];
    if (seconds >= s) {
      value = seconds / s;
      label = name;
      break;
    }
  }
  const rounded = value >= 100 ? Math.round(value) : value >= 10 ? Math.round(value * 10) / 10 : Math.round(value * 100) / 100;
  const plural = rounded === 1 ? "" : "s";
  return `${rounded} ${label}${plural}`;
}

export default function PasswordStrength() {
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const stats = useMemo(() => {
    const length = password.length;
    const charset = estimateCharsetSize(password);
    const entropyBits = length > 0 && charset > 0 ? length * Math.log2(charset) : 0;
    const guessesPerSecond = 1e10; // assumed powerful attacker
    const totalCombos = length > 0 && charset > 1 ? Math.pow(charset, length) : 0;
    const crackSeconds = totalCombos > 0 ? totalCombos / guessesPerSecond : 0;
    // Map entropy to 0..100
    const score = Math.max(0, Math.min(100, Math.round((entropyBits / 120) * 100)));
    return { length, charset, entropyBits, crackSeconds, score };
  }, [password]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password..."
          className="w-full h-12 px-4 pr-10 rounded-2xl border bg-white/70 border-gray-200 backdrop-blur-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-900/40 dark:border-gray-700/50 dark:text-gray-100"
        />
        <button
          onClick={() => setShow((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Toggle visibility"
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>

      <div className="p-4 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Duration to crack this password with brute force</div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">{formatDuration(stats.crackSeconds)}</div>
      </div>

      <div className="p-4 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Password length</div>
            <div className="text-gray-900 dark:text-gray-100">{stats.length}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Entropy</div>
            <div className="text-gray-900 dark:text-gray-100">{stats.entropyBits.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Character set size</div>
            <div className="text-gray-900 dark:text-gray-100">{stats.charset}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
            <div className="text-gray-900 dark:text-gray-100">{stats.score} / 100</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Note:</span> The computed strength is based on the time it would take
        to crack the password using a brute force approach; it does not take into account dictionary
        attacks or other weaknesses (like reused passwords).
      </div>
    </div>
  );
}


