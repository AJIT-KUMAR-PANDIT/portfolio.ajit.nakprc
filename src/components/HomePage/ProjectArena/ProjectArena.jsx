"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import projects from "@/config/projects.json";
import styles from "./ProjectArena.module.scss";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FolderGit2, Search, ExternalLink, Github, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["ALL", "FULL STACK", "FRONTEND", "BACKEND"];

export default function ProjectArena() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const containerRef = useRef(null);

  const filteredProjects = projects.filter((project) => {
    // Category match
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
    gsap.from(".project-title-main", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".project-card-anim", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
      clearProps: "all"
    });
  }, { scope: containerRef, dependencies: [searchTerm, selectedCategory, filteredProjects.length] });

  return (
    <section id="projects" ref={containerRef} className="py-24 px-4 md:px-8 relative max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-12" data-scroll data-scroll-speed="0.05">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono mb-4 font-semibold">
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>PROJECT_ARENA // PORTFOLIO</span>
        </div>
        <h2 className="project-title-main text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white mb-4">
          Project <span className="brand-text-gradient">Arena</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-mono">
          Featured full-stack applications, enterprise systems, and developer tools.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-300",
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-8 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 font-mono focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white font-mono text-xs"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center font-mono text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
          No projects found matching current criteria.
        </div>
      )}

      {/* Grid Container */}
      <div className="grid-container-anim grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={idx}
            className="project-card-anim brand-card rounded-2xl overflow-hidden flex flex-col group"
          >
            {/* Thumbnail preview */}
            <div
              className="relative w-full aspect-video cursor-pointer overflow-hidden bg-slate-900"
              onClick={() => setActiveVideo(project.youtubeId)}
            >
              {project.youtubeId ? (
                <>
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&mute=1&controls=0&loop=1&playlist=${project.youtubeId}`}
                    title={project.title}
                    className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors">
                    <div className="w-14 h-14 bg-indigo-600/80 backdrop-blur-md rounded-full flex items-center justify-center border border-indigo-400/50 group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src="/assets/loader.jpg"
                  alt="Project Thumbnail"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              )}
            </div>

            {/* Info */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1 mb-6 font-sans">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags?.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-indigo-500/10 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LIVE DEMO</span>
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/30 bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&controls=1`}
              title="YouTube Video Player"
              allow="autoplay; fullscreen"
              className="w-full h-full"
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-white text-lg transition-all"
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
