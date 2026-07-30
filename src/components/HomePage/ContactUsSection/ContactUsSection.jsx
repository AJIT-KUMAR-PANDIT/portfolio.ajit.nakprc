"use client";
import clsx from "clsx";
import styles from "./ContactUsSection.module.scss";
import {
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
} from "react-icons/fa";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SocialMediaSection from "@/components/common/SocialMediaSection/SocialMediaSection";
import { submitContactForm } from "@/app/actions/ContactForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

export default function ContactSection() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: "loading...", phone: "loading...", location: "loading..." });

  useEffect(() => {
    axios.get("/api/contact").then((r) => setContactInfo(r.data)).catch(() => setContactInfo({ email: "error", phone: "error", location: "error" }));
  }, []);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const result = await submitContactForm(data);
    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
      gsap.from(".success-check", { scale: 0, rotation: -180, duration: 0.6, ease: "back.out(2)" });
    } else {
      alert("Failed to send message.");
    }
    setIsSubmitting(false);
  };

  useGSAP(() => {
    gsap.from(".contact-title", { y: 40, opacity: 0, skewX: -5, duration: 0.8, ease: "power3.out", clearProps: "all" });
    gsap.from(".contact-window", { y: 30, opacity: 0, scale: 0.97, duration: 0.7, ease: "back.out(1.4)", clearProps: "all" });
    gsap.from(".contact-form-field", { x: -20, opacity: 0, duration: 0.45, stagger: 0.08, ease: "power2.out", clearProps: "all" });
    gsap.from(".contact-info-item", { x: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: "power2.out", clearProps: "all" });
  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className={clsx(styles.contactSection)}>
      <div className={clsx("macos-section")}>
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="macos-badge inline-flex items-center gap-2 mb-3">
            <span className="dot bg-blue-500" /> Contact
          </div>
          <h2 className={clsx("contact-title text-4xl md:text-5xl font-bold tracking-tight")}>Let's Connect</h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-lg mx-auto mt-2">Have a project in mind? I'd love to hear about it.</p>
        </div>

        {/* macOS Window */}
        <div className={clsx("contact-window", "macos-window rounded-2xl max-w-3xl mx-auto")}>
          <div className="rounded-t-2xl">
            <div className="macos-titlebar justify-between px-6 py-3" style={{ height: 48 }}>
              <TrafficLights />
              <span className="titlebar-center text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaEnvelope className="w-3.5 h-3.5 opacity-50" /> Contact — Get in Touch
              </span>
              <span className="titlebar-spacer" />
            </div>
          </div>

          <div className="macos-content !p-5 md:!p-7">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Contact Info */}
              <div className="space-y-4 contact-info-item">
                <div className="macos-card rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Get In Touch</h3>
                  <div className="space-y-3">
                    {[
                      { icon: FaEnvelope, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                      { icon: FaPhone, label: "Phone", value: contactInfo.phone, href: `tel:+916200281082` },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 uppercase tracking-wider">{item.label}</div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            <a href={item.href} className="hover:underline">{item.value}</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div className="macos-card rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Follow me on</h4>
                  <SocialMediaSection />
                </div>
              </div>

              {/* Right: Form */}
              <div className="contact-form-card">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <FaCheckCircle className="success-check w-12 h-12 text-green-500 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Message Sent!</h4>
                    <p className="text-sm text-gray-500 mt-1">Thank you for reaching out.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {[
                      { label: "Name", name: "name", type: "text", placeholder: "Your full name" },
                      { label: "Email", name: "emailAddress", type: "email", placeholder: "Your email address" },
                      { label: "Subject", name: "subject", type: "text", placeholder: "Subject" },
                      { label: "Phone (optional)", name: "phoneNumber", type: "tel", placeholder: "Your phone number" },
                    ].map((field) => (
                      <div key={field.name} className="contact-form-field">
                        <label htmlFor={field.name} className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{field.label}</label>
                        <input id={field.name} name={field.name} type={field.type} required placeholder={field.placeholder} onChange={handleChange} className="w-full macos-input text-sm" />
                      </div>
                    ))}
                    <div className="contact-form-field">
                      <label htmlFor="message" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Message</label>
                      <textarea id="message" name="message" required rows={4} placeholder="Tell me about your project…" onChange={handleChange} className="w-full macos-input text-sm resize-none" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full macos-btn-primary flex items-center justify-center gap-2 py-3 text-sm font-medium">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…
                        </>
                      ) : (
                        <>Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="macos-card rounded-xl max-w-3xl mx-auto mt-8 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to Start Your Project?</h3>
          <p className="text-sm text-gray-500 mb-4">Let's discuss your ideas and bring them to life.</p>
          <div className="flex items-center justify-center gap-3">
            {contactInfo.scheduleCallUrl && (
              <a href={contactInfo.scheduleCallUrl} target="_blank" rel="noopener noreferrer" className="macos-btn-primary text-sm">Schedule a Call</a>
            )}
            <a href="#projects" className="macos-btn-secondary text-sm">View My Work</a>
          </div>
        </div>
      </div>
    </section>
  );
}
