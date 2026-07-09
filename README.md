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
npm run lint
npm run build
npm run start
```

## Content and assets

- **Theme-aware logos:** The existing `public/logos/DG logo white.png` is used in dark mode and `public/logos/DG logo dark.png` in light mode.
- **CV PDF:** Add the final English PDF at `public/cv/dimitris-giannopoulos-cv.pdf`. Then update `components/CvPageContent.tsx` to change the disabled button into a link to `/cv/dimitris-giannopoulos-cv.pdf`.
- **Project screenshots:** Put screenshots in `public/projects/call-center-frontend/` and `public/projects/call-center-backend/`. The cards intentionally display a placeholder until real images are wired in.
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
- `/cv` — web CV placeholder
