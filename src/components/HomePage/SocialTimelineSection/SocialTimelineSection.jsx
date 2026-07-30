"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./SocialTimelineSection.module.scss";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaXTwitter } from "react-icons/fa6";

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

function TwitterIcon({ className }) {
  return <FaXTwitter className={className} />;
}

const tweets = [
  { id: "1193041834731286528", author: "Google Cloud Tech", handle: "@GoogleCloudTech", gradient: "linear-gradient(135deg, #4285F4, #34A853)", initials: "GC", text: "Glad you like the t-shirt Ajit! Keep up the good work 😀", date: "November 9, 2019" },
  { id: "1222173931899101184", author: "Google Cloud Tech", handle: "@GoogleCloudTech", gradient: "linear-gradient(135deg, #4285F4, #34A853)", initials: "GC", text: "What a nice t-shirt, Ajit. Thank you for sharing with us! -TP", date: "January 28, 2020" },
  { id: "2062873145707528253", author: "Hostinger", handle: "@Hostinger", gradient: "linear-gradient(135deg, #F24E1E, #FF2C5F)", initials: "H", text: "Happy you are here! 😉", date: "June 5, 2026" },
];

export default function SocialTimelineSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useGSAP(() => {
    gsap.from(".timeline-title", { y: 40, opacity: 0, skewX: -5, duration: 0.8, ease: "power3.out", clearProps: "all" });
    gsap.from(".timeline-card-anim", { y: 25, opacity: 0, scale: 0.95, duration: 0.6, stagger: 0.15, ease: "back.out(1.4)", clearProps: "all" });
  }, { scope: sectionRef });

  return (
    <section id="social-timeline" ref={sectionRef} className="macos-section" style={{ y: yOffset }}>
      {/* Section Title */}
      <div className="text-center mb-10">
        <div className="macos-badge inline-flex items-center gap-2 mb-3">
          <span className="dot bg-purple-500" /> Social Timeline
        </div>
        <h2 className="timeline-title text-4xl md:text-5xl font-bold tracking-tight">Words of Encouragement</h2>
      </div>

      {/* macOS Window */}
      <div className="macos-window rounded-2xl max-w-3xl mx-auto">
        <div className="rounded-t-2xl">
          <div className="macos-titlebar justify-between px-6 py-3" style={{ height: 48 }}>
            <TrafficLights />
            <span className="titlebar-center text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaXTwitter className="w-3.5 h-3.5 opacity-50" /> Twitter — Encouragement
            </span>
            <span className="titlebar-spacer" />
          </div>
        </div>

        <div className="macos-content !p-5 md:!p-7">
          <div className="grid gap-4">
            {tweets.map((tweet, idx) => (
              <motion.div
                key={tweet.id}
                className={clsx("timeline-card-anim macos-card rounded-xl p-5 hover:scale-[1.01] transition-transform cursor-pointer")}
                style={{ background: `linear-gradient(135deg, rgba(${idx === 2 ? "242,78,30" : "99,102,241"},0.04), rgba(${idx === 2 ? "255,44,95" : "124,58,237"},0.03))` }}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: tweet.gradient }}>
                      {tweet.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{tweet.author}</div>
                      <div className="text-xs text-gray-500">{tweet.handle}</div>
                    </div>
                  </div>
                  <a href={`https://x.com/${tweet.handle.replace("@", "")}/status/${tweet.id}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">{tweet.text}</p>
                <a href={`https://x.com/${tweet.handle.replace("@", "")}/status/${tweet.id}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                  {tweet.date}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
