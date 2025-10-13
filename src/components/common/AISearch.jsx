"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import clsx from "clsx";

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("AI Search Query:", query);
    // TODO: Integrate with your AI or backend search endpoint
    setQuery("");
  };

  return (
    <div
      className={clsx(
        "fixed bottom-[calc(6rem+0.25rem)] left-1/2 -translate-x-1/2",
        "z-40 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]",
        "transition-all duration-300"
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={clsx(
          "flex gap-2 items-center px-4 py-2 rounded-full shadow-lg",
          "border backdrop-blur-md bg-neutral-900/80 border-neutral-700",
          "focus-within:ring-2 focus-within:ring-blue-500/60",
          "transition-all duration-300"
        )}
      >
        <Search
          className={clsx(
            "w-5 h-5 text-neutral-400 transition-all duration-300",
            focused && "text-blue-400"
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
            "flex-1 bg-transparent outline-none text-neutral-200",
            "text-sm placeholder-neutral-500 sm:text-base"
          )}
        />
        <button
          type="submit"
          className="p-2 rounded-full transition-colors duration-200 hover:bg-blue-600/20"
        >
          <Sparkles className="w-5 h-5 text-blue-400" />
        </button>
      </form>
    </div>
  );
}
