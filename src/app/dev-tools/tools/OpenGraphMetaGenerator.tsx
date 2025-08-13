"use client";

import { useMemo, useState } from "react";

const pageTypes = ["website", "article", "book", "profile", "music", "video"] as const;
type PageType = (typeof pageTypes)[number];

const twitterCardTypes = [
  { id: "summary", label: "Summary" },
  { id: "summary_large_image", label: "Summary with large image" },
  { id: "app", label: "Application" },
  { id: "player", label: "Player" },
] as const;

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function OpenGraphMetaGenerator() {
  const [type, setType] = useState<PageType>("website");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");

  const [twitterCard, setTwitterCard] = useState<string>("summary_large_image");
  const [twitterSite, setTwitterSite] = useState("");
  const [twitterCreator, setTwitterCreator] = useState("");

  const meta = useMemo(() => {
    const lines: string[] = [];
    lines.push("<!-- og meta -->");
    lines.push(`<meta property=\"og:type\" value=\"${escapeAttr(type)}\" />`);
    if (title.trim()) lines.push(`<meta property=\"og:title\" value=\"${escapeAttr(title)}\" />`);
    if (description.trim())
      lines.push(`<meta property=\"og:description\" value=\"${escapeAttr(description)}\" />`);
    if (url.trim()) lines.push(`<meta property=\"og:url\" value=\"${escapeAttr(url)}\" />`);
    if (imageUrl.trim()) lines.push(`<meta property=\"og:image\" value=\"${escapeAttr(imageUrl)}\" />`);
    if (imageAlt.trim()) lines.push(`<meta property=\"og:image:alt\" value=\"${escapeAttr(imageAlt)}\" />`);
    if (imageWidth.trim()) lines.push(`<meta property=\"og:image:width\" value=\"${escapeAttr(imageWidth)}\" />`);
    if (imageHeight.trim())
      lines.push(`<meta property=\"og:image:height\" value=\"${escapeAttr(imageHeight)}\" />`);

    lines.push("\n<!-- twitter meta -->");
    lines.push(`<meta name=\"twitter:card\" value=\"${escapeAttr(twitterCard)}\" />`);
    if (twitterSite.trim()) lines.push(`<meta name=\"twitter:site\" value=\"${escapeAttr(twitterSite)}\" />`);
    if (twitterCreator.trim())
      lines.push(`<meta name=\"twitter:creator\" value=\"${escapeAttr(twitterCreator)}\" />`);

    return lines.join("\n");
  }, [type, title, description, url, imageUrl, imageAlt, imageWidth, imageHeight, twitterCard, twitterSite, twitterCreator]);

  const copy = (value: string) => {
    if (!value) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">Generate open‑graph and socials HTML meta tags for your website.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-5">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">General information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Page type</div>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PageType)}
                  className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white"
                >
                  {pageTypes.map((t) => (
                    <option key={t} value={t} className="bg-gray-900 text-white">
                      {t[0].toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Title</div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title of your website..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Description</div>
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter the description of your website..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Page URL</div>
              <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter the url of your website..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </div>

            <h3 className="font-medium text-gray-900 dark:text-gray-100 pt-2">Image</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Image url</div>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="The url of your website social image..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Image alt</div>
              <input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="The alternative text of your website social image..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">Width</div>
                <input value={imageWidth} onChange={(e) => setImageWidth(e.target.value)} placeholder="Width in px of your website social image..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">Height</div>
                <input value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} placeholder="Height in px of your website social image..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
              </div>
            </div>

            <h3 className="font-medium text-gray-900 dark:text-gray-100 pt-2">Twitter</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Card type</div>
              <select
                value={twitterCard}
                onChange={(e) => setTwitterCard(e.target.value)}
                className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white"
              >
                {twitterCardTypes.map((t) => (
                  <option key={t.id} value={t.id} className="bg-gray-900 text-white">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Site account</div>
              <input value={twitterSite} onChange={(e) => setTwitterSite(e.target.value)} placeholder="The name of the Twitter account of the site (ex: @yourhandle)..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Creator acc.</div>
              <input value={twitterCreator} onChange={(e) => setTwitterCreator(e.target.value)} placeholder="The name of the Twitter account of the creator (ex: @creator)..." className="w-full h-12 px-3 rounded-2xl border bg-white/60 border-gray-200 dark:bg-gray-900/40 dark:border-gray-700/40 text-white" />
            </div>
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Your meta tags</h3>
          <textarea
            value={meta}
            readOnly
            className="w-full h-[28rem] p-3 border border-gray-200 rounded-2xl font-mono text-sm text-white bg-white/60 dark:bg-gray-900/40 dark:border-gray-700/40"
          />
          <div className="flex gap-2">
            <button onClick={() => copy(meta)} className="px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-white">Copy</button>
          </div>
        </section>
      </div>
    </div>
  );
}




