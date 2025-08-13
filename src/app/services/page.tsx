import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";

const services = [
  {
    id: 1,
    title: "Software Development",
    description: "Custom software solutions tailored to your business needs. We build scalable, secure, and user-friendly applications using the latest technologies.",
    image: "/images/software-modern.svg",
    features: [
      "Custom web applications",
      "Mobile app development",
      "API development",
      "Legacy system modernization",
      "Quality assurance & testing"
    ],
    technologies: ["React", "Node.js", "Python", "PostgreSQL", "AWS"]
  },
  {
    id: 2,
    title: "Cloud Solutions",
    description: "Transform your business with cloud-first strategies. We help you migrate, optimize, and manage your cloud infrastructure for maximum efficiency.",
    image: "/images/cloud-modern.svg",
    features: [
      "Cloud migration strategy",
      "Infrastructure as code",
      "Auto-scaling solutions",
      "Cost optimization",
      "Disaster recovery"
    ],
    technologies: ["AWS", "Azure", "Kubernetes", "Terraform", "Docker"]
  },
  {
    id: 3,
    title: "Cybersecurity",
    description: "Protect your digital assets with comprehensive security solutions. We implement robust security measures to safeguard your business against threats.",
    image: "/images/security-modern.svg",
    features: [
      "Security audits & assessments",
      "Penetration testing",
      "Compliance implementation",
      "Security training",
      "Incident response"
    ],
    technologies: ["SIEM", "IDS/IPS", "Vulnerability scanners", "Encryption", "Zero-trust"]
  },
  {
    id: 4,
    title: "AI Solutions",
    description: "Leverage artificial intelligence to drive innovation and efficiency. We develop AI-powered solutions that transform data into actionable insights.",
    image: "/images/ai-modern.svg",
    features: [
      "Machine learning models",
      "Natural language processing",
      "Computer vision",
      "Predictive analytics",
      "Chatbot development"
    ],
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Azure AI", "Python"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      <Navbar />

      {/* Hero Section (match Home hero) */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-white via-purple-50 to-blue-50 text-gray-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 dark:text-white">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-float delay-1000 opacity-80"></div>
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float delay-2000 opacity-70"></div>

          {/* Gradient mesh overlay */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-5"></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Badge */}
              <AnimatedSection
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm font-medium text-purple-200 mb-8"
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                Our Expertise
              </AnimatedSection>

              {/* Main heading */}
              <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-700 to-blue-700 dark:from-white dark:via-purple-200 dark:to-blue-200">
                    Explore
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    Our Services
                  </span>
                </h1>
              </AnimatedSection>

              {/* Subtitle */}
              <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mb-12"
              >
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-2xl">
                  From custom software to cloud, security, and AI — solutions designed to accelerate your growth.
                </p>
              </AnimatedSection>

              {/* CTA Buttons */}
              <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <Link href="/contact" className="btn-primary px-12 py-5 text-lg shadow-2xl hover:shadow-purple-500/30">
                  Get Started
                </Link>
                <Link href="#services" className="btn-secondary px-12 py-5 text-lg backdrop-blur-sm border-white/20 text-white hover:bg-white/10">
                  Learn More
                </Link>
              </AnimatedSection>
            </AnimatedSection>

            {/* Hero Image */}
            <AnimatedSection
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="relative h-[500px] lg:h-[600px] group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
              <Image
                src="/images/hero-illustration.svg"
                alt="Services Overview"
                fill
                className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
      <section id="services" className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-100/30 via-transparent to-transparent dark:from-purple-900/20"></div>
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              What We Offer
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-balance">
              <span className="gradient-text">Our Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group card p-8 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="relative h-48 mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-6">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white tracking-wide uppercase">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section (match Home contact styling) */}
      <section className="py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-conic from-purple-100/20 via-transparent to-blue-100/20 dark:from-purple-900/20 dark:to-blue-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold mb-8 shadow-lg">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Get In Touch
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-balance">
              <span className="gradient-text">Ready to Transform</span>
              <br />
              <span className="text-gray-900 dark:text-white">Your Business?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 font-light leading-relaxed text-balance">
              Let&apos;s discuss how we can help you achieve your digital goals and take your business to the next level
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary px-12 py-5 text-lg shadow-2xl hover:shadow-purple-500/30">
                Contact Us
              </Link>
              <Link href="/dev-tools" className="btn-secondary px-12 py-5 text-lg backdrop-blur-sm">
                View Our Tools
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Footer (same as Home) */}
      <footer className="bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900 dark:text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-blue-500/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">KIKPOT</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-balance">
                Transforming businesses through innovative IT solutions and cutting-edge technology
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Services</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Software Development
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Cloud Solutions
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Cybersecurity
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  AI Solutions
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Company</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    About Us
                  </Link>
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Careers
                </li>
                <li>
                  <Link href="/blog" className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    Blog
                  </Link>
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Contact
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Contact</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  info@kikpot.com
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer font-light flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  +91 7653955621
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p className="font-light">&copy; {new Date().getFullYear()} Kikpot. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}