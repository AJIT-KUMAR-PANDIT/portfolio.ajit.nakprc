"use client";
import React from "react";
import styles from "./Footer.module.scss";
import clsx from "clsx";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className={clsx(styles["footer-container"])}>
      <div className={clsx(styles["moving-text-container"])}>
        <p className={clsx(styles["moving-text"], "myFont")}>
          AJIT KUMAR PANDIT
        </p>
      </div>
      <div className={clsx(styles["footer-top"])}>
        <div
          className={clsx(styles["footer-section"], styles["about-section"])}
        >
          <h3 className={clsx(styles["section-title"])}>Ajit Kumar Pandit</h3>
          <p className={clsx(styles["section-subtitle"])}>
            ENHANCING FUTURE WITH TECHNOLOGY !
          </p>
          <p className={clsx(styles["about-description"])}>
            Passionate Full Stack Developer with expertise in crafting robust
            and scalable web applications. Dedicated to continuous learning and
            delivering high-quality solutions.
          </p>
        </div>

        <div
          className={clsx(styles["footer-section"], styles["links-section"])}
        >
          <h3 className={clsx(styles["section-title"])}>Quick Links</h3>
          <ul className={clsx(styles["quick-links-list"])}>
            <li>
              <a href="#" className={clsx(styles["footer-link"])}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className={clsx(styles["footer-link"])}>
                About
              </a>
            </li>
            <li>
              <a href="#" className={clsx(styles["footer-link"])}>
                Skills
              </a>
            </li>
            <li>
              <a href="#" className={clsx(styles["footer-link"])}>
                Projects
              </a>
            </li>
            <li>
              <a href="#" className={clsx(styles["footer-link"])}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div
          className={clsx(styles["footer-section"], styles["contact-section"])}
        >
          <h3 className={clsx(styles["section-title"])}>Get in Touch</h3>
          <p className={clsx(styles["contact-email"])}>
            Email:{" "}
            <a
              href="mailto:ajit@nakprc.com"
              className={clsx(styles["footer-link"])}
            >
              ajit@nakprc.com
            </a>
          </p>
          <p className={clsx(styles["contact-phone"])}>
            Phone:{" "}
            <a
              href="tel:+916200281082"
              className={clsx(styles["footer-link"])}
            >
              +91 6200281082
            </a>
          </p>
          <div className={clsx(styles["social-icons"])}>
            <a href="#" className={clsx(styles["social-icon"])}>
              <FaGithub />
            </a>
            <a href="#" className={clsx(styles["social-icon"])}>
              <FaLinkedin />
            </a>
            <a href="#" className={clsx(styles["social-icon"])}>
              <FaXTwitter />
            </a>
            <a href="#" className={clsx(styles["social-icon"])}>
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className={clsx(styles["footer-bottom"])}>
        <p className={clsx(styles["copyright"])}>
          © 2025 Ajit Kumar Pandit. All rights reserved.
        </p>
        <p className={clsx(styles["designed-by"])}>
          Designed and Developed with
          <span className={clsx(styles["heart-icon"])}>❤️</span> by Ajit Kumar
          Pandit
        </p>
      </div>
    </footer>
  );
};
