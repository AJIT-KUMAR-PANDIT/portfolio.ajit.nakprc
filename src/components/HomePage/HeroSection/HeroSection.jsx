"use client";
import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.scss";
import Typewriter from "@/components/ui/TypeWriter";
import clsx from "clsx";
import SocialMediaSection from "@/components/common/SocialMediaSection/SocialMediaSection";
import axios from "axios";

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get("/api/hero");
        setHeroData(response.data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchHeroData();
  }, []);

  if (!heroData) {
    return null; // Or a loading spinner
  }

  return (
    <section className={clsx(styles["hero-section"])}>
      <div className={clsx(styles["hero-left"])}>
        <h1 className={clsx(styles["hero-title"], "myFont")}>
          <Typewriter
            texts={["Hi", "I am", heroData.name, heroData.dev]}
            typingSpeed={150}
            pauseDuration={1000}
          />
        </h1>
        <h5 className={clsx(styles["hero-tagline"])}>{heroData.tagline}</h5>
        <h6 className={clsx(styles["hero-text1"])}>
          Building Digital Experiences!
        </h6>
        <div className={clsx(styles["hero-btn"])}>
          <button className={clsx("btn-primary")}>Contact Me</button>
          <button className={clsx("btn-secondary")}>View My Work</button>
        </div>
        <SocialMediaSection />
      </div>
      <div className={clsx(styles["hero-right"])}>
        <video autoPlay loop muted className={clsx(styles["background-video"])}>
          <source src="/assets/loder-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HeroSection;
