"use client";

import { useEffect, useMemo, useState } from "react";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/\s+/g, "").toLowerCase();
  const out = new Uint8Array(Math.ceil(clean.length / 2));
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.substr(i * 2, 2), 16) || 0;
  }
  return out;
}

function bytesToBase32(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let output = "";
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }
  return output; // no padding for simplicity
}

function base32ToBytes(str: string): Uint8Array {
  const clean = str.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (let i = 0; i < clean.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(clean[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

function randomSecretBase32(byteLength = 20): string {
  const arr = new Uint8Array(byteLength);
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return bytesToBase32(arr);
}

async function hotp(secret: Uint8Array, counter: number, digits: number): Promise<string> {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  const high = Math.floor(counter / 0x100000000);
  const low = counter >>> 0;
  view.setUint32(0, high);
  view.setUint32(4, low);

  const key = await crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, buffer));
  const offset = sig[sig.length - 1] & 0x0f;
  const bin = ((sig[offset] & 0x7f) << 24) | (sig[offset + 1] << 16) | (sig[offset + 2] << 8) | sig[offset + 3];
  const mod = 10 ** digits;
  return String(bin % mod).padStart(digits, "0");
}

function counterToPaddedHex(counter: number): string {
  const buf = new ArrayBuffer(8);
  const dv = new DataView(buf);
  const high = Math.floor(counter / 0x100000000);
  const low = counter >>> 0;
  dv.setUint32(0, high);
  dv.setUint32(4, low);
  return bytesToHex(new Uint8Array(buf));
}

export default function OTPCodeGenerator() {
  // Use a deterministic default to avoid SSR/CSR hydration mismatch; users can refresh to random
  const [secretBase32, setSecretBase32] = useState<string>("JBSWY3DPEHPK3PXP");
  const [digits, setDigits] = useState<number>(6);
  const [period, setPeriod] = useState<number>(30);
  const [issuer, setIssuer] = useState<string>("Kikpot");
  const [account, setAccount] = useState<string>("user@example.com");
  const [epoch, setEpoch] = useState<number>(0);
  const [current, setCurrent] = useState<string>("000000");
  const [prev, setPrev] = useState<string>("000000");
  const [next, setNext] = useState<string>("000000");

  const secretBytes = useMemo(() => base32ToBytes(secretBase32), [secretBase32]);
  const secretHex = useMemo(() => bytesToHex(secretBytes), [secretBytes]);

  const counter = useMemo(() => Math.floor(epoch / period), [epoch, period]);
  const timeRemaining = useMemo(() => period - (epoch % period), [epoch, period]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [p, c, n] = await Promise.all([
          hotp(secretBytes, counter - 1, digits),
          hotp(secretBytes, counter, digits),
          hotp(secretBytes, counter + 1, digits),
        ]);
        if (!cancelled) {
          setPrev(p);
          setCurrent(c);
          setNext(n);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [secretBytes, counter, digits]);

  useEffect(() => {
    // Initialize on client to avoid server/client mismatch
    setEpoch(Math.floor(Date.now() / 1000));
    const id = setInterval(() => setEpoch(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  // QR code and Key URI removed per request

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Generate and validate time‑based OTP (one time password) for multi‑factor authentication.</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Secret</label>
            <div className="flex items-center gap-2">
              <input
                value={secretBase32}
                onChange={(e) => setSecretBase32(e.target.value)}
                placeholder="Base32 secret (e.g., JBSWY3DPEHPK3PXP)"
                className="flex-1 h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white"
              />
              <button onClick={() => setSecretBase32(randomSecretBase32())} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">↻</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Secret in hexadecimal</label>
            <div className="flex items-center gap-2">
              <input readOnly value={secretHex} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
              <button onClick={() => copy(secretHex)} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
              <span className="text-sm text-gray-700 dark:text-gray-200">Digits</span>
              <input type="number" min={4} max={10} value={digits} onChange={(e) => setDigits(Math.max(4, Math.min(10, Number(e.target.value) || 6)))} className="w-20 h-8 text-center rounded-md bg-transparent text-white" />
            </label>
            <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50">
              <span className="text-sm text-gray-700 dark:text-gray-200">Period (s)</span>
              <input type="number" min={5} max={120} value={period} onChange={(e) => setPeriod(Math.max(5, Math.min(120, Number(e.target.value) || 30)))} className="w-20 h-8 text-center rounded-md bg-transparent text-white" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Issuer</span>
              <input value={issuer} onChange={(e) => setIssuer(e.target.value)} className="w-full h-10 px-3 rounded-xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Account</span>
              <input value={account} onChange={(e) => setAccount(e.target.value)} className="w-full h-10 px-3 rounded-xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </label>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">Previous</div>
              <div className="font-mono text-lg text-gray-900 dark:text-gray-100 select-all">{prev}</div>
            </div>
            <div className="p-3 rounded-xl border bg-gradient-to-br from-purple-600/10 to-blue-600/10 border-gray-200 dark:border-gray-700/50 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">Current OTP</div>
              <div className="font-mono text-2xl text-gray-900 dark:text-gray-100 select-all">{current}</div>
            </div>
            <div className="p-3 rounded-xl border bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700/50 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">Next</div>
              <div className="font-mono text-lg text-gray-900 dark:text-gray-100 select-all">{next}</div>
            </div>
          </div>

          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
              style={{ width: `${((period - timeRemaining) / period) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Next in {timeRemaining}s</div>

          <div className="grid grid-cols-1 gap-3">
            <label className="space-y-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Epoch</span>
              <div className="flex items-center gap-2">
                <input readOnly value={epoch} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
                <button onClick={() => copy(String(epoch))} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy</button>
              </div>
            </label>
            <label className="space-y-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Iteration (count)</span>
              <div className="flex items-center gap-2">
                <input readOnly value={counter} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
                <button onClick={() => copy(String(counter))} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy</button>
              </div>
            </label>
          </div>

          <label className="space-y-1 block md:col-span-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Padded hex</span>
            <div className="flex items-center gap-2">
              <input readOnly value={counterToPaddedHex(counter)} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white" />
              <button onClick={() => copy(counterToPaddedHex(counter))} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy</button>
            </div>
          </label>
        </section>
      </div>

      <details className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800">
        <summary className="cursor-pointer text-sm text-gray-700 dark:text-gray-200">Advanced: compute OTP for a given counter (HOTP)</summary>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input id="hotp-hex" placeholder="Counter hex (16 chars)" className="h-10 px-3 rounded-xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
          <button
            className="btn-secondary px-4 py-2"
            onClick={async () => {
              const el = document.getElementById("hotp-hex") as HTMLInputElement | null;
              if (!el) return;
              const raw = el.value.trim();
              const cleaned = raw.replace(/[^0-9a-fA-F]/g, "").toLowerCase();
              if (!cleaned) {
                alert("Please enter a hexadecimal counter value");
                return;
              }
              const normalized = cleaned.slice(-16).padStart(16, "0"); // ensure 8 bytes
              const bytes = hexToBytes(normalized);
              if (bytes.byteLength < 8) {
                const padded = new Uint8Array(8);
                padded.set(bytes, 8 - bytes.length);
                const dvTmp = new DataView(padded.buffer);
                const cntTmp = dvTmp.getUint32(0) * 0x100000000 + dvTmp.getUint32(4);
                const codeTmp = await hotp(secretBytes, cntTmp, digits);
                alert(codeTmp);
                return;
              }
              const dv = new DataView(bytes.buffer);
              const cnt = (dv.getUint32(0) * 0x100000000) + dv.getUint32(4);
              const code = await hotp(secretBytes, cnt, digits);
              alert(code);
            }}
          >
            Compute
          </button>
        </div>
      </details>
    </div>
  );
}


