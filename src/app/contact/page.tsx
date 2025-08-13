import React from 'react';
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../../components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <Navbar />
      <section className="py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-mesh opacity-5"></div>
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-float delay-1000 opacity-80"></div>
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float delay-2000 opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-conic from-purple-100/20 via-transparent to-blue-100/20 dark:from-purple-900/20 dark:to-blue-900/20"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Get in Touch
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-balance">
              <span className="gradient-text">Contact</span>
              <br />
              <span className="text-gray-900 dark:text-white">Us</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed text-balance">
              We&apos;d love to hear from you. Reach out to discuss your project needs.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 1116 0v1.25A1.75 1.75 0 0118.25 23h-12.5A1.75 1.75 0 014 21.25V20z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M1.5 8.67l9.546 5.73a1.5 1.5 0 001.408 0L22.5 8.67M3.75 6h16.5A2.25 2.25 0 0122.5 8.25v7.5A2.25 2.25 0 0120.25 18H3.75A2.25 2.25 0 011.5 15.75v-7.5A2.25 2.25 0 013.75 6z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-start pt-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M7.5 4.5h9A2.25 2.25 0 0118.75 6.75v10.5A2.25 2.25 0 0116.5 19.5h-9a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 017.5 4.5z" />
                      </svg>
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input id="consent" type="checkbox" className="mt-1 h-5 w-5 rounded-md border border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500/50" />
                  <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the processing of my personal data in accordance with the privacy policy.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="submit" className="btn-primary w-full sm:w-auto px-10 py-4 text-lg shadow-2xl hover:shadow-purple-500/30">
                    Send Message
                  </button>
                  <button type="button" className="btn-secondary w-full sm:w-auto px-10 py-4 text-lg">
                    Schedule a Call
                  </button>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  We typically respond within 1 business day.
                </div>
              </form>
            </AnimatedSection>

            {/* Contact Information */}
            <div className="space-y-8">
              <AnimatedSection
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="card p-8 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M1.5 8.67l9.546 5.73a1.5 1.5 0 001.408 0L22.5 8.67M3.75 6h16.5A2.25 2.25 0 0122.5 8.25v7.5A2.25 2.25 0 0120.25 18H3.75A2.25 2.25 0 011.5 15.75v-7.5A2.25 2.25 0 013.75 6z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">info@kikpot.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 4.5A1.5 1.5 0 013 3h3.75c.621 0 1.168.403 1.37.996l1.026 3.078a1.5 1.5 0 01-.375 1.56L7.5 10.5a12.75 12.75 0 006 6l1.866-1.271a1.5 1.5 0 011.56-.375l3.078 1.026c.593.202.996.749.996 1.37V21a1.5 1.5 0 01-1.5 1.5H19.5C10.94 22.5 3.75 15.31 3.75 6.75V6A1.5 1.5 0 012.25 4.5H1.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">+91 7653955621</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 5.384 4.365 9.75 9.75 9.75s9.75-4.366 9.75-9.75c0-5.385-4.365-9.75-9.75-9.75zm0 4.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Address</h4>
                      <p className="text-gray-600 dark:text-gray-400">Bhubaneswar, Odisha<br />India</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="card p-8 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Connect with Us</h3>
                <div className="flex gap-3">
                  <a className="w-11 h-11 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-800/20 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-105 transition" href="#" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M8 19c7.732 0 11.945-6.41 11.945-11.955 0-.181 0-.362-.012-.54A8.533 8.533 0 0022 3.92a8.19 8.19 0 01-2.357.646A4.118 4.118 0 0021.448 2.6a8.224 8.224 0 01-2.606.996A4.107 4.107 0 0015.292 2c-2.266 0-4.104 1.84-4.104 4.107 0 .322.036.635.106.935A11.654 11.654 0 013 3.16a4.106 4.106 0 001.27 5.474 4.073 4.073 0 01-1.86-.514v.052c0 2.042 1.452 3.745 3.378 4.132a4.11 4.11 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 17.542 11.616 11.616 0 008 19z" />
                    </svg>
                  </a>
                  <a className="w-11 h-11 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-800/20 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-105 transition" href="#" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.983 2.12 4.983 3.5zM.25 8h4.5v15.75H.25V8zm7.5 0H12v2.144h.062c.523-1 1.8-2.144 3.706-2.144C20.25 8 22 10.06 22 13.86V23.75h-4.5v-8.625c0-2.06-.75-3.468-2.625-3.468-1.43 0-2.278.96-2.652 1.887-.137.334-.171.8-.171 1.27V23.75H7.75V8z" />
                    </svg>
                  </a>
                  <a className="w-11 h-11 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-800/20 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-105 transition" href="#" aria-label="Github">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.593 2 12.253c0 4.503 2.865 8.317 6.839 9.666.5.097.683-.221.683-.49 0-.242-.009-.883-.014-1.733-2.782.619-3.369-1.37-3.369-1.37-.455-1.175-1.112-1.488-1.112-1.488-.909-.639.069-.626.069-.626 1.004.072 1.532 1.05 1.532 1.05.893 1.57 2.343 1.117 2.914.854.091-.666.35-1.117.636-1.374-2.221-.259-4.555-1.138-4.555-5.065 0-1.118.39-2.033 1.03-2.75-.104-.26-.447-1.303.098-2.714 0 0 .84-.27 2.75 1.05a9.334 9.334 0 015 0c1.91-1.32 2.75-1.05 2.75-1.05.545 1.41.202 2.455.099 2.714.64.717 1.03 1.632 1.03 2.75 0 3.938-2.337 4.803-4.565 5.058.359.317.679.941.679 1.897 0 1.37-.013 2.474-.013 2.81 0 .271.18.59.688.489C19.138 20.567 22 16.754 22 12.253 22 6.593 17.523 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="card p-8 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Monday - Friday</span>
                    <span className="text-gray-900 dark:text-gray-300">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Saturday</span>
                    <span className="text-gray-900 dark:text-gray-300">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Sunday</span>
                    <span className="text-gray-900 dark:text-gray-300">Closed</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}