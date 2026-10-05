"use client";

import { useState } from "react";
import type { Club } from "@/types/club";

const EXTENSIONS = ["png", "jpg", "jpeg", "svg", "webp"];

function initialsFor(name: string): string {
  const words = name.split(" ").filter((w) => /[A-Za-z]/.test(w[0] ?? ""));
  const letters = words.slice(0, 2).map((w) => w[0].toUpperCase());
  return letters.join("") || name.slice(0, 2).toUpperCase();
}

export default function ClubLogo({ club, className = "" }: { club: Club; className?: string }) {
  const [extIndex, setExtIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const initials = initialsFor(club.name);

  const src = club.logoUrl || (extIndex < EXTENSIONS.length ? `/logos/${club.id}.${EXTENSIONS[extIndex]}` : null);

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

      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (!club.logoUrl) setExtIndex((i) => i + 1);
          }}
          className="absolute inset-0 block h-full w-full object-cover transition-opacity duration-200"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
