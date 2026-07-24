import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    localStorage.clear();
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
    expect(screen.getByLabelText("Credential 1 of 2")).toHaveTextContent("1 / 2");
    expect(screen.getByRole("button", { name: "Pause credential rotation" })).toBeInTheDocument();
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
    expect(screen.getByLabelText("Credential 2 of 2")).toHaveTextContent("2 / 2");
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

  it("rotates every five seconds even when reduced motion is requested", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    const intervalSpy = vi.spyOn(window, "setInterval");

    renderHero();

    const rotationCall = intervalSpy.mock.calls.find(([, delay]) => delay === 5000);
    expect(rotationCall).toBeDefined();

    act(() => {
      (rotationCall?.[0] as () => void)();
    });

    expect(
      screen.getByText("MongoDB Overview: Core Concepts and Architecture"),
    ).toBeInTheDocument();
    intervalSpy.mockRestore();
  });

  it("supports explicit pause and play without pausing on hover", () => {
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");
    renderHero();

    const carousel = screen.getByRole("region", { name: "Featured credentials" });
    fireEvent.mouseEnter(carousel);
    expect(clearIntervalSpy).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Pause credential rotation" }));
    expect(screen.getByRole("button", { name: "Play credential rotation" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(clearIntervalSpy).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Play credential rotation" }));
    expect(screen.getByRole("button", { name: "Pause credential rotation" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    clearIntervalSpy.mockRestore();
  });

  it("pauses for keyboard focus and supports horizontal swipe navigation", () => {
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");
    renderHero();

    fireEvent.focus(screen.getByRole("button", { name: "Next credential" }));
    expect(clearIntervalSpy).toHaveBeenCalled();

    const viewport = document.querySelector(".hero-credential-viewport");
    expect(viewport).not.toBeNull();
    fireEvent.touchStart(viewport as Element, {
      touches: [{ clientX: 220, clientY: 100 }],
    });
    fireEvent.touchEnd(viewport as Element, {
      changedTouches: [{ clientX: 120, clientY: 108 }],
    });

    expect(
      screen.getByText("MongoDB Overview: Core Concepts and Architecture"),
    ).toBeInTheDocument();
    clearIntervalSpy.mockRestore();
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
    expect(
      screen.getByRole("button", { name: "Παύση εναλλαγής πιστοποιήσεων" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Πιστοποίηση 1 από 2")).toBeInTheDocument();

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
