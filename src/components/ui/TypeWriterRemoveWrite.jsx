"use client";

import React, { useState, useEffect } from "react";

const Typewriter = ({ texts, typingSpeed = 150, pauseDuration = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentItem = texts[textIndex];
      const currentText = currentItem.text;

      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayedText((prev) => prev + currentText[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText((prev) => prev.substring(0, prev.length - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, pauseDuration]);

  const currentItem = texts[textIndex];
  const currentSize = currentItem ? currentItem.size : "";

  return (
    <span className={`pr-[0px] mr-[0px] border-r-[9px] border-[#1e66e1] ${currentSize}`}>
      <span dangerouslySetInnerHTML={{ __html: displayedText }} />
    </span>
  );
};

export default Typewriter;
