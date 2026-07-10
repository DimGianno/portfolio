import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteProvider } from "@/components/SiteProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://dimgianno.com"),
  title: {
    default: "Dimitris Giannopoulos | Junior Full Stack Developer",
    template: "%s | Dimitris Giannopoulos",
  },
  description:
    "Portfolio of Dimitris Giannopoulos, a Junior Full Stack Developer building reliable web experiences and APIs.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://dimgianno.com",
    title: "Dimitris Giannopoulos | Junior Full Stack Developer",
    description: "A modern portfolio of web applications and APIs.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(() => { try { const stored = localStorage.getItem('portfolio-theme'); const theme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.style.colorScheme = theme; } catch (_) {} })()`;
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SiteProvider>
        <Analytics />
      </body>
    </html>
  );
}
