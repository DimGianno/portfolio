"use client";

import { Download, ExternalLink, FileText, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useSite } from "@/components/SiteProvider";

export function CvPageContent() {
  const { t } = useSite();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.cv.eyebrow}</p>
          <h1>{t.cv.title}</h1>
          <p>{t.cv.copy}</p>
          <div className="cv-download-wrap">
            <a href="/cv/dimitris-giannopoulos-cv.pdf" className="button button-primary" download>
              <Download size={17} aria-hidden="true" /> {t.cv.download}
            </a>
          </div>
        </div>
      </section>
      <AnimatedSection className="section cv-document-section">
        <div className="container">
          <div className="cv-document-heading">
            <div>
              <p className="eyebrow">{t.cv.documentEyebrow}</p>
              <h2>{t.cv.documentTitle}</h2>
            </div>
            <a
              href="/cv/dimitris-giannopoulos-cv.pdf"
              className="button button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={17} aria-hidden="true" /> {t.cv.openPdf}
            </a>
          </div>
          <div className="cv-document-shell">
            <object
              data="/cv/dimitris-giannopoulos-cv.pdf#view=FitH"
              type="application/pdf"
              className="cv-document"
              aria-label={t.cv.documentTitle}
            >
              <p>
                {t.cv.pdfFallback}{" "}
                <a href="/cv/dimitris-giannopoulos-cv.pdf" target="_blank" rel="noreferrer">
                  {t.cv.openPdf}
                </a>
              </p>
            </object>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="section section-last">
        <div className="container cv-layout">
          <article className="cv-profile-card">
            <div className="cv-mark">
              <FileText size={24} aria-hidden="true" />
            </div>
            <p className="eyebrow">Dimitris Giannopoulos</p>
            <h2>Junior Full Stack Developer</h2>
            <p>{t.cv.profileCopy}</p>
            <div className="cv-contact">
              <a href="mailto:giannopoulos1996@icloud.com">giannopoulos1996@icloud.com</a>
              <a href="https://www.linkedin.com/in/dimgianno/" target="_blank" rel="noreferrer">
                linkedin.com/in/dimgianno
              </a>
            </div>
          </article>
          <div className="cv-details">
            <article>
              <Sparkles size={19} aria-hidden="true" />
              <h2>{t.cv.focus}</h2>
              <p>{t.cv.focusCopy}</p>
            </article>
            <article>
              <FileText size={19} aria-hidden="true" />
              <h2>{t.cv.experience}</h2>
              <ul>
                {t.cv.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
