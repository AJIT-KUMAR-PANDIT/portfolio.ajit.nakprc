import BackgroundAvatar from "@/components/common/BackgroundAvatar/BackgroundAvatar";
import React, { Suspense } from "react";

const HeroSection = React.lazy(() =>
  import("@/components/HomePage/HeroSection/HeroSection")
);
const AboutSection = React.lazy(() =>
  import("@/components/HomePage/AboutSection/AboutSection")
);
const SkillsSection = React.lazy(() =>
  import("@/components/HomePage/SkillsSection/SkillsSection")
);
const ProjectArena = React.lazy(() =>
  import("@/components/HomePage/ProjectArena/ProjectArena")
);
const ContactUsSection = React.lazy(() =>
  import("@/components/HomePage/ContactUsSection/ContactUsSection")
);
const Footer = React.lazy(() =>
  import("@/components/common/Footer/Footer").then((module) => ({
    default: module.Footer,
  }))
);
const FirstHeroSection = React.lazy(() =>
  import("@/components/HomePage/FirstHeroSection/FirstHeroSection").then(
    (module) => ({ default: module.FirstHeroSection })
  )
);

export default function Home() {
  return (
    <>
      <BackgroundAvatar />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectArena />
          <ContactUsSection />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
