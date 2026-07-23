"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useSite } from "@/components/SiteProvider";
import { projects } from "@/data/projects";
import type { ProjectDocumentationMap } from "@/lib/projectDocumentation";

export function ProjectsPageContent({ documentation }: { documentation: ProjectDocumentationMap }) {
  const { t } = useSite();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.projects.eyebrow}</p>
          <h1>{t.projects.title}</h1>
          <p>{t.projects.copy}</p>
        </div>
      </section>
      <AnimatedSection className="section section-last">
        <div className="container">
          <div className="project-grid project-grid-full">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                documentation={documentation[project.slug]}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
