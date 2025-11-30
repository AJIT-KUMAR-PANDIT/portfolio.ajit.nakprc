"use client";

import { useState } from "react";
import clsx from "clsx";
import { Code, Palette, Rocket, Search, Smartphone, Zap } from "lucide-react";
import styles from "./ServicesSection.module.scss";

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Building responsive, performant websites and web applications using modern frameworks.",
      features: [
        "Custom Web Apps",
        "E-commerce Solutions",
        "CMS Integration",
        "API Development",
      ],
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description:
        "Creating beautiful, mobile-first designs that work seamlessly across all devices.",
      features: [
        "Mobile-First Approach",
        "Cross-Browser Testing",
        "Progressive Web Apps",
        "UI/UX Design",
      ],
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description:
        "Optimizing websites for speed, accessibility, and search engine rankings.",
      features: [
        "Speed Optimization",
        "SEO Best Practices",
        "Code Splitting",
        "Lazy Loading",
      ],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Designing intuitive, user-friendly interfaces that engage users.",
      features: [
        "Wireframing",
        "Prototyping",
        "Design Systems",
        "User Research",
      ],
    },
    {
      icon: Zap,
      title: "Full Stack Development",
      description:
        "End-to-end development services from database design to frontend implementation.",
      features: [
        "Backend APIs",
        "Database Design",
        "Authentication",
        "Cloud Deployment",
      ],
    },
    {
      icon: Search,
      title: "Consulting & Support",
      description:
        "Technical consulting, code reviews, and ongoing support for your projects.",
      features: [
        "Code Review",
        "Technical Consulting",
        "Maintenance",
        "Training",
      ],
    },
  ];

  return (
    <section id="services" className={clsx(styles.servicesSection)}>
      <div className={clsx(styles.titleMain)}>SERVICES</div>
      <div className={clsx(styles.titleSub)}>
        Professional Web Development Services
        <span className={clsx(styles.highlight)}>
          &nbsp; Tailored To Your Needs.
        </span>
      </div>

      <div className={clsx(styles.contentWrapper)}>
        <div className={clsx(styles.servicesGrid)}>
          {services.map((service, index) => (
            <div key={index} className={clsx(styles.serviceCard)}>
              <div className={clsx(styles.serviceIcon)}>
                <service.icon size={40} />
              </div>
              <h3>{service.title}</h3>
              <p className={clsx(styles.description)}>{service.description}</p>
              <ul className={clsx(styles.featuresList)}>
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <span className={clsx(styles.checkmark)}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
