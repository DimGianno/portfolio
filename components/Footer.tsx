"use client";

import { Code2, BriefcaseBusiness, Mail, ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/SiteProvider";

const socialLinks = [
  { href: "https://github.com/DimGianno", label: "GitHub", icon: Code2 },
  { href: "https://www.linkedin.com/in/dimgianno/", label: "LinkedIn", icon: BriefcaseBusiness },
  { href: "mailto:giannopoulos1996@icloud.com", label: "Email", icon: Mail },
];

export function Footer() {
  const { t } = useSite();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>{t.footer}</p>
        <div className="footer-links">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="footer-link"
            >
              <Icon size={15} aria-hidden="true" /> {label}{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
