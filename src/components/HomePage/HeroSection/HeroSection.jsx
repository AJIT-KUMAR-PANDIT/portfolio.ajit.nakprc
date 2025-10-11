import React from "react";
import styles from "./HeroSection.module.scss";
import Image from "next/image";
import Typewriter from "@/components/ui/TypeWriter";

const HeroSection = () => {
  return (
    <>
      <section
        className={styles["hero-section"] + " lg:" + styles["hero-section-pc"]}
      >
        <section className={styles["hero-left-content"]}>
          <h1 className={styles["hero-title"] + " myFont"}>
            <Typewriter
              texts={[
                "Hi",
                "I am",
                "Ajit Kumar Pandit",
                "A Fullstack Developer",
              ]}
              typingSpeed={150}
              pauseDuration={1000}
            />
          </h1>
          <p className={styles["hero-subtitle"]}>Frontend Developer</p>
        </section>
        <section className={styles["hero-right-content"]}>
          <video autoPlay loop muted className={styles["background-video"]}>
            <source src="/assets/loder-video.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      </section>
    </>
  );
};

export default HeroSection;
