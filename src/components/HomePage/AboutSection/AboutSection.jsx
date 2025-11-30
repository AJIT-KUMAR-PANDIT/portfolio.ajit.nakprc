"use client";
import React, { useEffect, useState } from "react";
import styles from "./AboutSection.module.scss";
import clsx from "clsx";
import axios from "axios";

export default function AboutSection() {
  const [aboutMe, setAboutMe] = useState(null);

  useEffect(() => {
    async function fetchAboutMe() {
      try {
        const response = await axios.get("/api/about");
        setAboutMe(response.data);
      } catch (error) {
        console.error("Error fetching about me data:", error);
      }
    }
    fetchAboutMe();
  }, []);

  if (!aboutMe) {
    return null; // loader
  }

  return (
    <section id="about" className={clsx(styles["about-section"])}>
      <div className={clsx(styles["title-main"])}>ABOUT ME</div>
      <div className={clsx(styles["title-sub"])}>
        My Experience And Expertise With Design Tools Used
        <span className={clsx(styles["highlight"])}>
          &nbsp; Through Out My Career.
        </span>
      </div>

      <div className={clsx(styles["content-wrapper"])}>
        {/* <div className={clsx(styles["header-section"])}>
          <h2>{aboutMe.title}</h2>
          <p>{aboutMe.subtitle}</p>
        </div> */}

        <div className={clsx(styles["sections-container"])}>
          {/* My Story */}
          <div className={clsx(styles["section-card"])}>
            <h3>My Story</h3>
            <p>{aboutMe.story}</p>
          </div>

          {/* Skills/Traits */}
          <div className={clsx(styles["traits-grid"])}>
            {aboutMe.traits.map((trait, index) => (
              <div key={index} className={clsx(styles["trait-card"])}>
                <h3>{trait}</h3>
              </div>
            ))}
          </div>

          {/* Core Values */}
          <div className={clsx(styles["section-card"])}>
            <h3>Core Values</h3>
            <div className={clsx(styles["core-values-list"])}>
              {aboutMe.coreValues.map((value, index) => (
                <div key={index}>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Growth */}
          <div className={clsx(styles["section-card"])}>
            <h3>Education & Growth</h3>
            <div className={clsx(styles["core-values-list"])}>
              {aboutMe.education.map((edu, index) => (
                <div key={index}>
                  <h4>{edu.degree}</h4>
                  <p>
                    {edu.institution}, {edu.years}
                  </p>
                </div>
              ))}
              {aboutMe.certifications.map((cert, index) => (
                <div key={index}>
                  <h4>{cert.title}</h4>
                  <p>
                    {cert.institution}, {cert.years}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
