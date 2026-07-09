"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, GitBranch, ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";
import { useSite } from "@/components/SiteProvider";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { locale, t } = useSite();
  const links = [
    { href: project.productionUrl, label: t.projects.production, icon: ExternalLink },
    { href: project.stagingUrl, label: t.projects.staging, icon: ExternalLink },
    { href: project.repositoryUrl, label: t.projects.source, icon: GitBranch },
    { href: project.stagingBranchUrl, label: t.projects.stagingBranch, icon: Code2 },
  ];

  return (
    <motion.article className="project-card" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <div className={`screenshot-placeholder ${project.slug}`} aria-label={t.projects.screenshot}>
        <div className="placeholder-grid" />
        <div className="placeholder-content"><ImageIcon size={22} aria-hidden="true" /><span>{t.projects.screenshotSoon}</span></div>
      </div>
      <div className="project-body">
        <div className="project-heading">
          <div>
            <p className="project-status"><span className="status-dot" /> {project.status}</p>
            <h3>{project.title}</h3>
          </div>
          <ArrowUpRight className="project-arrow" size={21} aria-hidden="true" />
        </div>
        <p className="project-description">{project.description[locale]}</p>
        <div className="tags" aria-label={t.projects.stack}>{project.stack.map((item) => <span key={item} className="tag">{item}</span>)}</div>
        {!compact && <div className="project-links">{links.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={14} aria-hidden="true" /> {label}</a>)}</div>}
      </div>
    </motion.article>
  );
}
