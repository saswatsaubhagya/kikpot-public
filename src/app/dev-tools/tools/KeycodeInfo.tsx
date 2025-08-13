"use client";

import { useEffect, useMemo, useState } from "react";

type KeyInfo = {
  key: string;
  keyCode: number;
  code: string;
  location: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
};

const initial: KeyInfo = {
  key: "",
  keyCode: 0,
  code: "",
  location: 0,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
};

function formatModifiers(info: KeyInfo): string {
  const list: string[] = [];
  if (info.metaKey) list.push("Meta");
  if (info.ctrlKey) list.push("Ctrl");
  if (info.altKey) list.push("Alt");
  if (info.shiftKey) list.push("Shift");
  return list.length ? list.join(" + ") : "None";
}

function displayKeyLabel(key: string): string {
  if (key === " ") return "Space";
  return key || "";
}

export default function KeycodeInfo() {
  const [info, setInfo] = useState<KeyInfo>(initial);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      type LegacyKeyboardEvent = KeyboardEvent & { keyCode?: number };
      const legacy = e as LegacyKeyboardEvent;
      setInfo({
        key: e.key,
        keyCode: legacy.keyCode ?? 0,
        code: e.code,
        location: e.location,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const bigLabel = useMemo(() => displayKeyLabel(info.key) || "Press any key", [info.key]);

  const copy = (value: string) => {
    if (!value) return;
    if (navigator?.clipboard) navigator.clipboard.writeText(value).catch(() => {});
  };

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-4 items-center gap-3">
      <div className="text-sm text-gray-400 dark:text-gray-400">{label} :</div>
      <div className="col-span-3 flex items-center gap-2">
        <input
          readOnly
          value={value}
          className="flex-1 h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 text-white"
        />
        <button onClick={() => copy(value)} className="px-3 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">
          Copy
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Find the javascript keycode, code, location and modifiers of any pressed key.</p>

      <section className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 text-center">
        <div className="text-3xl md:text-4xl font-semibold text-white">{bigLabel}</div>
        <div className="mt-2 text-sm text-gray-400">Press the key on your keyboard you want to get info about this key</div>
      </section>

      <div className="space-y-3">
        <Row label="Key" value={displayKeyLabel(info.key)} />
        <Row label="Keycode" value={String(info.keyCode)} />
        <Row label="Code" value={info.code} />
        <Row label="Location" value={String(info.location)} />
        <Row label="Modifiers" value={formatModifiers(info)} />
      </div>
    </div>
  );
}


