import type { Club } from "@/types/club";

function initialsFor(name: string): string {
  const words = name.split(" ").filter((w) => /[A-Za-z]/.test(w[0] ?? ""));
  const letters = words.slice(0, 2).map((w) => w[0].toUpperCase());
  return letters.join("") || name.slice(0, 2).toUpperCase();
}

/**
 * Square club "logo" slot. Renders the real uploaded logo when a club has
 * one; otherwise falls back to a generated monogram so the grid never shows
 * a broken image while clubs are still mock data.
 */
export default function ClubLogo({ club, className = "" }: { club: Club; className?: string }) {
  if (club.logoUrl) {
    return (
      // Club logos will come from arbitrary URLs once real uploads exist,
      // so next/image's domain allowlist doesn't apply — plain <img> is fine
      // for a small avatar-sized asset.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={club.logoUrl}
        alt={`${club.name} logo`}
        className={`block h-full w-full object-cover ${className}`}
      />
    );
  }

  const initials = initialsFor(club.name);

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${club.name} placeholder logo`}
      className={`block h-full w-full ${className}`}
    >
      <rect x="0" y="0" width="120" height="120" fill="var(--surface-2)" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeOpacity="0.6" />
      <text
        x="50%"
        y="53%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="40"
        fontWeight="600"
        fill="var(--gold)"
      >
        {initials}
      </text>
    </svg>
  );
}
