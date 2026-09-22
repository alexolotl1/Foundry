import { cache } from "react";
import { supabase } from "./supabaseClient";
import { WEEKDAYS } from "@/data/weekdays";
import type { Club, CommitmentLevel, Tag, Weekday } from "@/types/club";

/** Splits a semicolon-joined column (how multi-value fields are stored in
 * both the CSV and the Supabase `clubs` table) back into a list. */
function splitList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(";")
    .map((v) => v.trim())
    .filter(Boolean);
}

type ClubRow = {
  id: string;
  name: string;
  description: string;
  tags: string;
  meetingDays: string;
  commitmentLevel: string;
  room: string;
  advisor: string;
  keywords: string | null;
  link1: string | null;
  link2: string | null;
  link3: string | null;
  // Optional so the site keeps working before these columns exist in Supabase.
  joinLink?: string | null;
  meetingsLookLike?: string | null;
  whatMakesUnique?: string | null;
};

function rowToClub(row: ClubRow): Club {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    tags: splitList(row.tags) as Tag[],
    // Weekends aren't a supported meeting option, so anything else is dropped.
    meetingDays: splitList(row.meetingDays).filter((d): d is Weekday =>
      (WEEKDAYS as string[]).includes(d)
    ),
    commitmentLevel: row.commitmentLevel as CommitmentLevel,
    rooms: splitList(row.room),
    advisor: row.advisor,
    keywords: splitList(row.keywords),
    links: [row.link1, row.link2, row.link3].filter((v): v is string => Boolean(v)),
    joinLink: row.joinLink || undefined,
    meetingsLookLike: row.meetingsLookLike || undefined,
    whatMakesUnique: row.whatMakesUnique || undefined,
  };
}

// cache() dedupes repeat calls within one render, so a club's layout and page
// share a single Supabase query instead of each making their own.
export const getClubs = cache(async (): Promise<Club[]> => {
  const { data, error } = await supabase.from("clubs").select("*");

  if (error) {
    throw new Error(`[supabase] failed to load clubs: ${error.message}`);
  }

  return (data as ClubRow[]).map(rowToClub);
});

export async function getClubById(id: string): Promise<Club | undefined> {
  const clubs = await getClubs();
  return clubs.find((club) => club.id === id);
}
