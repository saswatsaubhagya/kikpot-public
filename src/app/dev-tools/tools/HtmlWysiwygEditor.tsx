"use client";

import { useEffect, useRef, useState } from "react";

type Command =
  | "bold"
  | "italic"
  | "underline"
  | "strikeThrough"
  | "insertUnorderedList"
  | "insertOrderedList"
  | "justifyLeft"
  | "justifyCenter"
  | "justifyRight"
  | "undo"
  | "redo";

export default function HtmlWysiwygEditor() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [html, setHtml] = useState<string>(
    `<h1>Hey!</h1><p>Welcome to this html editor</p>`
  );
  const [formattedHtml, setFormattedHtml] = useState<string>(
    `<h1>Hey!</h1><p>Welcome to this html editor</p>`
  );
  const [showCode, setShowCode] = useState<boolean>(false);

  useEffect(() => {
    // Initialize editor content
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = html;
    }
  }, []);

  const onInput = () => {
    const next = editorRef.current?.innerHTML ?? "";
    setHtml(next);
  };

  const ensureFocus = () => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
  };

  const apply = (cmd: Command, value?: string) => {
    ensureFocus();
    document.execCommand(cmd, false, value);
    onInput();
  };

  const formatBlock = (block: "p" | "h1" | "h2" | "h3" | "h4" | "pre" | "blockquote") => {
    ensureFocus();
    // Try several values for cross‑browser support
    const tagUpper = block.toUpperCase();
    const tagLower = block.toLowerCase();
    const tagBracket = `<${tagLower}>`;
    if (!document.execCommand("formatBlock", false, tagUpper)) {
      if (!document.execCommand("formatBlock", false, tagLower)) {
        document.execCommand("formatBlock", false, tagBracket);
      }
    }
    onInput();
  };

  const insertHardBreak = () => {
    ensureFocus();
    if (!document.execCommand("insertLineBreak")) {
      document.execCommand("insertHTML", false, "<br>");
    }
    onInput();
  };

  const surroundSelectionWith = (tagName: "code") => {
    ensureFocus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const wrapper = document.createElement(tagName);
    if (range.collapsed) {
      wrapper.appendChild(document.createTextNode(""));
      range.insertNode(wrapper);
      const caret = document.createRange();
      caret.selectNodeContents(wrapper);
      caret.collapse(false);
      selection.removeAllRanges();
      selection.addRange(caret);
    } else {
      const content = range.extractContents();
      wrapper.appendChild(content);
      range.insertNode(wrapper);
      selection.removeAllRanges();
      const caret = document.createRange();
      caret.selectNode(wrapper);
      caret.collapse(false);
      selection.addRange(caret);
    }
    onInput();
  };

  const insertLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;
    document.execCommand("createLink", false, url);
    onInput();
  };

  const clearFormatting = () => {
    document.execCommand("removeFormat");
    onInput();
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {}
  };

  // Compute formatted HTML only on the client after hydration to avoid SSR/client mismatch
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const formatted = doc.body.innerHTML
        .replace(/></g, ">\n<")
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
      setFormattedHtml(formatted);
    } catch {
      setFormattedHtml(html);
    }
  }, [html]);

  const ToolbarButton = ({ label, onClick, title }: { label: string; onClick: () => void; title?: string }) => (
    <div className="relative group inline-block">
      <button
        type="button"
        onClick={onClick}
        aria-label={title || label}
        onMouseDown={(e) => e.preventDefault()} // Keep selection in the editor
        className="px-2 py-1 rounded-lg text-sm hover:bg-gray-800/60 border border-gray-700/60 text-white"
      >
        {label}
      </button>
      {title ? (
        <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg border border-gray-700/60 z-50">
          {title}
          <div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900" />
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Online, feature‑rich WYSIWYG HTML editor which generates the source code of the content immediately.</p>

      <section className="rounded-2xl border border-gray-800/70 overflow-visible">
        <div className="flex items-center gap-2 p-2 bg-gray-900/40 border-b border-gray-800/70">
            <ToolbarButton label="B" title="Bold" onClick={() => apply("bold")} />
            <ToolbarButton label="I" title="Italic" onClick={() => apply("italic")} />
            <ToolbarButton label="U" title="Underline" onClick={() => apply("underline")} />
            <ToolbarButton label="S̶" title="Strikethrough" onClick={() => apply("strikeThrough")} />
            <ToolbarButton label="`" title="Inline code" onClick={() => surroundSelectionWith("code")} />
            <ToolbarButton label="</>" title="Code block" onClick={() => formatBlock("pre")} />
            <ToolbarButton label="H1" title="Heading 1" onClick={() => formatBlock("h1")} />
            <ToolbarButton label="H2" title="Heading 2" onClick={() => formatBlock("h2")} />
            <ToolbarButton label="H3" title="Heading 3" onClick={() => formatBlock("h3")} />
            <ToolbarButton label="H4" title="Heading 4" onClick={() => formatBlock("h4")} />
            <ToolbarButton label="•" title="Bulleted list" onClick={() => apply("insertUnorderedList")} />
            <ToolbarButton label="1." title="Numbered list" onClick={() => apply("insertOrderedList")} />
            <ToolbarButton label="“”" title="Quote" onClick={() => formatBlock("blockquote")} />
            <ToolbarButton label="↵" title="Hard line break" onClick={insertHardBreak} />
            <ToolbarButton label="↶" title="Undo" onClick={() => apply("undo")} />
            <ToolbarButton label="↷" title="Redo" onClick={() => apply("redo")} />
            <ToolbarButton label="↔" title="Align left" onClick={() => apply("justifyLeft")} />
            <ToolbarButton label="↔︎" title="Align center" onClick={() => apply("justifyCenter")} />
            <ToolbarButton label="⇄" title="Align right" onClick={() => apply("justifyRight")} />
            <ToolbarButton label="🔗" title="Insert link" onClick={insertLink} />
            <ToolbarButton label="⟲" title="Clear formatting" onClick={clearFormatting} />
        </div>
        <div
          ref={editorRef}
          onInput={onInput}
          contentEditable
          role="textbox"
          aria-multiline="true"
          className="min-h-[260px] p-5 bg-gray-950/30 text-gray-100 focus:outline-none whitespace-pre-wrap"
          suppressContentEditableWarning
        />
      </section>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setShowCode((s) => !s)}
          className="btn-secondary px-4 py-2"
        >
          {showCode ? "Hide HTML" : "Show HTML"}
        </button>
        <button onClick={copyCode} className="btn-primary px-4 py-2">Copy HTML</button>
      </div>

      {showCode && (
        <section className="rounded-2xl border border-gray-800/70 overflow-hidden">
          <div className="flex items-center justify-between p-2 bg-gray-900/40 border-b border-gray-800/70">
            <div className="text-sm text-gray-400">HTML</div>
          </div>
          <pre className="min-h-[260px] p-5 bg-gray-950/30 text-gray-100 overflow-auto text-sm">{formattedHtml}</pre>
        </section>
      )}
    </div>
  );
}


