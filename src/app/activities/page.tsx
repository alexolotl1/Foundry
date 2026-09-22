import ActivitiesExplorer from "@/components/ActivitiesExplorer";
import { getClubs } from "@/lib/clubs";

export default async function ActivitiesPage() {
  const clubs = await getClubs();

  return (
    <div className="page-width flex flex-col gap-8 py-12">
      <h1
        className="text-[2rem] font-semibold"
        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
      >
        Activities
      </h1>
      <ActivitiesExplorer clubs={clubs} />
    </div>
  );
}
