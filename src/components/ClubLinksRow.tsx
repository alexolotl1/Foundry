import type { ReactNode } from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import type { ClubLinks } from "@/types/club";

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="11" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="12.5" r="1.3" fill="currentColor" />
      <circle cx="15" cy="12.5" r="1.3" fill="currentColor" />
      <path d="M8 4.5 9.3 7M16 4.5 14.7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function toHref(links: ClubLinks) {
  return {
    instagram: links.instagram
      ? `https://instagram.com/${links.instagram.replace(/^@/, "")}`
      : undefined,
    discord: links.discord
      ? links.discord.startsWith("http")
        ? links.discord
        : `https://${links.discord}`
      : undefined,
    website: links.website,
  };
}

export default function ClubLinksRow({ links }: { links?: ClubLinks }) {
  if (!links || (!links.instagram && !links.discord && !links.website)) return null;

  const hrefs = toHref(links);

  const items = [
    hrefs.instagram && { key: "instagram", href: hrefs.instagram, label: "Instagram", icon: <InstagramIcon /> },
    hrefs.discord && { key: "discord", href: hrefs.discord, label: "Discord", icon: <DiscordIcon /> },
    hrefs.website && { key: "website", href: hrefs.website, label: "Website", icon: <LanguageOutlinedIcon sx={{ fontSize: 17 }} /> },
  ].filter(Boolean) as { key: string; href: string; label: string; icon: ReactNode }[];

  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className="flex h-8 w-8 items-center justify-center rounded-[3px] no-underline transition-colors duration-150 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
