'use client';

import { motion, TargetAndTransition, Transition } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  initial?: TargetAndTransition | boolean;
  animate?: TargetAndTransition | string;
  transition?: Transition;
  whileInView?: TargetAndTransition | string;
  viewport?: {
    once?: boolean;
    amount?: number | 'some' | 'all';
    margin?: string;
  };
}

export default function AnimatedSection({
  children,
  className = '',
  initial,
  animate,
  transition,
  whileInView,
  viewport,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
} 