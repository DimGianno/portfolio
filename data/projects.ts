export type Project = {
  slug: "frontend" | "backend";
  title: string;
  status: string;
  stack: string[];
  description: { en: string; el: string };
  productionUrl: string;
  stagingUrl: string;
  repositoryUrl: string;
  stagingBranchUrl: string;
  screenshotDirectory: string;
};

// Change this one value whenever you intentionally promote a different branch to staging.
export const STAGING_BRANCH = "staging";

const frontendRepository = "https://github.com/DimGianno/Call-Center-Frontend";
const backendRepository = "https://github.com/DimGianno/Call-Center-BackEnd";

export const projects: Project[] = [
  {
    slug: "frontend",
    title: "Call Center Frontend",
    status: "Live / Polished",
    stack: ["React", "Vite", "TypeScript", "CSS", "Vercel"],
    description: {
      en: "A responsive call-center dashboard with filtering, pagination, active/archived views, call details, notes, loading/error states, and production/staging deployments.",
      el: "Ένα responsive call-center dashboard με filtering, pagination, active/archived views, λεπτομέρειες κλήσεων, σημειώσεις, loading/error states και production/staging deployments.",
    },
    productionUrl: "https://call-center.dimgianno.com/",
    stagingUrl: "https://call-center-staging.dimgianno.com/",
    repositoryUrl: frontendRepository,
    stagingBranchUrl: `${frontendRepository}/tree/${STAGING_BRANCH}`,
    screenshotDirectory: "/projects/call-center-frontend/",
  },
  {
    slug: "backend",
    title: "Call Center Backend API",
    status: "Live / Polished",
    stack: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "Jest",
      "Swagger/OpenAPI",
      "Render",
      "GitHub Actions",
    ],
    description: {
      en: "A REST API for managing call-center data, including filtering, pagination, archiving, notes, deletion, validation, Swagger documentation, tests, CI/CD, and production/staging environments.",
      el: "Ένα REST API για διαχείριση call-center δεδομένων, με filtering, pagination, archiving, σημειώσεις, deletion, validation, Swagger documentation, tests, CI/CD και production/staging environments.",
    },
    productionUrl: "https://api.call-center.dimgianno.com/api-docs",
    stagingUrl: "https://api-staging.call-center.dimgianno.com/api-docs",
    repositoryUrl: backendRepository,
    stagingBranchUrl: `${backendRepository}/tree/${STAGING_BRANCH}`,
    screenshotDirectory: "/projects/call-center-backend/",
  },
];
