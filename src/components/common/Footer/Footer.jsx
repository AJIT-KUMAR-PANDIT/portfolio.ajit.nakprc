"use client";
import React, { useState } from "react";
import styles from "./Footer.module.scss";
import clsx from "clsx";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaGlobe } from "react-icons/fa6";
import { Send, Sparkles } from "lucide-react";

function TrafficLights() {
  return (
    <div className="flex items-center gap-[7px]">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center text-[7px] text-black/25 cursor-pointer hover:text-black/40 transition-colors"><span>✕</span></div>
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[7px] text-black/25 cursor-pointer hover:text-black/40 transition-colors"><span>−</span></div>
      <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center text-[7px] text-white/30 cursor-pointer hover:text-white/50 transition-colors font-bold"><span>+</span></div>
    </div>
  );
}

export const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("TRANSMITTING...");
    setTimeout(() => {
      setStatus("Message Sent Successfully! Thank you.");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 4000);
    }, 1200);
  };

  const socialLinks = [
    { Icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: FaXTwitter, href: "https://twitter.com", label: "X / Twitter" },
    { Icon: FaGlobe, href: "https://linktr.ee", label: "LinkTree" },
  ];

  return (
    <footer className={clsx(styles.footerSection, "macos-section !py-10")}>
      {/* macOS-style "About" window */}
      <div className="macos-window rounded-2xl max-w-4xl mx-auto">
        <div className="rounded-t-2xl">
          <div className="macos-titlebar justify-between px-6 py-3" style={{ height: 48 }}>
            <TrafficLights />
            <span className="titlebar-center text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 opacity-50" /> About — Ajit Kumar Pandit
            </span>
            <span className="titlebar-spacer" />
          </div>
        </div>

        <div className="macos-content !p-6 md:!p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Open to opportunities
            </div>
            <h2 className={clsx("text-3xl md:text-4xl font-bold tracking-tight mb-2")}>
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">Connect, Innovate, Succeed</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">Initiate contact for full-stack projects, architecture consultation, or technical inquiries.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Quick Contact Form */}
            <div className={clsx("macos-card rounded-xl p-5")}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-blue-500" /> Quick Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                {[
                  { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", name: "email", type: "email", placeholder: "Your email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase">{f.label}</label>
                    <input type={f.type} required placeholder={f.placeholder} value={formData[f.name]} onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })} className="w-full macos-input text-sm" />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase">Message</label>
                  <textarea required rows={3} placeholder="Write your message…" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full macos-input text-sm resize-none" />
                </div>
                <button type="submit" className={clsx("w-full macos-btn-primary flex items-center justify-center gap-2 py-2.5 text-xs font-medium")}>
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
                {status && (
                  <div className="text-center text-xs text-blue-600 dark:text-blue-400 font-medium animate-pulse">{status}</div>
                )}
              </form>
            </div>

            {/* Right: Info + Social */}
            <div className="space-y-5">
              {/* Identity Card */}
              <div className={clsx("macos-card rounded-xl p-6 text-center")}>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-950/40 dark:to-violet-950/40 border-2 border-blue-300/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl text-blue-600 dark:text-blue-400 font-bold">AKP</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ajit Kumar Pandit</h3>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mt-1 uppercase tracking-wider">Full Stack Developer</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">Dedicated to engineering high-performance web systems and intuitive digital products.</p>

                <div className="mt-4 space-y-2 text-xs font-mono">
                  {[
                    { prefix: "EMAIL:", value: "ajit@nakprc.com", href: "mailto:ajit@nakprc.com" },
                    { prefix: "PHONE:", value: "+91 6200281082", href: "tel:+916200281082" },
                    { prefix: "LOCATION:", value: "India", href: null },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span className="text-blue-500 font-bold">&gt;</span>
                      {item.href ? (
                        <a href={item.href} className="hover:underline">{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 justify-center">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="macos-card rounded-lg p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:scale-[1.05]">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={clsx("mt-8 pt-6 border-t", "border-gray-100 dark:border-white/5 text-center")}>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ajit Kumar Pandit. All rights reserved.</p>
            <p className="text-[11px] text-gray-400 mt-1">Built with <span className="text-blue-500 font-medium">Next.js</span> · <span className="text-purple-500 font-medium">Tailwind</span> · <span className="text-green-500 font-medium">GSAP</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};
