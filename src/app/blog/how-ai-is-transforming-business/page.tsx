import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ScrollToTop from "../../../components/ScrollToTop";

const sections = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "roi-today", label: "Where AI delivers ROI" },
  { id: "adoption-roadmap", label: "Adoption roadmap" },
  { id: "risks", label: "Risks, managed" },
  { id: "impact", label: "Real-world impact" },
  { id: "get-started", label: "Get started" },
];

const roi = [
  {
    title: "Customer experience",
    desc: "24/7 support with intelligent chat, agent assist, and intent routing reduces wait times and increases CSAT.",
  },
  {
    title: "Sales & marketing",
    desc: "Lead scoring, content generation, and personalization improve conversion rates and lower acquisition costs.",
  },
  {
    title: "Operations",
    desc: "Forecasting, scheduling, and process automation remove bottlenecks and cut repetitive work.",
  },
  {
    title: "Risk & compliance",
    desc: "Document intelligence, anomaly detection, and audit automation reduce manual oversight.",
  },
  {
    title: "Software delivery",
    desc: "Code suggestions, test generation, and incident summarization accelerate release cycles.",
  },
];

export const metadata = {
  title: "How AI is transforming business — Kikpot",
  description:
    "From automation to decision intelligence: where AI ROI is real today, and how to adopt it responsibly.",
};

export default function ArticlePage() {
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
            <p className="eyebrow text-brand-soft">Featured article</p>
            <h1 className="display mt-6 text-[clamp(2.5rem,6.5vw,4.25rem)]">
              How AI is transforming business
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-brand-ink/75">
              From automation to decision intelligence, AI is moving from pilots
              to profit. What is changing, where the ROI is real today, and how
              to adopt it responsibly.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-ink/60">
              <span>7 min read</span>
              <span className="h-px w-5 bg-brand-ink/25" />
              <span>AI strategy</span>
              <span className="h-px w-5 bg-brand-ink/25" />
              <span>Operations</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-28">
              <h2 className="text-sm font-medium text-accent">On this page</h2>
              <ul className="mt-4 space-y-2.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-dim transition-colors duration-200 hover:text-brand"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="article lg:col-span-8 lg:col-start-5">
            <h2 id="executive-summary">Executive summary</h2>
            <p>
              Artificial intelligence has crossed the hype cycle. Leading
              organizations are embedding AI into core workflows to streamline
              operations, enable data-driven decisions, and unlock new revenue
              models. The shift is pragmatic: smaller, high-value use cases
              first, governed and monitored from day one.
            </p>
            <blockquote>
              Companies that treat AI as a capability, not just a tool, see
              compounding returns through faster cycles of learning and
              automation.
            </blockquote>

            <h2 id="roi-today">Where AI delivers ROI today</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {roi.map((item) => (
                <div key={item.title} className="card p-6">
                  <h3 className="!mt-0 text-base font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 id="adoption-roadmap">A practical adoption roadmap</h2>
            <h3>1. Prove value in 90 days</h3>
            <ul>
              <li>Pick a single, measurable workflow with obvious friction and clear data access.</li>
              <li>Stand up a lightweight proof-of-value with human-in-the-loop review.</li>
              <li>Measure impact against baselines: time saved, error rate, cost per ticket or order.</li>
            </ul>
            <h3>2. Industrialize</h3>
            <ul>
              <li>Harden the pipeline: observability, versioning, prompt and model governance.</li>
              <li>Integrate via APIs and event-driven triggers so output flows into systems of record.</li>
              <li>Expand to adjacent use cases; reuse components, datasets, and playbooks.</li>
            </ul>
            <h3>3. Scale with guardrails</h3>
            <ul>
              <li>Define clear policies for data privacy, model usage, and human escalation.</li>
              <li>Continuously evaluate model drift, cost, and performance against business KPIs.</li>
              <li>Invest in enablement so teams can build responsibly without reinventing the wheel.</li>
            </ul>

            <h2 id="risks">Risks, managed</h2>
            <p>
              Responsible AI is a business requirement. Establish data
              minimization, access controls, and human review for sensitive
              actions. Track prompts and outputs for auditability, and choose
              models on fit-for-purpose, cost, and latency — not just benchmarks.
            </p>
            <ul>
              <li>Bias and fairness: monitor outcomes and diversify training data.</li>
              <li>Security: isolate secrets, sanitize inputs, and restrict external calls.</li>
              <li>Compliance: retain logs, explain decisions, and document controls.</li>
            </ul>

            <h2 id="impact">Real-world impact</h2>
            <p>
              Organizations adopting AI in targeted workflows typically report
              20–40% cycle-time reduction, 10–25% cost savings, and material lift
              in customer satisfaction within the first two quarters. The biggest
              gains compound: every automated step creates data that improves the
              next.
            </p>

            <h2 id="get-started">Get started</h2>
            <p>
              We help teams identify high-ROI use cases, build secure pipelines,
              and ship production AI that your teams can trust.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="btn-primary">
                Talk to us
              </Link>
              <Link href="/dev-tools" className="btn-secondary">
                Explore our tools
              </Link>
            </div>
          </article>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
