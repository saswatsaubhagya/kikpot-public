"use client";

import { useMemo, useState } from "react";

function clampNumber(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value;
}

export default function PercentageCalculator() {
  // Section 1: What is X % of Y
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const res1 = useMemo(() => ((clampNumber(x1) / 100) * clampNumber(y1)), [x1, y1]);

  // Section 2: X is what percent of Y
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
  const res2 = useMemo(() => (clampNumber(y2) === 0 ? NaN : (clampNumber(x2) / clampNumber(y2)) * 100), [x2, y2]);

  // Section 3: Percentage increase/decrease from -> to
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const res3 = useMemo(() => (clampNumber(from) === 0 ? NaN : ((clampNumber(to) - clampNumber(from)) / clampNumber(from)) * 100), [from, to]);

  const copy = (value: number) => {
    if (!Number.isFinite(value)) return;
    const s = `${value}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(s).catch(() => {});
  };

  const Stepper = ({ onDec, onInc }: { onDec: () => void; onInc: () => void }) => (
    <div className="flex items-center gap-2">
      <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={onDec}>−</button>
      <button type="button" className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200" onClick={onInc}>+</button>
    </div>
  );

  const Input = ({ value, onChange, placeholder }: { value: number; onChange: (n: number) => void; placeholder?: string }) => (
    <input
      type="number"
      value={Number.isFinite(value) ? value : ""}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
      className="min-w-0 flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
    />
  );

  const Result = ({ value, suffix }: { value: number; suffix?: string }) => (
    <div className="flex items-center gap-3">
      <div className="min-w-[7rem] h-10 px-3 rounded-2xl border border-gray-700 bg-gray-900/40 text-white flex items-center">
        {Number.isFinite(value) ? (suffix ? `${value.toFixed(4)}${suffix}` : value.toFixed(4)) : "—"}
      </div>
      <button onClick={() => copy(value)} className="px-3 h-10 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800" aria-label="Copy result">📋</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">Percentage calculator</div>
      <p className="text-sm text-gray-400">Easily calculate percentages from a value to another value, or from a percentage to a value.</p>

      {/* What is X % of Y */}
      <section className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
        <div className="text-gray-300 text-sm">What is</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_1fr_auto_auto] gap-3 items-center">
          <Input value={x1} onChange={setX1} placeholder="X" />
          <Stepper onDec={() => setX1((v) => v - 1)} onInc={() => setX1((v) => v + 1)} />
          <div className="text-gray-300">% of</div>
          <Input value={y1} onChange={setY1} placeholder="Y" />
          <Stepper onDec={() => setY1((v) => v - 1)} onInc={() => setY1((v) => v + 1)} />
          <Result value={res1} />
        </div>
      </section>

      {/* X is what percent of Y */}
      <section className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_1fr_auto_auto] gap-3 items-center">
          <Input value={x2} onChange={setX2} placeholder="X" />
          <Stepper onDec={() => setX2((v) => v - 1)} onInc={() => setX2((v) => v + 1)} />
          <div className="text-gray-300">is what percent of</div>
          <Input value={y2} onChange={setY2} placeholder="Y" />
          <Stepper onDec={() => setY2((v) => v - 1)} onInc={() => setY2((v) => v + 1)} />
          <Result value={res2} suffix="%" />
        </div>
      </section>

      {/* Percentage change */}
      <section className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
        <div className="text-gray-300 text-sm">What is the percentage increase/decrease</div>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto_1fr_auto_auto] gap-3 items-center">
          <div className="text-gray-300">From</div>
          <Input value={from} onChange={setFrom} placeholder="From" />
          <Stepper onDec={() => setFrom((v) => v - 1)} onInc={() => setFrom((v) => v + 1)} />
          <div className="text-gray-300">To</div>
          <Input value={to} onChange={setTo} placeholder="To" />
          <Stepper onDec={() => setTo((v) => v - 1)} onInc={() => setTo((v) => v + 1)} />
          <Result value={res3} suffix="%" />
        </div>
      </section>
    </div>
  );
}


