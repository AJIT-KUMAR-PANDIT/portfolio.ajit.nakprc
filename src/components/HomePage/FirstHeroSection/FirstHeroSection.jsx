"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./FirstHeroSection.module.scss";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Terminal, Shield, Code, Cpu, Download, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Full Stack Developer",
  "React & Next.js Developer",
  "Node.js Backend Developer",
  "Full Stack Web Engineer"
];

// macOS Traffic Light dots
function TrafficLights() {
  return (
    <div className="flex items-center gap-[7px]">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-[7px] text-black/25 cursor-pointer hover:text-black/40 transition-colors"><span>✕</span></div>
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[7px] text-black/25 cursor-pointer hover:text-black/40 transition-colors"><span>−</span></div>
      <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center text-[7px] text-white/30 cursor-pointer hover:text-white/50 transition-colors font-bold"><span>+</span></div>
    </div>
  );
}

// macOS Spotlight-style search bar (decorative)
function SpotlightBar() {
  return (
    <div className="flex items-center gap-3 ml-auto">
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          readOnly
          placeholder="Spotlight Search…"
          className="macos-spotlight-input pr-3 w-[260px] cursor-pointer hover:border-gray-300 focus:w-[320px]"
        />
      </div>
    </div>
  );
}

// macOS Terminal window component
function MacTerminal({ title, children }) {
  return (
    <div className="macos-window rounded-xl">
      <div className="macos-titlebar rounded-t-xl">
        <TrafficLights />
        <span className="titlebar-center font-mono text-xs opacity-60">{title}</span>
        <span className="titlebar-spacer" />
      </div>
      <div className="macos-content p-5 !py-4 bg-[#1e1e2e]/95">
        {children}
      </div>
    </div>
  );
}

// macOS Metric Card
function MacMetric({ icon, label, value, color }) {
  return (
    <div className="macos-card rounded-xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform">
      <div className={clsx("w-11 h-11 rounded-xl flex items-center justify-center", color)}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900 dark:text-white">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}

// macOS App Icon row
function MacAppIconRow() {
  const icons = [
    { bg: "from-blue-500 to-indigo-600", emoji: "💻" },
    { bg: "from-purple-500 to-violet-600", emoji: "⚛️" },
    { bg: "from-green-500 to-emerald-600", emoji: "🟢" },
    { bg: "from-orange-500 to-amber-600", emoji: "🟡" },
  ];
  return (
    <div className="macos-icon-grid mt-4">
      {icons.map((ic, i) => (
        <div key={i} className={clsx("macos-app-icon bg-gradient-to-br", ic.bg)}>{ic.emoji}</div>
      ))}
    </div>
  );
}

export const FirstHeroSection = () => {
  const containerRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
    tl.from(".hero-element", { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", clearProps: "all" });
    tl.from(".macos-window-hero .macos-titlebar", { scaleY: 0, transformOrigin: "top center", duration: 0.4, ease: "back.out(2)", clearProps: "all" }, "-=0.3");
    tl.from(".metric-card", { y: 20, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1, ease: "power2.out", clearProps: "all" }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="macos-section pt-8">
      {/* macOS-style Hero Window */}
      <div className="macos-window-hero rounded-2xl overflow-visible max-w-3xl mx-auto">
        <div className="rounded-t-2xl">
          <div className="macos-titlebar justify-between px-6 py-4" style={{ height: 48 }}>
            <TrafficLights />
            <span className="titlebar-center text-sm font-semibold text-gray-700 dark:text-gray-300">Portfolio — Ajit Kumar Pandit</span>
            <SpotlightBar />
          </div>
        </div>

        <div className="macos-content p-6 md:p-8 lg:p-10">
          {/* Hero content */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 hero-element">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for opportunities — India
            </div>

            <h2 className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-2 hero-element">Hello 👋 I am</h2>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 hero-element bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Ajit Kumar Pandit
            </h1>

            {/* macOS Terminal */}
            <div className="hero-element max-w-xl mx-auto mb-8">
              <MacTerminal title="developer_profile.sh">
                <div className="flex items-center justify-center text-lg md:text-2xl font-mono text-white min-h-[40px]">
                  <span className="text-green-400 mr-2">$</span>
                  <span className="text-blue-300">{displayText}</span>
                  <span className="w-2.5 h-5 bg-green-400 ml-1 animate-pulse" />
                </div>
              </MacTerminal>
            </div>

            {/* CTA Buttons — macOS style */}
            <div className="hero-element flex flex-wrap items-center justify-center gap-3 mb-8">
              <a href="#projects" className="macos-btn-primary flex items-center gap-2 text-sm">
                Explore Projects <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="macos-btn-secondary flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>

            {/* macOS Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { icon: <Cpu className="w-5 h-5 text-white" />, label: "Core Stack", value: "Full Stack", color: "bg-gradient-to-br from-blue-500 to-indigo-600" },
                { icon: <Code className="w-5 h-5 text-white" />, label: "Frontend", value: "React / Next.js", color: "bg-gradient-to-br from-purple-500 to-violet-600" },
                { icon: <Shield className="w-5 h-5 text-white" />, label: "Backend", value: "Node / Express", color: "bg-gradient-to-br from-green-500 to-emerald-600" },
                { icon: <Terminal className="w-5 h-5 text-white" />, label: "Database", value: "MongoDB", color: "bg-gradient-to-br from-orange-500 to-amber-600" },
              ].map((m, i) => (
                <div key={i} className={clsx("metric-card macos-card rounded-xl p-4 flex items-center gap-3")}>
                  <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center", m.color)}>{m.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{m.value}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">{m.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* macOS App Icons */}
            <MacAppIconRow />
          </div>
        </div>
      </div>
    </section>
  );
};
