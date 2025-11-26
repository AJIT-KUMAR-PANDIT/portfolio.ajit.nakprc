"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./BackgroundAvatar.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BackgroundAvatar = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Total number of frames
  const frameCount = 60;
  const images = useRef([]);
  const imageSeq = useRef({ frame: 0 });

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load all images
    const loadImages = async () => {
      const imagePromises = [];

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, "0");
        img.src = `/images/avatar2/myavtar_frame_${frameNumber}.png`;

        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img);
          })
        );

        images.current[i - 1] = img;
      }

      await Promise.all(imagePromises);
      setImagesLoaded(true);
      render(); // Initial render
    };

    loadImages();

    // Render function to draw the current frame
    const render = () => {
      const index = Math.min(
        Math.floor(imageSeq.current.frame),
        frameCount - 1
      );

      const img = images.current[index];

      if (img) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scale to contain the image (prevent cropping on large screens)
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );

        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", handleResize);

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: canvas,
        anticipatePin: 1,
      },
    });

    tl.to(imageSeq.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });

    // Add position animation for medium screens and above
    if (window.innerWidth >= 768) {
      const positionTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // Move to right when frame reaches 23
      positionTl.to(
        canvas,
        {
          left: "auto",
          right: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        22 / frameCount
      ); // Position at frame 23 (index 22)
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imagesLoaded]);

  return (
    <div className="background-avatar" ref={containerRef}>
      <canvas ref={canvasRef} className="background-avatar__canvas" />
    </div>
  );
};

export default BackgroundAvatar;
