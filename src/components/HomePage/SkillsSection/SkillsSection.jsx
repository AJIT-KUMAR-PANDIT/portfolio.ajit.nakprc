"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Lenis from "lenis";
import clsx from "clsx";
import styles from "./SkillsSection.module.scss";

export default function SkillsSection() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get("/api/skills");
        setSkillsData(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <section className={clsx(styles.skillsSection)}>
      {/* Sticky Background Video */}
      <div className={clsx(styles.videoContainer)}>
        <video
          className={clsx(styles.video)}
          src="/assets/skillssection1.webm"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Main Content */}
      <div className={clsx(styles.contentWrapper)}>
        {/* Skills Content */}
        <div className={clsx(styles.contentContainer)}>
          {/* Desktop Header */}
          <div className={clsx(styles.header)}>
            <h1 className={clsx(styles.title)}>My Tech Stack</h1>
            <p className={clsx(styles.description)}>
              A collection of technologies I use to build modern, robust, and
              scalable web applications.
            </p>
          </div>

          {loading ? (
            <div className={clsx(styles.loading)}>
              <p>Loading skills...</p>
            </div>
          ) : (
            <div className={clsx(styles.categoriesContainer)}>
              {skillsData.map((category, index) => (
                <div key={index} className={clsx(styles.category)}>
                  <h2 className={clsx(styles.categoryTitle)}>
                    {category.category}
                  </h2>
                  <div className={clsx(styles.skillsGrid)}>
                    {category.skills.map((skill, skillIndex) => (
                      <a
                        key={skillIndex}
                        href={skill.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(styles.skillCard)}
                      >
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className={clsx(styles.skillIcon, "mr-3")}
                        />
                        <span className={clsx(styles.skillName)}>
                          {skill.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
