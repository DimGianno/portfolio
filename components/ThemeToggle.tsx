"use client";

import { Moon, Sun } from "lucide-react";
import { useSite } from "@/components/SiteProvider";

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useSite();
  const isDark = theme === "dark";

  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggleTheme}
      aria-label={t.nav.theme}
      title={t.nav.theme}
    >
      {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
