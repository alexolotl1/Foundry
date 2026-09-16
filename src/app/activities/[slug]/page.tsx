import { notFound } from "next/navigation";
import Link from "next/link";
import ClubDetailContent from "@/components/ClubDetailContent";
import { CLUBS, getClubBySlug } from "@/data/clubs";

export function generateStaticParams() {
  return CLUBS.map((club) => ({ slug: club.slug }));
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = getClubBySlug(slug);

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
