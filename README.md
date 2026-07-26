# dimgianno.com portfolio

Personal portfolio for Dimitris Giannopoulos, built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Vercel Web Analytics.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` and set `GITHUB_TOKEN` to a GitHub token with
read access to the profile contribution calendar. The token is used only by the server and enables
the live GitHub contribution graph on the home page.

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
- **Project previews:** The Chromaflow social preview and Call Center screenshots are stored under `public/projects/`. Their paths and localized descriptions are configured in `data/projects.ts` and displayed in responsive galleries.
- **Credentials:** Credential details and verification links are configured in `data/credentials.ts`. Official issuer artwork is stored in `public/credentials/` and displayed in an automatic home-page carousel with desktop arrow and dot navigation, mobile swipe navigation, hover and keyboard-focus pausing, and reduced-motion support.
- **Project documentation:** Each full project card reads `PROJECT_ROADMAP.md` and `PROJECT_UPDATES.md` from the repository and branch configured in `data/projects.ts`. The Projects page refreshes selected sections from GitHub at most every five minutes, keeps each document collapsed initially, and links to the complete source file. Public repositories require no GitHub token.
- **Project actions:** Each project displays only its configured production, staging, and repository destinations. Chromaflow has production and repository actions, while the Call Center projects also retain their staging deployment actions.
- **Text and skills:** Edit `data/translations.ts`, `data/skills.ts`, and `data/projects.ts` rather than repeating content inside components.
- **GitHub activity:** The home page reads the `DimGianno` contribution calendar through GitHub's GraphQL API, caches successful requests for one hour, and shows a profile link if the calendar is unavailable. Configure `GITHUB_TOKEN` locally and in Vercel; private contribution counts require the relevant GitHub profile visibility and token permissions.

## Deploy to Vercel

1. Push this repository to GitHub and import it in Vercel, or run `vercel` from the repository after signing in.
2. Vercel detects Next.js automatically. Add `GITHUB_TOKEN` to the Vercel project's environment variables so the home-page contribution calendar can load.
3. In Vercel, add `dimgianno.com` as the production domain and add `www.dimgianno.com` as a second domain.
4. Point the DNS records shown by Vercel at your domain provider. `vercel.json` redirects `www.dimgianno.com` to `dimgianno.com`.
5. Enable Web Analytics in the Vercel project dashboard. The `<Analytics />` component is already included in `app/layout.tsx`.

## Available routes

- `/` — home
- `/projects` — project portfolio
- `/cv` — web CV with an embedded and downloadable English PDF
