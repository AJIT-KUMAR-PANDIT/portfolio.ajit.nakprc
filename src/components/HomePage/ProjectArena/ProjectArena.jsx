"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import projects from "@/config/projects.json";
import styles from "./ProjectArena.module.scss";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FolderGit2, Search, ExternalLink, Github, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function TrafficLights() {
  return (
    <div className="flex items-center gap-[7px]">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-[7px] text-black/25 cursor-pointer hover:text-black/40 transition-colors"><span>✕</span></div>
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[7px] text-black/25 cursor-pointer hover:text-black/40 transition-colors"><span>−</span></div>
      <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center text-[7px] text-white/30 cursor-pointer hover:text-white/50 transition-colors font-bold"><span>+</span></div>
    </div>
  );
}

const CATEGORIES = ["ALL", "FULL STACK", "FRONTEND", "BACKEND"];

export default function ProjectArena() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const containerRef = useRef(null);

  const filteredProjects = projects.filter((project) => {
    const catMatch =
      selectedCategory === "ALL" ||
      (selectedCategory === "FULL STACK" && project.tags?.some(t => ["React", "Node", "MongoDB", "Express", "Next.js", "Full-Stack"].includes(t))) ||
      (selectedCategory === "FRONTEND" && project.tags?.some(t => ["React", "Tailwind", "CSS", "UI/UX"].includes(t))) ||
      (selectedCategory === "BACKEND" && project.tags?.some(t => ["Node.js", "Express", "MongoDB", "Python", "API"].includes(t)));

    if (!catMatch) return false;

    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  useGSAP(() => {
    gsap.from(".projects-title", { y: 40, opacity: 0, skewX: -5, duration: 0.8, ease: "power3.out", clearProps: "all" });
    gsap.from(".projects-tab-anim", { y: 12, opacity: 0, scale: 0.93, duration: 0.45, stagger: 0.06, ease: "back.out(1.8)", clearProps: "all" });
    gsap.from(".project-card-anim", { y: 25, opacity: 0, scale: 0.96, duration: 0.55, stagger: 0.07, ease: "power2.out", clearProps: "all" });
  }, { scope: containerRef, dependencies: [filteredProjects.length] });

  return (
    <section id="projects" ref={containerRef} className="macos-section">
      {/* Section Title */}
      <div className="text-center mb-10">
        <div className="macos-badge inline-flex items-center gap-2 mb-3">
          <span className="dot bg-green-500" /> Project Arena
        </div>
        <h2 className="projects-title text-4xl md:text-5xl font-bold tracking-tight">My Work</h2>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto mt-2">Featured full-stack applications, enterprise systems, and developer tools.</p>
      </div>

      {/* macOS Window */}
      <div className="macos-window rounded-2xl max-w-5xl mx-auto">
        <div className="rounded-t-2xl">
          <div className="macos-titlebar justify-between px-6 py-3" style={{ height: 48 }}>
            <TrafficLights />
            <span className="titlebar-center text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FolderGit2 className="w-3.5 h-3.5 opacity-50" /> Projects — Portfolio
            </span>
            {/* Spotlight search in titlebar */}
            <div className="relative mr-4">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="macos-spotlight-input pl-7 w-[200px] focus:w-[260px] py-1.5 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="macos-content !p-5 md:!p-7">
          {/* Category Tabs — macOS style */}
          <div className="flex flex-wrap gap-2 mb-6 projects-tab-anim">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  "px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all",
                  selectedCategory === cat
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Cards — macOS style */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">No projects found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project, idx) => (
                <div key={idx} className={clsx("project-card-anim macos-card rounded-xl overflow-hidden group cursor-pointer")}>
                  {/* Thumbnail */}
                  <div
                    className="relative w-full aspect-video bg-gray-100 dark:bg-white/5 overflow-hidden"
                    onClick={() => project.youtubeId && setActiveVideo(project.youtubeId)}
                  >
                    {project.youtubeId ? (
                      <>
                        <iframe src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&mute=1&controls=0&loop=1&playlist=${project.youtubeId}`} title={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                          <div className="w-12 h-12 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/40 group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image src="/assets/loader.jpg" alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags?.map((tag, tIdx) => (
                        <span key={tIdx} className="macos-tag text-[10px] px-2 py-0.5">{tag}</span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-white/5">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          <ExternalLink className="w-3 h-3" /> Live Demo
                        </a>
                      )}
                      {project.source && (
                        <a href={project.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
                          <Github className="w-3 h-3" /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&controls=1`} title="YouTube Player" allow="autoplay; fullscreen" className="w-full h-full" />
            <button onClick={() => setActiveVideo(null)} className="absolute top-3 right-3 w-8 h-8 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white text-sm transition-colors">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
