"use client";

import { useEffect, useMemo, useState } from "react";

type InputFormat =
  | "js-locale"
  | "iso-8601"
  | "iso-9075"
  | "rfc-3339"
  | "rfc-7231"
  | "unix-seconds"
  | "timestamp-ms"
  | "utc-format"
  | "mongo-objectid"
  | "excel-serial";

function pad2(n: number): string { return String(n).padStart(2, "0"); }
function formatISO9075(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}
function formatRFC3339(d: Date): string {
  const y = d.getFullYear();
  const M = pad2(d.getMonth() + 1);
  const D = pad2(d.getDate());
  const h = pad2(d.getHours());
  const m = pad2(d.getMinutes());
  const s = pad2(d.getSeconds());
  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const tzH = pad2(Math.floor(Math.abs(tz) / 60));
  const tzM = pad2(Math.abs(tz) % 60);
  return `${y}-${M}-${D}T${h}:${m}:${s}${sign}${tzH}:${tzM}`;
}

function parseISO9075Local(value: string): Date | null {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m;
  const dt = new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s));
  return isNaN(dt.getTime()) ? null : dt;
}

function parseInput(value: string, format: InputFormat): Date | null {
  if (!value) return new Date();
  const v = value.trim();
  switch (format) {
    case "js-locale":
    case "iso-8601":
    case "rfc-3339":
    case "rfc-7231":
    case "utc-format": {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    }
    case "iso-9075": {
      return parseISO9075Local(v);
    }
    case "unix-seconds": {
      if (!/^[-]?\d+(\.\d+)?$/.test(v)) return null;
      const seconds = Number(v);
      const d = new Date(seconds * 1000);
      return isNaN(d.getTime()) ? null : d;
    }
    case "timestamp-ms": {
      if (!/^[-]?\d+(\.\d+)?$/.test(v)) return null;
      const ms = Number(v);
      const d = new Date(ms);
      return isNaN(d.getTime()) ? null : d;
    }
    case "mongo-objectid": {
      if (!/^[0-9a-fA-F]{24}$/.test(v)) return null;
      const secondsHex = v.slice(0, 8);
      const seconds = parseInt(secondsHex, 16);
      const d = new Date(seconds * 1000);
      return isNaN(d.getTime()) ? null : d;
    }
    case "excel-serial": {
      const num = Number(v);
      if (!isFinite(num)) return null;
      const excelEpoch = Date.UTC(1899, 11, 30);
      const ms = num * 86400000 + excelEpoch;
      const d = new Date(ms);
      return isNaN(d.getTime()) ? null : d;
    }
    default:
      return null;
  }
}

function toUnixSeconds(d: Date): number { return Math.floor(d.getTime() / 1000); }
function toMongoObjectIdFromDate(d: Date): string {
  const seconds = toUnixSeconds(d);
  const tsHex = seconds.toString(16).padStart(8, "0");
  return `${tsHex}0000000000000000`;
}
function toExcelSerial(d: Date): number {
  const excelEpoch = Date.UTC(1899, 11, 30);
  return (d.getTime() - excelEpoch) / 86400000;
}

export default function DateTimeConverter() {
  const [input, setInput] = useState<string>("");
  const [format, setFormat] = useState<InputFormat>("iso-8601");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const date = useMemo(() => parseInput(input, format), [input, format]);

  // default to now on first mount
  useEffect(() => {
    // default value based on selected format
    const now = new Date();
    setInput(now.toISOString());
  }, []);

  const rows = useMemo(() => {
    if (!date) return [] as { label: string; value: string }[];
    const d = date;
    const list: { label: string; value: string }[] = [
      { label: "JS locale date string", value: d.toString() },
      { label: "ISO 8601", value: d.toISOString() },
      { label: "ISO 9075", value: formatISO9075(d) },
      { label: "RFC 3339", value: formatRFC3339(d) },
      { label: "RFC 7231", value: d.toUTCString() },
      { label: "Unix timestamp", value: String(toUnixSeconds(d)) },
      { label: "Timestamp", value: String(d.getTime()) },
      { label: "UTC format", value: d.toUTCString() },
      { label: "Mongo ObjectID", value: toMongoObjectIdFromDate(d) },
      { label: "Excel date/time", value: String(toExcelSerial(d)) },
    ];
    return list;
  }, [date]);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Put your date string here..."
          className="w-full h-12 px-4 rounded-2xl border bg-white/70 border-gray-200 backdrop-blur-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-900/40 dark:border-gray-700/50 dark:text-gray-100"
        />
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as InputFormat)}
          className="h-12 px-3 rounded-2xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
        >
          <option value="js-locale">JS locale date string</option>
          <option value="iso-8601">ISO 8601</option>
          <option value="iso-9075">ISO 9075</option>
          <option value="rfc-3339">RFC 3339</option>
          <option value="rfc-7231">RFC 7231</option>
          <option value="unix-seconds">Unix timestamp</option>
          <option value="timestamp-ms">Timestamp</option>
          <option value="utc-format">UTC format</option>
          <option value="mongo-objectid">Mongo ObjectID</option>
          <option value="excel-serial">Excel date/time</option>
        </select>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[200px_1fr_auto] gap-2 items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">{row.label}</div>
            <input
              readOnly
              value={row.value}
              className="h-10 px-3 rounded-2xl border bg-white/70 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/50 dark:text-gray-100 font-mono text-sm"
            />
            <button onClick={() => copy(row.value, row.label)} className="btn-secondary px-3 py-2 text-sm">
              {copiedKey === row.label ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


