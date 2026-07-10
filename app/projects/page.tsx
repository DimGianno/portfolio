import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected web applications and API projects by Dimitris Giannopoulos.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
