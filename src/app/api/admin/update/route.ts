import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateClubProfile, type ClubProfileInput } from "@/lib/clubs";
import { readSessionToken, SESSION_COOKIE } from "@/lib/session";
import { ALL_TAGS } from "@/data/tags";
import { WEEKDAYS } from "@/data/weekdays";
import type { CommitmentLevel, Tag, Weekday } from "@/types/club";

const COMMITMENT_LEVELS: CommitmentLevel[] = ["low", "medium", "high"];

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.trim().length > 0).map((v) => v.trim());
}

export async function POST(request: Request) {
  const store = await cookies();
  const clubId = readSessionToken(store.get(SESSION_COOKIE)?.value);

  if (!clubId) {
    return NextResponse.json({ error: "Your session expired — log in again." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const tags = asStringArray(body.tags).filter((t): t is Tag => (ALL_TAGS as string[]).includes(t));
  const meetingDays = asStringArray(body.meetingDays).filter((d): d is Weekday =>
    (WEEKDAYS as string[]).includes(d)
  );
  const commitmentLevel: CommitmentLevel = COMMITMENT_LEVELS.includes(body.commitmentLevel)
    ? body.commitmentLevel
    : "low";

  const input: ClubProfileInput = {
    description: typeof body.description === "string" ? body.description.trim() : "",
    tags,
    meetingDays,
    commitmentLevel,
    rooms: asStringArray(body.rooms),
    advisor: typeof body.advisor === "string" ? body.advisor.trim() : "",
    links: asStringArray(body.links).slice(0, 3),
    joinLink: typeof body.joinLink === "string" ? body.joinLink.trim() : "",
    meetingsLookLike: typeof body.meetingsLookLike === "string" ? body.meetingsLookLike.trim() : "",
    whatMakesUnique: typeof body.whatMakesUnique === "string" ? body.whatMakesUnique.trim() : "",
  };

  try {
    await updateClubProfile(clubId, input);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save changes.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
