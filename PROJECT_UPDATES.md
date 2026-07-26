# Project Updates

## Latest Stable State

- **Last updated:** 2026-07-26
- **Current version:** 0.2.0
- **Current status:** Active
- **Primary branch:** `main`
- **Production URL:** https://dimgianno.com/

## Current Project Summary

dimgianno.com is Dimitris Giannopoulos's personal portfolio, built with the Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion. It presents selected frontend and backend work, technical skills, a verified professional credential, social links, and a web CV in English and Greek. Theme and language preferences persist in the browser, while Vercel provides hosting, Web Analytics, and the canonical production domain.

## Latest Updates

### 2026-07-26 - Chromaflow featured project

- **Type:** Feature
- **Status:** Completed
- **Summary:** Added Chromaflow as the portfolio's leading featured project with its live application, source repository, verified technology stack, and project documentation.
- **User impact:** Visitors can discover the Water Sort solver, understand its A* search and responsive replay focus, open the production application, and inspect the source and current project documentation.
- **Technical impact:** The shared project model now supports projects without staging environments, the responsive image gallery serves Chromaflow's repository-owned social preview locally, and obsolete staging-branch actions were removed from all project cards.
- **Related area:** Content and frontend

### 2026-07-24 - Verified hero credentials

- **Type:** Feature
- **Status:** Completed
- **Summary:** Added the verified DevReady Accelerator Program and MongoDB Overview credentials to the home-page hero.
- **User impact:** Visitors can see each credential's issuer and issue date and open its public verification page directly.
- **Technical impact:** Credential details are stored as structured content, official issuer artwork is served locally, and an accessible, responsive carousel provides five-second rotation with border timing feedback, desktop arrow and dot navigation, mobile swiping, hover and keyboard-focus pausing, and motion-free transitions when reduced motion is requested.
- **Related area:** Content and frontend

### 2026-07-24 - Live GitHub contribution calendar

- **Type:** Feature
- **Status:** Completed
- **Summary:** Added a responsive GitHub contribution calendar to the home page.
- **User impact:** Visitors can see the past year of development activity in a theme-aware, bilingual calendar and open the full GitHub profile directly.
- **Technical impact:** The portfolio now reads contribution data through GitHub's GraphQL API on the server, caches successful requests for one hour, keeps the access token private, and falls back gracefully when the calendar is unavailable.
- **Related area:** Content and frontend

### 2026-07-23 - Live project roadmaps and updates

- **Type:** Feature
- **Status:** Completed
- **Summary:** Added foldable project documentation sourced from each featured project's GitHub repository.
- **User impact:** Visitors can review current status, key limitations, planned features, and the latest project changes directly from each full project card while retaining links to the complete source files.
- **Technical impact:** The Projects route now refreshes public Markdown files every five minutes, selects sections deterministically, renders GitHub-flavored Markdown safely, and handles independent source failures without affecting the rest of the page.
- **Related area:** Content and frontend

### 2026-07-23 - Downloadable CV and project galleries

- **Type:** Feature
- **Status:** Completed
- **Summary:** Published the final English CV with an embedded viewer and replaced the project-card placeholders with responsive screenshot galleries.
- **User impact:** Visitors can read or download the CV and browse frontend and backend screenshots without leaving the portfolio.
- **Technical impact:** Project data now includes localized image descriptions, and reusable gallery controls support keyboard navigation across responsive layouts.
- **Related area:** Content and frontend

### 2026-07-10 - Continuous integration and tooling baseline

- **Type:** Maintenance
- **Status:** Completed
- **Summary:** Added the repository's automated quality workflow and aligned its development dependencies and scripts.
- **User impact:** No intentional behavior change; the portfolio retains its existing pages and interactions with stronger automated verification.
- **Technical impact:** GitHub Actions now checks formatting, linting, type safety, unit tests, and the production build on pushes and pull requests. Vitest and Testing Library cover persisted site preferences, and the package scripts support the same checks locally.
- **Related area:** Quality

### 2026-07-10 - Portfolio application and deployment baseline

- **Type:** Feature
- **Status:** Completed
- **Summary:** Established the portfolio's current Next.js structure, content model, visual presentation, and Vercel deployment configuration.
- **User impact:** Visitors can browse the home, projects, and CV pages; switch between English and Greek; choose a light or dark theme; and follow project, source, staging, and social links.
- **Technical impact:** Added reusable React components, centralized project, skill, and translation data, responsive styling, motion effects, metadata, theme-aware logos, and the canonical `www` redirect.
- **Related area:** Frontend

## Current Capabilities

- Present a bilingual home page with profile, featured-project, skills, social, and CV sections.
- Present responsive, bilingual hero credentials with direct public verification links.
- Present a responsive, bilingual GitHub contribution calendar with light and dark theme support.
- List Chromaflow and the Call Center frontend and backend projects with technology stacks and links to each available production, staging, and source destination.
- Persist English or Greek language selection and light or dark theme preferences in local storage.
- Respect the system color preference when no valid saved theme exists.
- Provide dedicated `/`, `/projects`, and `/cv` routes with route-specific metadata.
- Display a web CV summary and contact links with an embedded and downloadable English PDF.
- Present responsive, bilingual screenshot galleries for the frontend and backend Call Center projects.
- Present collapsed, automatically refreshed roadmap and update sections for each project on the Projects page.
- Apply responsive styling, theme-aware branding, and Framer Motion transitions.
- Report production traffic through Vercel Web Analytics.
- Redirect `www.dimgianno.com` requests to the canonical `dimgianno.com` domain.
- Validate formatting, linting, type safety, unit tests, and production builds through GitHub Actions.

## Portfolio Highlights

- Modern Next.js App Router implementation with TypeScript, React 19, Tailwind CSS, and reusable content-driven components.
- English and Greek presentation with persistent browser preferences and hydration-safe theme initialization.
- Clear separation of content data from components for projects, skills, and translations.
- Server-rendered project documentation sourced from GitHub with deterministic section selection and graceful per-file failure handling.
- Server-fetched GitHub contribution activity with hourly caching and a graceful unavailable state.
- Production and staging visibility for both frontend and backend Call Center projects.
- Chromaflow presentation highlighting heuristic A* search, responsive puzzle interaction and replay, and automated logic and cross-browser testing.
- Automated continuous integration covering formatting, linting, type checking, unit tests, and the production build.
- Vercel deployment configuration with canonical-domain redirects, metadata, and Web Analytics.
