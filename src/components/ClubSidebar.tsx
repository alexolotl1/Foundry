"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function ClubSidebar({ clubId }: { clubId: string }) {
  const pathname = usePathname();
  const base = `/activities/${clubId}`;

  const tabs = [
    { href: base, label: "Overview", icon: <SpaceDashboardOutlinedIcon sx={{ fontSize: 22 }} /> },
    { href: `${base}/about`, label: "About", icon: <HelpOutlineOutlinedIcon sx={{ fontSize: 22 }} /> },
  ];

  return (
    <aside className="mb-6 lg:sticky lg:top-8 lg:mb-0 lg:mr-6 lg:w-[var(--sidebar-w)] lg:justify-self-end lg:self-start">
      <div className="flex flex-col gap-4">
        <Link
          href="/activities"
          className="flex items-center gap-1.5 rounded-[4px] py-3 pl-2.5 pr-4 text-[1.0625rem] font-semibold no-underline transition-colors duration-150 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          style={{ border: "1px solid var(--border-strong)", color: "var(--text)" }}
        >
          <ChevronLeftIcon sx={{ fontSize: 26 }} />
          All activities
        </Link>

        <nav className="flex gap-2 lg:flex-col" aria-label="Club pages">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className="flex flex-1 items-center gap-3 rounded-[4px] px-4 py-3.5 text-[1rem] font-medium no-underline transition-colors duration-150 lg:flex-none"
                style={{
                  background: isActive ? "var(--surface-2)" : "transparent",
                  color: isActive ? "var(--gold)" : "var(--text-muted)",
                  borderLeft: `3px solid ${isActive ? "var(--gold)" : "transparent"}`,
                }}
              >
                {tab.icon}
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
