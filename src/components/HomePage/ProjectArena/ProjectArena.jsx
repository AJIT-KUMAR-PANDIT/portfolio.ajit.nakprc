"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import projects from "@/config/projects.json";
import styles from "./ProjectArena.module.scss";
import clsx from "clsx";

export default function ProjectArena() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="projects" className={clsx(styles["project-arena"])}>
      <h1 className={clsx(styles["title"])}>Project Arena</h1>
      <p className={clsx(styles["title-sub"])}>
        What I <span className={clsx(styles["highlight"])}>Build</span>
      </p>
      <div className={clsx(styles["grid-container"])}>
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={clsx(styles["project-card"])}
          >
            {/* Video Thumbnail Preview */}
            <div
              className={clsx(styles["video-thumbnail"])}
              onClick={() => setActiveVideo(project.youtubeId)}
            >
              {project.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&mute=1&controls=0&loop=1&playlist=${project.youtubeId}`}
                  title={project.title}
                  className={clsx(styles["video-iframe"])}
                />
              ) : (
                <Image
                  src="/assets/loader.jpg"
                  alt="Loading..."
                  fill
                  className={clsx(styles["loader-image"])}
                  priority
                />
              )}
            </div>

            {/* Info */}
            <div className={clsx(styles["project-info"])}>
              <h2 className={clsx(styles["project-title"])}>{project.title}</h2>
              <p className={clsx(styles["project-description"])}>
                {project.description}
              </p>

              {/* Tags */}
              <div className={clsx(styles["tags-container"])}>
                {project.tags?.map((tag, tIdx) => (
                  <span key={tIdx} className={clsx(styles["tag"])}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className={clsx(styles["links-container"])}>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(styles["live-demo-link"])}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(styles["source-code-link"])}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-4 h-4 mr-1 bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Overlay Modal */}
      {activeVideo && (
        <div className={clsx(styles["video-overlay"])}>
          <div className={clsx(styles["video-modal-content"])}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&controls=1`}
              title="YouTube video player"
              allow="autoplay; fullscreen"
              className={clsx(styles["video-modal-iframe"])}
            />
            <button
              className={clsx(styles["close-button"])}
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
