"use client";

import { useMemo, useState } from "react";

type Scale = {
  key: string;
  label: string;
  symbol: string;
  fromKelvin: (k: number) => number; // display value
  toKelvin: (v: number) => number; // parse value to kelvin
};

const SCALES: Scale[] = [
  {
    key: "kelvin",
    label: "Kelvin",
    symbol: "K",
    fromKelvin: (k) => k,
    toKelvin: (v) => v,
  },
  {
    key: "celsius",
    label: "Celsius",
    symbol: "°C",
    fromKelvin: (k) => k - 273.15,
    toKelvin: (v) => v + 273.15,
  },
  {
    key: "fahrenheit",
    label: "Fahrenheit",
    symbol: "°F",
    fromKelvin: (k) => k * (9 / 5) - 459.67,
    toKelvin: (v) => (v + 459.67) * (5 / 9),
  },
  {
    key: "rankine",
    label: "Rankine",
    symbol: "°R",
    fromKelvin: (k) => k * (9 / 5),
    toKelvin: (v) => v * (5 / 9),
  },
  {
    key: "delisle",
    label: "Delisle",
    symbol: "°De",
    fromKelvin: (k) => (373.15 - k) * 1.5,
    toKelvin: (v) => 373.15 - (v * 2) / 3,
  },
  {
    key: "newton",
    label: "Newton",
    symbol: "°N",
    fromKelvin: (k) => (k - 273.15) * (33 / 100),
    toKelvin: (v) => 273.15 + (v * 100) / 33,
  },
  {
    key: "reaumur",
    label: "Réaumur",
    symbol: "°Ré",
    fromKelvin: (k) => (k - 273.15) * (4 / 5),
    toKelvin: (v) => 273.15 + (v * 5) / 4,
  },
  {
    key: "romer",
    label: "Rømer",
    symbol: "°Rø",
    fromKelvin: (k) => (k - 273.15) * (21 / 40) + 7.5,
    toKelvin: (v) => 273.15 + (v - 7.5) * (40 / 21),
  },
];

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "";
  const rounded = Math.round(value * 100) / 100;
  return Number(rounded).toString();
}

export default function TemperatureConverter() {
  const [kelvin, setKelvin] = useState<number>(0);

  const rows = useMemo(() => {
    return SCALES.map((s) => ({
      scale: s,
      value: s.fromKelvin(kelvin),
    }));
  }, [kelvin]);

  const setFromScale = (scale: Scale, newValue: number) => {
    if (!Number.isFinite(newValue)) return;
    const k = scale.toKelvin(newValue);
    setKelvin(k);
  };

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-white">Temperature converter</div>
      <p className="text-sm text-gray-400">Degrees temperature conversions for Kelvin, Celsius, Fahrenheit, Rankine, Delisle, Newton, Réaumur, and Rømer.</p>

      <div className="space-y-3">
        {rows.map(({ scale, value }) => (
          <div key={scale.key} className="grid grid-cols-[10rem_1fr_auto] gap-3 items-center">
            <div className="text-gray-200">{scale.label}</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={formatNumber(value)}
                onChange={(e) => setFromScale(scale, Number(e.target.value))}
                className="min-w-0 flex-1 h-10 px-3 rounded-2xl border border-gray-700 bg-transparent text-white"
              />
              <button
                type="button"
                className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200"
                onClick={() => setFromScale(scale, (value || 0) - 1)}
              >
                −
              </button>
              <button
                type="button"
                className="shrink-0 px-3 h-10 rounded-xl border border-gray-700 text-gray-200"
                onClick={() => setFromScale(scale, (value || 0) + 1)}
              >
                +
              </button>
            </div>
            <div className="px-3 h-10 rounded-2xl border border-gray-700 bg-gray-900/40 text-gray-200 flex items-center justify-center">
              {scale.symbol}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


