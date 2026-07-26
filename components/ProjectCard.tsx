"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/data/projects";
import { useSite } from "@/components/SiteProvider";
import { ProjectDocumentationPanel } from "@/components/ProjectDocumentation";
import type { ProjectDocumentation } from "@/lib/projectDocumentation";

export function ProjectCard({
  project,
  compact = false,
  documentation,
}: {
  project: Project;
  compact?: boolean;
  documentation?: ProjectDocumentation;
}) {
  const { locale, t } = useSite();
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const screenshot = project.screenshots[activeScreenshot];
  const links = [
    { href: project.productionUrl, label: t.projects.production, icon: ExternalLink },
    ...(project.stagingUrl
      ? [{ href: project.stagingUrl, label: t.projects.staging, icon: ExternalLink }]
      : []),
    { href: project.repositoryUrl, label: t.projects.source, icon: GitBranch },
  ];

  const showPreviousScreenshot = () => {
    setActiveScreenshot((current) =>
      current === 0 ? project.screenshots.length - 1 : current - 1,
    );
  };

  const showNextScreenshot = () => {
    setActiveScreenshot((current) => (current + 1) % project.screenshots.length);
  };

  return (
    <motion.article
      className={`project-card${compact ? " project-card-compact" : ""}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`project-gallery ${project.slug}`}
        role="group"
        aria-label={`${project.title}: ${t.projects.screenshot}`}
      >
        <Image
          key={screenshot.src}
          src={screenshot.src}
          alt={screenshot.alt[locale]}
          fill
          className="project-screenshot"
          sizes={
            compact
              ? "(max-width: 800px) calc(100vw - 28px), 550px"
              : "(max-width: 800px) calc(100vw - 28px), 1120px"
          }
        />
        {project.screenshots.length > 1 && (
          <div className="project-gallery-controls">
            <button
              type="button"
              onClick={showPreviousScreenshot}
              aria-label={`${t.projects.previousScreenshot}: ${project.title}`}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <span aria-live="polite">
              {activeScreenshot + 1} / {project.screenshots.length}
            </span>
            <button
              type="button"
              onClick={showNextScreenshot}
              aria-label={`${t.projects.nextScreenshot}: ${project.title}`}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <div className="project-body">
        <div className="project-heading">
          <div>
            <p className="project-status">
              <span className="status-dot" /> {project.status}
            </p>
            <h3>{project.title}</h3>
          </div>
          <ArrowUpRight className="project-arrow" size={21} aria-hidden="true" />
        </div>
        <p className="project-description">{project.description[locale]}</p>
        <div className="tags" aria-label={t.projects.stack}>
          {project.stack.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
        {!compact && (
          <>
            <div className="project-links">
              {links.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  <Icon size={14} aria-hidden="true" /> {label}
                </a>
              ))}
            </div>
            {documentation && <ProjectDocumentationPanel documentation={documentation} />}
          </>
        )}
      </div>
    </motion.article>
  );
}
