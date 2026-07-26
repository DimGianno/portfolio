import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteProvider } from "@/components/SiteProvider";
import { projects } from "@/data/projects";

function renderProject(slug: (typeof projects)[number]["slug"]) {
  const project = projects.find((candidate) => candidate.slug === slug);

  if (!project) throw new Error(`Missing project fixture: ${slug}`);

  return render(
    <SiteProvider>
      <ProjectCard project={project} />
    </SiteProvider>,
  );
}

describe("ProjectCard actions", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
  });

  it("shows only the available Chromaflow actions", () => {
    renderProject("chromaflow");

    expect(screen.getByRole("link", { name: "Production" })).toHaveAttribute(
      "href",
      "https://chromaflow.dimgianno.com/",
    );
    expect(screen.getByRole("link", { name: "GitHub repository" })).toHaveAttribute(
      "href",
      "https://github.com/DimGianno/water-sort-solver",
    );
    expect(screen.queryByRole("link", { name: "Staging" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Staging branch" })).not.toBeInTheDocument();
  });

  it("preserves existing project actions except for the removed staging branch action", () => {
    renderProject("frontend");

    expect(screen.getByRole("link", { name: "Production" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Staging" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub repository" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Staging branch" })).not.toBeInTheDocument();
  });
});
