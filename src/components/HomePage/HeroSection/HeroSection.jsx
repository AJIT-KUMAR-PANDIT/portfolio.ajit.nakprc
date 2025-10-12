"use client";
import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.scss";
import Typewriter from "@/components/ui/TypeWriter";
import clsx from "clsx";
import SocialMediaSection from "@/components/common/SocialMediaSection/SocialMediaSection";
import axios from "axios";
import { FirstHeroSection } from "../FirstHeroSection/FirstHeroSection";

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
        <FirstHeroSection />
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
