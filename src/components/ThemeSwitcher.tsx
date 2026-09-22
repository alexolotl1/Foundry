"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { type ThemeId, applyTheme, getSavedTheme, saveTheme } from "@/lib/themePreview";

const THEMES: {
  id: ThemeId;
  label: string;
  blurb: string;
  swatches: string[];
}[] = [
  {
    id: "deep",
    label: "Deep blue",
    blurb: "What's live now — richer blues, bright gold.",
    swatches: ["#012248", "#0e3a72", "#dfae00"],
  },
  {
    id: "mix",
    label: "Slate mix",
    blurb: "A grayer, whiter blend, still blue-leaning.",
    swatches: ["#16202c", "#202e3d", "#e7b93a"],
  },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>("deep");
  const containerRef = useRef<HTMLDivElement>(null);

  // ThemeSync (mounted in the root layout) is what actually applies the
  // saved theme on every page load; this just mirrors that choice into the
  // picker's own UI state.
  useEffect(() => {
    setActive(getSavedTheme());
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  function choose(id: ThemeId) {
    setActive(id);
    applyTheme(id);
    saveTheme(id);
  }

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex cursor-pointer items-center gap-2 rounded-[3px] px-5 py-3 text-[0.9375rem] font-semibold"
        style={{ border: "1px solid var(--border-strong)", color: "var(--text)", background: "transparent" }}
      >
        <PaletteOutlinedIcon sx={{ fontSize: 20, color: "var(--gold)" }} />
        Preview color themes
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Theme preview"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 z-50 mt-3 w-[300px] rounded-[6px] p-2"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 16px 40px -12px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div className="flex flex-col gap-1">
              {THEMES.map((t) => {
                const isActive = active === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => choose(t.id)}
                    className="flex cursor-pointer items-center gap-3 rounded-[4px] p-2.5 text-left transition-colors duration-150"
                    style={{
                      background: isActive ? "var(--surface)" : "transparent",
                      border: `1px solid ${isActive ? "var(--gold)" : "transparent"}`,
                    }}
                  >
                    <div className="flex shrink-0 overflow-hidden rounded-[3px]" style={{ border: "1px solid var(--border)" }}>
                      {t.swatches.map((c, i) => (
                        <span key={i} style={{ background: c, width: 14, height: 28, display: "block" }} />
                      ))}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[0.875rem] font-semibold" style={{ color: "var(--text)" }}>
                        {t.label}
                      </span>
                      <span className="text-[0.75rem] leading-snug" style={{ color: "var(--text-faint)" }}>
                        {t.blurb}
                      </span>
                    </div>
                    {isActive && <CheckIcon sx={{ fontSize: 18, color: "var(--gold)" }} />}
                  </button>
                );
              })}
            </div>
            <p className="px-2.5 pt-2 pb-1 text-[0.6875rem]" style={{ color: "var(--text-faint)" }}>
              Demo only — for picking a palette, saved in this browser.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
