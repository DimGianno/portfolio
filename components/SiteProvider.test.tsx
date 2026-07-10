import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SiteProvider, useSite } from "@/components/SiteProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

function PreferencesProbe() {
  const { locale, theme } = useSite();

  return <output>{`${locale}:${theme}`}</output>;
}

function renderPreferences() {
  return render(
    <SiteProvider>
      <LanguageToggle />
      <ThemeToggle />
      <PreferencesProbe />
    </SiteProvider>,
  );
}

describe("SiteProvider preferences", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
  });

  it("restores saved preferences and persists user changes", async () => {
    localStorage.setItem("portfolio-locale", "el");
    localStorage.setItem("portfolio-theme", "light");
    const user = userEvent.setup();

    renderPreferences();

    await waitFor(() => {
      expect(screen.getByText("el:light")).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "EL" })).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByText("en:light")).toBeInTheDocument();
    expect(localStorage.getItem("portfolio-locale")).toBe("en");

    await user.click(screen.getByRole("button", { name: /theme/i }));
    expect(screen.getByText("en:dark")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  });

  it("uses the system theme and ignores invalid stored preferences", async () => {
    vi.mocked(matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    localStorage.setItem("portfolio-locale", "invalid");
    localStorage.setItem("portfolio-theme", "invalid");

    renderPreferences();

    await waitFor(() => {
      expect(screen.getByText("en:dark")).toBeInTheDocument();
    });
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });
});
