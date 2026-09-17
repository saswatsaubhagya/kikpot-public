import Link from "next/link";

const company = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="hero-field text-brand-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="display text-[1.75rem]">Kikpot</div>
            <p className="measure mt-4 leading-relaxed text-brand-ink/70">
              We design, build, and run software for companies that need it to
              keep working after launch.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-brand-soft">Company</h2>
            <ul className="mt-4 space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-brand-ink/70 transition-opacity duration-200 hover:opacity-100 hover:text-brand-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-medium text-brand-soft">Contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:info@kikpot.com"
                  className="text-brand-ink/70 hover:text-brand-ink"
                >
                  info@kikpot.com
                </a>
              </li>
              <li>
                <a href="tel:+917653955621" className="text-brand-ink/70 hover:text-brand-ink">
                  +91 76539 55621
                </a>
              </li>
              <li className="text-brand-ink/70">Bhubaneswar, Odisha, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-brand-ink/15 pt-6">
          <p className="text-sm text-brand-ink/60">
            &copy; {new Date().getFullYear()} Kikpot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
