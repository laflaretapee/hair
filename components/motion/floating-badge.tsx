"use client";

import { motion, useReducedMotion } from "framer-motion";

type FloatingBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function FloatingBadge({ children, className }: FloatingBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration: 6.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }
      }
    >
      {children}
    </motion.div>
  );
}

