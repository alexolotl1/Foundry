import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/session";
import { listSubmissions, getSubmission, type SubmissionDetail } from "@/lib/submissions";
import { getClubById } from "@/lib/clubs";
import type { Club } from "@/types/club";
import AdminReviewDashboard, { type SubmissionEntry } from "@/components/admin-review/AdminReviewDashboard";

export default async function AdminReviewPage() {
  const store = await cookies();
  if (!readAdminSessionToken(store.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  const items = await listSubmissions();

  const entries = await Promise.all(
    items.map(async (item) => {
      const [submission, baseClub] = await Promise.all([getSubmission(item.clubId), getClubById(item.clubId)]);
      return { clubName: item.clubName, submittedAt: item.submittedAt, submission, baseClub };
    })
  );

  const valid: SubmissionEntry[] = entries.filter(
    (e): e is { clubName: string; submittedAt: string; submission: SubmissionDetail; baseClub: Club } =>
      Boolean(e.submission && e.baseClub)
  );

  return (
    <div className="page-width py-10">
      <AdminReviewDashboard entries={valid} />
    </div>
  );
}
