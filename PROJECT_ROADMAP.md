# Project Roadmap

## Current Status

- **Project maturity:** Active portfolio foundation
- **Actively developed:** Yes
- **Last reviewed:** 2026-07-23

## Known Limitations

### Automated tests do not cover every visitor journey

- **Area:** Quality
- **Severity:** Medium
- **User impact:** Navigation, project links, and CV states have less automated regression protection.
- **Technical impact:** The current test suite covers saved preferences, hero credentials, project documentation, and GitHub contribution data, but it does not cover every component or route.
- **Current workaround:** CI still runs formatting, linting, type checking, the existing unit tests, and a production build.
- **Suggested resolution:** Add focused component and route tests for the portfolio's primary visitor journeys.
- **Status:** Known

### Browser and accessibility flows are not automated

- **Area:** Quality
- **Severity:** Medium
- **User impact:** Responsive navigation, keyboard interaction, external links, and theme or language changes could regress without an end-to-end signal.
- **Technical impact:** The repository has no browser-test or automated accessibility-test configuration.
- **Current workaround:** Use manual browser and keyboard checks alongside the existing CI workflow.
- **Suggested resolution:** Add a small cross-viewport browser suite and automated accessibility checks for all public routes.
- **Status:** Known

## Next Features

### Expand project case studies

- **Priority:** Medium
- **Status:** Idea
- **Value:** Explains the problems solved, technical decisions, and outcomes behind each featured project.
- **Scope:** Extend the centralized project content and presentation with concise challenge, approach, and outcome details in both supported languages.
- **Dependencies:** Final case-study copy and any supporting media
- **Complexity:** Medium
- **Portfolio relevance:** Demonstrates engineering judgment beyond a technology list.

## Technical Improvements

### Expand component and route coverage

- **Priority:** High
- **Reason:** Current automated tests cover several focused components and data paths but not every primary visitor journey.
- **Expected outcome:** Navigation, localization, project presentation, external links, and CV behavior receive focused regression coverage.
- **Affected area:** Public routes, shared components, and the Vitest test suite
- **Status:** Idea

### Add automated accessibility checks

- **Priority:** High
- **Reason:** The interface includes multiple routes, interactive toggles, animated content, and external actions without a dedicated automated accessibility audit.
- **Expected outcome:** Common semantic, keyboard, contrast, and accessible-name regressions are detected during development and CI.
- **Affected area:** Shared layout, navigation, controls, project cards, and CI
- **Status:** Idea

### Add responsive browser verification

- **Priority:** Medium
- **Reason:** Responsive behavior and full visitor journeys are currently verified manually.
- **Expected outcome:** The home, projects, and CV routes are checked across representative mobile and desktop viewports before release.
- **Affected area:** Browser-test configuration, public routes, and CI
- **Status:** Idea

## Suggested Next Milestones

1. **Complete portfolio content — Completed 2026-07-23**
   - Goal: Replace the remaining public placeholders with final portfolio assets.
   - Included work: Publish the CV PDF, add project screenshots, verify download and project links, and update documentation.
   - Completion criteria: The CV displays and downloads successfully, every project has an optimized visual preview, and all public links resolve as intended.

2. **Strengthen visitor-journey verification**
   - Goal: Protect the portfolio's primary interactions across routes and viewport sizes.
   - Included work: Component tests, route-level tests, browser coverage, accessibility checks, and CI integration.
   - Completion criteria: Automated checks cover navigation, localization, theming, project actions, CV behavior, and representative mobile and desktop layouts.

3. **Develop richer project case studies**
   - Goal: Present the engineering decisions and results behind each featured project.
   - Included work: Bilingual case-study content, supporting media, responsive presentation, and accessibility validation.
   - Completion criteria: Each featured project communicates its challenge, implementation approach, outcome, and live or source references in both languages.
