"use client";
import clsx from "clsx";
import styles from "./HeroSection.module.scss";
import { FirstHeroSection } from "../FirstHeroSection/FirstHeroSection";

export default function HeroSection() {
  return (
    <section className={clsx(styles["hero-section"], "macos-section", "min-h-screen flex items-center")}>
      <div className="w-full">
        <FirstHeroSection />
      </div>
    </section>
  );
}
