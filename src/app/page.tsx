import Image from "next/image";
import AnimatedSection from "./components/AnimatedSection";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 py-32 relative">
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
                className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
              >
                Transform Your Business with Kikpot
              </AnimatedSection>
              <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl mb-12 max-w-2xl text-blue-100"
              >
                Your trusted partner for innovative IT solutions and digital transformation
              </AnimatedSection>
              <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-4"
              >
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
                  Learn More
                </button>
              </AnimatedSection>
            </AnimatedSection>
            <AnimatedSection
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[400px] lg:h-[500px]"
            >
              <Image
                src="/images/hero-illustration.svg"
                alt="Digital Transformation"
                fill
                className="object-contain"
                priority
              />
            </AnimatedSection>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "Software Development",
                description: "Custom software solutions tailored to your business needs, from web applications to enterprise systems.",
                image: "/images/software-dev.svg"
              },
              {
                icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and migration services to optimize your business operations.",
                image: "/images/cloud-solutions.svg"
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Cybersecurity",
                description: "Comprehensive security solutions to protect your digital assets and ensure business continuity.",
                image: "/images/cybersecurity.svg"
              },
              {
                icon: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14a6 6 0 00-6 6c0 3.309 2.691 6 6 6s6-2.691 6-6a6 6 0 00-6-6z",
                title: "AI Solutions",
                description: "Advanced AI and machine learning solutions to drive intelligent business decisions.",
                image: "/images/ai-solutions.svg"
              }
            ].map((service, index) => (
              <AnimatedSection
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] lg:h-[500px]"
            >
              <Image
                src="/images/contact-illustration.svg"
                alt="Contact Us"
                fill
                className="object-contain"
              />
            </AnimatedSection>
            <AnimatedSection
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                Let's discuss how we can help you achieve your digital goals
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact Us
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Kikpot</h3>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed">
                Transforming businesses through innovative IT solutions
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-4 text-gray-400 dark:text-gray-500">
                <li className="hover:text-white transition-colors cursor-pointer">Software Development</li>
                <li className="hover:text-white transition-colors cursor-pointer">Cloud Solutions</li>
                <li className="hover:text-white transition-colors cursor-pointer">Cybersecurity</li>
                <li className="hover:text-white transition-colors cursor-pointer">IT Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-gray-400 dark:text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors cursor-pointer">
                    About Us
                  </Link>
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-gray-400 dark:text-gray-500">
                <li className="hover:text-white transition-colors cursor-pointer">info@kikpot.com</li>
                
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; {new Date().getFullYear()} Kikpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
