import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("shows the verified credentials in a controllable carousel", async () => {
    const user = userEvent.setup();
    renderHero();

    expect(screen.getByText("Featured credentials")).toBeInTheDocument();
    expect(screen.getByText("DevReady Accelerator Program")).toBeInTheDocument();
    expect(screen.getByText(/Issued by DevReady · 6 June 2026/)).toBeInTheDocument();

    const devReadyVerificationLink = screen.getByRole("link", {
      name: "Verify credential: DevReady Accelerator Program",
    });

    expect(devReadyVerificationLink).toHaveAttribute(
      "href",
      "https://verified.sertifier.com/en/verify/72687204173401/",
    );

    await user.click(screen.getByRole("button", { name: "Next credential" }));

    expect(
      await screen.findByText("MongoDB Overview: Core Concepts and Architecture"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Issued by MongoDB · 24 July 2026/)).toBeInTheDocument();

    const mongoDbVerificationLink = screen.getByRole("link", {
      name: "Verify credential: MongoDB Overview: Core Concepts and Architecture",
    });
    expect(mongoDbVerificationLink).toHaveAttribute(
      "href",
      "https://www.credly.com/badges/2dda992c-d8c3-4046-8c63-bd5a5b810cc4/public_url",
    );
    for (const verificationLink of [devReadyVerificationLink, mongoDbVerificationLink]) {
      expect(verificationLink).toHaveAttribute("target", "_blank");
      expect(verificationLink).toHaveAttribute("rel", "noreferrer");
    }
  });

  it("starts five-second autoplay when reduced motion is not requested", () => {
    const intervalSpy = vi.spyOn(window, "setInterval");

    renderHero();

    expect(intervalSpy).toHaveBeenCalledWith(expect.any(Function), 5000);
    intervalSpy.mockRestore();
  });

  it("localizes the credential interface while preserving the official title", async () => {
    localStorage.setItem("portfolio-locale", "el");

    renderHero();

    await waitFor(() => {
      expect(screen.getByText("Προβεβλημένες πιστοποιήσεις")).toBeInTheDocument();
    });
    expect(screen.getByText("DevReady Accelerator Program")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Επαλήθευση πιστοποίησης: DevReady Accelerator Program",
      }),
    ).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Επόμενη πιστοποίηση" }));

    expect(
      await screen.findByText("MongoDB Overview: Core Concepts and Architecture"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Επαλήθευση πιστοποίησης: MongoDB Overview: Core Concepts and Architecture",
      }),
    ).toBeInTheDocument();
  });
});
