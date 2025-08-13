"use client";

import { useState } from "react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      setError(null);
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch {
      setError("Invalid JSON format");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 p-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-gray-900 bg-white/60"
          placeholder="Paste your JSON here..."
        />
      </div>

      <div className="flex space-x-2">
        <button onClick={formatJSON} className="btn-primary px-5 py-2.5">
          Format JSON
        </button>
        {output && (
          <button onClick={copyToClipboard} className="btn-secondary px-5 py-2.5 flex items-center space-x-2">
            <span>{copied ? "Copied!" : "Copy"}</span>
            {copied && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">{error}</div>}

      {output && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Formatted Output</label>
          <pre className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl overflow-x-auto font-mono text-sm text-gray-900">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}


