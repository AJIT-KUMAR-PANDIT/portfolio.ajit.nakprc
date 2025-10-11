import React from "react";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <>
      <div className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
          <h1 className={styles["hero-title"]}></h1>
          <p className={styles["hero-subtitle"]}>Frontend Developer</p>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
