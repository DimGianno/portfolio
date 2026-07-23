"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useId } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSite } from "@/components/SiteProvider";
import type { ProjectDocumentResult, ProjectDocumentation } from "@/lib/projectDocumentation";

function DocumentDisclosure({
  document,
  filename,
  title,
}: {
  document: ProjectDocumentResult;
  filename: string;
  title: string;
}) {
  const { t } = useSite();

  return (
    <details className="project-document-disclosure">
      <summary>
        <span>
          <strong>{title}</strong>
          <small>{filename}</small>
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </summary>
      <div className="project-document-content">
        {document.status === "unavailable" ? (
          <p className="project-document-message">{t.projects.documentationUnavailable}</p>
        ) : document.markdown ? (
          <div className="project-markdown">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => {
                  void node;
                  return <a {...props} target="_blank" rel="noreferrer" />;
                },
              }}
            >
              {document.markdown}
            </Markdown>
          </div>
        ) : (
          <p className="project-document-message">{t.projects.documentationEmpty}</p>
        )}
        <a
          className="project-document-source"
          href={document.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          {t.projects.viewFullDocument} <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </details>
  );
}

export function ProjectDocumentationPanel({
  documentation,
}: {
  documentation: ProjectDocumentation;
}) {
  const { locale, t } = useSite();
  const headingId = useId();

  return (
    <section className="project-documentation" aria-labelledby={headingId}>
      <div className="project-documentation-heading">
        <div>
          <h4 id={headingId}>{t.projects.documentation}</h4>
          <p>{t.projects.syncedFromGitHub}</p>
        </div>
      </div>
      {locale === "el" && (
        <p className="project-document-language-note">{t.projects.englishSourceNotice}</p>
      )}
      <div className="project-document-list">
        <DocumentDisclosure
          document={documentation.roadmap}
          filename="PROJECT_ROADMAP.md"
          title={t.projects.roadmap}
        />
        <DocumentDisclosure
          document={documentation.updates}
          filename="PROJECT_UPDATES.md"
          title={t.projects.updates}
        />
      </div>
    </section>
  );
}
