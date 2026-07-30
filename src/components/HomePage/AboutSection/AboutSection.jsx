"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./AboutSection.module.scss";
import clsx from "clsx";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { User, GraduationCap, Award, Sparkles, BookOpen, MapPin, Phone, Mail } from "lucide-react";

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

function AnimatedCounter({ target, suffix = "", duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / (duration * 60);
        const animate = () => {
          start += step;
          if (start >= target) { setCount(target); return; }
          setCount(Math.floor(start));
          requestAnimationFrame(animate);
        };
        animate();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutSection() {
  const [aboutMe, setAboutMe] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get("/api/about").then((r) => setAboutMe(r.data)).catch(console.error);
  }, []);

  useGSAP(() => {
    if (!aboutMe) return;
    gsap.from(".about-section-title", { y: 40, opacity: 0, skewX: -5, duration: 0.8, ease: "power3.out", clearProps: "all" });
    gsap.from(".about-section-card", { y: 30, opacity: 0, scale: 0.96, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)", clearProps: "all" });
    gsap.from(".about-avatar-ring", { scale: 0.5, opacity: 0, rotation: -180, duration: 1, ease: "elastic.out(1, 0.5)", clearProps: "all" });
    gsap.from(".about-tag", { y: 15, opacity: 0, scale: 0.85, duration: 0.35, stagger: 0.04, ease: "back.out(2)", clearProps: "all" });
  }, { scope: containerRef, dependencies: [aboutMe] });

  if (!aboutMe) return <div className="macos-section flex items-center justify-center min-h-[60vh]"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <section id="about" ref={containerRef} className="macos-section">
      {/* Section Title */}
      <div className="text-center mb-10">
        <div className="macos-badge inline-flex items-center gap-2 mb-3">
          <span className="dot bg-blue-500" /> Profile Overview
        </div>
        <h2 className="about-section-title text-4xl md:text-5xl font-bold tracking-tight">About Me</h2>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto mt-2">Full Stack Developer crafting high-performance digital architectures.</p>
      </div>

      {/* Stats Row — macOS Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 about-section-card">
        {[
          { label: "Role", value: "Full Stack" },
          { label: "Projects", value: <AnimatedCounter target={15} suffix="+" /> },
          { label: "Tech Mastery", value: <AnimatedCounter target={12} suffix="+" /> },
          { label: "Code Quality", value: <AnimatedCounter target={100} suffix="%" /> },
        ].map((s, i) => (
          <div key={i} className="macos-card rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
            <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">{s.value}</div>
            <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* macOS Window with Avatar & Content */}
      <div className="macos-window rounded-2xl max-w-4xl mx-auto">
        <div className="rounded-t-2xl">
          <div className="macos-titlebar justify-between px-6 py-3" style={{ height: 48 }}>
            <TrafficLights />
            <span className="titlebar-center text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <User className="w-3.5 h-3.5 opacity-50" /> About — Ajit Kumar Pandit
            </span>
            <span className="titlebar-spacer" />
          </div>
        </div>

        <div className="macos-content !p-0 md:!p-6">
          <div className="grid md:grid-cols-5 gap-6">
            {/* Avatar Column */}
            <div className="md:col-span-2 flex flex-col items-center text-center p-6 border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5">
              <div className="about-avatar-ring w-32 h-32 rounded-full border-2 border-blue-400/30 bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/40 dark:to-violet-900/40 flex items-center justify-center mb-4 shadow-lg">
                <User className="w-14 h-14 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ajit Kumar Pandit</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-1">Full Stack Developer</p>

              {/* Contact info */}
              <div className="w-full mt-5 space-y-2.5 text-sm">
                {[
                  { icon: <Mail className="w-3.5 h-3.5" />, label: "ajit@nakprc.com" },
                  { icon: <Phone className="w-3.5 h-3.5" />, label: "+91 6200281082" },
                  { icon: <MapPin className="w-3.5 h-3.5" />, label: "India" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-blue-500">{c.icon}</span>
                    <span className="text-xs">{c.label}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="w-full mt-5 pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-purple-500" /> Core Competencies
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {aboutMe.traits.map((t, i) => (
                    <span key={i} className="about-tag macos-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-3 space-y-5">
              {/* Story */}
              <div className="about-section-card p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" /> My Story & Mission
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{aboutMe.story}</p>
              </div>

              {/* Education */}
              <div className="about-section-card p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-500" /> Education & Certifications
                </h4>
                <div className="space-y-4">
                  {aboutMe.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 ring-4 ring-blue-100 dark:ring-blue-950/30" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{edu.degree}</div>
                        <div className="text-xs text-gray-500">{edu.institution} · {edu.years}</div>
                      </div>
                    </div>
                  ))}
                  {aboutMe.certifications.map((cert, i) => (
                    <div key={i} className="flex items-start gap-3 group pt-3 border-t border-gray-100 dark:border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0 ring-4 ring-purple-100 dark:ring-purple-950/30" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{cert.title}</div>
                        <div className="text-xs text-gray-500">{cert.institution} · {cert.years}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
