import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

const posts = [
  {
    slug: "how-ai-is-transforming-business",
    title: "How AI is transforming business",
    description:
      "From automation to decision intelligence, AI is moving from pilots to profit. Where the ROI is real, and how to adopt it responsibly.",
    readingTime: "7 min read",
    tag: "AI & strategy",
    date: "2025-08-01",
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const metadata = {
  title: "Blog — Kikpot",
  description: "Articles, tutorials, and news from the Kikpot team.",
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar overlay />

      <section className="on-brand hero-field relative overflow-hidden pt-32 pb-20 text-brand-ink md:pt-40 md:pb-24">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-brand/25 blur-[130px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="rise max-w-3xl">
            <p className="eyebrow text-brand-soft">Insights and updates</p>
            <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.5rem)]">
              What we are thinking about.
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-brand-ink/75">
              Articles, tutorials, and notes from the Kikpot team — written when
              we have something worth saying.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="card p-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-dim">
                <span className="text-accent">{post.tag}</span>
                <span className="h-px w-4 bg-hairline-strong" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <h2 className="display mt-4 text-[1.875rem]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors duration-200 hover:text-brand"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-4 leading-relaxed text-dim">{post.description}</p>

              <p className="mt-6 border-t border-hairline pt-5 text-sm text-dim">
                {post.readingTime}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
