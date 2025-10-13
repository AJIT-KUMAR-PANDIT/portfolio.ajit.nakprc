"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./LaserPointer.module.scss";

const LaserPointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add new point to trail
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
        opacity: 1,
      };

      trailRef.current = [...trailRef.current, newPoint].slice(-20);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animate trail fade out
    const animateTrail = () => {
      trailRef.current = trailRef.current
        .map((point) => ({
          ...point,
          opacity: point.opacity - 0.05,
        }))
        .filter((point) => point.opacity > 0);

      setTrail([...trailRef.current]);
      animationFrameRef.current = requestAnimationFrame(animateTrail);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animationFrameRef.current = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Laser Trail Lines */}
      <svg className={styles.laserTrail}>
        {trail.length > 1 && (
          <g>
            {trail.map((point, index) => {
              if (index === 0) return null;
              const prevPoint = trail[index - 1];
              return (
                <line
                  key={point.id}
                  x1={prevPoint.x}
                  y1={prevPoint.y}
                  x2={point.x}
                  y2={point.y}
                  className={styles.laserLine}
                  style={{
                    opacity: point.opacity,
                    strokeWidth: 2 + point.opacity * 2,
                  }}
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* Laser Pointer Cursor */}
      {isVisible && (
        <div
          className={styles.laserPointer}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div className={styles.laserDot}></div>
          <div className={styles.laserGlow}></div>
          <div className={styles.crosshair}>
            <div className={styles.crosshairLine}></div>
            <div className={styles.crosshairLine}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LaserPointer;
