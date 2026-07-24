import { afterEach, describe, expect, it, vi } from "vitest";
import { loadGitHubContributions } from "@/lib/githubContributions";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("GitHub contribution calendar", () => {
  it("does not request GitHub when no server token is configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("GITHUB_TOKEN", "");

    await expect(loadGitHubContributions()).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("normalizes GitHub contribution levels for the calendar UI", async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: {
                totalContributions: 3,
                weeks: [
                  {
                    contributionDays: [
                      {
                        contributionCount: 0,
                        contributionLevel: "NONE",
                        date: "2026-07-20",
                        weekday: 1,
                      },
                      {
                        contributionCount: 3,
                        contributionLevel: "FOURTH_QUARTILE",
                        date: "2026-07-21",
                        weekday: 2,
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const calendar = await loadGitHubContributions("DimGianno", "test-token");

    expect(calendar?.totalContributions).toBe(3);
    expect(calendar?.weeks[0].contributionDays.map((day) => day.contributionLevel)).toEqual([0, 4]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.objectContaining({ cache: "no-store", method: "POST" }),
    );
  });

  it("returns no calendar when GitHub responds with an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("Unauthorized", { status: 401 })),
    );

    await expect(loadGitHubContributions("DimGianno", "invalid-token")).resolves.toBeNull();
  });
});
