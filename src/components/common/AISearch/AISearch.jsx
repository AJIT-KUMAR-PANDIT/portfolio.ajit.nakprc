"use client";

import { Search, Sparkles, Mic, StopCircle, Send } from "lucide-react";
import clsx from "clsx";
import styles from "./AISearch.module.scss";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function AISearch() {
  const [inputValue, setInputValue] = useState("");
  const [AIResponse, setAIResponse] = useState("");
  const [loadingAIResponse, setLoadingAIResponse] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Web Speech API is not supported by this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setInputValue(transcript);
      fetchAIResponse(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setInputValue("");
      setAIResponse("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setInputValue("");
    setAIResponse("");
  };

  async function fetchAIResponse(query) {
    if (!query) return;
    setLoadingAIResponse(true);
    try {
      const response = await axios.post("/api/ai/tts", { query });
      const { audioBase64, textResponse } = response.data;

      // Set the AI's text response
      if (textResponse) {
        setAIResponse(textResponse);
      }

      if (audioBase64) {
        const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
        audio.play();
        setCurrentAudio(audio);
        audio.onended = () => {
          setCurrentAudio(null);
          setInputValue("");
          setAIResponse("");
        };
      }
    } catch (error) {
      console.error("Error fetching AIResponse", error);
      setAIResponse("Sorry, I couldn't get a response from the AI.");
    } finally {
      setLoadingAIResponse(false);
    }
  }

  const handleSend = () => {
    fetchAIResponse(inputValue);
    setInputValue(""); // Clear input after sending
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
          "transition-all duration-300",
          AIResponse || currentAudio ? styles.AIactive : ""
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
          value={
            loadingAIResponse
              ? "Thinking..."
              : AIResponse
              ? AIResponse
              : isListening
              ? inputValue
              : inputValue
          }
          onChange={(e) => {
            setInputValue(e.target.value);
            setAIResponse(""); // Clear AIResponse when user starts typing
          }}
          onKeyDown={handleKeyDown}
        />
        {isListening ? (
          <button onClick={stopListening} className={clsx(styles.stopButton)}>
            <StopCircle className={clsx(styles.stopCircle)} />
          </button>
        ) : currentAudio ? (
          <button
            type="button"
            onClick={stopAudio}
            className={clsx(styles.stopButton)}
          >
            <StopCircle className={clsx(styles.stopCircle)} />
          </button>
        ) : (
          <>
            <button
              type="button"
              className={clsx(styles.micButton, "hover:bg-blue-600/20")}
              onClick={startListening}
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
