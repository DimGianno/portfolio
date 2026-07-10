"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Code2, FileText, Mail } from "lucide-react";
import { ThemedLogo } from "@/components/ThemedLogo";
import { useSite } from "@/components/SiteProvider";

const socialLinks = [
  { href: "https://github.com/DimGianno", key: "github", icon: Code2 },
  { href: "https://www.linkedin.com/in/dimgianno/", key: "linkedin", icon: BriefcaseBusiness },
  { href: "mailto:giannopoulos1996@icloud.com", key: "email", icon: Mail },
] as const;

export function Hero() {
  const { locale, t } = useSite();
  const name = locale === "el" ? "Δημήτρης Γιαννόπουλος" : "Dimitris Giannopoulos";

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-logo-wrap"
        >
          <ThemedLogo hero />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="eyebrow"
        >
          <span className="status-dot" /> {t.hero.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.55 }}
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.55 }}
          className="hero-title"
        >
          Junior Full Stack Developer
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55 }}
          className="hero-intro"
        >
          {t.hero.intro}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="hero-actions"
        >
          <Link href="/projects" className="button button-primary">
            {t.hero.projects} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/cv" className="button button-secondary">
            <FileText size={17} aria-hidden="true" /> {t.hero.cv}
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.54 }}
          className="social-links"
        >
          {socialLinks.map(({ href, key, icon: Icon }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="social-link"
            >
              <Icon size={16} aria-hidden="true" /> {t.hero[key]}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
