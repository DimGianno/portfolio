"use client";

import { ArrowUpRight, Code2 } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useSite } from "@/components/SiteProvider";
import type { GitHubContributionCalendar } from "@/lib/githubContributions";

const githubProfileUrl = "https://github.com/DimGianno";

type GitHubContributionsProps = {
  calendar: GitHubContributionCalendar | null;
};

export function GitHubContributions({ calendar }: GitHubContributionsProps) {
  const { locale, t } = useSite();
  const dateLocale = locale === "el" ? "el-GR" : "en-US";
  const numberFormatter = new Intl.NumberFormat(dateLocale);
  const monthFormatter = new Intl.DateTimeFormat(dateLocale, {
    month: "short",
    timeZone: "UTC",
  });
  const dateFormatter = new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const weekdayFormatter = new Intl.DateTimeFormat(dateLocale, {
    weekday: "short",
    timeZone: "UTC",
  });
  const weekdayLabels = Array.from({ length: 7 }, (_, weekday) =>
    weekdayFormatter.format(new Date(Date.UTC(2026, 6, 19 + weekday))),
  );

  const monthLabels = calendar?.weeks.map((week, index) => {
    const firstDay = week.contributionDays[0];
    const previousFirstDay = calendar.weeks[index - 1]?.contributionDays[0];
    if (!firstDay) return "";

    const date = new Date(`${firstDay.date}T00:00:00Z`);
    const previousDate = previousFirstDay ? new Date(`${previousFirstDay.date}T00:00:00Z`) : null;
    const isNewMonth =
      !previousDate ||
      date.getUTCMonth() !== previousDate.getUTCMonth() ||
      date.getUTCFullYear() !== previousDate.getUTCFullYear();

    return isNewMonth ? monthFormatter.format(date) : "";
  });

  return (
    <AnimatedSection className="section github-contributions-section">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{t.home.githubEyebrow}</p>
            <h2>{t.home.githubTitle}</h2>
          </div>
          <p>{t.home.githubCopy}</p>
        </div>

        <div className="github-contribution-card">
          <div className="github-contribution-header">
            <div>
              <Code2 size={20} aria-hidden="true" />
              <strong>
                {calendar
                  ? `${numberFormatter.format(calendar.totalContributions)} ${t.home.githubTotalSuffix}`
                  : t.home.githubUnavailable}
              </strong>
            </div>
            <a href={githubProfileUrl} target="_blank" rel="noreferrer">
              {t.home.githubView} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          {calendar ? (
            <>
              <div
                className="github-contribution-scroll"
                role="region"
                aria-label={t.home.githubScrollLabel}
                tabIndex={0}
              >
                <div className="github-contribution-chart">
                  <div className="github-weekday-labels" aria-hidden="true">
                    <span />
                    <span>{weekdayLabels[1]}</span>
                    <span />
                    <span>{weekdayLabels[3]}</span>
                    <span />
                    <span>{weekdayLabels[5]}</span>
                    <span />
                  </div>
                  <div>
                    <div className="github-month-labels" aria-hidden="true">
                      {monthLabels?.map((label, index) => (
                        <span key={`${label}-${index}`}>{label}</span>
                      ))}
                    </div>
                    <div
                      className="github-contribution-weeks"
                      role="img"
                      aria-label={`${numberFormatter.format(calendar.totalContributions)} ${t.home.githubTotalSuffix}`}
                    >
                      {calendar.weeks.map((week, weekIndex) => (
                        <div
                          className="github-contribution-week"
                          key={week.contributionDays[0]?.date ?? `week-${weekIndex}`}
                        >
                          {Array.from({ length: 7 }, (_, weekday) => {
                            const day = week.contributionDays.find(
                              (contributionDay) => contributionDay.weekday === weekday,
                            );

                            if (!day) {
                              return (
                                <span className="github-contribution-day-empty" key={weekday} />
                              );
                            }

                            const contributionLabel =
                              day.contributionCount === 1
                                ? t.home.githubContribution
                                : t.home.githubContributions;

                            return (
                              <span
                                className="github-contribution-day"
                                data-level={day.contributionLevel}
                                key={day.date}
                                title={`${numberFormatter.format(day.contributionCount)} ${contributionLabel} · ${dateFormatter.format(new Date(`${day.date}T00:00:00Z`))}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="github-contribution-footer">
                <span>{t.home.githubActivityNote}</span>
                <div className="github-contribution-legend" aria-label={t.home.githubLegendLabel}>
                  <span>{t.home.githubLess}</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <i data-level={level} key={level} />
                  ))}
                  <span>{t.home.githubMore}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="github-contribution-fallback">{t.home.githubUnavailableCopy}</p>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
