"use client";

import { skillGroups } from "@/data/skills";
import { useSite } from "@/components/SiteProvider";
import { AnimatedSection } from "@/components/AnimatedSection";

export function SkillsSection() {
  const { t } = useSite();
  return (
    <AnimatedSection className="section section-soft" id="skills">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{t.home.skillsEyebrow}</p>
          <h2>{t.home.skillsTitle}</h2>
          <p>{t.home.skillsCopy}</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tags">
                {group.skills.map((skill) => (
                  <span className="tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
