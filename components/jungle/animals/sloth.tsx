"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  useScrollTracker,
  useReducedMotion,
} from "@/lib/jungle-hooks";

export function Sloth() {
  const { scrollDirection } = useScrollTracker();
  const prefersReduced = useReducedMotion();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    // Yawn animation
    setTimeout(() => setIsClicked(false), 2000);
  };

  if (prefersReduced) {
    return (
      <div
        className="pointer-events-auto cursor-pointer"
        style={{
          position: "fixed",
          left: "50%",
          top: 64,
          transform: "translateX(-50%)",
          zIndex: 41,
        }}
      >
        <SlothSVG eyeState="sleepy" mouthState="closed" />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-auto cursor-pointer hidden md:block"
      style={{
        position: "fixed",
        zIndex: 41,
      }}
      initial={{ x: "calc(50vw - 25px)", y: 56, opacity: 0 }}
      animate={{ x: "calc(50vw - 25px)", y: 56, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          rotate: [0, 1, -1, 0.5, -0.5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center top" }}
      >
        <SlothSVG
          eyeState={isClicked ? "wide" : isHovered ? "open" : "sleepy"}
          mouthState={isClicked ? "yawn" : "closed"}
          lookDirection={scrollDirection === "down" ? "down" : "up"}
        />
      </motion.div>
    </motion.div>
  );
}

function SlothSVG({
  eyeState = "sleepy",
  mouthState = "closed",
  lookDirection = "down",
}: {
  eyeState?: "sleepy" | "open" | "wide";
  mouthState?: "closed" | "yawn";
  lookDirection?: "up" | "down";
}) {
  const [slowBlink, setSlowBlink] = useState(false);

  // Very slow blink (sloths blink slowly)
  useEffect(() => {
    const interval = setInterval(() => {
      setSlowBlink(true);
      setTimeout(() => setSlowBlink(false), 600); // Long blink
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  const actualEyeState = slowBlink ? "sleepy" : eyeState;

  return (
    <svg
      width={50}
      height={45}
      viewBox="0 0 70 55"
      className="drop-shadow-lg"
    >
      {/* Arms reaching up to "hold" navbar */}
      <motion.path
        d="M18,2 Q15,10 18,18"
        stroke="#A08060"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M18,2 Q15,10 18,18",
            "M18,2 Q14,10 17,18",
            "M18,2 Q15,10 18,18",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M52,2 Q55,10 52,18"
        stroke="#A08060"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M52,2 Q55,10 52,18",
            "M52,2 Q56,10 53,18",
            "M52,2 Q55,10 52,18",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      {/* Claws */}
      <g stroke="#7A6040" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M14,0 L16,2" />
        <path d="M18,0 L18,2" />
        <path d="M22,0 L20,2" />
        <path d="M48,0 L50,2" />
        <path d="M52,0 L52,2" />
        <path d="M56,0 L54,2" />
      </g>

      {/* Body */}
      <ellipse cx="35" cy="33" rx="17" ry="14" fill="#A08060" />

      {/* Face mask */}
      <ellipse cx="35" cy="28" rx="12" ry="10" fill="#E8D8C0" />

      {/* Eye patches (sloth dark markings) */}
      <ellipse cx="27" cy="26" rx="5" ry="4" fill="#6B4E2E" opacity="0.4" />
      <ellipse cx="43" cy="26" rx="5" ry="4" fill="#6B4E2E" opacity="0.4" />

      {/* Eyes */}
      {actualEyeState === "sleepy" && (
        <>
          <path
            d="M24,26 Q27,28 30,26"
            stroke="#3D2B12"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M40,26 Q43,28 46,26"
            stroke="#3D2B12"
            strokeWidth="1.5"
            fill="none"
          />
        </>
      )}
      {actualEyeState === "open" && (
        <>
          <circle cx="27" cy="26" r="2" fill="#3D2B12" />
          <circle cx="43" cy="26" r="2" fill="#3D2B12" />
          <circle cx="27.5" cy="25.5" r="0.6" fill="white" opacity="0.7" />
          <circle cx="43.5" cy="25.5" r="0.6" fill="white" opacity="0.7" />
        </>
      )}
      {actualEyeState === "wide" && (
        <>
          <circle cx="27" cy="26" r="3" fill="white" />
          <circle cx="43" cy="26" r="3" fill="white" />
          <circle cx="27" cy="26" r="2" fill="#3D2B12" />
          <circle cx="43" cy="26" r="2" fill="#3D2B12" />
          <circle cx="27.5" cy="25" r="0.8" fill="white" />
          <circle cx="43.5" cy="25" r="0.8" fill="white" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="35" cy="30" rx="2.5" ry="2" fill="#6B4E2E" />

      {/* Mouth */}
      <motion.path
        d={
          mouthState === "yawn"
            ? "M30,34 Q35,42 40,34"
            : "M32,33 Q35,35 38,33"
        }
        stroke="#6B4E2E"
        strokeWidth="1"
        fill={mouthState === "yawn" ? "#5C3D1E" : "none"}
        animate={{
          d:
            mouthState === "yawn"
              ? [
                  "M32,33 Q35,35 38,33",
                  "M30,34 Q35,42 40,34",
                  "M30,34 Q35,42 40,34",
                  "M32,33 Q35,35 38,33",
                ]
              : "M32,33 Q35,35 38,33",
        }}
        transition={{
          duration: mouthState === "yawn" ? 2 : 0.3,
          ease: "easeInOut",
        }}
      />

      {/* Little smile line */}
      {mouthState === "closed" && (
        <path
          d="M33,35 Q35,36 37,35"
          stroke="#6B4E2E"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
      )}
    </svg>
  );
}
