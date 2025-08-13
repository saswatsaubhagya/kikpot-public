import Image from "next/image";
import AnimatedSection from "./components/AnimatedSection";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center bg-gradient-to-br from-white via-purple-50 to-blue-50 text-gray-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-white">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 py-24 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              From Pilots To Profit · Responsible AI
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-balance">
              <span className="gradient-text">How AI Is Transforming Business</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed text-balance max-w-3xl mx-auto">
              Move beyond experimentation. Embed AI into core workflows to streamline operations, make better decisions, and unlock new revenue—safely and at speed.
            </p>
            <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/blog/how-ai-is-transforming-business" className="btn-primary px-8 py-4 text-base shadow-2xl hover:shadow-purple-500/30">
                Read the Article
              </Link>
              <Link href="/contact" className="btn-secondary px-8 py-4 text-base backdrop-blur-sm">
                Talk to Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-black prose-h2:text-3xl prose-p:text-gray-600 dark:prose-p:text-gray-300">
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>Executive Summary</h2>
              <p>
                Leading organizations are embedding AI into the way work gets done. The playbook is clear: start small where value is provable, integrate with systems of record, and govern from day one. The result is faster cycles of learning and automation that compound over time.
              </p>
              <blockquote className="border-l-4 pl-4 italic text-gray-700 dark:text-gray-200">
                Companies that treat AI as a capability, not a tool, see compounding returns across operations, revenue, and customer experience.
              </blockquote>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ROI Today */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-balance text-center">
              <span className="gradient-text">Where AI Delivers ROI Today</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[ 
                {
                  title: "Customer Experience",
                  desc: "24/7 support, agent assist, and intent routing reduce wait times and increase CSAT."
                },
                {
                  title: "Sales & Marketing",
                  desc: "Lead scoring, content generation, and personalization lift conversion while lowering CAC."
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
                  desc: "Code suggestions, test generation, and incident summarization accelerate releases."
                }
              ].map((item) => (
                <div key={item.title} className="card p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Adoption Roadmap */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-black prose-h2:text-3xl">
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>A Practical Adoption Roadmap</h2>
              <h3>1) Prove Value in 90 Days</h3>
              <ul>
                <li>Pick one measurable workflow with clear data access and obvious friction.</li>
                <li>Stand up a lightweight proof-of-value with human-in-the-loop review.</li>
                <li>Measure impact using baselines: time saved, error rate, cost per ticket/order.</li>
              </ul>
              <h3>2) Industrialize</h3>
              <ul>
                <li>Harden the pipeline: observability, versioning, and model/prompt governance.</li>
                <li>Integrate via APIs and events so outputs flow into systems of record.</li>
                <li>Expand to adjacent use cases; reuse components, datasets, and playbooks.</li>
              </ul>
              <h3>3) Scale with Guardrails</h3>
              <ul>
                <li>Define policies for privacy, model usage, and human escalation.</li>
                <li>Continuously evaluate drift, cost, and performance against KPIs.</li>
                <li>Enable teams to build responsibly without reinventing the wheel.</li>
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto prose prose-lg dark:prose-invert">
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>Risks, Managed</h2>
              <p>
                Responsible AI is a business requirement. Establish data minimization, access controls, and human review for sensitive actions. Track prompts and outputs for auditability, and choose models for fitness, cost, and latency—not just benchmarks.
              </p>
              <ul>
                <li>Bias and fairness: monitor outcomes and diversify training data.</li>
                <li>Security: isolate secrets, sanitize inputs, restrict external calls.</li>
                <li>Compliance: retain logs, explain decisions, and document controls.</li>
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Impact + Illustration */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
          >
            <h2>Real-World Impact</h2>
            <p>
              Organizations adopting targeted AI workflows often report 20–40% cycle-time reduction, 10–25% cost savings, and material lift in customer satisfaction within two quarters. The biggest gains come from compounding: every automated step creates data that improves the next.
            </p>
          </AnimatedSection>
          <AnimatedSection
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-5xl mx-auto h-64 md:h-80 mt-10 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
          >
            <Image
              src="/images/ai-modern.svg"
              alt="AI modern illustration"
              fill
              className="object-contain p-8"
              priority
            />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-conic from-purple-100/20 via-transparent to-blue-100/20 dark:from-purple-900/20 dark:to-blue-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Get Started
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-balance">
              <span className="gradient-text">Turn AI Into Measurable Business Value</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-light leading-relaxed text-balance">
              We help you identify high-ROI use cases, build secure pipelines, and ship production-ready AI your teams can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary px-8 py-4 text-base shadow-2xl hover:shadow-purple-500/30">
                Talk to Us
              </Link>
              <Link href="/dev-tools" className="btn-secondary px-8 py-4 text-base backdrop-blur-sm">
                Explore Our Tools
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900 dark:text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-blue-500/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">KIKPOT</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-balance">
                Transforming businesses through innovative IT solutions and cutting-edge technology
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Company</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Contact</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  info@kikpot.com
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  +91 7653955621
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p className="font-light">&copy; {new Date().getFullYear()} Kikpot. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}
