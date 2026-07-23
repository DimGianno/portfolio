import { describe, expect, it, vi } from "vitest";
import { projects } from "@/data/projects";
import {
  loadProjectDocumentation,
  selectRoadmapSections,
  selectUpdateSections,
} from "@/lib/projectDocumentation";

describe("project documentation selection", () => {
  it("keeps current status and selects limitations and features by rank with stable ties", () => {
    const markdown = [
      "# Project Roadmap",
      "## Current Status",
      "- **Project maturity:** Active",
      "## Known Limitations",
      "### Medium first",
      "- **Severity:** Medium",
      "### High first",
      "- **Severity:** High",
      "### High second",
      "- **Severity:** High",
      "### Low item",
      "- **Severity:** Low",
      "## Next Features",
      "### Medium feature",
      "- **Priority:** Medium",
      "### High feature",
      "- **Priority:** High",
      "### Low feature",
      "- **Priority:** Low",
    ].join("\r\n");

    const selected = selectRoadmapSections(markdown);

    expect(selected).toContain("Project maturity");
    expect(selected).toContain("High first");
    expect(selected).toContain("High second");
    expect(selected).not.toContain("Medium first");
    expect(selected).toContain("High feature");
    expect(selected).toContain("Medium feature");
    expect(selected).not.toContain("Low feature");
    expect(selected.indexOf("High first")).toBeLessThan(selected.indexOf("High second"));
  });

  it("omits missing sections and malformed ranked entries without substituting them", () => {
    const markdown = `# Project Roadmap

## Known Limitations

### Missing severity

- **Area:** Quality

### Recognized limitation

- **Severity:** Medium

## Next Features

### Unknown priority

- **Priority:** Urgent`;

    const selected = selectRoadmapSections(markdown);

    expect(selected).toContain("Recognized limitation");
    expect(selected).not.toContain("Missing severity");
    expect(selected).not.toContain("Unknown priority");
    expect(selected).not.toContain("Current Status");
  });

  it("selects the three newest valid update headings and preserves source order for ties", () => {
    const markdown = `# Project Updates

## Latest Stable State

- **Current status:** Active

## Current Project Summary

Summary copy.

## Latest Updates

### 2026-07-20 - First same-day update

First.

### Not a dated update

Malformed.

### 2026-07-22 - Newest update

Newest.

### 2026-07-20 - Second same-day update

Second.

### 2026-07-19 - Old update

Old.`;

    const selected = selectUpdateSections(markdown);

    expect(selected).toContain("Latest Stable State");
    expect(selected).toContain("Current Project Summary");
    expect(selected).toContain("Newest update");
    expect(selected).toContain("First same-day update");
    expect(selected).toContain("Second same-day update");
    expect(selected).not.toContain("Not a dated update");
    expect(selected).not.toContain("Old update");
    expect(selected.indexOf("First same-day update")).toBeLessThan(
      selected.indexOf("Second same-day update"),
    );
  });

  it("keeps successful documents available when the other GitHub request fails", async () => {
    const fetchMock = vi.fn(async (url: string | URL | Request) => {
      const value = String(url);
      if (value.includes("PROJECT_ROADMAP.md")) {
        return new Response("Not found", { status: 404 });
      }

      return new Response(
        `## Latest Stable State

- **Current status:** Active

## Current Project Summary

Summary.

## Latest Updates

### 2026-07-22 - Latest

Latest update.`,
        { status: 200 },
      );
    });
    vi.stubGlobal("fetch", fetchMock);

    const documentation = await loadProjectDocumentation([projects[0]]);

    expect(documentation.frontend?.roadmap.status).toBe("unavailable");
    expect(documentation.frontend?.updates.status).toBe("ready");
    expect(documentation.frontend?.updates.markdown).toContain("Latest update");
    expect(fetchMock).toHaveBeenCalledTimes(2);

    vi.unstubAllGlobals();
  });
});
