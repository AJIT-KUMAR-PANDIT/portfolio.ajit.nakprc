"use client";

import clsx from "clsx";
import { Briefcase, MapPin } from "lucide-react";
import styles from "./ExperienceSection.module.scss";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description:
        "Leading development of enterprise web applications and mentoring junior developers.",
      achievements: [
        "Architected and deployed 5+ major features serving 100K+ users",
        "Reduced application load time by 40% through optimization",
        "Mentored team of 4 junior developers",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Co.",
      location: "Remote",
      period: "2020 - 2022",
      description:
        "Developed and maintained multiple client projects using modern web technologies.",
      achievements: [
        "Built 10+ responsive web applications from scratch",
        "Improved code quality with comprehensive testing (90% coverage)",
        "Collaborated with design team to implement pixel-perfect UIs",
        "Integrated third-party APIs and payment gateways",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Creative Web Studio",
      location: "New York, NY",
      period: "2018 - 2020",
      description: "Focused on creating beautiful, responsive user interfaces.",
      achievements: [
        "Developed reusable component library used across 15+ projects",
        "Improved website accessibility to WCAG 2.1 AA standards",
        "Implemented modern CSS techniques and animations",
      ],
    },
  ];

  return (
    <section id="experience" className={clsx(styles.experienceSection)}>
      <div className={clsx(styles.titleMain)}>EXPERIENCE</div>
      <div className={clsx(styles.titleSub)}>
        My Professional Journey
        <span className={clsx(styles.highlight)}>
          &nbsp; And Career Growth.
        </span>
      </div>

      <div className={clsx(styles.contentWrapper)}>
        <div className={clsx(styles.timeline)}>
          {experiences.map((exp, index) => (
            <div key={index} className={clsx(styles.timelineItem)}>
              <div className={clsx(styles.timelineMarker)} />

              <div className={clsx(styles.experienceCard)}>
                <div className={clsx(styles.cardHeader)}>
                  <div>
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                  <span className={clsx(styles.period)}>{exp.period}</span>
                </div>

                <div className={clsx(styles.location)}>
                  <MapPin size={16} />
                  <span>{exp.location}</span>
                </div>

                <p className={clsx(styles.description)}>{exp.description}</p>

                <div className={clsx(styles.achievements)}>
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
