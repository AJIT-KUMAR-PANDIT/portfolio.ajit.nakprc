"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/common/Loader/Loader";
import Dock from "@/components/common/Dock/Dock";
import { Nav } from "@/components/common/Nav/Nav";
import AIModal from "@/components/common/AIModal/AIModal";
import AISearch from "@/components/common/AISearch/AISearch";
import BackgroundAvatar from "../BackgroundAvatar/BackgroundAvatar";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
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
        <>
          <BackgroundAvatar />
          <Nav />
          {children}
          <Dock />
          <AISearch setShowAIModal={setShowAIModal} setAiAnswer={setAiAnswer} />
          <AIModal
            show={showAIModal}
            onClose={closeAIModal}
            answer={aiAnswer}
          />
        </>
      )}
    </>
  );
}
