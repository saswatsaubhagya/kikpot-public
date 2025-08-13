"use client";

import { motion } from "framer-motion";
import { type ComponentProps } from "react";

type Easing = "linear" | "easeIn" | "easeOut" | "easeInOut" | number[] | ((t: number) => number);

type AnimatedSectionProps = ComponentProps<typeof motion.div> & {
  delay?: number;
  duration?: number;
  ease?: Easing;
};

export default function AnimatedSection(props: AnimatedSectionProps) {
  const {
    children,
    // Provide sensible animation defaults when not supplied
    initial = { opacity: 0, y: 20 },
    animate = { opacity: 1, y: 0 },
    exit = { opacity: 0, y: 20 },
    transition: transitionProp,
    whileInView,
    viewport = { once: true, margin: "-100px" },
    className = "",
    delay = 0,
    duration = 0.6,
    ease = "easeOut",
    ...rest
  } = props;

  const mergedTransition = {
    ...(transitionProp as Record<string, unknown>),
    delay,
    duration,
    ease,
  };

  return (
    <motion.div
      {...rest}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={mergedTransition as NonNullable<ComponentProps<typeof motion.div>["transition"]>}
      whileInView={whileInView}
      viewport={viewport}
      whileHover={whileInView ? undefined : { scale: 1.02, y: -5 }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}