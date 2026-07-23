# dimgianno.com portfolio

Personal portfolio for Dimitris Giannopoulos, built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Vercel Web Analytics.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Quality checks

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
```

`npm run typecheck` uses TypeScript 7. The TypeScript 6 compatibility package is installed only
for tools that still depend on the legacy programmatic API.

## Content and assets

- **Theme-aware logos:** The existing `public/logos/DG logo white.png` is used in dark mode and `public/logos/DG logo dark.png` in light mode.
- **CV PDF:** The embedded and downloadable English CV is stored at `public/cv/dimitris-giannopoulos-cv.pdf`.
- **Project screenshots:** Screenshots are stored in `public/projects/call-center-frontend/` and `public/projects/call-center-backend/`. Their paths and localized descriptions are configured in `data/projects.ts` and displayed in responsive galleries.
- **Project documentation:** Each full project card reads `PROJECT_ROADMAP.md` and `PROJECT_UPDATES.md` from the repository and branch configured in `data/projects.ts`. The Projects page refreshes selected sections from GitHub at most every five minutes, keeps each document collapsed initially, and links to the complete source file. Public repositories require no GitHub token.
- **Staging branch:** Edit the single `STAGING_BRANCH` value in `data/projects.ts` whenever you deliberately want the staging branch link to point elsewhere. Staging app and API URLs remain fixed; no automatic branch selection is used.
- **Text and skills:** Edit `data/translations.ts`, `data/skills.ts`, and `data/projects.ts` rather than repeating content inside components.

## Deploy to Vercel

1. Push this repository to GitHub and import it in Vercel, or run `vercel` from the repository after signing in.
2. Vercel detects Next.js automatically. No environment variables are needed for this static portfolio.
3. In Vercel, add `dimgianno.com` as the production domain and add `www.dimgianno.com` as a second domain.
4. Point the DNS records shown by Vercel at your domain provider. `vercel.json` redirects `www.dimgianno.com` to `dimgianno.com`.
5. Enable Web Analytics in the Vercel project dashboard. The `<Analytics />` component is already included in `app/layout.tsx`.

## Available routes

- `/` — home
- `/projects` — project portfolio
- `/cv` — web CV with an embedded and downloadable English PDF
