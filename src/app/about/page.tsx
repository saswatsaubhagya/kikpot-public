import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

const milestones = [
  {
    year: "2018",
    title: "Founded",
    desc: "Kikpot started with a vision to transform businesses with technology.",
  },
  {
    year: "2019",
    title: "Security first",
    desc: "Established a dedicated cybersecurity and compliance practice.",
  },
  {
    year: "2021",
    title: "Cloud expansion",
    desc: "Scaled the cloud practice and delivered major enterprise migrations.",
  },
  {
    year: "2024",
    title: "AI solutions",
    desc: "Launched AI-driven work powering intelligent decision-making.",
  },
];

const values = [
  {
    title: "Innovation",
    description: "Constantly pushing boundaries to deliver cutting-edge solutions.",
  },
  {
    title: "Excellence",
    description: "Committed to delivering the highest quality in everything we do.",
  },
  {
    title: "Integrity",
    description: "Building trust through honest and transparent relationships.",
  },
  {
    title: "Collaboration",
    description: "Working together to achieve exceptional results.",
  },
];

const commitments = [
  "Delivering innovative solutions that drive business growth",
  "Building lasting partnerships with our clients",
  "Maintaining the highest standards of quality and security",
];

export const metadata = {
  title: "About — Kikpot",
  description:
    "Kikpot has been building and operating software for businesses since 2018.",
};

export default function About() {
  const currentYear = new Date().getFullYear();
  const yearsOfExcellence = Math.max(1, currentYear - 2018);

  const stats = [
    { label: "Years", value: `${yearsOfExcellence}+` },
    { label: "Projects", value: "500+" },
    { label: "Satisfaction", value: "98%" },
    { label: "Clients", value: "40+" },
  ];

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
            <p className="eyebrow text-brand-soft">Our story</p>
            <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.5rem)]">
              Building for businesses
              <br />
              since 2018.
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-brand-ink/75">
              We started as a small team that liked fixing hard systems problems.
              That has not changed — there are just more of us, and the systems
              are bigger.
            </p>
          </div>

          <dl className="rise mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-brand-ink/15 pt-8 sm:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <dd className="display text-[2.5rem] text-brand-soft">{item.value}</dd>
                <dt className="mt-1 text-sm text-brand-ink/60">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="relative h-[300px] lg:col-span-5 lg:h-[420px]">
            <Image
              src="/images/about-illustration.svg"
              alt="Illustration of the Kikpot team at work"
              fill
              className="object-contain"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow">Our purpose</p>
            <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">
              Technology that earns its keep
            </h2>
            <p className="measure mt-5 text-lg leading-relaxed text-dim">
              We are here to transform businesses through technology that holds
              up — services that drive growth and efficiency without leaving a
              mess for whoever maintains them next.
            </p>

            <ul className="mt-9 space-y-4">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-dim">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Milestones: a real sequence, so it gets real numbering. */}
      <section className="bg-surface-2">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">Our journey</p>
            <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">Milestones</h2>
          </div>

          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {milestones.map((item) => (
              <li key={item.year} className="border-t-2 border-brand pt-6">
                <div className="display text-[2rem] text-brand">{item.year}</div>
                <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow">What drives us</p>
          <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">Our core values</h2>
          <p className="mt-5 text-lg leading-relaxed text-dim">
            The principles that guide everything we do.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="card p-7">
              <h3 className="display text-[1.5rem]">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Work with us</p>
            <h2 className="display mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Ready to partner with Kikpot?
            </h2>
            <p className="measure mt-4 leading-relaxed text-dim">
              Tell us about your digital goals and we will tell you how we would
              approach them.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-self-end">
            <Link href="/contact" className="btn-primary">
              Contact us
            </Link>
            <Link href="/services" className="btn-secondary">
              Our services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
