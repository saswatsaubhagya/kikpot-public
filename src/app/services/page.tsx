import React from 'react';
import Image from 'next/image';
import AnimatedSection from "../components/AnimatedSection";
import Navbar from "../../components/Navbar";

const services = [
  {
    id: 1,
    title: "Software Development",
    description: "Custom software solutions tailored to your business needs. We build scalable, secure, and user-friendly applications using the latest technologies.",
    image: "/images/software-dev.svg",
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
    image: "/images/cloud-solutions.svg",
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
    image: "/images/cybersecurity.svg",
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
    image: "/images/ai-solutions.svg",
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
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
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.id}
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
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-4">
                  {service.description}
                </p>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Key Features</h3>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Technologies</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                  Learn More
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <AnimatedSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-light leading-relaxed">
              Let&apos;s discuss how we can help transform your business with our technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                Contact Us
              </a>
              <a href="/dev-tools" className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all transform hover:scale-105">
                View Our Tools
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}