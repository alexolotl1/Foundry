"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import ClubCard from "./ClubCard";
import TagChip from "./TagChip";
import { ALL_TAGS } from "@/data/tags";
import type { Club, Tag } from "@/types/club";

export default function ActivitiesExplorer({ clubs }: { clubs: Club[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Tag[]>([]);

  function toggleTag(tag: Tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clubs.filter((club) => {
      const matchesQuery =
        q.length === 0 ||
        club.name.toLowerCase().includes(q) ||
        club.shortDescription.toLowerCase().includes(q) ||
        club.description.toLowerCase().includes(q) ||
        club.keywords?.some((k) => k.toLowerCase().includes(q));

      const matchesTags =
        activeTags.length === 0 || activeTags.some((tag) => club.tags.includes(tag));

      return matchesQuery && matchesTags;
    });
  }, [clubs, query, activeTags]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
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

        <div className="flex flex-wrap gap-2">
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
        </div>
      </div>

      <p className="text-[0.8125rem]" style={{ color: "var(--text-faint)" }}>
        {filtered.length} of {clubs.length} clubs
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((club) => (
            <ClubCard key={club.id} club={club} />
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
