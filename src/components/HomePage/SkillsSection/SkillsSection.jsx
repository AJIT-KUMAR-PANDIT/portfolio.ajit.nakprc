"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import clsx from "clsx";
import styles from "./SkillsSection.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Terminal, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

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

  useGSAP(() => {
    if (loading || skillsData.length === 0) return;

    gsap.from(".skills-title", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all"
    });

    gsap.from(".skill-category", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "all"
    });
  }, { scope: containerRef, dependencies: [loading, skillsData] });

  return (
    <section id="skills" ref={containerRef} className="py-24 px-4 md:px-8 relative max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16 relative z-10" data-scroll data-scroll-speed="0.05">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono mb-4 font-semibold">
          <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>TECH_STACK // CAPABILITIES</span>
        </div>
        <h2 className="skills-title text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white mb-4">
          Tech <span className="brand-text-gradient">Console</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-mono">
          Core technologies, frameworks, and architecture tools engineered for production.
        </p>
      </div>

      {loading ? (
        <div className="py-24 text-center font-mono text-indigo-600 dark:text-indigo-400 animate-pulse">
          Loading Tech Stack...
        </div>
      ) : (
        <div className="space-y-12 relative z-10">
          {skillsData.map((category, index) => (
            <div 
              key={index} 
              className="skill-category brand-card p-6 md:p-8 rounded-2xl"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-indigo-500/15 dark:border-indigo-500/30 pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-wide uppercase">
                    {category.category}
                  </h3>
                </div>
                <span className="text-xs font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 dark:bg-indigo-950/60 px-3 py-1 rounded border border-indigo-500/20 font-semibold">
                  {category.skills.length} MODULES
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <a
                    key={skillIndex}
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-chip-anim group relative flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-indigo-500/60 dark:hover:border-indigo-400/60 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                  >
                    {/* Glowing Top Line Accent */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                        {skill.name}
                      </span>
                    </div>

                    {/* Skill Meter Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${80 + (skillIndex % 4) * 5}%` }}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
