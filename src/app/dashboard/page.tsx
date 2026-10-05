import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getClubById } from "@/lib/clubs";
import { isCheckedIn } from "@/lib/clubAccounts";
import { readSessionToken, SESSION_COOKIE } from "@/lib/session";
import AdminWizard from "@/components/admin/AdminWizard";
import ClaimAccountForm from "@/components/admin/ClaimAccountForm";

export default async function DashboardPage() {
  const store = await cookies();
  const clubId = readSessionToken(store.get(SESSION_COOKIE)?.value);

  if (!clubId) {
    redirect("/login");
  }

  const club = await getClubById(clubId);
  if (!club) {
    redirect("/login");
  }

  const checkedIn = await isCheckedIn(clubId);
  if (!checkedIn) {
    return <ClaimAccountForm clubName={club.name} />;
  }

  return (
    <div className="page-width flex flex-col gap-8 py-10">
      <AdminWizard club={club} />
    </div>
  );
}
