"use client";

import { useState } from "react";
import { Search, Sparkles, Mic } from "lucide-react";
import clsx from "clsx";
import styles from "./AISearch.module.scss";
import AIModal from "../AIModal/AIModal";

export default function AISearch({ setShowAIModal, setAiAnswer }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("AI Search Query:", query);
    // Simulate fetching an answer
    setAiAnswer(`This is a simulated answer for your query: "${query}"`);
    setShowAIModal(true);
    setQuery("");
  };

  return (
    <div
      className={clsx(
        styles.aiSearchContainer,
        "transition-all duration-300"
      )}
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
        />
        <button
          type="submit"
          className={clsx(
            styles.submitButton,
            "hover:bg-blue-600/20"
          )}
        >
          <Sparkles className={styles.sparklesIcon} />
        </button>
        <button
          type="button"
          className={clsx(
            styles.micButton,
            "hover:bg-blue-600/20"
          )}
          onClick={() => console.log("Mic button clicked!")}
        >
          <Mic className={styles.micIcon} />
        </button>
      </form>
    </div>
  );
}
