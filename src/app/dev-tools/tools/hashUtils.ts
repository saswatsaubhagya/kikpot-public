"use client";

export type WebCryptoAlgo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export async function computeHashRaw(algorithm: WebCryptoAlgo, text: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest(algorithm, data);
  return new Uint8Array(digest);
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof window === "undefined") return "";
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return window.btoa(binary);
}

export async function computeHash(algorithm: WebCryptoAlgo, text: string): Promise<string> {
  const bytes = await computeHashRaw(algorithm, text);
  return bytesToHex(bytes);
}

export async function computeHmacRaw(
  algorithm: WebCryptoAlgo,
  secret: string,
  message: string
): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: algorithm } },
    false,
    ["sign"]
  );
  const data = encoder.encode(message);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
  return new Uint8Array(signature);
}

export async function computeHmac(
  algorithm: WebCryptoAlgo,
  secret: string,
  message: string
): Promise<string> {
  const bytes = await computeHmacRaw(algorithm, secret, message);
  return bytesToHex(bytes);
}


