import React from "react";
import styles from "./HeroSection.module.scss";
import Typewriter from "@/components/ui/TypeWriter";
import clsx from "clsx";

const HeroSection = () => {
  return (
    <section className={clsx(styles["hero-section"])}>
      <div className={clsx(styles["hero-left"])}>
        <h1 className={clsx(styles["hero-title"], "myFont")}>
          <Typewriter
            texts={["Hi", "I am", "Ajit Kumar Pandit", "A Fullstack Developer"]}
            typingSpeed={150}
            pauseDuration={1000}
          />
        </h1>
        <h5 className={clsx(styles["hero-tagline"])}>
          eNHANCING fUTURE wITH tECHNOLOGY
        </h5>
        <h6 className={clsx(styles["hero-text1"])}>
          Building Digital Experiences!
        </h6>
        <div className={clsx(styles["hero-btn"])}>
          <button className={clsx("btn-primary")}>Contact Me</button>
          <button className={clsx("btn-secondary")}>View My Work</button>
        </div>
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
