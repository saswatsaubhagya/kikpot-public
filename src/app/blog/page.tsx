import Link from "next/link";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";

const posts = [
  {
    slug: "how-ai-is-transforming-business",
    title: "How AI Is Transforming Business",
    description:
      "From automation to decision intelligence, AI is moving from pilots to profit. Where ROI is real and how to adopt responsibly.",
    readingTime: "7 min read",
    tag: "AI & Strategy",
    date: "2025-08-01",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <Navbar />

      <section className="relative overflow-hidden min-h-[40vh] flex items-center bg-gradient-to-br from-white via-purple-50 to-blue-50 text-gray-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-white">
        <div className="container mx-auto px-6 py-20 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Insights & Updates
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light">Articles, tutorials, and news from the Kikpot team.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <AnimatedSection
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card p-6 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="text-sm text-purple-500 dark:text-purple-300 font-semibold mb-2">{post.tag}</div>
                <h2 className="text-2xl font-bold mb-2">
                  <Link href={`/blog/${post.slug}`} className="text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 font-light mb-4">{post.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.readingTime}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}


