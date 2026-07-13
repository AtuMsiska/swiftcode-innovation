"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition — a subtle fade/lift applied on every navigation.
 * template.tsx re-mounts on each route change (unlike layout.tsx).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
