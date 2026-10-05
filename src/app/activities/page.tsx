import ActivitiesExplorer from "@/components/ActivitiesExplorer";
import { getClubs } from "@/lib/clubs";

export default async function ActivitiesPage() {
  const clubs = await getClubs();

  return (
    <div className="page-width flex flex-col gap-8 py-12">
      <ActivitiesExplorer clubs={clubs} />
    </div>
  );
}
