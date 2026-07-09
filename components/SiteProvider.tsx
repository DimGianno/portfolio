"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale, Translation } from "@/data/translations";
import { translations } from "@/data/translations";

type Theme = "light" | "dark";

type SiteContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Translation;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedLocale = localStorage.getItem("portfolio-locale") as Locale | null;
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const nextTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : preferredTheme;

    // Client preferences are intentionally restored only after hydration to keep server and client markup aligned.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedLocale === "en" || savedLocale === "el") setLocaleState(savedLocale);
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem("portfolio-locale", nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, theme, toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")), t: translations[locale] }),
    [locale, theme],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside SiteProvider");
  return context;
}
