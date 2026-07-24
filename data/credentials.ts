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
] as const satisfies readonly Credential[];
