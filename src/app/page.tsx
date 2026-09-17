import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { tools } from "./dev-tools/toolsData";

const services = [
  {
    title: "Software development",
    summary:
      "Custom software built to your business, from web applications to enterprise systems.",
    image: "/images/software-modern.svg",
    points: ["Custom development", "Web & mobile apps", "Enterprise systems"],
  },
  {
    title: "Cloud solutions",
    summary:
      "Migration and scalable infrastructure, so capacity follows demand instead of guesswork.",
    image: "/images/cloud-modern.svg",
    points: ["Cloud migration", "Infrastructure", "Scaling"],
  },
  {
    title: "Cybersecurity",
    summary:
      "Protection for the systems and data your business cannot afford to lose.",
    image: "/images/security-modern.svg",
    points: ["Threat protection", "Compliance", "Incident response"],
  },
  {
    title: "AI solutions",
    summary:
      "Machine learning and automation applied where they measurably change a decision.",
    image: "/images/ai-modern.svg",
    points: ["Machine learning", "Predictive analytics", "Automation"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar overlay />

      {/* Hero: the one place the page is loud. Violet-to-blue, serif on top. */}
      <section className="on-brand hero-field relative overflow-hidden pt-32 pb-20 text-brand-ink md:pt-40 md:pb-28">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-brand/25 blur-[130px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="rise lg:col-span-7">
              <p className="eyebrow text-brand-soft">Kikpot — IT partner since day one</p>

              <h1 className="display mt-6 text-[clamp(2.75rem,8vw,5.25rem)]">
                Software your business
                <br />
                can keep running on.
              </h1>

              <p className="measure mt-7 text-lg leading-relaxed text-brand-ink/75">
                We design, build, and operate the systems companies depend on &mdash;
                development, cloud, security, and AI, handled by one team rather
                than four vendors.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Start a project
                </Link>
                <Link href="/services" className="btn-secondary">
                  See what we do
                </Link>
              </div>

              <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-brand-ink/15 pt-7">
                {[
                  { k: "Projects delivered", v: "500+" },
                  { k: "Uptime", v: "99.9%" },
                  { k: "Free dev tools", v: String(tools.length) },
                ].map((stat) => (
                  <div key={stat.k}>
                    <dd className="display text-[2.25rem] text-brand-soft">{stat.v}</dd>
                    <dt className="mt-1 text-sm text-brand-ink/60">{stat.k}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div
              className="rise lg:col-span-5"
              style={{ animationDelay: "140ms" }}
              aria-hidden="true"
            >
              <HeroFigure />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">
            Four practices, one team
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-dim">
            Most work needs more than one of these. They sit together, so the
            handoff between them is a conversation rather than a contract.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="card p-8">
              <div className="relative h-14 w-14 overflow-hidden rounded-[12px] bg-[#f1f0fa]">
                <Image src={service.image} alt="" fill className="object-contain p-1" />
              </div>

              <h3 className="display mt-6 text-[1.75rem]">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-dim">{service.summary}</p>

              <ul className="mt-6 space-y-2.5 border-t border-hairline pt-5">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-dim">
                    <span className="h-px w-3 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Dev tools */}
      <section className="bg-surface-2">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Free to use</p>
            <h2 className="display mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)]">
              {tools.length} developer tools, no account needed
            </h2>
            <p className="measure mt-4 leading-relaxed text-dim">
              Converters, generators, parsers, and encoders we built for our own
              work and left open. The quickest way to see how we build.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link href="/dev-tools" className="btn-primary">
              Open dev tools
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="relative h-[300px] lg:col-span-5 lg:h-[420px]">
            <Image
              src="/images/contact-illustration.svg"
              alt="Illustration of a conversation between a client and the Kikpot team"
              fill
              className="object-contain"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow">Get in touch</p>
            <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.5rem)]">
              Tell us what is breaking, or what you want to build.
            </h2>
            <p className="measure mt-5 text-lg leading-relaxed text-dim">
              Describe the problem in a few lines. We will tell you whether we are
              the right team for it, and what it would take.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <a href="mailto:info@kikpot.com" className="btn-secondary">
                info@kikpot.com
              </a>
            </div>

            <div className="card mt-10 flex items-center gap-3 p-5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
              <p className="text-sm text-dim">
                <span className="font-medium text-text">
                  Available 24/7 for urgent support.
                </span>{" "}
                Existing clients reach an on-call engineer, not a ticket queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* Hand-drawn hero figure: a build panel in front of a ship-log panel.
   Flat vector, brand colours only, so it reads at any size. */
function HeroFigure() {
  return (
    <svg viewBox="0 0 520 440" className="h-auto w-full" role="presentation">
      <circle
        cx="300"
        cy="180"
        r="168"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle cx="132" cy="96" r="5" fill="var(--accent)" />

      {/* back panel */}
      <g>
        <rect x="140" y="36" width="330" height="214" rx="16" fill="#2a1a63" />
        <rect
          x="140.5"
          y="36.5"
          width="329"
          height="213"
          rx="15.5"
          fill="none"
          stroke="#c4b5fd"
          strokeOpacity="0.28"
        />
        <g fill="#c4b5fd" opacity="0.75">
          <rect x="164" y="64" width="86" height="8" rx="4" />
          <rect x="164" y="88" width="150" height="8" rx="4" opacity="0.6" />
        </g>
        {/* bars: four releases, each one taller */}
        <g fill="#c4b5fd">
          <rect x="164" y="196" width="26" height="26" rx="4" opacity="0.45" />
          <rect x="202" y="178" width="26" height="44" rx="4" opacity="0.6" />
          <rect x="240" y="152" width="26" height="70" rx="4" opacity="0.78" />
          <rect x="278" y="120" width="26" height="102" rx="4" />
        </g>
        <path
          d="M177 188 L215 170 L253 144 L291 112"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="291" cy="112" r="4.5" fill="var(--accent)" />
        <g fill="#c4b5fd" opacity="0.5">
          <rect x="356" y="152" width="90" height="8" rx="4" />
          <rect x="356" y="172" width="64" height="8" rx="4" />
          <rect x="356" y="192" width="78" height="8" rx="4" />
          <rect x="356" y="212" width="50" height="8" rx="4" />
        </g>
      </g>

      {/* front panel */}
      <g>
        <rect x="46" y="238" width="300" height="150" rx="16" fill="#f7f5ff" />
        <rect x="46" y="238" width="300" height="42" rx="16" fill="#7c3aed" />
        <rect x="46" y="266" width="300" height="14" fill="#7c3aed" />
        <g fill="#f7f5ff" opacity="0.9">
          <circle cx="70" cy="259" r="4" />
          <circle cx="86" cy="259" r="4" />
          <circle cx="102" cy="259" r="4" />
        </g>
        <rect x="128" y="254" width="104" height="10" rx="5" fill="#f7f5ff" opacity="0.45" />

        <g>
          <circle cx="74" cy="312" r="10" fill="none" stroke="#7c3aed" strokeWidth="2" />
          <path
            d="M69.5 312 L73 315.5 L79 308"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="96" y="306" width="164" height="10" rx="5" fill="#7c3aed" opacity="0.22" />
        </g>
        <g>
          <circle cx="74" cy="352" r="10" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <rect x="96" y="346" width="120" height="10" rx="5" fill="#3b82f6" opacity="0.28" />
        </g>
      </g>
    </svg>
  );
}
