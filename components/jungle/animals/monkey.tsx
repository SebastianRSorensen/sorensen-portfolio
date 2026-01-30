"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  useScrollTracker,
  useWindowSize,
  useReducedMotion,
} from "@/lib/jungle-hooks";

export function Monkey() {
  const controls = useAnimation();
  const { scrollY, scrollDirection } = useScrollTracker();
  const { width, height } = useWindowSize();
  const prefersReduced = useReducedMotion();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position monkey on the right side, moves with scroll
  const sectionHeight = height || 800;
  const monkeyY = ((scrollY * 0.3) % (sectionHeight * 0.6)) + sectionHeight * 0.3;
  const monkeyX = width > 768 ? width - 120 : width - 70;

  // Look direction based on scroll
  const lookAngle = scrollDirection === "down" ? 8 : -8;

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    controls.start({
      y: [0, -30, 0],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    });
    setTimeout(() => setIsClicked(false), 800);
  };

  if (prefersReduced) {
    return (
      <div
        className="pointer-events-auto cursor-pointer"
        style={{
          position: "fixed",
          right: width > 768 ? 40 : 10,
          top: "50%",
          zIndex: 41,
        }}
      >
        <MonkeySVG lookAngle={0} blinkOpen={true} />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-auto cursor-pointer"
      style={{
        position: "fixed",
        zIndex: 41,
      }}
      animate={{
        x: monkeyX,
        y: monkeyY,
      }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={controls}>
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MonkeySVG
            lookAngle={lookAngle}
            blinkOpen={!isClicked}
            isHovered={isHovered}
            isExcited={isClicked}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MonkeySVG({
  lookAngle = 0,
  blinkOpen = true,
  isHovered = false,
  isExcited = false,
}: {
  lookAngle?: number;
  blinkOpen?: boolean;
  isHovered?: boolean;
  isExcited?: boolean;
}) {
  const [blink, setBlink] = useState(true);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(false);
      setTimeout(() => setBlink(true), 150);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  const eyeOpen = blinkOpen && blink;

  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 80 80"
      className="drop-shadow-lg"
    >
      {/* Tail */}
      <motion.path
        d="M52,55 Q68,42 70,28 Q71,20 64,24"
        stroke="#8B6914"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: isExcited
            ? "M52,55 Q75,35 78,22 Q80,14 72,20"
            : isHovered
            ? "M52,55 Q72,48 74,32 Q76,22 68,28"
            : "M52,55 Q68,42 70,28 Q71,20 64,24",
        }}
        transition={{
          duration: isExcited ? 0.3 : 2,
          repeat: isExcited ? 0 : Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Body */}
      <ellipse cx="35" cy="50" rx="14" ry="16" fill="#8B6914" />

      {/* Arms */}
      <motion.path
        d="M22,44 Q14,48 16,54"
        stroke="#8B6914"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        animate={
          isHovered
            ? { d: "M22,44 Q10,38 8,32" }
            : { d: "M22,44 Q14,48 16,54" }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <path
        d="M48,44 Q56,48 54,54"
        stroke="#8B6914"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Legs */}
      <path
        d="M28,63 Q25,70 30,70"
        stroke="#8B6914"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M42,63 Q45,70 40,70"
        stroke="#8B6914"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Head */}
      <motion.g
        animate={{ rotate: lookAngle }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "35px 28px" }}
      >
        <circle cx="35" cy="28" r="13" fill="#8B6914" />

        {/* Ears */}
        <circle cx="22" cy="22" r="6" fill="#8B6914" />
        <circle cx="22" cy="22" r="3.5" fill="#D4A854" />
        <circle cx="48" cy="22" r="6" fill="#8B6914" />
        <circle cx="48" cy="22" r="3.5" fill="#D4A854" />

        {/* Face */}
        <ellipse cx="35" cy="32" rx="8" ry="7" fill="#D4A854" />

        {/* Eyes */}
        {eyeOpen ? (
          <>
            <circle cx="30" cy="27" r="2.5" fill="#1a0f00" />
            <circle cx="40" cy="27" r="2.5" fill="#1a0f00" />
            {/* Eye shine */}
            <circle cx="31" cy="26" r="0.8" fill="white" opacity="0.8" />
            <circle cx="41" cy="26" r="0.8" fill="white" opacity="0.8" />
          </>
        ) : (
          <>
            <path
              d="M28,27 Q30,28.5 32,27"
              stroke="#1a0f00"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M38,27 Q40,28.5 42,27"
              stroke="#1a0f00"
              strokeWidth="1.5"
              fill="none"
            />
          </>
        )}

        {/* Mouth */}
        <motion.path
          d={isExcited ? "M31,34 Q35,38 39,34" : "M32,34 Q35,36 38,34"}
          stroke="#1a0f00"
          strokeWidth="1"
          fill="none"
          animate={{
            d: isExcited
              ? "M31,34 Q35,38 39,34"
              : isHovered
              ? "M31,33 Q35,37 39,33"
              : "M32,34 Q35,36 38,34",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.g>
    </svg>
  );
}
