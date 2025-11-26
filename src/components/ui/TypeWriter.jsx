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

      if (charIndex < currentText.length) {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        // Text fully typed
        if (textIndex === texts.length - 1) {
          // If it's the last text, stop here
          return;
        }
        // Otherwise, move to the next text after a pause
        setTimeout(() => {
          setDisplayedText(""); // Clear displayed text for the next word
          setCharIndex(0);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, pauseDuration);
      }
    };

    // Only set timeout if there's more to type or it's not the last text
    const shouldContinueTyping = !(
      textIndex === texts.length - 1 &&
      charIndex === texts[textIndex].text.length
    );

    let timeout;
    if (shouldContinueTyping) {
      timeout = setTimeout(handleTyping, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, pauseDuration]);

  const currentItem = texts[textIndex];
  const currentSize = currentItem ? currentItem.size : "";

  return (
    <span
      className={`pr-[0px] mr-[0px] border-r-[9px] border-[#1e66e1]  text-center !important ${currentSize}`}
    >
      <span dangerouslySetInnerHTML={{ __html: displayedText }} />
    </span>
  );
};

export default Typewriter;
