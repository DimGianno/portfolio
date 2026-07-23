import type { Project } from "@/data/projects";

const DOCUMENT_REVALIDATE_SECONDS = 300;

type DocumentKind = "roadmap" | "updates";

export type ProjectDocumentResult = {
  markdown: string;
  sourceUrl: string;
  status: "ready" | "unavailable";
};

export type ProjectDocumentation = Record<DocumentKind, ProjectDocumentResult>;

export type ProjectDocumentationMap = Partial<Record<Project["slug"], ProjectDocumentation>>;

type MarkdownSection = {
  title: string;
  content: string;
  sourceIndex: number;
};

function normalizeMarkdown(markdown: string) {
  return markdown.replace(/\r\n?/g, "\n").trim();
}

function splitByHeading(markdown: string, level: 2 | 3): MarkdownSection[] {
  const normalized = normalizeMarkdown(markdown);
  const marker = "#".repeat(level);
  const headingPattern = new RegExp(`^${marker}\\s+(.+?)\\s*$`, "gm");
  const matches = [...normalized.matchAll(headingPattern)];

  return matches.map((match, sourceIndex) => {
    const contentStart = (match.index ?? 0) + match[0].length;
    const contentEnd = matches[sourceIndex + 1]?.index ?? normalized.length;

    return {
      title: match[1].trim(),
      content: normalized.slice(contentStart, contentEnd).trim(),
      sourceIndex,
    };
  });
}

function findSection(markdown: string, title: string) {
  return splitByHeading(markdown, 2).find(
    (section) => section.title.toLocaleLowerCase() === title.toLocaleLowerCase(),
  );
}

function renderSection(title: string, content: string) {
  return `## ${title}\n\n${content}`.trim();
}

function renderSubsection(section: MarkdownSection) {
  return `### ${section.title}\n\n${section.content}`.trim();
}

function readMetadata(content: string, key: string) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = content.match(new RegExp(`^-\\s+\\*\\*${escapedKey}:\\*\\*\\s+(.+?)\\s*$`, "im"));
  return match?.[1].trim();
}

function selectRankedSubsections(
  section: MarkdownSection | undefined,
  metadataKey: "Severity" | "Priority",
  limit: number,
) {
  if (!section) return [];

  const ranks = new Map([
    ["high", 0],
    ["medium", 1],
    ["low", 2],
  ]);

  return splitByHeading(section.content, 3)
    .map((subsection) => {
      const value = readMetadata(subsection.content, metadataKey)?.toLocaleLowerCase();
      return { subsection, rank: value ? ranks.get(value) : undefined };
    })
    .filter(
      (entry): entry is { subsection: MarkdownSection; rank: number } => entry.rank !== undefined,
    )
    .sort(
      (left, right) =>
        left.rank - right.rank || left.subsection.sourceIndex - right.subsection.sourceIndex,
    )
    .slice(0, limit)
    .map(({ subsection }) => subsection);
}

export function selectRoadmapSections(markdown: string) {
  const selected: string[] = [];
  const currentStatus = findSection(markdown, "Current Status");
  const limitationsSection = findSection(markdown, "Known Limitations");
  const featuresSection = findSection(markdown, "Next Features");

  if (currentStatus) selected.push(renderSection(currentStatus.title, currentStatus.content));

  const limitations = selectRankedSubsections(limitationsSection, "Severity", 2);
  if (limitations.length > 0 && limitationsSection) {
    selected.push(
      renderSection(limitationsSection.title, limitations.map(renderSubsection).join("\n\n")),
    );
  }

  const features = selectRankedSubsections(featuresSection, "Priority", 2);
  if (features.length > 0 && featuresSection) {
    selected.push(
      renderSection(featuresSection.title, features.map(renderSubsection).join("\n\n")),
    );
  }

  return selected.join("\n\n");
}

function parseUpdateDate(title: string) {
  const match = title.match(/^(\d{4}-\d{2}-\d{2})(?:\s|$)/);
  if (!match) return undefined;

  const timestamp = Date.parse(`${match[1]}T00:00:00Z`);
  return Number.isNaN(timestamp) ? undefined : timestamp;
}

export function selectUpdateSections(markdown: string) {
  const selected: string[] = [];
  const stableState = findSection(markdown, "Latest Stable State");
  const summary = findSection(markdown, "Current Project Summary");
  const updatesSection = findSection(markdown, "Latest Updates");

  if (stableState) selected.push(renderSection(stableState.title, stableState.content));
  if (summary) selected.push(renderSection(summary.title, summary.content));

  if (updatesSection) {
    const updates = splitByHeading(updatesSection.content, 3)
      .map((subsection) => ({ subsection, timestamp: parseUpdateDate(subsection.title) }))
      .filter(
        (entry): entry is { subsection: MarkdownSection; timestamp: number } =>
          entry.timestamp !== undefined,
      )
      .sort(
        (left, right) =>
          right.timestamp - left.timestamp ||
          left.subsection.sourceIndex - right.subsection.sourceIndex,
      )
      .slice(0, 3)
      .map(({ subsection }) => subsection);

    if (updates.length > 0) {
      selected.push(
        renderSection(updatesSection.title, updates.map(renderSubsection).join("\n\n")),
      );
    }
  }

  return selected.join("\n\n");
}

function encodePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function createDocumentUrls(project: Project, kind: DocumentKind) {
  const path =
    kind === "roadmap" ? project.documentation.roadmapPath : project.documentation.updatesPath;
  const { repository, branch } = project.documentation;
  const encodedPath = encodePath(path);

  return {
    rawUrl: `https://raw.githubusercontent.com/${repository}/${encodeURIComponent(branch)}/${encodedPath}`,
    sourceUrl: `https://github.com/${repository}/blob/${encodeURIComponent(branch)}/${encodedPath}`,
  };
}

async function fetchProjectDocument(project: Project, kind: DocumentKind) {
  const { rawUrl, sourceUrl } = createDocumentUrls(project, kind);

  try {
    const response = await fetch(rawUrl, {
      headers: { Accept: "text/plain" },
      next: { revalidate: DOCUMENT_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return { markdown: "", sourceUrl, status: "unavailable" } satisfies ProjectDocumentResult;
    }

    const markdown = await response.text();
    return {
      markdown:
        kind === "roadmap" ? selectRoadmapSections(markdown) : selectUpdateSections(markdown),
      sourceUrl,
      status: "ready",
    } satisfies ProjectDocumentResult;
  } catch {
    return { markdown: "", sourceUrl, status: "unavailable" } satisfies ProjectDocumentResult;
  }
}

export async function loadProjectDocumentation(projectList: Project[]) {
  const entries = await Promise.all(
    projectList.map(async (project) => {
      const [roadmap, updates] = await Promise.all([
        fetchProjectDocument(project, "roadmap"),
        fetchProjectDocument(project, "updates"),
      ]);

      return [project.slug, { roadmap, updates }] as const;
    }),
  );

  return Object.fromEntries(entries) as ProjectDocumentationMap;
}
