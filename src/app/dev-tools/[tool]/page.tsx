import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "../toolsData";
import ToolRenderer from "../ToolRenderer";

type ToolPageProps = { params: Promise<{ tool: string }> };

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool: toolId } = await params;
  const meta = tools.find((t) => t.id === toolId);
  if (!meta) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <Navbar />

      <div className="pt-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="card p-5 sticky top-28">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Tools</h4>
                  <Link href="/dev-tools" className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-smooth">All</Link>
                </div>
                <ul className="space-y-1 max-h-[60vh] overflow-auto pr-1">
                  {tools.map((t) => {
                    const isActive = t.id === toolId;
                    return (
                      <li key={t.id}>
                        <Link
                          href={`/dev-tools/${t.id}`}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-smooth ${
                            isActive
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg ${
                            isActive ? "bg-white/20" : "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                          } text-[12px]`}>
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
              <div className="flex items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{meta.name}</h1>
                <Link href="/dev-tools" className="btn-secondary px-4 py-2">All Tools</Link>
              </div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs px-2 py-1 rounded-full bg-white/60 border border-white/50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700/50 whitespace-nowrap">
                  {meta.category}
                </span>
                <p className="text-gray-600 dark:text-gray-400">{meta.description}</p>
              </div>
              <div className="card p-6">
                <ToolRenderer toolId={toolId} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}


