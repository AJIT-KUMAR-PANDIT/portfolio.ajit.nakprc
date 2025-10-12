import Typewriter from "@/components/ui/TypeWriter";
import React from "react";

export const FirstHeroSection = () => {
  return (
    <>
      <div className="text-[21vmin]  myFont h-screen overflow-hidden p-12">
        <Typewriter
          texts={[
            { text: "Hi", size: "text-[25vmin]" },
            { text: "I am", size: "text-[21vmin]" },
            { text: "AJIT KUMAR PANDIT", size: "text-[16vmin]" },
            {
              text: "CREATIVE <br /> FULL STACK DEVELOPER",
              size: "text-[9vmin]  ",
            },
          ]}
          typingSpeed={150}
          pauseDuration={1000}
        />
      </div>
    </>
  );
};
