# Project Updates

## Latest Stable State

- **Last updated:** 2026-07-23
- **Current version:** 0.2.0
- **Current status:** Active
- **Primary branch:** `main`
- **Production URL:** https://dimgianno.com/

## Current Project Summary

dimgianno.com is Dimitris Giannopoulos's personal portfolio, built with the Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion. It presents selected frontend and backend work, technical skills, social links, and a web CV in English and Greek. Theme and language preferences persist in the browser, while Vercel provides hosting, Web Analytics, and the canonical production domain.

## Latest Updates

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
- List the Call Center frontend and backend projects with technology stacks and links to production, staging, source repositories, and staging branches.
- Persist English or Greek language selection and light or dark theme preferences in local storage.
- Respect the system color preference when no valid saved theme exists.
- Provide dedicated `/`, `/projects`, and `/cv` routes with route-specific metadata.
- Display a web CV summary and contact links while clearly marking the downloadable PDF as unavailable.
- Apply responsive styling, theme-aware branding, and Framer Motion transitions.
- Report production traffic through Vercel Web Analytics.
- Redirect `www.dimgianno.com` requests to the canonical `dimgianno.com` domain.
- Validate formatting, linting, type safety, unit tests, and production builds through GitHub Actions.

## Portfolio Highlights

- Modern Next.js App Router implementation with TypeScript, React 19, Tailwind CSS, and reusable content-driven components.
- English and Greek presentation with persistent browser preferences and hydration-safe theme initialization.
- Clear separation of content data from components for projects, skills, and translations.
- Production and staging visibility for both frontend and backend Call Center projects.
- Automated continuous integration covering formatting, linting, type checking, unit tests, and the production build.
- Vercel deployment configuration with canonical-domain redirects, metadata, and Web Analytics.
