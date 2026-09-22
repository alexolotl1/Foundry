import { notFound } from "next/navigation";
import ClubAbout from "@/components/ClubAbout";
import { getClubById } from "@/lib/clubs";

export default async function ClubAboutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = await getClubById(id);

  if (!club) {
    notFound();
  }

  return <ClubAbout club={club} />;
}
