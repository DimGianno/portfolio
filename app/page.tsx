import { Hero } from "@/components/Hero";
import { CvCallout, FeaturedProjects, SocialSection } from "@/components/HomeSections";
import { SkillsSection } from "@/components/SkillsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsSection />
      <SocialSection />
      <CvCallout />
    </>
  );
}
