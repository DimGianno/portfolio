"use client";

import { useSite } from "@/components/SiteProvider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useSite();

  return (
    <div className="language-toggle" aria-label={t.nav.language}>
      <button
        type="button"
        className={locale === "en" ? "active" : ""}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        className={locale === "el" ? "active" : ""}
        onClick={() => setLocale("el")}
        aria-pressed={locale === "el"}
      >
        EL
      </button>
    </div>
  );
}
