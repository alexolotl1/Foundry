"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Activities" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2 no-underline">
          <motion.span
            whileHover={{ x: 1 }}
            transition={{ duration: 0.15 }}
            className="text-[1.375rem] font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Foundry
          </motion.span>
          <span className="text-[0.8125rem] font-medium" style={{ color: "var(--text-faint)" }}>
            Clubs &amp; Activities
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 text-[0.9375rem] font-medium no-underline"
              >
                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                  style={{ color: isActive ? "var(--text)" : "var(--text-muted)" }}
                >
                  {link.label}
                </motion.span>
                {isActive && (
                  // Shared layoutId makes the underline glide between nav
                  // items on route change instead of just popping over.
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-[13px] left-0 right-0 h-[2px]"
                    style={{ background: "var(--gold)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
