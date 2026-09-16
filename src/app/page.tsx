import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import ClubLogo from "@/components/ClubLogo";
import TagChip from "@/components/TagChip";
import { CLUBS } from "@/data/clubs";

const PREVIEW = CLUBS.slice(0, 3);

export default function HomePage() {
  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-24">
      <div className="flex max-w-[560px] flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h1
            className="text-[2.75rem] leading-[1.08] font-semibold sm:text-[3.25rem]"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Every club in our School, in one directory.
          </h1>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Search, filter, and compare clubs by tag, meeting day, and how
            much time they actually ask for — before you show up to a
            meeting.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GoogleSignInButton />
          <p className="text-[0.8125rem]" style={{ color: "var(--text-faint)" }}>
            Sign-in is for club leaders managing a roster — browsing the
            directory doesn&apos;t require an account.
          </p>
        </div>

        <Link
          href="/activities"
          className="w-fit border-b text-[0.9375rem] font-medium no-underline"
          style={{ borderColor: "var(--gold)", color: "var(--text)" }}
        >
          Browse the activities directory
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[0.8125rem] font-medium" style={{ color: "var(--text-faint)" }}>
          {CLUBS.length} clubs listed this year
        </p>
        <div className="flex flex-col gap-3">
          {PREVIEW.map((club) => (
            <div
              key={club.id}
              className="flex gap-4 rounded-[4px] p-3"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[3px]" style={{ border: "1px solid var(--border)" }}>
                <ClubLogo club={club} />
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <span
                  className="truncate text-[0.9375rem] font-semibold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                >
                  {club.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {club.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
