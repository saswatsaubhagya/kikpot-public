"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://n8n.saswatsaubhagya.in/webhook/9284abf3-19a2-4d8a-95b8-eb8febd940f9",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.NEXT_PUBLIC_AUTH_TOKEN || ""}`,
          },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        const consentCheckbox = document.getElementById("consent") as HTMLInputElement;
        if (consentCheckbox) consentCheckbox.checked = false;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to send message. Please try again later.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const field =
    "w-full rounded-[10px] border border-hairline bg-surface px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-200 focus:border-brand disabled:opacity-60";

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
            <p className="eyebrow text-brand-soft">Get in touch</p>
            <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.5rem)]">
              Tell us what you need built.
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-brand-ink/75">
              A few lines about the problem is enough. We read every message and
              usually reply within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <div className="card p-8 md:p-10 lg:col-span-7">
            <h2 className="display text-[1.875rem]">Send us a message</h2>

            {submitStatus === "success" && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-[10px] border border-brand/30 bg-brand/8 p-4"
              >
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">
                  Message sent. We will get back to you shortly.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-[10px] border border-red-400/40 bg-red-500/8 p-4"
              >
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    autoComplete="name"
                    className={`mt-2 ${field}`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    className={`mt-2 ${field}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="What are you trying to build, or what is going wrong?"
                  className={`mt-2 resize-y ${field}`}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[var(--brand)]"
                />
                <label htmlFor="consent" className="text-sm leading-relaxed text-dim">
                  I agree to the processing of my personal data in accordance with
                  the privacy policy.
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
                <p className="text-sm text-dim">
                  We typically respond within 1 business day.
                </p>
              </div>
            </form>
          </div>

          {/* Details */}
          <div className="space-y-6 lg:col-span-5">
            <div className="card p-8">
              <h2 className="display text-[1.5rem]">Contact information</h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm text-dim">Email</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:info@kikpot.com"
                      className="text-brand underline underline-offset-4"
                    >
                      info@kikpot.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-dim">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href="tel:+917653955621"
                      className="text-brand underline underline-offset-4"
                    >
                      +91 76539 55621
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-dim">Address</dt>
                  <dd className="mt-1">Bhubaneswar, Odisha, India</dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-hairline pt-6">
                <h3 className="text-sm font-medium text-accent">Also reachable on</h3>
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://t.me/Kikpotbot"
                    aria-label="Telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-dim transition-colors duration-200 hover:border-brand hover:text-brand"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/917653955621"
                    aria-label="WhatsApp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-dim transition-colors duration-200 hover:border-brand hover:text-brand"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="display text-[1.5rem]">Business hours</h2>
              <dl className="mt-6 space-y-3">
                {hours.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-sm text-dim">{row.day}</dt>
                    <dd className="text-sm font-medium">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-dim">
                Existing clients with an urgent incident can reach an on-call
                engineer at any hour.
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
