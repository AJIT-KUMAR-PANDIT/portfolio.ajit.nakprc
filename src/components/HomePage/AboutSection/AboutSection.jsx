"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./AboutSection.module.scss";
import clsx from "clsx";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { User, GraduationCap, Award, Cpu, Sparkles, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const [aboutMe, setAboutMe] = useState(null);
  const containerRef = useRef(null);

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

  useGSAP(() => {
    if (!aboutMe) return;

    // Title animation
    gsap.fromTo(".about-title", 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Cards staggered reveal
    gsap.fromTo(".brand-card-anim",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-wrapper-anim",
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef, dependencies: [aboutMe] });

  if (!aboutMe) {
    return (
      <div className="py-24 text-center text-indigo-600 dark:text-indigo-400 font-mono animate-pulse">
        Loading Profile Details...
      </div>
    );
  }

  return (
    <section id="about" ref={containerRef} className="py-24 px-4 md:px-8 relative max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-16" data-scroll data-scroll-speed="0.05">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono mb-4 font-semibold">
          <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin" />
          <span>PROFILE_OVERVIEW // MISSION</span>
        </div>
        <h2 className="about-title text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white mb-4">
          About <span className="brand-text-gradient">Me</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-mono">
          Full Stack MERN Developer crafting high-performance digital architectures.
        </p>
      </div>

      {/* Stats Counter Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="brand-card-anim brand-card p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mb-1">03+</div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Years Experience</div>
        </div>
        <div className="brand-card-anim brand-card p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-extrabold font-mono text-purple-600 dark:text-purple-400 mb-1">15+</div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Projects Completed</div>
        </div>
        <div className="brand-card-anim brand-card p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mb-1">12+</div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tech Stack Mastery</div>
        </div>
        <div className="brand-card-anim brand-card p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mb-1">100%</div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Code Quality</div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper-anim grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Core Traits */}
        <div className="brand-card-anim brand-card p-6 rounded-2xl flex flex-col items-center text-center">
          {/* Avatar Ring */}
          <div className="relative w-40 h-40 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40 animate-ping opacity-20" />
            <div className="relative w-full h-full rounded-full border-2 border-indigo-500 p-2 bg-indigo-500/10 dark:bg-indigo-950/40 overflow-hidden flex items-center justify-center shadow-lg">
              <User className="w-18 h-18 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Ajit Kumar Pandit</h3>
          <p className="text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-6 font-semibold">MERN Stack Architect</p>

          <div className="w-full border-t border-indigo-500/15 dark:border-indigo-500/30 pt-6">
            <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Core Competencies</span>
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {aboutMe.traits.map((trait, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 dark:bg-indigo-950/60 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Columns: Story & Vertical Circuit Timeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Story Card */}
          <div className="brand-card-anim brand-card p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 font-mono">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>MY STORY & MISSION</span>
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-base">
              {aboutMe.story}
            </p>
          </div>

          {/* Education & Academic Timeline */}
          <div className="brand-card-anim brand-card p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 font-mono">
              <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>ACADEMIC & EDUCATION TIMELINE</span>
            </h3>

            <div className="relative pl-6 border-l-2 border-indigo-500/30 dark:border-indigo-500/40 space-y-8">
              {aboutMe.education.map((edu, index) => (
                <div key={index} className="relative group">
                  {/* Node */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-400 group-hover:bg-indigo-600 transition-colors shadow-sm" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{edu.degree}</h4>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-semibold">{edu.years}</span>
                  </div>
                  <p className="text-sm font-mono text-slate-600 dark:text-slate-300">{edu.institution}</p>
                </div>
              ))}

              {aboutMe.certifications.map((cert, index) => (
                <div key={index} className="relative group pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-purple-600 dark:border-purple-400 group-hover:bg-purple-600 transition-colors shadow-sm" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-lg font-bold text-purple-700 dark:text-purple-300">{cert.title}</h4>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-semibold">{cert.years}</span>
                  </div>
                  <p className="text-sm font-mono text-slate-600 dark:text-slate-300">{cert.institution}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
