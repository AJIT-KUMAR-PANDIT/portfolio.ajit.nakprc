"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./SocialMediaSection.module.scss";
import * as FaIcons from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";

const SocialMediaSection = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  const iconMap = {
    ...FaIcons,
    FaXTwitter: FaXTwitter,
  };

  const brandColors = {
    FaTwitter: "#1DA1F2",
    FaFacebook: "#1877F2",
    FaLinkedin: "#0A66C2",
    FaInstagram: "#E1306C",
    FaGithub: "#333",
    FaX: "#000000",
  };

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get("/api/social");
        setSocialLinks(response.data);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <div className={clsx(styles["social-media-section"])}>
      {socialLinks.map((link) => {
        const IconComponent = iconMap[link.icon];
        const bgColor = brandColors[link.icon] || "#555";

        return (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles["social-icon-link"])}
            style={{ backgroundColor: bgColor }}
          >
            {IconComponent && (
              <IconComponent className={clsx(styles["social-icon"])} />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SocialMediaSection;