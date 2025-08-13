"use client";

import { useEffect, useState } from "react";
import { create, all, MathJsStatic, ConfigOptions } from "mathjs";

const math = create(all, {} as ConfigOptions) as MathJsStatic;

export default function MathEvaluator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!expr.trim()) {
      setError(null);
      setResult("");
      return;
    }
    try {
      setError(null);
      // Support quick substitutions like `| x=2` and integrals `| x=a..b`
      const pipeIdx = expr.indexOf("|");
      if (pipeIdx !== -1) {
        const left = expr.slice(0, pipeIdx).trim();
        const right = expr.slice(pipeIdx + 1).trim();
        if (right.includes("..")) {
          // integral(a..b)
          const m = right.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^.]*)\.\.\s*(.*)/);
          if (m) {
            const [, v, a, b] = m;
            const variable = v.trim();
            const from = math.evaluate(a);
            const to = math.evaluate(b);
            const f = math.parse(left).compile();
            // Simple numeric integration via Simpson's rule
            const n = 200; // even
            const h = (to - from) / n;
            let s = 0;
            for (let i = 0; i <= n; i++) {
              const x = from + i * h;
              const coeff = i === 0 || i === n ? 1 : i % 2 === 0 ? 2 : 4;
              s += coeff * (f.evaluate({ [variable]: x }) as number);
            }
            const val = (h / 3) * s;
            setResult(math.format(val, { precision: 14 }));
            return;
          }
        } else {
          // substitution list: x=2, y=3
          const assigns = Object.fromEntries(
            right.split(/\s*,\s*/).map((pair) => {
              const [k, v] = pair.split("=");
              return [k.trim(), math.evaluate(v.trim())];
            })
          );
          const node = math.parse(left).compile();
          const val = node.evaluate(assigns);
          setResult(math.format(val as unknown as number, { precision: 14 }));
          return;
        }
      }
      const val = math.evaluate(expr);
      setResult(math.format(val as unknown as number, { precision: 14 }));
      } catch {
      setResult("");
      setError("Invalid expression");
    }
  }, [expr]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">Math evaluator</div>
      <p className="text-sm text-gray-400">A calculator for evaluating mathematical expressions. You can use functions like sqrt, cos, sin, abs, etc.</p>

      <div className="space-y-3">
        <textarea
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="Your math expression (ex: 2*sqrt(6) )..."
          className="w-full h-16 p-3 rounded-2xl border border-gray-700 bg-transparent text-white font-mono text-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
        />
        {error && <div className="p-3 bg-red-50/10 text-red-400 rounded-2xl border border-red-900/30">{error}</div>}
        {!!result && (
          <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800 flex items-center justify-between">
            <div className="font-mono text-white text-sm">{result}</div>
            <button onClick={() => copy(result)} className="px-3 h-9 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800">Copy</button>
          </div>
        )}
      </div>

      
    </div>
  );
}


