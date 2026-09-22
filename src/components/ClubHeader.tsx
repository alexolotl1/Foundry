"use client";

import { motion } from "motion/react";
import type { Club } from "@/types/club";
import ClubLogo from "./ClubLogo";
import TagChip from "./TagChip";
import ClubLinksBox from "./ClubLinksBox";

export default function ClubHeader({ club }: { club: Club }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
      <div className="flex items-start gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="h-24 w-24 shrink-0 overflow-hidden rounded-[6px] sm:h-28 sm:w-28"
          style={{ border: "1px solid var(--border-strong)" }}
        >
          <ClubLogo club={club} />
        </motion.div>
        <div>
          <h1
            className="text-[2rem] font-semibold leading-tight sm:text-[2.5rem]"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {club.name}
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {club.tags.map((tag) => (
              <TagChip key={tag} tag={tag} size="md" />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[280px] lg:shrink-0">
        <ClubLinksBox links={club.links} />
      </div>
    </div>
  );
}
