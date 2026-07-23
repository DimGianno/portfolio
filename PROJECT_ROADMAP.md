# Project Roadmap

## Current Status

- **Project maturity:** Active portfolio foundation
- **Actively developed:** Yes
- **Last reviewed:** 2026-07-23

## Known Limitations

### Downloadable CV is not available

- **Area:** Content
- **Severity:** High
- **User impact:** Visitors can read the web CV but cannot download the final English PDF.
- **Technical impact:** The CV download control is intentionally disabled, and `public/cv/` contains only a placeholder file.
- **Current workaround:** Use the web CV and its email or LinkedIn contact links.
- **Suggested resolution:** Add the final PDF at the documented public path and replace the disabled control with a download link.
- **Status:** Known

### Project screenshots are placeholders

- **Area:** Content
- **Severity:** Medium
- **User impact:** Project cards describe and link to the work but do not provide visual previews.
- **Technical impact:** Both project asset directories contain only placeholder files, and the cards render a screenshot-coming-soon state.
- **Current workaround:** Open the production or staging links from the projects page to view each application.
- **Suggested resolution:** Add representative optimized screenshots for both projects and render them with accessible alternative text.
- **Status:** Known

### Automated tests cover only site preferences

- **Area:** Quality
- **Severity:** Medium
- **User impact:** Navigation, project links, localized content, and CV states have less automated regression protection.
- **Technical impact:** The current test suite exercises saved language and theme behavior but does not cover the other components or routes.
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

### Publish the downloadable CV

- **Priority:** High
- **Status:** Planned
- **Value:** Gives recruiters and collaborators a portable version of the portfolio owner's experience and contact information.
- **Scope:** Add the final English PDF at the documented path and enable the existing CV download control.
- **Dependencies:** Final approved CV content and PDF asset
- **Complexity:** Low
- **Portfolio relevance:** Completes a primary portfolio conversion path.

### Add project imagery

- **Priority:** High
- **Status:** Planned
- **Value:** Lets visitors understand each project's interface and character before leaving the portfolio.
- **Scope:** Add optimized frontend and backend project images, render them responsively, and preserve the current card links and descriptions.
- **Dependencies:** Approved screenshots from the production applications
- **Complexity:** Low
- **Portfolio relevance:** Improves the visual evidence supporting the featured work.

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
- **Reason:** Current automated tests validate only persisted site preferences.
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

1. **Complete portfolio content**
   - Goal: Replace the remaining public placeholders with final portfolio assets.
   - Included work: Publish the CV PDF, add project screenshots, verify download and project links, and update documentation.
   - Completion criteria: The CV downloads successfully, every project has an optimized visual preview, and all public links resolve as intended.

2. **Strengthen visitor-journey verification**
   - Goal: Protect the portfolio's primary interactions across routes and viewport sizes.
   - Included work: Component tests, route-level tests, browser coverage, accessibility checks, and CI integration.
   - Completion criteria: Automated checks cover navigation, localization, theming, project actions, CV behavior, and representative mobile and desktop layouts.

3. **Develop richer project case studies**
   - Goal: Present the engineering decisions and results behind each featured project.
   - Included work: Bilingual case-study content, supporting media, responsive presentation, and accessibility validation.
   - Completion criteria: Each featured project communicates its challenge, implementation approach, outcome, and live or source references in both languages.
