export type Project = {
  slug: "chromaflow" | "frontend" | "backend";
  title: string;
  status: string;
  stack: string[];
  description: { en: string; el: string };
  productionUrl: string;
  stagingUrl?: string;
  repositoryUrl: string;
  documentation: {
    repository: string;
    branch: string;
    roadmapPath: "PROJECT_ROADMAP.md";
    updatesPath: "PROJECT_UPDATES.md";
  };
  screenshots: {
    src: string;
    alt: { en: string; el: string };
  }[];
};

const chromaflowRepository = "https://github.com/DimGianno/water-sort-solver";
const frontendRepository = "https://github.com/DimGianno/Call-Center-Frontend";
const backendRepository = "https://github.com/DimGianno/Call-Center-BackEnd";

export const projects: Project[] = [
  {
    slug: "chromaflow",
    title: "Chromaflow",
    status: "Live / Tested",
    stack: [
      "JavaScript",
      "Semantic HTML",
      "Modern CSS",
      "Node.js",
      "Playwright",
      "GitHub Actions",
      "Vercel",
    ],
    description: {
      en: "An interactive Water Sort solver pairing mobile-first puzzle entry and responsive replay controls with an A* search engine, backed by automated logic and cross-browser tests.",
      el: "Ένας διαδραστικός επιλυτής Water Sort που συνδυάζει mobile-first καταχώριση γρίφων και responsive χειριστήρια αναπαραγωγής με μηχανή αναζήτησης A*, με αυτοματοποιημένες δοκιμές λογικής και cross-browser ελέγχους.",
    },
    productionUrl: "https://chromaflow.dimgianno.com/",
    repositoryUrl: chromaflowRepository,
    documentation: {
      repository: "DimGianno/water-sort-solver",
      branch: "main",
      roadmapPath: "PROJECT_ROADMAP.md",
      updatesPath: "PROJECT_UPDATES.md",
    },
    screenshots: [
      {
        src: "/projects/chromaflow/og.png",
        alt: {
          en: "Chromaflow Water Sort Solver preview showing mixed-color bottles becoming sorted by color",
          el: "Προεπισκόπηση του επιλυτή Water Sort Chromaflow με μπουκάλια ανάμεικτων χρωμάτων που ταξινομούνται ανά χρώμα",
        },
      },
    ],
  },
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
    documentation: {
      repository: "DimGianno/Call-Center-Frontend",
      branch: "main",
      roadmapPath: "PROJECT_ROADMAP.md",
      updatesPath: "PROJECT_UPDATES.md",
    },
    screenshots: [
      {
        src: "/projects/call-center-frontend/01-dashboard.png",
        alt: {
          en: "Call Center dashboard showing call totals and a paginated call list",
          el: "Dashboard του Call Center με σύνολα και σελιδοποιημένη λίστα κλήσεων",
        },
      },
      {
        src: "/projects/call-center-frontend/02-call-details.png",
        alt: {
          en: "Call details panel with notes and call management actions",
          el: "Πλαίσιο λεπτομερειών κλήσης με σημειώσεις και ενέργειες διαχείρισης",
        },
      },
      {
        src: "/projects/call-center-frontend/03-filters.png",
        alt: {
          en: "Call filters for type, direction, date range, and duration",
          el: "Φίλτρα κλήσεων για τύπο, κατεύθυνση, ημερομηνίες και διάρκεια",
        },
      },
    ],
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
    documentation: {
      repository: "DimGianno/Call-Center-BackEnd",
      branch: "master",
      roadmapPath: "PROJECT_ROADMAP.md",
      updatesPath: "PROJECT_UPDATES.md",
    },
    screenshots: [
      {
        src: "/projects/call-center-backend/01-swagger-api-docs.png",
        alt: {
          en: "Swagger documentation listing the Call Center API endpoints",
          el: "Τεκμηρίωση Swagger με τα endpoints του Call Center API",
        },
      },
      {
        src: "/projects/call-center-backend/02-api-get-calls-response.png",
        alt: {
          en: "Swagger example response from the Call Center calls endpoint",
          el: "Παράδειγμα απόκρισης Swagger από το endpoint κλήσεων του Call Center",
        },
      },
    ],
  },
];
