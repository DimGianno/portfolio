import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Hero } from "@/components/Hero";
import { SiteProvider } from "@/components/SiteProvider";

function renderHero() {
  return render(
    <SiteProvider>
      <Hero />
    </SiteProvider>,
  );
}

describe("Hero credential", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
  });

  it("shows the verified credential and links to its public verification page", () => {
    renderHero();

    expect(screen.getByText("Featured credential")).toBeInTheDocument();
    expect(screen.getByText("DevReady Accelerator Program")).toBeInTheDocument();
    expect(screen.getByText(/Issued by DevReady · 6 June 2026/)).toBeInTheDocument();

    const verificationLink = screen.getByRole("link", {
      name: "Verify credential: DevReady Accelerator Program",
    });

    expect(verificationLink).toHaveAttribute(
      "href",
      "https://verified.sertifier.com/en/verify/72687204173401/",
    );
    expect(verificationLink).toHaveAttribute("target", "_blank");
    expect(verificationLink).toHaveAttribute("rel", "noreferrer");
  });

  it("localizes the credential interface while preserving the official title", async () => {
    localStorage.setItem("portfolio-locale", "el");

    renderHero();

    await waitFor(() => {
      expect(screen.getByText("Προβεβλημένη πιστοποίηση")).toBeInTheDocument();
    });
    expect(screen.getByText("DevReady Accelerator Program")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Επαλήθευση πιστοποίησης: DevReady Accelerator Program",
      }),
    ).toBeInTheDocument();
  });
});
