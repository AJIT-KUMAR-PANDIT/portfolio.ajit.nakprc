"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkillsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };
    fetchSkills();

    // GSAP ScrollTrigger for video pinning
    if (videoRef.current && sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: videoRef.current,
        pinSpacing: false,
        // markers: true, // Uncomment for debugging
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:flex-row w-full h-auto  relative"
    >
      {/* Skills Container */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-12 order-1 md:order-2 z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 ">My Tech Stack</h1>
        <p className="mb-8 ">
          A collection of technologies I use to build modern, robust, and
          scalable web applications.
        </p>

        <div className="space-y-6 ">
          {loading ? (
            <p className="text-gray-700 dark:text-gray-300">
              Loading skills...
            </p>
          ) : (
            skillsData.map((category, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-blue-400 mb-4 border-b-2 border-gray-700 pb-2">
                  {category.category}
                </h2>
                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <a
                      key={skillIndex}
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                    >
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="w-8 h-8 mr-3"
                      />
                      <span className="font-medium">{skill.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Video Container */}
      <div className="sticky bottom-07 inset-0 z-0 md:relative md:w-1/2 md:order-1">
        <video
          ref={videoRef}
          className="w-full h-full object-contain absolute inset-0"
          src="/assets/skillssection1.webm"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}
