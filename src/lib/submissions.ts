import "server-only";
import { supabaseAdmin } from "./supabaseAdmin";
import type { ClubProfileInput } from "./clubs";

export interface SubmissionListItem {
  clubId: string;
  clubName: string;
  submittedAt: string;
}

export interface SubmissionDetail extends ClubProfileInput {
  clubId: string;
  logoUrl: string | null;
  submittedAt: string;
}

export async function upsertSubmission(
  clubId: string,
  input: ClubProfileInput & { logoUrl?: string | null }
): Promise<void> {
  const [link1, link2, link3] = input.links;

  const { error } = await supabaseAdmin.from("club_submissions").upsert({
    club_id: clubId,
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
    logoUrl: input.logoUrl || null,
    submitted_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`[supabase] failed to submit changes for "${clubId}": ${error.message}`);
  }
}

export async function listSubmissions(): Promise<SubmissionListItem[]> {
  const { data, error } = await supabaseAdmin
    .from("club_submissions")
    .select("club_id, submitted_at, clubs(name)")
    .order("submitted_at", { ascending: true });

  if (error) {
    throw new Error(`[supabase] failed to load submissions: ${error.message}`);
  }

  return (data as unknown as Array<{ club_id: string; submitted_at: string; clubs: { name: string } | null }>).map(
    (row) => ({
      clubId: row.club_id,
      clubName: row.clubs?.name ?? row.club_id,
      submittedAt: row.submitted_at,
    })
  );
}

function splitList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(";")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function getSubmission(clubId: string): Promise<SubmissionDetail | undefined> {
  const { data, error } = await supabaseAdmin
    .from("club_submissions")
    .select("*")
    .eq("club_id", clubId)
    .maybeSingle();

  if (error || !data) return undefined;

  return {
    clubId: data.club_id,
    description: data.description ?? "",
    tags: splitList(data.tags) as ClubProfileInput["tags"],
    meetingDays: splitList(data.meetingDays) as ClubProfileInput["meetingDays"],
    commitmentLevel: (data.commitmentLevel ?? "low") as ClubProfileInput["commitmentLevel"],
    rooms: splitList(data.room),
    advisor: data.advisor ?? "",
    links: [data.link1, data.link2, data.link3].filter((v): v is string => Boolean(v)),
    joinLink: data.joinLink ?? "",
    meetingsLookLike: data.meetingsLookLike ?? "",
    whatMakesUnique: data.whatMakesUnique ?? "",
    logoUrl: data.logoUrl ?? null,
    submittedAt: data.submitted_at,
  };
}

export async function approveSubmission(clubId: string): Promise<void> {
  const submission = await getSubmission(clubId);
  if (!submission) throw new Error(`No pending submission for "${clubId}".`);

  const [link1 = null, link2 = null, link3 = null] = submission.links;

  const update: Record<string, unknown> = {
    description: submission.description,
    tags: submission.tags.join(";"),
    meetingDays: submission.meetingDays.join(";"),
    commitmentLevel: submission.commitmentLevel,
    room: submission.rooms.join(";"),
    advisor: submission.advisor,
    link1,
    link2,
    link3,
    joinLink: submission.joinLink || null,
    meetingsLookLike: submission.meetingsLookLike || null,
    whatMakesUnique: submission.whatMakesUnique || null,
  };
  if (submission.logoUrl) update.logoUrl = submission.logoUrl;

  const { error: updateError } = await supabaseAdmin.from("clubs").update(update).eq("id", clubId);
  if (updateError) {
    throw new Error(`[supabase] failed to approve "${clubId}": ${updateError.message}`);
  }

  await rejectSubmission(clubId);
}

export async function rejectSubmission(clubId: string): Promise<void> {
  const { error } = await supabaseAdmin.from("club_submissions").delete().eq("club_id", clubId);
  if (error) {
    throw new Error(`[supabase] failed to remove submission for "${clubId}": ${error.message}`);
  }
}
