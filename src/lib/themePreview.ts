export type ThemeId = "deep" | "mix";

export const THEME_STORAGE_KEY = "foundry-theme-demo";

export function getSavedTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "mix") return saved;
  } catch {
    // ignore — private browsing, etc.
  }
  return "deep";
}

export function applyTheme(id: ThemeId) {
  if (id === "deep") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", id);
  }
}

export function saveTheme(id: ThemeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // ignore
  }
}
