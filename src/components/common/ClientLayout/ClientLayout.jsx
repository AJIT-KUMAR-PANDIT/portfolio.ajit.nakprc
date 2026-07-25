"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/common/Loader/Loader";
import Dock from "@/components/common/Dock/Dock";
import { Nav } from "@/components/common/Nav/Nav";
import AIModal from "@/components/common/AIModal/AIModal";
import AISearch from "@/components/common/AISearch/AISearch";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");

  useEffect(() => {
    let locomotiveScroll;
    
    // Initialize Locomotive Scroll for smooth scrolling
    import("locomotive-scroll").then((LocomotiveScroll) => {
      locomotiveScroll = new LocomotiveScroll.default({
        lenisOptions: {
          lerp: 0.1,
          duration: 1.2,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        }
      });
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  const closeAIModal = () => {
    setShowAIModal(false);
    setAiAnswer("");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div data-scroll-container>
          <Nav />
          {children}
          <Dock />
          <AISearch setShowAIModal={setShowAIModal} setAiAnswer={setAiAnswer} />
          <AIModal
            show={showAIModal}
            onClose={closeAIModal}
            answer={aiAnswer}
          />
        </div>
      )}
    </>
  );
}
