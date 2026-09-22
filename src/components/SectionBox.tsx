"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export type Tone = "gold" | "sky" | "mint" | "violet" | "silver";

const TONE_COLOR: Record<Tone, string> = {
  gold: "var(--gold)",
  sky: "var(--tone-sky)",
  mint: "var(--tone-mint)",
  violet: "var(--tone-violet)",
  silver: "var(--tone-silver)",
};

export default function SectionBox({
  icon,
  title,
  tone = "gold",
  children,
}: {
  icon: ReactNode;
  title: string;
  tone?: Tone;
  children: ReactNode;
}) {
  const color = TONE_COLOR[tone];
  const edge = `color-mix(in srgb, ${color} 30%, var(--border))`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="overflow-hidden rounded-[6px]"
      style={{
        background: "var(--surface)",
        border: `1px solid ${edge}`,
        borderLeft: `3px solid ${color}`,
        boxShadow: "0 10px 24px -18px rgba(0, 0, 0, 0.6)",
      }}
    >
      <h2
        className="flex items-center gap-3 px-5 py-3.5 text-[1.125rem] font-semibold"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--text)",
          borderBottom: `1px solid var(--border)`,
        }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: `color-mix(in srgb, ${color} 20%, var(--surface-2))`, color }}
        >
          {icon}
        </span>
        {title}
      </h2>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}
