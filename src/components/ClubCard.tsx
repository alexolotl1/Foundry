"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Club } from "@/types/club";
import ClubLogo from "./ClubLogo";
import TagChip from "./TagChip";
import CommitmentIndicator from "./CommitmentIndicator";
import MeetingDaysRow from "./MeetingDaysRow";
import { truncateText } from "@/lib/truncate";

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Link
      href={`/activities/${club.id}`}
      className="block h-full no-underline"
      aria-label={`View details for ${club.name}`}
    >
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="flex h-full flex-col gap-5 rounded-[4px] p-5 transition-colors duration-150 hover:border-[var(--gold)]"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-start gap-5">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[4px]"
            style={{ border: "1px solid var(--border)" }}
          >
            <ClubLogo club={club} />
          </motion.div>

          <div className="min-w-0 flex-1">
            <h3
              className="text-[1.5rem] leading-snug font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              {club.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-[6px]">
              {club.tags.map((tag) => (
                <TagChip key={tag} tag={tag} size="md" />
              ))}
            </div>
          </div>
        </div>

        <p className="text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
          {truncateText(club.description, 140)}
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--border)" }}>
          <MeetingDaysRow days={club.meetingDays} size="md" />
          <CommitmentIndicator level={club.commitmentLevel} showLabel={false} size="md" />
        </div>
      </motion.article>
    </Link>
  );
}
