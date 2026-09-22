"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import ClubCard from "./ClubCard";
import TagChip from "./TagChip";
import FilterChip from "./FilterChip";
import { ALL_TAGS } from "@/data/tags";
import { WEEKDAYS } from "@/data/weekdays";
import type { Club, CommitmentLevel, Tag, Weekday } from "@/types/club";

const COMMITMENT_LEVELS: { value: CommitmentLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

function useToggle<T>() {
  const [active, setActive] = useState<T[]>([]);
  function toggle(value: T) {
    setActive((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }
  return [active, toggle] as const;
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[0.9375rem] font-semibold" style={{ color: "var(--text)" }}>
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function ActivitiesExplorer({ clubs }: { clubs: Club[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, toggleTag] = useToggle<Tag>();
  const [activeDays, toggleDay] = useToggle<Weekday>();
  const [activeCommitments, toggleCommitment] = useToggle<CommitmentLevel>();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clubs.filter((club) => {
      const matchesQuery =
        q.length === 0 ||
        club.name.toLowerCase().includes(q) ||
        club.description.toLowerCase().includes(q) ||
        club.keywords?.some((k) => k.toLowerCase().includes(q));

      const matchesTags =
        activeTags.length === 0 || activeTags.some((tag) => club.tags.includes(tag));

      const matchesDays =
        activeDays.length === 0 || activeDays.some((day) => club.meetingDays.includes(day));

      const matchesCommitment =
        activeCommitments.length === 0 || activeCommitments.includes(club.commitmentLevel);

      return matchesQuery && matchesTags && matchesDays && matchesCommitment;
    });
  }, [clubs, query, activeTags, activeDays, activeCommitments]);

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clubs by name or keyword…"
          className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />

        <div className="flex flex-col gap-5">
          <FilterGroup label="Select tags">
            {ALL_TAGS.map((tag) => (
              <motion.button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer border-none bg-transparent p-0"
                aria-pressed={activeTags.includes(tag)}
              >
                <TagChip tag={tag} active={activeTags.includes(tag)} size="md" />
              </motion.button>
            ))}
          </FilterGroup>

          <FilterGroup label="Meeting days">
            {WEEKDAYS.map((day) => (
              <motion.button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer border-none bg-transparent p-0"
                aria-pressed={activeDays.includes(day)}
              >
                <FilterChip label={day} active={activeDays.includes(day)} size="md" />
              </motion.button>
            ))}
          </FilterGroup>

          <FilterGroup label="Commitment level">
            {COMMITMENT_LEVELS.map(({ value, label }) => (
              <motion.button
                key={value}
                type="button"
                onClick={() => toggleCommitment(value)}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer border-none bg-transparent p-0"
                aria-pressed={activeCommitments.includes(value)}
              >
                <FilterChip label={label} active={activeCommitments.includes(value)} size="md" />
              </motion.button>
            ))}
          </FilterGroup>
        </div>
      </motion.div>

      <p className="text-[0.8125rem]" style={{ color: "var(--text-faint)" }}>
        {filtered.length} of {clubs.length} clubs
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((club, index) => (
            <ClubCard key={club.id} club={club} index={index} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-[4px] px-6 py-12 text-center"
          style={{ border: "1px dashed var(--border)", color: "var(--text-muted)" }}
        >
          No clubs match that search and filter combination. Try clearing a
          tag or searching a different keyword.
        </div>
      )}
    </div>
  );
}
