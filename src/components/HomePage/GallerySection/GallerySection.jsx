"use client";

import { useState } from "react";
import clsx from "clsx";
import { Image as ImageIcon, Video, X } from "lucide-react";
import styles from "./GallerySection.module.scss";

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("images");
  const [lightbox, setLightbox] = useState(null);

  const images = [
    { id: 1, title: "Project Screenshot 1", url: "/images/placeholder1.jpg" },
    { id: 2, title: "Project Screenshot 2", url: "/images/placeholder2.jpg" },
    { id: 3, title: "Project Screenshot 3", url: "/images/placeholder3.jpg" },
    { id: 4, title: "Project Screenshot 4", url: "/images/placeholder4.jpg" },
    { id: 5, title: "Project Screenshot 5", url: "/images/placeholder5.jpg" },
    { id: 6, title: "Project Screenshot 6", url: "/images/placeholder6.jpg" },
  ];

  const videos = [
    {
      id: 1,
      title: "Project Demo 1",
      duration: "2:30",
      thumbnail: "/images/video-thumb1.jpg",
    },
    {
      id: 2,
      title: "Tutorial Video",
      duration: "5:45",
      thumbnail: "/images/video-thumb2.jpg",
    },
    {
      id: 3,
      title: "Showcase Reel",
      duration: "3:15",
      thumbnail: "/images/video-thumb3.jpg",
    },
  ];

  return (
    <section id="gallery" className={clsx(styles.gallerySection)}>
      <div className={clsx(styles.titleMain)}>GALLERY</div>
      <div className={clsx(styles.titleSub)}>
        Explore My Visual Portfolio
        <span className={clsx(styles.highlight)}>
          &nbsp; And Creative Work.
        </span>
      </div>

      <div className={clsx(styles.contentWrapper)}>
        {/* Tabs */}
        <div className={clsx(styles.tabs)}>
          <button
            onClick={() => setActiveTab("images")}
            className={clsx(
              styles.tab,
              activeTab === "images" && styles.active
            )}
          >
            <ImageIcon size={20} />
            Images
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={clsx(
              styles.tab,
              activeTab === "videos" && styles.active
            )}
          >
            <Video size={20} />
            Videos
          </button>
        </div>

        {/* Images Grid */}
        {activeTab === "images" && (
          <div className={clsx(styles.grid)}>
            {images.map((img) => (
              <div
                key={img.id}
                className={clsx(styles.gridItem)}
                onClick={() => setLightbox(img)}
              >
                <div className={clsx(styles.imagePlaceholder)}>
                  <ImageIcon size={40} />
                  <span>{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === "videos" && (
          <div className={clsx(styles.grid)}>
            {videos.map((video) => (
              <div key={video.id} className={clsx(styles.gridItem)}>
                <div className={clsx(styles.videoPlaceholder)}>
                  <Video size={40} />
                  <span className={clsx(styles.duration)}>
                    {video.duration}
                  </span>
                </div>
                <div className={clsx(styles.videoInfo)}>
                  <h4>{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className={clsx(styles.lightbox)}
          onClick={() => setLightbox(null)}
        >
          <button
            className={clsx(styles.closeBtn)}
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          <div
            className={clsx(styles.lightboxContent)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={clsx(styles.lightboxImage)}>
              <ImageIcon size={80} />
            </div>
            <h3>{lightbox.title}</h3>
          </div>
        </div>
      )}
    </section>
  );
}
