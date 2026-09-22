import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function HomePage() {
  return (
    // Fills the screen below the header so the hero sits in its vertical middle.
    <div className="flex min-h-[calc(100vh-var(--header-h))] items-center">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16">
        <div className="flex max-w-[560px] flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h1
              className="text-[2.75rem] leading-[1.08] font-semibold sm:text-[3.25rem]"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Melting pot of activities in our school, all in one place.
            </h1>
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Search, filter, and compare clubs by tag, meeting day, and how
              much time they actually ask for — before you show up to a
              meeting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/activities"
              className="w-fit rounded-[3px] px-6 py-3 text-[1rem] font-semibold no-underline transition-opacity duration-150 hover:opacity-85"
              style={{ background: "var(--gold)", color: "var(--gold-contrast)" }}
            >
              Browse the activities directory
            </Link>
            <ThemeSwitcher />
          </div>
        </div>

        <Image
          src="/school.png"
          alt="Illustration of the school building"
          width={1048}
          height={766}
          sizes="(min-width: 1024px) 560px, 100vw"
          priority
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
