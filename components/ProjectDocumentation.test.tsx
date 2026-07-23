import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDocumentationPanel } from "@/components/ProjectDocumentation";
import { SiteProvider } from "@/components/SiteProvider";
import { projects } from "@/data/projects";
import type { ProjectDocumentation } from "@/lib/projectDocumentation";

const documentation: ProjectDocumentation = {
  roadmap: {
    markdown: "## Current Status\n\n- **Project maturity:** Production-ready",
    sourceUrl: "https://github.com/DimGianno/Call-Center-Frontend/blob/main/PROJECT_ROADMAP.md",
    status: "ready",
  },
  updates: {
    markdown: "",
    sourceUrl: "https://github.com/DimGianno/Call-Center-Frontend/blob/main/PROJECT_UPDATES.md",
    status: "unavailable",
  },
};

function renderWithSite(children: React.ReactNode) {
  return render(<SiteProvider>{children}</SiteProvider>);
}

describe("ProjectDocumentationPanel", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
  });

  it("renders collapsed disclosures, selected Markdown, source links, and independent failures", () => {
    renderWithSite(<ProjectDocumentationPanel documentation={documentation} />);

    const roadmapSummary = screen.getByText("Roadmap").closest("summary");
    const updatesSummary = screen.getByText("Updates").closest("summary");

    expect(roadmapSummary?.closest("details")).not.toHaveAttribute("open");
    expect(updatesSummary?.closest("details")).not.toHaveAttribute("open");
    expect(screen.getByText("Project maturity:")).toBeInTheDocument();
    expect(screen.getByText(/temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /complete file on GitHub/i })).toHaveLength(2);
  });

  it("shows the English-source notice when Greek is active", async () => {
    localStorage.setItem("portfolio-locale", "el");

    renderWithSite(<ProjectDocumentationPanel documentation={documentation} />);

    await waitFor(() => {
      expect(
        screen.getByText("Η τεκμηρίωση του project διατηρείται στα Αγγλικά."),
      ).toBeInTheDocument();
    });
  });

  it("does not add documentation to compact homepage project cards", () => {
    renderWithSite(<ProjectCard project={projects[0]} compact documentation={documentation} />);

    expect(screen.queryByText("Project documentation")).not.toBeInTheDocument();
    expect(screen.queryByText("PROJECT_ROADMAP.md")).not.toBeInTheDocument();
  });
});
