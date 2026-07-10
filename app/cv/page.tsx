import type { Metadata } from "next";
import { CvPageContent } from "@/components/CvPageContent";

export const metadata: Metadata = {
  title: "CV",
  description: "Web CV for Dimitris Giannopoulos, Junior Full Stack Developer.",
};

export default function CvPage() {
  return <CvPageContent />;
}
