"use client";
import clsx from "clsx";
import styles from "./ContactUsSection.module.scss";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
import SocialMediaSection from "@/components/common/SocialMediaSection/SocialMediaSection";
import { submitContactForm } from "@/app/actions/ContactForm";

export default function ContactSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const mapFilter = isDark
    ? "invert(180deg) brightness(0.8) contrast(1.2)"
    : "saturate(0.7) brightness(0.85) contrast(1.1)";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "loading...",
    phone: "loading...",
    location: "loading...",
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get("/api/contact");
        setContactInfo(response.data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
        setContactInfo({
          email: "error loading",
          phone: "error loading",
          location: "error loading",
        });
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await submitContactForm(formData);

    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        name: "",
        emailAddress: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    } else {
      console.error("Form submission failed:", result.message);
      alert("Failed to send message. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className={clsx(styles.contactSection)}>
      {/* Animated Google Maps — zooms to India then out */}
      <div className={clsx(styles["map-container"])}>
        <iframe
          className={clsx(styles["map-iframe"])}
          style={{ filter: mapFilter }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117702.62603407589!2d86.128048937207!3d22.79479012018744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e31989f0e2b5%3a0xeeec8e81ce9b344!2sjamshedpur%2c%20jharkhand!5e0!3m2!1sen!2sin!4v1778705681590!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of India"
        />
      </div>

      <div className={clsx(styles.contentWrapper)}>
        <div className={clsx(styles.textCenter)}>
          <h2 className={clsx(styles.connectTitle)}>Let's Connect</h2>
          <p className={clsx(styles.connectDescription)}>
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something amazing together.
          </p>
        </div>

        <div className={clsx(styles.gridContainer)}>
          {/* Contact Information */}
          <div className={clsx(styles.contactInfo)}>
            <div className={clsx(styles.contactInfoCard)}>
              <h3 className={clsx(styles.contactInfoTitle)}>Get In Touch</h3>
              <div className={clsx(styles.contactInfoDetails)}>
                <div className={clsx(styles.contactInfoItem)}>
                  <div className={clsx(styles.contactInfoIconWrapper)}>
                    <FaEnvelope className={clsx(styles.contactInfoIcon)} />
                  </div>
                  <div>
                    <p className={clsx(styles.contactInfoLabel)}>Email</p>
                    <p className={clsx(styles.contactInfoValue)}>
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                <div className={clsx(styles.contactInfoItem)}>
                  <div className={clsx(styles.contactInfoIconWrapper)}>
                    <FaPhone className={clsx(styles.contactInfoIcon)} />
                  </div>
                  <div>
                    <p className={clsx(styles.contactInfoLabel)}>Phone</p>
                    <p className={clsx(styles.contactInfoValue)}>
                      <a href="tel:+916200281082" style={{ color: "inherit", textDecoration: "none" }}>
                        {contactInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className={clsx(styles.contactInfoItem)}>
                  <div className={clsx(styles.contactInfoIconWrapper)}>
                    <FaMapMarkerAlt className={clsx(styles.contactInfoIcon)} />
                  </div>
                  <div>
                    <p className={clsx(styles.contactInfoLabel)}>Location</p>
                    <p className={clsx(styles.contactInfoValue)}>
                      {contactInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className={clsx(styles.socialLinks)}>
                <p className={clsx(styles.socialLinksLabel)}>Follow me on:</p>
                <SocialMediaSection />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={clsx(styles.contactFormWrapper)}>
            <h3 className={clsx(styles.contactFormTitle)}>Send Me a Message</h3>

            {isSubmitted ? (
              <div className={clsx(styles.messageSent)}>
                <FaCheckCircle className={clsx(styles.messageSentIcon)} />
                <h4 className={clsx(styles.messageSentTitle)}>Message Sent!</h4>
                <p className={clsx(styles.messageSentDescription)}>
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={clsx(styles.form)}>
                <div>
                  <label htmlFor="name" className={clsx(styles.label)}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={clsx(styles.input)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={clsx(styles.label)}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                    className={clsx(styles.input)}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={clsx(styles.label)}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={clsx(styles.input)}
                    placeholder="Enter the subject"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={clsx(styles.label)}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={clsx(styles.input)}
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={clsx(styles.label)}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className={clsx(styles.textarea)}
                    placeholder="Tell me about your project or just say hello!"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={clsx(styles.submitButton, {
                    [styles.disabled]: isSubmitting,
                  })}
                >
                  {isSubmitting ? (
                    <>
                      <div className={clsx(styles.spinner)}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className={clsx(styles.sendIcon)} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className={clsx(styles.callToAction)}>
          <div className={clsx(styles.callToActionCard)}>
            <h3 className={clsx(styles.callToActionTitle)}>
              Ready to Start Your Project?
            </h3>
            <p className={clsx(styles.callToActionDescription)}>
              Let's discuss your ideas and bring them to life with cutting-edge
              technology and innovative solutions.
            </p>
            <div className={clsx(styles.callToActionButtons)}>
              <a
                href={contactInfo.scheduleCallUrl}
                className={clsx(styles.callToActionButtonPrimary)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Call
              </a>
              <a href="#" className={clsx(styles.callToActionButtonSecondary)}>
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
