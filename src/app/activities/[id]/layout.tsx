import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import ClubHeader from "@/components/ClubHeader";
import ClubSidebar from "@/components/ClubSidebar";
import { getClubs, getClubById } from "@/lib/clubs";

export async function generateStaticParams() {
  const clubs = await getClubs();
  return clubs.map((club) => ({ id: club.id }));
}

export default async function ClubLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = await getClubById(id);

  if (!club) {
    notFound();
  }

  return (
    <div className="club-layout py-8">
      <ClubSidebar clubId={club.id} />
      <div className="flex min-w-0 flex-col gap-8">
        <ClubHeader club={club} />
        <div className="border-t" style={{ borderColor: "var(--border)" }} />
        {children}
      </div>
    </div>
  );
}
