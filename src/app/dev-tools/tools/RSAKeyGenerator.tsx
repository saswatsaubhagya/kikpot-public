"use client";

import { useEffect, useState } from "react";
import { bytesToBase64 } from "./hashUtils";

function chunkString(input: string, size: number): string {
  const chunks: string[] = [];
  for (let i = 0; i < input.length; i += size) chunks.push(input.slice(i, i + size));
  return chunks.join("\n");
}

function toPem(buffer: ArrayBuffer, label: string): string {
  const base64 = bytesToBase64(new Uint8Array(buffer));
  const wrapped = chunkString(base64, 64);
  return `-----BEGIN ${label}-----\n${wrapped}\n-----END ${label}-----`;
}

async function generateRsaKeyPair(modulusLength: number): Promise<{ publicKeyPem: string; privateKeyPem: string }>
{
  const algorithm: RsaHashedKeyGenParams = {
    name: "RSASSA-PKCS1-v1_5",
    modulusLength,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: "SHA-256",
  };
  const keyPair = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);
  const spki = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
  return {
    publicKeyPem: toPem(spki, "PUBLIC KEY"),
    privateKeyPem: toPem(pkcs8, "PRIVATE KEY"),
  };
}

export default function RSAKeyGenerator() {
  const [bits, setBits] = useState<number>(2048);
  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);

  const refresh = async () => {
    try {
      setBusy(true);
      const { publicKeyPem, privateKeyPem } = await generateRsaKeyPair(bits);
      setPublicKey(publicKeyPem);
      setPrivateKey(privateKeyPem);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    // Generate on mount and when size changes
    let cancelled = false;
    (async () => {
      setBusy(true);
      try {
        const { publicKeyPem, privateKeyPem } = await generateRsaKeyPair(bits);
        if (!cancelled) {
          setPublicKey(publicKeyPem);
          setPrivateKey(privateKeyPem);
        }
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bits]);

  const decBits = () => setBits((b) => Math.max(1024, b - 1024));
  const incBits = () => setBits((b) => Math.min(4096, b + 1024));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">Bits</div>
        <div className="inline-flex items-center rounded-xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 overflow-hidden">
          <button onClick={decBits} className="px-2 py-1 text-lg text-gray-700 dark:text-gray-200">−</button>
          <div className="px-3 py-1 text-sm text-gray-900 dark:text-gray-100">{bits}</div>
          <button onClick={incBits} className="px-2 py-1 text-lg text-gray-700 dark:text-gray-200">+</button>
        </div>
        <button onClick={refresh} disabled={busy} className="btn-secondary px-4 py-2">{busy ? "Generating…" : "Refresh key-pair"}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Public key</label>
          <textarea
            readOnly
            value={publicKey}
            className="w-full h-96 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-xs text-gray-900 bg-white/60 dark:bg-gray-900/40 dark:text-gray-100 dark:border-gray-700/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Private key</label>
          <textarea
            readOnly
            value={privateKey}
            className="w-full h-96 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-xs text-gray-900 bg-white/60 dark:bg-gray-900/40 dark:text-gray-100 dark:border-gray-700/50"
          />
        </div>
      </div>
    </div>
  );
}


