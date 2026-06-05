"use client";

import { motion } from "framer-motion";
import styles from "./SocialTimelineSection.module.scss";
import clsx from "clsx";
import { FaXTwitter } from "react-icons/fa6";

const tweets = [
  {
    id: "1193041834731286528",
    author: "Google Cloud Tech",
    handle: "@GoogleCloudTech",
    gradient: "linear-gradient(135deg, #4285F4, #34A853)",
    initials: "GC",
    text: "Glad you like the t-shirt Ajit! Keep up the good work 😀",
    date: "November 9, 2019",
  },
  {
    id: "1222173931899101184",
    author: "Google Cloud Tech",
    handle: "@GoogleCloudTech",
    gradient: "linear-gradient(135deg, #4285F4, #34A853)",
    initials: "GC",
    text: "What a nice t-shirt, Ajit. Thank you for sharing with us! -TP",
    date: "January 28, 2020",
  },
  {
    id: "2062873145707528253",
    author: "Hostinger",
    handle: "@Hostinger",
    gradient: "linear-gradient(135deg, #F24E1E, #FF2C5F)",
    initials: "H",
    text: "Happy you are here! 😉",
    date: "June 5, 2026",
  },
];

function TwitterIcon({ className }) {
  return <FaXTwitter className={className} />;
}

function TimelineCard({ tweet, index }) {
  return (
    <motion.div
      className={clsx(styles["timeline-card"])}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      {/* Header: avatar + author */}
      <div className={clsx(styles["card-header"])}>
        <div
          className={clsx(styles["avatar-wrapper"])}
          style={{ background: tweet.gradient }}
        >
          <span className={clsx(styles["avatar-text"])}>{tweet.initials}</span>
        </div>
        <div className={clsx(styles["author-info"])}>
          <span className={clsx(styles["author-name"])}>{tweet.author}</span>
          <span className={clsx(styles["author-handle"])}>{tweet.handle}</span>
        </div>
        <a
          href={`https://x.com/${tweet.handle.replace("@", "")}/status/${tweet.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(styles["platform-icon"])}
          aria-label="View on Twitter"
        >
          <TwitterIcon className={clsx(styles["twitter-icon"])} />
        </a>
      </div>

      {/* Tweet text */}
      <p className={clsx(styles["tweet-text"])}>{tweet.text}</p>

      {/* Date footer */}
      <div className={clsx(styles["card-footer"])}>
        <a
          href={`https://x.com/${tweet.handle.replace("@", "")}/status/${tweet.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(styles["date-link"])}
        >
          {tweet.date}
        </a>
      </div>
    </motion.div>
  );
}

export default function SocialTimelineSection() {
  return (
    <section id="social-timeline" className={clsx(styles["social-timeline"])}>
      <h1 className={clsx(styles["title"])}>Social Timeline</h1>
      <p className={clsx(styles["title-sub"])}>
        Words of <span className={clsx(styles["highlight"])}>Encouragement</span>
      </p>

      <div className={clsx(styles["timeline-row"])}>
        {tweets.map((tweet, idx) => (
          <TimelineCard key={tweet.id} tweet={tweet} index={idx} />
        ))}
      </div>
    </section>
  );
}
