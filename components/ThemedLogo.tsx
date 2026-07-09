"use client";

import Image from "next/image";
import { useSite } from "@/components/SiteProvider";

export function ThemedLogo({ hero = false }: { hero?: boolean }) {
  const { theme } = useSite();
  const src = theme === "dark" ? "/logos/DG logo white.png" : "/logos/DG logo dark.png";

  return <Image src={src} width={hero ? 192 : 44} height={hero ? 192 : 44} priority={hero} alt="DG logo" className={hero ? "hero-logo" : "nav-logo"} />;
}
