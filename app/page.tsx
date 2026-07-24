import { Hero } from "@/components/Hero";
import { GitHubContributions } from "@/components/GitHubContributions";
import { CvCallout, FeaturedProjects, SocialSection } from "@/components/HomeSections";
import { SkillsSection } from "@/components/SkillsSection";
import { loadGitHubContributions } from "@/lib/githubContributions";

export default async function HomePage() {
  const githubContributions = await loadGitHubContributions();

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsSection />
      <GitHubContributions calendar={githubContributions} />
      <SocialSection />
      <CvCallout />
    </>
  );
}
