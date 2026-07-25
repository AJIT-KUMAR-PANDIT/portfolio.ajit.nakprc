"use client";
import React, { useState } from "react";
import styles from "./Footer.module.scss";
import clsx from "clsx";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaGlobe } from "react-icons/fa6";
import { Send, Terminal, MessageSquareCode, Sparkles } from "lucide-react";

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

  return (
    <footer id="contact" className="py-20 px-4 md:px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/90 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Contact Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono mb-4 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>LET'S CONNECT // GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white mb-4">
            <span className="brand-text-gradient">Connect, Innovate, Succeed</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto font-mono">
            Initiate contact for full-stack projects, architecture consultation, or technical inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Left Column: Contact Form */}
          <div className="brand-card p-6 md:p-8 rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              <div className="flex items-center gap-2">
                <MessageSquareCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>SEND A DIRECT MESSAGE</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                  YOUR MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write message details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all resize-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full brand-btn-primary flex items-center justify-center gap-2 py-3.5 text-xs font-bold"
              >
                <Send className="w-4 h-4" />
                <span>SEND MESSAGE</span>
              </button>

              {status && (
                <div className="p-3 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs text-center font-mono">
                  {status}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Direct Info & Social Buttons */}
          <div className="space-y-8">
            
            {/* Identity Card */}
            <div className="brand-card p-8 rounded-2xl">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Ajit Kumar Pandit</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest mb-4 font-semibold">
                Full Stack MERN Developer
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                Dedicated to engineering high-performance web systems and intuitive digital products.
              </p>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">&gt; EMAIL:</span>
                  <a href="mailto:ajit@nakprc.com" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors font-medium">ajit@nakprc.com</a>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">&gt; PHONE:</span>
                  <a href="tel:+916200281082" className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors font-medium">+91 6200281082</a>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">&gt; LOCATION:</span>
                  <span className="font-medium">India</span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div>
              <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>SOCIAL CONNECT CHANNELS</span>
              </h4>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-card p-4 rounded-xl text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-3 font-medium"
                >
                  <FaGithub className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                  <span className="font-mono text-xs">GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-card p-4 rounded-xl text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-3 font-medium"
                >
                  <FaLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-mono text-xs">LinkedIn</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-card p-4 rounded-xl text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-3 font-medium"
                >
                  <FaXTwitter className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                  <span className="font-mono text-xs">X / Twitter</span>
                </a>

                <a
                  href="https://linktr.ee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-card p-4 rounded-xl text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-3 font-medium"
                >
                  <FaGlobe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono text-xs">LinkTree</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center font-mono text-xs text-slate-500 dark:text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ajit Kumar Pandit. All rights reserved.</p>
          <p className="font-medium">
            BUILT WITH <span className="text-indigo-600 dark:text-indigo-400 font-bold">NEXT.JS + TAILWIND + GSAP</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
