import BackgroundAvatar from "@/components/common/BackgroundAvatar/BackgroundAvatar";
import BackgroundSnake from "@/components/common/BackgroundSnake/BackgroundSnake";
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
const SocialTimelineSection = React.lazy(() =>
  import("@/components/HomePage/SocialTimelineSection/SocialTimelineSection")
);

const ServicesSection = React.lazy(() =>
  import("@/components/HomePage/ServicesSection/ServicesSection")
);
const ExperienceSection = React.lazy(() =>
  import("@/components/HomePage/ExperienceSection/ExperienceSection")
);
const ProjectArena = React.lazy(() =>
  import("@/components/HomePage/ProjectArena/ProjectArena")
);
const GallerySection = React.lazy(() =>
  import("@/components/HomePage/GallerySection/GallerySection")
);
const BlogSection = React.lazy(() =>
  import("@/components/HomePage/BlogSection/BlogSection")
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
      <BackgroundSnake />
      <BackgroundAvatar />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <SocialTimelineSection />
          {/* <ServicesSection /> */}
          {/* <ExperienceSection /> */}
          <ProjectArena />
          {/* <GallerySection /> */}
          {/* <BlogSection /> */}
          <ContactUsSection />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
