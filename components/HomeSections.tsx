"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Code2, FileText, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
import { useSite } from "@/components/SiteProvider";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const { t } = useSite();
  return <AnimatedSection className="section" id="featured-projects"><div className="container"><div className="section-heading split-heading"><div><p className="eyebrow">{t.home.featuredEyebrow}</p><h2>{t.home.featuredTitle}</h2></div><div><p>{t.home.featuredCopy}</p><Link href="/projects" className="text-link">{t.home.seeAll} <ArrowRight size={16} aria-hidden="true" /></Link></div></div><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} compact />)}</div></div></AnimatedSection>;
}

export function SocialSection() {
  const { t } = useSite();
  const links = [{ href: "https://github.com/DimGianno", label: "GitHub", icon: Code2 }, { href: "https://www.linkedin.com/in/dimgianno/", label: "LinkedIn", icon: BriefcaseBusiness }, { href: "mailto:giannopoulos1996@icloud.com", label: "Email", icon: Mail }];
  return <AnimatedSection className="section"><div className="container social-panel"><div><p className="eyebrow">{t.home.socialEyebrow}</p><h2>{t.home.socialTitle}</h2><p>{t.home.socialCopy}</p></div><div className="social-action-list">{links.map(({ href, label, icon: Icon }) => <a className="social-action" key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}><Icon size={19} aria-hidden="true" /><span>{label}</span><ArrowRight size={17} aria-hidden="true" /></a>)}</div></div></AnimatedSection>;
}

export function CvCallout() {
  const { t } = useSite();
  return <AnimatedSection className="section section-last"><div className="container cv-callout"><div><p className="eyebrow">{t.cv.eyebrow}</p><h2>{t.home.cvTitle}</h2><p>{t.home.cvCopy}</p></div><Link className="button button-primary" href="/cv"><FileText size={17} aria-hidden="true" /> {t.home.cvButton}</Link></div></AnimatedSection>;
}
