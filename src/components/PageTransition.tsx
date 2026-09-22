"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

/**
 * Keyed by pathname so AnimatePresence treats each route as a distinct
 * child and cross-fades between them on every navigation.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
