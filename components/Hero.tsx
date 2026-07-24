"use client";

import { useEffect, useRef, useState } from "react";
import type { FocusEvent, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Mail,
  Pause,
  Play,
} from "lucide-react";
import { ThemedLogo } from "@/components/ThemedLogo";
import { useSite } from "@/components/SiteProvider";
import { credentials } from "@/data/credentials";

const socialLinks = [
  { href: "https://github.com/DimGianno", key: "github", icon: Code2 },
  { href: "https://www.linkedin.com/in/dimgianno/", key: "linkedin", icon: BriefcaseBusiness },
  { href: "mailto:giannopoulos1996@icloud.com", key: "email", icon: Mail },
] as const;

const CREDENTIAL_ROTATION_INTERVAL = 5000;
const CREDENTIAL_SWIPE_THRESHOLD = 45;

export function Hero() {
  const { locale, t } = useSite();
  const shouldReduceMotion = useReducedMotion();
  const [activeCredentialIndex, setActiveCredentialIndex] = useState(0);
  const [isCredentialCarouselPaused, setIsCredentialCarouselPaused] = useState(false);
  const [isCredentialCarouselFocusPaused, setIsCredentialCarouselFocusPaused] = useState(false);
  const credentialSwipeStart = useRef<{ x: number; y: number } | null>(null);
  const isCredentialAutoRotationPaused =
    isCredentialCarouselPaused || isCredentialCarouselFocusPaused;
  const name = locale === "el" ? "Δημήτρης Γιαννόπουλος" : "Dimitris Giannopoulos";
  const activeCredential = credentials[activeCredentialIndex];
  const credentialDateFormatter = new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  useEffect(() => {
    if (credentials.length < 2 || isCredentialAutoRotationPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveCredentialIndex((current) => (current + 1) % credentials.length);
    }, CREDENTIAL_ROTATION_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [activeCredentialIndex, isCredentialAutoRotationPaused]);

  const showPreviousCredential = () => {
    setActiveCredentialIndex((current) => (current - 1 + credentials.length) % credentials.length);
  };

  const showNextCredential = () => {
    setActiveCredentialIndex((current) => (current + 1) % credentials.length);
  };

  const handleCredentialCarouselFocus = (event: FocusEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    setIsCredentialCarouselFocusPaused(target.dataset.carouselRotationControl !== "true");
  };

  const handleCredentialCarouselBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsCredentialCarouselFocusPaused(false);
    }
  };

  const handleCredentialTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;

    credentialSwipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleCredentialTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const start = credentialSwipeStart.current;
    credentialSwipeStart.current = null;
    if (!touch || !start) return;

    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;
    if (
      Math.abs(horizontalDistance) < CREDENTIAL_SWIPE_THRESHOLD ||
      Math.abs(horizontalDistance) <= Math.abs(verticalDistance)
    ) {
      return;
    }

    if (horizontalDistance < 0) {
      showNextCredential();
    } else {
      showPreviousCredential();
    }
  };

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
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.54 }}
          className="hero-credentials"
        >
          <p className="hero-credentials-label">{t.hero.featuredCredential}</p>
          <div
            className="hero-credential-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label={t.hero.credentialsCarousel}
            onFocusCapture={handleCredentialCarouselFocus}
            onBlurCapture={handleCredentialCarouselBlur}
          >
            <div
              className="hero-credential-viewport"
              onTouchStart={handleCredentialTouchStart}
              onTouchEnd={handleCredentialTouchEnd}
            >
              <div key={activeCredential.id} className="hero-credential-frame">
                <a
                  href={activeCredential.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-credential-card"
                  aria-label={`${t.hero.verifyCredential}: ${activeCredential.title}`}
                >
                  <span className="hero-credential-logo">
                    <Image
                      src={activeCredential.image}
                      alt=""
                      width={64}
                      height={64}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="hero-credential-copy">
                    <span className="hero-credential-status">
                      <BadgeCheck size={15} aria-hidden="true" />
                      {t.hero.verifiedCredential}
                    </span>
                    <strong>{activeCredential.title}</strong>
                    <span>
                      {t.hero.issuedBy} {activeCredential.issuer} ·{" "}
                      {credentialDateFormatter.format(
                        new Date(`${activeCredential.issuedOn}T00:00:00.000Z`),
                      )}
                    </span>
                  </span>
                  <ArrowUpRight className="hero-credential-arrow" size={18} aria-hidden="true" />
                </a>
                {credentials.length > 1 ? (
                  <span
                    key={`${activeCredentialIndex}-${isCredentialAutoRotationPaused}`}
                    className={`hero-credential-border-progress${
                      isCredentialAutoRotationPaused ? " paused" : ""
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            </div>
            {credentials.length > 1 ? (
              <div className="hero-credential-controls">
                <button
                  type="button"
                  className="hero-credential-control"
                  onClick={showPreviousCredential}
                  aria-label={t.hero.previousCredential}
                >
                  <ChevronLeft size={17} aria-hidden="true" />
                </button>
                <div className="hero-credential-dots">
                  {credentials.map((credential, index) => (
                    <button
                      key={credential.id}
                      type="button"
                      className={index === activeCredentialIndex ? "active" : undefined}
                      onClick={() => setActiveCredentialIndex(index)}
                      aria-label={`${t.hero.viewCredential}: ${credential.title}`}
                      aria-current={index === activeCredentialIndex ? "true" : undefined}
                    />
                  ))}
                </div>
                <span
                  className="hero-credential-counter"
                  aria-label={`${t.hero.credentialPosition} ${activeCredentialIndex + 1} ${t.hero.of} ${credentials.length}`}
                >
                  {activeCredentialIndex + 1} / {credentials.length}
                </span>
                <button
                  type="button"
                  className="hero-credential-control"
                  data-carousel-rotation-control="true"
                  onClick={() => setIsCredentialCarouselPaused((current) => !current)}
                  aria-label={
                    isCredentialCarouselPaused
                      ? t.hero.playCredentialCarousel
                      : t.hero.pauseCredentialCarousel
                  }
                  aria-pressed={isCredentialCarouselPaused}
                >
                  {isCredentialCarouselPaused ? (
                    <Play size={15} aria-hidden="true" />
                  ) : (
                    <Pause size={15} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  className="hero-credential-control"
                  onClick={showNextCredential}
                  aria-label={t.hero.nextCredential}
                >
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62 }}
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
