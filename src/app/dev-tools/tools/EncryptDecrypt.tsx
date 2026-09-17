"use client";

import { useState } from "react";

type Algorithm = "AES" | "TripleDES" | "RC4" | "Rabbit";

async function encrypt(text: string, key: string, algorithm: Algorithm): Promise<string> {
  const CryptoJS = await import("crypto-js");
  switch (algorithm) {
    case "AES":
      return CryptoJS.AES.encrypt(text, key).toString();
    case "TripleDES":
      return CryptoJS.TripleDES.encrypt(text, key).toString();
    case "RC4":
      return CryptoJS.RC4.encrypt(text, key).toString();
    case "Rabbit":
      return CryptoJS.Rabbit.encrypt(text, key).toString();
  }
}

async function decrypt(ciphertext: string, key: string, algorithm: Algorithm): Promise<string> {
  const CryptoJS = await import("crypto-js");
  try {
    let bytes: unknown;
    switch (algorithm) {
      case "AES":
        bytes = CryptoJS.AES.decrypt(ciphertext, key);
        break;
      case "TripleDES":
        bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
        break;
      case "RC4":
        bytes = CryptoJS.RC4.decrypt(ciphertext, key);
        break;
      case "Rabbit":
        bytes = CryptoJS.Rabbit.decrypt(ciphertext, key);
        break;
    }
    type HasToString = { toString: (enc?: unknown) => string };
    const utf8 = (CryptoJS as unknown as { enc: { Utf8: unknown } }).enc.Utf8;
    const out = (bytes as HasToString).toString(utf8);
    if (!out) throw new Error("Invalid result");
    return out;
  } catch {
    return "";
  }
}

export default function EncryptDecrypt() {
  const [plain, setPlain] = useState<string>("Lorem ipsum dolor sit amet");
  const [encKey, setEncKey] = useState<string>("my secret key");
  const [encAlgo, setEncAlgo] = useState<Algorithm>("AES");
  const [cipher, setCipher] = useState<string>("");

  const [decInput, setDecInput] = useState<string>("");
  const [decKey, setDecKey] = useState<string>("my secret key");
  const [decAlgo, setDecAlgo] = useState<Algorithm>("AES");
  const [decrypted, setDecrypted] = useState<string>("");

  const handleEncrypt = async () => {
    const out = await encrypt(plain, encKey, encAlgo);
    setCipher(out);
    // conveniently mirror into decrypt input
    setDecInput(out);
  };

  const handleDecrypt = async () => {
    const out = await decrypt(decInput, decKey, decAlgo);
    setDecrypted(out || "");
  };

  return (
    <div className="space-y-6">
      <p className="text-dim text-sm">
        Encrypt clear text and decrypt ciphertext using crypto algorithms like AES, TripleDES, Rabbit or RC4.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Encrypt */}
        <div className="card p-5">
          <h3 className="text-lg font-semibold mb-4 text-text ">Encrypt</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dim mb-2">Your text:</label>
              <textarea
                value={plain}
                onChange={(e) => setPlain(e.target.value)}
                className="w-full h-28 p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface "
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={encKey}
                onChange={(e) => setEncKey(e.target.value)}
                placeholder="my secret key"
                className="h-10 px-3 rounded-2xl border bg-surface border-hairline text-text "
              />
              <select
                value={encAlgo}
                onChange={(e) => setEncAlgo(e.target.value as Algorithm)}
                className="h-10 px-3 rounded-2xl border bg-surface border-hairline text-text "
              >
                <option value="AES">AES</option>
                <option value="TripleDES">TripleDES</option>
                <option value="RC4">RC4</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleEncrypt} className="btn-primary px-5 py-2.5">Encrypt</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-dim mb-2">Your text encrypted:</label>
              <textarea
                readOnly
                value={cipher}
                className="w-full h-24 p-3 border border-hairline rounded-2xl bg-surface-2 font-mono text-sm text-text break-all"
              />
            </div>
          </div>
        </div>

        {/* Decrypt */}
        <div className="card p-5">
          <h3 className="text-lg font-semibold mb-4 text-text ">Decrypt</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dim mb-2">Your encrypted text:</label>
              <textarea
                value={decInput}
                onChange={(e) => setDecInput(e.target.value)}
                className="w-full h-28 p-3 border border-hairline rounded-2xl focus:ring-2 focus:ring-brand/40 focus:border-brand font-mono text-sm text-text bg-surface "
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={decKey}
                onChange={(e) => setDecKey(e.target.value)}
                placeholder="my secret key"
                className="h-10 px-3 rounded-2xl border bg-surface border-hairline text-text "
              />
              <select
                value={decAlgo}
                onChange={(e) => setDecAlgo(e.target.value as Algorithm)}
                className="h-10 px-3 rounded-2xl border bg-surface border-hairline text-text "
              >
                <option value="AES">AES</option>
                <option value="TripleDES">TripleDES</option>
                <option value="RC4">RC4</option>
                <option value="Rabbit">Rabbit</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleDecrypt} className="btn-primary px-5 py-2.5">Decrypt</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-dim mb-2">Your decrypted text:</label>
              <textarea
                readOnly
                value={decrypted}
                className="w-full h-24 p-3 border border-hairline rounded-2xl bg-surface-2 font-mono text-sm text-text "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


