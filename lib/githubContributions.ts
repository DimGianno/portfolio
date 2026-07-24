export type GitHubContributionDay = {
  contributionCount: number;
  contributionLevel: number;
  date: string;
  weekday: number;
};

export type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
};

export type GitHubContributionCalendar = {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
};

type GitHubContributionLevel =
  "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

type GitHubGraphQlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              contributionLevel: GitHubContributionLevel;
              date: string;
              weekday: number;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const contributionLevelValue: Record<GitHubContributionLevel, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const contributionQuery = `
  query PortfolioContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

async function requestGitHubContributions(
  login: string,
  token: string,
): Promise<GitHubContributionCalendar> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "dimgianno-portfolio",
    },
    body: JSON.stringify({ query: contributionQuery, variables: { login } }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("GitHub contribution request failed");
  }

  const payload = (await response.json()) as GitHubGraphQlResponse;
  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (payload.errors?.length || !calendar || !Array.isArray(calendar.weeks)) {
    throw new Error("GitHub contribution response was invalid");
  }

  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        contributionCount: day.contributionCount,
        contributionLevel: contributionLevelValue[day.contributionLevel] ?? 0,
        date: day.date,
        weekday: day.weekday,
      })),
    })),
  };
}

const loadCachedGitHubContributions = unstable_cache(
  async (login: string) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GitHub token is unavailable");
    }

    return requestGitHubContributions(login, token);
  },
  ["github-contribution-calendar-v2"],
  { revalidate: 3600 },
);

export async function loadGitHubContributions(
  login = "DimGianno",
  token?: string,
): Promise<GitHubContributionCalendar | null> {
  try {
    if (token !== undefined) {
      return token ? await requestGitHubContributions(login, token) : null;
    }

    if (!process.env.GITHUB_TOKEN) {
      return null;
    }

    return await loadCachedGitHubContributions(login);
  } catch {
    return null;
  }
}
import { unstable_cache } from "next/cache";
