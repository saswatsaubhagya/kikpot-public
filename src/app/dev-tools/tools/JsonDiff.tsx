"use client";

import { useMemo, useState } from "react";

type JsonLike = Record<string, unknown> | unknown[] | string | number | boolean | null;

type DiffNode =
  | { kind: "equal"; value: JsonLike }
  | { kind: "added"; right: JsonLike }
  | { kind: "removed"; left: JsonLike }
  | { kind: "changed"; left: JsonLike; right: JsonLike }
  | { kind: "object"; children: Record<string, DiffNode> }
  | { kind: "array"; children: DiffNode[] };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildDiff(left: JsonLike, right: JsonLike): DiffNode {
  // Arrays: shallow-compare items by index; if any diff, show children
  if (Array.isArray(left) && Array.isArray(right)) {
    const max = Math.max(left.length, right.length);
    const children: DiffNode[] = [];
    for (let i = 0; i < max; i++) {
      if (i in left && i in right) children.push(buildDiff(left[i] as JsonLike, right[i] as JsonLike));
      else if (i in left) children.push({ kind: "removed", left: left[i] as JsonLike });
      else children.push({ kind: "added", right: right[i] as JsonLike });
    }
    const allEqual = children.every((c) => c.kind === "equal");
    return allEqual ? { kind: "equal", value: left } : { kind: "array", children };
  }

  // Objects: recurse by key union
  if (isPlainObject(left) && isPlainObject(right)) {
    const keys = Array.from(new Set([...Object.keys(left), ...Object.keys(right)])).sort();
    const children: Record<string, DiffNode> = {};
    let allEqual = true;
    for (const key of keys) {
      if (key in left && key in right) {
        const child = buildDiff((left as Record<string, unknown>)[key] as JsonLike, (right as Record<string, unknown>)[key] as JsonLike);
        children[key] = child;
        if (child.kind !== "equal") allEqual = false;
      } else if (key in left) {
        children[key] = { kind: "removed", left: (left as Record<string, unknown>)[key] as JsonLike };
        allEqual = false;
      } else {
        children[key] = { kind: "added", right: (right as Record<string, unknown>)[key] as JsonLike };
        allEqual = false;
      }
    }
    return allEqual ? { kind: "equal", value: left } : { kind: "object", children };
  }

  // Primitives or different types
  if (left === right) return { kind: "equal", value: left };
  if (left !== undefined && right === undefined) return { kind: "removed", left };
  if (left === undefined && right !== undefined) return { kind: "added", right };
  return { kind: "changed", left, right };
}

function formatPrimitive(value: JsonLike): string {
  if (typeof value === "string") return JSON.stringify(value);
  return String(value);
}

function DiffView({ node, indent = 0, onlyChanges }: { node: DiffNode; indent?: number; onlyChanges: boolean }) {
  const pad = (n: number) => " ".repeat(n);

  if (node.kind === "equal") {
    if (onlyChanges) return null;
    return (
      <div>
        {pad(indent)}{formatPrimitive(node.value)}
      </div>
    );
  }

  if (node.kind === "changed") {
    return (
      <div className="whitespace-pre">
        {pad(indent)}
        <span className="px-1 rounded bg-red-500/20 text-red-400 mr-1">{formatPrimitive(node.left)}</span>
        <span className="px-1 rounded bg-green-500/20 text-green-400">{formatPrimitive(node.right)}</span>
      </div>
    );
  }

  if (node.kind === "added") {
    return (
      <div className="whitespace-pre">
        {pad(indent)}
        <span className="px-1 rounded bg-green-500/20 text-green-400">{formatPrimitive(node.right)}</span>
      </div>
    );
  }

  if (node.kind === "removed") {
    return (
      <div className="whitespace-pre">
        {pad(indent)}
        <span className="px-1 rounded bg-red-500/20 text-red-400">{formatPrimitive(node.left)}</span>
      </div>
    );
  }

  if (node.kind === "array") {
    const hasVisibleChild = node.children.some((c) => (onlyChanges ? c.kind !== "equal" : true));
    if (!hasVisibleChild && onlyChanges) return null;
    return (
      <div>
        <div className="whitespace-pre">{pad(indent)}[</div>
        {node.children.map((c, idx) => (
          <DiffView key={idx} node={c} indent={indent + 2} onlyChanges={onlyChanges} />
        ))}
        <div className="whitespace-pre">{pad(indent)}]</div>
      </div>
    );
  }

  // object
  const entries = Object.entries(node.children);
  const visible = entries.filter(([, child]) => (onlyChanges ? child.kind !== "equal" : true));
  if (visible.length === 0 && onlyChanges) return null;
  return (
    <div>
      <div className="whitespace-pre">{pad(indent)}{'{'}</div>
      {visible.map(([key, child]) => (
        <div key={key} className="whitespace-pre">
          {pad(indent + 2)}{key}: {child.kind === "object" || child.kind === "array" ? null : null}
          {child.kind === "object" || child.kind === "array" ? (
            <DiffView node={child} indent={indent + 2} onlyChanges={onlyChanges} />
          ) : (
            <DiffView node={child} indent={0} onlyChanges={onlyChanges} />
          )}
        </div>
      ))}
      <div className="whitespace-pre">{pad(indent)}{'}'}</div>
    </div>
  );
}

export default function JsonDiff() {
  const [leftRaw, setLeftRaw] = useState("");
  const [rightRaw, setRightRaw] = useState("");
  const [onlyDiffs, setOnlyDiffs] = useState(true);

  const { left, right, parseError } = useMemo(() => {
    try {
      const l = leftRaw ? JSON.parse(leftRaw) : {};
      const r = rightRaw ? JSON.parse(rightRaw) : {};
      return { left: l as JsonLike, right: r as JsonLike, parseError: null as string | null };
    } catch {
      return { left: null as unknown as JsonLike, right: null as unknown as JsonLike, parseError: "Invalid JSON in one of the inputs" };
    }
  }, [leftRaw, rightRaw]);

  const diff = useMemo(() => {
    if (parseError) return null;
    return buildDiff(left, right);
  }, [left, right, parseError]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
          <h3 className="font-medium text-gray-100">Your first JSON</h3>
          <textarea
            value={leftRaw}
            onChange={(e) => setLeftRaw(e.target.value)}
            placeholder="Paste JSON..."
            className="w-full h-[24rem] p-3 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-transparent"
          />
        </section>
        <section className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
          <h3 className="font-medium text-gray-100">Your JSON to compare</h3>
          <textarea
            value={rightRaw}
            onChange={(e) => setRightRaw(e.target.value)}
            placeholder="Paste JSON..."
            className="w-full h-[24rem] p-3 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 font-mono text-sm text-white bg-transparent"
          />
        </section>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={onlyDiffs} onChange={(e) => setOnlyDiffs(e.target.checked)} />
          Only show differences
        </label>
        {parseError && <span className="text-red-400 text-sm">{parseError}</span>}
      </div>

      <section className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
        <h3 className="font-medium text-gray-100">Diff</h3>
        <div className="p-3 rounded-xl bg-black/20 border border-gray-800 overflow-x-auto text-white font-mono text-sm">
          {diff ? <DiffView node={diff} onlyChanges={onlyDiffs} /> : <span className="text-gray-400">No diff to display</span>}
        </div>
      </section>
    </div>
  );
}


