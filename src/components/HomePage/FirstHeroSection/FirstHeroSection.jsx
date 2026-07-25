"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./FirstHeroSection.module.scss";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal, Shield, Code, Cpu, Download, ArrowRight } from "lucide-react";

const ROLES = [
  "Full Stack Developer",
  "React & Next.js Developer",
  "Node.js Backend Developer",
  "Full Stack Web Engineer"
];

export const FirstHeroSection = () => {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter / Decrypt effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-element", {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "all"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 w-full overflow-hidden">
      {/* Subtle Brand Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <div className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-950/40 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-indigo-700 dark:text-indigo-300 font-semibold uppercase">
            AVAILABLE FOR OPPORTUNITIES // INDIA
          </span>
        </div>

        {/* Sub-greeting */}
        <h2 className="hero-element text-lg md:text-2xl font-mono text-slate-600 dark:text-slate-400 mb-3 tracking-wide">
          Hello 👋 I am
        </h2>

        {/* Main Name Heading with Logo Color Gradient */}
        <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase mb-6">
          <span className="brand-text-gradient inline-block">
            Ajit Kumar Pandit
          </span>
        </h1>

        {/* Professional Typewriter Console */}
        <div className="hero-element w-full max-w-2xl brand-card p-4 md:p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between border-b border-indigo-500/15 dark:border-indigo-500/30 pb-3 mb-4 text-xs font-mono text-slate-500 dark:text-indigo-300/70">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>developer_profile.sh</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
            </div>
          </div>

          <div className="flex items-center justify-center text-lg md:text-2xl font-mono font-bold text-slate-800 dark:text-indigo-200 min-h-[40px]">
            <span className="text-indigo-600 dark:text-purple-400 mr-2">&gt;</span>
            <span>{displayText}</span>
            <span className="w-2.5 h-6 bg-indigo-500 dark:bg-indigo-400 inline-block ml-1 animate-pulse" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-element flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="brand-btn-primary flex items-center gap-2">
            <span>Explore Projects</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="brand-btn-secondary flex items-center gap-2"
          >
            <Download className="w-4.5 h-4.5" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Tech Stack Pillars */}
        <div className="hero-element mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-left font-mono text-xs w-full max-w-4xl">
          <div className="brand-card p-4 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 text-[10px] tracking-wider uppercase">CORE STACK</div>
              <div className="text-slate-900 dark:text-white font-bold text-sm">FULL STACK</div>
            </div>
          </div>
          <div className="brand-card p-4 flex items-center gap-3">
            <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 text-[10px] tracking-wider uppercase">FRONTEND</div>
              <div className="text-slate-900 dark:text-white font-bold text-sm">REACT / NEXT.JS</div>
            </div>
          </div>
          <div className="brand-card p-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 text-[10px] tracking-wider uppercase">BACKEND</div>
              <div className="text-slate-900 dark:text-white font-bold text-sm">NODE / EXPRESS</div>
            </div>
          </div>
          <div className="brand-card p-4 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 text-[10px] tracking-wider uppercase">DATABASE</div>
              <div className="text-slate-900 dark:text-white font-bold text-sm">MONGODB</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
