import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

const services = [
  {
    id: "software-development",
    title: "Software development",
    description:
      "Custom software built to your business, scalable and secure, using tools we can still support in three years.",
    image: "/images/software-modern.svg",
    features: [
      "Custom web applications",
      "Mobile app development",
      "API development",
      "Legacy system modernization",
      "Quality assurance & testing",
    ],
    technologies: ["React", "Node.js", "Python", "PostgreSQL", "AWS"],
  },
  {
    id: "cloud-solutions",
    title: "Cloud solutions",
    description:
      "Migration, optimisation, and day-to-day operation of your infrastructure, so capacity follows demand instead of guesswork.",
    image: "/images/cloud-modern.svg",
    features: [
      "Cloud migration strategy",
      "Infrastructure as code",
      "Auto-scaling solutions",
      "Cost optimization",
      "Disaster recovery",
    ],
    technologies: ["AWS", "Azure", "Kubernetes", "Terraform", "Docker"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Find what is exposed, fix it, and prove it stays fixed. Audits, testing, compliance, and a plan for the day something goes wrong.",
    image: "/images/security-modern.svg",
    features: [
      "Security audits & assessments",
      "Penetration testing",
      "Compliance implementation",
      "Security training",
      "Incident response",
    ],
    technologies: ["SIEM", "IDS/IPS", "Vulnerability scanners", "Encryption", "Zero-trust"],
  },
  {
    id: "ai-solutions",
    title: "AI solutions",
    description:
      "Machine learning applied where it measurably changes a decision, not bolted on because it is the word of the year.",
    image: "/images/ai-modern.svg",
    features: [
      "Machine learning models",
      "Natural language processing",
      "Computer vision",
      "Predictive analytics",
      "Chatbot development",
    ],
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Azure AI", "Python"],
  },
];

export const metadata = {
  title: "Services — Kikpot",
  description:
    "Software development, cloud, cybersecurity, and AI, delivered by one team rather than four vendors.",
};

export default function ServicesPage() {
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
            <p className="eyebrow text-brand-soft">What we do</p>
            <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.5rem)]">
              Four practices that
              <br />
              cover the whole system.
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-brand-ink/75">
              From the application your customers touch to the infrastructure
              underneath it and the controls around it. Pick one, or hand us the
              whole thing.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <Link href="#services" className="btn-secondary">
                See the detail
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="space-y-6">
          {services.map((service, index) => (
            <article key={service.id} className="card p-8 md:p-10">
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-[#f1f0fa]">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <h2 className="display text-[1.875rem]">{service.title}</h2>
                  </div>

                  <p className="mt-5 leading-relaxed text-dim">{service.description}</p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-hairline px-3 py-1 text-[0.8125rem] text-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-7 md:border-l md:border-hairline md:pl-10">
                  <h3 className="text-sm font-medium text-accent">What that includes</h3>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[0.9375rem] text-dim">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {index === 0 && (
                    <p className="mt-8 text-sm text-dim">
                      Not sure which of these you need?{" "}
                      <Link href="/contact" className="text-brand underline underline-offset-4">
                        Describe the problem
                      </Link>{" "}
                      and we will tell you.
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Get in touch</p>
            <h2 className="display mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Tell us what you are trying to build
            </h2>
            <p className="measure mt-4 leading-relaxed text-dim">
              A few lines about the problem is enough to start. We will tell you
              whether we are the right team for it, and what it would take.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-self-end">
            <Link href="/contact" className="btn-primary">
              Contact us
            </Link>
            <Link href="/dev-tools" className="btn-secondary">
              Our tools
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
