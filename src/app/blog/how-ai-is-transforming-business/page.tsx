import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "../../components/AnimatedSection";
import Navbar from "../../../components/Navbar";
import ScrollToTop from "../../../components/ScrollToTop";

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-blue-50 text-gray-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-white">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 pt-16 pb-10 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-xs md:text-sm font-semibold mb-5 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Featured Article
              <span className="mx-3 text-gray-400">•</span>
              7 min read
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-balance">
              <span className="gradient-text">How AI Is Transforming Business</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed text-balance max-w-3xl mx-auto">
              From automation to decision intelligence, AI is moving from pilots to profit. Here’s what’s changing, where ROI is real today, and how to adopt responsibly.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="px-3 py-1 rounded-full bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/20">AI Strategy</span>
              <span className="px-3 py-1 rounded-full bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/20">Operations</span>
              <span className="px-3 py-1 rounded-full bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/20">Growth</span>
            </div>
          </AnimatedSection>
          <AnimatedSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative max-w-5xl mx-auto h-56 md:h-[420px] mt-10 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 shadow-2xl"
          >
            <Image
              src="/images/hero-illustration.svg"
              alt="AI transforming business"
              fill
              className="object-contain p-6"
              priority
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <div className="card p-6">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-4">On this page</h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#executive-summary" className="block text-gray-700 dark:text-gray-300 hover:text-purple-500">Executive Summary</a>
                    <a href="#roi-today" className="block text-gray-700 dark:text-gray-300 hover:text-purple-500">Where AI Delivers ROI</a>
                    <a href="#adoption-roadmap" className="block text-gray-700 dark:text-gray-300 hover:text-purple-500">Adoption Roadmap</a>
                    <a href="#risks" className="block text-gray-700 dark:text-gray-300 hover:text-purple-500">Risks, Managed</a>
                    <a href="#impact" className="block text-gray-700 dark:text-gray-300 hover:text-purple-500">Real-World Impact</a>
                    <a href="#get-started" className="block text-gray-700 dark:text-gray-300 hover:text-purple-500">Get Started</a>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Article */}
            <article className="lg:col-span-9">
              <div className="max-w-3xl prose prose-lg dark:prose-invert prose-headings:font-black prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 text-gray-900 dark:text-gray-100">
                <AnimatedSection
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 id="executive-summary">Executive Summary</h2>
                  <p>
                    Artificial intelligence has crossed the hype cycle. Leading organizations are embedding AI into core workflows to streamline operations, enable data-driven decisions, and unlock new revenue models. The shift is pragmatic: smaller, high-value use cases first, governed and monitored from day one.
                  </p>
                  <blockquote className="border-l-4 pl-4 italic text-gray-700 dark:text-gray-200">
                    Companies that treat AI as a capability, not just a tool, see compounding returns through faster cycles of learning and automation.
                  </blockquote>
                </AnimatedSection>

                <AnimatedSection
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-12"
                >
                  <h2 id="roi-today">Where AI Delivers ROI Today</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                    {[ 
                      {
                        title: "Customer Experience",
                        desc: "24/7 support with intelligent chat, agent assist, and intent routing reduces wait times and increases CSAT."
                      },
                      {
                        title: "Sales & Marketing",
                        desc: "Lead scoring, content generation, and personalization improve conversion rates and lower acquisition costs."
                      },
                      {
                        title: "Operations",
                        desc: "Forecasting, scheduling, and process automation remove bottlenecks and cut repetitive work."
                      },
                      {
                        title: "Risk & Compliance",
                        desc: "Document intelligence, anomaly detection, and audit automation reduce manual oversight."
                      },
                      {
                        title: "Software Delivery",
                        desc: "Code suggestions, test generation, and incident summarization accelerate release cycles."
                      }
                    ].map((item) => (
                      <div key={item.title} className="card p-5">
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-light">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12"
                >
                  <h2 id="adoption-roadmap">A Practical Adoption Roadmap</h2>
                  <h3>1) Prove Value in 90 Days</h3>
                  <ul>
                    <li>Pick a single, measurable workflow with obvious friction and clear data access.</li>
                    <li>Stand up a lightweight proof-of-value with human-in-the-loop review.</li>
                    <li>Measure impact using baseline metrics: time saved, error rate, cost per ticket/order.</li>
                  </ul>
                  <h3>2) Industrialize</h3>
                  <ul>
                    <li>Harden the pipeline: observability, versioning, prompt/model governance.</li>
                    <li>Integrate via APIs and event-driven triggers so the AI output flows into systems of record.</li>
                    <li>Expand to adjacent use cases; reuse components, datasets, and playbooks.</li>
                  </ul>
                  <h3>3) Scale with Guardrails</h3>
                  <ul>
                    <li>Define clear policies for data privacy, model usage, and human escalation.</li>
                    <li>Continuously evaluate model drift, cost, and performance against business KPIs.</li>
                    <li>Invest in enablement so teams can build responsibly without reinventing the wheel.</li>
                  </ul>
                </AnimatedSection>

                <AnimatedSection
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-12"
                >
                  <h2 id="risks">Risks, Managed</h2>
                  <p>
                    Responsible AI is a business requirement. Establish data minimization, access controls, and human review for sensitive actions. Track prompts and outputs for auditability, and choose models based on fit-for-purpose, cost, and latency — not just benchmarks.
                  </p>
                  <ul>
                    <li>Bias and fairness: monitor outcomes and diversify training data.</li>
                    <li>Security: isolate secrets, sanitize inputs, and restrict external calls.</li>
                    <li>Compliance: retain logs, explain decisions, and document controls.</li>
                  </ul>
                </AnimatedSection>

                <AnimatedSection
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-12"
                >
                  <h2 id="impact">Real-World Impact</h2>
                  <p>
                    Organizations adopting AI in targeted workflows typically report 20–40% cycle-time reduction, 10–25% cost savings, and material lift in customer satisfaction within the first two quarters. The biggest gains come from compounding: every automated step creates data that improves the next.
                  </p>
                </AnimatedSection>

                <AnimatedSection
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-12"
                >
                  <h2 id="get-started">Get Started</h2>
                  <p>
                    We help teams identify high-ROI use cases, build secure pipelines, and ship production-ready AI that your teams can trust.
                  </p>
                  <div className="not-prose mt-6 flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="btn-primary px-8 py-4 text-base shadow-2xl hover:shadow-purple-500/30">
                      Talk to Us
                    </Link>
                    <Link href="/dev-tools" className="btn-secondary px-8 py-4 text-base backdrop-blur-sm">
                      Explore Our Tools
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* End content */}

      <ScrollToTop />
    </div>
  );
}


