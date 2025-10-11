import React from "react";
import styles from "./HeroSection.module.scss";
import Typewriter from "@/components/ui/TypeWriter";
import clsx from "clsx";

const HeroSection = () => {
  return (
    <section className={clsx(styles["hero-section"])}>
      <div className={styles["hero-left"]}>
        <h1 className={clsx(styles["hero-title"], "myFont")}>
          <Typewriter
            texts={["Hi", "I am", "Ajit Kumar Pandit", "A Fullstack Developer"]}
            typingSpeed={150}
            pauseDuration={1000}
          />
        </h1>
        <p className={styles["hero-tagline"]}>
          eNHANCING fUTURE wITH tECHNOLOGY
        </p>
      </div>
      <div className={styles["hero-right"]}>
        <video autoPlay loop muted className={styles["background-video"]}>
          <source src="/assets/loder-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HeroSection;
