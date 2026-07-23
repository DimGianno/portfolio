import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/ProjectsPageContent";
import { projects } from "@/data/projects";
import { loadProjectDocumentation } from "@/lib/projectDocumentation";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected web applications and API projects by Dimitris Giannopoulos.",
};

export default async function ProjectsPage() {
  const documentation = await loadProjectDocumentation(projects);

  return <ProjectsPageContent documentation={documentation} />;
}
