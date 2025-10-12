import Typewriter from "@/components/ui/TypeWriter";
import React from "react";
import styles from "./FirstHeroSection.module.scss";
import clsx from "clsx";

export const FirstHeroSection = () => {
  return (
    <section className="flex justify-center items-center">
      <div
        className={clsx(
          styles["my-text"],
          styles["text-stroke"],
          "overflow-hidden font-extrabold myFont"
        )}
      >
        <Typewriter
          texts={[
            {
              text: "Hi, I <br/> Develop <br /> Design <br /> Publish <br /> Web Applications",
              size: "text-[9vmin]  ",
            },
          ]}
          typingSpeed={150}
          pauseDuration={1000}
        />
      </div>
    </section>
  );
};
