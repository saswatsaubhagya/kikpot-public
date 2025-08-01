import Image from "next/image";
import AnimatedSection from "./components/AnimatedSection";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 leading-tight"
              >
                Transform Your Business with <span className="text-purple-400">Kikpot</span>
              </AnimatedSection>
              <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl mb-12 max-w-2xl text-gray-300 font-light leading-relaxed"
              >
                Your trusted partner for innovative IT solutions and digital transformation. We build the future, today.
              </AnimatedSection>
              <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 border border-purple-500/20">
                  Get Started
                </button>
                <button className="border border-gray-600 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white/5 hover:border-gray-400 transition-all transform hover:scale-105 backdrop-blur-sm">
                  Learn More
                </button>
              </AnimatedSection>
            </AnimatedSection>
            <AnimatedSection
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[500px] lg:h-[600px]"
            >
              <Image
                src="/images/hero-illustration.svg"
                alt="Digital Transformation"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
              What We Offer
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "Software Development",
                description: "Custom software solutions tailored to your business needs, from web applications to enterprise systems.",
                image: "/images/software-dev.svg",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and migration services to optimize your business operations.",
                image: "/images/cloud-solutions.svg",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Cybersecurity",
                description: "Comprehensive security solutions to protect your digital assets and ensure business continuity.",
                image: "/images/cybersecurity.svg",
                gradient: "from-red-500 to-orange-500"
              },
              {
                icon: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14a6 6 0 00-6 6c0 3.309 2.691 6 6 6s6-2.691 6-6a6 6 0 00-6-6z",
                title: "AI Solutions",
                description: "Advanced AI and machine learning solutions to drive intelligent business decisions.",
                image: "/images/ai-solutions.svg",
                gradient: "from-green-500 to-teal-500"
              }
            ].map((service, index) => (
              <AnimatedSection
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800"
              >
                <div className="relative h-48 mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {service.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] lg:h-[600px]"
            >
              <Image
                src="/images/contact-illustration.svg"
                alt="Contact Us"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </AnimatedSection>
            <AnimatedSection
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
                Get In Touch
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400 leading-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 font-light leading-relaxed">
                Let&apos;s discuss how we can help you achieve your digital goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                  Contact Us
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">KIKPOT</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Transforming businesses through innovative IT solutions
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">Software Development</li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">Cloud Solutions</li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">Cybersecurity</li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">AI Solutions</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-purple-400 transition-colors cursor-pointer font-light">
                    About Us
                  </Link>
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">Careers</li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">Blog</li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light">info@kikpot.com</li>
                
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="font-light">&copy; {new Date().getFullYear()} Kikpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
