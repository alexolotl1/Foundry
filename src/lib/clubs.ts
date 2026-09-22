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
//
// select("*") on purpose, not a named column list: PostgREST errors out the
// whole query if a named column doesn't exist yet, whereas "*" tolerates
// columns that haven't been added (or, later, removed). rowToClub below
// never copies `password` onto the returned Club, so it never reaches a
// page or the client bundle even though the raw row briefly has it
// server-side.
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

/**
 * Server-only: checks a login attempt against the `password` column.
 * Never call from a Client Component — only from Route Handlers.
 *
 * Heads up: this table is read through the public anon key, so unless the
 * Supabase project's RLS policies lock down the `password` column, anyone
 * with the anon key (it ships in the browser bundle) can read it directly
 * via the REST API, same as the rest of the `clubs` table. Fine for local
 * testing; not something to ship as-is.
 */
export async function verifyClubCredentials(
  id: string,
  password: string
): Promise<boolean> {
  if (!id || !password) return false;

  const { data, error } = await supabase
    .from("clubs")
    .select("password")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return false;
  return typeof data.password === "string" && data.password.length > 0 && data.password === password;
}

/** The subset of a club's row a club account can edit from /admin. */
export interface ClubProfileInput {
  description: string;
  tags: Tag[];
  meetingDays: Weekday[];
  commitmentLevel: CommitmentLevel;
  rooms: string[];
  advisor: string;
  links: string[];
  joinLink: string;
  meetingsLookLike: string;
  whatMakesUnique: string;
}

/** Server-only: writes a club's editable fields back to Supabase. */
export async function updateClubProfile(id: string, input: ClubProfileInput): Promise<void> {
  const [link1, link2, link3] = input.links;

  const { error } = await supabase
    .from("clubs")
    .update({
      description: input.description,
      tags: input.tags.join(";"),
      meetingDays: input.meetingDays.join(";"),
      commitmentLevel: input.commitmentLevel,
      room: input.rooms.join(";"),
      advisor: input.advisor,
      link1: link1 || null,
      link2: link2 || null,
      link3: link3 || null,
      joinLink: input.joinLink || null,
      meetingsLookLike: input.meetingsLookLike || null,
      whatMakesUnique: input.whatMakesUnique || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`[supabase] failed to update club "${id}": ${error.message}`);
  }
}
