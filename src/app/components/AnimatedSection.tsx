"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileInView?: any;
  viewport?: any;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
}

export default function AnimatedSection({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: 20 },
  transition = { duration: 0.6, ease: "easeOut" },
  whileInView,
  viewport = { once: true, margin: "-100px" },
  className = "",
  delay = 0,
  duration = 0.6,
  ease = "easeOut"
}: AnimatedSectionProps) {
  const motionProps = {
    initial,
    animate,
    exit,
    transition: {
      ...transition,
      delay,
      duration,
      ease
    },
    whileInView,
    viewport,
    className
  };

  return (
    <motion.div
      {...motionProps}
      whileHover={whileInView ? undefined : { scale: 1.02, y: -5 }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
} 