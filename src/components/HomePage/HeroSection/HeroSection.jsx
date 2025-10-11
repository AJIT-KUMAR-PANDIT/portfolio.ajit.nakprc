import React from "react";
import styles from "./HeroSection.module.scss";
import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <section className={styles["hero-section"]}>
        <section className={styles["hero-content"]}>
          <h1 className={styles["hero-title"] + "myFont"}>Ajit Kumar Pandit</h1>
          <p className={styles["hero-subtitle"]}>Frontend Developer</p>
        </section>
        <section className={styles["hero-right"]}>
          <Image
            src="/ajitkumarpandit/AJITKUMARPANDIT.jpg"
            alt="hero"
            width={400}
            height={400}
          />
        </section>
      </section>
    </>
  );
};

export default HeroSection;
