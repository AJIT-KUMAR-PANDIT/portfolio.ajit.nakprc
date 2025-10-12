import HeroSection from "@/components/HomePage/HeroSection/HeroSection";
import AboutSection from "@/components/HomePage/AboutSection/AboutSection";
import SkillsSection from "@/components/HomePage/SkillsSection/SkillsSection";
import ProjectArena from "@/components/HomePage/ProjectArena/ProjectArena";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectArena />
      </main>
    </>
  );
}
