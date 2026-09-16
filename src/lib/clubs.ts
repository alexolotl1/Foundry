import { supabase } from "./supabaseClient";
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
};

function rowToClub(row: ClubRow): Club {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    tags: splitList(row.tags) as Tag[],
    meetingDays: splitList(row.meetingDays) as Weekday[],
    commitmentLevel: row.commitmentLevel as CommitmentLevel,
    room: row.room,
    advisor: row.advisor,
    keywords: splitList(row.keywords),
    links: [row.link1, row.link2, row.link3].filter((v): v is string => Boolean(v)),
  };
}

export async function getClubs(): Promise<Club[]> {
  const { data, error } = await supabase.from("clubs").select("*");

  if (error) {
    throw new Error(`[supabase] failed to load clubs: ${error.message}`);
  }

  return (data as ClubRow[]).map(rowToClub);
}

export async function getClubById(id: string): Promise<Club | undefined> {
  const clubs = await getClubs();
  return clubs.find((club) => club.id === id);
}
