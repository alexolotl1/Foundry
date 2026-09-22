import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getClubById } from "@/lib/clubs";
import { readSessionToken, SESSION_COOKIE } from "@/lib/session";
import AdminWizard from "@/components/admin/AdminWizard";

export default async function AdminPage() {
  const store = await cookies();
  const clubId = readSessionToken(store.get(SESSION_COOKIE)?.value);

  if (!clubId) {
    redirect("/login");
  }

  const club = await getClubById(clubId);
  if (!club) {
    redirect("/login");
  }

  return (
    <div className="page-width flex flex-col gap-8 py-10">
      <AdminWizard club={club} />
    </div>
  );
}
