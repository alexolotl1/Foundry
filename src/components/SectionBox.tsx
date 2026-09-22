"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export type Shade = "surface" | "surface-2" | "none";

export default function SectionBox({
  icon,
  title,
  shade = "surface",
  dashed = false,
  compact = false,
  children,
}: {
  icon: ReactNode;
  title: string;
  shade?: Shade;
  dashed?: boolean;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-3"
    >
      <h2
        className={`flex items-center gap-2 font-semibold ${compact ? "text-[1rem]" : "text-[1.25rem]"}`}
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        <span className="flex" style={{ color: "var(--gold)" }}>
          {icon}
        </span>
        {title}
      </h2>
      <div
        className={compact ? "rounded-[4px] p-3.5" : "rounded-[4px] p-5"}
        style={{
          background: shade === "none" ? "transparent" : `var(--${shade})`,
          border: dashed ? "1px dashed var(--border-strong)" : "1px solid var(--border)",
        }}
      >
        {children}
      </div>
    </motion.section>
  );
}
