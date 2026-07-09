"use client";

import { Download, FileText, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useSite } from "@/components/SiteProvider";

export function CvPageContent() {
  const { t } = useSite();
  return <><section className="page-hero"><div className="container"><p className="eyebrow">{t.cv.eyebrow}</p><h1>{t.cv.title}</h1><p>{t.cv.copy}</p><div className="cv-download-wrap"><button type="button" className="button button-disabled" disabled aria-disabled="true"><Download size={17} aria-hidden="true" /> {t.cv.download}</button><span>{t.cv.comingSoon}</span></div></div></section><AnimatedSection className="section section-last"><div className="container cv-layout"><article className="cv-profile-card"><div className="cv-mark"><FileText size={24} aria-hidden="true" /></div><p className="eyebrow">Dimitris Giannopoulos</p><h2>Junior Full Stack Developer</h2><p>{t.cv.profileCopy}</p><div className="cv-contact"><a href="mailto:giannopoulos1996@icloud.com">giannopoulos1996@icloud.com</a><a href="https://www.linkedin.com/in/dimgianno/" target="_blank" rel="noreferrer">linkedin.com/in/dimgianno</a></div></article><div className="cv-details"><article><Sparkles size={19} aria-hidden="true" /><h2>{t.cv.focus}</h2><p>{t.cv.focusCopy}</p></article><article><FileText size={19} aria-hidden="true" /><h2>{t.cv.experience}</h2><ul>{t.cv.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article></div></div></AnimatedSection></>;
}
