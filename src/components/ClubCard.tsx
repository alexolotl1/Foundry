"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Club } from "@/types/club";
import ClubLogo from "./ClubLogo";
import TagChip from "./TagChip";
import CommitmentIndicator from "./CommitmentIndicator";
import MeetingDaysRow from "./MeetingDaysRow";

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Link
      href={`/activities/${club.slug}`}
      className="block h-full no-underline"
      aria-label={`View details for ${club.name}`}
    >
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="flex h-full flex-col gap-4 rounded-[4px] p-4 transition-colors duration-150 hover:border-[var(--gold)]"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[4px]"
            style={{ border: "1px solid var(--border)" }}
          >
            <ClubLogo club={club} />
          </motion.div>

          <div className="min-w-0 flex-1">
            <h3
              className="text-[1.25rem] leading-snug font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              {club.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-[6px]">
              {club.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>

        <p className="text-[0.875rem] leading-relaxed text-[var(--text-muted)] line-clamp-2">
          {club.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border)" }}>
          <MeetingDaysRow days={club.meetingDays} />
          <CommitmentIndicator level={club.commitmentLevel} showLabel={false} />
        </div>
      </motion.article>
    </Link>
  );
}
