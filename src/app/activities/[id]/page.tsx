import { notFound } from "next/navigation";
import Link from "next/link";
import ClubDetailContent from "@/components/ClubDetailContent";
import { getClubs, getClubById } from "@/lib/clubs";

export async function generateStaticParams() {
  const clubs = await getClubs();
  return clubs.map((club) => ({ id: club.id }));
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = await getClubById(id);

  if (!club) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="px-6 pt-6">
        <Link
          href="/activities"
          className="text-[0.875rem] font-medium no-underline"
          style={{ color: "var(--text-muted)" }}
        >
          ‹ All activities
        </Link>
      </div>
      <ClubDetailContent club={club} />
    </div>
  );
}
