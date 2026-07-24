export type Credential = {
  id: string;
  title: string;
  issuer: string;
  issuedOn: string;
  verificationUrl: string;
  image: string;
};

export const credentials = [
  {
    id: "devready-accelerator-program",
    title: "DevReady Accelerator Program",
    issuer: "DevReady",
    issuedOn: "2026-06-06",
    verificationUrl: "https://verified.sertifier.com/en/verify/72687204173401/",
    image: "/credentials/devready.png",
  },
  {
    id: "mongodb-overview-core-concepts-architecture",
    title: "MongoDB Overview: Core Concepts and Architecture",
    issuer: "MongoDB",
    issuedOn: "2026-07-24",
    verificationUrl:
      "https://www.credly.com/badges/2dda992c-d8c3-4046-8c63-bd5a5b810cc4/public_url",
    image: "/credentials/mongodb-overview.png",
  },
] as const satisfies readonly Credential[];
