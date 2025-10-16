"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, Mic, StopCircle, Send } from "lucide-react";
import clsx from "clsx";
import styles from "./AISearch.module.scss";
import { initSTT, startSTT, stopSTT, addSTTCommand } from "@/utils/stt";
import { speakText } from "@/utils/tts";

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // New state for tracking TTS

  useEffect(() => {
    // Initialize STT
    initSTT();

    // Add a command to update the query when speech is recognized
    addSTTCommand({
      indexes: ["*"], // Listen for any word
      smart: true, // Enable smart mode to get the recognized text
      action: (i, wildcard) => {
        setQuery(wildcard);
        // Automatically send voice input to the /api/ai route
        handleSubmit(null, wildcard); // Pass wildcard as query
      },
    });

    // Clean up Artyom when the component unmounts
    return () => {
      stopSTT();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopSTT();
      setIsListening(false);
    } else {
      startSTT();
      setIsListening(true);
    }
  };

  const stopSpeaking = () => {
    // Assuming artyom.js has a way to stop current speech
    // For now, we'll just set isSpeaking to false
    // In a real implementation, you'd call artyom.shutUp() or similar
    setIsSpeaking(false);
    // Clear the query when speaking is stopped manually
    setQuery("");
  };

  useEffect(() => {
    // Add a command to stop TTS when the user says "stop"
    addSTTCommand({
      indexes: ["stop"],
      smart: true,
      action: () => {
        stopSpeaking();
      },
    });
  }, []);

  const handleSubmit = async (e, voiceQuery = null) => {
    if (e) e.preventDefault(); // Prevent default form submission if triggered by event

    const currentQuery = voiceQuery || query;
    if (!currentQuery.trim()) return;

    console.log("AI Search Query:", currentQuery);
    setIsSpeaking(true); // Set speaking state to true

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userQuery: currentQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.answer || "No answer received.";

      // Speak the AI response
      speakText(aiResponse);

      setQuery(aiResponse); // Display AI response in the input field
      setIsSpeaking(false); // Set speaking state to false after response is spoken
    } catch (error) {
      console.error("Error sending query to AI API:", error);
      speakText("Error processing your request. Please try again.");
      setQuery(""); // Clear query on error as well
      setIsSpeaking(false); // Set speaking state to false on error
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const showSendButton = query.length > 0 && !isListening && !isSpeaking;

  return (
    <div
      className={clsx(styles.aiSearchContainer, "transition-all duration-300")}
    >
      <form
        onSubmit={handleSubmit}
        className={clsx(
          styles.searchForm,
          "focus-within:ring-2 focus-within:ring-blue-500/60",
          "transition-all duration-300"
        )}
      >
        <Search
          className={clsx(
            styles.searchIcon,
            focused && styles.searchIconFocused
          )}
        />
        {focused && !isSpeaking && !isListening && (
          <Sparkles
            className={clsx(
              styles.sparklesIcon,
              "absolute right-12 top-1/2 -translate-y-1/2 text-blue-400"
            )}
          />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask About Ajit..."
          className={clsx(
            styles.searchInput,
            "placeholder-neutral-500 sm:text-base"
          )}
          readOnly={isSpeaking} // Make input un-editable when AI is speaking
        />
        {isSpeaking ? (
          <button
            type="button"
            className={clsx(
              styles.micButton,
              styles.stopButton,
              "hover:bg-red-600/20"
            )}
            onClick={stopSpeaking}
          >
            <StopCircle className={styles.micIcon} />
          </button>
        ) : showSendButton ? (
          <button
            type="submit"
            className={clsx(
              styles.micButton,
              styles.sendButton,
              "hover:bg-blue-600/20"
            )}
            onClick={handleTextSubmit}
          >
            <Send className={styles.micIcon} />
          </button>
        ) : (
          <button
            type="button"
            className={clsx(
              styles.micButton,
              isListening ? styles.micButtonActive : "",
              "hover:bg-blue-600/20"
            )}
            onClick={toggleListening}
          >
            <Mic className={styles.micIcon} />
          </button>
        )}
      </form>
    </div>
  );
}
