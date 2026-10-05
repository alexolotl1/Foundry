"use client";

import { useEffect } from "react";
import { applyTheme, getSavedTheme } from "@/lib/themePreview";

export default function ThemeSync() {
  useEffect(() => {
    applyTheme(getSavedTheme());
  }, []);

  return null;
}
