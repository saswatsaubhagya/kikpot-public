"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: "{}",
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URL strings",
    icon: "🔗",
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Convert text to/from Base64",
    icon: "📝",
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes",
    icon: "🔐",
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Convert between color formats",
    icon: "🎨",
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and validate regular expressions",
    icon: "🔍",
  },
];

function JSONFormatter() {
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
    } catch (err) {
      setError("Invalid JSON format");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input JSON
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-gray-900"
          placeholder="Paste your JSON here..."
        />
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={formatJSON}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Format JSON
        </button>
        {output && (
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <span>{copied ? "Copied!" : "Copy"}</span>
            {copied && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {output && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formatted Output
          </label>
          <pre className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto font-mono text-sm text-gray-900">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function DevToolsContent() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderToolContent = (toolId: string) => {
    switch (toolId) {
      case "json-formatter":
        return <JSONFormatter />;
      default:
        return <div className="text-gray-600">Tool implementation coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Developer Tools</h1>
        <p className="text-gray-600 mb-8">
          A collection of useful tools for developers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
              onClick={() => setSelectedTool(tool.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{tool.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedTool && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {tools.find((t) => t.id === selectedTool)?.name}
                </h2>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {renderToolContent(selectedTool)}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 