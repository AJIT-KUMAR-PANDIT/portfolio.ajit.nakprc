"use client";

import { Search, Sparkles, Mic, StopCircle, Send } from "lucide-react";
import clsx from "clsx";
import styles from "./AISearch.module.scss";
import { useSpeechRecognition } from "@lobehub/tts/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AISearch() {
  const { text, start, stop, isLoading } = useSpeechRecognition("en-US", {
    autoStop: true,
  });
  const [inputValue, setInputValue] = useState("");
  const [AIResponse, setAIResponse] = useState("");
  const [loadingAIResponse, setLoadingAIResponse] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

  async function fetchAIResponse(query) {
    if (!query) return;
    setLoadingAIResponse(true);
    try {
      const response = await axios.post("/api/ai/tts", { query });
      const audioBase64 = response.data.audioBase64;
      if (audioBase64) {
        const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
        audio.play();
        setCurrentAudio(audio);
        audio.onended = () => {
          setCurrentAudio(null);
          setInputValue("");
        };
      }
      setAIResponse(`AI responded to: "${query}"`);
    } catch (error) {
      console.error("Error fetching AIResponse", error);
      setAIResponse("Sorry, I couldn't get a response from the AI.");
    } finally {
      setLoadingAIResponse(false);
    }
  }

  useEffect(() => {
    if (!isLoading && text) {
      setInputValue(text);
      fetchAIResponse(text);
    }
  }, [isLoading, text]);

  const handleSend = () => {
    fetchAIResponse(inputValue);
    setInputValue(""); // Clear input after sending
  };

  const handleStop = () => {
    stop(); // Stop speech recognition
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setInputValue(""); // Clear input field
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={clsx(styles.aiSearchContainer, "transition-all duration-300")}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className={clsx(
          styles.searchForm,
          "focus-within:ring-2 focus-within:ring-blue-500/60",
          "transition-all duration-300"
        )}
      >
        <Search className={clsx(styles.searchIcon)} />

        <Sparkles
          className={clsx(
            styles.sparklesIcon,
            "absolute right-12 top-1/2 -translate-y-1/2 text-blue-400"
          )}
        />

        <input
          type="text"
          placeholder="Ask About Ajit..."
          className={clsx(
            styles.searchInput,
            "placeholder-neutral-500 sm:text-base"
          )}
          value={loadingAIResponse ? "Loading AI Response..." : AIResponse ? AIResponse : (isLoading ? text : inputValue)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setAIResponse(""); // Clear AIResponse when user starts typing
          }}
          onKeyDown={handleKeyDown}
        />
        {isLoading ? (
          <button onClick={handleStop}>
            <StopCircle className="styles.stopCircle" />
          </button>
        ) : (
          <>
            <button
              type="button"
              className={clsx(styles.micButton, "hover:bg-blue-600/20")}
              onClick={start}
            >
              <Mic className={styles.micIcon} />
            </button>
            <button
              type="submit"
              className={clsx(styles.sendButton, "hover:bg-blue-600/20")}
            >
              <Send className={styles.sendIcon} />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
