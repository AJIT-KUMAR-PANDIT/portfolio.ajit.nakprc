import HeroSection from "@/components/HomePage/HeroSection/HeroSection";
import AboutSection from "@/components/HomePage/AboutSection/AboutSection";
import SkillsSection from "@/components/HomePage/SkillsSection/SkillsSection";
import ProjectArena from "@/components/HomePage/ProjectArena/ProjectArena";
import { Footer } from "@/components/common/Footer/Footer";
import { FirstHeroSection } from "@/components/HomePage/FirstHeroSection/FirstHeroSection";

export default function Home() {
  return (
    <>
      <main>
        <FirstHeroSection />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectArena />
        <Footer />
      </main>
    </>
  );
}
