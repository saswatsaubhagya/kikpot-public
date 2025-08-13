import Image from "next/image";
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function About() {
  const currentYear = new Date().getFullYear();
  const yearsOfExcellence = Math.max(1, currentYear - 2018);
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
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-float delay-1000 opacity-80"></div>
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float delay-2000 opacity-70"></div>
        </div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm border border-purple-500/30">
              Our Story
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 leading-tight">
              About Kikpot
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Empowering businesses through innovative technology solutions since 2018
            </p>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Years", value: `${yearsOfExcellence}+` },
                { label: "Projects", value: "500+" },
                { label: "Satisfaction", value: "98%" },
                { label: "Clients", value: "40+" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4 border-white/20">
                  <div className="text-3xl font-extrabold text-white">{item.value}</div>
                  <div className="text-xs text-gray-300 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px]"
            >
              <Image
                src="/images/about-illustration.svg"
                alt="Our Mission"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </AnimatedSection>
            <AnimatedSection
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
                Our Purpose
              </div>
              <h2 className="text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 font-light leading-relaxed">
                At Kikpot, we&apos;re dedicated to transforming businesses through innovative technology solutions. Our mission is to empower organizations with cutting-edge IT services that drive growth, efficiency, and success in the digital age.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-light">Delivering innovative solutions that drive business growth</p>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-light">Building lasting partnerships with our clients</p>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-light">Maintaining the highest standards of quality and security</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-conic from-purple-100/20 via-transparent to-blue-100/20 dark:from-purple-900/20 dark:to-blue-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Our Journey
            </div>
            <h2 className="text-5xl font-black mb-8">
              <span className="gradient-text">Milestones</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              A brief look at how we evolved to serve our clients better
            </p>
          </AnimatedSection>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400/40 to-blue-400/40 sm:-translate-x-1/2"></div>
            <div className="space-y-10">
              {[
                {
                  year: "2018",
                  title: "Founded",
                  desc: "Kikpot was founded with a vision to transform businesses with technology.",
                },
                {
                  year: "2019",
                  title: "Security First",
                  desc: "Established a dedicated cybersecurity and compliance practice.",
                },
                {
                  year: "2021",
                  title: "Cloud Expansion",
                  desc: "Scaled our cloud practice and delivered major enterprise migrations.",
                },
                {
                  year: "2024",
                  title: "AI Solutions",
                  desc: "Launched AI-driven products powering intelligent decision-making.",
                },
              ].map((item, idx) => (
                <AnimatedSection
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-[auto,1fr] sm:grid-cols-2 gap-4 sm:gap-8 items-start"
                >
                  <div className="relative sm:text-right sm:pr-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold shadow-lg">
                      {item.year}
                    </div>
                  </div>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-light">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Meet the Team
            </div>
            <h2 className="text-5xl font-black mb-8">
              <span className="gradient-text">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              A diverse group of experts united by a passion for building what matters
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { name: "A. Sharma", role: "CEO", gradient: "from-purple-500 to-blue-500" },
              { name: "R. Gupta", role: "CTO", gradient: "from-blue-500 to-cyan-500" },
              { name: "S. Patel", role: "Head of Security", gradient: "from-red-500 to-orange-500" },
              { name: "N. Singh", role: "Head of AI", gradient: "from-green-500 to-teal-500" },
            ].map((m, i) => (
              <AnimatedSection
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center"
              >
                <div className={`mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {m.name.split(" ")[0].charAt(0)}{m.name.split(" ")[1].charAt(0)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{m.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.role}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-200/40 via-transparent to-transparent dark:from-purple-900/30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card p-10 text-center max-w-5xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              <span className="gradient-text">Ready to partner with Kikpot?</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-light mb-8 text-lg">
              Let&apos;s discuss how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-10 py-4">Contact Us</Link>
              <Link href="/services" className="btn-secondary px-10 py-4">Explore Services</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              What Drives Us
            </div>
            <h2 className="text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              The principles that guide everything we do
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Innovation",
                description: "Constantly pushing boundaries to deliver cutting-edge solutions",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Excellence",
                description: "Committed to delivering the highest quality in everything we do",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Integrity",
                description: "Building trust through honest and transparent relationships",
                gradient: "from-green-500 to-teal-500"
              },
              {
                title: "Collaboration",
                description: "Working together to achieve exceptional results",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((value, index) => (
              <AnimatedSection
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-gray-900 p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-800"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{value.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 