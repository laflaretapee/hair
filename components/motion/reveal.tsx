"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  ariaLabel?: string;
};

export function Reveal({ children, className, as = "div", ariaLabel }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      };

  if (as === "section") {
    return (
      <motion.section className={className} aria-label={ariaLabel} role="region" {...animationProps}>
        {children}
      </motion.section>
    );
  }

  return (
    <motion.div className={className} {...animationProps}>
      {children}
    </motion.div>
  );
}

