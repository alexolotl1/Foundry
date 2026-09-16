"use client";

import { useState } from "react";
import type { Club } from "@/types/club";

const EXTENSIONS = ["png", "jpg", "jpeg", "svg", "webp"];

function initialsFor(name: string): string {
  const words = name.split(" ").filter((w) => /[A-Za-z]/.test(w[0] ?? ""));
  const letters = words.slice(0, 2).map((w) => w[0].toUpperCase());
  return letters.join("") || name.slice(0, 2).toUpperCase();
}

/**
 * Square club "logo" slot. The generated monogram is always rendered as a
 * base layer; a real file at /logos/<id>.<ext> (tried in turn across common
 * extensions) fades in on top of it if one loads. Kept invisible (never the
 * browser's broken-image icon) while attempts are still in flight or have
 * all failed, so most clubs — which don't have a logo file yet — never show
 * a flash of broken UI.
 */
export default function ClubLogo({ club, className = "" }: { club: Club; className?: string }) {
  const [extIndex, setExtIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const stillTrying = extIndex < EXTENSIONS.length;
  const initials = initialsFor(club.name);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <svg
        viewBox="0 0 120 120"
        role="img"
        aria-label={`${club.name} logo`}
        className="absolute inset-0 block h-full w-full"
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

      {stillTrying && (
        // Arbitrary /logos/ files, not a next/image-managed asset set.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={extIndex}
          src={`/logos/${club.id}.${EXTENSIONS[extIndex]}`}
          alt=""
          aria-hidden="true"
          onLoad={() => setLoaded(true)}
          onError={() => setExtIndex((i) => i + 1)}
          className="absolute inset-0 block h-full w-full object-cover transition-opacity duration-200"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
