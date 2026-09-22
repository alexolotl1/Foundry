"use client";

import { useEffect } from "react";
import { applyTheme, getSavedTheme } from "@/lib/themePreview";

/**
 * Mounted once in the root layout so a saved theme-preview choice applies on
 * every fresh page load — not just when ThemeSwitcher (home page only) is
 * on screen. Renders nothing.
 */
export default function ThemeSync() {
  useEffect(() => {
    applyTheme(getSavedTheme());
  }, []);

  return null;
}
