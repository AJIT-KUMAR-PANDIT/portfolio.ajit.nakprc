"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Terminal, Zap } from "lucide-react";

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

// macOS-style skill chip with progress
function SkillChip({ name, image, level }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <div className="macos-card rounded-xl p-4 hover:scale-[1.02] transition-transform group cursor-default">
      <div className="flex items-center gap-3 mb-3">
        <img src={image} alt={name} className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
      </div>
      <div className="macos-progress">
        <div
          className={clsx("fill", mounted ? "animate-width" : "")}
          style={{ width: mounted ? `${level}%` : 0, transition: "width 1s ease 0.2s" }}
        />
      </div>
    </div>
  );
}

// macOS Tab Bar
function MacTabBar({ tabs, active, onChange }) {
  return (
    <div className="macos-tabs">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={clsx("tab-btn", active === t ? "active" : "")}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get("/api/skills").then((r) => { setSkillsData(r.data); setLoading(false); }).catch(console.error);
  }, []);

  useGSAP(() => {
    if (loading || skillsData.length === 0) return;
    gsap.from(".skills-title", { y: 40, opacity: 0, skewX: -5, duration: 0.8, ease: "power3.out", clearProps: "all" });
    gsap.from(".skills-tab-anim", { y: 15, opacity: 0, scale: 0.92, duration: 0.5, stagger: 0.06, ease: "back.out(1.6)", clearProps: "all" });
    gsap.from(".skills-window", { y: 30, opacity: 0, scale: 0.97, duration: 0.7, ease: "back.out(1.4)", clearProps: "all" });
    gsap.from(".skill-chip-anim", { y: 20, opacity: 0, scale: 0.95, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" });
  }, { scope: containerRef, dependencies: [loading, skillsData] });

  const tabs = activeTab === "ALL"
    ? ["ALL", ...skillsData.map((c) => c.category)]
    : ["ALL"];

  return (
    <section id="skills" ref={containerRef} className="macos-section">
      {/* Section Title */}
      <div className="text-center mb-10">
        <div className="macos-badge inline-flex items-center gap-2 mb-3">
          <span className="dot bg-green-500" /> Tech Stack
        </div>
        <h2 className="skills-title text-4xl md:text-5xl font-bold tracking-tight">Tech Console</h2>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto mt-2">Core technologies, frameworks, and architecture tools engineered for production.</p>
      </div>

      {/* Tab Bar */}
      <div className="flex justify-center mb-8 skills-tab-anim">
        <MacTabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* macOS Window */}
      <div className="macos-window rounded-2xl max-w-4xl mx-auto skills-window">
        <div className="rounded-t-2xl">
          <div className="macos-titlebar justify-between px-6 py-3" style={{ height: 48 }}>
            <TrafficLights />
            <span className="titlebar-center text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 opacity-50" /> Skills — Capabilities
            </span>
            <span className="titlebar-spacer" />
          </div>
        </div>

        <div className="macos-content !p-5 md:!p-7">
          {loading ? (
            <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{activeTab === "ALL" ? "All Technologies" : activeTab}</span>
                </div>
                <span className="macos-tag">{skillsData.filter((c) => activeTab === "ALL" || c.category === activeTab).reduce((a, c) => a + c.skills.length, 0)} modules</span>
              </div>

              {/* Skills Grid — macOS style */}
              <div className="macos-grid-3">
                {skillsData.filter((c) => activeTab === "ALL" || c.category === activeTab).flatMap((c) =>
                  c.skills.map((s, i) => (
                    <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="skill-chip-anim block no-underline">
                      <SkillChip name={s.name} image={s.image} level={80 + (i % 4) * 5} />
                    </a>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
