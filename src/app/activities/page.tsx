import ActivitiesExplorer from "@/components/ActivitiesExplorer";
import { getClubs } from "@/lib/clubs";

export default async function ActivitiesPage() {
  const clubs = await getClubs();

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h1
          className="text-[2rem] font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Activities directory
        </h1>
        <p className="max-w-[65ch] text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Every recognized club this year, searchable by name and filterable
          by category. Click any club for its full page.
        </p>
      </div>
      <ActivitiesExplorer clubs={clubs} />
    </div>
  );
}
