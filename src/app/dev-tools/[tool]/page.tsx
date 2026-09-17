import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "../toolsData";
import ToolRenderer from "../ToolRenderer";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.id }));
}

type ToolPageProps = { params: Promise<{ tool: string }> };

export async function generateMetadata({ params }: ToolPageProps) {
  const { tool: toolId } = await params;
  const meta = tools.find((t) => t.id === toolId);
  if (!meta) return {};
  return {
    title: `${meta.name} — Kikpot dev tools`,
    description: meta.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool: toolId } = await params;
  const meta = tools.find((t) => t.id === toolId);
  if (!meta) return notFound();

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <div className="flex items-baseline justify-between">
                <h2 className="text-sm font-medium text-accent">All tools</h2>
                <Link
                  href="/dev-tools"
                  className="text-xs text-dim transition-colors duration-200 hover:text-brand"
                >
                  Index
                </Link>
              </div>
              <ul className="mt-4 max-h-[65vh] space-y-0.5 overflow-auto pr-2">
                {tools.map((t) => {
                  const isActive = t.id === toolId;
                  return (
                    <li key={t.id}>
                      <Link
                        href={`/dev-tools/${t.id}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors duration-200 ${
                          isActive
                            ? "bg-brand/10 font-medium text-brand"
                            : "text-dim hover:bg-surface-2 hover:text-text"
                        }`}
                      >
                        <span aria-hidden="true" className="shrink-0 text-base">
                          {t.icon}
                        </span>
                        <span className="truncate">{t.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{meta.category}</p>
                <h1 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">{meta.name}</h1>
                <p className="measure mt-3 leading-relaxed text-dim">{meta.description}</p>
              </div>
              <Link href="/dev-tools" className="btn-secondary !px-5 !py-2.5 !text-sm">
                All tools
              </Link>
            </div>

            <div className="card mt-10 p-6 md:p-8">
              <ToolRenderer toolId={toolId} />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
